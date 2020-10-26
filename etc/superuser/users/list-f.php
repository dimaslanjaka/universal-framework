<?php

if (isset($_REQUEST['list-user'])) {
  $list = pdo()->select('userdata')->row_array();

  e(array_filter_recursive($list, ['password']));
}
