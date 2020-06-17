<?php
\Cookie\helper::mins('zlib', 'yes', 5);


if (isset($_REQUEST['str'])) {
  $result['str'] = $_REQUEST['str'];
  if (isset($_REQUEST['compress'])) {
    $result['compress'] = ZLIB::compress($_REQUEST['str']);
  }

  if (isset($_REQUEST['decompress'])) {
    $result['decompress'] = ZLIB::decompress($_REQUEST['str']);
  }

  e($result);
}
