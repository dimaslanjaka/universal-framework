<?php
require __DIR__ . '/func.php';
if (!isreq('q') && !parse_proxy(isreq('q'))) {
  no_index();
}
