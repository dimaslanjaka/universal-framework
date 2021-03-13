<?php

use Curl\Curl;

define('summernote', true);
define('toastr', true);
define('codemirror', true);

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

$blogId = isset($subrequest[3]) ? $subrequest[3] : false;
$postId = $idform = isset($subrequest[4]) ? $subrequest[4] : false;

if (!$blogId || !$postId) {
?>
  <script>
    location.replace('/AGC/blogger');
  </script>
<?php
  exit;
}

if (isreq('save', 'post') && isreq('title', 'post') && isreq('body', 'post') && isreq('label', 'post')) {
  $mypost = new Google_Service_Blogger_Post();
  $mypost->setTitle(isreq('title', 'post'));
  $mypost->setContent(isreq('body', 'post'));
  $labels = explode(',', isreq('label', 'post'));
  $labels = array_map('trim', $labels);
  $mypost->setLabels($labels);
  try {
    $blogger->posts->update($blogId, $postId, $mypost);
    jscfg('update', true, true);
    jscfg('refreshURL', '/' . router::i()->request, true);
  } catch (Exception $e) {
    jscfg('update', false, true);
  }
}

try {
  $post = $blogger->posts->get($blogId, $postId, ['fetchBody' => true, 'fetchImages' => true]);
  $template = file_get_contents(__DIR__ . '/editor.html');
  $labels = implode(', ', (array) $post->getLabels());
  $title = $post->getTitle();
  $config = [
    '%TITLE%' => $title,
    '%CONTENT%' => $post->getContent(),
    '%LABEL%' => $labels,
    '%ACTIONFORM%' => '/' . router::i()->request,
    '%IDFORM%' => $idform,
    '%IDBLOG%' => $blogId,
    '%IDPOST%' => $postId,
    '%FORM_FIELD%' => ''
  ];
  $template = str_ireplace(array_keys($config), array_values($config), $template);
  echo $template;
} catch (Google_Service_Exception $th) {
  precom(json_decode($th->getMessage()));
  echo '<a href="' . $google->auth_url() . '" class="btn btn-primary btn-block">Retry login</a> <hr class="hr-text" data-content="OR"/><a href="/AGC/blogger?reset_blogger_id=' . wp_unique_id() . '" class="btn btn-primary btn-block">Reset Blogger User ID</a>';
}

reload_session();
