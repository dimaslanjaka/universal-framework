<?php

$user = user();
if (isset($_REQUEST['change'])) {
  if ('password' == $_REQUEST['change']) {
    if (isset($_REQUEST['value']) && isset($_REQUEST['id'])) {
      $user->update_password($_REQUEST['id'], $_REQUEST['value']);
    }
  } else if ('role' == $_REQUEST['change']) {
    if (isset($_REQUEST['value']) && isset($_REQUEST['id'])) {
      $user->update_role($_REQUEST['id'], $_REQUEST['value']);
    }
  }
}
if (isset($_REQUEST['delete']) && isset($_REQUEST['id'])) {
  $user->delete_user_by_id($_REQUEST['id']);
}
