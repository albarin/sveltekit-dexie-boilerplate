import { CONTACT_EMAIL, VAPID_PRIVATE_KEY, VAPID_PUBLIC_KEY } from '$env/static/private';
import dexie from '$lib/dexie';
import webpush, { WebPushError } from 'web-push';

webpush.setVapidDetails(`mailto:${CONTACT_EMAIL}`, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

export const POST = async () => {
  const subscriptions = await dexie.getAllSubscriptions();

  for (const subscription of subscriptions) {
    try {
      await webpush.sendNotification(subscription.subscription, 'Hello, world!');

    } catch (err) {
      console.error('Failed to send notification:', err);
      if ((err as WebPushError).statusCode === 410) {
        console.error(`Subscription expired, deleting subscription: ${subscription.id}`);
        await dexie.deleteSubscription(subscription.id);
      }
    }
  }

  return new Response();
};
