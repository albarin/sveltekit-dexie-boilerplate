import i18n from 'sveltekit-i18n';

const config = ({
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
  ]
});

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);