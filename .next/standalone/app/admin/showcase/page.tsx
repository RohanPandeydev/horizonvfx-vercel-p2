"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Save,
  Eye,
  Film,
  Image,
  Plus,
  Trash2,
  GripVertical,
  Monitor,
  Upload,
} from "lucide-react";
import Link from "next/link";
import IconPicker from "@/components/admin/IconPicker";
import { useToast } from "@/lib/toast-context";

interface Service {
  icon: string;
  name: string;
  count: string;
}

interface Tech {
  name: string;
  icon: string;
  color: string;
}

interface Industry {
  title: string;
  image: string;
}

interface ShowcaseContent {
  hero: {
    title: string;
    subtitle: string;
  };
  services: Service[];
  techStack: Tech[];
  industries: Industry[];
}

const DEFAULT_CONTENT: ShowcaseContent = {
  hero: {
    title: "Our Showcase",
    subtitle: "Explore our portfolio of visual effects and animation projects that push the boundaries of creativity",
  },
  services: [
    { icon: "🎬", name: "Film & OTT", count: "100+" },
    { icon: "🎮", name: "Gaming", count: "50+" },
    { icon: "📺", name: "Commercial", count: "200+" },
    { icon: "🖥️", name: "Unreal Engine", count: "30+" },
  ],
  techStack: [
    { name: "After Effects", icon: "🎨", color: "from-purple-500 to-blue-500" },
    { name: "Nuke", icon: "💣", color: "from-blue-500 to-cyan-500" },
    { name: "Maya", icon: "🔷", color: "from-cyan-500 to-teal-500" },
    { name: "Unreal Engine", icon: "🎮", color: "from-red-500 to-orange-500" },
    { name: "Houdini", icon: "🌀", color: "from-orange-500 to-yellow-500" },
    { name: "Blender", icon: "🔶", color: "from-yellow-500 to-green-500" },
    { name: "Cinema 4D", icon: "📦", color: "from-green-500 to-emerald-500" },
    { name: "Substance", icon: "🎭", color: "from-pink-500 to-rose-500" },
  ],
  industries: [
    { title: "Film and OTT", image: "https://horizonvfx.in/images/flm.png" },
    { title: "Game", image: "https://horizonvfx.in/images/game.jpg" },
    { title: "Commercial", image: "https://horizonvfx.in/images/Commercial.jpg" },
    { title: "Unreal", image: "https://horizonvfx.in/images/unreal.jpg" },
  ],
};

export default function ShowcasePageEditor() {
  const { showSuccess, showError } = useToast();
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [activeTab, setActiveTab] = useState<
    "hero" | "services" | "industries" | "technologies"
  >("hero");
  const [content, setContent] = useState<ShowcaseContent>(DEFAULT_CONTENT);
  const [isLoading, setIsLoading] = useState(true);

  // Load content on mount
  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/pages/showcase");
      const result = await response.json();

      if (result.success && result.data && result.data.content) {
        setContent(result.data.content);
      }
    } catch (error) {
      console.error("Error loading content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaveStatus("saving");

      const response = await fetch("/api/admin/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: "showcase",
          title: "Showcase Page",
          content,
          published: true,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSaveStatus("saved");
        showSuccess("Showcase page saved successfully!");
        setTimeout(() => setSaveStatus("idle"), 2000);
      } else {
        throw new Error(result.error || "Failed to save");
      }
    } catch (error) {
      setSaveStatus("idle");
      const message =
        error instanceof Error ? error.message : "Failed to save content";
      showError(message);
    }
  };

  const updateService = (index: number, field: string, value: string) => {
    setContent((prev) => ({
      ...prev,
      services: prev.services.map((service, i) =>
        i === index ? { ...service, [field]: value } : service
      ),
    }));
  };

  const updateIndustry = (index: number, field: string, value: string) => {
    setContent((prev) => ({
      ...prev,
      industries: prev.industries.map((industry, i) =>
        i === index ? { ...industry, [field]: value } : industry
      ),
    }));
  };

  const updateTechnology = (index: number, field: string, value: string) => {
    setContent((prev) => ({
      ...prev,
      techStack: prev.techStack.map((tech, i) =>
        i === index ? { ...tech, [field]: value } : tech
      ),
    }));
  };

  const addTechnology = () => {
    setContent((prev) => ({
      ...prev,
      techStack: [
        ...prev.techStack,
        {
          name: "New Technology",
          icon: "⚡",
          color: "from-blue-500 to-purple-500",
        },
      ],
    }));
  };

  const removeTechnology = (index: number) => {
    if (content.techStack.length > 1) {
      setContent((prev) => ({
        ...prev,
        techStack: prev.techStack.filter((_, i) => i !== index),
      }));
    }
  };

  const handleIndustryFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 2MB)
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        showError("Image size must be less than 2MB");
        return;
      }

      // For now, create a temporary URL for preview
      // In production, this would upload to S3
      const url = URL.createObjectURL(file);
      updateIndustry(index, "image", url);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
            <Film className="text-orange-600" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Showcase Page</h1>
            <p className="text-sm text-slate-600">Manage showcase page content</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/showcase"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Eye size={18} />
            Preview Page
          </Link>
          <button
            onClick={handleSave}
            disabled={saveStatus === "saving"}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save size={18} />
            {saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-200">
          <nav className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab("hero")}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "hero"
                  ? "border-orange-600 text-orange-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Monitor size={18} />
              Hero Section
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "services"
                  ? "border-orange-600 text-orange-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Image size={18} />
              Service Stats
            </button>
            <button
              onClick={() => setActiveTab("industries")}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "industries"
                  ? "border-orange-600 text-orange-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Image size={18} />
              Industries
            </button>
            <button
              onClick={() => setActiveTab("technologies")}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "technologies"
                  ? "border-orange-600 text-orange-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Monitor size={18} />
              Technologies
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Hero Section */}
          {activeTab === "hero" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Page Title
                </label>
                <input
                  type="text"
                  value={content.hero.title}
                  onChange={(e) => setContent((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, title: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black placeholder:text-black"
                  placeholder="Our Showcase"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Subtitle / Description
                </label>
                <textarea
                  value={content.hero.subtitle}
                  onChange={(e) => setContent((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, subtitle: e.target.value }
                  }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-black placeholder:text-black"
                  placeholder="Explore our portfolio..."
                />
              </div>

              {/* Preview */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8 mt-6">
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                    {content.hero.title || "Your Title Here"}
                  </h2>
                  <p className="text-xl text-gray-300">
                    {content.hero.subtitle || "Your subtitle here"}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Service Stats Section */}
          {activeTab === "services" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Service Statistics Cards
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {content.services.map((service, index) => (
                    <div
                      key={index}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3"
                    >
                      <div className="flex items-center gap-2">
                        <GripVertical size={16} className="text-slate-400" />
                        <span className="text-sm font-semibold text-slate-700">
                          Service {index + 1}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <IconPicker
                            label="Icon"
                            value={service.icon}
                            onChange={(value) => updateService(index, "icon", value)}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1.5">
                            Count
                          </label>
                          <input
                            type="text"
                            value={service.count}
                            onChange={(e) => updateService(index, "count", e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black placeholder:text-black"
                            placeholder="100+"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
                          Service Name
                        </label>
                        <input
                          type="text"
                          value={service.name}
                          onChange={(e) => updateService(index, "name", e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black placeholder:text-black"
                          placeholder="Film & OTT"
                        />
                      </div>

                      {/* Preview */}
                      <div className="bg-zinc-900 rounded-lg p-4 text-center">
                        <div className="text-3xl mb-2">{service.icon}</div>
                        <div className="text-2xl font-bold text-white">{service.count}</div>
                        <div className="text-sm text-gray-400">{service.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Industries Section */}
          {activeTab === "industries" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Industries We Serve
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {content.industries.map((industry, index) => (
                    <div
                      key={index}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3"
                    >
                      <div className="flex items-center gap-2">
                        <GripVertical size={16} className="text-slate-400" />
                        <span className="text-sm font-semibold text-slate-700">
                          Industry {index + 1}
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
                          Title
                        </label>
                        <input
                          type="text"
                          value={industry.title}
                          onChange={(e) => updateIndustry(index, "title", e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black placeholder:text-black"
                          placeholder="Film and OTT"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
                          Upload Image
                        </label>
                        <label className="block">
                          <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors">
                            <Upload size={16} className="text-slate-400" />
                            <span className="text-xs text-slate-600">
                              Choose image (JPG, PNG, WebP)
                            </span>
                          </div>
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                            onChange={(e) => handleIndustryFileUpload(e, index)}
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
                          Or enter image URL
                        </label>
                        <input
                          type="text"
                          value={industry.image}
                          onChange={(e) => updateIndustry(index, "image", e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black placeholder:text-black"
                          placeholder="https://horizonvfx.in/images/flm.png"
                        />
                      </div>

                      {/* Preview */}
                      <div className="aspect-square bg-zinc-900 rounded-lg overflow-hidden">
                        {industry.image ? (
                          <img src={industry.image} alt={industry.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-600">
                            No image
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Technologies Section */}
          {activeTab === "technologies" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-slate-700">
                  Tech Stack / Tools
                </label>
                <button
                  onClick={addTechnology}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                >
                  <Plus size={14} />
                  Add Technology
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {content.techStack.map((tech, index) => (
                  <div
                    key={index}
                    className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <GripVertical size={16} className="text-slate-400" />
                      <span className="text-xs font-semibold text-slate-700">
                        Tech {index + 1}
                      </span>
                      {content.techStack.length > 1 && (
                        <button
                          onClick={() => removeTechnology(index)}
                          className="ml-auto p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>

                    <div>
                      <IconPicker
                        label="Icon"
                        value={tech.icon}
                        onChange={(value) => updateTechnology(index, "icon", value)}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1.5">
                        Name
                      </label>
                      <input
                        type="text"
                        value={tech.name}
                        onChange={(e) => updateTechnology(index, "name", e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black placeholder:text-black"
                        placeholder="After Effects"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1.5">
                        Gradient
                      </label>
                      <select
                        value={tech.color}
                        onChange={(e) => updateTechnology(index, "color", e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="from-purple-500 to-blue-500">Purple to Blue</option>
                        <option value="from-blue-500 to-cyan-500">Blue to Cyan</option>
                        <option value="from-cyan-500 to-teal-500">Cyan to Teal</option>
                        <option value="from-red-500 to-orange-500">Red to Orange</option>
                        <option value="from-orange-500 to-yellow-500">Orange to Yellow</option>
                        <option value="from-yellow-500 to-green-500">Yellow to Green</option>
                        <option value="from-green-500 to-emerald-500">Green to Emerald</option>
                        <option value="from-pink-500 to-rose-500">Pink to Rose</option>
                      </select>
                    </div>

                    {/* Preview */}
                    <div className="bg-zinc-900 rounded-lg p-4 text-center">
                      <div className="text-4xl mb-2">{tech.icon}</div>
                      <div className={`text-sm font-semibold bg-gradient-to-r ${tech.color} bg-clip-text text-transparent`}>
                        {tech.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-orange-900 mb-2">💡 Tips</h3>
        <ul className="text-sm text-orange-800 space-y-1">
          <li>• Projects are managed through the Media section - upload and organize your showcase projects there.</li>
          <li>• Service stats display key metrics that build credibility with visitors.</li>
          <li>• Use high-quality images for industries (recommended ratio 1:1 for square cards).</li>
          <li>• Gradients create visual hierarchy - choose colors that match your brand.</li>
        </ul>
      </div>
    </div>
  );
}
