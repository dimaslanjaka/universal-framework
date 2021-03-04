<main>

    <div class="container-fluid">

        <div class="row">

            <div class="col-12">

                <h1>Kelola FAQ</h1>

                <div class="separator mb-5"></div>

            </div>

        </div>



        <?php if (isset($_SESSION['hasil'])) : ?>

            <div class="alert alert-<?= $_SESSION['hasil']['alert']; ?> alert-dismissible fade show  mb-0" role="alert">

                <?= $_SESSION['hasil']['pesan']; ?>

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

                                    <th>Number</th>

                                    <th>Tipe</th>

                                    <th>Title</th>

                                    <th>konten</th>

                                    <th>Aksi</th>









                                </tr>

                            </thead>

                            <tbody>

                                <?php foreach ($data['allfaqs'] as $faqs) : ?>



                                    <tr>

                                        <td><span class="badge badge-success"><?= $faqs['number']; ?></span></td>

                                        <td><span class="badge badge-warning"><?= $faqs['tipe']; ?></span></td>

                                        <td><?= $faqs['title']; ?></td>

                                        <td><?= $faqs['konten']; ?></td>

                                        <td align="center">



                                            <a href="<?= BASEURL; ?>admin/deletefaq/<?= $faqs['id']; ?>" class="btn btn-sm btn-danger"><i class="simple-icon-trash" title="Hapus"></i></a>

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

                        <input type="hidden" name="csrf_token" value="<?php echo $config['csrf_token']; ?>">

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

                    <form class="form-horizontal" role="form" method="POST" action="<?= BASEURL; ?>admin/addfaq">

                        <input type="hidden" name="csrf_token" value="<?php echo $config['csrf_token']; ?>">

                        <div class="form-group row">

                            <label class="col-md-12 control-label">Number</label>

                            <div class="col-md-12">

                                <input type="text" name="number" class="form-control" placeholder="Contoh : One, Two, Three, Four, Five">

                            </div>

                        </div>

                        <div class="form-group row">

                            <label class="col-md-12 control-label">Tipe</label>

                            <div class="col-md-12">

                                <select class="form-control" name="tipe">

                                    <option value="">Pilih Salah Satu</option>

                                    <option value="Akun">Akun</option>

                                    <option value="Pesanan">Pesanan</option>

                                    <option value="Sosial Media">Sosial Media</option>

                                    <option value="Top Up">Top Up</option>

                                    <option value="Isi Saldo">Isi Saldo</option>

                                    <option value="Koin">Koin</option>

                                    <option value="Voucher">Voucher</option>

                                    <option value="Pengembalian Dana">Pengembalian Dana</option>

                                    <option value="Status">Status</option>

                                    <option value="API Dokumentasi">API Dokumentasi</option>

                                </select>

                            </div>

                        </div>

                        <div class="form-group row">

                            <label class="col-md-12 control-label">Title</label>

                            <div class="col-md-12">

                                <input type="text" name="title" class="form-control" placeholder="Title">

                            </div>

                        </div>

                        <div class="form-group row">

                            <label class="col-md-12 control-label">Konten</label>

                            <div class="col-md-12">

                                <textarea type="text" name="konten" class="form-control" placeholder="Konten"></textarea>

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