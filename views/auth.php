<?php

header('Content-Type: application/json');
$result = $_SESSION;
$client = new Google_Client();
$client->setApplicationName('Client_Library_Examples');
$client->setDeveloperKey('AIzaSyDlna9xQsXvsCK5oUKAsYozuk5YHczAyS0');
$client->setClientId('865208954077-jn5a4sagton7amf5b0vecjfcon53v1l9.apps.googleusercontent.com');
$client->setClientSecret('y83OGaivOx1kD_ALvCKXML6L');
$scope = [
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/youtube.force-ssl',
];
$client->setScopes($scope);
$redirect_uri = 'http://' . $_SERVER['HTTP_HOST'] . '/auth';
$client->setRedirectUri($redirect_uri);
$client->setAccessType('offline');
$client->setApprovalPrompt('force');
if (isset($_REQUEST['code'])) {
  $token = $client->fetchAccessTokenWithAuthCode($_REQUEST['code']);

  if (!isset($token['error'])) {
    //Set the access token used for requests
    $client->setAccessToken($token['access_token']);
    foreach ($token as $key => $value) {
      $_SESSION[$key] = $value;
    }

    //Create Object of Google Service OAuth 2 class
    $google_service = new Google_Service_Oauth2($client);

    //Get user profile data from google
    $data = $google_service->userinfo->get();

    foreach ($data as $key => $value) {
      $_SESSION[$key] = $value;
    }
    $result = $_SESSION;
  } else {
    $result = $token;
  }
} elseif (isset($_SESSION['access_token'])) {
  $client->setAccessToken($_SESSION['access_token']);
} else {
  $result['auth'] = $client->createAuthUrl();
}
if (isset($result['var'])) {
  unset($result['var']);
}
echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
