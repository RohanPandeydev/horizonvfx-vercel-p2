import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSignedUrl } from "@/lib/s3";
import { authenticate } from "@/lib/middleware";

/**
 * GET /api/media/[id]
 * Serve a file from S3 using signed URL
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

    // Generate signed URL (valid for 1 hour)
    const signedUrl = await getSignedUrl(media.s3Key, 3600);

    // Redirect to the signed URL
    return NextResponse.redirect(signedUrl);
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
 * Delete a file from S3 and database
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

    // Delete from S3
    const { deleteFromS3 } = await import("@/lib/s3");
    await deleteFromS3(media.s3Key);

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
