import { PUBLIC_DB_NAME, PUBLIC_DB_URL } from '$env/static/public';
import Dexie, { type Table } from 'dexie';
import dexieCloud from 'dexie-cloud-addon';

export class DB extends Dexie {
  settings!: Table<Setting>;
  notifications!: Table<Notification>;

  backupTables = ['settings', 'notifications'];

  constructor() {
    super(PUBLIC_DB_NAME, { addons: [dexieCloud] });

    this.version(1).stores({
      settings: '@id, key, created_at, updated_at',
      notifications: '@id, read, created_at',
    });

    this.notifications.mapToClass(Notification);
    this.settings.mapToClass(Setting);

    this.cloud.configure({
      databaseUrl: PUBLIC_DB_URL || '',
      requireAuth: false,
      customLoginGui: true
    });
  }
}

export class Setting {
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

  static async create(key: string, value: string) {
    const setting = new Setting(key, value);
    await setting.save();

    return setting;
  }

  static async get(id: string) {
    return db.settings.get({ id })
  }

  static async getByKey(key: string) {
    return await db.settings.where({ key }).first();
  }

  async save() {
    try {
      await db.settings.add(this);
    } catch (e) {
      alert(`Failed to save setting: ${e}`);
    }
  }

  static async update(setting: Setting) {
    try {
      await db.settings.put({
        ...setting,
        updated_at: new Date().toISOString(),
      } as Setting);
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
    const notification = new Notification(message);
    notification.save();

    return notification;
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

