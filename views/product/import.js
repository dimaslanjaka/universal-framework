/**
 * @type {JQuery<HTMLElement>} importer
 */
var importer;
(function () {
  smartform();

  importer = $("#importUpdate");
  importer.on("click", function (e) {
    parsel($("#importer"));
  });
})();

var failIndicator = false;
/**
 * excel parser
 * @param {JQuery<HTMLElement>} elem
 */
function parsel(elem) {
  console.clear();
  importer.prop("disabled", false);
  failIndicator = false;

  const result = [];
  const faildata = [];
  const str = elem.val().trim();
  //const regex = /(.*)\t(.*)|(.*)\t(.*)\t(.*)/gm;
  const lines = str.split("\n");
  lines.forEach((element) => {
    var split = element.toString().split("\t");
    var populate = {};
    //console.log(split.length);
    if (split.length > 1) {
      populate.product_name = split[0];
      populate.product_alias = split[1];
      populate.brand_id = split[2];
      populate.categories_id = split[3];
      populate.product_type = split[4];
      populate.unit = split[5];
      populate.active = split[6];
      populate.status = split[7];
      result.push(populate);
    } else {
      importer.prop("disabled", true);
      failIndicator = true;
      faildata.push(element);
    }
  });

  console.log(result);

  if (!failIndicator) {
    swal({
      title: "Are you sure ?",
      text:
        "Once update, you'll not be able modify the datas without accessing the phpmyadmin",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willUpdate) => {
      if (willUpdate) {
        jAjax({
          url: "?save=true",
          method: "post",
          data: JSON.stringify(result),
          traditional: true,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function (res) {
            if (res.success) {
              swal("Database updated successfully", {
                icon: "success",
              });
            } else {
              swal({
                title: "Error while updating database",
                text: res.messages,
                icon: "error",
              });
            }
          },
        });
      } else {
        swal("Update database cancelled");
      }
    });
  } else {
    swal({
      title: "Database cannot be imported",
      text: `${faildata[0]} and ${faildata.length - 1} more`,
      icon: "error",
    }).then(function (t) {
      importer.prop("disabled", false);
    });
  }
}

/**
 * var split = element.split("\t");

    console.clear();
    console.log(split);
 */
