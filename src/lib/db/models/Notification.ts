export class Notification {
    id?: string;
    message: string;
    read: boolean;
    created_at: string;
    updated_at: string;

    constructor(message: string) {
        this.message = message;
        this.read = false;
        this.created_at = new Date().toISOString();
        this.updated_at = new Date().toISOString();
    }
}