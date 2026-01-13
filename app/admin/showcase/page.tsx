"use client";
import React, { useState } from "react";
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
} from "lucide-react";
import Link from "next/link";
import IconPicker from "@/components/admin/IconPicker";

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

export default function ShowcasePageEditor() {
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [activeTab, setActiveTab] = useState<
    "hero" | "services" | "industries" | "technologies"
  >("hero");

  // Hero Section State
  const [heroTitle, setHeroTitle] = useState("Our Showcase");
  const [heroSubtitle, setHeroSubtitle] = useState(
    "Explore our portfolio of visual effects and animation projects that push the boundaries of creativity"
  );

  // Services Stats State
  const [services, setServices] = useState<Service[]>([
    { icon: "🎬", name: "Film & OTT", count: "100+" },
    { icon: "🎮", name: "Gaming", count: "50+" },
    { icon: "📺", name: "Commercial", count: "200+" },
    { icon: "🖥️", name: "Unreal Engine", count: "30+" },
  ]);

  // Industries State
  const [industries, setIndustries] = useState<Industry[]>([
    { title: "Film and OTT", image: "https://horizonvfx.in/images/flm.png" },
    { title: "Game", image: "https://horizonvfx.in/images/game.jpg" },
    { title: "Commercial", image: "https://horizonvfx.in/images/Commercial.jpg" },
    { title: "Unreal", image: "https://horizonvfx.in/images/unreal.jpg" },
  ]);

  // Technologies State
  const [technologies, setTechnologies] = useState<Tech[]>([
    { name: "After Effects", icon: "🎨", color: "from-purple-500 to-blue-500" },
    { name: "Nuke", icon: "💣", color: "from-blue-500 to-cyan-500" },
    { name: "Maya", icon: "🔷", color: "from-cyan-500 to-teal-500" },
    { name: "Unreal Engine", icon: "🎮", color: "from-red-500 to-orange-500" },
    { name: "Houdini", icon: "🌀", color: "from-orange-500 to-yellow-500" },
    { name: "Blender", icon: "🔶", color: "from-yellow-500 to-green-500" },
    { name: "Cinema 4D", icon: "📦", color: "from-green-500 to-emerald-500" },
    { name: "Substance", icon: "🎭", color: "from-pink-500 to-rose-500" },
  ]);

  const handleSave = () => {
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 1000);
  };

  const updateService = (index: number, field: string, value: string) => {
    const newServices = [...services];
    newServices[index] = { ...newServices[index], [field]: value };
    setServices(newServices);
  };

  const updateIndustry = (index: number, field: string, value: string) => {
    const newIndustries = [...industries];
    newIndustries[index] = { ...newIndustries[index], [field]: value };
    setIndustries(newIndustries);
  };

  const updateTechnology = (index: number, field: string, value: string) => {
    const newTechs = [...technologies];
    newTechs[index] = { ...newTechs[index], [field]: value };
    setTechnologies(newTechs);
  };

  const addTechnology = () => {
    setTechnologies([
      ...technologies,
      {
        name: "New Technology",
        icon: "⚡",
        color: "from-blue-500 to-purple-500",
      },
    ]);
  };

  const removeTechnology = (index: number) => {
    if (technologies.length > 1) {
      setTechnologies(technologies.filter((_, i) => i !== index));
    }
  };

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
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black placeholder:text-black"
                  placeholder="Our Showcase"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Subtitle / Description
                </label>
                <textarea
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-black placeholder:text-black"
                  placeholder="Explore our portfolio..."
                />
              </div>

              {/* Preview */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8 mt-6">
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                    {heroTitle || "Your Title Here"}
                  </h2>
                  <p className="text-xl text-gray-300">
                    {heroSubtitle || "Your subtitle here"}
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
                  {services.map((service, index) => (
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
                          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-black"
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
                  {industries.map((industry, index) => (
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
                          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-black"
                          placeholder="Film and OTT"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
                          Image URL
                        </label>
                        <input
                          type="text"
                          value={industry.image}
                          onChange={(e) => updateIndustry(index, "image", e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-black"
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
                {technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <GripVertical size={16} className="text-slate-400" />
                      <span className="text-xs font-semibold text-slate-700">
                        Tech {index + 1}
                      </span>
                      {technologies.length > 1 && (
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
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-black"
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
