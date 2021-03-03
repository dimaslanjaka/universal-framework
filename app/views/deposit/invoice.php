<main>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h1>Invoice</h1>
                <nav class="breadcrumb-container d-none d-sm-block d-lg-inline-block" aria-label="breadcrumb">
                    <ol class="breadcrumb pt-0">
                        <li class="breadcrumb-item">
                            <a href="#">Home</a>
                        </li>
                        <li class="breadcrumb-item">
                            <a href="#">Library</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Data</li>
                    </ol>
                </nav>
                <div class="separator mb-5"></div>
            </div>
        </div>


        <?php if (isset($_SESSION['hasil'])) : ?>
            <div class="alert alert-<?= $_SESSION['hasil']['alert']; ?> alert-dismissible fade show  mb-0 col-12" role="alert">
                <?= $_SESSION['hasil']['pesan']; ?>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <?php unset($_SESSION['hasil']); ?>
        <?php endif; ?>
        <div class="row invoice">
            <div class="col-12 card container">
                <div class="invoice-contents" leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="background-color:#ffffff; height:auto; max-width:830px; font-family: Helvetica,Arial,sans-serif !important; position: relative;">
                    <table class="" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" style="width:100%; background-color:#ffffff;border-collapse:separate !important; border-spacing:0;color:#242128; margin:0;padding-top:30px;padding-bottom:30px;padding-right:30px;" heigth="auto">


                        <?php $deposit = $data['data_depo']; ?>
                        <tbody>
                            <tr>
                                <td align="left" valign="center" style="padding-bottom:35px; padding-top:15px; border-top:0;width:100% !important;">
                                    <img src="https://coloredstrategies.com/mailing/dore.png" />
                                </td>
                                <td align="right" valign="center" style="padding-bottom:35px; padding-top:15px; border-top:0;width:100% !important;">
                                    <p style="color: #8f8f8f; font-weight: normal; line-height: 1.2; font-size: 12px; white-space: nowrap; ">
                                        <?= WEB_NAME; ?><br> Bogor, indonesia 16640<br>784
                                        451 12 47
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style="padding-top:30px; border-top:1px solid #f1f0f0">
                                    <table style="width: 100%;">
                                        <tbody>
                                            <tr>
                                                <td style="vertical-align:middle; border-radius: 3px; padding:30px; background-color: #f9f9f9; border-right: 5px solid white;">
                                                    <p style="color:#303030; font-size: 14px;  line-height: 1.6; margin:0; padding:0;">
                                                        <span class="text-dark">Diatagih kepada :</span><br> <?= $data['user']['username'] ?><br><?= $data['user']['email']; ?>
                                                    </p>
                                                </td>

                                                <td style="text-align: right; padding-top:0px; padding-bottom:0; vertical-align:middle; padding:30px; background-color: #f9f9f9; border-radius: 3px; border-left: 5px solid white;">
                                                    <p style="color:#8f8f8f; font-size: 14px; padding: 0; line-height: 1.6; margin:0; ">
                                                        Invoice #: <?= $deposit['kode_deposit'] ?>1<br>
                                                        <?= $deposit['date'] ?> - <?= $deposit['time']; ?>
                                                    </p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table style="width: 100%; margin-top:40px;">
                                        <thead>
                                            <tr>
                                                <th style="text-align:center; font-size: 10px; color:#8f8f8f; padding-bottom: 15px;">
                                                    Pembayaran melalui
                                                </th>
                                                <th style="text-align:center; font-size: 10px; color:#8f8f8f; padding-bottom: 15px;">
                                                    Jumlah Transfer
                                                </th>
                                                <th style="text-align:center; font-size: 10px; color:#8f8f8f; padding-bottom: 15px;">
                                                    Saldo didapat
                                                </th>

                                                <th style="text-align:center; font-size: 10px; color:#8f8f8f; padding-bottom: 15px;">
                                                    Tujuan Transfer
                                                </th>
                                                <th style="text-align:center; font-size: 10px; color:#8f8f8f; padding-bottom: 15px;">
                                                    Catatan
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style="padding: 10px;">
                                                    <h4>
                                                        <?= $deposit['provider']; ?></h4>
                                                </td>
                                                <td style="padding: 10px;">
                                                    <p>
                                                        Rp <?= number_format($deposit['jumlah_transfer'], 0, ',', '.'); ?></p>
                                                </td>
                                                <td>
                                                    Rp <?= number_format($deposit['get_saldo'], 0, ',', '.'); ?></p>
                                                </td>
                                                <td style="padding: 10px;">
                                                    <p style="font-size: 13px; ">
                                                        <?= $deposit['penerima']; ?></p>
                                                </td>
                                                <td style="padding: 10px;">
                                                    <p style="font-size: 13px; ">
                                                        <?= $deposit['catatan']; ?></p>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table>
                        <tr>
                            <td colspan=" 3" style="border-top:1px solid #f1f0f0">&nbsp;
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="width: 100%">
                                <p href="#" style="font-size: 13px; text-decoration: none; line-height: 1.6; color:#909090; margin-top:0px; margin-bottom:0; text-align: right;">
                                    Total : </p>
                            </td>
                            <td style="padding-top:0px; text-align: right;">
                                <p style="font-size: 13px; line-height: 1.6; color:#303030; margin-bottom:0; margin-top:0; vertical-align:top; white-space:nowrap; margin-left:15px">
                                    Rp <?= number_format($deposit['jumlah_transfer'], 0, ',', '.'); ?></p>
                            </td>
                        </tr>
                        <?php
                        $pajak = $deposit['jumlah_transfer'] - $deposit['get_saldo'];
                        ?>
                        <tr>
                            <td colspan="2" style="width: 100%">
                                <p href="#" style="font-size: 13px; text-decoration: none; line-height: 1.6; color:#909090; margin-top:0px; margin-bottom:0; text-align: right;">
                                    Pajak : </p>
                            </td>
                            <td style="padding-top:0px; text-align: right;">
                                <p style="font-size: 13px; line-height: 1.6; color:#303030; margin-bottom:0; margin-top:0; vertical-align:top; white-space:nowrap; margin-left:15px">
                                    <?= $pajak; ?></p>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="width: 100%">
                                <p href="#" style="font-size: 13px; text-decoration: none; line-height: 1.6; color:#909090; margin-top:0px; margin-bottom:0; text-align: right;">
                                    Status : </p>
                            </td>
                            <?php if ($deposit['status'] == 'Success') {
                                $status = 'Sudah Dibayar';
                                $alert = 'success';
                            } else if ($deposit['status'] == 'Pending') {
                                $status = 'Belum Dibayar';
                                $alert = 'warning';
                            }
                            ?>
                            <td style="padding-top:0px; text-align: right;">
                                <div class="badge badge-<?= $alert; ?>">
                                    <p style="font-size: 13px; line-height: 1.6;margin-bottom:0; margin-top:0; vertical-align:top; white-space:nowrap; margin-left:5px">
                                        <?= $status ?></p>
                                </div>
                            </td>
                        </tr>



                    </table>
                </div>
                <div class="tombol mt-10 mb-20" style="padding: 20px;">
                    <a onclick="window.print(); return false;" class="btn btn-primary" href="#">Print</a>
                    <?php if ($deposit['status'] != 'Success') : ?>
                        <a class="btn btn-danger" href="<?= BASEURL; ?>deposit/batalkandeposit/<?= $deposit['kode_deposit']; ?>">Batalkan</a>
                        <a class="btn btn-success" href="<?= BASEURL; ?>deposit/konfirmasideposit/<?= $deposit['kode_deposit']; ?>/<?= $deposit['jumlah_transfer']; ?>">Sudah Transfer</a>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
    </div>
</main>