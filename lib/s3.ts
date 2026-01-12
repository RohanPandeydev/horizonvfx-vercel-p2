import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl as getAwsSignedUrl } from "@aws-sdk/s3-request-presigner";

// Initialize S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const S3_BUCKET = process.env.AWS_S3_BUCKET || "horizonvfx-media";

/**
 * Upload a file to S3
 * @param file - The file to upload (Buffer, Uint8Array, or ReadableStream)
 * @param key - S3 object key (path)
 * @param contentType - MIME type of the file
 * @returns The S3 object key
 */
export async function uploadToS3(
  file: Buffer | Uint8Array | ReadableStream,
  key: string,
  contentType: string
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
    Body: file,
    ContentType: contentType,
    // No ACL - bucket should be private
  });

  await s3Client.send(command);
  return key;
}

/**
 * Get a signed URL for an S3 object (valid for 1 hour)
 * @param key - S3 object key
 * @param expiresIn - URL expiration time in seconds (default: 3600 = 1 hour)
 * @returns Signed URL
 */
export async function getSignedUrl(
  key: string,
  expiresIn: number = 3600
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
  });

  return await getAwsSignedUrl(s3Client, command, { expiresIn });
}

/**
 * Delete a file from S3
 * @param key - S3 object key
 */
export async function deleteFromS3(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
  });

  await s3Client.send(command);
}

/**
 * Generate a unique S3 key for a file
 * @param category - Category folder (e.g., 'images', 'videos', 'documents')
 * @param subfolder - Subfolder (e.g., 'media', 'cms_media')
 * @param filename - Original filename
 * @param userId - User ID who is uploading
 * @returns S3 object key
 */
export function generateS3Key(
  category: string,
  subfolder: string,
  filename: string,
  userId: string
): string {
  const timestamp = Date.now();
  const sanitizedFilename = filename
    .toLowerCase()
    .replace(/[^a-z0-9.]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  // Store all files in cms_media folder
  return `cms_media/${timestamp}-${sanitizedFilename}`;
}

/**
 * Get file category from MIME type
 * @param mimeType - File MIME type
 * @returns Category string
 */
export function getCategoryFromMimeType(mimeType: string): string {
  if (mimeType.startsWith("image/")) return "images";
  if (mimeType.startsWith("video/")) return "videos";
  if (mimeType.startsWith("audio/")) return "audio";
  return "documents";
}

export { s3Client, S3_BUCKET };
