<main>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h1>Redem Voucher</h1>
                <nav class="breadcrumb-container d-none d-sm-block d-lg-inline-block" aria-label="breadcrumb">

                </nav>
                <div class="separator mb-5"></div>
            </div>
        </div>
        <div class="container content">



            <div class="row">
                <div class="card col-lg-6 col-12">
                    <div class="box card-body p-4 text-center">
                        <img src="https://tripay.co.id/member-page/asset/icons/voucher.png" alt="voucher" class="voucher__img" style="margin:auto;">
                        <div class="text-gray text-center mt-lg-5 mt-4">
                            Masukkan Kode Voucher dan Tekan tombol Redeem untuk redeem voucher, saldo voucher akan masuk ke saldo <?= WEB_NAME; ?> anda.
                        </div>
                        <form class="custom__form mt-5">
                            <div class="form-group ">
                                <!--  -->
                                <div class="alert-notif" style="display: none;">

                                </div>
                                <!--  -->
                                <label for="nomorHP">Kode Voucher</label>
                                <div class="input-group mb-3">
                                    <input type="text" name="=" voucher" class="form-control only__border-bottom" placeholder="Masukan voucher.." aria-label="" aria-describedby="basic-addon1" id="voucher" autocomplete="off" required>
                                </div>
                                <small class="text-danger text-notif" style="display: none;">*Wajib diisi</small>
                            </div>
                            <div class="d-flex justify-content-center mt-5 pt-2 mb-3">
                                <button type="button" class="btn btn-info shadow pl-4 pr-4 pt-2 pb-2 redemvoucher">
                                    Redeem Voucher
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="card col-lg-6 col-12 mt-5">

                    <div class="card-body p-4">
                        <h5>Riwayat redem Voucher</h5>
                        <div class="">
                            <table class="data-table data-tables-pagination responsive nowrap" data-order="[[ 1, &quot;desc&quot; ]]">
                                <thead>

                                    <tr>
                                        <th>Kode Voucher</th>
                                        <th>Jumlah</th>
                                        <th>Status</th>
                                        <th>Tanggal</th>
                                    </tr>

                                </thead>
                                <tbody>



                                    <?php foreach ($data['riwayat'] as $riwayat) : ?>
                                        <tr>
                                            <td>
                                                <div class="badge badge-secondary">
                                                    <?= $riwayat['kode']; ?>
                                                </div>
                                            </td>
                                            <td>
                                                <?= $riwayat['jumlah_saldo']; ?>
                                            </td>
                                            <td>
                                                <div class="badge badge-success">Success</div>
                                            </td>
                                            <td>
                                                <?= $riwayat['tanggal_redem']; ?>
                                            </td>
                                        <?php endforeach; ?>



                                        </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-4">
                <div class="card col-12">
                    <div class="mb-5">
                        <h5 class="card-title pt-4">Dimana mendapatkan Kode voucher?</h5>
                        <p>Silahkan datang ke alfamart terdekat.
                            Tanyakan pada kasih untuk melakukan top up gopay.
                            Berikan Nomer Gopay .
                            Lakukan Top Up gopay sesuai yang anda inginkan.
                            Simpan Struk pembelian anda.
                            Masukan ID Transaksi Gopay anda di menu voucher.
                            Selesai,Saldo Berhasil di Tambahkan.
                        </p>

                    </div>
                </div>
            </div>
        </div>
        <?php unset($_SESSION['hasil']); ?>
</main>

<script>
    $(document).ready(function() {

        $('.redemvoucher').on('click', function() {

            var $voucher = $('#voucher').val();
            if ($voucher.length == 0) {
                $('.text-notif').show();
            } else {
                $('.text-notif').hide()

                $.ajax({
                    url: url.concat('deposit/redemvoucher'),
                    type: 'post',
                    dataType: 'html',
                    data: {
                        voucher: $voucher
                    },
                    success: function(hasil) {
                        $('.alert-notif').html(hasil);
                        $('.alert-notif').show();
                    }
                })
            }
        })



    })
</script>