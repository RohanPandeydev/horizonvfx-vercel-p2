import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/pages/contact - Get contact page content
export async function GET() {
  try {
    const page = await prisma.pageContent.findFirst({
      where: {
        slug: "contact",
        published: true,
      },
    });

    if (!page) {
      return NextResponse.json({
        success: true,
        data: { content: null },
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        content: JSON.parse(page.content),
      },
    });
  } catch (error) {
    console.error("Error fetching contact page:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch page" },
      { status: 500 }
    );
  }
}
