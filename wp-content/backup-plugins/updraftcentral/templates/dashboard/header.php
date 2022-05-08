<?php
/**
 * This file sets up hooks for dashboard notices
 */
if (!defined('UD_CENTRAL_DIR')) die('Security check'); ?>

<!-- dashboard page header -->

<?php

// Remember that this header is used widely - the user may not be logged-in, or authorised, or the entire setup may be broken and we're just needing to report errors.

do_action('updraftcentral_page_header_pre_notices');

do_action('updraftcentral_print_dashboard_notices');

do_action('updraftcentral_page_header_after_notices');
