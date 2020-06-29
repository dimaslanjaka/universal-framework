interface Console {
  olog: {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
  };
}
declare var console_callback: any;

if (typeof module == "undefined" && typeof jQuery != "undefined") {
  if (typeof console != "undefined")
    if (typeof console.log != "undefined") {
      console.olog = console.log;
    } else {
      console.olog = function () {};
    }

  console.log = function (message: string) {
    console.olog(message);
    if (!$("#debugConsole").length) {
      $("body").append('<div id="debugConsole"></div>');
    }
    if (typeof console_callback == "function") {
      console_callback(message);
    } else {
      $("#debugConsole").append(
        "<p> <kbd>" + typeof message + "</kbd> " + message + "</p>"
      );
    }
  };
}
