<main>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h1>Kelola Kategori</h1>
                <div class="separator mb-5"></div>
            </div>
        </div>

        <?php if (isset($_SESSION['hasil'])) : ?>
            <div class="alert alert-<?= $_SESSION['hasil']['alert']; ?> alert-dismissible fade show  mb-0" role="alert">
                <?= $_SESSION['hasil']['pesan'] ?>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div><br>
        <?php endif; ?>
        <?php unset($_SESSION['hasil']); ?>
        <div class="row mb-4">
            <div class="col-6 text-left mb-3">
                <button data-toggle="modal" data-target="#addModal" class="btn btn-primary btn-sm"><i class="simple-icon-plus"></i> Tambah</button>
            </div>
            <div class="col-12 mb-4">
                <div class="card">
                    <div class="card-body">
                        <table class="data-table data-table-feature table-responsive">
                            <thead>
                                <tr>
                                    <th>Nama Kategori</th>
                                    <th style="display: none;">Nama Kategori</th>
                                    <th>Kode Kategori</th>
                                    <th>Server</th>
                                    <th>Tipe</th>
                                    <th>Aksi</th>




                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($data['allcategory'] as $data_kategori) : ?>

                                    <tr>
                                        <form action="<?= BASEURL; ?>admin/otheractioncategory" class="form-inline" role="form" method="POST">
                                            <input type="hidden" name="id_kategori" value="<?= $data_kategori['id']; ?>">
                                            <td><input type="text" class="form-control" style="width: 200px;" name="nama" value="<?php echo $data_kategori['nama']; ?>"></td>
                                            <td style="display: none;"><?= $data_kategori['nama']; ?></td>
                                            <td><input type="text" class="form-control" style="width: 200px;" name="kode" value="<?php echo $data_kategori['kode']; ?>"></td>
                                            <td>
                                                <select class="form-control" style="width: 200px;" name="server">
                                                    <option value="<?php echo $data_kategori['server']; ?>"><?php echo $data_kategori['server']; ?></option>
                                                    <option value="Pulsa">Pulsa</option>
                                                    <option value="E-Money">E-Money</option>
                                                    <option value="Data">Data</option>
                                                    <option value="Paket SMS Telpon">Paket SMS Telpon</option>
                                                    <option value="Games">Games</option>
                                                    <option value="PLN">PLN</option>
                                                    <option value="Pulsa Internasional">Pulsa Internasional</option>
                                                    <option value="Voucher">Voucher</option>
                                                    <option value="WIFI ID">WIFI ID</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select class="form-control" style="width: 200px;" name="tipe">
                                                    <option value="<?php echo $data_kategori['tipe']; ?>"><?php echo $data_kategori['tipe']; ?></option>
                                                    <option value="Sosial Media">SOSIAL MEDIA</option>
                                                    <option value="Top Up">TOP UP</option>
                                                    <option value="Pascabayar">PASCABAYAR</option>
                                                </select>
                                            </td>
                                            <td align="text-center">
                                                <button data-toggle="tooltip" title="Ubah" type="submit" name="ubah" class="btn btn-sm btn-bordred btn-warning"><i class="simple-icon-note" title="Ubah"></i></button>
                                                <button data-toggle="tooltip" title="Hapus" type="submit" name="hapus" class="btn btn-sm btn-bordred btn-danger"><i class="simple-icon-trash" title="Hapus"></i></button>
                                            </td>
                                        </form>
                                    </tr>

                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modalll detail berita -->
    <div class="modal fade" id="modal-detail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title mt-0" id="myModalLabel"><i class="fa fa-bell text-primary"></i> Berita</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body ">
                    <form class="form-horizontal" role="form" method="POST" action="<?= BASEURL; ?>admin/submiteditnews">
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
    <!-- 
     -->


    <!-- modal tambah berita -->
    <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title m-t-0 id=" myModalLabel""><i class="fa fa-bell text-primary"></i> Tambah Berita</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">x</button>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form" method="POST" action="<?= BASEURL; ?>admin/addcategory">
                        <input type="hidden" name="csrf_token" value="<?php echo $config['csrf_token'] ?>">
                        <div class="form-group">
                            <label class="col-md-12 control-label">Nama Kategori</label>
                            <div class="col-md-12">
                                <input type="text" name="nama" class="form-control" placeholder="Nama Kategori" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-12 control-label">Kode Kategori</label>
                            <div class="col-md-12">
                                <input type="text" name="kode" class="form-control" placeholder="Kode Kategori" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-12 control-label">Tipe</label>
                            <div class="col-md-12">
                                <select class="form-control" name="tipe" required>
                                    <option value="">Pilih Salah Satu...</option>
                                    <option value="Sosial Media">SOSIAL MEDIA</option>
                                    <option value="Top Up">TOP UP</option>
                                    <option value="Pascabayar">PASCABAYAR</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-12 control-label">Server <small class="text-danger">*Untuk Tipe SOSIAL MEDIA Jangan Diisi.</small></label>
                            <div class="col-md-12">
                                <select class="form-control" name="server" required>
                                    <option value="">Pilih Salah Satu...</option>
                                    <option value="Pulsa">Pulsa</option>
                                    <option value="E-Money">E-Money</option>
                                    <option value="Data">Data</option>
                                    <option value="Paket SMS Telpon">Paket SMS Telpon</option>
                                    <option value="Games">Games</option>
                                    <option value="PLN">PLN</option>
                                    <option value="Pulsa Internasional">Pulsa Internasional</option>
                                    <option value="Voucher">Voucher</option>
                                    <option value="WIFI ID">WIFI ID</option>
                                    <option value="Pascabayar">Pascabayar</option>
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