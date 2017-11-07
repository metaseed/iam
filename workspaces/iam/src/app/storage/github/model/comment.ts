import { User } from './user';

export interface Comment {
    id: number;
    url: string;
    html_url: string;
    // application/vnd.github.VERSION.full+json will have body & body_text & body_html
    body?: string; // application/vnd.github.VERSION.raw+json
    body_text?: string; // application/vnd.github.VERSION.text+json
    body_html?: string; // application/vnd.github.VERSION.html+json
    user: User;
    created_at: string;
    updated_at: string;
}
