<?php

if (!defined('WP_HOST')) {
  define('WP_HOST', $_SERVER['HTTP_HOST']);
}
if (!defined('AGC_DIR')) {
  define('AGC_DIR', 'AGC');
}

define('CREDENTIALS_PATH', _file_($_SERVER['DOCUMENT_ROOT'] . '/tmp/' . md5(get_client_ip() . '~' . $_SERVER['HTTP_USER_AGENT']) . '.json'));
define('DEVKEY', 'AIzaSyBYr0oEXIBLNXg4otQXfFO5fnomPQsDx4I');
define('redirect_uri', 'http://' . WP_HOST . '/AGC/cb');
$_SESSION['CREDENTIALS_PATH'] = CREDENTIALS_PATH;

/**
 * Expands the home directory alias '~' to the full path.
 *
 * @param string $path the path to expand
 *
 * @return string the expanded path
 */
function expandHomeDirectory($path)
{
  $homeDirectory = getenv('HOME');
  if (empty($homeDirectory)) {
    $homeDirectory = getenv('HOMEDRIVE') . getenv('HOMEPATH');
  }

  return str_replace('~', realpath($homeDirectory), $path);
}

function get_client_ip()
{
  $ipaddress = '';
  if (isset($_SERVER['HTTP_CLIENT_IP'])) {
    $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
  } elseif (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
  } elseif (isset($_SERVER['HTTP_X_FORWARDED'])) {
    $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
  } elseif (isset($_SERVER['HTTP_FORWARDED_FOR'])) {
    $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
  } elseif (isset($_SERVER['HTTP_FORWARDED'])) {
    $ipaddress = $_SERVER['HTTP_FORWARDED'];
  } elseif (isset($_SERVER['REMOTE_ADDR'])) {
    $ipaddress = $_SERVER['REMOTE_ADDR'];
  } else {
    $ipaddress = 'UNKNOWN';
  }

  return $ipaddress;
}

function getClient()
{
  $client = new Google_Client();
  $client->setApplicationName('AGC Blogger');
  $client->setScopes('https://www.googleapis.com/auth/youtube');
  $client->addScope('https://www.googleapis.com/auth/youtube.force-ssl');
  $client->addScope('https://www.googleapis.com/auth/userinfo.email');
  $client->addScope('https://www.googleapis.com/auth/userinfo.profile');
  $client->setDeveloperKey(DEVKEY);
  $client->setClientId('439429450847-2r1oa7oj8r0hghopmaasi1brdbc3f2vj.apps.googleusercontent.com');
  $client->setClientSecret('mk0QC76LGxW5G7JNe-oQUXW2');
  $client->setAccessType('offline');
  $client->setApprovalPrompt('force');
  $client->setRedirectUri(redirect_uri);

  // Load previously authorized credentials from a file.
  $credentialsPath = expandHomeDirectory(CREDENTIALS_PATH);
  if (file_exists($credentialsPath)) {
    $accessToken = json_decode(file_get_contents($credentialsPath), true);
  } elseif (isset($_GET['code'])) {
    $authUrl = $client->createAuthUrl();

    try {
      $authCode = $_GET['code'];
      $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);
      file_put_contents($credentialsPath, json_encode($accessToken));
    } catch (Exception $e) {
      return header('Location: ' . $authUrl);
    }
  }

  if (isset($accessToken)) {
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
  }

  if (!isset($_SESSION['user'])) {
    $objOAuthService = new Google_Service_Oauth2($client);
    if ($client->getAccessToken()) {
      $_SESSION['user'] = $objOAuthService->userinfo->get();
    }
  }

  return $client;
}
