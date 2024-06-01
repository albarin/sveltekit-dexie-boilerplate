import dexie from "$lib/dexie";

export const DELETE = async ({ params }) => {
  const id = params?.id;

  await dexie.deleteSubscription(id);

  return new Response();
}
