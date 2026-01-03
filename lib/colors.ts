// Global Color Constants for HorizonVFX

// Primary Colors
export const COLORS = {
  // Blue variants
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e3a8a',
    900: '#1e40af',
  },

  // Green variants
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },

  // Purple variants
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
  },

  // Cyan variants
  cyan: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
  },

  // Emerald variants
  emerald: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },

  // Teal variants
  teal: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },

  // Gray variants
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712',
  },

  // Zinc variants
  zinc: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
  },
} as const;

// Gradient definitions
export const GRADIENTS = {
  // Primary gradient
  primary: 'linear-gradient(135deg, #1e3a8a 0%, #10b981 50%, #3b82f6 100%)',
  primaryLight: 'linear-gradient(135deg, #3b82f6 0%, #10b981 50%, #8b5cf6 100%)',

  // Text gradients
  textBlue: 'linear-gradient(to right, #60a5fa, #bfdbfe)',
  textGreen: 'linear-gradient(to right, #4ade80, #86efac)',
  textCyan: 'linear-gradient(to right, #22d3ee, #67e8f9)',
  textPurple: 'linear-gradient(to right, #c084fc, #d8b4fe)',
  textEmerald: 'linear-gradient(to right, #34d399, #6ee7b7)',
  textTeal: 'linear-gradient(to right, #2dd4bf, #5eead4)',

  // Multi-color gradients
  rainbow: 'linear-gradient(to right, #3b82f6, #10b981, #a855f7)',
  sunset: 'linear-gradient(to right, #3b82f6, #10b981, #f59e0b)',
  ocean: 'linear-gradient(to right, #06b6d4, #3b82f6, #10b981)',

  // Subtle background gradients
  blueGreen: 'linear-gradient(to right, #3b82f6, #10b981)',
  greenBlue: 'linear-gradient(to right, #10b981, #3b82f6)',

  // Hero gradient
  hero: 'linear-gradient(135deg, #1e3a8a 0%, #10b981 50%, #3b82f6 100%)',
  heroAnimated: 'linear-gradient(135deg, #1e3a8a 0%, #10b981 50%, #3b82f6 100%)',

  // Border gradient
  border: 'linear-gradient(to right, #3b82f6, #10b981)',
  borderPurple: 'linear-gradient(to right, #3b82f6, #10b981, #a855f7)',
} as const;

// Tailwind class constants
export const TW = {
  // Background colors
  bgBlack: 'bg-black',
  bgZinc900: 'bg-zinc-900',
  bgZinc800: 'bg-zinc-800',

  // Text colors
  textWhite: 'text-white',
  textGray300: 'text-gray-300',
  textGray400: 'text-gray-400',
  textGray500: 'text-gray-500',

  // Border colors
  borderWhite10: 'border-white/10',
  borderWhite20: 'border-white/20',

  // Gradient text classes
  gradientText: {
    white: 'bg-gradient-to-r from-white to-white bg-clip-text text-transparent',
    blue: 'bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent',
    green: 'bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent',
    purple: 'bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent',
    cyan: 'bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent',
    emerald: 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent',
    whiteBlue: 'bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent',
    whiteGreen: 'bg-gradient-to-r from-white via-green-200 to-white bg-clip-text text-transparent',
    whitePurple: 'bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent',
  },

  // Gradient backgrounds
  gradientBg: {
    black: 'bg-gradient-to-b from-black to-zinc-950',
    blackZinc: 'bg-gradient-to-b from-black via-zinc-900 to-black',
    zincBlack: 'bg-gradient-to-b from-zinc-900 to-black',
    blueGreen: 'bg-gradient-to-r from-blue-500 to-green-500',
  },

  // Animations
  animate: {
    pulse: 'animate-pulse',
    bounce: 'animate-bounce',
  },
} as const;

// RGBA colors with opacity
export const RGBA = {
  blue500: 'rgba(59, 130, 246, 1)',
  blue50020: 'rgba(59, 130, 246, 0.2)',
  blue50050: 'rgba(59, 130, 246, 0.5)',
  blue50010: 'rgba(59, 130, 246, 0.1)',

  green500: 'rgba(16, 185, 129, 1)',
  green50020: 'rgba(16, 185, 129, 0.2)',
  green50050: 'rgba(16, 185, 129, 0.5)',
  green50010: 'rgba(16, 185, 129, 0.1)',

  purple500: 'rgba(168, 85, 247, 1)',
  purple50010: 'rgba(168, 85, 247, 0.1)',
  purple50020: 'rgba(168, 85, 247, 0.2)',

  white: 'rgba(255, 255, 255, 1)',
  white30: 'rgba(255, 255, 255, 0.3)',
  white50: 'rgba(255, 255, 255, 0.5)',
  white10: 'rgba(255, 255, 255, 0.1)',
  white5: 'rgba(255, 255, 255, 0.05)',

  cyan400: 'rgba(34, 211, 238, 1)',
  emerald400: 'rgba(52, 211, 153, 1)',
  teal400: 'rgba(45, 212, 191, 1)',
} as const;

// Z-index layers
export const Z_INDEX = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  loader: 100,
  cursor: 60,
  nav: 50,
} as const;

// Spacing scale
export const SPACING = {
  xs: '0.5rem',   // 8px
  sm: '0.75rem',  // 12px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '3rem',  // 48px
  '3xl': '4rem',  // 64px
} as const;

// Border radius
export const RADIUS = {
  sm: '0.25rem',   // 4px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  '2xl': '1.5rem', // 24px
  full: '9999px',
} as const;

// Font sizes
export const FONT_SIZE = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem',  // 36px
  '5xl': '3rem',     // 48px
  '6xl': '3.75rem',  // 60px
  '7xl': '4.5rem',   // 72px
} as const;

// Animation durations
export const DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 700,
} as const;

// Common transitions
export const TRANSITIONS = {
  fast: 'transition-all duration-150',
  normal: 'transition-all duration-300',
  slow: 'transition-all duration-500',
  color: 'transition-colors duration-300',
  transform: 'transition-transform duration-300',
} as const;

// Breakpoints (for reference)
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Export colors as default for convenience
export default COLORS;
