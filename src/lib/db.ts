import { PUBLIC_DB_NAME, PUBLIC_DB_URL } from '$env/static/public';
import Dexie, { type Table } from 'dexie';
import dexieCloud from 'dexie-cloud-addon';

export interface Settings {
  id?: string;
  key: string;
  value: string;
}

export class DB extends Dexie {
  settings!: Table<Settings>;
  notifications!: Table<Notification>;

  constructor() {
    super(PUBLIC_DB_NAME, { addons: [dexieCloud] });

    this.version(1).stores({
      settings: '@id, key',
      notifications: '@id, read, created_at',
    });

    this.notifications.mapToClass(Notification);

    this.cloud.configure({
      databaseUrl: PUBLIC_DB_URL || '',
      requireAuth: false,
    });
  }
}

export class Notification {
  id?: string;
  message: string;
  read: boolean;
  created_at: string;

  constructor(message: string) {
    this.message = message;
    this.read = false;
    this.created_at = new Date().toISOString();
  }

  static create(message: string) {
    return new Notification(message);
  }

  async save() {
    try {
      await db.notifications.add(this);
    } catch (e) {
      alert(`Failed to save notification: ${e}`);
    }
  }

  async markAsRead() {
    try {
      await db.notifications.update(this.id, { read: true });
    } catch (e) {
      alert(`Failed to mark notification as read: ${e}`);
    }
  }

  async delete() {
    try {
      await db.notifications.delete(this.id);
    } catch (e) {
      alert(`Failed to delete notification: ${e}`);
    }
  }
}

export const db = new DB();

