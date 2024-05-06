import { PUBLIC_DB_NAME, PUBLIC_DB_URL } from '$env/static/public';
import Dexie, { type Table } from 'dexie';
import dexieCloud from 'dexie-cloud-addon';

export interface Settings {
  id?: number;
  key: string;
  value: string;
}

export class DB extends Dexie {
  settings!: Table<Settings>;

  constructor() {
    super(PUBLIC_DB_NAME, { addons: [dexieCloud] });

    this.version(1).stores({
      settings: '@id, key'
    });

    this.cloud.configure({
      databaseUrl: PUBLIC_DB_URL || '',
      requireAuth: false,
    });
  }
}

export const db = new DB();
