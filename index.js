//var index = require("./dist/index");
const c = require("./src/MVC/themes/assets/js/app.js");
for (var i in this) {
  if (
    (typeof this[i]).toString() == "function" &&
    this[i].toString().indexOf("native") == -1
  ) {
    console.log(this[i].name);
  }
}
