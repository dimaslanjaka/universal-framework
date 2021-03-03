<main>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h1>Kirim Informasi</h1>
                <nav class="breadcrumb-container d-none d-sm-block d-lg-inline-block" aria-label="breadcrumb">

                </nav>
                <div class="separator mb-5"></div>
            </div>
        </div>
        <div class="row">
            <div class="offset-lg-1 col-lg-10 card">
                <div class="kt-portlet card-body">
                    <div class="kt-portlet__head">
                    </div>
                    <div class="kt-portlet__body">
                        <?php
                        if (isset($_SESSION['hasil'])) {
                        ?>
                            <div class="alert alert-<?php echo $_SESSION['hasil']['alert'] ?> alert-dismissible" role="alert">
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <?php echo $_SESSION['hasil']['pesan'] ?>
                            </div>
                        <?php
                            unset($_SESSION['hasil']);
                        }
                        ?>
                        <form class="form-horizontal" method="POST" action="<?= BASEURL; ?>admin/submitSendInformation">
                            <div class="row">
                                <div class="form-group col-12">
                                    <label for="exampleFormControlTextarea1">Example textarea</label>
                                    <textarea class="form-control" value="[ *INFORMASI M-PEDIA* ]" name="isiinformasi" rows="3"></textarea>
                                </div>
                            </div>
                            <button type="submit" name="kirim" class="btn btn-primary col-12">Kirim</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-12 mb-4">
                <?php if (isset($_SESSION['hasil'])) : ?>
                    <div class="alert alert-<?= $_SESSION['hasil']['alert']; ?> alert-dismissible fade show  mb-0" role="alert">
                        <?= $_SESSION['hasil']['pesan'] ?>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div><br>
                <?php endif; ?>
                <?php unset($_SESSION['hasil']); ?>
            </div>
        </div>
    </div>


</main>