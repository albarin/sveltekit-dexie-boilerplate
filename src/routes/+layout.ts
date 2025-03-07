import { browser } from '$app/environment';
import { db, DB } from '$lib/db';
import { NotificationRepository } from '$lib/db/repositories/NotificationRepository';
import { SettingRepository } from '$lib/db/repositories/SettingRepository';
import { getSubscription } from '$lib/notifications';
import { browserLocale, loadTranslations } from '$lib/translations';
import { detectSWUpdate } from '$lib/updates';
import type { Load } from '@sveltejs/kit';

export const ssr = false;

export const load: Load = async ({ url }) => {
    const { pathname } = url;

    let settingRepository = null;
    let notificationRepository = null;
    if (browser) {
        settingRepository = new SettingRepository(db);
        notificationRepository = new NotificationRepository(db);
        const lang = await language(settingRepository);
        await loadTranslations(lang, pathname);
    }

    const serviceWorker = await detectSWUpdate();
    const subscription = await getSubscription();

    const dbSubscriptions = await db.subscriptions.toArray();
    if (dbSubscriptions.length === 0 && subscription) {
        await subscription?.unsubscribe();
    }

    return {
        subscription,
        serviceWorker,
        newVersionAvailable: !!serviceWorker,
        settingRepository,
        notificationRepository,
    };
}

async function language(settingRepository: SettingRepository) {
    const userLanguage = await settingRepository.getByKey('language');

    if (userLanguage) {
        return userLanguage.value.toString();
    }

    return browserLocale;
}
