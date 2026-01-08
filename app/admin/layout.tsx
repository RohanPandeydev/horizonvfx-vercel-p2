"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Edit, Eye, Save, X, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Pages available for editing
  const pages = [
    { name: "Header", path: "/admin/edit/header" },
    { name: "Footer", path: "/admin/edit/footer" },
    { name: "Home", path: "/admin/edit/home" },
    { name: "About", path: "/admin/edit/about" },
    { name: "About Sections", path: "/admin/edit/about-sections" },
    { name: "Team", path: "/admin/edit/team" },
    { name: "Team Sections", path: "/admin/edit/team-sections" },
    { name: "Showcase", path: "/admin/edit/showcase" },
    { name: "Showcase Sections", path: "/admin/edit/showcase-sections" },
    { name: "Galactic Showcase", path: "/admin/edit/galactic-showcase" },
    { name: "Contact", path: "/admin/edit/contact" },
  ];

  const handleLogout = () => {
    router.push("/admin/login");
  };

  const handleSave = () => {
    // Will integrate with API later
    alert("Changes saved!");
    setIsEditMode(false);
  };

  // Don't show admin bar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Admin Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center justify-between px-4 py-2">
          {/* Left: Logo & Page Navigation */}
          <div className="flex items-center gap-6">
            <h1 className="text-lg font-bold text-white">HorizonVFX Admin</h1>
            <div className="flex items-center gap-2">
              {pages.map((page) => (
                <a
                  key={page.path}
                  href={page.path}
                  className={`px-3 py-1 text-sm rounded ${
                    pathname === page.path
                      ? "bg-purple-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {page.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {isEditMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={() => setIsEditMode(false)}
                  className="flex items-center gap-2 px-4 py-1.5 bg-gray-700 text-white text-sm rounded hover:bg-gray-600"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditMode(true)}
                className="flex items-center gap-2 px-4 py-1.5 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
              >
                <Edit className="w-4 h-4" />
                Edit Mode
              </button>
            )}
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              <Eye className="w-4 h-4" />
              View Site
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-1.5 bg-red-600 text-white text-sm rounded hover:bg-red-700"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Edit Mode Indicator */}
        {isEditMode && (
          <div className="bg-yellow-600 text-white text-center text-xs py-1">
            Edit Mode Active - Click on any element to edit
          </div>
        )}
      </div>

      {/* Main Content - Shows actual page */}
      <main className="pt-[52px]">
        <EditProvider isEditMode={isEditMode}>{children}</EditProvider>
      </main>
    </div>
  );
}

// Context for edit mode
function EditProvider({
  children,
  isEditMode,
}: {
  children: React.ReactNode;
  isEditMode: boolean;
}) {
  return <div className={isEditMode ? "edit-mode-active" : ""}>{children}</div>;
}
