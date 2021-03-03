<div class="form-body">
    <div class="website-logo">
        <a href="index.html">
            <div class="logo">
                <img class="logo-size" src="images/logo-light.svg" alt="">
            </div>
        </a>
    </div>
    <div class="row">
        <div class="img-holder">
            <div class="bg"></div>
            <div class="info-holder">

            </div>
        </div>
        <div class="form-holder">
            <div class="form-content">
                <div class="form-items">
                    <h3>Silahkan Isi form dibawah Untuk mendaftar.</h3>

                    <div class="page-links">
                        <a href="<?= BASEURL; ?>auth">Login</a><a href="" class="active">Register</a>
                    </div>
                    <?php
                    if (isset($_SESSION['hasil'])) {
                    ?>
                        <div class="alert alert-warning alert-dismissible fade show " role="alert">
                            <i class="simple-icon-exclamation"></i> <?= $_SESSION['hasil']['pesan']; ?>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    <?php
                        unset($_SESSION['hasil']);
                    }
                    ?>
                    <form method="POST" action="<?= BASEURL; ?>auth/submitreg">
                        <input class="form-control" type="text" name="nama_depan" id="nama_depan" placeholder="Nama depan" required>
                        <input class="form-control" type="text" id="nama_belakang" name="nama_belakang" placeholder="Nama Belakang" required>
                        <input class="form-control" type="text" name="username" id="username" placeholder="Username" required>
                        <input class="form-control" type="email" name="email" id="email" placeholder="E-mail" required>
                        <input class="form-control" type="number" name="no_hp" id="no_hp" placeholder="Nomor hp" required>
                        <input class="form-control" type="password" name="password" id="password" placeholder="Password" required>
                        <input type="password" class="form-control" name="konfirmasipassword" id="konfirmasipassword" placeholder="Konfirmasi Password" required>
                        <input type="number" class="form-control" name="pin" id="pin" placeholder="Pin keamanan..." required>
                        <input type="text" class="form-control" name="refferal" id="refferal" placeholder="Kode refferal jika ada">
                        <div class="form-button">
                            <button id="submit" type="submit" class="ibtn">Daftar</button>
                        </div>
                    </form>
                    <!-- <div class="other-links">
                        <span>Or register with</span><a href="#"><i class="fab fa-facebook-f"></i></a><a href="#"><i class="fab fa-google"></i></a><a href="#"><i class="fab fa-linkedin-in"></i></a>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</div>