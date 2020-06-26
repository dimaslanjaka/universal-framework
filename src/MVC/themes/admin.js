var divToolBox = document.createElement("div");
divToolBox.innerHTML = "Display admin toolbox in corner";
$('.fab-wrapper').hide();

swal({
  title: "Show toolbox",
  content: divToolBox,
  timer: 5000,
  buttons: {
    cancel: true,
    confirm: true, 
  },
}).then(
  /**
   *
   * @param {boolean} confirm
   */
  function (confirm) {
    if (confirm) {
      show_toolbox();
    }
  }
);

$.ajax({
  url: "/superuser/theme/clean?latest=" + new Date(),
  silent: true,
  indicator: false,
});
var admt = $("form#adminToolbox");
if (admt.length) {
  admt.submit(function (e) {
    e.preventDefault();
    var t = $(this);
    $.ajax({
      url: location.href,
      method: "POST",
      headers: {
        "Save-Metadata": "true",
      },
      data: t.serialize(),
    });
  });
}

/**
 *
 * @param {HTMLTextAreaElement} t
 */
function preview_thumb(t) {
  var val = t.value.trim();
  t.value = val;
  document.getElementById("thumb-preview").setAttribute("src", val);
}

/**
 * Show admin toolbox
 */
function show_toolbox() {
  $('.fab-wrapper').fadeIn();
  /*$("body")
    .append(`<div class="fixed-action-btn smooth-scroll" style="bottom: 5px; right: 5px;">
  <a href="#meta-editor" class="btn-floating btn-large red" data-toggle="modal" data-target="#MetaEditorModal">
    <i class="fas fa-cog"></i>
  </a>
</div>`);*/
}
