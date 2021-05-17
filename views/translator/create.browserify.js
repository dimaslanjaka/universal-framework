$("textarea").autoHeight();
formsaver();
const country = require("./countries.js");
(function ($) {
  $(function () {
    function formatCountry(country) {
      if (!country.id) {
        return country.text;
      }
      var $country = $(
        '<span class="flag-icon flag-icon-' +
          country.alpha2.toLowerCase() +
          ' flag-icon-squared"></span>' +
          '<span class="flag-text">' +
          country.name +
          "</span>"
      );
      return $country;
    }

    //Assuming you have a select element with name country
    // e.g. <select name="name"></select>

    $("[name='country']").select2({
      placeholder: "Select a country",
      templateResult: formatCountry,
      data: isoCountries,
    });
  });
})(jQuery);
