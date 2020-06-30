<?php

e(['message' => 'Using ', humanFileSize(memory_get_peak_usage(1), 'MB'), ' of ram.']);
function humanFileSize($size, $unit = '')
{
  if ((!$unit && $size >= 1 << 30) || 'GB' == $unit) {
    return number_format($size / (1 << 30), 2) . ' GB';
  }
  if ((!$unit && $size >= 1 << 20) || 'MB' == $unit) {
    return number_format($size / (1 << 20), 2) . ' MB';
  }
  if ((!$unit && $size >= 1 << 10) || 'KB' == $unit) {
    return number_format($size / (1 << 10), 2) . ' KB';
  }

  return number_format($size) . ' bytes';
}
