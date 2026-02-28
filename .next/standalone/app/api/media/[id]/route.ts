import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getFileUrl, deleteFile } from "@/lib/storage";
import { authenticate } from "@/lib/middleware";

/**
 * GET /api/media/[id]
 * Serve a file - redirects to S3 signed URL or local file
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

    // Get the file URL (signed S3 URL or local path)
    const fileUrl = await getFileUrl(media.s3Key);

    // Redirect to the file URL
    return NextResponse.redirect(new URL(fileUrl, request.url));
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
