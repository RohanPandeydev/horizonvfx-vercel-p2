import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { deepMerge } from '@/lib/merge';

const prisma = new PrismaClient();

// GET /api/admin/pages - Get all pages
export async function GET() {
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

// POST /api/admin/pages - Create or update a page.
//
// Accepts EITHER:
//   { slug, title, content, published? }       → full replace (legacy / create)
//   { slug, title?, contentPatch, published? } → partial update (only specified
//                                                 fields are merged into existing
//                                                 content; everything else preserved)
//
// `contentPatch` is preferred for edits — it lets the client send only what
// changed instead of the entire page state.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, title, content, contentPatch, published } = body;

    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Missing required field: slug' },
        { status: 400 }
      );
    }
    if (content == null && contentPatch == null) {
      return NextResponse.json(
        { success: false, error: 'Must provide either content (full) or contentPatch (partial)' },
        { status: 400 }
      );
    }

    const existing = await prisma.pageContent.findUnique({ where: { slug } });

    let nextContent: Record<string, unknown>;
    if (contentPatch != null) {
      if (!existing) {
        return NextResponse.json(
          { success: false, error: 'contentPatch requires existing page; use content for first save' },
          { status: 400 }
        );
      }
      const existingContent = JSON.parse(existing.content) as Record<string, unknown>;
      nextContent = deepMerge(existingContent, contentPatch);
    } else {
      nextContent = content;
    }

    const nextTitle = title ?? existing?.title ?? slug;
    const nextPublished = published ?? existing?.published ?? true;

    const page = existing
      ? await prisma.pageContent.update({
          where: { slug },
          data: {
            title: nextTitle,
            content: JSON.stringify(nextContent),
            published: nextPublished,
          },
        })
      : await prisma.pageContent.create({
          data: {
            slug,
            title: nextTitle,
            content: JSON.stringify(nextContent),
            published: nextPublished,
          },
        });

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
