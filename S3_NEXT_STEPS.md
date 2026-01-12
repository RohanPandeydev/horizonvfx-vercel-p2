# S3 Integration - Next Steps

## Status: Implementation Complete ✅

All code has been successfully integrated into your HorizonVFX application. The S3 file upload system is ready for testing once you complete the AWS setup.

---

## What's Been Completed

### 1. Database Schema ✅
- Added `Media` model to Prisma schema
- Database migrated with new table
- Tracks: filename, S3 metadata, user who uploaded, timestamps

### 2. S3 Client Library ✅
- Created `lib/s3.ts` with upload/serve/delete functions
- AWS SDK packages installed: `@aws-sdk/client-s3` and `@aws-sdk/s3-request-presigner`

### 3. API Endpoints ✅
- `POST /api/upload` - Upload files to S3 (requires authentication)
- `GET /api/media/{id}` - Serve files via signed URL (1 hour expiration)
- `DELETE /api/media/{id}` - Delete files (requires authentication + ownership)

### 4. Upload Component ✅
- `components/admin/FileUpload.tsx` integrated with S3
- File validation (size, type)
- Upload progress indicator
- Preview for images and videos
- Error handling

### 5. Documentation ✅
- `S3_SETUP_GUIDE.md` - Complete AWS setup guide
- Environment variables configured in `.env`

---

## What You Need to Do

### Step 1: Set Up AWS S3 Bucket

1. **Go to AWS Console** → S3 → "Create bucket"

2. **Bucket Settings:**
   - Bucket name: `horizonvfx-media` (or your preferred name)
   - Region: `ap-south-1` (Mumbai) or closest to your users
   - **Block Public Access:** ✅ Enable all options (private bucket)

3. **Configure CORS:**
   Go to your bucket → Permissions → CORS configuration:

   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
       "AllowedOrigins": [
         "http://localhost:3000",
         "https://horizonvfx.in"
       ],
       "ExposeHeaders": ["ETag"],
       "MaxAgeSeconds": 3600
     }
   ]
   ```

### Step 2: Create IAM User

1. **Go to AWS Console** → IAM → Users → "Create user"
   - User name: `horizonvfx-uploader`
   - Access type: Programmatic access

2. **Create Policy** (attach to user):

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "S3UploadAndDelete",
         "Effect": "Allow",
         "Action": [
           "s3:PutObject",
           "s3:GetObject",
           "s3:DeleteObject"
         ],
         "Resource": [
           "arn:aws:s3:::horizonvfx-media",
           "arn:aws:s3:::horizonvfx-media/*"
         ]
       }
     ]
   }
   ```

3. **Create Access Key:**
   - Go to the user → Security credentials
   - Click "Create access key"
   - **IMPORTANT:** Copy credentials immediately (you won't see them again!)

### Step 3: Update Environment Variables

Replace the placeholder values in your `.env` file:

```env
# ============ AWS S3 Configuration ============
AWS_ACCESS_KEY_ID="YOUR_ACTUAL_ACCESS_KEY_HERE"
AWS_SECRET_ACCESS_KEY="YOUR_ACTUAL_SECRET_KEY_HERE"
AWS_REGION="ap-south-1"
AWS_S3_BUCKET="horizonvfx-media"
```

### Step 4: Test the Implementation

1. **Restart your development server:**
   ```bash
   pnpm dev
   ```

2. **Login to admin panel** (if not already logged in)

3. **Go to Admin → About page** (or any admin page with FileUpload)

4. **Upload an image:**
   - Click "Upload image (Max 5MB)"
   - Select an image file
   - Wait for upload to complete
   - Verify preview appears

5. **Verify S3 storage:**
   - Go to AWS Console → S3 → your bucket
   - Navigate to `images/about/user_XXXXXXXXXX/` folder
   - Verify your uploaded file is there

6. **Test private access:**
   - Try accessing the S3 file directly (should be denied)
   - Access via your website (should work)

---

## How It Works

### Upload Flow:
```
1. User selects file → FileUpload component
2. Client validates (size, type)
3. Uploads to /api/upload (authenticated)
4. Server uploads to private S3 bucket
5. Server saves metadata to Media table
6. Returns /api/media/{id} URL
7. Client displays preview
```

### Access Flow:
```
1. Browser requests /api/media/{id}
2. Server fetches media record from database
3. Server generates signed S3 URL (valid for 1 hour)
4. Server redirects to signed URL
5. Browser loads image from S3
6. After 1 hour, URL expires (security)
```

### Security Features:
- ✅ Private S3 bucket (no public access)
- ✅ Signed URLs (1 hour expiration)
- ✅ Authentication required for upload
- ✅ User tracking (every upload tracked to user)
- ✅ File validation (size, type checking)
- ✅ CORS protection

---

## Troubleshooting

### "Access Denied" Error
- Check AWS credentials in `.env`
- Verify IAM user has S3 permissions
- Ensure bucket name matches

### "CORS Error" in Browser
- Verify CORS configuration on S3 bucket
- Check allowed origins include your domain
- Ensure all methods (GET, PUT, POST, DELETE) are allowed

### "Upload Fails"
- Check file size limits (50MB max)
- Verify file type is allowed
- Check browser console for specific error

### "Images Not Loading"
- Check `/api/media/{id}` endpoint is accessible
- Verify S3 credentials are correct
- Check browser network tab for errors

---

## File Organization in S3

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

## Quick Reference

### Environment Variables:
```env
AWS_ACCESS_KEY_ID=        # Your AWS access key
AWS_SECRET_ACCESS_KEY=    # Your AWS secret key
AWS_REGION=               # ap-south-1
AWS_S3_BUCKET=            # horizonvfx-media
```

### Key Files:
- `lib/s3.ts` - S3 client utility
- `app/api/upload/route.ts` - Upload endpoint
- `app/api/media/[id]/route.ts` - Serve endpoint
- `components/admin/FileUpload.tsx` - Upload component
- `prisma/schema.prisma` - Media model

### API Endpoints:
- `POST /api/upload` - Upload file
- `GET /api/media/{id}` - Serve file
- `DELETE /api/media/{id}` - Delete file

---

## Need Help?

For detailed AWS setup instructions, see: `S3_SETUP_GUIDE.md`

---

**Ready to test?** Once you've completed the AWS setup, try uploading an image in the admin panel!
