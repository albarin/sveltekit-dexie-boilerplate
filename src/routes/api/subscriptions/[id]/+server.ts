import dexie from "$lib/dexie";
import { getBearerToken } from "$lib/utils.js";

export const GET = async ({ params, request }) => {
  const id = params?.id;

  const token = getBearerToken(request)
  if (!token) {
    return new Response(null, { status: 401 });
  }

  const subscription = await dexie.getSubscription(id, token);
  if (!subscription) {
    return new Response(null, { status: 404 });
  }

  return new Response(JSON.stringify(subscription));
}

export const DELETE = async ({ params, request }) => {
  const id = params?.id;

  const token = getBearerToken(request)
  if (!token) {
    return new Response(null, { status: 401 });
  }

  await dexie.deleteSubscription(id, token);

  return new Response();
}
