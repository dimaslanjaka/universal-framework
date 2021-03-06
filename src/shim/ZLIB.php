<?php

/**
 * ZLIB PHPJS
 * see {@link http://localhost/libs/js/zlib.js}
 * @requires pakojs
 */
class ZLIB
{
  public static function compress($str)
  {
    return base64_encode(gzdeflate($str, 6, ZLIB_ENCODING_DEFLATE));
  }

  public static function decompress($str)
  {
    $b64 = base64_decode($str);
    return $b64 ? gzinflate($b64) : null;
  }
}

/**
 * Check is base64 encoded string
 *
 * @param string $s
 * @return boolean
 */
function isB64(string $s)
{
  /**
   * first check if we're dealing with an actual valid base64 encoded string
   */
  if (($b = base64_decode($s, TRUE)) === FALSE) {
    return FALSE;
  }

  /**
   * Check if we recode the decoded string is same with original
   */
  if (($a = base64_encode($b)) && $a != $s) {
    return FALSE;
  }

  /**
   * now check whether the decoded data could be actual text
   */
  $e = mb_detect_encoding($b);
  if (in_array($e, array('UTF-8', 'ASCII'))) { // YMMV
    return TRUE;
  } else {
    return FALSE;
  }
}
