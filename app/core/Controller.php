<?php

class Controller
{
    /**
     * @var Database|PDO
     */
    public $db;
    /**
     * @var Database|PDO
     */
    public $dbh;

    public function view($view, $data = [])
    {
        require_once '../app/views/' . $view . '.php';
    }

    public function model($model)
    {
        require_once '../app/models/' . $model . '.php';

        return new $model();
    }
}
