<main>

    <div class="container-fluid">

        <div class="row">

            <div class="col-12">

                <h1>Kelola Mutas Saldo</h1>



                <div class="separator mb-5"></div>

            </div>

        </div>



        <div class="row mb-4">

            <div class="col-12 mb-4">

                <?php if (isset($_SESSION['hasil'])) : ?>

                    <div class="alert alert-<?= $_SESSION['hasil']['alert']; ?> alert-dismissible fade show  mb-0" role="alert">

                        <?= $_SESSION['hasil']['pesan']; ?>

                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">

                            <span aria-hidden="true">&times;</span>

                        </button>

                    </div><br>

                <?php endif; ?>

                <?php unset($_SESSION['hasil']); ?>

                <div class="alert alert-warning   mb-2" role="alert">

                    <i class="simple-icon-info"> Ketika status mutasi diubah menjadi READ itu artinya deposit telah terbayar, dan deposit bisa di konfirmasi, ( Ubah menjadi read manual dilakukan ketika deposit otomatis sedang gangguan atau hal lainnya )</i>

                </div>

                <div class="card">

                    <div class="card-body">

                        <table class="data-table data-table-feature table-responsive col-12">

                            <thead>

                                <tr>

                                    <th>#</th>

                                    <th>tanggal & Waktu</th>

                                    <th>Kode isi saldo</th>

                                    <th>Nama Pengguna</th>

                                    <th>Tipe</th>

                                    <th>Provider</th>

                                    <th>Jumlah</th>

                                    <th>Saldo</th>

                                    <th>Status</th>

                                    <th>Aksi</th>



                                </tr>

                            </thead>

                            <tbody>

                                <?php $no = 1; ?>

                                <?php foreach ($data['allmutasi'] as $data_riwayat) : ?>

                                    <tr>

                                        <form action="<?= BASEURL; ?>admin/submitmutasi" class="form-inline" role="form" method="POST">

                                            <input type="hidden" name="csrf_token" value="<?php echo $config['csrf_token']; ?>">

                                            <input type="hidden" name="kodedeposit" value="<?= $data_riwayat['kode_deposit']; ?>">

                                            <input type="hidden" name="status" value="<?= $data_riwayat['status']; ?>">

                                            <td><?= $no; ?></td>

                                            <td><?php echo tanggal_indo($data_riwayat['date']); ?>, <?php echo $data_riwayat['time']; ?></td>

                                            <td width="15%"><span class="badge badge-primary"><?php echo $data_riwayat['kode_deposit']; ?></span></td>

                                            <td width="7%"><span class="badge badge-success"><?php echo $data_riwayat['username']; ?></span></td>

                                            <td width="10%"><span class="badge badge-warning"><?php echo $data_riwayat['tipe']; ?></span></td>

                                            <td width="10%"><span class="badge badge-dark"><?php echo $data_riwayat['provider']; ?></span></td>

                                            <td width="10%"><span class="badge badge-primary"><?php echo number_format($data_riwayat['jumlah'], 0, ',', '.'); ?></span></td>

                                            <td width="10%"><span class="badge badge-success"><?php echo number_format($data_riwayat['saldo'], 0, ',', '.'); ?></span></td>

                                            <td>

                                                <select class="form-control" style="width: 150px;" name="status">

                                                    <?php if ('DONE' == $data_riwayat['status']) { ?>

                                                        <option value="<?php echo $data_riwayat['status']; ?>" selected disabled><?php echo $data_riwayat['status']; ?></option>

                                                    <?php } else { ?>

                                                        <option value="<?php echo $data_riwayat['status']; ?>" selected disabled><?php echo $data_riwayat['status']; ?></option>

                                                        <option value="READ">READ</option>

                                                        <option value="DONE">DONE</option>



                                                    <?php
                                                    }
                                                    ?>

                                                </select>

                                            </td>

                                            <td align="text-center">

                                                <button data-toggle="tooltip" title="Ubah" type="submit" name="ubah" class="btn btn-sm btn-bordred btn-primary"><i class="simple-icon-note"></i></button>

                                                <button data-toggle="tooltip" title="Hapus" type="submit" name="hapus" class="btn btn-sm btn-bordred btn-danger"><i class="simple-icon-trash"></i></button>

                                            </td>

                                        </form>

                                    </tr>

                                    <?php ++$no; ?>

                                <?php endforeach; ?>

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    </div>

    <!-- modal detail -->

    <div class="modal fade detailmodal" tabindex="-1" role="dialog" aria-hidden="true">

        <div class="modal-dialog modal-lg">

            <div class="modal-content detailcontent">

                <div class="modal-header">

                    <h5 class="modal-title">Detail</h5>

                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">

                        <span aria-hidden="true">&times;</span>

                    </button>

                </div>

                <div class="modal-body bodymodaldetail">



                </div>

            </div>

        </div>

    </div>

    <!-- sampai sini modal detail -->





</main>