<?php
$id = 'h6mBh5GMSfAvPec7Of';
if (isset($_REQUEST['id'])) {
  $id = trim(urldecode($_REQUEST['id']));
}
$url = "https://media.giphy.com/media/$id/giphy.gif";
$img = new img\cache();
$img::imageCache($url);
