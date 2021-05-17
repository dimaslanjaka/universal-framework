<?php

namespace Typehint;

class stringint
{
    public function __construct($var)
    {
        return is_numeric($var) || is_string($var);
    }
}
