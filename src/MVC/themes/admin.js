/**
 *
 * @param {HTMLTextAreaElement} t
 */
function preview_thumb(t) {
  var val = t.value.trim();
  t.value = val;
  document.getElementById('thumb-preview').setAttribute('src', val);
}
