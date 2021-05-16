<?php

namespace HTML\minify\css;

class QuoteSequenceFinder extends MinificationSequenceFinder
{
  public function __construct($type)
  {
      $this->type = $type;
  }

  public function findFirstValue($string)
  {
    $this->start_idx = strpos($string, $this->type);
    if ($this->isValid()) {
      // look for first non escaped endquote
      $this->end_idx = $this->start_idx + 1;
      while ($this->end_idx < strlen($string)) {
        // find number of escapes before endquote
        if (preg_match(
          '/(\\\\*)(' . preg_quote($this->type) . ')/',
          $string,
          $match,
          PREG_OFFSET_CAPTURE,
          $this->end_idx
        )) {
          $this->end_idx = $match[2][1] + 1;
          // if odd number of escapes before endquote, endquote is escaped. Keep going
            if (!isset($match[1][0]) || 0 == strlen($match[1][0]) % 2) {
                return;
            }
        } else {
          // no match, not well formed
          $this->end_idx = strlen($string);

            return;
        }
      }
    }
  }
}
