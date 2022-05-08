jQuery(function() {
	new UpdraftCentral_WPO_Management();
});

/**
 * An object for managing the WP-Optimize plugin
 *
 * @constructor
 *
 * @return {void}
 */
function UpdraftCentral_WPO_Management() {
	var self = this;
	var $ = jQuery;
	var queue = new UpdraftCentral_Queue();
	var sites = new UpdraftCentral_Collection();
	var debug_level = UpdraftCentral.get_debug_level();
	var current_section;
	var plugin_name = 'WP-Optimize';
	var plugin_slug = 'wp-optimize';
	var plugin_premium_name = 'WP-Optimize Premium';
	var plugin_premium_slug = 'wp-optimize-premium';
	var activate_name;
	var activate_slug;
	var get_optimizations_info_cache = {};
	var optimization_tables;
	var wpoptimize;
	var count;

	/**
	 * Initiates the tablesorter library that would give a sortable function for
	 * the tables being listed under the "Table Information" tab.
	 *
	 * @return {void}
	 */
	function init_sorter() {
		var $table_list_filter = $('#wpoptimize_table_list_filter'),
			$table_list = $('#wpoptimize_table_list'),
			$table_footer_line = $('#wpoptimize_table_list tbody:last'),
			$tables_not_found = $('#wpoptimize_table_list_tables_not_found');

		// table sorter library.
		// This calls the tablesorter library in order to sort the table information correctly.
		var sorter = $table_list.tablesorter({
			theme: 'default',
			widgets: ['zebra', 'rows', 'filter'],
			cssInfoBlock: "tablesorter-no-sort",
			// This option is to specify with colums will be disabled for sorting
			headers: {
				// For Column Action
				7: {sorter: false }
			},
			widgetOptions: {
				// filter_anyMatch replaced! Instead use the filter_external option
				// Set to use a jQuery selector (or jQuery object) pointing to the
				// external filter (column specific or any match)
				filter_external: $table_list_filter,
				// add a default type search to the second table column
				filter_defaultFilter: { 2 : '~{query}' },
			}
		});

		/**
		 * After tables filtered check if we need show table footer and No tables message.
		 */
		$table_list.on('filterEnd', function() {
			var search_value = $table_list_filter.val().trim();

			if ('' == search_value) {
				$table_footer_line.show();
			} else {
				$table_footer_line.hide();
			}

			if (0 == $('#the-list tr:visible', $table_list).length) {
				$tables_not_found.show();
			} else {
				$tables_not_found.hide();
			}
		});
	}

	/**
	 * Extracts the template that displays the actual status of the plugin that
	 * is currently being checked.
	 *
	 * @param {boolean} installed - A flag that indicate whether the plugin is currently installed or not
	 * @param {boolean} active - A flag that indicate whether the plugin is currently active or not
	 * @param {string} plugin_name - The name of the plugin that is currently being checked
	 * @return {string}
	 */
	function get_message_template(installed, active, plugin_name) {
		var install_and_activate = false,
			activate = false,
			options,
			install_name = plugin_name;

		activate_name = plugin_name;
		activate_slug = plugin_slug;
		if (!installed) {
			install_and_activate = true;

			// Make sure that we're downloading the free version in case WP-Optimize plugin (free or premium)
			// is currently not installed. The premium version is secured from other sources, most likely from
			// updraftplus.com server and not by downloading from wordpress.org which is what we're actually doing here.
			if (-1 !== install_name.indexOf('Premium')) {
				install_name = install_name.replace(' Premium', '');
			}
		}
		if (!active && installed) activate = true;

		options = {
				action: {
					install_and_activate: install_and_activate,
					activate: activate,
					messages: {
						not_installed: vsprintf(udclion.plugin_not_installed, [install_name]),
						install_and_activate: udclion.plugin_install_and_activate,
						not_activated: vsprintf(udclion.plugin_not_activated, [activate_name]),
						activate: udclion.plugin_activate
					}
				}
			}

		return UpdraftCentral.template_replace('wpo-wpo-not_active', options);
	}

	/**
	 * Checks whether WP-Optimize plugin is installed/activated before pulling
	 * the content of the requested section.
	 *
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 * @param {String} section A string representing the WP-Optimize tab section where our content is to be retrieved
	 * @return {void}
	 */
	function load_section($site_row, section) {
		var html = '',
			$wpo_location = get_wpo_location($site_row);

		UpdraftCentral.set_loading($wpo_location);
		is_wpo_active($site_row, plugin_name, plugin_slug).then(function(response) {
			if (response.installed && response.active) {
				self.load_contents($site_row, section);
			} else {
				// Update the current_section variable with the actual section
				// currently being processed or loaded.
				self.current_section = section;

				// Free version is not installed so, let's give it one more try, perhaps a
				// premium version is installed rather than a free one.
				if (!response.installed || (response.installed && !response.active)) {
					var free_installed_not_active = (response.installed && !response.active) ? true : false;
					
					is_wpo_active($site_row, plugin_premium_name, plugin_premium_slug).then(function(response) {
						if (response.installed && response.active) {
							self.load_contents($site_row, section);
						} else {
							var premium_installed_not_active = (response.installed && !response.active) ? true : false;
							if (!premium_installed_not_active && free_installed_not_active) {
								html = get_message_template(true, false, plugin_name);
							} else {
								html = get_message_template(response.installed, response.active, plugin_premium_name);
							}
							UpdraftCentral.done_loading($wpo_location, html);
						}
					}).fail(function(response) {
						process_error(response);
						UpdraftCentral.done_loading($wpo_location, html);
					});

				} else if (!response.active && response.installed) {
					html = get_message_template(response.installed, response.active, plugin_name);
					UpdraftCentral.done_loading($wpo_location, html);
				}
			}
			
		}).fail(function(response) {
			process_error(response);
			UpdraftCentral.done_loading($wpo_location, html);
		});
	}

	/**
	 * Displays field details based on selected scheduled type
	 *
	 * @param {string} schedule_type
	 * @param {object} field_details
	 *
	 * @return {string}
	 */
	function display_field_details(schedule_type, field_details) {
		var schedule_fields = '';
		switch (schedule_type) {
			case 'wpo_once':
				schedule_fields = UpdraftCentral.template_replace('schedule-once', {'details': field_details});
				break;
			case 'wpo_daily':
				schedule_fields = UpdraftCentral.template_replace('schedule-daily', {'details': field_details});
				break;
			case 'wpo_weekly':
				schedule_fields = UpdraftCentral.template_replace('schedule-weekly', {'details': field_details});
				break;
			case 'wpo_fortnightly':
				schedule_fields = UpdraftCentral.template_replace('schedule-fortnightly', {'details': field_details});
				break;
			case 'wpo_monthly':
				schedule_fields = UpdraftCentral.template_replace('schedule-monthly', {'details': field_details});
				break;
		}
		return schedule_fields;
	}

	/**
	 * Displays scheduled event headers
	 *
	 * @return void
	 */
	function display_headers() {
		if (0 === $('.wpo_scheduled_event:visible').length) {
			$('.wpo_auto_event_heading_container').hide();
			$('.wpo_no_schedules').show();
		} else {
			$('.wpo_auto_event_heading_container').show();
			$('.wpo_no_schedules').hide();
		}

		if (0 === $('.wpo_scheduled_event:visible').length && 0 === $('.wpo_auto_event:visible').length && !$('#save_settings_reminder').is(':visible')) {
			$('.wpo_no_schedules').show();
		} else {
			$('.wpo_no_schedules').hide();
		}
	}

	/**
	 * Setting click listener/handler for the WPO top level buttons (WP-Optimize, Table Information and Settings)
	 *
	 * @see {@link http://api.jquery.com/on}
	 */
	$('#updraftcentral_dashboard_existingsites').on('updraftcentral_dashboard_mode_set_wpo', function() {

		/**
		 * Register a row clicker for a click event whenever the "WP-Optimize" button is clicked.
		 *
		 * @see {UpdraftCentral.register_row_clicker}
		 */
		UpdraftCentral.register_row_clicker('.updraftcentral_site_wp_optimize', function($site_row) {
			
			load_section($site_row, 'wp_optimize');
			
		}, true);

		/**
		 * Register a row clicker for a click event whenever the "Table Information" button is clicked.
		 *
		 * @see {UpdraftCentral.register_row_clicker}
		 */
		UpdraftCentral.register_row_clicker('.updraftcentral_site_table_information', function($site_row) {
			
			load_section($site_row, 'table_information');
			
		}, true);

		/**
		 * Register a row clicker for a click event whenever the "Settings" button is clicked.
		 *
		 * @see {UpdraftCentral.register_row_clicker}
		 */
		UpdraftCentral.register_row_clicker('.updraftcentral_site_settings', function($site_row) {
			
			load_section($site_row, 'settings');
			
		}, true);

		/**
		 * Register a click event handler for activating the WP-Optimize plugin
		 *
		 * @see {UpdraftCentral.register_row_clicker}
		 */
		UpdraftCentral.register_row_clicker('#btn-activate', function($site_row) {
			var $wpo_location = get_wpo_location($site_row);

			UpdraftCentral.set_loading($wpo_location);
			activate_wpo($site_row, activate_name, activate_slug).then(function(response) {
				if (response.activated) {
					self.load_contents($site_row, self.current_section);
				}
			}).fail(function(response) {
				process_error(response);
				UpdraftCentral.done_loading($wpo_location);
			});
			
		}, true);

		/**
		 * Register a click event handler for installing and activating the WP-Optimize plugin
		 *
		 * @see {UpdraftCentral.register_row_clicker}
		 */
		UpdraftCentral.register_row_clicker('#btn-install-activate', function($site_row) {
			var $wpo_location = get_wpo_location($site_row);

			UpdraftCentral.set_loading($wpo_location);
			install_activate_wpo($site_row, plugin_name, plugin_slug).then(function(response) {
				if (response.installed || response.activated) {
					self.load_contents($site_row, self.current_section);
				}
			}).fail(function(response) {
				process_error(response);
				UpdraftCentral.done_loading($wpo_location);
			});
			
		}, true);
	});


	/**
	 * Setting a listener/handler for the custom event "updraftcentral_wpo_opimization_start"
	 *
	 * N.B. UpdraftCentral's set_loading and done_loading is interfering with the enabling/disabling of buttons.
	 * Thus, we're implementing the opacity directly instead. Implemented the blurring in order to have consistency
	 * on loading and unloading when running the optimization process, since we're using the UpdraftCentral_Queue
	 * where it bounces back and forth until the queue is empty.
	 *
	 * @see {@link http://api.jquery.com/on}
	 */
	$(document).on('updraftcentral_wpo_opimization_start', function(event, $site_row) {
		if ('undefined' !== typeof $site_row) {
			var $wpo_location = get_wpo_location($site_row);

			$wpo_location.css('opacity', '0.3');
		}
	});


	/**
	 * Setting a listener/handler for the custom event "updraftcentral_wpo_opimization_end"
	 *
	 * N.B. UpdraftCentral's set_loading and done_loading is interfering with the enabling/disabling of buttons.
	 * Thus, we're implementing the opacity directly instead. Implemented the blurring in order to have consistency
	 * on loading and unloading when running the optimization process, since we're using the UpdraftCentral_Queue
	 * where it bounces back and forth until the queue is empty.
	 *
	 * @see {@link http://api.jquery.com/on}
	 */
	$(document).on('updraftcentral_wpo_opimization_end', function(event, $site_row) {
		if ('undefined' !== typeof $site_row) {
			var $wpo_location = get_wpo_location($site_row);
			$wpo_location.css('opacity', '1.0');

			process_done($site_row);
			
			// Making sure that no processing elements (spinner, etc.) is left hanging after all the
			// process has completed (queue is empty).
			$site_row.find('table#optimizations_list tr').each(function() {
				var optimization_id = $(this).data('optimization_id');

				if ($(this).find('#optimization_spinner_'+optimization_id).is(':visible')) {
					$(this).find('#optimization_spinner_'+optimization_id).hide();
					$(this).find('#optimization_checkbox_'+optimization_id).show();
					$(this).find('.optimization_button_'+optimization_id).prop('disabled', false);

					if ('optimizetables' === optimization_id) {
						$(this).find('#optimization_info_'+optimization_id).html(udclion.wpo.optimization_complete);
					}
				}
			});
		}
	});



	/**
	 * Setting a listener/handler for the event "updraftcentral_listener_finished_updraftplus_backup"
	 *
	 * N.B. Event is triggered when the auto backup process has already completed, allowing the system
	 * to execute the callback function in order to proceed with the optimization process, which was halted
	 * temporarily in order to execute the auto backup process, provided the user opted to check the backup before optimizations
	 * checkbox.
	 *
	 * @see {@link http://api.jquery.com/on}
	 */
	$('#updraftcentral_dashboard_existingsites').on('updraftcentral_listener_finished_updraftplus_backup', function(event, data) {
		event.preventDefault();

		if ('undefined' !== typeof data.site_id) {
			var site_key = 'site_' + data.site_id;

			if (sites.exists(site_key)) {
				var site = sites.item(site_key);

				if (!site.autobackup_complete) {
					var options = site.autobackup_options;
					site.autobackup_complete = true;

					if ('undefined' !== typeof options && 'undefined' !== typeof options.callback) {
						options.callback.apply(null, []);
					}
				}
			}
		} else {
			if (debug_level > 0) {
				console.log("WP-Optimize: unexpected site id was returned - exiting");
			}
		}
	});


	/**
	 * Toggles trackbacks/comments feature for published posts
	 *
	 * @param {string} type The type of feature where the process is going to be applied (e.g. "trackbacks" or "comments").
	 * @param {Object} feature A jQuery object representing the button that was clicked.
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 *
	 * @return {void}
	 */
	this.toggle_feature = function(type, feature, $site_row) {
		var $wpo_location = get_wpo_location($site_row);

		if ('undefined' !== typeof feature && feature.length) {
			var id = feature.attr('id');
			var struct = id.split('-');
			var value = struct[struct.length-1];

			value = (value === 'enable') ? true : false;

			UpdraftCentral.set_loading($wpo_location);
			enable_or_disable_feature(type, value, $site_row).then(function(response) {
				if ('undefined' !== typeof response.output && response.output.length) {
					UpdraftCentral_Library.dialog.alert('<h2>'+udclion.wpo.feature_update_heading+'</h2><p>'+response.output[0]+'</p>');
				}

			}).fail(function(response) {
				process_error(response);

			}).always(function() {
				UpdraftCentral.done_loading($wpo_location);
			});
		}

	}

	/**
	 * Checks for empty scheduled items that is yet to be filled by the user
	 *
	 * @return {integer}
	 */
	function have_empty_schedule() {
		var empty = 0;
		$('#wpo_auto_events .wpo_auto_event').each(function() {
			var event = $(this);
			var count = event.find('ul.select2-selection__rendered > li.select2-selection__choice').length;
			if (0 === count) empty++;
		});

		return empty;
	}

	/**
	 * Saves the WP-Optimize settings
	 *
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 *
	 * @return {void}
	 */
	this.save_settings = function($site_row) {
		var $wpo_location = get_wpo_location($site_row);
		var form_data = gather_settings();
		var results;
		var empty_count = have_empty_schedule();

		// validate task and logger settings.
		if (!validate_task_logger_settings()) return false;

		if (empty_count > 0) {
			UpdraftCentral_Library.dialog.alert('<h2>'+udclion.wpo.save_settings_heading+'</h2><p>'+udclion.wpo.empty_schedule+'</p>');
		} else {
			UpdraftCentral.set_loading($wpo_location);
			save_settings(form_data, $site_row).then(function(response) {
				if ('undefined' !== typeof response.save_results) {
					results = response.save_results;
				}
	
			}).fail(function(response) {
				process_error(response);
	
			}).always(function() {
				UpdraftCentral.done_loading($wpo_location).then(function() {
					if ('undefined' !== typeof results) {
						if ('undefined' !== typeof results.errors && results.errors.length) {
							UpdraftCentral_Library.dialog.alert('<h2>'+udclion.wpo.save_settings_heading+'</h2><p>'+results.errors[0]+'</p>');
						} else {
							UpdraftCentral_Library.dialog.alert('<h2>'+udclion.wpo.save_settings_heading+'</h2><p>'+results.messages[0]+'</p>');
							self.load_contents($site_row, 'settings');
						}
					}
				});
			});
		}
	}


	/**
	 * Executes the "Run Optimization" button handler
	 *
	 * @param {Object} btn A jQuery object representing the button that was clicked.
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 *
	 * @return {void}
	 */
	this.run_optimization_single = function(btn, $site_row) {
		$(document).trigger('updraftcentral_wpo_opimization_start', [$site_row]);

		self.pre_optimization_run($site_row, false, function() {
			var optimization_id = $(btn).closest('.wp-optimize-settings').data('optimization_id');
			if (!optimization_id) {
				console.log("Optimization ID corresponding to pressed button not found");
				return;
			}

			self.pre_save_options($site_row, function(options) {
				if ($('#wpo_settings_sites_list').length) {
					self.save_sites_list({ 'wpo-sites': get_selected_sites_list() }, $site_row).then(function(response) {
						do_optimization(optimization_id, $site_row);
					});
				} else {
					do_optimization(optimization_id, $site_row);
				}
			});
		});
	}


	/**
	 * Executes the "Run all selected optimizations" button handler
	 *
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 *
	 * @return {void}
	 */
	this.run_optimization_all = function($site_row) {
		$(document).trigger('updraftcentral_wpo_opimization_start', [$site_row]);

		self.pre_optimization_run($site_row, true, function() {
			self.pre_save_options($site_row, function(options) {
				if ($('#wpo_settings_sites_list').length) {
					self.save_sites_list({ 'wpo-sites': get_selected_sites_list() }, $site_row).then(function(response) {
						for (var optimization_id in options) {
							var item = options[optimization_id];

							if ('undefined' !== typeof item.active && 1 == item.active) {
								do_optimization(optimization_id, $site_row);
							}
						}
					});
				} else {
					for (var optimization_id in options) {
						var item = options[optimization_id];

						if ('undefined' !== typeof item.active && 1 == item.active) {
							do_optimization(optimization_id, $site_row);
						}
					}
				}
			});

		});
	}

	/**
	 * Pre-saves the selected options before optimizations
	 *
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 * @param {function} callback The callback function to execute when the saving process is done.
	 *
	 * @return {void}
	 */
	this.pre_save_options = function($site_row, callback) {
		var options = get_optimization_options();

		save_manual_run_optimization_options(options, $site_row).then(function(response) {
			callback.apply(null, [options]);
		}).fail(function(response) {
			process_error(response);
		})
	}

	/**
	 * Checks whether a backup process is needed before running the optimization process
	 *
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 * @param {boolean} prompt A flag that indicates whether a confirmation box is to be displayed or not.
	 * @param {function} callback The callback function to execute when the pre-check is done or execute directly
	 *							  when a backup process is not needed.
	 *
	 * @return {void}
	 */
	this.pre_optimization_run = function($site_row, prompt, callback) {
		if ('undefined' !== typeof prompt && prompt) {
			if (false === confirm(udclion.wpo.warning)) {
				var $wpo_location = get_wpo_location($site_row);
				$wpo_location.css('opacity', '1.0');
				return;
			}
		}

		var auto_backup = false;
		if ($('#enable-auto-backup').is(":checked")) {
			auto_backup = true;
		}

		save_auto_backup_option(auto_backup, $site_row).then(function(response) {

			var site_key = 'site_' + $site_row.data('site_id');
			if (sites.exists(site_key)) {
				var site = sites.item(site_key);

				if (auto_backup && !site.autobackup_complete) {
					var extra_data = {
						_listener_title: '<h2>' + $site_row.data('site_description') + ' - ' + udclion.wpo.automatic_backup + '</h2>'
					}

					// Set the current callback in which
					// the system will execute after the backup process
					site.autobackup_options = {
						callback: callback
					};

					// Setting the current site row manually, as it will
					// be called by the backup process.
					UpdraftCentral.set_current_site_row($site_row);

					// Execute UpdraftPlus backup process.
					UpdraftCentral_Module_UpdraftPlus.backupnow_go(false, false, false, '', extra_data, udclion.wpo.automatic_backup, '');
				} else {
					callback.apply(null, []);
				}
			}

		}).fail(function(response) {
			process_error(response);
		});
	}

	/**
	 * Loads the appropriate content based on the tab id
	 *
	 * @param {Object} $site_row The jQuery object of the site.
	 * @param {string} tab A string representing the WP-Optimize tab section where our content is to be retrieve.
	 *
	 * @borrows UpdraftCentral.set_loading
	 * @borrows UpdraftCentral.done_loading
	 *
	 * @return {voids}
	 */
	this.load_contents = function($site_row, tab) {
		var html = '',
			$wpo_location = get_wpo_location($site_row),
			site_key = 'site_' + $site_row.data('site_id');


		if (!sites.exists(site_key)) {
			var site = new UpdraftCentral_Site($site_row);
			sites.add(site_key, site);
		}

		var params = {
			name: 'get_'+tab+'_contents',
			arguments: {}
		}
		
		UpdraftCentral.set_loading($wpo_location);
		send_command(params, $site_row).then(function(response) {
			if ('undefined' !== typeof response) {
				if ('undefined' !== typeof response.content) {
					html = response.content;
					wpoptimize = response.translations;
				} else {
					// For backward compatibility
					html = response;
				}
			}
		}).fail(function(response) {
			var template = process_error(response);
			if ('undefined' !== typeof template && template.length) {
				html = template;
			}
		}).always(function() {

			UpdraftCentral.done_loading($wpo_location, html).then(function() {
				if (html && html.length) {

					// Remove remote spinner url and use local spinner
					$('img.optimization_spinner, img#wpo_import_spinner').attr('src', udclion.wpo.images+'spinner-2x.gif').attr('alt', '').addClass('wp_uc_spinner');

					// Housekeeping to maintain the WP-Optimize behaviour since we're
					// loading the content from the actual template from the WP-Optimize
					// plugin, so that we don't have to change two sets of template whenever
					// there's some template/UI changes to the plugin.

					$wpo_location.find('.wpo_section .button').addClass('btn');
					$wpo_location.find('.wpo_section .button-primary').addClass('btn-primary');
					$wpo_location.find('.wpo_section .button-secondary').addClass('btn-secondary');
					$wpo_location.find('a#wp_optimize_status_box_refresh').attr('href', '#');


					var btn_save = $wpo_location.find('input#wp-optimize-settings-save');
					if ('undefined' !== typeof btn_save && btn_save.length) {
						btn_save_clone = btn_save.clone();
						btn_save_clone.attr('type', 'button');

						btn_save.replaceWith(btn_save_clone);
					}

					var btn_optimize = $wpo_location.find('input#wp-optimize');
					if ('undefined' !== typeof btn_optimize && btn_optimize.length) {
						btn_optimize_clone = btn_optimize.clone();
						btn_optimize_clone.attr('type', 'button');

						btn_optimize.replaceWith(btn_optimize_clone);
					}

					// Making sure that we're opening remote links displayed on the template to a
					// new window or tab.
					$('#optimizations_list .wp-optimize-settings-optimization-info a').each(function() {
						var anchor = $(this);
						anchor.attr('target', '_blank');
					});

					// Enable or disable options
					enable_or_disable_schedule_options();
					enable_or_disable_store_log_entries();
					enable_or_disable_slack_log_entries();

					if ('wp_optimize' === tab) {
						self.get_optimization_tables($site_row).then(function(response) {
							var container = $('<div>').html(response.table_list);
							optimization_tables = container.find('tbody#the-list tr');
						});
					}

					init_sorter();

					$('button.run-single-table-optimization').addClass('btn btn-secondary');
					$('#optimize_current_db_size').closest('h3').addClass('updraftcentral-current-db-size');
					$('#wpoptimize_table_list > tbody > tr').each(function(i) {
						var row = $(this);

						if (i % 2 === 1) {
							row.addClass('even');
						} else {
							row.addClass('odd');
						}
					});

					$('#wpoptimize_table_list th > div.tablesorter-header-inner').each(function() {
						var label = $(this).html();
						$(this).closest('th').attr('data-label', label);
					});

					var id_suffix = '';
					if ($('#wpo_settings_sites_list_cron').length) id_suffix = '_cron';
					update_wpo_all_items_checkbox_state($('#wpo_settings_sites_list'+id_suffix+' #wpo_all_sites'+id_suffix), $('#wpo_sitelist_moreoptions'+id_suffix+' input[type="checkbox"]'));

					UpdraftCentral.register_event_handler('click', '#wpo_sitelist_show_moreoptions'+id_suffix, function() {
						if (!$('#wpo_sitelist_moreoptions'+id_suffix).hasClass('wpo_always_visible')) {
							$('#wpo_sitelist_moreoptions'+id_suffix).toggleClass('wpo_hidden');
						}
					});

					UpdraftCentral.register_event_handler('change', '#wpo_settings_sites_list'+id_suffix+' #wpo_all_sites'+id_suffix, function() {
						var all_items_checkbox = $(this);
						var items_list = $('#wpo_sitelist_moreoptions'+id_suffix+' input[type="checkbox"]');

						if (all_items_checkbox.is(':checked')) {
							items_list.prop('checked', true);
						} else {
							items_list.prop('checked', false);
						}

						update_wpo_all_items_checkbox_state(all_items_checkbox, items_list);
					});

					UpdraftCentral.register_event_handler('change', '#wpo_sitelist_moreoptions'+id_suffix+' input[type="checkbox"]', function() {
						var items_list = $('#wpo_sitelist_moreoptions'+id_suffix+' input[type="checkbox"]');
						var all_items_checkbox = $('#wpo_settings_sites_list'+id_suffix+' #wpo_all_sites'+id_suffix);

						update_wpo_all_items_checkbox_state(all_items_checkbox, items_list);
					});

					UpdraftCentral.register_event_handler('change', '#wpo_settings_sites_list input[type="checkbox"]', function() {
						update_optimizations_info($site_row);
					});

					UpdraftCentral.register_event_handler('click', '#wpoptimize_table_list .run-single-table-optimization', function() {
						var btn = $(this),
							spinner = btn.next(),
							action_done_icon = spinner.next(),
							table_name = btn.data('table'),
							table_type = btn.data('type'),
							data = {
								optimization_id: 'optimizetables',
								optimization_table: table_name,
								optimization_table_type: table_type
							};

						spinner.removeClass('visibility-hidden');
						var params = {
							optimization_id: 'optimizetables',
							data: data
						}

						send_optimization_request(params, $site_row).then(function(response) {
							btn.prop('disabled', false);
							spinner.addClass('visibility-hidden');
							action_done_icon.show().removeClass('visibility-hidden').delay(3000).fadeOut('slow');
						});

					});

					UpdraftCentral.register_event_handler('click', '#wpoptimize_table_list .run-single-table-delete', function() {
						if (!confirm(udclion.wpo.are_you_sure_you_want_to_remove_this_table)) return false;

						var btn = $(this),
							spinner = btn.next(),
							action_done_icon = spinner.next(),
							table_name = btn.data('table')
							data = {
								optimization_id: 'orphanedtables',
								optimization_table: table_name
							};

						spinner.removeClass('visibility-hidden');
						var params = {
							optimization_id: 'orphanedtables',
							data: data
						}

						self.pre_optimization_run($site_row, false, function() {
							send_optimization_request(params, $site_row).then(function(response) {
								if (response.result.meta.success) {
									var row = btn.closest('tr');
									action_done_icon.show().removeClass('visibility-hidden');

									// remove row for deleted table.
									setTimeout(function() {
										row.fadeOut('slow', function() {
											row.remove();
											change_actions_column_visibility();
										});
									}, 500);
								} else {
									var message = vsprintf(udclion.wpo.table_was_not_deleted, [table_name]);
									if (response.result.meta.message) {
										message += '(' + response.result.meta.message + ')';
									}

									UpdraftCentral_Library.dialog.alert('<h2>'+udclion.error+'</h2><p>'+message+'</p>');
								}
							}).always(function() {
								btn.prop('disabled', false);
								spinner.addClass('visibility-hidden');
							});
						});
					});

					UpdraftCentral.register_event_handler('click', '#wpo_import_settings_btn', function() {
						var file_input = $('#wpo_import_settings_file'),
							filename = file_input.val(),
							wpo_import_file_file = file_input[0].files[0],
							wpo_import_file_reader = new FileReader();

						$('#wpo_import_settings_btn').prop('disabled', true);

						if (!/\.json$/.test(filename)) {
							e.preventDefault();
							$('#wpo_import_settings_btn').prop('disabled', false);
							$('#wpo_import_error_message').text(udclion.wpo.please_select_settings_file).slideDown();
							return false;
						}

						wpo_import_file_reader.onload = function() {
							import_settings(this.result, $site_row);
						};

						wpo_import_file_reader.readAsText(wpo_import_file_file);
					});

					UpdraftCentral.register_event_handler('change', '#wpo_import_settings_file', function() {
						$('#wpo_import_error_message').slideUp();
					});

					UpdraftCentral.register_event_handler('click', '#wpo_export_settings_btn', function() {
						wpo_download_json_file(gather_settings('object'));
					});

					UpdraftCentral.register_event_handler('click', '.updraftcentral_wpo_rows input#innodb_force_optimize', function() {
						var parent = $(this).closest('tr.wp-optimize-settings');
						var overwrite = $(this).is(':checked');

						parent.find('input.optimization_checkbox, button.wp-optimize-settings-optimization-run-button').each(function() {
							if (!overwrite && $(this).hasClass('optimization_checkbox')) {
								$(this).prop('checked', false);
							}
							$(this).prop('disabled', !overwrite);
						});
					});

					UpdraftCentral.register_event_handler('change', '.updraftcentral_wpo_rows input#enable-schedule', function() {
						enable_or_disable_schedule_options();
					});

					UpdraftCentral.register_event_handler('change', '.updraftcentral_wpo_rows input#wp-optimize-logger-updraft_ring_logger', function() {
						enable_or_disable_store_log_entries();
					});

					UpdraftCentral.register_event_handler('change', '.updraftcentral_wpo_rows input#wp-optimize-logger-updraft_slack_logger', function() {
						enable_or_disable_slack_log_entries();
					});

					UpdraftCentral.register_event_handler('click', '.updraftcentral_wpo_rows #wp_optimize_table_list_refresh', function() {
						self.load_contents($site_row, 'table_information');
					});

					UpdraftCentral.register_event_handler('click', '.updraftcentral_wpo_rows button[id^="wp-optimize-disable-enable-trackbacks-"]', function() {
						self.toggle_feature('trackbacks', $(this), $site_row);
					});

					UpdraftCentral.register_event_handler('click', '.updraftcentral_wpo_rows button[id^="wp-optimize-disable-enable-comments-"]', function() {
						self.toggle_feature('comments', $(this), $site_row);
					});

					UpdraftCentral.register_event_handler('click', '.updraftcentral_wpo_rows input#wp-optimize-settings-save', function() {
						self.save_settings($site_row);
					});

					UpdraftCentral.register_event_handler('click', '.updraftcentral_wpo_rows a#wp_optimize_status_box_refresh', function() {
						self.load_contents($site_row, 'wp_optimize');
					});

					UpdraftCentral.register_event_handler('click', '.updraftcentral_wpo_rows button.wp-optimize-settings-optimization-run-button', function() {
						self.run_optimization_single(this, $site_row);
					});

					UpdraftCentral.register_event_handler('click', '.updraftcentral_wpo_rows input#wp-optimize', function() {
						var checked_items = $('#optimizations_list input.optimization_checkbox:checked');
						if (0 == checked_items.length) {
							UpdraftCentral_Library.dialog.alert('<h2>'+udclion.error+'</h2><p>'+udclion.wpo.no_selected_items+'</p>');
						} else {
							self.run_optimization_all($site_row);
						}
					});


					// Prevent UDC to break (errored-out) if the current WPO plugin currently
					// doesn't have the "get_js_translation" as a remote command since the below
					// codeblock rely heavily on those WPO translations.
					if ('undefined' !== typeof wpoptimize) {

						var $auto_options = $('#wp-optimize-auto-options');
						var $time_fields = $('input[type="time"]');
						var $date_fields = $('input[type="date"]');
						var today = new Date().toISOString().split('T')[0];

						// This helps to keep track of scheduled events
						count = $('.wpo_auto_event:last').data('count') || 0;

						// Use time picker when input[type="time"] not supported
						$time_fields.each(function(index, element) {
							if (!Modernizr.inputtypes.time) {
								$(element).timepicker({'timeFormat': 'H:i'});
								$(element).addClass('no_date_time_support');
								$(element).on('changeTime', function() {
									$(this).timepicker('hide');
								});
							}
						});

						// Use datepicker when input[type="date"] not supported
						$date_fields.each(function(index, element) {
							if (!Modernizr.inputtypes.date) {
								$(element).datepicker({
									dateFormat: "yy-mm-dd",
									minDate: 0
								});
								$(element).addClass('no_date_time_support');
							}
						});

						if (0 !== $('.wpo_scheduled_event').length) {
							$('.wpo_no_schedules').hide();
						} else {
							$('.wpo_no_schedules').show();
						}

						// Render options for contents that was automatically pulled from WPO plugin.
						render_wpo_options();

						$('#wpo-add-event').on('click', function(event) {
							count++;
							var optimizations = UpdraftCentral.template_replace('schedule-optimizations', { optimizations: wpoptimize.auto_optimizations, count: count });
							var schedule_types = UpdraftCentral.template_replace('schedule-schedule_types', { schedule_types: wpoptimize.schedule_types, count: count });
							var action = UpdraftCentral.template_replace('schedule-action', { count: count });
							var html_content = '<div class="wpo_auto_event wpo_cf" data-count="' + count +'">';
							html_content += optimizations + schedule_types + action;
							html_content += '</div>';

							$('#wpo_auto_events').prepend(html_content+'<div class="clear"></div>');
							render_wpo_options();
						});


						$logging = $('#wp-optimize-logger-settings');
						$logging.find('.wpo_logging_header').append('<div class="clear"></div>');
						$logging.find('.wpo_logging_row').append('<div class="clear"></div>');

						$logging.find('.wpo_logging_row').each(function() {
							var options_row = $(this).find('.wpo_logging_options_row').html();
							if (0 === options_row.length) {
								$(this).find('.wpo_logging_options_row').html("&nbsp;");
							}
						});


						$logging.find('#wpo_add_logger_link').on('click', function() {
							$('#wp-optimize-logger-settings .save_settings_reminder').after(get_add_logging_form_html());

							filter_select_destinations($('.wpo_logger_type').first());
							$logging.find('.wpo_logger_type').on('change', function() {
								var select = $(this),
									logger_id = select.val(),
									options_container = select.parent().find('.wpo_additional_logger_options');

								options_container.html(get_logging_additional_options_html(logger_id));

								if (select.val()) {
									show_logging_save_settings_reminder();
								}
							});

							$logging.find('.wpo_add_logger_form a.wpo_delete_logger').on('click', function() {
								delete_logger($(this));
							});
						});

						$logging.find('.wpo_logging_row a.wpo_delete_logger').on('click', function() {
							delete_logger($(this));
						});

						$logging.find('.wpo_logging_actions_row .dashicons-edit').on('click', function() {
							var link = $(this),
								container = link.closest('.wpo_logging_row');

							$('.wpo_additional_logger_options', container).removeClass('wpo_hidden');
							$('.wpo_logging_options_row', container).text('');
							$('.wpo_logging_status_row', container).text('');
							link.hide();

							return false;
						});

						$logging.find('.wpo_logging_row input.wpo_logger_active_checkbox').on('click', function() {
							var value = $(this).is(':checked') ? 1 : 0;
							$(this).closest('label').find('input[type="hidden"]').val(value);
						});


						$auto_events = $('#wpo_auto_events');
						$auto_events.find('.wpo_auto_event_heading_container').append('<div class="clear"></div>');
						$auto_events.find('.wpo_scheduled_event').append('<div class="clear"></div>');

						$auto_options.on('focus', 'input[type="time"]', function() {
							var element = $(this).get(0);
							if (!Modernizr.inputtypes.time) {
								$(element).timepicker({'timeFormat': 'H:i'});
								$(element).on('changeTime', function() {
									$(this).timepicker('hide');
								});
							}
						});

						$auto_options.on('keypress', 'input', function(e) {
							if (13 === e.keyCode) return false;
						});

						$auto_options.on('focus', 'input[type="date"]', function() {
							var ele = $(this).get(0);
							if (!Modernizr.inputtypes.date) {
								$(ele).datepicker({
									dateFormat: "yy-mm-dd",
									minDate: 0
								});
							}
						});

						/**
						 * Detect change on schedule panel and set reminder
						 */
						$auto_options.on('change', 'select, input[type="date"], input[type="time"]', function() {
							$("#save_settings_reminder").slideDown();
							display_headers();
						});

						/**
						 * Show appropriate fields (date, time, week and day) when schedule type is changed
						 */
						$auto_options.on('change', '.wpo_schedule_type', function() {
							var $container = $(this).closest('.wpo_auto_event');

							// Use existing count, if it is editing to existing event or use incremented count
							var event_count = $container.data('count') || count;
							var schedule_type = $(this).val();
							var class_name = '';
							if ((!Modernizr.inputtypes.date || !Modernizr.inputtypes.time)) {
								class_name = 'no_date_time_support';
							}
							var field_details = {
								'date': wpoptimize.date,
								'time': wpoptimize.time,
								'day': wpoptimize.day,
								'day_number': wpoptimize.day_number,
								'days': wpoptimize.days,
								'date_value': '',
								'time_value': '00:00',
								'status': wpoptimize.active,
								'status_value': "checked",
								'week_days': wpoptimize.week_days,
								'week': wpoptimize.week,
								'count': event_count,
								'class_name': class_name,
								'today': today
							};
							var schedule_fields = display_field_details(schedule_type, field_details);
							var status = UpdraftCentral.template_replace('schedule-status', {'details': field_details});
							var action =UpdraftCentral.template_replace('schedule-action', {});
							$(this).next().html('');
							$container.find('.wpo_event_status').remove();
							$container.find('.wpo_event_actions').remove();
							if ('' !== schedule_fields) {
								$(this).next().html(schedule_fields);
							}
							$container.append(status + action);
						});

						/**
						 * Edit event details
						 */
						$auto_options.on('click', '.wpo_edit_event', function() {
							var $container = $(this).closest('.wpo_scheduled_event');
							$container.hide();
							$container.next().append('<div class="clear"></div>').show();
							display_headers();
						});

						/**
						 * Remove event details
						 */
						$auto_options.on('click', '.wpo_remove_event', function() {
							var count = $(this).data('count');
							var ok_remove = confirm(wpoptimize.confirm_remove_task);
							if (true === ok_remove) {
								var $scheduled_event = $(this).closest('.wpo_scheduled_event');
								var $auto_event = $(this).closest('.wpo_auto_event');

								// If event deleted from list, then remove form as well
								if (count == $scheduled_event.next().data('count')) {
									$scheduled_event.next().remove();
									$scheduled_event.remove();
								}

								// If event deleted from form, then remove stored details as well
								if (count == $auto_event.prev().data('count')) {
									$auto_event.prev().remove();
								}

								// Delete newly created event
								$auto_event.remove();

								$("#save_settings_reminder").slideDown();
								display_headers();
							}
						});
					}

					UpdraftCentral.register_event_handler('click', '#optimizations_list input#select_all_optimizations', function() {
						var checked = $(this).is(':checked') ? true : false;
						$('#optimizations_list input.optimization_checkbox').each(function() {
							$(this).prop('checked', checked);
						});
					});

				} else {
					UpdraftCentral_Library.dialog.alert('<h2>'+udclion.error+'</h2><p>'+udclion.wpo.could_not_return_content+'</p>');
					$wpo_location.empty();
				}

			});
		});
	}

	/**
	 * Show or hide actions column if need.
	 *
	 * @return void
	 */
	function change_actions_column_visibility() {
		var table = $('#wpoptimize_table_list'),
			hideLastColumn  = true;

		// check if any button exists in the actions column.
		$('tr', table).each(function() {
			var row = $(this);

			if ($('button', row).length > 0) {
				hideLastColumn = false;
				return false;
			}
		});

		// hide or show last column
		$('tr', table).each(function() {
			var row = $(this);

			if (hideLastColumn) {
				$('td:last, th:last', row).hide();
			} else {
				$('td:last, th:last', row).show();
			}
		});
	}

	/**
	 * Validate scheduled tasks and loggers settings.
	 *
	 * @return {boolean}
	 */
	function validate_task_logger_settings() {
		var valid = true;
		var error_message = wpoptimize.fill_all_settings_fields;

		$('ul.select2-selection__rendered').each(function() {
			var count = $(this).find('li.select2-selection__choice').length;
			if (0 === count) {
				valid = false;
				error_message = wpoptimize.fill_all_fields;
				$(this).closest('.select2-selection--multiple').addClass('wpo_error_field');
			} else {
				$(this).closest('.select2-selection--multiple').removeClass('wpo_error_field');
			}
		});

		$('.wpo_schedule_type, .wpo_logger_addition_option, .wpo_logger_type').each(function() {
			if (!validate_field($(this), true)) {
				valid = false;
				$(this).addClass('wpo_error_field');
			} else {
				$(this).removeClass('wpo_error_field');
			}
		});

		if (!valid) {
			$('#wp-optimize-settings-save-results')
				.show()
				.addClass('wpo_alert_notice')
				.text(error_message)
				.delay(5000)
				.fadeOut(3000, function() {
					$(this).removeClass('wpo_alert_notice');
				});
		} else {
			$('#wp-optimize-logger-settings .save_settings_reminder').slideUp();
		}

		return valid;
	}

	/**
	 * Validate import field with data-validate attribute.
	 *
	 * @param {object}  field    jquery element
	 * @param {boolean} required
	 *
	 * @return {boolean}
	 */
	function validate_field(field, required) {
		var value = field.val(),
			validate = field.data('validate');

		if (!validate && required) {
			return ('' != value.trim());
		}

		if (validate && !required && '' == value.trim()) {
			return true;
		}

		var valid = true;

		switch (validate) {
			case 'email':
				var regex = /\S+@\S+\.\S+/,
					emails = value.split(","),
					email = '';

				for (var i = 0; i < emails.length; i++) {
					email = emails[i].trim();

					if ('' == email || !regex.test(email)) {
						valid = false;
					}
				}
				break;

			case 'url':
				// https://gist.github.com/dperini/729294
				// @codingStandardsIgnoreLine
				var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;

				valid = regex.test(value);
				break;
		}

		return valid;
	}

	/**
	 * Renders the scheduled optimization tasks options
	 *
	 * @return {void}
	 */
	function render_wpo_options() {
		$('.wpo_auto_optimizations').select2({
			placeholder: wpoptimize.select_optimizations
		});

		$('.wpo_auto_optimizations').off('select2:open').on('select2:open', function() {
			maybe_change_container();
		});

		$('.wpo_auto_optimizations').off('select2:opening select2:closing').on('select2:opening select2:closing', function(event) {
			var $searchfield = $(this).parent().find('.select2-search__field');
			$searchfield.prop('disabled', true);
		});
	}

	/**
	 * Checks whether there's a need to switch container
	 * for the dropdown options.
	 *
	 * @return {void}
	 */
	function maybe_change_container() {
		if ($.fullscreen.isFullScreen()) {
			$(document.body).children('span.select2-container--open').appendTo('#updraftcentral_dashboard');
		}
	}

	/**
	 * Deletes logger items
	 *
	 * @param {object} btn The button that triggered the action
	 *
	 * @return {boolean}
	 */
	function delete_logger(btn) {
		if (!confirm(wpoptimize.are_you_sure_you_want_to_remove_logging_destination)) {
			return false;
		}

		btn.closest('.wpo_logging_row, .wpo_add_logger_form').remove();
		filter_all_select_destinations();

		if (0 == $('#wp-optimize-logging-options .wpo_logging_row').length) {
			$('#wp-optimize-logging-options').hide();
		}

		show_logging_save_settings_reminder();

		return false;
	}

	/**
	 * Returns logging options html.
	 *
	 * @param {string} logger_id
	 *
	 * @return {string}
	 */
	function get_logging_additional_options_html(logger_id) {
		if (!wpoptimize.loggers_classes_info[logger_id].options) return '';

		var i,
			options = wpoptimize.loggers_classes_info[logger_id].options,
			options_list = [],
			placeholder = '',
			validate = '';

		for (i in options) {
			if (!options.hasOwnProperty(i)) continue;

			if (Array.isArray(options[i])) {
				placeholder = options[i][0].trim();
				validate = options[i][1].trim();
			} else {
				placeholder = options[i].trim();
				validate = '';
			}

			options_list.push([
				'<input class="wpo_logger_addition_option" type="text" name="wpo-logger-options[',i,'][]" value="" ',
				'placeholder="',placeholder,'" ',('' !== validate ? 'data-validate="'+validate+'"' : ''), '/>'
			].join(''));
		}

		// Add hidden field for active/inactive value.
		options_list.push('<input type="hidden" name="wpo-logger-options[active][]" value="1" />');

		return options_list.join('');
	}

	/**
	 * Show save settings reminder for logging settings.
	 *
	 * @return {void}
	 */
	function show_logging_save_settings_reminder() {
		var reminder = $('#wp-optimize-logger-settings .save_settings_reminder');

		if (!reminder.is(':visible')) {
			reminder.slideDown('normal');
		}
	}

	/**
	 * Return add logging form.
	 *
	 * @return {string}
	 */
	function get_add_logging_form_html() {
		var i,
			select_options = [
				'<option value="">Select destination</option>'
			];

		for (i in wpoptimize.loggers_classes_info) {
			if (!wpoptimize.loggers_classes_info.hasOwnProperty(i)) continue;
			select_options.push(['<option value="',i,'">',wpoptimize.loggers_classes_info[i].description,'</option>'].join(''));
		}

		return [
			'<div class="wpo_add_logger_form">',
				'<select class="wpo_logger_type" name="wpo-logger-type[]">',
					select_options.join(''),
				'<select>',
				'<a href="#" class="wpo_delete_logger dashicons dashicons-no-alt"></a>',
				'<div class="wpo_additional_logger_options"></div>',
			'</div>'
		].join('');
	}

	/**
	 * Filter all selects with logger destinations, called after some destination deleted.
	 *
	 * @return {void}
	 */
	function filter_all_select_destinations() {
		$('.wpo_logger_type').each(function() {
			filter_select_destinations($(this));
		});
	}

	/**
	 * Filter certain select options depending on currently selected values.
	 *
	 * @param {object} select
	 *
	 * @return {void}
	 */
	function filter_select_destinations(select) {
		var i,
			destination,
			current_destinations = get_current_destinations();

		for (i in current_destinations) {
			destination = current_destinations[i];
			if (wpoptimize.loggers_classes_info[destination].allow_multiple) {
				$('option[value="'+destination+'"]', select).show();
			} else {
				$('option[value="'+destination+'"]', select).hide();
			}
		}
	}

	/**
	 * Returns currently selected loggers destinations.
	 *
	 * @return {Array}
	 */
	function get_current_destinations() {
		var destinations = [];

		$('.wpo_logging_row, .wpo_logger_type').each(function() {
			var destination = $(this).is('select') ? $(this).val() : $(this).data('id');

			if (destination) destinations.push(destination);
		});

		return destinations;
	}

	/**
	 * Send import settings command.
	 *
	 * @param {string} settings  encoded settings in json string.
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 *
	 * @return {void}
	 */
	function import_settings(settings, $site_row) {
		var loader = $('#wpo_import_spinner'),
			success_message = $('#wpo_import_success_message'),
			error_message = $('#wpo_import_error_message');

		var params = {
			name: 'import_settings',
			arguments: {
				'settings': settings
			}
		}

		loader.show();
		send_command(params, $site_row).then(function(response) {
			loader.hide();
			if (response && response.errors && response.errors.length) {
				error_message.text(response.errors.join('<br>'));
				error_message.slideDown();
			} else if (response && response.messages && response.messages.length) {
				success_message.text(response.messages.join('<br>'));
				success_message.slideDown();
				setTimeout(function() {
					self.load_contents($site_row, 'settings');
				}, 2000);
			}

			$('#wpo_import_settings_btn').prop('disabled', false);
		});
	}

	/**
	 * Force download json file with posted data.
	 *
	 * @param {Object} data 	 data to put in a file.
	 * @param {string} filename
	 *
	 * @return {void}
	 */
	function wpo_download_json_file(data ,filename) {
		// Attach this data to an anchor on page
		var link = document.body.appendChild(document.createElement('a')),
			date = new Date(),
			year = date.getFullYear(),
			month = date.getMonth() < 10 ? ['0', date.getMonth()].join('') : date.getMonth(),
			day = date.getDay() < 10 ? ['0', date.getDay()].join('') : date.getDay();

		filename = filename ? filename : ['wpo-settings-',year,'-',month,'-',day,'.json'].join('');

		link.setAttribute('download', filename);
		link.setAttribute('style', "display:none;");
		link.setAttribute('href', 'data:text/json' + ';charset=UTF-8,' + encodeURIComponent(JSON.stringify(data)));
		link.click();
	}

	/**
	 * Update optimizations info texts.
	 *
	 * @param {Object} response object returned by command get_optimizations_info.
	 *
	 * @return {void}
	 */
	function update_optimizations_info_view(response) {
		var i, dom_id, info;

		// @codingStandardsIgnoreLine
		if (!response) return;

		for (i in response) {
			if (!response.hasOwnProperty(i)) continue;

			dom_id = ['#wp-optimize-settings-', response[i].dom_id].join('');
			info = response[i].info ? response[i].info.join('<br>') : '';

			$(dom_id + ' .wp-optimize-settings-optimization-info').html(info);
		}
	}

	/**
	 * Returns list of selected sites list.
	 *
	 * @return {Array}
	 */
	function get_selected_sites_list() {
		var wpo_sites = [];

		$('#wpo_settings_sites_list input[type="checkbox"]').each(function () {
			var checkbox = $(this);
			if (checkbox.is(':checked')) {
				wpo_sites.push(checkbox.attr('value'));
			}
		});

		return wpo_sites;
	}

	/**
	 * Send command for get optimizations info and update view.
	 *
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 * @return {void}
	 */
	function update_optimizations_info($site_row) {
		var cache_key = [$site_row.data('site_id'), get_selected_sites_list().join('_')].join('_');

		// if information saved in chache show it.
		if (get_optimizations_info_cache.hasOwnProperty(cache_key)) {
			update_optimizations_info_view(get_optimizations_info_cache[cache_key]);
		} else {
			// else send command update cache and update view.
			var params = {
				name: 'get_optimizations_info',
				arguments: {
					'wpo-sites': get_selected_sites_list()
				}
			}
			
			send_command(params, $site_row).then(function(response) {
				if ('undefined' !== typeof response && false !== response) {
					get_optimizations_info_cache[cache_key] = response;
					update_optimizations_info_view(response);
				}
			});
		}
	}

	/**
	 * Update state of "all items" checkbox depends on state all items in the list.
	 *
	 * @param all_items_checkbox
	 * @param all_items
	 *
	 * @return void
	 */
	function update_wpo_all_items_checkbox_state(all_items_checkbox, all_items) {
		var all_items_count = 0, checked_items_count = 0;

		all_items.each(function () {
			if ($(this).is(':checked')) {
				checked_items_count++;
			}
			all_items_count++;
		});

		// update label text if need.
		if (all_items_checkbox.next().is('label') && all_items_checkbox.next().data('label')) {
			var label = all_items_checkbox.next(),
				label_mask = label.data('label');

			if (all_items_count == checked_items_count) {
				label.text(label_mask);
			} else {
				label.text(label_mask.replace('all', [checked_items_count, ' of ', all_items_count].join('')));
			}
		}

		if (all_items_count == checked_items_count) {
			all_items_checkbox.prop('checked', true);
		} else {
			all_items_checkbox.prop('checked', false);
		}
	}

	/**
	 * Runs after all queued commands done and sends optimizations_done command
	 *
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 * @return {string}
	 */
	function process_done($site_row) {
		var params = {
			name: 'optimizations_done',
			arguments: {}
		}

		send_command(params, $site_row);
	}

	/**
	 * Process the optimization queue
	 *
	 * @private
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 *
	 * @return {void}
	 */
	function process_queue($site_row) {
		
		if (!queue.get_lock()) {
			if (debug_level > 0) {
				console.log("WP-Optimize: process_queue(): queue is currently locked - exiting");
			}
			return;
		}
		
		if (debug_level > 0) {
			console.log("WP-Optimize: process_queue(): got queue lock");
		}
		
		var id = queue.peek();

		// check to see if an object has been returned
		if ('object' === typeof id) {
			data = id;
			id = id.optimization_id;
		} else {
			data = {};
		}
		
		if ('undefined' === typeof id) {
			$(document).trigger('updraftcentral_wpo_opimization_end', [$site_row]);
			if (debug_level > 0) console.log("WP-Optimize: process_queue(): queue is apparently empty - exiting");
			queue.unlock();
			return;
		}
		
		if (debug_level > 0) console.log("WP-Optimize: process_queue(): processing item: "+id);
			   
		queue.dequeue();

		var params = {
			optimization_id: id,
			data: data
		};

		send_optimization_request(params, $site_row).then(function(response) {

			$('#optimization_spinner_'+id).hide();
			$('#optimization_checkbox_'+id).show();
			$('.optimization_button_'+id).prop('disabled', false);

			if (response) {
				var total_output = '';
				for (var i = 0, len = response.errors.length; i < len; i++) {
					total_output += '<span class="error">'+response.errors[i]+'</span><br>';
				}
				for (var i = 0, len = response.messages.length; i < len; i++) {
					total_output += response.errors[i]+'<br>';
				}
				for (var i = 0, len = response.result.output.length; i < len; i++) {
					total_output += response.result.output[i]+'<br>';
				}
				$('#optimization_info_'+id).html(total_output);
				if (response.hasOwnProperty('status_box_contents')) {
					$('#wp_optimize_status_box').css('opacity', '1').find('.inside').html(response.status_box_contents);
					$('a#wp_optimize_status_box_refresh').attr('href', '#');

					UpdraftCentral.register_event_handler('click', 'a#wp_optimize_status_box_refresh', function() {
						self.load_contents($site_row, 'wp_optimize');
					});
				}
				if (response.hasOwnProperty('table_list')) {
					$('#wpoptimize_table_list tbody').replaceWith(response.table_list);
				}
				if (response.hasOwnProperty('total_size')) {
					$('#optimize_current_db_size').html(response.total_size);
				}

				// Status check if optimizing tables
				if ('optimizetables' === id && data.optimization_table) {

					var item = queue.peek();
					if (queue.is_empty() || 'undefined' === typeof item.optimization_table) {
						$('#optimization_spinner_'+id).hide();
						$('#optimization_checkbox_'+id).show();
						$('.optimization_button_'+id).prop('disabled', false);
						$('#optimization_info_'+id).html(udclion.wpo.optimization_complete);
					} else {
						$('#optimization_checkbox_'+id).hide();
						$('#optimization_spinner_'+id).show();
						$('.optimization_button_'+id).prop('disabled', true);
					}
				}

				// check if we need update unapproved comments count.
				if (response.result.meta && response.result.meta.hasOwnProperty('awaiting_mod')) {
					var awaiting_mod = response.result.meta.awaiting_mod;
					if (awaiting_mod > 0) {
						$('#adminmenu .awaiting-mod .pending-count').remove(awaiting_mod);
					} else {
						// if there is no unapproved comments then remove bullet.
						$('#adminmenu .awaiting-mod').remove();
					}
				}
			}

			setTimeout(function() {
				queue.unlock();
				process_queue($site_row);
			}, 10);

		})

	}
	

	/**
	 * Gets the container where to display the loading animation
	 *
	 * @private
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 *
	 * @return {Object} A jQuery object representing the site container
	 */
	function get_wpo_location($site_row) {
		var $location = $site_row.find('.updraftcentral_row_extracontents'),
			$wpo_location = $location.find('.updraftcentral_wpo_rows');

		if ($wpo_location.length === 0) {
			$wpo_location = $('<div class="updraftcentral_wpo_rows"></div>').appendTo($location);
		}

		return $wpo_location;
	}


	/**
	 * Processes the error return from a server request
	 *
	 * @private
	 * @param {Object} response An object representing the response from the server
	 *
	 * @return {void}
	 */
	function process_error(response) {
		if ('undefined' !== typeof response.data) {
			var error = response.data;
			if (null !== error && 'undefined' !== typeof error.message) {
				var message = udclion.wpo[error.message];

				if ('undefined' === typeof message) {
					message = udclion[error.message];

					if ('undefined' === typeof message) {
						message = udclion.unknown_response;
					}
				}

				if ('undefined' !== typeof error.values) {
					UpdraftCentral_Library.dialog.alert('<h2>'+udclion.error+'</h2><p>'+vsprintf(message, error.values)+'</p>');
				} else {
					UpdraftCentral_Library.dialog.alert('<h2>'+udclion.error+'</h2><p>'+message+'</p>');
				}
			}
		}
	}

	/**
	 * Gathers the settings from the settings tab and return in selected format.
	 *
	 * @param {string} output_format optional param 'object' or 'string'.
	 *
	 * @return (string) - serialized settings.
	 */
	function gather_settings(output_format) {
		var form_data = '',
			output_format = ('undefined' === typeof output_format) ? 'string' : output_format;

		if ('object' == output_format) {
			form_data = $(".updraftcentral_wpo_rows form input[name!='action'], .updraftcentral_wpo_rows form textarea, .updraftcentral_wpo_rows form select").serializeJSON({useIntKeysAsArrayIndex: true});
		} else {
			// Excluding the unnecessary 'action' input avoids triggering a very mis-conceived mod_security rule seen on one user's site.
			form_data = $(".updraftcentral_wpo_rows form input[name!='action'], .updraftcentral_wpo_rows form textarea, .updraftcentral_wpo_rows form select").serialize();

			// Include unchecked checkboxes. user filter to only include unchecked boxes.
			$.each($('.updraftcentral_wpo_rows form input[type=checkbox]')
					.filter(function (idx) {
						return $(this).prop('checked') == false
					}),
				function (idx, el) {
					// Attach matched element names to the form_data with chosen value.
					var empty_val = '0';
					form_data += '&' + $(el).attr('name') + '=' + empty_val;
				}
			);
		}

		return form_data;
	}

	/**
	 * Either display normally, or grey-out, the scheduling options, depending on whether any schedule has been selected
	 *
	 * @private
	 * @return {void}
	 */
	function enable_or_disable_schedule_options() {
		var schedule_enabled = $('#enable-schedule').is(':checked');
		if (schedule_enabled) {
			$('#wp-optimize-auto-options').css('opacity', '1');
		} else {
			$('#wp-optimize-auto-options').css('opacity', '0.5');
		}
	}

	/**
	 * Toggles the visibility (visible or hidden) of the entries selector
	 *
	 * @private
	 * @return {void}
	 */
	function enable_or_disable_store_log_entries() {
		var store_log = $('#wp-optimize-logger-updraft_ring_logger').is(':checked');
		if (store_log) {
			$('#additional_options_updraft_ring_logger').show();
		} else {
			$('#additional_options_updraft_ring_logger').hide();
		}
	}

	/**
	 * Toggles the visibility (visible or hidden) of the slack webhook url input box
	 *
	 * @private
	 * @return {void}
	 */
	function enable_or_disable_slack_log_entries() {
		var slack_log = $('#wp-optimize-logger-updraft_slack_logger').is(':checked');
		if (slack_log) {
			$('#additional_options_updraft_slack_logger').show();
		} else {
			$('#additional_options_updraft_slack_logger').hide();
		}
	}

	/**
	 * Sends update request to the remote server to enable or disable a feature
	 *
	 * @private
	 * @param {string} type The type of feature where the process is going to be applied (e.g. "trackbacks" or "comments").
	 * @param {boolean} enable Indicates whether the feature is to be disabled or not (e.g. true or false).
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 *
	 * @return {Object} A jQuery promise
	 */
	function enable_or_disable_feature(type, enable, $site_row) {
		var deferred = $.Deferred();
		var params = {
			name: 'enable_or_disable_feature',
			arguments: {
				type: type,
				enable: enable ? 1 : 0
			}
		}

		send_command(params, $site_row).then(function(response) {
			deferred.resolve(response);
		}).fail(function(response) {
			deferred.reject(response);
		});
		
		return deferred.promise();
	}

	/**
	 * Sends the optimization request to the remote server with the data provided
	 *
	 * @private
	 * @param {Object} data An object container the optimization items to process.
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 *
	 * @return {Object} A jQuery promise
	 */
	function send_optimization_request(data, $site_row) {
		var deferred = $.Deferred();
		var params = {
			name: 'do_optimization',
			arguments: data
		}

		send_command(params, $site_row).then(function(response) {
			deferred.resolve(response);
		}).fail(function(response) {
			deferred.reject(response);
		});
		
		return deferred.promise();
	}
	
	/**
	 * Sends a save request to the remote server for saving the auto backup setting
	 *
	 * @private
	 * @param {boolean} auto_backup Indicates whether the backup setting is set or not (e.g. true or false).
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 *
	 * @return {Object} A jQuery promise
	 */
	function save_auto_backup_option(auto_backup, $site_row) {
		var deferred = $.Deferred();
		var params = {
			name: 'save_auto_backup_option',
			arguments: {
				auto_backup: auto_backup
			}
		}

		send_command(params, $site_row).then(function(response) {
			deferred.resolve(response);
		}).fail(function(response) {
			deferred.reject(response);
		});
		
		return deferred.promise();
	}


	/**
	 * Sends a save request to the remote server for saving the optimization items/settings
	 *
	 * @private
	 * @param {Object} options An object containing the optimization items to save.
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 *
	 * @return {Object} A jQuery promise
	 */
	function save_manual_run_optimization_options(options, $site_row) {
		var deferred = $.Deferred();
		var params = {
			name: 'save_manual_run_optimization_options',
			arguments: options
		}

		send_command(params, $site_row).then(function(response) {
			deferred.resolve(response);
		}).fail(function(response) {
			deferred.reject(response);
		});
		
		return deferred.promise();
	}

	/**
	 * Sends a save request to the remote server for saving the WP-Optimize settings
	 *
	 * @private
	 * @param {Object} form_data An object containing the WP-Optimize settings to save.
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 *
	 * @return {Object} A jQuery promise
	 */
	function save_settings(form_data, $site_row) {
		var deferred = $.Deferred();
		var params = {
			name: 'save_settings',
			arguments: form_data
		}
		
		send_command(params, $site_row).then(function(response) {
			deferred.resolve(response);
		}).fail(function(response) {
			deferred.reject(response);
		});

		return deferred.promise();
	}

	/**
	 * Save selected sites list options
	 *
	 * @private
	 * @param {Object} data An object containing the list of websites to save.
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 *
	 * @return {Object} A jQuery promise
	 */
	this.save_sites_list = function(data, $site_row) {
		var deferred = $.Deferred();
		var params = {
			name: 'save_site_settings',
			arguments: data
		}
		
		send_command(params, $site_row).then(function(response) {
			deferred.resolve(response);
		}).fail(function(response) {
			deferred.reject(response);
		});

		return deferred.promise();
	}

	/**
	 * Sends WP-Optimize command to remote server
	 *
	 * @param {Object} params An object containing details of the command to execute.
	 * @param {string} params.name The WP-Optimize command to execute.
	 * @param {string|Object} params.arguments The arguments needed to execute the command successfully.
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 *
	 * @return {Object} A jQuery promise
	 */
	function send_command(params, $site_row) {
		var deferred = $.Deferred();

		UpdraftCentral.send_site_rpc('wpoptimize.'+params.name, params.arguments, $site_row, function(response, code, error_code) {
			if (code === 'ok' && 'undefined' !== typeof response.data && null !== response.data && !response.data.error) {
				deferred.resolve(response.data);
			} else {
				deferred.reject(response);
			}
		});
		
		return deferred.promise();
	}

	/**
	 * Checks whether WP-Optimize plugin is installed and activated in the remote website
	 *
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 * @param {String} plugin_name The name of plugin to check (e.g. 'WP-Optimize' or 'WP-Optimize Premium')
	 * @param {String} plugin_slug The slug of plugin to check (e.g. 'wp-optimize' or 'wp-optimize-premium')
	 * @return {Object} A jQuery promise
	 */
	function is_wpo_active($site_row, plugin_name, plugin_slug) {
		return UpdraftCentral.is_plugin_active($site_row, plugin_name, plugin_slug);
	}

	/**
	 * Activates the WP-Optimize plugin in the remote website
	 *
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 * @param {String} plugin_name The name of plugin to activate (e.g. 'WP-Optimize' or 'WP-Optimize Premium')
	 * @param {String} plugin_slug The slug of plugin to activate (e.g. 'wp-optimize' or 'wp-optimize-premium')
	 * @return {Object} A jQuery promise
	 */
	function activate_wpo($site_row, plugin_name, plugin_slug) {
		return UpdraftCentral.activate_plugin($site_row, plugin_name, plugin_slug);
	}

	/**
	 * Download, install and activates the WP-Optimitze plugin in the remote website
	 *
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 * @param {String} plugin_name The name of plugin to install and activate (e.g. 'WP-Optimize' or 'WP-Optimize Premium')
	 * @param {String} plugin_slug The plugin slug
	 * @return {Object} A jQuery promise
	 */
	function install_activate_wpo($site_row, plugin_name, plugin_slug) {
		return UpdraftCentral.install_activate_plugin($site_row, plugin_name, plugin_slug);
	}

	/**
	 * Extracts the optimization options
	 *
	 * @private
	 * @return {Object} An object containing the optimizations items
	 */
	function get_optimization_options() {
		var optimization_options = {};

		$optimizations = $('#optimizations_list .optimization_checkbox:checked');
		$optimizations.sort(function(a, b) {
			// convert to IDs
			a = $(a).closest('.wp-optimize-settings').data('optimization_run_sort_order');
			b = $(b).closest('.wp-optimize-settings').data('optimization_run_sort_order');
			if (a > b) {
				return 1;
			} else if (a < b) {
				return -1;
			} else {
				return 0;
			}
		});

		var active;
		$optimizations.each(function(index) {
			var optimization_id = $(this).closest('.wp-optimize-settings').data('optimization_id');
			if (!optimization_id) {
				console.log("Optimization ID corresponding to pressed button not found");
				return;
			}

			optimization_options[optimization_id] = { active: 1 };
		});

		return optimization_options;
	}

	/**
	 * Extracts tables for optimization
	 *
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 * @return {Object} A jQuery promise
	 */
	this.get_optimization_tables = function($site_row) {
		var deferred = $.Deferred();
		var params = {
			name: 'get_table_list',
			arguments: {}
		}
		
		send_command(params, $site_row).then(function(response) {
			deferred.resolve(response);
		}).fail(function(response) {
			deferred.reject(response);
		});

		return deferred.promise();
	}

	/**
	 * Runs a specified optimization, displaying the progress and results in the optimization's row
	 *
	 * @private
	 * @param {string} id The optimization ID
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 *
	 * @return {void}
	 */
	function do_optimization(id, $site_row) {

		// don't run optimization if optimization active.
		if (true === $('.optimization_button_' + id).prop('disabled')) return;

		$('#optimization_checkbox_'+id).hide();
		$('#optimization_spinner_'+id).show();
		$('.optimization_button_'+id).prop('disabled', true);

		$('#optimization_info_'+id).html('...');

		// check if it is DB optimize
		if ('optimizetables' == id) {

			// check if there are any tables to be optimized
			$(optimization_tables).each(function(index) {

				// get information from each td
				var $table_information = $(this).find('td');

				// get table type information
				table_type = $table_information.eq(5).text();
				table = $table_information.eq(1).text();
				optimizable = $table_information.eq(5).data('optimizable');

				// make sure the table isnt blank
				if ('' != table) {
					// check if table is InnboDB as we do not want to optimize it
					if ('1' == optimizable) {
						var data = {
							optimization_id: id,
							optimization_table: $table_information.eq(1).text(),
							optimization_table_type: table_type
						};
						queue.enqueue(data);
					}
				}
			});

		} else {
			// for all other options
			queue.enqueue(id);
		}

		process_queue($site_row);
	}

}
