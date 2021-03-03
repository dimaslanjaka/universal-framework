<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Error Page</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    <link rel="stylesheet" href="<?= BASEURL; ?>font/iconsmind-s/<?= BASEURL; ?>css/iconsminds.css" />
    <link rel="stylesheet" href="<?= BASEURL; ?>font/simple-line-icons/<?= BASEURL; ?>css/simple-line-icons.css" />

    <link rel="stylesheet" href="<?= BASEURL; ?>css/vendor/bootstrap.min.css" />
    <link rel="stylesheet" href="<?= BASEURL; ?>css/vendor/bootstrap.rtl.only.min.css" />
    <link rel="stylesheet" href="<?= BASEURL; ?>css/vendor/bootstrap-float-label.min.css" />
    <link rel="stylesheet" href="<?= BASEURL; ?>css/main.css" />
</head>

<body class="background show-spinner no-footer">
    <div class="fixed-background"></div>
    <main>
        <div class="container mt-10">
            <div class="row h-100">
                <div class="col-12 col-md-10 mx-auto my-auto">
                    <div class="card auth-card">
                        <div class="position-relative image-side ">
                            <p class=" text-white h2">TERJADI KESALAHAN</p>

                        </div>
                        <div class="form-side">
                            <div class="text-center">
                                <a href="<?= BASEURL; ?>">
                                    <h1><?= WEB_NAME; ?></h1>
                                </a>

                                <h6 class="mb-4">Ooops... <?= $data['pesanerror']; ?></h6>
                                <p class="mb-0 text-muted text-small mb-0">Error code</p>
                                <p class="display-1 font-weight-bold mb-5">
                                    <?= $data['nomorerror']; ?>
                                </p>
                                <a href="<?= BASEURL; ?>auth" class="btn btn-primary btn-lg btn-shadow">Ke Halaman Login</a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <script src="<?= BASEURL; ?>js/vendor/jquery-3.3.1.min.js"></script>
    <script src="<?= BASEURL; ?>js/vendor/bootstrap.bundle.min.js"></script>
    <script src="<?= BASEURL; ?>js/dore.script.js"></script>
    <script src="<?= BASEURL; ?>js/scripts.js"></script>
</body>

</html>