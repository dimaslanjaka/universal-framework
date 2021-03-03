<?php

class Home_model
{

    protected $dbh, $db;

    public function __construct()
    {
        $this->dbh = new Database;
        $this->db = $this->dbh->connect();
    }

    public function pesananTerakhir($data)
    {
        $this->dbh->query("SELECT * FROM semua_pembelian WHERE user = '$data' ORDER BY id DESC LIMIT 10");
        return $this->dbh->resultSet();
    }

    public function datauser($username)
    {

        $this->dbh->query("SELECT * FROM users WHERE username ='$username'");
        return $this->dbh->single();
    }

    public function metodedeposit()
    {

        $this->dbh->query("SELECT * FROM metode_depo where status = 'Aktif'");
        return $this->dbh->resultSet();
    }

    //
    public function categorysosmed()
    {
        $this->dbh->query("SELECT * FROM kategori_layanan WHERE tipe = 'Sosial Media' ORDER BY nama ASC");
        $this->dbh->execute();
        return $this->dbh->resultSet();
    }
}
