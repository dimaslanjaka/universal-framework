<?php

namespace Office;

class config
{
  function __construct(string $officeName)
  {
    $config = \Filemanager\file::get(__DIR__ . '/config/' . $officeName . '.json', true);
  }
}
