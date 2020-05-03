<?php

namespace Netscape;

class parser
{
  public function getCookies($file)
  {
    if (realpath($file)) {
      return file_get_contents(realpath($file));
    }
  }

  /**
   * Extract any cookies found from the cookie file. This function expects to get
   * a string containing the contents of the cookie file which it will then
   * attempt to extract and return any cookies found within.
   *
   * @param string $string the contents of the cookie file
   *
   * @return array the array of cookies as extracted from the string
   */
  public function extractCookies($string)
  {
    $lines = explode(PHP_EOL, $string);

    foreach ($lines as $line) {
      $cookie = [];

      // detect httponly cookies and remove #HttpOnly prefix
      if ('#HttpOnly_' == substr($line, 0, 10)) {
        $line = substr($line, 10);
        $cookie['httponly'] = true;
      } else {
        $cookie['httponly'] = false;
      }

      // we only care for valid cookie def lines
      if (strlen($line) > 0 && '#' != $line[0] && 6 == substr_count($line, "\t")) {
        // get tokens in an array
        $tokens = explode("\t", $line);

        // trim the tokens
        $tokens = array_map('trim', $tokens);

        // Extract the data
    $cookie['domain'] = $tokens[0]; // The domain that created AND can read the variable.
    $cookie['flag'] = $tokens[1];   // A TRUE/FALSE value indicating if all machines within a given domain can access the variable.
    $cookie['path'] = $tokens[2];   // The path within the domain that the variable is valid for.
    $cookie['secure'] = $tokens[3]; // A TRUE/FALSE value indicating if a secure connection with the domain is needed to access the variable.

    $cookie['expiration-epoch'] = $tokens[4];  // The UNIX time that the variable will expire on.
    $cookie['name'] = urldecode($tokens[5]);   // The name of the variable.
    $cookie['value'] = urldecode($tokens[6]);  // The value of the variable.

    // Convert date to a readable format
        $cookie['expiration'] = date('Y-m-d h:i:s', $tokens[4]);

        // Record the cookie.
        $cookies[] = $cookie;
      }
    }

    return $cookies;
  }
}
