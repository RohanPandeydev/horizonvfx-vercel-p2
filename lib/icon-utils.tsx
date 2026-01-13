"use client";

import DynamicIcon from "@/components/DynamicIcon";
import React from "react";

// Color palette for icons
export const iconColors = [
  "text-purple-400",
  "text-blue-400",
  "text-cyan-400",
  "text-green-400",
  "text-emerald-400",
  "text-teal-400",
  "text-pink-400",
  "text-rose-400",
  "text-orange-400",
  "text-amber-400",
  "text-yellow-400",
  "text-lime-400",
  "text-indigo-400",
  "text-violet-400",
  "text-fuchsia-400",
  "text-sky-400",
];

// Get a consistent color for an icon based on its name (hash-based)
export function getIconColor(iconName: string): string {
  if (!iconName) return iconColors[0];

  // Simple hash function to get consistent color for same icon name
  let hash = 0;
  for (let i = 0; i < iconName.length; i++) {
    hash = iconName.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % iconColors.length;
  return iconColors[index];
}

// Get random color (for dynamic variations)
export function getRandomIconColor(): string {
  return iconColors[Math.floor(Math.random() * iconColors.length)];
}

// Extended DynamicIcon component with color support
interface ColoredIconProps {
  name: string;
  size?: number;
  className?: string;
  color?: string;
  useRandomColor?: boolean;
}

export function ColoredIcon({
  name,
  size = 20,
  className = "",
  color,
  useRandomColor = false,
}: ColoredIconProps) {
  const iconColor = color || (useRandomColor ? getRandomIconColor() : getIconColor(name));

  return (
    <DynamicIcon
      name={name}
      size={size}
      className={`${iconColor} ${className}`}
    />
  );
}

// Gradient color pairs for icon backgrounds
export const iconGradients = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500",
  "from-cyan-500 to-blue-500",
  "from-pink-500 to-rose-500",
  "from-indigo-500 to-purple-500",
  "from-teal-500 to-cyan-500",
  "from-amber-500 to-orange-500",
  "from-lime-500 to-green-500",
];

export function getIconGradient(iconName: string): string {
  if (!iconName) return iconGradients[0];

  let hash = 0;
  for (let i = 0; i < iconName.length; i++) {
    hash = iconName.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % iconGradients.length;
  return iconGradients[index];
}

export function getRandomIconGradient(): string {
  return iconGradients[Math.floor(Math.random() * iconGradients.length)];
}
