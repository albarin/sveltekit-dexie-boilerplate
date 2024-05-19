import { DateTime } from 'luxon'

export const format = (date: DateTime | string) => {
  if (typeof date === 'string') {
    return DateTime.fromISO(date).toLocaleString();
  }

  return date.toLocaleString();
}