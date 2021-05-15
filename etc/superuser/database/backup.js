// @see github.com/select2/select2-bootstrap-theme/issues/35

$.fn.select2.defaults.set("theme", "bootstrap");

$(".select2-single").select2({
  placeholder: "Select a State…",
  width: null,
});
