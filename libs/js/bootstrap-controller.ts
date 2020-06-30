if (!isnode()) {
  $(document).ready(function (e) {
    $(document).on("click", "[data-trigger]", function (e) {
      e.preventDefault();
      const t = $(this);
      switch (t.data("trigger")) {
        case "modal":
          $(t.data("target")).modal("show");
          break;
      }
    });
  });
} 
