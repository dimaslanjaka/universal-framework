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

                    <h3>Services Terbaik Dengan Login Di Platform kami</h3>

                    <p></p>

                    <div class="page-links">

                        <a href="<?= BASEURL; ?>auth" class="active">Login</a><a href="<?= BASEURL; ?>auth/register">Daftar</a>

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

                    <form method="POST" action="<?= BASEURL; ?>auth/login">

                        <input class="form-control" type="text" name="username" placeholder="E-mail/No Hp" required>

                        <input class="form-control" type="password" name="password" placeholder="Password" required>

                        <div class="form-button">

                            <button id="submit" type="submit" class="ibtn">Masuk</button> <a href="<?= BASEURL; ?>auth/resetpassword">Lupa password?</a>

                        </div>

                    </form>

                    <div class="other-links d-none">

                        <span>Or login with</span><a href="#"><i class="simple-icon-social-facebook"></i></a><a href="#"><i class="simple-icon-social-google"></i></a><a href="#"><i class="simple-icon-social-linkedin"></i></a>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>