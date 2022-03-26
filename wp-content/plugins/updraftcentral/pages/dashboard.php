<?php

if (!defined('UD_CENTRAL_DIR')) die('Security check');

/**
 * This file bootstraps the loading of the 'dashboard' (i.e. main) page.
 * By this stage, it has already been verified that the user is logged in, and has a user role allowed to view pages
 */

$action_command = !empty($_REQUEST['action']) ? $_REQUEST['action'] : 'showmain';

if (!preg_match('/^[_a-z]+$/', $action_command) || !file_exists(UD_CENTRAL_DIR.'/actions/'.$action_command.'.php')) {
	error_log('UDRC: security check failed: unknown action ('.serialize($action_command).')');
	die('Security check');
}

require_once UD_CENTRAL_DIR.'/actions/0abstract.php';
require_once UD_CENTRAL_DIR.'/actions/'.$action_command.'.php';

$action_class = 'UpdraftRC_Action_'.$action_command;

if (!class_exists($action_class)) {
	error_log("Action class $action_class not found");

	return;
}

$updraft_central = UpdraftCentral();

$action = new $action_class();

// Nonce checks: required by default
if (false !== $action->check_nonce && !wp_verify_nonce($_REQUEST['nonce'], $action->check_nonce)) die('Security check');

// Enqueue JavaScript and CSS
$updraft_central->load_dashboard_js();
$updraft_central->load_dashboard_css();

// 'container' or 'container-fluid' class needed by Bootstrap
echo '<div id="updraftcentral_dashboard_wrapper"><div id="updraftcentral_dashboard" class="updraftcentral_dashboard container-fluid">';

// A fixed page header? e.g. Show them how many licences they've got spare, and how to buy more.

// User entitlement checks (N.B. user logged in and user role has already been checked)
if (!$action->auth_check()) {
	if ($action->show_header) $updraft_central->include_template('dashboard/header.php');
	$updraft_central->include_template('dashboard/not-authorised.php');

	return;
}

update_user_meta(get_current_user_id(), 'updraftcentral_dashboard_last_loaded', time());

// Get the items for the main menu
$main_navigation_items = apply_filters('updraftcentral_main_navigation_items', array(
	'sites' => array('label' => __('Sites', 'updraftcentral'), 'sort_order' => 10)
));
uasort($main_navigation_items, array($updraft_central, 'sort_navigation_items'));

$licence_manager = $updraft_central->user->get_licence_manager();

$updraft_central->include_template('dashboard/navigation.php', false, array(
	'how_many_licences_available' => $licence_manager->how_many_licences_available(),
	'how_many_licences_in_use' => $licence_manager->how_many_licences_in_use(),
	'common_urls' => $updraft_central->get_common_urls(),
));

// Start dashboard layout here open container
echo '<div id="updraft-central-content-container">';

// Include the sidebar
$updraft_central->include_template('dashboard/sidebar-navigation.php', false, array(
	'main_navigation_items' => $main_navigation_items,
));

// Open the content area
echo '<div id="updraft-central-content">';

do_action('updraftcentral_dashboard_post_navigation');

$updraft_central->include_template('sites/management-actions.php');

do_action('updraftcentral_dashboard_pre_header');

if ($action->show_header) $updraft_central->include_template('dashboard/header.php');

do_action('updraftcentral_dashboard_pre_content');

if (method_exists($action, 'render')) {
	$action->render();
}

do_action('updraftcentral_dashboard_post_content');

// close content area here
echo '</div>';
// close container here and end dashboard layout
echo '</div>';

// Include modal dialog
$updraft_central->include_template('dashboard/modal.php');

// Close updraftcentral_dashboard div
echo '</div></div>';
