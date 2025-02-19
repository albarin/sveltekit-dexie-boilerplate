import dexie from '$lib/dexie';
import { type RequestEvent } from '@sveltejs/kit';
import webpush, { WebPushError } from 'web-push';

export const POST = async ({ params, request }: RequestEvent) => {
    const user = params?.user;
    if (!user) {
        return new Response(JSON.stringify({ error: 'User is required' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    try {
        const body = await request.json();
        if (!body.message) {
            return new Response(JSON.stringify({ error: 'Message is required' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        const subscription = await dexie.getSubscription(user);
        if (!subscription) {
            return new Response(JSON.stringify({ error: 'No subscription found' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        try {
            await webpush.sendNotification(
                subscription.subscription,
                JSON.stringify(body.message)
            );

            return new Response(JSON.stringify({ success: true }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (err) {
            console.error('Failed to send notification:', err);
            if ((err as WebPushError).statusCode === 410) {
                console.error(`Subscription expired, deleting subscription: ${subscription.id}`);
                await dexie.deleteSubscription(subscription.id);
            }
            return new Response(JSON.stringify({ error: 'Failed to send notification' }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Message is required' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}