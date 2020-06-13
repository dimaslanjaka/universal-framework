<?php
$db = pdo()->switch('alquran');

if (isset($_REQUEST['name'])) {
  $sura = urldecode($_REQUEST['name']);
  $info = $db->query('SELECT * FROM `sura` WHERE `name_indonesia` = \'' . preg_replace('/\'/m', '\\\'', $sura) . '\'')->row_array();
  //var_dump($info);
  $isi = $db->query('SELECT * FROM `quran_arabic` WHERE `sura` = \'' . $info['index'] . '\'')->row_array();
  $isi = array_filter($isi);
  //precom($info, $isi);
  echo '<div id="wrapAyat">';
  foreach ($isi as $ayat) {
    echo '<span id="ayat' . $ayat['aya'] . '" ayat="' . $ayat['aya'] . '">' . $ayat['text'] . '</span>';
  }
  echo '</div>'; ?>
  <section id="perAyat" class="m-2">
    <div class="row">
      <div class="col-md-6">
        <h1><?= $info['name_indonesia']; ?></h1>
        <p>Display Per Ayat:</p>
        <div class="container">
          <ul id="pagination-demo" class="pagination-sm"></ul>
        </div>
        <p>Display Ayat Range:</p>
        <div class="container">
          <form action="/alquran/" id="rangeAyat" method="post">
            <div class="form-row">
              <div class="col-6 md-form">
                <label for="ayatPertama" class="text-muted">Mulai 1</label>
                <input type="text" class="form-control" id="ayatPertama" placeholder="1" value="1" pattern="\d{1,5}" min="1" max="<?= count($isi); ?>" required>
              </div>
              <div class="col-6 md-form">
                <label for="ayatTerakhir" class="text-muted">Sampai <?= count($isi); ?></label>
                <input type="text" class="form-control" id="ayatTerakhir" placeholder="99" value="<?= count($isi); ?>" pattern="\d{1,5}" min="1" max="<?= count($isi); ?>" required>
              </div>
            </div>
            <div class="md-form text-center">
              <button type="submit" class="btn btn-sm btn-primary"><i class="fas fa-eye"></i></button>
            </div>
          </form>
        </div>
      </div>
      <div class="col-md-6">
        <div id="page-content" class="page-content">
          <p></p>
        </div>
      </div>
    </div>
  </section>
<?php
} else {
    ?>
  <div class="alert alert-danger">
    <p>Surah not found</p>
  </div>
<?php
  include __DIR__ . '/index.php';
  }
