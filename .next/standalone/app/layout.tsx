import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "@/components/MainLayout";
import { ToastProvider } from "@/lib/toast-context";

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
      <body className="font-sans antialiased">
        <ToastProvider>
          <MainLayout>{children}</MainLayout>
        </ToastProvider>
      </body>
    </html>
  );
}
