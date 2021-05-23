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
        if (typeof callback == 'function') {
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
/// <reference types="jquery" />
/**
 * Copy to clipboard
 */
function copyToClipboard(text, el) {
    var copyTest = document.queryCommandSupported("copy");
    var elOriginalText = el.attr("data-original-title");
    if (copyTest === true) {
        var copyTextArea = document.createElement("textarea");
        copyTextArea.value = text;
        document.body.appendChild(copyTextArea);
        copyTextArea.select();
        try {
            var successful = document.execCommand("copy");
            var msg = successful ? "Copied!" : "Whoops, not copied!";
            el.attr("data-original-title", msg);
            el.tooltip("show");
        }
        catch (err) {
            console.log("Oops, unable to copy");
        }
        document.body.removeChild(copyTextArea);
        el.attr("data-original-title", elOriginalText);
    }
    else {
        // Fallback if browser doesn't support .execCommand('copy')
        window.prompt("Copy to clipboard: Ctrl+C or Command+C, Enter", text);
    }
}
/// <reference path="./index.d.ts">
/**
 * A simple forEach() implementation for Arrays, Objects and NodeLists.
 * @private
 * @author Todd Motto
 * @link   https://github.com/toddmotto/foreach
 * @param {Array|Object|NodeList} collection Collection of items to iterate
 * @param {Function}              callback   Callback function for each iteration
 * @param {Array|Object|NodeList} [scope=null]      Object/NodeList/Array that forEach is iterating over (aka `this`)
 */
var forEach = function (collection, callback, scope = null) {
    if (Object.prototype.toString.call(collection) === "[object Object]") {
        for (var prop in collection) {
            if (Object.prototype.hasOwnProperty.call(collection, prop)) {
                callback.call(scope, collection[prop], prop, collection);
            }
        }
    }
    else {
        for (var i = 0, len = collection.length; i < len; i++) {
            callback.call(scope, collection[i], i, collection);
        }
    }
};
/**
 * Get the closest matching element up the DOM tree.
 * @private
 * @param  {Element} elem     Starting element
 * @param  {String}  selector Selector to match against
 * @return {Boolean|Element}  Returns null if not match found
 */
var getClosest = function (elem, selector) {
    // Element.matches() polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
                Element.prototype.mozMatchesSelector ||
                Element.prototype.msMatchesSelector ||
                Element.prototype.oMatchesSelector ||
                Element.prototype.webkitMatchesSelector ||
                function (s) {
                    var matches = (this.document || this.ownerDocument).querySelectorAll(s), i = matches.length;
                    while (--i >= 0 && matches.item(i) !== this) { }
                    return i > -1;
                };
    }
    // Get closest match
    for (; elem && elem !== document; elem = elem.parentNode) {
        if (elem.matches(selector))
            return elem;
    }
    return null;
};
/**
 * Convert data-options attribute into an object of key/value pairs
 * @private
 * @param {String} options Link-specific options as a data attribute string
 * @returns {Object}
 */
var getDataOptions = function (options) {
    return !options ||
        !(typeof JSON === "object" && typeof JSON.parse === "function")
        ? {}
        : JSON.parse(options);
};
/**
 * Handle events
 * @private
 */
var eventHandler = function (event) {
    var toggle = event.target;
    var save = getClosest(toggle, settings.selectorSave);
    var del = getClosest(toggle, settings.selectorDelete);
    if (save) {
        event.preventDefault();
        formSaver.saveForm(save, save.getAttribute("data-form-save"), settings);
    }
    else if (del) {
        event.preventDefault();
        formSaver.deleteForm(del, del.getAttribute("data-form-delete"), settings);
    }
};
/**
 * Is Browser (not node)
 */
var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
/**
 * Is Node (not browser)
 */
var isNode = new Function("try {return this===global;}catch(e){return false;}");
var settings, forms;
// Default settings
var defaults = {
    selectorStatus: "[data-form-status]",
    selectorSave: "[data-form-save]",
    selectorDelete: "[data-form-delete]",
    selectorIgnore: "[data-form-no-save]",
    deleteClear: true,
    saveMessage: "Saved!",
    deleteMessage: "Deleted!",
    saveClass: "",
    deleteClass: "",
    initClass: "js-form-saver",
    callbackSave: function () { },
    callbackDelete: function () { },
    callbackLoad: function () { },
};
/**
 * Merge two or more objects together.
 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param   {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
 * @param   {Object}   objects  The objects to merge together
 * @returns {Object|SettingForm}            Merged values of defaults and options
 */
function extend_setting_form(...param) {
    // Variables
    var extended = defaults;
    var deep = false;
    var i = 0;
    // Check if a deep merge
    if (Object.prototype.toString.call(arguments[0]) === "[object Boolean]") {
        deep = arguments[0];
        i++;
    }
    // Merge the object into the extended object
    var merge = function (obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                // If property is an object, merge properties
                if (deep &&
                    Object.prototype.toString.call(obj[prop]) === "[object Object]") {
                    extended[prop] = extend_setting_form(extended[prop], obj[prop]);
                }
                else {
                    extended[prop] = obj[prop];
                }
            }
        }
    };
    // Loop through each object and conduct a merge
    for (; i < arguments.length; i++) {
        merge(arguments[i]);
    }
    return extended;
}
class formSaver {
    /**
     * Save form data to localStorage
     * @public
     * @param  {Element} btn Button that triggers form save
     * @param  {Element} form The form to save
     * @param  {Object} options
     * @param  {Event} event
     */
    static saveForm(btn, formID, options, event = null) {
        // Defaults and settings
        var overrides = getDataOptions(btn ? btn.getAttribute("data-options") : null);
        var merged = extend_setting_form(settings || defaults, options || {}, overrides); // Merge user options with defaults
        var settings = merged;
        // Selectors and variables
        var form = document.querySelector(formID);
        var formSaverID = "formSaver-" + form.id;
        var formSaverData = {};
        var formFields = form.elements;
        var formStatus = form.querySelectorAll(settings.selectorStatus);
        /**
         * Convert field data into an array
         * @private
         * @param  {Element} field Form field to convert
         */
        var prepareField = function (field) {
            if (!getClosest(field, settings.selectorIgnore)) {
                if (field.type.toLowerCase() === "radio" ||
                    field.type.toLowerCase() === "checkbox") {
                    if (field.checked === true) {
                        formSaverData[field.name + field.value] = "on";
                    }
                }
                else if (field.type.toLowerCase() !== "hidden" &&
                    field.type.toLowerCase() !== "submit") {
                    if (field.value && field.value !== "") {
                        formSaverData[field.name] = field.value;
                    }
                }
            }
        };
        /**
         * Display status message
         * @private
         * @param  {Element} status The element that displays the status message
         * @param  {String} saveMessage The message to display on save
         * @param  {String} saveClass The class to apply to the save message wrappers
         */
        var displayStatus = function (status, saveMessage, saveClass) {
            status.innerHTML =
                saveClass === ""
                    ? "<div>" + saveMessage + "</div>"
                    : '<div class="' + saveClass + '">' + saveMessage + "</div>";
        };
        // Add field data to array
        forEach(formFields, function (field) {
            prepareField(field);
        });
        // Display save success message
        forEach(formStatus, function (status) {
            displayStatus(status, settings.saveMessage, settings.saveClass);
        });
        // Save form data in localStorage
        localStorage.setItem(formSaverID, JSON.stringify(formSaverData));
        settings.callbackSave(btn, form); // Run callbacks after save
    }
    /**
     * Remove form data from localStorage
     * @public
     * @param  {Element} btn Button that triggers form delete
     * @param  {Element} form The form to remove from localStorage
     * @param  {Object} options
     * @param  {Event} event
     */
    static deleteForm(btn, formID, options, event = null) {
        // Defaults and settings
        var overrides = getDataOptions(btn ? btn.getAttribute("data-options") : {});
        var settings = extend_setting_form(settings || defaults, options || {}, overrides); // Merge user options with defaults
        // Selectors and variables
        var form = document.querySelector(formID);
        var formSaverID = "formSaver-" + form.id;
        var formStatus = form.querySelectorAll(settings.selectorStatus);
        var formMessage = settings.deleteClass === ""
            ? "<div>" + settings.deleteMessage + "</div>"
            : '<div class="' +
                settings.deleteClass +
                '">' +
                settings.deleteMessage +
                "</div>";
        /**
         * Display succes message
         * @private
         */
        var displayStatus = function () {
            if (settings.deleteClear === true || settings.deleteClear === "true") {
                sessionStorage.setItem(formSaverID + "-formSaverMessage", formMessage);
                location.reload(false);
            }
            else {
                forEach(formStatus, function (status) {
                    status.innerHTML = formMessage;
                });
            }
        };
        localStorage.removeItem(formSaverID); // Remove form data
        displayStatus(); // Display delete success message
        settings.callbackDelete(btn, form); // Run callbacks after delete
    }
    /**
     * Load form data from localStorage
     * @public
     * @param  {Element} form The form to get data for
     * @param  {Object} options
     */
    loadForm(form, options) {
        // Selectors and variables
        var settings = extend_setting_form(settings || defaults, options || {}); // Merge user options with defaults
        var formSaverID = "formSaver-" + form.id;
        var formSaverData = JSON.parse(localStorage.getItem(formSaverID));
        var formFields = form.elements;
        var formStatus = form.querySelectorAll(settings.selectorStatus);
        /**
         * Populate a field with localStorage data
         * @private
         * @param  {Element} field The field to get data form
         */
        var populateField = function (field) {
            if (formSaverData) {
                if (field.type.toLowerCase() === "radio" ||
                    field.type.toLowerCase() === "checkbox") {
                    if (formSaverData[field.name + field.value] === "on") {
                        field.checked = true;
                    }
                }
                else if (field.type.toLowerCase() !== "hidden" &&
                    field.type.toLowerCase() !== "submit") {
                    if (formSaverData[field.name]) {
                        field.value = formSaverData[field.name];
                    }
                }
            }
        };
        /**
         * Display success message
         * @param  {Element} status The element that displays the status message
         */
        var displayStatus = function (status) {
            status.innerHTML = sessionStorage.getItem(formSaverID + "-formSaverMessage");
            sessionStorage.removeItem(formSaverID + "-formSaverMessage");
        };
        // Populate form with data from localStorage
        forEach(formFields, function (field) {
            populateField(field);
        });
        // If page was reloaded and delete success message exists, display it
        forEach(formStatus, function (status) {
            displayStatus(status);
        });
        settings.callbackLoad(form); // Run callbacks after load
    }
    /**
     * Destroy the current initialization.
     * @public
     */
    destroy() {
        if (!settings)
            return;
        document.documentElement.classList.remove(settings.initClass);
        document.removeEventListener("click", eventHandler, false);
        settings = null;
        forms = null;
    }
    /**
     * Initialize Form Saver
     * @public
     * @param {Object} options User settings
     */
    init(options) {
        // feature test
        if (!isBrowser())
            return;
        // Destroy any existing initializations
        this.destroy();
        // Selectors and variables
        settings = extend_setting_form(defaults, options || {}); // Merge user options with defaults
        forms = document.forms;
        // Add class to HTML element to activate conditional CSS
        document.documentElement.className +=
            (document.documentElement.className ? " " : "") + settings.initClass;
        // Get saved form data on page load
        forEach(forms, function (form) {
            this.loadForm(form, settings);
        });
        // Listen for click events
        document.addEventListener("click", eventHandler, false);
    }
    /**
     * Auto form saver
     */
    auto() {
        formsaver();
    }
}
/// <reference path="./Object.d.ts"/>
/// <reference path="./globals.d.ts"/>
/// <reference path="./index.d.ts"/>
/**
 * SMARTFORM
 * @todo save form user input
 */
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
 * Element Counter
 */
var Count = -1;
/**
 * Local Storage key
 */
var storageKey = location.pathname.replace(/\/$/s, "") + "/formField";
/**
 * Element Indexer
 */
var formField;
var formSaved = localStorage.getItem(storageKey.toString());
if (!formSaved) {
    formField = [];
}
else {
    formField = JSON.parse(formSaved);
}
var uniqueid = makeid(5);
/**
 * check if running in browser
 */
var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
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
                    return formSave.get_identifier(this);
                };
                $.fn.has_attr = function (name) {
                    var attr = $(this).attr(name);
                    // For some browsers, `attr` is undefined; for others,
                    // `attr` is false.  Check for both.
                    return typeof attr !== "undefined" && attr !== false;
                };
                $.fn.smartForm = function () {
                    Count++;
                    formSave.restore(this);
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
                    var t = $(this);
                    var val = localStorage.getItem(t.getIDName().toString());
                    var tag = t.prop("tagName");
                    var allowed = !t.attr("no-save") && t.attr("aria-formsaver") && typeof tag != "undefined";
                    if (allowed && val) {
                        //console.log(tag, allowed && val);
                        switch (t.prop("tagName")) {
                            case "SELECT":
                            case "INPUT":
                            case "TEXTAREA":
                                t.val(val);
                                break;
                        }
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
                    var t = $(this);
                    var key = t.getIDName().toString();
                    var item = t.val();
                    var allowed = !t.attr("no-save") && t.attr("aria-formsaver");
                    if (key && item !== "" && allowed) {
                        if (t.attr("type") == "checkbox") {
                            localStorage.setItem(key, t.is(":checked").toString());
                            console.log("save checkbox button ", $(this).offset());
                            return;
                        }
                        if (t.attr("type") == "radio" && t.attr("id")) {
                            $('[name="' + t.attr("name") + '"]').each(function (i, e) {
                                localStorage.setItem($(this).getIDName().toString(), "off");
                            });
                            setTimeout(() => {
                                localStorage.setItem(key, item.toString());
                                console.log("save radio button ", $(this).offset());
                            }, 500);
                            return;
                        }
                        localStorage.setItem(key, item.toString());
                        //console.log('save', key, localStorage.getItem(key));
                    }
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
    console.log("Starting smartform jQuery");
    //set value from localstorage
    if (typeof jQuery != "undefined") {
        jQuery("input,textarea,select").each(function (i, el) {
            $(this).smartForm();
        });
    }
    //setInterval(function () { }, 500);
}
class formSave {
    static save(el) {
        var key = this.get_identifier(el);
        var item = el.value;
        var allowed = !el.hasAttribute("no-save") && el.hasAttribute("aria-formsaver");
        if (key && item !== "" && allowed) {
            if (el.getAttribute("type") == "checkbox") {
                localStorage.setItem(key, (el.checked == true).toString());
                console.log("save checkbox button ", $(this).offset());
                return;
            }
            if (el.getAttribute("type") == "radio" && el.hasAttribute("id")) {
                $('[name="' + el.getAttribute("name") + '"]').each(function (i, e) {
                    localStorage.setItem($(this).getIDName().toString(), "off");
                });
                setTimeout(() => {
                    localStorage.setItem(key, item.toString());
                    console.log("save radio button ", $(this).offset());
                }, 500);
                return;
            }
            localStorage.setItem(key, item.toString());
            //console.log('save', key, localStorage.getItem(key));
        }
    }
    /**
     * Restore form value
     * @param el
     * @returns
     */
    static restore(el) {
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
                console.log(`value checkbox ${item}`);
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
            //console.log('load', type, key, item);
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
        return location.pathname + el.getAttribute("id");
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoialF1ZXJ5UGx1Z2luLWZvcm1zYXZlci5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy9zbWFydGZvcm0vc3JjLyIsInNvdXJjZXMiOlsiT2JqZWN0LnRzIiwiY29weS50cyIsImZvcm1TYXZlci50cyIsImpxdWVyeS1zYXZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRQSxNQUFNLENBQUMsSUFBSSxHQUFHLFVBQVUsR0FBRztJQUN2QixJQUFJLElBQUksR0FBRyxDQUFDLEVBQ1IsR0FBRyxDQUFDO0lBQ1IsS0FBSyxHQUFHLElBQUksR0FBRyxFQUFFO1FBQ2IsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQztZQUFFLElBQUksRUFBRSxDQUFDO0tBQ3ZDO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyxDQUFDO0FBQ0YsTUFBTSxDQUFDLEtBQUssR0FBRyxVQUFVLEdBQUcsRUFBRSxRQUFRO0lBQ2xDLElBQUksSUFBSSxHQUFRLElBQUksQ0FBQztJQUNyQixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDMUIsSUFBSSxPQUFPLFFBQVEsSUFBSSxVQUFVLEVBQUU7WUFDL0IsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDOUI7YUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDO1NBQ2Y7S0FDSjtTQUFNO1FBQ0gsT0FBTyxTQUFTLENBQUM7S0FDcEI7QUFDTCxDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsR0FBRyxHQUFHLFVBQVUsR0FBRyxFQUFFLFdBQVc7SUFDbkMsSUFBSSxJQUFJLEdBQVEsSUFBSSxDQUFDO0lBQ3JCLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUMxQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNwQjtTQUFNO1FBQ0gsT0FBTyxXQUFXLENBQUM7S0FDdEI7QUFDTCxDQUFDLENBQUE7QUFFRCxNQUFNLENB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