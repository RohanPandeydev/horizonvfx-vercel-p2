// Content Types for CMS

export interface BaseContent {
  id: string;
  type: 'page' | 'section';
  lastModified: Date;
}

// Page Content Types
export interface PageContent extends BaseContent {
  type: 'page';
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  sections: SectionContent[];
  customStyles?: PageStyles;
}

export interface SectionContent {
  id: string;
  name: string; // e.g., 'hero', 'about', 'contact'
  type: string;
  content: Record<string, any>;
  styles?: SectionStyles;
  isVisible: boolean;
}

// Common Section Types
export interface HeaderContent {
  logo: {
    text: string;
    url?: string;
  };
  navigation: {
    label: string;
    href: string;
    isActive?: boolean;
  }[];
  styles: HeaderStyles;
}

export interface FooterContent {
  logo: {
    text: string;
    url?: string;
  };
  description: string;
  email: string;
  phones: string[];
  address: string;
  quickLinks: {
    name: string;
    href: string;
  }[];
  services: string[];
  stats: {
    projects: string;
    clients: string;
    years: string;
  };
  copyright: string;
  legalLinks: {
    label: string;
    href: string;
  }[];
  styles: FooterStyles;
}

// Hero Section
export interface HeroSectionContent {
  heading: string;
  subheading?: string;
  description?: string;
  backgroundImage?: {
    url: string;
    opacity?: number;
  };
  ctaButtons?: {
    text: string;
    href: string;
    variant: 'primary' | 'secondary' | 'outline';
  }[];
  styles?: HeroStyles;
}

// Contact Section
export interface ContactSectionContent {
  title: string;
  subtitle?: string;
  description?: string;
  email: string;
  phone?: string;
  address?: string;
  formFields?: {
    name: string;
    label: string;
    type: 'text' | 'email' | 'textarea';
    required: boolean;
    placeholder?: string;
  }[];
  styles?: ContactStyles;
}

// Style Types
export interface PageStyles {
  backgroundColor?: string;
  backgroundImage?: string;
  fontFamily?: string;
}

export interface SectionStyles {
  padding?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  margin?: {
    top?: string;
    bottom?: string;
  };
  backgroundColor?: string;
  backgroundImage?: string;
  textAlign?: 'left' | 'center' | 'right';
}

export interface HeaderStyles {
  backgroundColor?: string;
  textColor?: string;
  height?: string;
  position?: 'sticky' | 'fixed' | 'relative';
  border?: {
    bottom?: string;
    color?: string;
  };
}

export interface FooterStyles {
  backgroundColor?: string;
  textColor?: string;
  padding?: string;
}

export interface HeroStyles {
  height?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  overlay?: {
    color?: string;
    opacity?: number;
  };
  textAlign?: 'left' | 'center' | 'right';
}

export interface ContactStyles {
  backgroundColor?: string;
  titleColor?: string;
  textColor?: string;
}

// API Response Types
export interface ContentResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export interface SaveContentRequest {
  pageId: string;
  content: PageContent | HeaderContent | FooterContent;
}

// Admin Types
export interface EditableField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'color' | 'number' | 'image' | 'link' | 'richtext';
  value: any;
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
  };
}

export interface EditorConfig {
  pageId: string;
  sections: {
    id: string;
    name: string;
    editable: boolean;
    fields: EditableField[];
  }[];
}
