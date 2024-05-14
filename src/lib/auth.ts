import { db } from '$lib/db';
import type { SyncState } from 'dexie-cloud-addon';

export const login = async () => {
  await db.cloud.login();
};

export const logout = async () => {
  await db.cloud.logout();
};

export const inSync = (syncState: SyncState) => {
  return syncState.phase == 'in-sync';
}

export interface License {
  type: 'demo' | 'eval' | 'prod' | 'client';
  status: 'ok' | 'expired' | 'deactivated';
  validUntil?: Date;
  evalDaysLeft?: number;
}

export const isValidLicense = (license: License) => {
  return license.status === 'ok' &&
    license.validUntil === undefined &&
    license.evalDaysLeft === undefined
}

export const isExpiredLicense = (license: License) => {
  return license.status !== 'ok';
}

export const licenseDaysLeft = (license: License) => {
  let daysLeft = license.evalDaysLeft;

  if (license.evalDaysLeft === undefined) {
    const validUntil = license.validUntil?.getTime() ?? Infinity;
    daysLeft = Math.round((validUntil! - Date.now()) / (24 * 60 * 60 * 1000));
  }

  return daysLeft;
}