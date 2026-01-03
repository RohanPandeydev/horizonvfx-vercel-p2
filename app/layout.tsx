import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/MainLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HorizonVFX - Where Creativity Meets Horizon",
  description:
    "Pioneering visual excellence in the digital age. Specialized in VFX, 3D animation, compositing, motion graphics, and post-production services.",
  keywords: ["VFX", "Visual Effects", "3D Animation", "Motion Graphics", "Post Production", "Compositing", "Color Grading"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
