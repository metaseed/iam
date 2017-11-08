export interface Document {
    id: number;
    title: string;
    labels: string; // comma separated
    creator: string;
    state: 'open' | 'closed' | 'all';
    created_at: Date;
    updated_at: Date;
    comments: object;
}