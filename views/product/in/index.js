(function () {
  $(".select2-product").select2({
    placeholder: "Select a product",
    width: null,
    ajax: {
      url: "/product/fetch",
      dataType: "json",
      data: function (params) {
        return {
          search: params.term,
        };
      },
      processResults: function (data, params) {
        //console.log(data);
        var dataprocess = $.map(data, function (obj) {
          obj.text = obj.product_name;
          obj.id = obj.product_id;

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
    templateResult: function (repo) {
      if (repo.loading) return repo.text;
      console.log(repo.loading);
      var markup =
        "<div class='select2-result-repository clearfix'>" +
        "<div class='select2-result-repository__avatar'><img src='" +
        repo.product_image +
        "' /></div>" +
        "<div class='select2-result-repository__meta'>" +
        "<div class='select2-result-repository__title'>" +
        repo.product_name +
        "</div>";

      if (repo.product_alias) {
        markup +=
          "<div class='select2-result-repository__description'>" +
          repo.product_alias +
          "</div>";
      }

      markup +=
        "<div class='select2-result-repository__statistics " +
        (repo.quantity == 0 ? "text-danger" : "") +
        "'>" +
        "<div class='select2-result-repository__forks'><i class='fa fa-box'></i> " +
        repo.quantity +
        "</div>" +
        "<div class='select2-result-repository__stargazers'><i class='fa fa-tag'></i> " +
        repo.brand_name +
        "</div>" +
        "<div class='select2-result-repository__watchers'><i class='fa fa-tags'></i> " +
        repo.categories_name +
        "</div>" +
        "</div>" +
        "</div></div>";

      return markup;
    },
  });

  $(".select2-producer").select2({
    placeholder: "Select a producer",
    width: null,
    ajax: {
      url: "/producer/fetch",
      dataType: "json",
      data: function (params) {
        return {
          search: params.term,
        };
      },
      processResults: function (data, params) {
        //console.log(data);
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
})();
