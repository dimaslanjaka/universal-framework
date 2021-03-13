<?php
if (!isset($_SERVER['HTTP_WEBHOOK']) && !isLocalhost()) {
  reCaptcha();
}
if (isreq('update-webhook')) {
  if (isURL(isreq('webhook-url'))) {
    update_user_meta(get_current_user_id(), 'wp-webhook-url', trim(isreq('webhook-url')));
  }
  if (isreq('webhook-pass')) {
    update_user_meta(get_current_user_id(), 'wp-webhook-pass', trim(isreq('webhook-pass')));
  }
}
