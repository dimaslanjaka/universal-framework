function autoHeight_(element: HTMLElement | JQuery<HTMLElement>) {
  if (
    element instanceof HTMLTextAreaElement ||
    element instanceof HTMLElement
  ) {
    if (typeof jQuery != "undefined") {
      return jQuery(element)
        .css({ height: "auto", "overflow-y": "hidden" })
        .height(element.scrollHeight);
    }
  }
}

/**
 * jQuery plugin only works on browser language
 */
if (!(typeof module !== "undefined" && module.exports)) {
  if (typeof jQuery != "undefined") {
    (function ($) {
      $.fn.hasAttr = function (name: string) {
        var attr = $(this).attr(name);
        return typeof attr !== typeof undefined && attr != null;
      };

      /**
       * @see https://mdbootstrap.com/support/general/text-area-auto-grow/
       */
      $.fn.autoHeight = function () {
        return this.each(function () {
          autoHeight_(this).on("input", function () {
            autoHeight_(this);
          });
        });
      };
    })(jQuery);
  }
}
