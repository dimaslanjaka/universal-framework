window.onload = function () {
  if (typeof endpoint_cekmutasi == "string") {
    /**
     * @type {String}
     */
    var endp = endpoint_cekmutasi;
    if (endp.length > 20) {
      //console.log(endpoint_cekmutasi);
      $.get(endpoint_cekmutasi, function (data) {
        if (typeof data == "object" && typeof data.result != "undefined") {
          if (data.result) {
            //console.log(data);
            //console.log("ovo payment successfully");
            toastr.success(
              `Payment ${data.mutasi.provider} ${convertToRupiah(
                data.mutasi.jumlah
              )} complete successfully`,
              "Payment Successful"
            );
            if (typeof data.modify != "undefined") {
              if (data.modify) {
                location.href = $("#sdh-TF").attr("href");
              }
            }
          }
        }
      });
    }
  }
};
