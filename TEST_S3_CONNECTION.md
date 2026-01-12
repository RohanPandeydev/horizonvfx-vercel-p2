# How to Test Your S3 Connection

## Quick Test Method

I've created a test endpoint for you: `/api/test-s3`

### Step 1: Start Your Dev Server

```bash
pnpm dev
```

Wait for it to show:
```
✓ Ready in 3.2s
○ Local:        http://localhost:3000
```

### Step 2: Open Your Browser

Go to: **http://localhost:3000/api/test-s3**

### Step 3: Check the Response

## ✅ If Connected Successfully:

You'll see:
```json
{
  "success": true,
  "message": "✅ AWS S3 connection successful!",
  "data": {
    "region": "ap-south-1",
    "bucketName": "horizonvfx-vfx",
    "bucketExists": true,
    "totalBuckets": 1,
    "allBuckets": [
      {
        "name": "horizonvfx-vfx",
        "created": "2025-01-12T10:30:00.000Z"
      }
    ]
  }
}
```

## ❌ If Connection Failed:

You'll see an error with helpful information:

### Error 1: "Invalid AWS Access Key ID"
```json
{
  "success": false,
  "error": "Invalid AWS Access Key ID",
  "help": "Check your AWS_ACCESS_KEY_ID in .env file",
  "envCheck": {
    "hasAccessKey": true,
    "hasSecretKey": true,
    "hasRegion": true,
    "hasBucket": true
  }
}
```
**Solution:** Copy your access key again from AWS IAM console

### Error 2: "Invalid AWS Secret Access Key"
```json
{
  "success": false,
  "error": "Invalid AWS Secret Access Key",
  "help": "Check your AWS_SECRET_ACCESS_KEY in .env file"
}
```
**Solution:** Copy your secret key again from AWS IAM console (click "Show" to reveal it)

### Error 3: "Access Denied - IAM user lacks permissions"
```json
{
  "success": false,
  "error": "Access Denied - IAM user lacks permissions",
  "help": "Make sure your IAM user has S3 permissions (HorizonVFXS3Access policy)"
}
```
**Solution:** Go to IAM → Users → horizonvfx-uploader → Add permissions → Attach `HorizonVFXS3Access` policy

### Error 4: "AWS credentials not found"
```json
{
  "success": false,
  "error": "AWS credentials not found",
  "envCheck": {
    "hasAccessKey": false,
    "hasSecretKey": false,
    "hasRegion": true,
    "hasBucket": true
  }
}
```
**Solution:** Add `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` to your `.env` file

### Error 5: "Bucket does not exist"
```json
{
  "success": true,
  "bucketExists": false
}
```
**Solution:** The bucket name in your `.env` doesn't match your actual bucket name in AWS

---

## Alternative Test: Upload a Real File

Once the test endpoint shows success, try uploading a real file:

1. Go to: http://localhost:3000/admin/login
2. Login with your admin credentials
3. Go to: http://localhost:3000/admin/about
4. Try uploading an image

If the image uploads and shows a preview, **S3 is working!** ✅

---

## What to Check in Your .env File

Open your `.env` file and verify:

```env
# All 4 variables must be present:
AWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"     # ← Should start with "AKIA..."
AWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/..."     # ← Should be a long string
AWS_REGION="ap-south-1"                        # ← Should match your bucket region
AWS_S3_BUCKET="horizonvfx-vfx"                 # ← Should match your exact bucket name
```

### Common Mistakes:

❌ **Wrong:**
```env
AWS_ACCESS_KEY_ID=""              # Empty
AWS_SECRET_ACCESS_KEY=            # Missing quotes
AWS_REGION="Mumbai"               # Wrong format (use ap-south-1)
AWS_S3_BUCKET="HorizonVFX"        # Wrong name (case-sensitive)
```

✅ **Right:**
```env
AWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"
AWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
AWS_REGION="ap-south-1"
AWS_S3_BUCKET="horizonvfx-vfx"
```

---

## Quick Checklist Before Testing:

- [ ] Dev server running (`pnpm dev`)
- [ ] AWS S3 bucket created in AWS Console
- [ ] IAM user created in AWS Console
- [ ] Access keys created and copied
- [ ] `.env` file updated with all 4 variables
- [ ] Restarted dev server after updating `.env`
- [ ] Opened http://localhost:3000/api/test-s3 in browser

---

**That's it!** The test endpoint will tell you exactly what's wrong if it doesn't work.
