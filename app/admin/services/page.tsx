"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Save,
  Eye,
  Settings,
  Plus,
  Trash2,
  GripVertical,
  Zap,
} from "lucide-react";
import Link from "next/link";
import EmojiPicker from "@/components/admin/EmojiPicker";

interface Service {
  title: string;
  description: string;
  icon: string;
  gradient: string;
  features: string[];
}

export default function ServicesPageEditor() {
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [activeTab, setActiveTab] = useState<"hero" | "services">("hero");

  // Hero Section State
  const [heroTitle, setHeroTitle] = useState("Our Services");
  const [heroSubtitle, setHeroSubtitle] = useState(
    "From concept to final delivery, we provide comprehensive visual effects and animation services that bring your vision to life"
  );

  // Services Grid State
  const [services, setServices] = useState<Service[]>([
    {
      title: "Visual Effects",
      description: "CGI, compositing, and green screen integration for films and commercials",
      icon: "🎥",
      gradient: "from-cyan-500 to-blue-500",
      features: ["Green Screen", "CGI", "Rotoscope", "Match Move"],
    },
    {
      title: "3D Animation",
      description: "Character animation, rigging, and motion graphics for any medium",
      icon: "🎬",
      gradient: "from-blue-500 to-purple-500",
      features: ["Character Rigging", "Motion Graphics", "Mocap", "Keyframe Animation"],
    },
    {
      title: "Game Cinematics",
      description: "High-impact cinematic sequences and trailers for gaming projects",
      icon: "🎮",
      gradient: "from-purple-500 to-pink-500",
      features: ["Real-time Renders", "Game Trailers", "Cutscenes", "Asset Creation"],
    },
    {
      title: "Pre-visualization",
      description: "Storyboard animation and previs to plan your shots effectively",
      icon: "📋",
      gradient: "from-pink-500 to-rose-500",
      features: ["Storyboarding", "3D Previs", "Techvis", "Postvis"],
    },
    {
      title: "Color Grading",
      description: "Professional color correction and grading for cinematic looks",
      icon: "🎨",
      gradient: "from-rose-500 to-orange-500",
      features: ["Color Correction", "Look Development", "HDR Grading", "Film Emulation"],
    },
    {
      title: "Virtual Production",
      description: "LED wall volumes and real-time rendering for on-set VFX",
      icon: "🖥️",
      gradient: "from-orange-500 to-yellow-500",
      features: ["LED Volumes", "Real-time Rendering", "Camera Tracking", "Virtual Sets"],
    },
  ]);

  const handleSave = () => {
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 1000);
  };

  const updateService = (index: number, field: string, value: any) => {
    const newServices = [...services];
    newServices[index] = { ...newServices[index], [field]: value };
    setServices(newServices);
  };

  const updateServiceFeature = (serviceIndex: number, featureIndex: number, value: string) => {
    const newServices = [...services];
    newServices[serviceIndex].features[featureIndex] = value;
    setServices(newServices);
  };

  const addServiceFeature = (serviceIndex: number) => {
    const newServices = [...services];
    newServices[serviceIndex].features.push("New feature");
    setServices(newServices);
  };

  const removeServiceFeature = (serviceIndex: number, featureIndex: number) => {
    const newServices = [...services];
    newServices[serviceIndex].features = newServices[serviceIndex].features.filter(
      (_, idx) => idx !== featureIndex
    );
    setServices(newServices);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <Settings className="text-purple-600" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Services Page</h1>
            <p className="text-sm text-slate-600">Manage services page content</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/services"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Eye size={18} />
            Preview Page
          </Link>
          <button
            onClick={handleSave}
            disabled={saveStatus === "saving"}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Zap size={18} />
              Hero Section
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "services"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Settings size={18} />
              Services Grid
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
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Our Services"
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
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="From concept to final delivery..."
                />
              </div>

              {/* Preview */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8 mt-6">
                <div className="text-center">
                  <h2 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-purple-200">
                    {heroTitle || "Your Title Here"}
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    {heroSubtitle || "Your subtitle here"}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Services Grid Section */}
          {activeTab === "services" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4"
                  >
                    <div className="flex items-center gap-2">
                      <GripVertical size={16} className="text-slate-400" />
                      <span className="text-sm font-semibold text-slate-700">
                        Service {index + 1}
                      </span>
                    </div>

                    <div>
                      <EmojiPicker
                        label="Icon"
                        value={service.icon}
                        onChange={(value) => updateService(index, "icon", value)}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1.5">
                        Title
                      </label>
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) => updateService(index, "title", e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Visual Effects"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1.5">
                        Description
                      </label>
                      <textarea
                        value={service.description}
                        onChange={(e) => updateService(index, "description", e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        placeholder="CGI, compositing, and green screen integration..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1.5">
                        Gradient
                      </label>
                      <select
                        value={service.gradient}
                        onChange={(e) => updateService(index, "gradient", e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="from-cyan-500 to-blue-500">Cyan to Blue</option>
                        <option value="from-blue-500 to-purple-500">Blue to Purple</option>
                        <option value="from-purple-500 to-pink-500">Purple to Pink</option>
                        <option value="from-pink-500 to-rose-500">Pink to Rose</option>
                        <option value="from-rose-500 to-orange-500">Rose to Orange</option>
                        <option value="from-orange-500 to-yellow-500">Orange to Yellow</option>
                      </select>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-medium text-slate-600">
                          Features
                        </label>
                        <button
                          onClick={() => addServiceFeature(index)}
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-purple-600 bg-purple-50 rounded hover:bg-purple-100 transition-colors"
                        >
                          <Plus size={12} />
                          Add Feature
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-1">
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) => updateServiceFeature(index, featureIndex, e.target.value)}
                              className="px-2 py-1 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="Green Screen"
                            />
                            {service.features.length > 1 && (
                              <button
                                onClick={() => removeServiceFeature(index, featureIndex)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                              >
                                <Trash2 size={12} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Preview */}
                    <div className="bg-zinc-900 rounded-lg p-4">
                      <div className="text-5xl mb-3">{service.icon}</div>
                      <h4 className={`text-xl font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent mb-2`}>
                        {service.title}
                      </h4>
                      <p className="text-gray-400 text-sm mb-3">{service.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {service.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-full bg-white/5 text-xs text-gray-300 border border-white/10"
                          >
                            {feature}
                          </span>
                        ))}
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
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-purple-900 mb-2">💡 Tips</h3>
        <ul className="text-sm text-purple-800 space-y-1">
          <li>• The process flowchart is automatically generated from your services grid.</li>
          <li>• Services appear in a 3-column grid on the page.</li>
          <li>• Use descriptive features to help clients understand your capabilities.</li>
          <li>• Each service can have multiple features/tags for better organization.</li>
        </ul>
      </div>
    </div>
  );
}
