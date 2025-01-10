import { defineFunction } from "@aws-amplify/backend";

export const processManualVisaDocument = defineFunction({
  name: "processManualVisaDocument",
  runtime: 18,
  entry: './handler.ts',
  environment: {
    DOCUMENT_BUCKET: "manualVisaDocs", // Bucket name for manual visa documents
    PROCESSED_FOLDER: "processed", // Folder for processed documents
  },

});
