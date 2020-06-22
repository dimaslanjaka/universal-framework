(function () {
  const jquery_loaded = typeof jQuery;
  console.info({
    jQuery: "is loaded ? " + (jquery_loaded != "undefined" ? "true" : "false"),
  });
  if (typeof id_fab == "string" && typeof id_fab_checkbox == "string") {
    var fab_wrapper =
      jquery_loaded != "undefined"
        ? $(`#${id_fab}`)
        : document.getElementById(id_fab);
    if (fab_wrapper.length) {
      fab_wrapper = fab_wrapper[0];
      if (fab_wrapper instanceof HTMLElement) {
        if (fab_wrapper.attachEvent) {
          fab_wrapper.attachEvent("onclick", fab_click_handler);
        } else if (fab_wrapper.addEventListener) {
          fab_wrapper.addEventListener("click", fab_click_handler);
        } else {
          console.error("cannot attach event to FAB wrapper");
        }
      } else if (fab_wrapper instanceof jQuery) {
        fab_wrapper.on("click", fab_click_handler);
      }
      fab_wrapper.onclick = fab_click_handler;

      console.log(
        `fab found (${
          fab_wrapper instanceof HTMLElement ? "VanillaJS" : "jQuery"
        })`,
        fab_wrapper
      );
    } else {
      console.error("fab not found", fab_wrapper);
      console.log(id_fab);
    }
  }
})();

function fab_click_handler(e) {
  console.log(e);
  /**
   * @type {HTMLInputElement}
   */
  var fab_checkbox = document.getElementById(id_fab_checkbox);
  if (fab_checkbox) {
    fab_checkbox.setAttribute("aria-checked", "true");
    fab_checkbox.checked = true;

    console.log("fab checkbox found", fab_checkbox);
  } else {
    console.error("fab checkbox not found", id_fab_checkbox);
  }
}
