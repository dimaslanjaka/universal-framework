export = md5;
/**
 * Calculates MD5 value for a given string.
 * If a key is provided, calculates the HMAC-MD5 value.
 * Returns a Hex encoded string unless the raw argument is given.
 *
 * @param {string} string Input string
 * @param {string} [key] HMAC key
 * @param {boolean} raw Raw oytput switch
 * @returns {string} MD5 output
 */
declare function md5(string: string, key?: string, raw: boolean): string;
declare namespace md5 {
    export { conflictDetection, __esModule };
}
declare function conflictDetection(...args: any[]): void;
declare var __esModule: boolean;
