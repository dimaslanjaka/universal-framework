<?php

if (!defined('UD_CENTRAL_DIR')) die('Security check');

// Dashboard translations for the UpdraftVault module
return array(
	'site_not_connected' => __('This site has not been connected to UpdraftVault. To do this, go to the "Backups" panel.', 'updraftcentral'),
	'general_error_response' => __('There appears to be a problem when processing your request. Please refer to the following response: %s', 'updraftcentral'),
	'unexpected_format' => __('Received response, but it was not in the expected format. Please refer to the following response: %s', 'updraftcentral'),
	'unexpected_http_response' => __('Unexpected HTTP response code. The server or database may be down or is unable to process your request at the moment. Please refer to the following response: %s', 'updraftcentral'),
	'result_not_understood' => __('wp_remote_post returned a result that was not understood. Please refer to the following response: %s', 'updraftcentral'),
	'objects_not_loaded' => __('Could not load objects. Please refer to the following response: %s', 'updraftcentral'),
	'name' => __('Name', 'updraftcentral'),
	'download' => __('Download', 'updraftcentral'),
	'delete' => __('Delete', 'updraftcentral'),
	'size' => __('Size', 'updraftcentral'),
	'bytes' => __('bytes', 'updraftcentral'),
	'prev' => __('Previous', 'updraftcentral'),
	'next' => __('Next', 'updraftcentral'),
	'delete_success' => __('Your selected UpdraftVault file(s) have been deleted successfully.', 'updraftcentral'),
	'delete_files' => __('Delete files', 'updraftcentral'),
	'delete_files_confirm' => __('Are you sure you want to permanently delete the selected file(s)?', 'updraftcentral'),
	'delete_error' => __('There appears to be a problem when deleting your file(s). Please refer to the following response: %s', 'updraftcentral'),
	'files_not_found' => __('There are currently no files found under your UpdraftVault.', 'updraftcentral'),
	'select_files' => __('Please select one or more files to delete.', 'updraftcentral'),
	'delete_success_header' => __('Successfully removed files', 'updraftcentral'),
	'delete_failed_header' => __('Failed to remove files', 'updraftcentral'),
	'browse_failed_header' => __('Failed to retrieve files', 'updraftcentral'),
	'connection_error_header' => __('Connection error', 'updraftcentral'),
	'empty_selection_header' => __('No files selected', 'updraftcentral'),
	'per_page' => __('Results per page', 'updraftcentral'),
	'translation_no_argument' => __('No message was given to translate', 'updraftcentral'),
	'translation_not_found_for' => __('The site sent an unrecognised response \'(%s)\'. You may need to update either UpdraftPlus or UpdraftCentral to a later version.', 'updraftcentral'),
);
