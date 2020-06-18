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
