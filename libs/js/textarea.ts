if (!(typeof module !== "undefined" && module.exports)) {
  /**
   * @see https://mdbootstrap.com/support/general/text-area-auto-grow/
   */
  jQuery.fn.autoHeight = function () {
    function autoHeight_(element: HTMLElement) {
      return jQuery(element)
        .css({ height: "auto", "overflow-y": "hidden" })
        .height(element.scrollHeight);
    }
    return this.each(function () {
      autoHeight_(this).on("input", function () {
        autoHeight_(this);
      });
    });
  };
}
