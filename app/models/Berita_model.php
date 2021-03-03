<?php

class Berita_model
{
    protected $db, $dbh;

    public function __construct()
    {
        $this->dbh = new Database;
        $this->db = $this->dbh->connect();
    }

    public function semuaberita()
    {
        $this->dbh->query("SELECT * FROM berita ORDER BY id DESC");
        return $this->dbh->resultSet();
    }
}
