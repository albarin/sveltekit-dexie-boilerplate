import { getSubscription } from "$lib/notifications";
import type { Load } from "@sveltejs/kit";

export const load: Load = async () => {
  const subscription = await getSubscription();

  return {
    subscription
  }
}