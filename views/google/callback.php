<?php

useGoogle();

$client = google();
if (isset($_GET['code'])) {
  $client->authenticate($_GET['code']);
  $access_token = $client->getAccessToken();
  if (!$client->getAccessToken() && $access_token) {
    $client->setAccessToken($access_token);
  }

  if ($client->getAccessToken()) {
    $service = new \Google_Service_Oauth2($client);
    $user = (array) $service->userinfo->get();
    foreach ($user as $key => $value) {
      $_SESSION['google'][$key] = $value;
      if ('email' == $key) {
        $_SESSION['google']['file_token'] = \Filemanager\file::file($client->get_token_folder() . "/$value/token.json", $client->getAccessToken(), true);
        $_SESSION['google']['logged_in'] = true;
      }
    }
    header('Location: /google/user');
  }
}
