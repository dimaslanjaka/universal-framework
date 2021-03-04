<?php



require_once('app/init.php');

session_start();

$dbh = new Database;

$db = $dbh->connect();

?>

<!DOCTYPE html>

<html lang="en">

<!--
INDEX

Credit by : Ilman sunanuddin.

Facebook : https://facebook.com/ilman.sn

instagram : https://instagram.com/ilman.sn

 -->



<head>

  <meta charset="utf-8">

  <title><?= WEB_NAME; ?> Landing page..</title>

  <link rel="icon" href="assets/icons/mp.ico" type="image/png" sizes="16x16">
  <link rel="apple-touch-icon" sizes="57x57" href="assets/icons/mp.ico">
  <link rel="apple-touch-icon" sizes="60x60" href="assets/icons/mp.ico">
  <link rel="apple-touch-icon" sizes="72x72" href="assets/icons/mp.ico">
  <link rel="apple-touch-icon" sizes="76x76" href="assets/icons/mp.ico">
  <link rel="apple-touch-icon" sizes="114x114" href="assets/icons/mp.ico">
  <link rel="apple-touch-icon" sizes="120x120" href="assets/icons/mp.ico">
  <link rel="apple-touch-icon" sizes="144x144" href="assets/icons/mp.ico">
  <link rel="apple-touch-icon" sizes="152x152" href="assets/icons/mp.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="assets/icons/mp.ico">
  <link rel="icon" type="image/png" sizes="192x192" href="assets/icons/mp.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="assets/icons/mp.ico">
  <link rel="icon" type="image/png" sizes="96x96" href="assets/icons/mp.ico">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/icons/mp.ico">
  <link rel="manifest" href="/manifest.json">
  <meta name="msapplication-TileColor" content="#ffffff">
  <meta name="msapplication-TileImage" content="assets/icons/mp.ico">
  <meta name="theme-color" content="#ffffff">

  <meta name="viewport" content="width=device-width, initial-scale=1">

  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <meta name="author" content="Ilman Sunanuddin">

  <meta name="description" content="M Pedia Penyedia Pulsa & Followers Murah Indonesia">

  <meta name="keywords" content="M Pedia Pulsa PPOB & Followers Murah #1 Indonesia followersinstagram followers panel followers scriptpanel m pediapanel autolike autolikes pulsamurah jualanpulsa bisnisonline panelsmmindonesia panel smm indonesia panel pusat smm indonesia">

  <link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" media="all" />

  <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,900%7COpen+Sans:400" rel="stylesheet">

  <link rel="stylesheet" href="assets/css/animate.css"> <!-- Resource style -->

  <link rel="stylesheet" href="assets/css/owl.carousel.css">

  <link rel="stylesheet" href="assets/css/owl.theme.css">

  <link rel="stylesheet" href="assets/css/ionicons.min.css"> <!-- Resource style -->

  <link href="assets/css/style.css" rel="stylesheet" type="text/css" media="all" />

</head>



<body>

  <!-- MODAL LOGIN -->

  <div class="modal fade modal__custom" id="login" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">

    <div class="modal-dialog modal-dialog-centered" role="document">

      <div class="modal-content">

        <div class="modal-header border-bottom-0">

          <button type="button" class="close pr-4" data-dismiss="modal" aria-label="Close">

            <span aria-hidden="true">&times;</span>

          </button>

        </div>

        <div class="modal-body pl-4 pr-4 pb-4 pt-2">

          <div class="text-center mb-4">

            <h1 class="text-info">login <?= WEB_NAME; ?></h1>

          </div>

          <div class="d-flex">

            <div class="modal__title">

              Masuk

            </div>

            <div class="ml-auto modal__link" onclick="window.open('<?= BASEURL; ?>auth/register');" style="cursor:pointer">

              Daftar

            </div>

          </div>

          <div class="mt-4">

            <form class="modal__form custom__form" action="<?= BASEURL; ?>auth/login" method="POST" id="modal_login_form">

              <input type="hidden" name="_token" value="KnkpuN6aPEprXlV0VGZCOC8MmuWzbbGCLtM5hKjq">

              <div class="form-group has-feedback ">

                <label for="phone">Username / Email</label>

                <input type="text" id="username" name="username" class="form-control" aria-describedby="phoneHelp" required>

              </div>

              <div class="form-group has-feedback ">

                <label for="exampleInputPassword1">Kata Sandi</label>

                <div class="input-group" id="password">

                  <input type="password" name="password" class="form-control" required>

                  <div class="input-group-prepend">

                    <span class="input-group-text custom__login-input-password" id="inputGroupPrepend">

                      <i onclick="showPassword('password')" class="simple-icon-eye"></i>

                    </span>

                  </div>

                </div>

              </div>

              <div class="d-flex">

                <div class="custom-control custom-checkbox my-1 mr-sm-2">

                  <input type="checkbox" name="remember" class="custom-control-input" id="customControlInline">

                  <label class="custom-control-label" for="customControlInline">Ingat Saya</label>

                </div>

                <div class="ml-auto modal__lupa">

                  <a href="<?= BASEURL; ?>auth/resetpassword">Lupa Kata Sandi?</a>

                </div>

              </div>

              <div class="text-center">

                <div class="g-recaptcha" data-sitekey="6LeXLNgZAAAAAIE7oX85CvgzMsxTr7W33I5nOqEN" data-callback="onSubmitLoginModal" data-size="invisible">

                </div>

                <button type="submit" class="btn btn-info shadow mt-4 pl-5 pr-5">Login</button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>

  </div>

  <!--  -->





  <div class="wrapper">

    <!-- Navbar Section -->

    <nav class="navbar navbar-expand-md navbar-light bg-light fixed-top">

      <div class="container container">

        <a class="navbar-brand" href="#"><?= WEB_NAME; ?></a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">

          <span class="navbar-toggler-icon"></span>

        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">

          <ul class="navbar-nav ml-auto navbar-right">

            <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#main">Home</a></li>

            <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#features">Fitur</a></li>



            <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#pricing">Harga Layanan</a></li>

            <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#buy">Signup</a></li>

          </ul>

        </div>

      </div>

    </nav><!-- Navbar End -->





    <div id="main" class="main">

      <div class="hero">

        <div class="container">

          <div class="row align-center">

            <div class="col-md-12 col-lg-5">

              <div class="hero-content">

                <h5 class="d-none d-sm-block">Menyediakan</h5>

                <h2>PPOB & SMM #1 INDONESIA</h2>

                <p><?= WEB_NAME; ?> Merupakan penyedia layanan Sosial Media Marketing Dan PPOB Terlengkap Di indonesia, Mari bergabung untuk mendapatkan layanan m pedia seperti Followers sosial media, Pulsa ,Voucher game Dll.. Daftar sekarang dan tingkatkan kualitas sosial mediamu.</p>

                <div class="form text-center">

                  <?php if (isset($_SESSION['user'])) { ?>

                    <button class="submit-button" onclick="window.open('<?= BASEURL; ?>home')">Member Area</button>

                  <?php } else { ?>

                    <button class="submit-button" data-toggle="modal" data-target="#login">Masuk</button>

                  <?php } ?>

                  <br>

                  <br>

                  <button class="submit-button"><a href="https://chandrapedia.my.id/public/auth/register" class="text-white">Daftar Gratis</a></button>

                  </form>

                  <div id="response"></div>

                </div>

                <div class="form-note">

                  <p></p>

                </div>

              </div>

            </div>

            <div class="col-md-12 col-lg-6 offset-lg-1">

              <img class="img-fluid" src="assets/home.png" alt="Hero">

            </div>

          </div>

        </div>

      </div>





      <div id="pricing" class="pricing-section text-center">

        <div class="container">

          <div class="row mt-4 ">

            <div class="card col-12">

              <div class="card-body">



                <ul class="nav nav-pills navtab-bg nav-justified mb-3">

                  <li class="nav-item">

                    <a href="#sosmed" data-toggle="tab" aria-expanded="false" class="nav-link active">

                      Sosmed

                    </a>

                  </li>

                  <li class="nav-item">

                    <a href="#pulsa" data-toggle="tab" aria-expanded="true" class="nav-link">

                      Pulsa

                    </a>

                  </li>

                  <li class="nav-item">

                    <a href="#game" data-toggle="tab" aria-expanded="true" class="nav-link">

                      Games

                    </a>

                  </li>

                  <!-- <li class="nav-item">

                            <a href="#digital" data-toggle="tab" aria-expanded="true" class="nav-link">

                                Produk Digital

                            </a>

                        </li> -->

                </ul>

                <div class="tab-content">

                  <div class="tab-pane active" id="sosmed">

                    <form role="form" method="POST">

                      <div class="row">

                        <?php

                        $get_cat = $db->prepare("SELECT * FROM kategori_layanan WHERE tipe = 'Sosial Media'");

                        $get_cat->execute();

                        $data['katsosmed'] = $get_cat->fetchAll();

                        ?>

                        <div class="form-group col-12">

                          <select class="form-control" id="categorysosmed" name="categorysosmed">

                            <option value="0" selected disabled>- Pilih salah satu -</option>

                            <?php foreach ($data['katsosmed'] as $katsosmed) : ?>

                              <option value="<?= $katsosmed['kode']; ?>"><?= $katsosmed['nama']; ?></option>

                            <?php endforeach; ?>

                          </select>

                        </div>

                      </div>

                      <hr>

                      <div class="table-responsive">

                        <table class="table table-bordered mb-0">

                          <thead>

                            <tr>

                              <th class="text-center">ID</th>

                              <th class="text-center">Nama</th>

                              <th class="text-center">Min</th>

                              <th class="text-center">Max</th>

                              <th class="text-center">Harga/K</th>

                              <th class="text-center">Harga Reseller/K</th>



                              <th class="text-center">Status</th>

                            </tr>

                          </thead>

                          <tbody id="pricelist1">

                            <tr>

                              <td colspan="7" class="text-center">Pilih kategori dahulu.</td>

                              <td class="text-center text-danger"><i class="fe-alert-octagon"></td>

                            </tr>

                          </tbody>

                        </table>

                      </div>

                    </form>

                  </div>

                  <div class="tab-pane show" id="pulsa">

                    <form role="form" method="POST">

                      <div class="row">

                        <div class="form-group col-6">

                          <select class="form-control" id="categorypulsa" name="categorypulsa">

                            <option value="0" selected disabled>- Select One -</option>

                            <option value="Pulsa">Pulsa Reguler</option>

                            <option value="pascabayar">Pascabayar</option>

                            <option value="Pulsa Internasional">Pulsa Internasional</option>

                            <option value="Data">Paket Internet</option>

                            <option value="PLN">Token Listrik (PLN)</option>

                            <option value="E-Money">Saldo E-Money</option>

                            <option value="Voucher">Voucher Digital</option>

                            <option value="Games">Voucher Game</option>



                          </select>

                        </div>

                        <div class="form-group col-6">

                          <select class="form-control" id="operatorpulsa" name="operatorpulsa">

                            <option value="0" selected disabled>- Select One -</option>

                          </select>

                        </div>

                      </div>

                      <hr>

                      <div class="table-responsive">

                        <table class="table table-bordered mb-0">

                          <thead>

                            <tr>

                              <th class="text-center">ID</th>

                              <th class="text-center">Nama</th>

                              <th class="text-center">Note</th>

                              <th class="text-center">Harga</th>

                              <th class="text-center">Harga Reseller</th>



                              <th class="text-center">Status</th>

                            </tr>

                          </thead>

                          <tbody id="pricelist2">

                            <tr>

                              <td colspan="6" class="text-center">Pilih kategori dahulu.</td>

                              <td class="text-center text-danger"><i class="fe-alert-octagon"></td>

                            </tr>

                          </tbody>

                        </table>

                      </div>

                    </form>

                  </div>

                  <div class="tab-pane show" id="game">

                    <form role="form" method="POST">

                      <div class="row">

                        <div class="form-group col-12">

                          <select class="form-control" id="categorygame" name="categorygame">

                            <option value="0" selected disabled>- Select One -</option>



                          </select>

                        </div>

                      </div>

                      <hr>

                      <div class="table-responsive">

                        <table class="table table-bordered mb-0">

                          <thead>

                            <tr>

                              <th class="text-center">ID</th>

                              <th class="text-center">Nama</th>

                              <th class="text-center">Harga</th>

                              <th class="text-center">Harga Reseller</th>

                              <th class="text-center">Harga Special/H2H</th>

                              <th class="text-center">Status</th>

                            </tr>

                          </thead>

                          <tbody id="pricelist3">

                            <tr>

                              <td colspan="5" class="text-center">Segera...</td>

                              <td class="text-center text-danger"><i class="fe-alert-octagon"></td>

                            </tr>

                          </tbody>

                        </table>

                      </div>

                    </form>

                  </div>





                </div>

              </div>

            </div>

          </div>

        </div>

      </div>





      <div id="features" class="features">

        <div class="container-m">

          <div class="row text-center">

            <div class="col-md-12">

              <div class="features-intro">

                <h2>Selamat datang di <?= WEB_NAME; ?></h2>

                <p>Kami mengutamakan Kenyamanan dan kemanan member dalam bertransaksi dan menggukanakan fitur yang ada di <?= WEB_NAME; ?> ,Oleh karena itu kami menyajikan fitur fitur yang aman dan friendly!</p>

              </div>

            </div>

            <div class="col-sm-6 col-lg-4">

              <div class="feature-list">

                <div class="card-icon">

                  <div class="card-img">

                    <img src="assets/icons/p2.png" width="60" alt="Feature">

                  </div>

                </div>

                <div class="card-text">

                  <h3>Responsive</h3>

                  <p>Tampilan <?= WEB_NAME; ?> Sangat responsive sehingga nyaman dilihat dan digunakan menggunakan platform apapun</p>

                </div>

              </div>

            </div>

            <div class="col-sm-6 col-lg-4">

              <div class="feature-list">

                <div class="card-icon">

                  <div class="card-img">

                    <img src="assets/icons/p4.png" width="60" alt="Feature">

                  </div>

                </div>

                <div class="card-text">

                  <h3>User Friendly</h3>

                  <p>Memungkinkan semua member disini bisa berinteraksi dan sharing , tersedia Group client area khusus member <?= WEB_NAME; ?></p>

                </div>

              </div>

            </div>

            <div class="col-sm-6 col-lg-4">

              <div class="feature-list">

                <div class="card-icon">

                  <div class="card-img">

                    <img src="assets/icons/p6.png" width="60" alt="Feature">

                  </div>

                </div>

                <div class="card-text">

                  <h3>Keamanan</h3>

                  <p>Tidak perlu takut akun anda hilang atau di hack oleh orang lain, Keamanan <?= WEB_NAME; ?> Sudah cukup untuk mengatasi itu.</p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>



















      <div id="buy" class="cta-sm">

        <div class="container-m text-center">

          <div class="cta-content">

            <h4>Tunggu apa lagi?</h4>

            <h1>Daftar Member <?= WEB_NAME; ?> Sekarang Juga Gratis!</h1>

            <a class="btn-action" href="<?= BASEURL; ?>reg">Daftar Sekarang</a>

          </div>

        </div>

      </div>





      <!-- Pelican Footer Section -->

      <div class="footer-sm">

        <div class="container-m">

          <div class="row">

            <div class="col-md-4">

              <a class="footer-logo" href="<?= BASEURL; ?>"><?= WEB_NAME; ?></a>

            </div>

            <div class="col-md-4">

              <h6>&copy; Mnzcreate 2021 Rights Reserved</h6>

            </div>

            <div class="col-md-4">

              <ul>

                <li><a href="https://facebook.com/ilman.sn">Facebook</a></li>

                <li><a href="https://twitter.com/ilman.sn">Twitter</a></li>

                <li><a href="https://instagram.com/ilman.sn">instagram</a></li>

              </ul>

            </div>

          </div>

        </div>

      </div>





      <!-- Scroll To Top -->

      <div id="back-top" class="bk-top">

        <div class="bk-top-txt">

          <a class="back-to-top js-scroll-trigger" href="#main">Up</a>

        </div>

      </div>

      <!-- Scroll To Top Ends-->



    </div> <!-- Main -->

  </div><!-- Wrapper -->





  <!-- Jquery and Js Plugins -->

  <script type="text/javascript" src="assets/js/jquery-2.1.1.js"></script>

  <script type="text/javascript" src="assets/js/popper.min.js"></script>

  <script type="text/javascript" src="assets/js/bootstrap.min.js"></script>

  <script type="text/javascript" src="assets/js/jquery.validate.min.js"></script>

  <script type="text/javascript" src="assets/js/plugins.js"></script>

  <script type="text/javascript" src="assets/js/custom.js"></script>

  <script type="text/javascript" src="http://localhost:35729/livereload.js"></script>


  <script>
    var url = '<?= BASEURL; ?>'

    $(document).ready(function() {



      $('#categorysosmed').change(function() {

        var kategori = $('#categorysosmed').val()

        $.ajax({

          url: url.concat('halaman/layanansosmed'),

          type: 'post',

          dataType: 'html',

          data: {

            kategori: kategori

          },

          success: function(hasil) {

            $('#pricelist1').html(hasil)

          }





        })

      })





      $('#categorypulsa').change(function() {

        var tipe = $('#categorypulsa').val();

        $.ajax({

          url: url.concat('halaman/katppob'),

          type: 'post',

          dataType: 'html',

          data: {

            tipe: tipe

          },

          success: function(hasil) {

            $('#operatorpulsa').html(hasil);

          }

        })

      })



      $('#operatorpulsa').change(function() {

        var tipe = $('#categorypulsa').val();

        var operator = $(this).val();



        $.ajax({

          url: url.concat('halaman/layananppob'),

          type: 'post',

          dataType: 'html',

          data: {

            tipe: tipe,

            operator: operator

          },

          success: function(hasil) {

            $('#pricelist2').html(hasil)

          }

        })

      })



    })
  </script>

</body>



</html>