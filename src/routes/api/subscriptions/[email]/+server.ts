import dexie from "$lib/dexie";

export const DELETE = async ({ params }) => {
  const email = params?.email;

  await dexie.deleteSubscriptions(email);

  return new Response();
}
