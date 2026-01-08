'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { contentStorage } from '@/lib/storage/content-storage';

interface Field {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'color' | 'number' | 'link' | 'array';
  value: any;
  path?: string; // For nested objects like 'logo.text'
  arrayItem?: boolean; // Mark if this is an array item
  arrayIndex?: number; // Track array index
}

export default function EditPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [fields, setFields] = useState<Field[]>([]);
  const [contentType, setContentType] = useState<'page' | 'header' | 'footer'>('page');
  const [pageTitle, setPageTitle] = useState('');

  // Load content based on slug
  useEffect(() => {
    loadContent();
  }, [slug]);

  const loadContent = () => {
    setIsLoading(true);

    // Check if it's a common section
    if (slug === 'header') {
      setContentType('header');
      setPageTitle('Header');
      const header = contentStorage.getHeader();
      console.log('Header content:', header);
      const fields = flattenObject(header);
      console.log('Header fields:', fields);
      setFields(fields);
    } else if (slug === 'footer') {
      setContentType('footer');
      setPageTitle('Footer');
      const footer = contentStorage.getFooter();
      console.log('Footer content:', footer);
      const fields = flattenObject(footer);
      console.log('Footer fields:', fields);
      console.log('Number of fields:', fields.length);
      setFields(fields);
    } else {
      // It's a page
      setContentType('page');
      const pageSlug = slug === 'home' ? '' : slug;
      const page = contentStorage.getPage(pageSlug);

      if (page) {
        setPageTitle(page.title);
        const flatFields: Field[] = [];

        // Add page metadata
        flatFields.push(
          { key: 'title', label: 'Page Title', type: 'text', value: page.title },
          { key: 'metaTitle', label: 'Meta Title', type: 'text', value: page.metaTitle || '' },
          { key: 'metaDescription', label: 'Meta Description', type: 'textarea', value: page.metaDescription || '' }
        );

        // Add sections
        page.sections.forEach(section => {
          if (section.isVisible) {
            const sectionFields = flattenObject(section.content, `sections.${section.id}`);
            flatFields.push(...sectionFields);
          }
        });

        setFields(flatFields);
      }
    }

    setIsLoading(false);
  };

  // Flatten nested object for easy editing
  const flattenObject = (obj: any, prefix = ''): Field[] => {
    const fields: Field[] = [];

    console.log('Flattening object:', obj);
    console.log('Prefix:', prefix);

    const flatten = (o: any, p: string, parentLabel = '', arrayIndex?: number) => {
      const keys = Object.keys(o);
      console.log('Processing keys:', keys, 'parentLabel:', parentLabel);

      keys.forEach(key => {
        const value = o[key];
        const path = p ? `${p}.${key}` : key;
        const baseLabel = parentLabel || key;
        const label = arrayIndex !== undefined
          ? `${parentLabel.replace(/\[\d+\]/, '')} [${arrayIndex + 1}] - ${key}`
          : (parentLabel ? `${parentLabel} - ${key}` : key);

        console.log(`Processing key: ${key}, type: ${typeof value}, isArray: ${Array.isArray(value)}`);

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          console.log(`Recursing into object: ${key}`);
          flatten(value, path, label, arrayIndex);
        } else if (Array.isArray(value)) {
          console.log(`Found array: ${key} with ${value.length} items`);
          // Handle arrays - expand each item
          value.forEach((item, index) => {
            if (typeof item === 'object' && item !== null) {
              // Array of objects - expand each object's properties
              Object.keys(item).forEach(itemKey => {
                const itemValue = item[itemKey];
                const itemPath = `${path}[${index}].${itemKey}`;
                const itemLabel = `${baseLabel} [${index + 1}] - ${itemKey}`;

                // Determine field type
                let fieldType: Field['type'] = 'text';
                if (itemKey.includes('color') || itemKey.includes('Color')) {
                  fieldType = 'color';
                } else if (itemKey.includes('description') || itemKey.includes('Description')) {
                  fieldType = 'textarea';
                } else if (typeof itemValue === 'number') {
                  fieldType = 'number';
                } else if (itemKey.includes('url') || itemKey.includes('href') || itemKey.includes('Url')) {
                  fieldType = 'link';
                }

                console.log(`Adding field from array object: ${itemPath} = ${itemValue}`);
                fields.push({
                  key: itemPath,
                  label: itemLabel.charAt(0).toUpperCase() + itemLabel.slice(1),
                  type: fieldType,
                  value: itemValue,
                  arrayItem: true,
                  arrayIndex: index,
                });
              });
            } else {
              // Array of primitives (strings, numbers)
              const itemPath = `${path}[${index}]`;
              const itemLabel = `${baseLabel} [${index + 1}]`;

              console.log(`Adding field from array primitive: ${itemPath} = ${item}`);
              fields.push({
                key: itemPath,
                label: itemLabel.charAt(0).toUpperCase() + itemLabel.slice(1),
                type: typeof item === 'number' ? 'number' : 'text',
                value: item,
                arrayItem: true,
                arrayIndex: index,
              });
            }
          });
        } else {
          // Determine field type
          let fieldType: Field['type'] = 'text';
          if (key.includes('color') || key.includes('Color')) {
            fieldType = 'color';
          } else if (key.includes('description') || key.includes('Description') || key === 'content') {
            fieldType = 'textarea';
          } else if (typeof value === 'number') {
            fieldType = 'number';
          } else if (key.includes('url') || key.includes('href') || key.includes('Url')) {
            fieldType = 'link';
          }

          // Skip certain fields
          if (key !== 'id' && key !== 'type' && key !== 'isActive') {
            console.log(`Adding field: ${path} = ${value}`);
            fields.push({
              key: path,
              label: label.charAt(0).toUpperCase() + label.slice(1),
              type: fieldType,
              value,
            });
          }
        }
      });
    };

    flatten(obj, prefix);
    console.log('Final fields array:', fields);
    return fields;
  };

  const updateFieldValue = (key: string, newValue: any) => {
    setFields(fields.map(f =>
      f.key === key ? { ...f, value: newValue } : f
    ));
    setHasChanges(true);
  };

  const saveContent = () => {
    setIsSaving(true);
    setSaveMessage('');

    // Reconstruct the content object from flat fields
    const content: any = {};

    fields.forEach(field => {
      setNestedValue(content, field.key, field.value);
    });

    // Save based on content type
    try {
      if (contentType === 'header') {
        contentStorage.saveHeader(content);
      } else if (contentType === 'footer') {
        contentStorage.saveFooter(content);
      } else {
        // For pages, we need to merge with existing sections
        const pageSlug = slug === 'home' ? '' : slug;
        const existingPage = contentStorage.getPage(pageSlug);

        if (existingPage) {
          // Update metadata
          existingPage.title = content.title || existingPage.title;
          existingPage.metaTitle = content.metaTitle;
          existingPage.metaDescription = content.metaDescription;

          // Update sections
          if (content.sections) {
            Object.keys(content.sections).forEach(sectionId => {
              const section = existingPage.sections.find(s => s.id === sectionId);
              if (section) {
              section.content = content.sections[sectionId];
              }
            });
          }

          contentStorage.savePage(pageSlug, existingPage);
        }
      }

      setSaveMessage('Changes saved successfully!');
      setHasChanges(false);
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Error saving changes. Please try again.');
      console.error('Save error:', error);
    }

    setIsSaving(false);
  };

  // Helper function to set nested values including array paths
  const setNestedValue = (obj: any, path: string, value: any) => {
    const keys = path.split('.');
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
      let key = keys[i];
      // Handle array notation like "phones[0]"
      const arrayMatch = key.match(/^(.+)\[(\d+)\]$/);
      if (arrayMatch) {
        const arrayKey = arrayMatch[1];
        const arrayIndex = parseInt(arrayMatch[2]);
        if (!current[arrayKey]) {
          current[arrayKey] = [];
        }
        if (!current[arrayKey][arrayIndex]) {
          current[arrayKey][arrayIndex] = {};
        }
        current = current[arrayKey][arrayIndex];
      } else {
        if (!current[key]) {
          current[key] = {};
        }
        current = current[key];
      }
    }

    // Set the final value
    let finalKey = keys[keys.length - 1];
    const arrayMatch = finalKey.match(/^(.+)\[(\d+)\]$/);
    if (arrayMatch) {
      const arrayKey = arrayMatch[1];
      const arrayIndex = parseInt(arrayMatch[2]);
      if (!current[arrayKey]) {
        current[arrayKey] = [];
      }
      current[arrayKey][arrayIndex] = value;
    } else {
      current[finalKey] = value;
    }
  };

  const cancelChanges = () => {
    loadContent();
    setHasChanges(false);
    setSaveMessage('');
  };

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '18px', color: '#666' }}>Loading...</div>
        </div>
      </div>
    );
  }

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link
            href="/admin/dashboard"
            style={{
              color: '#666',
              textDecoration: 'none',
              fontSize: '14px',
            }}
          >
            ← Back to Dashboard
          </Link>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#333' }}>
              Edit: {pageTitle}
            </h1>
            <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#666' }}>
              {contentType === 'page' ? 'Page' : 'Common Section'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {hasChanges && (
            <>
              <button
                onClick={cancelChanges}
                disabled={isSaving}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#fff',
                  color: '#666',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                  cursor: isSaving ? 'not-allowed' : 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={saveContent}
                disabled={isSaving}
                style={{
                  padding: '10px 20px',
                  backgroundColor: isSaving ? '#999' : '#0066cc',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                  cursor: isSaving ? 'not-allowed' : 'pointer',
                }}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div style={{
          backgroundColor: saveMessage.includes('Error') ? '#fee' : '#efe',
          color: saveMessage.includes('Error') ? '#c00' : '#080',
          padding: '12px 20px',
          textAlign: 'center',
          fontSize: '14px',
          borderBottom: `1px solid ${saveMessage.includes('Error') ? '#fcc' : '#cfc'}`,
        }}>
          {saveMessage}
        </div>
      )}

      {/* Main Content */}
      <div style={{ padding: '30px' }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: '#fff',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
          padding: '30px',
        }}>
          <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#333' }}>
            Content Fields
          </h2>

          {fields.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
              No editable fields found for this {contentType}.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {fields.map((field) => (
                <div key={field.key}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#333',
                    marginBottom: '8px',
                  }}>
                    {field.label}
                  </label>

                  {field.type === 'textarea' ? (
                    <textarea
                      value={field.value}
                      onChange={(e) => updateFieldValue(field.key, e.target.value)}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      style={{
                        width: '100%',
                        minHeight: '120px',
                        padding: '10px 12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        resize: 'vertical',
                      }}
                    />
                  ) : field.type === 'color' ? (
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <input
                        type="color"
                        value={field.value || '#000000'}
                        onChange={(e) => updateFieldValue(field.key, e.target.value)}
                        style={{
                          width: '60px',
                          height: '40px',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      />
                      <input
                        type="text"
                        value={field.value || ''}
                        onChange={(e) => updateFieldValue(field.key, e.target.value)}
                        placeholder="#000000"
                        style={{
                          flex: 1,
                          padding: '10px 12px',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          fontSize: '14px',
                        }}
                      />
                    </div>
                  ) : field.type === 'number' ? (
                    <input
                      type="number"
                      value={field.value || ''}
                      onChange={(e) => updateFieldValue(field.key, parseFloat(e.target.value))}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                      }}
                    />
                  ) : (
                    <input
                      type="text"
                      value={field.value || ''}
                      onChange={(e) => updateFieldValue(field.key, e.target.value)}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Help Text */}
          <div style={{
            marginTop: '30px',
            padding: '15px',
            backgroundColor: '#f9f9f9',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            fontSize: '13px',
            color: '#666',
          }}>
            <strong>Tip:</strong> Changes made here will be saved to your browser's local storage.
            In production, this will be saved to a database and reflect immediately on your website.
          </div>
        </div>
      </div>
    </div>
  );
}
