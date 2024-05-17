export interface License {
  type: 'demo' | 'eval' | 'prod' | 'client';
  status: 'ok' | 'expired' | 'deactivated';
  validUntil?: Date;
  evalDaysLeft?: number;
}

export const licenseIsValid = (license: License | undefined): boolean => {
  return !!license && license.status === 'ok' &&
    license.validUntil === undefined &&
    license.evalDaysLeft === undefined
}

export const licenseIsExpired = (license: License | undefined): boolean => {
  return !!license && license.status !== 'ok';
}

export const licenseDaysLeft = (license: License | undefined): number | undefined => {
  if (!license) {
    return 0;
  }

  if (license.status === 'ok') {
    return undefined
  }

  let daysLeft = license.evalDaysLeft || 0;

  if (license.evalDaysLeft === undefined) {
    const validUntil = license.validUntil?.getTime() ?? Infinity;
    daysLeft = Math.round((validUntil! - Date.now()) / (24 * 60 * 60 * 1000));
  }

  return daysLeft;
}