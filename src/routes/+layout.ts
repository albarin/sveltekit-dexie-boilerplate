import { browser } from '$app/environment';
import { db } from '$lib/db';
import { loadTranslations } from '$lib/translations';
import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ url }) => {
  if (browser) {
    await db.open();
  }

  const { pathname } = url;
  const initLocale = 'en';

  await loadTranslations(initLocale, pathname);

  return {};
}