$("#body").on("click keydown", function (e) {
  // auto height (fit content)
  //this.style.height = "";
  this.style.height = this.scrollHeight + "px";
});
$("#body").autoHeight();
$("#body").on("focusout", previewRender);
$("#preview-tab").on("click", previewRender);

/**
 *
 * @param {JQuery.Event} e
 */
function previewRender(e) {
  e.preventDefault();
  var bodyx = $("#body");
  bodyx.trigger("click");
  /**
   * @type {HTMLIFrameElement}
   */
  var ifr = document.getElementById("FileFrame");
  var doc = ifr.contentWindow.document;
  doc.open();
  doc.write(bodyx.val());
  doc.close();

  setTimeout(() => {
    // auto resize iframe by content height
    ifr.style.height =
      document.getElementById("FileFrame").contentWindow.document
        .documentElement.scrollHeight + "px";
  }, 1000);
}
