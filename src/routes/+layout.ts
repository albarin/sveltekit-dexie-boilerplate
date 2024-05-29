import { Setting } from '$lib/db';
import { browserLocale, loadTranslations } from '$lib/translations';
import { detectSWUpdate } from '$lib/updates';
import type { Load } from '@sveltejs/kit';

export const ssr = false;

export const load: Load = async ({ url }) => {
  const { pathname } = url;

  const lang = await language();
  await loadTranslations(lang, pathname);

  const serviceWorker = await detectSWUpdate();

  return {
    serviceWorker,
    newVersionAvailable: !!serviceWorker
  };
}

const language = async (): Promise<string> => {
  const userLanguage = await Setting.get('language');
  if (userLanguage) {
    return userLanguage.value.toString();
  }

  return browserLocale;
}