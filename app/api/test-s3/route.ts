import { NextResponse } from "next/server";
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

/**
 * GET /api/test-s3
 * Test AWS S3 connection
 * Call this endpoint to verify your AWS credentials are working
 */
export async function GET() {
  try {
    // Create S3 client with environment variables
    const s3Client = new S3Client({
      region: process.env.AWS_REGION || "ap-south-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      },
    });

    // Try to list buckets (this will verify credentials work)
    const command = new ListBucketsCommand({});
    const response = await s3Client.send(command);

    // Check if our bucket exists
    const bucketName = process.env.AWS_S3_BUCKET;
    const bucketExists = response.Buckets?.some(
      (bucket) => bucket.Name === bucketName
    );

    return NextResponse.json({
      success: true,
      message: "✅ AWS S3 connection successful!",
      data: {
        region: process.env.AWS_REGION,
        bucketName: bucketName,
        bucketExists: bucketExists,
        totalBuckets: response.Buckets?.length || 0,
        allBuckets: response.Buckets?.map((b) => ({
          name: b.Name,
          created: b.CreationDate,
        })),
      },
    });
  } catch (error: any) {
    console.error("S3 connection test failed:", error);

    // Provide helpful error messages
    let errorMessage = "S3 connection failed";
    let helpText = "";

    if (error.name === "InvalidAccessKeyId") {
      errorMessage = "Invalid AWS Access Key ID";
      helpText = "Check your AWS_ACCESS_KEY_ID in .env file";
    } else if (error.name === "SignatureDoesNotMatch") {
      errorMessage = "Invalid AWS Secret Access Key";
      helpText = "Check your AWS_SECRET_ACCESS_KEY in .env file";
    } else if (error.name === "InvalidAccessKeyId") {
      errorMessage = "AWS credentials not found";
      helpText = "Make sure you've set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in .env";
    } else if (error.name === "AccessDenied") {
      errorMessage = "Access Denied - IAM user lacks permissions";
      helpText = "Make sure your IAM user has S3 permissions (HorizonVFXS3Access policy)";
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
      },
      { status: 500 }
    );
  }
}
