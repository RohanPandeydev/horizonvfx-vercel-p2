import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticate } from '@/lib/middleware';
import { uploadFileToS3, generateS3Key, deleteFromS3, getSignedUrl } from '@/lib/s3';

// GET /api/videos - Get all video projects (public endpoint with pagination)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'project', 'reel', or null for all
    const category = searchParams.get('category');
    const featured = searchParams.get('featured') || searchParams.get('isFeatured'); // 'true' or 'false'
    const publicOnly = searchParams.get('public') !== 'false'; // default to true

    // Pagination parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (type) {
      where.type = type;
    }

    if (category && category !== 'all') {
      where.category = category;
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    // Always enforce isPublic=true for public endpoints
    where.isPublic = true;

    // Fetch video projects with pagination
    const [videos, total] = await Promise.all([
      prisma.videoProject.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.videoProject.count({ where })
    ]);

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit);
    const hasMore = page < totalPages;

    // Parse technologies JSON string to array for each video
    const videosWithParsedTech = await Promise.all(
      videos.map(async (video) => ({
        ...video,
        technologies: video.technologies ? JSON.parse(video.technologies) : [],
        // Generate signed URLs for S3 objects
        thumbnailUrl: await getSignedUrl(video.thumbnailS3Key, 86400), // 24 hours
        videoUrl: video.videoS3Key ? await getSignedUrl(video.videoS3Key, 86400) : null,
      }))
    );

    return NextResponse.json({
      videos: videosWithParsedTech,
      pagination: {
        page,
        totalPages,
        total,
        hasMore
      }
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}

// POST /api/videos - Create a new video project
export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticate(request);
    if (!authResult.user) {
      return NextResponse.json(
        { error: authResult.error || 'Unauthorized' },
        { status: authResult.status || 401 }
      );
    }

    const formData = await request.formData();

    // Extract form fields
    const title = formData.get('title') as string;
    const type = formData.get('type') as 'project' | 'reel';
    const category = formData.get('category') as string;
    const isFeatured = formData.get('isFeatured') === 'true';
    const isPublic = formData.get('isPublic') !== 'false'; // default true
    const description = formData.get('description') as string | null;
    const gradient = formData.get('gradient') as string || 'from-blue-500 to-purple-500';
    const stats = formData.get('stats') as string | null;
    const technologies = formData.get('technologies') as string | null;
    const thumbnail = formData.get('thumbnail') as File | null;
    const video = formData.get('video') as File | null;

    // Validate required fields
    if (!title || !type || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: title, type, category' },
        { status: 400 }
      );
    }

    if (!thumbnail) {
      return NextResponse.json(
        { error: 'Thumbnail image is required' },
        { status: 400 }
      );
    }

    if (!video) {
      return NextResponse.json(
        { error: 'Video file is required' },
        { status: 400 }
      );
    }

    // Validate file types
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime'];

    if (thumbnail && !allowedImageTypes.includes(thumbnail.type)) {
      return NextResponse.json(
        { error: 'Invalid thumbnail format. Allowed: JPEG, PNG, GIF, WebP' },
        { status: 400 }
      );
    }

    if (video && !allowedVideoTypes.includes(video.type)) {
      return NextResponse.json(
        { error: 'Invalid video format. Allowed: MP4, WebM, MOV' },
        { status: 400 }
      );
    }

    // Validate file sizes
    const MAX_THUMBNAIL_SIZE = 10 * 1024 * 1024; // 10MB
    const MAX_VIDEO_SIZE = 1024 * 1024 * 1024; // 1GB

    if (thumbnail && thumbnail.size > MAX_THUMBNAIL_SIZE) {
      return NextResponse.json(
        { error: `Thumbnail size exceeds ${MAX_THUMBNAIL_SIZE / (1024 * 1024)}MB limit` },
        { status: 400 }
      );
    }

    if (video && video.size > MAX_VIDEO_SIZE) {
      return NextResponse.json(
        { error: `Video size exceeds ${MAX_VIDEO_SIZE / (1024 * 1024 * 1024)}GB limit` },
        { status: 400 }
      );
    }

    // Upload thumbnail to S3
    const thumbnailBuffer = Buffer.from(await thumbnail.arrayBuffer());
    const thumbnailS3Key = generateS3Key('thumbnails', 'videos', thumbnail.name, authResult.user.userId);
    await uploadFileToS3(thumbnailBuffer, thumbnailS3Key, thumbnail.type);

    // Upload video to S3
    const videoBuffer = Buffer.from(await video.arrayBuffer());
    const videoS3Key = generateS3Key('videos', 'videos', video.name, authResult.user.userId);
    await uploadFileToS3(videoBuffer, videoS3Key, video.type);

    // Generate signed URLs
    const thumbnailUrl = await getSignedUrl(thumbnailS3Key, 86400);
    const videoUrl = await getSignedUrl(videoS3Key, 86400);

    // Parse technologies array to JSON string
    let technologiesJson = null;
    if (technologies) {
      try {
        const techArray = JSON.parse(technologies);
        technologiesJson = JSON.stringify(techArray);
      } catch {
        technologiesJson = JSON.stringify([technologies]);
      }
    }

    // Create video project
    const videoProject = await prisma.videoProject.create({
      data: {
        title,
        type,
        isReel: type === 'reel',
        thumbnailUrl,
        videoUrl,
        thumbnailS3Key,
        videoS3Key,
        category,
        isFeatured,
        isPublic,
        description: description || null,
        gradient,
        stats: stats || null,
        technologies: technologiesJson,
        uploadedBy: authResult.user.userId,
      },
    });

    // Parse technologies for response
    const responseVideo = {
      ...videoProject,
      technologies: videoProject.technologies ? JSON.parse(videoProject.technologies) : [],
    };

    return NextResponse.json(responseVideo, { status: 201 });
  } catch (error: any) {
    console.error('Error creating video:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create video project' },
      { status: 500 }
    );
  }
}
