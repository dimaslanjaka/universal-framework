<main>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h1>Kelola Berita</h1>
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
                                    <th>Tanggal & waktu</th>
                                    <th>Kategori</th>
                                    <th>Judul</th>
                                    <th>Tipe</th>
                                    <th>konten</th>
                                    <th>Aksi</th>




                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($data['allnews'] as $news) : ?>

                                    <tr>
                                        <td><?= tanggal_indo($news['date']); ?>, <?= $news['time']; ?></td>
                                        <td width="10%"><span class="badge badge-primary"><?= $news['icon']; ?></span></td>
                                        <td><?= $news['title']; ?></td>
                                        <td width="10%"><span class="badge badge-warning"><?= $news['tipe']; ?></span></td>
                                        <td><textarea rows="5" cols="200" class="form-control" readonly><?= $news['konten']; ?></textarea></td>
                                        <td align="center">
                                            <a href="javascript:;" onclick="users('<?= BASEURL; ?>admin/editnews/<?= $news['id']; ?>')" class="btn btn-sm btn-warning"><i class="simple-icon-note" title="Ubah"></i></a>
                                            <a href="<?= BASEURL; ?>admin/deletenews/<?= $news['id']; ?>" class="btn btn-sm btn-danger"><i class="simple-icon-trash" title="Hapus"></i></a>
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
                    <form class="form-horizontal" role="form" action="<?= BASEURL; ?>admin/addnews" method="POST">
                        <input type="hidden" name="csrf_token" value="<?php echo $config['csrf_token'] ?>">
                        <div class="form-group row">
                            <label class="col-md-12 control-label">Kategori</label>
                            <div class="col-md-12">
                                <select class="form-control" name="kategori" required>
                                    <option value="" selected disabled>Pilih Salah Satu</option>
                                    <option value="PESANAN">PESANAN</option>
                                    <option value="LAYANAN">LAYANAN</option>
                                    <option value="DEPOSIT">DEPOSIT</option>
                                    <option value="PENGGUNA">PENGGUNA</option>
                                    <option value="PROMO">PROMO</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-12 control-label">Tipe</label>
                            <div class="col-md-12">
                                <select class="form-control" name="tipe" required>
                                    <option value="" selected disabled>Pilih Salah Satu</option>
                                    <option value="INFO">INFO</option>
                                    <option value="PERINGATAN">PERINGATAN</option>
                                    <option value="PENTING">PENTING</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-12 control-label">Title</label>
                            <div class="col-md-12">
                                <input type="text" name="title" class="form-control" placeholder="Title" required>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-12 control-label">Konten</label>
                            <div class="col-md-12">
                                <textarea type="text" name="konten" class="form-control" placeholder="Konten" required></textarea>
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