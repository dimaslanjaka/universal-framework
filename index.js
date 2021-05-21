//var index = require("./dist/index");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const c = require("./src/MVC/themes/assets/js/app.js");

for (const i in this) {
  if ((typeof this[i]).toString() === "function" && this[i].toString().indexOf("native") === -1) {
    console.log(this[i].name);
  } else {
    console.log(typeof this[i]);
  }
}
