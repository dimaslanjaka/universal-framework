$("#select2-distributor").select2({
  placeholder: "Select a distributor",
  width: null,
  ajax: {
    url: "/distributor/fetch?only-enabled",
    dataType: "json",
    data: function (params) {
      return {
        search: params.term,
      };
    },
    processResults: function (data, params) {
      var dataprocess = $.map(data, function (obj) {
        obj.text = obj.name;

        return obj;
      });

      return {
        results: dataprocess,
      };
    },
  },
  escapeMarkup: function (markup) {
    return markup;
  },
  templateSelection: function (data) {
    return data.text;
  },
  templateResult: function (data) {
    return `<div class="select2-result-repository clearfix">
    <small><b>${data.text}</b><br/><i>${data.address}</i></small>
    </div>`;
  },
});

$("#select2-consumer").select2({
  placeholder: "Select a consumer",
  width: null,
  ajax: {
    url: "/consumer/fetch?only-enabled",
    dataType: "json",
    data: function (params) {
      return {
        search: params.term,
      };
    },
    processResults: function (data, params) {
      var dataprocess = $.map(data, function (obj) {
        obj.text = obj.name;

        return obj;
      });

      return {
        results: dataprocess,
      };
    },
  },
  escapeMarkup: function (markup) {
    return markup;
  },
  templateSelection: function (data) {
    return data.text;
  },
  templateResult: function (data) {
    return `<div class="select2-result-repository clearfix">
    <small><b>${data.text}</b><br/><i>${data.address}</i></small>
    </div>`;
  },
});

$("#sender_changer").on("change", function () {
  var value = $(this).val();
  var boxDistributor = $("#distributor");
  var boxConsumer = $("#consumer");
  var fields = $("#fields");

  if (value == "consumer") {
    show_selector(boxConsumer);
    show_selector(fields);
    hide_selector(boxDistributor);
  } else if (value == "distributor") {
    hide_selector(boxConsumer);
    show_selector(fields);
    show_selector(boxDistributor);
  } else {
    hide_selector(fields);
    hide_selector(boxConsumer);
    hide_selector(boxDistributor);
  }
});

/**
 * Hide selector
 * @param {HTMLElement|JQuery<HTMLElement>} html
 */
function hide_selector(html) {
  html.find("select,textarea,input").prop("disabled", true);
  html.removeAttr("class");
  html.addClass("animate__animated animate__zoomOut");
  setTimeout(() => {
    html.addClass("hide");
  }, 550);
}

/**
 * Show selector
 * @param {HTMLElement|JQuery<HTMLElement>} html
 */
function show_selector(html) {
  html.removeAttr("class");
  html.addClass("animate__animated animate__zoomIn");
  html.find("select,textarea,input").prop("disabled", false);
}
