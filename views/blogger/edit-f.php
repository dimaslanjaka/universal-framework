<?php
$class = new GoogleExt\client();
/**
 * @var Google\Client
 */
$client = $class->custom_client('blogger', '/auth/google');
$service = new GoogleExt\blogger($client);

if (isset($_REQUEST['bid'])) {
  $blog = $service->set_blog_id($_REQUEST['bid']);
}

if (isset($_REQUEST['update'])) {
  $blogId = $_REQUEST['blogid'];
  $postId = $_REQUEST['postid'];
  $mypost = new Google_Service_Blogger_Post();
  $mypost->setTitle($_REQUEST['title']);
  $mypost->setContent($_REQUEST['body']);
  $labels = explode(',', $_REQUEST['label']);
  $labels = array_map('trim', $labels);
  $mypost->setLabels($labels);
  try {
    $service->posts->update($blogId, $postId, $mypost);
  } catch (Exception $e) {
  }
}
