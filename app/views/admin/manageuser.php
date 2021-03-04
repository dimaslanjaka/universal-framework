<!-- darurat, instal database -->
<?php
$db = new Database();
$dbh = $db->connect();
?>
<main>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h1>Kelola Layanan SM</h1>
                <div class="separator mb-5"></div>
            </div>
        </div>
        <div class="alert alert-warning   mb-2" role="alert">
            <i class="simple-icon-info"> Klik username untuk melihat detail user!</i>
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

            <div class="col-12 mb-4">
                <div class="card">
                    <div class="card-body">
                        <table class="data-table data-table-feature table-responsive">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th style="display: none;"></th>
                                    <th>Username</th>
                                    <th>Nama Lengkap</th>
                                    <th>Nomor HP</th>
                                    <th>Email</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                            <?php $no = 1; ?>
                                <?php foreach ($data['allusers'] as $user) : ?>
                                    <tr>
                                    <td><?= $no; ?></td>
                                        <td style="display:none"><?= $user['id']; ?> </td>
                                        <!-- username dan detail user -->
                                        <td>
                                            <a onclick="detailuser(<?= $user['id']; ?>)" class="badge badge-primary text-light">
                                                <?= $user['username']; ?>
                                            </a>
                                        </td>
                                        <!--  -->
                                        <td><?php echo $user['nama_depan']; ?> <?= $user['nama_belakang']; ?></td>
                                        <td><?php echo $user['no_hp']; ?></td>
                                        <td><?php echo $user['email']; ?></td>
                                        <td>
                                            <a onclick="edituser(<?= $user['id']; ?>)" class="badge badge-warning text-light m-1"> Edit user </a>
                                            <!-- detail -->
                                            <a href="<?= BASEURL; ?>admin/deleteuser/<?= $user['id']; ?>" onclick="return confirm('yakin?');" class="badge badge-danger m-1">
                                                Hapus User
                                            </a>
                                        </td>

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
    <!-- modal detail user -->
    <div class="modal fade modaluser" tabindex="-1" role="dialog" aria-hidden="true">
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
<script>
    //  $('#app-container').removeClass('show-spinner');


    function detailuser(id) {
        $('.modaluser').modal();
        $('.modal-title').html(`Detail user ` + id + ``);
        $.ajax({
            url: url.concat('admin/detailuser'),
            type: 'post',
            dataType: 'html',
            data: {
                id: id
            },
            success: function(result) {
                $('.bodymodaldetail').html(result);
            }
        })
    }

    function edituser(id) {
        $('.modaluser').modal();
        $('.modal-title').html(`Edit user ` + id + ``);
        $.ajax({
            url: url.concat('admin/edituser'),
            type: 'post',
            dataType: 'html',
            data: {
                id: id
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