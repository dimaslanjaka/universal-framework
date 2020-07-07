function deleteRole(role) {
  console.log(getFuncName(), role);
}
AjaxForm();

jQuery(document).ready(function () {
  load_module(["select2"], function () {
    var dataSource = [];
    /**
     * @type {string[]}
     */
    var dataIntangible = selectOptions;
    dataIntangible.forEach(function (data, index) {
      dataSource.push({ text: data, id: data });
    });
    //console.log(dataSource);
    jQuery('[id^="select-"]').each(function (index, value) {
      jQuery(this).select2({
        data: dataSource,
        theme: "material",
        placeholder: "Select a route",
        allowClear: true,
        templateSelection: function (data) {
          if (data.id === "") {
            // adjust for custom placeholder values
            return "Custom styled placeholder text";
          }

          return data.text;
        },
      });
      var val = jQuery(this).data("key");
      console.log(val);
    });
  });
});
