<?php
if (!isLocalhost()) {
  reCaptcha();
}
if (isreq('hash') && isreq('niche')) {
  sess('hash', isreq('hash'));
  $agc = new gtrans();
  $curl = $agc->cURL(false);
  $curl->post(WP_PROTOCOL . '://' . WP_HOST . '/AGC/list?niche=' . isreq('niche') . '&hash=' . isreq('hash'));
  $agc->curl_err($curl);
  $json = $curl->response;
  if ($json[0]->sent) {
    redirect_delay(WP_PROTOCOL . '://' . WP_HOST . '/AGC/user/dashboard');
    $core->dump(['error' => 'oh snap, this article was sent by other user']);
  }
}

$sl = isreq('source_lang');
$tl = isreq('to_lang');
$title = $_SESSION['title'] = strip_slashes_recursive(isreq('title'));
$body = $_SESSION['body'] = strip_slashes_recursive(isreq('body'));
