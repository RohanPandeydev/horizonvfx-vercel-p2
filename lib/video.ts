import ffmpeg from 'fluent-ffmpeg';
import { Readable } from 'stream';
import { promises as fs } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

/**
 * Generate a thumbnail from a video buffer
 * @param videoBuffer - Buffer containing video data
 * @param timestamp - Timestamp to capture thumbnail from (default: "00:00:01" - 1 second)
 * @param width - Thumbnail width (default: 1280)
 * @param height - Thumbnail height (default: 720)
 * @returns Promise<Buffer> - Thumbnail image buffer
 */
export async function generateThumbnailFromVideo(
  videoBuffer: Buffer,
  timestamp: string = '00:00:01',
  width: number = 1280,
  height: number = 720
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    // Create temp file paths
    const inputPath = join(tmpdir(), `input-${Date.now()}.mp4`);
    const outputPath = join(tmpdir(), `output-${Date.now()}.jpg`);

    // Write video buffer to temp file
    fs.writeFile(inputPath, videoBuffer)
      .then(() => {
        ffmpeg(inputPath)
          .screenshots({
            count: 1,
            folder: tmpdir(),
            filename: `thumbnail-${Date.now()}.jpg`,
            size: `${width}x${height}`,
            timemarks: [timestamp],
          })
          .format('jpg')
          .outputOptions('-q:v', '2') // High quality JPEG
          .on('end', async () => {
            try {
              // Read the generated thumbnail
              const thumbnailBuffer = await fs.readFile(outputPath);

              // Clean up temp files
              await fs.unlink(inputPath).catch(() => {});
              await fs.unlink(outputPath).catch(() => {});

              resolve(thumbnailBuffer);
            } catch (err) {
              reject(new Error(`Failed to read thumbnail: ${(err as Error).message}`));
            }
          })
          .on('error', async (err) => {
            // Clean up temp files on error
            await fs.unlink(inputPath).catch(() => {});
            await fs.unlink(outputPath).catch(() => {});

            reject(new Error(`Failed to generate thumbnail: ${err.message}`));
          })
          .save(outputPath);
      })
      .catch((err) => {
        reject(new Error(`Failed to write temp video file: ${(err as Error).message}`));
      });
  });
}

/**
 * Get video duration in seconds
 * @param videoBuffer - Buffer containing video data
 * @returns Promise<number> - Duration in seconds
 */
export async function getVideoDuration(videoBuffer: Buffer): Promise<number> {
  return new Promise((resolve, reject) => {
    const inputPath = join(tmpdir(), `duration-${Date.now()}.mp4`);

    // Write video buffer to temp file
    fs.writeFile(inputPath, videoBuffer)
      .then(() => {
        ffmpeg.ffprobe(inputPath, async (err, metadata) => {
          // Clean up temp file
          await fs.unlink(inputPath).catch(() => {});

          if (err) {
            reject(new Error(`Failed to get video duration: ${err.message}`));
            return;
          }

          const duration = metadata.format?.duration || 0;
          resolve(duration);
        });
      })
      .catch((err) => {
        reject(new Error(`Failed to write temp video file: ${(err as Error).message}`));
      });
  });
}

/**
 * Generate a smart thumbnail from the middle of the video
 * @param videoBuffer - Buffer containing video data
 * @param width - Thumbnail width
 * @param height - Thumbnail height
 * @returns Promise<Buffer> - Thumbnail image buffer
 */
export async function generateSmartThumbnail(
  videoBuffer: Buffer,
  width: number = 1280,
  height: number = 720
): Promise<Buffer> {
  try {
    // Get video duration
    const duration = await getVideoDuration(videoBuffer);

    // Calculate middle timestamp (or 1 second if video is very short)
    const middleSeconds = Math.max(1, Math.floor(duration / 2));
    const hours = Math.floor(middleSeconds / 3600);
    const minutes = Math.floor((middleSeconds % 3600) / 60);
    const seconds = middleSeconds % 60;

    const timestamp = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return generateThumbnailFromVideo(videoBuffer, timestamp, width, height);
  } catch (error) {
    // If getting duration fails, fall back to 1 second
    console.warn('Failed to get video duration, using default timestamp', error);
    return generateThumbnailFromVideo(videoBuffer, '00:00:01', width, height);
  }
}
