/// <reference path="alert.d.ts" />

/**
 * Bootstrap Alert Generator
 * @example createAlert(
  "[title] Opps!",
  "[description] Something went wrong",
  "[details] Here is a bunch of text about some stuff that happened.",
  "[mode|bg-color] danger",
  true, false,
  { position: "fixed", bottom: "15px", right: "15px" });
 */
function createAlert(
  /**
   * Title alert
   */
  title: string,
  /**
   * Summary description
   */
  summary: string,
  /**
   * Another description
   */
  details: string,
  /**
   * basic class bootstrap or you can insert color name
   */
  severity: "success" | "error" | "warning" | "info" | "danger",
  /**
   * can be closed ?
   */
  dismissible: boolean,
  /**
   * auto closed ?
   */
  autoDismiss: boolean,
  /**
   * Fill `CSSProperties` object or insert CSS object string
   * @example {position: 'fixed', top: '5px', right: '5px'}
   * @example 'position:fixed;top:10px;left:10px;'
   */
  options: React.CSSProperties | string
) {
  if (severity == "error") {
    severity = "danger";
  }

  if (!$("style#alertcss")) {
    createStyle(
      `#pageMessages {
      position: fixed;
      bottom: 15px;
      right: 15px;
      width: 30%;
    }
    
    #pageMessages .alert {
      position: relative;
    }
    
    #pageMessages .alert .close {
      position: absolute;
      top: 5px;
      right: 5px;
      font-size: 1em;
    }
    
    #pageMessages .alert .fa {
      margin-right:.3em;
    }`,
      { id: "alertcss" }
    );
  }

  if (!$("#pageMessages").length) {
    var style: string = "";
    if (typeof options == "string") {
      style = options;
    } else if (typeof options == "object") {
      if (options.length) {
        for (const key in options) {
          if (options.hasOwnProperty(key)) {
            var value = options[key];
            if (value && value.length) {
              style += `${key}: ${value};`;
            }
          }
        }
      } else {
        style = "position: fixed;bottom: 15px;right: 15px;width: 30%;";
      }
    }
    $("body").append('<div id="pageMessages" style="' + style + '"></div>');
  }

  var iconMap = {
    info: "fa fa-info-circle",
    success: "fa fa-thumbs-up",
    warning: "fa fa-exclamation-triangle",
    danger: "fa ffa fa-exclamation-circle",
  };

  var iconAdded = false;

  var alertClasses = ["alert", "animated", "flipInX"];
  alertClasses.push("alert-" + severity.toLowerCase());

  if (dismissible) {
    alertClasses.push("alert-dismissible");
  }

  var msgIcon = $("<i />", {
    class: iconMap[severity], // you need to quote "class" since it's a reserved keyword
  });

  var msg = $("<div />", {
    class: alertClasses.join(" "), // you need to quote "class" since it's a reserved keyword
  });

  if (title) {
    var msgTitle = $("<h4 />", {
      html: title,
    }).appendTo(msg);

    if (!iconAdded) {
      msgTitle.prepend(msgIcon);
      iconAdded = true;
    }
  }

  if (summary) {
    var msgSummary = $("<strong />", {
      html: summary,
    }).appendTo(msg);

    if (!iconAdded) {
      msgSummary.prepend(msgIcon);
      iconAdded = true;
    }
  }

  if (details) {
    var msgDetails = $("<p />", {
      html: details,
    }).appendTo(msg);

    if (!iconAdded) {
      msgDetails.prepend(msgIcon);
      iconAdded = true;
    }
  }

  if (dismissible) {
    var msgClose = $("<span />", {
      class: "close", // you need to quote "class" since it's a reserved keyword
      "data-dismiss": "alert",
      html: "<i class='fa fa-times-circle'></i>",
    }).appendTo(msg);
  }

  $("#pageMessages").prepend(msg);

  if (autoDismiss) {
    setTimeout(function () {
      msg.addClass("flipOutX");
      setTimeout(function () {
        msg.remove();
      }, 1000);
    }, 5000);
  }
}

/**
 * Create style css dynamic
 * @example css = 'h1 { background: red; }'
 * @example arributes = {id: 'customStyle', media: 'all'}
 * @param css
 */
function createStyle(css: string, attributes: {} = null) {
  var head = document.head || document.getElementsByTagName("head")[0],
    style = document.createElement("style");

  head.appendChild(style);

  style.type = "text/css";
  style.setAttribute("type", "text/css");

  for (const key in attributes) {
    if (attributes.hasOwnProperty(key)) {
      style.setAttribute(key, attributes[key]);
    }
  }

  if (style.styleSheet) {
    // This is required for IE8 and below.
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}
