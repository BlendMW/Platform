import { defineFunction } from '@aws-amplify/backend';

export const processManualVisaDocument = defineFunction({
  name: 'processManualVisaDocument', // Unique function name
  runtime: 18, // Node.js 18 runtime for Amplify Gen 2
  entry: './handler.ts', // Path to the handler file
  environment: {
    DOCUMENT_BUCKET: 'manualVisaDocs', // Environment variable for bucket reference
  },
});
