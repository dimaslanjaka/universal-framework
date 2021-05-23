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
if (typeof makeid == "undefined") {
    /**
     * unique id generator
     * @param length digit number string
     * @returns random string
     */
    var makeid = function (length) {
        var result = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
}
/**
 * Local Storage key
 */
var storageKey = location.pathname.replace(/\/$/s, "") + "/formField";
var formFieldBuild;
var formSaved = localStorage.getItem(storageKey.toString());
if (!formSaved) {
    formFieldBuild = [];
}
else {
    formFieldBuild = JSON.parse(formSaved);
}
/**
 * Element Indexer
 */
var formField = formFieldBuild;
var uniqueid = makeid(5);
/**
 * check if running in browser
 */
var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
/**
 * Element Counter
 */
var Count = -1;
/// <reference path="./_a_Object.d.ts" />
if (typeof Storage == "undefined") {
    class Storage {
    }
}
class lStorage extends Storage {
    constructor() {
        super();
    }
    has(key) {
        return !!localStorage[key] && !!localStorage[key].length;
    }
    /**
     * See {@link localStorage.getItem}
     * @param key
     * @returns
     */
    get(key) {
        if (!this.has(key)) {
            return false;
        }
        var data = localStorage[key];
        try {
            return JSON.parse(data);
        }
        catch (e) {
            return data;
        }
    }
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        }
        catch (e) {
            localStorage.setItem(key, value);
        }
    }
    extend(key, value) {
        if (this.has(key)) {
            var _value = this.get(key);
            if (typeof jQuery != "undefined") {
                $.extend(_value, JSON.parse(JSON.stringify(value)));
            }
            this.set(key, _value);
        }
        else {
            this.set(key, value);
        }
    }
    remove(key) {
        localStorage.removeItem(key);
    }
}
/// <reference path='./_lStorage.ts' />
/// <reference path='./_conf.ts' />
class formSaver2 {
    /**
     * Save values form
     * @param el
     * @returns
     */
    static save(el) {
        el = this.convertElement(el);
        var key = this.get_identifier(el);
        var item = el.value;
        var allowed = !el.hasAttribute("no-save") && el.hasAttribute("aria-formsaver");
        if (key && item !== "" && allowed) {
            if (el.getAttribute("type") == "checkbox") {
                localStorage.setItem(key, (el.checked == true).toString());
                if (formSaver2.debug)
                    console.log("save checkbox button ", formSaver2.offset(el));
                return;
            }
            else if (el.getAttribute("type") == "radio" && el.hasAttribute("id")) {
                $('[name="' + el.getAttribute("name") + '"]').each(function (i, e) {
                    localStorage.setItem(key, "off");
                });
                setTimeout(() => {
                    localStorage.setItem(key, item.toString());
                    if (formSaver2.debug)
                        console.log("save radio button ", formSaver2.offset(el));
                }, 500);
                return;
            }
            else {
                localStorage.setItem(key, item.toString());
            }
            if (formSaver2.debug)
                console.log("save", key, localStorage.getItem(key));
        }
    }
    /**
     * Get Offsets Element
     * @param el
     * @returns
     */
    static offset(el) {
        return el.getBoundingClientRect();
    }
    static hasAttribute(el, name) {
        return el.nodeType === 1 && el.hasAttribute(name);
    }
    static convertElement(el) {
        if (el instanceof jQuery) {
            el = el.get(0);
        }
        let nodeValid = el.nodeType === 1;
        return el;
    }
    /**
     * Restore form value
     * @param el
     * @returns
     */
    static restore(el) {
        el = this.convertElement(el);
        Count++;
        // skip no save
        if (el.hasAttribute("no-save"))
            return;
        el.setAttribute("aria-formsaver", uniqueid);
        let item;
        let key = this.get_identifier(el);
        var type = el.getAttribute("type");
        // begin restoration
        if (key) {
            // checkbox input button
            if (type === "checkbox") {
                item = JSON.parse(localStorage.getItem(key));
                if (item === null) {
                    return;
                }
                if (formSaver2.debug)
                    console.log(`value checkbox[${key}] ${item}`);
                el.checked = item;
                return;
            }
            // radio input button
            else if (type === "radio") {
                item = localStorage.getItem(key) === "on";
                el.checked = item;
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
                    $(el).val(item).trigger("change");
                }
            }
            if (formSaver2.debug)
                console.log("load", type, key, item);
        }
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
                let ID = makeid(5);
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
            let ID = makeid(5);
            el.setAttribute("id", ID);
            formField[Count] = ID;
            localStorage.setItem(storageKey.toString(), JSON.stringify(formField));
        }
        return location.pathname + el.getAttribute("id");
    }
}
formSaver2.debug = false;
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
                    formSaver2.restore($(this).get(0));
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
                    var t = $(this);
                    var allowed = !t.attr("no-save") && t.attr("aria-formsaver");
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
                $(document).on("focus", "input,textarea,select", function () {
                    var t = $(this);
                    t.getIDName();
                    var aria = t.attr("aria-formsaver");
                    if (aria && aria != uniqueid) {
                        t.smartForm();
                        t.attr("aria-formsaver", uniqueid);
                    }
                });
            })(jQuery);
        }
    })();
}
/**
 * Set all forms to be smart
 * @todo save input fields into browser for reusable form
 */
function formsaver() {
    if (typeof jQuery != "undefined") {
        console.log("Starting smartform jQuery");
        if (typeof jQuery != "undefined") {
            jQuery("input,textarea,select").each(function (i, el) {
                $(this).smartForm();
            });
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoialF1ZXJ5UGx1Z2luLWZvcm1zYXZlci5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy9zbWFydGZvcm0vc3JjLyIsInNvdXJjZXMiOlsiX2FfT2JqZWN0LnRzIiwiX2NvbmYudHMiLCJfbFN0b3JhZ2UudHMiLCJmb3JtU2F2ZXIyLnRzIiwianF1ZXJ5LXNhdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBLE1BQU0sQ0FBQyxJQUFJLEdBQUcsVUFBVSxHQUFHO0lBQ3ZCLElBQUksSUFBSSxHQUFHLENBQUMsRUFDUixHQUFRLENBQUM7SUFDYixLQUFLLEdBQUcsSUFBSSxHQUFHLEVBQUU7UUFDYixJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDO1lBQUUsSUFBSSxFQUFFLENBQUM7S0FDdkM7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDLENBQUM7QUFDRixNQUFNLENBQUMsS0FBSyxHQUFHLFVBQVUsR0FBRyxFQUFFLFFBQVE7SUFDbEMsSUFBSSxJQUFJLEdBQVEsSUFBSSxDQUFDO0lBQ3JCLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUMxQixJQUFJLE9BQU8sUUFBUSxJQUFJLFVBQVUsRUFBRTtZQUMvQixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUM5QjthQUFNO1lBQ0gsT0FBTyxJQUFJLENBQUM7U0FDZjtLQUNKO1NBQU07UUFDSCxPQUFPLFNBQVMsQ0FBQztLQUNwQjtBQUNMLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxHQUFHLEdBQUcsVUFBVSxHQUFHLEVBQUUsV0FBVztJQUNuQyxJQUFJLElBQUksR0FBUSxJQUFJLENBQUM7SUFDckIsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQzFCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3BCO1NBQU07UUFDSCxPQUFPLFdBQVcsQ0FBQztLQUN0QjtBQUNMLENB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