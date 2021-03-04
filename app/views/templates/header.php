<?php

$dbh = new Database();

$db = $dbh->connect();

$cek_berita = $db->prepare('SELECT * FROM berita LIMIT 5');

$cek_berita->execute();

$cek_berita = $cek_berita->fetchAll();

?>



<!DOCTYPE html>

<html lang="en">

<!--


HEADER


Credit by : Ilman sunanuddin.

Facebook : https://facebook.com/ilman.sn

instagram : https://instagram.com/ilman.sn

 -->



<head>

    <meta charset="UTF-8">

    <title><?= $data['title']; ?> <?= WEB_NAME; ?></title>

    <link rel="icon" href="<?= BASEURL; ?>icon/mp.ico" type="image/png" sizes="16x16">

    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="author" content="Ilman Sunanuddin">

    <meta name="description" content="M Pedia Penyedia Pulsa & Followers Murah Indonesia">

    <meta name="keywords" content="M Pedia Pulsa PPOB & Followers Murah #1 Indonesia followersinstagram followers panel followers scriptpanel m pediapanel autolike autolikes pulsamurah jualanpulsa bisnisonline panelsmmindonesia panel smm indonesia panel pusat smm indonesia">

    <script src="<?= BASEURL; ?>js/vendor/jquery-3-5-1.js" type="text/javascript"></script>

    <link rel="stylesheet" type="text/css" href="<?= BASEURL; ?>font/iconsmind-s/css/iconsminds.css" />

    <link rel="stylesheet" type="text/css" href="<?= BASEURL; ?>font/simple-line-icons/css/simple-line-icons.css" />



    <link rel="stylesheet" type="text/css" href="<?= BASEURL; ?>css/vendor/bootstrap.min.css" />

    <link rel="stylesheet" type="text/css" href="<?= BASEURL; ?>css/vendor/bootstrap.rtl.only.min.css" />

    <link rel="stylesheet" type="text/css" href="<?= BASEURL; ?>css/vendor/component-custom-switch.min.css" />

    <link rel="stylesheet" type="text/css" href="<?= BASEURL; ?>css/vendor/perfect-scrollbar.css" />

    <link rel="stylesheet" type="text/css" href="<?= BASEURL; ?>css/vendor/fullcalendar.min.css" />

    <link rel="stylesheet" type="text/css" href="<?= BASEURL; ?>css/vendor/dataTables.bootstrap4.min.css" />

    <link rel="stylesheet" type="text/css" href="<?= BASEURL; ?>css/vendor/datatables.responsive.bootstrap4.min.css" />

    <link rel="stylesheet" type="text/css" href="<?= BASEURL; ?>css/vendor/select2.min.css" />

    <link rel="stylesheet" type="text/css" href="<?= BASEURL; ?>css/vendor/perfect-scrollbar.css" />

    <link rel="stylesheet" type="text/css" href="<?= BASEURL; ?>css/vendor/glide.core.min.css" />

    <link rel="stylesheet" type="text/css" href="<?= BASEURL; ?>css/vendor/bootstrap-stars.css" />

    <link rel="stylesheet" type="text/css" href="<?= BASEURL; ?>css/vendor/nouislider.min.css" />

    <link rel="stylesheet" type="text/css" href="<?= BASEURL; ?>css/vendor/bootstrap-datepicker3.min.css" />

    <link rel="stylesheet" type="text/css" href="<?= BASEURL; ?>css/dore.light.bluenavy.css" />

    <link rel="stylesheet" href="<?= BASEURL; ?>css/vendor/select2.min.css" />

    <link rel="stylesheet" href="<?= BASEURL; ?>css/vendor/select2-bootstrap.min.css" />

    <link rel="stylesheet" href="<?= BASEURL; ?>css/vendor/bootstrap-datepicker3.min.css" />

    <link rel="stylesheet" href="<?= BASEURL; ?>css/vendor/bootstrap-tagsinput.css" />







    <script>
        var url = '<?= BASEURL; ?>'
    </script>



    <link rel="stylesheet" type="text/css" href="<?= BASEURL; ?>css/main.css" />

</head>



<body id="app-container" class="menu-default show-spinner">

    <nav class="navbar fixed-top">

        <div class="d-flex align-items-center navbar-left">

            <a href="#" class="menu-button d-none d-md-block">

                <svg class="main" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 17">

                    <rect x="0.48" y="0.5" width="7" height="1" />

                    <rect x="0.48" y="7.5" width="7" height="1" />

                    <rect x="0.48" y="15.5" width="7" height="1" />

                </svg>

                <svg class="sub" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 17">

                    <rect x="1.56" y="0.5" width="16" height="1" />

                    <rect x="1.56" y="7.5" width="16" height="1" />

                    <rect x="1.56" y="15.5" width="16" height="1" />

                </svg>

            </a>



            <a href="#" class="menu-button-mobile d-xs-block d-sm-block d-md-none">

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 17">

                    <rect x="0.5" y="0.5" width="25" height="1" />

                    <rect x="0.5" y="7.5" width="25" height="1" />

                    <rect x="0.5" y="15.5" width="25" height="1" />

                </svg>

            </a>

        </div>





        <a class="navbar-logo" href="Dashboard.Default.html">

            <span class=" d-none d-xs-block"></span>

            <span class=" d-block d-xs-none"></span>

        </a>



        <div class="navbar-right">

            <div class="header-icons d-inline-block align-middle">

                <div class="d-none d-md-inline-block align-text-bottom mr-3">

                    <div class="custom-switch custom-switch-primary-inverse custom-switch-small pl-1" data-toggle="tooltip" data-placement="left" title="Dark Mode">

                        <input class="custom-switch-input" id="switchDark" type="checkbox" checked>

                        <label class="custom-switch-btn" for="switchDark"></label>

                    </div>

                </div>







                <div class="position-relative d-inline-block">

                    <button class="header-icon btn btn-empty buttonberita" type="button" id="notificationButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                        <i class="simple-icon-bell"></i>

                        <?php if (1 == $data['user']['read_news']) : ?>

                            <span class="count adaberita">!</span>

                        <?php endif; ?>





                    </button>

                    <script>
                        $('.buttonberita').on('click', function() {

                            $.ajax({

                                url: url.concat('berita/bacaberita'),

                                type: 'get',

                                dataType: 'text',

                                success: function(hasil) {

                                    if (hasil == 'success') {

                                        $('.adaberita').attr('style', 'display:none;');

                                    }

                                }

                            })

                        })
                    </script>

                    <div class="dropdown-menu dropdown-menu-right mt-3 position-absolute" id="notificationDropdown">

                        <div class="scroll">



                            <?php foreach ($cek_berita as $berita) : ?>

                                <!-- tipe berita -->

                                <?php

                $tipeberita = $berita['tipe'];

                if ('INFO' == $tipeberita) {
                  $alert = 'info';
                } elseif ('PENTING' == $tipeberita) {
                  $alert = 'danger';
                } else {
                  $alert = 'warning';
                }

                ?>



                                <!-- ---------- -->

                                <!-- Icon berita -->

                                <?php

                $iconberita = $berita['icon'];

                if ('PENGGUNA' == $iconberita) {
                  $imgberita = 'simple-icon-people';
                } elseif ('LAYANAN' == $iconberita) {
                  $imgberita = 'iconsminds-gears';
                } elseif ('PROMO' == $iconberita) {
                  $imgberita = 'iconsminds-refinery';
                } else {
                  $imgberita = 'umum.jpg';
                }

                ?>

                                <!--  -->

                                <div class="d-flex flex-row mb-3 pb-3 border-bottom">



                                    <i class="<?= $imgberita; ?>  "></i>



                                    <div class="pl-3">

                                        <a href="<?= BASEURL; ?>berita/index/<?= $berita['id']; ?>">

                                            <p class="font-weight-medium mb-1 text-<?= $alert; ?>"><?= $berita['title']; ?> <i class="simple-icon-eye text-right"></i></p>

                                            <p><?= $berita['konten']; ?></p>

                                            <p class="text-muted mb-0 text-small"><?= $berita['date']; ?> - <?= $berita['time']; ?></p>

                                        </a>

                                    </div>

                                </div>

                            <?php endforeach; ?>

                        </div>

                        <a href="<?= BASEURL; ?>berita">

                            <div class="bg-primary shadow rounded text-center" style="width: 100;">

                                <p><i class="simple-icon-eye">

                                        Lihat Semua

                                    </i></p>



                            </div>

                        </a>

                    </div>

                </div>



                <button class="header-icon btn btn-empty d-none d-sm-inline-block" type="button" id="fullScreenButton">

                    <i class="simple-icon-size-fullscreen"></i>

                    <i class="simple-icon-size-actual"></i>

                </button>



            </div>



            <div class="user d-inline-block">

                <button class="btn btn-empty p-0" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                    <span class="name"><?= $data['user']['username']; ?></span>

                    <span>

                        <img alt="Profile Picture" src="<?= BASEURL; ?>img/profiles/l-1.jpg" />

                    </span>

                </button>



                <div class="dropdown-menu dropdown-menu-right mt-3">

                    <a class="dropdown-item" href="<?= BASEURL; ?>akun"">Pengaturan Akun</a>

                    <a class=" dropdown-item" href="<?= BASEURL; ?>akun/mutasi">Mutasi saldo</a>

                    <a class=" dropdown-item" href="<?= BASEURL; ?>akun/aktifitas">Riwayat Aktifitas</a>

                    <a class="dropdown-item" href="<?= BASEURL; ?>auth/logout">keluar</a>

                </div>

            </div>

        </div>

    </nav>



    <div class="menu">

        <div class="main-menu">

            <div class="scroll">

                <ul class="list-unstyled">



                    <?php if ('Developers' == $data['user']['level']) { ?>

                        <li>

                            <a href="#beranda">

                                <i class="iconsminds-shop-4"></i>

                                <span>Beranda</span>

                            </a>

                        </li>

                    <?php } else { ?>

                        <li>

                            <a href="<?= BASEURL; ?>">

                                <i class="iconsminds-shop-4"></i>

                                <span>Beranda</span>

                            </a>

                        </li>

                    <?php } ?>

                    <li>

                        <a href="#app">

                            <i class="iconsminds-air-balloon-1"></i> App

                        </a>

                    </li>

                    <li>

                        <a href="#halaman">

                            <i class="iconsminds-digital-drawing"></i> Halaman

                        </a>

                    </li>

                    <li>

                        <a href="<?= BASEURL; ?>doc">

                            <i class="iconsminds-library"></i> Docs

                        </a>

                    </li>

                </ul>

            </div>

        </div>



        <div class="sub-menu">

            <div class="scroll">

                <ul class="list-unstyled" data-link="beranda" id="beranda">

                    <li>

                        <a href="#" data-toggle="collapse" data-target="#collapseAuthorization" aria-expanded="true" aria-controls="collapseAuthorization" class="rotate-arrow-icon opacity-50">

                            <i class="simple-icon-arrow-down"></i> <span class="d-inline-block"> Dashboard</span>

                        </a>

                        <div id="collapseAuthorization" class="collapse show">

                            <ul class="list-unstyled inner-level-menu">

                                <li>

                                    <a href="<?= BASEURL; ?>home">

                                        <i class="iconsminds-shopping-cart"></i> <span class="d-inline-block"> Member</span>

                                    </a>

                                </li>

                                <li>

                                    <a href="<?= BASEURL; ?>admin">

                                        <i class="simple-icon-wallet"></i> <span class="d-inline-block"> Admin</span>

                                    </a>

                                </li>



                            </ul>

                        </div>

                    </li>



                </ul>

                <ul class="list-unstyled" data-link="app" id="app">

                    <li>

                        <a href="#" data-toggle="collapse" data-target="#collapseAuthorization" aria-expanded="true" aria-controls="collapseAuthorization" class="rotate-arrow-icon opacity-50">

                            <i class="simple-icon-arrow-down"></i> <span class="d-inline-block"> Riwayat</span>

                        </a>

                        <div id="collapseAuthorization" class="collapse show">

                            <ul class="list-unstyled inner-level-menu">

                                <li>

                                    <a href="<?= BASEURL; ?>riwayat">

                                        <i class="iconsminds-shopping-cart"></i> <span class="d-inline-block"> Pembelian</span>

                                    </a>

                                </li>

                                <li>

                                    <a href="<?= BASEURL; ?>deposit/riwayatdeposit">

                                        <i class="simple-icon-wallet"></i> <span class="d-inline-block"> Deposit</span>

                                    </a>

                                </li>



                            </ul>

                        </div>

                    </li>

                    <li>

                        <a href="#" data-toggle="collapse" data-target="#saldo" aria-expanded="true" aria-controls="saldo" class="rotate-arrow-icon opacity-50">

                            <i class="simple-icon-arrow-down"></i> <span class="d-inline-block">Saldo</span>

                        </a>

                        <div id="saldo" class="collapse show">

                            <ul class="list-unstyled inner-level-menu">



                                <li>

                                    <a href="<?= BASEURL; ?>deposit/voucher">

                                        <i class="simple-icon-tag"></i> <span class="d-inline-block">Redem Voucher</span>

                                    </a>

                                </li>

                                <li>

                                    <a href="<?= BASEURL; ?>deposit/kirimsaldo">

                                        <i class="iconsminds-handshake"></i> <span class="d-inline-block">kirimsaldo</span>

                                    </a>

                                </li>

                            </ul>

                        </div>

                    </li>

                </ul>

                <ul class="list-unstyled" data-link="halaman">

                    <li>

                        <a href="<?= BASEURL; ?>halaman/faq">

                            <i class="simple-icon-question"></i> <span class="d-inline-block">Pertanyaan Umum</span>

                        </a>

                    </li>

                    <li>

                        <a href="<?= BASEURL; ?>halaman/tos">

                            <i class="iconsminds-gears"></i> <span class="d-inline-block">Ketentuan Layanan</span>

                        </a>

                    </li>

                    <li>

                        <a href="<?= BASEURL; ?>halaman/daftarharga">

                            <i class="iconsminds-pricing"></i> <span class="d-inline-block">Daftar Harga</span>

                        </a>

                    </li>

                    <li>

                        <a href="Apps.Chat.html">

                            <i class="simple-icon-bubbles"></i> <span class="d-inline-block">Chat</span>

                        </a>

                    </li>

                    <li>

                        <a href="<?= BASEURL; ?>halaman/kontakadmin">

                            <i class="simple-icon-phone"></i> <span class="d-inline-block">Kontak Admin</span>

                        </a>

                    </li>

                </ul>









            </div>

        </div>

    </div>

    <!-- GetButton.io widget -->

    <script type="text/javascript">
        (function() {

            var options = {

                whatsapp: "6285350505161", // WhatsApp number

                call_to_action: "Kirimi kami pesan", // Call to action

                position: "left", // Position may be 'right' or 'left'

            };

            var proto = document.location.protocol,
                host = "getbutton.io",
                url = proto + "//static." + host;

            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = url + '/widget-send-button/js/init.js';

            s.onload = function() {
                WhWidgetSendButton.init(host, proto, options);
            };

            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);

        })();
    </script>

    <!-- /GetButton.io widget -->