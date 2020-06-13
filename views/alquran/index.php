<?php
$db = pdo()->switch('alquran');
?>
<table class="table">
  <thead>
    <tr>
      <th>#</th>
      <th>Surah</th>
      <th>Ayat</th>
      <th>Tipe</th>
    </tr>
  </thead>
  <tbody>
    <?php

  $surah = $db->query('SELECT * FROM `sura`')->row_array();

  foreach ($surah as $data) {
    echo '<tr>';
    echo '<td>' . $data['index'] . '</td>';
    echo '<td>' . $data['name_indonesia'] . '</td>';
    echo '<td>' . $data['ayas'] . '</td>';
    echo '<td>' . $data['type'] . '</td>';
    echo '<td><a href="/alquran/surah?name=' . $data['name_indonesia'] . '" data-toggle="tooltip" title="Baca" class="btn btn-info"><i class="fas fa-eye"></i></a></td>';
    echo '</tr>';
  }

  ?>
  </tbody>
</table>