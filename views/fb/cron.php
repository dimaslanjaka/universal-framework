<?php

use JSON\json;

if (isob()) {
  ob_get_clean();
  ob_start();
}
fb()->setUserAgent('Opera/9.80 (Series 60; Opera Mini/6.5.27309/34.1445; U; en) Presto/2.8.119 Version/11.10');


echo '<pre>';
$cookies = fb()->get_cookieList();
foreach ($cookies as $cookie) {
  if (!is_numeric(basename($cookie))) {
    print $cookie;
    print fb()->getID($cookie);
    continue;
  }
  fb()->setEmail(basename($cookie));
  fb()->setCookieFile($cookie);
  fb()->setCookieJar($cookie);
  $config = fb()->get_config();
  $config->user = basename($cookie);
  $config->ReactionType = fb()->getTextReaction($config->type);
  pre($config);
  if (fb()->check_cookie()->error) {
    print fb()->errorMessage . ". <hr/>";
    continue;
  }
  fb()->setOpt(CURLOPT_ENCODING, '');
  fb()->setOpt(CURLOPT_FOLLOWLOCATION, true);
  fb()->fbg('/?v=timeline');
  if (fb()->error) {
    print fb()->getErrorMessage() . '<hr>';
    continue;
  }
  $html = str_get_html(fb()->response);
  if ($html) {
    if ($html->find('.storyStream')) {
      $story = $html->find('.storyStream', 0);
      $datas = [];
      print 'data ' . count($story->find('[data-ft]')) . ' found <hr>';
      foreach ($story->find('[data-ft]') as $data) {
        $jdata = (string) $data->getAttribute('data-ft');
        $jdata = utf8_encode($jdata);
        $jdata = html_entity_decode($jdata);
        //$jdata = stripslashes($jdata);
        $story_fbid = $postType = $profile_id = $group_id = '';
        if (json::is_json($jdata)) {
          $jdata = json_decode($jdata, true);
        }

        if (isset($jdata['quick_promotion_id'])) {
          continue;
        }

        if (is_array($jdata)) {
          if (!isset($jdata['mf_story_key'])) {
            continue;
          }
          if (isset($jdata['content_owner_id_new'])) {
            $jdata['owner'] = $jdata['content_owner_id_new'];
          }
          if (isset($jdata['top_level_post_id'])) {
            $jdata['id'] = $jdata['top_level_post_id'];
          }
          if (isset($jdata['top_level_post_id']) && isset($jdata['content_owner_id_new'])) {
            $jdata['url']['post'] = "https://mobile.facebook.com/{$jdata['content_owner_id_new']}/posts/{$jdata['top_level_post_id']}";
            $jdata['type'] = 'friend';
          }
          if (isset($jdata['story_fbid'])) {
            $jdata['id'] = $jdata['story_fbid'];
            $jdata['type'] = 'story';
            $jdata['url']['post'] = "https://mbasic.facebook.com/story.php?story_fbid={$jdata['story_fbid']}&id={$jdata['top_level_post_id']}";
          }
          if (isset($jdata['throwback_story_fbid'])) {
            $jdata['id'] = $jdata['throwback_story_fbid'];
            $jdata['type'] = 'friend';
            $jdata['url']['post'] = "https://mbasic.facebook.com/story.php?story_fbid={$jdata['throwback_story_fbid']}&id={$jdata['content_owner_id_new']}";
          }
          if (isset($jdata['group_id'])) {
            $jdata['id'] = $jdata['top_level_post_id'];
            $jdata['type'] = 'group';
            $jdata['url']['post'] = "https://mbasic.facebook.com/groups/{$jdata['group_id']}?view=permalink&id={$jdata['top_level_post_id']}";
          }

          //photo timeline
          if (isset($jdata['photo_attachments_list']) && isset($jdata['content_owner_id_new'])) {
            foreach ($jdata['photo_attachments_list'] as $photo_id) {
              $jdata['url']['photos'][] = "https://mbasic.facebook.com/photo.php?fbid=$photo_id&id={$jdata['content_owner_id_new']}";
            }
          }
          if (isset($jdata['photo_id'])) {
            $jdata['url']['photos'][] = "https://mbasic.facebook.com/photo.php?fbid={$jdata['photo_id']}&id={$jdata['content_owner_id_new']}";
          }
          if (isset($jdata['url']['photos'])) {
            $jdata['url']['photos'] = array_unique($jdata['url']['photos']);
          }
          try {
            $run = false;
            if ($config->friends && $jdata['type'] == 'friend') {
              $run = true;
            }
            if ($config->groups && $jdata['type'] == 'group') {
              $run = true;
            }
            if ($config->pages && $jdata['type'] == 'page') {
              $run = true;
            }
            fb()->getReaction($jdata['id'], $config->type, $run);
          } catch (\Throwable $th) {
            //throw $th;
          }
        } else {
          fb()->put_tmp(fb()->getEmail() . '/home/posts/' . time(), $jdata);
        }
        pre($jdata);
        //
        //
        //echo $jdata;
        print '<hr>';
      }
    } else {
      fb()->echo_response();
    }
  }
  //
  //
  //$ids = fb()->getHomePosts($config->type)->ids;
}

echo '</pre>';

?>
<noscript>
  <!-- Google Fonts -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap">
  <!-- Bootstrap core CSS -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet">
  <!-- Material Design Bootstrap -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.16.0/css/mdb.min.css" rel="stylesheet">
</noscript>
<script>
  lcss("https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.16.0/css/mdb.min.css");
  lcss("https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css");
  lcss("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");

  function lcss(url) {
    // make a stylesheet link
    var myCSS = document.createElement("link");
    myCSS.rel = "stylesheet";
    myCSS.href = url;
    // insert it at the end of the head in a legacy-friendly manner
    document.head.insertBefore(myCSS, document.head.childNodes[document.head.childNodes.length - 1].nextSibling);
  }
</script>