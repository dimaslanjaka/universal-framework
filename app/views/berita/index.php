<main>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h1>Semua Berita</h1>

                <div class="separator mb-5"></div>
            </div>
        </div>

        <div class="row mb-4">
            <div class="col-12 data-tables-hide-filter">
                <div class="card">
                    <div class="card-body">

                        <table class="data-table data-tables-pagination responsive nowrap" data-order="[[ 1, &quot;desc&quot; ]]">
                            <thead>
                                <tr>
                                    <th>Judul</th>
                                    <th>tipe</th>
                                    <th>tanggal</th>
                                    <th>Konten</th>
                                </tr>
                            </thead>
                            <tbody>

                                <?php foreach ($data['semuaberita'] as $berita) : ?>
                                    <?php
                                    $tipeberita = $berita['tipe'];
                                    if ($tipeberita == 'INFO') {
                                        $alert = 'info';
                                    } else if ($tipeberita == 'PENTING') {
                                        $alert = 'danger';
                                    } else {
                                        $alert = 'warning';
                                    }
                                    ?>
                                    <tr>
                                        <td>
                                            <p class="list-item-heading"><?= $berita['title']; ?></p>
                                        </td>
                                        <td>
                                            <p class="text-light badge badge-<?= $alert; ?>"><?= $berita['tipe']; ?></p>
                                        </td>
                                        <td>
                                            <p class="text-muted"><?= $berita['date']; ?></p>
                                        </td>
                                        <td>
                                            <p class="text-muted"><?= $berita['konten']; ?></p>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>