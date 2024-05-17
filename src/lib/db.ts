import { PUBLIC_DB_NAME, PUBLIC_DB_URL } from '$env/static/public';
import Dexie, { type Table } from 'dexie';
import dexieCloud from 'dexie-cloud-addon';

export interface Settings {
  id?: number;
  key: string;
  value: string;
}

export interface Notification {
  id: number;
  body: string;
  read: boolean;
  date: Date;
}

export class DB extends Dexie {
  settings!: Table<Settings>;
  notifications!: Table<Notification>;

  constructor() {
    super(PUBLIC_DB_NAME, { addons: [dexieCloud] });

    this.version(1).stores({
      settings: '@id, key',
      notifications: '@id, read, date',
    });

    this.cloud.configure({
      databaseUrl: PUBLIC_DB_URL || '',
      requireAuth: false,
    });
  }
}

export const db = new DB();
