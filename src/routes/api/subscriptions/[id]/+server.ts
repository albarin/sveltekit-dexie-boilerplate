import dexie from "$lib/dexie";

export const GET = async ({ params }) => {
  const id = params?.id;

  const subscription = await dexie.getSubscription(id);
  if (!subscription) {
    return new Response(null, { status: 404 });
  }

  return new Response(JSON.stringify(subscription));
}

export const DELETE = async ({ params }) => {
  const id = params?.id;

  await dexie.deleteSubscription(id);

  return new Response();
}
