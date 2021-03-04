/**
 * JavaScript Code Snippet
 * Convert Number to Rupiah & vice versa
 * https://gist.github.com/845309
 *
 * Copyright 2011-2012, Faisalman
 * Licensed under The MIT License
 * http://www.opensource.org/licenses/mit-license
 *
 * Usage example:
 * alert(convertToRupiah(10000000)); -> "Rp. 10.000.000"
 */
function convertToRupiah(angka) {
  var rupiah = "";
  var angkarev = angka.toString().split("").reverse().join("");
  for (var i = 0; i < angkarev.length; i++)
    if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
  return (
    "Rp. " +
    rupiah
      .split("", rupiah.length - 1)
      .reverse()
      .join("")
  );
}

/**
 * Usage example:
 * alert(convertToAngka("Rp 10.000.123")); -> 10000123
 */
function convertToAngka(rupiah) {
  return parseInt(rupiah.replace(/,.*|[^0-9]/g, ""), 10);
}

function hideLoading() {
  $("body").removeClass("show-spinner");
}

function showLoading() {
  $("body").addClass("show-spinner");
}

$(document).on("submit", "form#single", function (e) {
  //e.preventDefault();
  $(this).find(":input[type=submit]").prop("disabled", true);
});
