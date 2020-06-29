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

if (!isnode() && is_localhost()) {
  $.ajax({
    url: '/superuser/theme/clean?latest=s'
  });
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

if (isnode()) {
  module.exports = isJSON;
}

/**
 * Load script asynchronously
 * @param urls
 * @param callback
 */
function LoadScript(urls: string | string[], callback: null | Function) {
  var loaded = null;
  const load = async function (url: string) {
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
  var run = function () {
    if (loaded) {
      console.log(getFuncName() + `(${urls[0]}) running`);
      if (typeof callback == "function") {
        callback();
      }
    }
  };
  if (typeof urls == "string") {
    load(urls).then(run);
  } else if (Array.isArray(urls)) {
    load(urls[0]).then(function () {
      urls.shift();
      if (urls.length) {
        LoadScript(urls, callback);
      } else {
        run();
      }
    });
  }
}

/**
 * Load CSS async
 * @param href
 * @param callback
 */
function loadCSS(href: string | string[], callback: any) {
  const load = function (href: string) {
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
  };
  if (typeof href == "string") {
    load(href);
  } else if (Array.isArray(href)) {
    href.forEach(function (item) {
      load(item);
    });
  }
}
