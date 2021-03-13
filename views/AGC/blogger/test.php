<?php
if (!isAdmin()) return;

$google = blogger_client();
$service = new Google_Service_Oauth2($google->client);
$user = $service->userinfo->get();
$blogger = new Google_Service_Blogger($google->client);
$validate = validateToken($google);
$bloggerId = validateBloggerId(function () {
?>
  <script>
    location.href = '/AGC/blogger/index';
  </script>
<?php
});

printr([$validate, $bloggerId]);
