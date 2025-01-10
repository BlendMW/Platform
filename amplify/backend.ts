import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource"; // Authentication configuration
import { data } from "./data/resource"; // Data models for application entities
import { storage, visaTemplates, manualVisaDocuments } from "./storage/resource"; // Storage buckets for various use cases

// Import functions from the functions folder
import { generateReport } from "./functions/generateReport/resource"; // Generates reports
import { generateVisaTemplate } from "./functions/generateVisaTemplate/resource"; // Generates visa templates
import { sendNotification } from "./functions/sendNotification/resource"; // Sends email notifications
import { updateVisaStatus } from "./functions/updateVisaStatus/resource"; // Updates visa application statuses
import { processManualVisaDocument } from "./functions/processManualVisaDocument/resource"; // Processes manual visa documents
import { processVisaTemplate } from "./functions/processVisaTemplate/resource"; // Processes visa templates

/**
 * Defines the Amplify backend resources for the application.
 * Resources are organized into sections: authentication, data, storage, and functions.
 */
export const backend = defineBackend({
  // Authentication resource using Amazon Cognito
  auth, 

  // Data resources define the schema and rules for the application's data models
  data, 

  // Storage resources for managing various files
  storage, // Default storage bucket for general-purpose file management
  visaTemplates, // Storage bucket for visa templates
  manualVisaDocuments, // Storage bucket for manual visa application documents

  // Functions for business logic and application workflows
  generateReport, // Generates reports and uploads them to the default storage
  generateVisaTemplate, // Creates visa templates and uploads them to the visaTemplates bucket
  sendNotification, // Sends email notifications via Amazon SES
  updateVisaStatus, // Updates the status of visa applications in the database
  processVisaTemplate, // Processes visa templates
  processManualVisaDocument, // Processes manual visa documents
});
