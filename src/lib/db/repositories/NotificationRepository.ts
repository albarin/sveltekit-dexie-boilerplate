import type { DB } from "$lib/db";
import type { Notification } from "../models/Notification";

export class NotificationRepository {
    db: DB;

    constructor(db: DB) {
        this.db = db;
    }

    async create(notification: Notification) {
        try {
            await this.db.notifications.add(notification);
        } catch (e) {
            alert(`Failed to save notification: ${e}`);
        }
    }

    async all() {
        return this.db.notifications.orderBy('created_at').reverse().toArray();
    }

    async markAsRead(id: string) {
        try {
            await this.db.notifications.update(id, {
                read: true,
                updated_at: new Date().toISOString()
            });
        } catch (e) {
            alert(`Failed to mark notification as read: ${e}`);
        }
    }

    async markAllAsRead(notifications: Notification[]) {
        await this.db.notifications.bulkUpdate(
            notifications.map((n) => ({ key: n.id, changes: { read: true } }))
        );
    };

    async delete(id: string) {
        try {
            await this.db.notifications.delete(id);
        } catch (e) {
            alert(`Failed to delete notification: ${e}`);
        }
    }

    async deleteAll() {
        await this.db.notifications.clear();
    };
}