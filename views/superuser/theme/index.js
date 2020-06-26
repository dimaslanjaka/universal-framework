$(document).ready(function() {
  $('[onload]').each(function(i, el) {
    eval(el.getAttribute('onload'));
  });
  $(document).on('click', 'button[id="ajax"][src]', function(e) {
    e.preventDefault();
    $.ajax({
      url: $(this).attr('src'),
      method: 'POST',
      success: function(res) {
        console.log(res);
      }
    });
  });
});

/**
 * latest file
 * @param {HTMLElement} element
 */
function latest(element) {
  $.ajax({
    url: 'clean',
    method: 'POST',
    data: {
      latest: 'true'
    },
    success: function(res) {
      if (typeof res == 'object') {
        if (res.hasOwnProperty('result')) {
          element.innerHTML = res.result;
        }
      }
    }
  });
}