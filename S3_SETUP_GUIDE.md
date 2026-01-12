# S3 Integration Setup Guide

Complete guide to set up AWS S3 for private image storage in your HorizonVFX application.

## 📋 **What You Need from AWS**

### 1. **AWS S3 Bucket Setup**

#### Create S3 Bucket:

1. Go to AWS Console → S3
2. Click "Create bucket"
3. Bucket name: `horizonvfx-media` (or your preferred name)
4. Region: `ap-south-1` (Mumbai) or closest to your users
5. **IMPORTANT:** Uncheck "Block all public access"
6. Click "Create bucket"

#### Bucket Settings:

- **Block Public Access:** ✅ Enabled (all 4 options checked)
- **Versioning:** Disabled (optional)
- **Default Encryption:** SSE-S3 or SSE-KMS (optional)

### 2. **CORS Configuration**

Go to your bucket → Permissions → CORS configuration and add:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedOrigins": ["http://localhost:3000", "https://horizonvfx.in"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3600
  }
]
```

### 3. **IAM User Setup**

#### Create IAM User:

1. Go to AWS Console → IAM → Users → "Create user"
2. User name: `horizonvfx-uploader`
3. Select "Access key - Programmatic access"
4. Click "Next"

#### Attach Policy:

Create a new policy with these permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3UploadAndDelete",
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject", "s3:DeleteObject"],
      "Resource": ["arn:aws:s3:::horizonvfx", "arn:aws:s3:::horizonvfx/*"]
    }
  ]
}
```

**Attach this policy to your user.**

#### Create Access Key:

1. Go to the user → "Security credentials"
2. Click "Create access key"
3. Select "Application running outside AWS"
4. Click "Create access key"
5. **IMPORTANT:** Copy the credentials immediately (you won't see them again!)

### 4. **Bucket Policy (Optional but Recommended)**

Go to your bucket → Permissions → Bucket policy and add:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyPublicAccess",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::horizonvfx-media",
        "arn:aws:s3:::horizonvfx-media/*"
      ],
      "Condition": {
        "StringNotEquals": {
          "aws:PrincipalOrgID": [
            "o-xxxxxxxxxx" // Your AWS Organization ID (if using Organizations)
          ]
        }
      }
    }
  ]
}
```

---

## 🔧 **Application Setup**

### 1. **Update Environment Variables**

Add these to your `.env` file:

```env
# ============ AWS S3 Configuration ============
AWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"      # Replace with your access key
AWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"  # Replace with your secret key
AWS_REGION="ap-south-1"                       # Your bucket region
AWS_S3_BUCKET="horizonvfx-media"              # Your bucket name
```

### 2. **Database Migration**

The database schema has been updated with a new `Media` model.

Run:

```bash
# Already done! Database has been migrated.
# If you need to regenerate Prisma client:
npx prisma generate
```

### 3. **Restart Development Server**

```bash
# Stop the current server (Ctrl+C)
# Then restart:
pnpm dev
```

---

## 📁 **File Organization**

Files uploaded to S3 will be organized like this:

```
horizonvfx-media/
├── images/
│   ├── about/
│   │   └── user_1234567890/1704067200-profile-photo.jpg
│   ├── team/
│   │   └── user_1234567890/1704067201-member-avatar.png
│   ├── services/
│   └── showcase/
├── videos/
│   ├── hero/
│   │   └── user_1234567890/1704067202-hero-video.mp4
│   └── projects/
└── documents/
```

---

## 🔄 **How It Works**

### **Upload Flow:**

```
1. User selects file in FileUpload component
   ↓
2. Client validates file (size, type)
   ↓
3. Client uploads to /api/upload
   ↓
4. Server validates user (authentication)
   ↓
5. Server uploads to S3 (private bucket)
   ↓
6. Server saves metadata to Media table
   ↓
7. Server returns /api/media/{id} URL
   ↓
8. Client stores this URL
```

### **Access Flow:**

```
1. Browser requests /api/media/{id}
   ↓
2. Server fetches media record from database
   ↓
3. Server generates signed S3 URL (valid for 1 hour)
   ↓
4. Server redirects to signed URL
   ↓
5. Browser loads image from S3
   ↓
6. After 1 hour, URL expires (security)
```

### **Security Features:**

✅ **Private S3 Bucket** - No public access
✅ **Signed URLs** - Temporary access (1 hour expiration)
✅ **Authentication Required** - Only logged-in users can upload
✅ **User Tracking** - Every upload is tracked to a user
✅ **File Validation** - Size and type checking
✅ **CORS Protection** - Only your domain can upload

---

## 🎯 **Usage Example**

### **In Your Admin Pages:**

```tsx
import FileUpload from "@/components/admin/FileUpload";

function AboutPageEditor() {
  const [storyImage, setStoryImage] = useState("");

  return (
    <FileUpload
      label="Story Image"
      value={storyImage}
      onChange={setStoryImage}
      accept="image"
      maxSizeMB={5}
      category="about" // Creates S3 folder: images/about/
    />
  );
}
```

### **What Gets Stored in Database:**

```json
{
  "id": "clx1234567890",
  "filename": "story-image.jpg",
  "originalName": "story-image.jpg",
  "mimeType": "image/jpeg",
  "size": 245862,
  "s3Key": "images/about/user_1234567890/1704067200-story-image.jpg",
  "s3Bucket": "horizonvfx-media",
  "s3Region": "ap-south-1",
  "url": "/api/media/clx1234567890",
  "uploadedBy": "user_1234567890",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

---

## ⚠️ **Important Security Notes**

### **What's Protected:**

✅ **Images cannot be accessed directly via S3 URL**

- The S3 bucket is private
- No public access
- Only your server can generate signed URLs

✅ **Signed URLs expire**

- Access URLs expire after 1 hour
- Users cannot bookmark and share permanent links

✅ **Upload requires authentication**

- Only logged-in users can upload
- Every upload is tracked

### **What's NOT Protected:**

❌ **Screenshots/Screen Recording**

- Users can still screenshot your website
- This is unavoidable (the image must be displayed to be seen)

❌ **Direct Link Sharing (Temporary)**

- Users can share the `/api/media/{id}` URL
- But it expires after 1 hour
- After expiration, the link stops working

---

## 🐛 **Troubleshooting**

### **Issue: "Access Denied"**

- Check AWS credentials in `.env`
- Verify IAM user has S3 permissions
- Ensure bucket name matches

### **Issue: "CORS Error"**

- Verify CORS configuration on S3 bucket
- Check allowed origins include your domain
- Ensure all methods (GET, PUT, POST, DELETE) are allowed

### **Issue: "Upload Fails"**

- Check file size (max 50MB for videos, 5MB for images)
- Verify file type is allowed
- Check browser console for specific error

### **Issue: "Images Not Loading"**

- Check `/api/media/{id}` endpoint is accessible
- Verify S3 credentials are correct
- Check browser network tab for errors

---

## 📊 **API Endpoints**

### **Upload**

```
POST /api/upload
Content-Type: multipart/form-data

Body:
- file: File (required)
- category: string (optional, default: "general")
- subfolder: string (optional, default: "uploads")

Response:
{
  "success": true,
  "data": {
    "id": "clx1234567890",
    "url": "/api/media/clx1234567890",
    "filename": "image.jpg",
    "mimeType": "image/jpeg",
    "size": 245862
  }
}
```

### **Serve**

```
GET /api/media/{id}
Response: Redirect to signed S3 URL (valid for 1 hour)
```

### **Delete**

```
DELETE /api/media/{id}
Headers: Authorization header (JWT token)

Response:
{
  "success": true,
  "message": "Media deleted successfully"
}
```

---

## ✅ **Next Steps**

1. ✅ **AWS S3 bucket created**
2. ✅ **IAM user created with S3 permissions**
3. ✅ **CORS configured**
4. ✅ **Access keys generated**
5. ✅ **Environment variables updated**
6. ✅ **Database migrated**
7. ✅ **Code integrated**

**Now test the upload!**

Try uploading an image in your About page admin panel. The image will be:

- Uploaded to your private S3 bucket
- Metadata saved to database
- Served via `/api/media/{id}` endpoint
- Accessible ONLY through your application

---

## 🔐 **Why This Is Secure**

1. **Private Bucket** - No direct S3 access
2. **Server-Side Control** - Your server controls who sees what
3. **Temporary URLs** - Signed URLs expire after 1 hour
4. **Authentication** - Upload requires login
5. **Audit Trail** - All uploads tracked to user
6. **CORS Protection** - Only your domain can upload

---

**Questions? Check the implementation in:**

- `lib/s3.ts` - S3 client utility
- `app/api/upload/route.ts` - Upload endpoint
- `app/api/media/[id]/route.ts` - Serve endpoint
- `components/admin/FileUpload.tsx` - Upload component
