<?php

/**
 * Shutdown here.
 *
 * @return void
 */
function maintenance()
{
  include __DIR__ . '/maintenance.php';
  exit;
}

/**
 * Debug Error.
 *
 * @return void
 */
function show_error()
{
  error_reporting(E_ALL);
  ini_set('display_errors', 'On');
}

/**
 * Check is admin granted.
 */
function is_admin()
{
  if (isset($_SESSION['login'])) {
    if (isset($_SESSION['login']['role'])) {
      return preg_match('/^superadmin$/s', $_SESSION['login']['role']);
    }
  }
}
