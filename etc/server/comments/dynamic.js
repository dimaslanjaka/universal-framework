$.ajax({
  url: "list",
  method: "POST",
  success: function (res, stats) {
    console.log(res);
  },
});

AjaxForm();

$(".comment-container").click(function () {
  var email = $('#comment_submission [name="email"]');
  var avatar = `https://www.gravatar.com/avatar/${md5(
    email.val().toString().trim()
  )}`;

  var gravatar_submission = $("#comment_submission img.avatar");
  if (gravatar_submission.length) {
    gravatar_submission.attr("src", avatar);
  }

  $(this).addClass("toggled");

  $(document).click(function () {
    $(".comment-container").removeClass("toggled");
  });

  $(".comment-container").click(function (e) {
    e.stopPropagation();
  });

  $(this).find("textarea").focus();
});
