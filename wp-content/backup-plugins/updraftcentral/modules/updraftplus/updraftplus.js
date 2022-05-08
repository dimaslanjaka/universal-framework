jQuery(function($) {
	UpdraftCentral_Module_UpdraftPlus = new UpdraftCentral_UpdraftPlus_Module();
	
	// To allow labelauty remote storage buttons to be used with keyboard
	jQuery(document).on('keyup', function(event) {
		if (event.keyCode === 32 || event.keyCode === 13) {
			if (jQuery(document.activeElement).is("input.labelauty + label")) {
				var for_box = jQuery(document.activeElement).attr("for");
				if (for_box) {
					jQuery("#"+for_box).trigger('change');
				}
			}
		}
	});

	/*
		* Handlebars helper function to replace all password chars into asterisk char
		*
		* @param {string} password Required. The plain-text password
		*
		* @return {string}
	*/
	Handlebars.registerHelper('maskPassword', function(password) {
		return password.replace(/./gi,'*');
	});

	/*
		 * Handlebars helper function that wraps javascript encodeURIComponent so that it could encode the following characters: , / ? : @ & = + $ #
		 *
		 * @param {string} uri Required. The URI to be encoded
	 */
	Handlebars.registerHelper('encodeURIComponent', function(uri) {
		return encodeURIComponent(uri);
	});

	/**
	 * Handlebars helper function to compare two values using a specifed operator
	 *
	 * @see https://stackoverflow.com/questions/8853396/logical-operator-in-a-handlebars-js-if-conditional#answer-16315366
	 *
	 * @param {mixed} v1 the first value to compare
	 * @param {mixed} v2 the second value to compare
	 *
	 * @return {boolean} true if the first value matched against the second value, false otherwise
	 */
	Handlebars.registerHelper('ifCond', function(v1, operator, v2, options) {
		switch (operator) {
			case '==':
				return (v1 == v2) ? options.fn(this) : options.inverse(this);
			case '===':
				return (v1 === v2) ? options.fn(this) : options.inverse(this);
			case '!=':
				return (v1 != v2) ? options.fn(this) : options.inverse(this);
			case '!==':
				return (v1 !== v2) ? options.fn(this) : options.inverse(this);
			case '<':
				return (v1 < v2) ? options.fn(this) : options.inverse(this);
			case '<=':
				return (v1 <= v2) ? options.fn(this) : options.inverse(this);
			case '>':
				return (v1 > v2) ? options.fn(this) : options.inverse(this);
			case '>=':
				return (v1 >= v2) ? options.fn(this) : options.inverse(this);
			case '&&':
				return (v1 && v2) ? options.fn(this) : options.inverse(this);
			case '||':
				return (v1 || v2) ? options.fn(this) : options.inverse(this);
			case 'typeof':
				return (v1 === typeof v2) ? options.fn(this) : options.inverse(this);
			case 'not_typeof':
				return (v1 !== typeof v2) ? options.fn(this) : options.inverse(this);
			default:
				return options.inverse(this);
		}
	});

	/**
	 * Handlebars helper function for looping through a block of code a specified number of times
	 *
	 * @param {mixed} from the start value
	 * @param {mixed} to   the end value where the loop will stop
	 * @param {mixed} incr the increment number
	 *
	 * @return {mixed} the current processing number
	 */
	Handlebars.registerHelper('for', function(from, to, incr, block) {
		var accum = '';
		for (var i = from; i < to; i += incr)
			accum += block.fn(i);
		return accum;
	});

	/**
	 * Assign value into a variable
	 *
	 * @param {string} name the variable name
	 * @param {mixed}  val  the value
	 */
	Handlebars.registerHelper('set_var', function(name, val, options) {
		if (!options.data.root) {
			options.data.root = {};
		}
		options.data.root[name] = val;
	});

	/**
	 * Get length of an array/object
	 *
	 * @param {mixed} object the object
	 */
	Handlebars.registerHelper('get_length', function(object) {
		if ("undefined" !== typeof object && false === object instanceof Array) {
			return Object.keys(object).length;
		} else if (true === object instanceof Array) {
			return object.length;
		} else {
			return 0;
		}
	});
});

/**
 * UpdraftCentral UpdraftPlus Module
 *
 * @return {void}
 */
function UpdraftCentral_UpdraftPlus_Module() {
	
	var $ = jQuery;
	
	var settings_css_sub_prefix = '.updraftcentral_row_extracontents .updraft_site_settings_output ';
	var settings_css_prefix = '#updraftcentral_dashboard_existingsites '+settings_css_sub_prefix;

	var backup_listener_ticks = {};
	var restored_items = new UpdraftCentral_Collection();
	var selected_items = new UpdraftCentral_Collection();
	var delete_action = 'single';
	
	/**
	 * Inserts bulk delete elements (input boxes, bulk delete button) along with the collapsable info
	 * to an existing template pulled from the remote controlled website for the "Existing Backups" section.
	 *
	 * @param {Object} site_row - the jQuery object of the row that the existing backup data was pulled from
	 * @return {void}
	 */
	function insert_bulk_delete($site_row) {
		var keys = [];
		$site_row.find('tr.updraft_existing_backups_row').each(function() {
			var key = $(this).data('key');
			var buttons = $(this).find('button.updraft_download_button');

			if (buttons.length) {
				var container = buttons[0].closest('td');
				if (-1 === $.inArray(key, keys)) {
					keys.push(key);

					$(container).prepend('<a class="show-backup-data" data-key="'+key+'"><span class="dashicons dashicons-arrow-right"></span> '+udclion.updraftplus.select_backup_data+'</a>');
					$(container).find('button.updraft_download_button').wrapAll('<span class="backup-data-'+key+' hide-backup-data"></span>');
				}
			}
		});

		UpdraftCentral.register_event_handler('click', 'a.show-backup-data', function() {
			var key = $(this).data('key');

			$(this).find('span.dashicons').toggleClass('dashicons-arrow-right dashicons-arrow-down');
			$(this).parent().find('.backup-label-container-'+key).toggleClass('hide-backup-data');
			$(this).parent().find('.backup-data-'+key).toggleClass('hide-backup-data');
		});
	
		var $backup_date_label = $site_row.find('.updraftcentral_row_extracontents div.backup_date_label');
		if (!$backup_date_label.length) {
			$site_row.find('.updraftcentral_row_extracontents td.updraft_existingbackup_date').each(function() {
				var backup_item = $(this);
				backup_item.wrapInner('<div class="backup_date_label"></div>');
			});

			$backup_date_label = $site_row.find('.updraftcentral_row_extracontents div.backup_date_label');
		}

		if ($backup_date_label.length) {
			$backup_date_label.prepend('<div class="delete-backup-container"><input type="checkbox" class="delete_backup_item" name="delete_backup" value="1" /></div>');

			var $backup_container = $site_row.find('.updraftcentral_row_extracontents div.updraft_existing_backups');
			$backup_container.append('<button id="btn-backup-bulk-delete" class="btn btn-secondary">'+udclion.updraftplus.delete_selected+'</button>');
		}

		// Adding new columns for backup label and storage
		insert_storage_column($site_row);
		insert_label_column($site_row);
	}

	/**
	 * Inserts column to the existing backups table
	 *
	 * @param {Object}  $site_row The jQuery object of the row that the existing backup data was pulled from
	 * @param {String}  column      The desired column name
	 * @param {Boolean} [add_class] Optional - A flag whether to add the 'updraft_existingbackup_data' class.
	 * @return {Object} jQuery object representing the backups table
	 */
	function insert_existingbackup_column($site_row, column, add_class) {
		var $table = $site_row.find('.updraftcentral_row_extracontents table.existing-backups-table');
		var $header = $table.find('thead th.backup-date');
		var $content = $table.find('tbody td.updraft_existingbackup_date');
		if ('undefined' !== typeof add_class && add_class) $content.next('td').attr('class', 'updraft_existingbackup_data');

		$('<th class="backup-'+column+'">'+udclion.updraftplus.backup+' '+column+'</th>').insertAfter($header);
		$('<td class="updraft_existingbackup_'+column+'"></td>').insertAfter($content);

		return $table;
	}

	/**
	 * Inserts the storage column
	 *
	 * @param {Object}  $site_row The jQuery object of the row that the existing backup data was pulled from
	 * @return {void}
	 */
	function insert_storage_column($site_row) {
		$table = insert_existingbackup_column($site_row, 'storage', true);
		$table.find('tr.updraft_existing_backups_row').each(function() {
			var $tr = $(this);
			$tr.find('.backup_date_label img.stored_icon').each(function() {
				$(this).appendTo($tr.find('td.updraft_existingbackup_storage'));
			});
		});
	}

	/**
	 * Inserts the label column
	 *
	 * @param {Object} $site_row The jQuery object of the row that the existing backup data was pulled from
	 * @return {void}
	 */
	function insert_label_column($site_row) {
		var $table = $site_row.find('.updraftcentral_row_extracontents table.existing-backups-table');
		$table.find('tr.updraft_existing_backups_row').each(function() {
			var $tr = $(this);
			var $show_backup_data = $tr.find('td.updraft_existingbackup_data a.show-backup-data');
			var class_name = 'backup-label-container-'+$show_backup_data.data('key');
			$('<div class="'+class_name+' hide-backup-data"></div>').insertAfter($show_backup_data);

			$tr.find('.backup_date_label br').wrap('<span></span>');
			$tr.find('.backup_date_label .clear-right ~ span').appendTo($tr.find('div.'+class_name));
		});
	}
	
	// Backup now listeners

	/**
	 * Listener function for handling "Backup Now" listeners
	 *
	 * @param {Object} site_listener_row - the jQuery object of the row of the listener
	 * @param {Object} site_row - the jQuery object of the row that the backup is for
	 * @param {number} site_id - the site ID of the site that the backup is for
	 *
	 * @return {void}
	 */
	function listener_processor_updraftplus_backup(site_listener_row, site_row, site_id) {
		
		if ($(site_listener_row).find('.updraft_finished').length > 0) {
			if (UpdraftCentral.get_debug_level() > 1) {
				console.log("UDCentral: UpdraftPlus backup listener: job finished");
			}
			// This means, "finished, and close it after a delay")
			return 0;
		}
		
		var job_id = $(site_listener_row).data('job_id');
		
		if (!backup_listener_ticks.hasOwnProperty(job_id)) { backup_listener_ticks[job_id] = 0; }
		
		backup_listener_ticks[job_id]++;
		
		if (backup_listener_ticks[job_id] < 30 || 0 == backup_listener_ticks[job_id] % 3) {
			return { call: 'updraftplus.backup_progress', data: { job_id: job_id } };
		} else {
			// Means "do nothing, but not because we're finished"
			return null;
		}
	}
	
	/**
	 * Listener function for handling "Backup Now" listener results
	 *
	 * @param {Object} site_listener_row - the jQuery object of the row of the listener
	 * @param {Object} site_row - the jQuery object of the row that the backup is for
	 * @param {number} site_id - the site ID of the site that the backup is for
	 * @param {*} data - the data returned by the remote call to get the backup progress
	 *
	 * @return {void}
	 */
	function result_listener_processor_updraftplus_backup_progress(site_listener_row, site_row, site_id, data) {
		var output = '';
		if (data.hasOwnProperty('l')) {
			output += '<strong>'+udclion.updraftplus.lastlogline+':</strong> '+data.l+'<br>';
		}
		if (data.hasOwnProperty('j')) {
			output += data.j;
		}
		$(site_listener_row).find('.backup_state:first').html(UpdraftCentral_Library.sanitize_html(output));
		
		// here we get the attributes that come with the response and make our own progressbar using bootstrap's one.
		var info = (jQuery.type($(site_listener_row).find('.updraft_percentage').data('info')) === "undefined" ) ? udclion.updraftplus.missing_data_attributes : UpdraftCentral_Library.sanitize_html($(site_listener_row).find('.updraft_percentage').data('info'));
		var stage = (jQuery.type($(site_listener_row).find('.updraft_percentage').data('progress')) === "undefined" ) ? '0' : UpdraftCentral_Library.quote_attribute($(site_listener_row).find('.updraft_percentage').data('progress'));
		
		var html_to_show = "<div class='text-center' id='info"+site_id+"'>"+info+"</div>";
		html_to_show +="<progress class='progress progress-updraftcentral' value='"+stage+"' max='100' ></progress>";
		
		$(site_listener_row).find('.curstage').html(html_to_show);
	}
	UpdraftCentral.register_listener_processor('updraftplus_backup', listener_processor_updraftplus_backup);
	UpdraftCentral.register_listener_processor('updraftplus.backup_progress', result_listener_processor_updraftplus_backup_progress);
	
	/**
	 * A listener function for feeding back on what downloads need monitoring
	 *
	 * @param {Object} site_listener_row - jQuery object of the listener row involved
	 * @param {Object} site_row - jQuery object of the site row of the site involved
	 * @param {number} site_id - the site ID (an integer)
	 *
	 * @return {void}
	 */
	function listener_processor_updraftplus_download(site_listener_row, site_row, site_id) {
		
		var items = [];
		var all_finished = null;
		$(site_listener_row).find('.updraftplus_downloader').each(function(index, item) {
			if ($(item).data('updraft_finished')) {
				if (null === all_finished) { all_finished = true; }
			} else {
				all_finished = false;
			}
			var findex = $(item).data('findex');
			var what = $(item).data('what');
			var backup_timestamp = $(item).data('backup_timestamp');
			// <base(arbitrary - put anything you want returned)>,<timestamp>,<type>(,<findex>)
			items.push(site_id+','+backup_timestamp+','+what+','+findex);
		});
		
		if (all_finished) {
			console.log("UDCentral: UpdraftPlus download listener: job finished - will not poll any more");
			// 1 means "don't poll this any more, but don't close it either"
			return 1;
		}
		
		return { call: 'updraftplus.get_download_status', data: items };
	}
	
	/**
	 * Update the listener(s) with the returned download info
	 *
	 * @param {Object} status - an object with various properties corresponding to the download state as returned by UD
	 *
	 * @return {number} - whether to not bother with polling again (advisory)
	 */
	function updraft_downloader_status_update(status) {

		var site_id = status.base;
		var fullpath = status.f;
		var findex = status.findex;
		var message = status.m;
		var percent = status.hasOwnProperty('p') ? status.p : null;
		var size_downloaded = status.s;
		var total_size = status.t;
		var backup_timestamp = status.timestamp;
		var what = status.what;
		
		var stid = site_id+'_'+backup_timestamp+'_'+what+'_'+findex;
		var stid_selector = '#updraftcentral_notice_container .'+stid;
		
		var cancel_repeat = 0;
		
		if (status.hasOwnProperty('failed') && status.failed) {
			$(stid_selector).data('updraft_finished', true);
		}
		
		if (status.hasOwnProperty('e') && status.e) {
			$(stid_selector+' .raw').html('<strong>'+udclion.error+':</strong> '+status.e);
			console.log("UDCentral: UpdraftPlus: downloader ("+stid+"): an error was returned (follows)");
			console.log(status);
		} else if (status.p !== null) {
			$(stid_selector+'_st .dlfileprogress').width(status.p+'%');
			// Is a restart appropriate?
			// status.a, if set, indicates that a) the download is incomplete and b) the value is the number of seconds since the file was last modified...
			if (status.a != null && status.a > 0) {
				
				var time_now = (new Date).getTime();
				
				var last_time_began = $(stid_selector).data('last_time_began');
				// Remember that this is in milliseconds
				var since_last_restart = time_now - last_time_began;

				if (status.a > 90 && since_last_restart > 60000) {
					console.log("UDCentral: UpdraftPlus: "+stid+": restarting download: file_age="+status.a+", since_last_restart_ms="+since_last_restart);
					
					var downloader_params = {
						type: what,
						timestamp: backup_timestamp,
						findex: findex
					};
					
					var $site_row = $('#updraftcentral_dashboard_existingsites .updraftcentral_site_row[data-site_id="'+site_id+'"');
					
					// We set this, regardless of success/failure, because we don't want to send the same request multiple times, whether it succeeds or not, until an interval has passed
					$(stid_selector).data('last_time_began', (new Date).getTime());
					
					// We don't do anything with a positive result, in terms of creating listeners, etc., because those already exist
					UpdraftCentral.send_site_rpc('updraftplus.downloader', downloader_params, $site_row, function(response, code, error_code) {
						if ('ok' != code) {
							$(stid_selector+' .raw').html(udclion.updraftplus.backup_start_failed);
							console.log("code="+code+", error_code="+error_code);
							console.log(response);
						}
					});
					
				}
			}
			
			if (status.hasOwnProperty('m') && status.m != null) {
				
				if (status.p < 100) {
					$(stid_selector+' .raw').html(status.m);
				} else {
				
					msg = template_replace('updraftplus-downloaded', {
						file_ready: udclion.updraftplus.file_ready,
						download_to_computer: udclion.updraftplus.download_to_computer,
						and_then: udclion.updraftplus.and_then,
						you_should: udclion.updraftplus.you_should,
						backup_timestamp: backup_timestamp,
						site_id: site_id,
						what: what,
						findex: findex,
						delete_from_server: udclion.updraftplus.delete_from_server
					});
					$(stid_selector).data('updraft_finished', true);
					$(stid_selector+' .raw').html(msg);
				}
			}
			
			// dlstatus_lastlog = response;
		} else if (status.m != null) {
			$(stid_selector+' .raw').html(status.m);
		} else {
			$(stid_selector+' .raw').html(udclion.updraftplus.backup_start_failed);
			cancel_repeat = 1;
		}
		return cancel_repeat;
	}
	
	/**
	 * Process the results of the request for updates on the download status
	 *
	 * @param {Object} site_listener_row - jQuery object for the listener that made the request (not used)
	 * @param {Object} site_row - jQuery object for the site that the request was to (not used)
	 * @param {number} site_id - the site ID for the site that the request was to (not used)
	 * @param {array} data - the returned download statuses (one array member for each downloader that information was requested on)
	 *
	 * @return {void}
	 */
	function result_listener_processor_updraftplus_get_download_status(site_listener_row, site_row, site_id, data) {
		$.each(data, function(index, status) {
			// Though the site_id is returned by UpdraftCentral's listener handling, it also comes back in the result - so, we don't need to pass anything on
			if (status.hasOwnProperty('base')) {
				var cancel_repeat = updraft_downloader_status_update(status);
			}
		});
	}
	UpdraftCentral.register_listener_processor('updraftplus_download', listener_processor_updraftplus_download);
	UpdraftCentral.register_listener_processor('updraftplus.get_download_status', result_listener_processor_updraftplus_get_download_status);
	
	/**
	 * Opens the dialog box for starting a "Backup Now" backup, via fetching the dialog contents (so that we get the relevant options) from the remote site
	 *
	 * @param {boolean} backupnow_nodb - indicate whether to exclude the database from the backup
	 * @param {boolean} backupnow_nofiles - indicate whether to exclude the files from the backup
	 * @param {boolean} backupnow_nocloud - indicate whether to skip sending the backup to any configured remote destination
	 * @param {string} [onlythesefileentities] - a comma-separated list of file entities to back up (only relevant if files are being backed up)
	 * @param {String} [onlythesetableentities] a comma-separated list of table entities to back up (only relevant if databases are being backed up)
	 * @param {*} [extradata] - arbitrary extra data to send with the backup request (though, of course, only relevant data will have any effect)
	 * @param {string} [label] - a label to give to the backup
	 * @param {String}  onlythesecloudservices An array of remote sorage locations to be backed up to
	 *
	 * @return {void}
	 */
	this.backupnow_go = function(backupnow_nodb, backupnow_nofiles, backupnow_nocloud, onlythesefileentities, extradata, label, onlythesetableentities, onlythesecloudservices) {
		
		var listener_title;
		if (extradata && extradata.hasOwnProperty('_listener_title')) {
			listener_title = extradata._listener_title;
			delete extradata._listener_title;
		}
		
		var params = {
			backupnow_nodb: backupnow_nodb,
			backupnow_nofiles: backupnow_nofiles,
			backupnow_nocloud: backupnow_nocloud,
			backupnow_label: label,
			extradata: extradata
		};
		
		if ('' != onlythesefileentities) {
			params.onlythisfileentity = onlythesefileentities;
		}

		if ('' != onlythesetableentities) {
			params.onlythesetableentities = onlythesetableentities;
		}

		if ('' != onlythesecloudservices) {
			params.onlythesecloudservices = onlythesecloudservices;
		}
		
		params.always_keep = (typeof extradata.always_keep !== 'undefined') ? extradata.always_keep : 0;

		params.incremental = (typeof extradata.incremental !== 'undefined') ? extradata.incremental : 0;
		
		UpdraftCentral.send_site_rpc('updraftplus.backupnow', params, UpdraftCentral.$site_row, function(response, code, error_code) {
			if ('ok' == code && false !== response && response.hasOwnProperty('data')) {
				if (response.data.hasOwnProperty('nonce')) {
					
					var listener_message = '<div class="backup_state">'+udclion.updraftplus.backupstarted +'</div>';
					
					var job_id = response.data.nonce;
					backup_listener_ticks[job_id] = 0;
					
					UpdraftCentral.create_dashboard_listener('updraftplus_backup', UpdraftCentral.$site_row, listener_message, { job_id: response.data.nonce }, listener_title);
					
				} else {
					UpdraftCentral.add_dashboard_notice('<h2>'+UpdraftCentral.$site_row.data('site_description')+'</h2>'+udclion.updraftplus.backup_start_failed, 'error');
				}
			}
		});
		
	}

	/**
	 * Create a download listener
	 *
	 * @param {number} site_id - the ID of the site that the downloader is for
	 * @param {number} backup_timestamp - the epoch time of the backup
	 * @param {string} what - the entity name to download (e.g. "plugins")
	 * @param {string} set_contents - comma-separated list of indexes corresponding to files to download
	 * @param {string} pretty_date - the formatted date of the backup
	 * @param {boolean} async - (unused; future possibility) whether to send the request asynchronously, or not
	 * @param {Object} spinner_where - a jQuery object indicating where to place the spinner
	 *
	 * @return {void}
	 */
	function updraft_downloader(site_id, backup_timestamp, what, set_contents, pretty_date, async, spinner_where) {
		
		if (typeof set_contents !== "string") set_contents = set_contents.toString();
		async = async ? true : false;
		
		set_contents = set_contents.split(',');

		// If there's an existing listener downloading from this site, then add our widget to it instead of creating another.
		var $listener = $('#updraftcentral_notice_container .updraftcentral_listener_updraftplus_download[data-site_id="'+site_id+'"');
		if ($listener.length == 0) { $listener = false; }
		
		for (var i=0; i<set_contents.length; i++) {
			
			// Create somewhere for the status to be found
			
			var findex = set_contents[i];
			var stid = site_id+'_'+backup_timestamp+'_'+what+'_'+findex;
			var stid_selector = '.'+stid;
			
			if ($(stid_selector).length) {
				console.log("UDCentral: There already appears to be an active downloader for this entity (stid: "+stid+")");
				return;
			}
			
			// Now send the actual request to kick it all off
			
			var downloader_params = {
				type: what,
				timestamp: backup_timestamp,
				findex: findex
			};
			
			UpdraftCentral.send_site_rpc('updraftplus.downloader', downloader_params, UpdraftCentral.$site_row, function(response, code, error_code) {
				if ('ok' == code && false !== response && response.hasOwnProperty('data') && response.data.hasOwnProperty('result')) {
					
					var result = response.data.result;
					var request = response.data.request;

					var backup_timestamp = request.timestamp;
					var what = request.type;
					var findex = parseInt(request.findex);
					
					var stid = site_id+'_'+backup_timestamp+'_'+what+'_'+findex;
					var stid_selector = '.'+stid;
					
					var msg = '??';
					
					var last_time_began = (new Date).getTime();

					var show_index = findex+1;
					var itext = (findex == 0) ? '' : ' ('+show_index+')';
					var prdate = (pretty_date) ? pretty_date : backup_timestamp;
						
					// This is the parent object, that contains the results. The updated results go into div.raw within this.
					widgets_html = template_replace('updraftplus-downloader', {
						stid: stid,
						download_verb: udclion.updraftplus.download_verb,
						what: what,
						itext: itext,
						pretty_date: prdate,
						begun_looking: udclion.updraftplus.begun_looking,
						site_id: site_id,
						backup_timestamp: backup_timestamp,
						findex: findex
					});
						
					// deleted|downloaded|needs_download|download_failed
					if ('downloaded' == result) {
						msg = template_replace('updraftplus-downloaded', {
							file_ready: udclion.updraftplus.file_ready,
							download_to_computer: udclion.updraftplus.download_to_computer,
							and_then: udclion.updraftplus.and_then,
							you_should: udclion.updraftplus.you_should,
							backup_timestamp: backup_timestamp,
							site_id: site_id,
							what: what,
							findex: findex,
							delete_from_server: udclion.updraftplus.delete_from_server
						});
					} else if ('needs_download' == result) {
						msg = udclion.updraftplus.needs_download;
					} else if ('download_failed' == result) {
						msg = udclion.updraftplus.download_failed;
					}
						
					if (false === $listener) {
						$listener = UpdraftCentral.create_dashboard_listener('updraftplus_download', UpdraftCentral.$site_row, widgets_html);
					} else {
						// Add a new widget into that listener
						$listener.append(widgets_html);
					}
					// If it was already marked as 'finished', then it won't be polled - we want it to start being polled again
					$listener.data('finished', false);
					$listener.find(stid_selector).data('last_time_began', last_time_began);
					$listener.find(stid_selector+' .raw').html(msg);
					
			
				} else {
					UpdraftCentral.add_dashboard_notice('<h2>'+UpdraftCentral.$site_row.data('site_description')+'</h2>'+udclion.updraftplus.download_start_failed, 'error');
				}
			});
			
		}
	}
	
	var updraftplus_morefiles_lastind = 0;
	var updraftplus_version = 0;
	
	/**
	 * Get the "Settings" panel from the remote UpdraftPlus
	 *
	 * @param {Object} $site_row - jQuery object for the row of the site for which the information is being requested
	 *
	 * @return {void}
	 */
	function updraft_get_existing_backup_settings($site_row) {
		
		$site_row.find('.updraftcentral_row_extracontents').css('opacity', '0.3');
		
		UpdraftCentral.send_site_rpc('updraftplus.get_settings', {
			include_database_decrypter: 0,
			include_adverts: 0,
			include_save_button: 1
			}, $site_row, function(response, code, error_code) {
			$site_row.find('.updraftcentral_row_extracontents').css('opacity', '1.0');
			if ('ok' == code && response) {
				$site_row.find('.updraftcentral_row_extracontents').html('<div class="updraft_site_settings_output"><button class="btn btn-refresh updraftcentral_site_backup_settings"><span class="dashicons dashicons-image-rotate "></span></button>'+UpdraftCentral_Library.sanitize_html(response.data.settings)+'</div>');
				if (response.data.hasOwnProperty('remote_storage_templates') && response.data.hasOwnProperty('remote_storage_options')) {
					var html = '';
					for (var method in response.data.remote_storage_templates) {
						if ('undefined' != typeof response.data.remote_storage_options[method]) {
							var template = Handlebars.compile(response.data.remote_storage_templates[method]);
							var first_instance = true;
							for (var instance_id in response.data.remote_storage_options[method]) {
								if ('default' === instance_id) continue;
								var context = response.data.remote_storage_options[method][instance_id];

								if ('undefined' == typeof context['instance_conditional_logic']) {
									context['instance_conditional_logic'] = {
										type: '', // always by default
										rules: [],
									};
								}
								context['instance_conditional_logic'].day_of_the_week_options = udclion.updraftplus.conditional_logic.day_of_the_week_options;
								context['instance_conditional_logic'].logic_options = udclion.updraftplus.conditional_logic.logic_options;
								context['instance_conditional_logic'].operand_options = udclion.updraftplus.conditional_logic.operand_options;
								context['instance_conditional_logic'].operator_options = udclion.updraftplus.conditional_logic.operator_options;

								context['first_instance'] = first_instance;
								if ('undefined' == typeof context['instance_enabled']) {
									context['instance_enabled'] = 1;
								}
								html += template(context);
								first_instance = false;
							}
						} else {
							html += response.data.remote_storage_templates[method];
						}
					}
					$('#remote-storage-holder').append(html);
				}
				
				$('.updraftcentral_row_extracontents #remote-storage-holder').on('click', '.updraftplusmethod a.updraft_add_instance', function(e) {
					e.preventDefault();

					var method = $(this).data('method');
					add_new_instance(method);
				});

				$('.updraftcentral_row_extracontents #remote-storage-holder').on('click', '.updraftplusmethod a.updraft_delete_instance', function(e) {
					e.preventDefault();

					var method = $(this).data('method');
					var instance_id = $(this).data('instance_id');

					if (1 === $('.' + method + '_updraft_remote_storage_border').length) {
						add_new_instance(method);
					}

					$('.' + method + '-' + instance_id).hide('slow', function() {
						$(this).remove();
					});
				});

				/**
				 * This method will get the default options and compile a template with them
				 *
				 * @param {string} method - the remote storage name
				 * @param {boolean} first_instance - indicates if this is the first instance of this type
				 */
				function add_new_instance(method) {
					var template = Handlebars.compile(response.data.remote_storage_templates[method]);
					var context = response.data.remote_storage_options[method]['default'];
					context['instance_id'] = 's-' + generate_instance_id(32);
					context['instance_enabled'] = 1;
					context['instance_conditional_logic'] = {
						type: '', // always by default
						rules: [],
						day_of_the_week_options: udclion.updraftplus.conditional_logic.day_of_the_week_options,
						logic_options: udclion.updraftplus.conditional_logic.logic_options,
						operand_options: udclion.updraftplus.conditional_logic.operand_options,
						operator_options: udclion.updraftplus.conditional_logic.operator_options,
					};
					var html = template(context);
					$(html).hide().insertAfter('.' + method + '_add_instance_container:first').show('slow');
				}

				/**
				 * This method will return a random instance id string
				 *
				 * @param {integer} length - the length of the string to be generated
				 *
				 * @return string         - the instance id
				 */
				function generate_instance_id(length) {
					var uuid = '';
					var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

					for (var i = 0; i < length; i++) {
						uuid += characters.charAt(Math.floor(Math.random() * characters.length));
					}

					return uuid;
				}
				
				$('.updraftcentral_row_extracontents #remote-storage-holder').on("change", "input[class='updraft_instance_toggle']", function () {
					if ($(this).is(':checked')) {
						$(this).siblings('label').html(udclion.updraftplus.instance_enabled);
					} else {
						$(this).siblings('label').html(udclion.updraftplus.instance_disabled);
					}
				});

				jQuery('.updraftcentral_row_extracontents #remote-storage-holder').on("change", "select[class='logic_type']", function () {
					updraft_settings_form_changed = true;
					if ('' !== this.value) {
						jQuery('div.logic', jQuery(this).parents('tr.updraftplusmethod')).show();
						jQuery(this).parents('tr.updraftplusmethod').find('div.logic ul.rules > li').each(function() {
							jQuery(this).find('select').each(function() {
								jQuery(this).prop('disabled', false);
							})
						});
					} else {
						jQuery(this).parents('tr.updraftplusmethod').find('div.logic ul.rules > li').each(function() {
							jQuery(this).find('select').each(function() {
								jQuery(this).prop('disabled', true);
							})
						});
						jQuery(this).parents('tr.updraftplusmethod').find('div.logic').hide();
					}
				});
			
				jQuery('.updraftcentral_row_extracontents #remote-storage-holder').on("change", "select[class='conditional_logic_operand']", function () {
					updraft_settings_form_changed = true;
					jQuery(this).parent().find('select:nth(2)').empty();
					if ('day_of_the_week' === jQuery(this).val()) {
						for (i=0; i<udclion.updraftplus.conditional_logic.day_of_the_week_options.length; i++) {
							jQuery(this).parent().find('select:nth(2)').append(jQuery('<option value="'+udclion.updraftplus.conditional_logic.day_of_the_week_options[i].index+'"></option>').text(udclion.updraftplus.conditional_logic.day_of_the_week_options[i].value));
						}
					} else if ('day_of_the_month' === jQuery(this).val()) {
						for (i=1; i<=31; i++) {
							jQuery(this).parent().find('select:nth(2)').append(jQuery('<option value="'+i+'"></option>').text(i));
						}
					}
				});
			
				jQuery('.updraftcentral_row_extracontents #remote-storage-holder').on("click", "div.conditional_remote_backup ul.rules li span", function () {
					updraft_settings_form_changed = true;
					var $ul = jQuery(this).parents('ul.rules');
					if (jQuery(this).hasClass('remove-rule')) {
						jQuery(this).parent().slideUp(function() {
							jQuery(this).remove();
							if (jQuery($ul).find('> li').length < 2) {
								jQuery('li:nth(0) span.remove-rule', $ul).remove();
							}
						});
					}
				});

				jQuery('.updraftcentral_row_extracontents #remote-storage-holder').on("click", "div.conditional_remote_backup input.add-new-rule", function () {
					var $ul = jQuery(this).parent().find('ul.rules');
					if (jQuery($ul).find('> li').length < 2) {
						jQuery($ul).find('li:nth(0)').append('<span class="remove-rule"><svg viewbox="0 0 25 25"><line x1="6.5" y1="18.5" x2="18.5" y2="6.5" fill="none" stroke="#FF6347" stroke-width="3" vector-effect="non-scaling-stroke" ></line><line y1="6.5" x1="6.5" y2="18.5" x2="18.5" fill="none" stroke="#FF6347" stroke-width="3" vector-effect="non-scaling-stroke" ></line></svg></span>');
					}
					$cloned_item = jQuery($ul).find('> li').last().clone();
					jQuery($cloned_item).find('> select').each(function() {
						jQuery(this).prop('name', jQuery(this).prop('name').replace(/\[instance_conditional_logic\]\[rules\]\[[0-9]+\]/gi, '[instance_conditional_logic][rules]['+jQuery($ul).data('rules')+']'));
					});
					jQuery($ul).append($cloned_item);
					jQuery($ul).data('rules', parseInt(jQuery($ul).data('rules')) + 1);
					jQuery($cloned_item).find('select[name*="[operand]"]').trigger('change');
				});

				/**
				 * For some reason, the google caja sanitizer is removing the "aria-label" attribute or is currently
				 * not supported. The "aria-label" is intended for accessibility and used by the labelauty to update the label
				 * tag's attribute. Thus, we're rebuilding the aria-label attribute based from the value of the checkbox element
				 * to restore the lost keyboard support (e.g. tab, etc.)
				 */
				$site_row.find('.updraftcentral_row_extracontents #remote-storage-container > input[type="checkbox"]').each(function() {
					var input = jQuery(this);
					input.attr('aria-label', udclion.updraftplus.backup_using + ' ' + input.val() + '?');
				});
				
				
				// Set the initial state of the schedule selection text and widgetry
				updraft_check_same_times();
				
				updraft_remote_storage_tabs_setup();
				
				updraft_extra_dbs = 0;
				updraftplus_morefiles_lastind = 0;
				
				if (response.data.hasOwnProperty('meta')) {
					
					var meta = response.data.meta;
					
					if (meta.hasOwnProperty('retain_rules') && meta.retain_rules.hasOwnProperty('files')) {
						setup_retain_rules(meta.retain_rules.files, meta.retain_rules.db);
					}
					
					if (meta.hasOwnProperty('extra_dbs')) {
						$.each(meta.extra_dbs, function(i, db) {
							if (db.hasOwnProperty('host')) {
								extradbs_add(db.host, db.user, db.name, db.pass, db.prefix);
							}
						});
					}
				}

				if (response.data.hasOwnProperty('updraftplus_version')) {
					updraftplus_version = response.data.updraftplus_version;
				}
				
				setup_file_entity_exclude_field('uploads');
				setup_file_entity_exclude_field('others');
				setup_file_entity_exclude_field('wpcore');
				
				reportbox_index = $('#updraftcentral_dashboard_existingsites .updraftcentral_row_extracontents .updraft_site_settings_output #updraft_report_cell .updraft_reportbox').length + 2;
				
				$('#updraftcentral_dashboard_existingsites .updraftcentral_row_extracontents .updraft_site_settings_output #updraft_include_more_paths input.updraft_include_more_path').each(function(i, input) {
					var mp_index = $(input).data(mp_index);
					if (mp_index > updraftplus_morefiles_lastind) { updraftplus_morefiles_lastind = mp_index; }
				});
				
				$('#updraftcentral_dashboard_existingsites .updraftcentral_row_extracontents .updraft_site_settings_output input[type="submit"]').removeClass().addClass('btn btn-primary-outline');
				
				// Update the WebDAV URL setting as the user edits
				$('#updraftcentral_dashboard_existingsites .updraft_site_settings_output').on("change keyup paste", '.updraft_webdav_settings', function() {
					
					var updraft_webdav_settings = [];
					var instance_id = "";
					$('.updraft_webdav_settings').each(function(index, item) {
						
						var id = $(item).attr('id');
						
						// The first part of the "if" is to handle the old options format and can be removed in future
						if (id && 'updraft_webdav_settings_' == id.substring(0, 24)) {
							var which_one = id.substring(24);
							updraft_webdav_settings[which_one] = this.value;
						} else if (id && 'updraft_webdav_' == id.substring(0, 15)) {
							var which_one = id.substring(15);
							id_split = which_one.split('_');
							which_one = id_split[0];
							instance_id = id_split[1];
							if ('undefined' == typeof updraft_webdav_settings[instance_id]) updraft_webdav_settings[instance_id] = [];
							updraft_webdav_settings[instance_id][which_one] = this.value;
						}

					});
					
					var updraft_webdav_url = "";
					var host = "@";
					var slash = "/";
					var colon = ":";
					var colon_port = ":";
					
					for (var instance_id in updraft_webdav_settings) {
					
						if (updraft_webdav_settings[instance_id]['host'].indexOf("@") >= 0 || "" === updraft_webdav_settings[instance_id]['host']) {
							host = "";
						}
						
						if (updraft_webdav_settings[instance_id]['host'].indexOf("/") >= 0 ) {
							$('#updraft_webdav_host_error').show();
						} else {
							$('#updraft_webdav_host_error').hide();
						}
						
						if (updraft_webdav_settings[instance_id]['path'].indexOf("/") == 0 || "" === updraft_webdav_settings[instance_id]['path']) {
							slash = "";
						}
						
						if ("" === updraft_webdav_settings[instance_id]['user'] || "" === updraft_webdav_settings[instance_id]['pass']) {
							colon = "";
						}
						
						if ("" === updraft_webdav_settings[instance_id]['host'] || "" === updraft_webdav_settings[instance_id]['port']) {
							colon_port = "";
						}
						
						updraft_webdav_url = updraft_webdav_settings[instance_id]['webdav'] + updraft_webdav_settings[instance_id]['user'] + colon + updraft_webdav_settings[instance_id]['pass'] + host + encodeURIComponent(updraft_webdav_settings[instance_id]['host']) + colon_port + updraft_webdav_settings[instance_id]['port'] + slash + updraft_webdav_settings[instance_id]['path'];
						masked_webdav_url = updraft_webdav_settings[instance_id]['webdav'] + updraft_webdav_settings[instance_id]['user'] + colon + updraft_webdav_settings[instance_id]['pass'].replace(/./gi, '*') + host + encodeURIComponent(updraft_webdav_settings[instance_id]['host']) + colon_port + updraft_webdav_settings[instance_id]['port'] + slash + updraft_webdav_settings[instance_id]['path'];

						// The first part of the "if" is to handle the old options format and can be removed in future
						if ("" == instance_id) {
							$('#updraftcentral_dashboard .updraft_site_settings_output #updraft_webdav_settings_url').val(updraft_webdav_url);
						} else {
							$('#updraftcentral_dashboard .updraft_site_settings_output #updraft_webdav_url_' + instance_id).val(updraft_webdav_url);
							$('#updraftcentral_dashboard .updraft_site_settings_output #updraft_webdav_masked_url_' + instance_id).val(masked_webdav_url);
						}
					}
				});
				
			}
		});
	}
		
	var updraft_extra_dbs = 0;
	/**
	 * Add a box for configuring backing of an extra database
	 *
	 * @param {string} host - The hostname of the MySQL database to be backed up
	 * @param {string} user - The MySQL username
	 * @param {string} name - The name of the MySQL database
	 * @param {string} pass - The MySQL password
	 * @param {string} prefix - Only tables prefixed with this string will be backed up. Pass an empty string to back them all up.
	 *
	 * @return {void}
	 */
	function extradbs_add(host, user, name, pass, prefix) {
		updraft_extra_dbs++;
		$(template_replace('updraftplus-settings-extra-db', {
			updraft_extra_dbs: updraft_extra_dbs,
			remove: udclion.updraftplus.remove,
			backup_external_database: udclion.updraftplus.backup_external_database,
			host: udclion.updraftplus.host,
			database: udclion.updraftplus.database,
			username: udclion.updraftplus.username,
			password: udclion.updraftplus.password,
			table_prefix: udclion.updraftplus.table_prefix,
			backup_tables_with_prefixes: udclion.updraftplus.backup_tables_with_prefixes,
			test_connection: udclion.updraftplus.test_connection
			}, {
			host_attr: host,
			user_attr: user,
			name_attr: name,
			pass_attr: pass,
			prefix_attr: prefix
		})).appendTo($('#updraft_backupextradbs')).fadeIn();
	}
	
	/**
	 * Registers listeners that occur on all tabs.
	 *
	 * @return {void}
	 */
	function register_global_listeners() {
		UpdraftCentral.register_row_clicker('.row_backupnow, .updraftcentral_site_backup_now', function($site_row) {
			backup_now($site_row, 'new');
		});

		UpdraftCentral.register_row_clicker('.row_backupnow, .updraftcentral_site_backup_now_increment', function ($site_row) {
			backup_now($site_row, 'incremental');
		});
		
		UpdraftCentral.register_modal_listener('#backupnow_includefiles_showmoreoptions', function(e) {
			e.preventDefault();
			$('#updraftcentral_modal #backupnow_includefiles_moreoptions').slideToggle();
		});

		UpdraftCentral.register_modal_listener('#backupnow_database_showmoreoptions', function(e) {
			e.preventDefault();
			$('#updraftcentral_modal #backupnow_database_moreoptions').slideToggle();
		});

		UpdraftCentral.register_modal_listener('#backupnow_includecloud_showmoreoptions', function(e) {
			e.preventDefault();
			$('#updraftcentral_modal #backupnow_includecloud_moreoptions').slideToggle();
		});
	}
	
	if ('notices' != UpdraftCentral.get_dashboard_mode()) { register_global_listeners(); }
	
	// Register the row clickers for all tabs
	$('#updraftcentral_dashboard_existingsites').on('updraftcentral_dashboard_mode_set', function(event, data) {
		
		// The 'upgrade' tab has no sites rows visible
		if (data && data.hasOwnProperty('new_mode') && 'notices' == data.new_mode) { return; }
		
		register_global_listeners();
		
	});
	
	// Register the row clickers for this tab
	$('#updraftcentral_dashboard_existingsites').on('updraftcentral_dashboard_mode_set_backups', function() {
		
		UpdraftCentral.register_row_clicker('.updraftcentral_row_extracontents .updraft_site_settings_output #updraft_backupextradb_another', function() {
			extradbs_add('', '', '', '', '');
		});
		
		UpdraftCentral.register_row_clicker('.updraftcentral_row_extracontents .updraft_site_settings_output #updraft_backupextradbs .updraft_backupextradbs_row_delete', function() {
			$(this).parents('.updraft_backupextradbs_row').fadeOut('medium', function() {
				$(this).remove();
			});
		});
		
		UpdraftCentral.register_row_clicker('.updraftcentral_row_extracontents .updraft_site_settings_output #updraft_backupextradbs .updraft_backupextradbs_row_testconnection', function() {
			var $row = $(this).closest('.updraft_backupextradbs_row');
			$row.find('.updraft_backupextradbs_testresultarea').html('<p><em>'+udclion.updraftplus.testing+'</em></p>');
			
			var data = {
				row: $row.attr('id'),
				host: $row.find('.extradb_host').val(),
				user: $row.find('.extradb_user').val(),
				pass: $row.find('.extradb_pass').val(),
				name: $row.find('.extradb_name').val(),
				prefix: $row.find('.extradb_prefix').val()
			};
			
			UpdraftCentral.send_site_rpc('updraftplus.extradb_testconnection', data, UpdraftCentral.$site_row, function(response, code, error_code) {
				if ('ok' == code && response) {
					$row.find('.updraft_backupextradbs_testresultarea').html(UpdraftCentral_Library.sanitize_html(response.data.m));
				}
			}, $row);
		});
		
		UpdraftCentral.register_row_clicker('.updraftcentral_row_extracontents .updraft_site_settings_output .updraftplusmethod button.updraft-test-button', function() {

			var $method_button = $(this);
			var instance_id = jQuery(this).data('instance_id');
			var method = $method_button.data('method');
			
			updraft_remote_storage_test($method_button, function(response, code, error_code, data) {
				
				if ('sftp' != method) { return false; }
				
				if ('undefined' !== typeof data && data.hasOwnProperty('scp') && data.scp) {
					UpdraftCentral_Library.dialog.alert('<h2>'+sprintf(udclion.updraftplus.settings_test_result, 'SCP')+'</h2> '+response.data.output);
				} else {
					UpdraftCentral_Library.dialog.alert('<h2>'+sprintf(udclion.updraftplus.settings_test_result, 'SFTP')+'</h2> '+response.data.output);
				}
				
				if (response.hasOwnProperty('data') && response.data) {
					if (response.data.hasOwnProperty('data') && response.data.data) {
						if ('undefined' !== typeof response.data.data.valid_md5_fingerprint) {
							$('#updraft_sftp_fingerprint_'+instance_id).val(response.data.data.valid_md5_fingerprint);
						}
					}
				}
				
				return true;
				
			});
		});
		
		UpdraftCentral.register_row_clicker('.updraftcentral_row_extracontents .updraft_site_settings_output #updraftplus-settings-save',  function($site_row, site_id) {
			
			// Gather data
			var form_data = $(settings_css_prefix+' input, '+settings_css_prefix+' textarea, '+settings_css_prefix+' select').serialize();
			
			// include unchecked checkboxes. user filter to only include unchecked boxes.
			$.each($(settings_css_prefix+' input[type=checkbox]')
				.filter(function(idx) {
					return $(this).prop('checked') == false
				}),
				function(idx, el) {
				// attach matched element names to the form_data with chosen value.
				var empty_val = '0';
				form_data += '&' + $(el).attr('name') + '=' + empty_val;
				}
			);
			
			spin_this = $(this).closest('td');
			
			form_data += '&updraftplus_version=' + updraftplus_version;

			UpdraftCentral.send_site_rpc('updraftplus.save_settings', form_data, $site_row, function(response, code, error_code) {
				
				if ('ok' === code) {
					
					// If backup dir is not writable, change the text, and grey out the 'Backup Now' button
					var backup_dir_writable = response.data.backup_dir.writable;
					var backup_dir_message = response.data.backup_dir.message;
					var backup_button_title = response.data.backup_dir.button_title;
					
					if (backup_dir_writable == false) {
						// $('#updraft-backupnow-button').attr('disabled', 'disabled');
						// $('#updraft-backupnow-button').attr('title', backup_button_title);
						$(settings_css_prefix+'#updraft_writable_mess').html(backup_dir_message);
						$(settings_css_prefix+'.backupdirrow').show();
					} else {
						// $('#updraft-backupnow-button').removeAttr('disabled');
						// $('#updraft-backupnow-button').removeAttr('title');
						$(settings_css_prefix+'.backupdirrow').hide();
					}
					
					var site_url = $site_row.data('site_url');
					
					// Get rid of any existing results-of-saving-settings boxes
					$('#updraftcentral_notice_container .updraftplus_saved_settings').closest('.updraftcentral_notice').remove();
					
					var $new_notice = add_dashboard_notice('<h2>'+udclion.updraftplus.settings_saved+' - '+site_url+'</h2><div class="updraftplus_saved_settings" data-site_id="'+site_id+'">'+response.data.messages+'</div>', 'notice', false);
					
					$('#updraft-central-content').animate({
						scrollTop: $new_notice.offset().top
					}, 1000);
				}
				
			}, spin_this);
			
		});
		
		UpdraftCentral.register_row_clicker(settings_css_sub_prefix+'.backupdirrow a.updraft_backup_dir_reset', function() {
			$(settings_css_prefix+'#updraft_dir').val('updraft');
		});
		
		UpdraftCentral.register_row_clicker('.updraftcentral_row_extracontents .updraft_site_settings_output .enableexpertmode', function() {
			$('.updraftcentral_row_extracontents .updraft_site_settings_output .expertmode').fadeIn();
			$('.updraftcentral_row_extracontents .updraft_site_settings_output .enableexpertmode').off('click');
		});
		
		UpdraftCentral.register_row_clicker(settings_css_sub_prefix+' a.updraft_authlink', function($site_row) {
			var href = $(this).attr('href');
			if ('undefined' === typeof href) { return; }
			var spinner_where = $(this).closest('td');
			UpdraftCentral_Library.open_browser_at($site_row, { module: 'direct_url', url: href }, spinner_where);
		});
		
		UpdraftCentral.register_row_clicker('.updraftcentral_row_extracontents .updraft_site_settings_output .updraft_include_entity', function() {
			var has_exclude_field = $(this).data('toggle_exclude_field');
			if (has_exclude_field) {
				setup_file_entity_exclude_field(has_exclude_field, false);
			}
		}, false, 'change');
		
		UpdraftCentral.register_row_clicker('.updraft_existing_backups_output .updraft_existingbackup_date', function($site_row) {
			var nonce = $(this).data('nonce');
			var timestamp = $(this).data('timestamp');

			UpdraftCentral.send_site_rpc('updraftplus.rawbackup_history', {
				nonce: nonce,
				timestamp: timestamp
			}, UpdraftCentral.$site_row, function (response, code, error_code) {
				if ('ok' == code && false !== response && response.hasOwnProperty('data')) {
					if (response.data.hasOwnProperty('rawbackup')) {
						UpdraftCentral.close_modal();
						UpdraftCentral.open_modal(udclion.updraftplus.raw, response.data.rawbackup, true, false, null, false, 'modal-lg');
					}
				}
			});
		}, false, 'dblclick');
		
		register_modal_listener('#always_keep_this_backup', function(e) {
			var backup_key = $(this).data('backup_key');
			UpdraftCentral.send_site_rpc('updraftplus.always_keep_this_backup', {
				backup_key: backup_key,
				always_keep: $(this).is(':checked') ? 1 : 0
			}, UpdraftCentral.$site_row, function (response, code, error_code) {
				if ('ok' == code && false !== response && response.hasOwnProperty('data')) {
					if (response.data.hasOwnProperty('rawbackup')) {
						UpdraftCentral.close_modal();
						UpdraftCentral.open_modal(udclion.updraftplus.raw, response.data.rawbackup, true, false);
					}
				}
			});
		}, 'change');
		
		UpdraftCentral.register_row_clicker('.updraft_existing_backups_output .choose-components-button', function($site_row) {
			var this_button = this;
			var entities = $(this_button).data('entities');
			var spinner_where = $(this_button).closest('td');
			if (entities) {
				
				// Alert the user of possible consequences of restoring + other relevant info, before proceeding.
				UpdraftCentral_Library.dialog.confirm('<h2>'+udclion.updraftplus.restore_backup+'</h2>'+udclion.updraftplus.pre_restore_message, function(go_ahead) {
					if (!go_ahead) { return; }
					UpdraftCentral_Library.open_browser_at($site_row, { module: 'updraftplus', action: 'initiate_restore', data: {
						entities: entities,
						backup_timestamp: $(this_button).data('backup_timestamp'),
						showdata: $(this_button).data('showdata')
					} }, spinner_where);

					restored_items.add($(this_button).data('backup_timestamp'), $(this_button).closest('tr.updraft_existing_backups_row').data('nonce'));
				});
				
			}
		});
		
		UpdraftCentral.register_row_clicker('.updraft_existing_backups_output .updraft_download_button', function($site_row) {
			
			var site_id = $site_row.data('site_id');
			var backup_timestamp = $(this).data('backup_timestamp');
			var what = $(this).data('what');
			var set_contents = $(this).data('set_contents');
			var pretty_date = $(this).data('prettydate');
			var async = true;
			
			var spinner_where = $(this).closest('td');
			
			updraft_downloader(site_id, backup_timestamp, what, set_contents, pretty_date, async, spinner_where);
			
		});

		UpdraftCentral.register_row_clicker('.updraft_existing_backups_output button.updraft-upload-link', function ($site_row) {
			$(this).hide();
			var nonce = $(this).data('nonce').toString();
			var key = $(this).data('key').toString();
			if (nonce) {
				UpdraftCentral.send_site_rpc('updraftplus.upload_local_backup', {
					use_nonce: nonce,
					use_timestamp: key
				}, UpdraftCentral.$site_row, function (response, code, error_code) {
					if ('ok' == code && false !== response && response.hasOwnProperty('data')) {
						if (response.data.hasOwnProperty('nonce')) {

							var listener_message = '<div class="backup_state">' + udclion.updraftplus.backupstarted + '</div>';

							UpdraftCentral.create_dashboard_listener('updraftplus_backup', UpdraftCentral.$site_row, listener_message, { job_id: response.data.nonce }, udclion.updraftplus.upload_backup);

						} else {
							UpdraftCentral.add_dashboard_notice('<h2>' + UpdraftCentral.$site_row.data('site_description') + '</h2>' + udclion.updraftplus.backup_start_failed, 'error');
						}
					}
				});
			} else {
				console.log("UDCentral: UpdraftPlus: A upload link was clicked, but the backup ID could not be found");
			}
		});
		
		UpdraftCentral.register_row_clicker('.updraft_existing_backups_output .updraft-delete-link', function($site_row) {
			var hasremote = $(this).data('hasremote').toString();
			hasremote = (hasremote === '0') ? false : true;
			var nonce = $(this).data('nonce').toString();
			var key = $(this).data('key').toString();

			delete_action = 'single';
			if (nonce) {
				if (restored_items.exists(key)) {
					updraft_get_existing_backups_panel($site_row);
				} else {
					updraft_delete(key, nonce, hasremote);
				}
			} else {
				console.log("UDCentral: UpdraftPlus: A delete link was clicked, but the backup ID could not be found");
			}
		});

		UpdraftCentral.register_event_handler('click', '.delete-backup-container input.delete_backup_item', function($site_row) {
			var checked = $('.delete-backup-container input.delete_backup_item:checked').length;

			if (0 < checked) {
				$('button#btn-backup-bulk-delete').removeClass('btn-secondary').addClass('btn-primary');
			} else {
				$('button#btn-backup-bulk-delete').removeClass('btn-primary').addClass('btn-secondary');
			}
		});

		UpdraftCentral.register_row_clicker('.updraft_existing_backups_output button#btn-backup-bulk-delete', function($site_row) {
			var keys = [],
				hasremote = false,
				nonce,
				hasrestored = false;

			selected_items.clear();
			$('.delete-backup-container input.delete_backup_item:checked').each(function() {
				var delete_link = $(this).closest('tr.updraft_existing_backups_row').find('a.updraft-delete-link');
				var key = delete_link.data('key');

				if ('undefined' !== typeof key && key) {
					keys.push(key.toString());
					nonce = delete_link.data('nonce');

					if (!hasremote) {
						hasremote = ('undefined' === typeof delete_link.data('hasremote') || delete_link.data('hasremote') == '0') ? false : true;
					}

					if (restored_items.exists(key)) hasrestored = true;
					selected_items.add(key, $(this).closest('tr.updraft_existing_backups_row').data('nonce'));
				}
			});

			delete_action = 'multiple';
			if (keys.length) {
				if (hasrestored) {
					updraft_get_existing_backups_panel($site_row);
				} else {
					updraft_delete(keys.join(), nonce, hasremote);
				}
			} else {
				console.log("UDCentral: UpdraftPlus: The bulk delete button was clicked, but none of the backup IDs could be found");
			}
		});
		
		UpdraftCentral.register_row_clicker('.updraft_existing_backups_output a.updraft_diskspaceused_update', function($site_row) {
			var spin_this = this.closest('ul');
			UpdraftCentral.send_site_rpc('updraftplus.get_fragment', { fragment: 'disk_usage', data: 'updraft' } , $site_row, function(response, code, error_code) {
				if ('ok' == code && response) {
					$site_row.find('.updraft_diskspaceused').html(UpdraftCentral_Library.sanitize_html(response.data.output));
				}
			}, spin_this);
		});
		
		UpdraftCentral.register_row_clicker('.updraft_existing_backups_output a.updraft_rescan_local', function($site_row) {
			var spin_this = this.closest('ul');
			$site_row.find('.updraft_existing_backups').html('<div class="rescanning">'+udclion.updraftplus.rescanning+'</div>');
			UpdraftCentral.send_site_rpc('updraftplus.rescan', 'rescan' , $site_row, function(response, code, error_code) {
				if ('ok' == code && response) {
					$site_row.find('.updraft_existing_backups').html(response.data.t);
					$site_row.find('.updraft_existing_backups_output h2').html(response.data.n);

					insert_bulk_delete($site_row);
				}
			}, spin_this);
		});
		
		UpdraftCentral.register_row_clicker('.updraft_existing_backups_output a.updraft_rescan_remote', function($site_row) {
			var spin_this = this.closest('ul');
			$site_row.find('.updraft_existing_backups').html('<div class="rescanning">'+udclion.updraftplus.rescanningremote+'</div>');
			UpdraftCentral.send_site_rpc('updraftplus.rescan', 'remotescan' , $site_row, function(response, code, error_code) {
				if ('ok' == code && response) {
					$site_row.find('.updraft_existing_backups').html(response.data.t);
					$site_row.find('.updraft_existing_backups_output h2').html(response.data.n);

					insert_bulk_delete($site_row);
				}
			}, spin_this, 90);
		});
		
		UpdraftCentral.register_row_clicker('.updraftcentral_site_backups_manage', function($site_row) {
			updraft_get_existing_backups_panel($site_row);
		}, true);
		
		UpdraftCentral.register_row_clicker('.updraftcentral_site_backup_settings', function($site_row) {
			updraft_get_existing_backup_settings($site_row);
		}, true);
		
		UpdraftCentral.register_row_clicker('.updraft_site_settings_output select.updraft_interval, .updraft_site_settings_output select.updraft_interval_database', function() {
			updraft_check_same_times();
		}, false, 'change');

		// Remote method authentication click
		UpdraftCentral.register_row_clicker('.updraft_authlink', function($site_row) {
			var spin_this = this.closest('ul');
			var data = {
				remote_method: $(this).data('remote_method'),
				instance_id: $(this).data('instance_id')
			}

			UpdraftCentral.send_site_rpc('updraftplus.auth_remote_method', data, $site_row, function(response, code, error_code) {
				if ('ok' == code && false !== response) {
					var resp = response.data;
					if ('error' == resp.result) {
						UpdraftCentral_Library.dialog.alert('<h2>'+udclion.error+'</h2>'+resp.message);
					} else if ('success' == resp.result) {
						updraft_get_existing_backup_settings($site_row);
					}
				}
			}, spin_this);
			
		}, true);
		
		// Remote method deauthentication click
		UpdraftCentral.register_row_clicker('.updraft_deauthlink', function($site_row) {
			var spin_this = this.closest('ul');
			var data = {
				remote_method: $(this).data('remote_method'),
				instance_id: $(this).data('instance_id')
			}

			UpdraftCentral.send_site_rpc('updraftplus.deauth_remote_method', data, $site_row, function(response, code, error_code) {
				if ('ok' == code && false !== response) {
					var resp = response.data;
					if ('error' == resp.result) {
						UpdraftCentral_Library.dialog.alert('<h2>'+udclion.error+'</h2>'+resp.message);
					} else if ('success' == resp.result) {
						updraft_get_existing_backup_settings($site_row);
					}
				}
			}, spin_this);
			
		}, true);
		
		UpdraftCentral.register_row_clicker('.updraft_site_settings_output #updraft_retain_db_addnew', function() {
			add_rule('db', 12, 604800, 1, 604800);
		});
		
		UpdraftCentral.register_row_clicker('.updraft_site_settings_output #updraft_retain_files_addnew', function() {
			add_rule('files', 12, 604800, 1, 604800);
		});
		
		UpdraftCentral.register_row_clicker('.updraft_site_settings_output .updraft_retain_rules_delete, .updraft_site_settings_output .updraft_retain_rules_delete', function() {
			$(this).parent('.updraft_retain_rules').slideUp(function() {
				$(this).remove();
			});
		});
		
		UpdraftCentral.register_row_clicker('.updraftcentral_row_extracontents .updraft_site_settings_output #updraft_report_cell .updraft_reportbox .updraft_reportbox_delete', function() {
			$(this).closest('.updraft_reportbox').fadeOut('medium', function() {
				$(this).remove();
			});
		});
		
		UpdraftCentral.register_row_clicker('.updraftcentral_row_extracontents .updraft_site_settings_output #updraft_report_cell .updraft_report_another', function() {
			
			$('#updraftcentral_dashboard_existingsites .updraftcentral_row_extracontents .updraft_site_settings_output #updraft_report_cell .updraft_report_another_p').before(template_replace('updraftplus-settings-report-email', {
				index: reportbox_index,
				send_only_on_warnings: udclion.updraftplus.send_only_on_warnings,
				whole_backup: udclion.updraftplus.whole_backup,
				email_size_limits: udclion.updraftplus.email_size_limits,
				db_backup: udclion.updraftplus.db_backup
			}));
			$('#updraft_reportbox_'+reportbox_index).fadeIn();
			reportbox_index++;
			
		});
		
		UpdraftCentral.register_event_handler('change', '.updraft_report_wholebackup .updraft_report_checkbox', function() {
			var reportbox = $(this).closest('.updraft_reportbox').find('.updraft_report_dbbackup');
			if ($(this).is(':checked')) {
				reportbox.removeClass('updraft_report_disabled').find('.updraft_report_checkbox').removeProp('disabled');
			} else {
				reportbox.find('.updraft_report_checkbox').prop('checked', false);
				reportbox.addClass('updraft_report_disabled').find('.updraft_report_checkbox').prop('disabled', true);
			}
		});
		
		UpdraftCentral.register_row_clicker('.updraftcentral_row_extracontents .updraft_site_settings_output #updraft_include_more', function() {
			if ($('#updraftcentral_dashboard_existingsites .updraftcentral_row_extracontents .updraft_site_settings_output #updraft_include_more').is(':checked')) {
				$('#updraftcentral_dashboard_existingsites .updraftcentral_row_extracontents .updraft_site_settings_output #updraft_include_more_options').slideDown();
			} else {
				$('#updraftcentral_dashboard_existingsites .updraftcentral_row_extracontents .updraft_site_settings_output #updraft_include_more_options').slideUp();
			}
		}, false, 'change');
		
		UpdraftCentral.register_row_clicker('.updraftcentral_row_extracontents .updraft_site_settings_output #updraft_include_more_paths_another', function() {
			updraftplus_morefiles_lastind++;
			$(template_replace('updraftplus-settings-more-paths', {
				index: updraftplus_morefiles_lastind,
				enter_the_directory: udclion.updraftplus.enter_the_directory,
				remove: udclion.updraftplus.remove
			})).appendTo($('.updraftcentral_row_extracontents .updraft_site_settings_output #updraft_include_more_paths')).slideDown();
		});
		
		UpdraftCentral.register_row_clicker('.updraftcentral_row_extracontents .updraft_site_settings_output #updraft_include_more_options .updraftplus-morefiles-row-delete', function() {
			var prow = $(this).closest('.updraftplus-morefiles-row');
			$(prow).slideUp('medium', function() {
				$(this).remove();
			});
		});
		
		UpdraftCentral.register_row_clicker('.updraftcentral_row_extracontents .updraft_site_settings_output .updraft_servicecheckbox', function() {
			var sclass = $(this).attr('id');
			if ('updraft_servicecheckbox_' == sclass.substring(0,24)) {
				var serv = sclass.substring(24);
				if (null != serv && '' != serv) {
					if ($(this).is(':checked')) {
						remote_storage_tabs_any_checked++;
						$('#updraftcentral_dashboard_existingsites .updraftcentral_row_extracontents .updraft_site_settings_output .remote-tab-'+serv).fadeIn();
						updraft_remote_storage_tab_activation(serv);
					} else {
						remote_storage_tabs_any_checked--;
						$('#updraftcentral_dashboard_existingsites .updraftcentral_row_extracontents .updraft_site_settings_output .remote-tab-'+serv).hide();
						// Check if this was the active tab, if yes, switch to another
						if ($('#updraftcentral_dashboard_existingsites .updraftcentral_row_extracontents .updraft_site_settings_output .remote-tab-'+serv).data('active') == true) {
							updraft_remote_storage_tab_activation($('#updraftcentral_dashboard_existingsites .updraftcentral_row_extracontents .updraft_site_settings_output .remote-tab:visible').last().attr('name'));
						}
					}
				}
			}
			
			if (remote_storage_tabs_any_checked <= 0) {
				$('#updraftcentral_dashboard_existingsites .updraftcentral_row_extracontents .updraft_site_settings_output .updraftplusmethod.none').fadeIn();
			} else {
				$('#updraftcentral_dashboard_existingsites .updraftcentral_row_extracontents .updraft_site_settings_output .updraftplusmethod.none').hide();
			}
		}, false, 'change');
		
		// Changing tabs for the remote storage methods
		UpdraftCentral.register_row_clicker('.updraftcentral_row_extracontents .updraft_site_settings_output .remote-tab', function() {
			var the_method = $(this).attr('name');
			updraft_remote_storage_tab_activation(the_method);
		});
		
		// For the free version, where only one remote storage choice can be made at a time
		UpdraftCentral.register_row_clicker('.updraftcentral_row_extracontents .updraft_site_settings_output .updraft_servicecheckbox:not(.multi)', function() {
			var svalue = $(this).attr('value');
			
			if ($(this).is(':not(:checked)')) {
				$('#updraftcentral_dashboard_existingsites .updraftcentral_row_extracontents .updraft_site_settings_output .updraftplusmethod.'+svalue).hide();
				$('#updraftcentral_dashboard_existingsites .updraftcentral_row_extracontents .updraft_site_settings_output .updraftplusmethod.none').fadeIn();
			} else {
				$('#updraftcentral_dashboard_existingsites .updraftcentral_row_extracontents .updraft_site_settings_output .updraft_servicecheckbox').not(this).prop('checked', false);
			}
		}, false, 'change');
		
		// UpdraftVault settings handling
		UpdraftCentral.register_row_clicker(settings_css_sub_prefix+'#updraftvault_settings_cell .updraftvault_backtostart', function() {
			$(settings_css_prefix+'#updraftvault_settings_showoptions').slideUp();
			$(settings_css_prefix+'#updraftvault_settings_connect').slideUp();
			$(settings_css_prefix+'#updraftvault_settings_connected').slideUp();
			$(settings_css_prefix+'#updraftvault_settings_default').slideDown();
		});
		
		// Prevent default event when pressing return in the form
		UpdraftCentral.register_row_clicker(settings_css_sub_prefix+'#updraftvault_settings_connect input', function($site_row, site_id, event) {
			if (event.which == 13) {
				$(settings_css_prefix+'#updraftvault_connect_go').trigger('click');
				event.preventDefault();
			}
		}, false, 'keypress');
		
		UpdraftCentral.register_row_clicker(settings_css_sub_prefix+'#updraftvault_settings_cell #updraftvault_recountquota', function() {
			$(settings_css_prefix+'#updraftvault_recountquota').html(udclion.updraftplus.counting);
			UpdraftCentral.send_site_rpc('updraftplus.vault_recountquota', { instance_id: $('#updraftvault_settings_connect').data('instance_id') }, UpdraftCentral.$site_row, function(response, code, error_code) {
				$(settings_css_prefix+'#updraftvault_recountquota').html(udclion.updraftplus.update_quota_count);
				if ('ok' == code && response) {
					if (response.hasOwnProperty('data') && response.data.hasOwnProperty('html')) {
						$(settings_css_prefix+'#updraftvault_settings_connected').html(response.data.html);
						if (response.data.hasOwnProperty('connected')) {
							if (response.data.connected) {
								$(settings_css_prefix+'#updraftvault_settings_default').hide();
								$(settings_css_prefix+'#updraftvault_settings_connected').show();
							} else {
								$(settings_css_prefix+'#updraftvault_settings_connected').hide();
								$(settings_css_prefix+'#updraftvault_settings_default').show();
							}
						}
					}
				}
			});
		});
		
		UpdraftCentral.register_row_clicker(settings_css_sub_prefix+'#updraftvault_settings_cell #updraftvault_disconnect', function() {
			$(settings_css_prefix+'#updraftvault_disconnect').html(udclion.updraftplus.disconnecting);
			UpdraftCentral.send_site_rpc('updraftplus.vault_disconnect', { instance_id: $('#updraftvault_settings_connect').data('instance_id') }, UpdraftCentral.$site_row, function(response, code, error_code) {
				$(settings_css_prefix+'#updraftvault_disconnect').html(udclion.updraftplus.disconnect);
				
				if ('ok' == code && response.hasOwnProperty('data')) {
					
					$(settings_css_prefix+'#updraftvault_disconnect').html(udclion.updraftplus.disconnect);
					
					if (response.data.hasOwnProperty('html')) {
						$(settings_css_prefix+'#updraftvault_settings_connected').html(response.data.html).slideUp();
						$(settings_css_prefix+'#updraftvault_settings_default').slideDown();
					}
				}
			});
		});
		
		UpdraftCentral.register_row_clicker(settings_css_sub_prefix+'#updraftvault_connect', function() {
			$(settings_css_prefix+'#updraftvault_settings_default').slideUp();
			$(settings_css_prefix+'#updraftvault_settings_connect').slideDown();
		});
		
		UpdraftCentral.register_row_clicker(settings_css_sub_prefix+'#updraftvault_showoptions', function() {
			$(settings_css_prefix+'#updraftvault_settings_default').slideUp();
			$(settings_css_prefix+'#updraftvault_settings_showoptions').slideDown();
		});
		
		UpdraftCentral.register_row_clicker(settings_css_sub_prefix+'#updraft_s3_newapiuser', function($site_row) {
			var spin_this = this.closest('td');
			UpdraftCentral.send_site_rpc('updraftplus.get_fragment', { fragment: 's3_new_api_user_form', data: null } , $site_row, function(response, code, error_code) {
				if ('ok' == code && response) {
					UpdraftCentral.open_modal(udclion.updraftplus.create_new_iam_user_and_bucket, response.data.output, function() {
						
						// $('#updraftcentral_modal #updraft-s3newapiuser-results').html('<p style="color:green">'+udclion.updraftplus.trying+'</p>');
						$('#updraftcentral_modal #updraft-s3newapiuser-results').empty();
						
						var data = {
							adminaccesskey: $('#updraftcentral_modal #updraft_s3newapiuser_adminaccesskey').val(),
							adminsecret: $('#updraftcentral_modal #updraft_s3newapiuser_adminsecret').val(),
							newuser: $('#updraftcentral_modal #updraft_s3newapiuser_newuser').val(),
							bucket: $('#updraftcentral_modal #updraft_s3newapiuser_bucket').val(),
							region: $('#updraftcentral_modal #updraft_s3newapiuser_region').val(),
							useservercerts: $('#updraftcentral_modal #updraft_ssl_useservercerts').val(),
							disableverify: $('#updraftcentral_modal #updraft_ssl_disableverify').val(),
							nossl: $('#updraftcentral_modal #updraft_ssl_nossl').val(),
							allowdelete: $('#updraftcentral_modal #updraft_s3newapiuser_allowdelete').is(':checked') ? 1 : 0,
							allowdownload: $('#updraftcentral_modal #updraft_s3newapiuser_allowdownload').is(':checked') ? 1 : 0
						};
						
						var spin_this = $('#updraftcentral_modal');
						
						UpdraftCentral.send_site_rpc('updraftplus.s3_newuser', data , $site_row, function(response, code, error_code) {
							
							if ('ok' == code && response) {
								if (response.data.e == 1) {
									$('#updraftcentral_modal #updraft-s3newapiuser-results').html('<p style="color:red;">'+UpdraftCentral_Library.sanitize_html(response.data.m)+'</p>');
								} else if (response.data.e == 0) {
									$('#updraftcentral_modal #updraft-s3newapiuser-results').html('<p style="color:green;">'+UpdraftCentral_Library.sanitize_html(response.data.m)+'</p>');
									$(settings_css_prefix+'#updraft_s3_apikey').val(response.data.k);
									$(settings_css_prefix+'#updraft_s3_apisecret').val(response.data.s);
									$(settings_css_prefix+'#updraft_s3_rrs').prop(':checked', response.data.r);
									$(settings_css_prefix+'#updraft_s3_path').val(response.data.c);
									
									// Change link to open dialog to reflect that using IAM user
									$(settings_css_prefix+'#updraft_s3_newapiuser').html(udclion.updraftplus.now_using_iam);
									
									UpdraftCentral.close_modal();
								}
							}
							
						}, spin_this);
						
					}, udclion.updraftplus.create);
				}
			}, spin_this);
		});
		
		UpdraftCentral.register_row_clicker(settings_css_sub_prefix+'#updraft_cloudfiles_newapiuser', function($site_row) {
			var spin_this = this.closest('td');
			
			UpdraftCentral.send_site_rpc('updraftplus.get_fragment', { fragment: 'cloudfiles_new_api_user_form', data: null }, $site_row, function(response, code, error_code) {
				if ('ok' == code) {
					var html = UpdraftCentral.template_replace('updraftplus-cloudfiles_new_api_user', response.data.output);
					
					UpdraftCentral.open_modal(udclion.updraftplus.new_api_user, UpdraftCentral_Library.sanitize_html(html), function() {
						var $form = $(this).closest('.modal-dialog').find('.form-table'),
							new_user = {
								'adminuser': $form.find('.adminuser').val(),
								'adminapikey': $form.find('.adminapikey').val(),
								'newuser': $form.find('.newuser').val(),
								'container': $form.find('.container').val(),
								'newemail': $form.find('.newemail').val(),
								'location': $form.find('.location').val(),
								'region': $form.find('.region').val()
							};
						
						var spin_this = $('.modal-dialog');
						
						UpdraftCentral.send_site_rpc('updraftplus.cloudfiles_newuser', new_user, $site_row, function(response, code, error_code) {
							if ('ok' == code) {
								UpdraftCentral.close_modal();
								
								var user = response.data.u;
								var key = response.data.k;
								var container = response.data.c;
								
								$site_row.find('#updraft_cloudfiles_user').val(user);
								$site_row.find('#updraft_cloudfiles_apikey').val(key);
								$site_row.find('#updraft_cloudfiles_path').val(container);
							} else if (error_code === "error") {
								UpdraftCentral_Library.dialog.alert('<h3>'+udclion.error+'</h3>' + response.m);
								return true;
							}
						}, spin_this)
					}, udclion.updraftplus.create);
				}
			}, spin_this)
		});
		
		UpdraftCentral.register_row_clicker(settings_css_sub_prefix+'#updraftvault_connect_go', function() {
			$(settings_css_prefix+'#updraftvault_connect_go').html(udclion.updraftplus.connecting);
			
			var data = {
				email: $(settings_css_prefix+'#updraftvault_email').val(),
				pass: $(settings_css_prefix+'#updraftvault_pass').val(),
				instance_id: $(settings_css_prefix+'#updraftvault_settings_connect').data('instance_id')
			}
			
			UpdraftCentral.send_site_rpc('updraftplus.vault_connect', data, UpdraftCentral.$site_row, function(response, code, error_code) {
				
				$(settings_css_prefix+'#updraftvault_connect_go').html(udclion.updraftplus.connect);
				
				if ('ok' == code && response.hasOwnProperty('data')) {
					if (response.data.hasOwnProperty('e')) {
						UpdraftCentral_Library.dialog.alert('<h2>'+udclion.error+'</h2><p>'+response.data.e+'</p>');
						if (response.data.hasOwnProperty('code') && response.data.code == 'no_quota') {
							$(settings_css_prefix+'#updraftvault_settings_connect').slideUp();
							$(settings_css_prefix+'#updraftvault_settings_default').slideDown();
						}
					} else if (response.data.hasOwnProperty('connected') && response.data.connected && response.data.hasOwnProperty('html')) {
						$(settings_css_prefix+'#updraftvault_settings_connect').slideUp();
						$(settings_css_prefix+'#updraftvault_settings_connected').html(response.data.html).slideDown();
					} else {
						console.log(response);
						UpdraftCentral_Library.dialog.alert('<h2>'+udclion.error+'</h2><p>'+udclion.js_exception_occurred+'</p>');
					}
				}
				
			});
		});
		
	});
	
	/**
	 * Remote test call back
	 *
	 * @callable RemoteTestCallback
	 * @param {Object}      response   - the data returned by the RPC call
	 * @param {string}      code       - the code returned by the RPC call
	 * @param {string|null} error_code - the error code returned by the RPC call (if any)
	 * @param {Object}      data       - the data that was sent to the remote side (the settings to be tested)
	 */
	
	/**
	 * Do a remote storage test based on the indicated button having been pressed, and report the results in a dialog
	 *
	 * @param {Object} $method_button - jQuery object for the relevant button
	 * @param {RemoteTestCallback|false} [result_callback] - optional callable to be invoked with the result
	 *
	 * @return {void}
	 */
	function updraft_remote_storage_test($method_button, result_callback) {
		
		var $site_row = $method_button.closest('.updraftcentral_site_row');
		
		var method = $method_button.data('method');
		var method_label = $method_button.data('method_label');
		var instance_id = $method_button.data('instance_id');
		var settings_selector;
		
		if (instance_id) {
			settings_selector = '.updraftplusmethod.'+method+'-'+instance_id;
		} else {
			settings_selector = '.updraftplusmethod.'+method;
		}
		
		$method_button.html(sprintf(udclion.updraftplus.testing_settings, method_label));
		
		var data = {
			method: method
		};
		
		// Add the other items to the data object. The expert mode settings are for the generic SSL options.
		$('#updraftcentral_dashboard_existingsites .updraftcentral_row_extracontents .updraft_site_settings_output '+settings_selector+' input[data-updraft_settings_test], #updraftcentral_dashboard_existingsites .updraftcentral_row_extracontents .updraft_site_settings_output .expertmode input[data-updraft_settings_test]').each(function(index, item) {
			var item_key = $(item).data('updraft_settings_test');
			var input_type = $(item).attr('type');
			if (!item_key) { return; }
			if (!input_type) {
				console.log("UpdraftCentral: UpdraftPlus: settings test input item with no type found");
				console.log(item);
				// A default
				input_type = 'text';
			}
			var value = null;
			if ('checkbox' == input_type) {
				value = $(item).is(':checked') ? 1 : 0;
			} else if ('text' == input_type || 'password' == input_type) {
				value = $(item).val();
			} else {
				console.log("UpdraftCentral: UpdraftPlus: settings test input item with unrecognised type ("+input_type+") found");
				console.log(item);
			}
			data[item_key] = value;
		});
		// Data from any text areas or select drop-downs
		$('#updraftcentral_dashboard_existingsites .updraftcentral_row_extracontents .updraft_site_settings_output '+settings_selector+' textarea[data-updraft_settings_test], #updraftcentral_dashboard_existingsites .updraftcentral_row_extracontents .updraft_site_settings_output '+settings_selector+' select[data-updraft_settings_test]').each(function(index, item) {
			var item_key = $(item).data('updraft_settings_test');
			data[item_key] = $(item).val();
		});
		
		if ('webdav' === method && (!data.hasOwnProperty('url') || null === data.url)) {
			var url = $('.updraftplusmethod.webdav input[name="updraft_webdav\[settings\]\['+instance_id+'\]\[url\]"]').val();
			if ('undefined' !== typeof url && url.length) {
				data.url = url;
			}
		}
		
		UpdraftCentral.send_site_rpc('updraftplus.test_storage_settings', data, $site_row, function(response, code, error_code) {
			
			if ('ok' == code && response) {
				$method_button.html(sprintf(udclion.updraftplus.test_settings, method_label));
				if ('undefined' !== typeof result_callback && false != result_callback) {
					result_callback = result_callback.call(this, response, code, error_code, data);
				}
				if ('undefined' !== typeof result_callback && false === result_callback) {
					UpdraftCentral_Library.dialog.alert('<h2>'+sprintf(udclion.updraftplus.settings_test_result, method_label)+'</h2> '+response.data.output);
				}
			}
			
		}, $method_button.closest('td'));
		
		
	}
	
	$('#updraftcentral_notice_container').on('click', '.updraftplus_saved_settings a.updraft_authlink', function(e) {

		var href = $(this).attr('href');
		if ('undefined' === typeof href) { return; }
		var site_id = $(this).closest('.updraftplus_saved_settings').data('site_id');
		var $site_row = $('#updraftcentral_dashboard_existingsites .updraftcentral_site_row[data-site_id="'+site_id+'"');
		
		if ($site_row.length < 1) {
			console.log("UpdraftCentral: UpdraftPlus: site row not found for the link clicked (site_id="+site_id+")");
			return;
		}
		
		e.preventDefault();
		
		var spinner_where = $(this).closest('.updraftplus_saved_settings');
		
		UpdraftCentral_Library.open_browser_at($site_row, { module: 'direct_url', url: href }, spinner_where);
		
	});
	
	/**
	 * Get the "Existing Backups" panel from the remote UpdraftPlus
	 *
	 * @param {Object} $site_row - jQuery object for the row of the site for which the information is being requested
	 *
	 * @return {void}
	 */
	function updraft_get_existing_backups_panel($site_row) {
		
		$site_row.find('.updraftcentral_row_extracontents').css('opacity', '0.3');
		
		// This just causes an extra informational message to be shown, if set (telling the user to turn off 'Turbo' mode prior to downloading). It does not affect any functionality.
		var is_opera = (navigator.userAgent.match(/Opera|OPR\//) ? 1 : 0);
		UpdraftCentral.send_site_rpc('updraftplus.get_fragment', {
			fragment: 'panel_download_and_restore',
			data: {
				include_opera_warning: is_opera,
				include_uploader: 0,
				will_immediately_calculate_disk_space: 0,
				include_header: 1
			}
			}, $site_row, function(response, code, error_code) {
			$site_row.find('.updraftcentral_row_extracontents').css('opacity', '1.0');
			if ('ok' == code && response) {
				$site_row.find('.updraftcentral_row_extracontents').html('<div class="updraft_existing_backups_output"><button class="btn btn-refresh updraftcentral_site_backups_manage"><span class="dashicons dashicons-image-rotate" ></span></button>'+UpdraftCentral_Library.sanitize_html(response.data.output)+'</div>');
				insert_bulk_delete($site_row);

				if (restored_items.count()) {
					var backups_table, backups_checker;
					backups_checker = setInterval(function() {
						backups_table = $('table.existing-backups-table');
						if (backups_table.length) {
							clearInterval(backups_checker);

							switch (delete_action) {
								case 'single':
									var items = restored_items.get_items();
									restored_items.clear();

									if (items.length) {
										$('tr.updraft_existing_backups_row[data-nonce="'+items[0]+'"]').find('a.updraft-delete-link').trigger('click');
									}
									break;
								case 'multiple':
									var items = selected_items.get_items();
									selected_items.clear();
									restored_items.clear();

									if (items.length) {
										for (var i=0; i<items.length; i++) {
											$('tr.updraft_existing_backups_row[data-nonce="'+items[i]+'"]').find('input.delete_backup_item').prop('checked', true);
										}

										$('button#btn-backup-bulk-delete').trigger('click');
									}
									break;
								default:
									break;
							}
						}
					}, 1000);
				}
			}
		});
	}
	
	/**
	 * Start a "Backup Now" operation on the specified site
	 *
	 * @param {Object} $site_row - the jQuery object for the row of the site to start the backup on
	 * @param {String} $type     - the type of backup e.g new or increment
	 *
	 * @return {void}
	 */
	function backup_now($site_row, type) {
		UpdraftCentral.send_site_rpc('updraftplus.get_fragment', 'backupnow_modal_contents', $site_row, function(response, code, error_code) {
			if ('ok' == code && response) {
				
				var was_error = response.data.output.hasOwnProperty('error') && response.data.output.error;
				
				var action_button = (was_error) ? false : udclion.updraftplus.backupnow;
				
				var impossible_increment_entities;
				var incremental_installed = false
				
				if (response.data.output.hasOwnProperty('backupnow_file_entities')) {
					impossible_increment_entities = response.data.output.backupnow_file_entities;
				}
				
				if (response.data.output.hasOwnProperty('incremental_installed')) {
					incremental_installed = response.data.output.incremental_installed;
				}

				UpdraftCentral.open_modal(udclion.updraftplus.backupnow, response.data.output.html, function() {
					var backupnow_nodb = $('#updraftcentral_modal #backupnow_includedb').is(':checked') ? 0 : 1;
					var backupnow_nofiles = $('#updraftcentral_modal #backupnow_includefiles').is(':checked') ? 0 : 1;
					var backupnow_nocloud = $('#updraftcentral_modal #backupnow_includecloud').is(':checked') ? 0 : 1;
					var incremental = ('incremental' == type) ? 1 : 0;
					
					var onlythesefileentities = '';
					$('#updraftcentral_modal #backupnow_includefiles_moreoptions input[type="checkbox"]').each(function(index) {
						if (!$(this).is(':checked')) { return; }
						var name = $(this).attr('name');
						if (name.substring(0, 16) != 'updraft_include_') { return; }
						var entity = name.substring(16);
						if (onlythesefileentities != '') { onlythesefileentities += ','; }
						onlythesefileentities += entity;
					});
					
					var onlythesetableentities = '';
					var send_list = false;
					$('#backupnow_database_moreoptions input[type="checkbox"]').each(function(index) {
						if (!$(this).is(':checked')) { send_list = true; return; }
					});

					if (send_list) {
						onlythesetableentities = jQuery("input[name^='updraft_include_tables_']").serializeArray();
					} else {
						onlythesetableentities = true;
					}

					var send_list_cloud = false;
					var onlythesecloudservices = '';
					jQuery('#backupnow_includecloud_moreoptions input[type="checkbox"]').each(function(index) {
						if (!jQuery(this).is(':checked')) { send_list_cloud = true; return; }
					});
					
					if (send_list_cloud) {
						onlythesecloudservices = jQuery("input[name^='updraft_include_remote_service_']").serializeArray();
					} else {
						onlythesecloudservices = true;
					}
					
					var always_keep = $('#always_keep').is(':checked') ? 1 : 0;

					if ('' == onlythesefileentities && 0 == backupnow_nofiles) {
						UpdraftCentral_Library.dialog.alert(udclion.updraftplus.nofileschosen);
						return;
					}

					if ('' == onlythesetableentities && 0 == backupnow_nodb) {
						UpdraftCentral_Library.dialog.alert(udclion.updraftplus.notableschosen);
						return;
					}

					if ('' == onlythesecloudservices && 0 == backupnow_nocloud) {
						alert(udclion.updraftplus.nocloudserviceschosen);
						jQuery('#backupnow_includecloud_moreoptions').show();
						return;
					}

					if (!send_list) {
						onlythesetableentities = null;
					}

					if (!send_list_cloud) {
						onlythesecloudservices = null;
					}
					
					if (backupnow_nodb && backupnow_nofiles) {
						UpdraftCentral_Library.dialog.alert(udclion.updraftplus.excludedeverything);
						return;
					}
					
					UpdraftCentral.close_modal();
					
					UpdraftCentral_Module_UpdraftPlus.backupnow_go(backupnow_nodb, backupnow_nofiles, backupnow_nocloud, onlythesefileentities, { always_keep: always_keep, incremental: incremental}, $('#updraftcentral_modal #backupnow_label').val(), onlythesetableentities, onlythesecloudservices);
					}, action_button, function() {
						if (!incremental_installed && 'incremental' == type) {
							jQuery('#updraftcentral_modal .incremental-free-only').show();
							type = 'new';
						} else {
							jQuery('#updraftcentral_modal .incremental-backups-only').hide();
						}
						$('#updraftcentral_modal #backupnow_label').val('');
						if ('incremental' == type) {
							update_file_entities_checkboxes(true, impossible_increment_entities);
							$('#updraftcentral_modal #backupnow_includedb').prop('checked', false);
							$('#updraftcentral_modal #backupnow_includefiles').prop('checked', true);
							$('#updraftcentral_modal #backupnow_includefiles_label').text(udclion.updraftplus.files_incremental_backup);
							$('#updraftcentral_modal .new-backups-only').hide();
							$('#updraftcentral_modal .incremental-backups-only').show();
						} else {
							update_file_entities_checkboxes(false, impossible_increment_entities);
							$('#updraftcentral_modal #backupnow_includedb').prop('checked', true);
							$('#updraftcentral_modal #backupnow_includefiles_label').text(udclion.updraftplus.files_new_backup);
							$('#updraftcentral_modal .new-backups-only').show();
							$('#updraftcentral_modal .incremental-backups-only').hide();
						}
						$('#updraftcentral_modal #backupnow_includefiles_moreoptions').hide();
						// Remove the <a> link tab wrapping it, as that goes to the site's WP dashboard
						$('#updraftcentral_modal #updraft_backupnow_gotosettings').contents().unwrap();
				}, true, 'backup-now');
			}
		});
	}

	/**
	 * This function will enable and disable the file entity options depending on what entities increments can be added to and if this is a new backup or not.
	 *
	 * @param {boolean} incremental - a boolean to indicate if this is an incremental backup or not
	 * @param {array}   entities    - an array of entities to disable
	 */
	function update_file_entities_checkboxes(incremental, entities) {
		if (incremental) {
			jQuery(entities).each(function (index, entity) {
				jQuery('#updraftcentral_modal #backupnow_files_updraft_include_' + entity).prop('checked', false);
				jQuery('#updraftcentral_modal #backupnow_files_updraft_include_' + entity).prop('disabled', true);
			});
		} else {
			jQuery('#updraftcentral_modal #backupnow_includefiles_moreoptions input[type="checkbox"]').each(function (index) {
				var name = jQuery(this).attr('name');
				if (name.substring(0, 16) != 'updraft_include_') { return; }
				var entity = name.substring(16);
				jQuery('#updraftcentral_modal #backupnow_files_updraft_include_' + entity).prop('disabled', false);
				if (jQuery(this).is(':checked')) {
					jQuery('#updraftcentral_modal #backupnow_files_updraft_include_' + entity).prop('checked', true);
				}
			});
		}
	}
	
	/**
	 * Open a modal showing the indicated log file for the indicated site
	 *
	 * @param {string} job_id - The UpdraftPlus job identifier string
	 * @param {Object} $site_row - The jQuery object for the site row that the request is for
	 *
	 * @return {void}
	 */
	function updraft_popuplog(job_id, $site_row) {
		UpdraftCentral.send_site_rpc('updraftplus.get_log', job_id, $site_row, function(response, code, error_code) {
			if ('ok' == code && response) {
				UpdraftCentral.open_modal(udclion.updraftplus.logfile, '<pre id="updraft_poppedlog">'+UpdraftCentral_Library.sanitize_html(response.data.log)+'</pre>', function() {
					UpdraftCentral_Library.download_inner_html('log.'+job_id+'.txt', 'updraft_poppedlog');
					}, udclion.updraftplus.downloadlog, function() {
					// Function that gets called after population of modal, before opening
				}, null, true, 'modal-lg');
			}
		});
	}
	
	/**
	 * Open the modal to confirm, and then carry out, deletion of the indicate backup
	 *
	 * @param {string} key - A comma-separated list of timestamps of the backups to delete
	 * @param {string} nonce - the UpdraftPlus job identifier string
	 * @param {boolean} showremote - whether or not to show the option to also remove the backup from remote storage (if any)
	 *
	 * @return {void}
	 */
	function updraft_delete(key, nonce, showremote) {
		var delete_question = udclion.updraftplus.delete_areyousure_singular;
		if (key.indexOf(',') > -1) {
			delete_question = udclion.updraftplus.delete_areyousure_plural;
		}
		
		// title, body, action_button_callback, action_button_text, pre_open_callback, sanitize_body
		UpdraftCentral.open_modal(
			udclion.updraftplus.deletebackupset,
			UpdraftCentral.template_replace('updraftplus-deletebackup', {
				nonce: nonce,
				timestamp: key,
				delete_question: delete_question,
				also_delete_from_remote: udclion.updraftplus.also_delete_from_remote,
				deleting_please_allow_time: udclion.updraftplus.deleting_please_allow_time
			}),
			function() {
				var nonce = $('#updraft_delete_modal_contents').data('nonce').toString();
				var timestamps = $('#updraft_delete_modal_contents').data('timestamp').toString();
				var delete_remote = 0;
				if ($('#updraft_delete_modal_contents #updraft_delete_remote').is(':checked')) {
					delete_remote = 1;
				}
				
				$('#updraftcentral_modal #updraft-delete-waitwarning').slideDown();

				var is_opera = (navigator.userAgent.match(/Opera|OPR\//) ? true : false);
				
				UpdraftCentral.send_site_rpc('updraftplus.deleteset', {
					backup_nonce: nonce,
					backup_timestamp: timestamps,
					delete_remote: delete_remote,
					get_history_opts: {
						include_opera_warning: is_opera,
						include_uploader: false,
						will_immediately_calculate_disk_space: false,
						include_header: true
					}
					}, UpdraftCentral.$site_row, function(response, code, error_code) {
					
					$('#updraftcentral_modal #updraft-delete-waitwarning').slideUp();
					if ('ok' == code && response) {
							var resp = response.data;
							if (resp.result != null) {
								if (resp.result == 'error') {
									UpdraftCentral_Library.dialog.alert('<h2>'+udclion.error+'</h2>'+resp.message);
								} else if (resp.result == 'success') {
									updraft_get_existing_backups_panel(UpdraftCentral.$site_row);
									UpdraftCentral.close_modal();
								
									var message = resp.message;
									if ('undefined' === typeof message) {
										message = resp.local_message+' '+resp.backup_local;
										message += ', '+resp.remote_message+' '+resp.backup_remote;
										message += ', '+resp.set_message+' '+resp.backup_sets;
									}
								
									UpdraftCentral_Library.dialog.alert('<h2>'+udclion.updraftplus.deleted+'</h2>'+message);
								}
							}
					}
					
				});
				
			},
			udclion.updraftplus.delete,
			function() {
				if (!showremote) {
					$('#updraft-delete-remote-section').remove();
				} else {
					$('#updraft-delete-remote-section, #updraft_delete_remote').prop('disabled', false);
					$('#updraft-delete-remote-section, #updraft_delete_remote').show();
				}
				
			}
		);
		
	}
	
	/**
	 * Send a command to abort an active backup job_id
	 *
	 * @param {string} job_id - the job identifier for the job to be aborted
	 * @param {Object} $site_row - the jQuery object for the row for the site to send the command to
	 * @param {Object} site_listener_row - the jQuery object for the listener row associated with the request
	 *
	 * @return {void}
	 */
	function updraft_activejobs_delete(job_id, $site_row, site_listener_row) {
		
		UpdraftCentral.send_site_rpc('updraftplus.activejobs_delete', job_id, $site_row, function(response, code, error_code) {
			if ('ok' == code && response) {
				var msg = '';
				if (response.hasOwnProperty('data') && response.data.hasOwnProperty('c')) {
					if ('deleted' == response.data.c) {
						msg = udclion.updraftplus.delete_deleted;
					} else if ('not_found' == response.data.c) {
						msg = udclion.updraftplus.delete_not_found;
					} else {
						console.log("UDCentral: UpdraftPlus: abort job: unknown response");
						console.log(response.data);
						msg = UpdraftCentral_Library.sanitize_html(response.data.m);
					}
				} else {
					console.log("UDCentral: UpdraftPlus: abort job: unknown response");
					console.log(response.data);
					msg = udclion.js_exception_occurred;
				}
				$(site_listener_row).find('.backup_state:first').html(msg);
			}
		});
	}

	$('#updraftcentral_notice_container').on('click', '.updraftcentral_listener .updraftplus_downloader_closebutton', function(e) {
		e.preventDefault();
		var $listener = $(this).closest('.updraftcentral_listener');
		$(this).closest('.updraftplus_downloader').fadeOut().remove();
		var how_many_downloaders = $listener.find('.updraftplus_downloader').length;
		if (how_many_downloaders < 1) {
			console.log($listener);
			$listener.clearQueue().slideUp('slow', function() {
				$(this).remove();
			});
		}
	});
	
	$('#updraftcentral_notice_container').on('click', '.updraftcentral_listener .updraft_downloaded', function(e) {
		var site_id = $(this).data('site_id');
		var $site_row = $('#updraftcentral_dashboard_existingsites .updraftcentral_site_row[data-site_id="'+site_id+'"');
		if ($site_row.length < 1) { return; }
		var backup_timestamp = $(this).data('backup_timestamp');
		var what = $(this).data('what');
		var findex = $(this).data('findex');
		UpdraftCentral_Library.open_browser_at($site_row, { module: 'updraftplus', action: 'download_file', data: {
			backup_timestamp: backup_timestamp,
			what: what,
			findex: findex
		} }, null);
	});
	
	$('#updraftcentral_notice_container').on('click', '.updraftcentral_listener .updraft_delete_downloaded_backup', function(e) {
		e.preventDefault();
		var delete_button = this;
		var site_id = $(this).data('site_id');
		var $site_row = $('#updraftcentral_dashboard_existingsites .updraftcentral_site_row[data-site_id="'+site_id+'"');
		var findex = $(this).data('findex');
		var what = $(this).data('what');
		var backup_timestamp = $(this).data('backup_timestamp');
		UpdraftCentral.send_site_rpc('updraftplus.delete_downloaded', {
			timestamp: backup_timestamp,
			site_id: site_id,
			type: what,
			findex: findex
			}, $site_row, function(response, code, error_code) {
			if ('ok' == code && false !== response && response.hasOwnProperty('data')) {
					$(delete_button).closest('.raw').html(udclion.updraftplus.entity_deleted);
			}
		});
	});
	
	$('#updraftcentral_notice_container, #updraftcentral_dashboard_existingsites').on('click', '.updraftcentral_listener .updraft-log-link, .updraft_existing_backups_output .updraft-log-link', function(e) {
		e.preventDefault();
		var job_id = $(this).data('jobid');
		if (job_id) {
			var $site_listener = $(this).closest('.updraftcentral_listener, .updraftcentral_site_row');
			var site_id = $site_listener.data('site_id');
			var $site_row = $('#updraftcentral_dashboard_existingsites .updraftcentral_site_row[data-site_id="'+site_id+'"');
			updraft_popuplog(job_id, $site_row);
		} else {
			console.log(this);
			console.log("UpdraftPlus: A log link was clicked, but the Job ID could not be found");
		}
	});
	
	$('#updraftcentral_notice_container').on('click', '.updraftcentral_listener .updraft_jobinfo_delete', function(e) {
		e.preventDefault();
		var job_id = $(this).data('jobid');
		if (job_id) {
			var $site_listener = $(this).closest('.updraftcentral_listener');
			var site_id = $site_listener.data('site_id');
			var $site_row = $('#updraftcentral_dashboard_existingsites .updraftcentral_site_row[data-site_id="'+site_id+'"');
			updraft_activejobs_delete(job_id, $site_row, $site_listener);
		} else {
			console.log("UpdraftPlus: A stop job link was clicked, but the Job ID could not be found");
			console.log(this);
		}
	});
	
	/**
	 * Updates the various bits of widgetry and text associated with the scheduling settings. Suitable for calling when a chosen schedule value (daily/monthly/etc.) changes.
	 *
	 * @return {void}
	 */
	function updraft_check_same_times() {
		var dbmanual = 0;
		var file_interval = $('#updraftcentral_dashboard_existingsites .updraft_site_settings_output .updraft_interval').val();
		if (file_interval == 'manual') {
			$('#updraftcentral_dashboard_existingsites .updraft_site_settings_output .updraft_files_timings').hide();
		} else {
			$('#updraftcentral_dashboard_existingsites .updraft_site_settings_output .updraft_files_timings').show();
		}
		
		if ('weekly' == file_interval || 'fortnightly' == file_interval || 'monthly' == file_interval) {
			updraft_intervals_monthly_or_not('updraft_startday_files', file_interval);
			$('#updraftcentral_dashboard_existingsites .updraft_site_settings_output #updraft_startday_files').show();
		} else {
			$('#updraftcentral_dashboard_existingsites .updraft_monthly_extra_words_updraft_startday_files').remove();
			$('#updraftcentral_dashboard_existingsites .updraft_site_settings_output #updraft_startday_files').hide();
		}
		
		var db_interval = $('#updraftcentral_dashboard_existingsites .updraft_site_settings_output .updraft_interval_database').val();
		if (db_interval == 'manual') {
			dbmanual = 1;
			// $('#updraft_db_timings').css('opacity', '0.25');
			$('#updraftcentral_dashboard_existingsites .updraft_site_settings_output .updraft_db_timings').hide();
		}
		
		if ('weekly' == db_interval || 'fortnightly' == db_interval || 'monthly' == db_interval) {
			updraft_intervals_monthly_or_not('updraft_startday_db', db_interval);
			$('#updraftcentral_dashboard_existingsites .updraft_site_settings_output #updraft_startday_db').show();
		} else {
			$('#updraftcentral_dashboard_existingsites .updraft_monthly_extra_words_updraft_startday_db').remove();
			$('#updraftcentral_dashboard_existingsites .updraft_site_settings_output #updraft_startday_db').hide();
		}
		
		if (db_interval == file_interval) {
			// $('#updraft_db_timings').css('opacity','0.25');
			$('#updraftcentral_dashboard_existingsites .updraft_site_settings_output .updraft_db_timings').hide();
			// $('#updraft_same_schedules_message').show();
			if (0 == dbmanual) {
				$('#updraftcentral_dashboard_existingsites .updraft_site_settings_output .updraft_same_schedules_message').show();
			} else {
				$('#updraftcentral_dashboard_existingsites .updraft_site_settings_output .updraft_same_schedules_message').hide();
			}
		} else {
			$('#updraftcentral_dashboard_existingsites .updraft_site_settings_output .updraft_same_schedules_message').hide();
			if (0 == dbmanual) {
				$('#updraftcentral_dashboard_existingsites .updraft_site_settings_output .updraft_db_timings').show();
			}
		}
	}
	
	var updraft_interval_week_val = false;
	var updraft_interval_month_val = false;
	
	/**
	 * This function displays the month-day selector, and adjusts the wording, of the backup scheduling portion of the settings
	 *
	 * @param {string} selector_id - the CSS ID to use for finding the element to adjust (according to whether adjusting the files or DB schedule)
	 * @param {string} now_showing - the currently chosen interval
	 *
	 * @return {void}
	 */
	function updraft_intervals_monthly_or_not(selector_id, now_showing) {
		var selector = '#updraftcentral_dashboard_existingsites .updraft_site_settings_output #'+selector_id;
		var current_length = $(selector+' option').length;
		var is_monthly = ('monthly' == now_showing) ? true : false;
		var existing_is_monthly = false;
		if (current_length > 10) { existing_is_monthly = true; }
		if (!is_monthly && !existing_is_monthly) {
			return;
		}
		if (is_monthly && existing_is_monthly) {
			if ('monthly' == now_showing) {
				// existing_is_monthly does not mean the same as now_showing=='monthly'. existing_is_monthly refers to the drop-down, not whether the drop-down is being displayed. We may need to add these words back.
				$('#updraftcentral_dashboard_existingsites .updraft_site_settings_output .updraft_monthly_extra_words_'+selector_id).remove();
				$(selector).before('<span class="updraft_monthly_extra_words_'+selector_id+'">'+udclion.updraftplus.day+' </span>').after('<span class="updraft_monthly_extra_words_'+selector_id+'"> '+udclion.updraftplus.in_the_month+' </span>');
			}
			return;
		}
		$('#updraftcentral_dashboard_existingsites .updraft_site_settings_output .updraft_monthly_extra_words_'+selector_id).remove();
		if (is_monthly) {
			// Save the old value
			updraft_interval_week_val = $(selector+' option:selected').val();
			$(selector).html(udclion.updraftplus.mday_selector).before('<span class="updraft_monthly_extra_words_'+selector_id+'">'+udclion.updraftplus.day+' </span>').after('<span class="updraft_monthly_extra_words_'+selector_id+'"> '+udclion.updraftplus.in_the_month+' </span>');
			var select_mday = (updraft_interval_month_val === false) ? 1 : updraft_interval_month_val;
			// Convert from day of the month (ordinal) to option index (starts at 0)
			select_mday = select_mday - 1;
			$(selector+" option:eq("+select_mday+")").prop('selected', true);
		} else {
			// Save the old value
			updraft_interval_month_val = $(selector+' option:selected').val();
			$(selector).html(udclion.updraftplus.day_selector);
			var select_day = (updraft_interval_week_val === false) ? 1 : updraft_interval_week_val;
			$(selector+" option:eq("+select_day+")").prop('selected', true);
		}
	}
	
	var db_index;
	var files_index;
	/**
	 * Set up the HTML for the retain rules. This should be called after receiving the settings and rules from the remote end.
	 *
	 * @param {array} retain_rules_files - array of retain rules for the files backup
	 * @param {array} retain_rules_db - array of retain rules for the database backup
	 *
	 * @return {void}
	 */
	function setup_retain_rules(retain_rules_files, retain_rules_db) {
		// Code for handling the advanced retain rules
		db_index = 0;
		files_index = 0;
		$.each(retain_rules_files, function(index, rule) {
			add_rule('files', rule.after_howmany, rule.after_period, rule.every_howmany, rule.every_period);
		});
		
		$.each(retain_rules_db, function(index, rule) {
			add_rule('db', rule.after_howmany, rule.after_period, rule.every_howmany, rule.every_period);
		});
	}

	/**
	 * Adds a new advanced retain rule to the relevant section of the settings
	 *
	 * @param {string} type - either 'files' or 'db'
	 * @param {number} howmany_after - how many periods the rule applies after
	 * @param {number} period_after - the length (in seconds) of the period that the rule applies after
	 * @param {number} howmany_every - how many periods 1 backup is to be kept for
	 * @param {number} period_every - the length (in seconds) of the period that 1 backup is to be kept for
	 *
	 * @return {void}
	 */
	function add_rule(type, howmany_after, period_after, howmany_every, period_every) {
		var selector = 'updraft_retain_'+type+'_rules';
		var index;
		if ('db' == type) {
			db_index++;
			index = db_index;
		} else {
			files_index++;
			index = files_index;
		}
		$('#'+selector).append(
			'<div style="float:left; clear:left;" class="updraft_retain_rules '+selector+'_entry">'+
			udclion.updraftplus.for_backups_older_than+' '+rule_period_selector(type, index, 'after', howmany_after, period_after)+' keep no more than 1 backup every '+rule_period_selector(type, index, 'every', howmany_every, period_every)+
			' <span title="'+udclion.updraftplus.delete+'" class="updraft_retain_rules_delete"><span class="dashicons dashicons-no"></span></span></div>'
		)
	}
	
	/**
	 * Returns the HTML for creating a dropdown <select> widget
	 *
	 * @param {string} type - either 'files' or 'db'
	 * @param {number} index - the rule number, used for constructing the name attribute
	 * @param {string} which - drop-down type - either 'every' or 'after'
	 * @param {number} howmany_value - the number of periods of time
	 * @param {number} period - the length (in seconds) of each period of time
	 *
	 * @return {void}
	 */
	function rule_period_selector(type, index, which, howmany_value, period) {
		var nameprefix = "updraft_retain_extrarules["+type+"]["+index+"]["+which+"-";
		var ret = '<input type="number" min="1" step="1" class="additional-rule-width" name="'+nameprefix+'howmany]" value="'+howmany_value+'"> \
		<select name="'+nameprefix+'period]">\
		<option value="3600"';
		if (period == 3600) { ret += ' selected="selected"'; }
		ret += '>'+udclion.updraftplus.hours+'</option>\
		<option value="86400"';
		if (period == 86400) { ret += ' selected="selected"'; }
		ret += '>'+udclion.updraftplus.days+'</option>\
		<option value="604800"';
		if (period == 604800) { ret += ' selected="selected"'; }
		ret += '>'+udclion.updraftplus.weeks+'</option>\
		</select>';
		return ret;
	}
	
	/**
	 * Set up the status of the 'exclude' field (relevant to backing up uploads, others, WordPress Core)
	 *
	 * @param {string} field - the entity type ('uploads', 'others', 'wpcore')
	 * @param {boolean} instant - whether to simply show/hide, or whether to apply an effect
	 *
	 * @return {void}
	 */
	function setup_file_entity_exclude_field(field, instant) {
		if ($('.updraftcentral_row_extracontents .updraft_site_settings_output #updraft_include_'+field).is(':checked')) {
			if (instant) {
				$('.updraftcentral_row_extracontents .updraft_site_settings_output #updraft_include_'+field+'_exclude').show();
			} else {
				$('.updraftcentral_row_extracontents .updraft_site_settings_output #updraft_include_'+field+'_exclude').slideDown();
			}
		} else {
			if (instant) {
				$('.updraftcentral_row_extracontents .updraft_site_settings_output #updraft_include_'+field+'_exclude').hide();
			} else {
				$('.updraftcentral_row_extracontents .updraft_site_settings_output #updraft_include_'+field+'_exclude').slideUp();
			}
		}
	}

	var reportbox_index = 1;
	
	/**
	 * Activate the specified tab within the remote storage section
	 *
	 * @param {string} the_method - the remote storage method whose tab is to be activated. Corresponds to UD's internal method string identifiers (e.g. s3, dropbox, etc.)
	 *
	 * @return {void}
	 */
	function updraft_remote_storage_tab_activation(the_method) {
		var prefix = '#updraftcentral_dashboard_existingsites .updraftcentral_row_extracontents .updraft_site_settings_output';
		$(prefix+' .updraftplusmethod').hide();
		$(prefix+' .remote-tab').data('active', false);
		$(prefix+' .remote-tab').removeClass('nav-tab-active');
		$(prefix+' .updraftplusmethod.'+the_method).show();
		$(prefix+' .remote-tab-'+the_method).data('active', true);
		$(prefix+' .remote-tab-'+the_method).addClass('nav-tab-active');
	}
	
	var remote_storage_tabs_any_checked = 0;
	
	/**
	 * Set the initial state of the remote storage options, depending on the currently selected option(s). Includes labelauty setup.
	 *
	 * @return {void}
	 */
	function updraft_remote_storage_tabs_setup() {
		
		remote_storage_tabs_any_checked = 0;
		var set = $('#updraftcentral_dashboard_existingsites .updraftcentral_row_extracontents .updraft_site_settings_output .updraft_servicecheckbox:checked');

		$(set).each(function(ind, obj) {
			var ser = $(obj).val();
			
			if ($(obj).attr('id') != 'updraft_servicecheckbox_none') {
				remote_storage_tabs_any_checked++;
			}
			
			$('#updraftcentral_dashboard_existingsites .updraftcentral_row_extracontents .updraft_site_settings_output .remote-tab-'+ser).show();
			if (ind == $(set).length-1) {
				updraft_remote_storage_tab_activation(ser);
			}
		});

		if (remote_storage_tabs_any_checked > 0) {
			$('#updraftcentral_dashboard_existingsites .updraftcentral_row_extracontents .updraft_site_settings_output .updraftplusmethod.none').hide();
		} else {
			$('#updraftcentral_dashboard_existingsites .updraftcentral_row_extracontents .updraft_site_settings_output .updraftplusmethod:not(.none)').hide();
			$('#updraftcentral_dashboard_existingsites .updraftcentral_row_extracontents .updraft_site_settings_output .updraftplusmethod.none').show();
		}
		
		var servicecheckbox = $('#updraftcentral_dashboard_existingsites .updraftcentral_row_extracontents .updraft_site_settings_output .updraft_servicecheckbox');
		if (typeof servicecheckbox.labelauty === 'function') { servicecheckbox.labelauty(); }
		
	}
	
}
