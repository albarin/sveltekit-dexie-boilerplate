import type { DB } from "$lib/db";
import { Setting } from "../models/Setting";

export class SettingRepository {
    db: DB;

    constructor(db: DB) {
        this.db = db;
    }

    async create(setting: Setting) {
        try {
            await this.db.settings.add(setting);
        } catch (e) {
            alert(`Failed to save setting: ${e}`);
        }
    }

    async get(id: string) {
        return this.db.settings.get({ id })
    }

    async getByKey(key: string) {
        return await this.db.settings.where({ key }).first();
    }

    async save() {
        try {
            await this.db.settings.add(this);
        } catch (e) {
            alert(`Failed to save setting: ${e}`);
        }
    }

    async update(setting: Setting) {
        try {
            await this.db.settings.put({
                ...setting,
                updated_at: new Date().toISOString(),
            } as Setting);
        } catch (e) {
            alert(`Failed to update setting: ${e}`);
        }
    }

    async delete(id: string) {
        try {
            await this.db.settings.delete(id);
        } catch (e) {
            alert(`Failed to delete setting: ${e}`);
        }
    }
}