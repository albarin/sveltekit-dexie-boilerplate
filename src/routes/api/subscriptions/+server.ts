import dexie from '$lib/dexie';
import { getBearerToken } from '$lib/utils';
import { json, type RequestEvent } from '@sveltejs/kit';

export const POST = async ({ request }: RequestEvent) => {
  const token = getBearerToken(request)
  if (!token) {
    return new Response(null, { status: 401 });
  }

  let subscription = null;

  try {
    subscription = await request.json();
  } catch (error) {
    return json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    );
  }

  const response = await dexie.createSubscription(subscription, token);
  if (!response) {
    return json(
      { error: 'Failed to create subscription' },
      { status: 400 }
    );
  }

  return json(
    response,
    { status: 201 }
  );
};
