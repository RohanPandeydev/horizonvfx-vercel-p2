"use client";

import { useState } from "react";
import { Save, User, Globe, Mail, Bell, Palette } from "lucide-react";

interface SiteSettings {
  siteName: string;
  siteUrl: string;
  logoUrl: string;
  faviconUrl: string;
  contactEmail: string;
  supportEmail: string;
  metaDescription: string;
  seoKeywords: string;
}

const defaultSettings: SiteSettings = {
  siteName: "HorizonVFX",
  siteUrl: "https://horizonvfx.com",
  logoUrl: "/images/logo.png",
  faviconUrl: "/favicon.ico",
  contactEmail: "contact@horizonvfx.com",
  supportEmail: "support@horizonvfx.com",
  metaDescription: "Pioneering visual excellence in the digital age",
  seoKeywords: "VFX, Visual Effects, 3D Animation, Motion Graphics",
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"general" | "seo" | "notifications">("general");
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // API call will be added later
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    alert("Settings saved successfully!");
  };

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "seo", label: "SEO", icon: Bell },
    { id: "notifications", label: "Notifications", icon: Mail },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your site configuration</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-black/50 backdrop-blur-xl border border-gray-800 rounded-xl p-4 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {activeTab === "general" && (
            <div className="bg-black/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">General Settings</h2>

              <div className="space-y-6">
                {/* Site Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) =>
                      setSettings({ ...settings, siteName: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all"
                  />
                </div>

                {/* Site URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Site URL
                  </label>
                  <input
                    type="url"
                    value={settings.siteUrl}
                    onChange={(e) =>
                      setSettings({ ...settings, siteUrl: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all"
                  />
                </div>

                {/* Logo URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Logo URL
                  </label>
                  <input
                    type="url"
                    value={settings.logoUrl}
                    onChange={(e) =>
                      setSettings({ ...settings, logoUrl: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all"
                  />
                </div>

                {/* Favicon URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Favicon URL
                  </label>
                  <input
                    type="url"
                    value={settings.faviconUrl}
                    onChange={(e) =>
                      setSettings({ ...settings, faviconUrl: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all"
                  />
                </div>

                {/* Contact Emails */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) =>
                        setSettings({ ...settings, contactEmail: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Support Email
                    </label>
                    <input
                      type="email"
                      value={settings.supportEmail}
                      onChange={(e) =>
                        setSettings({ ...settings, supportEmail: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "seo" && (
            <div className="bg-black/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">SEO Settings</h2>

              <div className="space-y-6">
                {/* Meta Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={settings.metaDescription}
                    onChange={(e) =>
                      setSettings({ ...settings, metaDescription: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended: 150-160 characters
                  </p>
                </div>

                {/* SEO Keywords */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    SEO Keywords
                  </label>
                  <input
                    type="text"
                    value={settings.seoKeywords}
                    onChange={(e) =>
                      setSettings({ ...settings, seoKeywords: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Comma-separated keywords
                  </p>
                </div>

                {/* Preview */}
                <div className="p-4 bg-gray-900 border border-gray-800 rounded-lg">
                  <p className="text-sm text-gray-400 mb-2">Google Preview:</p>
                  <div className="space-y-1">
                    <p className="text-blue-400 text-lg hover:underline cursor-pointer">
                      {settings.siteName} - {settings.siteUrl}
                    </p>
                    <p className="text-green-700 text-sm">
                      {settings.siteUrl}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {settings.metaDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="bg-black/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Notification Settings</h2>

              <div className="space-y-6">
                {/* Email Notifications */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Email Notifications</h3>

                  <div className="space-y-3">
                    {[
                      "New contact form submissions",
                      "New project inquiries",
                      "System updates",
                      "Security alerts",
                    ].map((item) => (
                      <label
                        key={item}
                        className="flex items-center justify-between p-3 bg-black/30 border border-gray-800 rounded-lg cursor-pointer hover:border-gray-700 transition-all"
                      >
                        <span className="text-gray-300">{item}</span>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-5 h-5 rounded border-gray-600 bg-black/50 text-purple-500 focus:ring-purple-500/20"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                {/* Notification Recipient */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Notification Email
                  </label>
                  <input
                    type="email"
                    defaultValue="admin@horizonvfx.com"
                    className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    All notifications will be sent to this email
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
