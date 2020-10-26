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
const requireJquery = require.config({
  context: "jquery",
  baseUrl: "/node_modules/jquery",
  paths: {
    jquery: "/node_modules/jquery/src",
    sizzle: "/node_modules/jquery/external/sizzle/dist/sizzle",
  },
});

requireJquery(["jquery/ajax", "jquery/ajax/xhr"], function ($) {
  $.ajax({
    url: "https://httpbin.org/anything",
    global: false,
  });
});
