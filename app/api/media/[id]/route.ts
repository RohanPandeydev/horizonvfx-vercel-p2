import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getFileUrl, deleteFile, isS3Configured, UPLOAD_DIR } from "@/lib/storage";
import { authenticate } from "@/lib/middleware";
import path from "path";
import fs from "fs/promises";

/**
 * GET /api/media/[id]
 * Serve a file - redirects to S3 signed URL or streams local file
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Fetch media record from database
    const media = await prisma.media.findUnique({
      where: { id },
    });

    if (!media) {
      return NextResponse.json(
        { success: false, error: "Media not found" },
        { status: 404 }
      );
    }

    if (isS3Configured) {
      // S3: redirect to signed URL
      const fileUrl = await getFileUrl(media.s3Key);
      return NextResponse.redirect(fileUrl);
    }

    // Local: read and serve the file directly
    const filePath = path.join(UPLOAD_DIR, media.s3Key);

    try {
      await fs.access(filePath);
    } catch {
      console.error("Media file not found on disk:", filePath);
      return NextResponse.json(
        { success: false, error: "File not found on disk" },
        { status: 404 }
      );
    }

    const fileBuffer = await fs.readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": media.mimeType,
        "Content-Length": String(fileBuffer.length),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: any) {
    console.error("Media serve error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to serve media" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/media/[id]
 * Delete a file and its database record
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
    const { id } = await params;

    // Fetch media record
    const media = await prisma.media.findUnique({
      where: { id },
    });

    if (!media) {
      return NextResponse.json(
        { success: false, error: "Media not found" },
        { status: 404 }
      );
    }

    // Check if user owns the media or is admin
    if (media.uploadedBy !== user.userId && user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    // Delete file
    await deleteFile(media.s3Key);

    // Delete from database
    await prisma.media.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Media deleted successfully",
    });
  } catch (error: any) {
    console.error("Media delete error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete media" },
      { status: 500 }
    );
  }
}
