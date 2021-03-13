<?php

require_once __DIR__ . '/vendor/autoload.php';

if (PHP_SESSION_NONE == session_status()) {
  session_start();
}

if (!defined('WP_HOST')){
  define('WP_HOST', $_SERVER['HTTP_HOST']);
}
if (!defined("AGC_DIR")){
  define("AGC_DIR", basename(__DIR__));
}
define('CREDENTIALS_PATH', 'tmp/' . determine_user() . '.json');
define('DEVKEY', 'AIzaSyBYr0oEXIBLNXg4otQXfFO5fnomPQsDx4I');
define('redirect_uri', 'http://'.WP_HOST.'/'.AGC_DIR.'/callback.php');
$_SESSION['CREDENTIALS_PATH'] = CREDENTIALS_PATH;

function getClient2()
{
  $client = new Google_Client();
  $client->setApplicationName('AGC_BLOGGER');
  $client->setDeveloperKey(DEVKEY);
  $client->addScope('https://www.googleapis.com/auth/youtube');
  /*
  $client->addScope( 'https://www.googleapis.com/auth/youtube.force-ssl' );
  $client->addScope( 'https://www.googleapis.com/auth/blogger' );
  $client->addScope( 'https://www.googleapis.com/auth/books' );
  $client->addScope( 'https://www.googleapis.com/auth/calendar' );
  $client->addScope( 'https://www.googleapis.com/auth/cloud-platform' );
  $client->addScope( 'https://www.googleapis.com/auth/analytics' );
  $client->addScope( 'https://www.googleapis.com/auth/analytics.edit' );
  $client->addScope( 'https://www.googleapis.com/auth/analytics.manage.users' );
  $client->addScope( 'https://www.googleapis.com/auth/webmasters' );
  $client->addScope( 'https://www.googleapis.com/auth/youtubepartner-channel-audit' );
  $client->addScope( 'https://www.googleapis.com/auth/youtubepartner' );
  $client->addScope( 'https://www.googleapis.com/auth/userinfo.email' );
  $client->addScope( 'https://www.googleapis.com/auth/userinfo.profile' );
  $client->addScope( 'https://www.googleapis.com/auth/plus.me' );
  */
  $client->setAuthConfig('auth.json');
  $client->setAccessType('offline');

  if (file_exists($credentialsPath)) {
    $accessToken = json_decode(file_get_contents($credentialsPath), true);
  } elseif (!isset($_GET['code'])) {
    $authUrl = $client->createAuthUrl();

    return header('Location: ' . $authUrl);
  } else {
    $authCode = trim($_GET['code']);
    $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);
    file_put_contents(CREDENTIALS_PATH, json_encode($accessToken));
  }

  try {
    $client->setAccessToken($accessToken);
  } catch (Exception $e) {
    $authUrl = $client->createAuthUrl();

    return header('Location: ' . $authUrl);
  }
  if ($client->isAccessTokenExpired()) {
    $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
    file_put_contents($credentialsPath, json_encode($client->getAccessToken()));
  }

  return $client;
}

function getClient()
{
  $client = new Google_Client();
  $client->setApplicationName('AGC Blogger');
  $client->setScopes('https://www.googleapis.com/auth/youtube');
  $client->setDeveloperKey(DEVKEY);
  $client->setAuthConfig('auth.json');
  $client->setAccessType('offline');
  $client->setApprovalPrompt('force');
  $client->setRedirectUri(redirect_uri);

  // Load previously authorized credentials from a file.
  $credentialsPath = expandHomeDirectory(CREDENTIALS_PATH);
  if (file_exists($credentialsPath)) {
    $accessToken = json_decode(file_get_contents($credentialsPath), true);
  } else {
    // Request authorization from the user.
    $authUrl = $client->createAuthUrl();

    try {
      $authCode = $_GET['code'];
      $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);
      file_put_contents($credentialsPath, json_encode($accessToken));
    } catch (Exception $e) {
      return header('Location: ' . $authUrl);
    }
  }

  try {
    $client->setAccessToken($accessToken);
  } catch (Exception $e) {
    echo json_encode($accessToken);
  }

  // Refresh the token if it's expired.
  if ($client->isAccessTokenExpired()) {
    try {
      $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
      file_put_contents($credentialsPath, json_encode($client->getAccessToken()));
    } catch (Exception $e) {
      echo $e->getMessage();
    }
  }

  return $client;
}

function getClient3()
{
  $client = new Google_Client();
  $client->setApplicationName('AGC_BLOGGER');
  $client->setDeveloperKey('AIzaSyBYr0oEXIBLNXg4otQXfFO5fnomPQsDx4I');
  $client->setAccessType('offline');
  $client->addScope('https://www.googleapis.com/auth/youtube');
  /*
  $client->addScope( 'https://www.googleapis.com/auth/youtube.force-ssl' );
  $client->addScope( 'https://www.googleapis.com/auth/blogger' );
  $client->addScope( 'https://www.googleapis.com/auth/books' );
  $client->addScope( 'https://www.googleapis.com/auth/calendar' );
  $client->addScope( 'https://www.googleapis.com/auth/cloud-platform' );
  $client->addScope( 'https://www.googleapis.com/auth/analytics' );
  $client->addScope( 'https://www.googleapis.com/auth/analytics.edit' );
  $client->addScope( 'https://www.googleapis.com/auth/analytics.manage.users' );
  $client->addScope( 'https://www.googleapis.com/auth/webmasters' );
  $client->addScope( 'https://www.googleapis.com/auth/youtubepartner-channel-audit' );
  $client->addScope( 'https://www.googleapis.com/auth/youtubepartner' );
  $client->addScope( 'https://www.googleapis.com/auth/plus.me' );
   */
  $client->addScope('https://www.googleapis.com/auth/userinfo.email');
  $client->addScope('https://www.googleapis.com/auth/userinfo.profile');

  $client->setAuthConfig('auth.json');
  $client->setAccessType('offline');

  if (file_exists($credentialsPath)) {
    $accessToken = json_decode(file_get_contents($credentialsPath), true);
  } elseif (!isset($_GET['code'])) {
    $authUrl = $client->createAuthUrl();

    return header('Location: ' . $authUrl);
  } else {
    $authCode = trim($_GET['code']);
    $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);
    file_put_contents(CREDENTIALS_PATH, json_encode($accessToken));
  }

  try {
    $client->setAccessToken($accessToken);
  } catch (Exception $e) {
    $authUrl = $client->createAuthUrl();

    return header('Location: ' . $authUrl);
  }
  if ($client->isAccessTokenExpired()) {
    $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
    file_put_contents($credentialsPath, json_encode($client->getAccessToken()));
  }

  return $client;
}