<main>

    <div class="container-fluid">

        <div class="row">

            <div class="col-12">


                <a href="/">Home</a>
                <h1>Daftar Layanan</h1>

                <nav class="breadcrumb-container d-none d-sm-block d-lg-inline-block" aria-label="breadcrumb">

                    <ol class="breadcrumb pt-0">

                        <li class="breadcrumb-item">

                            <a href="#">Home</a>

                        </li>

                        <li class="breadcrumb-item d-none">

                            <a href="#">Library</a>

                        </li>

                        <li class="breadcrumb-item active" aria-current="page">Data</li>

                    </ol>

                </nav>

                <div class="separator mb-5"></div>

            </div>



        </div>





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

</main>

<script>
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