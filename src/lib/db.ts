import { PUBLIC_DB_NAME, PUBLIC_DB_URL } from '$env/static/public';
import Dexie, { type Table } from 'dexie';
import dexieCloud from 'dexie-cloud-addon';

export class DB extends Dexie {
  settings!: Table<Settings>;
  notifications!: Table<Notification>;

  constructor() {
    super(PUBLIC_DB_NAME, { addons: [dexieCloud] });

    this.version(1).stores({
      settings: '@id, key, created_at, updated_at',
      notifications: '@id, read, created_at',
    });

    this.notifications.mapToClass(Notification);
    this.settings.mapToClass(Settings);

    this.cloud.configure({
      databaseUrl: PUBLIC_DB_URL || '',
      requireAuth: false,
    });
  }
}

export class Settings {
  id?: string;
  key: string;
  value: string;
  created_at: string;
  updated_at?: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
    this.created_at = new Date().toISOString();
    this.updated_at = new Date().toISOString();
  }

  static create(key: string, value: string) {
    return new Settings(key, value);
  }

  static async get(key: string) {
    return db.settings.get({ key })
  }

  async save() {
    try {
      await db.settings.add(this);
    } catch (e) {
      alert(`Failed to save setting: ${e}`);
    }
  }

  async update() {
    try {
      await db.settings.update(this.id, {
        value: this.value,
        updated_at: new Date().toISOString()
      });
    } catch (e) {
      alert(`Failed to update setting: ${e}`);
    }
  }

  async delete() {
    try {
      await db.settings.delete(this.id);
    } catch (e) {
      alert(`Failed to delete setting: ${e}`);
    }
  }
}

export class Notification {
  id?: string;
  message: string;
  read: boolean;
  created_at: string;
  updated_at?: string;

  constructor(message: string) {
    this.message = message;
    this.read = false;
    this.created_at = new Date().toISOString();
    this.updated_at = new Date().toISOString();
  }

  static create(message: string) {
    return new Notification(message);
  }

  static async all() {
    return db.notifications.orderBy('created_at').reverse().toArray();
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
      await db.notifications.update(this.id, {
        read: true,
        updated_at: new Date().toISOString()
      });
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

