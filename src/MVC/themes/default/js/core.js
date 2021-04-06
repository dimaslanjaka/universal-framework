setTimeout(() => {
  // @todo fix input, select, textarea
  $(".mdb-select").not(".select-wrapper").materialSelect();
  $("input,textarea").each(function (i, el) {
    if ($(el).attr("type") == "hidden") return;

    if ($(el).val().length) {
      //console.log([$(el).val(), $(el).attr("name"), $(el)]);
      var labels = $(el).closest("div").find("label");
      if (labels.length) {
        if (!labels.hasClass("active")) {
          labels.addClass("active");
        }
      }
    }
  });
  $('[data-toggle="modal"]').each(function (i, el) {
    if (!$(el).attr("data-backdrop")) {
      $(el).attr("data-backdrop", "true");
    }
  });
}, 2000);
