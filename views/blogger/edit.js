$("#body").on("click keydown", function (e) {
  // auto height (fit content)
  this.style.height = "";
  this.style.height = this.scrollHeight + "px";
});
