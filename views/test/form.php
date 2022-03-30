<section>
  <form action="/test/receiver" method="post">
    <input type="hidden" name="input" value="<?= uniqid() ?>">
    <div class="md-form">
      <input type="text" name="text" id="itxt" value="<?= uniqid() ?>" class="form-control">
    </div>
    <div class="d-flex justify-content-between">
      <div>
        <!-- Remember me -->
        <div class="form-check form-check-inline">
          <input type="checkbox" name="error" class="form-check-input" id="use_ERROR">
          <label class="form-check-label" for="use_ERROR">Error</label>
        </div>
        <div class="form-check form-check-inline">
          <input type="checkbox" name="title" class="form-check-input" id="use_title">
          <label class="form-check-label" for="use_title">Title</label>
        </div>
      </div>
    </div>
    <div>
      <div class="md-form">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
  </form>
</section>

<?php

$duration = "0y0m0d1h1i1s";

$display = str_replace(
  array('y', 'm', 'd', 'h', 'i', 's'),
  array('-', '-', '-', '-', '-', ''),
  $duration
);



$display = str_replace(
  array('y', 'm', 'd', 'h', 'i', 's'),
  array('-', '-', '-', '-', '-', ''),
  $duration
);
echo $display;

echo '<hr>';
$explode = explode('-', $display);
pre($explode);
$explode[0] = str_pad($explode[0], 4, '0', STR_PAD_LEFT) . '-';
$explode[1] = str_pad($explode[1], 2, '0', STR_PAD_LEFT) . '-';
$explode[2] = str_pad($explode[2], 2, '0', STR_PAD_LEFT) . ' ';
$explode[3] = str_pad($explode[3], 2, '0', STR_PAD_LEFT) . '-';
$explode[4] = str_pad($explode[4], 2, '0', STR_PAD_LEFT) . '-';
$explode[5] = str_pad($explode[5], 2, '0', STR_PAD_LEFT) . '';
$implode = implode('', $explode);
print($implode . ' timestamp ' . strtotime($display));
echo '<hr>';

$duration = "0y0m0d1h1i1s";
$x = new DateInterval('P0Y1M2D');
$y = new DateInterval('P0Y1M2DT1H');
//$y->h =
//pre($y);
$date_work = new DateTime();
//$date_work->add($y);
//$date_work->add(strtotime("+"))
$format = $date_work->format('Y-m-d h:i:s');
$timestamp = $date_work->getTimestamp();
echo $format . ' timestamp ' . $timestamp;
