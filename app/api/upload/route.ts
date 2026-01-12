import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/middleware";
import { uploadToS3, generateS3Key, getCategoryFromMimeType, deleteFromS3 } from "@/lib/s3";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/upload
 * Upload a file to S3 and save metadata to database
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticate(request);
    if (!authResult.user) {
      return NextResponse.json(
        { success: false, error: authResult.error || "Unauthorized" },
        { status: authResult.status || 401 }
      );
    }

    const user = authResult.user;

    // Parse form data
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const category = formData.get("category") as string || "general";
    const subfolder = formData.get("subfolder") as string || "uploads";
    const oldMediaId = formData.get("oldMediaId") as string | null; // ID of old media to delete

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: `File size exceeds ${maxSize / (1024 * 1024)}MB limit` },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
      "video/mp4",
      "video/webm",
      "video/quicktime",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Invalid file type" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generate S3 key
    // category = page section (about, team, showcase, etc.)
    // subfolder = file type folder (images, videos)
    const s3Key = generateS3Key(
      category,      // Use the category from form data
      subfolder,     // Use the subfolder from form data
      file.name,
      user.userId
    );

    // Delete old media if exists
    if (oldMediaId) {
      try {
        const oldMedia = await prisma.media.findUnique({
          where: { id: oldMediaId },
        });
        if (oldMedia) {
          // Delete from S3
          await deleteFromS3(oldMedia.s3Key);
          // Delete from database
          await prisma.media.delete({
            where: { id: oldMediaId },
          });
          console.log("Old media deleted:", oldMediaId);
        }
      } catch (error) {
        console.error("Error deleting old media:", error);
        // Continue with upload even if delete fails
      }
    }

    // Upload to S3
    console.log("Uploading to S3:", { s3Key, fileSize: file.size });
    await uploadToS3(buffer, s3Key, file.type);
    console.log("S3 upload complete");

    // Save metadata to database
    const media = await prisma.media.create({
      data: {
        filename: file.name,
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        s3Key: s3Key,
        s3Bucket: process.env.AWS_S3_BUCKET || "horizonvfx-media",
        s3Region: process.env.AWS_REGION || "ap-south-1",
        url: `s3://${process.env.AWS_S3_BUCKET || "horizonvfx-media"}/${s3Key}`,
        uploadedBy: user.userId,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: media.id,
        url: `/api/media/${media.id}`, // Our serve endpoint
        filename: media.filename,
        mimeType: media.mimeType,
        size: media.size,
      },
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}
