<main>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">

                <h1>Aktifitas <?= $data['user']['username']; ?></h1>

                <div class="separator mb-5"></div>
            </div>
        </div>


        <div class="row">
            <div class="col-12">


                <div class="card mb-4">
                    <div class="card-body">
                        <ul class="sortable list-unstyled">
                            <?php foreach ($data['aktifitas'] as $aktifitas) : ?>
                                <li>
                                    <p>
                                        <span class="badge badge-pill badge-secondary handle">
                                            <i class="simple-icon-cursor-move"></i>
                                        </span>
                                        <span>Kamu <?= $aktifitas['aksi']; ?> pada <?= $aktifitas['date'] ?> | <?= $aktifitas['time']; ?></span>
                                    </p>
                                </li>
                            <?php endforeach; ?>
                        </ul>

                    </div>
                </div>



            </div>
        </div>
    </div>

    <div class="sk-circle">
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
    </div>
</main>