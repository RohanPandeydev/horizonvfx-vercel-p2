import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ShutterPreloader from "@/components/shared/ShutterPreloader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Horizon Studio",
  description:
    "A Horizon studio specialized in visual effects, post-production, 3D, compositing, and grading",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
