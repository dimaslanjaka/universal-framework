var divToolBox = document.createElement("div");
divToolBox.innerHTML = "Display admin toolbox in corner";
var toolboxCookie = "ToolBox"; //`${location.href}`;
if (typeof md5 !== "undefined") toolboxCookie = md5(toolboxCookie);

if (typeof jQuery != "undefined" && typeof Cookies != "undefined") {
  $(".fab-wrapper").hide();

  //console.log(Cookies.has(toolboxCookie));
  //console.log(Cookies.get(toolboxCookie));
  //console.log(getParameterByName("reset-toolbox"));

  if (!Cookies.has(toolboxCookie)) {
    swal({
      title: "Show toolbox",
      content: divToolBox,
      timer: 5000,
      buttons: {
        cancel: true,
        confirm: true,
      },
    }).then(trigger_toolbox);
  } else if (getParameterByName("reset-toolbox")) {
    Cookies.del(toolboxCookie);
  } else {
    trigger_toolbox(Cookies.has(toolboxCookie));
  }

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
} else {
  var fabWrapper = document.querySelectorAll('*[id^="fab-wrapper-"]');
  if (fabWrapper.length) {
    fabWrapper.forEach(function (el) {
      el.remove();
    });
  }
}

/**
 * Trigger Toolbox
 * @param {boolean} confirm
 */
function trigger_toolbox(confirm) {
  if (confirm) {
    show_toolbox();
  }
  Cookies.set(toolboxCookie, new Date().toDateString(), "1d");
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
  $(".fab-wrapper").fadeIn();
  /*$("body")
    .append(`<div class="fixed-action-btn smooth-scroll" style="bottom: 5px; right: 5px;">
  <a href="#meta-editor" class="btn-floating btn-large red" data-toggle="modal" data-target="#MetaEditorModal">
    <i class="fas fa-cog"></i>
  </a>
</div>`);*/
}
