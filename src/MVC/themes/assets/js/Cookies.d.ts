declare class Cookies {
    static get(c_name: string): string;
    static set(name: string, value: any, expire: number, expire_type: string): void;
}
