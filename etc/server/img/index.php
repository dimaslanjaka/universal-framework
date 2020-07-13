<?php
if (isset($_REQUEST['url'])) {
  \img\cache::imageCache($_REQUEST['url']);
}
