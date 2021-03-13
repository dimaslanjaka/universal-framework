<?php

include 'wp-loader.php';
$google->setAuthCode($_GET['code']);
$client = $google->client();
if (!isset($client->error) || !isset($client['error'])) {
  header('Refresh:3; url=/login', true, 303);
} else {
  $authUrl = $google->auth();
  header("Refresh:3; url=$authUrl", true, 303);
}
