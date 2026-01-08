"use client";

import { useState } from "react";
import { Plus, Search, Edit, Eye, Trash2, Save } from "lucide-react";

interface PageData {
  id: string;
  title: string;
  slug: string;
  status: "published" | "draft";
  lastUpdated: string;
}

export default function PagesPage() {
  const [pages, setPages] = useState<PageData[]>([
    {
      id: "1",
      title: "Home Page",
      slug: "home",
      status: "published",
      lastUpdated: "2025-01-04",
    },
    {
      id: "2",
      title: "About Us",
      slug: "about",
      status: "published",
      lastUpdated: "2025-01-03",
    },
    {
      id: "3",
      title: "Team",
      slug: "team",
      status: "published",
      lastUpdated: "2025-01-02",
    },
    {
      id: "4",
      title: "Showcase",
      slug: "showcase",
      status: "published",
      lastUpdated: "2025-01-01",
    },
    {
      id: "5",
      title: "Contact",
      slug: "contact",
      status: "published",
      lastUpdated: "2024-12-30",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPage, setSelectedPage] = useState<PageData | null>(null);

  const filteredPages = pages.filter((page) =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this page?")) {
      setPages(pages.filter((page) => page.id !== id));
    }
  };

  const handleStatusToggle = (id: string) => {
    setPages(
      pages.map((page) =>
        page.id === id
          ? { ...page, status: page.status === "published" ? "draft" : "published" }
          : page
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Pages</h1>
          <p className="text-gray-400">Manage your website content</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]">
          <Plus className="w-5 h-5" />
          Add New Page
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-black/50 backdrop-blur-xl border border-gray-800 rounded-xl p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
          </div>
          <select className="px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all">
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-black/50 backdrop-blur-xl border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                  Page Title
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                  Slug
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                  Last Updated
                </th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPages.map((page) => (
                <tr
                  key={page.id}
                  className="border-b border-gray-800 hover:bg-black/30 transition-all"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{page.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-sm text-gray-400">/{page.slug}</code>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleStatusToggle(page.id)}
                      className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                        page.status === "published"
                          ? "text-green-400 bg-green-500/10 hover:bg-green-500/20"
                          : "text-yellow-400 bg-yellow-500/10 hover:bg-yellow-500/20"
                      }`}
                    >
                      {page.status}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {page.lastUpdated}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`/admin/pages/edit/${page.slug}`}
                        className="p-2 text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </a>
                      <a
                        href={`/${page.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleDelete(page.id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No pages found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
