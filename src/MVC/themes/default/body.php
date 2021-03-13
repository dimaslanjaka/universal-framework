<body>
  <?php
  if (isset($content) && file_exists($content)) {
    include $content;
  } else {
    echo '404';
  }
  ?>
</body>