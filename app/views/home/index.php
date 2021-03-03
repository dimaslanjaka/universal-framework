<main>

    <div class="container-fluid">

        <div class="row">

            <div class="col-12">

                <h1>Dashboard <small class="text-small text-muted">Your ip : <?= get_client_ip() ?> </small></h1>

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

            <!-- isi -->



            <div class="col-lg-6">

                <div class="col-lg-12">



                    <?php if (isset($_SESSION['hasil'])) : ?>

                        <div class="alert alert-<?= $_SESSION['hasil']['alert']; ?> alert-dismissible fade show  mb-3 col-12" role="alert">

                            <?= $_SESSION['hasil']['pesan'] ?>

                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">

                                <span aria-hidden="true">&times;</span>

                            </button>

                        </div>

                        <?php unset($_SESSION['hasil']); ?>

                    <?php endif; ?>

                    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">

                        <div class="carousel-inner">

                            <div class="carousel-item active">

                                <img src="<?= BASEURL; ?>slide/2.jpg" class="d-block w-100" alt="...">

                            </div>

                        </div>

                        <!-- <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">

                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>

                            <span class="visually-hidden"></span>

                        </a>

                        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">

                            <span class="carousel-control-next-icon" aria-hidden="true"></span>

                            <span class="visually-hidden"></span>

                        </a> -->

                    </div>

                    <div class="mt-4">

                        <div class="d-flex sidebar__padding">

                            <div class="sidebar__balance-icon">

                                <img src="https://tripay.co.id/member-page/asset/icons/balance.png" alt="balance-icon">

                            </div>

                            <div class="sidebar__balance align-self-center hide-sidebar">

                                Rp <?= number_format($data['user']['saldo_top_up'], 0, ',', '.'); ?>

                            </div>

                            <div class="ml-auto align-self-center hide-sidebar tomboldeposit">

                                <span class="badge bg-info text-light shadow" data-toggle="modal" data-target="#deposit" title="Deposit" style="font-size:15px;">

                                    Deposit

                                </span>

                                <!--<a href="<?= BASEURL; ?>home/tariksaldo">-->

                                <!--    <span class="badge bg-success text-light shadow" title="withdraw" style="font-size:15px;">-->

                                <!--        Tarik-->

                                <!--    </span>-->

                                <!--</a>-->

                            </div>

                        </div>

                    </div>

                </div>



                <!-- iconpesanan -->

                <div class="col-12 col-lg-12 col-xl-12 card mt-4">

                    <div class="row mt-4">

                        <!--<div class="col-4  mb-4">-->

                        <!--    <a data-toggle="modal" data-target="#modalPulsa" class="card pesan-pulsa" id="pesan-pulsa">-->

                        <!--        <div class=" text-center p-2">-->

                        <!--            <img src="<?= BASEURL; ?>icon/pulsa1.png" alt="" style="width: auto;height:4rem;margin:auto;">-->

                        <!--            <p class="card-text mb-0 mt-1">Pulsa Reguler</p>-->

                        <!--        </div>-->

                        <!--    </a>-->

                        <!--</div>-->

                        <!--<div class="col-4  mb-4">-->

                        <!--    <a data-toggle="modal" data-target="#modalPulsa" class="card pesan-paket">-->

                        <!--        <div class="text-center p-2">-->

                        <!--            <img src="<?= BASEURL; ?>icon/internet.png" alt="" style="width: auto;height:4rem;margin:auto;">-->

                        <!--            <p class="card-text mb-0 mt-1">Paket Internet</p>-->

                        <!--        </div>-->

                        <!--    </a>-->

                        <!--</div>-->

                        <div class="col-6  mb-4">

                            <a data-toggle="modal" data-target="#modalPpob" class="card pesan-game">

                                <div class="text-center p-2">

                                    <img src="<?= BASEURL; ?>icon/voucher-game.png" alt="" style="width: auto;height:4rem;margin:auto;">

                                    <p class="card-text mb-0 mt-1">Voucher Game</p>

                                </div>

                            </a>

                        </div>

                        <!--<div class="col-4  mb-4">-->

                        <!--    <a data-toggle="modal" data-target="#modalPpob" class="card pesan-emoney">-->

                        <!--        <div class="text-center p-2">-->

                        <!--            <img src="<?= BASEURL; ?>icon/e-money.png" alt="" style="width: auto;height:4rem;margin:auto;">-->

                        <!--            <p class="card-text mb-0 mt-1">Saldo Emoney</p>-->

                        <!--        </div>-->

                        <!--    </a>-->

                        <!--</div>-->

                        <!--<div class="col-4  mb-4">-->

                        <!--    <a data-toggle="modal" data-target="#modalPpob" class="card pesan-voucherdigital">-->

                        <!--        <div class="text-center p-3">-->

                        <!--            <img src="<?= BASEURL; ?>icon/voucher1.png" alt="" style="width: auto;height:3rem;margin:auto;">-->

                        <!--            <p class="card-text mb-0 mt-1">Voucher </p>-->

                        <!--        </div>-->

                        <!--    </a>-->

                        <!--</div>-->

                        <!--<div class="col-4  mb-4">-->

                        <!--    <a data-toggle="modal" data-target="#modalPpob" class="card pesan-pln">-->

                        <!--        <div class="text-center p-2">-->

                        <!--            <img src="<?= BASEURL; ?>icon/token-listrik.png" alt="" style="width: auto;height:4rem;margin:auto;">-->

                        <!--            <p class="card-text mb-0 mt-1">Token PLN</p>-->

                        <!--        </div>-->

                        <!--    </a>-->

                        <!--</div>-->

                        <!--<div class="col-4  mb-4">-->

                        <!--    <a data-toggle="modal" data-target="#modalPpob" class="card pesan-pulsa-internasional">-->

                        <!--        <div class="text-center p-2">-->

                        <!--            <img src="<?= BASEURL; ?>icon/pulsa-internasional.png" alt="" style="width: auto;height:3rem;margin:auto;">-->

                        <!--            <p class="card-text mb-0 mt-1">Pulsa Internasional</p>-->

                        <!--        </div>-->

                        <!--    </a>-->

                        <!--</div>-->

                        <!--<div class="col-4  mb-4">-->

                        <!--    <a href="#" class="card">-->

                        <!--        <div class="text-center p-2">-->

                        <!--            <img src="<?= BASEURL; ?>icon/pascabayar.png" alt="" style="width: auto;height:4rem;margin:auto;">-->

                        <!--            <p class="card-text mb-0 mt-1">Pascabayar</p>-->

                        <!--        </div>-->

                        <!--    </a>-->

                        <!--</div>-->

                        <div class="col-6  mb-4">

                            <a data-toggle="modal" data-target="#modalSosmed" class="card pesan-sosmed">

                                <div class="text-center p-2">

                                    <img src="<?= BASEURL; ?>icon/sosmed.png" alt="" style="width: auto;height:4rem;margin:auto;">

                                    <p class="card-text mb-0 mt-1">Sosial Media</p>

                                </div>

                            </a>

                        </div>

                    </div>

                </div>

                <!-- akhir icon pesanan -->

            </div>



            <!-- table pesanan trakhir -->

            <div class="col-lg-6 col-sm-12 mt-4">

                <div class="card card-table mg-t-20 mg-sm-t-30">

                    <div class="card-header p-3">

                        <h6 class="slim-card-title"> <i class="iconsminds-clock-back"></i> 10 Transaksi Terakhir</h6>

                    </div>

                    <!-- card-header -->

                    <div class="table-responsive">

                        <table class="table mg-b-0 tx-13">

                            <thead>

                                <tr>

                                    <th class="pd-y-5">No</th>

                                    <th class="pd-y-5">Via</th>

                                    <th class="pd-y-5">Tanggal</th>

                                    <th class="pd-y-5">Layanan</th>

                                    <th class="pd-y-5">Harga</th>

                                    <th class="pd-y-5">Status</th>



                                </tr>

                            </thead>

                            <tbody>



                                <?php $no = 1; ?>

                                <?php foreach ($data['pembelian'] as $pesanan) : ?>

                                    <tr>

                                        <th scope="row"><?= $no ?></th>

                                        <td>

                                            <div class="badge badge-info"><?= $pesanan['place_from']; ?></div>

                                        </td>

                                        <td><?= tanggal_indo($pesanan['date']) ?></td>

                                        <td><?= $pesanan['layanan']; ?></td>

                                        <td><?= $pesanan['harga']; ?></td>



                                        <?php

                                        $status = $pesanan['status'];

                                        if ($status == 'Success') {

                                            $alert = 'primary';
                                        } else if ($status == 'Error') {

                                            $alert = 'danger';
                                        } else {

                                            $alert = 'warning';
                                        }

                                        ?>

                                        <td>

                                            <div class="badge badge-<?= $alert; ?>"><?= $status ?></div>

                                        </td>

                                    </tr>

                                    <?php $no++ ?>

                                <?php endforeach; ?>





                            </tbody>

                        </table>

                    </div>

                </div>





                <!--  -->

            </div>

            <!-- akhir riwayat pesanan -->



            <div class="col-12 mb-4 mt-3">

                <div class="card">

                    <div class="card-body">

                        <h5 class="card-title">Grafik Pesanan</h5>

                        <div class="dashboard-line-chart chart">

                            <canvas id="salesChart"></canvas>

                        </div>

                    </div>

                </div>

            </div>



            <!-- its okey, akhir isi -->



        </div>





        <!-- modal pulsa -->

        <div class="modal fade" id="modalPulsa" tabindex="-1" role="dialog" aria-hidden="true">

            <div class="modal-dialog" role="document">

                <div class="modal-content">

                    <div class="modal-header">

                        <h5 class="modal-title  text-center" id="labelmodalpulsa"></h5>

                        <button type="button" class="close tutupmodalpulsa" data-dismiss="modal" aria-label="Close">

                            <span aria-hidden="true">&times;</span>

                        </button>

                    </div>

                    <div class="modal-body body-pesanpulsa">

                        <form method="POST" action="<?= BASEURL; ?>order/ppob">

                            <div class="form-group">

                                <label class="mr-10" for="nohp">No Tujuan</label>

                                <input type="number" name="tujuan" class="form-control" name="nohp" id="nohp" aria-describedby="emailHelp" placeholder="08xx">

                                <div class="text-info jenisoperator"></div>

                                <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email

                                    with anyone else.</small> -->

                            </div>

                            <select class="custom-select kategoripulsadata" required style="display:none">

                            </select>

                            <div class="form-group text-center layanan">

                            </div>

                            <div class="form-group">

                                <label for="tujuanppob">Pin Keamanan</label>

                                <input type="number" class="form-control" name="pin" id="pinppob" placeholder="123456" required>

                            </div>

                    </div>

                    <div class="modal-footer">

                        <button type="button" class="btn btn-outline-info" data-dismiss="modal">Close</button>

                        <button type="submit" class="btn btn-info" id="buttonsubmit">Pesan</button>

                    </div>

                    </form>

                </div>

            </div>

        </div>







        <div class="modal fade" id="modalPpob" tabindex="-1" role="dialog" aria-hidden="true">

            <div class="modal-dialog" role="document">

                <div class="modal-content">

                    <div class="modal-header">

                        <h5 class="modal-title text-center" id="labelmodalPpob">Form order</h5>

                        <button type="button" class="close tutupmodalPpob" data-dismiss="modal" aria-label="Close">

                            <span aria-hidden="true">&times;</span>

                        </button>

                    </div>

                    <div class="modal-body body-pesanPpob">

                        <form method="POST" action="<?= BASEURL; ?>order/ppob">

                            <div class="form-group">

                                <label for="tujuanppob">No Pelanggan</label>

                                <input type="number" name="tujuan" class="form-control" name="tujuanppob" id="tujuanppob" aria-describedby="emailHelp" placeholder="08xx" required>

                            </div>

                            <div class="form-group position-relative kategorippob" style="display: none;">

                                <label>Kategori</label>

                                <select class="custom-select optionkategorippob" required>

                                    <!-- diisi oleh ajax -->

                                </select>

                            </div>

                            <div class="form-group position-relative layananppob" style="display: none;">

                                <label>Kategori</label>

                                <select class="custom-select optionlayananppob" name="layanan" required>

                                    <!-- diisi oleh ajax -->

                                </select>

                            </div>

                            <p class="alert alert-secondary deskripsippob" style="display:none"></p>

                            <div class="form-group">

                                <label for="tujuanppob">Pin Keamanan</label>

                                <input type="number" class="form-control" name="pin" id="pinppob" placeholder="123456" required>

                            </div>

                    </div>

                    <div class="modal-footer">

                        <button type="button" class="btn btn-outline-info" data-dismiss="modal">Close</button>

                        <button type="submit" class="btn btn-info" id="buttonpesanppob">Pesan</button>

                    </div>

                    </form>

                </div>

            </div>

        </div>



        <!-- modal sosial media -->

        <div class="modal fade" id="modalSosmed" tabindex="-1" role="dialog" aria-hidden="true">

            <div class="modal-dialog" role="document">

                <div class="modal-content">

                    <div class="modal-header">

                        <h5 class="modal-title text-center" id="labelmodalpulsa">Pesan sosial media</h5>

                        <button type="button" class="close tutupmodalpulsa" data-dismiss="modal" aria-label="Close">

                            <span aria-hidden="true">&times;</span>

                        </button>

                    </div>

                    <div class="modal-body body-pesansosmed">





                        <form class="form-horizontal" method="POST" action="<?= BASEURL; ?>order/sosmed">

                            <div class="form-group row">

                                <label class="col-xl-3 col-lg-3 col-form-label">Kategori</label>

                                <div class="col-lg-12 col-xl-12">

                                    <select class="form-control" id="kategori" name="kategori" required>

                                        <option value="0" selected disabled>Pilih Salah satu</option>

                                        <?php foreach ($data['catsosmed'] as $cat) : ?>

                                            <option value="<?= $cat['kode']; ?>"><?= $cat['nama']; ?></option>

                                        <?php endforeach; ?>



                                    </select>



                                </div>

                            </div>

                            <div class="form-group row">

                                <label class="col-xl-3 col-lg-3 col-form-label">Layanan</label>

                                <div class="col-lg-12 col-xl-12">

                                    <select class="form-control" name="layanan" id="layanan" required>

                                        <option value="0" selected disabled>Pilih Kategori Dahulu</option>



                                    </select>



                                </div>

                            </div>

                            <div id="catatan"></div>

                            <div class="form-group row">

                                <label class="col-xl-3 col-lg-3 col-form-label">Tujuan</label>

                                <div class="col-lg-12 col-xl-12">

                                    <input type="text" name="target" class="form-control" placeholder="Masukan Username / Link" required>



                                </div>

                            </div>

                            <div id="show1">

                                <div class="form-group row">

                                    <label class="col-xl-3 col-lg-3 col-form-label">Jumlah</label>

                                    <div class="col-lg-12 col-xl-12">

                                        <input type="number" name="jumlah" class="form-control" placeholder="Jumlah" onkeyup="get_total(this.value).value;" required>



                                    </div>

                                </div>

                                <input type="hidden" id="rate" value="0">

                                <div class="form-group row">

                                    <label class="col-xl-3 col-lg-3 col-form-label">Total Harga</label>

                                    <div class="col-lg-12 col-xl-12">

                                        <div class="input-group">

                                            <div class="input-group-prepend"><span class="input-group-text text-primary">Rp</span></div>

                                            <input type="number" name="totalharga" class="form-control" id="total" placeholder="0" readonly>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div id="show2" style="display: none;">

                                <div class="form-group row">

                                    <label class="col-xl-3 col-lg-3 col-form-label">Komen</label>

                                    <div class="col-lg-12 col-xl-12">

                                        <textarea class="form-control" name="comments" id="comments" placeholder="Pisahkan Tiap Baris Komentar Dengan Enter"></textarea>

                                    </div>

                                </div>

                                <input type="hidden" id="rate" value="0">

                                <div class="form-group row">

                                    <label class="col-xl-3 col-lg-3 col-form-label">Total Harga</label>

                                    <div class="col-lg-12 col-xl-12">

                                        <div class="input-group">

                                            <div class="input-group-prepend"><span class="input-group-text text-primary">Rp</span></div>

                                            <input type="number" class="form-control" id="totalxx" placeholder="0" readonly>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div class="form-group row">

                                <label class="col-xl-3 col-lg-3 col-form-label">PIN</label>

                                <div class="col-lg-12 col-xl-12">

                                    <div class="input-group">

                                        <div class="input-group-prepend"><span class="input-group-text"><i class="simple-icon-key"></i></span></div>

                                        <input type="password" name="pin" class="form-control" placeholder="Masukkan PIN Kamu" required>

                                    </div>



                                </div>

                            </div>

                    </div>

                    <div class="modal-footer">

                        <button type="button" class="btn btn-outline-info" data-dismiss="modal">Close</button>

                        <button type="submit" class="btn btn-info" id="buttonsubmit">Pesan</button>

                    </div>

                    </form>

                </div>

            </div>

        </div>

</main>



<!-- MODAL DEPOSIT -->

<div class="modal bd-example-modal-sm" id="deposit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">

    <div class="modal-dialog modal-sm" role="document">

        <div class="modal-content">

            <div class="modal-body text-center">

                <img src="https://tripay.co.id/member-page/asset/icons/deposit2.png" alt="deposit" class="center">

                <form class="custom__form p-3" action="<?= BASEURL; ?>home/inputdeposit" method="POST">

                    <div class="form-group mt-0">

                        <label for="nomorHP">Nominal Deposit</label>

                        <div class="input-group mb-3">

                            <div class="input-group-prepend">

                                <span class="input-group-text border-info border-left-0 border-top-0 pl-0 bg-transparent" id="basic-addon1">Rp</span>

                            </div>

                            <input type="text" name="nominal" class="form-control only__border-bottom" placeholder="" aria-label="" aria-describedby="basic-addon1" id="nominal" autocomplete="off" required autofocus>

                        </div>

                        <p class="text-smal text-danger">*Minimal deposit 10000</p>

                        <small class="text-small text-red alert alert-danger notifdepo" style="display: none;">Kamu masih memiliki deposit pending</small>

                        <div class="input-group">

                            <select class="custom-select" name="metode" id="metodedepo" required>

                                <option value="">Pilih Metode</option>

                                <?php foreach ($data['metodedeposit'] as $metoddepo) : ?>

                                    <option value="<?= $metoddepo['provider']; ?>"><?= $metoddepo['provider']; ?></option>

                                <?php endforeach; ?>

                            </select>

                        </div>



                        <div class="input-group mb-3 mt-3 formpengirim" style="display: none;">

                            <div class="input-group-prepend">

                                <span class="input-group-text border-info border-left-0 border-top-0 pl-0 bg-transparent" id="basic-addon1">No Pengirim</span>

                            </div>

                            <input type="text" name="pengirim" class="form-control only__border-bottom" placeholder="" aria-label="" aria-describedby="basic-addon1" id="pengirim" autocomplete="off" required>

                        </div>



                        <div class="d-flex justify-content-center mt-5 pt-2 mb-3">

                            <button type="button" class="btn btn-outline-primary" data-dismiss="modal">

                                Tutup

                            </button>

                            <button type="submit " id="submitdepo" class="btn btn-info pl-4 pr-4 pt-2 pb-2 ml-4" style="display: none;">

                                Lanjutkan

                            </button>

                        </div>

                </form>

            </div>

        </div>

    </div>

</div>

<!--  -->





<script src="<?= BASEURL; ?>js/custom/home.js"></script>