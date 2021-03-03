<main>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h1>Kelola Pesanan PPOB</h1>

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
                <div class="alert alert-warning">
                    <h5>
                        * Klik Kode ID Order untuk melihat detail Orderan!<br>

                    </h5>
                </div>
                <div class="card">
                    <div class="card-body">
                        <table class="data-table data-table-feature table-responsive col-12">
                            <thead>
                                <tr>
                                <th>#</th>
                                    <th>tanggal</th>
                                    <th>Order ID</th>
                                    <th>Provider ID</th>
                                    <th>Username</th>
                                    <th>No SN/Keterangan</th>
                                    <th>Status</th>

                                </tr>
                            </thead>
                            <?php $no = 1; ?>
                            <?php foreach ($data['arrayordersppob'] as $orderppob) : ?>
                                <tbody>
                                    <tr>
                                    <td><?= $no; ?></td>
                                        <td><?= tanggal_indo($orderppob['date']); ?> <br> <?= $orderppob['time']; ?></td>
                                        <td><a onclick="detailorder('<?= $orderppob['oid']; ?>')" data-toggle="modal" data-target=".detailmodal">
                                                <span class="badge badge-primary">
                                                    <?= $orderppob['oid']; ?> </td>
                                        </span>
                                        </a>

                                        <!-- td keterangan -->
                                        <td width="5%"><span class="badge badge-info"><?php echo $orderppob['provider_oid']; ?></span></td>
                                        <td><?= $orderppob['user']; ?></td>
                                        <td style="min-width: 200px;">
                                            <div class="input-group">
                                                <input type="text" class="form-control form-control-sm" name="keterangan" value="<?php echo $orderppob['keterangan']; ?>" id="keterangan-<?php echo $orderppob['oid']; ?>">
                                                <button data-toggle="tooltip" title="Copy Keterangan" class="badge badge-primary" type="button" onclick="copy_to_clipboard('keterangan-<?php echo $orderppob['oid']; ?>')"><i class="iconsminds-files text-warning"></i></button>
                                            </div>
                                        </td>
                                        <!-- td status + tombol -->
                                        <td>
                                            <form action="<?= BASEURL; ?>admin/updateorderppob" method="POST">
                                                <input type="hidden" name="id" value="<?= $orderppob['oid']; ?>">
                                                <select class="form-control" style="width: 150px;" name="status">
                                                    <?php if ('Success' == $orderppob['status']) { ?>
                                                        <option value="<?php echo $orderppob['status']; ?>" selected disabled><?php echo $orderppob['status']; ?></option>
                                                </select>
                                            </form>

                                        <?php } elseif ('Pending' == $orderppob['status']) { ?>
                                            <option value="<?php echo $orderppob['status']; ?>" selected disabled><?php echo $orderppob['status']; ?></option>
                                            <option value="Success">Success</option>
                                            <option value="Error">Error</option>
                                            </select>
                                            <button type="submit" class="badge badge-success">Ubah status</button>
                                            </form>
                                        <?php
                          } elseif ('Error' == $orderppob['status']) { ?>
                                            <option value="<?php echo $orderppob['status']; ?>" selected disabled><?php echo $orderppob['status']; ?></option>
                                            <option value="Success">Success</option>
                                            <option value="Pending">Pending</option>
                                            </select>
                                            <button type="submit" class="badge badge-success">Ubah</button>
                                            </form>
                                        <?php }
                    ?>
                                        <a onclick="return confirm('yakin mau hapus?')" href="<?= BASEURL; ?>admin/deleteorderppob/<?= $orderppob['oid']; ?>">
                                            <span class="badge badge-danger">Delete</span>
                                        </a>


                                        </td>


                                    </tr>
                                </tbody>
                                <?php ++$no; ?>
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



    function copy_to_clipboard(element) {
        var copyText = document.getElementById(element);
        copyText.select();
        document.execCommand("copy");
    }

    function detailorder(id) {
        $('.modal-title').html(`Detail Pesanan ` + id + ``);
        $.ajax({
            url: url.concat('admin/detailorderppob'),
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
</script>