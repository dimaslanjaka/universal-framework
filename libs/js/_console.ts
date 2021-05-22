/// <reference path="./aacaller.ts" />
/**
 * Console Controller
 */

interface Console {
  olog: {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
  };
}
var console_callback: any;

if (typeof console != "undefined") {
  if (typeof console.log != "undefined") {
    console.olog = console.log;
  } else {
    console.olog = function () {};
  }
}

if (typeof module == "undefined") {
  console.log = function () {
    const log = console.olog;
    var stack = new Error().stack;

    /**
     * Get Caller Location
     */
    var file = stack.split("\n")[2].split("/")[4].split("?")[0];

    /**
     * Get Caller Line
     */
    var line: string | number; //= stack.split("\n")[2].split(":")[5];
    var getline = stack.split("\n")[2].split(":");
    if (getline.exists(5)) {
      line = parseNumber(getline[5]);
      //log("number found in index 5", getline[5]);
    } else if (getline.exists(4)) {
      line = parseNumber(getline[4]);
      //log("number found in index 4", getline[4]);
    } else if (getline.exists(3)) {
      line = parseNumber(getline[3]);
      //log("number found in index 3", getline[3]);
    }

    /**
     * Get Caller Function Name
     */
    var caller: any;
    var caller_str = stack.split("\n")[2];
    const regex = /at\s(.*)\s\(/gm;
    caller = regex.exec(caller_str);
    if (caller != null && caller.length) {
      caller = caller[1];
    }

    /**
     * Create Prefix Log
     */
    var append: string = "";
    if (typeof file != "undefined") {
      append += `${file}/`;
    }
    if (caller != null && typeof caller != "undefined") {
      append += `${caller}/`;
    }
    if (typeof line != "undefined") {
      append += `${line}:`;
    }

    var input = [];
    if (arguments.length == 1) {
      input = arguments[0];
    } else {
      for (let index = 0; index < arguments.length; index++) {
        const arg = arguments[index];
        input.push(arg);
      }
    }

    var args: any[];
    if (Array.hasOwnProperty("from")) {
      args = Array.from(arguments); // ES5
    } else {
      args = Array.prototype.slice.call(arguments);
    }
    args.unshift(append);

    log.apply(console, args);

    if (typeof jQuery != "undefined") {
      if (!$("#debugConsole").length) {
        $("body").append('<div id="debugConsole" style="display:none"></div>');
      }
      if (typeof console_callback == "function") {
        console_callback(input);
      } else {
        $("#debugConsole").append("<p> <kbd>" + typeof input + "</kbd> " + input + "</p>");
      }
    }
  };
} else {
  /**
   * Consoler
   */
  [
    ["warn", "\x1b[35m"],
    ["error", "\x1b[31m"],
    ["log", "\x1b[2m"],
  ].forEach(function (pair) {
    var method = pair[0],
      reset = "\x1b[0m",
      color = "\x1b[36m" + pair[1];
    console[method] = console[method].bind(
      console,
      color,
      `${method.toUpperCase()} [${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}]`,
      reset
    );
  });

  console.error = (function () {
    var error = console.error;

    return function (exception: { stack: any }) {
      if (typeof exception.stack !== "undefined") {
        error.call(console, exception.stack);
      } else {
        error.apply(console, arguments);
      }
    };
  })();
}

/**
 * Get stacktrace
 */
function stacktrace() {
  function st2(f: Function) {
    return !f
      ? []
      : st2(f.caller).concat([f.toString().split("(")[0].substring(9) + "(" + f.arguments.join(",") + ")"]);
  }
  return st2(arguments.callee.caller);
}
