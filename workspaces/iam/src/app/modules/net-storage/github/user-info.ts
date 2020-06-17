
export class UserInfo {
    constructor(public name: string,
        public email: string,
        public password?: string,
        token?: number[]
    ) {
        this.token = UserInfo.dec(token, 'iam')
    }
    token: string;
    static en(text: string, key: string) {
        return Array.from(
            text,
            (c, i) => c.charCodeAt(0) ^ key.charCodeAt(i % key.length)
        );
    }

    static dec(text: number[], key: string) {
        return Array.from(
            text,
            (c, i) => String.fromCharCode(c ^ key.charCodeAt(i % key.length))
        ).join('');
    }
}
