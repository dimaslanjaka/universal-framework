<?php

class Doc extends Controller
{


    public function index()
    {
        $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
        $data['title'] = 'Api Dokumentasi';
        $this->view('templates/header', $data);
        $this->view('doc/index', $data);
        $this->view('templates/footer');
    }
}
