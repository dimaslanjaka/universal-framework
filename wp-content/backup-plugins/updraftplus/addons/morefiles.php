<?php
// @codingStandardsIgnoreStart
/*
UpdraftPlus Addon: morefiles:Back up more files, including WordPress core
Description: Creates a backup of WordPress core (including everything in that directory WordPress is in), and any other file/directory you specify too.
Version: 2.5
Shop: /shop/more-files/
Latest Change: 1.13.1
*/
// @codingStandardsIgnoreEnd

if (!defined('UPDRAFTPLUS_DIR')) die('No direct access allowed');

$updraftplus_addons_morefiles = new UpdraftPlus_Addons_MoreFiles;

class UpdraftPlus_Addons_MoreFiles {

	private $wpcore_foundyet = 0;

	private $more_paths = array();

	public function __construct() {
		add_filter('updraft_backupable_file_entities', array($this, 'backupable_file_entities'), 10, 2);
		add_filter('updraft_backupable_file_entities_final', array($this, 'backupable_file_entities_final'), 10, 2);

		add_filter('updraftplus_restore_movein_wpcore', array($this, 'restore_movein_wpcore'), 10, 2);
		add_filter('updraftplus_backup_makezip_wpcore', array($this, 'backup_makezip_wpcore'), 10, 3);
		add_filter('updraftplus_backup_makezip_more', array($this, 'backup_makezip_more'), 10, 3);

		add_filter('updraftplus_defaultoption_include_more', '__return_false');
		add_filter('updraftplus_defaultoption_include_wpcore', '__return_false');

		add_filter('updraftplus_admin_directories_description', array($this, 'admin_directories_description'));
		
		add_filter('updraftplus_fileinfo_more', array($this, 'fileinfo_more'), 10, 2);

		add_filter('updraftplus_config_option_include_more', array($this, 'config_option_include_more'), 10, 2);
		add_filter('updraftplus_config_option_include_wpcore', array($this, 'config_option_include_wpcore'), 10, 2);

		add_action('updraftplus_restore_form_wpcore', array($this, 'restore_form_wpcore'));
		add_filter('updraftplus_checkzip_wpcore', array($this, 'checkzip_wpcore'), 10, 4);
		add_filter('updraftplus_checkzip_end_wpcore', array($this, 'checkzip_end_wpcore'), 10, 3);
		
		add_filter('updraftplus_browse_download_link', array($this, 'updraftplus_browse_download_link'));
		add_filter('updraftplus_command_get_zipfile_download', array($this, 'updraftplus_command_get_zipfile_download'), 10, 2);

		add_filter('updraftplus_dirlist_more', array($this, 'backup_more_dirlist'));
		add_filter('updraftplus_dirlist_wpcore', array($this, 'backup_wpcore_dirlist'));
		
		add_filter('updraftplus_include_wpcore_exclude', array($this, 'include_wpcore_exclude'));

	}

	public function updraftplus_browse_download_link($link) {
		return '<a href="#" id="updraft_zip_download_item">'._x('Download', '(verb)', 'updraftplus').'</a>';
	}
	
	public function updraftplus_command_get_zipfile_download($result, $params) {
		global $updraftplus;

		$zip_object = 'UpdraftPlus_ZipArchive';

		if (!class_exists('UpdraftPlus_PclZip')) include_once(UPDRAFTPLUS_DIR.'/class-zip.php');

		// In tests, PclZip was found to be 25% slower than ZipArchive
		if (((defined('UPDRAFTPLUS_PREFERPCLZIP') && UPDRAFTPLUS_PREFERPCLZIP == true) || !class_exists('ZipArchive') || !class_exists('UpdraftPlus_ZipArchive') || (!extension_loaded('zip') && !method_exists('ZipArchive', 'AddFile')))) {
			$zip_object = 'UpdraftPlus_PclZip';
		}

		// Retrieve the information from our backup history
		$backup_history = $updraftplus->get_backup_history();

		// Base name
		$file = $backup_history[$params['timestamp']][$params['type']];

		// Deal with multi-archive sets
		if (is_array($file)) $file = $file[$params['findex']];

		// Where it should end up being downloaded to
		$fullpath = $updraftplus->backups_dir_location().'/'.$file;

		$path = substr($params['path'], strpos($params['path'], '/') + 1);

		if (file_exists($fullpath) && is_readable($fullpath) && filesize($fullpath)>0) {

			$zip = new $zip_object;

			if (!$zip->open($fullpath)) {
				return array('error' => 'UpdraftPlus: opening zip (' . $fullpath . '): failed to open this zip file.');
			} else {

				if ('UpdraftPlus_PclZip' == $zip_object) {
					$extracted = $zip->extract($updraftplus->backups_dir_location() . DIRECTORY_SEPARATOR . 'ziptemp' . DIRECTORY_SEPARATOR, $path);
				} else {
					$extracted = $zip->extractTo($updraftplus->backups_dir_location() . DIRECTORY_SEPARATOR . 'ziptemp' . DIRECTORY_SEPARATOR, $path);
				}
				
				@$zip->close();

				if ($extracted) {
					return array('path' => 'ziptemp'.DIRECTORY_SEPARATOR.$path);
				} else {
					return array('error' => 'UpdraftPlus: failed to extract (' . $path . ')');
				}
			}
		}

		return array('error' => 'UpdraftPlus: no such file or diretory (' . $fullpath . '): if the file does exist please make sure it is readable by the server.');
	}
	
	public function fileinfo_more($data, $ind) {
		if (!is_array($data) || !is_numeric($ind) || empty($this->more_paths) || !is_array($this->more_paths) || empty($this->more_paths[$ind])) return $data;

		global $updraftplus;
		$file_entities = $updraftplus->jobdata_get('job_file_entities');
		if (!isset($file_entities['more'])) return $data;

		return array(
			'html'=> '<br>'.__('Contains:', 'updraftplus').' '.htmlspecialchars($this->more_paths[$ind]),
			'text'=> '\r\n'.__('Contains:', 'updraftplus').' '.$this->more_paths[$ind]
		);
	}
	
	public function restore_form_wpcore() {

		?>
		<div id="updraft_restorer_wpcoreoptions" style="display:none; padding:12px; margin: 8px 0 4px; border: dashed 1px;"><h4 style="margin: 0px 0px 6px; padding:0px;"><?php echo sprintf(__('%s restoration options:', 'updraftplus'), __('WordPress Core', 'updraftplus')); ?></h4>

			<?php

			echo '<input name="updraft_restorer_wpcore_includewpconfig" id="updraft_restorer_wpcore_includewpconfig" type="checkbox" value="1"><label for="updraft_restorer_wpcore_includewpconfig"> '.__('Over-write wp-config.php', 'updraftplus').'</label> <a href="https://updraftplus.com/faqs/when-i-restore-wordpress-core-should-i-include-wp-config-php-in-the-restoration/">'.__('(learn more about this significant option)', 'updraftplus').'</a>';

			?>

			<script>
				jQuery('#updraft_restore_wpcore').change(function(){
					if (jQuery('#updraft_restore_wpcore').is(':checked')) {
						jQuery('#updraft_restorer_wpcoreoptions').slideDown();
					} else {
						jQuery('#updraft_restorer_wpcoreoptions').slideUp();
					}
				});
			</script>

			</div>
		<?php
	}

	public function admin_directories_description() {
		return '<div style="float: left; clear: both; padding-top: 3px;">'.__('The above files comprise everything in a WordPress installation.', 'updraftplus').'</div>';
	}

	public function backupable_file_entities($arr, $full_info) {
		if ($full_info) {
			$arr['wpcore'] = array(
				'path' => untrailingslashit(ABSPATH),
				'description' => apply_filters('updraft_wpcore_description', __('WordPress core (including any additions to your WordPress root directory)', 'updraftplus')),
				'htmltitle' => sprintf(__('WordPress root directory server path: %s', 'updraftplus'), ABSPATH)
			);
		} else {
			$arr['wpcore'] = untrailingslashit(ABSPATH);
		}
		return $arr;
	}

	public function checkzip_wpcore($zipfile, &$mess, &$warn, &$err) {
		if (!empty($this->wpcore_foundyet) && 3 == $this->wpcore_foundyet) return;

		if (!is_readable($zipfile)) {
			$warn[] = sprintf(__('Unable to read zip file (%s) - could not pre-scan it to check its integrity.', 'updraftplus'), basename($zipfile));
			return;
		}

		if ('.zip' == strtolower(substr($zipfile, -4, 4))) {

			if (!class_exists('UpdraftPlus_PclZip')) include(UPDRAFTPLUS_DIR.'/class-zip.php');
			$zip = new UpdraftPlus_PclZip;

			if (!$zip->open($zipfile)) {
				$warn[] = sprintf(__('Unable to open zip file (%s) - could not pre-scan it to check its integrity.', 'updraftplus'), basename($zipfile));
				return;
			}

			// Don't put this in the for loop, or the magic __get() method gets called and opens the zip file every time the loop goes round
			$numfiles = $zip->numFiles;

			for ($i=0; $i < $numfiles; $i++) {
				$si = $zip->statIndex($i);
				if ('wp-admin/index.php' == $si['name']) {
					$this->wpcore_foundyet = $this->wpcore_foundyet | 1;
					if (3 == $this->wpcore_foundyet) return;
				}
				if ('xmlrpc.php' == $si['name'] || 'xmlrpc.php/xmlrpc.php' == $si['name']) {
					$this->wpcore_foundyet = $this->wpcore_foundyet | 2;
					if (3 == $this->wpcore_foundyet) return;
				}
			}

			@$zip->close();
		} elseif (preg_match('/\.tar(\.(gz|bz2))$/i', $zipfile)) {

			if (!class_exists('UpdraftPlus_Archive_Tar')) {
				if (false === strpos(get_include_path(), UPDRAFTPLUS_DIR.'/includes/PEAR')) set_include_path(UPDRAFTPLUS_DIR.'/includes/PEAR'.PATH_SEPARATOR.get_include_path());
				include_once(UPDRAFTPLUS_DIR.'/includes/PEAR/Archive/Tar.php');
			}

			$p_compress = null;
			if ('.tar.gz' == strtolower(substr($zipfile, -7, 7))) {
				$p_compress = 'gz';
			} elseif ('.tar.bz2' == strtolower(substr($zipfile, -8, 8))) {
				$p_compress = 'bz2';
			}

			$tar = new UpdraftPlus_Archive_Tar($zipfile, $p_compress);
			$list = $tar->listContent();

			foreach ($list as $file) {
				if (is_array($file) && isset($file['filename'])) {
					if ('wp-admin/index.php' == $file['filename']) {
						$this->wpcore_foundyet = $this->wpcore_foundyet | 1;
						if (3 == $this->wpcore_foundyet) return;
					} elseif ('xmlrpc.php' == $file['filename']) {
						$this->wpcore_foundyet = $this->wpcore_foundyet | 2;
						if (3 == $this->wpcore_foundyet) return;
					}
				}
			}
		}
	}

	public function checkzip_end_wpcore(&$mess, &$warn, &$err) {
		if (!empty($this->wpcore_foundyet) && 3 == $this->wpcore_foundyet) return;
		if (0 == ($this->wpcore_foundyet & 1)) $warn[] = sprintf(__('This does not look like a valid WordPress core backup - the file %s was missing.', 'updraftplus'), 'wp-admin/index.php').' '.__('If you are not sure then you should stop; otherwise you may destroy this WordPress installation.', 'updraftplus');
		if (0 == ($this->wpcore_foundyet & 2)) $warn[] = sprintf(__('This does not look like a valid WordPress core backup - the file %s was missing.', 'updraftplus'), 'xmlrpc.php').' '.__('If you are not sure then you should stop; otherwise you may destroy this WordPress installation.', 'updraftplus');
	}

	public function backupable_file_entities_final($arr, $full_info) {
		$path = UpdraftPlus_Options::get_updraft_option('updraft_include_more_path');
		if (is_array($path)) {
			$path = array_map('untrailingslashit', $path);
			if (1 == count($path)) $path = array_shift($path);
		} else {
			$path = untrailingslashit($path);
		}
		if ($full_info) {
			$arr['more'] = array(
				'path' => $path,
				'description' => __('Any other file/directory on your server that you wish to back up', 'updraftplus'),
				'shortdescription' => __('More Files', 'updraftplus'),
				'restorable' => false
			);
		} else {
			$arr['more'] = $path;
		}
		return $arr;
	}

	public function config_option_include_more($ret, $prefix) {

		if ($prefix) return $ret;

		$display = UpdraftPlus_Options::get_updraft_option('updraft_include_more') ? '' : 'style="display:none;"';
		$class = $display ? 'class="updraft-hidden"' : '';
		
		$paths = UpdraftPlus_Options::get_updraft_option('updraft_include_more_path');
		if (!is_array($paths)) $paths = array($paths);

		$ret .= "<div id=\"updraft_include_more_options\" $display $class><p>";

			$ret .= __('If you are not sure what this option is for, then you will not want it, and should turn it off.', 'updraftplus').' '.__('If using it, select a path from the directory tree below and then press confirm selection.', 'updraftplus');
			
			$ret .= ' '.__('Be careful what you select - if you select / then it really will try to create a zip containing your entire webserver.', 'updraftplus');

			$ret .= '</p>';

			$ret .= '<div id="updraft_include_more_paths">';
			$maxind = 1;
			
			// Stops default empty path input being output to screen
			
			if (empty($paths)) {
			$paths = array('');
			} else {
			foreach ($paths as $ind => $path) {
				$maxind = max($ind, $maxind);
				$ret .= '<div class="updraftplus-morefiles-row" style="float: left; clear: left;"><label for="updraft_include_more_path_'.$ind.'"></label>';
				$ret .= '<input type="text" data-mp_index="'.$ind.'" id="updraft_include_more_path_'.$ind.'" class="updraft_include_more_path" name="updraft_include_more_path[]" size="54" value="'.htmlspecialchars($path).'" title="'.htmlspecialchars($path).'"/> <span title="'.__('Edit', 'updraftplus').'" class="updraftplus-morefiles-row-edit dashicons dashicons-edit hidden-in-updraftcentral"></span> <span title="'.__('Remove', 'updraftplus').'" class="updraftplus-morefiles-row-delete">X</span>';
				$ret .= '</div>';
			}
			}
			
			$ret .= '</div>';

			$ret .= '<div style="clear:left; float:left;"><a id="updraft_include_more_paths_another">'. __('Add directory...', 'updraftplus') .'</a></div>';
			$ret .= '<div id="updraft_more_files_container" class="hidden-in-updraftcentral" style="clear:left;">
						<div id="updraft_jstree_buttons">
							<button class="button-primary" id="updraft_jstree_cancel">'. __('Cancel', 'updraftplus') .'</button> 
							<button class="button-primary" id="updraft_jstree_confirm">'. __('Confirm', 'updraftplus') .'</button>
						</div>
						<div id="updraft_jstree_container">
							<button class="button-primary" id="updraft_parent_directory" title="'.__('Go up a directory', 'updraftplus').'"><span class="dashicons dashicons-arrow-up-alt"></span></button>
							<div id="updraft_more_files_jstree"></div>
						</div>
					</div>';

		$maxind++;
		$edit = esc_js(__('Edit', 'updraftplus'));
		$remove = esc_js(__('Remove', 'updraftplus'));
		$placeholder = esc_js(__('Please choose a file or directory', 'updraftplus'));
		$ret .= <<<ENDHERE
		<script>
			jQuery(document).ready(function($) {
				var updraftplus_morefiles_lastind = $maxind;
				$('#updraft_include_more').click(function() {
					if ($('#updraft_include_more').is(':checked')) {
						$('#updraft_include_more_options').slideDown();
					} else {
						$('#updraft_include_more_options').slideUp();
					}
				});

				$('#updraft_include_more_paths_another').click(function(){
					updraftplus_morefiles_lastind++;
					$('#updraft_include_more_paths').append('<div class="updraftplus-morefiles-row" style="float: left; clear: left;"><label for="updraft_include_more_path_'+updraftplus_morefiles_lastind+'"></label><input type="text" class="updraft_more_path_editing" id="updraft_include_more_path_'+updraftplus_morefiles_lastind+'" name="updraft_include_more_path[]" size="54" placeholder="$placeholder" value="" title="$placeholder" readonly/> <span title="$edit" class="updraftplus-morefiles-row-edit dashicons dashicons-edit hidden-in-updraftcentral"></span> <span title="$remove"  class="updraftplus-morefiles-row-delete">X</span></div>');
					more_files_jstree('filebrowser');
				});
				
				/**
				 * Creates the jstree and makes a call to the backend to dynamically get the tree nodes
				 * 
				 * @param {string} path - Optional path parameter if not passed in then ABSPATH will be used
				 * @param {bool} drop_directory - Optional parameter that if passed will remove the last directory level from the path, used for if you want to move up the directory tree from the root node
				 */
				function more_files_jstree(entity, path, drop_directory) {
					$('#updraft_include_more_paths_another').hide();
					$('#updraft_more_files_container').show();
					$('#updraft_jstree_cancel').show();
					$('#updraft_jstree_confirm').show();

					$('#updraft_more_files_jstree').jstree({
						"core": {
							"multiple": false,
							"data": function (nodeid, callback) {
								updraft_send_command('get_jstree_directory_nodes', {entity:entity, node:nodeid, path:path, drop_directory:drop_directory}, function(response) {
									callback.call(this, response.nodes);
								});
							}
						}
					});

					// Detect change on the tree and update the input that has been marked as editing
					$('#updraft_more_files_jstree').on("changed.jstree", function (e, data) {
						$('.updraft_more_path_editing').val(data.selected[0]);
						$('.updraft_more_path_editing').attr('title', data.selected[0]);
					});
				}



				// Cancel the selection and clean up the UI
				$('#updraft_jstree_cancel').click(function(e) {
					e.preventDefault();

					cleanup_jstree_ui();
				});

				// Grabs all selected paths and outputs them to the page ready to be saved then updates the UI and removes the tree object
				$('#updraft_jstree_confirm').click(function(e) {
					e.preventDefault();

					cleanup_jstree_ui();
				});

				/**
				 * Cleans the UI and removes the jstree
				 */
				function cleanup_jstree_ui() {
					$('#updraft_more_files_container').hide();
					$('#updraft_jstree_cancel').hide();
					$('#updraft_jstree_confirm').hide();
					$('#updraft_include_more_paths_another').show();
					$('#updraft_include_more_paths > .updraftplus-morefiles-row > .updraft_more_path_editing').removeClass('updraft_more_path_editing');
					$('#updraft_more_files_jstree').jstree("destroy").empty();
				}

				// Removes the current tree object and creates a new tree one directory above
				$('#updraft_parent_directory').click(function(e) {
					e.preventDefault();

					var parent_node_id = $('#updraft_more_files_jstree ul > li:first').attr('id');
					$('#updraft_more_files_jstree').jstree("destroy").empty();
					more_files_jstree('filebrowser', parent_node_id, true);
				});
				
				$('#updraft_include_more_options').on('click', '.updraftplus-morefiles-row-edit', function(e) {
					e.preventDefault();
					
					// Clean up the UI just in case
					cleanup_jstree_ui();

					var prow = $(this).parent('.updraftplus-morefiles-row').children('input');
					$(prow).addClass('updraft_more_path_editing');

					var drop_directory = true
					if ($(prow).val() == '') drop_directory = '';
					more_files_jstree('filebrowser', $(prow).val(), drop_directory);
				});

				$('#updraft_include_more_options').on('click', '.updraftplus-morefiles-row-delete', function(e) {
					e.preventDefault();

					var prow = $(this).parent('.updraftplus-morefiles-row');

					// Check if the one being deleted is being edited if so cleanup the UI
					if ($(prow).children('input').hasClass('updraft_more_path_editing')) {
						cleanup_jstree_ui();
					}
					$(prow).slideUp().delay(400).remove();
				});

				add_readonly();

				function add_readonly() {
					$('#updraft_include_more_paths').find('input').each(function() {
						$(this).attr('readonly','readonly');
					});
				}
			});
		</script>
ENDHERE;

		return $ret;
	}

	public function config_option_include_wpcore($ret, $prefix) {

		if ($prefix) return $ret;

		$display = UpdraftPlus_Options::get_updraft_option('updraft_include_wpcore') ? '' : 'style="display:none;"';

		$ret .= "<div id=\"updraft_include_wpcore_exclude\" $display>";

		$ret .= '<label for="updraft_include_wpcore_exclude">'.__('Exclude these:', 'updraftplus').'</label>';

		$ret .= '<input title="'.__('If entering multiple files/directories, then separate them with commas. For entities at the top level, you can use a * at the start or end of the entry as a wildcard.', 'updraftplus').'" type="text" id="updraft_include_wpcore_exclude" name="updraft_include_wpcore_exclude" size="54" value="'.esc_attr(UpdraftPlus_Options::get_updraft_option('updraft_include_wpcore_exclude')).'" />';

		$ret .= '<br>';

		$ret .= '</div>';

		return $ret;
	}

	public function backup_more_dirlist($whichdirs) {
		// Need to properly analyse the plugins, themes, uploads, content paths in order to strip them out (they may have various non-default manual values)

		global $updraftplus;

		$possible_backups = $updraftplus->get_backupable_file_entities(false);
		// We don't want to exclude the very thing we are backing up
		unset($possible_backups['more']);
		// We do want to exclude everything in WordPress and in wp-content
		$possible_backups['wp-content'] = WP_CONTENT_DIR;
		$possible_backups['wordpress'] = untrailingslashit(ABSPATH);

		$possible_backups_dirs = array();
		foreach ($possible_backups as $possback) {
			if (is_array($possback)) {
				foreach ($possback as $pb) $possible_backups_dirs[] = $pb;
			} else {
				$possible_backups_dirs[] = $possback;
			}
		}

		$possible_backups_dirs = array_unique($possible_backups_dirs);
		// $possible_backups_dirs = array_flip($possible_backups); // old

		$orig_was_array = is_array($whichdirs);
		if (!$orig_was_array) $whichdirs = array($whichdirs);
		$dirlist = array();

		foreach ($whichdirs as $whichdir) {

			if (!empty($whichdir) && (is_dir($whichdir) || is_file($whichdir))) {
				// Removing the slash is important (though ought to be redundant by here); otherwise path matching does not work
				$dirlist[] = $updraftplus->compile_folder_list_for_backup(untrailingslashit($whichdir), $possible_backups_dirs, array());
			} else {
				$dirlist[] = array();
				if (!empty($whichdir)) {
					$updraftplus->log("We expected to find something to back up at: ".$whichdir);
					$updraftplus->log($whichdir.': '.__("No backup of location: there was nothing found to back up", 'updraftplus'), 'warning');
				}
			}

		}

		return (!$orig_was_array) ? array_shift($dirlist) : $dirlist;

	}

	public function backup_makezip_more($whichdirs, $backup_file_basename, $index) {

		global $updraftplus, $updraftplus_backup;

		if (!is_array($whichdirs)) $whichdirs = array($whichdirs);

		$this->more_paths = array();

		$final_created = array();

		$first_linked_index = 0;

		// For tracking which "more files" configuration entry goes into which zip, to avoid useless activity (or worse, duplicate backups)
		$first_linked_indexes = $updraftplus->jobdata_get('morefiles_linked_indexes');
		if (!is_array($first_linked_indexes)) $first_linked_indexes = array();

		foreach ($whichdirs as $i => $whichdir) {

			// Actually create the thing
			$dirlist = $this->backup_more_dirlist($whichdir);

			if (count($dirlist)>0) {
				$this->more_paths[] = $whichdir;
				if (!isset($first_linked_indexes[$i])) {
					$first_linked_indexes[$i] = $first_linked_index;
					$updraftplus->jobdata_set('morefiles_linked_indexes', $first_linked_indexes);
				} else {
					$first_linked_index = $first_linked_indexes[$i];
				}
				$created = $updraftplus_backup->create_zip($dirlist, 'more', $backup_file_basename, $index, $first_linked_index);
				$index = $updraftplus_backup->index;
				if (!empty($created)) {
					$index++;
					$first_linked_index = $index;
				}
				if (is_string($created)) {
					$final_created[] = $created;
				} elseif (is_array($created)) {
					$final_created = array_merge($final_created, $created);
				} else {
					$updraftplus->log("$whichdir: More files backup: create_zip returned an error", 'warning', 'morefiles-'.md5($whichdir));
					// return false;
				}
			} else {
				$updraftplus->log("$whichdir: No backup of 'more' directory: there was nothing found to back up", 'warning', 'morefiles-empty-'.md5($whichdir));
				// return false;
			}
		}

		return (empty($final_created)) ? false : $final_created;
	}

	public function include_wpcore_exclude($exclude) {
		return explode(',', UpdraftPlus_Options::get_updraft_option('updraft_include_wpcore_exclude', ''));
	}

	public function backup_wpcore_dirlist($whichdir, $logit = false) {

		// Need to properly analyse the plugins, themes, uploads, content paths in order to strip them out (they may have various non-default manual values)

		global $updraftplus;

		if (false !== ($wpcore_dirlist = apply_filters('updraftplus_dirlist_wpcore_override', false, $whichdir))) return $wpcore_dirlist;

		$possible_backups = $updraftplus->get_backupable_file_entities(false);
		// We don't want to exclude the very thing we are backing up
		unset($possible_backups['wpcore']);
		// We do want to exclude everything in wp-content
		$possible_backups['wp-content'] = WP_CONTENT_DIR;

		foreach ($possible_backups as $key => $dir) {
			if (is_array($dir)) {
				foreach ($dir as $ind => $rdir) {
					if (!empty($rdir)) $possible_backups_dirs[$rdir] = $key.$ind;
				}
			} else {
				if (!empty($dir)) $possible_backups_dirs[$dir] = $key;
			}
		}

		// Create an array of directories to be skipped
		$exclude = UpdraftPlus_Options::get_updraft_option('updraft_include_wpcore_exclude', '');
		if ($logit) $updraftplus->log("Exclusion option setting (wpcore): ".$exclude);
		// Make the values into the keys
		$wpcore_skip = array_flip(preg_split("/,/", $exclude));
		$wpcore_skip['wp_content'] = 0;

		// Removing the slash is important (though ought to be redundant by here); otherwise path matching does not work
		$wpcore_dirlist = $updraftplus->compile_folder_list_for_backup(untrailingslashit($whichdir), $possible_backups_dirs, $wpcore_skip);

		// This is not required to be a perfect test. The point is to make sure we do get WP core.
		// Not using this approach for now.
// if (true == apply_filters('updraftplus_backup_wpcore_dirlist_strict', false)) {
// $wpcore_valid = array('wp-admin', 'wp-includes', 'index.php', 'xmlrpc.php');
// foreach ($wpcore_dirlist as $dir) {
// 				
// }
// }

		return $wpcore_dirlist;

	}

	/**
	 * $whichdir will equal untrailingslashit(ABSPATH) (is ultimately sourced from our backupable_file_entities filter callback)
	 *
	 * @param  string $whichdir
	 * @param  string $backup_file_basename
	 * @param  string $index
	 * @return array
	 */
	public function backup_makezip_wpcore($whichdir, $backup_file_basename, $index) {

		global $updraftplus, $updraftplus_backup;

		// Actually create the thing

		$wpcore_dirlist = $this->backup_wpcore_dirlist($whichdir, true);

		if (count($wpcore_dirlist)>0) {
			$updraft_dir = $updraftplus->backups_dir_location();
			$created = $updraftplus_backup->create_zip($wpcore_dirlist, 'wpcore', $backup_file_basename, $index);
			if (is_string($created) || is_array($created)) {
				return $created;
			} else {
				$updraftplus->log("WP Core backup: create_zip returned an error");
				return false;
			}
		} else {
			$updraftplus->log("No backup of WP core directories: there was nothing found to back up");
			$updraftplus->log(sprintf(__("No backup of %s directories: there was nothing found to back up", 'updraftplus'), __('WordPress Core', ' updraftplus')), 'error');
			return false;
		}

	}


	/**
	 * $wp_dir is trailingslashit($wp_filesystem->abspath())
	 * Must only use $wp_filesystem methods
	 * $working_dir is the directory which contains the backup entity/ies. It is a child of wp-content/upgrade
	 * We need to make sure we do not over-write any entities that are restored elsewhere. i.e. Don't touch plugins/themes etc. - but use backupable_file_entities in order to be fully compatible, but with an additional over-ride of touching nothing inside WP_CONTENT_DIR. Can recycle code from the 'others' handling to assist with this.
	 *
	 * @param  string $working_dir
	 * @param  string $wp_dir
	 * @return array
	 */
	public function restore_movein_wpcore($working_dir, $wp_dir) {

		global $updraftplus_restorer;

		// On subsequent archives of a multi-archive set, don't move anything; but do on the first
		$preserve_existing = isset($updraftplus_restorer->been_restored['wpcore']) ? Updraft_Restorer::MOVEIN_COPY_IN_CONTENTS : Updraft_Restorer::MOVEIN_OVERWRITE_NO_BACKUP;

		return $updraftplus_restorer->move_backup_in($working_dir, $wp_dir, $preserve_existing, array(basename(WP_CONTENT_DIR)), 'wpcore');

	}
}
