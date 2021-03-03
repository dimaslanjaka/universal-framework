<?php

class Halaman_model
{
    protected $db, $dbh;
    public $date = DATE;
    public $time = TIME;

    public function __construct()
    {
        $this->dbh = new Database;
        $this->db = $this->dbh->connect();
    }

    public function daftarfaq()
    {
        $this->dbh->query("SELECT * FROM pertanyaan_umum ORDER BY number ASC");
        $this->dbh->execute();
        return $this->dbh->resultSet();
    }

    // daftar hargga
    // kategori sosmed

    public function kategorisosmed()
    {
        $this->dbh->query("SELECT * FROM kategori_layanan WHERE tipe = 'Sosial Media' ");
        $this->dbh->execute();
        return $this->dbh->resultSet();
    }
    public function kategorippob()
    {
        $this->dbh->query("SELECT * FROM kategori_layanan WHERE tipe = 'Top Up' ");
        $this->dbh->execute();
        return $this->dbh->resultSet();
    }
    // daftar admin
    public function daftaradmin()
    {
        $this->dbh->query("SELECT * FROM kontak_admin");
        return $this->dbh->resultSet();
    }
}
