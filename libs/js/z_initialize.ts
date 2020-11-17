if (typeof window != "undefined") {
  ip.storage = new STORAGE();
  dimas.setIp(ip.get());
  //console.log(`ip ${dimas.ip}`);
}
