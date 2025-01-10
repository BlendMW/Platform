import { defineFunction } from '@aws-amplify/backend';

export const generateReport = defineFunction({
  name: 'generateReport', // Unique name of the function
  runtime: 18, // Node.js 18.x runtime in Gen 2 format
  entry: './handler.ts', // Path to the handler file relative to this resource file
  environment: {
    REPORT_BUCKET: 'visaSystemStorage', // Reference the storage bucket by name
  },
});
