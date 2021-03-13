<?php

if (isset($_POST['save']) && isset($_POST['save'])) {
  $bodies = strip_slashes_recursive($_POST['body']);
  $_SESSION['body_translated'] = agcparser::getInstance()->parsingview($bodies, false, ['highlight' => true])->load_depencies()->combine()->__toString();
}
