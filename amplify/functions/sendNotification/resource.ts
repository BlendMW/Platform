import { defineFunction } from "@aws-amplify/backend";

export const sendNotification = defineFunction({
  name: "sendNotification",
  runtime: 18, // Node.js runtime version
  entry: "./handler.ts", // Path to the handler file
  environment: {
    SES_SOURCE_EMAIL: "info@hayat.iq", // Verified SES source email
  },
});
