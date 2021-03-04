<!-- darurat, instal database -->

<?php
$db = new Database();
$dbh = $db->connect();
?>

<main>

    <div class="container-fluid">

        <div class="row">

            <div class="col-12">

                <h1>Kelola Layanan PPOB</h1>

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

                                    <th>ID layanan</th>

                                    <th>ID Provider</th>

                                    <th>Operator</th>

                                    <th>Nama Layanan</th>

                                    <th>Harga Normal</th>

                                    <th>Harga API/Reseller</th>

                                    <th>Status</th>

                                    <th>Provider</th>

                                    <th>Aksi</th>

                                </tr>

                            </thead>

                            <tbody>
                                <?php foreach ($data['allservicesppob'] as $data_layanan) : ?>



                                    <tr>

                                        <td><?php echo $data_layanan['service_id']; ?></td>

                                        <td><?php echo $data_layanan['provider_id']; ?></td>

                                        <td><?php echo $data_layanan['operator']; ?></td>

                                        <td><?php echo $data_layanan['layanan']; ?></td>

                                        <td><?php echo number_format($data_layanan['harga'], 0, ',', '.'); ?></td>

                                        <td><?php echo number_format($data_layanan['harga_api'], 0, ',', '.'); ?></td>

                                        <td><?php echo $data_layanan['status']; ?></td>

                                        <td><?php echo $data_layanan['provider']; ?></td>

                                        <td align="text-center">

                                            <a onclick="users('<?= BASEURL; ?>admin/updateservicetopup/<?= $data_layanan['service_id']; ?>')" class="btn btn-sm btn-warning"><i class="simple-icon-note" title="Ubah"></i></a>

                                            <a onclick="return confirm('Yakin?')" href="<?= BASEURL; ?>admin/deleteserviceppob/<?= $data_layanan['service_id']; ?>" class="btn btn-sm btn-danger"><i class="simple-icon-trash" title="Hapus"></i></a>

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

                    <form class="form-horizontal" role="form" method="POST" action="<?= BASEURL; ?>admin/addserviceppob">

                        <input type="hidden" name="csrf_token" value="<?php echo $config['csrf_token']; ?>">

                        <div class="form-group">

                            <label class="col-md-12 control-label">ID Layanan</label>

                            <div class="col-md-12">

                                <input type="text" name="sid" class="form-control" placeholder="ID Layanan">

                            </div>

                        </div>

                        <div class="form-group">

                            <label class="col-md-12 control-label">ID Provider</label>

                            <div class="col-md-12">

                                <input type="text" name="pid" class="form-control" placeholder="ID Provider">

                            </div>

                        </div>

                        <div class="form-group">

                            <label class="col-md-12 control-label">Tipe</label>

                            <div class="col-md-12">

                                <select class="form-control" name="tipe">

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

                        <div class="form-group">

                            <label class="col-md-12 control-label">Operator</label>

                            <div class="col-md-12">

                                <select class="form-control" name="operator">

                                    <option value="">Pilih Salah Satu...</option>

                                    <?php
                                    $cek_kategori = $dbh->prepare("SELECT * FROM kategori_layanan WHERE tipe = 'TOP UP' ORDER BY nama ASC");
                                    $cek_kategori->execute(); ?>



                                    <?php foreach ($cek_kategori->fetchAll(PDO::FETCH_ASSOC) as $data_kategori) {
                                    ?>

                                        <option value="<?php echo $data_kategori['kode']; ?>"><?php echo $data_kategori['nama']; ?></option>

                                    <?php
                                    } ?>

                                </select>

                            </div>

                        </div>

                        <div class="form-group">

                            <label class="col-md-12 control-label">Nama Layanan</label>

                            <div class="col-md-12">

                                <input type="text" name="layanan" class="form-control" placeholder="Nama Layanan">

                            </div>

                        </div>

                        <div class="form-group">

                            <label class="col-md-12 control-label">Deskripsi</label>

                            <div class="col-md-12">

                                <textarea type="text" name="deskripsi" class="form-control" placeholder="Deskripsi"></textarea>

                            </div>

                        </div>

                        <div class="form-group">

                            <label class="col-md-12 control-label">Harga WEB</label>

                            <div class="col-md-12">

                                <input type="number" name="harga" class="form-control" placeholder="Harga WEB">

                            </div>

                        </div>

                        <div class="form-group">

                            <label class="col-md-12 control-label">Harga API</label>

                            <div class="col-md-12">

                                <input type="number" name="harga_api" class="form-control" placeholder="Harga API">

                            </div>

                        </div>

                        <div class="form-group">

                            <label class="col-md-12 control-label">Status</label>

                            <div class="col-md-12">

                                <select class="form-control" name="status">

                                    <option value="">Pilih Salah Satu...</option>

                                    <option value="Normal">Normal</option>

                                    <option value="Gangguan">Gangguan</option>

                                </select>

                            </div>

                        </div>

                        <div class="form-group">

                            <label class="col-md-12 control-label">Provider</label>

                            <div class="col-md-12">

                                <select class="form-control" name="provider">

                                    <option value="">Pilih Salah Satu...</option>

                                    <?php
                                    $cek_provider = $dbh->prepare('SELECT * FROM provider_pulsa ORDER BY id ASC');
                                    $cek_provider->execute();
                                    foreach ($cek_provider->fetchAll() as $data_provider) {
                                    ?>

                                        <option value="<?php echo $data_provider['code']; ?>"><?php echo $data_provider['code']; ?></option>

                                    <?php
                                    } ?>

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

        $('#modal-detail').modal('show');

    }
</script>

<div class="row">

    <div class="col-md-12">

        <div class="modal fade" id="modal-detail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">

            <div class="modal-dialog modal-lg" role="document">

                <div class="modal-content">

                    <div class="modal-header">

                        <h4 class="modal-title mt-0" id="myModalLabel"><i class="fa fa-list text-primary"></i> Layanan</h4>

                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">

                            <span aria-hidden="true">&times;</span>

                        </button>

                    </div>

                    <div class="modal-body">

                        <form class="form-horizontal" role="form" method="POST" action="<?= BASEURL; ?>admin/updateserviceppob">

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

    </div>

</div>