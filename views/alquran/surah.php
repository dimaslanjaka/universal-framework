<?php
include __DIR__ . '/db.php';

if (isset($subrequest[2])) {
  $sura = urldecode($subrequest[2]);
  $info = $db->get_results('SELECT * FROM `sura` WHERE `name_indonesia` = \'' . preg_replace('/\'/m', '\\\'', $sura) . '\'');
  $isi = $db->get_results('SELECT * FROM `quran_arabic` WHERE `sura` = \'' . $info[0]->index . '\'');
  $isi = array_filter($isi);
  //precom($info, $isi);
  echo '<div id="wrapAyat">';
  foreach ($isi as $ayat) {
    echo '<span id="ayat' . $ayat->aya . '" ayat="' . $ayat->aya . '">' . $ayat->text . '</span>';
  }
  echo '</div>';
?>
  <main>
    <section id="perAyat">
      <div class="row">
        <div class="col-md-6">
          <h1><?= $info[0]->name_indonesia ?></h1>
          <p>Display Per Ayat:</p>
          <div class="container">
            <ul id="pagination-demo" class="pagination-sm"></ul>
          </div>
          <p>Display Ayat Range:</p>
          <div class="container">
            <form class="" id="rangeAyat" method="post">
              <div class="form-row mb-2">
                <div class="col-4">
                  <label for="ayatPertama" class="text-muted">Mulai 1</label>
                  <input type="text" class="form-control" id="ayatPertama" placeholder="1" value="1" pattern="\d{1,5}" min="1" max="<?= count($isi) ?>" required>
                </div>
                <div class="col-4">
                  <label for="ayatTerakhir" class="text-muted">Sampai <?= count($isi) ?></label>
                  <input type="text" class="form-control" id="ayatTerakhir" placeholder="99" value="<?= count($isi) ?>" pattern="\d{1,5}" min="1" max="<?= count($isi) ?>" required>
                </div>
                <div class="col-4">
                  <label for="">Read</label>
                  <button type="submit" class="btn btn-primary mb-2"><i class="fas fa-eye"></i></button>
                </div>
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
  </main>
<?php
} else {
  include __DIR__ . '/index.php';
}
