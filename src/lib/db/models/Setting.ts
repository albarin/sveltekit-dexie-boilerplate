export class Setting {
    id?: string;
    key: string;
    value: string;
    created_at: string;
    updated_at: string;

    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
        this.created_at = new Date().toISOString();
        this.updated_at = new Date().toISOString();
    }
}