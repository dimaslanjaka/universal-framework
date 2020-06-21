var express = require("express");
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;

function mergejson() {
  const localPackageJson = require("../../package.json");
  const sharedPackageJson = require("./package.json");
  Object.assign(localPackageJson.dependencies, sharedPackageJson.dependencies);

  /*fs.writeFileSync(
    "../../package.json",
    JSON.stringify(localPackageJson, null, 2)
  );*/
}
