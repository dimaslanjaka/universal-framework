/**
 * call_user_func
 * @param functionName function name
 */
function ___call(functionName: string, context: Window, args: any) {
  var args = Array.prototype.slice.call(arguments, 2);
  var namespaces = functionName.split(".");
  var func = namespaces.pop();
  if (typeof window[func] != "undefined") {
    window[func](arguments);
  }
}

/**
 * Is Node ?
 */
function isnode() {
  if (typeof module !== "undefined" && module.exports) {
    return true;
  }
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

/**
 * call_user_func
 * @param func function name
 */
function __call(func: string) {
  this[func].apply(this, Array.prototype.slice.call(arguments, 1));
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

/**
 * Get current function name
 */
function getFuncName() {
  return getFuncName.caller.name;
}

