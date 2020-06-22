/**
 * Call function by string with arguments
 * * You would call it like so:
 * * executeFunctionByName("My.Namespace.functionName", window, arguments);
 * * Note, you can pass in whatever context you want, so this would do the same as above:
 * * executeFunctionByName("Namespace.functionName", My, arguments);
 * @param {String} functionName
 * @param {Window} context
 */
function call_user_func(functionName, context /*, args */) {
  var args = Array.prototype.slice.call(arguments, 2);
  var namespaces = functionName.split(".");
  var func = namespaces.pop();
  for (var i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }
  //console.log($[func]);
  if (context[func]) {
    return context[func].apply(context, args);
  } else if (window[func]) {
    return window[func](arguments);
  } else if (func != "") {
    try {
      // @ts-ignore
      var tmpFunc = new Function(func(arguments));
      tmpFunc();
    } catch (error) {
      return console.error({
        error: `function ${func} is not registered`,
        message: error,
      });
    }
  }
}
