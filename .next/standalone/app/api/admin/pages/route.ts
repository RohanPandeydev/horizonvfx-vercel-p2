import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/admin/pages - Get all pages
export async function GET(request: NextRequest) {
  try {
    const pages = await prisma.pageContent.findMany({
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: pages.map(page => ({
        ...page,
        content: JSON.parse(page.content),
      })),
    });
  } catch (error) {
    console.error('Error fetching pages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch pages' },
      { status: 500 }
    );
  }
}

// POST /api/admin/pages - Create or update a page
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, title, content, published = true } = body;

    if (!slug || !title || !content) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if page exists
    const existingPage = await prisma.pageContent.findUnique({
      where: { slug },
    });

    let page;

    if (existingPage) {
      // Update existing page
      page = await prisma.pageContent.update({
        where: { slug },
        data: {
          title,
          content: JSON.stringify(content),
          published,
        },
      });
    } else {
      // Create new page
      page = await prisma.pageContent.create({
        data: {
          slug,
          title,
          content: JSON.stringify(content),
          published,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        ...page,
        content: JSON.parse(page.content),
      },
    });
  } catch (error) {
    console.error('Error saving page:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save page' },
      { status: 500 }
    );
  }
}
