<?php

$class = new GoogleExt\client();
/**
 * @var Google\Client
 */
$client = $class->custom_client('blogger', '/auth/google');
$service = new GoogleExt\blogger($client);

// determine blog id
if (!isset($_REQUEST['bid'])) {
  if (isset($_SERVER['HTTP_REFERER'])) {
    redirect($_SERVER['HTTP_REFERER']);
  } else {
    redirect(getOrigin('/blogger/list-posts'));
  }
  exit();
}

// set blog id
$service->set_blog_id($_REQUEST['bid']);
// get single post
$singlepost = $service->posts->get($_REQUEST['bid'], $_GET['pid']);
?>

<div class="container">
  <form action="" method="post">
    <div class="form-group"><textarea oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"' id="body" name="desc" class="form-control"><?php echo isset($singlepost->content) ? $singlepost->content : '';  ?></textarea></div>
  </form>
</div>