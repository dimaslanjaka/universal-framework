function deleteRole(role) {
  console.log(getFuncName(), role);
}
AjaxForm();
/**
 * Initialize global data source
 */
var dataSource = [];
var clonedCol = null;

jQuery(document).ready(function () {
  load_module(["select2"], function () {
    loadCSS("/assets/css/select2.min.css", function () {
      $.ajax({
        url: "",
        method: "post",
        data: {
          getAccess: guid(),
        },
        success: function (selectOptions) {
          if (selectOptions && Array.isArray(selectOptions)) {
            selectOptions.forEach(function (data, index) {
              dataSource.push({ text: data, id: data });
            });
          }
          //console.log(dataSource);
          initializeSelect2();
        },
      });
    });
  });

  $('[id^="add-select-"]').click(function (e) {
    e.preventDefault();
  });

  jQuery(document).on(
    "change",
    'select[id^="Roles-"],select[id^="Access-"]',
    buildData
  );
});

function initializeSelect2() {
  jQuery('[id^="select-"],select.select2').each(function (index, value) {
    var t = jQuery(this);
    if (t.data("select2")) {
      console.error("select2 already initialized on " + t.attr("id"));
      return;
    }
    t.select2({
      data: dataSource.filter(onlyUnique),
      theme: "material",
      placeholder: "Select a route",
      allowClear: true,
    });
    var val = jQuery(this).data("key");
    if (val && val.length) {
      t.val(val).trigger("change");
    }
    //console.log(val);
  });
}

function buildData(e) {
  var wrapselgrab = $("form#access-management").find("div[id^=Roles-]");
  if (wrapselgrab.length) {
    wrapselgrab.each(function (index, el) {
      var selgrab = $(this).find("select");
      if (selgrab.length) {
        for (let index = 1; index < selgrab.length; index++) {
          var element = selgrab[index];
          element.setAttribute("name", `access[${selgrab[0].value}][]`);
          //console.log(selgrab[index].getAttribute("name"));
        }
      }
    });
  }
}

/**
 * Get unique array
 * @param {any} value
 * @param {any} index
 * @param {any[]} self
 * @example dataArray.filter(onlyUnique)
 */
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
