/**
 * please replace with your own ngrok authToken
 */
const authToken = "1Szs4cJp7MoUlFPT3nyRjD5P05v_3BREWhqf8z2NdcNHMneUm";
const config = require("./config.json");
const ngrok = require("ngrok");
const fs = require("fs");

(async function () {
  const url = await ngrok.connect({
    /**
     * Change with your port php server
     */
    addr: config.app.port,
    authtoken: authToken,
  });
  console.log(`Node.js local server is publicly-accessible at ${url}`);
  config.ngrok.url = url;
  fs.writeFileSync("./config.json", JSON.stringify(config));
})();
