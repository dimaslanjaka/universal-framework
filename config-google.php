<?php

$google = null;

function google($offline = true)
{
  global $google;
  if (!$google) {
    $google = new Google\client();
    $google->setApplicationName('Client_Library_Examples');
    $google->setDeveloperKey(CONFIG['google']['key']);
    $google->setClientId(CONFIG['google']['client']);
    $google->setClientSecret(CONFIG['google']['secret']);
    $google->set_offline($offline)
      ->set_scope([
        'https://www.googleapis.com/auth/youtube.readonly',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/youtube.force-ssl',
      ])
      ->setRedirectUri('http://' . $_SERVER['HTTP_HOST'] . '/google/callback');
  }
  return $google;
}
