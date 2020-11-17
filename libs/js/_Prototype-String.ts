String.prototype.parse_url = function () {
  var parser = document.createElement("a"),
    searchObject: Array<Object | any>,
    queries: string[],
    split: Array<Object | any>,
    i: number;
  // Let the browser do the work
  parser.href = this.toString();
  // Convert query string to object
  queries = parser.search.replace(/^\?/, "").split("&");
  for (i = 0; i < queries.length; i++) {
    split = queries[i].split("=");
    searchObject[split[0]] = split[1];
  }
  return {
    protocol: parser.protocol,
    host: parser.host,
    hostname: parser.hostname,
    port: parser.port,
    pathname: parser.pathname,
    search: parser.search,
    searchObject: searchObject,
    hash: parser.hash,
    protohost: parser.protocol + "//" + parser.host,
  };
};

/**
 * Load css
 */
String.prototype.CSS = function () {
  var e = document.createElement("link");
  e.rel = "stylesheet";

  e.href = this.toString();
  var n = document.getElementsByTagName("head")[0];
  window.addEventListener
    ? window.addEventListener(
        "load",
        function () {
          n.parentNode.insertBefore(e, n);
        },
        !1
      )
    : window.attachEvent
    ? window.attachEvent("onload", function () {
        n.parentNode.insertBefore(e, n);
      })
    : (window.onload = function () {
        n.parentNode.insertBefore(e, n);
      });
};

String.prototype.trim = function () {
  return this.replace(/^\s+|\s+$/gm, "");
};
String.prototype.hexE = function () {
  var hex: string, i: number;

  var result = "";
  for (i = 0; i < this.length; i++) {
    hex = this.charCodeAt(i).toString(16);
    result += ("000" + hex).slice(-4);
  }

  return result;
};

String.prototype.hexD = function () {
  var j: number;
  var hexes = this.match(/.{1,4}/g) || [];
  var back = "";
  for (j = 0; j < hexes.length; j++) {
    back += String.fromCharCode(parseInt(hexes[j], 16));
  }

  return back;
};

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.rot13 = function () {
  return this.replace(/[a-zA-Z]/g, function (c: any) {
    return String.fromCharCode(
      (c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26
    );
  });
};

String.prototype.truncate = function (
  n: number,
  useWordBoundary: boolean | null
) {
  if (this.length <= n) {
    return this;
  }
  const subString = this.substr(0, n - 1); // the original check
  return (
    (useWordBoundary
      ? subString.substr(0, subString.lastIndexOf(" "))
      : subString) + "&hellip;"
  );
};

String.prototype.isEmpty = function () {
  if (this != null || typeof this != "undefined") {
    return this.length === 0 || !this.trim();
  }
  return false;
};

interface String {
  /**
   * Matches a string an object that supports being matched against, and returns an array containing the results of that search.
   * @param matcher An object that supports being matched against.
   */
  match(matcher: {
    [Symbol.match](string: string): RegExpMatchArray | null;
  }): RegExpMatchArray | null;

  /**
   * Replaces text in a string, using an object that supports replacement within a string.
   * @param searchValue A object can search for and replace matches within a string.
   * @param replaceValue A string containing the text to replace for every successful match of searchValue in this string.
   */
  replace(
    searchValue: {
      [Symbol.replace](string: string, replaceValue: string): string;
    },
    replaceValue: string
  ): string;

  /**
   * Replaces text in a string, using an object that supports replacement within a string.
   * @param searchValue A object can search for and replace matches within a string.
   * @param replacer A function that returns the replacement text.
   */
  replace(
    searchValue: {
      [Symbol.replace](
        string: string,
        replacer: (substring: string, ...args: any[]) => string
      ): string;
    },
    replacer: (substring: string, ...args: any[]) => string
  ): string;

  /**
   * Finds the first substring match in a regular expression search.
   * @param searcher An object which supports searching within a string.
   */
  search(searcher: { [Symbol.search](string: string): number }): number;

  /**
   * Split a string into substrings using the specified separator and return them as an array.
   * @param splitter An object that can split a string.
   * @param limit A value used to limit the number of elements returned in the array.
   */
  split(
    splitter: { [Symbol.split](string: string, limit?: number): string[] },
    limit?: number
  ): string[];

  /**
   * Parse url into part object
   */
  parse_url(): {
    protocol: string;
    host: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    searchObject: {};
    hash: string;
    protohost: string;
  };
  /**
   * Call css from url/path
   */
  CSS(): void;
  /**
   * Hex encrypt
   */
  hexE(): string;
  /**
   * Hex Decrypt
   */
  hexD(): string;
  /**
   * Capitalize all first character string
   * @example [PHP] ucwords($string)
   */
  capitalize(): string;
  /**
   * PHP str_rot13 equivalent
   */
  rot13(): string;
  /**
   * Truncate string
   * @param n sequence number to cut the next sentence
   * @param useWordBoundary true ? subString.substr(0, subString.lastIndexOf(" "))
   * @see https://stackoverflow.com/questions/1199352/smart-way-to-truncate-long-strings
   */
  truncate: (n: number, useWordBoundary: boolean | null) => string;
  /**
   * Check if string empty or blank
   */
  isEmpty(): boolean;
}
