jQuery(function($) {
	UpdraftCentral = UpdraftCentral();
	UpdraftCentral.init();
});

/**
 * This is the callback on the Paginator class
 *
 * @callback paginatorCallback
 * @param {int} current_page
 */
/**
 * Create paginator markup and manages the active page.
 *
 * @constructor
 * @param {Object} location - A jQuery DOM object used for placing the paginator
 * @param {Object} page_info - an object describing the paginator
 * @param {int} page_info.current_page - the current active page on the paginator
 * @param {int} page_info.total_pages - the amount of pages the paginator should show
 * @param {paginatorCallback} page_change - what should be done after there's a page change
 * @returns {void}
 */
function UpdraftCentral_Paginator(location, page_info, page_change) {
	var self = this;
	
	var current = page_info.current_page;
	var total = page_info.total_pages;
	var callback = page_change;
	
	/**
	 * Appends the paginator to the DOM and sets the active page
	 *
	 * @returns {void}
	 */
	function init(){
		// Adding condition here to make sure that the paginator navigation
		// will only be visible if the total pages is more than 1.
		if (total > 1) {
			append(location);
			set_active(current);
		}
	}
	init();
	
	/**
	 * Sets the active page
	 *
	 * @param {int} page_number - the page number that is to be active
	 * @returns {void}
	 */
	function set_active(page_number){
		self.element.find('.page').each(function(index, element) {
			
			jQuery(this).removeClass('page_active');
			jQuery(this).attr('aria-selected', false);
			
			if (jQuery(this).data('page') === page_number) {
				jQuery(this).addClass('page_active');
				jQuery(this).attr('aria-selected', true);
			}
		})
		
		self.element.find('.page_prev').removeClass('disabled');
		self.element.find('.page_next').removeClass('disabled');
		if (page_number === 1) {
			self.element.find('.page_prev').addClass('disabled');
		} else if (page_number === total) {
			self.element.find('.page_next').addClass('disabled');
		}
		trigger();
	}
	
	/**
	 * Sets the next page as active
	 *
	 * @returns {void}
	 */
	function next(){
		if (current < total) {
			current++;
			set_active(current);
		}
	}
	
	/**
	 * Sets the previous page as active
	 *
	 * @returns {void}
	 */
	function prev(){
		if (current > 1) {
			current--;
			set_active(current);
		}
	}
	
	/**
	 * Go to a page and set it as active
	 *
	 * @param {int} page_number - the page number that is to be active
	 * @returns {void}
	 */
	function go_to(page_number){
		if (page_number !== current) {
			current = page_number;
			set_active(page_number);
		}
	}
	
	/**
	 * Inserts the paginator markup to the DOM
	 *
	 * @param {string} _location - a selector for where the paginator should be
	 * @returns {void}
	 */
	function append(_location){
		var pages = [];
		for (var i = 1; i <= total; i++) {
			pages.push(i);
		}
		
		self.element = jQuery(UpdraftCentral.template_replace('dashboard-paginator', { pages:pages }));
		self.element.appendTo(_location);
		
		self.element.on('click', 'a', function(e) {
			e.preventDefault();
			
			if (jQuery(this).hasClass('active')) {
				return;
			}
			
			if (jQuery(this).hasClass('page_prev')) {
				prev();
			} else if (jQuery(this).hasClass('page_next')) {
				next();
			} else if (jQuery(this).hasClass('page')) {
				var page_number = jQuery(this).data('page');
				go_to(page_number);
			}
			
		});
	}
	
	/**
	 * Set what should happen on a page change
	 *
	 * @param {paginatorCallback} _callback - a call back that triggers after a page change
	 * @returns {void}
	 */
	this.page_change = function(_callback) {
		callback = _callback;
	}
	/**
	 * Triggers a jquery event on the paginator element and executes the page_change callback
	 *
	 * @fires page_change
	 * @returns {void}
	 */
	function trigger(){
		self.element.trigger("page_change", current);
		if ('function' === typeof callback) {
			callback(current);
		}
	}
}

var UpdraftCentral = function() {
	
	// This is just used internally to log more things. Set to 0 to turn it off (which won't necessarily prevent all console logging).
	// It's not completely systematic/consistent. Logging has been added in an ad hoc manner during development/testing to help with debugging.
	// This gets passed through from the PHP constant UPDRAFTCENTRAL_DEBUG_LEVEL
	var updraftcentral_debug_level = ('undefined' === typeof udclion || !udclion.hasOwnProperty('debug_level')) ? 0 : udclion.debug_level;
	var listener_poll_interval = (updraftcentral_debug_level > 0) ? 5000 : 10000;
	
	var mobile_width = 670;
	var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var $ = jQuery;
	
	var modal_action_callback;
	
	// Use to hold the current site being operated on (e.g. state for modals) (N.B. - you may need to explicitly set this, depending on whether you're using a convenience function that already sets it, or not)
	var $site_row;

	var self = this;
	var default_collapse_width = 60;
	var observers = new UpdraftCentral_Collection();

	this.ajax_request_processing = false;
	this.uc_action_triggered = false;
	this.uc_action_data = [];
	this.event_trigger = new UpdraftCentral_Collection();
	this.uc_module;
	this.reloaded = false;
	this.recorder = null;
	this.cached_data = {};

	/**
	 * Initializes UpdraftCentral's functions
	 *
	 * @returns {void}
	 */
	this.init = function() {
		UpdraftCentral.add_reload_listener();

		// Fill the entire page content area
		UpdraftCentral.fill_content_area();

		// Initialize and load recorder
		UpdraftCentral.init_recorder();

		// Initialize keyboard shortcuts
		UpdraftCentral.init_keyboard_shortcuts();

		// Initialize ajax request listener
		UpdraftCentral.init_process_listener();

		// Initialize collapse/expand menu tooltips
		UpdraftCentral.init_tooltip();
		
		// Purge localStorage of old data
		UpdraftCentral.storage_purge();

		// Set requested mode
		UpdraftCentral.set_requested_mode();

		// Initialize housekeeping listeners
		UpdraftCentral.init_housekeeping();
	}

	/**
	 * Logs event actions (e.g. update, install, delete, etc.)
	 *
	 * @param {int}    site_id     The ID of the site where the event was applied
	 * @param {string} type        Type of event
	 * @param {string} name        Event name
	 * @param {string} status      The resulting status of the event
	 * @param {array}  data        Some information regarding the event executed
	 * @param {array}  result_data The result coming from the remote site
	 *
	 * @returns {Promise}
	 */
	this.log_event = function(site_id, type, name, status, data, result_data) {
		var deferred = $.Deferred();
		var resolved = false;

		var log_data = {
			site_id: site_id,
			event_type: type,
			event_name: (-1 === name.indexOf(type+'.')) ? type+'.'+name : name,
			event_data: JSON.stringify(data),
			event_status: status,
			event_result_data: JSON.stringify(result_data)
		}

		UpdraftCentral.send_ajax('log_event', log_data, null, 'via_mothership_encrypting', UpdraftCentral.$site_row, function(resp, code, error_code) {
			if ('ok' === code) {
				if (resp.hasOwnProperty('message') && 'success' === resp.message) {
					deferred.resolve();
					resolved = true;
				}
			}

			if (!resolved) deferred.reject(resp);
		});

		return deferred.promise();
	}

	/**
	 * Logs event actions (e.g. update, install, delete, etc.) in bulk or multiple entries
	 *
	 * @param {array} log_data An array of log data to save (@see UpdraftCentral.log_event parameters)
	 *
	 * @returns {Promise}
	 */
	this.bulk_log_event = function(log_data) {
		var deferred = $.Deferred();
		var resolved = false;

		UpdraftCentral.send_ajax('log_event', { bulk: 1, data: log_data }, null, 'via_mothership_encrypting', UpdraftCentral.$site_row, function(resp, code, error_code) {
			if ('ok' === code) {
				if (resp.hasOwnProperty('message') && 'success' === resp.message) {
					deferred.resolve();
					resolved = true;
				}
			}

			if (!resolved) deferred.reject(resp);
		});

		return deferred.promise();
	}

	/**
	 * Adds an event listener for the 'beforeunload' event which eventually sets the reloaded flag.
	 * The reloaded flag will help determine whether an ajax process were halted abruptly due to reloading
	 * or refreshing of the browser.
	 *
	 * @returns {void}
	 */
	this.add_reload_listener = function() {
		// N.B. We need this to be declared first, otherwise, the succeeding "on('beforeunload')"" won't work
		// as expected (not called). For some weird reason it appears to be relying on some previous handler declared or
		// attached to the same 'beforeunload' event. This only happens though when the browser has been reloaded.
		//
		// Also, having an empty handler won't work too, so leave the console.log('') as it is.
		window.addEventListener('beforeunload', function() {
			console.log('');
		});

		$(window).on('beforeunload', function() {
			UpdraftCentral.reloaded = true;
		});
	}

	/**
	 * Fill the entire page content with the UpdraftCentral dashboard when loaded
	 *
	 * @returns {void}
	 */
	this.fill_content_area = function() {
		var uc_wrapper = $('#updraftcentral_dashboard_wrapper');

		// The user does not wish to fill the entire page content when UpdraftCentral loads if we received
		// an "inactive" value from udclion.load_setting, thus we bail/exit.
		if ('undefined' !== typeof udclion.load_setting && 'inactive' === udclion.load_setting) return;

		$('body').children(':not(script):not(style):not(link)').hide();
		var wrapper = $('body > #wrapper');
		var content;

		if (0 === wrapper.length) {
			wrapper = $('<div/>', {
				id: 'wrapper'
			}).prependTo($('body'));

			content = wrapper.find('#content');
			if (0 === content.length) {
				content = $('<div/>', {
					id: 'content'
				}).appendTo(wrapper);
			}
		}

		if ($('body > #wrapper > #content')) {
			content = $('body > #wrapper > #content');
			if (0 !== content.length) {
				uc_wrapper.appendTo(content);
			}
			if (!content.is(':visible')) content.show();
			if (!wrapper.is(':visible')) wrapper.show();
		}

		$('body').addClass('updraftcentral-fill-view');
	}

	/**
	 * Clears the current editor container along with any events, mounted elements/components
	 * and subscriptions that were previously attached to it. Helps prevent issues when switching
	 * from page to post module and vice-versa.
	 *
	 * @param {object|null} data Event data that holds information when switching modes or null for calling directly
	 *
	 * @returns {void}
	 */
	this.clear_editor_container = function(data) {
		if (null === data || data.new_mode !== data.previous_mode) {
			var container = $('#gutenberg_editor_container');
			var editor = container.find('#editor');
	
			if ('undefined' !== typeof editor && editor.length) {
				if (!editor.is(':visible')) {
					if ('undefined' !== typeof window._wpLoadBlockEditor) delete window._wpLoadBlockEditor;
					if ('function' === typeof window.wp_data_unsubscribe) window.wp_data_unsubscribe();
					if ('undefined' !== typeof ReactDOM && ReactDOM.hasOwnProperty('unmountComponentAtNode')) {
						ReactDOM.unmountComponentAtNode(editor.get(0));
					}
	
					wp.element.unmountComponentAtNode(editor.get(0));
					editor.remove();
					container.remove();
				}
			}
		}
	}

	/**
	 * Initialize housekeeping listeners and handlers that fixes minor glitches
	 *
	 * @returns {void}
	 */
	this.init_housekeeping = function() {

		// Make sure that any drop down menu currently opened will be close when a new tab is selected
		$('#updraftcentral_dashboard_existingsites').on('updraftcentral_dashboard_mode_pre_set', function() {
			$('#updraftcentral_dashboard .more-option-container.show').each(function() {
				// We're are triggering the button instead of hiding the container directly as to keep
				// and maintain any events associated with the drop down menu when it is closed.
				$(this).find('button').trigger('click');
			});
		});

		if ($('.uc_site_alert_icon').length) {
			$('.uc_site_alert_icon').each(function() {
				$(this).tooltip({
					container: $('#updraftcentral_dashboard').get(0),
					trigger: 'hover',
					placement: 'top',
					boundary: 'viewport'
				});
			});
		}

		$('#updraftcentral_dashboard_existingsites').on('updraftcentral_dashboard_mode_set_after', function() {
			UpdraftCentral.reset_site_selection();
		});
		
		$('#updraftcentral_dashboard_existingsites .updraftcentral_site_row').each(function() {
			var stored_data = $(this).data('cached_data');
			if ('string' === typeof stored_data && stored_data.length) {
				var data = JSON.parse(atob(stored_data));

				if ('undefined' === typeof UpdraftCentral.cached_data) UpdraftCentral.cached_data = {};
				for (var command in data) {
					if ('undefined' === typeof UpdraftCentral.cached_data[command]) UpdraftCentral.cached_data[command] = [];
					if (data[command]) {
						UpdraftCentral.cached_data[command].push(data[command]);
					}
				}
			}
		});
	}

	/**
	 * Resets site selection if the current site being monitored/recorded has been suspended
	 *
	 * @returns {void}
	 */
	this.reset_site_selection = function() {
		var current_site = self.recorder.get_current_site();
		if ('undefined' !== typeof current_site && current_site) {
			// Sync $site_row with the current site being monitored/recorded if they are not equal.
			// The recorded site is more accurate than the $site_row value since it can be altered
			// anytime by any module or logic. Thus, we need to sync them if they are not equal in order
			// to avoid any unforeseen issues.
			if (UpdraftCentral.$site_row.data('site_id') != current_site.data('site_id')) {
				UpdraftCentral.$site_row = current_site;
			}

			if (current_site.hasClass('suspended')) {
				self.recorder.reset_recorder();
				$('.updraftcentral-search-area').show();
				$('#updraftcentral_dashboard_existingsites').find('.ui-sortable-handle').show();
				$('#updraft-central-content button.updraftcentral_action_choose_another_site').hide();
			}
		}
	}

	/**
	 * Cache or saves the current remmote response for the given command
	 *
	 * @param {integer} site_id  The ID of the site where the response is to be pulled from
	 * @param {string}  command  The command that was executed when the request was made
	 * @param {object}  data     The data that was passed as parameters for the command
	 * @param {object}  response The response from the remote website
	 *
	 * @returns {Promise}
	 */
	this.cache_response = function(site_id, command, data, response) {
		var deferred = $.Deferred();
		var resolved = false;

		var store_data = {
			site_id: site_id,
			command: command,
			data: data,
			response_data: {
				caught_output: '',
				reply: response
			}
		}

		var $site_row = $('.updraftcentral_site_row[data-site_id="'+site_id+'"');
		UpdraftCentral.send_ajax('cache_response', store_data, null, 'via_mothership_encrypting', $site_row, function(resp, code, error_code) {
			if ('ok' === code) {
				if (resp.hasOwnProperty('data')) {
					// Update sites info array if applicable to the current request (e.g. command existed in the collection)
					if ('undefined' !== typeof UpdraftCentral.cached_data[store_data.command]) {
						var index = UpdraftCentral.cached_data[store_data.command].findIndex(check_cached_data, store_data.site_id);
						if (-1 !== index) {
							UpdraftCentral.cached_data[store_data.command][index] = resp.data;
						} else {
							UpdraftCentral.cached_data[store_data.command].push(resp.data);
						}

						if (resp.data) {
							var data = btoa(JSON.stringify(resp.data));
							var $site_row = $('#updraftcentral_dashboard_existingsites .updraftcentral_site_row[data-site_id="'+site_id+'"');
							$site_row.attr('data-cached_data', data);
						}
					}

					deferred.resolve(resp.data);
					resolved = true;
				}
			}

			if (!resolved) deferred.reject();
		});

		return deferred.promise();
	}

	/**
	 * Checks whether an existing item(object) exists in the array
	 *
	 * @param {object} item The current item in the loop
	 *
	 * @returns {bool}
	 */
	function check_cached_data(item) {
		return item.site_id == this;
	}

	/**
	 * Retrieves a previously cached result for the given command
	 *
	 * @param {integer} site_id The ID of the site where the response is to be pulled from
	 * @param {string}  command The command that was executed when the request was made
	 *
	 * @returns {array|null}
	 */
	this.get_cached_response = function(site_id, command) {
		if ('undefined' !== typeof UpdraftCentral.cached_data[command] && UpdraftCentral.cached_data[command]) {
			var info = UpdraftCentral.cached_data[command];
			if (info.length) {
				var result = $.map(info, function(item, index) {
					if (site_id == item.site_id) {
						var response = JSON.parse(item.response);
						if (response.hasOwnProperty('reply') && response.reply) {
							return {
								created: item.created,
								reply: response.reply
							};
						}
					} else {
						return null;
					}
				});

				if (result.length) return result[0];
			}
		}

		return null;
	}

	/**
	 * Check to see whether the data is still valid to use
	 *
	 * @param {integer} created The data's recorded time. An epoch representation of the time when it was created/updated.
	 *
	 * @returns {boolean}
	 */
	this.is_data_good_to_use = function(created) {
		// Check if data is still good to use by running it against the data's recorded time.
		// If the data is under 12 hours then we use it, otherwise, we send the request to
		// the remote website to get a fresh set of information.
		return parseInt(dayjs().diff(dayjs.unix(created), 'hour')) < 12;
	}


	/**
	 * Sets the initial mode on page load based from the requested module
	 *
	 * @returns {void}
	 */
	this.set_requested_mode = function() {
		var url = window.location.href;
		var params = [],
			menu_item = '';

		if (-1 !== url.indexOf('?')) {
			params = url.slice(url.indexOf('?')+1).split('&');
			if (params.length) {
				for (var i=0, param=''; i<params.length; i++) {
					param = params[i].split('=');
					if ('uc_module' === param[0] && param[1].length) {
						// Check whether the requested module actually exists, if so then
						// set the current dashboard mode to that particular area.
						menu_item = $('#updraft-menu-item-'+param[1]);

						if ('undefined' !== typeof menu_item && menu_item && menu_item.length) {
							self.uc_module = param[1];
							$('#updraftcentral_dashboard_existingsites').on('updraftcentral_sites_loaded', function(event, data) {
								set_dashboard_mode(data.module);
							});
						}
					}
				}
			}
		}

		if ('undefined' == typeof self.uc_module) self.uc_module = false;
	}

	this.plupload_init = function(module, site_filter) {

		// We bail if we don't get either 'plugin' or 'theme' as the submitted module.
		if ('undefined' == typeof module) return;

		// Creates the uploader and pass the config
		var config = JSON.parse(udclion[module].plupload_config);
		var uploader = new plupload.Uploader(config);
		var selected_sites = new UpdraftCentral_Collection();
		var credentials = new UpdraftCentral_Credentials();

		// Checks if browser supports drag and drop upload, makes some css adjustments if necessary
		uploader.bind('Init', function(up) {
			var uploaddiv = $('#plupload-upload-ui');
			if (up.features.dragdrop) {
				uploaddiv.addClass('drag-drop');
				$('#drag-drop-area').on('dragover.wp-uploader', function() {
					uploaddiv.addClass('drag-over');
				}).on('dragleave.wp-uploader, drop.wp-uploader', function() {
					uploaddiv.removeClass('drag-over');
				});
				
			} else {
				uploaddiv.removeClass('drag-drop');
				$('#drag-drop-area').unbind('.wp-uploader');
			}
		});
					
		uploader.init();

		// A file was added in the queue
		uploader.bind('FilesAdded', function(up, files) {
			// Limit number of files for upload set in config
			if (config.hasOwnProperty('max_file_count') && config.max_file_count) {
				if (files.length) {
					var count = parseInt(config.max_file_count);
					files = files.splice(0, count);
				}
		
				if (uploader.files.length) {
					$.each(uploader.files, function(index, file) {
						if (file.id !== files[0].id) {
							uploader.removeFile(file);
							up.removeFile(file);
						}
					});
					$('#filelist').empty();
				}
			}

			plupload.each(files, function(file) {
				if (! /\.zip$/.test(file.name)) {
					UpdraftCentral_Library.dialog.alert('<h2>'+udclion[module].install_zip_heading+'</h2><p>'+file.name+': '+udclion[module].notarchive+'</p>');
					uploader.removeFile(file);
					up.removeFile(file);
					return;
				}

				// a file was added, you may want to update your DOM here...
				$('#filelist').append('<div class="file" id="'+file.id+'"><b>'+file.name+'</b> (<span>'+plupload.formatSize(0)+'</span>/'+plupload.formatSize(file.size)+') <div class="fileprogress"></div></div>');
			});
			
			up.refresh();
			up.start();
		});
			
		// Updates progress of the upload process
		uploader.bind('UploadProgress', function(up, file) {
			$('#' + file.id + " .fileprogress").width(file.percent + "%");
			$('#' + file.id + " span").html(plupload.formatSize(parseInt(file.size * file.percent / 100)));
		});

		// Displays error when found
		uploader.bind('Error', function(up, error) {
			UpdraftCentral_Library.dialog.alert('<h2>'+udclion[module].install_zip_heading+'</h2><p>'+udclion[module].uploaderr+' (code '+error.code+') : '+error.message+' - '+udclion[module].makesure+'</p>');
		});

		/**
		 * Shows the activation options dialog. Primarily showing the user a message whether
		 * he or she wishes to activate the plugin or theme after a successful installation/upload
		 *
		 * @param {object} up   Uploader instance
		 * @param {object} file An object currently representing the file in process
		 *
		 * @return {void}
		 */
		function show_pre_install_message(up, file) {
			var sites = selected_sites.get_items();
			if (sites.length) {
				UpdraftCentral_Library.dialog.confirm('<h2>'+udclion[module].install_zip_heading+'</h2><p>'+udclion[module].install_zip_message+'</p>', function(result) {
					var activate = (!result) ? 0 : 1;
	
					$.extend(up.settings.multipart_params, {
						'site_id': UpdraftCentral.$site_row.data('site_id'),
						'activate': activate,
						'sites': btoa(JSON.stringify(sites)),
					});
	
					var $location = UpdraftCentral.$site_row.find('.updraftcentral_row_extracontents');
					UpdraftCentral.set_loading($location);
	
					// Continue upload
					file.status = plupload.UPLOADING;
					up.trigger('UploadFile', file);
				}, null, { confirm: udclion.yes_activate, cancel: udclion.do_not_activate });
			} else {
				reset_uploader(up, file);
			}
		}

		/**
		 * Resets the uploader UI
		 *
		 * @param {object} up   Uploader instance
		 * @param {object} file An object currently representing the file in process
		 *
		 * @return {void}
		 */
		function reset_uploader(up, file) {
			$('#filelist').find('div#'+file.id).remove();
			uploader.removeFile(file);
			up.removeFile(file);
			up.stop();
			up.start();
		}

		/**
		 * Check site requirements and load credentials. Allows input of credentials
		 * if it is deemed needed when installing plugin or theme to the remote site
		 *
		 * @param {UpdraftCentral_Site} site The website to check and load credentials from
		 *
		 * @return {Promise}
		 */
		function load_site_creds(site) {
			var deferred = jQuery.Deferred();
			// Check to see if credentials is needed when installing/uploading plugins/themes
			credentials.load_credentials(site).then(function(response) {
				var show_form = false;
				if (response.hasOwnProperty('request_filesystem_credentials')) {
					var sysfolders = response.request_filesystem_credentials;
					if (sysfolders.hasOwnProperty(module+'s') && UpdraftCentral_Library.parseBool(sysfolders[module+'s'])) {
						show_form = true;
					}
				}

				if (show_form) {
					// Shows form where user is asked to input his/her FTP credentials that is
					// needed to install/upload the plugin file.
					credentials.get_credentials(site).then(function(response) {
						// If we now have a valid credentials, we copy the relevant fields/flags
						// to the current site before we proceed with the process.
						site.site_credentials = response.site_credentials;
						site.save_credentials_in_browser = response.save_credentials_in_browser;

						if (site.save_credentials_in_browser) {
							UpdraftCentral.storage_set('filesystem_credentials_'+site.site_hash, site.site_credentials, true);
						}

						deferred.resolve(site);
					}).fail(function(response) {
						deferred.resolve({});
					});
				} else {
					deferred.resolve(site);
				}
			}).fail(function(response) {
				deferred.resolve(site);
			});

			return deferred.promise();
		}

		/**
		 * Checks and loads credentials of the selected sites
		 *
		 * @param {arrays}   items    An array containing the destination sites when installing plugins or themes
		 * @param {Deferred} deferred jQuery's Deferred object
		 *
		 * @return {Promise}
		 */
		function check_site_creds(items, deferred) {
			if ('undefined' == typeof deferred) var deferred = jQuery.Deferred();
			if (items.length) {
				var site_row = items.shift();

				if ('undefined' !== typeof site_row) {
					var site = new UpdraftCentral_Site(site_row);
					if (!selected_sites.exists(site.id)) {
						load_site_creds(site).then(function(response) {
							// Add site id and creds to the selected sites collection to
							// be pass along with the upload request
							if (response.hasOwnProperty('id') && response.id) {
								selected_sites.add(response.id, {
									id: response.id,
									description: response.site_description,
									filesystem_credentials: response.site_credentials
								});
							}

							check_site_creds(items, deferred);
						});
					}
				}
			} else {
				deferred.resolve();
			}

			return deferred.promise();
		}

		// Pre-upload housekeeping
		uploader.bind('BeforeUpload', function(up, file) {
			var credentials = new UpdraftCentral_Credentials();
			var selection = site_filter.get_selected_sites();

			if (selection.hasOwnProperty('sites') && selection.sites.count()) {
				var site_rows = selection.sites;
				var up_status_container = $('#uc-install-status');

				selected_sites.clear();
				up_status_container.append('<span id="load-site-creds-msg">'+udclion[module].creds_check+'</span>');
				up_status_container.append('<div class="injected-spinner updraftcentral_spinner"></div>');

				check_site_creds(site_rows.get_items()).then(function(response) {
					up_status_container.find('span#load-site-creds-msg').remove();
					up_status_container.find('div.injected-spinner').remove();
					show_pre_install_message(up, file);
				});
			} else {
				// We normally won't reach this line since if no sites have been selected
				// using the filter box it will automatically default to the currently manage site where the
				// uploader interface is shown. We just add this line here just in case.
				reset_uploader(up, file);
			}

			// Hold process until user confirms option
			return false;
		});

		// Checks upload status. Primarily for files that were uploading in chunks.
		uploader.bind('ChunkUploaded', function(up, file, response) {
			// N.B. Uncomment below line if you want to track the number of bytes uploaded for every
			// chunk request. Good for debugging purposes. I just added it just in case.
			// console.log("Chunk uploaded.", result.offset, "of", result.total, "bytes.");

			// Checking chunk result for error. If error is found then stop the upload process.
			var result = JSON.parse(response.response);
			var previous_status = file.status,
				site_description, resp,
				errors = '', error_count = 0,
				error_display_limit = 3, message;

			if (result.hasOwnProperty('e') && result.e) {
				if (UpdraftCentral.get_debug_level() > 0) {
					console.log(udclion.error+': '+udclion[module].install_zip_heading.toLowerCase()+' ('+file.name+'); '+udclion.message+' ('+result.e+');');
				}
				UpdraftCentral_Library.dialog.alert('<h2>'+udclion[module].install_zip_heading+'</h2><p>'+vsprintf(udclion[module].upload_failed, [file.name, '<br/>', result.e])+'</p>');
				
				up.removeFile(file);
				if (plupload.UPLOADING == previous_status && plupload.STARTED == up.state) {
					up.stop();
					up.start();
				}
			} else {
				$.each(result, function(index, data) {
					site_description = data.site_description;
					resp = data.response;
	
					if ((resp.hasOwnProperty('error') && resp.error) || (resp.hasOwnProperty('responsetype') && 'error' == resp.responsetype)) {
						message = udclion[module].upload_cutoff;
						if (resp.hasOwnProperty('message') && resp.message) {
							message = resp.message;
						} else if (resp.hasOwnProperty('data') && resp.data) {
							message = resp.data;
						}

						if (UpdraftCentral.get_debug_level() > 0) {
							console.log(udclion.error+': '+udclion[module].install_zip_heading.toLowerCase()+' ('+file.name+'); '+site_description+': '+message);
						}

						if (error_display_limit > error_count) {
							errors += site_description+': '+message+'<br/>';
							error_count++;
						}
	
						previous_status = file.status;
						up.removeFile(file);
		
						if (plupload.UPLOADING == previous_status && plupload.STARTED == up.state) {
							up.stop();
							up.start();
						}
					}
				});

				if (error_count > 0) {
					UpdraftCentral_Library.dialog.alert('<h2>'+udclion[module].install_zip_heading+'</h2><p>'+vsprintf(udclion[module].upload_failed, [file.name, '<br/>', errors])+'</p>');
				}
			}
		});

		// A file was uploaded. Upload process has completed.
		uploader.bind('FileUploaded', function(up, file, response) {
			var $location = UpdraftCentral.$site_row.find('.updraftcentral_row_extracontents');
			UpdraftCentral.done_loading($location);

			if (response.status == '200') {
				try {
					var result = JSON.parse(response.response);
					var success_count = 0,
						installed_name = '',
						errors = '',
						error_count = 0,
						error_display_limit = 3;

					if (result.hasOwnProperty('e') && result.e) {
						if (UpdraftCentral.get_debug_level() > 0) {
							console.log(udclion.error+': '+udclion[module].install_zip_heading.toLowerCase()+' ('+file.name+'); '+udclion.message+' ('+result.e+');');
						}
						errors = result.e;
					} else {
						var site_description, resp, error_message, data;
						$.each(result, function(index, data) {
							site_description = data.site_description;
							resp = data.response;

							if (resp.hasOwnProperty('installed') && resp.installed) {
									installed_name = resp.installed_data.Name;
									success_count++;
							} else {
								if (resp.hasOwnProperty('message') && resp.message) {
									if (UpdraftCentral.get_debug_level() > 0) {
										console.log(udclion.error+': '+udclion[module].install_zip_heading.toLowerCase()+' ('+file.name+'); '+site_description+': '+resp.message);
									}
									error_message = resp.message;
								} else {
									error_message = sprintf(udclion[module].general_error, JSON.stringify(resp));
									if (resp.hasOwnProperty('error') && resp.error && resp.hasOwnProperty('code') && resp.code) {
										data = resp.data;
	
										if (data && data.hasOwnProperty('message') && data.message) {
											error_message = data.message;
										} else if ('string' === typeof data && data.length) {
											error_message = data;
										} else if ('undefined' !== typeof udclion[module][resp.code]) {
											error_message = udclion[module][resp.code];
										} else {
											error_message = sprintf(udclion[module].general_error, resp.code);
										}
									}
									
									if (UpdraftCentral.get_debug_level() > 0) {
										console.log(udclion.error+': '+udclion[module].install_zip_heading.toLowerCase()+' ('+file.name+'); '+site_description+': '+error_message);
									}
								}

								if (error_display_limit > error_count) {
									errors += site_description+': '+error_message+'<br/>';
									error_count++;
								}
							}
						});
					}

					if (success_count !== result.length) {
						UpdraftCentral_Library.dialog.alert('<h2>'+udclion[module].install_zip_heading+'</h2><p>'+vsprintf(udclion[module].upload_failed, [file.name, '<br/>', errors])+'</p>');
					} else {
						var settings = up.settings.multipart_params;
						var action_message = udclion[module].installed;

						if (settings.hasOwnProperty('activate') && settings.activate) {
							action_message = udclion[module].installed_activated;
						}
					
						var message = vsprintf(udclion[module].install_success_message, [action_message, '"'+installed_name+'"']);
						UpdraftCentral_Library.dialog.alert('<h2>'+udclion[module].install_zip_heading+'</h2><p>'+message+'</p>');
					}

					reset_uploader(up, file);
				} catch (err) {
					// Log error and response objects in console. Helps in debugging on what went wrong.
					if (UpdraftCentral.get_debug_level() > 0) {
						console.log(udclion.error+': '+udclion[module].install_zip_heading.toLowerCase()+' ('+file.name+'); '+site_description+' - '+udclion[module].jsonnotunderstood);
						console.log(err);
						console.log(response);
					}
					reset_uploader(up, file);
				}

			} else {
				// Log response objects in console. Helps in debugging on what went wrong.
				if (UpdraftCentral.get_debug_level() > 0) {
					console.log(udclion.error+': '+udclion[module].install_zip_heading.toLowerCase()+' ('+file.name+'); '+site_description+' ('+udclion[module].details_follows+'):');
					console.log(response);
				}
				reset_uploader(up, file);
			}
		});
	}

	/**
	 * Initilizes the collapse/expand menu tooltips
	 *
	 * @returns {void}
	 */
	this.init_tooltip = function() {
		var collapse_icon = $('#updraft-central-sidebar-button span.arrow-left');
		collapse_icon.data('animation', false);
		collapse_icon.tooltip({
			container: $('#updraftcentral_dashboard').get(0),
			trigger: 'hover',
			placement: 'top',
			title: udclion.collapse_menu,
			boundary: 'viewport'
		});

		var expand_icon = $('#updraft-central-sidebar-button span.arrow-right');
		expand_icon.data('animation', false);
		expand_icon.tooltip({
			container: $('#updraftcentral_dashboard').get(0),
			trigger: 'hover',
			placement: 'top',
			title: udclion.expand_menu,
			boundary: 'viewport'
		});

		$('[data-toggle="tooltip"]').tooltip({
			container: $('#updraftcentral_dashboard').get(0),
			trigger: 'hover',
			placement: 'top',
			boundary: 'viewport'
		});

		// Disable initially since the sidebar menu tooltips will only be available if the menus are
		// actually collapsed except for the expand/collapse button tooltip.
		$('[data-toggle="tooltip"]').tooltip('disable');
	}

	/**
	 * Fetches metadata from the wordpress.org API (https://codex.wordpress.org/WordPress.org_API), or via our local cache
	 *
	 * @param {string} type - either 'plugin' or 'theme' (otherwise, results are undefined)
	 * @param {string} slug - the plugin or theme slug (i.e. not the file path)
	 * @param {*} passback - this gets passed back to the callback function
	 * @param {metadata_callback} callback - in the event of a successful retrieval, this function is called with the results
	 * @return {void}
	 */
	this.get_wporg_metadata = function(type, slug, passback, callback) {
		var wp_org_plugin_json_api = 'https://api.wordpress.org/plugins/info/1.1/';
		var wp_org_theme_json_api = 'https://api.wordpress.org/themes/info/1.1/';

		// Cache for 10 minutes
		var from_storage = UpdraftCentral.storage_get('wporg_api_'+type+'_'+slug, 600);
		
		if (from_storage && from_storage.hasOwnProperty('name')) {
			callback.call(this, from_storage, passback);
			return;
		}
		
		var api_url = wp_org_plugin_json_api;
		if ('theme' == type) {
			api_url = wp_org_theme_json_api;
		}

		var fields = {
			short_description: true,
			icons: true
		}
		if ('theme' === type) {
			fields = {
				description: true,
				sections: true,
				rating: true,
				ratings: true,
				downloaded: true,
				downloadlink: true,
				last_updated: true,
				screenshot_url: true,
				parent: true,
			}
		}
		
		jQuery.getJSON(api_url, {
			action: type+'_information',
			request: {
				slug: slug,
				fields: fields
			}
		}, function(data, status) {
			if ('success' == status) {
				UpdraftCentral.storage_set('wporg_api_'+type+'_'+slug, data, true);
				callback.call(this, data, passback);
			}
		});
	}

	/**
	 * Searches wordpress.org for the given keyword
	 *
	 * @param {string}   type     - either 'plugin' or 'theme' (otherwise, results are undefined)
	 * @param {string}   keyword  - the string or keyword to search for
	 * @param {function} callback - in the event of a successful retrieval, this function is called with the results
	 * @param {integer}  page     - the current page to retrieve the items from
	 * @param {integer}  limit    - the number of items to return after the search
	 *
	 * @return {void}
	 */
	this.search_wporg = function(type, keyword, callback, page, limit) {
		var api_url = 'https://api.wordpress.org/'+type+'s/info/1.1/';
		var fields = {
			sections: false,
			added: false,
			tags: false,
			compatibility: false,
			donate_link: false,
			icons: true
		}

		if ('theme' === type) {
			fields = {
				description: true,
				sections: false,
				rating: true,
				ratings: true,
				downloaded: true,
				downloadlink: true,
				last_updated: true,
				screenshot_url: true,
				parent: true
			}
		}

		limit = 'undefined' !== typeof limit ? limit : 10;
		page = 'undefined' !== typeof page ? page : 1;

		jQuery.getJSON(api_url, {
			action: 'query_'+type+'s',
			request: {
				search: keyword,
				per_page: limit,
				page: page,
				fields: fields
			}
		}, function(data, status) {
			if ('success' == status) {
				callback.call(this, data);
			}
		});
	}

	/**
	 * Saves user defined timeout
	 *
	 * @param {integer} timeout   The value to set as timeout (in seconds)
	 * @param {object}  $location A jquery object representing the container where the spinner will be displayed
	 *
	 * @return {object} jQuery promise object
	 */
	this.save_timeout = function(timeout, $location) {
		var deferred = $.Deferred();

		UpdraftCentral.send_ajax('save_timeout', { timeout: timeout }, null, 'via_mothership_encrypting', $location, function(resp, code, error_code) {
			if ('ok' === code) {
				if (resp.hasOwnProperty('message')) {
					if ('success' === resp.message) {
						deferred.resolve();
					} else {
						deferred.reject();
					}
				}
			}
		});

		return deferred.promise();
	}

	/**
	 * Saves updraftcentral user defined settings
	 *
	 * @param {object} settings  The settings to save.
	 * @param {object} $location A jquery object representing the container where the spinner will be displayed
	 *
	 * @return {object} jQuery promise object
	 */
	this.save_settings = function(settings, $location) {
		var deferred = $.Deferred();

		UpdraftCentral.send_ajax('save_settings', settings, null, 'via_mothership_encrypting', $location, function(resp, code, error_code) {
			if ('ok' === code) {
				if (resp.hasOwnProperty('message')) {
					if ('success' === resp.message) {
						deferred.resolve();
					} else {
						deferred.reject();
					}
				}
			}
		});

		return deferred.promise();
	}

	/**
	 * Checks whether the user has "write" privilege to the remote website's directory. If not, then we'll ask the user
	 * for their FTP Credentials to successfully install the desired entity (e.g plugin, theme or WP core).
	 *
	 * N.B. Calling this API will automatically display the request credentials dialog where the user
	 * is asked to provide his FTP credentials. So, there's no longer need to create or load the form manually.
	 *
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 * @param {String} directory Directory entity that we need to check if credentials is required (e.g 'plugins', 'themes' or 'core')
	 * @return {object} - A jQuery promise object
	 */
	this.maybe_ask_credentials = function($site_row, directory) {
		var deferred = jQuery.Deferred();
		var credentials = new UpdraftCentral_Credentials();
		var site = new UpdraftCentral_Site($site_row);

		credentials.load_credentials(site).then(function(response) {
			var requests = response.request_filesystem_credentials;

			if ('undefined' !== typeof requests[directory] && UpdraftCentral_Library.parseBool(requests[directory])) {
				credentials.get_credentials(site).then(function(response) {
					deferred.resolve({
						site: site,
						credentials_required: true,
						credentials: response.site_credentials,
						store_credentials: response.save_credentials_in_browser
					});
				}).fail(function(result) {
					deferred.reject(result);
				});
			} else {
				deferred.resolve({
					site: site,
					credentials_required: false
				});
			}
		}).fail(function(result) {
			deferred.reject(result);
		});

		return deferred.promise();
	}

	/**
	 * Checks whether the plugin is installed and activated on the remote website
	 *
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 * @param {String} plugin_name The name of the plugin to check
	 * @param {String} plugin_slug Optional. The slug of the plugin to check in case the name check fails
	 * @return {Object} A jQuery promise
	 */
	this.is_plugin_active = function($site_row, plugin_name, plugin_slug) {
		var deferred = $.Deferred();
		var param = {
			plugin: plugin_name
		}

		if ('undefined' !== typeof plugin_slug && plugin_slug) {
			param.slug = plugin_slug;
		}

		UpdraftCentral.send_site_rpc('plugin.is_plugin_installed', param, $site_row, function(response, code, error_code) {
			if ('ok' === code && !response.data.error) {
				deferred.resolve(response.data);
			} else {
				deferred.reject(response);
			}
		});

		return deferred.promise();
	}

	/**
	 * Activates the plugin on the remote website
	 *
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 * @param {String} plugin_name The name of the plugin to activate
	 * @param {String} plugin_slug The slug of the plugin to activate in case the name check fails
	 * @return {Object} A jQuery promise
	 */
	this.activate_plugin = function($site_row, plugin_name, plugin_slug) {
		var deferred = $.Deferred();
		var param = {
			plugin: plugin_name
		}

		if ('undefined' !== typeof plugin_slug && plugin_slug) {
			param.slug = plugin_slug;
		}

		UpdraftCentral.send_site_rpc('plugin.activate_plugin', param, $site_row, function(response, code, error_code) {
			if ('ok' === code && !response.data.error) {
				deferred.resolve(response.data);
			} else {
				deferred.reject(response);
			}
		});

		return deferred.promise();
	}

	/**
	 * Download, install and activates the plugin on the remote website
	 *
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 * @param {String} plugin_name The name of the plugin to install and activate
	 * @param {String} plugin_slug The slug of the plugin to install and activate
	 * @return {Object} A jQuery promise
	 */
	this.install_activate_plugin = function($site_row, plugin_name, plugin_slug) {
		var deferred = $.Deferred();

		UpdraftCentral.maybe_ask_credentials($site_row, 'plugins').then(function(response) {

			// Store newly entered credentials to the browser if the user opted to.
			if (response.credentials_required && response.store_credentials) {
				UpdraftCentral.storage_set('filesystem_credentials_'+response.site.site_hash, response.credentials, true);
			}

			var param = {
				plugin: plugin_name,
				slug: plugin_slug,
				filesystem_credentials: response.credentials
			}

			UpdraftCentral.send_site_rpc('plugin.install_activate_plugin', param, $site_row, function(response, code, error_code) {
				if ('ok' === code && !response.data.error) {
					deferred.resolve(response.data);
				} else {
					deferred.reject(response);
				}
			});

		}).fail(function(response) {
			deferred.reject(response);
		});

		return deferred.promise();
	}

	/**
	 * Shows or hides a module's sub menu
	 *
	 * @param {Object} elem   A jQuery object representing the collapsible icon.
	 * @param {Object} menu   A jQuery object representing the menu to display.
	 * @param {Object} parent The parent object/element of the menu.
	 *
	 * @return void
	 */
	function toggle_submenu(elem, menu, parent) {
		var icon = elem.find('.updraft-sub-menu-arrow-left');
		if (icon.is(':visible')) {
			icon.hide();
			elem.find('.updraft-sub-menu-arrow-down').show();
			menu.appendTo(parent).show();
		} else {
			elem.find('.updraft-sub-menu-arrow-down').hide();
			icon.show();
			parent.find('.updraft-sub-menu').appendTo(elem).hide();
		}
	}

	/**
	 * Registers listener for ajax processing events
	 *
	 * @returns {void}
	 */
	this.init_process_listener = function() {

		$('a.updraft-sub-menu-link').on('click', function(event) {
			var data_selector = $(this).attr('data-selector');
			var data_module = $(this).attr('data-module');
			var module = $('#updraft-menu-item-'+data_module);
			var button = $(data_selector);

			if (module.length) module.trigger('click');
			if (button.length) button.trigger('click');
		});

		$('.updraft-sub-menu-icon').on('click', function(event) {
			event.stopPropagation();
			var menu = $(this).find('.updraft-sub-menu');
			var parent = $(this).closest('.updraft-menu-item-container');
			var button = parent.find('button.updraft-menu-item');

			// Hide any opened menu to avoid any unnecessary vertical space before
			// opening a new menu.
			$('.updraft-menu-item-container > .updraft-sub-menu').each(function() {
				var other_menu = $(this);
				var other_parent = $(this).closest('.updraft-menu-item-container');
				var elem = other_parent.find('.updraft-sub-menu-icon');
				var other_button = other_parent.find('button.updraft-menu-item');

				if (button.attr('id') !== other_button.attr('id')) {
					toggle_submenu(elem, other_menu, other_parent);
				}
			});

			toggle_submenu($(this), menu, parent);
		});

		$(document).ajaxStop(function() {
			if (0 === $.active) {
				self.ajax_request_processing = false;
				self.uc_action_data = [];
				self.event_trigger.clear();
				if (updraftcentral_debug_level > 0) {
					console.log('init_process_listener (ajaxStop): ajax_request_processing=false, uc_action_data=[], event_trigger=cleared; (reset flag/vars for in-progress blocking).');
				}
			}
		});

		$(document).ajaxSend(function(event, request, settings) {
			self.ajax_request_processing = true;
			if (updraftcentral_debug_level > 0) {
				console.log('init_process_listener (ajaxSend): ajax_request_processing=true; (setting flag for in-progress blocking).');
			}
		});

		$('#updraftcentral_dashboard').on('updraftcentral_dialog_opened', function(event) {
			if ($.fullscreen.isFullScreen()) {
				var wrapper = $('#updraftcentral_dashboard_wrapper.updraft-fullscreen');
				var dashboard_fullscreen = wrapper.find('#updraftcentral_dashboard');
				if (dashboard_fullscreen.length) {
					var backdrop = dashboard_fullscreen.find('div.modal-backdrop');
					if (0 === backdrop.length) {
						$(document.body).find('.modal-backdrop.show').appendTo(dashboard_fullscreen);
					}
				}
			}
		});

		$('#updraftcentral_dashboard').on('updraftcentral_dialog_closed', function(event) {
			if ($.fullscreen.isFullScreen()) {
				var wrapper = $('#updraftcentral_dashboard_wrapper.updraft-fullscreen');
				var bootbox_modal = wrapper.find('#updraftcentral_dashboard div.bootbox.modal.show');
				var modal = wrapper.find('#updraftcentral_dashboard #updraftcentral_modal_dialog.modal.show');
				if (0 === bootbox_modal.length && 0 === modal.length) {
					var backdrop = wrapper.find('#updraftcentral_dashboard div.modal-backdrop.show');
					if (backdrop.length) backdrop.remove();
				}
			}
		});

		$(window).on('resize', function() {
			var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
			if (w <= mobile_width) {
				var init_width = $("#updraft-central-navigation-sidebar").css('width');
				var init_left = $("#updraft-central-navigation-sidebar").position().left;

				if (0 <= init_left) {
					$('#updraft-mobile-menu').trigger('click');
				}

				if (default_collapse_width+'px' === init_width) {
					$('#updraft-central-sidebar-button').trigger('click');
				}

				if ($("#updraft-central-navigation-sidebar").hasClass('active')) {
					$('#updraft-central-content').prepend('<div class="mobile-menu-backdrop"></div>');
				}

				$('#updraftcentral_dashboard').on('click', function(event) {
					if ('updraft-central-navigation-sidebar' === $(event.target).attr('id') || $(event.target).hasClass('updraft-mobile-menu'))
						return;

					if ($("#updraft-central-navigation-sidebar").hasClass('active')) {
						$("#updraft-central-navigation-sidebar").toggleClass("active");
						$('#updraft-central-content > .mobile-menu-backdrop').remove();
					}
				});

			} else {
				$("#updraft-central-navigation-sidebar").removeClass("active");
				$('#updraft-central-content > .mobile-menu-backdrop').remove();
			}
		});

		// Trigger the resize function initially to do the routine that handles the visibility
		// of the sidebar navigation elements
		$(window).trigger('resize');
	}

	/**
	 * Saves user-defined keyboard shortcut entered by the user
	 *
	 * @params {$shortcut_name} The name of the shortcut to be overriden
	 * @params {$shortcut_key} The new shortcut key entered by the user
	 * @returns {object} jQuery promise object
	 */
	this.save_shortcut = function (shortcut_name, shortcut_key) {
		var deferred = $.Deferred();

		UpdraftCentral.send_ajax('shortcuts', { name: shortcut_name, key: shortcut_key }, null, 'via_mothership_encrypting', null, function(resp, code, error_code) {
			if ('ok' === code) {
				if (resp.hasOwnProperty('message')) {
					if ('success' === resp.message) {
						deferred.resolve();
					} else {
						deferred.reject();
					}
				}
			}
		});

		return deferred.promise();
	}

	/**
	 * Loads user-defined keyboard shortcuts
	 *
	 * @returns {object} jQuery promise object
	 */
	this.load_shortcuts = function () {
		var deferred = $.Deferred();

		UpdraftCentral.send_ajax('shortcuts', {}, null, 'via_mothership_encrypting', null, function(resp, code, error_code) {
			if ('ok' === code) {
				if (resp.hasOwnProperty('shortcuts')) {
					deferred.resolve(resp.shortcuts);
				}
			}
		});

		return deferred.promise();
	}

	/**
	 * Add sortable feature to div "updraftcentral_dashboard_existingsites"
	 *
	 * Send a final site order as an indexed array of id's in sorted order to manage_site_order in backend.
	 *
	 * returns 'failure message as response'
	 */
	this.site_order = function () {
		$("#updraftcentral_dashboard_existingsites").sortable({
			axis: 'y',

			// handle the start event (end of drag/sort)
			start: function (event, ui) {
				// close menu
				$(".updraft_site_actions").removeClass("open");
			},
			// handle the stop event (end of drag/sort)
			stop: function (event, ui) {
				site_order_array = $(this).sortable("toArray",{attribute: "data-site_id"});
				UpdraftCentral.send_ajax('manage_site_order', {site_order: site_order_array}, null, 'via_mothership_encrypting', null, function(resp, code, error_code) {

					if ('ok' == code) {
						if (resp.hasOwnProperty('message')) {
							// only need to trap fail as success and nochange require no action
							if (resp.message === "fail" ) {
								UpdraftCentral_Library.dialog.alert(udclion.error_saving_site_order);
							}
						}
					} else {
						console.log("Expected site order data not found:");
						console.log(resp);
					}
				});
			}
		});
	}
	this.site_order();

	/**
	 * WordPress is sending back this format '2018-12-01 7:30p' in terms of datetime format and dayJS
	 * seems to have a problem when parsing WordPress's 12 hour datetime format, thus, we need to make
	 * sure to convert it to a 24 hour format before passing to dayjs for processing.
	 *
	 * @param {string} datetime The string to convert
	 *
	 * @return {string}
	 */
	this.convertTo24HourFormat = function(datetime) {
		var dt = datetime.split(' ');
		if ('undefined' !== typeof dt[1]) {
			var time = dt[1].split(':');
			var hours = parseInt(time[0]);
			var minutes = parseInt(time[1]);
			var AMPM = time[1].match(/\d{1,}(.*)/)[1];

			if (0 !== AMPM.length) {
				AMPM = (1 === AMPM.length) ? AMPM.toLowerCase()+'m' : AMPM.toLowerCase();

				if (12 == hours && 'am' == AMPM && (0 <= minutes && 59 >= minutes)) hours=hours-12;
				if ((1 <= hours && 11 >= hours) && 'pm' == AMPM && (0 <= minutes && 59 >= minutes)) hours=hours+12;
			}

			hours = (hours < 10) ? '0'+hours.toString() : hours.toString();
			minutes = (minutes < 10) ? '0'+minutes.toString() : minutes.toString();

			return dt[0]+' '+hours+':'+minutes;
		}

		return dt[0];
	}

	/**
	 * A Handlebarsjs helper function that sanitizes html content using the UpdraftCentral_Library.sanitize_html
	 *
	 * @param {string} content The content to santize
	 *
	 * @return {string}
	 */
	Handlebars.registerHelper('sanitize_html', function(content) {
		return new Handlebars.SafeString(UpdraftCentral_Library.sanitize_html(content));
	});

	/**
	 * A Handlebarsjs helper function that is used to format a date string to a specific time format
	 *
	 * @param {mixed} date_str    The string to format
	 * @param {mixed} date_format The format of the intended output
	 *
	 * @return {string}
	 */
	Handlebars.registerHelper('timeago', function (date_str, date_format) {
		if ('undefined' === typeof date_str || 'undefined' === typeof date_format) return '';

		if ('string' !== typeof date_format) {
			date_format = 'YYYY-MM-DD HH:mm';
		}

		dayjs.extend(dayjs_plugin_relativeTime);
		date_str = UpdraftCentral.convertTo24HourFormat(date_str);

		return new Handlebars.SafeString(dayjs(date_str, date_format).fromNow());
	});

	/**
	 * A Handlebarsjs helper function that is used to shorten a long text, possibly
	 * with multiple paragraphs (e.g. descriptions, narratives, etc.) by showing just the first
	 * two sentences whenever applicable
	 *
	 * @param {string} value The string to shorten
	 *
	 * @return {string}
	 */
	Handlebars.registerHelper('shorten', function (value) {
		if ('undefined' === typeof value) return '';

		var temp = value.split('.');
		var shorter_value = temp[0];

		// Adding the second sentence wouldn't hurt, in case the first sentence is too short.
		if (shorter_value.length < 150 && 'undefined' !== typeof temp[1]) shorter_value += '. ' + temp[1];

		return new Handlebars.SafeString(shorter_value + '.');
	});

	/**
	 * A Handlebarsjs helper function that is used to remove all sorts of unwanted characters
	 *
	 * @param {mixed} value The value to normalize
	 *
	 * @return {string}
	 */
	Handlebars.registerHelper('normalize', function (value) {
		if ('undefined' === typeof value) return '';

		value = value.replace(/&#(\d+);/g, function(match, dec) {
			return String.fromCharCode(dec);
		}).replace(/&amp;/g, '&');

		return new Handlebars.SafeString(value);
	});

	/**
	 * A Handlebarsjs helper function that is used to format a number string based
	 * on the current locale
	 *
	 * @param {mixed} value The string to convert
	 *
	 * @return {string}
	 */
	Handlebars.registerHelper('toLocale', function (value) {
		if ('undefined' === typeof value) return '';

		return new Handlebars.SafeString(value.toLocaleString());
	});

	/**
	 * A Handlebarsjs helper function that is used to generate a star filled ratings that
	 * is equivalent to wordpress.org's star (rating) system
	 *
	 * @param {mixed} rating         The current rating in number
	 * @param {mixed} number_ratings The rating domain for each star
	 *
	 * @return {string}
	 */
	Handlebars.registerHelper('render_star', function (rating, number_ratings) {
		if ('undefined' === typeof rating || 'undefined' === typeof number_ratings) return '';

		var rating = parseInt(rating);
		var divisor = 20;	// max rating in WordPress is 100, thus we divide with 20 to get the 5 star rating domain

		var result = rating / divisor;
		var temp = result.toString().split('.');
		var whole = parseInt(temp[0]);
		var remainder = ('undefined' !== typeof temp[1]) ? parseInt(temp[1]) : 0;

		var star = '';
		var used = false;
		for (var i=1; i<=5; i++) {
			if (i <= whole) {
				star += '<span class="dashicons dashicons-star-filled"></span>';
			} else if (0 !== remainder && !used) {
				if (remainder >= 8) {
					star += '<span class="dashicons dashicons-star-filled"></span>';
				} else {
					if (remainder <= 3) {
						star += '<span class="dashicons dashicons-star-empty"></span>';
					} else {
						star += '<span class="dashicons dashicons-star-half"></span>';
					}
				}
				used = true;
			} else {
				star += '<span class="dashicons dashicons-star-empty"></span>';
			}
		}

		return new Handlebars.SafeString(star+' ('+number_ratings.toLocaleString()+')');
	});

	/**
	 * A Handlebarsjs helper function that is used to invalidate all html tags
	 * by getting the plain text version of the content
	 *
	 * @param {mixed} html The content to filter
	 *
	 * @return {string}
	 */
	Handlebars.registerHelper('strip_tags', function (html) {
		if ('undefined' === typeof html || 'string' !== typeof html) return '';

		var temp = document.createElement("DIV");
		temp.innerHTML = html;

		return new Handlebars.SafeString(temp.innerText);
	});

	/**
	 * A Handlebarsjs helper function that is used to execute sprintf functionalities
	 * in handlerbarsjs template
	 *
	 * @return {string}
	 */
	Handlebars.registerHelper('sprintf', function () {
		var text = '';
		if ('function' === typeof sprintf && 'undefined' !== typeof arguments) {
			var args = [].slice.call(arguments);
			text = sprintf.apply(null, args);
		}

		return new Handlebars.SafeString(text);
	});

	/**
	 * A Handlebarsjs helper function that is used to compare
	 * two values if they are equal. Please refer to the example below.
	 * Assuming "comment_status" contains the value of "spam".
	 *
	 * @param {mixed} a The first value to compare
	 * @param {mixed} b The second value to compare
	 *
	 * @example
	 * // returns "<span>I am spam!</span>", otherwise "<span>I am not a spam!</span>"
	 * {{#ifeq "spam" comment_status}}
	 *      <span>I am spam!</span>
	 * {{else}}
	 *      <span>I am not a spam!</span>
	 * {{/ifeq}}
	 *
	 * @return {string}
	*/
	Handlebars.registerHelper('ifeq', function (a, b, opts) {
		if ('string' !== typeof a && 'undefined' !== typeof a && null !== a) a = a.toString();
		if ('string' !== typeof b && 'undefined' !== typeof b && null !== b) b = b.toString();
		if (a === b) {
			return opts.fn(this);
		} else {
			return opts.inverse(this);
		}
	});
	
	/**
	 * A Handlebarsjs helper function that is used to compare
	 * two values if they are not equal. Please refer to the example below.
	 * Assuming "user_id" contains the value of "123".
	 *
	 * @param {mixed} a The first value to compare
	 * @param {mixed} b The second value to compare
	 *
	 * @example returns "<span>Valid user!</span>", otherwise "<span>Invalid user!</span>" {{#ifneq user_id 0}} <span>Valid user!</span> {{else}} <span>Invalid user!</span> {{/ifneq}}
	 *
	 * @return {string}
	 */
	Handlebars.registerHelper('ifneq', function (a, b, opts) {
		if (typeof a !== 'string') a = a.toString();
		if (typeof b !== 'string') b = b.toString();
		if (a !== b) {
			return opts.fn(this);
		} else {
			return opts.inverse(this);
		}
	});
	
	/**
	 * A Handlebarsjs helper function that is used to compare two values
	 * if they are equal. Specifically use to render a "selected" or "checked"
	 * attribute to a dropdown option or checkbox element. Please refer to the example below.
	 * Assuming "default_pingback_flag" contains the value of "1".
	 *
	 * @param {mixed} a The first value to compare
	 * @param {mixed} b The second value to compare
	 * @param {string} attr The attribute to render
	 *
	 * @example returns 'checked="checked"', otherwise "" <input name="default_pingback_flag" type="checkbox" value="1" {{ifset default_pingback_flag 1 'checked'}}>
	 *
	 * @return {string}
	 */
	Handlebars.registerHelper('ifset', function (a, b, attr) {
		if (typeof a !== 'string') a = a.toString();
		if (typeof b !== 'string') b = b.toString();
		if (a === b) {
			return new Handlebars.SafeString(attr + '="' + attr + '"');
		} else {
			return '';
		}
	});

	/**
	 * A Handlebarsjs helper function that is used to check if a certain
	 * value is empty, if so then add the specified attribute(s).
	 *
	 * @param {mixed} a The value to check
	 * @param {string} attrs The attribute(s) to render
	 *
	 * @example returns the attached attribute(s) 'disabled="disabled" data-unavailable="1"', otherwise "" <input type="checkbox" name="uc_updates_check_item" value="1" {{ifempty update.plugin 'disabled'}}>
	 *
	 * @return {string}
	 */
	Handlebars.registerHelper('ifempty', function (a, attrs) {
		if ('undefined' === typeof a || !a || !a.length) {
			return new Handlebars.SafeString(attrs);
		} else {
			return '';
		}
	});

	/**
	 * Set the current site row
	 *
	 * N.B. - primarily used for mass updates, needed by the automatic backup process but
	 *		  can always be used for whatever purpose it may serve.
	 *
	 * @param {Object} $site_row - A jQuery object representing the site row of the currently
	 *						  	   process site.
	 * @returns {void}
	 */
	this.set_current_site_row = function($site_row) {
		UpdraftCentral.$site_row = $site_row;
	}

	/**
	 * Registers an event handler for a particular event
	 *
	 * N.B. - Ensures that we don't register the same event handler twice
	 *		  by unbinding the same event attached to the selector/element.
	 *
	 * @param {string} event - A string representation of the event to bind (e.g. 'click', 'change', etc.).
	 * @param {string} selector - Any valid jQuery selector where you want to bound the event.
	 * @param {function} callback - A callback function to trigger when the event is raised on the given selector/element.
	 * @returns {void}
	 */
	this.register_event_handler = function(event, selector, callback) {
		jQuery(document).off(event, selector).on(event, selector, function(e) {
			// Check and verify that a process is currently not running before
			// executing the below code to prevent from abruptly aborting the current process
			// which may lead to JS errors or/and inconsistency of information displayed to the user
			if (self.check_processing_state(e)) return;

			var params = [];
			if ('undefined' !== typeof callback.arguments && callback.arguments && callback.arguments.length) params = callback.arguments;

			callback.apply(this, params);
		});
	}
	
	/**
	 * Sets an area to a loading style
	 *
	 * @param {Object} $container - the jQuery object of the area to be set as loading
	 * @returns {void}
	 */
	this.set_loading = function ($container) {
		$container.css('opacity', '0.3');

		// Disable elements while process is on-going
		UpdraftCentral_Library.disable_actions();

		// If we don't have a spinner visible while loading then we
		// append one for the current process.
		if ($('.updraftcentral_spinner').not(':visible')) {
			if (!$('.injected-spinner.updraftcentral_spinner').length) {
				$('#updraftcentral_dashboard').append('<div class="injected-spinner updraftcentral_spinner"></div>');
			}
		}
	}

	/**
	 * Removes the loading style from an area
	 *
	 * @param {Object} $container - the jQuery object of the area to be set as loading
	 * @param {string} html - a string of html to place into the finished loaded area
	 * @returns {Object} a jQuery promsise with The response from the server
	 */
	this.done_loading = function ($container, html) {
		var deferred = jQuery.Deferred();
		$container.css('opacity', '1.0');

		// Remove our injected spinner after the process has been completed.
		if ($('.injected-spinner.updraftcentral_spinner').length) {
			$('.injected-spinner.updraftcentral_spinner').remove();
		}

		// Restore or enable back elements when process is complete
		UpdraftCentral_Library.enable_actions();

		if (html) {
			$container.slideUp(500, function () {
				$container.html(html);
				deferred.resolve();
			}).slideDown(500);
		} else {
			deferred.resolve();
		}

		return deferred.promise();
	}
	

	/**
	 * Set the debugging level
	 *
	 * @param {number} debug_level - debugging level, controlling how much console output there will be. The higher the value, the more output. Generally only 0 (minimal), 1 (some), 2 (very much) and 3 (even more) are useful levels
	 * @returns {void}
	 */
	this.set_debug_level = function(debug_level) {
		updraftcentral_debug_level = debug_level;
	}
	
	/**
	 * Get the current debugging level
	 *
	 * @returns {number} - the debugging level (@see set_debug_level)
	 */
	this.get_debug_level = function() {
		return parseInt(updraftcentral_debug_level);
	}

	/**
	 * Triggers the callback function for the modal's close event
	 *
	 * @param {callback|null} callback - a callback function to be called when the close button (either the "Close" or "X" button) is clicked
	 * @returns {void}
	 */
	this.initiate_modal_close_listener = function(callback) {
		// Listener for modal close and x buttons.
		$('.modal-dialog button[data-dismiss="modal"]').on('click', function() {
			if ('function' === typeof callback && callback) {
				callback.apply(null, []);

				// We'll make sure that after the callback is called we must invalidate
				// the listener since this is only applicable when the close_callback is
				// set or defined under the UpdraftCentral.open_modal.
				$('.modal-dialog button[data-dismiss="modal"]').off('click');
			}

			// Trigger dashboard-wide dialog closed event (applies to both bootbox and bootstrap modal)
			$('#updraftcentral_dashboard').trigger('updraftcentral_dialog_closed');
		});
	}
	
	/**
	 * Open a modal window with the specified contents. Modals are separate to dialogues - that is, you can have both open at once without them interfering.
	 *
	 * @param {string} title - the title to use for the modal window
	 * @param {string} body - the HTML contents to place in the modal window
	 * @param {callback|true} action_button_callback - a callback to call when the main action button is pressed; or just true to close the modal
	 * @param {string|false} [action_button_text="Go"] - text for the action button; or, if false, an indication that there should be no action button
	 * @param {callback|null} [pre_open_callback=null] - an optional callback to call immediately before opening the modal
	 * @param {boolean} [sanitize_body=true] - whether or not to call the sanitize_html() method the passed body, or not, before placing it in the modal
	 * @param {string} [extra_classes=''] - extra CSS classes for the modal dialog (e.g. modal-lg)
	 * @param {callback|null} close_callback - an optional callback to be called when the modal is closed
	 * @param {callback|null} [post_open_callback=null] - an optional callback to call immediately after opening the modal
	 * @returns {void}
	 */
	this.open_modal = function(title, body, action_button_callback, action_button_text, pre_open_callback, sanitize_body, extra_classes, close_callback, post_open_callback) {
		action_button_text = typeof action_button_text !== 'undefined' ? action_button_text : udclion.go;
		// By default, we assume that the input is potentially evil, and sanitize it
		sanitize_body = typeof sanitize_body !== 'undefined' ? sanitize_body : true;
		extra_classes = typeof extra_classes !== 'undefined' ? extra_classes : '';
		
		// Reset the modal's CSS classes
		$('#updraftcentral_modal_dialog .modal-dialog').removeClass().addClass('modal-dialog '+extra_classes);
		
		$('#updraftcentral_modal_dialog .modal-title').html(title);
		if (sanitize_body) body = UpdraftCentral_Library.sanitize_html(body);
		$('#updraftcentral_modal_dialog .modal-body').html(body);
		if (false === action_button_text) {
			$('#updraftcentral_modal_dialog button.updraft_modal_button_goahead').hide();
		} else {
			$('#updraftcentral_modal_dialog button.updraft_modal_button_goahead').html(action_button_text).show();
		}
		modal_action_callback = action_button_callback;
		if (typeof pre_open_callback !== 'undefined' && null !== pre_open_callback) pre_open_callback.call(this);
		
		// Add listener and callback handler for the modal's close buttons
		UpdraftCentral.initiate_modal_close_listener(close_callback);

		$('#updraftcentral_modal_dialog').modal();

		if ($('#updraftcentral_modal_dialog #updraftcentral_addsite_tabs').length) {
			$('#updraftcentral_addsite_tabs').tabs().addClass('ui-tabs-vertical ui-helper-clearfix');
		}

		// Trigger dashboard-wide dialog opened event (applies to both bootbox and bootstrap modal)
		$('#updraftcentral_dashboard').trigger('updraftcentral_dialog_opened');

		if ('undefined' !== typeof post_open_callback && null !== post_open_callback) post_open_callback.call(this);
	}
	
	/**
	 * Given a site row, send back a suitable HTML site description
	 *
	 * @param {Object} $site_row - the jQuery object for the row of the site
	 *
	 * @returns {string} - an HTML string describing the site
	 */
	this.get_site_heading = function($site_row) {
	
		var site_description = $site_row.data('site_description');
		var site_url = $site_row.data('site_url');
		if (site_description == site_url) { site_description = ''; }
		
		var site_heading;
		if (site_description) {
			site_heading = '<a href="'+site_url+'">'+site_description+'</a>';
		} else {
			site_heading = '<a href="'+site_url+'">'+site_url+'</a>';
		}
		
		return site_heading;
	}
	
	/**
	 * Close the modal dialog
	 *
	 * @returns {void}
	 */
	this.close_modal = function() {
		$('#updraftcentral_modal_dialog').modal('hide');

		// Trigger dialog closed event (applies to both bootbox and bootstrap modal)
		$('#updraftcentral_dashboard').trigger('updraftcentral_dialog_closed');
	}
	
	/**
	 * A jQuery callback for row click events
	 *
	 * @callable rowclickerCallback
	 * @param {string} $site_row - the jQuery row object for the site that the click was for
	 * @param {Number} site_id - the site ID for the site that the click was for
	 * @param {Object} event - the event received from jQuery
	 *
	 * @return {*} prevent_default - if anything other than (boolean)true, then event.preventDefault() is called
	 */
	
	/**
	 * De-register all row-clickers. The normal use of this is when switching tabs.
	 *
	 * @returns {void}
	 */
	function deregister_row_clickers() {
		$('#updraftcentral_dashboard_existingsites_container').off();
	}
	
	/**
	 * De-register all events on the modal. The normal use of this is when switching tabs.
	 *
	 * @returns {void}
	 */
	function deregister_modal_listeners() {
		$('#updraftcentral_modal').off();
	}
	
	/**
	 * Register click events for specified items in the UpdraftCentral site list (prevents repeating lots of jQuery boilerplate).
	 * Note that all row clickers are always deregistered upon a mode change (i.e. tab change). So, the correct place to call this function is when updraftcentral_dashboard_mode_set_(your mode) is triggered (or updraftcentral_dashboard_mode_set for all tabs).
	 *
	 * @param {string} selector - the selector to use
	 * @param {rowclickerCallback} callback - callback function that will be called upon the click event
	 * @param {boolean} [hide_other_sites=false] - if set, then the click will cause other sites in the tab to be hidden
	 * @param {string} [on_event='click'] - the event type to listen for. In the special case of 'keypress', the default event will not be prevented
	 * @returns {void}
	 */
	this.register_row_clicker = function(selector, callback, hide_other_sites, on_event) {
		on_event = typeof on_event !== 'undefined' ? on_event : 'click';
		hide_other_sites = typeof hide_other_sites !== 'undefined' ? hide_other_sites : false;
		params = {};
		$('#updraftcentral_dashboard_existingsites_container').off(on_event, '.updraftcentral_site_row '+selector).on(on_event, '.updraftcentral_site_row '+selector, params, function(event) {
			var key = UpdraftCentral_Library.md5('_key_' + $(this).get(0).className + '_' + selector);
			
			// Prevent multiple executions of the same action per request.
			// N.B. For non-ajax based action (e.g. preloaded filters, search, etc.) we bypass
			// them in this check as they don't involve any active connections
			if (self.event_trigger.exists(key) && 0 !== $.active) return;

			// Check and verify that a process is currently not running before
			// executing the below code to prevent from abruptly aborting the current process
			// which may lead to JS errors or/and inconsistency of information displayed to the user.
			//
			// N.B. The ".btn-group > button" is primarily used by the UpdraftCentral_Recorder so we
			// make sure that it doesn't get booted out from the processing state check regardless of the outcome
			// whether it returns true or false, otherwise, we won't be able to cache content successfully.
			if ('.btn-group > button' !== selector && self.check_processing_state(event)) return;

			// Add currently requested action to the event_trigger collection. We need
			// it to check for multiple execution per request later.
			self.event_trigger.add(key, 1);


			if (on_event != 'keypress') { event.preventDefault(); }
			UpdraftCentral.$site_row = $(this).closest('.updraftcentral_site_row');
			var site_id = UpdraftCentral.$site_row.data('site_id');
			if (hide_other_sites) {
				$('#updraftcentral_dashboard_existingsites .updraftcentral_site_row:not([data-site_id="'+site_id+'"]), #updraftcentral_dashboard_existingsites .updraftcentral_row_divider').slideUp();
				$('.updraftcentral_mode_actions .updraftcentral_action_choose_another_site').show();
				$("#updraftcentral_dashboard_existingsites").sortable('disable');
				$('#updraftcentral-search-area').hide();
				UpdraftCentral.$site_row.addClass('sortable-is-disabled');
			}
			callback.call(this, UpdraftCentral.$site_row, site_id, event);
		});
	}
	var register_row_clicker = this.register_row_clicker;
	
	/**
	 * Register click events for specified items in the UpdraftCentral modal (prevents repeating lots of jQuery boilerplate).
	 * Note that all modal clickers are always deregistered upon a mode change (i.e. tab change). So, the correct place to call this function is when updraftcentral_dashboard_mode_set_(your mode) is triggered (or updraftcentral_dashboard_mode_set for all tabs).
	 *
	 * @param {string} selector - the selector to use
	 * @param {rowclickerCallback} callback - callback function that will be called upon the click event
	 * @param {string} [on_event='click'] - the event type to listen for. In the special case of 'keypress', the default event will not be prevented
	 *
	 * @returns {void}
	 */
	this.register_modal_listener = function(selector, callback, on_event) {
		on_event = typeof on_event !== 'undefined' ? on_event : 'click';
		params = {};
		$('#updraftcentral_modal').off(on_event, selector).on(on_event, selector, params, function(event) {
			callback.call(this, event);
		});
	}
	
	$('#updraftcentral_modal_dialog button.updraft_modal_button_goahead').on('click', function() {
		if (true === modal_action_callback) {
			this.close_modal();
		} else {
			modal_action_callback.call(this);
		}
	});
	
	/**
	 * JQuery callback for row click events
	 *
	 * @param {Object} $listener_row - the jQuery object of the listener itself
	 * @param {Object} $site_row - the jQuery row object for the site that the click was for
	 * @param {Number} site_id - the site ID for the site that this is a listener for
	 * @param {*} [data] - the returned data from the polling operation (if it is that sort of listener)
	 *
	 * @callable listenerCallback
	 *
	 * @returns {*} - if 0 is returned, then the listener will be closed. If 1 is returned, then no more polling will be done, but the listener will not be closed. If an object with a property 'call' is returned, then this will be called. Otherwise, nothing will be done.
	 */
	
	var listener_processors = {};
	/**
	 * Register a listener callback - a callback function to be used in association with dashboard notices which poll and update
	 *
	 * @param {string} listener_type      - an identifying string, indicating the listener type
	 * @param {listenerCallback} callback - a listener callback function
	 *
	 * @see create_dashboard_listener
	 *
	 * @returns {void}
	 */
	this.register_listener_processor = function(listener_type, callback) {
		listener_processors[listener_type] = callback;
	}
	
	/**
	 * Poll all listener rows on the dashboard for activity
	 *
	 * @returns {void}
	 */
	function poll_listeners() {
		
		// var listener_calls = {};
		
		$('#updraftcentral_notice_container .updraftcentral_listener').each(function(ind) {
			var site_id = $(this).data('site_id');
			var listener_type = $(this).data('type');
			var $listener_row = this;
			var $site_row = $('#updraftcentral_dashboard_existingsites .updraftcentral_site_row[data-site_id="'+site_id+'"');
			var finished = $(this).data('finished');

			if (finished) { return; }
			
			if (updraftcentral_debug_level > 1) {
				console.log("poll_listeners(): site_id="+site_id+", listener_type="+listener_type);
			}
			
			if ($site_row.length > 0 && listener_processors.hasOwnProperty(listener_type)) {
				// if (typeof listener_calls[site_id] === 'undefined') listener_calls[site_id] = [];
				var call_this = listener_processors[listener_type].call(this, $listener_row, $site_row, site_id);
				// We could multiplex all the calls to the same site. That would involve plenty of work, but would be worth if for the efficiency - if it weren't the case that HTTP/2 takes care of this.
				// A return value of null is also supported; this means "do nothing this time (but not finished)". Allows for throttling.
				if (0 === call_this) {
					// Finish and close
					$(this).data('finished', true);
					$('#updraftcentral_dashboard_existingsites').trigger('updraftcentral_listener_finished_'+listener_type, {
						site_id: site_id,
						site_row: $site_row,
						listener_row: $listener_row,
						listener_type: listener_type
					});
					$($listener_row).clearQueue().delay(10000).slideUp('slow', function() {
						$(this).remove();
					});
				} else if (1 === call_this) {
					// Finish but don't close
					$(this).data('finished', true);
					$('#updraftcentral_dashboard_existingsites').trigger('updraftcentral_listener_finished_'+listener_type, {
						site_id: site_id,
						site_row: $site_row,
						listener_row: $listener_row,
						listener_type: listener_type
					});
				} else if (null != call_this && call_this.hasOwnProperty('call')) {
					var call_type = call_this.call;
					UpdraftCentral.send_site_rpc(call_this.call, call_this.data, $site_row, function(response, code, error_code) {
						if ('ok' == code && false !== response && response.hasOwnProperty('data')) {
							if (listener_processors.hasOwnProperty(call_type)) {
								listener_processors[call_type].call(this, $listener_row, $site_row, site_id, response.data);
							} else {
								console.log("UpdraftCentral: listener type "+call_type+" has no registered processor (dump of all registered processors follows)");
								console.log(listener_processors);
							}
						}
					});
				}
			} else if ($site_row.length > 0) {
				console.log("UpdraftCentral: listener type "+listener_type+" has no registered processor (dump of all registered processors follows)");
				console.log(listener_processors);
			} else {
				console.log("UpdraftCentral: listener for site_id="+site_id+" with type "+listener_type+": site row not found");
			}
		});
		
	}
	
	setInterval(function() {
		poll_listeners();
	}, listener_poll_interval);
	
	// A separate ud_rpc object for each site
	var ud_rpcs = [];
	
	/**
	 * Given a site (identified by its row), get the URL to send HTTP requests to. This is abstracted for convenience and maintainability if there need to be future changes.
	 *
	 * @param {Object} $site_row - the jQuery object for the site row
	 *
	 * @returns {string} - the URL
	 */
	this.get_contact_url = function($site_row) {
		// Used to be site_url; we changed to using the admin_url because when checking updates (e.g.), some sites are only registering their hooks on the back-end. Since UC is typically providing wp-admin-like functions, it makes sense to go for the back-end.
		var admin_url = $site_row.data('admin_url').replace(/\/+$/, '');
		return admin_url+'/admin-ajax.php';
	}
	
	/**
	 * Given a site (identified by its row), get a UpdraftPlus_Remote_Communications (remote communications) object for remote communications. This function does the heavy lifting of getting all the connection configuration for the site, and then passing it along to get_udrpc()
	 *
	 * @param {Object} $site_row - the jQuery object for the site row
	 * @param {string} [connection_method_config="direct"] - either 'direct_default_auth'|'direct_jquery_auth'|'direct_manual_auth' (which means to send directly to the destination) or 'via_mothership' which also sends via the PHP-back-end, but does the RSA encryption in the browser. This is not necessarily the same value as inferred from $site_row - we provide it as an extra parameter to make it possible to over-ride - e.g. for diagnostics, or where the browser mixed-content model restricts the choices.
	 *
	 * @returns {Object} - the UpdraftPlus_Remote_Communications object
	 *
	 * @uses get_udrpc
	 */
	function get_site_udrpc($site_row, connection_method_config) {
		
		var site_remote_public_key = $site_row.data('site_remote_public_key');
		var site_local_private_key = $site_row.data('site_local_private_key');
		var site_url = this.get_contact_url($site_row);
		var site_id = $site_row.data('site_id');
		var key_name_indicator = $site_row.data('key_name_indicator');
		var remote_user_id = $site_row.data('remote_user_id');
		
		if ('undefined' === typeof connection_method_config || ('direct_manual_auth' != connection_method_config && 'via_mothership' != connection_method_config && 'via_mothership_encrypting' != connection_method_config && 'direct_jquery_auth' != connection_method_config)) { connection_method_config = 'direct_default_auth'; }
		
		// The connection method ought not to be via_mothership_encrypting - such sites shouldn't be being routed into here (but via_mothership is allowed)
		if ('via_mothership_encrypting' == connection_method_config) {
			console.warn("UpdraftCentral: A site ("+site_id+", "+site_url+") routed via_mothership_encrypting was passed into get_site_udrpc");
			console.log($site_row);
		}
		
		var message_wrapper = false;
		
		if ('direct_default_auth' == connection_method_config) {
			// Normally, of course, feature detection should be used. But, it really is the case that we need to do browser-detection here, as they're working differently.
			var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
			// N.B. If they're set to use Digest authentication, this should not use manual - should switch back
			// connection_method = (is_firefox) ? 'direct_manual_auth' : 'direct_jquery_auth';
			// Actually, 'jQuery method' also works in Firefox
			connection_method = 'direct_jquery_auth';
		} else {
			connection_method = connection_method_config;
			
			// We're relying here on the fact that UDRPC object store includes the connection method in its unique ID - i.e. that this can be set on the UDRPC object, without any bad consequences.
			
			if ('via_mothership' == connection_method) {
				
				message_wrapper = {
					action: 'updraftcentral_dashboard_ajax',
					subaction: 'site_rpc',
					component: 'dashboard',
					nonce: udclion.updraftcentral_dashboard_nonce,
					site_id: site_id,
					site_rpc_preencrypted: 1
				};
				
			}
			
		}
		
		var send_cors_headers = $site_row.data('send_cors_headers');
		if ('undefined' === typeof send_cors_headers) { send_cors_headers = 1; }
		
		var auth_method = ('direct_manual_auth' == connection_method) ? 'manual' : 'jquery';
		
		var http_credentials = {};
		
		var comms_url = site_url;
		
		// When routing via the mothership, don't put in credentials, as the mothership will do that
		if ('via_mothership_encrypting' != connection_method && 'via_mothership' != connection_method) {
			var http_username = $site_row.data('http_username');
			if ('undefined' !== typeof http_username && http_username) {
				http_credentials.username = http_username;
				var http_password = $site_row.data('http_password');
				if ('undefined' !== typeof http_password) {
					http_credentials.password = http_password;
				}
			}
		} else {
			comms_url = udclion.ajaxurl;
		}
		
		if (updraftcentral_debug_level > 0) {
			console.log("UDRPC communications method: site_id="+site_id+", name_indicator="+key_name_indicator+", site_url="+site_url+", comms_url="+comms_url+", remote_user_id="+remote_user_id+", connection_method="+connection_method_config+"/"+connection_method+", send_cors_headers="+send_cors_headers);
			if (updraftcentral_debug_level > 1) {
				console.log("Remote public key follows");
				console.log(site_remote_public_key);
			}
		}
		
		var reuse_id = site_id+' '+connection_method;
		
		return get_udrpc(reuse_id, remote_user_id, key_name_indicator, site_remote_public_key, site_local_private_key, comms_url, send_cors_headers, http_credentials, auth_method, message_wrapper);
		
	}
	
	/**
	 * Given the relevant site information, get a UpdraftPlus_Remote_Communications (remote communications) object for remote communications, and also sets the current debugging level upon it.
	 *
	 * @param {number} reuse_id - A unique ID, that can be used for re-using of the result
	 * @param {number} remote_user_id - The ID of the user on the remote WP site that the keys are for
	 * @param {string} key_name_indicator - The key name indicator (which indicates to the remote site which key to use to decrypt the message)
	 * @param {string} site_remote_public_key - The RSA public key for contacting the remote site, in PEM format
	 * @param {string} site_local_private_key - The RSA private key for the local site, in PEM format
	 * @param {string} site_url - The URL for the remote site
	 * @param {boolean} [cors_headers_wanted=true] - Whether to request that the remote application sets CORS headers with its reply
	 * @param {Object} [http_credentials={}] - an object with any HTTP credentials to be set (useful properties: username, password)
	 * @param {string} [auth_method] - the authentication method to use ('jquery' or 'manual')
	 * @param {Object|boolean} [message_wrapper=false] - a wrapper to enclose the message in; or false for none. This is passed on to the UDRPC library, which is where the actual wrapping is done.
	 *
	 * @returns {Object} - the UpdraftPlus_Remote_Communications object
	 */
	function get_udrpc(reuse_id, remote_user_id, key_name_indicator, site_remote_public_key, site_local_private_key, site_url, cors_headers_wanted, http_credentials, auth_method, message_wrapper) {
		if ('undefined' != typeof ud_rpcs[reuse_id]) {
			ud_rpc = ud_rpcs[reuse_id];
		} else {
			cors_headers_wanted = (typeof cors_headers_wanted === 'undefined') ? true : cors_headers_wanted;
			var ud_rpc = new UpdraftPlus_Remote_Communications(key_name_indicator);
			ud_rpc.set_key_local(site_local_private_key);
			ud_rpc.set_key_remote(site_remote_public_key);
			ud_rpc.activate_replay_protection();
			
			var url_match = /\/admin-ajax.php$/;
			if (url_match.test(site_url)) {
				// wp-admin/admin-ajax.php before WP 3.5 will die() if $_REQUEST['action'] is not set (3.2) or is empty (3.4). Later WP versions also check that, but after (instead of before) wp-load.php, which is where we are ultimately hooked in.
				site_url = site_url + '?action=updraft_central';
			}
			
			ud_rpc.set_destination_url(site_url);
			if ('undefined' != typeof http_credentials) { ud_rpc.set_http_credentials(http_credentials); }
			if ('undefined' != typeof auth_method) { ud_rpc.set_auth_method(auth_method); }
			if ('undefined' != typeof message_wrapper && false !== message_wrapper) {
				ud_rpc.set_message_wrapper(message_wrapper);
				ud_rpc.set_message_unwrapper(function(response) {
					var processed = process_direct_ajax_response(response, 2, false);
					if (true === processed) {
						if (response.hasOwnProperty('wrapped_response')) {
							return response.wrapped_response;
						} else {
							processed = 'wrapped_response_not_found';
						}
					}
					console.error("UDRPC: Attempt to unwrap the message failed (code: "+processed+")");
					// This is usually redundant - something further down the line will log it
					if (updraftcentral_debug_level > 1) {
						console.log(response);
					}
					return false;
				});
			}
			ud_rpc.set_cors_headers_wanted(cors_headers_wanted);
			ud_rpcs[reuse_id] = ud_rpc;
		}
		if (updraftcentral_debug_level > 0) {
			// UDRPC, at debug level 2, console.log()s lots of cryptographic internals which are only really needed when debugging that
			var ud_rpc_debug_level = (updraftcentral_debug_level > 2) ? 2 : 1;
			ud_rpc.set_debug_level(ud_rpc_debug_level);
		}
		return ud_rpc;
	}
	
	/**
	 * An ajaxCallback
	 *
	 * @callable ajaxCallback
	 * @param {*} response - the response data for the result of the call
	 * @param {String} [code] - the response code; can be 'error' in the case of an error
	 * @param {String} [error_code] - in the case of code being 'error', this contains the error code
	 */
	
	/**
	 * This function is for processing responses received via send_ajax. Since that function has two separate methods for routing the request, the common response code is abstracted out.
	 *
	 * @param {ajaxCallback} response - callback that will be called with the results of the AJAX call
	 * @param {string} [code] - the response code; can be 'error' in the case of an error
	 * @param {string} [error_code] - in the case of code being 'error', this contains the error code
	 * @param {boolean|number} is_site_rpc - whether it was command to a remote site or not. If set to '2', then this indicates that it is site_rpc, and that the encryption was definitely done in the browser (so, we can ignore/drop certain unencrypted responses)
	 * @param {ajaxCallback} response_callback - callback that will be called with the results of the AJAX call
	 * @param {boolean} [allow_visual_responses=true] - whether or not it is permissible to display UI elements in response to the results (set this to false if the caller wants to handle it internally only)
	 * @param {Object} $site_row - the jQuery object for the row of the site that the request is being sent to
	 * @returns {void}
	 */
	function process_ajax_response(response, code, error_code, is_site_rpc, response_callback, allow_visual_responses, $site_row) {
		
		// Prevent error dialog to show when browser is reloaded/refreshed and there is
		// still an active jquery process.
		//
		// It's pointless to show an error message if we can't actually prevent user from
		// reloading the page inorder for him or her to decide whether to continue or not since
		// it's already been too late. This just serves a graceful exit rather than bombarding
		// users with error if they happened to cut short a certain ajax process.
		if (UpdraftCentral.reloaded && parseInt($.active) > 0 && 'error' == code) {
			return;
		}

		var website = ('undefined' !== typeof $site_row && $site_row && $site_row.length) ? $site_row.data('site_description')+' - ' : '';

		allow_visual_responses = ('undefined' === typeof allow_visual_responses) ? true : allow_visual_responses;
		
		// Bring errors up from the RPC layer. "ok" as the main code just means that a result came back successfully; but that result might itself be an error. That is someting to handle here, not in the lower-level communications library.
		
		if ('error' == code) {
			console.error("process_ajax_response: return code: "+code+", error_code: "+error_code+" - parsed response follows");
			console.log(response);
		} else if (updraftcentral_debug_level > 0) {
			console.log("process_ajax_response: return code: "+code+" - parsed response follows");
			console.log(response);
		}
		
		if (is_site_rpc && 'ok' == code && response.hasOwnProperty('response') && 'rpcerror' == response.response) {
			code = 'error';
			error_code = 'rpc_unknown_error';
			
			if (response.hasOwnProperty('data') && response.data.hasOwnProperty('code')) {
				error_code = response.data.code;
				console.error("UpdraftCentral: RPC: Error occurred ("+error_code+" - "+$site_row.data('site_description')+"); data follows");
				console.log(response.data);
				response = response.data.data;
				
				var handled = response_callback.call(this, response, code, error_code);
				
				if (true !== handled) {
					// A default message for if we don't recognise the code
					var dash_message = udclion.js_exception_occurred+' ('+error_code+')';
					// Get the error's own message, if we know about it
					if (udclion.rpcerrors.hasOwnProperty(error_code)) {
						if ('rpc_fatal_error' == error_code && response.hasOwnProperty('message')) {
							dash_message = sprintf(udclion.rpcerrors[error_code], response.message);
						} else {
							dash_message = udclion.rpcerrors[error_code];
						}
					}
					
					if (allow_visual_responses) { UpdraftCentral_Library.dialog.alert('<h2>'+website+udclion.communications_error+'</h2>'+dash_message); }
				}
				
				return;
			}
		}
		
		if (code == 'error') {
			
			var msg = udclion.general_js_comms_failure;
			// This variable doesn't have to be 100% correct - it's use is that a link to a relevant article is shown if it is true
			var is_comms_failure = true;
			var title = udclion.error;
			
			// If the response didn't unwrap, it may be an error response.
			if (2 == is_site_rpc && 'unwrapper_failure' == error_code && response.hasOwnProperty('code')) { error_code = response.code; }
						
			if ('json_parse_fail' == error_code) {
				if (response.indexOf('<html') > -1) {
					console.error("UpdraftCentral: JSON parse fail: looks like html was returned - remote plugin is probably not installed/inactive/blocked");
					msg = udclion.general_js_comms_failure;
					title = udclion.communications_error;
				}
			} else if ('response_empty' == error_code || 'http_post_fail' == error_code) {
				msg = udclion.general_js_comms_failure;
				title = udclion.communications_error;
			} else if ('timeout' == error_code) {
				msg = udclion.comms_failure_timeout;
				title = udclion.communications_error+' - '+udclion.timeout;
			} else if ('unauthorized' == error_code) {
				msg = udclion.comms_failure_unauthorised;
				title = udclion.communications_error;
			} else if ('unknown_response' == error_code) {
				msg = udclion.unknown_response;
				title = udclion.communications_error;
			} else if ('cannot_contact_localdev' == error_code) {
				title = udclion.communications_error;
				msg = response.message;
				if (response.hasOwnProperty('request_info') && response.request_info.hasOwnProperty('method') && response.request_info.hasOwnProperty('use_method') && response.request_info.method != response.request_info.use_method) {
					msg += '<br>'+udclion.localdev_can_work_better_with_https;
				}
			} else if ('unexpected_http_code' == error_code && is_site_rpc && response.hasOwnProperty('data') && response.data !== null && response.data.hasOwnProperty('headers') && response.data.headers.hasOwnProperty('www-authenticate') && response.data.headers['www-authenticate'].search(/Digest/i) == 0) {
				msg = response.message;
				msg += "<br>"+udclion.digest_auth_not_supported;
			} else if ('unexpected_http_code' == error_code && is_site_rpc && response.hasOwnProperty('data') && null !== response.data && response.data.hasOwnProperty('response') && response.data.response.hasOwnProperty('code') && 401 == response.data.response.code) {
				msg = udclion.comms_failure_unauthorised+' <a href="#" class="updraftcentral_site_editdescription">'+udclion.open_site_configuration+'...</a>';
			} else if (response.hasOwnProperty('message')) {
				msg = response.message;
				if (!is_site_rpc) { is_comms_failure = false; }
			} else {
				is_comms_failure = false;
				msg += '<br>'+udclion.error_code+': '+error_code;
			}
			
			// ns_error_dom_bad_uri: access to restricted uri denied - Firefox
			if (response.hasOwnProperty('status') && 401 == response.status) {
				msg = udclion.comms_failure_unauthorised+' <a href="#" class="updraftcentral_site_editdescription">'+udclion.open_site_configuration+'...</a>';
			} else if ('ns_error_dom_bad_uri: access to restricted uri denied' == error_code) {
				msg = udclion.comms_failure_unauthorised_by_browser+' <a href="#" class="updraftcentral_site_editdescription">'+udclion.open_site_configuration+'...</a>';
			}
			
			msg = '<p>'+msg+'</p>';
			
			if (is_comms_failure) {
				msg += '<p><a href="'+udclion.common_urls.connection_checklist+'">'+udclion.go_here_for_connection_help+'</a></p>';
				msg += '<p><a href="#" class="updraftcentral_test_other_connection_methods">'+udclion.test_other_connection_methods+'</a></p>';
			}
			
			if (response.hasOwnProperty('status') && 200 != response.status && 0 != response.status) {
				msg += '<p>'+udclion.http_response_status+': '+response.status+'</p>';
			}
			
			$('#updraftcentral_dashboard').trigger('updraftcentral_response_error', { code: code, message: msg, title: title});
			if (allow_visual_responses) { UpdraftCentral_Library.dialog.alert('<h2>'+website+title+'</h2>'+msg); }
		}
		
		if (is_site_rpc && response.hasOwnProperty('data') && null != response.data) {
			if (response.data.hasOwnProperty('php_events')) {
				$.each(response.data.php_events, function(index, logline) {
					console.log("UpdraftCentral: PHP event on remote side: "+logline);
				});
			}
			if (response.data.hasOwnProperty('caught_output')) {
				console.log("UpdraftCentral: direct output on remote side: "+response.data.caught_output);
			}
			if (response.data.hasOwnProperty('php_events') || response.data.hasOwnProperty('caught_output')) {
				response.data = response.data.previous_data;
			}
		}
		
		response_callback.call(this, response, code, error_code);
	}
	
	/**
	 * Process responses received back from the mothership over AJAX. This will do some processing, and then call process_ajax_response()
	 *
	 * @param {string} response - the response received
	 * @param {boolean} is_site_rpc - whether it was command to a remote site or not.
	 * @param {ajaxCallback|boolean} response_callback - callback that will be called with the results of the AJAX call - or, to not call, false
	 * @param {boolean} [allow_visual_responses=true] - whether or not it is permissible to display UI elements in response to the results (set this to false if the caller wants to handle it internally only). This is just passed on to process_ajax_response
	 * @param {Object} $site_row - the jQuery object for the row of the site that the request is being sent to
	 *
	 * @returns {boolean|string} - If the parsing did not turn up any errors, true is return; otherwise, an error code.
	 */
	function process_direct_ajax_response(response, is_site_rpc, response_callback, allow_visual_responses, $site_row) {
		
		allow_visual_responses = ('undefined' === typeof allow_visual_responses) ? true : allow_visual_responses;
		
		// AJAX via the mothership comes with its results wrapped
		
		if (response.hasOwnProperty('responsetype') && 'error' == response.responsetype) {
			if (response.hasOwnProperty('message')) { console.error("UpdraftCentral error via AJAX: "+response.message); }
			if ('cannot_contact_localdev' == response.code) { response.request_info = { method: method, use_method: use_method} }
			if (false !== response_callback) {
				process_ajax_response(response, 'error', response.code, is_site_rpc, response_callback, allow_visual_responses, $site_row);
			}
			return response.code;
		}
		
		if (!response.hasOwnProperty('message') && !response.hasOwnProperty('code')) {
			console.log(response);
			if (false !== response_callback) {
				process_ajax_response(response, 'error', 'unknown_response', is_site_rpc, response_callback, allow_visual_responses, $site_row);
			}
			return 'unknown_response';
		}
		
		if (updraftcentral_debug_level > 1) {
			console.log(response.responsetype+': '+response.message);
		}
		
		// When doing site RPC, the remote site's reply is in the 'data' attribute
		if (is_site_rpc) {
			
			if (response.hasOwnProperty('php_events')) {
				$.each(response.php_events, function(index, logline) {
					console.info("UpdraftCentral: PHP event on remote side: "+logline);
				});
			}
			
			if (response.hasOwnProperty('mothership_caught_output')) {
				console.info("UpdraftCentral: direct output on remote side: "+response.caught_output);
			}
			
			// This is set for a successful communication
			if (response.hasOwnProperty('rpc_response')) {
				response = response.rpc_response;
			}
		}
		
		if (false !== response_callback) {
			process_ajax_response(response, 'ok', null, is_site_rpc, response_callback, allow_visual_responses, $site_row);
		}
		
		return true;
	}
	
	/**
	 * Sends a remote command via AJAX - either directly, or via the site that this plugin is installed upon.
	 *
	 * @param {String} command - the command to send
	 * @param {*} data - data to send with the remote request
	 * @param {Object|null} $site_row - the jQuery object for the site that the command is for; or, for commands not associated with a site, null
	 * @param {String} [connection_method="direct_default_auth"] - either 'direct_default_auth' (which means to send directly to the destination) or 'via_mothership_encrypting' (which means to send via our PHP-back-end, which then sends the request), or 'via_mothership' which also sends via the PHP-back-end, but does the RSA encryption in the browser. This is not necessarily the same value as inferred from $site_row - we provide it as an extra parameter to make it possible to over-ride - e.g. for diagnostics, or where the browser mixed-content model restricts the choices.
	 * @param {Object|String|null} [spinner_where=null] - jQuery object or CSS identifier indicating where, if anywhere, to add a spinner whilst the call is ongoing
	 * @param {ajaxCallback} response_callback - callback that will be called with the results of the AJAX call
	 * @param {Number} [timeout=30] - the number of seconds to allow before the call times out
	 * @param {Boolean} [allow_visual_responses=true] - whether or not it is permissible to display UI elements in response to the results (set this to false if the caller wants to handle it internally only). This is just passed on to process_ajax_response
	 *
	 * @uses process_ajax_response
	 */
	
	 this.send_ajax = function(command, data, $site_row, connection_method, spinner_where, response_callback, timeout, allow_visual_responses) {
		
		var website = ('undefined' !== typeof $site_row && $site_row && $site_row.length) ? $site_row.data('site_description')+' - ' : '';

		connection_method = typeof connection_method !== 'undefined' ? connection_method : 'direct_default_auth';
		timeout = typeof timeout !== 'undefined' ? timeout : 30;

		// Override submitted timeout if "user defined timeout" is set
		if ('undefined' !== typeof udclion.user_defined_timeout && udclion.user_defined_timeout) {
			timeout = udclion.user_defined_timeout;
		}

		spinner_where = typeof spinner_where !== 'undefined' ? spinner_where : null;
		allow_visual_responses = ('undefined' === typeof allow_visual_responses) ? true : allow_visual_responses;
		
		// Boil it down to one of 'direct', 'server', 'server_proxies' (i.e. factor out the sub-methods)
		var ajax_method = ('via_mothership' == connection_method || 'via_mothership_encrypting' == connection_method) ? ('via_mothership' == connection_method ? 'server_proxies' : 'server') : 'direct';

		var is_site_rpc = (null === $site_row) ? false : true;
		
		if (is_site_rpc) {
			var unlicensed = $site_row.data('site_unlicensed');
			if ('undefined' !== typeof unlicensed && unlicensed) {
				UpdraftCentral_Library.dialog.alert('<h2>'+website+udclion.error+'</h2>'+udclion.site_unlicensed_message);
				return;
			}
		}
		
		if (spinner_where) {
			if (!$('.updraftcentral_spinner').is(':visible')) {
				$(spinner_where).prepend('<div class="updraftcentral_spinner"></div>');
			}
		}
		
		if ('direct' == ajax_method && 'https:'== document.location.protocol) {
			var site_url = this.get_contact_url($site_row);
			if (site_url.substring(0, 5).toLowerCase() == 'http:') {
				// Mixed content policy in all mainstream desktop browsers forbids requests to HTTP from HTTPS domains
				ajax_method = 'server';
			}
		}
		
		if (updraftcentral_debug_level > 0) {
			console.log("send_message(ajax_method="+ajax_method+", requested_method="+connection_method+", command="+command+", data(follows))");
			console.log(data);
		}

		// In case, the in-progress dialog is shown this information will be dumped
		// into the console to make any debugging tasks much more easier.
		self.uc_action_data.push({
			command: command,
			data: data,
			website: website,
			connection_method: connection_method
		});

		if ('direct' == ajax_method || 'server_proxies' == ajax_method) {
			
			if (!is_site_rpc) { throw 'send_ajax() called with direct method ('+connection_method+'), but no site row object passed in'; }
			
			var ud_rpc = get_site_udrpc($site_row, connection_method);
			ud_rpc.send_message(command, data, timeout, function(response, code, error_code) {
				
				if (spinner_where) {
					$(spinner_where).removeClass('updraftcentral_spinner');
					$(spinner_where).children('.updraftcentral_spinner').remove();
				}
				
				if (updraftcentral_debug_level > 2) {
					console.log("Raw response, pre-processing, follows");
					console.log(response);
				}
				
				var is_site_rpc_flag = ('server_proxies' == ajax_method) ? 2 : 1;
				
				try {
					process_ajax_response(response, code, error_code, is_site_rpc_flag, response_callback, allow_visual_responses, $site_row);
				} catch (e) {
					UpdraftCentral_Library.dialog.alert('<h2>'+website+udclion.error+'</h2>'+udclion.js_exception_occurred+'<br>'+e.toString());
					console.log(e);
				}
			});
				
				
		} else {
			// 'server' == ajax_method
			
			var site_id = 0;
			if (null !== $site_row) {
				site_id = $site_row.data('site_id');
			}
			
			var ajax_subaction = (is_site_rpc) ? 'site_rpc' : command;
			
			var ajax_data = (is_site_rpc) ? { command: command, data: data } : data;

			var ajax_options = {
				type: 'POST',
				url: udclion.ajaxurl,
				timeout: (timeout * 1000), // In ms
				headers: {
					'X-Secondary-User-Agent': 'UpdraftCentral-dashboard.js/'+udclion.udc_version
				},
				data: {
					action: 'updraftcentral_dashboard_ajax',
					subaction: ajax_subaction,
					component: 'dashboard',
					nonce: udclion.updraftcentral_dashboard_nonce,
					site_id: site_id,
					data: ajax_data
				},
				dataType: 'text',
				success: function(response) {
					
					if (spinner_where) {
						$(spinner_where).children('.updraftcentral_spinner').remove();
						// $(spinner_where).removeClass('updraftcentral_spinner');
					}
					
					if ('undefined' === typeof response || '' === response) {
						console.log("UDRPC: the response from the remote site was empty");
						process_ajax_response(response, 'error', 'response_empty', is_site_rpc, response_callback, allow_visual_responses, $site_row);
						return;
					}
					
					try {
						var parsed_response = JSON.parse(response);
					} catch (e) {

						var valid_json = response.match(/\{"format":.*}/);

						if (null === valid_json) {
							console.log(e);
							console.log(response);
							process_ajax_response(response, 'error', 'json_parse_fail', is_site_rpc, response_callback, allow_visual_responses, $site_row);
							return;
						} else {
							response = valid_json[0];
							try {
								var parsed_response = JSON.parse(response);
								console.log("UpdraftCentral: successfully parsed JSON after removing unwanted elements");
								console.log(response);
							} catch (e) {
								console.log(e);
								console.log(response);
								process_ajax_response(response, 'error', 'json_parse_fail', is_site_rpc, response_callback, allow_visual_responses, $site_row);
								return;
							}
						}
						
					}

					response = parsed_response;
					
					process_direct_ajax_response(response, is_site_rpc, response_callback, allow_visual_responses, $site_row);
					
				},
				error: function(request, status, error_thrown) {
					
					if (spinner_where) {
						$(spinner_where).children('.updraftcentral_spinner').remove();
						// $(spinner_where).removeClass('updraftcentral_spinner');
					}
					
					// We don't actually need these errors if the browser was reloaded because users can no longer
					// take any action since it's already been too late. These error info will only be shown if the
					// browser reload action is not the one causing the error due to an abrupt halting of a current AJAX process.
					if (!UpdraftCentral.reloaded) {
						console.error("UpdraftCentral: Error in AJAX operation");
						console.log(request);
						console.log(status);
						// https://api.jquery.com/jquery.ajax/ says: 'When an HTTP error occurs, (this parameter) receives the textual portion of the HTTP status, such as "Not Found" or "Internal Server Error."'
						// "Unauthorized" is what you get when HTTP authentication is required. "Timeout" when there's a timeout.
						console.error(error_thrown);
					}
					
					if ('' == error_thrown) { error_thrown = 'http_post_fail'; }
					
					if (error_thrown.hasOwnProperty('statusText')) {
						error_thrown = error_thrown.statusText.toString();
					}
					
					if ('function' === typeof error_thrown.toLowerCase) {
						error_thrown = error_thrown.toLowerCase();
					} else {
						try {
							var tmp = error_thrown.toString().toLowerCase();
							if (tmp) { error_thrown = tmp; }
						} catch (e) {
						}
					}
					
					process_ajax_response(request, 'error', error_thrown, is_site_rpc, response_callback, allow_visual_responses, $site_row);
				}
			}
			
			if (updraftcentral_debug_level > 1) {
				console.log("UpdraftCentral: jQuery POST: options follow:");
				console.log(ajax_options);
			}
			
			jQuery.ajax(ajax_options);
			
		}
		
	}

	/**
	 * Set up menu navigation for each site row item. This should be called after any actions that replace the HTML of row items
	 *
	 * @returns {void}
	 */
	function setup_menunav() {
		// This is no longer needed.
		// $('#updraftcentral_dashboard .updraft-dropdown-menu').dropit();
		var how_many_sites = $('#updraftcentral_dashboard_existingsites .updraftcentral_site_row:not(.updraft_site_unlicensed)').length;
		$('#updraftcentral_licences_in_use').html(how_many_sites);
	}

	/**
	 * Fixes layout issues on the backup settings/configure page where content (template) is being
	 * pulled from the control site dynamically.
	 *
	 * @return {void}
	 */
	function adapt_screen_layout() {
		var container = $('#updraftcentral_dashboard');

		// Get the main container's width
		var current_width = container.outerWidth();

		// Add "media query"-like class
		$('body').toggleClass('updraftcentral-small', current_width <= 800);
		$('body').toggleClass('updraftcentral-medium', current_width > 800 && current_width <= 1200);
		$('body').toggleClass('updraftcentral-large', current_width > 1200);
	}
	adapt_screen_layout();
	$('#updraft-central-navigation-sidebar').on('collapse_expand_complete', adapt_screen_layout);

	$(window).on('resize', function() {
		var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		if (width > mobile_width) {
			$('#updraftcentral_dashboard #updraft-central-navigation-sidebar').show();
		}
		adapt_screen_layout();
	});

	// Toggle the mobile menu on/off, if at a relevant width
	$('#updraftcentral_dashboard .updraft-mobile-menu').on('click', function() {
		// Currently only using the width.
		// var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		if (width <= mobile_width) {
			$("#updraft-central-navigation-sidebar").toggleClass("active");
			if ($("#updraft-central-navigation-sidebar").hasClass('active')) {
				$('#updraft-central-content').prepend('<div class="mobile-menu-backdrop"></div>');
			} else {
				$('#updraft-central-content > .mobile-menu-backdrop').remove();
			}
		}
	});

	/**
	 * Set the section of the dashboard that displays the existing sites to the specified value. All code that wants to update this section should route through here, so that any other associated operations can be carried out.
	 *
	 * @param {string} html - the HTML to place within the site list container in the dashboard
	 * @returns {void}
	 */
	 this.set_existing_sites_to = function(html) {
		var checker = setInterval(function() {
			// Make sure that no active connections are present in order not to interfere
			// when loading the sites and their underlying buttons successfully (most especially
			// when refreshing the sites list after site deletion).
			if (0 === $.active) {
				clearInterval(checker);

				// Reset the connection objects, as the IDs and credentials/options may have changed
				ud_rpcs = [];
				$('#updraftcentral_dashboard_existingsites').html(html);
				// Show/hide the relevant buttons/sections for the current tab
				UpdraftCentral.set_dashboard_mode(true, true);
				setup_menunav();
			}
		}, 500);
	}
	
	/**
	 * Adds a dashboard notice only if a notice doesnt exist with the same identifier
	 *
	 * @param {string} message - The message text to display
	 * @param {string} [level="notice"] - The level for the notice. Can also start with 'listener_', which is styled as if it were 'info'
	 * @param {Number|bool} [remove_after=30000] - The number of milliseconds to remove the notice after; or, 0|false to not remove
	 * @param {Object} [extra_data={}] - Extra data to store with the dashboard notice (via data attributes)
	 * @param {string} identifier - a string passed to give an id to the notice this stops other notices with the same id being displayed at the same time
	 *
	 * @returns {Object|false} the jQuery object for the newly created notice or false if a notice with this identifier already exists
	 */
	this.add_dashboard_notice_singleton = function(message, level, remove_after, extra_data, identifier) {
		level = ('undefined' === typeof level) ? 'notice' : level;
		remove_after = ('undefined' === typeof remove_after) ? 30000 : remove_after;
		extra_data = ('undefined' === typeof extradata) ? {} : extradata;
		identifier = ('undefined' === typeof identifier) ? '' : identifier;
		extra_data.identifier = identifier;
		
		if (0 === $('#updraftcentral_notice_container .updraftcentral_notice[data-identifier="'+identifier+'"]').length) {
			return this.add_dashboard_notice(message, level, remove_after, extra_data);
		}
		return false;
	}
	
	/**
	 * Adds a dashboard notice
	 *
	 * @param {string} message - The message text to display
	 * @param {string} [level="notice"] - The level for the notice. Can also start with 'listener_', which is styled as if it were 'info' (but can be over-ridden, as it gets its own classes too)
	 * @param {Number|bool} [remove_after=30000] - The number of milliseconds to remove the notice after; or, 0|false to not remove
	 * @param {Object} [extra_data={}] - Extra data to store with the dashboard notice (via data attributes)
	 *
	 * @returns {Object} the jQuery object for the newly created notice
	 */
	this.add_dashboard_notice = function(message, level, remove_after, extra_data) {
		remove_after = typeof remove_after !== 'undefined' ? remove_after : 30000;
		extra_data = typeof extra_data !== 'undefined' ? extra_data : { };
		level = typeof level !== 'undefined' ? level : 'notice';
		var type = 'notice';
		var extra_classes = '';
		
		if ('listener_' == level.substr(0, 9)) {
			type = 'listener';
			extra_classes = 'updraftcentral_listener updraftcentral_listener_'+level.substr(9);
			extra_data.type = level.substr(9);
			level = 'info';
		}
		
		$container = $('#updraftcentral_notice_container');
		
		var newnotice_container_opener = '<div class="updraftcentral_notice updraftcentral_notice_new updraftcentral_notice_level_'+level+' '+extra_classes+'"';
		$.each(extra_data, function(key, val) {
			newnotice_container_opener += 'data-'+key+'="'+UpdraftCentral_Library.quote_attribute(val)+'"';
		});
		
		var $newnotice = $(newnotice_container_opener+'><button type="button" class="updraftcentral_notice_dismiss"></button><div class="updraftcentral_notice_contents">'+message+'</div></div>');
		$container.append($newnotice);
		if (remove_after) {
			$newnotice.slideDown('medium').delay(30000).slideUp('slow', function() {
				$(this).remove();
			});
		} else {
			$newnotice.slideDown('medium');
		}
		
		return $newnotice;
	}
	
	/**
	 * Creates a special type of dashboard notice which polls for status updates
	 *
	 * @param {string} type - Listener type (an identifying string) (not shown; stored and used for CSS classes)
	 * @param {Object} $site_row - a jQuery object identifying the site row that the listener is associated with
	 * @param {string} message - HTML to be placed in the dashboard notice
	 * @param {*} [data={}] - Data associated with the listener (which will be stored in an HTML data attribute)
	 * @param {string} [title] - HTML to be used as the notice title. If not specified, a default will be used.
	 *
	 * @see register_listener_processor
	 *
	 * @returns {Object} the jQuery object for the newly created notice
	 */
	this.create_dashboard_listener = function(type, $site_row, message, data, title) {
		data = ('undefined' === typeof data) ? {} : data;
		data.site_url = $site_row.data('site_url');
		data.site_id = $site_row.data('site_id');
		var listener_title = (typeof title === 'undefined') ? '<h2>'+$site_row.data('site_description')+'</h2>' : title;
		return this.add_dashboard_notice(listener_title+message, 'listener_'+type, false, data);
	}
	
	// Only trigger a removal if the close button is directly in the notice. This allows other sub-elements to re-use the style class.
	$('#updraftcentral_notice_container').on('click', '.updraftcentral_notice > .updraftcentral_notice_dismiss', function() {
		$(this).parents('.updraftcentral_notice').clearQueue().slideUp('slow', function() {
			(this).remove();
		});
	});
	
	/**
	 * Get the current dashboard mode
	 *
	 * @returns {string} - the current dashboard mode
	 */
	this.get_dashboard_mode = function() {
		return $('#updraftcentral_dashboard').data('updraftcentral_mode');
	}

	/**
	 * Checks whether an ajax request is currently processing
	 *
	 * @param {object} [e] - An optional event object passed by the callee to prevent further action
	 * @returns {boolean}
	 */
	this.check_processing_state = function(e) {
		var current_mode = this.get_dashboard_mode();

		// Prevent going into another section or area while a process is
		// currently running.
		if (self.ajax_request_processing && self.uc_action_data.length) {
			if ('undefined' !== typeof e) e.preventDefault();

			UpdraftCentral_Library.dialog.alert('<h2>'+udclion.notice_heading+'</h2>'+udclion.currently_processing);

			// Dump what was logged in the "uc_action_data" from a previous (latest) process
			// or action that blocks progress or the currently requested action.
			console.log('Action(s) that blocks progress (follows):');
			console.log(self.uc_action_data);
			return true;
		}

		return false;
	}
	
	/**
	 * Set up the dashboard, by hiding things that don't belong in the currently active tab
	 *
	 * @param {string|boolean} new_mode=true - the mode to switch to. These correspond to keys for items placed in the main menu via the updraftcentral_main_navigation_items filter. If set to true, then it will choose the current mode (only useful if setting force to true).
	 * @param {boolean} [force=false] - run the commands to set up the mode, even if it appears to be the current mode (useful for resetting the state within the mode)
	 * @param {boolean} [reset=false] - indicates whether the site list has been reset and was triggered by the "choose another site" (reset) button
	 * @returns {void}
	 */
	this.set_dashboard_mode = function (new_mode, force, reset) {

		// Check and verify that a process is currently not running before
		// executing the below code to prevent from abruptly aborting the current process
		// which may lead to JS errors or/and inconsistency of information displayed to the user
		if (self.check_processing_state()) return;

		force = ('undefined' === typeof force) ? false : true;
		reset = ('undefined' === typeof reset) ? false : true;
		$('#updraftcentral_dashboard_existingsites').trigger('updraftcentral_dashboard_mode_pre_set', { force: force, new_mode: new_mode, reset: reset });


		var current_mode = this.get_dashboard_mode();

		if (true === new_mode) { new_mode = current_mode; }
		
		if (!force && new_mode == current_mode) { return; }

		var extra_contents = $('#updraftcentral_dashboard_existingsites_container .updraftcentral_row_extracontents');
		$('#updraftcentral_dashboard_existingsites').trigger('updraftcentral_dashboard_mode_set_before', { new_mode: new_mode, previous_mode: current_mode, force: force, extra_contents: extra_contents });
		
		if (current_mode) { $('#updraftcentral_dashboard').removeClass('updraftcentral_mode_'+current_mode); }

		$('#updraftcentral_dashboard_existingsites_container .updraftcentral_row_extracontents').empty();
		
		// Show all sites again
		$('#updraftcentral_dashboard_existingsites .updraftcentral_site_row, #updraftcentral_dashboard_existingsites .updraftcentral_row_divider').show();
		
		$('#updraftcentral_dashboard').data('updraftcentral_mode', new_mode);
		$('#updraftcentral_dashboard').addClass('updraftcentral_mode_'+new_mode);
		$('#updraft-menu-item-'+current_mode).removeClass('updraft-menu-item-links-active');
		$('#updraft-menu-item-'+new_mode).addClass('updraft-menu-item-links-active');
		
		// Since there exist classes for both "show everywhere except <here>" and "hide everywhere except here", you could, of course, add CSS classes that result in contradictory instructions. The outcome of doing so is not defined.
		$('#updraftcentral_dashboard .updraftcentral-hide-in-other-tabs:not(.updraftcentral-show-in-tab-'+new_mode+'), #updraftcentral_dashboard .updraftcentral-hide-in-tab-'+new_mode).hide();
		$('#updraftcentral_dashboard .updraftcentral-show-in-tab-'+new_mode+' .updraftcentral-hide-in-tab-initially').hide();
		$('#updraftcentral_dashboard .updraftcentral-show-in-tab-'+new_mode+', #updraftcentral_dashboard .updraftcentral-show-in-other-tabs:not(.updraftcentral-hide-in-tab-'+new_mode+')').slideDown(1);

		deregister_row_clickers();
		deregister_modal_listeners();
		
		$('#updraftcentral_dashboard_existingsites').trigger('updraftcentral_dashboard_mode_set', { new_mode: new_mode, previous_mode: current_mode });
		$('#updraftcentral_dashboard_existingsites').trigger('updraftcentral_dashboard_mode_set_'+new_mode, { new_mode: new_mode, previous_mode: current_mode });
		
		$('#updraftcentral_dashboard_existingsites').trigger('updraftcentral_dashboard_mode_set_after', { new_mode: new_mode, previous_mode: current_mode });
		
		$("#updraftcentral_dashboard_existingsites").sortable('enable');
	}
	
	$('.updraftcentral_mode_actions .updraftcentral_action_choose_another_site').on('click', function() {
		if ('undefined' !== typeof UpdraftCentral.$site_row && UpdraftCentral.$site_row) {
			if (UpdraftCentral.$site_row.hasClass('sortable-is-disabled')) {
				UpdraftCentral.$site_row.removeClass('sortable-is-disabled');
			}
		}
		UpdraftCentral.set_dashboard_mode(true, true, true);
	});
	
	$('#updraft-central-navigation-sidebar').off('click', '.updraft-menu-item').on('click', '.updraft-menu-item', function(e) {
		e.stopPropagation();

		var item_dom_id = $(this).attr('id');
		if ('undefined' === typeof item_dom_id) { return; }
		if ('updraft-menu-item-' != item_dom_id.substring(0, 18)) {
			console.log("UDCentral: menu item without the ID in the expected format");
			console.log(this);
			return;
		}
		
		var new_mode = item_dom_id.substring(18);
		UpdraftCentral.set_dashboard_mode(new_mode);

		var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		if (w <= mobile_width) {
			$("#updraft-central-navigation-sidebar").toggleClass("active");
			if ($("#updraft-central-navigation-sidebar").hasClass("active")) {
				$('#updraft-central-content').prepend('<div class="mobile-menu-backdrop"></div>');
			} else {
				$('#updraft-central-content > .mobile-menu-backdrop').remove();
			}
		} else {
			$('#updraft-central-content > .mobile-menu-backdrop').remove();
		}
	});

	$("#updraft-central-sidebar-button").on('click', function() {
		var defaultWidth = 200,
			collapse = false;
		var toggleWidth = $("#updraft-central-navigation-sidebar").width() > default_collapse_width ? default_collapse_width+"px" : defaultWidth + "px";

		var updraft_sub_menu = $('.updraft-sub-menu:visible');
		if (updraft_sub_menu.length) {
			var container = updraft_sub_menu.closest('.updraft-menu-item-container');
			container.find('.updraft-sub-menu-icon').trigger('click');
		}

		$("#updraft-central-navigation-sidebar").animate({
			width: toggleWidth
		}, {
			step: function( now, fx ) {
				var $label = $('#'+fx.elem.id).find('button.updraft-menu-item > span.menu-label');
				var $visibility_icon = $('#'+fx.elem.id).find('.module-visibility');
				var $hidden_modules_label = $('#hidden-modules-container').find('.uc-hidden-modules-label');
				var $show_all = $('#updraft-menu-item-all');
				if (120 > now) {
					$label.hide();
					$visibility_icon.hide();
					$hidden_modules_label.hide();
					$show_all.html('<span class="dashicons dashicons-visibility"></span>');
					collapse = true;
				} else {
					$label.show();
					$visibility_icon.show();
					$hidden_modules_label.show();
					$show_all.html(udclion.show_all);
					collapse = false;
					$('span.module-visibility > span.dashicons-hidden').show();
					$('span.module-visibility > span.dashicons-visibility').show();
				}
			},
			complete: function() {
				if (collapse) {
					$('[data-toggle="tooltip"]').tooltip('enable');
				} else {
					$('[data-toggle="tooltip"]').tooltip('disable');
				}
				$('#updraft-central-navigation-sidebar').trigger('collapse_expand_complete');
			}
		});
		$(".updraft-central-sidebar-button-icon").toggle();
	});
	
	$('#updraftcentral_dashboard .updraftcentral_action_box .updraftcentral_action_manage_sites').on('click', function() {
		UpdraftCentral.set_dashboard_mode('sites');
	});
	
	/**
	 * Do any processing necessary with the passed information about current status
	 *
	 * @param {Object} status_info - any recognised properties will be processed
	 * @returns {void}
	 */
	function process_sites_status_info(status_info) {
		if (status_info.hasOwnProperty('how_many_licences_in_use')) {
			$('.updraftcentral_licences_in_use').html(status_info.how_many_licences_in_use);
		}
		if (status_info.hasOwnProperty('how_many_licences_available')) {
			var display = (status_info.how_many_licences_available < 0) ? '&#8734;' : status_info.how_many_licences_available;
			$('.updraftcentral_licences_total').html(display);
		}
	}
	
	/**
	 * Handle any links to updraftplus.com/updraftcentral.com in a new window
	 *
	 * @param {string} href - The URL
	 * @param {Object} [e] - a jQuery event to cancel if opening a new window
	 */
	function redirect_updraft_website_links(href, e) {
		if ('undefined' === typeof href) { return; }
		if (null !== href.match(/https?:\/\/updraft(plus|central)\.com/)) {
			if ('undefined' !== typeof e) { e.preventDefault(); }
			var win = window.open(href, '_blank');
			UpdraftCentral_Library.focus_window_or_error(win);
		}
	}

	$('#updraftcentral_dashboard_newsite').on('click', function() {
		
		var advanced_site_options_html = UpdraftCentral.get_advanced_site_options_html({ http_username: '', http_password: ''});
		
		var tag_ui = '',
			has_tag = false,
			tag_module = null,
			tags = [];

		if ('function' === typeof window.UpdraftCentral_Tag_Management) {
			tag_module = new window.UpdraftCentral_Tag_Management();
			tags = tag_module.get_all_tags_for_new_site();

			tag_ui = UpdraftCentral.template_replace('tags-tags-container', {site_tags: tags});
			has_tag = true;
		}

		UpdraftCentral.open_modal(udclion.add_site, UpdraftCentral.template_replace('sites-add-new-modal', { advanced_options: advanced_site_options_html, tag_ui: tag_ui, has_tag: has_tag }), function() {
			
			var key = $('#updraftcentral_addsite_key').val();
			UpdraftCentral.close_modal();

			tags = [];
			if (has_tag) {
				$('#updraftcentral_addsite_tags .udc_tag_item > span').each(function() {
					tags.push($(this).data('tag_name'));
				});
			}
			
			if ('undefined' === typeof key || key === null || key === '') { return; }

			var extra_site_info = UpdraftCentral_Library.get_serialized_options('#updraftcentral_modal #updraftcentral_editsite_expertoptions .expert_option');
			var send_cors_headers = $('#updraftcentral_modal #updraftcentral_site_send_cors_headers').is(':checked') ? 1 : 0;
			var connection_method = $('#updraftcentral_modal #updraftcentral_site_connection_method').val();
			
			UpdraftCentral.send_ajax('newsite', { key: key, extra_site_info: extra_site_info, send_cors_headers: send_cors_headers, connection_method: connection_method, tags: tags }, null, 'via_mothership_encrypting', '#updraftcentral_dashboard_existingsites', function(resp, code, error_code) {
				
				if ('ok' == code) {

					if (resp.hasOwnProperty('tags')) {
						if ('undefined' !== typeof udclion && udclion.hasOwnProperty('tags')) {
							if (resp.tags.hasOwnProperty('site_tags')) udclion.tags.site_tags = resp.tags.site_tags;
							if (resp.tags.hasOwnProperty('site_tags_by_name')) udclion.tags.site_tags_by_name = resp.tags.site_tags_by_name;
							if (resp.tags.hasOwnProperty('all_tags')) udclion.tags.all_tags = resp.tags.all_tags;
						}
					}
					
					if (resp.hasOwnProperty('message')) {
						add_dashboard_notice(resp.message, 'info');
						if (resp.hasOwnProperty('sites_html')) {
							UpdraftCentral.set_existing_sites_to(resp.sites_html);
						} else {
							console.log("Expected sites_html data not found:");
							console.log(resp);
						}
						if (resp.hasOwnProperty('status_info')) { process_sites_status_info(resp.status_info); }
					}

					if (resp.hasOwnProperty('key_needs_sending')) {
						
						var site_id = resp.key_needs_sending.key_site_id;
						var site_ajax_url = resp.key_needs_sending.url;
						var $site_row = $('#updraftcentral_dashboard_existingsites .updraftcentral_site_row[data-site_id="'+site_id+'"');
						var site_remote_public_key = resp.key_needs_sending.remote_public_key;
						
						$($site_row).prepend('<div class="updraftcentral_spinner"></div>');
						
						var send_key_url = site_ajax_url+'&action=updraftcentral_receivepublickey&updraft_key_index='+encodeURIComponent(resp.key_needs_sending.updraft_key_index)+'&public_key='+encodeURIComponent(btoa(site_remote_public_key));
						var win = window.open(send_key_url, '_blank', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=320');
						UpdraftCentral_Library.focus_window_or_error(win);
						return;
						
					}
				}
			});
		}, udclion.add_site, function() {
			$('#updraftcentral_modal #updraftcentral_site_send_cors_headers').prop('checked', true);
		} , false, 'addsite_dialog', null, function() {
			$('#updraftcentral_addsite_key').trigger('focus');
			if (has_tag) {
				tag_module.init_addsite_handlers();
			}
		});
	});
	
	// Updates export dialog's button label upon selection of file for import
	$('body').on('change', '#updraftcentral_import_file', function() {
		if ($(this).val().length) {
			$('.exportsettings_dialog button.updraft_modal_button_goahead').html(udclion.import_settings);
		}
	});

	/**
	 * Sends the settings file to UpdraftCentral for import processing
	 *
	 * @param {string}  file      File path reference to the uploaded file
	 * @param {object}  form_data Any additional data to be submitted along with the file
	 * @param {integer} timeout   Timeout value for the current request
	 * @returns {Promise}
	 */
	function send_import_file(file, form_data, timeout) {
		var deferred = $.Deferred();
		timeout = ('undefined' !== typeof timeout) ? timeout : 30;

		// Override submitted timeout if "user defined timeout" is set
		if ('undefined' !== typeof udclion.user_defined_timeout && udclion.user_defined_timeout) {
			timeout = udclion.user_defined_timeout;
		}

		var data = new FormData();
		data.append('action', 'updraftcentral_dashboard_ajax');
		data.append('subaction', 'import_settings');
		data.append('component', 'dashboard');
		data.append('nonce', udclion.updraftcentral_dashboard_nonce);
		data.append('site_id', 0);	// We're sending it to UpdraftCentral so, no remote ID needed here

		if ('undefined' !== typeof file && file) {
			data.append('file', file);
		}

		if ('undefined' !== typeof form_data && form_data) {
			data.append('data', JSON.stringify(form_data));
		}

		var dialog = $('.exportsettings_dialog');
		dialog.prepend('<div class="updraftcentral_spinner"></div>');

		var ajax_options = {
			type: 'POST',
			url: udclion.ajaxurl,
			timeout: (timeout * 1000),
			headers: {
				'X-Secondary-User-Agent': 'UpdraftCentral-dashboard.js/'+udclion.udc_version
			},
			data: data,
			contentType: false,
			processData: false,
			dataType: 'text',
			success: function(response) {
				dialog.children('.updraftcentral_spinner').remove();
				deferred.resolve(response);
			},
			error: function(request, status, error_thrown) {
				dialog.children('.updraftcentral_spinner').remove();
				deferred.reject(error_thrown);
			}
		}
		
		jQuery.ajax(ajax_options);
		return deferred.promise();
	}

	// Allows users to export their site settings along with some other informations
	$('#updraftcentral_dashboard_export_settings').on('click', function() {
		UpdraftCentral.open_modal(udclion.export_import_settings, UpdraftCentral.template_replace('sites-export-modal', {}), function() {
			var encrypt_phrase = $('#updraftcentral_modal #updraftcentral_encryption_phrase').val();
			var import_file = $('#updraftcentral_modal #updraftcentral_import_file');

			if ('undefined' !== typeof import_file && import_file && import_file.val().length) {
				send_import_file(import_file[0].files[0], { phrase: encrypt_phrase }).then(function(response) {
					var resp = JSON.parse(response);
					if (resp.data.hasOwnProperty('errors') && resp.data.errors.length) {
						UpdraftCentral_Library.dialog.alert('<h2>'+udclion.import_response_heading+'</h2>'+resp.data.errors[0]);
					} else {
						UpdraftCentral_Library.dialog.alert('<h2>'+udclion.import_response_heading+'</h2>'+udclion.import_successful, function() {
							UpdraftCentral.close_modal();
							location.reload();
						});
					}
				}).fail(function(error_thrown) {
					UpdraftCentral_Library.dialog.alert('<h2>'+udclion.import_response_heading+'</h2>'+error_thrown);
				});
			} else {
				UpdraftCentral.send_ajax('export_settings', { phrase: encrypt_phrase }, null, 'via_mothership_encrypting', '#updraftcentral_dashboard_existingsites', function(resp, code, error_code) {
					if ('ok' == code) {
						if (resp.hasOwnProperty('data') && resp.data.hasOwnProperty('json_data')) {
							UpdraftCentral.close_modal();
							
							// Attach this data to an anchor on page
							var link = document.body.appendChild(document.createElement('a'));
							link.setAttribute('download', resp.data.file_name);
							link.setAttribute('style', "display:none;");
							link.setAttribute('href', 'data:text/json' + ';charset=UTF-8,' + encodeURIComponent(resp.data.json_data));
							link.click();
						}
					}
				}, null, false);
			}
		}, udclion.export_settings, null, false, 'exportsettings_dialog', null, null);
	});

	// Register the modal events which are active in the 'Sites' tab
	$('#updraftcentral_dashboard_existingsites').on('updraftcentral_dashboard_mode_set_sites', function(e) {
		
		register_modal_listener('#updraftcentral_addsite_expertoptions_show', function(e) {
			$(this).slideUp();
			$('#updraftcentral_modal #updraftcentral_editsite_expertoptions .initially-hidden').show();
			e.preventDefault();
		});
		
	});
	
	// Put clicked links within the settings sections into their own tab
	$('#updraftcentral_notice_container').on('click', 'a', function(e) {
		var href = $(this).attr('href');
		redirect_updraft_website_links(href, e);
	});

	// Register the row clickers and modal listeners which are active in every tab
	$('#updraftcentral_dashboard_existingsites').on('updraftcentral_dashboard_mode_set', function(event, data) {

		var menu_label = $('#updraft-menu-item-'+data.new_mode).find('.menu-label').html();
		var actions_container = $('.updraftcentral_mode_actions');
		if (0 === actions_container.find('h2.screen-title').length) {
			actions_container.prepend('<h2 class="screen-title"></h2>');
		}
		actions_container.find('h2.screen-title').html(menu_label);
		
		// Use a new browser portal for any clicks to updraftplus.com
		register_modal_listener('a', function(e) {
			var href = $(this).attr('href');
			redirect_updraft_website_links(href, e);
		});
		
		// Put clicked links within the settings sections into their own tab
		$('#updraftcentral_dashboard_existingsites_container').on('click', '.updraftcentral_site_row a', function(e) {
			var href = $(this).attr('href');
			redirect_updraft_website_links(href, e);
		});
		
		register_modal_listener('#updraft_debug_empty_browser_cache', function(e) {
			
			var how_many = 0;
			var verbose = (updraftcentral_debug_level > 0) ? true : false;
			
			for (var i = localStorage.length; i >= 0; --i) {
				var key = localStorage.key(i);
				if (key !== null && key.substr(0, 15) == 'updraftcentral_') {
					if (verbose) { console.log("UpdraftCentral: Removing key from local storage: "+key); }
					localStorage.removeItem(key);
					how_many++;
				}
			}
			if (how_many > 0) {
				UpdraftCentral_Library.dialog.alert('<h2>'+udclion.empty+' '+udclion.browser_cache+'</h2>'+sprintf(udclion.cache_emptied, how_many));
			} else {
				UpdraftCentral_Library.dialog.alert('<h2>'+udclion.empty+' '+udclion.browser_cache+'</h2>'+udclion.cache_no_contents);
			}
		});
		
		register_modal_listener('#updraft_debug_show_browser_cache', function(e) {
			var how_many = 0;
			for (var i = 0, len = localStorage.length; i < len; ++i) {
				var key = localStorage.key(i);
				var value = localStorage.getItem(key);
				if (key.substr(0, 15) == 'updraftcentral_') {
					how_many++;
					console.log(key+": "+value);
				}
			}
			if (how_many > 0) {
				UpdraftCentral_Library.dialog.alert('<h2>'+udclion.log_contents+'</h2>'+udclion.cache_contents_logged);
			} else {
				UpdraftCentral_Library.dialog.alert('<h2>'+udclion.log_contents+'</h2>'+udclion.cache_no_contents);
			}
		});
		
		// The 'upgrade' tab has no sites rows visible
		if (data && data.hasOwnProperty('new_mode') && data.new_mode == 'notices') { return; }
		
		register_modal_listener('.updraftcentral_site_editdescription', function(e) {
			e.preventDefault();
			open_site_configuration(UpdraftCentral.$site_row);
		});
		
		register_modal_listener('.updraftcentral_test_other_connection_methods', function(e) {
			e.preventDefault();
			UpdraftCentral_Library.open_connection_test(UpdraftCentral.$site_row);
		});
		
		register_modal_listener('a.connection-test-switch', function(e) {
			e.preventDefault();
			var connection_method = $(this).data('connection_method');
			
			UpdraftCentral.close_modal();
			
			var site_id = $(this).data('site_id');
			
			UpdraftCentral.send_ajax('edit_site_connection_method', { site_id: site_id, connection_method: connection_method }, null, 'via_mothership_encrypting', '#updraftcentral_dashboard_existingsites', function(resp, code, error_code) {
				
				if ('ok' == code) {
					
					if (resp.hasOwnProperty('message')) { add_dashboard_notice(resp.message); }
					
					if (resp.hasOwnProperty('sites_html')) {
						UpdraftCentral.set_existing_sites_to(resp.sites_html);
						setup_menunav();
					} else {
						console.log(resp);
						add_dashboard_notice(udclion.unknown_response, 'error');
					}
					if (resp.hasOwnProperty('status_info')) { process_sites_status_info(resp.status_info); }
				}
			});
		});
		
		register_modal_listener('.updraftcentral_siteinfo_results .phpinfo', function(e) {
			e.preventDefault();
			UpdraftCentral.send_site_rpc('core.phpinfo', null, UpdraftCentral.$site_row, function(response, code, error_code) {
				if ('ok' == code && response.data) {
					var output = '';
					$.each(response.data, function(name, section) {
						output += "<h3>"+name+"</h3>\n"+'<table>'+"\n";
						$.each(section, function(key, val) {
							if (val.constructor === Array) {
								output += "<tr><td>"+key+"</td><td>"+val[0]+"</td><td>"+val[1]+"</td></tr>\n";
							} else if (typeof val === 'string') {
								if (UpdraftCentral_Library.is_numeric(key)) {
									output += "<tr><td></td><td>"+val+"</td></tr>\n";
								} else {
									output += "<tr><td>"+key+"</td><td>"+val+"</td></tr>\n";
								}
							} else {
								console.log("UpdraftCentral: phpinfo: Unrecognised output for key "+key+" (follows)");
								console.log(val);
							}
						});
						output += "</table>\n";
					});
					
					// N.B. open_modal() by default sanitizes the body data
					UpdraftCentral.open_modal(udclion.phpinfo, '<div id="updraftcentral_phpinfo_results">'+output+'</div>', null, false, null, true, 'modal-lg');
				}
			}, $(this));
		});
		
		register_modal_listener('#updraftcentral_site_connection_method', function() {
			var site_connection_method = $('#updraftcentral_site_connection_method').val();
			
			if (null == site_connection_method) { return; }
			
			if (site_connection_method.substring(0, 7) == 'direct_' && 'https:' == document.location.protocol) {
				$('#updraftcentral_site_connection_method_message').show().html(udclion.http_must_go_via_mothership);
			} else {
				$('#updraftcentral_site_connection_method_message').hide();
			}
		}, 'change');
		
		register_row_clicker('.updraftcentral_site_adddescription', function($site_row) {
			open_site_configuration($site_row);
		});
		
		register_row_clicker('.updraftcentral_site_delete', function($site_row) {
			UpdraftCentral_Library.dialog.confirm('<h2>'+udclion.remove_site+'</h2><p>'+UpdraftCentral_Library.escape_attrib($site_row.data('site_url'))+'</p><p>'+udclion.really_delete_site+'</p>', function(result) {
				if (!result) return;
				var site_id = UpdraftCentral.$site_row.data('site_id');
				if (!site_id) { return; }
				$site_row.slideUp('slow');
				
				UpdraftCentral.send_ajax('delete_site', { site_id: site_id }, null, 'via_mothership_encrypting', '#updraftcentral_dashboard_existingsites', function(resp, code, error_code) {
					if ('ok' == code) {
						if (resp.hasOwnProperty('message')) {
							add_dashboard_notice(resp.message);
						}
						if (resp.hasOwnProperty('sites_html')) {
							UpdraftCentral.set_existing_sites_to(resp.sites_html);
						} else {
							console.log(resp);
							add_dashboard_notice(udclion.unknown_response, 'error');
						}
						if (resp.hasOwnProperty('status_info')) { process_sites_status_info(resp.status_info); }
					}
				});
				
			});
		});
		
		register_row_clicker('.row_siteinfo', function($site_row) {
			UpdraftCentral.send_site_rpc('core.site_info', null, $site_row, function(response, code, error_code) {
				if (updraftcentral_debug_level > 1) {
					console.log("send_site_rpc(site_info): parsed response follows");
					console.log(response);
				}
				if ('ok' == code) {
					if (false !== response) {
						var versions = response.data.versions;
						var bloginfo = response.data.bloginfo;
						var url = UpdraftCentral_Library.sanitize_html(bloginfo.url);
						var name = UpdraftCentral_Library.sanitize_html(bloginfo.name);
						// 'This site is running WordPress version %s (PHP %s, MySQL %s) and UpdraftPlus version %s (UDRPC version %s)'
						// var message = sprintf(udclion.what_remote_running, UpdraftCentral_Library.sanitize_html(versions.wp), UpdraftCentral_Library.sanitize_html(versions.php), UpdraftCentral_Library.sanitize_html(versions.mysql), UpdraftCentral_Library.sanitize_html(versions.ud), UpdraftCentral_Library.sanitize_html(versions.udrpc_php));
						// add_dashboard_notice(message, 'info');
						// N.B. By default, open_modal() sanitizes the body.
						var ud_version = versions.ud;
						if ('none' == ud_version) { ud_version = udclion.updraftplus.version_none; }
						var message = sprintf(udclion.what_remote_running, versions.wp, versions.php, versions.mysql, ud_version, versions.udrpc_php);
						UpdraftCentral.open_modal(
							UpdraftCentral_Library.sanitize_html(bloginfo.name),
							UpdraftCentral.template_replace('dashboard-siteinfo', { url: url, message: message, phpinfo: udclion.phpinfo }),
							null,
							false
						);
					}
				}
			});
		});
		
		register_row_clicker('.updraftcentral_site_dashboard', function($site_row) {
			UpdraftCentral_Library.open_browser_at($site_row);
		});

	});
	
	/**
	 * Gets the HTML fragment for advanced site editing options
	 *
	 * @param {Object} values - the values to pass to the template
	 *
	 * @returns {string} - the HTML
	 */
	this.get_advanced_site_options_html = function(values) {
		return UpdraftCentral.template_replace('sites-advanced-site-options', values);
	}
	
	/**
	 * Opens the site configuration dialog for the specified site
	 *
	 * @param {Object} $site_row - the jQuery row object for the site whose configuration is to be edited
	 * @returns {void}
	 */
	this.open_site_configuration = function($site_row) {

		var site_url = $site_row.data('site_url');
		
		var http_username = $site_row.data('http_username');
		if ('undefined' === typeof http_username) { http_username = ''; }
		
		var http_password = $site_row.data('http_password');
		if ('undefined' === typeof http_password) { http_password = ''; }
		
		var connection_method = $site_row.data('connection_method');
		if ('undefined' === typeof connection_method) { connection_method = 'direct_default_auth'; }
		
		var http_authentication_method = $site_row.data('http_authentication_method');
		if ('undefined' === typeof http_authentication_method) { http_authentication_method = 'basic'; }
		
		var existing_description = $site_row.data('site_description');
		if (existing_description == site_url) { existing_description = ''; }
		
		var send_cors_headers = $site_row.data('send_cors_headers');
		if ('undefined' === typeof send_cors_headers || send_cors_headers) { send_cors_headers = 1; }
		
		var advanced_site_options_html = UpdraftCentral.get_advanced_site_options_html({http_username: http_username, http_password: http_password});

		UpdraftCentral.open_modal(udclion.edit_site_configuration, UpdraftCentral.template_replace('sites-edit-configuration', { site_url: UpdraftCentral_Library.escape_attrib(site_url), advanced_options: advanced_site_options_html }, { existing_description: existing_description }), function() {
			
			var description = $('#updraftcentral-edit-site-description').val();
			
			var send_cors_headers = $('#updraftcentral_modal #updraftcentral_site_send_cors_headers').is(':checked') ? 1 : 0;

			var connection_method = $('#updraftcentral_modal #updraftcentral_site_connection_method').val();
			
			var site_id = $site_row.data('site_id');
			if (!site_id) { return; }
			
			UpdraftCentral.close_modal();
			
			var extra_site_info = UpdraftCentral_Library.get_serialized_options('#updraftcentral_modal .expert_option');
			
			UpdraftCentral.send_ajax('edit_site_configuration', { site_id: site_id, description: description, extra_site_info: extra_site_info, send_cors_headers: send_cors_headers, connection_method: connection_method }, null, 'via_mothership_encrypting', '#updraftcentral_dashboard_existingsites', function(resp, code, error_code) {

				if ('ok' == code) {
					
					if (resp.hasOwnProperty('message')) { add_dashboard_notice(resp.message); }
					
					if (resp.hasOwnProperty('sites_html')) {
						UpdraftCentral.set_existing_sites_to(resp.sites_html);
						setup_menunav();
					} else {
						console.log(resp);
						add_dashboard_notice(udclion.unknown_response, 'error');
					}
					if (resp.hasOwnProperty('status_info')) { process_sites_status_info(resp.status_info); }
				}
			});
			
		}, udclion.edit, function() {
			$('#updraftcentral_modal #updraftcentral_site_connection_method').val(connection_method).trigger('change');
			if (send_cors_headers) { $('#updraftcentral_modal #updraftcentral_site_send_cors_headers').prop('checked', true); }
			$('#updraftcentral_modal #updraftcentral_addsite_http_authentication_method').val(http_authentication_method);
		}, false);
	}
	
	/**
	 * RPCCallback
	 *
	 * @callable RPCCallback
	 * @param {Object} response - the data returned by the RPC call. The format of this object depends upon both code and (if code is not 'ok') on error_code, and so should not be processed before those variables have been inspected.
	 * @param {string} code - the code returned by the RPC call; currently possible values are 'ok' or 'error'
	 * @param {string|null} error_code - the error code returned by the RPC call (if any).
	 *
	 * @returns {*} - if true, then in the case of an error (code is 'error'), then no further action will be taken; otherwise, default actions (e.g. displaying an error) will be taken
	 */
	
	/**
	 * This is intended for debugging use only, from the browser console. It sends a command to the site specified by URL. The results are logged in accordance with your debug settings
	 *
	 * @param {string} rpc_command - the command to send
	 * @param {*} data - the data to send with the command
	 * @param {string} site_url - the URL of the site to send to; this must exactly match site URL in one of the rows (N.B. normally you need to include the trailing slash)
	 * @param {number} [timeout=30] - the number of seconds for the timeout on the HTTP call
	 */
	this.debugging_send_command = function(rpc_command, data, site_url, timeout) {
		var $site_row = $('#updraftcentral_dashboard_existingsites').find('.updraftcentral_site_row[data-site_url="'+site_url+'"]').first();
		if ($site_row.length < 1) {
			console.log("debugging_send_command: no corresponding row found for the specified URL");
			return;
		}
		
		timeout = 'undefined' !== typeof timeout ? timeout : 30;
		
		UpdraftCentral.send_site_rpc(rpc_command, data, $site_row, function(response, code, error_code) {
			// Nothing needs logging here, as other parts of the stack will already do that.
		}, null, timeout);
	}

	/**
	 * Helper method for the UpdraftCentral.is_serializable function which
	 * checks whether the submitted object or property has plain/simple data types
	 *
	 * @see {UpdraftCentral.is_serializable}
	 * @param {*} data - Any type of data for checking or validation.
	 * @returns {boolean} - "true" if data has plain/simple type, "false" otherwise.
	 */
	var is_plain_type = function (data) {
		
		// N.B. We're not comparing the type for "null" since it will always return as object. Thus,
		// Giving a false positive when running the check against this method (is_plain_type), instead
		// We're comparing it by value. If a "null" value is encountered we consider it as plain
		// Since it doesn't reference any complex hierarchy other than being a "null".

		if (data === null || typeof data === 'string' || typeof data === 'boolean' || typeof data === 'number' || typeof data === 'undefined' || jQuery.isPlainObject(data) || Array.isArray(data)) {
			return true;
		}
		return false;
	}

	/**
	 * Checks whether the submitted data is valid for serialization
	 *
	 * @borrows {UpdraftCentral#is_plain_type}
	 * @param {*} data - Any type of data for checking or validation.
	 * @param {undefined|null} field - An optional field passed around during the loop.
	 * @param {string} path - An string representing the path where the error occurred within the data parameter hierarchy.
	 * @returns {boolean} - "true" if data is valid for serialization, "false" otherwise.
	 */
	this.is_serializable = function(data, field, path) {
		if ('undefined' === typeof path) path = 'data';
		var origin = path;

		if (!is_plain_type(data)) {
			if ('undefined' !== typeof field && field) {
				return {
					status: false,
					data: data,
					error_path: path,
					error_field: field,
					error_type: typeof data[field],
					error_value: data[field]
				};
			} else {
				return { status: false };
			}
		}
		
		for (var field in data) {
			path += (path && path.length) ? ' -> '+field : field;

			if (!is_plain_type(data[field])) {
				return {
					status: false,
					data: data,
					error_path: path,
					error_field: field,
					error_type: typeof data[field],
					error_value: data[field]
				};
			}
			if ("object" === typeof data[field]) {
				var result = UpdraftCentral.is_serializable(data[field], field, path);
				if (result.hasOwnProperty('status') && !result.status) {
					return {
						status: false,
						data: result.data,
						error_path: result.error_path,
						error_field: result.error_field,
						error_type: typeof result.data[result.error_field],
						error_value: result.data[result.error_field]
					};
				} else {
					// Reset path if we received a valid data during iteration.
					path = origin;
				}
			}
		}
		return true;
	}
	
	/**
	 * Send a command to the remote site. This is a very thin wrapper around send_ajax.
	 *
	 * @param {string} rpc_command - the command to send
	 * @param {*} data - the data to send with the command
	 * @param {Object} $site_row - the jQuery object for the row of the site that the request is being sent to
	 * @param {RPCCallback} callback - function to call with the results
	 * @param {Object|null|false} spinner_where - jQuery object indicating where any spinner should be shown
	 * @param {number} [timeout=30] - the number of seconds for the timeout on the HTTP call
	 * @param {string} connection_method - use this to over-ride the connection method from the default for the site
	 *
	 * @uses send_ajax
	 *
	 * @returns {void}
	 */
	this.send_site_rpc = function(rpc_command, data, $site_row, callback, spinner_where, timeout, connection_method) {
		
		var result = UpdraftCentral.is_serializable(data);

		if (null !== data && result.hasOwnProperty('status') && !result.status) {
			console.log('UpdraftCentral: send_site_rpc(' + rpc_command + ') - the submitted data parameter contains unserializable types (follows)');
			if (result.hasOwnProperty('error_field') && result.error_field) {
				console.log('Error path: '+result.error_path);
				console.log('Error field: '+result.error_field);
				console.log('Error type: '+result.error_type);
				console.log('Error value follows:');
				console.log(result.error_value);
			} else {
				console.log(data);
			}

			callback.call(this, {
				error: udclion.js_exception_occurred
			}, 'error', null);
			
			return;
		}
	
		timeout = 'undefined' !== typeof timeout ? timeout : 30;
		
		var site_id = $site_row.data('site_id');
		
		if (!site_id) {
			console.log("UpdraftCentral: sent_site_rpc("+rpc_command+") command sent, but site ID could not be identified from the row (follows)");
			console.log($site_row);
		}

		connection_method = ('undefined' === typeof connection_method) ? $site_row.data('connection_method') : connection_method;
		
		// Overwrite the connection_method if this is a updraftclone command
		connection_method = (0 === rpc_command.lastIndexOf('updraftclone.', 0)) ? 'via_mothership' : connection_method;
		
		if ('undefined' === typeof spinner_where || null === spinner_where) { spinner_where = $site_row; }

		try {
			return UpdraftCentral.send_ajax(rpc_command, data, $site_row, connection_method, spinner_where, callback, timeout);
		} catch (e) {
			if (spinner_where) {
				$(spinner_where).children('.updraftcentral_spinner').remove();
			}

			// Here, we're triggering the callback with a code 'error' and passing in
			// the error that was catched by the try-catch block. This should help the caller to handle the error by itself. By
			// returning "true" (boolean) it will bypass the default error dialog to display,
			// meaning, the error was already handled by the caller (e.g. displayed, etc.), otherwise, the default
			// dialog will be shown to the user.
			var is_error_handled = callback.call(this, {
				error: e.toString()
			}, 'error', null);
			
			if (typeof is_error_handled === 'undefined' || !is_error_handled) {
				// add_dashboard_notice(udclion.js_exception_occurred+'<br>'+e.toString(), 'error');
				var website = ('undefined' !== typeof $site_row && $site_row.length) ? $site_row.data('site_description')+' - ' : '';

				UpdraftCentral_Library.dialog.alert('<h2>'+website+udclion.error+'</h2>'+udclion.js_exception_occurred+'<br>'+e.toString());
				console.log(e);
			}
		}
	}

	$('#updraftcentral_dashboard .updraft-central-logo img').on('dblclick', function() {
		UpdraftCentral_Library.toggle_fullscreen();
	});
	
	$('#updraft-central-navigation button.updraft-full-screen').on('click', function() {
		UpdraftCentral_Library.toggle_fullscreen();
	});

	$('#updraft-central-navigation button.updraftcentral-help').on('click', function() {
		UpdraftCentral_Library.dialog.alert(UpdraftCentral.template_replace('dashboard-help', { uc_version: udclion.updraftcentral_version+': '+udclion.udc_version, running_on: UpdraftCentral.version_info_as_text() }));
	});

	/**
	 * Monitors a DOM node whether child nodes have been added or removed
	 *
	 * @param {object}   element  An object representing the DOM node to monitor
	 * @param {function} callback A function that will be called when a child node has been added or removed
	 * @param {string}   id       An identifier string for the given subscription
	 *
	 * @returns {void}
	 */
	this.subscribe_to_node_changes = function(element, callback, id) {
		if ('undefined' !== typeof id && id && !observers.exists(id)) {
			var mo_class = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
			if ('undefined' !== typeof mo_class && mo_class) {
				var observer = new mo_class(callback);
				observer.observe($(element).get(0), {
					attributes: false,
					childList: true,
					characterData: false,
					subtree: false
				});

				observers.add(id, observer);
			}
		}
	}

	/**
	 * Unsubscribe to node changes monitoring
	 *
	 * @param {string} id An identifier string for the given subscription
	 *
	 * @returns {void}
	 */
	this.unsubscribe_to_node_changes = function(id) {
		if ('undefined' !== typeof id && id && observers.exists(id)) {
			var observer = observers.item(id);
			observer.disconnect();
			observers.remove(id);
		}
	}

	/**
	 * Return a string with information on the current installation
	 *
	 * @returns {string} information on the current installation
	 */
	this.version_info_as_text = function() {
		return 'WP/'+udclion.wp_version+' PHP/'+udclion.php_version+' MySQL/'+udclion.mysql_version+' Curl/'+udclion.curl_version;
	}
		
	$('#updraft-central-navigation button.updraftcentral-settings').on('click', function() {
		// Check and verify that a process is currently not running before
		// executing the below code to prevent from abruptly aborting the current process
		// which may lead to JS errors or/and inconsistency of information displayed to the user
		if (self.check_processing_state()) return;

		UpdraftCentral.open_modal(udclion.settings, UpdraftCentral.template_replace('dashboard-settings', {
			uc_version: udclion.updraftcentral_version+': '+udclion.udc_version,
			running_on: UpdraftCentral.version_info_as_text(),
			timeout: udclion.user_defined_timeout,
			shortcut_status: udclion.shortcut_status,
			load_setting: udclion.load_setting,
		}), function() {
			var timeout = $('#updraftcentral_settings_timeout').val();
			if (!timeout.length || !UpdraftCentral_Library.is_numeric(timeout) || timeout < 30) timeout = 30;	// Default is 30 seconds

			$location = $('#updraftcentral_modal > .uc-settings-container');
			var settings = {
				timeout: timeout,
				shortcut_status: $('input[name="uc-shortcuts-activate"]').is(":checked") ? 'active' : 'inactive',
				load_setting: $('input[name="uc-load-activate"]').is(":checked") ? 'active' : 'inactive',
			}

			UpdraftCentral.save_settings(settings, $location).then(function(response) {
				// On success, reflect the recent settings changes without waiting
				// for the user to reload the page
				udclion.user_defined_timeout = settings.timeout;
				udclion.shortcut_status = settings.shortcut_status;
				udclion.load_setting = settings.load_setting;

				var new_debugging_level = $('#updraftcentral_debug_level').val();
				if (new_debugging_level >= 0 && new_debugging_level <=3) {
					UpdraftCentral.set_debug_level(new_debugging_level);
				}

				UpdraftCentral.close_modal();
			});
		}, udclion.save_settings, function() {
			$('#updraftcentral_debug_level').val(updraftcentral_debug_level);
		});
		
	});
	
	// Refresh dashicon rotates after it has been clicked - stops when the settings are refreshed.
	$('.updraftcentral_row_extracontents').on('click', '.dashicons-image-rotate', function() {
		$('.dashicons-image-rotate').addClass('dashicon-image-rotating');
	});
	
	/**
	 * Returns the result of filling in the specified Handlebars (http://handlebarsjs.com) template with the provided values
	 *
	 * @param {string} template_name - the name of the Handlebars template, based (though it is filterable) on the path within the 'templates' directory, with slashes replaced by dashes. e.g. templates/dashboard/something.handlebars.html is accessed via a name of 'dashboard-something'
	 * @param {Object} [vars] - an object with properties (and corresponding values) corresponding to the named variables in the template and the values to replace them. N.B. The udclion object is always passed through (as udclion).
	 * @param {Object} [attr_vars] - an optional object with properties (and corresponding values) corresponding to the named variables in the template and the values to replace them, but for which the values will first be sanitized for use in HTML attributes. This may not be necessary on input which isn't user-supplied (e.g. its format may already be known to be attribute-safe).
	 *
	 * @returns {string} The template with values filled in
	 */
	this.template_replace = function(template_name, vars, attr_vars) {
		vars = ('undefined' === typeof vars) ? {} : vars;
		if (!UpdraftCentral_Handlebars.hasOwnProperty(template_name)) {
			console.log("UDCentral: UpdraftCentral_Handlebars template not found: "+template_name);
			console.log(UpdraftCentral_Handlebars);
		}
		if ('undefined' !== typeof attr_vars) {
			$.each(attr_vars, function(k, v) {
				vars[k] = UpdraftCentral_Library.quote_attribute(v);
			});
		}
		vars.udclion = udclion;
		
		// Checks if the template was compiled by gulp-handlebars and not the default node compiler
		if ("object" === typeof UpdraftCentral_Handlebars[template_name]) {
			return UpdraftCentral_Handlebars[template_name].handlebars(vars)
		}
		return UpdraftCentral_Handlebars[template_name](vars);
	}
	
	UpdraftCentral_Handlebars = (typeof UpdraftCentral_Handlebars === 'undefined') ? {} : UpdraftCentral_Handlebars;
	
	Handlebars.registerHelper('uc_each', function(context, options) {
		var ret = "";
		if ('undefined' === typeof context) { return ret; }
		for (var i=0, j=context.length; i<j; i++) {
			var vars = context[i];
			if (!vars.hasOwnProperty('as_json')) vars.as_json = JSON.stringify(vars);
			if (!vars.hasOwnProperty('udclion')) vars.udclion = udclion;
			ret = ret + options.fn(vars);
		}
		return ret;
	});
	
	/**
	 * Compiles any Handlebars templates that have been passed into the page. By default, they are pre-compiled; but compilation happens in-browser when in developer mode.
	 *
	 * @returns {void}
	 */
	function compile_handlebars_templates() {
		// Initialise Handlebars.templates - it may not already exist
		if (!udclion.hasOwnProperty('handlebars')) return;
		if (udclion.handlebars.hasOwnProperty('compile')) {
			$.each(udclion.handlebars.compile, function(template_name, source) {
				console.log("UpdraftCentral: in developer mode: compile template: "+template_name);
				UpdraftCentral_Handlebars[template_name] = Handlebars.compile(source);
			});
		}
	}
	
	compile_handlebars_templates();
	
	setup_menunav();
	
	var init_interval = setInterval(function() {
		// It is very important that the initial state fo the "uc_module" is
		// undefined. Do not initialize it, let the "set_requested_mode" populate it to avoid
		// unexpected behaviour when setting the initial mode during UpdraftCentral page load.
		//
		// N.B. This will help avoid setting and forcing the dashmode mode to "sites" on multiple
		// occasions in either UpdraftCentral or UpdraftCentral-Premium. Also, this will give the
		// loading of any target module directly through the "uc_module" parameter to load properly
		// without being overwritten.
		if ('undefined' !== self.uc_module) {
			clearInterval(init_interval);

			set_dashboard_mode('sites');
			if (false !== self.uc_module) {
				$('#updraftcentral_dashboard_existingsites').trigger('updraftcentral_sites_loaded', { module: self.uc_module });
			}
		}
	}, 100);

	
	if ('undefined' !== typeof Modernizr && !Modernizr.lastchild) {
		console.log("UDCentral: Unsupported web browser");
		$('#updraftcentral_dashboard_loading').fadeOut();
		$('#updraftcentral_updraftplus_actions, #updraftcentral_sites_actions, #updraftcentral_dashboard_existingsites_container').remove();
		this.add_dashboard_notice(udclion.unsupported_browser, 'error', false);
	} else {
		
		$('#updraftcentral_dashboard_loading').fadeOut();
		$('#updraftcentral_dashboard_existingsites_container').fadeIn();
		
		if (udclion.hasOwnProperty('show_licence_counts') && udclion.show_licence_counts) { $('.updraftcentral_licence_info').show(); }
		
		// Refresh the sites list every 24 hours
		setInterval(function() {
			UpdraftCentral.send_ajax('sites_html', null, null, 'via_mothership_encrypting', '#updraftcentral_dashboard_existingsites', function(resp, code, error_code) {
				if ('ok' == code) {
					if (resp.hasOwnProperty('sites_html')) {
						UpdraftCentral.set_existing_sites_to(resp.sites_html);
					} else {
						console.log("Expected sites_html data not found:");
						console.log(resp);
					}
					if (resp.hasOwnProperty('status_info')) { process_sites_status_info(resp.status_info); }
				}
			});
		}, 86400000);
		
	}
	
	// Remove any indicated notices that came pre-printed on the page
	$('#updraftcentral_notice_container .updraftcentral_notice.remove_after_load').delay(30000).slideUp('slow', function() {
		$(this).remove();
	});
	
	// Move this out of the hierarchy, so that any parent elements in the theme with z-indexes can't result in it being hidden under the grey-out (since the grey-out is not in the hierarchy)
	$('#updraftcentral_modal_dialog').appendTo(document.body);
	
	/**
	 * Stores persistent data in the browser, using the HTML5 local storage API. Uses a fixed prefix of 'updraftcentral_' to avoid clashing with other applications.
	 *
	 * We are abstracting this to allow not only for expiring data, but for other possible future enhancements; e.g. an option to duplicate some items persiently in the database. For now we are keeping our options open.
	 *
	 * @param {string} key - storage key
	 * @param {*} data - data to store; must be data than can be turned into JSON
	 * @param {boolean} [can_expire=false] - whether the time of updating the data should be stored (to allow assessing its age when retrieving it). Note that this should always be used consistently (either always on, or always off) with any particular key - otherwise, its results can be out of date.
	 * @returns {void}
	 */
	this.storage_set = function(key, data, can_expire) {
		if ('undefined' !== typeof can_expire && can_expire) {
			var epoch_time = Math.floor(Date.now() / 1000);
			localStorage.setItem('updraftcentral_saved_at_'+key, epoch_time);
		}
		if (updraftcentral_debug_level > 1) {
			console.log("UpdraftCentral.storage_set(key="+key+")");
		}
		
		try {
			localStorage.setItem('updraftcentral_'+key, JSON.stringify(data));
		} catch (e) {
			console.log(e);
			var purged = this.storage_purge();
			if (purged > 0) {
				if (updraftcentral_debug_level > 1) {
					console.log("UpdraftCentral.storage_set(key="+key+") failed; but purged "+purged+" items, so trying again");
				}
				localStorage.setItem('updraftcentral_'+key, JSON.stringify(data));
			}
		}
		
	}
	
	/**
	 * Retrieves stored data from the browser, using the HTML5 local storage API. Uses a fixed prefix of 'updraftcentral_' to avoid clashing with other applications.
	 *
	 * @param {string} key - storage key
	 * @param {Number|Boolean} [maximum_age=false] - if set to a strictly positive numerical value, then only return the data if it was stored within the indicated number of seconds.
	 * @returns {*} - stored data. Returns null if the age check fails. The result for never-stored data is undefined.
	 */
	this.storage_get = function(key, maximum_age) {
		if ('undefined' !== typeof maximum_age && maximum_age > 0) {
			var stored_at = localStorage.getItem('updraftcentral_saved_at_'+key);
			if (!stored_at) { return null; }
			var epoch_time = Math.floor(Date.now() / 1000);
			var stored_ago = epoch_time - stored_at;
			if (UpdraftCentral.updraftcentral_debug_level > 1) {
				console.log("UpdraftCentral.storage_get(key="+key+", maximum_age="+maximum_age+"): stored_at="+stored_at+", epoch_time="+epoch_time+", stored_ago="+stored_ago);
			}
			
			if (stored_ago > maximum_age) { return null; }
		}
		var item = localStorage.getItem('updraftcentral_'+key);
		if ('undefined' === typeof item) { return null; }
		try {
			var parsed = JSON.parse(item);
			return parsed;
		} catch (e) {
		}
		return null;
	}
	
	/**
	 * Clean local storage, to reduce the risk of it over-flowing.
	 * The method used below is currently fairly naive, based on knowledge of how other componets user set_storage()
	 *
	 * @return {Integer} - the number of items purged
	 */
	this.storage_purge = function() {
		
		var purged = 0;
		
		for (i = localStorage.length - 1; i >=0; i--) {
			
			var key = localStorage.key(i);
			
			if (null === key) { continue; }
			
			var time_now = (new Date).getTime() / 1000;
			
			if (key.substring(0, 34) == 'updraftcentral_saved_at_wporg_api_') {
				
				var key_age = time_now - localStorage.getItem(key);
				
				// This should match the maximum expiry used with storage_get()
				if (key_age > 600) {
					if (updraftcentral_debug_level > 0) {
						console.log("UpdraftCentral::storage_purge(): purging key: "+key.substring(24)+" (age: "+key_age+" s)");
					}
					this.storage_remove(key.substring(24));
					purged++;
				}
				
			}
			
		}
		
		return purged;
		
	}
	
	/**
	 * Retrieves stored data from the browser, using the HTML5 local storage API. Uses a fixed prefix of 'updraftcentral_' to avoid clashing with other applications.
	 *
	 * @param {string} key - storage key
	 * @returns {void}
	 */
	this.storage_remove = function(key) {
		localStorage.removeItem('updraftcentral_saved_at_'+key);
		localStorage.removeItem('updraftcentral_'+key);
	}

	/**
	 * Records currently selected site and its current content
	 *
	 * N.B. Basically, this function records the content associated by
	 * the selected site before clicking another menu or selecting
	 * another website to work on. Implemented for ease of use and avoid
	 * or minimize redundant or repeatitive clicking.
	 */
	this.init_recorder = function() {
		self.recorder = new UpdraftCentral_Recorder();
		recorder.load();
	}

	/**
	 * Initializes the UpdraftCentral_Keyboard_Shortcuts class and
	 * its functionalities
	 *
	 * @returns {void}
	 */
	this.init_keyboard_shortcuts = function() {
		var shortcuts = new UpdraftCentral_Keyboard_Shortcuts();
		shortcuts.init();
	}
	
	/**
	 * Handles Modules Visibility. User can choose which modules to be visible / hidden in the sidebar
	 */
	var $modules = $('#visible-modules-container .updraft-menu-item-container');
	var $hidden_modules_container = $('#hidden-modules-container');
	var $module_visibility = $('.module-visibility');
	var visible_modules = [];
	var hidden_modules = [];
	var module_id = '';
	var $show_all = $('<div class="updraft-menu-item-container"><button id="updraft-menu-item-all" class="updraft-menu-item">' + udclion.show_all + '</button></div>');

	var $menu = $('#hidden-modules-menu');
	$menu.hide();

	var $hamburger = $('.uc-hidden-modules-menu');
	var $close = $('.uc-hidden-modules-close');
	$close.hide();

	/**
	 * Initializes modules visibility based on what is stored in Database (usermeta table)
	 */
	function initialize_module_visibility() {
		if ($(this).find('.dashicons-visibility').length > 0) {
			module_id = $(this).children('.updraft-menu-item').prop('id');
			module_id = module_id.replace('updraft-menu-item-', '');
			hidden_modules.push(module_id);
			$(this).hide();
		} else {
			module_id = $(this).children('.updraft-menu-item').prop('id');
			module_id = module_id.replace('updraft-menu-item-', '');
			visible_modules.push(module_id);
		}
	}

	$modules.each(initialize_module_visibility);

	if (0 === hidden_modules.length) {
		$hidden_modules_container.hide();
	} else if (hidden_modules.length > 1) {
		$show_all.appendTo($hidden_modules_container.next());
	}
	$hidden_modules_container.find('.uc-hidden-modules-label').text(udclion.hidden_modules + '(' + hidden_modules.length + ')');

	$module_visibility.on('mouseenter', function() {
		$(this).parent().find('.updraft-menu-item-links').addClass('updraft-menu-item-hover');
	}).on('mouseleave', function() {
		$(this).parent().find('.updraft-menu-item-links').removeClass('updraft-menu-item-hover');
	});

	/**
	 * Upon clicking module visibility icon, the visibility is toggled and stored in DB
	 */
	$('#updraft-central-navigation-sidebar').on('click', $module_visibility, function(evt) {
		if (!$(evt.target).parent().hasClass('module-visibility') && !$(evt.target).hasClass('module-visibility')) return;

		var $clicked_module = $(evt.target).closest('.module-visibility');
		module_id = $clicked_module.prev().attr('id');
		module_id = module_id.replace('updraft-menu-item-', '');
		var visibility = false;
		if (0 < $clicked_module.find('.dashicons-visibility').length) {
			hidden_modules = $.grep(hidden_modules, function(value) {
				return value != module_id;
			});
			visible_modules.push(module_id);
			visibility = true;
		} else {
			$clicked_module.html('<span class="dashicons dashicons-visibility"></span>');
			visible_modules = $.grep(visible_modules, function(value) {
				return value != module_id;
			});
			hidden_modules.push(module_id);
		}

		/**
		 * Sends ajax request to store toggled visibility. Also toggles visibility in front end upon successful ajax call.
		 */
		UpdraftCentral.send_ajax('module_visibility', {module_id: module_id, visibility: visibility}, null, 'via_mothership_encrypting', null, function (resp, code, error_code) {
			if ('ok' === code) {
				if (false === visibility) {
					$clicked_module.parent().clone().appendTo($menu);
					$clicked_module.prev().removeClass('updraft-menu-item-hover').parent().slideUp();
					$menu.find('.updraft-menu-item-links').removeClass('updraft-menu-item-hover').removeClass('updraft-menu-item-links-active');
					if ($menu.find('.updraft-menu-item-container').length > 0) {
						$hidden_modules_container.slideDown();
						if ($menu.find('.updraft-menu-item-container').length > 1) {
							$show_all.appendTo($hidden_modules_container.next());
						}
					}
				} else {
					$clicked_module.parent().remove();
					$('.updraft-menu-item-container').find('.updraft-menu-item-' + module_id).next().html('<span class="dashicons dashicons-hidden"></span>').parent().slideDown();
					if (0 === $menu.find('.updraft-menu-item-container').length) {
						$hidden_modules_container.slideUp();
					} else if ($menu.find('.updraft-menu-item-container').length < 2) {
						$show_all.remove();
					}
				}
				$hidden_modules_container.find('.uc-hidden-modules-label').text(udclion.hidden_modules + '(' + hidden_modules.length + ')');
			}
		});

	});

	/**
	 * Resets all module visibility. Make all modules it visible
	 */
	$('#updraft-central-navigation-sidebar').on('click', '#updraft-menu-item-all', function() {
		UpdraftCentral.send_ajax('reset_modules_visibility', 'all', null, 'via_mothership_encrypting', null, function (resp, code, error_code) {
			if ('ok' === code) {
				$modules.each(initialize_module_visibility);
				$modules.each(function() {
					$(this).find('.updraft-menu-item').removeClass('updraft-menu-item-hover');
					$(this).slideDown();
					$('.module-visibility', this).html('<span class="dashicons dashicons-hidden"></span>');
				});
				$hidden_modules_container.slideUp('normal', function() {
					$close.hide();
					$hamburger.show();
					$menu.hide();
					$menu.find('.updraft-menu-item-container').remove();
				});
				hidden_modules.length = 0;
			}
		});
	});

	$hamburger.on('click', function() {
		$menu.slideToggle('normal', function() {
			$close.show();
			$hamburger.hide();
		});
	});

	$close.on('click', function() {
		$menu.slideToggle('normal', function() {
			$close.hide();
			$hamburger.show();
		});
	});

	return this;
};

