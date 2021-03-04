<main>
    <div class="container">
        <div class="row h-100">
            <div class="col-12 col-md-10 mx-auto my-auto">
                <div class="card auth-card">
                    <div class="position-relative ">

                    </div>
                    <div class="form-side">

                        <?php
            if (isset($_SESSION['hasil'])) {
              ?>
                            <div class="alert alert-<?= $_SESSION['hasil']['alert']; ?> alert-dismissible fade show  mb-0" role="alert">
                                <?= $_SESSION['hasil']['pesan']; ?>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        <?php
              unset($_SESSION['hasil']);
            }
            ?>
                        <h6 class="mb-4">Masuk</h6>
                        <form method="POST" action="<?= BASEURL; ?>auth/login">
                            <label class="form-group has-float-label mb-4">
                                <input class="form-control" name="username" required />
                                <span>Username/Email</span>
                            </label>

                            <label class="form-group has-float-label mb-4">
                                <input class="form-control" type="password" name="password" placeholder="" required />
                                <span>Password</span>
                            </label>
                            <div class="d-flex justify-content-between align-items-center">
                                <a href="#">Lupa password?</a>
                                <button class="btn btn-info btn-lg btn-shadow" type="submit">Masuk</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>