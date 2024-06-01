import { Setting } from '$lib/db';
import { getSubscription } from '$lib/notifications';
import { browserLocale, loadTranslations } from '$lib/translations';
import { detectSWUpdate } from '$lib/updates';
import type { Load } from '@sveltejs/kit';

export const ssr = false;

export const load: Load = async ({ url }) => {
  const { pathname } = url;

  const lang = await language();
  await loadTranslations(lang, pathname);

  const serviceWorker = await detectSWUpdate();

  let subscription = await getSubscription();

  return {
    subscription,
    serviceWorker,
    newVersionAvailable: !!serviceWorker
  };
}

async function language() {
  const userLanguage = await Setting.get('language');
  if (userLanguage) {
    return userLanguage.value.toString();
  }

  return browserLocale;
}
