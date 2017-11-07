export class Media {
    private static getString(type?: string, format?, version = 'V3') {
        return `application/vnd.github.${version}${type ? '.' : ''}${type}${format ? '+' : ''}${format}`;
    }

    private static getStringOfJson(type?: string, format = 'json', version = 'V3') {
        return this.getString(type, format, version);
    }

    static get default() {
        return this.getStringOfJson('');
    }

    static get html() {
        return this.getStringOfJson('html');
    }

    static get text() {
        return this.getStringOfJson('text');
    }

    static get full() {
        return this.getStringOfJson('full');
    }

    static get raw() {
        return this.getStringOfJson('raw');
    }

    static get commentMedias() {
        return {
            html: Media.html,
            raw: Media.raw,
            text: Media.text,
            full: Media.full
        };
    }

    static get blobMedias() {
        return {
            json: Media.default,
            get raw() {
                return Media.getString('raw');
            }
        }
    }

    static get commitMedias() {
        return {
            get diff() {
                return Media.getString('diff');
            },
            get patch() {
                return Media.getString('patch');
            },
            get sha() {
                return Media.getString('sha');
            }
        };
    }

    static get contentMedias() {
        return {
            raw: Media.getString('raw'),
            html: Media.getString('html')
        };
    }

    static get gistMedias() {
        return {
            raw: Media.getString('raw'),
            base64: Media.getString('base64')
        };
    }

}
