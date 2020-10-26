$(".comment-container").click(function () {
  $(this).addClass("toggled");

  $(document).click(function () {
    $(".comment-container").removeClass("toggled");
  });

  $(".comment-container").click(function (e) {
    e.stopPropagation();
  });

  $(this).find("textarea").focus();
});
