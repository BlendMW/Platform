import { defineFunction } from "@aws-amplify/backend";

export const processVisaTemplate = defineFunction({
  name: "processVisaTemplate",
  runtime: 18,
  entry: './handler.ts',
  environment: {
    TEMPLATE_BUCKET: "visaTemplates", // Bucket name for templates
    PROCESSED_FOLDER: "processed", // Folder for processed templates
  },
});
