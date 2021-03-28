//import * as bootstrap from "bootstrap";
//import $ from "jquery";

if (!isnode()) {
  $(document).ready(function (e) {
    // element with onload
    $("[onload]").each(function (i, el) {
      eval(el.getAttribute("onload"));
    });
    // button ajax
    $(document).on("click", 'button[id="ajax"][src]', function (e) {
      e.preventDefault();
      $.ajax({
        url: $(this).attr("src"),
        method: "POST",
        success: function (res) {
          console.log(res);
        },
      });
    });
    // apply on element has attribute data-trigger
    $(document).on("click", "[data-trigger]", function (e) {
      e.preventDefault();
      const t = $(this);
      switch (t.data("trigger")) {
        case "modal":
          var target = $(t.data("target"));
          console.log(`open modal ${t.data("target")}`);
          if (target.length) {
            (<any>target).modal("show");
          }
          break;
      }
    });

    //href hyperlink button
    $(document).on("click", "button[href].btn-link", function (e) {
      e.preventDefault();
      location.href = $(this).attr("href");
    });

    /**
     * open in new tab
     */
    $(document.body).on(
      "click",
      'a[id="newtab"],[newtab],[data-newtab]',
      function (e) {
        e.preventDefault();
        const t = $(this);
        if (t.attr("href")) {
          if (t.data("newtab")) {
            //data-newtab hide referrer
            window
              .open("http://href.li/?" + $(this).data("newtab"), "newtab")
              .focus();
          } else {
            openInNewTab(
              t.attr("href"),
              t.data("name") ? t.data("name") : "_blank"
            );
          }
        }
      }
    );

    $(document).on("click", "[data-dismiss]", function (e) {
      const dataDismiss = $(this).data("dismiss");
      const dataCallback = $(this).data("callback");
      if (dataDismiss == "badge") {
        e.preventDefault();
        var parent1 = $(this).parents(".badge");
        if (parent1.length) {
          parent1.remove();
          if (dataCallback) {
            ___call(dataCallback);
          }
        }
      }
    });

    const randbg = $(".rand-bg-color");
    if (randbg.length) {
      randbg.each(function () {
        $(this).css({
          background: "#" + randomHex(),
          color: "#ffffff",
        });
      });
    }
  });
}

function randomHex() {
  return Math.floor(Math.random() * 16777215).toString(16);
}

/**
 * open in new tab
 * @param url
 * @param name
 */
function openInNewTab(url: string, name: string) {
  if (typeof url != "undefined" && typeof name != "undefined") {
    var win = window.open(url, name);
    win.focus();
  }
}
