jQuery(function($) {
	new UpdraftCentral_EUM_Management();
});

/**
 * An object for managing the Easy Updates Manager plugin
 *
 * @constructor
 *
 * @throws {Exception} - throws exception if json parsing failed.
 *
 * @return {void}
 */
function UpdraftCentral_EUM_Management() {
	var self = this;
	var $ = jQuery;
	var sites = new UpdraftCentral_Collection();
	var debug_level = UpdraftCentral.get_debug_level();
	var plugin_name = 'Easy Updates Manager';
	var plugin_slug = 'stops-core-theme-and-plugin-updates';
	var plugin_premium_name = 'Easy Updates Manager Premium';
	var activate_name;
	var $uc_dashboard_existing_sites = $('#updraftcentral_dashboard_existingsites');
	var general_email_addresses = {};

	$('#updraft-central-content').on('scroll', function() {
		$('#eum-save-settings-warning').css('top', $(this).scrollTop() + 100);
	});

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
		if (!installed) {
			install_and_activate = true;

			// Make sure that we're downloading the free version in case Easy Updates Manager plugin (free or premium)
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

		return UpdraftCentral.template_replace('eum-eum-not_active', options);
	}

	/**
	 * Compares two version compare options and returns the results.
	 *
	 * @param {string} v1 - Version one to compare.
	 * @param {string} v2 - Version two to compare.
	 * @param {object} options - (Optional) Options to configure for version compare.
	 * @return {int}
	 */
	function version_compare(v1, v2, options) {
		var lexicographical = (options && options.lexicographical) || false,
			zero_extend = (options && options.zero_extend) || true,
			v1parts = (v1 || "0").split('.'),
			v2parts = (v2 || "0").split('.');

		/**
		 * Performs a RegEx to determime if version control numbers are valid.
		 *
		 * @param {string} x- Version number to check..
		 * @return {boolean} Whether to version number is valid.
		 */
		function is_valid_part(x) {
		  return (lexicographical ? /^\d+[A-Za-zαß]*$/ : /^\d+[A-Za-zαß]?$/).test(x);
		}
	  
		if (!v1parts.every(is_valid_part) || !v2parts.every(is_valid_part)) {
		  return NaN;
		}
	  
		if (zero_extend) {
		  while (v1parts.length < v2parts.length) v1parts.push("0");
		  while (v2parts.length < v1parts.length) v2parts.push("0");
		}
	  
		if (!lexicographical) {
		  v1parts = v1parts.map( function(x) {
		   var match = (/[A-Za-zαß]/).exec(x);
		   return Number(match ? x.replace(match[0], "." + x.charCodeAt(match.index)):x);
		  });
		  v2parts = v2parts.map( function(x) {
		   var match = (/[A-Za-zαß]/).exec(x);
		   return Number(match ? x.replace(match[0], "." + x.charCodeAt(match.index)):x);
		  });
		}
	  
		for (var i = 0; i < v1parts.length; ++i) {
		  if (v2parts.length == i) {
			return 1;
		  }
	  
		  if (v1parts[i] == v2parts[i]) {
			continue;
		  }
		  else if (v1parts[i] > v2parts[i]) {
			return 1;
		  }
		  else {
			return -1;
		  }
		}
	  
		if (v1parts.length != v2parts.length) {
		  return -1;
		}
	  
		return 0;
	  }

	/**
	 * Checks whether Easy Updates Manager plugin is installed/activated before pulling
	 * the content of the requested section.
	 *
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 * @param {String} section A string representing the Easy Updates Manager tab section where our content is to be retrieved
	 * @return {void}
	 */
	function load_section($site_row, section) {
		var html = '',
			$eum_location = get_eum_location($site_row);

		UpdraftCentral.set_loading($eum_location);
		// We will check any existing premium version of this plugin first, as it will only
		// make sense to activate a premium version rather than the free one if both plugin exists.
		is_eum_active($site_row, plugin_premium_name).then(function(response) {
			if (response.installed && response.active) {
				self.load_contents($site_row, section);
			} else {
				// Update the current_section variable with the actual section
				// currently being processed or loaded.
				self.current_section = section;
				
				// Premium version is not installed so, let's give it one more try, perhaps a
				// free version is installed rather than a premium one.
				if (!response.installed) {
					is_eum_active($site_row, plugin_name).then(function(response) {
						if (response.installed && response.active) {
							self.load_contents($site_row, section);
							return;
						} else {
							html = get_message_template(response.installed, response.active, plugin_name);
							UpdraftCentral.done_loading($eum_location, html);
						}
					}).fail(function(response) {
						process_error(response);
						UpdraftCentral.done_loading($eum_location, html);
					});

				} else if (!response.active && response.installed) {
					html = get_message_template(response.installed, response.active, plugin_premium_name);
					UpdraftCentral.done_loading($eum_location, html);
				}
			}
			
		}).fail(function(response) {
			process_error(response);
			UpdraftCentral.done_loading($eum_location, html);
		});
	}

	/**
	 * Setting click listener/handler for the EUM top level buttons (General, Plugins, Themes, Logs and Advanced)
	 *
	 * @see {@link http://api.jquery.com/on}
	 */
	$uc_dashboard_existing_sites.on('updraftcentral_dashboard_mode_set_eum', function() {

		UpdraftCentral.register_row_clicker('.eum-dashboard-app .toggle-wrapper button', function($site_row, $site_id, e) {
			$('#eum-save-settings-warning').fadeIn('slow');

		}, true);

		/**
		 * Register a row clicker for a click event whenever the "General" button is clicked.
		 *
		 * @see {UpdraftCentral.register_row_clicker}
		 */
		UpdraftCentral.register_row_clicker('.updraftcentral_site_general', function($site_row) {

			load_section($site_row, 'general');

		}, true);

		UpdraftCentral.register_row_clicker('.eum-dashboard-app .eum-toggle-button', function($site_row, $site_id, e) {
			var $parent = $(e.currentTarget).parent();
			$parent.children('.eum-toggle-button').removeClass('eum-active');
			var label = $(e.currentTarget).attr('id').replace(/-/g, '_');
			label += '_status';
			$parent.prev().text(udclion.eum[label]);
			$(e.currentTarget).addClass('eum-active');
		}, true);

		/**
		 * Register a row clicker for a click event whenever the "Plugins" button is clicked.
		 *
		 * @see {UpdraftCentral.register_row_clicker}
		 */
		UpdraftCentral.register_row_clicker('.updraftcentral_site_plugins', function($site_row) {
			
			load_section($site_row, 'plugins');
			
			
		}, true);

		/**
		 * Register a row clicker for a click event whenever the "Themes" button is clicked.
		 *
		 * @see {UpdraftCentral.register_row_clicker}
		 */
		UpdraftCentral.register_row_clicker('.updraftcentral_site_themes', function($site_row) {

			load_section($site_row, 'themes');

		}, true);

		/**
		 * Register a row clicker for a click event whenever the "Logs" button is clicked.
		 *
		 * @see {UpdraftCentral.register_row_clicker}
		 */
		UpdraftCentral.register_row_clicker('.updraftcentral_site_logs', function($site_row) {

			load_section($site_row, 'logs');

		}, true);

		/**
		 * Register a row clicker for a click event whenever the "Advanced" button is clicked.
		 *
		 * @see {UpdraftCentral.register_row_clicker}
		 */
		UpdraftCentral.register_row_clicker('.updraftcentral_site_advanced', function($site_row) {
			
			load_section($site_row, 'advanced');

		}, true);

		UpdraftCentral.register_row_clicker('.tablenav-pages a', function($site_row, $site_id, e) {
			var data = get_data('pagination', e.currentTarget);
			self.load_contents($site_row, data.tab, {data: data});

		}, true);

		UpdraftCentral.register_row_clicker('input[name=paged]', function($site_row, $site_id, e) {
			if (13 === e.which) {
				e.preventDefault();
				return;
			}

			// Using timer to prevent every keyup sending ajax requests
			window.setTimeout(function() {
				var data = get_data('pagination_input');
				self.load_contents($site_row, data.tab, {data: data});
			}, 500);
		}, true, 'keyup');

		UpdraftCentral.register_row_clicker('.subsubsub a', function($site_row, $site_id, e) {
			$('.subsubsub a').removeClass('current');
			$(e.currentTarget).addClass('current');
			var data = get_data('filters', e.currentTarget);
			self.load_contents($site_row, data.tab, {data: data});
		}, true);

		var toggle_wrapper_classes = [
			'.toggle-wrapper-plugins .eum-toggle-button',
			'.toggle-wrapper-plugins-automatic .eum-toggle-button',
			'.toggle-wrapper-themes .eum-toggle-button',
			'.toggle-wrapper-themes-automatic .eum-toggle-button'
		];
		UpdraftCentral.register_row_clicker(toggle_wrapper_classes.join(', '), function($site_row, $site_id, e) {
			var data = get_data();
			// Add class to toggle-wrapper
			// Check for class and if update, automatic update options should be hidden and set to false
			var $this = $(e.currentTarget);
			var $checkbox = $this.closest('.toggle-wrapper').find('input');

			var $parent = $this.closest('.toggle-wrapper');
			var $automatic = $parent.closest('.eum-' + data.tab + '-name-actions').find('.eum-' + data.tab + '-automatic-wrapper');

			$this.addClass('eum-active');

			if ($this.hasClass('eum-enabled')) {
				$this.next().removeClass('eum-active');
				$checkbox.prop('value', 'true');
				if ($parent.hasClass('toggle-wrapper-' + data.tab)) {
					$automatic.find('input').prop('value', false);
					$automatic.find('.eum-disabled').addClass('eum-active');
					$automatic.find('.eum-enabled').removeClass('eum-active');
					$automatic.slideDown();
				}
			} else {
				if ($parent.hasClass('toggle-wrapper-' + data.tab)) {
					$automatic.slideUp();
				}
				$this.prev().removeClass('eum-active');
				$checkbox.prop('value', 'false');
				$automatic.find('input').prop('value', false);
			}

			$('#eum-save-settings-warning').fadeIn();

		}, true);

		UpdraftCentral.register_row_clicker('#eum-save-settings', function($site_row, $site_id, e) {
			var data = get_data('save_settings');
			self.load_contents($site_row, 'save_' + data.tab +'_update_options', {data: data});
		}, true);

		UpdraftCentral.register_row_clicker('#eum-save-general-settings', function($site_row, $site_id, e) {
			var data = {};
			data.data = gather_general_options();
			self.load_contents($site_row, 'save_general_options', {data: data});
		}, true);

		UpdraftCentral.register_row_clicker('#save-logs-settings', function($site_row) {
			var form_data = gather_settings('string');
			var params = {
				name: 'save_logs_settings',
				arguments: form_data
			};

			send_command(params, $site_row).then(function(response) {
				if ('undefined' !== typeof response && false !== response) {
					UpdraftCentral_Library.dialog.alert('<h2>'+udclion.result+'</h2><p>'+response+'</p>');
				}
			}).fail(function(response) {
				process_error(response);
			});
		}, true);

		UpdraftCentral.register_row_clicker('#eum-save-emails', function($site_row) {
			var form_data = $('#notification-emails').val().trim();
			var params = {
				name: 'save_notification_emails',
				arguments: form_data
			};

			send_command(params, $site_row).then(function(response) {
				if ('undefined' !== typeof response && false !== response) {
					UpdraftCentral_Library.dialog.alert('<h2>'+udclion.result+'</h2><p>'+response+'</p>');
				}
			}).fail(function(response) {
				process_error(response);
			});
		}, true);

		UpdraftCentral.register_row_clicker('#cb-select-all-1, #cb-select-all-2', function($site_row, $site_id, e) {
			if ($(e.currentTarget).is(':checked')) {
				if ('cb-select-all-1' === e.currentTarget.id) {
					$('#cb-select-all-2').prop('checked', true);
				} else {
					$('#cb-select-all-1').prop('checked', true);
				}
				$site_row.find('input[name*=checked]').prop('checked', true);
			} else {
				$('#cb-select-all-1, #cb-select-all-2').prop('checked', false);
				$site_row.find('input[name*=checked]').prop('checked', false);
			}
		}, true, 'change');

		UpdraftCentral.register_row_clicker('#doaction, #doaction2', function($site_row, $site_id, e) {
			if (0 === $site_row.find('input:checked').length) return;
			var data = get_data('bulk');
			self.load_contents($site_row, 'bulk_action_' + data.tab +'_update_options', {data: data});
			$('#bulk-action-selector-top, #bulk-action-selector-bottom').val("-1");
		}, true);

		UpdraftCentral.register_row_clicker('#post-query-submit', function($site_row, $site_id, e) {
			var data = get_data();
			self.load_contents($site_row, data.tab, {data: data});
		}, true);

		UpdraftCentral.register_row_clicker('#filter-by-date, #filter-by-success, #filter-by-action, #filter-by-type, #filter-by-order', function($site_row, $site_id, e) {
			var data = get_data();
			self.load_contents($site_row, data.tab, {data: data});

		}, true, 'change');

		UpdraftCentral.register_event_handler('click', '#log-query-search', function(site_row) {
			var data = get_data();
			data.is_search = true;
			data.search_term = jQuery('#eum-log-search').val();
			data.view = 'search';
			self.load_contents($site_row, data.tab, {data: data});
			return false;
		});

		UpdraftCentral.register_row_clicker('#form-disable-logs', function($site_row, $site_id, e) {
			var data = get_data();
			data.disable_logs = true;
			self.load_contents($site_row, data.tab, {data: data});

		}, true);

		UpdraftCentral.register_row_clicker('#form-enable-logs', function($site_row, $site_id, e) {
			var data = {};
			data.tab = 'logs';
			data.enable_logs = true;
			self.load_contents($site_row, data.tab, {data: data});

		}, true);

		UpdraftCentral.register_row_clicker('.eum_logger_type input', function($site_row, $site_id, e) {
			set_logger_additional_options_visibility($site_row);
		}, true, 'change');

		/**
		 * Register a click event handler for activating the EUM plugin
		 *
		 * @see {UpdraftCentral.register_row_clicker}
		 */
		UpdraftCentral.register_row_clicker('#btn-eum-activate', function($site_row) {
			var $eum_location = get_eum_location($site_row);

			UpdraftCentral.set_loading($eum_location);
			activate_eum($site_row, activate_name).then(function(response) {
				if (response.activated) {
					self.load_contents($site_row, self.current_section);
				}
			}).fail(function(response) {
				process_error(response);
				UpdraftCentral.done_loading($eum_location);
			});
			
		}, true);

		/**
		 * Register a click event handler for installing and activating the EUM plugin
		 *
		 * @see {UpdraftCentral.register_row_clicker}
		 */
		UpdraftCentral.register_row_clicker('#btn-eum-install-activate', function($site_row) {
			var $eum_location = get_eum_location($site_row);

			UpdraftCentral.set_loading($eum_location);
			install_activate_eum($site_row, plugin_name, plugin_slug).then(function(response) {
				if (response.installed || response.activated) {
					self.load_contents($site_row, self.current_section);
				}
			}).fail(function(response) {
				process_error(response);
				UpdraftCentral.done_loading($eum_location);
			});
			
		}, true);

		UpdraftCentral.register_row_clicker('#force-updates', function($site_row) {
			var params = {
				name: 'force_updates',
				arguments: {}
			}

			send_command(params, $site_row).then(function(response) {
				if ('undefined' !== typeof response && false !== response) {
					UpdraftCentral_Library.dialog.alert('<h2>'+udclion.result+'</h2><p>'+response.message+'</p>');
				}
			}).fail(function(response) {
				process_error(response);
			});

		}, true);

		UpdraftCentral.register_row_clicker('#save-excluded-users', function($site_row) {
			var form_data = gather_settings('string');
			var params = {
				name: 'save_excluded_users',
				arguments: form_data
			}

			send_command(params, $site_row).then(function(response) {
				if ('undefined' !== typeof response && false !== response) {
					UpdraftCentral_Library.dialog.alert('<h2>'+udclion.result+'</h2><p>'+response+'</p>');
				}
			}).fail(function(response) {
				process_error(response);
			});
		}, true);

		UpdraftCentral.register_row_clicker('#eum_ud_enable_auto_backup', function($site_row) {
			var params = {
				name: 'enable_auto_backup',
				arguments: {}
			}

			send_command(params, $site_row).then(function(response) {
				if ('undefined' !== typeof response && false !== response) {
					UpdraftCentral_Library.dialog.alert('<h2>'+udclion.result+'</h2><p>'+response+'</p>');
					var $auto_backup_button = $site_row.find('#eum_ud_enable_auto_backup');
					$site_row.find('#eum-auto-backup-description').text(udclion.eum.enabled_auto_backup_description);
					$auto_backup_button.prop('id', 'eum_ud_disable_auto_backup');
					$auto_backup_button.val(udclion.eum.disable_auto_backup);
				}
			}).fail(function(response) {
				process_error(response);
			});
		}, true);

		UpdraftCentral.register_row_clicker('#eum_ud_disable_auto_backup', function($site_row) {
			var params = {
				name: 'disable_auto_backup',
				arguments: {}
			}

			send_command(params, $site_row).then(function(response) {
				if ('undefined' !== typeof response && false !== response) {
					UpdraftCentral_Library.dialog.alert('<h2>'+udclion.result+'</h2><p>'+response+'</p>');
					var $auto_backup_button = $site_row.find('#eum_ud_disable_auto_backup');
					$site_row.find('#eum-auto-backup-description').text(udclion.eum.disabled_auto_backup_description);
					$auto_backup_button.prop('id', 'eum_ud_enable_auto_backup');
					$auto_backup_button.val(udclion.eum.enable_auto_backup);
				}
			}).fail(function(response) {
				process_error(response);
			});
		}, true);

		UpdraftCentral.register_row_clicker('.eum_cron_schedule', function($site_row) {
			set_cron_related_fields_visibility($site_row);
		}, true, 'change');

		UpdraftCentral.register_row_clicker('#save-cron-schedule', function($site_row) {
			var form_data = gather_settings('string');
			var params = {
				name: 'save_cron_schedule',
				arguments: form_data
			}

			send_command(params, $site_row).then(function(response) {
				if ('undefined' !== typeof response && false !== response) {
					UpdraftCentral_Library.dialog.alert('<h2>'+udclion.succeeded+'</h2><p>'+udclion.eum.update_cron_scheduled+'</p>');
					$site_row.find('#eum-next-cron-schedule').html(response.time);
				}
			}).fail(function(response) {
				process_error(response);
			});
		}, true);

		UpdraftCentral.register_row_clicker('#save-delay-updates', function($site_row) {
			var form_data = gather_settings('string');
			var params = {
				name: 'save_delay_updates',
				arguments: form_data
			}

			var delay_updates = parseInt($('#delay-updates').val());
			if (Number.isInteger(delay_updates) && delay_updates >= 0) {
				send_command(params, $site_row).then(function (response) {
					if ('undefined' !== typeof response && false !== response) {
						UpdraftCentral_Library.dialog.alert('<h2>'+udclion.result+'</h2><p>'+response+'</p>');
					}
				}).fail(function (response) {
					process_error(response);
				});
			}
		}, true);

		UpdraftCentral.register_row_clicker('#save-anonymize-update-option', function($site_row) {
			var form_data = gather_settings('string');
			var params = {
				name: 'save_anonymize_updates',
				arguments: form_data
			}

			send_command(params, $site_row).then(function (response) {
				if ('undefined' !== typeof response && false !== response) {
					UpdraftCentral_Library.dialog.alert('<h2>'+udclion.result+'</h2><p>'+response+'</p>');
				}
			}).fail(function (response) {
				process_error(response);
			});

		}, true);

		UpdraftCentral.register_row_clicker('#eum-settings-export', function($site_row) {
			var params = {
				name: 'export_settings',
				arguments: {}
			}

			send_command(params, $site_row).then(function (response) {
				if ('undefined' !== typeof response && false !== response) {
					var blogname = $site_row[0].dataset.site_description.toLowerCase().replace(/ /g, '-');
					var dateObj = new Date();
					var month = dateObj.getUTCMonth() + 1;
					var day = dateObj.getUTCDate();
					var year = dateObj.getUTCFullYear();
					var today = year + "-" + month + "-" + day;
					var json_filename = blogname + "-" + today + ".json";
					var link = document.body.appendChild(document.createElement('a'));
					link.setAttribute('download', json_filename);
					link.setAttribute('style', "display:none;");
					link.setAttribute('href', 'data:text/json' + ';charset=UTF-8,' + encodeURIComponent(response));
					link.click();
				}
			}).fail(function (response) {
				process_error(response);
			});

		}, true);

		UpdraftCentral.register_row_clicker('#eum-settings-import', function($site_row) {
			var eum_import_file_input = $site_row.find('#import_settings')[0];
			if (0 === eum_import_file_input.files.length) {
				alert(udclion.eum.import_select_file);
				return;
			}
			var eum_import_file_file = eum_import_file_input.files[0];
			var eum_import_file_reader = new FileReader();
			eum_import_file_reader.onload = function() {
				var result = parse_json(this.result);
				if (result.meta.site_url + '/' !== $site_row[0].dataset.site_url) {
					var confirmImport = confirm(udclion.eum.import_confirmation);
					if (!confirmImport) {
						return;
					}
				}
				var params = {
					name: 'import_settings',
					arguments: {data: result.data}
				}
				send_command(params, $site_row).then(function (response) {
					UpdraftCentral_Library.dialog.alert('<h2>'+udclion.succeeded+'</h2><p>'+response+'</p>');
				}).fail(function (response) {
					process_error(response);
				});
			};
			eum_import_file_reader.readAsText(eum_import_file_file);
		}, true);


		UpdraftCentral.register_row_clicker('#enable-logs', function($site_row) {
			var params = {
				name: 'enable_logs',
				arguments: {}
			}

			send_command(params, $site_row).then(function(response) {
				if ('undefined' !== typeof response && false !== response) {
					UpdraftCentral_Library.dialog.alert('<h2>'+udclion.succeeded+'</h2><p>'+response+'</p>');
				}
			}).fail(function(response) {
				process_error(response);
			});
		}, true);

		UpdraftCentral.register_row_clicker('#clear-logs', function($site_row) {
			var params = {
				name: 'clear_logs',
				arguments: {}
			}

			send_command(params, $site_row).then(function(response) {
				if ('undefined' !== typeof response && false !== response) {
					UpdraftCentral_Library.dialog.alert('<h2>'+udclion.succeeded+'</h2><p>'+response+'</p>');
				}
			}).fail(function(response) {
				process_error(response);
			});
		}, true);

		UpdraftCentral.register_row_clicker('#enable-webhook,#refresh-webhook', function($site_row) {
			var params = {
				name: 'enable_webhook',
				arguments: {}
			}

			send_command(params, $site_row).then(function(response) {
				if ('undefined' !== typeof response && false !== response) {
					UpdraftCentral_Library.dialog.alert('<h2>'+udclion.succeeded+'</h2><p>'+response.message+'</p>');
					$site_row.find('#eum-webhook-url').val(response.hook_url);
					$site_row.find('#eum-webhook-url-wrapper').removeClass('eum-hidden');
					$site_row.find('#eum-webhook-copy').html(udclion.eum.webhook_copy);
					$enableButton = $site_row.find('#enable-webhook');
					$enableButton.attr('id','disable-webhook');
					$enableButton.val(udclion.eum.webhook_disable);
				}
			}).fail(function(response) {
				process_error(response);
			});
		}, true);

		UpdraftCentral.register_row_clicker('#whitelist-save', function($site_row) {
			var params = {
				name: 'whitelist_save',
				arguments: { data: {
						'plugin_name': $('#eum-whitelabel-text').val(),
						'plugin_author': $('#eum-whitelabel-author').val(),
						'plugin_url': $('#eum-whitelabel-url').val(),
						'notices': $('#whitelist-notices').is(':checked')
					}
				}
			}

			send_command(params, $site_row).then(function(response) {
				if ('undefined' !== typeof response && false !== response) {
					UpdraftCentral_Library.dialog.alert('<h2>'+udclion.succeeded+'</h2><p>'+response+'</p>');
				}
			}).fail(function(response) {
				process_error(response);
			});
		}, true);

		UpdraftCentral.register_row_clicker('#whitelist-reset', function($site_row) {
			var params = {
				name: 'whitelist_reset',
				arguments: {}
			}

			send_command(params, $site_row).then(function(response) {
				if ('undefined' !== typeof response && false !== response) {
					UpdraftCentral_Library.dialog.alert('<h2>'+udclion.succeeded+'</h2><p>'+response.message+'</p>');
					$site_row.find('#eum-whitelabel-text').val(response.name);
					$site_row.find('#eum-whitelabel-author').val(response.author);
					$site_row.find('#eum-whitelabel-url').val(response.url);
					$site_row.find('#whitelist-notices').prop('checked','checked');
				}
			}).fail(function(response) {
				process_error(response);
			});
		}, true);

		UpdraftCentral.register_row_clicker('#eum-webhook-copy', function($site_row) {
			var copyText = document.getElementById('eum-webhook-url');
			copyText.select();
			document.execCommand('copy');
			$site_row.find('#eum-webhook-copy').html(udclion.eum.webhook_copied);
		}, true);

		UpdraftCentral.register_row_clicker('#disable-webhook', function($site_row) {
			var params = {
				name: 'disable_webhook',
				arguments: {}
			}

			send_command(params, $site_row).then(function(response) {
				if ('undefined' !== typeof response && false !== response) {
					UpdraftCentral_Library.dialog.alert('<h2>' + udclion.succeeded + '</h2><p>' + response + '</p>');
					$site_row.find('#eum-webhook-url-wrapper').addClass('eum-hidden');
					$site_row.find('#eum-webhook-url').val('');
					$disableButton = $site_row.find('#disable-webhook');
					$disableButton.attr('id', 'enable-webhook');
					$disableButton.val(udclion.eum.webhook_enable);
				}
			}).fail(function(response) {
				process_error(response);
			});
		}, true);

		UpdraftCentral.register_row_clicker('#enable-safe-mode', function($site_row) {
			var params = {
				name: 'enable_safe_mode',
				arguments: {}
			}

			send_command(params, $site_row).then(function(response) {
				if ('undefined' !== typeof response && false !== response) {
					UpdraftCentral_Library.dialog.alert('<h2>' + udclion.succeeded + '</h2><p>' + response + '</p>');
					$site_row.find('#enable-safe-mode').val(udclion.eum.disable_safe_mode);
					$site_row.find('#enable-safe-mode').attr('id', 'disable-safe-mode')
				}
			}).fail(function(response) {
				process_error(response);
			});
		}, true);

		UpdraftCentral.register_row_clicker('#disable-safe-mode', function($site_row) {
			var params = {
				name: 'disable_safe_mode',
				arguments: {}
			}

			send_command(params, $site_row).then(function(response) {
				if ('undefined' !== typeof response && false !== response) {
					UpdraftCentral_Library.dialog.alert('<h2>' + udclion.succeeded + '</h2><p>' + response + '</p>');
					$site_row.find('#disable-safe-mode').val(udclion.eum.enable_safe_mode);
					$site_row.find('#disable-safe-mode').attr('id', 'enable-safe-mode');
				}
			}).fail(function(response) {
				process_error(response);
			});
		}, true);

		UpdraftCentral.register_row_clicker('#eum-check-plugins', function($site_row) {
			var force_check = false;
			if ($site_row.find('#eum-check-plugins-force').is(':checked')) {
				force_check = true;
			}
			$site_row.find('#eum-check-plugins-status').css('display', 'none');


			var params = {
				name: 'check_plugins',
				arguments: {
					force: force_check
				}
			}

			send_command(params, $site_row).then(function(response) {
				if ('undefined' !== typeof response && false !== response) {
					UpdraftCentral_Library.dialog.alert('<h2>' + udclion.succeeded + '</h2><p>' + response.message + '</p>');
					var $message = $site_row.find('#eum-check-plugins-status');
					$site_row.find('#eum-check-plugins-force').prop('checked', false);
					if (response.errors) {
						$message.css('display', 'block').removeClass('mpsum-notice').addClass('mpsum-error').html(response.message);
					} else {
						$message.css('display', 'block').removeClass('mpsum-error').addClass('mpsum-notice').html(response.message);
					}				}
			}).fail(function(response) {
				process_error(response);
			});
		}, true);

		UpdraftCentral.register_row_clicker('#reset-options', function($site_row) {
			var params = {
				name: 'reset_options',
				arguments: {}
			}

			send_command(params, $site_row).then(function(response) {
				if ('undefined' !== typeof response && false !== response) {
					UpdraftCentral_Library.dialog.alert('<h2>'+udclion.succeeded+'</h2><p>'+response+'</p>');
				}
			}).fail(function(response) {
				process_error(response);
			});
		});
		
		UpdraftCentral.register_row_clicker('#enable-version-control', function($site_row) {
			var params = {
				name: 'enable_version_control',
				arguments: {}
			}
	
			send_command(params, $site_row).then(function(response) {
				if ('undefined' !== typeof response && false !== response) {
					UpdraftCentral_Library.dialog.alert('<h2>' + udclion.succeeded + '</h2><p>' + response + '</p>');
					$site_row.find('#enable-version-control').val(udclion.eum.disable_version_control);
					$site_row.find('#enable-version-control').attr('id', 'disable-version-control')
				}
			}).fail(function(response) {
				process_error(response);
			});
		}, true);
	
		UpdraftCentral.register_row_clicker('#disable-version-control', function($site_row) {
			var params = {
				name: 'disable_version_control',
				arguments: {}
			}
	
			send_command(params, $site_row).then(function(response) {
				if ('undefined' !== typeof response && false !== response) {
					UpdraftCentral_Library.dialog.alert('<h2>' + udclion.succeeded + '</h2><p>' + response + '</p>');
					$site_row.find('#disable-version-control').val(udclion.eum.enable_version_control);
					$site_row.find('#disable-version-control').attr('id', 'enable-version-control');
				}
			}).fail(function(response) {
				process_error(response);
			});
		}, true);

		UpdraftCentral.register_row_clicker('#enable-unmaintained-plugins-check', function($site_row) {
			var params = {
				name: 'enable_unmaintained_plugins_check',
				arguments: {}
			}
	
			send_command(params, $site_row).then(function(response) {
				if ('undefined' !== typeof response && false !== response) {
					UpdraftCentral_Library.dialog.alert('<h2>' + udclion.succeeded + '</h2><p>' + response + '</p>');
					$site_row.find('#enable-unmaintained-plugins-check').val(udclion.eum.disable_unmaintained_plugin_check);
					$site_row.find('#enable-unmaintained-plugins-check').attr('id', 'disable-unmaintained-plugins-check')
				}
			}).fail(function(response) {
				process_error(response);
			});
		}, true);
	
		UpdraftCentral.register_row_clicker('#disable-unmaintained-plugins-check', function($site_row) {
			var params = {
				name: 'disable_unmaintained_plugins_check',
				arguments: {}
			}
	
			send_command(params, $site_row).then(function(response) {
				if ('undefined' !== typeof response && false !== response) {
					UpdraftCentral_Library.dialog.alert('<h2>' + udclion.succeeded + '</h2><p>' + response + '</p>');
					$site_row.find('#disable-unmaintained-plugins-check').val(udclion.eum.enable_unmaintained_plugin_check);
					$site_row.find('#disable-unmaintained-plugins-check').attr('id', 'enable-unmaintained-plugins-check');
				}
			}).fail(function(response) {
				process_error(response);
			});
		}, true);

	});


	/**
	 * Saves the EUM settings
	 *
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 *
	 * @return {void}
	 */
	this.save_settings = function($site_row) {
		var $eum_location = get_eum_location($site_row);
		var form_data = gather_settings();
		var results;

		UpdraftCentral.set_loading($eum_location);
		save_settings(form_data, $site_row).then(function(response) {
			if ('undefined' !== typeof response.save_results) {
				results = response.save_results;
			}

		}).fail(function(response) {
			process_error(response);

		}).always(function() {
			UpdraftCentral.done_loading($eum_location).then(function() {
				if ('undefined' !== typeof results) {
					if ('undefined' !== typeof results.errors && results.errors.length) {
						UpdraftCentral_Library.dialog.alert('<h2>'+udclion.eum.save_settings_heading+'</h2><p>'+results.errors[0]+'</p>');
					} else {
						UpdraftCentral_Library.dialog.alert('<h2>'+udclion.eum.save_settings_heading+'</h2><p>'+results.messages[0]+'</p>');
						self.load_contents($site_row, 'settings');
					}
				}
			});
		});
	}

	/**
	 * Loads the appropriate content based on the tab id
	 *
	 * @param {Object} $site_row The jQuery object of the site.
	 * @param {string} command A string representing the Easy Updates Manager tab section where our content is to be retrieve.
	 * @param {Object} args A data object to be sent to remote site
	 *
	 * @borrows UpdraftCentral.set_loading
	 * @borrows UpdraftCentral.done_loading
	 *
	 * @return {void}
	 */
	this.load_contents = function($site_row, command, args) {
		var tabs = ['general', 'plugins','themes', 'logs','advanced'];

		if (-1 !== tabs.indexOf(command)) {
			command = 'get_' + command + '_contents'
		}
		if ('undefined' === typeof args) args = {};

		var html = '',
			$eum_location = get_eum_location($site_row),
			site_key = 'site_' + $site_row.data('site_id');


		if (!sites.exists(site_key)) {
			var site = new UpdraftCentral_Site($site_row);
			sites.add(site_key, site);
		}

		var params = {
			name: command,
			arguments: args
		};

		UpdraftCentral.set_loading($eum_location);
		send_command(params, $site_row).then(function(response) {
			if ('undefined' !== typeof response) {
				html = response
			}
		}).fail(function(response) {
			var template = process_error(response);
			if ('undefined' !== typeof template && template.length) {
				html = template;
			}
		}).always(function() {

			if ('get_general_contents' === command || 'save_general_options' === command) {
				if ('string' === typeof html) {
					UpdraftCentral_Library.dialog.alert('<h2>'+udclion.error+'</h2><p>'+html+'</p>');
					return;
				}
				// `html` is not html, it is json
				var core_options = html;
				html = get_general_contents(core_options);
				if ('off' === core_options.logs) {
					$site_row.find('.updraftcentral_site_logs').hide();
				} else {
					$site_row.find('.updraftcentral_site_logs').show();
				}

				UpdraftCentral.done_loading($eum_location, html).then(function() {
					$('#notification-emails').prop('value', general_email_addresses);
					set_active_classes(core_options);
				});
				return;
			}

			UpdraftCentral.done_loading($eum_location, html).then(function() {

				if (html && html.length) {

					UpdraftCentral.register_event_handler('click', '.updraftcentral_eum_rows #force-updates', function() {
						var params = {
							name: 'force_updates',
							arguments: {}
						}

						send_command(params, $site_row).then(function(response) {
							if ('undefined' !== typeof response && false !== response) {
								console.log(response);
							}
						})
					});

					set_cron_related_fields_visibility($site_row);
					jQuery('p.submit').css('display','block');
				} else {
					UpdraftCentral_Library.dialog.alert('<h2>'+udclion.error+'</h2><p>'+udclion.eum.could_not_return_content+'</p>');
					$eum_location.empty();
				}

			});
		});
	}

	/**
	 * Gets general tab content from handlebars template
	 *
	 * @param {Object} options - Already stored options values
	 * @returns {string} HTML for general tab
	 */
	function get_general_contents(options) {
		$.each(options, function(key, value ) {
			if ('email_addresses' == key) {
				general_email_addresses = options[key];
				delete options[key];

			}
		});
		return UpdraftCentral.template_replace('eum-general', {eum: udclion.eum, options: options});
	}

	/**
	 * Set stored options as active options
	 *
	 * @param core_options
	 */
	function set_active_classes(core_options) {
		for (var key in core_options) {
			if ('automatic_updates' === key && 'unset' === core_options[key]) {
				core_options[key] = 'default';
			}
			var id = key.replace(/_/g,'-') + '-' + core_options[key];
			$('#' + id).addClass('eum-active');
		}
	}

	/**
	 * Gets the container where to display the loading animation
	 *
	 * @private
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 *
	 * @return {Object} A jQuery object representing the site container
	 */
	function get_eum_location($site_row) {
		var $location = $site_row.find('.updraftcentral_row_extracontents'),
			$eum_location = $location.find('.updraftcentral_eum_rows');

		if ($eum_location.length === 0) {
			$eum_location = $('<div class="updraftcentral_eum_rows"></div>').appendTo($location);
		}

		return $eum_location;
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
				var message = udclion.eum[error.message];

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
			form_data = $(".updraftcentral_eum_rows input[name!='action'], .updraftcentral_eum_rows textarea, .updraftcentral_eum_rows select").serializeJSON({useIntKeysAsArrayIndex: true});
		} else {
			// Excluding the unnecessary 'action' input avoids triggering a very mis-conceived mod_security rule seen on one user's site.
			form_data = $(".updraftcentral_eum_rows input[name!='action'], .updraftcentral_eum_rows textarea, .updraftcentral_eum_rows select").serialize();

			// Include unchecked checkboxes. user filter to only include unchecked boxes.
			$.each($('.updraftcentral_eum_rows input[type=checkbox]')
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
	 * Gather general tab options from button element ids
	 *
	 * @returns {Array} An Array of options
	 */
	function gather_general_options() {
		var ids = [];
		$('.eum-active').each(function(index) {
			var id = $(this).attr('id');
			ids.push(id);
		});
		return ids;
	}

	/**
	 * Sends a save request to the remote server for saving the EUM plugins / themes tab settings
	 *
	 * @private
	 * @param {Object} form_data An object containing the EUM plugins / themes tab settings to save.
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
	 * Sends Easy Updates Manager command to remote server
	 *
	 * @param {Object} params An object containing details of the command to execute.
	 * @param {string} params.name The EUM command to execute.
	 * @param {string|Object} params.arguments The arguments needed to execute the command successfully.
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 *
	 * @return {Object} A jQuery promise
	 */
	function send_command(params, $site_row) {
		var deferred = $.Deferred();
		
		UpdraftCentral.send_site_rpc('eum.get_version', {}, $site_row, function( versionData ) {
			var version = versionData.data;
			if ("-1" == version_compare(version, '9.0.0')) {
				//html = '<p>' + 'Please update Easy Updates Manager to 9.0.0 to see this section' + '</p>';
				UpdraftCentral_Library.dialog.alert('<h2>'+udclion.eum.plugin_name+'</h2><p>'+udclion.eum.version_incompatibility+'</p>');
				UpdraftCentral.done_loading($site_row);
			} else {
				UpdraftCentral.send_site_rpc('eum.'+params.name, params.arguments, $site_row, function(response, code, error_code) {
					if (code === 'ok' && 'undefined' !== typeof response.data && null !== response.data && !response.data.error) {
						deferred.resolve(response.data);
					} else {
						deferred.reject(response);
					}
				});
			}
		} );
		
		return deferred.promise();
	}

	/**
	 * Checks whether Easy Updates Manager plugin is installed and activated in the remote website
	 *
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 * @param {String} plugin_name The name of plugin to check (e.g. 'Easy Updates Manager' or 'Easy Updates Manager Premium')
	 * @return {Object} A jQuery promise
	 */
	function is_eum_active($site_row, plugin_name) {
		return UpdraftCentral.is_plugin_active($site_row, plugin_name);
	}

	/**
	 * Activates the Easy Updates Manager plugin in the remote website
	 *
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 * @param {String} plugin_name The name of plugin to activate (e.g. 'Easy Updates Manager' or 'Easy Updates Manager Premium')
	 * @return {Object} A jQuery promise
	 */
	function activate_eum($site_row, plugin_name) {
		return UpdraftCentral.activate_plugin($site_row, plugin_name);
	}

	/**
	 * Download, install and activates the Easy Updates Manager plugin in the remote website
	 *
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 * @param {String} plugin_name The name of plugin to install and activate (e.g. 'Easy Updates Manager' or 'Easy Updates Manager Premium')
	 * @param {String} plugin_slug The plugin slug
	 * @return {Object} A jQuery promise
	 */
	function install_activate_eum($site_row, plugin_name, plugin_slug) {
		return UpdraftCentral.install_activate_plugin($site_row, plugin_name, plugin_slug);
	}

	/**
	 * Get data to send to Easy Updates Manager
	 *
	 * @param {String} request_type Type of request, like pagination, filtering, etc
	 * @param {Object} elm Element that triggered the action
	 * @returns {Object} Object with data to be sent
	 */
	function get_data(request_type, elm) {
		var data = {};
		var $current = $('#current-page-selector');
		if (0 === $current.length) {
			$current = $('#table-paging');
		}
		var query_string = null;
		if ('undefined' !== typeof elm) {
			query_string = elm.search.substring(1);
		}

		switch (request_type) {
			case 'pagination':
				// We need to override this as paged data comes from clicked link
				data.paged = query(query_string, 'paged');
				break;

			case 'pagination_input':
			case 'bulk':
			case 'save_settings':
				// Get paged data from input field
				data.paged = parseInt($('input[name=paged]').val()) || '1';
				break;
		}

		data.m = $('#filter-by-date').val();
		data.status = $('#filter-by-success').val();
		data.action_type = $('#filter-by-action').val();
		data.type = $('#filter-by-type').val();
		data.order = $('#filter-by-order').val();
		data.data = gather_settings('string');
		if (null !== query_string) {
			data.tab = query(query_string, 'tab') || '';
			data.view = query(query_string, 'view') || 'all';
		} else {
			data.tab = $current.data('tab') || '';
			data.view = $current.data('view') || 'all';
		}

		return data;
	}

	/**
	 * Splits URL query string and returns desired url parameter's value
	 *
	 * @param {String} query Query String
	 * @param {String} variable URL Parameter name
	 * @returns {*} Value of of URL Parameter
	 */
	function query(query, variable) {
		if ('undefined' === typeof query || 'undefined' === typeof variable) return false;
		var params = query.split("&");
		for (var i = 0; i < params.length; i++) {
			var pair = params[i].split("=");
			if (variable === pair[0])
				return pair[1];
		}
		return false;
	}

	/**
	 * Sets update cron scheduling related fields visibility
	 *
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 */
	function set_cron_related_fields_visibility($site_row) {
		var value = $site_row.find('.eum_cron_schedule').val();
		var $time_field = $site_row.find('.eum_cron_time');
		var $week_number_field = $site_row.find('.eum_week_number');
		var $week_day_field = $site_row.find('.eum_week_days');
		var $day_number_field = $site_row.find('.eum_day_number_wrapper');

		switch (value) {
			case 'twicedaily':
			case 'daily':
				$week_day_field.hide();
				$week_number_field.hide();
				$day_number_field.css('display', 'none');
				break;
			case 'weekly':
				$week_day_field.show();
				$week_number_field.hide();
				$day_number_field.css('display', 'none');
				break;
			case 'fortnightly':
				$week_day_field.show();
				$week_number_field.show();
				$day_number_field.css('display', 'none');
				break;
			case 'monthly':
				$week_day_field.hide();
				$week_number_field.hide();
				$day_number_field.css('display', 'inline-block');
		}
	}

	/**
	 * Sets logger's additional options field visibility
	 *
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 */
	function set_logger_additional_options_visibility($site_row) {
		var $loggers = $site_row.find('.eum_logger_type');
		$loggers.each(function(index, logger) {
			if (true === $('input', logger)[0].checked) {
				$('.eum_logger_additional_options', logger).show();
			} else {
				$('.eum_logger_additional_options', logger).hide();
			}
		});
	}

	/**
	 * Parses JSON string
	 *
	 * @param {String} json_mix_str - encoded json string
	 * @throws {Exception} - throws exception if json parsing failed.
	 *
	 * @returns {Array|Exception} - Returns JSON array or throws exception
	 */
	function parse_json(json_mix_str) {

		// Just try it - i.e. the 'default' case where things work (which can include extra whitespace/line-feeds, and simple strings, etc.).
		try {
			var result = JSON.parse(json_mix_str);
			return result;
		} catch (e) {
			console.log("UC: Exception when trying to parse JSON (1) - will attempt to fix/re-parse");
			console.log(json_mix_str);
		}

		var json_start_pos = json_mix_str.indexOf('{');
		var json_last_pos = json_mix_str.lastIndexOf('}');

		// Case where some php notice may be added after or before json string
		if (json_start_pos > -1 && json_last_pos > -1) {
			var json_str = json_mix_str.slice(json_start_pos, json_last_pos + 1);
			try {
				var parsed = JSON.parse(json_str);
				console.log("UC: JSON re-parse successful");
				return parsed;
			} catch (e) {
				
				console.log("UC: Exception when trying to parse JSON (2) - will attempt to fix/re-parse based upon bracket counting");
				
				var cursor = json_start_pos;
				var open_count = 0;
				var last_character = '';
				var inside_string = false;
				
				// Don't mistake this for a real JSON parser. Its aim is to improve the odds in real-world cases seen, not to arrive at universal perfection.
				while ((open_count > 0 || cursor == json_start_pos) && cursor <= json_last_pos) {
					
					var current_character = json_mix_str.charAt(cursor);
					
					if (!inside_string && '{' == current_character) {
						open_count++;
					} else if (!inside_string && '}' == current_character) {
						open_count--;
					} else if ('"' == current_character && '\\' != last_character) {
						inside_string = inside_string ? false : true;
					}
					
					last_character = current_character;
					cursor++;
				}
				
				console.log("Started at cursor="+json_start_pos+", ended at cursor="+cursor+" with result following:");
				console.log(json_mix_str.substring(json_start_pos, cursor));
				
				try {
					var parsed = JSON.parse(json_mix_str.substring(json_start_pos, cursor));
					console.log('UC: JSON re-parse successful');
					return parsed;
				} catch (e) {
					// Throw it again, so that our function works just like JSON.parse() in its behaviour.
					throw e;
				}
				
			}
		}

		throw "UC: could not parse the JSON";
	}
}
