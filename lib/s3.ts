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

/**
 * Upload a large file to S3 using multipart upload
 * @param file - The file buffer to upload
 * @param key - S3 object key (path)
 * @param contentType - MIME type of the file
 * @returns The S3 object key
 */
export async function uploadLargeFileToS3(
  file: Buffer,
  key: string,
  contentType: string
): Promise<string> {
  const { CreateMultipartUploadCommand, UploadPartCommand, CompleteMultipartUploadCommand } = await import("@aws-sdk/client-s3");

  const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks (minimum for S3 multipart)
  const totalChunks = Math.ceil(file.length / CHUNK_SIZE);

  // Initiate multipart upload
  const createCommand = new CreateMultipartUploadCommand({
    Bucket: S3_BUCKET,
    Key: key,
    ContentType: contentType,
  });

  const uploadId = (await s3Client.send(createCommand)).UploadId!;
  const partUploads: any[] = [];

  try {
    // Upload chunks
    for (let i = 0; i < totalChunks; i++) {
      const start = i * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.length);
      const chunk = file.subarray(start, end);

      const uploadPartCommand = new UploadPartCommand({
        Bucket: S3_BUCKET,
        Key: key,
        UploadId: uploadId,
        PartNumber: i + 1,
        Body: chunk,
      });

      const partResult = await s3Client.send(uploadPartCommand);
      partUploads.push({
        PartNumber: i + 1,
        ETag: partResult.ETag,
      });

      console.log(`Uploaded part ${i + 1}/${totalChunks} for ${key}`);
    }

    // Complete multipart upload
    const completeCommand = new CompleteMultipartUploadCommand({
      Bucket: S3_BUCKET,
      Key: key,
      UploadId: uploadId,
      MultipartUpload: {
        Parts: partUploads,
      },
    });

    await s3Client.send(completeCommand);
    console.log(`Multipart upload complete: ${key}`);

    return key;
  } catch (error) {
    console.error('Multipart upload failed, aborting...', error);
    // TODO: Abort multipart upload on error
    throw error;
  }
}

/**
 * Upload file to S3 with automatic chunking for large files
 * @param file - The file buffer to upload
 * @param key - S3 object key (path)
 * @param contentType - MIME type of the file
 * @returns The S3 object key
 */
export async function uploadFileToS3(
  file: Buffer,
  key: string,
  contentType: string
): Promise<string> {
  const LARGE_FILE_THRESHOLD = 5 * 1024 * 1024; // 5MB

  if (file.length > LARGE_FILE_THRESHOLD) {
    console.log(`Large file detected (${(file.length / 1024 / 1024).toFixed(2)}MB), using multipart upload`);
    return uploadLargeFileToS3(file, key, contentType);
  }

  return uploadToS3(file, key, contentType);
}

export { s3Client, S3_BUCKET };
