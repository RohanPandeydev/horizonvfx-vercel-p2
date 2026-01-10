"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Save,
  Eye,
  Type,
  BookOpen,
  Star,
  Image as ImageIcon,
  Plus,
  Trash2,
  GripVertical,
} from "lucide-react";
import Link from "next/link";
import EmojiPicker from "@/components/admin/EmojiPicker";

export default function AboutPageEditor() {
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [activeTab, setActiveTab] = useState<"hero" | "story" | "excellence" | "stats" | "journey" | "features">("hero");

  // Hero Section State
  const [heroTitle, setHeroTitle] = useState("About HorizonVFX");
  const [heroSubtitle, setHeroSubtitle] = useState(
    "Where the magic of imagination meets the precision of expertise"
  );

  // Story Section State
  const [storyHeading, setStoryHeading] = useState("Our Story");
  const [storyParagraphs, setStoryParagraphs] = useState([
    "Welcome to HorizonVFX, where the magic of imagination meets the precision of expertise. Born from the collective brilliance of a group of freelance artists with over two decades of industry mastery, we have embarked on a journey to redefine the very fabric of visual storytelling through cutting-edge visual effects.",
    "Our tale begins with a passion for transforming dreams into reality. With each stroke of creativity and pixel perfected, our team of seasoned artists has sculpted a narrative that goes beyond the ordinary. We are not just a VFX company; we are architects of awe, crafting cinematic experiences that linger in the hearts and minds of audiences.",
  ]);
  const [storyImage, setStoryImage] = useState("https://horizonvfx.in/images/about-us1.jpg");
  const [yearsBadge, setYearsBadge] = useState("20+");
  const [yearsLabel, setYearsLabel] = useState("Years");

  // Excellence Section State
  const [excellenceHeading, setExcellenceHeading] = useState("Excellence in Every Frame");
  const [excellenceDescription, setExcellenceDescription] = useState(
    "At the heart of our success lies a commitment to excellence that extends from the inception to the completion of each project"
  );

  const [featureCards, setFeatureCards] = useState([
    {
      id: 1,
      title: "Comprehensive Services",
      description: "We seamlessly navigate the entire spectrum of visual effects, offering comprehensive pre to post-production services.",
      icon: "🎬",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Vast Talent Pool",
      description: "With over 500 artists in our bank, each a virtuoso in their own right, we possess the capacity to undertake any project with unparalleled finesse.",
      icon: "👨‍🎨",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: 3,
      title: "Innovation First",
      description: "Our diverse pool of creative minds, coupled with a commitment to staying at the forefront of industry trends, ensures innovation in every frame.",
      icon: "💡",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 4,
      title: "Collaborative Excellence",
      description: "We extend our expertise by offering clients access to our curated roster of artists, adding an extra layer of precision and creative flair.",
      icon: "🤝",
      gradient: "from-orange-500 to-red-500",
    },
  ]);

  // Stats Section State
  const [statsCards, setStatsCards] = useState([
    { id: 1, value: "500+", label: "Projects Delivered", icon: "🎬" },
    { id: 2, value: "50+", label: "Happy Clients", icon: "🏆" },
    { id: 3, value: "100+", label: "Team Members", icon: "👥" },
    { id: 4, value: "10+", label: "Years Experience", icon: "⭐" },
  ]);

  // Journey Section State
  const [journeyHeading, setJourneyHeading] = useState("Our Journey");
  const [journeyParagraphs, setJourneyParagraphs] = useState([
    "Founded in 2013, HorizonVFX emerged from a passion for pushing the boundaries of visual storytelling. What started as a small team of dreamers has evolved into a powerhouse of creativity and technical excellence.",
    "Today, we stand at the forefront of the VFX industry, combining artistry with cutting-edge technology to create visual experiences that inspire and amaze. Our journey continues as we explore new horizons in virtual production, real-time rendering, and AI-assisted visual effects.",
  ]);
  const [missionCard, setMissionCard] = useState({
    title: "Our Mission",
    description: "Redefining visual storytelling",
    icon: "🎯",
    gradient: "from-blue-500 to-green-500",
  });
  const [visionCard, setVisionCard] = useState({
    title: "Our Vision",
    description: "To be the global leader in VFX innovation",
    icon: "👁️",
    gradient: "from-purple-500 to-pink-500",
  });
  const [valuesCard, setValuesCard] = useState({
    title: "Our Values",
    description: "Excellence, Innovation, Collaboration",
    icon: "💎",
    gradient: "from-cyan-500 to-blue-500",
  });

  // Features Section State (Why Choose Us)
  const [featuresHeading, setFeaturesHeading] = useState("Why Choose Us");
  const [whyChooseUsCards, setWhyChooseUsCards] = useState([
    {
      id: 1,
      icon: "🚀",
      title: "Cutting-Edge Technology",
      description: "We leverage the latest VFX software and AI-powered tools to create stunning visual effects that push creative boundaries.",
      gradient: "from-blue-400 to-cyan-400",
    },
    {
      id: 2,
      icon: "🎨",
      title: "Creative Excellence",
      description: "Our team of visionary artists and technicians craft immersive visual experiences that captivate audiences worldwide.",
      gradient: "from-purple-400 to-pink-400",
    },
    {
      id: 3,
      icon: "⚡",
      title: "Lightning-Fast Delivery",
      description: "With optimized workflows and state-of-the-art rendering farms, we deliver exceptional results on time, every time.",
      gradient: "from-green-400 to-emerald-400",
    },
    {
      id: 4,
      icon: "🌟",
      title: "Award-Winning Work",
      description: "Our commitment to excellence has earned us recognition from industry leaders and prestigious award ceremonies.",
      gradient: "from-yellow-400 to-orange-400",
    },
    {
      id: 5,
      icon: "🔬",
      title: "R&D Innovation",
      description: "We invest in research and development to pioneer new techniques and stay ahead of industry trends.",
      gradient: "from-cyan-400 to-blue-400",
    },
    {
      id: 6,
      icon: "🤝",
      title: "Collaborative Approach",
      description: "We work closely with directors, producers, and studios to bring their creative vision to life.",
      gradient: "from-pink-400 to-rose-400",
    },
  ]);

  const handleSave = () => {
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 1000);
  };

  const addStoryParagraph = () => {
    setStoryParagraphs([...storyParagraphs, ""]);
  };

  const removeStoryParagraph = (index: number) => {
    if (storyParagraphs.length > 1) {
      setStoryParagraphs(storyParagraphs.filter((_, i) => i !== index));
    }
  };

  const updateStoryParagraph = (index: number, value: string) => {
    const newParagraphs = [...storyParagraphs];
    newParagraphs[index] = value;
    setStoryParagraphs(newParagraphs);
  };

  const updateFeatureCard = (id: number, field: string, value: string) => {
    setFeatureCards(featureCards.map((card) =>
      card.id === id ? { ...card, [field]: value } : card
    ));
  };

  const addFeatureCard = () => {
    const newId = Math.max(...featureCards.map((c) => c.id)) + 1;
    setFeatureCards([
      ...featureCards,
      {
        id: newId,
        title: "New Feature",
        description: "Description for this feature",
        icon: "⭐",
        gradient: "from-blue-500 to-green-500",
      },
    ]);
  };

  const removeFeatureCard = (id: number) => {
    if (featureCards.length > 1) {
      setFeatureCards(featureCards.filter((card) => card.id !== id));
    }
  };

  const updateStatCard = (id: number, field: string, value: string) => {
    setStatsCards(statsCards.map((card) =>
      card.id === id ? { ...card, [field]: value } : card
    ));
  };

  const updateJourneyParagraph = (index: number, value: string) => {
    const newParagraphs = [...journeyParagraphs];
    newParagraphs[index] = value;
    setJourneyParagraphs(newParagraphs);
  };

  const addJourneyParagraph = () => {
    setJourneyParagraphs([...journeyParagraphs, ""]);
  };

  const removeJourneyParagraph = (index: number) => {
    if (journeyParagraphs.length > 1) {
      setJourneyParagraphs(journeyParagraphs.filter((_, i) => i !== index));
    }
  };

  const updateWhyChooseUsCard = (id: number, field: string, value: string) => {
    setWhyChooseUsCards(whyChooseUsCards.map((card) =>
      card.id === id ? { ...card, [field]: value } : card
    ));
  };

  const addWhyChooseUsCard = () => {
    const newId = Math.max(...whyChooseUsCards.map((c) => c.id)) + 1;
    setWhyChooseUsCards([
      ...whyChooseUsCards,
      {
        id: newId,
        icon: "⭐",
        title: "New Feature",
        description: "Description for this feature",
        gradient: "from-blue-400 to-green-400",
      },
    ]);
  };

  const removeWhyChooseUsCard = (id: number) => {
    if (whyChooseUsCards.length > 1) {
      setWhyChooseUsCards(whyChooseUsCards.filter((card) => card.id !== id));
    }
  };

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
            {saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab("hero")}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "hero"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Type size={18} />
              Hero Section
            </button>
            <button
              onClick={() => setActiveTab("story")}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "story"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <BookOpen size={18} />
              Our Story
            </button>
            <button
              onClick={() => setActiveTab("excellence")}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "excellence"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Star size={18} />
              Excellence
            </button>
            <button
              onClick={() => setActiveTab("stats")}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "stats"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <ImageIcon size={18} />
              Stats
            </button>
            <button
              onClick={() => setActiveTab("journey")}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "journey"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <BookOpen size={18} />
              Journey
            </button>
            <button
              onClick={() => setActiveTab("features")}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "features"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Star size={18} />
              Why Choose Us
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
                  placeholder="About HorizonVFX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Subtitle / Tagline
                </label>
                <textarea
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="Where the magic of imagination meets the precision of expertise"
                />
              </div>

              {/* Preview Card */}
              <div className="bg-gradient-to-br from-slate-900 to-zinc-950 rounded-xl p-8 mt-6">
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400">
                    {heroTitle || "Your Title Here"}
                  </h2>
                  <p className="text-xl text-gray-300">
                    {heroSubtitle || "Your subtitle here"}
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
                  value={storyHeading}
                  onChange={(e) => setStoryHeading(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-slate-700">
                    Story Paragraphs
                  </label>
                  <button
                    onClick={addStoryParagraph}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <Plus size={14} />
                    Add Paragraph
                  </button>
                </div>
                <div className="space-y-3">
                  {storyParagraphs.map((paragraph, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="flex-1">
                        <textarea
                          value={paragraph}
                          onChange={(e) => updateStoryParagraph(index, e.target.value)}
                          rows={4}
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                          placeholder="Enter story paragraph..."
                        />
                      </div>
                      {storyParagraphs.length > 1 && (
                        <button
                          onClick={() => removeStoryParagraph(index)}
                          className="p-3 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors h-fit"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Years Badge Value
                  </label>
                  <input
                    type="text"
                    value={yearsBadge}
                    onChange={(e) => setYearsBadge(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="20+"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Years Label
                  </label>
                  <input
                    type="text"
                    value={yearsLabel}
                    onChange={(e) => setYearsLabel(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Years"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Story Image URL
                </label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="url"
                    value={storyImage}
                    onChange={(e) => setStoryImage(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                {storyImage && (
                  <div className="mt-3 rounded-lg overflow-hidden border border-slate-200">
                    <img src={storyImage} alt="Preview" className="w-full h-48 object-cover" />
                  </div>
                )}
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
                  Section Heading
                </label>
                <input
                  type="text"
                  value={excellenceHeading}
                  onChange={(e) => setExcellenceHeading(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Section Description
                </label>
                <textarea
                  value={excellenceDescription}
                  onChange={(e) => setExcellenceDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-slate-700">
                    Feature Cards
                  </label>
                  <button
                    onClick={addFeatureCard}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <Plus size={14} />
                    Add Card
                  </button>
                </div>
                <div className="space-y-4">
                  {featureCards.map((card, index) => (
                    <div
                      key={card.id}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4"
                    >
                      <div className="flex items-center gap-2">
                        <GripVertical size={16} className="text-slate-400" />
                        <span className="text-sm font-semibold text-slate-700">
                          Card {index + 1}
                        </span>
                        {featureCards.length > 1 && (
                          <button
                            onClick={() => removeFeatureCard(card.id)}
                            className="ml-auto p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1.5">
                            Title
                          </label>
                          <input
                            type="text"
                            value={card.title}
                            onChange={(e) => updateFeatureCard(card.id, "title", e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <EmojiPicker
                            label="Icon"
                            value={card.icon}
                            onChange={(value) => updateFeatureCard(card.id, "icon", value)}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
                          Description
                        </label>
                        <textarea
                          value={card.description}
                          onChange={(e) => updateFeatureCard(card.id, "description", e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
                          Gradient Color
                        </label>
                        <select
                          value={card.gradient}
                          onChange={(e) => updateFeatureCard(card.id, "gradient", e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="from-blue-500 to-cyan-500">Blue to Cyan</option>
                          <option value="from-green-500 to-emerald-500">Green to Emerald</option>
                          <option value="from-purple-500 to-pink-500">Purple to Pink</option>
                          <option value="from-orange-500 to-red-500">Orange to Red</option>
                          <option value="from-blue-500 to-green-500">Blue to Green</option>
                        </select>
                      </div>

                      {/* Card Preview */}
                      <div className="bg-slate-900 rounded-lg p-4">
                        <div className="text-3xl mb-2">{card.icon}</div>
                        <h4 className={`text-lg font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                          {card.title}
                        </h4>
                        <p className="text-gray-400 text-sm mt-1">{card.description}</p>
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
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Stats Cards
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {statsCards.map((stat, index) => (
                    <div
                      key={stat.id}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3"
                    >
                      <div className="flex items-center gap-2">
                        <GripVertical size={16} className="text-slate-400" />
                        <span className="text-sm font-semibold text-slate-700">
                          Stat {index + 1}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <EmojiPicker
                            label="Icon"
                            value={stat.icon}
                            onChange={(value) => updateStatCard(stat.id, "icon", value)}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1.5">
                            Value
                          </label>
                          <input
                            type="text"
                            value={stat.value}
                            onChange={(e) => updateStatCard(stat.id, "value", e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="500+"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
                          Label
                        </label>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => updateStatCard(stat.id, "label", e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Projects Delivered"
                        />
                      </div>
                      <div className="bg-slate-900 rounded-lg p-3 text-center">
                        <div className="text-2xl mb-1">{stat.icon}</div>
                        <div className="text-xl font-bold text-white">{stat.value}</div>
                        <div className="text-xs text-gray-400">{stat.label}</div>
                      </div>
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
                  value={journeyHeading}
                  onChange={(e) => setJourneyHeading(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-slate-700">
                    Journey Paragraphs
                  </label>
                  <button
                    onClick={addJourneyParagraph}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <Plus size={14} />
                    Add Paragraph
                  </button>
                </div>
                <div className="space-y-3">
                  {journeyParagraphs.map((paragraph, index) => (
                    <div key={index} className="flex gap-2">
                      <textarea
                        value={paragraph}
                        onChange={(e) => updateJourneyParagraph(index, e.target.value)}
                        rows={4}
                        className="flex-1 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        placeholder="Enter journey paragraph..."
                      />
                      {journeyParagraphs.length > 1 && (
                        <button
                          onClick={() => removeJourneyParagraph(index)}
                          className="p-3 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors h-fit"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Mission, Vision & Values Cards
                </label>
                <div className="space-y-4">
                  {/* Mission Card */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="text-sm font-semibold text-slate-700 mb-3">Mission Card</h4>
                    <div className="grid md:grid-cols-3 gap-3">
                      <div>
                        <EmojiPicker
                          label="Icon"
                          value={missionCard.icon}
                          onChange={(value) => setMissionCard({ ...missionCard, icon: value })}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
                          Title
                        </label>
                        <input
                          type="text"
                          value={missionCard.title}
                          onChange={(e) => setMissionCard({ ...missionCard, title: e.target.value })}
                          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
                          Description
                        </label>
                        <input
                          type="text"
                          value={missionCard.description}
                          onChange={(e) => setMissionCard({ ...missionCard, description: e.target.value })}
                          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Vision Card */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="text-sm font-semibold text-slate-700 mb-3">Vision Card</h4>
                    <div className="grid md:grid-cols-3 gap-3">
                      <div>
                        <EmojiPicker
                          label="Icon"
                          value={visionCard.icon}
                          onChange={(value) => setVisionCard({ ...visionCard, icon: value })}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
                          Title
                        </label>
                        <input
                          type="text"
                          value={visionCard.title}
                          onChange={(e) => setVisionCard({ ...visionCard, title: e.target.value })}
                          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
                          Description
                        </label>
                        <input
                          type="text"
                          value={visionCard.description}
                          onChange={(e) => setVisionCard({ ...visionCard, description: e.target.value })}
                          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Values Card */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="text-sm font-semibold text-slate-700 mb-3">Values Card</h4>
                    <div className="grid md:grid-cols-3 gap-3">
                      <div>
                        <EmojiPicker
                          label="Icon"
                          value={valuesCard.icon}
                          onChange={(value) => setValuesCard({ ...valuesCard, icon: value })}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
                          Title
                        </label>
                        <input
                          type="text"
                          value={valuesCard.title}
                          onChange={(e) => setValuesCard({ ...valuesCard, title: e.target.value })}
                          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
                          Description
                        </label>
                        <input
                          type="text"
                          value={valuesCard.description}
                          onChange={(e) => setValuesCard({ ...valuesCard, description: e.target.value })}
                          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Features Section (Why Choose Us) */}
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
                  value={featuresHeading}
                  onChange={(e) => setFeaturesHeading(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-slate-700">
                    Feature Cards
                  </label>
                  <button
                    onClick={addWhyChooseUsCard}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <Plus size={14} />
                    Add Card
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {whyChooseUsCards.map((card, index) => (
                    <div
                      key={card.id}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3"
                    >
                      <div className="flex items-center gap-2">
                        <GripVertical size={16} className="text-slate-400" />
                        <span className="text-sm font-semibold text-slate-700">
                          Card {index + 1}
                        </span>
                        {whyChooseUsCards.length > 1 && (
                          <button
                            onClick={() => removeWhyChooseUsCard(card.id)}
                            className="ml-auto p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <EmojiPicker
                            label="Icon"
                            value={card.icon}
                            onChange={(value) => updateWhyChooseUsCard(card.id, "icon", value)}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1.5">
                            Title
                          </label>
                          <input
                            type="text"
                            value={card.title}
                            onChange={(e) => updateWhyChooseUsCard(card.id, "title", e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
                          Description
                        </label>
                        <textarea
                          value={card.description}
                          onChange={(e) => updateWhyChooseUsCard(card.id, "description", e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
                          Gradient
                        </label>
                        <select
                          value={card.gradient}
                          onChange={(e) => updateWhyChooseUsCard(card.id, "gradient", e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="from-blue-400 to-cyan-400">Blue to Cyan</option>
                          <option value="from-purple-400 to-pink-400">Purple to Pink</option>
                          <option value="from-green-400 to-emerald-400">Green to Emerald</option>
                          <option value="from-yellow-400 to-orange-400">Yellow to Orange</option>
                          <option value="from-cyan-400 to-blue-400">Cyan to Blue</option>
                          <option value="from-pink-400 to-rose-400">Pink to Rose</option>
                        </select>
                      </div>

                      {/* Card Preview */}
                      <div className="bg-slate-900 rounded-lg p-3">
                        <div className="text-2xl mb-2">{card.icon}</div>
                        <h5 className={`text-sm font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                          {card.title}
                        </h5>
                        <p className="text-gray-400 text-xs mt-1 line-clamp-2">{card.description}</p>
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
          <li>• Use emojis for icons in feature cards to make them visually appealing.</li>
          <li>• Add multiple story paragraphs to create a compelling narrative.</li>
          <li>• Preview changes on the live page before saving.</li>
        </ul>
      </div>
    </div>
  );
}
