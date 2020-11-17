(function () {
  smartform();
  var cjs = document.getElementById("cookiejs");
  cjs.textContent = Cookies.get("test");

  var setjs = document.getElementById("setcookiejs");
  setjs.textContent = "test from js";
  Cookies.set("test_js", "test from js", "10m");
  var getjs = document.getElementById("cookiephp");
  if (typeof jQuery != "undefined") {
    jAjax({
      url: `?get=test_js`,
      success: function (res) {
        getjs.textContent = res;
      },
    });
  } else {
    getjs.textContent = "Ajax require jQuery to be operated";
  }
  if (document.cookie.length !== 0) {
    var allc = document.getElementById("allcookies");
    setInterval(() => {
      var tobeprinted = Cookies.all();
      //console.log(tobeprinted);
      //tobeprinted.localStorageAvailable = localStorageAvailable();

      allc.textContent = JSON.stringify(tobeprinted, null, 4);
    }, 1000);
  }

  var setc = document.getElementById("set-cookie");
  /**
   * @type {HTMLInputElement}
   */
  var cname = document.getElementById("cookie-name");
  /**
   * @type {HTMLInputElement}
   */
  var cvalue = document.getElementById("cookie-value");

  setEventListener(setc, "click", function (el) {
    Cookies.set(cname.value, cvalue.value, "10m", null, location.pathname);
    console.log(Object.getPrototypeOf(el));
  });
})();
