import fs from "fs";
/**
 * Core compiler
 * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
 */
declare class core {
    static arrayFilter(arr: any[]): any[];
    /**
     * return Asynchronous function (Promise)
     * @param callback
     */
    static async(callback: Function): Promise<unknown>;
    /**
     * localStorage NodeJS Version
     */
    static localStorage(): any;
    /**
     * Composer
     * @param dir directory has composer.json
     * @param type
     */
    static composer(dir: string, type: "update" | "install" | "validate" | "upgrade" | "self-update"): void;
    /**
     * @param {import("fs").PathLike} dir
     * @param {string[]} [filelist]
     * @return {Array}
     */
    static readdir(dir: import("fs").PathLike, filelist: string[]): Array<any>;
    /**
     * Compile filename.scss to filename.css and filename.min.css
     * @param filename
     */
    static scss(filename: fs.PathLike): void;
    /**
     * Get root path
     * @returns {string} posix/unix path format
     */
    static root(): string;
    /**
     * Minify all js file to format *.min.js
     * @param {string} folder
     */
    static minify_folder(folder: string): void;
    /**
     * Obfuscate Javascript
     * @param {string} filejs
     */
    static obfuscate(filejs: string): void;
    /**
     * Minify JS into *.min.js version
     * @param {string} file
     */
    static minJS(file: string): void;
    /**
     * smart delete file
     * @param {string} file
     */
    static unlink(file: string): void;
    /**
     * format path to unix path
     * @param {string} path
     * @returns {string|null}
     */
    static normalize(path: string): string | null;
    /**
     * Determine OS is windows
     */
    static isWin(): boolean;
    /**
     * minify css to *.min.css version
     * @param {string} file
     * @param {Function|null} callback
     */
    static minCSS(file: string, callback: Function | null): void;
}
export default core;
