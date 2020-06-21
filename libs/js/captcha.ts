$(document).on("focus", "form[captcha]", function (e) {
  var captcha = $(this).find('[name="captcha"]');
  if (!captcha.length) {
    $(this).append(
      '<input type="hidden" name="captcha" id="' + guid() + '" />'
    );
    captcha = $(this).find('[name="captcha"]');
  }
  if (captcha.length) {
    captcha.val(storage().get("captcha").rot13());
  }
  var form = captcha.parents("form");
  var button = form.find('[type="submit"]');
  form.one("submit", function (e) {
    e.preventDefault();
    console.log("submit with captcha");
    button.prop("disabled", true);
    framework().captcha.callback = function () {
      button.prop("disabled", false);
    };
    framework().captcha.get(null);
    form.off("submit");
  });
  //captcha.parents('form').find('[type="submit"]').one('click', function());
});
