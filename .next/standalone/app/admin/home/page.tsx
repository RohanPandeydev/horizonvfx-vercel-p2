"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Save,
  Eye,
  Home,
  Upload,
  Plus,
  Trash2,
  GripVertical,
  Film,
  Image as ImageIcon,
  Play,
  X,
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/lib/toast-context";
import VideoModal from "@/components/VideoModal";

interface ClientLogo {
  url: string;
}

interface HomePageContent {
  hero: {
    videoUrl: string;
    tagline: string;
  };
  clients: ClientLogo[];
}

interface HomePageSections {
  showExcellence: boolean;
  showLeadership: boolean;
  showTechStack: boolean;
  showStats: boolean;
  showProjects: boolean;
  showShowreel: boolean;
  showClients: boolean;
}

const DEFAULT_CONTENT: HomePageContent = {
  hero: {
    videoUrl: "https://www.horizonvfx.in/images/Video1.mp4",
    tagline: "Visual Effects • Animation • Post Production",
  },
  clients: [
    { url: "https://horizonvfx.in/images/c-logo1.jpg" },
    { url: "https://horizonvfx.in/images/c-logo2.jpg" },
    { url: "https://horizonvfx.in/images/c-logo3.jpg" },
    { url: "https://horizonvfx.in/images/c-logo4.jpg" },
  ],
};

const DEFAULT_SECTIONS: HomePageSections = {
  showExcellence: true,
  showLeadership: true,
  showTechStack: true,
  showStats: true,
  showProjects: true,
  showShowreel: true,
  showClients: true,
};

const DEFAULT_TOP_SERVICES = [
  "VFX & Compositing",
  "3D Animation",
  "Motion Graphics",
  "Color Grading",
  "Virtual Production",
  "CGI & VFX",
];

const DEFAULT_BOTTOM_SERVICES = [
  "Rotoscopy",
  "Paint",
  "Matchmoving",
  "Stereo Conversion",
  "Game Art",
];

export default function HomePageEditor() {
  const { showSuccess, showError } = useToast();
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [activeTab, setActiveTab] = useState<"hero" | "marquee" | "clients" | "sections">("hero");
  const [content, setContent] = useState<HomePageContent>(DEFAULT_CONTENT);
  const [sections, setSections] = useState<HomePageSections>(DEFAULT_SECTIONS);
  const [isLoading, setIsLoading] = useState(true);
  const [topServices] = useState<string[]>(DEFAULT_TOP_SERVICES);
  const [bottomServices] = useState<string[]>(DEFAULT_BOTTOM_SERVICES);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Load content on mount
  useEffect(() => {
    loadContent();
    loadSections();
  }, []);

  const loadContent = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/pages/home");
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

  const loadSections = async () => {
    try {
      const response = await fetch("/api/home/config");
      const result = await response.json();

      if (result.success && result.data) {
        setSections(result.data);
      }
    } catch (error) {
      console.error("Error loading sections:", error);
    }
  };

  const handleSave = async () => {
    try {
      setSaveStatus("saving");

      // Save both content and sections
      await Promise.all([
        fetch("/api/admin/pages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug: "home",
            title: "Home Page",
            content,
            published: true,
          }),
        }),
        fetch("/api/home/config", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sections),
        }),
      ]);

      setSaveStatus("saved");
      showSuccess("Home page saved successfully!");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (error) {
      setSaveStatus("idle");
      const message =
        error instanceof Error ? error.message : "Failed to save content";
      showError(message);
    }
  };

  const updateContent = (
    section: keyof HomePageContent,
    data: ClientLogo[] | Partial<HomePageContent['hero']>
  ) => {
    setContent((prev) => {
      if (section === 'clients') {
        return {
          ...prev,
          clients: data as ClientLogo[],
        };
      }
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

  const updateClient = (index: number, value: string) => {
    const newClients = [...content.clients];
    newClients[index] = { url: value };
    updateContent("clients", newClients);
  };

  const addClient = () => {
    const newClients = [...content.clients, { url: "" }];
    updateContent("clients", newClients);
  };

  const removeClient = (index: number) => {
    if (content.clients.length > 1) {
      const newClients = content.clients.filter((_, i) => i !== index);
      updateContent("clients", newClients);
    }
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'videoUrl' | 'clientLogo',
    index?: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a temporary URL for preview
      const url = URL.createObjectURL(file);
      if (field === 'videoUrl') {
        updateContent('hero', { videoUrl: url });
      } else if (field === 'clientLogo' && typeof index === 'number') {
        updateClient(index, url);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Home className="text-blue-600" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Home Page</h1>
            <p className="text-sm text-slate-600">Manage home page content</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Eye size={18} />
            Preview Page
          </Link>
          <button
            onClick={handleSave}
            disabled={saveStatus === "saving"}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Film size={18} />
              Hero Section
            </button>
            <button
              onClick={() => setActiveTab("marquee")}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "marquee"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Home size={18} />
              Marquee
            </button>
            <button
              onClick={() => setActiveTab("clients")}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "clients"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <ImageIcon size={18} />
              Our Clients
            </button>
            <button
              onClick={() => setActiveTab("sections")}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "sections"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Home size={18} />
              Sections
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
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> The hero section displays the main video background and tagline. The main heading "Where Creative Meets Horizon" is built into the design.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Hero Background Video
                </label>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <label className="flex-1">
                      <div className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                        <Upload size={20} className="text-slate-400" />
                        <span className="text-sm text-slate-600">
                          Upload new video (MP4)
                        </span>
                      </div>
                      <input
                        type="file"
                        accept="video/mp4,video/webm"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'videoUrl')}
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    value={content.hero.videoUrl}
                    onChange={(e) => updateContent('hero', { videoUrl: e.target.value })}
                    className="w-full px-4 py-3 text-black border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-black"
                    placeholder="https://www.horizonvfx.in/images/Video1.mp4"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tagline / Subtitle
                </label>
                <input
                  type="text"
                  value={content.hero.tagline}
                  onChange={(e) => updateContent('hero', { tagline: e.target.value })}
                  className="w-full px-4 py-3 text-black border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-black"
                  placeholder="Visual Effects • Animation • Post Production"
                />
              </div>

              {/* Preview */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8 mt-6">
                <div className="text-right">
                  <div className="text-4xl md:text-5xl font-bold mb-4">
                    <span className="text-white">Where</span>{" "}
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-light italic">
                      Creative
                    </span>{" "}
                    <span className="text-white">Meets</span>{" "}
                    <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                      Horizon
                    </span>
                  </div>
                  <p className="text-gray-300 text-lg">
                    {content.hero.tagline || "Your tagline here"}
                  </p>
                </div>
              </div>

              {/* Video Preview */}
              {content.hero.videoUrl && (
                <div className="bg-zinc-900 rounded-xl overflow-hidden relative group">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-64 object-cover"
                    src={content.hero.videoUrl}
                  />
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/50 hover:bg-white/30 transition-colors">
                      <Play className="text-white" size={32} fill="white" />
                    </div>
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* Marquee Section */}
          {activeTab === "marquee" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> The services marquee displays scrolling text. The current services are displayed in two rows moving in opposite directions.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Top Row Services (Left to Right)
                </label>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  {topServices.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-white rounded-lg border border-slate-200"
                    >
                      <GripVertical size={16} className="text-slate-400" />
                      <span className="text-sm font-medium text-slate-700 flex-1">
                        {service}
                      </span>
                      <span className="text-xs text-slate-500">Fixed item</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Bottom Row Services (Right to Left)
                </label>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  {bottomServices.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-white rounded-lg border border-slate-200"
                    >
                      <GripVertical size={16} className="text-slate-400" />
                      <span className="text-sm font-medium text-slate-700 flex-1">
                        {service}
                      </span>
                      <span className="text-xs text-slate-500">Fixed item</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Marquee Preview */}
              <div className="bg-gradient-to-b from-black via-zinc-900 to-black rounded-xl p-8 overflow-hidden">
                <div className="flex overflow-hidden mb-4">
                  <div className="flex gap-8 whitespace-nowrap items-center">
                    {[...topServices, ...topServices].map((service, i) => (
                      <span
                        key={i}
                        className="text-3xl font-bold text-transparent select-none"
                        style={{
                          WebkitTextStroke: "1px rgba(255,255,255,0.3)",
                        }}
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex overflow-hidden">
                  <div className="flex gap-8 whitespace-nowrap items-center">
                    {[...bottomServices, ...bottomServices].map((service, i) => (
                      <span
                        key={i}
                        className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-green-200 bg-clip-text text-transparent select-none"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Clients Section */}
          {activeTab === "clients" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-slate-700">
                  Client Logos
                </label>
                <button
                  onClick={addClient}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Plus size={14} />
                  Add Client
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {content.clients.map((client, index) => (
                  <div
                    key={index}
                    className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <GripVertical size={16} className="text-slate-400" />
                      <span className="text-sm font-semibold text-slate-700">
                        Client {index + 1}
                      </span>
                      {content.clients.length > 1 && (
                        <button
                          onClick={() => removeClient(index)}
                          className="ml-auto p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1.5">
                        Upload Logo Image
                      </label>
                      <label className="block">
                        <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                          <Upload size={16} className="text-slate-400" />
                          <span className="text-xs text-slate-600">
                            Choose image
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, 'clientLogo', index)}
                        />
                      </label>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1.5">
                        Or enter image URL
                      </label>
                      <input
                        type="text"
                        value={client.url}
                        onChange={(e) => updateClient(index, e.target.value)}
                        className="w-full px-3 py-2 text-sm text-black border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-black"
                        placeholder="https://horizonvfx.in/images/c-logo1.jpg"
                      />
                    </div>

                    {/* Preview */}
                    <div className="bg-zinc-900 rounded-lg p-4">
                      {client.url ? (
                        <img
                          src={client.url}
                          alt={`Client ${index + 1}`}
                          className="w-full h-24 object-contain rounded"
                        />
                      ) : (
                        <div className="w-full h-24 flex items-center justify-center text-gray-600 text-sm">
                          No image
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Sections Selection */}
          {activeTab === "sections" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Toggle which sections should be displayed on the home page. Changes are reflected immediately after saving.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Home Page Sections</h3>

                {/* Section Toggles */}
                {[
                  { key: 'showProjects', label: 'Projects Section', description: 'Featured projects from showcase (3D Parallax Cards)' },
                  { key: 'showShowreel', label: 'Showreel Section', description: 'Showreel grid display' },
                  { key: 'showClients', label: 'Clients Section', description: 'Client logos marquee slider' },
                  { key: 'showExcellence', label: 'Excellence Section', description: 'From About page - Excellence in Every Frame' },
                  { key: 'showTechStack', label: 'Tech Stack Section', description: 'From Showcase page - Our Tech Stack & Stats' },
                  { key: 'showStats', label: 'Stats Section', description: 'Industry statistics from Showcase' },
                  { key: 'showLeadership', label: 'Leadership Section', description: 'From Team page - Leadership members' },
                ].map((section) => (
                  <div
                    key={section.key}
                    className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">{section.label}</div>
                      <div className="text-sm text-slate-600">{section.description}</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sections[section.key as keyof HomePageSections]}
                        onChange={(e) => setSections({
                          ...sections,
                          [section.key]: e.target.checked
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">💡 Tips</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Upload high-quality videos for better visual appeal (recommended format: MP4, WebM).</li>
          <li>• Client logos should be in PNG or JPG format with transparent backgrounds preferred.</li>
          <li>• The marquee services are fixed to maintain design consistency.</li>
          <li>• Hero video should be optimized for web (recommended size: under 10MB).</li>
        </ul>
      </div>

      {/* Video Modal */}
      {content.hero.videoUrl && (
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          videoUrl={content.hero.videoUrl}
          title="Hero Background Video"
          thumbnail=""
        />
      )}
    </div>
  );
}
