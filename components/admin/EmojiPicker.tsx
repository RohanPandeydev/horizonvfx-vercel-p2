"use client";
import React, { useState } from "react";
import { Smile } from "lucide-react";

interface EmojiPickerProps {
  value: string;
  onChange: (emoji: string) => void;
  label?: string;
}

const emojiCategories = {
  "Business & Work": [
    { emoji: "🎬", label: "Clapperboard" },
    { emoji: "🏆", label: "Trophy" },
    { emoji: "💼", label: "Briefcase" },
    { emoji: "📊", label: "Chart" },
    { emoji: "🎯", label: "Target" },
    { emoji: "💡", label: "Bulb" },
    { emoji: "⭐", label: "Star" },
    { emoji: "🚀", label: "Rocket" },
    { emoji: "🏗️", label: "Building" },
    { emoji: "📈", label: "Growth" },
  ],
  "People & Team": [
    { emoji: "👥", label: "People" },
    { emoji: "👨‍💼", label: "Office Worker" },
    { emoji: "👩‍💼", label: "Office Worker" },
    { emoji: "🤝", label: "Handshake" },
    { emoji: "👨‍🎨", label: "Artist" },
    { emoji: "👩‍🎨", label: "Artist" },
    { emoji: "🧑‍💻", label: "Technician" },
    { emoji: "👨‍🚀", label: "Astronaut" },
    { emoji: "👩‍🚀", label: "Astronaut" },
    { emoji: "🙋", label: "Raising Hand" },
  ],
  "Objects & Tech": [
    { emoji: "💎", label: "Gem" },
    { emoji: "🔬", label: "Microscope" },
    { emoji: "⚡", label: "Lightning" },
    { emoji: "🌟", label: "Sparkle" },
    { emoji: "📁", label: "Folder" },
    { emoji: "📝", label: "Memo" },
    { emoji: "🖥️", label: "Computer" },
    { emoji: "🎨", label: "Palette" },
    { emoji: "📷", label: "Camera" },
    { emoji: "🎥", label: "Video Camera" },
  ],
  "Communication": [
    { emoji: "✉️", label: "Email" },
    { emoji: "📧", label: "E-Mail" },
    { emoji: "📞", label: "Phone" },
    { emoji: "📱", label: "Mobile" },
    { emoji: "💬", label: "Chat" },
    { emoji: "📢", label: "Loudspeaker" },
    { emoji: "📣", label: "Megaphone" },
    { emoji: "👁️", label: "Eye" },
    { emoji: "🌐", label: "Globe" },
    { emoji: "📍", label: "Pin" },
  ],
  "Success & Awards": [
    { emoji: "🏅", label: "Medal" },
    { emoji: "🥇", label: "Gold" },
    { emoji: "🥈", label: "Silver" },
    { emoji: "🥉", label: "Bronze" },
    { emoji: "🎖️", label: "Military Medal" },
    { emoji: "💪", label: "Flexed Bicep" },
    { emoji: "👏", label: "Clapping" },
    { emoji: "🙌", label: "Raising Hands" },
    { emoji: "✨", label: "Sparkles" },
    { emoji: "🎉", label: "Party" },
  ],
};

export default function EmojiPicker({ value, onChange, label }: EmojiPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    Object.keys(emojiCategories)[0]
  );

  const handleEmojiSelect = (emoji: string) => {
    onChange(emoji);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {label && (
        <label className="block text-xs font-medium text-slate-600 mb-1.5">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
      >
        <span className="text-2xl">{value || "Select an icon"}</span>
        <Smile className="text-slate-400" size={18} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute z-20 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            {/* Category Tabs */}
            <div className="border-b border-slate-200 bg-slate-50">
              <div className="flex overflow-x-auto">
                {Object.keys(emojiCategories).map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-xs font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === category
                        ? "bg-white text-purple-600 border-t-2 border-purple-600"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Emoji Grid */}
            <div className="p-4 max-h-64 overflow-y-auto">
              <div className="grid grid-cols-5 gap-2">
                {emojiCategories[selectedCategory as keyof typeof emojiCategories].map(
                  (item) => (
                    <button
                      key={item.emoji}
                      type="button"
                      onClick={() => handleEmojiSelect(item.emoji)}
                      className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-purple-50 transition-colors group"
                      title={item.label}
                    >
                      <span className="text-2xl mb-1">{item.emoji}</span>
                      <span className="text-[10px] text-slate-500 group-hover:text-purple-600 text-center leading-tight">
                        {item.label}
                      </span>
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-slate-50 border-t border-slate-200">
              <p className="text-xs text-slate-500">
                Selected: <span className="font-medium text-slate-700">{value || "None"}</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
