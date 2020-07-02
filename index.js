//var index = require("./src/node/index");
const tsd = require("tsd").;
(async () => {
  const diagnostics = await tsd();

  console.log(diagnostics.length);
  //=> 2
})();
