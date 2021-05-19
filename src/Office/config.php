<?php

namespace Office;

class config
{
  public function __construct($officeName)
  {
    $config = \Filemanager\file::get(__DIR__ . '/config/' . $officeName . '.json', true);
  }
}
