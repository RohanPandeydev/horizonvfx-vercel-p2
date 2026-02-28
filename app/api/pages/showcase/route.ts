import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Fetch showcase page content (full content for public page + home page)
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

    // Transform stats object to array format for home page compatibility
    const statsArray = content.stats && typeof content.stats === 'object' && !Array.isArray(content.stats)
      ? [
          { icon: "🎬", name: "Projects", count: String(content.stats.totalProjects || 0) },
          { icon: "😊", name: "Happy Clients", count: String(content.stats.happyClients || "0+") },
          { icon: "🏆", name: "Awards", count: String(content.stats.awardsWon || "0+") },
          { icon: "⭐", name: "Experience", count: String(content.stats.yearsExperience || "0+") },
        ]
      : (content.stats || []);

    // Ensure techStack is an array
    const techStackArray = Array.isArray(content.techStack) ? content.techStack : (content.techStack || []);

    return NextResponse.json({
      success: true,
      data: {
        content,
        // Also expose fields at top level for home page backward compat
        ...content,
        techStack: techStackArray,
        stats: statsArray,
      },
    });
  } catch (error) {
    console.error("Error fetching showcase page:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch showcase page data" },
      { status: 500 }
    );
  }
}
