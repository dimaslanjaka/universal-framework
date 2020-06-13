function empty(str: string | null | undefined | number | boolean) {
  var type = typeof str;
  if (type == 'string' || type == 'number') {
    str = str.toString().trim();
  }
  switch (str) {
    case "":
    case null:
    case false:
    case type == "undefined": //typeof (str) == "undefined"
      return true;
    default:
      return false;
  }
}