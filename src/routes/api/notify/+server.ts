import { CONTACT_EMAIL, VAPID_PRIVATE_KEY, VAPID_PUBLIC_KEY } from '$env/static/private';
import dexie from '$lib/dexie';
import webpush from 'web-push';

webpush.setVapidDetails(`mailto:${CONTACT_EMAIL}`, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

export const POST = async () => {
  const subscriptions = await dexie.getAllSubscriptions();

  for (const subscription of subscriptions) {
    await webpush.sendNotification(subscription.subscription, 'Hello, world!');
  }

  return new Response();
};
