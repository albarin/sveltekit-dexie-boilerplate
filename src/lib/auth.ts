import { db } from '$lib/db';

export const login = async () => {
  await db.cloud.login();
};

export const logout = async () => {
  await db.cloud.logout();
};