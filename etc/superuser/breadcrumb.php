<nav aria-label="breadcrumb" class="">
  <ol class="breadcrumb white">
    <li class="breadcrumb-item"><a href="/superuser/"><i class="fad fa-home"></i></a></li>
    <?php
    $dirs = array_filter(glob(__DIR__ . '/*'), 'is_dir');
    if (is_array($dirs)) {
      $map = array_values(array_unique(array_filter(array_map('basename', $dirs))));
      for ($i = 0; $i < count($map); $i++) {
        if ($i == count($map) - 1) {
          //latest iteration
          echo '<li class="breadcrumb-item active"><a href="/superuser/' . $map[$i] . '/">' . strtoupper($map[$i]) . '</a></li>';
        } else {
          echo '<li class="breadcrumb-item"><a href="/superuser/' . $map[$i] . '/">' . strtoupper($map[$i]) . '</a></li>';
        }
      }
    }
    ?>
  </ol>
</nav>