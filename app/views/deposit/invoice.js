var interv;
window.onload = function () {
  CekMutasi();
  interv = setInterval(CekMutasi, 5000);
};

function CekMutasi() {
  console.log("cek mutasi started");
  if (typeof endpoint_cekmutasi == "string") {
    /**
     * @type {String}
     */
    var endp = endpoint_cekmutasi;
    if (endp.length > 20) {
      console.log(endpoint_cekmutasi);
      $.get(endpoint_cekmutasi, function (data) {
        if (typeof data == "object" && typeof data.result != "undefined") {
          if (data.result) {
            console.log(data);
            console.log("ovo payment successfully");
            console.log(data.mutasi.status);
            if (data.mutasi.status == "READ") {
              console.log("prepare redirect");
              sredirect(data);
              clearInterval(interv);
            }
          }
        }
      });
    }
  }
}

function sredirect(data) {
  toastr.success(
    `Payment ${data.mutasi.provider} ${convertToRupiah(
      data.mutasi.jumlah
    )} complete successfully`,
    "Payment Successful"
  );
  setTimeout(function () {
    location.href = $("#sdh-TF").attr("href").toString().trim();
  }, 2000);
}
