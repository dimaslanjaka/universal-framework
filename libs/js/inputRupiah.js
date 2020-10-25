if (!(typeof module !== "undefined" && module.exports)) {
  /** Format Rupiah */
  var inputrp = $('[id="format-rupiah"]');
  if (inputrp.length) {
    inputrp.on("keyup keydown change", function (e) {
      var t = $(this);
      var v = t.val();
      var n = t.next(".form-text, #rupiah");
      if (framework().isNumber(v.toString())) {
        var V = framework().rp(v);
        t.css("border-color", "green");
        framework().enable_button(t, V);
      } else {
        var V = "Bukan nomor";
        t.css("border-color", "red");
        framework().disable_button(t, V);
      }
      if (n.length) {
        n.text(V);
      } else {
        $(
          '<p id="rupiah" class="form-text text-muted">' + V + "</p>"
        ).insertAfter(t);
      }
    });
  }
}
