import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Fetch showcase page content for home page
export async function GET() {
  try {
    const pageContent = await prisma.pageContent.findUnique({
      where: { slug: "showcase" },
    });

    if (!pageContent) {
      return NextResponse.json(
        { success: false, error: "Showcase page not found" },
        { status: 404 }
      );
    }

    const content = JSON.parse(pageContent.content);

    // Return all showcase data
    return NextResponse.json({
      success: true,
      data: content,
    });
  } catch (error) {
    console.error("Error fetching showcase page:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch showcase page data" },
      { status: 500 }
    );
  }
}
