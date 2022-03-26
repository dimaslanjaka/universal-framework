<?php

if (!defined('UD_CENTRAL_DIR')) die('Security check');

// Dashboard translations for the WPO module
return array(
	'generic_response_error' => __('An error has occurred while processing your request. Please refer to the following error: %s', 'updraftcentral'),
	'feature_update_heading' => __('Feature update', 'updraftcentral'),
	'feature_update_success' => __('Feature has been updated successfully.', 'updraftcentral'),
	'feature_update_failed' => __('An error has occurred while updating the feature. Server might be busy. Please try again later.', 'updraftcentral'),
	'save_settings_heading' => __('Save settings', 'updraftcentral'),
	'automatic_backup' => __('Automatic backup before optimizations', 'updraftcentral'),
	'warning' => __('Warning: This operation is permanent. Continue?', 'updraftcentral'),
	'could_not_return_content' => __('WP-Optimize plugin appears to be installed and activated but unfortunately the site could not return the requested information - perhaps you need to update it to a more recent WP-Optimize version?', 'updraftcentral'),
	'please_select_settings_file' => __('Please, select a settings file.', 'updraftcentral'),
	'optimization_complete' => __('Optimization complete', 'updraftcentral'),
	'empty_schedule' => __('You need to complete the currently incomplete scheduled time settings or remove them.', 'updraftcentral'),
	'table_was_not_deleted' => __('%s was not deleted. For more details, please check any logs configured in your logging destination settings.', 'updraftcentral'),
	'are_you_sure_you_want_to_remove_this_table' => __('Are you sure you want to remove this table?', 'updraftcentral'),
	'no_selected_items' => __('There are currently no items selected. Please select one or more optimization items and try again.', 'updraftcentral'),
);
