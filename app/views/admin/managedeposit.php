<main>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h1>Kelola Deposit</h1>

                <div class="separator mb-5"></div>
            </div>
        </div>

        <div class="row mb-4">
            <div class="col-12 mb-4">
                <?php if (isset($_SESSION['hasil'])) : ?>
                    <div class="alert alert-<?= $_SESSION['hasil']['alert']; ?> alert-dismissible fade show  mb-0" role="alert">
                        <?= $_SESSION['hasil']['pesan'] ?>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div><br>
                <?php endif; ?>
                <?php unset($_SESSION['hasil']); ?>
                <div class="alert alert-info">
                    <h5>
                        * Klik Kode deposit untuk melihat detail deposit!<br>
                        * Jika mengubah status deposit menjadi success Maka saldo otomatis ditambahkan ke user terkait!
                    </h5>
                </div>
                <div class="card">
                    <div class="card-body">
                        <table class="data-table data-table-feature table-responsive col-12">
                            <thead>
                                <tr>
                                    <th>Tanggal</th>
                                    <th>Kode</th>
                                    <th>Username</th>
                                    <th>Metode</th>
                                    <th>Jumlah</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <?php foreach ($data['alldeposit'] as $deposit) : ?>
                                <tbody>
                                    <tr>
                                        <td><?= $deposit['date']; ?> <br> <?= $deposit['time']; ?></td>
                                        <td> <a onclick="detaildeposit('<?= $deposit['kode_deposit']; ?>')" data-toggle="modal" data-target=".detailmodal">
                                                <span class="badge badge-primary detailuser"><?= $deposit['kode_deposit']; ?></span>
                                            </a>
                                        </td>
                                        <td> <?= $deposit['username']  ?></td>
                                        <td><?= $deposit['tipe']; ?> <br>
                                            (<?= $deposit['provider']; ?>)</td>
                                        <td><?= $deposit['jumlah_transfer']; ?></td>
                                        <td>
                                            <form action="<?= BASEURL; ?>admin/updatedeposit" method="POST">
                                                <input type="hidden" name="id" value="<?= $deposit['kode_deposit']; ?>">
                                                <input type="hidden" name="username" value="<?= $deposit['username']; ?>">
                                                <input type="hidden" name="getsaldo" value="<?= $deposit['get_saldo']; ?>">
                                                <select class="form-control" style="width: 150px;" name="status">
                                                    <?php if ($deposit['status'] == "Success") { ?>
                                                        <option value="<?php echo $deposit['status']; ?>" selected disabled><?php echo $deposit['status']; ?></option>
                                                </select>
                                            </form>

                                        <?php } else if ($deposit['status'] == 'Pending') { ?>
                                            <option value="<?php echo $deposit['status']; ?>" selected disabled><?php echo $deposit['status']; ?></option>
                                            <option value="Success">Success</option>
                                            <option value="Error">Error</option>
                                            </select>
                                            <button type="submit" class="badge badge-success">Ubah status</button>
                                            </form>
                                        <?php
                                                    } else if ($deposit['status'] == 'Error') { ?>
                                            <option value="<?php echo $deposit['status']; ?>" selected disabled><?php echo $deposit['status']; ?></option>
                                            <option value="Success">Success</option>
                                            <option value="Pending">Pending</option>
                                            </select>
                                            <button type="submit" class="badge badge-success">Ubah status</button>
                                            </form>
                                        <?php }
                                        ?>
                                        <a onclick="return confirm('yakin mau hapus?')" href="<?= BASEURL; ?>admin/deletedeposit/<?= $deposit['kode_deposit']; ?>">
                                            <span class="badge badge-danger">Delete Deposit</span>
                                        </a>


                                        </td>
                                        <!-- edit deposit -->
                                    </tr>
                                </tbody>
                            <?php endforeach; ?>
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

    <!-- modal infoo -->
    <div class="modal fade" id="modalinfo" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalContentLabel">New message</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body bodymodalinformasi">

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Send message</button>
                </div>
            </div>
        </div>
    </div>
</main>

<script>
    function detaildeposit(id) {
        $('.modal-title').html(`Detail deposit ` + id + ``);
        $.ajax({
            url: url.concat('admin/detaildeposit'),
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

    function editdeposit(id) {
        var status = $('.statusdeposit').val()
        console.log(status);


    }
</script>