<div class="form-body">
    <div class="website-logo">
        <a href="index.html">
            <div class="logo">
                <img class="logo-size" src="img/logo-light.svg" alt="">
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
                    <h3>Reset Password</h3>
                    <p></p>

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
                    <form method="POST" action="<?= BASEURL; ?>auth/ubah_password">
                        <input class="form-control" type="hidden" name="username" value="<?= $data['username']; ?>" required readonly>
                        <input class="form-control" type="hidden" name="randomkode" value="<?= $data['randomkode']; ?>" required readonly>
                        <input class="form-control" type="password" name="newpassword" placeholder="Password" required>
                        <input class="form-control" type="password" name="confirmnewpassword" placeholder="Konfirmasi Password" required>
                        <div class="form-button">
                            <button id="submit" type="submit" class="ibtn">Ubah Password</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</div>