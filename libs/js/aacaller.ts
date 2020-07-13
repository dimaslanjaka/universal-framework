var isNode = false;
var root: any;
declare var global: any;

(function () {
  if (typeof global == "undefined" || (global && !global)) {
    global = this;
  }
  // Establish the root object, `window` in the browser, or `global` on the server.
  root = this;

  // Export the Underscore object for **CommonJS**, with backwards-compatibility
  // for the old `require()` API. If we're not in CommonJS, add `_` to the
  // global object.
  if (typeof module !== "undefined" && module.exports) {
    isNode = true;
  }
})();

/**
 * Is Node ?
 */
function isnode() {
  return isNode;
}

if (isnode()) {
  module.exports.isnode = isnode;
} else {
  global.isnode = isnode;
}

/**
 * call_user_func
 * @param functionName function name
 */
function ___call(functionName: string, context?: Window, args?: any) {
  var args = Array.prototype.slice.call(arguments, 2);
  var namespaces = functionName.split(".");
  var func = namespaces.pop();
  if (typeof window[func] != "undefined") {
    window[func](args);
  } else if (context && context instanceof Window) {
    if (typeof context[func] != "undefined") {
      context[func](args);
    }
  } else {
    try {
      eval(functionName);
    } catch (error) {
      console.error(error);
      console.error(functionName + " is not function");
    }
  }
}

if (isnode()) {
  module.exports.___call = ___call;
} else {
  global.___call = ___call;
}

/**
 * call_user_func
 * @param functionName
 * @param context
 * @param args
 */
function call_user_func(
  functionName: string,
  context: Window & typeof globalThis,
  args: any
) {
  var args = Array.prototype.slice.call(arguments, 2);
  var namespaces = functionName.split(".");
  var func = namespaces.pop();
  for (var i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }
  return context[func].apply(context, args);
}

if (isnode()) {
  module.exports.call_user_func = call_user_func;
} else {
  global.call_user_func = call_user_func;
}

/**
 * Make function async
 * @param callback
 */
function async_this(callback: Function): Promise<any> {
  return new Promise(function (resolve, reject) {
    if (typeof callback == "function") {
      callback();
      resolve(true);
    } else {
      reject(new Error("callback is not function"));
    }
  });
}

if (isnode()) {
  module.exports.async_this = async_this;
} else {
  global.async_this = async_this;
}

/**
 * call_user_func
 * @param func function name
 */
function __call(func: string) {
  this[func].apply(this, Array.prototype.slice.call(arguments, 1));
}

if (isnode()) {
  module.exports.__call = __call;
} else {
  global.__call = __call;
}

/**
 * check empty
 * @param str
 */
function empty(str: string | null | undefined | number | boolean) {
  var type = typeof str;
  if (type == "string" || type == "number") {
    str = str.toString().trim();
  }
  switch (str) {
    case "":
    case null:
    case false:
    case type == "undefined": //typeof (str) == "undefined"
      return true;
    default:
      return false;
  }
}

if (isnode()) {
  module.exports.empty = empty;
} else {
  global.empty = empty;
}

/**
 * Get current function name
 */
function getFuncName() {
  return getFuncName.caller.name;
}

if (isnode()) {
  module.exports.getFuncName = getFuncName;
} else {
  global.getFuncName = getFuncName;
}

/**
 * Is Development Mode
 */
function is_development() {
  return (
    document.getElementsByTagName("html")[0].getAttribute("environtment") ==
    "development"
  );
}

if (isnode()) {
  module.exports.is_development = is_development;
} else {
  global.is_development = is_development;
}

/**
 * Create uniqueid with prefix or suffix
 * @param prefix
 * @param suffix
 */
function uniqid(prefix: any, suffix: any) {
  var n = Math.floor(Math.random() * 11);
  var k = Math.floor(Math.random() * 1000000);
  var m = String.fromCharCode(n) + k;
  return (prefix ? prefix : "") + m + (suffix ? suffix : "");
}

if (isnode()) {
  module.exports.uniqid = uniqid;
} else {
  global.uniqid = uniqid;
}

if (typeof now == "undefined") {
  function now() {
    return Date.now();
  }
  if (isnode()) {
    module.exports.now = now;
  } else {
    global.now = now;
  }
}
