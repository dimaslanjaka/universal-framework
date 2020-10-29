$(document).on("submit", "form", function (e) {
  e.preventDefault();
  jAjax({
    url: location.href,
    data: $(this).serialize(),
    method: "POST",
    success: function (res) {
      console.log(res);
      if (res.success) {
        toastr.success("Update Successful", "Success");
        location.href = "/product";
      } else {
        toastr.error("Update Failed", "Failed");
      }
    },
  });
});

$("#imageUpload").change(function () {
  readURL(this);
});

// TODO: transform image url to base64
$("[id^='urlImage']").on("input, change, keyup", function (e) {
  e.preventDefault();
  var imageUrl = $(this).val();
  if (imageUrl.length > 0 && isValidHttpUrl(imageUrl)) {
    url2base64(imageUrl, function (b64) {
      if (b64.startsWith("data:image/")) {
        preview(b64); // myBase64 is the base64 string
      }
    });
  }
});

function preview(imageb64) {
  $("#imagePreview").css("background-image", "url(" + imageb64 + ")");
  $("#imagePreview").hide();
  $("#imagePreview").fadeIn(650);
  $("#image2up").val(imageb64);
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      preview(e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

/**
 * Check if string is valid url
 * @param {string} url
 */
function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

/**
 * Transform image url to base64 image
 * @param {string} url
 * @param {function(string)} callback
 */
function url2base64(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
}
