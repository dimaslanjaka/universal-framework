<main>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h1>Riwayat deposit</h1>
                <nav class="breadcrumb-container d-none d-sm-block d-lg-inline-block" aria-label="breadcrumb">

                </nav>
                <div class="separator mb-5"></div>
            </div>
        </div>

        <div class="row mb-4">
            <div class="col-lg-12 col-md-10 mb-4">
                <div class="card">
                    <div class="card-body">
                        <table class="data-table data-table-feature responsive">
                            <thead>
                                <tr>

                                    <th>ID</th>
                                    <th>Tanggal</th>
                                    <th>Tipe</th>
                                    <th>Jumlah</th>
                                    <th>Status</th>
                                    <th>Detail</th>
                                </tr>
                            </thead>
                            <tbody>

                                <?php foreach ($data['riwayat'] as $riwayat) : ?>
                                    <tr>

                                        <td>
                                            <div class="badge badge-secondary"><?= $riwayat['kode_deposit']; ?></div>
                                        </td>
                                        <td><?= tanggal_indo($riwayat['date']); ?><br> <?= $riwayat['time']; ?></td>
                                        <td><?= $riwayat['tipe']; ?> - <?= $riwayat['provider']; ?></td>
                                        <td><?= $riwayat['jumlah_transfer']; ?></td>
                                        <td>
                                            <?php
                      $status = $riwayat['status'];

                      if ('Success' == $riwayat['status']) {
                        $badge = 'success';
                      } elseif ('Error' == $riwayat['status']) {
                        $badge = 'danger';
                      } else {
                        'warning' == $badge;
                      }
                      ?>
                                            <div class="badge badge-<?= $badge; ?>"><?= $riwayat['status']; ?></div>
                                        </td>
                                        <td>
                                            <a href="<?= BASEURL; ?>deposit/invoice/<?= $riwayat['kode_deposit']; ?>">
                                                <div class="badge badge-warning"><i class="iconsminds-align-justify-all"></i></div>
                                            </a>
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