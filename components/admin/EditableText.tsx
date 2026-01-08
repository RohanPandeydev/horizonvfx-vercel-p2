"use client";

import { useState, useEffect } from "react";

interface EditableTextProps {
  value: string;
  isEditing: boolean;
  onChange: (value: string) => void;
  className?: string;
  multiline?: boolean;
  style?: React.CSSProperties;
}

export default function EditableText({
  value,
  isEditing,
  onChange,
  className = "",
  multiline = false,
  style,
}: EditableTextProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleBlur = () => {
    onChange(localValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline && !e.shiftKey) {
      e.currentTarget.blur();
    }
    if (e.key === "Escape") {
      setLocalValue(value);
      e.currentTarget.blur();
    }
  };

  if (!isEditing) {
    return (
      <span className={className} style={style}>
        {value}
      </span>
    );
  }

  const Tag = multiline ? "textarea" : "input";

  return (
    <Tag
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`outline-none ring-2 ring-purple-500 ring-opacity-50 px-2 py-1 rounded ${className}`}
      style={style}
      rows={multiline ? 3 : undefined}
    />
  );
}
