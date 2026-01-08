'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'pages' | 'sections'>('pages');

  const pages = [
    { slug: '', name: 'Home', icon: '🏠', description: 'Landing page' },
    { slug: 'about', name: 'About', icon: 'ℹ️', description: 'About us page' },
    { slug: 'showcase', name: 'Showcase', icon: '🎬', description: 'Portfolio showcase' },
    { slug: 'team', name: 'Team', icon: '👥', description: 'Team members' },
    { slug: 'contact', name: 'Contact', icon: '📧', description: 'Contact form' },
  ];

  const sections = [
    { id: 'header', name: 'Header', icon: '🔝', description: 'Navigation and logo' },
    { id: 'footer', name: 'Footer', icon: '⬇️', description: 'Footer content and links' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #e0e0e0',
        padding: '20px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#333' }}>
            Admin Dashboard
          </h1>
          <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#666' }}>
            Manage your website content
          </p>
        </div>
        <Link
          href="/"
          style={{
            padding: '10px 20px',
            backgroundColor: '#0066cc',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '14px',
          }}
        >
          View Website
        </Link>
      </div>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 100px)' }}>
        {/* Sidebar */}
        <div style={{
          width: '250px',
          backgroundColor: '#fff',
          borderRight: '1px solid #e0e0e0',
          padding: '20px 0',
        }}>
          <nav>
            <div style={{ padding: '10px 20px' }}>
              <button
                onClick={() => setActiveTab('pages')}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: activeTab === 'pages' ? '#e6f2ff' : 'transparent',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '15px',
                  color: activeTab === 'pages' ? '#0066cc' : '#333',
                  fontWeight: activeTab === 'pages' ? '600' : '400',
                  marginBottom: '5px',
                }}
              >
                📄 Pages
              </button>
              <button
                onClick={() => setActiveTab('sections')}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: activeTab === 'sections' ? '#e6f2ff' : 'transparent',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '15px',
                  color: activeTab === 'sections' ? '#0066cc' : '#333',
                  fontWeight: activeTab === 'sections' ? '600' : '400',
                }}
              >
                🧩 Common Sections
              </button>
            </div>

            <div style={{
              borderTop: '1px solid #e0e0e0',
              marginTop: '20px',
              paddingTop: '20px',
              padding: '10px 20px',
            }}>
              <Link
                href="/admin/settings"
                style={{
                  display: 'block',
                  padding: '12px 16px',
                  color: '#333',
                  textDecoration: 'none',
                  fontSize: '15px',
                  borderRadius: '6px',
                  marginBottom: '5px',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                ⚙️ Settings
              </Link>
              <Link
                href="/admin/media"
                style={{
                  display: 'block',
                  padding: '12px 16px',
                  color: '#333',
                  textDecoration: 'none',
                  fontSize: '15px',
                  borderRadius: '6px',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                🖼️ Media Library
              </Link>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '30px' }}>
          {activeTab === 'pages' ? (
            <div>
              <h2 style={{ margin: '0 0 20px 0', fontSize: '20px', color: '#333' }}>
                Pages
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px',
              }}>
                {pages.map((page) => (
                  <Link
                    key={page.slug}
                    href={`/admin/edit/${page.slug || 'home'}`}
                    style={{
                      display: 'block',
                      backgroundColor: '#fff',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      padding: '20px',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#0066cc';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e0e0e0';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontSize: '32px', marginRight: '12px' }}>{page.icon}</span>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '18px', color: '#333' }}>
                          {page.name}
                        </h3>
                        <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#999' }}>
                          {page.description}
                        </p>
                        <p style={{ margin: '0', fontSize: '12px', color: '#bbb' }}>
                          /{page.slug || 'home'}
                        </p>
                      </div>
                    </div>
                    <div style={{
                      marginTop: '15px',
                      paddingTop: '15px',
                      borderTop: '1px solid #f0f0f0',
                      fontSize: '13px',
                      color: '#0066cc',
                      fontWeight: '500',
                    }}>
                      Edit Page →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h2 style={{ margin: '0 0 20px 0', fontSize: '20px', color: '#333' }}>
                Common Sections
              </h2>
              <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#666' }}>
                These sections appear across multiple pages. Changes here will reflect everywhere.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px',
              }}>
                {sections.map((section) => (
                  <Link
                    key={section.id}
                    href={`/admin/edit/${section.id}`}
                    style={{
                      display: 'block',
                      backgroundColor: '#fff',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      padding: '20px',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#0066cc';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e0e0e0';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontSize: '32px', marginRight: '12px' }}>{section.icon}</span>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '18px', color: '#333' }}>
                          {section.name}
                        </h3>
                        <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#999' }}>
                          {section.description}
                        </p>
                      </div>
                    </div>
                    <div style={{
                      marginTop: '15px',
                      paddingTop: '15px',
                      borderTop: '1px solid #f0f0f0',
                      fontSize: '13px',
                      color: '#0066cc',
                      fontWeight: '500',
                    }}>
                      Edit Section →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
