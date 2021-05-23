<?php
if (isset($_REQUEST['url'])) {
  echo \img\cache::imageCache($_REQUEST['url']);
}
