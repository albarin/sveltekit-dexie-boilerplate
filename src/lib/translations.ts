import i18n from 'sveltekit-i18n';

const config = ({
  fallbackLocale: 'en',
  loaders: [
    {
      locale: 'en',
      key: 'header',
      loader: async () => (
        await import('./lang/en/header.json')
      ).default,
    },
    {
      locale: 'es',
      key: 'header',
      loader: async () => (
        await import('./lang/es/header.json')
      ).default,
    },
    {
      locale: 'en',
      key: 'license',
      loader: async () => (
        await import('./lang/en/license.json')
      ).default,
    },
    {
      locale: 'es',
      key: 'license',
      loader: async () => (
        await import('./lang/es/license.json')
      ).default,
    },
    {
      locale: 'en',
      key: 'account',
      loader: async () => (
        await import('./lang/en/account.json')
      ).default,
    },
    {
      locale: 'es',
      key: 'account',
      loader: async () => (
        await import('./lang/es/account.json')
      ).default,
    },
  ]
});

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);