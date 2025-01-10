import { defineFunction } from "@aws-amplify/backend";

export const generateVisaTemplate = defineFunction({
  name: "generateVisaTemplate",
  runtime: 18, // Node.js runtime version
  entry: "./handler.ts", // Path to the handler file
  environment: {
    PDF_BUCKET: "visaTemplates", // Dynamically reference the storage resource name
  },
});
