"use client";
import React, { useState } from "react";
import { Smile, ChevronDown, Search } from "lucide-react";
import * as LucideIcons from "lucide-react";
import DynamicIcon from "@/components/DynamicIcon";

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
  label?: string;
}

const iconCategories = {
  "Business & Work": [
    "Briefcase",
    "Trophy",
    "Target",
    "Lightbulb",
    "Star",
    "Rocket",
    "Building2",
    "TrendingUp",
    "BarChart3",
    "PieChart",
    "ChartLine",
    "Goal",
    "Award",
    "Medal",
    "BadgeCheck",
    "GitBranch",
  ],
  "People & Team": [
    "Users",
    "User",
    "UserCircle",
    "Handshake",
    "UserPlus",
    "UserMinus",
    "Users2",
    "UserCog",
    "UserCheck",
    "HeartHandshake",
    "UserSquare",
    "IdCard",
    "ClipboardList",
    "PersonStanding",
    "Group",
  ],
  "Objects & Tech": [
    "Gem",
    "Microscope",
    "Zap",
    "Sparkles",
    "Folder",
    "FileText",
    "Monitor",
    "Palette",
    "Camera",
    "Video",
    "Cpu",
    "HardDrive",
    "Database",
    "Server",
    "Cloud",
    "Wifi",
    "Bluetooth",
    "Usb",
  ],
  "Communication": [
    "Mail",
    "AtSign",
    "Phone",
    "Smartphone",
    "MessageCircle",
    "Send",
    "Megaphone",
    "Radio",
    "Globe",
    "MapPin",
    "Navigation",
    "Share2",
    "Link",
    "QrCode",
    "Bell",
    "BellRing",
    "Voicemail",
  ],
  "Media & Creative": [
    "Image",
    "Film",
    "Clapperboard",
    "Music",
    "Mic",
    "Headphones",
    "Speaker",
    "Volume2",
    "Play",
    "Pause",
    "SkipBack",
    "SkipForward",
    "RotateCw",
    "Scissors",
    "Eraser",
    "Pencil",
    "PenTool",
    "Brush",
  ],
  "Editing & Tools": [
    "Edit",
    "Edit3",
    "ScissorsSquare",
    "Highlighter",
    "Type",
    "Heading1",
    "Heading2",
    "Heading3",
    "Bold",
    "Italic",
    "Underline",
    "Strikethrough",
    "Code",
    "Terminal",
    "FileCode",
    "FileSearch",
    "FindReplace",
  ],
  "Settings & Controls": [
    "Settings",
    "Settings2",
    "Cog",
    "Sliders",
    "ToggleLeft",
    "ToggleRight",
    "Switch",
    "Knob",
    "Gauge",
    "Timer",
    "Watch",
    "AlarmClock",
    "Calendar",
    "Clock",
    "Hourglass",
    "Sun",
    "Moon",
    "SunMoon",
  ],
  "Success & Awards": [
    "CheckCircle",
    "CheckCircle2",
    "CircleCheck",
    "XCircle",
    "AlertCircle",
    "Info",
    "HelpCircle",
    "Flame",
    "Sparkle",
    "PartyPopper",
    "Confetti",
    "Wand2",
    "Sparkles",
    "ShootingStar",
    "StarHalf",
    "StarOff",
  ],
  "Actions": [
    "Plus",
    "Minus",
    "X",
    "Check",
    "RefreshCw",
    "RefreshCwOff",
    "RotateCcw",
    "ArrowUpDown",
    "ArrowLeftRight",
    "Move3D",
    "Expand",
    "Shrink",
    "Maximize",
    "Minimize",
    "Fullscreen",
    "Copy",
    "Trash2",
    "Download",
    "Upload",
  ],
};

const allIcons = Object.values(iconCategories).flat();

export default function IconPicker({ value, onChange, label }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    Object.keys(iconCategories)[0]
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleIconSelect = (iconName: string) => {
    try {
      onChange(iconName);
      setIsOpen(false);
    } catch (error) {
      console.error("Error selecting icon:", error);
    }
  };

  // Filter icons based on search
  const filteredIcons = searchQuery
    ? allIcons.filter((icon) =>
        icon.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : iconCategories[selectedCategory as keyof typeof iconCategories];

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
        <div className="flex items-center gap-2">
          {value ? (
            <DynamicIcon name={value} size={20} className="text-purple-600" />
          ) : (
            <span className="text-slate-400 text-sm">Select an icon</span>
          )}
          {value && (
            <span className="text-xs text-slate-500 capitalize">{value}</span>
          )}
        </div>
        <ChevronDown className="text-slate-400" size={18} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute z-20 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            {/* Search Bar */}
            <div className="p-3 border-b border-slate-200 bg-slate-50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Search icons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            {!searchQuery && (
              <>
                {/* Category Tabs */}
                <div className="border-b border-slate-200 bg-slate-50">
                  <div className="flex overflow-x-auto">
                    {Object.keys(iconCategories).map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors ${
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
              </>
            )}

            {/* Icon Grid */}
            <div className="p-4 max-h-72 overflow-y-auto">
              {filteredIcons.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-sm">
                  No icons found
                </div>
              ) : (
                <div className="grid grid-cols-6 gap-2">
                  {filteredIcons.map((iconName) => (
                    <button
                      key={iconName}
                      type="button"
                      onClick={() => handleIconSelect(iconName)}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors group ${
                        value === iconName
                          ? "bg-purple-100 border-2 border-purple-500"
                          : "hover:bg-purple-50 border-2 border-transparent"
                      }`}
                      title={iconName}
                    >
                      <DynamicIcon name={iconName} size={20} className="text-slate-700 group-hover:text-purple-600" />
                      <span className="text-[9px] text-slate-500 group-hover:text-purple-600 text-center leading-tight mt-1 capitalize truncate w-full">
                        {iconName.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <p className="text-xs text-slate-500">
                {value ? (
                  <>
                    Selected: <span className="font-medium text-purple-600 capitalize">{value}</span>
                  </>
                ) : (
                  "No icon selected"
                )}
              </p>
              {value && (
                <button
                  type="button"
                  onClick={() => {
                    onChange("");
                    setIsOpen(false);
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-medium"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
