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
    "select.select2", //select[id^="Roles-"],select[id^="Access-"]
    buildData
  );

  // add new form access
  jQuery("#addAccess").click(function (e) {
    e.preventDefault();
    uinitializeSelect2();
    var first = jQuery('div[id^="Roles-"]');
    if (first.length) {
      var clone = first[0].cloneNode(true);
      clone.setAttribute("id", uniqid("Roles-"));
      $(clone)
        .find("select, button")
        .each(function () {
          $(this).attr("id", uniqid("Roles-"));
          if ($(this).attr("value")) {
            $(this).val("");
          }
        });
      //console.log(clone);
      $("#access-wrapper")[0].appendChild(clone);
    }

    initializeSelect2();
  });
});

function initializeSelect2() {
  jQuery("select.select2").each(function (index, value) {
    //[id^="select-"],
    var t = jQuery(this);
    if (!t.attr("id")) {
      t.attr("id", uniqid("select-"));
    }
    if (t.data("select2")) {
      //console.error("select2 already initialized on " + t.attr("id"));
      return;
    }
    var val = jQuery(this).data("key");

    if (t.find("option").length == 1) {
      t.select2({
        data: dataSource.filter(onlyUnique),
        theme: "material",
        placeholder: "Select a route",
        allowClear: true,
      });
      if (val && val.length && !t.val()) {
        t.val(val).trigger("change");
      }
    } else {
      t.select2({
        theme: "material",
        placeholder: "Select a role",
        allowClear: true,
      });
    }

    //console.log(val);
  });
}

function uinitializeSelect2() {
  jQuery("select.select2").each(function (index, value) {
    //[id^="select-"],
    var t = jQuery(this);
    if (t.data("select2")) t.select2("destroy");
  });
}

function buildData(e) {
  uinitializeSelect2();
  var wrapselgrab = $("form#access-management").find("div[id^=Roles-]");
  if (wrapselgrab.length) {
    wrapselgrab.each(function (index, el) {
      var selgrab = $(this).find("select");
      if (selgrab.length) {
        for (let index = 1; index < selgrab.length; index++) {
          var element = selgrab[index];
          $(element).attr("name", `access[${selgrab[0].value}][]`);
          element.setAttribute("name", `access[${selgrab[0].value}][]`);
          //console.log(selgrab[index].getAttribute("name"));
        }
      }
    });
  }
  initializeSelect2();
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
