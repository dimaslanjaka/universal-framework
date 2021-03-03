<?php

class Ambildata_model
{
    protected $db, $dbh, $date = DATE, $time = TIME;

    public $hargasosmedweb, $hargasosmedapi, $hargappobweb, $hargappobapi;

    public function __construct()
    {
        $this->dbh = new Database;
        $this->db = $this->dbh->connect();

        // sosmed web harga
        $sosmedweb =  $this->db->prepare("SELECT * FROM setting_harga_untung WHERE kategori ='WEBSITE' and tipe ='Sosial Media'");
        $sosmedweb->execute();
        $sosmedweb = $sosmedweb->fetch();
        $this->hargasosmedweb = $sosmedweb['harga'];
        // harga sosmed api 
        $sosmedapi =  $this->db->prepare("SELECT * FROM setting_harga_untung WHERE kategori ='API' and tipe ='Sosial Media'");
        $sosmedapi->execute();
        $sosmedapi = $sosmedapi->fetch();
        $this->hargasosmedapi = $sosmedapi['harga'];
        // harga ppob web 
        $ppobweb =  $this->db->prepare("SELECT * FROM setting_harga_untung WHERE kategori ='WEBSITE' and tipe = 'Top Up'");
        $ppobweb->execute();
        $ppobweb = $ppobweb->fetch();
        $this->hargappobweb = $ppobweb['harga'];
        // harga ppob web 
        $ppobweb =  $this->db->prepare("SELECT * FROM setting_harga_untung WHERE kategori ='WEBSITE' and tipe = 'Top Up'");
        $ppobweb->execute();
        $ppobweb = $ppobweb->fetch();
        $this->hargappobweb = $ppobweb['harga'];
        // harga ppob api
        $ppobapi =  $this->db->prepare("SELECT * FROM setting_harga_untung WHERE kategori ='API' and tipe = 'Top Up'");
        $ppobapi->execute();
        $ppobapi = $ppobapi->fetch();
        $this->hargappobapi = $ppobapi['harga'];
    }

    // ambil layanan sosmed

    public function allprovidersosmed()
    {
        $this->dbh->query("SELECT * FROM provider ");
        $this->dbh->execute();
        return $this->dbh->resultSet();
    }
    public function allproviderppob()
    {
        $this->dbh->query("SELECT * FROM provider_pulsa ");
        $this->dbh->execute();
        return $this->dbh->resultSet();
    }
    public function providersosmed($provider)
    {
        $this->dbh->query("SELECT * FROM provider WHERE code = '$provider' ");
        $this->dbh->execute();
        return $this->dbh->single();
    }
    public function providerppob($provider)
    {
        $this->dbh->query("SELECT * FROM provider_pulsa WHERE code = '$provider' ");
        $this->dbh->execute();
        return $this->dbh->single();
    }
    public function cekkategori($kategori)
    {
        $this->dbh->query("SELECT count(*) FROM kategori_layanan WHERE nama = '$kategori' ");
        $this->dbh->execute();
        return $this->dbh->hitungBaris2();
    }
    public function inputkategori($kategori)
    {
        $this->dbh->query("INSERT INTO kategori_layanan VALUES ('','$kategori','$kategori','Sosial Media','')");
        $this->dbh->execute();
        return $this->dbh->rowCount();
    }
    public function ceklayanansosmed($service_id)
    {
        $this->dbh->query("SELECT count(*) FROM layanan_sosmed WHERE service_id = '$service_id' ");
        $this->dbh->execute();
        return $this->dbh->hitungBaris2();
    }
    public function inputlayanansosmed($id, $category, $name, $price, $min, $max, $description, $code)
    {
        $hargaweb = $price + $this->hargasosmedweb;
        $hargaapi = $price + $this->hargasosmedapi;
        $this->dbh->query("INSERT INTO `layanan_sosmed`(`service_id`, `kategori`, `layanan`, `catatan`, `min`, `max`, `harga`, `harga_api`,`status`, `provider_id`, `provider`,`tipe`) VALUES ('$id', '$category', '$name', '$description', '$min', '$max','$hargaweb','$hargaapi','Aktif','$id','$code', 'Sosial Media')");
        $this->dbh->execute();
        return $this->dbh->rowCount();
    }
    // sampai sini layanan sosmed


    // layanan pob 
    public function cekkategorippob($category, $type2)
    {
        $this->dbh->query("SELECT count(*) FROM kategori_layanan WHERE kode = '$category' AND server = '$type2'");
        $this->dbh->execute();
        return $this->dbh->hitungBaris2();
    }
    public function inputkategorippob($category, $type2)
    {
        $this->dbh->query("INSERT INTO kategori_layanan VALUES ('','$category','$category','Top Up','$type2')");
        $this->dbh->execute();
        return $this->dbh->rowCount();
    }
    public function ceklayananppob($sid)
    {
        $this->dbh->query("SELECT count(*) FROM layanan_pulsa WHERE service_id = '$sid' AND provider = 'DG-PULSA'");
        $this->dbh->execute();
        return $this->dbh->hitungBaris2();
    }
    public function ceklayananpascabayar($sid)
    {
        $this->dbh->query("SELECT count(*) FROM layanan_pascabayar WHERE service_id = '$sid' AND provider = 'DG-PULSA'");
        $this->dbh->execute();
        return $this->dbh->hitungBaris2();
    }
    public function inputlayananppob($sid, $category, $service, $description, $price, $ht_status, $type2, $kategori)
    {
        if ($ht_status == true) {
            $status = "Normal";
        } else if ($ht_status == false) {
            $status = "Gangguan";
        }
        $hargaweb = $price + $this->hargappobweb;
        $hargaapi = $price + $this->hargappobapi;
        $this->dbh->query("INSERT INTO layanan_pulsa VALUES('', '$sid', '$sid', '$category', '$service', '$description', '$hargaweb', '$hargaapi', '$status', 'DG-PULSA', '$type2', '$kategori')");
        $this->dbh->execute();
        return $this->dbh->rowCount();
    }
    public function inputlayananpascabayar($sid, $category, $service, $type,  $ht_status)
    {
        if ($ht_status == true) {
            $status = "Normal";
        } else if ($ht_status == false) {
            $status = "Gangguan";
        }

        $this->dbh->query("INSERT INTO layanan_pascabayar VALUES ('', '$sid', '$sid', '$category', '$service', '$status', 'DG-PULSA', '$type', 'PASCABAYAR')");
        $this->dbh->execute();
        return $this->dbh->rowCount();
    }


    // status sosmed 

    // cek pesanan belum sukses
    public function cekordersosmed($provider)
    {
        $this->dbh->query("SELECT * FROM pembelian_sosmed WHERE status IN ('Pending', 'Processing') AND provider = '$provider' ");
        $this->dbh->execute();
        return $this->dbh->resultSet();
    }
 public function cekorderppob($provider)
    {
        $this->dbh->query("SELECT * FROM pembelian_pulsa WHERE status IN ('Pending') AND provider = '$provider' ");
        $this->dbh->execute();
        return $this->dbh->resultSet();
    }




    // mutasiii
    // cekmutasi
    public function cekmutasi($tabel, $colom, $data)
    {
        $this->dbh->query("SELECT count(*) FROM $tabel WHERE $colom = '$data' ");
        return $this->dbh->hitungBaris2();
    }
    public function cekdepositmutasi($jumlah)
    {
        $this->dbh->query("SELECT count(*) FROM mutasi WHERE jumlah = '$jumlah' AND status = 'UNREAD' ");
        return $this->dbh->hitungBaris2();
    }
    public function updatemutasi($jumlah, $provider)
    {
        $this->dbh->query("UPDATE mutasi SET status = 'READ' WHERE jumlah = '$jumlah' AND provider = '$provider' ");
        $this->dbh->execute();
        return $this->dbh->rowCount();
    }
    public function cekvoucher($idalfa)
    {
        $this->dbh->query("SELECT count(*) FROM kode_voucher WHERE kode = '$idalfa' AND status = 'Aktif' ");
        return $this->dbh->hitungBaris2();
    }

    public function curldigiflaz($url, $data, $header)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        return curl_exec($ch);
    }
}
