import { defineStorage } from '@aws-amplify/backend';

/**
 * Default Storage Bucket: visaSystemStorage
 * Purpose: General-purpose storage for the Visa System.
 */
export const storage = defineStorage({
  name: 'visaSystemStorage', // Friendly name to identify the bucket
  isDefault: true, // Mark as the default storage bucket
  access: (allow) => ({
    // Private storage: Accessible only by the file owner
    'private/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete']),
    ],
    // Public storage: Accessible to authenticated and guest users
    'public/*': [
      allow.authenticated.to(['read']), // Authenticated users can read
      allow.guest.to(['read']), // Guests can only read public files
    ],
  }),
});

/**
 * Visa Templates Storage: visaTemplates
 * Purpose: Stores predefined visa templates for the application.
 * Access Rules:
 * - Owners (identity) can read their templates.
 * - The 'System' group can manage templates (read/write).
 */
export const visaTemplates = defineStorage({
  name: 'visaTemplates',
  access: (allow) => ({
    'templates/{entity_id}/*': [
      allow.entity('identity').to(['read']), // Allow template owners to read
      allow.groups(['System']).to(['read', 'write']), // Allow 'System' group to manage templates
    ],
  }),
});

/**
 * Manual Visa Documents Storage: manualVisaDocs
 * Purpose: Stores manually processed visa application documents.
 * Access Rules:
 * - Owners (identity) can read their documents.
 * - Admins (Admins group) can fully manage documents.
 */
export const manualVisaDocuments = defineStorage({
  name: 'manualVisaDocs',
  access: (allow) => ({
    'manual/{entity_id}/*': [
      allow.entity('identity').to(['read']), // Allow document owners to read their files
      allow.groups(['Admins']).to(['read', 'write', 'delete']), // Allow Admins to manage documents
    ],
  }),
});
