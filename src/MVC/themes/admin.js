var divToolBox = document.createElement('div');
divToolBox.innerHTML = 'Display admin toolbox in corner';
swal({
  title: 'Show toolbox',
  content: divToolBox,
  timer: 5000,
  buttons: {
    cancel: true,
    confirm: true,
  }
}).then(function(confirm) {
  if (confirm) {
    show_toolbox();
  }
});

/**
 *
 * @param {HTMLTextAreaElement} t
 */
function preview_thumb(t) {
  var val = t.value.trim();
  t.value = val;
  document.getElementById('thumb-preview').setAttribute('src', val);
}

/**
 * Show admin toolbox
 */
function show_toolbox() {
  $('body').append(`<div class="fixed-action-btn smooth-scroll" style="bottom: 5px; right: 5px;">
  <a href="#meta-editor" class="btn-floating btn-large red" data-toggle="modal" data-target="#MetaEditorModal">
    <i class="fas fa-cog"></i>
  </a>
</div>`);
  $.ajax({
    url: '/superuser/theme/clean?latest=' + new Date(),
    silent: true,
    indicator: false
  });
}