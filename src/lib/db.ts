import { PUBLIC_DB_NAME, PUBLIC_DB_URL } from '$env/static/public';
import Dexie, { type Table } from 'dexie';
import dexieCloud from 'dexie-cloud-addon';
import { Setting } from './db/models/Setting';
import { Notification } from './db/models/Notification';

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

        this.settings.mapToClass(Setting);
        this.notifications.mapToClass(Notification);

        this.cloud.configure({
            databaseUrl: PUBLIC_DB_URL || '',
            requireAuth: false,
            customLoginGui: true
        });
    }
}

export const db = new DB();