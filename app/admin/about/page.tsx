"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Eye, Type, BookOpen, Star, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/lib/toast-context";
import FileUpload from "@/components/admin/FileUpload";
import EmojiPicker from "@/components/admin/EmojiPicker";

interface FeatureCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  gradient: string;
}

interface StatsCard {
  id: number;
  value: string;
  label: string;
  icon: string;
}

interface AboutContent {
  hero: {
    title: string;
    subtitle: string;
  };
  story: {
    heading: string;
    paragraphs: string[];
    image: string;
    yearsBadge: string;
    yearsLabel: string;
  };
  excellence: {
    heading: string;
    description: string;
    featureCards: FeatureCard[];
  };
  stats: {
    statsCards: StatsCard[];
  };
  journey: {
    heading: string;
    paragraphs: string[];
    missionCard: {
      title: string;
      description: string;
      icon: string;
      gradient: string;
    };
    visionCard: {
      title: string;
      description: string;
      icon: string;
      gradient: string;
    };
    valuesCard: {
      title: string;
      description: string;
      icon: string;
      gradient: string;
    };
  };
  features: {
    heading: string;
    whyChooseUsCards: FeatureCard[];
  };
}

const DEFAULT_CONTENT: AboutContent = {
  hero: {
    title: "About HorizonVFX",
    subtitle: "Where the magic of imagination meets the precision of expertise",
  },
  story: {
    heading: "Our Story",
    paragraphs: [
      "Welcome to HorizonVFX, where the magic of imagination meets the precision of expertise. Born from the collective brilliance of a group of freelance artists with over two decades of industry mastery, we have embarked on a journey to redefine the very fabric of visual storytelling through cutting-edge visual effects.",
      "Our tale begins with a passion for transforming dreams into reality. With each stroke of creativity and pixel perfected, our team of seasoned artists has sculpted a narrative that goes beyond the ordinary. We are not just a VFX company; we are architects of awe, crafting cinematic experiences that linger in the hearts and minds of audiences.",
    ],
    image: "https://horizonvfx.in/images/about-us1.jpg",
    yearsBadge: "20+",
    yearsLabel: "Years",
  },
  excellence: {
    heading: "Excellence in Every Frame",
    description:
      "At the heart of our success lies a commitment to excellence that extends from the inception to the completion of each project",
    featureCards: [
      {
        id: 1,
        title: "Comprehensive Services",
        description:
          "We seamlessly navigate the entire spectrum of visual effects, offering comprehensive pre to post-production services.",
        icon: "🎬",
        gradient: "from-blue-500 to-cyan-500",
      },
      {
        id: 2,
        title: "Vast Talent Pool",
        description:
          "With over 500 artists in our bank, each a virtuoso in their own right, we possess the capacity to undertake any project with unparalleled finesse.",
        icon: "👨‍🎨",
        gradient: "from-green-500 to-emerald-500",
      },
      {
        id: 3,
        title: "Innovation First",
        description:
          "Our diverse pool of creative minds, coupled with a commitment to staying at the forefront of industry trends, ensures innovation in every frame.",
        icon: "💡",
        gradient: "from-purple-500 to-pink-500",
      },
      {
        id: 4,
        title: "Collaborative Excellence",
        description:
          "We extend our expertise by offering clients access to our curated roster of artists, adding an extra layer of precision and creative flair.",
        icon: "🤝",
        gradient: "from-orange-500 to-red-500",
      },
    ],
  },
  stats: {
    statsCards: [
      { id: 1, value: "500+", label: "Projects Delivered", icon: "🎬" },
      { id: 2, value: "50+", label: "Happy Clients", icon: "🏆" },
      { id: 3, value: "100+", label: "Team Members", icon: "👥" },
      { id: 4, value: "10+", label: "Years Experience", icon: "⭐" },
    ],
  },
  journey: {
    heading: "Our Journey",
    paragraphs: [
      "Founded in 2013, HorizonVFX emerged from a passion for pushing the boundaries of visual storytelling. What started as a small team of dreamers has evolved into a powerhouse of creativity and technical excellence.",
      "Today, we stand at the forefront of the VFX industry, combining artistry with cutting-edge technology to create visual experiences that inspire and amaze. Our journey continues as we explore new horizons in virtual production, real-time rendering, and AI-assisted visual effects.",
    ],
    missionCard: {
      title: "Our Mission",
      description: "Redefining visual storytelling",
      icon: "🎯",
      gradient: "from-blue-500 to-green-500",
    },
    visionCard: {
      title: "Our Vision",
      description: "To be the global leader in VFX innovation",
      icon: "👁️",
      gradient: "from-purple-500 to-pink-500",
    },
    valuesCard: {
      title: "Our Values",
      description: "Excellence, Innovation, Collaboration",
      icon: "💎",
      gradient: "from-cyan-500 to-blue-500",
    },
  },
  features: {
    heading: "Why Choose Us",
    whyChooseUsCards: [
      {
        id: 1,
        icon: "🚀",
        title: "Cutting-Edge Technology",
        description:
          "We leverage the latest VFX software and AI-powered tools to create stunning visual effects that push creative boundaries.",
        gradient: "from-blue-400 to-cyan-400",
      },
      {
        id: 2,
        icon: "🎨",
        title: "Creative Excellence",
        description:
          "Our team of visionary artists and technicians craft immersive visual experiences that captivate audiences worldwide.",
        gradient: "from-purple-400 to-pink-400",
      },
      {
        id: 3,
        icon: "⚡",
        title: "Lightning-Fast Delivery",
        description:
          "With optimized workflows and state-of-the-art rendering farms, we deliver exceptional results on time, every time.",
        gradient: "from-green-400 to-emerald-400",
      },
      {
        id: 4,
        icon: "🌟",
        title: "Award-Winning Work",
        description:
          "Our commitment to excellence has earned us recognition from industry leaders and prestigious award ceremonies.",
        gradient: "from-yellow-400 to-orange-400",
      },
      {
        id: 5,
        icon: "🔬",
        title: "R&D Innovation",
        description:
          "We invest in research and development to pioneer new techniques and stay ahead of industry trends.",
        gradient: "from-cyan-400 to-blue-400",
      },
      {
        id: 6,
        icon: "🤝",
        title: "Collaborative Approach",
        description:
          "We work closely with directors, producers, and studios to bring their creative vision to life.",
        gradient: "from-pink-400 to-rose-400",
      },
    ],
  },
};

export default function AboutPageEditor() {
  const { showSuccess, showError } = useToast();
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );
  const [activeTab, setActiveTab] = useState<
    "hero" | "story" | "excellence" | "stats" | "journey" | "features"
  >("hero");
  const [content, setContent] = useState<AboutContent>(DEFAULT_CONTENT);
  const [isLoading, setIsLoading] = useState(true);

  // Custom input class
  const inputClass =
    "w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black ";
  const inputClassSm =
    "w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black ";

  // Load content on mount
  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/pages/about");
      const result = await response.json();

      if (result.success && result.data) {
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
          slug: "about",
          title: "About Page",
          content,
          published: true,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSaveStatus("saved");
        showSuccess("About page saved successfully!");
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
    section: keyof AboutContent,
    data: Partial<AboutContent[keyof AboutContent]>
  ) => {
    setContent((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
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
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <BookOpen className="text-purple-600" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">About Page</h1>
            <p className="text-sm text-slate-600">Manage about page content</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/about"
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
            {saveStatus === "saving"
              ? "Saving..."
              : saveStatus === "saved"
              ? "Saved!"
              : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-200 overflow-x-auto">
          <nav className="flex min-w-max">
            <button
              onClick={() => setActiveTab("hero")}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "hero"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Type size={16} />
              Hero
            </button>
            <button
              onClick={() => setActiveTab("story")}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "story"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <BookOpen size={16} />
              Story
            </button>
            <button
              onClick={() => setActiveTab("excellence")}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "excellence"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Star size={16} />
              Excellence
            </button>
            <button
              onClick={() => setActiveTab("stats")}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "stats"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              📊 Stats
            </button>
            <button
              onClick={() => setActiveTab("journey")}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "journey"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              🚀 Journey
            </button>
            <button
              onClick={() => setActiveTab("features")}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "features"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              ✨ Features
            </button>
          </nav>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
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
                  onChange={(e) =>
                    updateContent("hero", { title: e.target.value })
                  }
                  className={inputClass}
                  placeholder="About HorizonVFX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Subtitle
                </label>
                <textarea
                  value={content.hero.subtitle}
                  onChange={(e) =>
                    updateContent("hero", { subtitle: e.target.value })
                  }
                  rows={2}
                  className={inputClass + " resize-none"}
                  placeholder="Where the magic of imagination meets the precision of expertise"
                />
              </div>

              {/* Preview */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8 mt-6">
                <div className="text-center">
                  <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
                    {content.hero.title}
                  </h2>
                  <p className="text-xl text-gray-300">
                    {content.hero.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Story Section */}
          {activeTab === "story" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={content.story.heading}
                  onChange={(e) =>
                    updateContent("story", { heading: e.target.value })
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Story Paragraphs
                </label>
                <div className="space-y-3">
                  {content.story.paragraphs.map((para, index) => (
                    <div key={index} className="flex gap-2">
                      <textarea
                        value={para}
                        onChange={(e) => {
                          const newParagraphs = [...content.story.paragraphs];
                          newParagraphs[index] = e.target.value;
                          updateContent("story", { paragraphs: newParagraphs });
                        }}
                        rows={4}
                        className="flex-1 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-black"
                      />
                      {content.story.paragraphs.length > 1 && (
                        <button
                          onClick={() => {
                            const newParagraphs =
                              content.story.paragraphs.filter(
                                (_, i) => i !== index
                              );
                            updateContent("story", {
                              paragraphs: newParagraphs,
                            });
                          }}
                          className="p-3 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() =>
                    updateContent("story", {
                      paragraphs: [...content.story.paragraphs, ""],
                    })
                  }
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <Plus size={16} />
                  Add Paragraph
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FileUpload
                  label="Story Image"
                  value={content.story.image}
                  onChange={(url) => updateContent("story", { image: url })}
                  accept="image"
                  maxSizeMB={5}
                  placeholder="Or enter image URL"
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Badge Value
                    </label>
                    <input
                      type="text"
                      value={content.story.yearsBadge}
                      onChange={(e) =>
                        updateContent("story", { yearsBadge: e.target.value })
                      }
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Badge Label
                    </label>
                    <input
                      type="text"
                      value={content.story.yearsLabel}
                      onChange={(e) =>
                        updateContent("story", { yearsLabel: e.target.value })
                      }
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Excellence Section */}
          {activeTab === "excellence" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Heading
                </label>
                <input
                  type="text"
                  value={content.excellence.heading}
                  onChange={(e) =>
                    updateContent("excellence", { heading: e.target.value })
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  value={content.excellence.description}
                  onChange={(e) =>
                    updateContent("excellence", { description: e.target.value })
                  }
                  rows={3}
                  className={inputClass + " resize-none"}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Feature Cards
                </label>
                <div className="space-y-4">
                  {content.excellence.featureCards.map((card) => (
                    <div
                      key={card.id}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3"
                    >
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <EmojiPicker
                            label="Icon"
                            value={card.icon}
                            onChange={(value) => {
                              const newCards =
                                content.excellence.featureCards.map((c) =>
                                  c.id === card.id
                                    ? { ...c, icon: value }
                                    : c
                                );
                              updateContent("excellence", {
                                featureCards: newCards,
                              });
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1">
                            Title
                          </label>
                          <input
                            type="text"
                            value={card.title}
                            onChange={(e) => {
                              const newCards =
                                content.excellence.featureCards.map((c) =>
                                  c.id === card.id
                                    ? { ...c, title: e.target.value }
                                    : c
                                );
                              updateContent("excellence", {
                                featureCards: newCards,
                              });
                            }}
                            className={inputClassSm}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">
                          Description
                        </label>
                        <textarea
                          value={card.description}
                          onChange={(e) => {
                            const newCards =
                              content.excellence.featureCards.map((c) =>
                                c.id === card.id
                                  ? { ...c, description: e.target.value }
                                  : c
                              );
                            updateContent("excellence", {
                              featureCards: newCards,
                            });
                          }}
                          rows={2}
                          className={inputClassSm + " resize-none"}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Stats Section */}
          {activeTab === "stats" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Stats Cards
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {content.stats.statsCards.map((card) => (
                    <div
                      key={card.id}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3"
                    >
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={card.icon}
                          onChange={(e) => {
                            const newCards = content.stats.statsCards.map((c) =>
                              c.id === card.id
                                ? { ...c, icon: e.target.value }
                                : c
                            );
                            updateContent("stats", { statsCards: newCards });
                          }}
                          className="w-20 px-2 py-1 text-center border border-slate-200 rounded-lg text-black"
                          placeholder="🎬"
                        />
                        <input
                          type="text"
                          value={card.value}
                          onChange={(e) => {
                            const newCards = content.stats.statsCards.map((c) =>
                              c.id === card.id
                                ? { ...c, value: e.target.value }
                                : c
                            );
                            updateContent("stats", { statsCards: newCards });
                          }}
                          className="flex-1 px-3 py-2 border border-slate-200 rounded-lg font-bold text-lg text-black"
                          placeholder="500+"
                        />
                      </div>
                      <input
                        type="text"
                        value={card.label}
                        onChange={(e) => {
                          const newCards = content.stats.statsCards.map((c) =>
                            c.id === card.id
                              ? { ...c, label: e.target.value }
                              : c
                          );
                          updateContent("stats", { statsCards: newCards });
                        }}
                        className={inputClassSm}
                        placeholder="Projects Delivered"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Journey Section */}
          {activeTab === "journey" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={content.journey.heading}
                  onChange={(e) =>
                    updateContent("journey", { heading: e.target.value })
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Journey Paragraphs
                </label>
                <div className="space-y-3">
                  {content.journey.paragraphs.map((para, index) => (
                    <div key={index} className="flex gap-2">
                      <textarea
                        value={para}
                        onChange={(e) => {
                          const newParagraphs = [...content.journey.paragraphs];
                          newParagraphs[index] = e.target.value;
                          updateContent("journey", {
                            paragraphs: newParagraphs,
                          });
                        }}
                        rows={3}
                        className="flex-1 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-black"
                      />
                      {content.journey.paragraphs.length > 1 && (
                        <button
                          onClick={() => {
                            const newParagraphs =
                              content.journey.paragraphs.filter(
                                (_, i) => i !== index
                              );
                            updateContent("journey", {
                              paragraphs: newParagraphs,
                            });
                          }}
                          className="p-3 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() =>
                    updateContent("journey", {
                      paragraphs: [...content.journey.paragraphs, ""],
                    })
                  }
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <Plus size={16} />
                  Add Paragraph
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {["missionCard", "visionCard", "valuesCard"].map((cardKey) => {
                  const card = content.journey[
                    cardKey as keyof typeof content.journey
                  ] as typeof content.journey.missionCard;
                  return (
                    <div
                      key={cardKey}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2"
                    >
                      <div>
                        <EmojiPicker
                          label="Icon"
                          value={card.icon}
                          onChange={(value) =>
                            updateContent("journey", {
                              [cardKey]: { ...card, icon: value },
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={card.title}
                          onChange={(e) =>
                            updateContent("journey", {
                              [cardKey]: { ...card, title: e.target.value },
                            })
                          }
                          className={inputClassSm}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">
                          Description
                        </label>
                        <textarea
                          value={card.description}
                          onChange={(e) =>
                            updateContent("journey", {
                              [cardKey]: {
                                ...card,
                                description: e.target.value,
                              },
                            })
                          }
                          rows={2}
                          className={inputClassSm + " resize-none"}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Features Section */}
          {activeTab === "features" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={content.features.heading}
                  onChange={(e) =>
                    updateContent("features", { heading: e.target.value })
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Why Choose Us Cards
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {content.features.whyChooseUsCards.map((card) => (
                    <div
                      key={card.id}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3"
                    >
                      <div>
                        <EmojiPicker
                          label="Icon"
                          value={card.icon}
                          onChange={(value) => {
                            const newCards =
                              content.features.whyChooseUsCards.map((c) =>
                                c.id === card.id
                                  ? { ...c, icon: value }
                                  : c
                              );
                            updateContent("features", {
                              whyChooseUsCards: newCards,
                            });
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={card.title}
                          onChange={(e) => {
                            const newCards =
                              content.features.whyChooseUsCards.map((c) =>
                                c.id === card.id
                                  ? { ...c, title: e.target.value }
                                  : c
                              );
                            updateContent("features", {
                              whyChooseUsCards: newCards,
                            });
                          }}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg font-semibold text-black"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">
                          Description
                        </label>
                        <textarea
                          value={card.description}
                          onChange={(e) => {
                            const newCards =
                              content.features.whyChooseUsCards.map((c) =>
                                c.id === card.id
                                  ? { ...c, description: e.target.value }
                                  : c
                              );
                            updateContent("features", {
                              whyChooseUsCards: newCards,
                            });
                          }}
                          rows={3}
                          className={inputClassSm + " resize-none"}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-purple-900 mb-2">💡 Tips</h3>
        <ul className="text-sm text-purple-800 space-y-1">
          <li>
            • Click &quot;Save Changes&quot; to persist your changes to the
            database.
          </li>
          <li>
            • Use the &quot;Preview Page&quot; button to see how your changes
            look on the live site.
          </li>
          <li>• Add/remove paragraphs and cards to customize your content.</li>
          <li>
            • Changes are immediately reflected on the frontend after saving.
          </li>
        </ul>
      </div>
    </div>
  );
}
