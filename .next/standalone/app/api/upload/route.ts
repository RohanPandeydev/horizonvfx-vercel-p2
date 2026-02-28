import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/middleware";
import { uploadFile, generateFileKey, deleteFile } from "@/lib/storage";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/upload
 * Upload a file (S3 or local filesystem) and save metadata to database
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
    const oldMediaId = formData.get("oldMediaId") as string | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024;
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

    // Generate file key
    const fileKey = generateFileKey(file.name);

    // Delete old media if exists
    if (oldMediaId) {
      try {
        const oldMedia = await prisma.media.findUnique({
          where: { id: oldMediaId },
        });
        if (oldMedia) {
          await deleteFile(oldMedia.s3Key);
          await prisma.media.delete({
            where: { id: oldMediaId },
          });
        }
      } catch (error) {
        console.error("Error deleting old media:", error);
      }
    }

    // Upload file
    console.log("Uploading file:", { fileKey, fileSize: file.size });
    await uploadFile(buffer, fileKey, file.type);
    console.log("Upload complete");

    // Save metadata to database
    const media = await prisma.media.create({
      data: {
        filename: file.name,
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        s3Key: fileKey,
        s3Bucket: process.env.AWS_S3_BUCKET || "local",
        s3Region: process.env.AWS_REGION || "local",
        url: `/api/media/${fileKey}`,
        uploadedBy: user.userId,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: media.id,
        url: `/api/media/${media.id}`,
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
