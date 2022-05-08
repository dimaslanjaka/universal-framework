jQuery(function() {
	new UpdraftCentral_UpdraftVault_Management();
});

/**
 * Create previous, next navigation/paginator markup.
 *
 * Disclaimer:
 * This paginator is custom built specifically for the Amazon S3 Bucket
 * that was tied to the UpdraftVault.
 *
 * @constructor
 * @param {Object} location - A jQuery DOM object that serves as a container used for placing the paginator
 * @param {Object} options - An option object that holds relevant settings/configuration for the paginator
 * @param {string} options.prev_key - The previous accessed key that will be reference for pulling previous data from S3 Bucket
 * @param {string} options.next_key - The next Bucket object's key that will serve as a starting point when pulling data from S3 Bucket
 * @param {boolean} options.is_paged - Indicates whether the content/data is truncated (paged). Thus, controls whether a paginator needs to be shown or not.
 * @param {string} options.last_marker - The last key that serves as a marker (internal reference) for moving around the S3 Bucket list
 * @param {paginatorCallback} page_change - A callback function that will be triggered when a page change event is raised.
 * @returns {void}
 */
function UpdraftCentral_PrevNext_Paginator(location, options, page_change) {
	var self = this;
	var callback = page_change;
	var key = '',
		marker = options.last_marker;
	
	/**
	 * Appends the paginator to the DOM and sets the active page
	 *
	 * @returns {void}
	 */
	function init() {
		if (options.is_paged && (options.prev_key.length > 0 || options.next_key.length > 0)) {
			append(location);
		}
	}
	init();
	
	/**
	 * Sets the next page as active
	 *
	 * @returns {void}
	 */
	function next() {
		key = options.next_key;
		marker += ',' + options.prev_key;
		trigger();
	}
	
	/**
	 * Sets the previous page as active
	 *
	 * @returns {void}
	 */
	function prev() {
		markers = marker.split(',');
		// @codingStandardsIgnoreLine
		key = markers[markers.length - 1];
		marker = marker.replace(',' + key, '');
		trigger();
	}
	
	/**
	 * Inserts the paginator markup to the DOM
	 *
	 * @param {string} _location - A selector for where the paginator should be
	 * @returns {void}
	 */
	function append(_location) {
		self.element = jQuery(UpdraftCentral.template_replace('updraftvault-prevnext-paginator', {}));
		
		if (options.prev_key.length == 0) {
			self.element.find('a.page_prev').parent('li').hide();
			self.element.find('li:contains("|")').hide();
		}
		
		if (options.next_key.length == 0) {
			self.element.find('a.page_next').parent('li').hide();
			self.element.find('li:contains("|")').hide();
		}
		
		self.element.appendTo(_location);
		self.element.on('click', 'a', function(e) {
			e.preventDefault();
			if (jQuery(this).hasClass('page_prev')) {
				prev();
			} else if (jQuery(this).hasClass('page_next')) {
				next();
			}
		});
	}
	
	/**
	 * Set what should happen on a page change
	 *
	 * @param {paginatorCallback} _callback - A call back that triggers after a page change
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
		self.element.trigger("page_change", key, marker);
		if ('function' === typeof callback) {
			callback(key, marker);
		}
	}
}


/**
 * An object for managing the UpdraftVault files
 *
 * @constructor
 */
function UpdraftCentral_UpdraftVault_Management() {
	var self = this;
	var aws_s3;
	var aws_s3_bucket;
	var aws_s3_prefix;
	
	/**
	 * Wrapper for the paginator class
	 *
	 * @uses Paginator
	 * @param {Object} $site_row - The jquery reference to a the site's row
	 * @param {Object} options - An option object that holds relevant settings/configuration for the paginator
	 * @param {string} options.prev_key - The previous accessed key that will be reference for pulling previous data from S3 Bucket
	 * @param {string} options.next_key - The next Bucket object's key that will serve as a starting point when pulling data from S3 Bucket
	 * @param {boolean} options.is_paged - Indicates whether the content/data is truncated (paged). Thus, controls whether a paginator needs to be shown or not.
	 * @param {string} options.last_marker - The last key that serves as a marker (internal reference) for moving around the S3 Bucket list
	 * @returns {void}
	 */
	function paginator($site_row, options) {
		var $location = $site_row.find('.updraftcentral_updraftvault_paginator');
		if ($location.length === 0) {
			var extra_contents = $site_row.find('.updraftcentral_row_extracontents');
			$location = jQuery('<div class="updraftcentral_updraftvault_paginator"></div>').appendTo(extra_contents);
		} else {
			$location.empty();
		}

		var pagi = new UpdraftCentral_PrevNext_Paginator($location, options);
		pagi.page_change(function(key, marker) {
			var query = {
				bucket: aws_s3_bucket,
				prefix: aws_s3_prefix,
				marker_key:key,
				last_marker:marker,
				per_page:$site_row.find('.updraftcentral_updraftvault_header .per_page').val()
			};
			self.browse_files($site_row, query).then(function(response) {
				if (typeof response.paging !== 'undefined') {
					paginator($site_row, {
						prev_key: response.paging.prev_key,
						next_key: response.paging.next_key,
						is_paged: response.paging.is_paged,
						last_marker: response.paging.last_marker
					});
				}
			});
		});
	}
	
	jQuery('#updraftcentral_dashboard_existingsites').on('updraftcentral_dashboard_mode_set_updraftvault', function() {
	
		/**
		 * Register a row clicker for a change event whenever the select all checkbox is tick.
		 *
		 * When ticked, should select/unselect all files depending on the state (checked or unchecked)
		 * of the select all checkbox.
		 */
		UpdraftCentral.register_row_clicker('.updraftcentral_updraftvault_table input[name="uc_updraftvault_check_all"]', function($site_row) {
			var checked = false;
			if (jQuery(this).is(':checked')) { checked = true; }
			
			$site_row.find('.updraftcentral_updraftvault_table input.check_item').each(function() {
				jQuery(this).prop('checked', checked);
			});
		}, true, 'change');
	
		/**
		 * Register a row clicker for a change event whenever the results per page dropdown is changed.
		 *
		 * When changed, should reload the files from the UpdraftVault based on the new results per
		 * page value.
		 */
		UpdraftCentral.register_row_clicker('select.per_page', function($site_row) {
			if ($site_row.find('.updraftcentral_updraftvault_rows.no-matched').is(':visible')) {
				return false;
			}
			
			var query = {
				bucket: aws_s3_bucket,
				prefix: aws_s3_prefix,
				per_page: $site_row.find('.updraftcentral_updraftvault_header .per_page').val()
			};
			self.browse_files($site_row, query).then(function(response) {
				if (typeof response.paging !== 'undefined') {
					paginator($site_row, {
						prev_key: response.paging.prev_key,
						next_key: response.paging.next_key,
						is_paged: response.paging.is_paged,
						last_marker: response.paging.last_marker
					});
				}
			});
		}, true, 'change');
		
		/**
		 * Register a row clicker for a click event whenever an action button (e.g. delete) is clicked.
		 *
		 * When the "Delete" button is clicked, should either show a dialog box for delete confirmation,
		 * or an alert box if no files were currently selected. When the "OK" button is clicked
		 * from the confirmation box it should then proceed in passing the request to delete the selected files
		 * from the user's UpdraftVault.
		 */
		UpdraftCentral.register_row_clicker('.updraftcentral_site_updraftvault_action_btn', function($site_row) {
			if ($site_row.find('.updraftcentral_updraftvault_rows.no-matched').is(':visible')) {
				return false;
			}
			
			var action = jQuery(this).data('action');
			switch (action) {
				case 'delete':
					var query = {
						bucket: aws_s3_bucket,
						prefix: aws_s3_prefix,
						files: []
					};
					$site_row.find('.updraftcentral_updraftvault_table input.check_item:checked').each(function() {
						query.files.push(jQuery(this).data('key'));
					});
						
					if (query.files.length > 0) {
						UpdraftCentral_Library.dialog.confirm('<h2>'+translate_message('delete_files')+'</h2><p>'+translate_message('delete_files_confirm')+'</p>', function(result) {
							if (result) {
								self.delete_files($site_row, query);
							}
						});
					} else {
						UpdraftCentral_Library.dialog.alert('<h2>'+translate_message('empty_selection_header')+'</h2><p>'+translate_message('select_files')+'</p>');
					}
					break;
				default:
					break;
			}
		}, true);
	
		/**
		 * Register a row clicker for a click event whenever the browse files button is clicked.
		 *
		 * When the "Browse Files" button is clicked, should load all available files from the user's
		 * UpdraftVault, specifically associated with the currently selected site ($site_row).
		 *
		 * Disclaimer:
		 * 1. Only the files associated with the current site will be displayed, other sites from the user's
		 *    UpdraftVault will not be displayed.
		 * 2. We're loading the filters after loading the files, since the files will take much longer than
		 *    the filters because we're actually pulling the files from the Amazon S3 storage whereas the filters
		 *    are only pulled from the WP site itself.
		 */
		UpdraftCentral.register_row_clicker('.updraftcentral_site_browse_files', function($site_row) {
			
			self.get_updraftvault_credentials($site_row).then(function(response) {
				var data = parse_path(response.path, response.key);
				
				AWS.config.update({accessKeyId: response.accesskey, secretAccessKey: response.secretkey, sessionToken: response.sessiontoken});
				AWS.config.region = data.region;
				aws_s3 = new AWS.S3();
				aws_s3_bucket = data.bucket;
				aws_s3_prefix = data.prefix;
				
				var query = {
					bucket: data.bucket,
					prefix: data.prefix,
					per_page: 10,
					marker_key: '',
					last_marker: ''
				};
				self.get_updraftvault_filters($site_row);
				self.browse_files($site_row, query).then(function(response) {
					if (typeof response.paging !== 'undefined') {
						paginator($site_row, {
							prev_key: response.paging.prev_key,
							next_key: response.paging.next_key,
							is_paged: response.paging.is_paged,
							last_marker: response.paging.last_marker
						});
					}
				});
			});
			
		}, true);
		
	});
	
	/**
	 * Gets files from the Amazon S3 Bucket
	 *
	 * @param {Object} $site_row - The jQuery object of the site where the Amazon S3 Bucket is associated with.
	 * @param {Object} query - A parameter object to be sent along with the request.
	 * @param {string} query.bucket - The Amazon S3 Bucket.
	 * @param {string} query.prefix - The Amazon S3 Bucket prefix.
	 * @param {number} query.per_page - A number that indicates how many items should be displayed per page.
	 * @param {string} query.marker_key - A key that indicates where the retrieval of data should start (for internal use only).
	 * @param {string} query.last_marker - Last accessed key (for internal use only).
	 *
	 * @returns {Object} - A jQuery promise
	 * @borrows get_amazon_bucket_files
	 * @borrows set_loading
	 * @borrows done_loading
	 * @borrows UpdraftCentral.template_replace
	 * @borrows UpdraftCentral_Library.dialog.alert
	 */
	this.browse_files = function($site_row, query) {
		var deferred = jQuery.Deferred(),
			$location = $site_row.find('.updraftcentral_row_extracontents'),
			$updraftvault_location = $location.find('.updraftcentral_updraftvault_rows');
		if ($updraftvault_location.length === 0) {
			$updraftvault_location = jQuery('<div class="updraftcentral_updraftvault_rows"></div>').appendTo($location);
		}
		
		var params = {
			container: $updraftvault_location,
			html: '',
			aws_request: true
		}
		
		set_loading(params);
		get_amazon_bucket_files(query).then(function(response) {
			params.html = UpdraftCentral.template_replace('updraftvault-updraftvault-row', response);
			if (typeof response.message !== 'undefined') {
				params.html = translate_message(response);
			}
			params.response = response;
		}).fail(function(response) {
			UpdraftCentral_Library.dialog.alert('<h2>'+translate_message('browse_failed_header')+'</h2><p>'+translate_message(response)+'</p>');
			params.response = response;
		}).always(function(response) {
			if (typeof response === 'undefined') {
				response = params.response;
			}
			done_loading(params).then(function() {
				if (typeof response.files !== 'undefined') {
					if (Array.isArray(response.files)) {
						jQuery('.updraftcentral_updraftvault_rows').removeClass('no-matched');
					}
				} else {
					if (typeof response.message !== 'undefined') {
						if (response.message === 'files_not_found') {
							jQuery('.updraftcentral_updraftvault_rows').addClass('no-matched');
						}
					}
				}
				deferred.resolve(response);
			});
		});
		
		return deferred.promise();
	}
	
	/**
	 * Deletes Amazon S3 Bucket Objects/Files
	 *
	 * @param {Object} $site_row - The jQuery object of the site where the Amazon S3 Bucket is associated with.
	 * @param {Object} query - A parameter object to be sent along with the request.
	 * @param {string} query.bucket - The Amazon S3 Bucket.
	 * @param {Array} query.files - An array of keys that represents the files to be deleted.
	 *
	 * @returns {void}
	 * @borrows delete_amazon_bucket_files
	 * @borrows set_loading
	 * @borrows done_loading
	 * @borrows browse_files
	 * @borrows paginator
	 * @borrows UpdraftCentral_Library.dialog.alert
	 */
	this.delete_files = function($site_row, query) {
		var $location = $site_row.find('.updraftcentral_row_extracontents'),
			$updraftvault_location = $location.find('.updraftcentral_updraftvault_rows');
		if ($updraftvault_location.length === 0) {
			$updraftvault_location = jQuery('<div class="updraftcentral_updraftvault_rows"></div>').appendTo($location);
		}
		
		var params = {
			container: $updraftvault_location,
			html: '',
			aws_request: true
		}
		
		set_loading(params);
		delete_amazon_bucket_files(query).then(function(response) {
			var delete_response = response;
			
			self.browse_files($site_row, query).then(function(response) {
				if (typeof response.paging !== 'undefined') {
					paginator($site_row, {
						prev_key: response.paging.prev_key,
						next_key: response.paging.next_key,
						is_paged: response.paging.is_paged,
						last_marker: response.paging.last_marker
					});
				}
				UpdraftCentral_Library.dialog.alert('<h2>'+translate_message('delete_success_header')+'</h2><p>'+translate_message(delete_response)+'</p>');
			});
		}).fail(function(response) {
			UpdraftCentral_Library.dialog.alert('<h2>'+translate_message('delete_failed_header')+'</h2><p>'+translate_message(response)+'</p>');
			done_loading(params);
		});
	};
	
	/**
	 * Gets the results per page options for filter selection
	 *
	 * @param {Object} $site_row - The jQuery object of the site where the filters is to be pulled from.
	 *
	 * @returns {Object} - A jQuery promise with the response from the server
	 * @borrows set_loading
	 * @borrows done_loading
	 * @borrows UpdraftCentral.send_site_rpc
	 * @borrows UpdraftCentral.template_replace
	 */
	this.get_updraftvault_filters = function($site_row) {
		var deferred = jQuery.Deferred();
		var $location = $site_row.find('.updraftcentral_row_extracontents'),
			$filters_location = $location.find('.updraftcentral_updraftvault_filters');
		if ($filters_location.length === 0) {
			$filters_location = jQuery('<div class="updraftcentral_updraftvault_filters"></div>').prependTo($location);
		}
		
		var params = {
			container: $filters_location,
			html: ''
		}
		
		set_loading(params);
		
		var paging_data = {
			paging: {
				per_page_options: [ 10, 20, 50, 100, 500, 1000 ]
			}
		}
		
		params.html = UpdraftCentral.template_replace('updraftvault-updraftvault-filter', paging_data);
		
		done_loading(params).then(function() {
			deferred.resolve();
		});
		
		return deferred.promise();
	};
	
	/**
	 * Gets the user's Updraft Vault credentials from the remote server.
	 *
	 * @param {Object} $site_row - The jQuery object of the site where the credentials is to be pulled from.
	 *
	 * @returns {Object} - A jQuery promise with the response from the server
	 * @borrows set_loading
	 * @borrows done_loading
	 * @borrows UpdraftCentral.send_site_rpc
	 * @borrows UpdraftCentral.template_replace
	 */
	this.get_updraftvault_credentials = function($site_row) {
		var deferred = jQuery.Deferred(),
			$location = $site_row.find('.updraftcentral_row_extracontents'),
			$updraftvault_location = $location.find('.updraftcentral_updraftvault_rows');
		if ($updraftvault_location.length === 0) {
			$updraftvault_location = jQuery('<div class="updraftcentral_updraftvault_rows"></div>').appendTo($location);
		}
		
		var params = {
			container: $updraftvault_location,
			html: ''
		}
		
		set_loading(params);
		UpdraftCentral.send_site_rpc('updraftvault.get_credentials', null, $site_row, function(response, code) {
			if ('ok' === code && !response.data.error) {
				params.html = UpdraftCentral.template_replace('updraftvault-updraftvault-row', response.data);
				done_loading(params).then(function() {
					deferred.resolve(response.data);
				});
			} else {
				UpdraftCentral_Library.dialog.alert('<h2>'+translate_message('connection_error_header')+'</h2><p>'+translate_message(response.data)+'</p>');
				done_loading(params);
				deferred.reject();
			}
		});
		return deferred.promise();
	};
	
	/**
	 * Gets all available files or objects from the Amazon S3 Bucket
	 *
	 * @private
	 * @param {Object} query - A parameter object to be sent along with the request.
	 * @param {string} query.bucket - The Amazon S3 Bucket.
	 * @param {string} query.prefix - The Amazon S3 Bucket prefix.
	 * @param {number} query.per_page - A number that indicates how many items should be displayed per page.
	 * @param {string} query.marker_key - A key that indicates where the retrieval of data should start (for internal use only).
	 * @param {string} query.last_marker - Last accessed key (for internal use only).
	 *
	 * @returns {Object} - A jQuery promise
	 * @borrows formatBytes
	 * @borrows AWS.S3.listObjects (Amazon S3 Service)
	 * @borrows AWS.S3.getSignedUrl (Amazon S3 Service)
	 */
	function get_amazon_bucket_files(query) {
		var deferred = jQuery.Deferred();
		
		// Here, we check if we have a valid parameters to work on.
		// If not, then we set them to some default values.
		
		if (typeof query.per_page === 'undefined') query.per_page = 10;
		if (typeof query.marker_key === 'undefined') query.marker_key = '';
		if (typeof query.last_marker === 'undefined') query.last_marker = '';

		// Execute the Amazon S3 "listObjects" service along with the
		// Required parameters to make the service work.
		
		var params = {
		  Bucket: query.bucket,
		  Delimiter: '/',
		  Marker: query.marker_key,
		  MaxKeys: query.per_page,
		  Prefix: query.prefix
		};
		
		aws_s3.listObjects(params, function(err, data) {
			if (err) {
				deferred.reject({
					error: true,
					message: 'general_error_response',
					values: [err.stack]
				});
			} else {
				// Here, we're preparing variables and data that
				// Are needed to create a previous, next navigation of our
				// Amazon S3 Bucket Objects.
				
				var prev_key = query.marker_key;
				var next_key = '';
				var is_paged = true;
				var paging;
				var key, file_name, size;
				var files = [];
				var contents = data.Contents;
				var params;
				
				// Here, we're looping through the Contents returned from our
				// Current request and extract each of the files information/data
				// Which will be needed later on when rendering the list.
				
				for (var i=0; i < contents.length; i++) {
					key = contents[i].Key;
					file_name = key.replace(query.prefix, '');
					size = formatBytes(contents[i].Size, 2);
					
					params = {
						Bucket: query.bucket,
						Key: key
					};
					
					if (query.prefix !== key) {
						files.push({
							key: key,
							file_name: file_name,
							size: size,
							download_link: aws_s3.getSignedUrl('getObject', params)
						});
					}
				}
				
				// This block is only applicable if Updraft Vault actually
				// Contains objects or files. This is where we determined
				// If there's a need to render the paginator or not.
				
				if (files.length) {
					if (data.IsTruncated) {
						next_key = data.NextMarker;
					} else {
						if (prev_key.length === 0) {
							is_paged = false;
						}
					}
				}
				
				// Wrap the needed info for the paginator in the paging
				// Array and pass it along the response.
				paging = {
					prev_key: prev_key,
					next_key: next_key,
					is_paged: is_paged,
					last_marker: query.last_marker,
				};
				
				if (files.length) {
					// If the user's Updraft Vault for the current site is not empty, then
					// We return the following information for consumption.
					deferred.resolve({
						files: files,
						data: data,
						paging: paging,
					});
				} else {
					// Otherwise, we return a "files_not_found" notice, not an actual error per se
					// Since an empty bucket isn't actually an error.
					deferred.resolve({
						error: false,
						message: 'files_not_found',
						values: []
					});
				}
			}
		});
		
		return deferred.promise();
	}
	
	/**
	 * Deletes the selected Amazon S3 Bucket Objects/Files
	 *
	 * @private
	 * @param {Object} query - A parameter object to be sent along with the request.
	 * @param {string} query.bucket - The Amazon S3 Bucket.
	 * @param {Array} query.files - An array of keys that represents the files to be deleted.
	 *
	 * @returns {Object} - A jQuery promise
	 * @borrows AWS.S3.deleteObjects (Amazon S3 Service)
	 */
	function delete_amazon_bucket_files(query) {
		var deferred = jQuery.Deferred();
		
		// Prepare the needed array that will serve as parameters
		// To the Amazon S3 "deleteObjects" service.
		files = [];
		for (var i=0; i < query.files.length; i++) {
			key = query.files[i];
			files.push({
				Key: key
			});
		}
		
		// Execute the "deleteObjects" service along with the
		// Eucket and objects parameters.
		var params = {
			Bucket: query.bucket,
			Delete: {
				Objects: files
			}
		};
		
		aws_s3.deleteObjects(params, function(err, data) {
			if (err) {
				// An error has occured while processing the request.
				// Thus, we're returning an error notice.
				deferred.reject({
					error: true,
					message: 'delete_error',
					values: [err.stack]
				});
			} else {
				// Here, we're returning a success notice of the current
				// Delete operation.
				deferred.resolve({
					error: false,
					message: 'delete_success',
					values: []
				});
			}
		});
		
		return deferred.promise();
	}
	
	/**
	 * Converts raw bytes to human readable value
	 *
	 * @private
	 * @param {number} bytes - A raw (non-formatted) bytes value
	 * @param {number} decimals - The number of decimals to display
	 *
	 * @returns {string} - Converted bytes value to human readable
	 * @borrows Math.floor
	 * @borrows Math.log
	 * @borrows Math.pow
	 * @borrows parseFloat
	 */
	function formatBytes(bytes, decimals) {
		if (bytes === 0) {
			return '0 Bytes';
		}
	   
		var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		var k = 1000;
		var dm = decimals || 3;
		var i = Math.floor(Math.log(bytes) / Math.log(k));

		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	}
	
	
	/**
	 * Sets an area to a loading style
	 *
	 * Disclaimer: This is a custom built loader to support AWS S3 requests.
	 * This is not a redundant script of the UpdraftCentral.set_loading
	 * but uses the said method.
	 *
	 * @private
	 * @param {Object} $container - the jQuery object of the area to be set as loading
	 *
	 * @returns {void}
	 * @borrows UpdraftCentral.set_loading
	 */
	function set_loading(params) {
		UpdraftCentral.set_loading(params.container);
		
		if (typeof params.aws_request !== 'undefined') {
			params.container.before('<div class="updraftcentral_spinner"></div>');
		}
	}

	/**
	 * Removes the loading style from an area
	 *
	 * Disclaimer: This is a custom built loader to support AWS S3 requests.
	 * This is not a redundant script of the UpdraftCentral.done_loading
	 * but uses the said method.
	 *
	 * @private
	 * @param {Object} $container - the jQuery object of the area to be set as loading
	 * @param {string} html - a string of html to place into the finished loaded area
	 *
	 * @returns {Object} a jQuery promise with The response from the server
	 * @borrows UpdraftCentral.done_loading
	 */
	function done_loading(params) {
		var deferred = jQuery.Deferred();
		
		UpdraftCentral.done_loading(params.container, params.html).then(function() {
			if (typeof params.aws_request !== 'undefined') {
				params.container.parent().children('.updraftcentral_spinner').remove();
			}
			deferred.resolve();
		});
		
		return deferred.promise();
	}
	
	/**
	 * Extracts information from Amazon S3 Path
	 *
	 * @private
	 * @param {string} path - The Amazon S3 path pulled from the server response
	 * @param {string} key - UpdraftVault identifier string for the Amazon S3 Bucket
	 *
	 * @returns {Object} - An object containing the following properties (bucket, prefix, region)
	 */
	function parse_path(path, key) {
		var result = {
			bucket: '',
			prefix: '',
			region: ''
		};
		
		if (typeof path !== 'undefined') {
			var arr = path.split('/');
			if (arr.length) {
				result.bucket = arr[0];
				result.region = result.bucket.replace(key + '-', '');
				if (arr.length > 1) {
					result.prefix = path.replace(result.bucket + '/', '') + '/';
				}
			}
		}
		
		return result;
	}
	
	/**
	 * Translates a response from the remote WordPress site
	 *
	 * @private
	 * @param {mixed} message - An object containing message and values properties or a string
	 *
	 * @returns {string} text - Translated text
	 */
	function translate_message(message) {
		var values;

		if (typeof message !== 'string' && message && message.hasOwnProperty('values')) {
			values = message['values'];
			message = message['message'];
		}

		if (typeof message === 'undefined') {
			console.log("UpdraftCentral: The 'translate_message' requires an object with the properties 'message' and 'values' if there's a variable");
		}
		if (message === false) {
			return '';
		}

		var translation = udclion.updraftvault[message];
		if (typeof translation === 'undefined') {
			UpdraftCentral_Library.dialog.alert('<h2>' + udclion.error+'</h2><p>' + sprintf(udclion.updraftvault.translation_not_found_for, message) + '</p>');
			return null;
		}

		if (typeof values === 'undefined') {
			return translation;
		} else {
			return sprintf(translation, values);
		}
	}

}
