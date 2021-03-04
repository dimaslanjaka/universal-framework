<main>

    <div class="row">
        <div class="col-12">
            <div class="mb-2">
                <h1>Faq</h1>
            </div>
            <div class="mb-2">


            </div>
            <div class="separator mb-5"></div>
        </div>
    </div>

    <div class="row">
        <div class="col-12" id="accordion">

            <?php foreach ($data['faq'] as $faq) : ?>
                <div class="card d-flex mb-3">
                    <div class="d-flex flex-grow-1 min-width-zero" data-toggle="collapse" data-target="#<?= $faq['number']; ?><?= $faq['tipe']; ?>" aria-expanded="true" aria-controls="collapseOne">
                        <button class="card-body btn btn-empty list-item-heading text-left text-one">
                            <?= $faq['title']; ?>
                        </button>
                    </div>
                    <div id="<?= $faq['number']; ?><?= $faq['tipe']; ?>" class="collapse" data-parent="#accordion">
                        <div class="card-body accordion-content">
                            <p><strong><?= $faq['tipe']; ?></strong></p>
                            <p>
                                <?= $faq['konten']; ?>
                            </p>
                            <br />

                        </div>
                    </div>
                </div>

            <?php endforeach; ?>
        </div>
    </div>
    </div>
</main>