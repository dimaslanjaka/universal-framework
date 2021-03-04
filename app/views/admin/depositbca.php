<?php

$db = new Database();

$dbh = $db->connect();

$data_bca = $dbh->prepare("SELECT * FROM bca WHERE id = 'S1'");

$data_bca->execute();

$data_bca = $data_bca->fetchAll();

if (isset($_POST['login'])) {
  $user_id = filter($_POST['user_id']);

  $password = trim(filter($_POST['password']));

  $accept = $dbh->prepare("UPDATE bca SET user_id = '$user_id', password = '$password' WHERE id = 'S1'");

  $accept->execute();

  if ($accept->rowCount() > 0) {
    $_SESSION['hasil'] = ['alert' => 'success', 'pesan' => 'Sip, Data Berhasil Di Update.'];
  } else {
    $_SESSION['hasil'] = ['alert' => 'danger', 'pesan' => 'Ups, Gagal! Sistem Kami Sedang Mengalami Gangguan'];
  }
}

if (isset($_POST['reset'])) {
  $accept = $dbh->prepare("UPDATE bca SET user_id = '', password = '' WHERE id = 'S1'");

  $accept->execute();

  if ($accept->rowCount() > 0) {
    $_SESSION['hasil'] = ['alert' => 'success', 'pesan' => 'Sip, Data Berhasil Direset.'];
  } else {
    $_SESSION['hasil'] = ['alert' => 'danger', 'pesan' => 'Ups, Gagal! Sistem Kami Sedang Mengalami Gangguan'];
  }
}

?>

<main>

    <div class="container-fluid">

        <div class="row">

            <div class="col-12">

                <h1>Kelola BCA</h1>

                <nav class="breadcrumb-container d-none d-sm-block d-lg-inline-block" aria-label="breadcrumb">



                </nav>

                <div class="separator mb-5"></div>

            </div>

        </div>



        <div class="alert alert-warning   mb-2" role="alert">

            <i class="simple-icon-info"> Ketika sudah login maka deposit BCA sudah otomatis</i>

        </div>

        <div class="row">



            <div class="offset-lg-1 col-lg-10 card">

                <div class="kt-portlet card-body">

                    <div class="kt-portlet__head">

                        <div class="kt-portlet__head-label">

                            <h3 class="kt-portlet__head-title">

                                <i class="fa fa-credit-card text-primary"></i>

                                Pengaturan Mutasi BCA

                            </h3>

                        </div>

                    </div>

                    <div class="kt-portlet__body">

                        <?php

            if (isset($_SESSION['hasil'])) {
              ?>

                            <div class="alert alert-<?php echo $_SESSION['hasil']['alert']; ?> alert-dismissible" role="alert">

                                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>

                                <?php echo $_SESSION['hasil']['pesan']; ?>

                            </div>

                        <?php

              unset($_SESSION['hasil']);
            }

            ?>

                        <form class="form-horizontal" method="POST">

                            <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">

                            <div class="form-group row">

                                <label class="col-xl-3 col-lg-3 col-form-label">User ID</label>

                                <div class="col-lg-9">

                                    <input type="text" name="user_id" class="form-control" placeholder="User ID" value="<?= $data['accountbank']['user_id']; ?>">

                                </div>

                            </div>

                            <div class="form-group row">

                                <label class="col-xl-3 col-lg-3 col-form-label">Password</label>

                                <div class="col-lg-9">

                                    <input type="text" name="password" class="form-control" placeholder="Password" value="<?= $data['accountbank']['password']; ?>">

                                </div>

                            </div>

                            <div class="row">

                                <div class="form-group col-6">

                                    <button type="submit" name="reset" class="btn btn-danger form-control">Reset</button>

                                </div>

                                <div class="form-group col-6">

                                    <button type="submit" name="login" class="btn btn-primary form-control">Login</button>

                                </div>

                            </div>

                    </div>

                </div>

            </div>

        </div>



        <div class="row mt-4">

            <div class="col-12 mb-4">

                <?php if (isset($_SESSION['hasil'])) : ?>

                    <div class="alert alert-<?= $_SESSION['hasil']['alert']; ?> alert-dismissible fade show  mb-0" role="alert">

                        <?= $_SESSION['hasil']['pesan']; ?>

                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">

                            <span aria-hidden="true">&times;</span>

                        </button>

                    </div><br>

                <?php endif; ?>

                <?php unset($_SESSION['hasil']); ?>

                <!-- <div class="alert alert-warning">

                    <h5>

                        * Klik Kode ID Order untuk melihat detail Orderan!<br>



                    </h5>

                </div> -->

                <div class="card">

                    <div class="card-body">

                        <table class="data-table data-table-feature table-responsive col-12">

                            <thead>

                                <tr>

                                    <th>Tanggal</th>

                                    <th>Tipe</th>

                                    <th>deskripsi</th>

                                    <th>jumlah</th>



                                </tr>

                            </thead>

                            <tbody>

                                <?php foreach ($data['mutasibca'] as $data_layanan) : ?>

                                    <?php if ('read' == $data_layanan['status']) {
              $label = 'danger';
            } elseif ('unread' == $data_layanan['status']) {
              $label = 'success';
            }

                  ?> <tr>



                                        <td><span class="badge badge-primary"><?php echo $data_layanan['tanggal']; ?></span></td>

                                        <td><span class="badge badge-success"><?php echo $data_layanan['tipe']; ?></span></td>

                                        <td><?php echo $data_layanan['keterangan']; ?></td>

                                        <td><span class="badge badge-warning">Rp <?php echo number_format($data_layanan['jumlah'], 0, ',', '.'); ?></span></td>

                                    </tr>

                                <?php endforeach; ?>

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    </div>





</main>