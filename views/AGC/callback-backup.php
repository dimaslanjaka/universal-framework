<?php

include realpath(__DIR__ . '/core/loader/index.php');

if (isset($_REQUEST['verify'])) {
  $ver = [];
  if (isset($_SESSION['subscribed'])) {
    $ver['success'] = true;
  } else {
    $ver['fail'] = true;
  }
  exit(cj($ver));
}

// Define an object that will be used to make all API requests.
$client = getClient();
//$core = new agc();

$service = new Google_Service_YouTube($client);
$objOAuthService = new Google_Service_Oauth2($client);

//$core->dump($service);

if (isset($_GET['code'])) {
  if (strval($_SESSION['state']) !== strval($_GET['state'])) {
    die('The session state did not match.');
  }

  $client->authenticate($_GET['code']);
  $_SESSION['token'] = $client->getAccessToken();
  file_put_contents(CREDENTIALS_PATH, $core->cj($client->getAccessToken()));

  if (isset($redirect)) {
    header('Location: ' . $redirect);
  }
}

if (isset($_SESSION['token'])) {
  $client->setAccessToken($_SESSION['token']);
}

if (!$client->getAccessToken()) {
  $authUrl = $client->createAuthUrl();
  $core->dump(['error' => true, 'msg' => 'no access token, whaawhaaa', 'auth' => $authUrl]);
} else {
  $userData = $objOAuthService->userinfo->get();
  $_SESSION['user'] = $userData;
}

// Add a property to the resource.
function addPropertyToResource(&$ref, $property, $value)
{
  $keys = explode('.', $property);
  $is_array = false;
  foreach ($keys as $key) {
    // For properties that have array values, convert a name like
    // "snippet.tags[]" to snippet.tags, and set a flag to handle
    // the value as an array.
    if ('[]' == substr($key, -2)) {
      $key = substr($key, 0, -2);
      $is_array = true;
    }
    $ref = &$ref[$key];
  }

  // Set the property value. Make sure array values are handled properly.
  if ($is_array && $value) {
    $ref = $value;
    $ref = explode(',', $value);
  } elseif ($is_array) {
    $ref = [];
  } else {
    $ref = $value;
  }
}

// Build a resource based on a list of properties given as key-value pairs.
function createResource($properties)
{
  $resource = [];
  foreach ($properties as $prop => $value) {
    if ($value) {
      addPropertyToResource($resource, $prop, $value);
    }
  }

  return $resource;
}

function uploadMedia($client, $request, $filePath, $mimeType)
{
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
  $handle = fopen($filePath, 'rb');
  while (!$status && !feof($handle)) {
    $chunk = fread($handle, $chunkSizeBytes);
    $status = $media->nextChunk($chunk);
  }

  fclose($handle);

  return $status;
}

/***** END BOILERPLATE CODE *****/

// Sample php code for subscriptions.list

function sublistByID($service, $part, $params)
{
  $params = array_filter($params);
  $response = $service->subscriptions->listSubscriptions(
  $part,
  $params
  );

  echo json_encode($response);
}

function check_subs($service, $cid = null)
{
  if (null === $cid) {
    $cid = 'UCGNaoefvJRfd15fo-LQ0zvg';
  }
  $response = $service->subscriptions->listSubscriptions(
  'snippet,contentDetails',
  array_filter(['forChannelId' => $cid, 'mine' => true])
  );

  $result = count($response['items']);
  if ($result > 0) {
    $output['success'] = true;
    $output['data'] = $response['items'];
  } else {
    $output['error'] = true;
    $output['data'] = 'Belum Subscribe';
    $output['msg'] = 'Belum Subscribe';
  }

  return $output;
}

function sublistForCID($service, $part, $params)
{
  $params = array_filter($params);
  $response = $service->subscriptions->listSubscriptions(
  $part,
  $params
  );

  echo 'Sub List For ID => ' . json_encode($response) . '<hr/>';
}

function MySubs($service, $part, $params)
{
  $params = array_filter($params);
  $response = $service->subscriptions->listSubscriptions(
  $part,
  $params
  );

  echo 'My Subs => ' . json_encode($response) . '<hr/>';
}

//$cid = "UC6ckorHfWUtbtX9dWcM707Q";
//$cid = "UCGNaoefvJRfd15fo-LQ0zvg";//my

//MySubs($service, 'snippet,contentDetails', array('mine' => true));

//MySubs($service, 'subscriberSnippet', array('mySubscribers' => true));

//sublistForCID( $service, 'snippet,contentDetails', array('forChannelId' => $cid, 'mine' => true));
/*
try {
  sublistByID($service, 'snippet,contentDetails',  array('channelId' => $cid));
} catch(Exception $e){

}
*/

$check = check_subs($service);

if (isset($_REQUEST['subs'])) {
  $core->dump($check);
}

if (isset($check['success'])) {
  $_SESSION['subscribed'] = true;
  setcookie('subscribed', true, time() + 86400);
  header('Location: index.php');
} elseif (isset($check['error'])) {
  if (isset($_SESSION['subscribed'])) {
    unset($_SESSION['subscribed']);
  }
  if (!isset($_REQUEST['json'])) {
    include 'login.php';
  }
}
