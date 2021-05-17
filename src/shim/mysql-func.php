<?php

/**
 * MySQL current_timestamp() converter.
 *
 * @param int|string $date
 *
 * @return date
 */
function current_timestamp($date = null)
{
    $timestamp = $date;
    if (is_string($date)) {
        $timestamp = strtotime($date);
    }
    if (is_null($date)) {
        $timestamp = time();
    }

    return date('Y-m-d H:i:s', $timestamp);
}
