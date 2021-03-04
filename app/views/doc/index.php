<main>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">

                <div class="mb-2">
                    <h1>Dokumentasi API</h1>
                    <div class="text-zero top-right-button-container">

                    </div>
                    <nav class="breadcrumb-container d-none d-sm-block d-lg-inline-block" aria-label="breadcrumb">
                    </nav>
                </div>


                <ul class="nav nav-tabs separator-tabs ml-0 mb-5" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="sosmed-tab" data-toggle="tab" href="#sosmed" role="tab" aria-controls="sosmed" aria-selected="true">Sosial Media</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link " id="ppob-tab" data-toggle="tab" href="#ppob" role="tab" aria-controls="ppob" aria-selected="false">ppob</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link " id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
                    </li>



                </ul>
                <div class="tab-content">
                    <div class="tab-pane show active" id="sosmed" role="tabpanel" aria-labelledby="sosmed-tab">
                        <div class="row">

                            <div class="col-12 col-md-6">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="header-title">
                                            <b>Membuat <font class="text-primary">Pesanan Baru</font></b>
                                        </h4>
                                        <hr>
                                        <div class="table-responsive">
                                            <table class="table table-bordered table-striped">
                                                <tbody>
                                                    <tr>
                                                        <th style="width:25%">METHOD</th>
                                                        <th style="width:75%">POST</th>
                                                    </tr>
                                                    <tr>
                                                        <th style="width:25%">URL</th>
                                                        <td style="width:75%"><?= BASEURL; ?>api/order</td>
                                                    </tr>
                                                    <tr>
                                                        <th style="width:25%">api_key</th>
                                                        <td style="width:75%">API Key anda</td>
                                                    </tr>
                                                    <tr>
                                                        <th style="width:25%">tipe</th>
                                                        <td style="width:75%">Sosial Media</td>
                                                    </tr>
                                                    <tr>
                                                        <th style="width:25%">id</th>
                                                        <td style="width:75%">Id layanan ( Sosial Media ) <a href="<?= BASEURL; ?>halaman/daftarharga">Cek disini</a></td>
                                                    </tr>
                                                    <tr>
                                                        <th style="width:25%">target</th>
                                                        <td style="width:75%">Target pesanan sesuai kebutuhan (username / url foto / dll)</td>
                                                    </tr>
                                                    <tr>
                                                        <th style="width:25%">jumlah</th>
                                                        <td style="width:75%">Jumlah Pesan</td>
                                                    </tr>


                                                </tbody>
                                            </table>
                                        </div>
                                        <b>Contoh Respons (json) Yang Di Dapat</b>
                                        <div class="alert alert-secondary bg-secondary">
                                            <pre class="text-light">
 {
    "status": true,
    "data": {
        "id": "6872782",
        "start_count": 0
    }
}

    Response gagal :

    "status" : false,
    "pesan"  : 'Pesannyaa'

   
                    </pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="header-title">
                                            <b>Mendapatkan <font class="text-primary">Status Pesanan</font></b>
                                        </h4>
                                        <hr>
                                        <div class="table-responsive">
                                            <table class="table table-bordered table-striped">
                                                <tbody>
                                                    <tr>
                                                        <th style="width:25%">METHOD</th>
                                                        <th style="width:75%">POST</th>
                                                    </tr>
                                                    <tr>
                                                        <th style="width:25%">URL</th>
                                                        <td style="width:75%"><?= BASEURL; ?>api/status</td>
                                                    </tr>
                                                    <tr>
                                                        <th style="width:25%">api_key</th>
                                                        <td style="width:75%">API Key anda</td>
                                                    </tr>
                                                    <tr>
                                                        <th style="width:25%">tipe</th>
                                                        <td style="width:75%">Sosial Media</td>
                                                    </tr>
                                                    <tr>
                                                        <th style="width:25%">id</th>
                                                        <td style="width:75%">Id pesanan ( Sosial Media )</td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                        <b>Contoh Respons (json) Yang Di Dapat</b>
                                        <div class="alert alert-secondary bg-secondary">
                                            <pre class="text-light">
  {
    "status": true,
    "data": {
        "id": "1678453",
        "status": "Pending",
        "start_count": "0",
        "remains": "1000"
    }
}

    Response gagal :

    "status" : false,
    "pesan"  : 'Pesannyaa'

   
                    </pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="header-title">
                                            <b>Mendapatkan <font class="text-primary">Layanan</font></b>
                                        </h4>
                                        <hr>
                                        <div class="table-responsive">
                                            <table class="table table-bordered table-striped">
                                                <tbody>
                                                    <tr>
                                                        <th style="width:25%">METHOD</th>
                                                        <th style="width:75%">POST</th>
                                                    </tr>
                                                    <tr>
                                                        <th style="width:25%">URL</th>
                                                        <td style="width:75%"><?= BASEURL; ?>api/layanan</td>
                                                    </tr>
                                                    <tr>
                                                        <th style="width:25%">tipe</th>
                                                        <td style="width:75%">Sosial Media</td>
                                                    </tr>
                                                    <tr>
                                                        <th style="width:25%">api_key</th>
                                                        <td style="width:75%">API Key anda</td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                        <b>Contoh Respons (json) Yang Di Dapat</b>
                                        <div class="alert alert-secondary bg-secondary">
                                            <pre class="text-light">
{
    "status": true,
    "data": {
        "sid": "444",
        "kategori": "Instagram Followers Indonesia",
        "layanan": "Instagram indonesia cheap",
        "catatan": "Proses 1x 24 jam"
        "min": "100"
        "max": "1000"
        "harga": "10000" 
        "status": "Normal" 
    }
}

    Response gagal :

    "status" : false,
    "pesan"  : 

Kemungkinan pesan didapat :
- "API key salah"    
- "API key tersebut sedang Non aktif"    
- "Alamat IP salah"    
- "Permintaan tidak sesuai"    
                    </pre>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="tab-pane fade" id="ppob" role="tabpanel" aria-labelledby="ppob-tab">

                        <div class="row">
                            <div class="col-12 col-md-6">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="header-title">
                                            <b>Membuat <font class="text-primary">Pesanan Baru</font></b>
                                        </h4>
                                        <hr>
                                        <div class="table-responsive">
                                            <table class="table table-bordered table-striped">
                                                <tbody>
                                                    <tr>
                                                        <th style="width:25%">METHOD</th>
                                                        <th style="width:75%">POST</th>
                                                    </tr>
                                                    <tr>
                                                        <th style="width:25%">URL</th>
                                                        <td style="width:75%"><?= BASEURL; ?>api/order</td>
                                                    </tr>
                                                    <tr>
                                                        <th style="width:25%">api_key</th>
                                                        <td style="width:75%">API Key anda</td>
                                                    </tr>
                                                    <tr>
                                                        <th style="width:25%">tipe</th>
                                                        <td style="width:75%">ppob</td>
                                                    </tr>
                                                    <tr>
                                                        <th style="width:25%">id</th>
                                                        <td style="width:75%">Id layanan ( PPOB ) <a href="<?= BASEURL; ?>halaman/daftarharga">Cek disini</a></td>
                                                    </tr>
                                                    <tr>
                                                        <th style="width:25%">target</th>
                                                        <td style="width:75%">Tujuan (Nomor hp/ nomor tagihan)</td>
                                                    </tr>



                                                </tbody>
                                            </table>
                                        </div>
                                        <b>Contoh Respons (json) Yang Di Dapat</b>
                                        <div class="alert alert-secondary bg-secondary">
                                            <pre class="text-light">
 {
    "status": true,
    "data": {
        "id": "8839485"
    }
}

    Response gagal :

    "status" : false,
    "pesan"  : 'Pesannyaa'

   
                    </pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="header-title">
                                            <b>Mendapatkan <font class="text-primary">Status Pesanan</font></b>
                                        </h4>
                                        <hr>
                                        <div class="table-responsive">
                                            <table class="table table-bordered table-striped">
                                                <tbody>
                                                    <tr>
                                                        <th style="width:25%">METHOD</th>
                                                        <th style="width:75%">POST</th>
                                                    </tr>
                                                    <tr>
                                                        <th style="width:25%">URL</th>
                                                        <td style="width:75%"><?= BASEURL; ?>api/status</td>
                                                    </tr>
                                                    <tr>
                                                        <th style="width:25%">api_key</th>
                                                        <td style="width:75%">API Key anda</td>
                                                    </tr>
                                                    <tr>
                                                        <th style="width:25%">tipe</th>
                                                        <td style="width:75%">PPOB</td>
                                                    </tr>
                                                    <tr>
                                                        <th style="width:25%">id</th>
                                                        <td style="width:75%">Id pesanan ( PPOB )</td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                        <b>Contoh Respons (json) Yang Di Dapat</b>
                                        <div class="alert alert-secondary bg-secondary">
                                            <pre class="text-light">
{
    "status": true,
    "data": {
        "id": "3200719",
        "status": "Pending",
        "keterangan": "SN : 3948572773498574"
    }
}

    Response gagal :

    "status" : false,
    "pesan"  : 'Pesannyaa'

   
                    </pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="header-title">
                                            <b>Mendapatkan <font class="text-primary">Layanan</font></b>
                                        </h4>
                                        <hr>
                                        <div class="table-responsive">
                                            <table class="table table-bordered table-striped">
                                                <tbody>
                                                    <tr>
                                                        <th style="width:25%">METHOD</th>
                                                        <th style="width:75%">POST</th>
                                                    </tr>
                                                    <tr>
                                                        <th style="width:25%">URL</th>
                                                        <td style="width:75%"><?= BASEURL; ?>api/layanan</td>
                                                    </tr>
                                                    <tr>
                                                        <th style="width:25%">tipe</th>
                                                        <td style="width:75%">PPOB</td>
                                                    </tr>
                                                    <tr>
                                                        <th style="width:25%">api_key</th>
                                                        <td style="width:75%">API Key anda</td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                        <b>Contoh Respons (json) Yang Di Dapat</b>
                                        <div class="alert alert-secondary bg-secondary">
                                            <pre class="text-light">
{
    "status": true,
    "data": {
        "sid": "444",
        "operator": "TELKOMSEL",
        "layanan": "Telkomsel 5000",
        "harga": "5200"
        "status": "Normal" 
        "tipe": "Pulsa" 
    }
}

    Response gagal :
    {
        "status" : false,
        "pesan"  :
        } 

Kemungkinan pesan didapat :
- "API key salah"    
- "API key tersebut sedang Non aktif"    
- "Alamat IP salah"    
- "Permintaan tidak sesuai"    
</pre>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                        <div class="row">
                            <div class="col-12 col-md-6">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="header-title">
                                            <b>Mengambil <font class="text-primary">Info profile</font></b>
                                        </h4>
                                        <hr>
                                        <div class="table-responsive">
                                            <table class="table table-bordered table-striped">
                                                <tbody>
                                                    <tr>
                                                        <th style="width:25%">METHOD</th>
                                                        <th style="width:75%">POST</th>
                                                    </tr>
                                                    <tr>
                                                        <th style="width:25%">URL</th>
                                                        <td style="width:75%"><?= BASEURL; ?>api/profile</td>
                                                    </tr>
                                                    <tr>
                                                        <th style="width:25%">api_key</th>
                                                        <td style="width:75%">API Key anda</td>
                                                    </tr>




                                                </tbody>
                                            </table>
                                        </div>
                                        <b>Contoh Respons (json) Yang Di Dapat</b>
                                        <div class="alert alert-secondary bg-secondary">
                                            <pre class="text-light">
                     {
    "status": true,
    "data": [
        {
            "username": "tester",
            "saldo": "32035"
        }
    ]
}

    Response gagal :

    "status" : false,
    "pesan"  : 'Pesannyaa'

   
                    </pre>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>




                </div>
            </div>
        </div>
    </div>
    <?php unset($_SESSION['hasil']); ?>
</main>