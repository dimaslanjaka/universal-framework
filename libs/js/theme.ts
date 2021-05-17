if (!isnode()) {
  if (typeof jQuery != "undefined") {
    var target = $(location).attr("hash");
    var offset: number = $(this).attr("data-offset")
      ? Number($(this).attr("data-offset"))
      : 0;
    if ($(target).length) {
      $("body,html").animate(
        {
          scrollTop: $(target).offset().top - offset,
        },
        700
      );
    }
  }
}
