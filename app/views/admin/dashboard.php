<main>

    <div class="container-fluid">

        <div class="row">

            <div class="col-12">
                <h1><?= $data['title']; ?></h1>

                <nav class="breadcrumb-container d-none d-sm-block d-lg-inline-block" aria-label="breadcrumb">

                    <ol class="breadcrumb pt-0">

                        <li class="breadcrumb-item">

                            <a href="/">Home</a>

                        </li>

                        <li class="breadcrumb-item d-none">

                            <a href="#">Library</a>

                        </li>

                        <li class="breadcrumb-item active" aria-current="page">Data</li>

                    </ol>

                </nav>

                <div class="separator mb-5"></div>


                <div class="col-md-12">
                    <div class="icon-cards-row">
                        <div class="glide dashboard-numbers">

                            <div class="glide__track" data-glide-el="track">

                                <ul class="glide__slides">

                                    <li class="glide__slide">

                                        <a href="<?= BASEURL; ?>admin/manageuser" class="card">

                                            <div class="card-body text-center">

                                                <i class="iconsminds-male"></i>

                                                <p class="card-text mb-0">Total Pengguna Aktif</p>

                                                <p class="lead text-center"><?= $data['totaluser']; ?></p>

                                                <p class="text-small">Total saldo : <?= number_format($data['countsaldousers']['total'], 0, ',', '.'); ?></p>

                                            </div>

                                        </a>

                                    </li>

                                    <li class="glide__slide">

                                        <a href="<?= BASEURL; ?>admin/managedeposit" class="card">

                                            <div class="card-body text-center">

                                                <i class="iconsminds-credit-card"></i>

                                                <p class="card-text mb-0">Total deposit</p>

                                                <p class="lead text-center"> <?= $data['alldepositsuccess']; ?></p>

                                                <p class="text-small">RP :<?= $data['countdepositsuccess']['total']; ?></p>

                                            </div>

                                        </a>

                                    </li>

                                    <li class="glide__slide">

                                        <a href="#" class="card">

                                            <div class="card-body text-center">

                                                <i class="iconsminds-clock"></i>

                                                <p class="card-text mb-0">Total Pesanan Pending</p>

                                                <p class="lead text-center"><?= $data['allorderspending']; ?></p>

                                                <p class="text-small">RP : <?= number_format($data['countorderspending']['total'], 0, ',', '.'); ?></p>

                                            </div>

                                        </a>

                                    </li>

                                    <li class="glide__slide">

                                        <a href="#" class="card">

                                            <div class="card-body text-center">

                                                <i class="iconsminds-basket-coins"></i>

                                                <p class="card-text mb-0">Total Pesanan Success</p>

                                                <p class="lead text-center"><?= $data['allorderssuccess']; ?></p>

                                                <p class="text-small">RP : <?= number_format($data['countorderssuccess']['total'], 0, ',', '.'); ?></p>

                                            </div>

                                        </a>

                                    </li>

                                    <li class="glide__slide">

                                        <a href="<?= BASEURL; ?>admin/managenews" class="card">

                                            <div class="card-body text-center">

                                                <i class="iconsminds-mail-read"></i>

                                                <p class="card-text mb-0">Kelola berita</p>

                                                <p class="lead text-center">25</p>

                                            </div>

                                        </a>

                                    </li>

                                </ul>

                            </div>

                        </div>

                    </div>



                    <div class="row container">

                        <div class="col-md-12 mb-4">

                            <div class="card">

                                <div class="position-absolute card-top-buttons">

                                    <button class="btn btn-header-light icon-button" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                        <i class="simple-icon-refresh"></i>

                                    </button>



                                    <div class="dropdown-menu dropdown-menu-right mt-3">

                                        <a class="dropdown-item" href="#">Sales</a>

                                        <a class="dropdown-item" href="#">Orders</a>

                                        <a class="dropdown-item" href="#">Refunds</a>

                                    </div>

                                </div>





                            </div>

                        </div>

                    </div>

                </div>

                <div class="row">

                    <div class="col-lg-4">

                        <div class="card mb-4 progress-banner">

                            <div class="card-body justify-content-between d-flex flex-row align-items-center">

                                <div>



                                    <i class="iconsminds-shopping-cart mr-2 text-white align-text-bottom d-inline-block"></i>

                                    <div>

                                        <a href="<?= BASEURL; ?>admin/managesosmed">

                                            <p class="lead text-white"><?= $data['allorderssosmed']; ?> Pesanan sosmed</p>

                                            <p class="text-small text-white">Total : <?= number_format($data['countorderssosmed']['total'], 0, ',', '.'); ?></p>

                                        </a>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div class="col-lg-4">

                        <div class="card mb-4 progress-banner">

                            <div class="card-body justify-content-between d-flex flex-row align-items-center">

                                <div>

                                    <i class="iconsminds-shopping-cart mr-2 text-white align-text-bottom d-inline-block"></i>

                                    <a href="<?= BASEURL; ?>admin/manageppob">

                                        <div>

                                            <p class="lead text-white"><?= $data['allordersppob']; ?> Pesanan PPOB</p>

                                            <p class="text-small text-white">Total : <?= number_format($data['countordersppob']['total'], 0, ',', '.'); ?></p>

                                        </div>

                                    </a>

                                </div>

                            </div>

                        </div>

                    </div>





                </div>

                <div class="row">



                    <div class="col-xl-6 col-lg-12 mb-4">

                        <div class="card h-100">

                            <div class="card-body">

                                <h5 class="card-title">Aktifitas Terakhir User ( Hari Ini )</h5>

                                <table class="data-table data-table-standard responsive nowrap" data-order="[[ 1, &quot;desc&quot; ]]">

                                    <thead>

                                        <tr>

                                            <th>Jam</th>

                                            <th>username</th>

                                            <th>AKSI</th>

                                            <th>IP</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        <?php foreach ($data['aktifitasuser'] as $aktifitas) : ?>

                                            <tr>

                                                <td>

                                                    <p><?= $aktifitas['time']; ?></p>

                                                </td>

                                                <td>

                                                    <p><?= $aktifitas['username']; ?></p>

                                                </td>

                                                <td>

                                                    <p><?= $aktifitas['aksi']; ?></p>

                                                </td>

                                                <td>

                                                    <p><?= $aktifitas['ip']; ?></p>

                                                </td>





                                            <?php endforeach; ?>

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>



                    <div class="col-xl-6 col-lg-12 mb-4">

                        <div class="card dashboard-filled-line-chart">

                            <div class="card-body ">

                                <div class="float-left float-none-xs">

                                    <div class="d-inline-block">

                                        <h5 class="d-inline">Pages Viewed</h5>

                                        <span class="text-muted text-small d-block">Per Session</span>

                                    </div>

                                </div>

                                <div class="btn-group float-right mt-2 float-none-xs">

                                    <button class="btn btn-outline-secondary btn-xs dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                        This Week

                                    </button>

                                    <div class="dropdown-menu">

                                        <a class="dropdown-item" href="#">Last Week</a>

                                        <a class="dropdown-item" href="#">This Month</a>

                                    </div>

                                </div>

                            </div>

                            <div class="chart card-body pt-0">

                                <canvas id="conversionChart"></canvas>

                            </div>

                        </div>

                    </div>

                    <div class="col-12 col-lg-12 col-xl-12 card mt-4">
                        <div class="card-body">
                            <h5 class="card-title">Tickets</h5>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Sub</th>
                                        <th scope="col">Msg</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php
                                    $c = 0;
                                    foreach ($data['pending_tickets'] as $ticket) {
                                        $c++;
                                        //var_dump($ticket);
                                    ?>
                                        <tr onclick="location.href=`/public/halaman/ticketview/<?= $ticket['id'] ?>`">
                                            <th scope="row"><?= $c ?></th>
                                            <td><?= $ticket['subjek'] ?></td>
                                            <td><?= (strlen($ticket['pesan']) > 20) ? substr($ticket['pesan'], 0, 20) . '...' : $ticket['pesan'] ?></td>
                                            <td><?php
                                                switch (strtolower($ticket['status'])) {
                                                    case 'pending':
                                                        echo '<span class="badge badge-secondary">Pending</span>';
                                                        break;
                                                    case 'waiting':
                                                        echo '<span class="badge badge-warning">Waiting</span>';
                                                        break;
                                                    case 'closed':
                                                        echo '<span class="badge badge-danger">Closed</span>';
                                                        break;
                                                    case 'responded':
                                                        echo '<span class="badge badge-success">Responded</span>';
                                                        break;
                                                }
                                                ?></td>
                                        </tr>
                                    <?php
                                    }
                                    ?>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>













            </div>

</main>