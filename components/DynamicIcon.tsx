"use client";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface DynamicIconProps {
  name: string;
  size?: number;
  className?: string;
}

export default function DynamicIcon({
  name,
  size = 20,
  className = "",
}: DynamicIconProps) {
  try {
    // Handle empty or undefined icon
    if (!name || name.trim() === "") {
      return null;
    }

    // Check if it's an emoji (contains emoji characters or special symbols)
    // This regex matches common emoji patterns
    const isEmoji = /^[\p{Emoji}\p{Emoji_Component}🎬👨‍🎨🤝⭐🏆👥📊🌟🔬]+$/u.test(name) ||
                    /^[:;][)\-D]|XD|<3|👍|❤️|💡|🚀|⚡|🎯|🏅|🥇|🥈|🥉|🎖️|💪|👏|🙌|✨|🎉|💼|📈|🎥|📷|🎨|🖥️|📁|📝|💎|🔬|⚡|🌟|✉️|📧|📞|📱|💬|📢|📣|👁️|🌐|📍|🙋|🧑‍💻|👨‍🚀|👩‍🚀|👁️|🎬|👨‍💼|👩‍💼|🤝|👨‍🎨|👩‍🎨|🙋|🏗️/.test(name);

    if (isEmoji) {
      // Render emoji with proper sizing - keep original emoji colors
      const fontSize = size ? `${size}px` : "1.5rem";
      return <span className={className} style={{ fontSize, lineHeight: 1 }}>{name}</span>;
    }

    // Try to get the Lucide icon component with proper type checking
    const IconComponent = LucideIcons[name as keyof typeof LucideIcons] as LucideIcon | undefined;

    // If icon exists in Lucide, render it with provided className (for colors)
    if (IconComponent) {
      const Component = IconComponent;
      return <Component size={size} className={className} />;
    }

    // Fallback: try to render as emoji (for backwards compatibility with old data)
    // If it looks like it might be an icon name but wasn't found in Lucide
    if (name.length <= 5) {
      return <span className={className} style={{ fontSize: `${size}px`, lineHeight: 1 }}>{name}</span>;
    }

    // Last resort: don't render anything for unknown long strings
    return null;
  } catch (error) {
    console.error("Error rendering icon:", name, error);
    return null;
  }
}
