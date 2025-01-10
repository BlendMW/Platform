import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  // Set login mechanisms
  loginWith: {
    email: {
      verificationEmailSubject: 'Welcome to Visa System - Verify Your Email',
    },
  },
  
  // User attributes
  userAttributes: {
    email: {
      required: true,
      mutable: true,
    },
    phoneNumber: {
      required: false,
      mutable: true,
    },
    givenName: {
      required: true,
    },
    familyName: {
      required: true,
    },
    address: {
      required: false,
      mutable: true,
    },
    birthdate: {
      required: false,
      mutable: false,
    },
    locale: {
      required: false,
      mutable: true,
    },
  },
  
  groups: ['System', 'Admins', 'VisaOfficer', 'Superuser', 'AccountManager'],

  // Multi-factor authentication configuration
  multifactor: {
    mode: "OPTIONAL",
    sms: true,
    totp: true,
  },

  // Email sender configuration
  senders: {
    email: {
      fromEmail: "info@hayat.iq",
      fromName: "Blend by Hayat",
      replyTo: "blend@hayat.iq",
    },
  },

  // Advanced security features
  accountRecovery: "EMAIL_ONLY",
});
