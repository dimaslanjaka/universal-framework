/**
 * Check variable is timeout instance (setInterval, setTimeout)
 * @param {NodeJS.Timeout} t
 */
function isTimer(t) {
  return t instanceof Timeout;
}

/**
 * check native event for CustomEvent
 * @param {any} eventname
 */
function isNativeEvent(eventname) {
  return typeof document.body["on" + eventname] !== "undefined";
}

var events = {};
var original = window.addEventListener;

window.addEventListener = function (type, listener, useCapture) {
  events[type] = true;
  return original(type, listener, useCapture);
};

/**
 * Check if object has been added into event
 * @param {any} type
 */
function hasEventBeenAdded(type) {
  return type in events;
}

/**
 * Load CSS asynchronous
 * @param {String} CSSFiles
 */
function loadCSS(CSSFiles) {
  if (Array.isArray(CSSFiles)) {
    for (var x = 0; x < CSSFiles.length; x++) {
      createLink(CSSFiles[x]);
    }
  } else if (typeof CSSFiles == "string") {
    createLink(CSSFiles);
  }
}

/**
 * Prevent iframe accessing your website
 * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
 */
function prevent_iframe() {
  if (top.location.href != self.location.href) {
    top.location.href = self.location.href;
  }
}
