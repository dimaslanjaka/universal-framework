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
function is_json(str: string): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
