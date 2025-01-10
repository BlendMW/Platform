import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({ region: process.env.AWS_REGION });

export const handler = async (event: any) => {
  try {
    const { templateData, templateName } = event;

    // Input validation
    if (!templateData || !templateName) {
      console.error('Validation Error: Missing templateData or templateName in event.');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields: templateData or templateName' }),
      };
    }

    const uploadParams = new PutObjectCommand({
      Bucket: process.env.PDF_BUCKET, // Use the bucket name from environment variables
      Key: `templates/${templateName}`, // Save templates in a specific folder
      Body: templateData,
      ContentType: 'application/pdf',
    });

    // Upload the template to S3
    const result = await s3Client.send(uploadParams);
    console.info('Template uploaded successfully:', result);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Visa template uploaded successfully' }),
    };
  } catch (error) {
    console.error('Error uploading visa template:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error instanceof Error ? error.message : 'Internal Server Error' }),
    };
  }
};
