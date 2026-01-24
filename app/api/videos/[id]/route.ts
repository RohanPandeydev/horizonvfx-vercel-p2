import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticate } from '@/lib/middleware';

// GET /api/videos/[id] - Get a single video project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const video = await prisma.videoProject.findUnique({
      where: { id },
    });

    if (!video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    // Parse technologies JSON string to array
    const videoWithParsedTech = {
      ...video,
      technologies: video.technologies ? JSON.parse(video.technologies) : [],
    };

    return NextResponse.json(videoWithParsedTech);
  } catch (error) {
    console.error('Error fetching video:', error);
    return NextResponse.json(
      { error: 'Failed to fetch video' },
      { status: 500 }
    );
  }
}

// PUT /api/videos/[id] - Update a video project
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Authenticate user
    const authResult = await authenticate(request);
    if (!authResult.user) {
      return NextResponse.json(
        { error: authResult.error || 'Unauthorized' },
        { status: authResult.status || 401 }
      );
    }

    const body = await request.json();

    // Check if video exists
    const existingVideo = await prisma.videoProject.findUnique({
      where: { id },
    });

    if (!existingVideo) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = {};

    // Only include fields that are provided in the request
    if (body.title !== undefined) updateData.title = body.title;
    if (body.type !== undefined) updateData.type = body.type;
    if (body.isReel !== undefined) updateData.isReel = body.isReel;
    if (body.category !== undefined) updateData.category = body.category;
    if (body.isFeatured !== undefined) updateData.isFeatured = body.isFeatured;
    if (body.isPublic !== undefined) updateData.isPublic = body.isPublic;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.gradient !== undefined) updateData.gradient = body.gradient;
    if (body.stats !== undefined) updateData.stats = body.stats;
    if (body.technologies !== undefined) {
      updateData.technologies = Array.isArray(body.technologies)
        ? JSON.stringify(body.technologies)
        : body.technologies;
    }
    if (body.thumbnailUrl !== undefined) updateData.thumbnailUrl = body.thumbnailUrl;
    if (body.videoUrl !== undefined) updateData.videoUrl = body.videoUrl;

    // Update video
    const updatedVideo = await prisma.videoProject.update({
      where: { id },
      data: updateData,
    });

    // Parse technologies for response
    const responseVideo = {
      ...updatedVideo,
      technologies: updatedVideo.technologies ? JSON.parse(updatedVideo.technologies) : [],
    };

    return NextResponse.json(responseVideo);
  } catch (error: any) {
    console.error('Error updating video:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update video' },
      { status: 500 }
    );
  }
}

// DELETE /api/videos/[id] - Delete a video project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Authenticate user
    const authResult = await authenticate(request);
    if (!authResult.user) {
      return NextResponse.json(
        { error: authResult.error || 'Unauthorized' },
        { status: authResult.status || 401 }
      );
    }

    // Check if video exists
    const existingVideo = await prisma.videoProject.findUnique({
      where: { id },
    });

    if (!existingVideo) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    // Delete files from S3
    const { deleteFromS3 } = await import('@/lib/s3');
    if (existingVideo.thumbnailS3Key) {
      await deleteFromS3(existingVideo.thumbnailS3Key);
    }
    if (existingVideo.videoS3Key) {
      await deleteFromS3(existingVideo.videoS3Key);
    }

    // Delete video from database
    await prisma.videoProject.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting video:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete video' },
      { status: 500 }
    );
  }
}
