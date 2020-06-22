interface Window {
  [func: string]: any;
}
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
 * call_user_func
 * @param func function name
 */
function __call(func: string) {
  this[func].apply(this, Array.prototype.slice.call(arguments, 1));
}