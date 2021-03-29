/// <reference path="./Object.d.ts"/>
/// <reference path="./globals.d.ts"/>

/**
 * SMARTFORM
 * @todo save form user input
 */

/**
 * Element Counter
 */
var Count = -1;
/**
 * Local Storage key
 */
var storageKey: String = "";
if (typeof location != "undefined") {
  location.pathname.replace(/\/$/s, "") + "/formField";
}
/**
 * Element Indexer
 */
var formField: object | Array<any>;
var formSaved = localStorage.getItem(storageKey.toString());
if (!formSaved) {
  formField = [];
} else {
  formField = JSON.parse(formSaved);
}
var uniqueid = guid();

/**
 * Get unique identifier of elements
 * @param elem jQuery<HTMLElement> or HTMLElement
 * @return string of unique identifier
 */
function get_unique_id_element(
  elem: HTMLElement | JQuery<HTMLElement>,
  encrypted: boolean = false
) {
  var element:
    | HTMLElement
    | HTMLDocument
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement = null;
  if (elem instanceof jQuery) {
    element = elem.get(0);
  } else if (elem instanceof HTMLElement) {
    element = elem;
  }

  if (element != null && !(element instanceof HTMLDocument)) {
    if (
      element instanceof HTMLInputElement ||
      element instanceof HTMLSelectElement ||
      element instanceof HTMLTextAreaElement
    ) {
      if (!element.hasAttribute("id") || element.getAttribute("id") == "") {
        if (!(Count in formField)) {
          /**
           * @todo ID generator 6 digit alphanumerics
           */
          var id: string = Math.random().toString(20).substr(2, 6);
          element.setAttribute("id", id);
          /**
           * Save to localstorage
           */
          (<any>formField)[Count] = id;
          localStorage.setItem(
            storageKey.toString(),
            JSON.stringify(formField)
          );
        } else {
          element.setAttribute("id", (<any>formField)[Count]);
        }
        /**
         * Increase indexer
         */
        Count++;
      }

      if (element.hasAttribute("aria-autovalue")) {
        element.setAttribute("value", uniqueid);
      }

      var combined =
        "[" +
        location.pathname.replace(/\/$/, "") +
        "/" +
        element.tagName +
        "/" +
        element.getAttribute("id") +
        "/" +
        (element.hasAttribute("name")
          ? element.getAttribute("name")
          : "empty") +
        "]";
      if (encrypted) return md5(combined);
      return combined;
    } else {
      console.log(`element ${element}`);
    }
  }
  return "";
}

/**
 * Restore saved values of fields
 * @param elem
 */
function restore_form_fields(elem: HTMLElement | JQuery<HTMLElement>) {
  Count++;

  var element:
    | HTMLElement
    | HTMLDocument
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement = null;
  if (elem instanceof jQuery) {
    element = elem.get(0);
  } else if (elem instanceof HTMLElement) {
    element = elem;
  }

  if (element != null && !(element instanceof HTMLDocument)) {
    if (
      element instanceof HTMLInputElement ||
      element instanceof HTMLSelectElement ||
      element instanceof HTMLTextAreaElement
    ) {
      if (element.hasAttribute("no-save")) {
        return;
      }
      // set indicator
      element.setAttribute("aria-smartform", uniqueid);
      var item: string | number | boolean | symbol | object;
      var key = get_unique_id_element(element);
      var type = element.getAttribute("type");

      // begin restoration
      if (key != null && key != "null" && key.length > 0) {
        if (type == "file") {
          console.error("cannot set value of input file");
          return;
        }
        // checkbox input button
        else if (type === "checkbox") {
          item = JSON.parse(localStorage.getItem(key));
          if (item === null) {
            return;
          }
          element.setAttribute("checked", item.toString());
          element.checked = item;
          return;
        }
        // radio input button
        else if (type === "radio") {
          item = localStorage.getItem(key) === "on";
          element.setAttribute("checked", item.toString());
          element.checked = item;
          return;
        }
        // input text number, textarea, or select
        else {
          item = localStorage.getItem(key);

          if (item === null || !item.toString().length) {
            return;
          }
          element.setAttribute("value", item);
          element.value = item;
        }
      }
    }
  }
}

/**
 * Save textarea values
 * @param elem
 */
function save_fields(elem: HTMLElement | JQuery<HTMLElement>) {
  var element:
    | HTMLElement
    | HTMLDocument
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement = null;
  if (elem instanceof jQuery) {
    element = elem.get(0);
  } else if (elem instanceof HTMLElement) {
    element = elem;
  }
  if (element != null && !(element instanceof HTMLDocument)) {
    if (
      element instanceof HTMLInputElement ||
      element instanceof HTMLSelectElement ||
      element instanceof HTMLTextAreaElement
    ) {
      get_unique_id_element(element);
      var aria = element.getAttribute("aria-smartform");
      if (aria && aria != uniqueid) {
        if (typeof jQuery != "undefined") {
          $(element).smartForm();
          $(element).attr("aria-smartform", uniqueid);
        }
      }
    }
  }
}

if (!(typeof module !== "undefined" && module.exports)) {
  if (typeof jQuery != "undefined") {
    (function ($) {
      $.fn.smartform_config = {
        console_log: false,
      };
      $.fn.get_unique_identifier = function () {
        return get_unique_id_element($(this));
      };
      $.fn.smartForm = function () {
        restore_form_fields($(this));
      };

      $.arrive = function (target, callback) {
        if (target) {
          $(target).bind("DOMNodeInserted", callback);
        } else {
          if (typeof callback == "function") {
            $(document).bind("DOMNodeInserted", callback);
          } else if (typeof target == "function") {
            $(document).bind("DOMNodeInserted", target);
          }
        }
      };

      // bind to new elements
      $(document).bind("DOMNodeInserted", function () {
        var t = $(this);
        var val = localStorage.getItem(t.get_unique_identifier().toString());
        var tag = t.prop("tagName");
        var allowed =
          !t.hasAttr("no-save") &&
          t.hasAttr("aria-smartform") &&
          typeof tag != "undefined";

        if (allowed && val) {
          console.log(tag, allowed && val);
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
        var allowed = !t.hasAttr("no-save") && t.hasAttr("aria-smartform");
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
        var key = t.get_unique_identifier().toString();
        var item = t.val();
        var allowed = !t.hasAttr("no-save") && t.hasAttr("aria-smartform");
        if (key && item !== "" && allowed) {
          if (t.attr("type") == "checkbox") {
            localStorage.setItem(key, t.is(":checked").toString());
            console.log("save checkbox button ", $(this).offset());
            return;
          }
          if (t.attr("type") == "radio" && t.attr("id")) {
            $('[name="' + t.attr("name") + '"]').each(function (i, e) {
              localStorage.setItem(
                $(this).get_unique_identifier().toString(),
                "off"
              );
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
        save_fields($(this));
      });
    })(jQuery);
  }
}

/**
 * Set all forms to be smart
 * @todo save input fields into browser for reusable form
 */
function smartform() {
  //set value from localstorage
  var setglobal = function () {
    jQuery("input,textarea,select").each(function (i, el) {
      $(this).smartForm();
    });
  };
  if (typeof jQuery != "undefined") setglobal();
  //setInterval(function () { }, 500);
}

/**
 * Copy to clipboard
 */
function copyToClipboard(text: string, el: JQuery) {
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
    } catch (err) {
      console.log("Oops, unable to copy");
    }
    document.body.removeChild(copyTextArea);
    el.attr("data-original-title", elOriginalText);
  } else {
    // Fallback if browser doesn't support .execCommand('copy')
    window.prompt("Copy to clipboard: Ctrl+C or Command+C, Enter", text);
  }
}
