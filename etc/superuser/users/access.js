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

  //border controller on hover
  var $current_target;
  $(document).on("mouseover mouseout", '[id^="Roles-"] button', function (e) {
    e.preventDefault();
    var t = $(this);
    var target = e.target;
    var type = e.type;
    var id = e.target.getAttribute("id");
    var identifier = type + id;

    // for performance, just one event
    if (!id || $current_target == identifier) {
      return;
    }
    uinitializeSelect2();

    if ($current_target != identifier && id) {
      var target_border;
      if (/^group-remove-/s.test(id)) {
        target_border = $(this).parents('[id^="Roles-"]');
        if (type == "mouseover") {
          target_border.addClass("border border-danger");
        } else {
          target_border.removeClass("border-danger");
        }
      } else if (/^select-add-/s.test(id)) {
        target_border = $(this).parents('[id^="select-group-"]');
        if (type == "mouseover") {
          target_border.addClass("border border-success");
        } else {
          target_border.removeClass("border-success border");
        }
      } else if (/^select-remove-/s.test(id)) {
        target_border = $(this).parents('[id^="select-access-"]');
        if (type == "mouseover") {
          target_border.addClass("border border-danger");
        } else {
          target_border.removeClass("border-danger border");
        }
      }
      //console.log(id);
      // lock one event
      $current_target = identifier;
    }
    /*var parent = $(this).parents("div[id^='Roles-']");
    if (parent.length) {
      //parent.remove();
    }*/
    initializeSelect2();
  });

  //group access delete
  $(document).on("click", '[id^="group-remove-"]', function (e) {
    e.preventDefault();
    uinitializeSelect2();
    var parent = $(this).parents("div[id^='Roles-']");
    if (parent.length) {
      parent.remove();
    }
    initializeSelect2();
  });

  // add access router selector
  $(document).on("click", '[id^="select-add-"]', function (e) {
    e.preventDefault();
    uinitializeSelect2();
    var parent = $(this).parents("[id^='select-group-']");
    var selectWrapperFirst = parent.find("[id^='select-access-']");
    if (selectWrapperFirst.length) {
      var cloneWrapper = selectWrapperFirst[0].cloneNode(true);
      var cloneSelect = cloneWrapper.querySelector("select");
      cloneSelect.removeAttribute("data-key");
      cloneSelect.removeAttribute("name");
      cloneSelect.setAttribute("id", uniqid("Access-"));
      cloneSelect.selectedIndex = null;
      var cloneButton = cloneWrapper.querySelector("button");
      cloneButton.setAttribute("id", uniqid("select-remove-"));
      parent.prepend(cloneWrapper);
    }
    initializeSelect2();
  });

  // remove access router selector
  $(document).on("click", '[id^="select-remove-"]', function (e) {
    e.preventDefault();
    uinitializeSelect2();
    var parent = $(this).parents("[id^='select-access-']");
    if (parent.length) {
      parent.remove();
    }
    initializeSelect2();
  });

  //build postdata
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
        .not('[id^="select-remove-"]')
        .not('[id^="select-add-"]')
        .each(function () {
          var id = $(this).attr("id").toString().trim();
          if (id) {
            if (id.includes("Access")) {
              $(this).attr("id", uniqid("Access-"));
            } else {
              $(this).attr("id", uniqid("Roles-"));
            }
          }
          if ($(this).prop("tagName") == "SELECT") {
            $(this).prop("selectedIndex", 0).trigger("change");
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
