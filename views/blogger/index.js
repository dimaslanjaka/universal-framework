$("#blog-set").on("change focusout", sendBlog);
$("#form-set").on("submit", sendBlog);

formsaver();

/**
 *
 * @param {JQuery.Event} e
 */
function sendBlog(e) {
  e.preventDefault();
  var url = $("#blog-set").val().trim();
  $.ajax({
    url: location.href,
    method: "post",
    data: {
      "set-blog": url,
    },
    proxy: false,
  });
}
