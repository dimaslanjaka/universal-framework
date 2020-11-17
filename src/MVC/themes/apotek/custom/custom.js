/**
 * Google translate callback
 */
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
    },
    "google_translate_element"
  );
  setTimeout(() => {
    $(".goog-te-combo").addClass("form-control d-inline-block");
    $(".goog-te-combo").css("width", "200px");
    $(".goog-te-combo")
      .after(`<button onclick="MyReset()" class="btn btn-danger d-inline-block ml-3">
    Reset Translation
  </button>`);
  }, 2500);
}

/**
 * Reset Translator.
 */
function MyReset() {
  jQuery("#\\:1\\.container").contents().find("#\\:1\\.restore").click();
}

(function () {
  /* Google translate */
  var cookieTranslator = Cookies.has("googtrans");

  // reload if translator widget failed to render and cookie translator exists
  if (cookieTranslator) {
    setTimeout(() => {
      if (!$(".goog-te-combo").length) {
        location.reload();
      }
    }, 1500);
  }
  /* /Google translate */

  /* Bootstrap 4 Hacks */
  // fix collapser not closing
  $(document).on("click", "[data-toggle='collapse']", function (e) {
    /**if ($(e.target).is("a") && $(e.target).attr("class") != "dropdown-toggle") {
    $(this).collapse("hide");
  } */
    /**
     * @type {string}
     */
    var target;
    if ($(this).attr("href")) {
      target = $(this).attr("href").replace(/^\#/gm, "");
    } else if ($(this).attr("data-target")) {
      target = $(this).attr("data-target").replace(/^\#/gm, "");
    }
    if ($(`#${target}`)) {
    }
  });
})();
