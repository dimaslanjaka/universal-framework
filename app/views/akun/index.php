<main>

    <div class="container-fluid">

        <div class="row">

            <div class="col-12">



                <div class="mb-2">

                    <h1>Profile</h1>
                    <a href="/">Home</a>
                    <div class="text-zero top-right-button-container">



                    </div>

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

                </div>





                <ul class="nav nav-tabs separator-tabs ml-0 mb-5" role="tablist">

                    <li class="nav-item">

                        <a class="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="true">Profile</a>

                    </li>

                    <li class="nav-item">

                        <a class="nav-link " id="pengaturan-tab" data-toggle="tab" href="#pengaturan" role="tab" aria-controls="pengaturan" aria-selected="false">Pengaturan</a>

                    </li>

                    <li class="nav-item">

                        <a class="nav-link " id="sandi-tab" data-toggle="tab" href="#sandi" role="tab" aria-controls="sandi" aria-selected="false">Kata sandi</a>

                    </li>

                    <li class="nav-item">

                        <a class="nav-link " id="pin-tab" data-toggle="tab" href="#pin" role="tab" aria-controls="pin" aria-selected="false">Pin Keamanan</a>

                    </li>

                    <li class="nav-item">

                        <a class="nav-link " id="apikey-tab" data-toggle="tab" href="#apikey" role="tab" aria-controls="apikey" aria-selected="false">Api key</a>

                    </li>

                </ul>

                <div class="tab-content">

                    <div class="tab-pane show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                        <div class="row">

                            <div class="col-12 col-lg-5 col-xl-4 col-left">

                                <div class="card mb-4">





                                    <div class="position-absolute card-top-buttons">

                                        <button class="btn btn-outline-white icon-button ">

                                            <i class="simple-icon-pencil"></i>

                                        </button>

                                    </div>

                                    <img src="img/profiles/l-2.jpg" alt="Detail Picture" class="card-img-top" />

                                    <?php $user = $data['user']; ?>

                                    <div class="card-body">

                                        <h1><?= $user['nama_depan']; ?> <?= $user['nama_belakang']; ?>(<?= $user['username']; ?>)</h1>

                                        <p class="text-muted text-small mb-2">Email</p>

                                        <p class="mb-3">

                                            <?= $user['email']; ?>

                                        </p>



                                        <p class="text-muted text-small mb-2">Nomor HP</p>

                                        <p class="mb-3"><?= $user['no_hp']; ?></p>

                                        <p class="text-muted text-small mb-2">Terdaftar sejak</p>

                                        <p class="mb-3"><?= tanggal_indo($user['date']); ?></p>

                                        <p class="text-muted text-small mb-2">Sisa Saldo</p>

                                        <p class="mb-3">

                                        <div class="badge badge-primary"> <?= $user['saldo_top_up']; ?></div>

                                        </p>

                                        <p class="text-muted text-small mb-2">Total penggunaan saldo</p>

                                        <p class="mb-3">

                                        <div class="badge badge-primary"> <?= $data['penggunaansaldo'][0]['total']; ?></div>

                                        </p>



                                        <p class="text-muted text-small mb-2">MAU APA?</p>

                                        <p class="mb-3">

                                            <a href="#">

                                                <span class="badge badge-pill badge-outline-theme-2 mb-1">Isi saldo</span>

                                            </a>

                                            <a href="#">

                                                <span class="badge badge-pill badge-outline-theme-2 mb-1">Riwayat Pesanan</span>

                                            </a>



                                        </p>

                                        <p class="text-muted text-small mb-2">Contact</p>

                                        <div class="social-icons">

                                            <ul class="list-unstyled list-inline">

                                                <li class="list-inline-item">

                                                    <a href="#"><i class="simple-icon-social-facebook"></i></a>

                                                </li>

                                                <li class="list-inline-item">

                                                    <a href="#"><i class="simple-icon-social-twitter"></i></a>

                                                </li>

                                                <li class="list-inline-item">

                                                    <a href="#"><i class="simple-icon-social-instagram"></i></a>

                                                </li>

                                            </ul>

                                        </div>

                                    </div>

                                </div>



                            </div>

                            <?php  ?>

                            <div class="col-12 col-lg-7 col-xl-8 col-right">

                                <div class="card mb-4 d-none d-lg-block">

                                    <div class="position-absolute card-top-buttons">

                                        <button class="btn btn-header-light icon-button">

                                            <i class="simple-icon-refresh"></i>

                                        </button>

                                    </div>

                                </div>

                                <div class="card mb-4">

                                    <div class="card-body d-flex justify-content-between align-items-center">

                                        <h6 class="mb-0"> pembelian sosmed success</h6>

                                        <div class="badge badge-info">

                                            <h6> Rp <?= number_format($data['pembeliansosmed'][0]['total'], 0, ',', '.'); ?><br>(<span class="text-small">Dari

                                                    <?= $data['totalpembeliansosmed']; ?> pesanan</span>)</h6>



                                        </div>

                                    </div>

                                </div>

                                <div class="card mb-4">

                                    <div class="card-body d-flex justify-content-between align-items-center">

                                        <h6 class="mb-0">pembelian ppob success</h6>

                                        <div class="badge badge-info">

                                            <h6> Rp <?= number_format($data['pembelianppob'][0]['total'], 0, ',', '.'); ?><br>(<span class="text-small">Dari

                                                    <?= $data['totalpembelianppob']; ?> pesanan</span>)</h6>



                                        </div>

                                    </div>

                                </div>

                                <div class="card mb-4">

                                    <div class="card-body d-flex justify-content-between align-items-center">

                                        <h6 class="mb-0">Deposit success</h6>

                                        <div class="badge badge-info">

                                            <h6> Rp <?= number_format($data['deposituser'][0]['total'], 0, ',', '.'); ?><br>(<span class="text-small">Dari

                                                    <?= $data['totaldeposituser']; ?> Deposit</span>)</h6>



                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>



                    <div class="tab-pane fade" id="pengaturan" role="tabpanel" aria-labelledby="pengaturan-tab">



                        <div class="card mb-4">

                            <div class="card-body">

                                <h5 class="mb-4">Pengaturan Akun</h5>

                                <form class="tooltip-label-right">

                                    <label for="namadepan">Nama Depan</label>

                                    <div class="alertnamadepan mb-1"></div>

                                    <div class="form-group input-group position-relative error-l-50">

                                        <input type="text" class="form-control" id="namadepan" name="namadepan" value="<?= $user['nama_depan']; ?>" required>

                                        <div class="input-group-append ">

                                            <button type="button" class="btn btn-primary default ubahnamadepan ">

                                                ubah

                                            </button>

                                        </div>

                                    </div>



                                    <label for="namabelakang">Nama belakang</label>

                                    <div class="alertnamabelakang mb-1"></div>

                                    <div class="form-group input-group position-relative error-l-50">

                                        <input type="text" class="form-control" id="namabelakang" name="namabelakang" value="<?= $user['nama_belakang']; ?>" required>

                                        <div class="input-group-append ">

                                            <button type="button" class="btn btn-primary default ubahnamabelakang ">

                                                ubah

                                            </button>

                                        </div>

                                    </div>



                                    <label for="email">Email</label>

                                    <div class="alertemail mb-1"></div>

                                    <div class="form-group input-group position-relative error-l-50">

                                        <input type="text" class="form-control" id="email" name="email" value="<?= $user['email']; ?>" required>

                                        <div class="input-group-append ">

                                            <button type="button" class="btn btn-primary default ubahemail ">

                                                ubah

                                            </button>

                                        </div>

                                    </div>



                                    <label for="no_hp">Nomor hp</label>

                                    <div class="alertno_hp mb-1"></div>

                                    <div class="form-group input-group position-relative error-l-50">

                                        <input type="number" class="form-control" id="no_hp" name="no_hp" value="<?= $user['no_hp']; ?>" required>

                                        <div class="input-group-append ">

                                            <button type="button" class="btn btn-primary default ubahno_hp ">

                                                ubah

                                            </button>

                                        </div>

                                    </div>

                                    <!-- <div class="form-group position-relative error-l-50">

                                        <label>Nama Belakang</label>

                                        <input type="text" class="form-control" name="namabelakang">

                                    </div>

                                    <div class="form-group position-relative error-l-50">

                                        <label>Email</label>

                                        <input type="email" class="form-control" name="email">

                                    </div>

                                    <div class="form-group position-relative error-l-50">

                                        <label>No hp</label>

                                        <input type="number" class="form-control" name="nomorhp">

                                    </div>

                                    <div class="form-group position-relative error-l-100">

                                        <label>Pin keamanan</label>

                                        <input type="number" class="form-control" name="pinkeamanan" required>

                                    </div> -->





                                </form>

                            </div>

                        </div>

                    </div>



                    <div class="tab-pane fade" id="sandi" role="tabpanel" aria-labelledby="sandi-tab">

                        <div class="card mb-4">

                            <div class="card-body">

                                <h5 class="mb-4">Ubah kata sandi</h5>

                                <form class="col-12">

                                    <div class="form-group">

                                        <div class="alertubahsandi mb-1"></div>

                                        <label for="sandisaatini">Kata sandi saat ini</label>

                                        <input type="password" class="form-control" id="sandisaatini" placeholder="Masukan kata sandi..." required>

                                        <div class="text-notif"></div>



                                    </div>

                                    <div class="form-group formsandibaru" style="display: none;">

                                        <label for="sandibaru">Kata sandi baru</label>

                                        <input type="password" class="form-control" id="sandibaru" placeholder="Masukan kata sandi baru..." required>

                                        <div class="text-notifsandibaru">



                                        </div>

                                    </div>

                                    <div class="form-group position-relative formkonfirmasisandi" style="display: none;">

                                        <label for="sandibarukonfirmasi">Konfirmasi Kata sandi baru</label>

                                        <input type="password" class="form-control" name="sandibarukonfirmasi" id="sandibarukonfirmasi" placeholder="Konfirmasi kata sandi..." required>

                                        <div class="text-notifsandibarukonfirmasi">



                                        </div>

                                    </div>







                                    <button type="button" class="btn btn-primary mb-0 ubahsandi" style="display: none;">Ubah kata sandi</button>

                                </form>

                            </div>

                        </div>

                    </div>

                    <div class="tab-pane fade" id="pin" role="tabpanel" aria-labelledby="pin-tab">

                        <div class="card mb-4">

                            <div class="card-body">

                                <h5 class="mb-4">Ubah Pin Keamanan</h5>

                                <form class="col-12">

                                    <div class="form-group">

                                        <div class="alertubahpin mb-1"></div>

                                        <label for="sandisaatini">Pin saat ini</label>

                                        <input type="number" class="form-control" id="pinsaatini" placeholder="Masukan Pin keamanan..." required>

                                        <div class="text-notif-pinsaatini"></div>



                                    </div>

                                    <div class="form-group formsandibaru">

                                        <label for="sandibaru">Kata sandi baru</label>

                                        <input type="number" class="form-control" id="pinbaru" placeholder="Masukan pin baru..." required>

                                        <div class="text-notifpinbaru">

                                        </div>

                                    </div>

                                    <button onclick="ubahpin('<?= $data['user']['pin']; ?>')" type="button" class="btn btn-primary mb-0 ubahpin">Ubah Pin</button>

                                </form>

                            </div>

                        </div>

                    </div>

                    <div class="tab-pane fade" id="apikey" role="tabpanel" aria-labelledby="apikey-tab">

                        <div class="card mb-4">

                            <div class="card-body">

                                <label for="apikey">Api Key</label>

                                <div class="alertapikey mb-1"></div>

                                <div class="form-group input-group position-relative error-l-50">

                                    <input type="text" class="form-control apikey" id="apikey" name="apikey" value="<?= $user['api_key']; ?>" readonly>

                                    <div class="input-group-append ">

                                        <button type="button" data-toggle="modal" data-target="#apikeyModal" class="btn btn-primary default">

                                            <i class="iconsminds-shuffle-1"></i>

                                        </button>

                                    </div>

                                </div>



                                <label for="apikey">Alamat IP</label>

                                <div class="alertipkey mb-1"></div>

                                <div class="form-group input-group position-relative error-l-50">

                                    <input type="text" class="form-control ipkey" id="ipkey" name="ipkey" value="<?= $data['apikey']['ip']; ?>">

                                    <div class="input-group-append ">

                                        <button onclick="ubahip('<?= $data['apikey']['api_key']; ?>')" type="button" class="btn btn-primary default text-light">

                                            Ubah

                                        </button>

                                    </div>

                                </div>





                                <label for="apikey">Status</label>

                                <div class="alertstatuskey mb-1"></div>

                                <div class="form-group input-group position-relative error-l-50">

                                    <select name="statusapi" id="statusapi" class="form-control">

                                        <option value="ON">ON</option>

                                        <option value="OF">OF</option>

                                    </select>

                                    <div class="input-group-append ">

                                        <button onclick="ubahstatus('<?= $data['apikey']['api_key']; ?>')" type="button" class="btn btn-primary default">

                                            Ubah

                                        </button>

                                    </div>

                                </div>



                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

    <?php unset($_SESSION['hasil']); ?>

</main>



<!-- Modal Api Key -->

<div class="modal fade" id="apikeyModal" tabindex="-1" role="dialog" aria-hidden="true">

    <div class="modal-dialog" role="document">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title" id="exampleModalLabel">Ubah Api Key</h5>

                <button type="button" class="close" data-dismiss="modal" aria-label="Close">

                    <span aria-hidden="true">&times;</span>

                </button>

            </div>

            <div class="modal-body">

                Yakin Mau Ubah Api key?

            </div>

            <div class="modal-footer">

                <button type="button" class="btn btn-secondary" data-dismiss="modal">Tutup</button>

                <button type="button" class="btn btn-secondary ubahapikey" data-dismiss="modal">Ok</button>

            </div>

        </div>

    </div>

</div>



<script src="<?= BASEURL; ?>js/custom/akun.js"></script>