function render_tile(text) {
  return `
<div style="position: absolute; bottom: 10px; left:0px;color:white;word-wrap:break-word;max-width:100%" class="p-1 purple">
  <span class="h2 pr-2 pl-2">${text}</span>
</div>
`;
}

framework().js(
  "/node_modules/masonry-layout/dist/masonry.pkgd.min.js",
  function () {
    $(".grid-item[title]").each(function (i, el) {
      el.innerHTML = render_tile(el.title);
    });

    $(".grid").masonry({
      itemSelector: ".grid-item",
      columnWidth: ".grid-sizer",
      percentPosition: true,
    });

    // Modal with transition
    $(".grid-item").click(function (event) {
      event.preventDefault();
      if (!$(this).hasClass("item-opened")) {
        var elWidth = $(this).outerWidth() / 2;
        var elPosition = this.getBoundingClientRect();

        // Store position
        $(this).attr("data-coord-left", $(this).css("left"));
        $(this).attr("data-coord-top", $(this).css("top"));

        // Transition effect
        $(this)
          .css({
            top: elPosition.top,
            left: elPosition.left,
          })
          .delay(400)
          .css({
            top: "120px",
            left: "10%",
            zIndex: "99999",
            // marginLeft:	'-20%'
            // position: 'fixed'
          })
          .addClass("item-opened");

        $(".grid-alpha").fadeIn();

        // Scroll to the top
        $("html, body").animate(
          {
            scrollTop: $(".grid").offset().top,
          },
          650
        );
        $(".grid").css("overflow", "visible");
      } else {
        $(".grid").css("overflow", "hidden");
      }
    });

    $("[href]")
      .not("a")
      .on("click", function (e) {
        location.href = $(this).attr("href");
      });

    $(document).on("click", function (e) {
      if ($(".item-opened").length > 0) {
        if (
          !$(e.target).closest(".grid-item").length &&
          !$(e.target).hasClass("item-opened")
        ) {
          $(".grid-alpha").fadeOut(650);

          $(".item-opened").css({
            top: $(".item-opened").data("coord-top"),
            left: $(".item-opened").data("coord-left"),
            marginLeft: "",
          });

          $("html, body").animate(
            {
              scrollTop:
                $(".grid").offset().top +
                parseFloat($(".item-opened").data("coord-top")) -
                30,
            },
            650
          );

          setTimeout(function () {
            $(".grid-item").css("z-index", "").removeClass("item-opened");
          }, 350);
          $(".grid").css("overflow", "hidden");
        }
      }
    });
  }
);
