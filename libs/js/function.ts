/**
 * php equivalent http_build_query
 * @param obj
 */
function http_build_query(obj: Object) {
  if (typeof obj != 'object') {
    throw "http_build_query need parameter of object instead of " + typeof obj;
  }
  var queryString = Object.keys(obj).map(function (key) {
    return key + '=' + obj[key]
  }).join('&');
  return queryString;
}