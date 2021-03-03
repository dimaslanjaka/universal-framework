<main>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h1>Riwayat penggunaan saldo</h1>
                <div class="separator mb-5"></div>
            </div>
        </div>

        <div class="row mb-4">
            <div class="col-12 mb-4">
                <div class="card ">
                    <div class="card-body">
                        <table class="data-table data-table-feature table-responsive mg-b-0 tx-13">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Tanggal & Waktu</th>
                                    <th>Icon</th>
                                    <th>Aksi</th>
                                    <th>Jumlah</th>
                                    <th>Keterangan</th>

                                </tr>
                            </thead>
                            <tbody>
                                <?php $i = 1; ?>
                                <?php foreach ($data['mutasiakun'] as $mutasi) : ?>

                                    <?php
                                    $aksi = $mutasi['aksi'];
                                    if ($aksi == 'Penambahan Saldo') {
                                        $badge = 'primary';
                                        $icon = 'simple-icon-plus';
                                    } else {
                                        $badge = 'danger';
                                        $icon = 'simple-icon-minus';
                                    }
                                    ?>
                                    <tr>
                                        <td><?= $i ?></td>
                                        <td><?= tanggal_indo($mutasi['date']) ?> - <?= $mutasi['time']; ?></td>
                                        <td>
                                            <div class="badge badge-<?= $badge; ?>"><i class="<?= $icon; ?>"></i></div>
                                        </td>
                                        <td>
                                            <div class="badge badge-<?= $badge; ?>"><?= $mutasi['aksi'];  ?></div>
                                        </td>
                                        <td><?= $mutasi['nominal']; ?></td>
                                        <td><?= $mutasi['pesan']; ?></td>

                                    </tr>
                                    <?php $i++ ?>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>