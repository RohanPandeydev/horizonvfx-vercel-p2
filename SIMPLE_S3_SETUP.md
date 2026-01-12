# Simple S3 Setup Guide for HorizonVFX

## Step-by-Step Instructions

### Step 1: Create S3 Bucket

1. **Go to AWS Console**
   - Log in to https://console.aws.amazon.com
   - Search for "S3" in the search bar
   - Click on "S3" under Services

2. **Create Bucket**
   - Click the orange "Create bucket" button
   - **Bucket name:** `horizonvfx-vfx` (must be globally unique)
   - **Region:** Select "Asia Pacific (Mumbai) ap-south-1"
   - Scroll down and click "Create bucket" (accept all defaults)

3. **Verify Block Public Access is Enabled**
   - Click on your bucket name
   - Go to the "Permissions" tab
   - Scroll to "Block public access (bucket settings)"
   - You should see: "Block all public access is **On**" ✅
   - **DO NOT** edit this - this is your security!

### Step 2: Create IAM User (for Programmatic Access)

1. **Go to IAM**
   - In AWS Console search bar, search for "IAM"
   - Click on "IAM" under Services

2. **Create User**
   - Click "Users" in the left sidebar
   - Click "Create user"
   - **User name:** `horizonvfx-uploader`
   - Click "Next"

3. **Set Permissions**
   - Select "Attach policies directly"
   - Click "Create policy"
   - This opens a new tab - keep it open

4. **Create IAM Policy**
   - In the new tab, click "JSON" tab
   - Delete everything in the editor
   - Paste this policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3FullAccess",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::horizonvfx-vfx",
        "arn:aws:s3:::horizonvfx-vfx/*"
      ]
    }
  ]
}
```

   - Click "Next"
   - **Policy name:** `HorizonVFXS3Access`
   - Click "Create policy"
   - Go back to the previous tab (user creation)

5. **Attach Policy to User**
   - In the user creation screen, click the refresh button
   - Search for `HorizonVFXS3Access`
   - Check the box next to it
   - Click "Next"

6. **Review and Create**
   - Review the user details
   - Click "Create user"

### Step 3: Create Access Keys

1. **Get Access Keys**
   - You should see "User created successfully"
   - Click the link to see the user
   - Go to "Security credentials" tab
   - Scroll down to "Access keys"
   - Click "Create access key"

2. **Choose Use Case**
   - Select "Application running outside AWS"
   - Click "Next"

3. **Set Description (Optional)**
   - Description tag: `HorizonVFX Upload`
   - Click "Create access key"

4. **Save Credentials** ⚠️ **IMPORTANT!**
   - You will see:
     - **Access key:** `AKIAIOSFODNN7EXAMPLE` (copy this)
     - **Secret access key:** `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` (click "Show" and copy this)
   - **Copy both now** - you won't see the secret key again!
   - You can also download the CSV file

### Step 4: Configure CORS

1. **Go Back to S3 Bucket**
   - Go to S3 service
   - Click on your bucket: `horizonvfx-vfx`
   - Go to "Permissions" tab

2. **Edit CORS Configuration**
   - Scroll to "Cross-origin resource sharing (CORS)"
   - Click "Edit"
   - Delete everything in the editor
   - Paste this:

```json
[
  {
    "AllowedHeaders": [
      "*"
    ],
    "AllowedMethods": [
      "GET",
      "PUT",
      "POST",
      "DELETE"
    ],
    "AllowedOrigins": [
      "http://localhost:3000",
      "https://horizonvfx.in"
    ],
    "ExposeHeaders": [
      "ETag"
    ]
  }
]
```

   - Click "Save changes"

### Step 5: Update Environment Variables

1. **Open your `.env` file**
2. **Replace the placeholder values** with your actual AWS credentials:

```env
# ============ AWS S3 Configuration ============
AWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"
AWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
AWS_REGION="ap-south-1"
AWS_S3_BUCKET="horizonvfx-vfx"
```

**Replace with your actual credentials from Step 3!**

### Step 6: Test the Setup

1. **Restart your dev server:**
   ```bash
   pnpm dev
   ```

2. **Login to admin panel** at `http://localhost:3000/admin/login`

3. **Go to Admin → About page**

4. **Try uploading an image:**
   - Click "Choose file" or drag and drop
   - Select an image (JPG, PNG, etc.)
   - Wait for upload
   - You should see the preview appear

5. **Verify in AWS:**
   - Go to AWS Console → S3 → `horizonvfx-vfx`
   - Click on the bucket
   - Navigate through folders to find your image
   - It should be in a folder like: `images/about/user_XXXXX/`

---

## Troubleshooting

### Error: "Access Denied"
**Problem:** AWS credentials are incorrect or user lacks permissions

**Solution:**
- Verify `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` are correct
- Check IAM user has `HorizonVFXS3Access` policy attached
- Ensure bucket name in `.env` matches your actual bucket name

### Error: "No such bucket" or "NotFound"
**Problem:** Bucket name doesn't match

**Solution:**
- Check `AWS_S3_BUCKET` in `.env`
- Go to AWS Console and copy the exact bucket name
- Ensure region matches (`ap-south-1`)

### Error: "CORS policy" in browser
**Problem:** CORS not configured correctly

**Solution:**
- Go to S3 bucket → Permissions → CORS
- Ensure your domain is in `AllowedOrigins`
- For local development: `http://localhost:3000`
- For production: `https://horizonvfx.in`

### Upload fails immediately
**Problem:** File too large or wrong type

**Solution:**
- Check file size (max 50MB for upload endpoint)
- Check file type (images: JPG, PNG, GIF, WebP; videos: MP4, WebM)
- Check browser console (F12) for error details

### Images don't display on website
**Problem:** Server error or S3 access issue

**Solution:**
- Check browser Network tab (F12 → Network)
- Look for failed requests to `/api/media/{id}`
- Check server terminal for error messages
- Verify AWS credentials are correct

---

## Architecture Overview

### How Your Files Are Protected

```
┌─────────────────┐
│  Your Website   │
│  (Next.js App)  │
└────────┬────────┘
         │
         │ 1. Upload file
         ▼
┌─────────────────┐
│ /api/upload     │  ← Requires authentication
└────────┬────────┘
         │
         │ 2. Upload to private bucket
         ▼
┌─────────────────┐
│  AWS S3 Bucket  │  ← Block Public Access: ON
│  (Private)      │     No direct URL access
└─────────────────┘

To view file:
1. Browser requests /api/media/{id}
2. Server generates signed URL (1 hour expiry)
3. Browser redirects to signed URL
4. S3 serves file (valid for 1 hour only)
5. After 1 hour: URL expires → Request new URL
```

### Security Features

✅ **Private Bucket** - Block Public Access prevents direct URL access
✅ **Signed URLs** - Temporary access that expires after 1 hour
✅ **Authentication** - Only logged-in users can upload
✅ **User Tracking** - Every upload tracked to user who uploaded
✅ **File Validation** - Size and type checking on both client and server
✅ **CORS Protection** - Only your domains can access the bucket

---

## Quick Checklist

- [ ] S3 bucket created: `horizonvfx-vfx`
- [ ] Region: `ap-south-1` (Mumbai)
- [ ] Block Public Access: **Enabled** ✅
- [ ] IAM user created: `horizonvfx-uploader`
- [ ] IAM policy created: `HorizonVFXS3Access`
- [ ] Policy attached to user
- [ ] Access keys created and saved
- [ ] CORS configured on bucket
- [ ] `.env` updated with actual credentials
- [ ] Dev server restarted
- [ ] Test upload successful

---

## Need More Help?

**AWS Documentation:**
- [Creating a bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html)
- [IAM users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html)
- [Configuring CORS](https://docs.aws.amazon.com/AmazonS3/latest/userguide/cors.html)

**Common Issues:**
- If you see "The bucket you are trying to access does not exist" → Check bucket name spelling
- If you see "Access Denied" → Check IAM permissions and credentials
- If images don't load → Check Network tab in browser for failed requests

---

**Done!** 🎉 Your S3 is now ready for use with HorizonVFX!
