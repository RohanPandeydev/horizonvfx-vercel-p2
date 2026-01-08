// Local storage utilities for content management
// In production, this will be replaced with API calls

import { PageContent, HeaderContent, FooterContent, HeroSectionContent, ContactSectionContent } from '../types/content';

const STORAGE_KEYS = {
  PAGES: 'horizonvfx_pages',
  HEADER: 'horizonvfx_header',
  FOOTER: 'horizonvfx_footer',
  LAST_MODIFIED: 'horizonvfx_last_modified',
};

// Default content
const DEFAULT_HEADER: HeaderContent = {
  logo: {
    text: 'HorizonVFX',
    url: 'https://horizonvfx.in/images/logo.png',
  },
  navigation: [
    { label: 'Home', href: '/', isActive: true },
    { label: 'About Us', href: '/about' },
    { label: 'Team', href: '/team' },
    { label: 'Showcase', href: '/showcase' },
    { label: 'Contact Us', href: '/contact' },
  ],
  styles: {
    backgroundColor: '#000000',
    textColor: '#ffffff',
    height: '80px',
    position: 'sticky',
  },
};

const DEFAULT_FOOTER: FooterContent = {
  logo: {
    text: 'HorizonVFX',
    url: 'https://horizonvfx.in/images/logo.png',
  },
  description: 'We craft visual experiences that push the boundaries of imagination. From concept to final delivery, we bring your vision to life.',
  email: 'info@horizonvfx.in',
  phones: ['+91 974 871 2372', '+91 876 702 5601'],
  address: 'Mumbai, India',
  quickLinks: [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Team', href: '/team' },
    { name: 'Showcase', href: '/showcase' },
    { name: 'Services', href: '/' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    'Visual Effects',
    '3D Animation',
    'Compositing',
    'Color Grading',
    'Motion Graphics',
    'Post Production',
  ],
  stats: {
    projects: '50+',
    clients: '20+',
    years: '5+',
  },
  copyright: '© 2024 HorizonVFX. All rights reserved.',
  legalLinks: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
  styles: {
    backgroundColor: '#000000',
    textColor: '#ffffff',
    padding: '60px 20px 20px',
  },
};

const DEFAULT_PAGES: Record<string, PageContent> = {
  home: {
    id: 'home',
    type: 'page',
    slug: '',
    title: 'Home',
    metaTitle: 'HorizonVFX - Visual Effects Studio',
    metaDescription: 'Creating visual experiences that transcend reality',
    sections: [
      {
        id: 'hero',
        name: 'hero',
        type: 'hero',
        content: {
          heading: 'Welcome to HorizonVFX',
          subheading: 'Visual Excellence',
          description: 'We create stunning visual effects that bring your imagination to life.',
          ctaButtons: [
            { text: 'View Our Work', href: '/showcase', variant: 'primary' },
            { text: 'Contact Us', href: '/contact', variant: 'secondary' },
          ],
        },
        styles: {
          height: '100vh',
          textAlign: 'center',
        },
        isVisible: true,
      },
    ],
  },
  about: {
    id: 'about',
    type: 'page',
    slug: 'about',
    title: 'About',
    sections: [],
  },
  contact: {
    id: 'contact',
    type: 'page',
    slug: 'contact',
    title: 'Contact',
    sections: [
      {
        id: 'contact-section',
        name: 'contact',
        type: 'contact',
        content: {
          title: 'Get in Touch',
          subtitle: 'Let\'s Create Together',
          description: 'Have a project in mind? We\'d love to hear about it.',
          email: 'hello@horizonvfx.com',
          phone: '+1 (555) 123-4567',
          address: '123 Creative Street, Design City, DC 10001',
        },
        isVisible: true,
      },
    ],
  },
  showcase: {
    id: 'showcase',
    type: 'page',
    slug: 'showcase',
    title: 'Showcase',
    sections: [],
  },
  team: {
    id: 'team',
    type: 'page',
    slug: 'team',
    title: 'Team',
    sections: [],
  },
};

// Storage functions
export const contentStorage = {
  // Get all pages
  getPages(): Record<string, PageContent> {
    if (typeof window === 'undefined') return DEFAULT_PAGES;
    const stored = localStorage.getItem(STORAGE_KEYS.PAGES);
    return stored ? JSON.parse(stored) : DEFAULT_PAGES;
  },

  // Get single page
  getPage(slug: string): PageContent | null {
    const pages = this.getPages();
    return pages[slug] || null;
  },

  // Save page
  savePage(slug: string, content: PageContent): void {
    if (typeof window === 'undefined') return;
    const pages = this.getPages();
    pages[slug] = { ...content, lastModified: new Date() };
    localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(pages));
    localStorage.setItem(STORAGE_KEYS.LAST_MODIFIED, new Date().toISOString());
  },

  // Get header
  getHeader(): HeaderContent {
    if (typeof window === 'undefined') return DEFAULT_HEADER;
    const stored = localStorage.getItem(STORAGE_KEYS.HEADER);
    return stored ? JSON.parse(stored) : DEFAULT_HEADER;
  },

  // Save header
  saveHeader(content: HeaderContent): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.HEADER, JSON.stringify(content));
    localStorage.setItem(STORAGE_KEYS.LAST_MODIFIED, new Date().toISOString());
  },

  // Get footer
  getFooter(): FooterContent {
    if (typeof window === 'undefined') return DEFAULT_FOOTER;
    const stored = localStorage.getItem(STORAGE_KEYS.FOOTER);
    return stored ? JSON.parse(stored) : DEFAULT_FOOTER;
  },

  // Save footer
  saveFooter(content: FooterContent): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.FOOTER, JSON.stringify(content));
    localStorage.setItem(STORAGE_KEYS.LAST_MODIFIED, new Date().toISOString());
  },

  // Initialize default content
  initializeDefaults(): void {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem(STORAGE_KEYS.PAGES)) {
      localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(DEFAULT_PAGES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.HEADER)) {
      localStorage.setItem(STORAGE_KEYS.HEADER, JSON.stringify(DEFAULT_HEADER));
    }
    if (!localStorage.getItem(STORAGE_KEYS.FOOTER)) {
      localStorage.setItem(STORAGE_KEYS.FOOTER, JSON.stringify(DEFAULT_FOOTER));
    }
  },

  // Clear all content (reset to defaults)
  clearAll(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.PAGES);
    localStorage.removeItem(STORAGE_KEYS.HEADER);
    localStorage.removeItem(STORAGE_KEYS.FOOTER);
    localStorage.removeItem(STORAGE_KEYS.LAST_MODIFIED);
    this.initializeDefaults();
  },

  // Get last modified time
  getLastModified(): Date | null {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(STORAGE_KEYS.LAST_MODIFIED);
    return stored ? new Date(stored) : null;
  },
};

// Initialize on load
if (typeof window !== 'undefined') {
  contentStorage.initializeDefaults();
}
