<?php
$dirpath = ROOT . '/AGC/saved/';
if (!isreq('niche')) {
  $arr = ['download', 'movies'];
?>
  <div class="row">
    <div class="col-md-12">
      <div class="container p-4">
        <h1 itemprop="name" class="d-none">Blog niche selector</h1>
        <h2 class="d-inline-block mr-5">Select your blog niche</h2>
        <div class="btn-group d-inline-block" style="border: 1px dashed #8c8b8b;">
          <?php
          foreach ($arr as $key => $value) {
            echo '<a href="/AGC/list?niche=' . $value . '" class="btn btn-primary m-2">' . strtoupper($value) . '</a>';
          }
          ?>
        </div>
      </div>
    </div>
  </div>
<?php
}
?>