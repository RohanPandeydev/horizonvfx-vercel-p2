"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Image,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Mail,
  BookOpen,
  Film,
  Wrench,
  Home as HomeIcon,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Home",
      href: "/admin/home",
      icon: HomeIcon,
    },
    {
      name: "Pages",
      href: "/admin/pages",
      icon: FileText,
    },
    {
      name: "About",
      href: "/admin/about",
      icon: BookOpen,
    },
    {
      name: "Contact",
      href: "/admin/contact",
      icon: Mail,
    },
    {
      name: "Services",
      href: "/admin/services",
      icon: Wrench,
    },
    {
      name: "Showcase",
      href: "/admin/showcase",
      icon: Film,
    },
    {
      name: "Team",
      href: "/admin/team",
      icon: Users,
    },
    {
      name: "Media",
      href: "/admin/media",
      icon: Image,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 shadow-sm z-50">
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          {/* Logo & Menu Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link href="/admin/dashboard">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">H</span>
                </div>
                <span className="font-semibold text-slate-800 text-lg hidden sm:block">
                  HorizonVFX Admin
                </span>
              </div>
            </Link>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">View Site</span>
            </Link>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold">
              A
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-slate-200 shadow-lg z-40 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                  isActive
                    ? "bg-blue-50 text-blue-700 shadow-sm"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon
                  size={20}
                  className={`${
                    isActive ? "text-blue-700" : "text-slate-500 group-hover:text-slate-700"
                  }`}
                />
                <span className="font-medium flex-1">{item.name}</span>
                {isActive && <ChevronRight size={16} className="text-blue-700" />}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">Admin User</p>
              <p className="text-xs text-slate-500 truncate">admin@horizonvfx.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pt-16 lg:pl-64">
        <div className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}
