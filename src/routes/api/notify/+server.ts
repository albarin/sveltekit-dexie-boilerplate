import { CONTACT_EMAIL, VAPID_PRIVATE_KEY, VAPID_PUBLIC_KEY } from '$env/static/private';
import dexie from '$lib/dexie';
import { getBearerToken } from '$lib/utils';
import webpush, { WebPushError } from 'web-push';

webpush.setVapidDetails(`mailto:${CONTACT_EMAIL}`, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

export const POST = async ({ request }) => {
  const token = getBearerToken(request)
  if (!token) {
    return new Response(null, { status: 401 });
  }

  const subscriptions = await dexie.getAllSubscriptions(token);

  for (const subscription of subscriptions) {
    try {
      await webpush.sendNotification(subscription.subscription, 'Hello, world!');

    } catch (err) {
      console.error('Failed to send notification:', err);
      if ((err as WebPushError).statusCode === 410) {
        console.error(`Subscription expired, deleting subscription: ${subscription.id}`);
        await dexie.deleteSubscription(subscription.id, token);
      }
    }
  }

  return new Response();
};
