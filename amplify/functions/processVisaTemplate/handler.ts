import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";

const s3 = new S3Client({ region: process.env.AWS_REGION });

async function streamToString(stream: Readable): Promise<string> {
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf-8");
}

export const main = async (event: any) => {
  try {
    const bucketName = process.env.TEMPLATE_BUCKET;
    const processedFolder = process.env.PROCESSED_FOLDER;

    for (const record of event.Records) {
      const { key } = record.s3.object;
      console.log(`Processing template: ${key}`);

      // Fetch the template file from S3
      const getObjectCommand = new GetObjectCommand({ Bucket: bucketName, Key: key });
      const templateObject = await s3.send(getObjectCommand);

      const templateContent = await streamToString(templateObject.Body as Readable);

      // Process the template (Example: appending processed flag)
      const processedContent = templateContent + "\n\n// Processed by processVisaTemplate";

      // Save the processed template to a different folder
      const processedKey = `${processedFolder}/${key}`;
      const putObjectCommand = new PutObjectCommand({
        Bucket: bucketName,
        Key: processedKey,
        Body: processedContent,
      });
      await s3.send(putObjectCommand);

      console.log(`Template processed and saved as: ${processedKey}`);
    }

    return { statusCode: 200, body: JSON.stringify({ message: "Templates processed successfully" }) };
  } catch (error) {
    console.error("Error processing visa templates:", error);
    return { statusCode: 500, body: JSON.stringify({ message: "Failed to process visa templates" }) };
  }
};
