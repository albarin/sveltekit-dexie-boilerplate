import { browser } from '$app/environment';
import { db } from '$lib/db';
import type { Load } from '@sveltejs/kit';

export const load: Load = async () => {
  if (browser) {
    await db.open();
  }
}