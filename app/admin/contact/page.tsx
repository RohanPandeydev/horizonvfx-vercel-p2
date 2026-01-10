"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Save,
  Eye,
  Phone,
  Mail,
  MapPin,
  Type,
  Hash,
  MessageSquare,
  Plus,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import EmojiPicker from "@/components/admin/EmojiPicker";

export default function ContactPageEditor() {
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [activeTab, setActiveTab] = useState<"hero" | "contact" | "form">("hero");

  // Hero Section State
  const [heroTitle, setHeroTitle] = useState("Get In Touch");
  const [heroSubtitle, setHeroSubtitle] = useState(
    "Let's create something amazing together"
  );

  // Contact Info State
  const [contactHeading, setContactHeading] = useState("Contact Information");
  const [contactDescription, setContactDescription] = useState(
    "We'd love to hear from you. Fill out the form or reach out directly through any of these channels."
  );
  const [email, setEmail] = useState("info@horizonvfx.in");
  const [phoneNumbers, setPhoneNumbers] = useState([
    "+91 974 871 2372",
    "+91 876 702 5601",
  ]);
  const [location, setLocation] = useState("Mumbai, India");

  // Form State
  const [formHeading, setFormHeading] = useState("Send us a message");
  const [formFields, setFormFields] = useState([
    { id: "name", label: "Your Name", placeholder: "John Doe", type: "text" },
    { id: "email", label: "Email Address", placeholder: "john@example.com", type: "email" },
    { id: "subject", label: "Subject", placeholder: "Project Inquiry", type: "text" },
    { id: "message", label: "Message", placeholder: "Tell us about your project...", type: "textarea" },
  ]);

  const handleSave = () => {
    setSaveStatus("saving");
    // Simulate API call
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 1000);
  };

  const addPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, ""]);
  };

  const removePhoneNumber = (index: number) => {
    if (phoneNumbers.length > 1) {
      setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index));
    }
  };

  const updatePhoneNumber = (index: number, value: string) => {
    const newNumbers = [...phoneNumbers];
    newNumbers[index] = value;
    setPhoneNumbers(newNumbers);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Mail className="text-blue-600" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Contact Page</h1>
            <p className="text-sm text-slate-600">Manage contact page content</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
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
          <nav className="flex">
            <button
              onClick={() => setActiveTab("hero")}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "hero"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Type size={18} />
              Hero Section
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "contact"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Mail size={18} />
              Contact Info
            </button>
            <button
              onClick={() => setActiveTab("form")}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "form"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <MessageSquare size={18} />
              Contact Form
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
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Get In Touch"
                />
                <p className="mt-1 text-xs text-slate-500">Main heading displayed at the top of the page</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Subtitle / Tagline
                </label>
                <textarea
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Let's create something amazing together"
                />
                <p className="mt-1 text-xs text-slate-500">Supporting text below the main title</p>
              </div>

              {/* Preview Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8 mt-6">
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                    {heroTitle || "Your Title Here"}
                  </h2>
                  <p className="text-xl text-gray-300">
                    {heroSubtitle || "Your subtitle here"}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Contact Info Section */}
          {activeTab === "contact" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={contactHeading}
                    onChange={(e) => setContactHeading(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  value={contactDescription}
                  onChange={(e) => setContactDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-slate-700">
                    Phone Numbers
                  </label>
                  <button
                    onClick={addPhoneNumber}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Plus size={14} />
                    Add Number
                  </button>
                </div>
                <div className="space-y-3">
                  {phoneNumbers.map((phone, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="relative flex-1">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => updatePhoneNumber(index, e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+91 XXX XXX XXXX"
                        />
                      </div>
                      {phoneNumbers.length > 1 && (
                        <button
                          onClick={() => removePhoneNumber(index)}
                          className="p-3 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Mumbai, India"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Form Section */}
          {activeTab === "form" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Form Heading
                </label>
                <input
                  type="text"
                  value={formHeading}
                  onChange={(e) => setFormHeading(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Form Fields
                </label>
                <div className="space-y-4">
                  {formFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-200"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Hash size={16} className="text-slate-400" />
                        <span className="text-sm font-semibold text-slate-700">
                          {field.id.charAt(0).toUpperCase() + field.id.slice(1)} Field
                        </span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1.5">
                            Label
                          </label>
                          <input
                            type="text"
                            value={field.label}
                            onChange={(e) => {
                              const newFields = [...formFields];
                              newFields[index].label = e.target.value;
                              setFormFields(newFields);
                            }}
                            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1.5">
                            Placeholder
                          </label>
                          <input
                            type="text"
                            value={field.placeholder}
                            onChange={(e) => {
                              const newFields = [...formFields];
                              newFields[index].placeholder = e.target.value;
                              setFormFields(newFields);
                            }}
                            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Preview */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h4 className="text-sm font-semibold text-slate-700 mb-4">Form Preview</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    disabled
                    placeholder={formFields[0]?.placeholder}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-white"
                  />
                  <input
                    type="email"
                    disabled
                    placeholder={formFields[1]?.placeholder}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-white"
                  />
                  <input
                    type="text"
                    disabled
                    placeholder={formFields[2]?.placeholder}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-white"
                  />
                  <textarea
                    disabled
                    placeholder={formFields[3]?.placeholder}
                    rows={3}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-white resize-none"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">💡 Tips</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Changes are auto-saved locally. Click "Save Changes" to persist them.</li>
          <li>• Use the "Preview Page" button to see how your changes look on the live site.</li>
          <li>• Phone numbers support multiple contacts for different departments.</li>
        </ul>
      </div>
    </div>
  );
}
