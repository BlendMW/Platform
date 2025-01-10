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
    const bucketName = process.env.DOCUMENT_BUCKET;
    const processedFolder = process.env.PROCESSED_FOLDER;

    for (const record of event.Records) {
      const { key } = record.s3.object;
      console.log(`Processing manual visa document: ${key}`);

      // Fetch the document from S3
      const getObjectCommand = new GetObjectCommand({ Bucket: bucketName, Key: key });
      const documentObject = await s3.send(getObjectCommand);

      const documentContent = await streamToString(documentObject.Body as Readable);

      // Process the document (Example: appending processed flag)
      const processedContent = documentContent + "\n\n// Processed by processManualVisaDocument";

      // Save the processed document to a different folder
      const processedKey = `${processedFolder}/${key}`;
      const putObjectCommand = new PutObjectCommand({
        Bucket: bucketName,
        Key: processedKey,
        Body: processedContent,
      });
      await s3.send(putObjectCommand);

      console.log(`Manual visa document processed and saved as: ${processedKey}`);
    }

    return { statusCode: 200, body: JSON.stringify({ message: "Manual visa documents processed successfully" }) };
  } catch (error) {
    console.error("Error processing manual visa documents:", error);
    return { statusCode: 500, body: JSON.stringify({ message: "Failed to process manual visa documents" }) };
  }
};
