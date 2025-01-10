import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const s3Client = new S3Client({});

export async function handler(event: any) {
  console.log("Received event:", JSON.stringify(event, null, 2));

  try {
    const { reportContent, reportName } = event;

    // Validate input
    if (!reportContent || !reportName) {
      console.error("Validation Error: Missing reportContent or reportName.");
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Missing required fields: reportContent or reportName',
        }),
      };
    }

    // Ensure REPORT_BUCKET environment variable is set
    const bucketName = process.env.REPORT_BUCKET;
    if (!bucketName) {
      console.error("Configuration Error: REPORT_BUCKET environment variable is not defined.");
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Internal server configuration error: REPORT_BUCKET is not set',
        }),
      };
    }

    // Prepare upload parameters
    const uploadParams = new PutObjectCommand({
      Bucket: bucketName,
      Key: reportName,
      Body: reportContent,
      ContentType: 'application/pdf',
    });

    // Upload report to S3
    const result = await s3Client.send(uploadParams);
    console.info("Report uploaded successfully:", result);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Report generated and uploaded successfully',
        reportName,
      }),
    };
  } catch (error) {
    console.error("Error while generating report:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : 'Internal server error',
      }),
    };
  }
}
