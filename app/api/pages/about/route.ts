import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Fetch about page content for home page
export async function GET() {
  try {
    const pageContent = await prisma.pageContent.findUnique({
      where: { slug: "about" },
    });

    if (!pageContent) {
      return NextResponse.json(
        { success: false, error: "About page not found" },
        { status: 404 }
      );
    }

    const content = JSON.parse(pageContent.content);

    // Extract only the excellence section data needed for home page
    return NextResponse.json({
      success: true,
      data: {
        excellence: content.excellence || null,
      },
    });
  } catch (error) {
    console.error("Error fetching about page:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch about page data" },
      { status: 500 }
    );
  }
}
