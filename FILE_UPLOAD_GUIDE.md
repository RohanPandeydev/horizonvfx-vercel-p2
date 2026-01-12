# File Upload with Validation - Admin Panel

This guide explains how to use the file upload functionality with validation across all admin pages.

## 📦 Components

### 1. Global Validation Utility (`lib/validation.ts`)

Provides reusable file validation functions:

- **`validateImageFile(file, maxSizeMB)`** - Validates image files
  - Default max size: 5MB
  - Allowed types: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.svg`
  - Validates both file extension and MIME type

- **`validateVideoFile(file, maxSizeMB)`** - Validates video files
  - Default max size: 50MB
  - Allowed types: `.mp4`, `.webm`, `.mov`, `.avi`

- **`validateFile(file, options)`** - Generic file validator
  - Customizable max size, extensions, and MIME types

- **`handleFileUploadWithValidation(file, validateFn, onSuccess, onError)`** - Handles upload with validation

- **`formatFileSize(bytes)`** - Formats file size for display (e.g., "2.5 MB")

### 2. FileUpload Component (`components/admin/FileUpload.tsx`)

Reusable component for file uploads with the following features:
- Drag-and-drop style upload button
- URL input fallback
- Image/video preview
- Built-in validation
- Error handling with toast notifications
- Configurable max file size
- Support for images and videos

## 🚀 Usage

### Basic Example (Image Upload)

```tsx
import FileUpload from "@/components/admin/FileUpload";

function MyAdminPage() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <FileUpload
      label="Profile Image"
      value={imageUrl}
      onChange={setImageUrl}
      accept="image"
      maxSizeMB={5}
      placeholder="Or enter image URL"
    />
  );
}
```

### Video Upload Example

```tsx
<FileUpload
  label="Hero Video"
  value={videoUrl}
  onChange={setVideoUrl}
  accept="video"
  maxSizeMB={50}
  placeholder="Or enter video URL"
/>
```

### With Custom Error Handling

```tsx
<FileUpload
  label="Banner Image"
  value={bannerUrl}
  onChange={(url) => updateContent("hero", { banner: url })}
  onError={(error) => console.error("Upload failed:", error)}
  onSuccess={(url) => console.log("Uploaded:", url)}
  accept="image"
  maxSizeMB={10}
/>
```

## 📝 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text for the field |
| `value` | `string` | **Required** | Current URL value |
| `onChange` | `(url: string) => void` | **Required** | Callback when URL changes |
| `accept` | `"image" \| "video"` | `"image"` | File type to accept |
| `maxSizeMB` | `number` | `5` | Maximum file size in MB |
| `placeholder` | `string` | `"Or enter image URL"` | Placeholder text for URL input |
| `showPreview` | `boolean` | `true` | Show preview of uploaded file |
| `className` | `string` | `""` | Additional CSS classes |
| `onError` | `(error: string) => void` | - | Error callback |
| `onSuccess` | `(message: string) => void` | - | Success callback |

## ✅ Validation Rules

### Images
- **Max Size**: 5MB (configurable)
- **Allowed Extensions**: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.svg`
- **MIME Types**: `image/jpeg`, `image/png`, `image/gif`, `image/webp`, `image/svg+xml`

### Videos
- **Max Size**: 50MB (configurable)
- **Allowed Extensions**: `.mp4`, `.webm`, `.mov`, `.avi`
- **MIME Types**: `video/mp4`, `video/webm`, `video/quicktime`, `video/x-msvideo`

## 🎨 Features

1. **Dual Upload Methods**
   - Upload file directly from computer
   - Or paste/image URL manually

2. **Real-time Validation**
   - File size check
   - Extension validation
   - MIME type verification

3. **Preview**
   - Automatic preview for images
   - Video player for video files

4. **Error Handling**
   - User-friendly error messages
   - Toast notifications
   - Specific error details (size, type, etc.)

5. **Responsive Design**
   - Mobile-friendly
   - Touch-friendly upload button

## 📋 Error Messages

The component provides clear error messages:

- `"File size must be less than 5MB. Current size: 7.2MB"`
- `"Invalid file type. Allowed: .jpg, .jpeg, .png, .gif, .webp"`
- `"No file selected"`

## 🔧 Advanced Usage

### Custom Validation

```tsx
import { validateFile } from "@/lib/validation";

const customValidation = (file: File) => {
  return validateFile(file, {
    maxSizeMB: 10,
    allowedExtensions: ['.png', '.jpg'],
    allowedTypes: ['image/png', 'image/jpeg']
  });
};
```

### Manual File Handling

```tsx
import { handleFileUploadWithValidation, validateImageFile } from "@/lib/validation";

const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  handleFileUploadWithValidation(
    file,
    (f) => validateImageFile(f, 5),
    (url) => {
      console.log("Valid!", url);
      // Update your state
    },
    (error) => {
      console.error("Invalid:", error);
      // Show error to user
    }
  );
};
```

## 📁 File Structure

```
horizonvfx_frontend/
├── lib/
│   └── validation.ts           # Global validation utilities
├── components/
│   └── admin/
│       └── FileUpload.tsx      # Reusable FileUpload component
└── app/
    └── admin/
        ├── about/
        │   └── page.tsx         # Example usage
        ├── contact/
        ├── services/
        ├── team/
        ├── showcase/
        └── media/
```

## 🎯 Best Practices

1. **Always specify `maxSizeMB`** based on your use case
2. **Use appropriate `accept` type** (image vs video)
3. **Provide clear labels** for better UX
4. **Handle errors gracefully** with user feedback
5. **Show previews** when possible for better UX
6. **Use the FileUpload component** instead of building custom uploaders

## 🐛 Troubleshooting

### Issue: File not uploading
- Check browser console for errors
- Verify file size is within limits
- Ensure file type is allowed

### Issue: Preview not showing
- Check if URL is valid
- Verify CORS settings for external URLs
- Check browser console for image load errors

### Issue: Validation not working
- Ensure validation functions are imported
- Check that `accept` prop matches file type
- Verify file extension is lowercase

## 📞 Support

For issues or questions:
1. Check this guide first
2. Review the component source code
3. Check validation utility functions
4. Test with different file types and sizes
