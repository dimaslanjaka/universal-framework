<?php

putenv('GOOGLE_APPLICATION_CREDENTIALS=' . __DIR__ . '/../auth.json');

$client = new Google_Client();
$client->setScopes(['https://www.googleapis.com/auth/analytics']);
$client->useApplicationDefaultCredentials();
if ($client->isAccessTokenExpired()) {
  $client->refreshTokenWithAssertion();
}
$arrayInfo = $client->getAccessToken();
echo '<pre>';
print_r($accesstoken);
echo '</pre>';
$accesstoken = $arrayInfo['access_token'];
