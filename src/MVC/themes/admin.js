var divToolBox = document.createElement("div");
divToolBox.innerHTML = "Display admin toolbox in corner";
var toolboxCookie = "ToolBox"; //`${location.href}`;
if (typeof md5 !== "undefined") toolboxCookie = md5(toolboxCookie);

if (typeof jQuery != "undefined" && typeof Cookies != "undefined") {
  var admt = $("form[id^='meta-admin-toolbox-']");
  if (admt.length) {
    admt.on("submit", function (e) {
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
