smartform();
$('#editor').on('change', function(e) {
  e.preventDefault();
  jviewer($(this).val());
});

jviewer($('#editor').val());

$('textarea').autoHeight();

function jviewer(input) {
  var viewer = $('#json-viewer');
  if (is_json(input)) {
    var input = eval('(' + input + ')');
    viewer.json_viewer(input);
  } else {
    viewer.html(`<span class='badge badge-danger'>Invalid JSON</span>`);
  }
}