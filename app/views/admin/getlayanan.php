<main>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h1>Kelola operan & layanan</h1>

                <div class="separator mb-5"></div>
            </div>
        </div>

        <div class="row mb-4">
            <?php if (isset($_SESSION['hasil'])) : ?>
                <div class="alert alert-<?= $_SESSION['hasil']['alert']; ?> alert-dismissible fade show  mb-0" role="alert">
                    <?= $_SESSION['hasil']['pesan'] ?>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div><br>
            <?php endif; ?>
            <?php unset($_SESSION['hasil']); ?>
            <div class="col-lg-12 col-md-12 mb-4">
                <div class="card">
                    <div class="col-6 text-left mb-3 mt-3">
                        <button data-toggle="modal" data-target="#addprovidersosmed" class="btn btn-primary btn-sm"><i class="simple-icon-plus"></i> Tambah</button>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Sosial Media Layanan</h5>
                        <table class="table table-responsive">
                            <thead>
                                <tr>
                                    <th scope="col">Nama Provider</th>
                                    <th scope="col">Aksi</th>
                                    <th scope="col">Aksi layanan</th>
                                    <th scope="col">Hapus layanan</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($data['providersosmed'] as $sosmed) : ?>
                                    <tr>
                                        <td>
                                            <!-- Nama provider sekaligus tombol detail -->
                                            <a onclick="detailprovider('<?= $sosmed['code']; ?>','sosmed')" class="badge badge-primary text-light">
                                                <?= $sosmed['code']; ?>
                                            </a>

                                        </td>
                                        <td>
                                            <!-- aksi hapus dan edit -->
                                            <a onclick="editprovider('<?= $sosmed['code']; ?>','sosmed')" class="badge badge-warning">Edit</a>
                                            <a onclick="return confirm('Yakin?')" href="<?= BASEURL; ?>admin/deleteprovider/<?= $sosmed['code']; ?>/provider" class="badge badge-danger">Hapus</a>
                                        </td>
                                        <td>
                                            <!-- aksi ambil kategori dan layanan -->
                                            <a href="<?= BASEURL; ?>ambildata/kategorisosmed/<?= $sosmed['code']; ?>" class="badge badge-info">Get kategori</a>
                                            <a href="<?= BASEURL; ?>ambildata/layanansosmed/<?= $sosmed['code']; ?>" class="badge badge-success">Get Layanan</a>
                                            <a href="<?= BASEURL; ?>ambildata/statussosmed/<?= $sosmed['code']; ?>" class="badge badge-secondary">Update status</a>
                                        </td>
                                        <td>
                                            <!-- aksi ambil kategori dan layanan -->
                                            <a href="<?= BASEURL; ?>admin/deletekategori/sosmed" class="badge badge-danger">Hapus Kategori</a>
                                            <a href="<?= BASEURL; ?>admin/deletelayanansosmed/<?= $sosmed['code']; ?>" class="badge badge-danger">Hapus Layanan</a>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- ppob -->
            <div class="col-lg-12 col-md-12 mb-4">
                <div class="card">
                    <div class="col-6 text-left mb-3 mt-3">
                        <button data-toggle="modal" data-target="#addproviderppob" class="btn btn-primary btn-sm"><i class="simple-icon-plus"></i> Tambah</button>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Setting Provider & Layanan PPOB</h5>
                        <table class="table table-responsive">
                            <thead>
                                <tr>
                                    <th scope="col">Nama Provider</th>
                                    <th scope="col">Aksi</th>
                                    <th scope="col">Aksi layanan</th>
                                    <th scope="col">Hapus layanan</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($data['providerppob'] as $ppob) : ?>
                                    <tr>
                                        <td>
                                            <!-- Nama provider sekaligus tombol detail -->
                                            <a onclick="detailprovider('<?= $ppob['code']; ?>','PPOB')" class="badge badge-primary text-light">
                                                <?= $ppob['code']; ?>
                                            </a>

                                        </td>
                                        <td>
                                            <!-- aksi hapus dan edit -->
                                            <a onclick="editprovider('<?= $ppob['code']; ?>','PPOB')" class="badge badge-warning">Edit</a>
                                            <a onclick="return confirm('Yakin?')" href="<?= BASEURL; ?>admin/deleteprovider/<?= $ppob['code']; ?>/provider_pulsa" class="badge badge-danger">Hapus</a>
                                        </td>
                                        <td>
                                            <!-- aksi ambil kategori dan layanan -->
                                            <a href="<?= BASEURL; ?>ambildata/kategorippob" class="badge badge-info">Get kategori</a>
                                            <a href="<?= BASEURL; ?>ambildata/layananppob" class="badge badge-success">Get Layanan</a>
                                        </td>
                                        <td>
                                            <!-- aksi ambil kategori dan layanan -->
                                            <a href="<?= BASEURL; ?>admin/deletekategori/ppob" class="badge badge-danger">Hapus Kategori</a>
                                            <a href="<?= BASEURL; ?>admin/deletelayananppob/<?= $ppob['code']; ?>" class="badge badge-danger">Hapus Layanan</a>
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

<!-- modal layanan  -->
<div class="modal fade modalprovidersosmed" tabindex="-1" role="dialog" aria-hidden="true">
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
<!-- Sampai sini modal layanan -->

<!-- modal add provider sosmed  -->
<div class="col-md-12">
    <div class="modal fade" id="addprovidersosmed" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title m-t-0 id=" myModalLabel""><i class="fa fa-cog"></i> Tambah Provider Layanan Sosmed</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form" method="POST" action="<?= BASEURL; ?>admin/addprovidersosmed">
                        <div class="form-group">
                            <label class="col-md-12 control-label">Kode Provider</label>
                            <div class="col-md-12">
                                <input type="hidden" name="jenis" class="form-control" value="provider">
                                <input type="text" name="code" class="form-control" placeholder="Kode Provider" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-12 control-label">Link Provider</label>
                            <div class="col-md-12">
                                <input type="text" name="link" class="form-control" placeholder="Link Provider" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-12 control-label">Link Service Provider</label>
                            <div class="col-md-12">
                                <input type="text" name="link_service" class="form-control" placeholder="Link Provider" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-12 control-label">API Key</label>
                            <div class="col-md-12">
                                <input type="text" name="api_key" class="form-control" placeholder="API Key" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-12 control-label">API ID <small class="text-danger">*Kosongkan Jika Tidak Dibutuhkan.</small></label>
                            <div class="col-md-12">
                                <input type="text" name="api_id" class="form-control" placeholder="API ID" required>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="reset" class="btn btn-danger"><i class="fa fa-spinner"></i> Ulangi</button>
                            <button type="submit" class="btn btn-primary" name="tambah_top_up"><i class="fa fa-plus"></i> Tambah</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Sampai sini modal add provider sosmed -->
<!-- modal add provider ppob  -->
<div class="col-md-12">
    <div class="modal fade" id="addproviderppob" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title m-t-0 id=" myModalLabel""><i class="fa fa-cog"></i> Tambah Provider Layanan PPOB</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form" method="POST" action="<?= BASEURL; ?>admin/addprovidersosmed">
                        <div class="form-group">
                            <label class="col-md-12 control-label">Kode Provider</label>
                            <div class="col-md-12">
                                <input type="hidden" name="jenis" class="form-control" value="provider_pulsa" required>
                                <input type="text" name="code" class="form-control" placeholder="Kode Provider" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-12 control-label">Link Provider</label>
                            <div class="col-md-12">
                                <input type="text" name="link" class="form-control" placeholder="Link Provider" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-12 control-label">Link Service Provider</label>
                            <div class="col-md-12">
                                <input type="text" name="link_service" class="form-control" placeholder="Link Provider" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-12 control-label">API Key</label>
                            <div class="col-md-12">
                                <input type="text" name="api_key" class="form-control" placeholder="API Key" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-12 control-label">API ID <small class="text-danger">*Kosongkan Jika Tidak Dibutuhkan.</small></label>
                            <div class="col-md-12">
                                <input type="text" name="api_id" class="form-control" placeholder="API ID" required>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="reset" class="btn btn-danger"><i class="fa fa-spinner"></i> Ulangi</button>
                            <button type="submit" class="btn btn-primary" name="tambah_top_up"><i class="fa fa-plus"></i> Tambah</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Sampai sini modal add provider ppob -->

<script>
    function detailprovider(code, provider) {
        $('.modalprovidersosmed').modal()
        $('.modaluser').modal();
        $('.modal-title').html(`Detail Provider ` + code + ``);
        $.ajax({
            url: url.concat('admin/detailprovider'),
            type: 'post',
            dataType: 'html',
            data: {
                code: code,
                provider: provider
            },
            beforeSend: function() {
                $('.bodymodaldetail').html('mohon tunggu');
            },
            success: function(result) {
                $('.bodymodaldetail').html(result);
            }
        })
    }

    function editprovider(code, provider) {
        $('.modalprovidersosmed').modal()
        $('.modaluser').modal();
        $('.modal-title').html(`Edit Provider ` + code + ``);
        $.ajax({
            url: url.concat('admin/editprovider'),
            type: 'post',
            dataType: 'html',
            data: {
                code: code,
                provider: provider
            },
            beforeSend: function() {
                $('.bodymodaldetail').html('Mohon tunggu...');
            },
            success: function(result) {
                $('.bodymodaldetail').html(result);
            }
        })
    }
</script>