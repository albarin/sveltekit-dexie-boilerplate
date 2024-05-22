import { DateTime } from 'luxon'
import { fallbackLocale } from './translations';

export const format = (date: DateTime | string, language: string | undefined) => {
  const formattedDate = typeof date === 'string'
    ? DateTime.fromISO(date)
    : date;

  return formattedDate
    .setLocale(language || fallbackLocale)
    .toLocaleString();
}