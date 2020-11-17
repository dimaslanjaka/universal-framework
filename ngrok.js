#!/bin/env node
const ngrok = require("ngrok");
const fs = require("fs");
const path = require("path");
const open = require("open");

(async function () {
  const url = await ngrok.connect({
    proto: "http", // http|tcp|tls, defaults to http
    addr: 80, // port or network address, defaults to 80
    authtoken: "1Szs4cJp7MoUlFPT3nyRjD5P05v_3BREWhqf8z2NdcNHMneUm", // your authtoken from ngrok.com
    region: "us", // one of ngrok regions (us, eu, au, ap, sa, jp, in), defaults to us
    onStatusChange: () => {}, // 'closed' - connection is lost, 'connected' - reconnected
    onLogEvent: () => {}, // returns stdout messages from ngrok process
  });
  fs.writeFileSync(path.join(__dirname, "ngrok.properties"), `server=${url}`);
  open(url);
})();
