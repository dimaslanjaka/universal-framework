<?php
if (!user()->is_admin()) {
  safe_redirect('/');
}
if (isset($_REQUEST['change']) && 'max' == $_REQUEST['change']) {
  $res = addLimitMax($_REQUEST['user_id'], $_REQUEST['value']);
  e($res);
  exit;
}
