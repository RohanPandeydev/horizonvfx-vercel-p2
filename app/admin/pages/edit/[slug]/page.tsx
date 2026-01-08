"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Save, ArrowLeft, Eye, Plus, X } from "lucide-react";
import Link from "next/link";

interface PageContent {
  id: string;
  type: "heading" | "text" | "image" | "button" | "section";
  content: string;
  styles?: Record<string, string>;
}

interface PageData {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  content: PageContent[];
}

export default function EditPagePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pageData, setPageData] = useState<PageData>({
    title: "",
    slug: "",
    metaTitle: "",
    metaDescription: "",
    content: [],
  });

  // Sample page data - will be replaced with API call
  const samplePages: Record<string, PageData> = {
    home: {
      title: "Home Page",
      slug: "home",
      metaTitle: "HorizonVFX - Where Creativity Meets Horizon",
      metaDescription: "Pioneering visual excellence in the digital age",
      content: [
        {
          id: "1",
          type: "heading",
          content: "Welcome to HorizonVFX",
          styles: { fontSize: "48px", fontWeight: "bold" },
        },
        {
          id: "2",
          type: "text",
          content: "We create stunning visual effects and 3D animations that bring your imagination to life.",
        },
        {
          id: "3",
          type: "button",
          content: "Get Started",
          styles: { variant: "primary" },
        },
      ],
    },
    about: {
      title: "About Us",
      slug: "about",
      metaTitle: "About HorizonVFX",
      metaDescription: "Learn about our journey and expertise in VFX",
      content: [
        {
          id: "1",
          type: "heading",
          content: "About Our Studio",
          styles: { fontSize: "42px" },
        },
        {
          id: "2",
          type: "text",
          content: "HorizonVFX is a leading visual effects studio specializing in creating groundbreaking visual content for films, commercials, and digital media.",
        },
      ],
    },
    team: {
      title: "Team",
      slug: "team",
      metaTitle: "Our Team - HorizonVFX",
      metaDescription: "Meet our talented team of artists and developers",
      content: [
        {
          id: "1",
          type: "heading",
          content: "Our Team",
          styles: { fontSize: "42px" },
        },
        {
          id: "2",
          type: "text",
          content: "Meet the creative minds behind our stunning visual effects.",
        },
      ],
    },
    showcase: {
      title: "Showcase",
      slug: "showcase",
      metaTitle: "Our Work - HorizonVFX",
      metaDescription: "Explore our portfolio of visual effects projects",
      content: [
        {
          id: "1",
          type: "heading",
          content: "Our Work",
          styles: { fontSize: "42px" },
        },
        {
          id: "2",
          type: "text",
          content: "A showcase of our best visual effects and animation projects.",
        },
      ],
    },
    contact: {
      title: "Contact",
      slug: "contact",
      metaTitle: "Contact Us - HorizonVFX",
      metaDescription: "Get in touch with our team",
      content: [
        {
          id: "1",
          type: "heading",
          content: "Get In Touch",
          styles: { fontSize: "42px" },
        },
        {
          id: "2",
          type: "text",
          content: "Ready to start your next project? Contact us today.",
        },
      ],
    },
  };

  useEffect(() => {
    // Load page data
    const data = samplePages[slug];
    if (data) {
      setPageData(data);
    }
    setLoading(false);
  }, [slug]);

  const handleSave = async () => {
    setSaving(true);
    // API call will be added later
    // await fetch('/api/admin/pages', { method: 'POST', body: JSON.stringify(pageData) });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    alert("Page saved successfully!");
  };

  const addContentBlock = (type: PageContent["type"]) => {
    const newBlock: PageContent = {
      id: Date.now().toString(),
      type,
      content: "",
    };
    setPageData({ ...pageData, content: [...pageData.content, newBlock] });
  };

  const updateContentBlock = (id: string, content: string) => {
    setPageData({
      ...pageData,
      content: pageData.content.map((block) =>
        block.id === id ? { ...block, content } : block
      ),
    });
  };

  const removeContentBlock = (id: string) => {
    setPageData({
      ...pageData,
      content: pageData.content.filter((block) => block.id !== id),
    });
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/pages"
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Edit: {pageData.title}
            </h1>
            <p className="text-gray-400">Edit page content and settings</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all"
          >
            <Eye className="w-4 h-4" />
            Preview
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Page Content */}
          <div className="bg-black/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Page Content</h2>

            <div className="space-y-4">
              {pageData.content.map((block) => (
                <div
                  key={block.id}
                  className="p-4 bg-black/30 border border-gray-800 rounded-lg space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-purple-400 uppercase">
                      {block.type}
                    </span>
                    <button
                      onClick={() => removeContentBlock(block.id)}
                      className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {block.type === "heading" && (
                    <input
                      type="text"
                      value={block.content}
                      onChange={(e) =>
                        updateContentBlock(block.id, e.target.value)
                      }
                      placeholder="Heading text"
                      className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all"
                    />
                  )}
                  {block.type === "text" && (
                    <textarea
                      value={block.content}
                      onChange={(e) =>
                        updateContentBlock(block.id, e.target.value)
                      }
                      placeholder="Text content"
                      rows={3}
                      className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all resize-none"
                    />
                  )}
                  {block.type === "button" && (
                    <input
                      type="text"
                      value={block.content}
                      onChange={(e) =>
                        updateContentBlock(block.id, e.target.value)
                      }
                      placeholder="Button text"
                      className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all"
                    />
                  )}
                  {block.type === "image" && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={block.content}
                        onChange={(e) =>
                          updateContentBlock(block.id, e.target.value)
                        }
                        placeholder="Image URL"
                        className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all"
                      />
                      <p className="text-xs text-gray-500">
                        Enter the URL of the image
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add Content Block */}
            <div className="mt-6 pt-6 border-t border-gray-800">
              <p className="text-sm text-gray-400 mb-3">Add Content Block:</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => addContentBlock("heading")}
                  className="px-3 py-2 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-all text-sm font-medium"
                >
                  <Plus className="w-4 h-4 inline mr-1" />
                  Heading
                </button>
                <button
                  onClick={() => addContentBlock("text")}
                  className="px-3 py-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-all text-sm font-medium"
                >
                  <Plus className="w-4 h-4 inline mr-1" />
                  Text
                </button>
                <button
                  onClick={() => addContentBlock("image")}
                  className="px-3 py-2 bg-pink-500/10 border border-pink-500/30 text-pink-400 rounded-lg hover:bg-pink-500/20 transition-all text-sm font-medium"
                >
                  <Plus className="w-4 h-4 inline mr-1" />
                  Image
                </button>
                <button
                  onClick={() => addContentBlock("button")}
                  className="px-3 py-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg hover:bg-green-500/20 transition-all text-sm font-medium"
                >
                  <Plus className="w-4 h-4 inline mr-1" />
                  Button
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Page Settings */}
        <div className="space-y-6">
          {/* Page Info */}
          <div className="bg-black/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Page Info</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Page Title
                </label>
                <input
                  type="text"
                  value={pageData.title}
                  onChange={(e) =>
                    setPageData({ ...pageData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  value={pageData.slug}
                  onChange={(e) =>
                    setPageData({ ...pageData, slug: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* SEO Settings */}
          <div className="bg-black/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">SEO Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={pageData.metaTitle}
                  onChange={(e) =>
                    setPageData({ ...pageData, metaTitle: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: 50-60 characters
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Meta Description
                </label>
                <textarea
                  value={pageData.metaDescription}
                  onChange={(e) =>
                    setPageData({
                      ...pageData,
                      metaDescription: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: 150-160 characters
                </p>
              </div>
            </div>
          </div>

          {/* Page Status */}
          <div className="bg-black/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Page Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <span className="text-green-400 font-medium">Published</span>
                <span className="text-xs text-gray-400">Live on site</span>
              </div>
              <button className="w-full py-2 text-sm text-gray-400 hover:text-white border border-gray-700 rounded-lg hover:bg-gray-800 transition-all">
                Change Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
