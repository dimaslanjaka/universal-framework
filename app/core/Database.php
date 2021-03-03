<?php

class Database
{

    protected $host = DB_HOST,
        $dbname = DB_NAME,
        $dbuser = DB_USER,
        $dbpass = DB_PASS;

    private $dbh,
        $db,
        $stmt;

    public function connect()
    {
        $this->dsn = 'mysql:host=' . $this->host . ';dbname=' . $this->dbname;
        $dsn = $this->dsn;
        $options = [
            PDO::ATTR_PERSISTENT, true,
            PDO::ERRMODE_EXCEPTION, PDO::ERRMODE_EXCEPTION
        ];
        try {
            return $this->dbh = new PDO($dsn, $this->dbuser, $this->dbpass, $options);
        } catch (PDOException $e) {
            die($e->getMessage());
        }
    }

    public function query($query)
    {
        $this->stmt = $this->dbh->prepare($query);
    }

    public function bind($param, $value, $type = null)
    {
        if (is_null($type)) {
            switch (true) {
                case is_int($value):
                    $type = PDO::PARAM_INT;
                    break;
                case is_bool($value):
                    $type == PDO::PARAM_BOOL;
                    break;
                case is_null($value):
                    $type = PDO::PARAM_NULL;
                    break;
                default:
                    $type == PDO::PARAM_STR;
            }
        }
        $this->stmt->bindValue($param, $value);
    }

    public function execute()
    {
        $this->stmt->execute();
    }

    public function resultSet()
    {
        $this->execute();
        return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function single()
    {
        $this->execute();
        return $this->stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function rowCount()
    {
        return $this->stmt->rowCount();
    }

    public function hitungBaris2()
    {
        $this->execute();
        return $this->stmt->fetch(PDO::FETCH_COLUMN);
    }
}
