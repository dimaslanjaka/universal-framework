<main>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h1>Kelola Metode Isi saldo</h1>

                <div class="separator mb-5"></div>
            </div>
        </div>

        <div class="row mb-4">

            <div class="col-6 text-left mb-3">
                <button data-toggle="modal" data-target="#addModal" class="btn btn-primary btn-sm"><i class="simple-icon-plus"></i> Tambah</button>
            </div>

            <div class="col-12 mb-4">
                <!-- INFO -->

                <!--  -->
                <?php if (isset($_SESSION['hasil'])) : ?>
                    <div class="alert alert-<?= $_SESSION['hasil']['alert']; ?> alert-dismissible fade show  mb-0" role="alert">
                        <?= $_SESSION['hasil']['pesan'] ?>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div><br>
                <?php endif; ?>
                <?php unset($_SESSION['hasil']); ?>
                <!-- <div class="alert alert-warning">
                    <h5>
                        * Klik Kode ID Order untuk melihat detail Orderan!<br>

                    </h5>
                </div> -->
                <div class="card">
                    <div class="card-body">
                        <table class="data-table data-table-feature table-responsive col-12">
                            <thead>
                                <tr>
                                    <th>Tipe</th>
                                    <th>Provider</th>
                                    <th>Keterangan</th>
                                    <th>Rate</th>
                                    <th>Nama Penerima</th>
                                    <th>Tujuan Transfer</th>
                                    <th>Minimal</th>
                                    <th>Status</th>
                                    <th>Aksi</th>

                                </tr>
                            </thead>
                            <?php foreach ($data['allmetodedeposit'] as $data_method) : ?>
                                <tbody>
                                    <tr>

                                        <td width="10%"><span class="badge badge-primary"><?php echo $data_method['tipe']; ?></span></td>
                                        <td width="5%"><span class="badge badge-success"><?php echo $data_method['provider']; ?></span></td>
                                        <td><?php echo $data_method['catatan']; ?></td>
                                        <td width="10%"><span class="badge badge-warning"><?php echo $data_method['rate']; ?></span></td>
                                        <td width="15%"><span class="badge badge-danger"><?php echo $data_method['nama_penerima']; ?></span></td>
                                        <td width="10%"><span class="badge badge-info"><?php echo $data_method['tujuan']; ?></span></td>
                                        <td width="7%"><span class="badge badge-danger">Rp <?php echo number_format($data_method['minimal'], 0, ',', '.'); ?></span></td>
                                        <td width="5%"><span class="badge badge-dark"><?php echo $data_method['status']; ?></span></td>
                                        <td align="center">
                                            <a href="javascript:;" onclick="users('<?= BASEURL; ?>admin/editmetodedeposit/<?= $data_method['id']; ?>')" class="btn btn-sm btn-warning"><i class="simple-icon-note" title="Ubah"></i></a>
                                            <a href="<?= BASEURL; ?>admin/deletemetodedepo/<?= $data_method['id']; ?>" class="btn btn-sm btn-danger"><i class="simple-icon-trash" title="Hapus"></i></a>
                                        </td>

                                    </tr>
                                </tbody>
                            <?php endforeach; ?>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- modal detail  depo-->
    <div class="row">
        <div class="col-md-12">
            <div class="modal fade" id="modal-detail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title mt-0" id="myModalLabel"><i class="fa fa-credit-card text-primary"></i> Pembayaran Isi Saldo</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form class="form-horizontal" role="form" method="POST" action="<?= BASEURL; ?>admin/submiteditdeposit">
                                <input type="hidden" name="csrf_token" value="<?php echo $config['csrf_token'] ?>">
                                <div id="modal-detail-body"></div>
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-warning" name="ubah"><i class="fa fa-pencil-alt"></i> Ubah</button>
                                    <button type="button" class="btn btn-primary" data-dismiss="modal">Tutup</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- sampai sini modal detail -->

    <!--  modal tambah deposit -->
    <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title m-t-0 id=" myModalLabel""><i class="fa fa-bell text-primary"></i> Tambah Berita</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">x</button>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form" method="POST" action="<?= BASEURL; ?>admin/addmetodedeposit">
                        <input type="hidden" name="csrf_token" value="<?php echo $config['csrf_token'] ?>">
                        <div class="form-group">
                            <label class="col-md-12 control-label">Tipe</label>
                            <div class="col-md-12">
                                <select class="form-control" name="tipe" required>
                                    <option value="">Pilih Salah Satu...</option>
                                    <option value="Transfer Pulsa">Transfer Pulsa</option>
                                    <option value="Transfer Bank">Transfer Bank</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-12 control-label">Provider</label>
                            <div class="col-md-12">
                                <input type="text" name="provider" class="form-control" placeholder="Contoh : BCA, Telkomsel, XL, OVO" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-12 control-label">Keterangan</label>
                            <div class="col-md-12">
                                <textarea type="text" name="catatan" class="form-control" placeholder="Contoh : Silahkan Transfer Dengan Nomor Penerima Tersebut" required></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-12 control-label">Rate</label>
                            <div class="col-md-12">
                                <input type="text" name="rate" class="form-control" placeholder="Contoh : 0.85 , 1.2" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-12 control-label">Nama Penerima <small class="text-danger">*Kosongkan Jika Tipe Pembayaran Transfer Pulsa.</small></label>
                            <div class="col-md-12">
                                <input type="text" name="nama_penerima" class="form-control" placeholder="Contoh : A/N Ilman sunannudin" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-12 control-label">Tujuan Transfer</label>
                            <div class="col-md-12">
                                <input type="number" name="tujuan" class="form-control" placeholder="Contoh : 082298859671" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-12 control-label">Minimal Isi Saldo</label>
                            <div class="col-md-12">
                                <input type="number" name="minimal" class="form-control" placeholder="Contoh : 10000" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-12 control-label">Status</label>
                            <div class="col-md-12">
                                <select class="form-control" name="status" required>
                                    <option value="">Pilih Salah Satu...</option>
                                    <option value="Aktif">Aktif</option>
                                    <option value="Tidak Aktif">Tidak Aktif</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="reset" class="btn btn-danger"><i class="fa fa-spinner"></i> Ulangi</button>
                            <button type="submit" class="btn btn-primary" name="tambah"><i class="fa fa-plus"></i> Tambah</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</main>

<script type="text/javascript">
    function users(url) {
        $.ajax({
            type: "GET",
            url: url,
            beforeSend: function() {
                $('#modal-detail-body').html('Sedang Memuat...');
            },
            success: function(result) {
                $('#modal-detail-body').html(result);
            },
            error: function() {
                $('#modal-detail-body').html('Terjadi Kesalahan.');
            }
        });
        $('#modal-detail').modal();
    }
</script>