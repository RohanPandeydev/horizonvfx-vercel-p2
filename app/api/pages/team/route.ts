import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Fetch team page content (full content for public team page + home page)
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

    // For home page compatibility: if leadership is an array, wrap it in {heading, members}
    const leadershipForHome = content.leadership
      ? Array.isArray(content.leadership)
        ? { heading: "Leadership", members: content.leadership }
        : content.leadership
      : null;

    return NextResponse.json({
      success: true,
      data: {
        content,
        // Also expose leadership at top level for home page (with proper structure)
        leadership: leadershipForHome,
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
