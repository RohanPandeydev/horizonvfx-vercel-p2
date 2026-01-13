"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Save,
  Eye,
  Type,
  Users,
  Image as ImageIcon,
  Plus,
  Trash2,
  GripVertical,
} from "lucide-react";
import Link from "next/link";
import FileUpload from "@/components/admin/FileUpload";
import { useToast } from "@/lib/toast-context";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  gradient: string;
  bio: string;
}

interface TeamContent {
  hero: {
    title: string;
    subtitle: string;
  };
  leadership: {
    heading: string;
    members: TeamMember[];
  };
  teamMembers: {
    heading: string;
    members: TeamMember[];
  };
  cta: {
    heading: string;
    description: string;
    buttonText: string;
  };
}

const DEFAULT_CONTENT: TeamContent = {
  hero: {
    title: "The Creative Minds",
    subtitle: "Meet the talented artists who bring extraordinary visions to life",
  },
  leadership: {
    heading: "Leadership",
    members: [
      {
        id: 1,
        name: "Bhuvnesh Kumar Varshney",
        role: "Creative Animation Supervisor",
        image: "https://horizonvfx.in/images/tm1.jpg",
        gradient: "from-blue-500 to-cyan-500",
        bio: "15+ years of experience in animation and creative direction",
      },
      {
        id: 2,
        name: "Dibakar Chakraborty",
        role: "Founder & VFX Supervisor",
        image: "https://horizonvfx.in/images/tm2.jpg",
        gradient: "from-purple-500 to-pink-500",
        bio: "Visionary leader with 20+ years in VFX industry",
      },
    ],
  },
  teamMembers: {
    heading: "Our Team",
    members: [
      {
        id: 3,
        name: "Rahul Sharma",
        role: "3D Artist",
        image: "https://horizonvfx.in/images/tm3.jpg",
        gradient: "from-green-500 to-emerald-500",
        bio: "Specialized in 3D modeling and realistic texturing",
      },
      {
        id: 4,
        name: "Priya Singh",
        role: "Compositor",
        image: "https://horizonvfx.in/images/tm4.jpg",
        gradient: "from-orange-500 to-red-500",
        bio: "Expert in compositing and color grading",
      },
      {
        id: 5,
        name: "Amit Patel",
        role: "Motion Graphics Artist",
        image: "https://horizonvfx.in/images/tm5.jpg",
        gradient: "from-cyan-500 to-blue-500",
        bio: "Creative motion designer with passion for typography",
      },
    ],
  },
  cta: {
    heading: "Join Our Creative Team",
    description: "Be part of our journey to create extraordinary visual experiences",
    buttonText: "View Open Positions",
  },
};

export default function TeamPageEditor() {
  const { showSuccess, showError } = useToast();
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [activeTab, setActiveTab] = useState<"hero" | "leadership" | "team" | "cta">("hero");
  const [content, setContent] = useState<TeamContent>(DEFAULT_CONTENT);
  const [isLoading, setIsLoading] = useState(true);

  // Load content on mount
  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/pages/team");
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
          slug: "team",
          title: "Team Page",
          content,
          published: true,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSaveStatus("saved");
        showSuccess("Team page saved successfully!");
        setTimeout(() => setSaveStatus("idle"), 2000);
      } else {
        throw new Error(result.error || "Failed to save");
      }
    } catch (error) {
      setSaveStatus("idle");
      const message = error instanceof Error ? error.message : "Failed to save content";
      showError(message);
    }
  };

  const updateContent = (
    section: keyof TeamContent,
    data: Partial<TeamContent[keyof TeamContent]>
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

  const updateLeadershipMember = (id: number, field: string, value: string) => {
    const updatedMembers = content.leadership.members.map((member) =>
      member.id === id ? { ...member, [field]: value } : member
    );
    updateContent("leadership", { members: updatedMembers });
  };

  const addLeadershipMember = () => {
    const newId = Math.max(...content.leadership.members.map((m) => m.id), 0) + 1;
    const newMember: TeamMember = {
      id: newId,
      name: "New Member",
      role: "Role",
      image: "",
      gradient: "from-blue-500 to-cyan-500",
      bio: "Bio description",
    };
    updateContent("leadership", { members: [...content.leadership.members, newMember] });
  };

  const removeLeadershipMember = (id: number) => {
    if (content.leadership.members.length > 1) {
      const filteredMembers = content.leadership.members.filter((member) => member.id !== id);
      updateContent("leadership", { members: filteredMembers });
    }
  };

  const updateTeamMember = (id: number, field: string, value: string) => {
    const updatedMembers = content.teamMembers.members.map((member) =>
      member.id === id ? { ...member, [field]: value } : member
    );
    updateContent("teamMembers", { members: updatedMembers });
  };

  const addTeamMember = () => {
    const newId = Math.max(...content.teamMembers.members.map((m) => m.id), 0) + 1;
    const newMember: TeamMember = {
      id: newId,
      name: "New Member",
      role: "Role",
      image: "",
      gradient: "from-blue-500 to-cyan-500",
      bio: "Bio description",
    };
    updateContent("teamMembers", { members: [...content.teamMembers.members, newMember] });
  };

  const removeTeamMember = (id: number) => {
    if (content.teamMembers.members.length > 1) {
      const filteredMembers = content.teamMembers.members.filter((member) => member.id !== id);
      updateContent("teamMembers", { members: filteredMembers });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <Users className="text-green-600" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Team Page</h1>
            <p className="text-sm text-slate-600">Manage team page content</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/team"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Eye size={18} />
            Preview Page
          </Link>
          <button
            onClick={handleSave}
            disabled={saveStatus === "saving"}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                  ? "border-green-600 text-green-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Type size={18} />
              Hero Section
            </button>
            <button
              onClick={() => setActiveTab("leadership")}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "leadership"
                  ? "border-green-600 text-green-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Users size={18} />
              Leadership
            </button>
            <button
              onClick={() => setActiveTab("team")}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "team"
                  ? "border-green-600 text-green-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Users size={18} />
              Team Members
            </button>
            <button
              onClick={() => setActiveTab("cta")}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "cta"
                  ? "border-green-600 text-green-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Type size={18} />
              Call to Action
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
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black placeholder:text-black"
                  placeholder="The Creative Minds"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Subtitle
                </label>
                <textarea
                  value={content.hero.subtitle}
                  onChange={(e) => updateContent("hero", { subtitle: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none placeholder:text-black"
                  placeholder="Meet the talented artists who bring extraordinary visions to life"
                />
              </div>

              {/* Preview */}
              <div className="bg-gradient-to-br from-slate-900 to-zinc-950 rounded-xl p-8 mt-6">
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                    {content.hero.title || "Your Title Here"}
                  </h2>
                  <p className="text-xl text-gray-300">
                    {content.hero.subtitle || "Your subtitle here"}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Leadership Section */}
          {activeTab === "leadership" && (
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
                  value={content.leadership.heading}
                  onChange={(e) => updateContent("leadership", { heading: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black placeholder:text-black"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-slate-700">
                    Leadership Members
                  </label>
                  <button
                    onClick={addLeadershipMember}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <Plus size={14} />
                    Add Member
                  </button>
                </div>
                <div className="space-y-4">
                  {content.leadership.members.map((member, index) => (
                    <div
                      key={member.id}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4"
                    >
                      <div className="flex items-center gap-2">
                        <GripVertical size={16} className="text-slate-400" />
                        <span className="text-sm font-semibold text-slate-700">
                          Member {index + 1}
                        </span>
                        {content.leadership.members.length > 1 && (
                          <button
                            onClick={() => removeLeadershipMember(member.id)}
                            className="ml-auto p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1.5">
                            Name
                          </label>
                          <input
                            type="text"
                            value={member.name}
                            onChange={(e) => updateLeadershipMember(member.id, "name", e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black placeholder:text-black"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1.5">
                            Role
                          </label>
                          <input
                            type="text"
                            value={member.role}
                            onChange={(e) => updateLeadershipMember(member.id, "role", e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black placeholder:text-black"
                          />
                        </div>
                      </div>

                      <FileUpload
                        label="Image"
                        value={member.image}
                        onChange={(url) => updateLeadershipMember(member.id, "image", url)}
                        accept="image"
                        maxSizeMB={5}
                        placeholder="Or enter image URL"
                      />

                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
                          Bio
                        </label>
                        <textarea
                          value={member.bio}
                          onChange={(e) => updateLeadershipMember(member.id, "bio", e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-black placeholder:text-black"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
                          Gradient Color
                        </label>
                        <select
                          value={member.gradient}
                          onChange={(e) => updateLeadershipMember(member.id, "gradient", e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black placeholder:text-black"
                        >
                          <option value="from-blue-500 to-cyan-500">Blue to Cyan</option>
                          <option value="from-purple-500 to-pink-500">Purple to Pink</option>
                          <option value="from-green-500 to-emerald-500">Green to Emerald</option>
                          <option value="from-orange-500 to-red-500">Orange to Red</option>
                          <option value="from-cyan-500 to-blue-500">Cyan to Blue</option>
                        </select>
                      </div>

                      {/* Card Preview */}
                      <div className="bg-slate-900 rounded-lg p-4">
                        <div className="flex gap-4">
                          {member.image && (
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                          )}
                          <div className="flex-1">
                            <h5 className={`text-base font-bold bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent`}>
                              {member.name}
                            </h5>
                            <p className={`text-xs bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent font-semibold mb-1`}>
                              {member.role}
                            </p>
                            <p className="text-gray-400 text-xs">{member.bio}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Team Members Section */}
          {activeTab === "team" && (
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
                  value={content.teamMembers.heading}
                  onChange={(e) => updateContent("teamMembers", { heading: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black placeholder:text-black"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-slate-700">
                    Team Members
                  </label>
                  <button
                    onClick={addTeamMember}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <Plus size={14} />
                    Add Member
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {content.teamMembers.members.map((member, index) => (
                    <div
                      key={member.id}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3"
                    >
                      <div className="flex items-center gap-2">
                        <GripVertical size={16} className="text-slate-400" />
                        <span className="text-sm font-semibold text-slate-700">
                          Member {index + 1}
                        </span>
                        {content.teamMembers.members.length > 1 && (
                          <button
                            onClick={() => removeTeamMember(member.id)}
                            className="ml-auto p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
                          Name
                        </label>
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => updateTeamMember(member.id, "name", e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black placeholder:text-black"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
                          Role
                        </label>
                        <input
                          type="text"
                          value={member.role}
                          onChange={(e) => updateTeamMember(member.id, "role", e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black placeholder:text-black"
                        />
                      </div>

                      <FileUpload
                        label="Image"
                        value={member.image}
                        onChange={(url) => updateTeamMember(member.id, "image", url)}
                        accept="image"
                        maxSizeMB={5}
                        placeholder="Or enter image URL"
                      />

                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
                          Bio
                        </label>
                        <textarea
                          value={member.bio}
                          onChange={(e) => updateTeamMember(member.id, "bio", e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-black placeholder:text-black"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
                          Gradient Color
                        </label>
                        <select
                          value={member.gradient}
                          onChange={(e) => updateTeamMember(member.id, "gradient", e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black placeholder:text-black"
                        >
                          <option value="from-blue-500 to-cyan-500">Blue to Cyan</option>
                          <option value="from-purple-500 to-pink-500">Purple to Pink</option>
                          <option value="from-green-500 to-emerald-500">Green to Emerald</option>
                          <option value="from-orange-500 to-red-500">Orange to Red</option>
                          <option value="from-cyan-500 to-blue-500">Cyan to Blue</option>
                        </select>
                      </div>

                      {/* Card Preview */}
                      <div className="bg-slate-900 rounded-lg p-3">
                        <div className="flex gap-3">
                          {member.image && (
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <h5 className={`text-sm font-bold bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent truncate`}>
                              {member.name}
                            </h5>
                            <p className={`text-xs bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent font-semibold truncate`}>
                              {member.role}
                            </p>
                            <p className="text-gray-400 text-xs truncate">{member.bio}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* CTA Section */}
          {activeTab === "cta" && (
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
                  value={content.cta.heading}
                  onChange={(e) => updateContent("cta", { heading: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black placeholder:text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  value={content.cta.description}
                  onChange={(e) => updateContent("cta", { description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none placeholder:text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Button Text
                </label>
                <input
                  type="text"
                  value={content.cta.buttonText}
                  onChange={(e) => updateContent("cta", { buttonText: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black placeholder:text-black"
                />
              </div>

              {/* Preview */}
              <div className="bg-gradient-to-br from-slate-900 to-zinc-950 rounded-xl p-8 mt-6">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-white mb-4">{content.cta.heading}</h3>
                  <p className="text-gray-400 mb-6 max-w-2xl mx-auto">{content.cta.description}</p>
                  <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold text-white">
                    {content.cta.buttonText}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-green-900 mb-2">💡 Tips</h3>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• Use high-quality images for team members (recommended: 400x500px)</li>
          <li>• Keep bios concise and professional</li>
          <li>• Leadership section shows first 2-3 members prominently</li>
          <li>• Team members appear in a slider on the live page</li>
        </ul>
      </div>
    </div>
  );
}
