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
                <?php if (isset($_SESSION['hasil'])) : ?>
                    <div class="alert alert-<?= $_SESSION['hasil']['alert']; ?> alert-dismissible fade show  mb-0" role="alert">
                        <?= $_SESSION['hasil']['pesan']; ?>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div><br>
                <?php endif; ?>
                <?php unset($_SESSION['hasil']); ?>
                <div class="card p-4 col-12">
                    <div class="card-body d-flex border__bottom-dash">
                        <div class="">
                            <img src="https://tripay.co.id/member-page/asset/icons/balance.png" alt="balance-icon">
                        </div>
                        <div class="flex-column align-self-center">
                            <div class="pl-3 text-gray mt-2">
                                Saldo Anda
                            </div>
                            <div class="pl-3">
                                <?= number_format($data['user']['saldo_top_up'], 0, ',', '.'); ?>
                            </div>
                        </div>
                    </div>
                    <div class="text-gray text-center">
                        Transfer Saldo ke sesama member <?= WEB_NAME; ?><br>
                        Masukkan nomor handphone tujuan transfer.
                    </div>
                    <form class="custom__form mt-lg-5 mt-2" role="form" action="<?= BASEURL; ?>deposit/transfersaldo" method="post">
                        <input type="hidden" name="_token" value="ng1px21HFBw4jt3qmbptVZwUNsZN1dLDdXSgOh6w">
                        <div class="form-group">
                            <label for="nomorHP">Nomor Handphone</label>
                            <div class="input-group">
                                <input type="text" class="form-control" name="no_tujuan" value="" placeholder="" aria-label="" aria-describedby="basic-addon1" id="number" required>
                                <div class="input-group-prepend">
                                    <a id="cek_nomor" class="btn btn-info" type="button">Cek Nomor</a>
                                </div>
                            </div>
                            <span class="text-small notifceknomor"></span>
                        </div>
                        <div class="form-group">
                            <label for="nominal">Nominal Transfer</label>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">Rp</div>
                                </div>
                                <input type="text" name="nominal" class="form-control" value="" placeholder="" aria-label="" aria-describedby="basic-addon1" id="nominalTrf" min="0" autocomplete="off" required autofocus>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="pin">Pin</label>
                            <input type="text" name="pin" type="pin" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" id="pin" required>
                        </div>
                        <div class="text-center mt-5 mb-3">
                            <button type="submit" class="btn btn-info shadow pl-4 pr-4">
                                Continue
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row mt-4">

                <div class="col-lg-12 mobile-none card">
                    <div class="box__title card-body">
                        Syarat & Ketentuan
                    </div>
                    <div class="box p-4">
                        <div class="box__keterangan">
                            <b>Pendahuluan</b> <br>
                            Fitur Transfer Saldo adalah fitur yang digunakan untuk mengirim/berbagi saldo dengan member/referral anda yang berfungsi untuk membantu member/referral anda yang tidak dapat melakukan deposit saldo melalui transfer bank, anda dapat menggunakan fitur ini untuk menambahkan saldo Member/Referral anda. <br><br>
                            <b>Syarat & Ketentuan</b> <br>
                            Anda tidak dapat melakukan transfer saldo ke akun anda sendiri.
                            Anda harus memiliki saldo minimal Rp 50.000 untuk melakukan transfer saldo.
                            Minimal Saldo yang anda transfer adalah Rp 20.000.
                            Lakukan pengecekan nomor tujuan transfer terlebih dahulu untuk memeriksa tujuan transfer anda apakah sudah benar atau belum.
                            Demi keamanan dalam fitur ini, anda di wajibkan untuk memasukkan kata sandi akun anda agar transfer saldo di pastikan dilakukan oleh anda.
                            Kami tidak bertanggung jawab jika anda salah dalam transfer saldo ke member/referral anda. <br><br>
                            <b>Penutup</b> <br>
                            Sebelum menggunakan fitur ini di sarankan untuk membaca dan memahami benar syarat dan ketentuan dari fitur ini agar tidak terjadi kesalah pahaman. Syarat & Ketentuan diatas dapat berubah sewaktu - waktu tanpa pemberitahuan sebelumnya. <br><br>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-4">

                <div class="col-xl-12 col-lg-12 ">
                    <div class="card ">
                        <div class="card-body">
                            <h5 class="card-title">Riwayat Transfer Kamu :</h5>
                            <table class="data-table data-table-standard responsive nowrap" data-order="[[ 1, &quot;desc&quot; ]]">
                                <thead>
                                    <tr>
                                        <th>Waktu</th>
                                        <th>Tujuan</th>
                                        <th>Nominal</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($data['riwayattransfer'] as $datatf) : ?>
                                        <tr>
                                            <td>
                                                <p><?= $datatf['date']; ?> <br><?= $datatf['time']; ?></p>
                                            </td>
                                            <td>
                                                <p><?= $datatf['no_tujuan']; ?></p>
                                            </td>
                                            <td>
                                                <p>RP : <?= number_format($datatf['jumlah'], 0, ',', '.'); ?></p>
                                            </td>



                                        <?php endforeach; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</main>

<script>
    $(document).ready(function() {


        $('#cek_nomor').on('click', function() {
            var nomor = $('#number').val()

            $.ajax({
                url: url.concat('deposit/ceknomortf'),
                type: 'post',
                // dataType: 'html',
                data: {
                    nomor: nomor
                },
                beforeSend: function() {
                    $('.notifceknomor').addClass('text-info')
                    $('.notifceknomor').html('Mohon tunggu...')
                },
                success: function(hasil) {
                    if (hasil == '1') {
                        $('.notifceknomor').removeClass('text-info')
                        $('.notifceknomor').removeClass('text-danger')
                        $('.notifceknomor').addClass('text-success')
                        $('.notifceknomor').html('Nomor Terdaftar.')
                    } else {
                        $('.notifceknomor').addClass('text-danger')
                        $('.notifceknomor').html('Nomor Tidak terdaftar!.')
                    }
                },
                error: function() {
                    $('.notifceknomor').addClass('text-danger')
                    $('.notifceknomor').html('Error(88), mohon infokan error ini ke admin')
                }


            })
        })



    })
</script>