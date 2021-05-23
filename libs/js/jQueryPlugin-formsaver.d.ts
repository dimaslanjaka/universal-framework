/// <reference path="../src/smartform/src/js/_a_Object.d.ts" />
/// <reference path="../src/smartform/src/js/globals.d.ts" />
/// <reference path="../src/smartform/src/js/index.d.ts" />
/**
 * Object management
 * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
 * @todo easy object processing
 */
declare type NotFunction<T> = T extends Function ? never : T;
/**
 * Local Storage key
 */
declare var storageKey: String;
declare var formFieldBuild: object | Array<any>;
declare var formSaved: string;
/**
 * Element Indexer
 */
declare var formField: object | any[];
declare var uniqueid: string;
/**
 * check if running in browser
 */
declare var isBrowser: Function;
/**
 * Element Counter
 */
declare var Count: number;
declare class lStorage extends Storage {
    constructor();
    has(key: string | number): boolean;
    /**
     * See {@link localStorage.getItem}
     * @param key
     * @returns
     */
    get(key: string | number): any;
    set(key: string, value: string): void;
    extend(key: any, value: any): void;
    remove(key: string): void;
}
declare class formSaver2 {
    static debug: boolean;
    /**
     * Save values form
     * @param el
     * @returns
     */
    static save(el: HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement): void;
    /**
     * Get Offsets Element
     * @param el
     * @returns
     */
    static offset(el: HTMLElement): DOMRect;
    static hasAttribute(el: HTMLElement, name: string): boolean;
    private static convertElement;
    /**
     * Restore form value
     * @param el
     * @returns
     */
    static restore(el: HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement): void;
    /**
     * Is Select2 Initialized ?
     * @param el
     * @returns
     */
    static is_select2(el: HTMLElement): Select2.Select2;
    /**
     * Is jQuery loaded?
     * @returns
     */
    static is_jquery(): boolean;
    static get_identifier(el: HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement): string;
}
/**
 * Set all forms to be smart
 * @todo save input fields into browser for reusable form
 */
declare function formsaver(): void;
