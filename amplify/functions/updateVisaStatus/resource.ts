import { defineFunction } from "@aws-amplify/backend";

export const updateVisaStatus = defineFunction({
  name: "updateVisaStatus",
  runtime: 18, // Node.js runtime version
  entry: "./handler.ts", // Path to the handler file
  environment: {
    TABLE_NAME: "visaApplicationsTable", // Reference the DynamoDB table name
  },
});
