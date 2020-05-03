<?php

use Google\client;

$client = new client();
$client->setApplicationName('Client_Library_Examples');
$client->setDeveloperKey('AIzaSyDlna9xQsXvsCK5oUKAsYozuk5YHczAyS0');
$client->setClientId('865208954077-jn5a4sagton7amf5b0vecjfcon53v1l9.apps.googleusercontent.com');
$client->setClientSecret('y83OGaivOx1kD_ALvCKXML6L');
$client->set_offline(true)
  ->set_scope([
    'https://www.googleapis.com/auth/youtube.readonly',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/youtube.force-ssl',
  ])
  ->setRedirectUri('http://' . $_SERVER['HTTP_HOST'] . '/auth');
pre($client->get_token_folder());
?>

<section>
  <a href="<?= $client->createAuthUrl() ?>" class="btn btn-primary">Login</a>
</section>