<?php

$wpdb->suppress_errors = false;
$wpdb->show_errors = false;
if (is_user_logged_in()) {
  $_SESSION['allowed_shrink'] = 1;
}
$uid = (isset($_POST['user_id']) ? $_POST['user_id'] : (isset($_POST['user']) ? $_POST['user'] : false));
$url = (isset($_POST['url']) && filter_var(urldecode($_POST['url']), FILTER_VALIDATE_URL) ? $_POST['url'] : false);
$re = (isset($_POST['g-recaptcha-response']) ? $_POST['g-recaptcha-response'] : (isset($_POST['key']) ? $_POST['key'] : false));
$can = isset($_SESSION['allowed_shrink']) ? $_SESSION['allowed_shrink'] : false;
if (!isset($_SESSION['allowed_shrink']) || isset($_SESSION['allowed_shrink']) && !$_SESSION['allowed_shrink']) {
  if (isset($_POST['g-recaptcha-response'])) {
    $v = wp_remote_get('https://www.google.com/recaptcha/api/siteverify?secret=6LdSg5gUAAAAAL7aiyHjXKArlkF0R7HAlA99oMYG&response=' . $re);
    if ($v) {
      $v = json_decode($v['body']);
      if (true === $v->success) {
        $_SESSION['allowed_shrink'] = true;
      }
    }
  } elseif (isset($_POST['key'])) {
    $exists = $wpdb->get_row($wpdb->prepare(
  "SELECT COUNT(*) FROM 'short_key' WHERE id = %s",
  $_POST['key']
  ));
  }
}

if (isset($_SESSION['allowed_shrink']) && $url && $uid) {
  $ks = grstr($uid, $url);

  if (is_string($ks) && ctype_alnum($ks)) {
    $in = $wpdb->insert('short_url', ['url' => $ks, 'location' => $url, 'userid' => $uid]);
    if ($in) {
      $lid = $wpdb->insert_id;
      updateShort($lid);
      $get = $wpdb->get_row("SELECT * FROM short_url WHERE id = '$lid'");

      if ($get) {
        $get->success = true;
        $core->dump($get);
      } else {
        $core->dump(['get error', wpdb_utility::i()->ej($wpdb)]);
      }
    } else {
      $core->dump(['insert error' => $in, wpdb_utility::i()->ej($wpdb)]);
    }
  } elseif (is_array($ks)) {
    if (isset($ks['result'])) {
      $core->dump($ks['result'][0]);
    } elseif (isset($ks['location'])) {
      updateShort($ks['id']);
      $core->dump($ks);
    }
  } elseif (is_object($ks)) {
    if (isset($ks->result)) {
      $core->dump($ks->result);
    } elseif (isset($ks->location)) {
      updateShort($ks->id);
      $core->dump($ks);
    }
  } else {
    $core->dump(['error' => 'short unavailable: ' + $ks]);
  }
}

if (isset($_POST['update']) && isset($_POST['UID'])) {
  if (isset($_POST['title'])) {
    $wpdb->update('short_url', ['site_title' => base64_encode($_POST['title'])], ['url' => trim($_POST['UID'])]);
  }
  if (isset($_POST['desc'])) {
    $wpdb->update('short_url', ['site_desc' => base64_encode($_POST['desc'])], ['url' => trim($_POST['UID'])]);
  }
  if (isset($_POST['img'])) {
    $wpdb->update('short_url', ['site_img' => trim($_POST['img'])], ['url' => trim($_POST['UID'])]);
  }
}

if (!$url) {
  $core->dump(['error' => 'invalid URL', $url]);
}

if (!$uid) {
  $core->dump(['error' => 'User Invalid', $_POST]);
}

if (!$can) {
  $core->dump(['error' => 'disallowed create shortlinks']);
}

function grstr($user, $url, $length = 0)
{
  global $wpdb;
  global $core;
  if (!$length || 0 == $length) {
    $length = rand(1, 8);
  }
  $C = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  $CL = strlen($C);
  $RS = '';
  for ($i = 0; $i < $length; ++$i) {
    $RS .= $C[rand(0, $CL - 1)];
  }
  $exists_url = $wpdb->get_row("SELECT * FROM `short_url` WHERE location = '$url' AND userid = '$user'");
  $exists_id = $wpdb->get_row("SELECT * FROM `short_url` WHERE url = '$RS' AND userid = '$user'");

  if (!$exists_url) {
    if ($exists_id) {
      return grstr($user, $url);
    } elseif (!$exists_id) {
      return $RS;
    }
  } else {
    return $exists_url;
  }
}

function updateShort($id)
{
  global $wpdb;
  if (isset($_POST['ptitle']) && !empty($_POST['ptitle'])) {
    $wpdb->update('short_url', ['meta_title' => base64_encode($_POST['ptitle'])], ['id' => $id]);
  }
  if (isset($_POST['pdesc']) && !empty($_POST['pdesc'])) {
    $wpdb->update('short_url', ['meta_description' => base64_encode($_POST['pdesc'])], ['id' => $id]);
  }
  if (isset($_POST['html']) && !empty($_POST['html'])) {
    $wpdb->update('short_url', ['html' => base64_encode($_POST['html'])], ['id' => $id]);
  }
}

function createPost()
{
  // Create post object
  $my_post = [
    'post_title' => wp_strip_all_tags($_POST['post_title']),
    'post_content' => $_POST['post_content'],
    'post_status' => 'publish',
    'post_author' => 1,
    'post_category' => [8, 39],
  ];

  // Insert the post into the database
  wp_insert_post($my_post);
}
