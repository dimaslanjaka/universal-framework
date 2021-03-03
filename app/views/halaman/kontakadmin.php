<main>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">

                <div class="mb-2">
                    <h1>Profile</h1>
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



                <div class="tab-content">
                    <div class="tab-pane show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <div class="row">
                            <?php foreach ($data['daftaradmin'] as $admin) : ?>
                                <div class="col-12 col-lg-5 col-xl-4 col-left">
                                    <div class="card mb-4">


                                        <div class="position-absolute card-top-buttons">
                                            <button class="btn btn-outline-white icon-button ">
                                                <i class="simple-icon-pencil"></i>
                                            </button>
                                        </div>
                                        <img src="<?= $admin['link_foto']; ?>" alt="Detail Picture" class="card-img-top" />

                                        <div class="card-body">
                                            <h1><?= $admin['nama']; ?></h1>
                                            <center>
                                                <p>"<?= $admin['deskripsi']; ?>"</p>
                                            </center>
                                            <p class="text-muted text-small mb-2">Email</p>
                                            <p class="mb-3">
                                                <?= $admin['email']; ?>
                                            </p>

                                            <p class="text-muted text-small mb-2">Nomor HP</p>
                                            <p class="mb-3"><?= $admin['no_hp']; ?></p>
                                            <p class="text-muted text-small mb-2">Alamat</p>
                                            <p class="mb-3"><?= $admin['lokasi']; ?></p>
                                            <p class="text-muted text-small mb-2">Jam Kerja</p>
                                            <p class="mb-3"><?= $admin['jam_kerja']; ?></p>

                                            <p class="text-muted text-small mb-2">Contact</p>
                                            <div class="social-icons">
                                                <ul class="list-unstyled list-inline">
                                                    <li class="list-inline-item">
                                                        <a href="<?= $admin['link_fb']; ?>"><i class="simple-icon-social-facebook"></i></a>
                                                    </li>

                                                    <li class="list-inline-item">
                                                        <a href="<?= $admin['link_ig']; ?>"><i class="simple-icon-social-instagram"></i></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            <?php endforeach; ?>

                        </div>
                    </div>





                </div>
            </div>
        </div>
    </div>
    <?php unset($_SESSION['hasil']); ?>
</main>