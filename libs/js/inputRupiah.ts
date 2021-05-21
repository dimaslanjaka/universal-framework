if (!(typeof module !== "undefined" && module.exports)) {
  /** Format Rupiah */
  const inputrp = $('[id="format-rupiah"]');
  if (inputrp.length) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    inputrp.on("keyup keydown change", function (e) {
      const t = $(this);
      const v = t.val().toString();
      const n = t.next(".form-text, #rupiah");
      let V;
      if (framework().isNumber(v.toString())) {
        V = rp(parseNumber(v));
        t.css("border-color", "green");
        enable_button(t);
      } else {
        V = "Bukan nomor";
        t.css("border-color", "red");
        disable_button(t);
      }
      if (n.length) {
        n.text(V);
      } else {
        $('<p id="rupiah" class="form-text text-muted">' + V + "</p>").insertAfter(t);
      }
    });
  }
}

/**
 * Rupiah currency auto format
 */
function rp(angka: number, prefix: string | any = null) {
  if (!prefix) {
    prefix = "Rp. ";
  }
  // eslint-disable-next-line prefer-const
  let number_string = angka.toString().replace(/[^,\d]/g, ""),
    // eslint-disable-next-line prefer-const
    split = number_string.split(","),
    // eslint-disable-next-line prefer-const
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    // eslint-disable-next-line prefer-const
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);
  if (ribuan) {
    const separator = sisa ? "." : "";

    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
  return !prefix ? rupiah : prefix + " " + rupiah;
}
