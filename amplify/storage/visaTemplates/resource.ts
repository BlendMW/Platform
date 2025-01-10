import { defineFunction } from '@aws-amplify/backend';

export const processVisaTemplate = defineFunction({
  name: 'processVisaTemplate', // Unique name for the function
  runtime: 18, // Node.js 18 runtime
  entry: './handler.ts', // Path to the Lambda handler
  environment: {
    TEMPLATE_BUCKET: 'visaTemplates', // Bucket where visa templates are stored
    PROCESSED_FOLDER: 'processed', // Folder for processed templates
  },
});
