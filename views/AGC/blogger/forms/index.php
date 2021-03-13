<?php

require_once __DIR__ . '/init.php';

if (!isset($core)) {
  $core = new dimas();
}
$google = blogger_client();
if (isreq('test', 'post')) {
  /**
   * @var wpgoogle $google
   */
  $blogger = new Google_Service_Blogger($google->client);
  $validate = validateToken($google);
  $r = ['validate' => $validate];
  if (!$validate || isURL($validate)) {
    $r['error'] = true;
    $r['message'] = $google->auth_url();
    $r['type'] = 'blogger_access';
  } elseif (!validateBloggerId(function () {
    global $core;
    $r['error'] = true;
    $r['message'] = get_home_url() . '/AGC/blogger';
    $r['type'] = 'blogger_id';
    $core->dump($r);
  })) {
    $r['error'] = true;
    $r['message'] = get_home_url() . '/AGC/blogger';
    $r['type'] = 'blogger_id';
  } else {
    $r['success'] = true;
    try {
      $blog = get_blogger_list($google, function () {
        if (!isses('blogId')) {
          global $core;
          $r['error'] = true;
          $r['message'] = get_home_url() . '/AGC/blogger';
          $r['type'] = 'blog_id';
          $core->dump($r);
        } else {
          global $core;
          $r['success'] = true;
          $r['message'][] = ['id' => isses('blogId'), 'name' => isses('blogId')];
          $r['type'] = 'choose_blog';
          $core->dump($r);
        }
      });
      $r['message'] = $blog->items;
      $r['type'] = 'choose_blog';
    } catch (Google_Service_Exception $th) {
      $r['message'] = get_home_url() . '/AGC/blogger';
      unset($r['success']);
      $r['error'] = json_decode($th->getMessage());
      $r['type'] = 'blogger_id';
    }
  }
  $core->dump($r);
}
/**
 * Insert blogger user ID
 */
if (isreq('bid', 'post')) {
  update_user_meta(get_current_user_id(), 'bloggerId', isreq('bid', 'post'));
}
/**
 * Insert blog ID redirect
 */
if (isreq('set-blog-id', 'post')) {
  sess('blogId', isreq('set-blog-id', 'post'));
  update_user_meta(get_current_user_id(), 'blogId', isreq('set-blog-id', 'post'));
  wp_redirect(get_home_url() . '/AGC/blogger/list');
  exit;
}
/**
 * Insert blog ID
 */
if (isreq('set-blog')) {
  sess('blogId', isreq('set-blog'));
  $core->dump(isses('blogId'));
}
