import { NextResponse } from "next/server";
import { S3Client, HeadBucketCommand } from "@aws-sdk/client-s3";

/**
 * GET /api/test-s3-simple
 * Test AWS S3 connection - Simple version (only checks bucket access)
 * This doesn't require s3:ListAllMyBuckets permission
 */
export async function GET() {
  try {
    const bucketName = process.env.AWS_S3_BUCKET;

    if (!bucketName) {
      return NextResponse.json(
        {
          success: false,
          error: "AWS_S3_BUCKET not set in .env",
        },
        { status: 500 }
      );
    }

    // Create S3 client with environment variables
    const s3Client = new S3Client({
      region: process.env.AWS_REGION || "ap-south-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      },
    });

    // Try to check if bucket exists and we can access it
    const command = new HeadBucketCommand({
      Bucket: bucketName,
    });

    try {
      await s3Client.send(command);
    } catch (headError: any) {
      // If we get 403 or 404, it means credentials work but bucket might have issues
      if (headError.$metadata?.httpStatusCode === 403) {
        // Credentials work, but bucket policy might be blocking
        return NextResponse.json({
          success: true,
          message: "⚠️ AWS credentials are valid, but bucket access is restricted",
          data: {
            region: process.env.AWS_REGION,
            bucketName: bucketName,
            bucketAccessible: false,
            issue: "Bucket policy or ACL might be restricting access",
            recommendation: "Check S3 bucket Permissions tab - ensure no bucket policy is blocking access",
          },
        });
      } else if (headError.$metadata?.httpStatusCode === 404) {
        return NextResponse.json({
          success: false,
          error: "Bucket does not exist",
          details: `Bucket "${bucketName}" not found in region ${process.env.AWS_REGION}`,
          help: "Check the bucket name and region in AWS S3 console",
        },
        { status: 404 });
      }
      throw headError;
    }

    return NextResponse.json({
      success: true,
      message: "✅ AWS S3 connection successful!",
      data: {
        region: process.env.AWS_REGION,
        bucketName: bucketName,
        bucketAccessible: true,
      },
    });
  } catch (error: any) {
    console.error("S3 connection test failed:", error);

    let errorMessage = "S3 connection failed";
    let helpText = "";

    if (error.name === "InvalidAccessKeyId") {
      errorMessage = "Invalid AWS Access Key ID";
      helpText = "Check your AWS_ACCESS_KEY_ID in .env file";
    } else if (error.name === "SignatureDoesNotMatch") {
      errorMessage = "Invalid AWS Secret Access Key";
      helpText = "Check your AWS_SECRET_ACCESS_KEY in .env file";
    } else if (error.name === "NoSuchBucket") {
      errorMessage = "Bucket does not exist";
      helpText = `Check if bucket "${process.env.AWS_S3_BUCKET}" exists in AWS S3 console`;
    } else if (error.name === "AccessDenied" || error.$metadata?.httpStatusCode === 403) {
      errorMessage = "Access Denied - IAM user lacks permissions";
      helpText = "Your IAM user needs these S3 permissions: s3:GetObject, s3:PutObject, s3:DeleteObject";
    } else if (error.name === "InvalidAccessKeyId") {
      errorMessage = "AWS credentials not found";
      helpText = "Make sure you've set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in .env";
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: error.message,
        help: helpText,
        envCheck: {
          hasAccessKey: !!process.env.AWS_ACCESS_KEY_ID,
          hasSecretKey: !!process.env.AWS_SECRET_ACCESS_KEY,
          hasRegion: !!process.env.AWS_REGION,
          hasBucket: !!process.env.AWS_S3_BUCKET,
          region: process.env.AWS_REGION,
          bucket: process.env.AWS_S3_BUCKET,
        },
        errorName: error.name,
        statusCode: error.$metadata?.httpStatusCode,
      },
      { status: 500 }
    );
  }
}
