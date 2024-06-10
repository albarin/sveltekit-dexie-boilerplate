export interface License {
  type: 'demo' | 'eval' | 'prod' | 'client';
  status: 'ok' | 'expired' | 'deactivated';
  validUntil?: Date;
  evalDaysLeft?: number;
}

export const licenseIsValid = (license: License | undefined): boolean => {
  return !!license &&
    license.type === 'prod' &&
    license.status === 'ok' &&
    license.evalDaysLeft === undefined
}

export const licenseIsExpired = (license: License | undefined): boolean => {
  return !!license && license.status !== 'ok';
}

export const licenseIsEval = (license: License | undefined): boolean => {
  return !!license && license.type === 'eval';
}

export const licenseDaysLeft = (license: License | undefined): number | undefined => {
  if (!license) {
    return 0;
  }

  if (license.evalDaysLeft) {
    return license.evalDaysLeft;
  }

  if (license.validUntil) {
    const validUntil = license.validUntil?.getTime() ?? Infinity;
    return Math.round((validUntil! - Date.now()) / (24 * 60 * 60 * 1000));
  }

  return undefined;
}