<?php
define("CID", '439429450847-2r1oa7oj8r0hghopmaasi1brdbc3f2vj.apps.googleusercontent.com', true);
define("CS", 'mk0QC76LGxW5G7JNe-oQUXW2', true);
/**
 * Library Requirements
 *
 * 1. Install composer (https://getcomposer.org)
 * 2. On the command line, change to this directory (api-samples/php)
 * 3. Require the google/apiclient library
 *    $ composer require google/apiclient:~2.0
 */

require_once __DIR__ . '/vendor/autoload.php';
session_start();

/*
 * Set $DEVELOPER_KEY to the "API key" value from the "Access" tab of the
 * Google Developers Console: https://console.developers.google.com/
 * Please ensure that you have enabled the YouTube Data API for your project.
 */
define('CREDENTIALS_PATH', 'auth.json');

function getClient() {
  $client = new Google_Client();
  $client->setApplicationName('API Samples');
  $client->setScopes('https://www.googleapis.com/auth/youtube.force-ssl');
  // Set to name/location of your client_secrets.json file.
  $client->setAuthConfig('auth.json');
  $client->setAccessType('offline');
  $redirect = filter_var('http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'], FILTER_SANITIZE_URL);
  $client->setRedirectUri($redirect);
  
  // Refresh the token if it's expired.
  if ($client->getAccessToken()){
  if ($client->isAccessTokenExpired() && $client->getRefreshToken() !== null) {
    $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
    $_SESSION["new_token"] = $client->getAccessToken();
  }
  }
  return $client;
}

// Define an object that will be used to make all API requests.
$client = getClient();
$service = new Google_Service_YouTube($client);

if (isset($_GET['code'])) {
  if (strval($_SESSION['state']) !== strval($_GET['state'])) {
    die('The session state did not match.');
  }

  $client->authenticate($_GET['code']);
  $_SESSION['token'] = $client->getAccessToken();
  header('Location: ' . $redirect);
}

if (isset($_SESSION['token'])) {
  $client->setAccessToken($_SESSION['token']);
}

if (!$client->getAccessToken()) {
  print("no access token, whaawhaaa");
  exit;
}

// Add a property to the resource.
function addPropertyToResource(&$ref, $property, $value) {
    $keys = explode(".", $property);
    $is_array = false;
    foreach ($keys as $key) {
        // For properties that have array values, convert a name like
        // "snippet.tags[]" to snippet.tags, and set a flag to handle
        // the value as an array.
        if (substr($key, -2) == "[]") {
            $key = substr($key, 0, -2);
            $is_array = true;
        }
        $ref = &$ref[$key];
    }

    // Set the property value. Make sure array values are handled properly.
    if ($is_array && $value) {
        $ref = $value;
        $ref = explode(",", $value);
    } elseif ($is_array) {
        $ref = array();
    } else {
        $ref = $value;
    }
}

// Build a resource based on a list of properties given as key-value pairs.
function createResource($properties) {
    $resource = array();
    foreach ($properties as $prop => $value) {
        if ($value) {
            addPropertyToResource($resource, $prop, $value);
        }
    }
    return $resource;
}

function uploadMedia($client, $request, $filePath, $mimeType) {
    // Specify the size of each chunk of data, in bytes. Set a higher value for
    // reliable connection as fewer chunks lead to faster uploads. Set a lower
    // value for better recovery on less reliable connections.
    $chunkSizeBytes = 1 * 1024 * 1024;

    // Create a MediaFileUpload object for resumable uploads.
    // Parameters to MediaFileUpload are:
    // client, request, mimeType, data, resumable, chunksize.
    $media = new Google_Http_MediaFileUpload(
        $client,
        $request,
        $mimeType,
        null,
        true,
        $chunkSizeBytes
    );
    $media->setFileSize(filesize($filePath));


    // Read the media file and upload it chunk by chunk.
    $status = false;
    $handle = fopen($filePath, "rb");
    while (!$status && !feof($handle)) {
      $chunk = fread($handle, $chunkSizeBytes);
      $status = $media->nextChunk($chunk);
    }

    fclose($handle);
    return $status;
}

/***** END BOILERPLATE CODE *****/

// Sample php code for subscriptions.list

function subscriptionsListForChannelId($service, $part, $params) {
    $params = array_filter($params);
    $response = $service->subscriptions->listSubscriptions(
        $part,
        $params
    );

    print json_encode($response);
}

subscriptionsListForChannelId(
    $service,
    'snippet,contentDetails', 
    array(
      /*'forChannelId' => 'UC_x5XG1OV2P6uZZ5FSM9Ttw',*/
      'mine' => true
    )
);
?>
  