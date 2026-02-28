import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Fetch team page content for home page
export async function GET() {
  try {
    const pageContent = await prisma.pageContent.findUnique({
      where: { slug: "team" },
    });

    if (!pageContent) {
      return NextResponse.json(
        { success: false, error: "Team page not found" },
        { status: 404 }
      );
    }

    const content = JSON.parse(pageContent.content);

    // Extract only the leadership section data needed for home page
    return NextResponse.json({
      success: true,
      data: {
        leadership: content.leadership || null,
      },
    });
  } catch (error) {
    console.error("Error fetching team page:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch team page data" },
      { status: 500 }
    );
  }
}
