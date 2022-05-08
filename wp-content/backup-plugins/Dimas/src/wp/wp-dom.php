<?php

use simplehtmldom\simple_html_dom;

if (!defined('DEFAULT_TARGET_CHARSET')) define('DEFAULT_TARGET_CHARSET', 'UTF-8');
if (!defined('DEFAULT_BR_TEXT')) define('DEFAULT_BR_TEXT', "\r\n");
if (!defined('DEFAULT_SPAN_TEXT')) define('DEFAULT_SPAN_TEXT', ' ');
if (!defined('MAX_FILE_SIZE')) define('MAX_FILE_SIZE', 2621440);
if (!defined('HDOM_SMARTY_AS_TEXT')) define('HDOM_SMARTY_AS_TEXT', 1);
function str_get_html(
  $str,
  $lowercase = true,
  $forceTagsClosed = true,
  $target_charset = DEFAULT_TARGET_CHARSET,
  $stripRN = true,
  $defaultBRText = DEFAULT_BR_TEXT,
  $defaultSpanText = DEFAULT_SPAN_TEXT
) {
  $domx = new simple_html_dom();
  return $domx->str_get_html(
    $str,
    $lowercase,
    $forceTagsClosed,
    $target_charset,
    $stripRN,
    $defaultBRText,
    $defaultSpanText
  );
}
