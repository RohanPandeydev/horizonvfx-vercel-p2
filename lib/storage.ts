/**
 * Storage abstraction - uses S3 when configured, local filesystem otherwise.
 * For cPanel: files go to public_html/uploads/ so Apache serves them directly.
 * For cloud: files go to AWS S3.
 */
import path from 'path';
import fs from 'fs/promises';

const isS3Configured = !!(
  process.env.AWS_ACCESS_KEY_ID &&
  process.env.AWS_SECRET_ACCESS_KEY &&
  process.env.AWS_S3_BUCKET
);

// cPanel: save to public_html/uploads/ so Apache serves files directly
const UPLOAD_DIR = path.resolve(process.env.UPLOAD_DIR || '/home/rcimimhd/public_html/uploads');

// Base URL for serving uploaded files
const SITE_URL = process.env.FRONTEND_URL || 'https://horizonvfx.in';

async function ensureDir(dirPath: string) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch {
    // Directory already exists
  }
}

/**
 * Upload a file and return the public URL
 */
export async function uploadFile(
  buffer: Buffer,
  key: string,
  contentType: string
): Promise<string> {
  if (isS3Configured) {
    const { uploadToS3 } = await import('./s3');
    return uploadToS3(buffer, key, contentType);
  }

  // Save to public_html/uploads/ for direct Apache serving
  const filePath = path.join(UPLOAD_DIR, key);
  const dir = path.dirname(filePath);
  await ensureDir(dir);
  await fs.writeFile(filePath, buffer);

  // Return the full public URL
  return `${SITE_URL}/uploads/${key}`;
}

/**
 * Get the public URL for a file
 */
export async function getFileUrl(key: string): Promise<string> {
  if (isS3Configured) {
    const { getSignedUrl } = await import('./s3');
    return getSignedUrl(key, 3600);
  }

  return `${SITE_URL}/uploads/${key}`;
}

/**
 * Delete a file
 */
export async function deleteFile(key: string): Promise<void> {
  if (isS3Configured) {
    const { deleteFromS3 } = await import('./s3');
    return deleteFromS3(key);
  }

  const filePath = path.join(UPLOAD_DIR, key);
  try {
    await fs.unlink(filePath);
  } catch {
    // File may not exist
  }
}

/**
 * Generate a unique key for a file
 */
export function generateFileKey(filename: string): string {
  const timestamp = Date.now();
  const sanitized = filename
    .toLowerCase()
    .replace(/[^a-z0-9.]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return `cms_media/${timestamp}-${sanitized}`;
}

export { isS3Configured, UPLOAD_DIR };
