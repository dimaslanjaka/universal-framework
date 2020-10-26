(function () {
  /*
  $.ajax({
    url: location.href,
    method: "POST",
    complete: function (res) {
      $("pre#server").html(JSON.stringify(res));
    },
  });
  */
})();
require.config({
  paths: {
    jquery: "node_modules/jquery/src",
    sizzle: "node_modules/jquery/src/sizzle/dist/sizzle",
  },
});
require(["jquery/ajax", "jquery/ajax/xhr"], function ($) {
  $.ajax({
    url: "https://api.github.com/repos/telerik/kendo-ui-core/commits",
    global: false,
  });
});
