/**
 * get url parameter by name
 * @param name parameter name
 * @param url url target, null for current location.href
 */
function getParameterByName(name: string, url: string | null) {
  if (typeof URLSearchParams !== 'undefined') {
    if (!window.location.search) {
      url = window.location.href;
    }
    const urlParams = new URLSearchParams(url);
    return urlParams.get(name);
  }
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}