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
  setTimeout(function () {
    $.ajax({
      url: "/superuser/theme/clean?latest=s&force=true",
    });
  }, 5000);
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

if (isnode()) {
  module.exports = isJSON;
}

/**
 * Load script asynchronously
 * @param urls
 * @param callback
 */
function LoadScript(urls: string | string[], callback: null | Function) {
  var loaded = [];
  if (typeof urls == "string") {
    urls = [urls];
  }
  if (!urls) {
    console.error("LoadScript must be load an javascript url");
  }
  if (Array.isArray(urls)) {
    var lists = urls;
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = urls[0];
    console.info(`loading script(${script.src})`);
    script.onload = script.onreadystatechange = function () {
      if (
        !this.readyState ||
        this.readyState === "loaded" ||
        this.readyState === "complete"
      ) {
        loaded.push(true);
        lists.shift();
        console.log(`Script in queue ${lists.length}`);
        if (!lists.length) {
          callback();
        }

        script.onload = script.onreadystatechange = null;
      }
    };

    script.onerror = function () {
      loaded.push(false);
      console.error(`error while loading ${script.src}`);
    };
    script.onabort = function () {
      loaded.push(false);
      console.error(`error while loading ${script.src}`);
    };
    script.oncancel = function () {
      loaded.push(false);
      console.error(`error while loading ${script.src}`);
    };
    document.body.appendChild(script);
  }
}

/**
 * Load CSS async
 * @param href
 * @param callback
 */
function loadCSS(href: string | string[], callback: any) {
  if (typeof href == "string") {
    href = [href];
  }
  if (Array.isArray(href)) {
    var hrefs = href;
    const link = document.createElement("link");
    link.media = "print";
    link.rel = "stylesheet";
    link.href = hrefs[0];
    link.onload = function () {
      link.media = "all";
      hrefs.shift();
      if (!hrefs.length) {
        if (typeof callback == "function") {
          callback(link, href);
        }
      } else {
        loadCSS(hrefs, callback);
      }
    };
    document.head.appendChild(link);
  }
}
