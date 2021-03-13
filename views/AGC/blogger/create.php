<?php

define('codemirror', true);
define('summernote', true);
define('toastr', true);

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

if (!is_user_logged_in()) {
  return wp_redirect2('/AGC/blogger');
}
if (isreq('save', 'post') && isreq('title', 'post') && isreq('body', 'post') && isreq('label', 'post')) {
  $mypost = new Google_Service_Blogger_Post();
  $mypost->setTitle(isreq('title', 'post'));
  $mypost->setContent(isreq('body', 'post'));
  $labels = explode(',', isreq('label', 'post'));
  $labels = array_map('trim', $labels);
  $mypost->setLabels($labels);
  try {
    $blogger->posts->insert(getBlogId(), $mypost);
    jscfg('update', true, true);
    jscfg('refreshURL', '/AGC/blogger/list', true);
  ?>
    <style>
      body {
        pointer-events: none;
      }
    </style>
<?php
    if (isreq('hash', 'post')) {
      getLog(isreq('hash', 'post'), function ($json) {
        $current_user = wp_get_current_user();
        foreach ($json as $item) {
          if (isset($item['content']->{$item['matched']['key']})) {
            $fileOrigin = createAGCFile($item['content']->{$item['matched']['key']}->origins);
            $item['content']->{$item['matched']['key']}->sent = true;
            _file_($item['entry'], $item['content'], true);
            _file_(ROOT . '/views/AGC/log.txt', $fileOrigin . "\n", true, true);
            _file_(ROOT . '/assets/config/user/blogger/' . $current_user->user_email . '/' . $fileOrigin, $_REQUEST, true);
            break;
            return;
          }
        }
      });
    }
  } catch (Exception $e) {
    jscfg('update', false, true);
    precom(getBlogId(), json_decode($e->getMessage()));
  }
}

$idform = uniqid('_');
$template = file_get_contents(__DIR__ . '/editor.html');
$label = array_merge(explode(',', isreq('category', 'post')), explode(',', isreq('tag', 'post')), (array) isreq('sl', 'post'), (array) isreq('tl', 'post'), (array) isreq('label', 'post'));
$label = array_map('trim', $label);
$label = array_unique(array_filter($label));
$label = implode(', ', $label);
$config = [
  '%TITLE%' => isreq('title', 'post'),
  '%CONTENT%' => isreq('body', 'post'),
  '%LABEL%' => $label,
  '%ACTIONFORM%' => '/' . router::i()->request,
  '%IDFORM%' => $idform,
  '%IDBLOG%' => getBlogId(),
  '%IDPOST%' => 'new',
  '%FORM_FIELD%' => ''
];
$template = str_ireplace(array_keys($config), array_values($config), $template);
echo $template;
if (isreq('hash', 'post')) {
  jscfg('AGC_HASH', isreq('hash'), true);
}
$script[] = __DIR__ . '/js/edit.js';
stylesheet(__DIR__ . '/css/edit.css');

reload_session();
