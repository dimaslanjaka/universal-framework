<?php

/**
 * Shutdown here
 *
 * @return void
 */
function maintenance()
{
	include __DIR__ . '/maintenance.php';
	exit;
}

function show_error()
{
	error_reporting(E_ALL);
	ini_set('display_errors', 'On');
}
