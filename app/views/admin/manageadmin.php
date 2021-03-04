<main>

    <div class="container-fluid">

        <div class="row">

            <div class="col-12">

                <h1>Kelola Admin</h1>

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



                        <table class="table table-responsive table-hover table-checkable" id="kt_table_1">

                            <thead>

                                <tr>

                                    <th>Nama Lengkap</th>

                                    <th>Jabatan</th>

                                    <th>Deskripsi</th>

                                    <th>Alamat Rumah</th>

                                    <th>Jam Kerja</th>

                                    <th>Email</th>

                                    <th>Nomor WhatsApp</th>

                                    <th>Link Facebook</th>

                                    <th>Link Instagram</th>

                                    <th>Aksi</th>

                                </tr>

                            </thead>

                            <tbody>

                                <?php foreach ($data['alladmins'] as $admins) : ?>

                                    <tr>

                                        <td><?= $admins['nama']; ?></td>

                                        <td><?= $admins['jabatan']; ?></td>

                                        <td><?= $admins['deskripsi']; ?></td>

                                        <td><?= $admins['lokasi']; ?></td>

                                        <td><?= $admins['jam_kerja']; ?></td>

                                        <td><?= $admins['email']; ?></td>

                                        <td><?= $admins['no_hp']; ?></td>

                                        <td><?= $admins['link_fb']; ?></td>

                                        <td><?= $admins['link_ig']; ?></td>

                                        <td align="center">
                                            <a href="javascript:;" onclick="users('<?= BASEURL; ?>admin/editadmin/<?= $admins['id']; ?>')" class="btn btn-sm btn-warning"><i class="iconsminds-folder-edit" title="Ubah"></i></a>

                                            <a onclick="return confirm('yakin?')" href="<?= BASEURL; ?>admin/deleteadmin/<?= $admins['id']; ?>" class="btn btn-sm btn-danger"><i class="simple-icon-trash" title="Hapus"></i></a>

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

                    <form class="form-horizontal" role="form" method="POST" action="<?= BASEURL; ?>admin/submiteditadmin">

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

                    <form class="form-horizontal" role="form" method="POST" action="<?= BASEURL; ?>admin/addadmins">

                        <input type="hidden" name="csrf_token" value="<?php echo $config['csrf_token']; ?>">

                        <div class="form-group">

                            <label class="col-md-12 control-label">Nama Lengkap</label>

                            <div class="col-md-12">

                                <input type="text" name="nama" class="form-control" placeholder="Nama Lengkap" required>

                            </div>

                        </div>

                        <div class="form-group">

                            <label class="col-md-12 control-label">Jabatan</label>

                            <div class="col-md-12">

                                <input type="text" name="jabatan" class="form-control" placeholder="Jabatan" required>

                            </div>

                        </div>

                        <div class="form-group">

                            <label class="col-md-12 control-label">Deskripsi</label>

                            <div class="col-md-12">

                                <input type="text" name="deskripsi" class="form-control" placeholder="Deskripsi" required>

                            </div>

                        </div>

                        <div class="form-group">

                            <label class="col-md-12 control-label">Alamat Rumah</label>

                            <div class="col-md-12">

                                <input type="text" name="lokasi" class="form-control" placeholder="Alamat Rumah" required>

                            </div>

                        </div>

                        <div class="form-group">

                            <label class="col-md-12 control-label">Jam Kerja</label>

                            <div class="col-md-12">

                                <input type="text" name="jam_kerja" class="form-control" placeholder="Jam Kerja" required>

                            </div>

                        </div>

                        <div class="form-group">

                            <label class="col-md-12 control-label">Email</label>

                            <div class="col-md-12">

                                <input type="email" name="email" class="form-control" placeholder="Email" required>

                            </div>

                        </div>

                        <div class="form-group">

                            <label class="col-md-12 control-label">Nomor WhatsApp</label>

                            <div class="col-md-12">

                                <input type="number" name="no_hp" class="form-control" placeholder="Nomor WhatsApp" required>

                            </div>

                        </div>

                        <div class="form-group">

                            <label class="col-md-12 control-label">Link Facebook</label>

                            <div class="col-md-12">

                                <input type="text" name="link_fb" class="form-control" placeholder="Link Facebook" required>

                            </div>

                        </div>

                        <div class="form-group">

                            <label class="col-md-12 control-label">Link Instagram</label>

                            <div class="col-md-12">

                                <input type="text" name="link_ig" class="form-control" placeholder="Link Instagram" required>

                            </div>

                        </div>

                        <div class="modal-footer">

                            <button type="reset" class="btn btn-danger"><i class="fa fa-spinner"></i> Ulangi</button>

                            <button type="submit" class="btn btn-primary" name="tambah_admin"><i class="fa fa-plus"></i> Tambah</button>

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