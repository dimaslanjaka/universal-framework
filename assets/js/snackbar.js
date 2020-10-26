var snackbarCSS = null;
/**
 * Snackbar initializer
 * @param {String} text
 */
function snackbar(text) {
  if (snackbarCSS === null) {
    var doc = document;
    snackbarCSS = doc.createElement("link");
    snackbarCSS.rel = "stylesheet";
    snackbarCSS.href = '/assets/css/snackbar.css';
    snackbarCSS.media = "all";
    snackbarCSS.addEventListener('load', function(load) {
      console.info('load snackbar css');
    });
    var refs = (doc.body || doc.getElementsByTagName("head")[0]).childNodes;
    ref = refs[refs.length - 1];
    ref.parentNode.insertBefore(snackbarCSS, (before ? ref : ref.nextSibling));
  }
  var el = document.createElement("div");
  el.className = "snackbar";
  var y = document.getElementById("snackbar-container");
  // /<div id="snackbar-container"></div>
  if (!y) {
    var container = document.createElement('div');
    container.id = 'snackbar-container';
    document.body.appendChild(container);
  }
  el.innerHTML = text;
  y.append(el);
  el.className = "snackbar show";
  setTimeout(function() {
    el.className = el.className.replace("snackbar show", "snackbar");
  }, 3000);
}