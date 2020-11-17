const fs = require("fs");
const path = require("path");
const dirname = path.dirname;

function create(x) {
  if (!fs.existsSync(dirname(x))) fs.mkdirSync(dirname(x));
}
