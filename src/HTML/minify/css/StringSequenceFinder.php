<?php

namespace HTML\minify\css;

class StringSequenceFinder extends MinificationSequenceFinder
{
    protected $start_delimiter;
    protected $end_delimiter;

    public function __construct($start_delimiter, $end_delimiter)
    {
        $this->type = $start_delimiter;
        $this->start_delimiter = $start_delimiter;
        $this->end_delimiter = $end_delimiter;
    }

    public function findFirstValue($string)
    {
        $this->start_idx = strpos($string, $this->start_delimiter);
        if ($this->isValid()) {
            $this->end_idx = strpos($string, $this->end_delimiter, $this->start_idx + 1);
            // sanity check for non well formed lines
            $this->end_idx = (false === $this->end_idx ? strlen($string) : $this->end_idx + strlen(
                    $this->end_delimiter
                ));
        }
    }
}
