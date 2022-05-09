<?php
/**
 * Custom functions for bbpress
 *
 * @package Superfast
 */
 
// Remove BBP breadcrumb
add_filter( 'bbp_no_breadcrumb', '__return_true' );