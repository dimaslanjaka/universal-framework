/// <reference path="../src/smartform/src/js/Object.d.ts" />
/// <reference path="../src/smartform/src/js/globals.d.ts" />
/// <reference path="../src/smartform/src/js/index.d.ts" />
/**
 * Object management
 * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
 * @todo easy object processing
 */
declare type NotFunction<T> = T extends Function ? never : T;
/**
 * Copy to clipboard
 */
declare function copyToClipboard(text: string, el: JQuery): void;
/**
 * A simple forEach() implementation for Arrays, Objects and NodeLists.
 * @private
 * @author Todd Motto
 * @link   https://github.com/toddmotto/foreach
 * @param {Array|Object|NodeList} collection Collection of items to iterate
 * @param {Function}              callback   Callback function for each iteration
 * @param {Array|Object|NodeList} [scope=null]      Object/NodeList/Array that forEach is iterating over (aka `this`)
 */
declare var forEach: (collection: any, callback: any, scope?: any) => void;
/**
 * Get the closest matching element up the DOM tree.
 * @private
 * @param  {Element} elem     Starting element
 * @param  {String}  selector Selector to match against
 * @return {Boolean|Element}  Returns null if not match found
 */
declare var getClosest: (elem: any, selector: any) => any;
/**
 * Convert data-options attribute into an object of key/value pairs
 * @private
 * @param {String} options Link-specific options as a data attribute string
 * @returns {Object}
 */
declare var getDataOptions: (options: any) => any;
/**
 * Handle events
 * @private
 */
declare var eventHandler: (event: any) => void;
/**
 * Is Browser (not node)
 */
declare var isBrowser: Function;
/**
 * Is Node (not browser)
 */
declare var isNode: Function;
declare var settings: SettingForm, forms: any;
declare var defaults: SettingForm;
/**
 * Merge two or more objects together.
 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param   {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
 * @param   {Object}   objects  The objects to merge together
 * @returns {Object|SettingForm}            Merged values of defaults and options
 */
declare function extend_setting_form(...param: any[]): SettingForm;
declare class formSaver {
    /**
     * Save form data to localStorage
     * @public
     * @param  {Element} btn Button that triggers form save
     * @param  {Element} form The form to save
     * @param  {Object} options
     * @param  {Event} event
     */
    static saveForm(btn: any, formID: any, options: any, event?: any): void;
    /**
     * Remove form data from localStorage
     * @public
     * @param  {Element} btn Button that triggers form delete
     * @param  {Element} form The form to remove from localStorage
     * @param  {Object} options
     * @param  {Event} event
     */
    static deleteForm(btn: any, formID: any, options: any, event?: any): void;
    /**
     * Load form data from localStorage
     * @public
     * @param  {Element} form The form to get data for
     * @param  {Object} options
     */
    loadForm(form: any, options: any): void;
    /**
     * Destroy the current initialization.
     * @public
     */
    destroy(): void;
    /**
     * Initialize Form Saver
     * @public
     * @param {Object} options User settings
     */
    init(options: object): void;
    /**
     * Auto form saver
     */
    auto(): void;
}
/**
 * Element Counter
 */
declare var Count: number;
/**
 * Local Storage key
 */
declare var storageKey: String;
/**
 * Element Indexer
 */
declare var formField: object | Array<any>;
declare var formSaved: string;
declare var uniqueid: string;
/**
 * check if running in browser
 */
declare var isBrowser: Function;
/**
 * Set all forms to be smart
 * @todo save input fields into browser for reusable form
 */
declare function formsaver(): void;
declare class formSave {
    constructor(el: HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement);
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
    static get_identifier(el: HTMLElement): string;
}
