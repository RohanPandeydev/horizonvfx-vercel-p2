"use client";
import React, { useState, useEffect } from "react";
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
import IconPicker from "@/components/admin/IconPicker";
import { useToast } from "@/lib/toast-context";

interface Service {
  title: string;
  description: string;
  icon: string;
  gradient: string;
  features: string[];
}

interface ProcessNode {
  id: number;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  details: string[];
}

interface ServicesContent {
  hero: {
    title: string;
    subtitle: string;
  };
  services: Service[];
  process: ProcessNode[];
}

const DEFAULT_CONTENT: ServicesContent = {
  hero: {
    title: "Our Services",
    subtitle: "From concept to final delivery, we provide comprehensive visual effects and animation services that bring your vision to life",
  },
  process: [
    {
      id: 0,
      title: "Concept & Pre-Production",
      description: "Where ideas take shape",
      icon: "💡",
      gradient: "from-cyan-500 to-blue-500",
      details: [
        "Creative consultation and concept development",
        "Storyboarding and previs",
        "Budget estimation and project planning",
        "Team allocation and resource management",
      ],
    },
    {
      id: 1,
      title: "Asset Creation",
      description: "Building the foundation",
      icon: "🎨",
      gradient: "from-blue-500 to-purple-500",
      details: [
        "3D modeling and texturing",
        "Character design and rigging",
        "Environment creation",
        "Asset library management",
      ],
    },
    {
      id: 2,
      title: "Animation & Simulation",
      description: "Bringing it to life",
      icon: "🎬",
      gradient: "from-purple-500 to-pink-500",
      details: [
        "Character animation",
        "Particle simulations",
        "Physics and dynamics",
        "Motion capture integration",
      ],
    },
    {
      id: 3,
      title: "Lighting & Rendering",
      description: "Setting the mood",
      icon: "✨",
      gradient: "from-pink-500 to-rose-500",
      details: [
        "Scene lighting setup",
        "Shader development",
        "Render farm optimization",
        "Multi-pass rendering",
      ],
    },
    {
      id: 4,
      title: "Compositing & VFX",
      description: "The magic happens",
      icon: "🔮",
      gradient: "from-rose-500 to-orange-500",
      details: [
        "Green screen keying",
        "Rotoscope and paint",
        "Color grading",
        "Final integration",
      ],
    },
    {
      id: 5,
      title: "Delivery & Support",
      description: "Ready for the world",
      icon: "🚀",
      gradient: "from-orange-500 to-yellow-500",
      details: [
        "Final quality checks",
        "Format conversion and delivery",
        "Client revisions",
        "Post-project support",
      ],
    },
  ],
  services: [
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
  ],
};

export default function ServicesPageEditor() {
  const { showSuccess, showError } = useToast();
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [activeTab, setActiveTab] = useState<"hero" | "services" | "process">("hero");
  const [content, setContent] = useState<ServicesContent>(DEFAULT_CONTENT);
  const [isLoading, setIsLoading] = useState(true);

  // Load content on mount
  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/pages/services");
      const result = await response.json();

      console.log("API Response:", result);

      if (result.success && result.data && result.data.content) {
        const loadedContent = result.data.content;

        // Ensure services is an array
        if (Array.isArray(loadedContent.services)) {
          setContent(loadedContent);
        } else {
          console.warn("Services data is not an array, using default");
          setContent(DEFAULT_CONTENT);
        }
      } else {
        console.log("No content found, using default");
        setContent(DEFAULT_CONTENT);
      }
    } catch (error) {
      console.error("Error loading content:", error);
      setContent(DEFAULT_CONTENT);
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
          slug: "services",
          title: "Services Page",
          content,
          published: true,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSaveStatus("saved");
        showSuccess("Services page saved successfully!");
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

  const updateContent = (
    section: keyof ServicesContent,
    data: Service[] | ProcessNode[] | Partial<ServicesContent['hero']>
  ) => {
    setContent((prev) => {
      // If section is 'services' or 'process', data is the entire array, not an object to merge
      if (section === 'services' || section === 'process') {
        return {
          ...prev,
          [section]: data,
        };
      }
      // For hero section, merge the object
      return {
        ...prev,
        [section]: { ...prev[section], ...data },
      };
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-600">Loading...</div>
      </div>
    );
  }

  const updateService = (index: number, field: string, value: any) => {
    const newServices = [...content.services];
    newServices[index] = { ...newServices[index], [field]: value };
    updateContent("services", newServices);
  };

  const updateServiceFeature = (serviceIndex: number, featureIndex: number, value: string) => {
    const newServices = [...content.services];
    newServices[serviceIndex].features[featureIndex] = value;
    updateContent("services", newServices);
  };

  const addServiceFeature = (serviceIndex: number) => {
    const newServices = [...content.services];
    newServices[serviceIndex].features.push("New feature");
    updateContent("services", newServices);
  };

  const removeServiceFeature = (serviceIndex: number, featureIndex: number) => {
    const newServices = [...content.services];
    newServices[serviceIndex].features = newServices[serviceIndex].features.filter(
      (_, idx) => idx !== featureIndex
    );
    updateContent("services", newServices);
  };

  const addService = () => {
    const gradients = [
      "from-cyan-500 to-blue-500",
      "from-blue-500 to-purple-500",
      "from-purple-500 to-pink-500",
      "from-pink-500 to-rose-500",
      "from-rose-500 to-orange-500",
      "from-orange-500 to-yellow-500",
    ];
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

    const newService: Service = {
      title: "New Service",
      description: "Service description goes here",
      icon: "🎯",
      gradient: randomGradient,
      features: ["Feature 1", "Feature 2"],
    };
    const newServices = [...content.services, newService];
    updateContent("services", newServices);
  };

  const removeService = (index: number) => {
    if (content.services.length <= 1) {
      showError("You must have at least one service");
      return;
    }
    const newServices = content.services.filter((_, idx) => idx !== index);
    updateContent("services", newServices);
  };

  const updateProcessNode = (index: number, field: string, value: any) => {
    const newProcess = [...content.process];
    newProcess[index] = { ...newProcess[index], [field]: value };
    updateContent("process", newProcess);
  };

  const updateProcessDetail = (nodeIndex: number, detailIndex: number, value: string) => {
    const newProcess = [...content.process];
    newProcess[nodeIndex].details[detailIndex] = value;
    updateContent("process", newProcess);
  };

  const addProcessDetail = (nodeIndex: number) => {
    const newProcess = [...content.process];
    newProcess[nodeIndex].details.push("New detail");
    updateContent("process", newProcess);
  };

  const removeProcessDetail = (nodeIndex: number, detailIndex: number) => {
    const newProcess = [...content.process];
    newProcess[nodeIndex].details = newProcess[nodeIndex].details.filter(
      (_, idx) => idx !== detailIndex
    );
    updateContent("process", newProcess);
  };

  const addProcessNode = () => {
    const gradients = [
      "from-cyan-500 to-blue-500",
      "from-blue-500 to-purple-500",
      "from-purple-500 to-pink-500",
      "from-pink-500 to-rose-500",
      "from-rose-500 to-orange-500",
      "from-orange-500 to-yellow-500",
    ];
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

    const newNode: ProcessNode = {
      id: (content.process?.length || 0),
      title: "New Process Step",
      description: "Step description",
      icon: "🎯",
      gradient: randomGradient,
      details: ["Detail 1", "Detail 2"],
    };
    const newProcess = [...(content.process || []), newNode];
    updateContent("process", newProcess);
  };

  const removeProcessNode = (index: number) => {
    const processArray = content.process || [];
    if (processArray.length <= 1) {
      showError("You must have at least one process step");
      return;
    }
    const newProcess = processArray.filter((_, idx) => idx !== index);
    // Reassign IDs
    newProcess.forEach((node, idx) => { node.id = idx; });
    updateContent("process", newProcess);
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
              onClick={() => setActiveTab("process")}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "process"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Settings size={18} />
              How We Work
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
                  value={content.hero.title}
                  onChange={(e) => updateContent("hero", { title: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder:text-black"
                  placeholder="Our Services"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Subtitle / Description
                </label>
                <textarea
                  value={content.hero.subtitle}
                  onChange={(e) => updateContent("hero", { subtitle: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-black placeholder:text-black"
                  placeholder="From concept to final delivery..."
                />
              </div>

              {/* Preview */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8 mt-6">
                <div className="text-center">
                  <h2 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-purple-200">
                    {content.hero.title || "Your Title Here"}
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    {content.hero.subtitle || "Your subtitle here"}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Process Section */}
          {activeTab === "process" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Add Process Node Button */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">How We Work - Process Steps</h3>
                  <p className="text-sm text-slate-600">Manage your workflow steps shown in the interactive flowchart</p>
                </div>
                <button
                  onClick={addProcessNode}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Plus size={18} />
                  Add Step
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {Array.isArray(content.process) && content.process.map((node, index) => (
                  <div
                    key={index}
                    className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4 relative"
                  >
                    {/* Delete Button */}
                    <button
                      onClick={() => removeProcessNode(index)}
                      className="absolute top-4 right-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove step"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div className="flex items-center gap-2 pr-10">
                      <GripVertical size={16} className="text-slate-400" />
                      <span className="text-sm font-semibold text-slate-700">
                        Step {index + 1}
                      </span>
                    </div>

                    <div>
                      <IconPicker
                        label="Icon"
                        value={node.icon}
                        onChange={(value) => updateProcessNode(index, "icon", value)}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1.5">
                        Title
                      </label>
                      <input
                        type="text"
                        value={node.title}
                        onChange={(e) => updateProcessNode(index, "title", e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder:text-black"
                        placeholder="Concept & Pre-Production"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1.5">
                        Description
                      </label>
                      <textarea
                        value={node.description}
                        onChange={(e) => updateProcessNode(index, "description", e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-black placeholder:text-black"
                        placeholder="Where ideas take shape"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1.5">
                        Gradient
                      </label>
                      <select
                        value={node.gradient}
                        onChange={(e) => updateProcessNode(index, "gradient", e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder:text-black"
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
                          Details
                        </label>
                        <button
                          onClick={() => addProcessDetail(index)}
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-purple-600 bg-purple-50 rounded hover:bg-purple-100 transition-colors"
                        >
                          <Plus size={12} />
                          Add Detail
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {node.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center gap-1">
                            <input
                              type="text"
                              value={detail}
                              onChange={(e) => updateProcessDetail(index, detailIndex, e.target.value)}
                              className="px-2 py-1 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder:text-black"
                              placeholder="Creative consultation"
                            />
                            {node.details.length > 1 && (
                              <button
                                onClick={() => removeProcessDetail(index, detailIndex)}
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
                      <div className="text-5xl mb-3">{node.icon}</div>
                      <h4 className={`text-xl font-bold bg-gradient-to-r ${node.gradient} bg-clip-text text-transparent mb-2`}>
                        {node.title}
                      </h4>
                      <p className="text-gray-400 text-sm mb-3">{node.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {node.details.map((detail, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-full bg-white/5 text-xs text-gray-300 border border-white/10"
                          >
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
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
              {/* Add Service Button */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Services Grid</h3>
                  <p className="text-sm text-slate-600">Add, edit, or remove services from the grid</p>
                </div>
                <button
                  onClick={addService}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Plus size={18} />
                  Add Service
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {Array.isArray(content.services) && content.services.map((service, index) => (
                  <div
                    key={index}
                    className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4 relative"
                  >
                    {/* Delete Button */}
                    <button
                      onClick={() => removeService(index)}
                      className="absolute top-4 right-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove service"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div className="flex items-center gap-2 pr-10">
                      <GripVertical size={16} className="text-slate-400" />
                      <span className="text-sm font-semibold text-slate-700">
                        Service {index + 1}
                      </span>
                    </div>

                    <div>
                      <IconPicker
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
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder:text-black"
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
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-black placeholder:text-black"
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
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder:text-black"
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
                              className="px-2 py-1 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder:text-black"
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
