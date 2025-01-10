module.exports = {
  i18n: {
    locales: ['en', 'ar', 'ku'], // Define your locales here
    defaultLocale: 'en',         // Set the default locale
    fallbackLng: 'en',           // Define fallback language
  },
  react: {
    useSuspense: false,          // Disable suspense mode for SSR compatibility
  },
};
