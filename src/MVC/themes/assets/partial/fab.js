(function () {
  if (typeof jQuery != "undefined") {
    if (typeof id_fab == "string" && typeof id_fab_checkbox == "string") {
      return fab_set_listener($(`#${id_fab}`));
    } else {
      return fab_set_listener(document.getElementById(id_fab));
    }
  }
})();

/**
 *
 * @param {HTMLElement|JQuery} fab_wrapper
 */
function fab_set_listener(fab_wrapper) {
  const is_jquery = fab_wrapper instanceof jQuery;
  if (fab_wrapper.length) {
    if (is_jquery) {
      fab_wrapper.on("click mouseover", function (e) {
        e.preventDefault();
        fab_click_handler(e, true);
      });
    } else {
      fab_wrapper = fab_wrapper[0];
      setEventListener(fab_wrapper, "click mouseover", function (e) {
        fab_click_handler(e, true);
      });
    }

    console.log(`fab found (${is_jquery ? "jQuery" : "VanillaJS"})`);
    //console.log(fab_wrapper);
  } else {
    console.error("fab not found", fab_wrapper);
    //console.log(id_fab);
  }
}

function fab_click_handler(e, activate) {
  //console.log($(`#${id_fab}`).position());
  /**
   * @type {HTMLInputElement}
   */
  var fab_checkbox = document.getElementById(id_fab_checkbox);
  if (fab_checkbox) {
    fab_checkbox.setAttribute("aria-checked", activate ? "true" : "false");
    fab_checkbox.checked = activate;
    calculateDistance(id_fab, function (distance) {
      if (distance > 300) {
        // if mouse leave more than 300 pixel, menu will deactivate
        fab_checkbox.setAttribute("aria-checked", "false");
        fab_checkbox.checked = false;
      }
    });

    // console.log("fab checkbox found", fab_checkbox);
  } else {
    //console.error("fab checkbox not found", id_fab_checkbox);
  }
}
