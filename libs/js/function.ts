/**
 * php equivalent http_build_query
 * @param obj
 */
function http_build_query(obj: Object) {
  if (typeof obj != "object") {
    throw "http_build_query need parameter of object instead of " + typeof obj;
  }
  var queryString = Object.keys(obj)
    .map(function (key) {
      return key + "=" + obj[key];
    })
    .join("&");
  return queryString;
}

/**
 * Check current framework running at localhost
 */
function is_localhost() {
  var is_local = location.host.match(/^localhost|^127|\.io$/s);
  return is_local;
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

/**
 * Force HTTPS
 */
function forceSSL() {
  if (location.protocol !== "https:" && !is_localhost()) {
    location.replace(
      `https:${location.href.substring(location.protocol.length)}`
    );
  }
}

/**
 * json decode fails return false
 * @param  obj
 */
function json_decode(obj: string) {
  try {
    return JSON.parse(obj);
  } catch (error) {
    return false;
  }
}

/**
 * check string is json
 * @param str
 */
function isJSON(str: string): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

/**
 * CodeMirror loader
 * @param id
 * @param mode
 * @param theme
 */
function loadCodemirror(
  element: HTMLTextAreaElement,
  mode: string | string[],
  theme: string
) {
  if (!(element instanceof HTMLTextAreaElement)) {
    console.error("element must be instanceof HTMLTextAreaElement");
    return null;
  }
  const scripts = ["/node_modules/codemirror/lib/codemirror.js"];
  if (mode) {
    if (typeof mode == "string") {
      scripts.push(`/node_modules/codemirror/mode/${mode}/${mode}.js`);
    } else if (Array.isArray(mode)) {
      mode.forEach(function (m) {
        scripts.push(`/node_modules/codemirror/mode/${m}/${m}.js`);
      });
    }
  }
  if (!theme) {
    var themes = [
      "3024-night",
      "abcdef",
      "ambiance",
      "base16-dark",
      "bespin",
      "blackboard",
      "cobalt",
      "colorforth",
      "dracula",
      "erlang-dark",
      "hopscotch",
      "icecoder",
      "isotope",
      "lesser-dark",
      "liquibyte",
      "material",
      "mbo",
      "mdn-like",
      "monokai",
    ];
    var theme = themes[Math.floor(Math.random() * themes.length)];
  }
  framework().async(function () {
    LoadScript(scripts, function () {
      loadCSS("/node_modules/codemirror/lib/codemirror.css", function () {
        const editor = CodeMirror.fromTextArea(element, {
          lineNumbers: true,
          mode: mode,
          /*
            smartIndent: true,
            lineWrapping: true,
            showCursorWhenSelecting: true,
            matchHighlight: true,*/
        });
        loadCSS(`/node_modules/codemirror/theme/${theme}.css`, function () {
          editor.setOption("theme", theme);
        });
      });
    });
  });
}

/**
 * Load script asynchronously
 * @param urls
 * @param callback
 */
function LoadScript(urls: string | string[], callback: null | Function) {
  var loaded = null;
  const load = function (url: string) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.onreadystatechange = function () {
      loaded = true;
    };
    script.onload = function () {
      loaded = true;
    };
    script.onerror = function () {
      throw `error while loading ${url}`;
    };
    script.onabort = function () {
      throw `error while loading ${url}`;
    };
    script.oncancel = function () {
      throw `error while loading ${url}`;
    };
    document.body.appendChild(script);
  };
  if (typeof urls == "string") {
    load(urls);
  } else if (Array.isArray(urls)) {
    urls.forEach(function (src) {
      load(src);
    });
  }
  if (loaded) {
    if (typeof callback == "function") {
      callback();
    }
  }
}

/**
 * Load CSS async
 * @param href
 * @param callback
 */
function loadCSS(href: string, callback: any) {
  const link = document.createElement("link");
  link.media = "print";
  link.rel = "stylesheet";
  link.href = href;
  link.onload = () => {
    link.media = "all";
    if (typeof callback == "function") {
      callback(link, href);
    }
  };
  document.head.appendChild(link);
}
