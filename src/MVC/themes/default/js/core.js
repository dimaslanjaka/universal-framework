$('[data-toggle="collapsex"]').on("click", function () {
  console.log("collapsex");
  var target = $(this).data("target");
  console.log($(target).hasClass("show"));
  if ($(target).hasClass("show")) {
    $(target).addClass("show");
  } else {
    $(target).removeClass("show");
  }
});
