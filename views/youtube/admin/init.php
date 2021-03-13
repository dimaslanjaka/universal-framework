<?php

$islogin = current_user_can('youtube_admin') && is_user_logged_in();
if (!$islogin) {
  exit($core->header_redirect('/login'));
}
