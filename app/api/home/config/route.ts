import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Fetch home page configuration
export async function GET() {
  try {
    // Get the first (and only) config record
    let config = await prisma.homePageConfig.findFirst();

    // If no config exists, create default one
    if (!config) {
      config = await prisma.homePageConfig.create({
        data: {
          showExcellence: true,
          showLeadership: true,
          showTechStack: true,
          showStats: true,
          showProjects: true,
          showShowreel: true,
          showClients: true,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        showExcellence: config.showExcellence,
        showLeadership: config.showLeadership,
        showTechStack: config.showTechStack,
        showStats: config.showStats,
        showProjects: config.showProjects,
        showShowreel: config.showShowreel,
        showClients: config.showClients,
      },
    });
  } catch (error) {
    console.error("Error fetching home config:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch configuration" },
      { status: 500 }
    );
  }
}

// POST - Update home page configuration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Get the first config record
    let config = await prisma.homePageConfig.findFirst();

    if (config) {
      // Update existing config
      config = await prisma.homePageConfig.update({
        where: { id: config.id },
        data: {
          showExcellence: body.showExcellence ?? config.showExcellence,
          showLeadership: body.showLeadership ?? config.showLeadership,
          showTechStack: body.showTechStack ?? config.showTechStack,
          showStats: body.showStats ?? config.showStats,
          showProjects: body.showProjects ?? config.showProjects,
          showShowreel: body.showShowreel ?? config.showShowreel,
          showClients: body.showClients ?? config.showClients,
        },
      });
    } else {
      // Create new config
      config = await prisma.homePageConfig.create({
        data: {
          showExcellence: body.showExcellence ?? true,
          showLeadership: body.showLeadership ?? true,
          showTechStack: body.showTechStack ?? true,
          showStats: body.showStats ?? true,
          showProjects: body.showProjects ?? true,
          showShowreel: body.showShowreel ?? true,
          showClients: body.showClients ?? true,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        showExcellence: config.showExcellence,
        showLeadership: config.showLeadership,
        showTechStack: config.showTechStack,
        showStats: config.showStats,
        showProjects: config.showProjects,
        showShowreel: config.showShowreel,
        showClients: config.showClients,
      },
    });
  } catch (error) {
    console.error("Error updating home config:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update configuration" },
      { status: 500 }
    );
  }
}
