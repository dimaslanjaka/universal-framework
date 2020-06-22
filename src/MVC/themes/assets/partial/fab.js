(function () {
  if (typeof id_fab == "string" && typeof id_fab_checkbox == "string") {
    var fab_wrapper = document.getElementById(id_fab);
    if (fab_wrapper) {
      console.log(fab_wrapper);
      fab_wrapper.onclick = function () {
        /**
         * @type {HTMLInputElement}
         */
        var fab_checkbox = document.getElementById(id_fab_checkbox);
        if (fab_checkbox) {
          fab_checkbox.setAttribute("checked", "true");
          fab_checkbox.checked = true;

          console.log(fab_checkbox);
        } else {
          console.log(id_fab_checkbox);
        }
      };
    } else {
      console.log(id_fab);
    }
  }
})();
