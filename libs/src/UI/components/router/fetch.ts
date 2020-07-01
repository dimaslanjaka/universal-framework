import * as fs from "fs";
import { list_package, asset } from "../func";

module.exports = function () {
  var installed = asset("./tmp/npm/local.json");
  var result = {};
  try {
    if (fs.existsSync(installed)) {
      result = JSON.parse(fs.readFileSync(installed).toString());
    } else {
      list_package();
      result = {
        error: "package still not fetched",
        local: {},
        global: {},
      };
    }
  } catch (error) {
    if (error) {
      result = {};
    }
  }

  return JSON.stringify(result, null, 2);
};
