import { a, defineData, type ClientSchema } from "@aws-amplify/backend";

const schema = a.schema({
  // User Model
  User: a.model({
    id: a.id(),
    name: a.string().required(),
    role: a.enum([
      "SUPERUSER",
      "ACCOUNT_MANAGER",
      "VISA_OFFICER",
      "ACCOUNTING_MANAGER",
      "PRODUCT_MANAGER",
      "ARRIVAL_MANAGER",
      "DEPARTURE_MANAGER",
    ]),
    email: a.string().required(),
    isActive: a.boolean().default(true),
    createdAt: a.datetime(),
    updatedAt: a.datetime(),
    deletedAt: a.datetime(),
    visaApplications: a.hasMany("VisaApplication", "userId"),
    wallets: a.hasMany("Wallet", "userId"),
    transactions: a.hasMany("Transaction", "userId"),
    currencyId: a.string(),
    currency: a.belongsTo("Currency", "currencyId"),
  }).authorization((allow) => [
    allow.owner(),
    allow.groups(["Admins"]).to(["read", "update", "delete"]),
  ]),

  // Visa Application Model
  VisaApplication: a.model({
    id: a.id(),
    userId: a.string(),
    user: a.belongsTo("User", "userId"),
    visaType: a.enum(["TOURISM", "WORK", "MULTI_ENTRY"]),
    isManualProcessing: a.boolean().default(false),
    status: a.enum(["PENDING", "APPROVED", "REJECTED"]),
    qrCode: a.string(),
    arrivalDate: a.date(),
    departureDate: a.date(),
    accommodationDetails: a.string(),
    currencyId: a.string(),
    currency: a.belongsTo("Currency", "currencyId"),
    processedBy: a.string(),
    createdAt: a.datetime(),
    updatedAt: a.datetime(),
    deletedAt: a.datetime(),
  }).authorization((allow) => [
    allow.owner(),
    allow.groups(["Admins"]).to(["read", "update", "delete"]),
  ]),

  // Corporate Wallet Model
  Wallet: a.model({
    id: a.id(),
    corporateId: a.string(),
    userId: a.string(),
    user: a.belongsTo("User", "userId"),
    transactions: a.hasMany("Transaction", "walletId"),
    balance: a.float().default(0),
    currencyId: a.string(),
    currency: a.belongsTo("Currency", "currencyId"),
    createdAt: a.datetime(),
    updatedAt: a.datetime(),
    deletedAt: a.datetime(),
  }).authorization((allow) => [
    allow.owner().to(["read", "update"]),
    allow.groups(["Admins"]).to(["read", "update"]),
  ]),

  // Transactions Model
  Transaction: a.model({
    id: a.id(),
    userId: a.string(),
    user: a.belongsTo("User", "userId"),
    walletId: a.string(),
    wallet: a.belongsTo("Wallet", "walletId"),
    type: a.enum(["DEBIT", "CREDIT", "ADMIN_DEBIT", "ADMIN_CREDIT"]),
    amount: a.float().required(),
    date: a.datetime(),
    description: a.string().default("No description provided"),
    currencyId: a.string(),
    currency: a.belongsTo("Currency", "currencyId"),
    createdAt: a.datetime(),
    updatedAt: a.datetime(),
    deletedAt: a.datetime(),
  }).authorization((allow) => [
    allow.owner().to(["read"]),
    allow.groups(["Admins"]).to(["read", "update", "delete"]),
  ]),

  // Currency Model
  Currency: a.model({
    id: a.id(),
    code: a.string().required(),
    name: a.string().required(),
    symbol: a.string().required(),
    transactions: a.hasMany("Transaction", "currencyId"),
    wallets: a.hasMany("Wallet", "currencyId"),
    visaApplications: a.hasMany("VisaApplication", "currencyId"),
    users: a.hasMany("User", "currencyId"),
    createdAt: a.datetime(),
    updatedAt: a.datetime(),
    deletedAt: a.datetime(),
  }).authorization((allow) => [
    allow.owner().to(["read", "update"]),
    allow.groups(["Admins"]).to(["read", "update"]),
  ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
