Object.size = function (obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key))
            size++;
    }
    return size;
};
Object.child = function (str, callback) {
    var self = this;
    if (self.hasOwnProperty(str)) {
        if (typeof callback == "function") {
            return callback(self[str]);
        }
        else {
            return true;
        }
    }
    else {
        return undefined;
    }
};
Object.alt = function (str, alternative) {
    var self = this;
    if (self.hasOwnProperty(str)) {
        return self[str];
    }
    else {
        return alternative;
    }
};
Object.has = function (str) {
    return this.hasOwnProperty(str);
};
/**
 * unique id generator
 * @param length digit number string
 * @returns random string
 */
function makeid(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
/**
 * Local Storage key
 */
const storageKey = location.pathname.replace(/\/$/s, "") + "/formField";
let formFieldBuild;
const formSaved = localStorage.getItem(storageKey.toString());
if (!formSaved) {
    formFieldBuild = [];
}
else {
    formFieldBuild = JSON.parse(formSaved);
}
/**
 * Element Indexer
 */
const formField = formFieldBuild;
const uniqueid = makeid(5);
/**
 * check if running in browser
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
/**
 * Element Counter
 */
let Count = -1;
/// <reference path="./_a_Object.d.ts" />
if (typeof Storage == "undefined") {
    class Storage {
    }
}
class lStorage extends Storage {
    constructor(prefix = "") {
        super();
        this.prefix = "";
        this.prefix = prefix;
    }
    has(key) {
        return !!localStorage[this.prefix + key] && !!localStorage[this.prefix + key].length;
    }
    /**
     * See {@link localStorage.getItem}
     * @param key
     * @returns
     */
    get(key) {
        if (!this.has(this.prefix + key)) {
            return false;
        }
        var data = localStorage[this.prefix + key];
        try {
            return JSON.parse(data);
        }
        catch (e) {
            return data;
        }
    }
    set(key, value) {
        try {
            localStorage.setItem(this.prefix + key, JSON.stringify(value));
        }
        catch (e) {
            localStorage.setItem(this.prefix + key, value);
        }
    }
    extend(key, value) {
        if (this.has(this.prefix + key)) {
            var _value = this.get(this.prefix + key);
            if (typeof jQuery != "undefined") {
                $.extend(_value, JSON.parse(JSON.stringify(value)));
            }
            this.set(this.prefix + key, _value);
        }
        else {
            this.set(this.prefix + key, value);
        }
    }
    remove(key) {
        localStorage.removeItem(this.prefix + key);
    }
}
/// <reference path='./_lStorage.ts' />
/// <reference path='./globals.d.ts' />
/// <reference path='./_conf.ts' />
const formSaver2Storage = {
    /**
     * See {@see localstorage.setItem}
     * @param key
     * @param value
     */
    set(key, value) {
        if (typeof value == "object" || Array.isArray(value))
            value = JSON.stringify(value);
        if (typeof value != "string")
            value = new String(value);
        localStorage.setItem(key, value);
    },
    get(key) {
        let value = localStorage.getItem(key);
        if (this.IsJsonString(value)) {
            value = JSON.parse(value);
        }
        if (value != null)
            return value;
    },
    IsJsonString(str) {
        if (str == null)
            return false;
        try {
            JSON.parse(str);
        }
        catch (e) {
            return false;
        }
        return true;
    },
};
class formSaver2 {
    /**
     * Get Offsets Element
     * @param el
     * @returns
     */
    static offset(el) {
        return el.getBoundingClientRect();
    }
    /**
     * jQuery event listener
     */
    static jquery_listener() {
        // bind to new elements
        $(document).bind("DOMNodeInserted", function () {
            switch ($(this).prop("tagName")) {
                case "SELECT":
                case "INPUT":
                case "TEXTAREA":
                    formSaver2.restore($(this).get(0));
                    break;
            }
        });
        // detach from removed elements
        $(document).bind("DOMNodeRemoved", function () {
            const t = $(this);
            const allowed = !t.attr("no-save") && t.attr("aria-formsaver");
            if (allowed) {
                switch (t.prop("tagName")) {
                    case "SELECT":
                    case "INPUT":
                    case "TEXTAREA":
                        t.off("change");
                        break;
                }
            }
        });
        //save value to localstorage
        $(document).on("change", "select, input, textarea", function (e) {
            formSaver2.save(this);
        });
        // validate formsaver
        $(document).on("focus", "input,textarea,select", function () {
            const t = $(this);
            t.getIDName();
            const aria = t.attr("aria-formsaver");
            if (aria && aria != uniqueid) {
                console.log("aria id invalid");
                t.smartForm();
                t.attr("aria-formsaver", uniqueid);
            }
        });
    }
    /**
     * Pure javascript event listener
     */
    static vanilla_listener(el, callback) {
        if (el.addEventListener) {
            el.addEventListener("change", callback);
        }
        else if (el.attachEvent) {
            el.attachEvent("onchange", callback);
        }
    }
    /**
     * Is element has attribute ?
     * @param el
     * @param name
     * @returns
     */
    static hasAttribute(el, name) {
        return el.nodeType === 1 && el.hasAttribute(name);
    }
    static convertElement(el) {
        if (el instanceof jQuery) {
            el = el.get(0);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const nodeValid = el.nodeType === 1;
        return el;
    }
    /**
     * Restore form value
     * @param el
     * @param debug
     * @returns
     */
    static restore(el, debug = false) {
        el = this.convertElement(el);
        Count++;
        // skip no save
        if (el.hasAttribute("no-save"))
            return;
        el.setAttribute("aria-formsaver", uniqueid);
        let item;
        const key = this.get_identifier(el);
        const type = el.getAttribute("type");
        //console.log(`restoring ${key} ${type}`);
        // begin restoration
        if (key.length > 0) {
            // checkbox input button
            if (type === "checkbox") {
                item = JSON.parse(localStorage.getItem(key));
                if (item === null) {
                    return;
                }
                if (debug)
                    console.log(`restore value checkbox[${key}] ${item}`);
                el.checked = item;
                return;
            }
            // radio input button
            else if (type === "radio") {
                let value = localStorage.getItem(key);
                if (formSaver2Storage.IsJsonString(value)) {
                    value = JSON.parse(value);
                }
                const ele = document.getElementsByName(el.getAttribute("name"));
                for (let i = 0; i < ele.length; i++)
                    ele[i].checked = false;
                setTimeout(function () {
                    if (value && typeof value == "object" && value.hasOwnProperty("index")) {
                        //ele.item(value.index).checked = true;
                        ele[value.index].checked = true;
                        if (debug)
                            console.log("restoring checkbox", value);
                    }
                }, 1000);
                //item = value === "on";
                //el.checked = item;
                return;
            }
            // input text number, textarea, or select
            else {
                item = localStorage.getItem(key);
                if (item === null || !item.toString().length) {
                    return;
                }
                el.value = item;
                // select2
                if (this.is_select2(el)) {
                    console.log(`restoring ${el.getAttribute("id")} which Initialized select2`);
                    $(el).val(item).trigger("change");
                }
            }
            //if (debug) console.log("load", type, key, item);
        }
    }
    /**
     * Save values form
     * @param el
     * @returns
     */
    static save(el, debug = false) {
        el = this.convertElement(el);
        const key = this.get_identifier(el);
        const item = el.value;
        const allowed = !el.hasAttribute("no-save") && el.hasAttribute("aria-formsaver") && el.hasAttribute("name");
        if (debug)
            console.log(`${el.tagName} ${key} ${allowed}`);
        if (key && item !== "" && allowed) {
            if (el.getAttribute("type") == "checkbox") {
                localStorage.setItem(key, (el.checked == true).toString());
                if (debug)
                    console.log("save checkbox button ", formSaver2.offset(el));
                return;
            }
            else if (el.getAttribute("type") == "radio") {
                const ele = document.getElementsByName(el.getAttribute("name"));
                const getVal = getCheckedValue(ele);
                const self = this;
                for (let checkboxIndex = 0; checkboxIndex < ele.length; checkboxIndex++) {
                    if (ele.hasOwnProperty(checkboxIndex)) {
                        const element = ele[checkboxIndex];
                        self.delete(element, debug);
                    }
                }
                setTimeout(function () {
                    localStorage.setItem(key, JSON.stringify(getVal));
                    if (debug)
                        console.log("save radio button ", getVal);
                }, 1000);
                return;
            }
            else {
                localStorage.setItem(key, item.toString());
            }
            //if (debug) console.log("save", key, localStorage.getItem(key));
        }
    }
    static delete(el, debug = false) {
        el = this.convertElement(el);
        const key = this.get_identifier(el);
        if (debug)
            console.log(`deleting ${key}`);
        localStorage.removeItem(key);
    }
    /**
     * Is Select2 Initialized ?
     * @param el
     * @returns
     */
    static is_select2(el) {
        return this.is_jquery() && $(el).data("select2");
    }
    /**
     * Is jQuery loaded?
     * @returns
     */
    static is_jquery() {
        return typeof jQuery != "undefined";
    }
    static get_identifier(el) {
        el = this.convertElement(el);
        if (!el.hasAttribute("id")) {
            if (!(Count in formField)) {
                const ID = makeid(5);
                el.setAttribute("id", ID);
                formField[Count] = ID;
                localStorage.setItem(storageKey.toString(), JSON.stringify(formField));
            }
            else {
                el.setAttribute("id", formField[Count]);
            }
            /**
             * Increase index offset
             */
            Count++;
        }
        else if (el.getAttribute("id") == "null") {
            const ID = makeid(5);
            el.setAttribute("id", ID);
            formField[Count] = ID;
            localStorage.setItem(storageKey.toString(), JSON.stringify(formField));
        }
        return location.pathname + el.getAttribute("id");
    }
    constructor(el, options) {
        const defaultOpt = {
            debug: false,
            method: "vanilla",
        };
        options = Object.assign(defaultOpt, options);
        //console.log(`init debug ${options.debug}`, el);
        if (typeof options.debug == "undefined") {
            options.debug = false;
            console.log(`change debug to false`);
        }
        formSaver2.restore(el, options.debug);
        if (options.method == "jquery" && formSaver2.is_jquery()) {
            formSaver2.jquery_listener();
        }
        else {
            formSaver2.vanilla_listener(el, function () {
                console.log(arguments);
                formSaver2.save(el, options.debug);
            });
        }
    }
}
/**
 * this will check the checked radio in a group, and return the value
 * @param el
 * @returns
 * @see https://stackoverflow.com/a/30389680
 * @example
 * var checkedbooking = getCheckedValue(document.getElementsByName('booking_type'));
 * console.log(checkedbooking); // {index: NumberIndexRadio, value: valueOfRadio}
 */
function getCheckedValue(el) {
    let result = {};
    for (let i = 0, length = el.length; i < length; i++) {
        if (el[i].checked) {
            result = { value: el[i].value, index: i, id: formSaver2.get_identifier(el[i]) };
        }
    }
    return result;
}
/// modify this to tell typescript compiler
/// <reference path="./_conf.ts" />
/// <reference path="./_a_Object.d.ts"/>
/// <reference path="./globals.d.ts"/>
/// <reference path="./index.d.ts"/>
/// <reference path="./formSaver2.ts" />
/**
 * SMARTFORM
 * @todo save form user input
 */
//console.log(`is browser : ${isBrowser()}`);
if (isBrowser()) {
    (function () {
        const isJqueryLoaded = typeof jQuery != "undefined";
        //console.log(`is jQuery loaded : ${isJqueryLoaded}`);
        if (isJqueryLoaded) {
            //console.log("Apply plugin smartform jQuery");
            (function ($) {
                $.fn.getIDName = function () {
                    if ($(this).attr("aria-autovalue")) {
                        $(this).val(uniqueid).trigger("change");
                    }
                    return formSaver2.get_identifier(this);
                };
                $.fn.has_attr = function (name) {
                    var attr = $(this).attr(name);
                    // For some browsers, `attr` is undefined; for others,
                    // `attr` is false.  Check for both.
                    return typeof attr !== "undefined" && attr !== false;
                };
                $.fn.smartForm = function () {
                    Count++;
                    new formSaver2($(this).get(0));
                };
                $.arrive = function (target, callback) {
                    if (target) {
                        $(target).bind("DOMNodeInserted", callback);
                    }
                    else {
                        if (typeof callback == "function") {
                            $(document).bind("DOMNodeInserted", callback);
                        }
                        else if (typeof target == "function") {
                            $(document).bind("DOMNodeInserted", target);
                        }
                    }
                };
            })(jQuery);
        }
    })();
}
/**
 * Set all forms to be saved with method vanilla
 * @todo save input fields into browser for reusable form
 * @param show_debug debug process saving and restoration
 */
function formsaver(show_debug = false) {
    if (typeof jQuery != "undefined") {
        if (show_debug)
            console.log("Starting smartform jQuery");
        if (typeof jQuery != "undefined") {
            jQuery("input,textarea,select").each(function (i, el) {
                new formSaver2(this, { debug: show_debug });
            });
        }
    }
}
