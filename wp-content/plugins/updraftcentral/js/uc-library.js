jQuery(document).ready(function($) {
	UpdraftCentral_Library = new UpdraftCentral_Library();
});

/**
 * Pagination Class
 *
 * A pagination renderer for both remote and preloaded items
 *
 * N.B. preloaded items are simply results from a previous remote website request and
 * stored for fast management of items without the need to constantly pull items from
 * the remote website everytime an action is triggered.
 *
 * @example
 * Parameter "config" example value:
 * config = {
 *		container: ,
 *		items_per_page: ,
 *		type: local | remote,
 *		callback: function(page) {
 *			// The current page where the rendered items are pulled in the collection
 *		},
 * }
 *
 * @constructor
 */
function UpdraftCentral_Pagination(config) {
	var self = this;
	var $ = jQuery;
	var config = $.extend({}, config);
	var preloaded_items = new UpdraftCentral_Collection();
	var filtered_items = new UpdraftCentral_Collection();
	var remote_data;
	var current_data;

	/**
	 * Calculates the pagination info (pages, etc.) and pulls the paged items based
	 * from the current page submitted
	 *
	 * @private
	 * @param {integer} page The current page where the items is to be pulled from
	 *
	 * @returns {object}
	 */
	var get_results_info = function(page) {
		var data = { info: {}, items: [] };
		var items = (filtered_items.count()) ? filtered_items : preloaded_items;
		var items_per_page = (config.hasOwnProperty('items_per_page')) ? config.items_per_page : 10;

		if (items.count()) {
			page = ('undefined' !== typeof page) ? page : 1;

			// Computes the elements of the pagination interface based from the preset items information
			var total_count = items.count();
			var extra_page = parseInt(total_count % items_per_page) > 0 ? 1 : 0;
			var pages = parseInt(total_count / items_per_page) + extra_page;
			var index = (page * items_per_page) - items_per_page;

			var keys = items.keys();
			var paged_keys = keys.splice(index, items_per_page);

			var items_from = index + 1;
			var items_to = (page === pages) ? total_count : page * items_per_page;

			// Pulls the items based from the current page submitted
			var results = [];
			for (var i=0; i<paged_keys.length; i++) {
				var item = items.item(paged_keys[i]);
				results.push(item);
			}

			// Wraps result in this structure before returning
			data = {
				info: {
					page: page,
					pages: pages,
					results: total_count,
					items_from: items_from,
					items_to: items_to
				},
				items: results
			}
		}

		return data;
	}

	/**
	 * Calculates the items boundary if not defined
	 *
	 * @private
	 * @param {object} info Contains the page information to render
	 *
	 * @returns {object}
	 */
	var maybe_calculate_bounds = function(info) {
		// For remote type, these "items_from" and "items_to" does not exists
		// so, we're building it based on the above info
		if ('undefined' === typeof info.items_from) {
			var page = parseInt(info.page);
			var pages = parseInt(info.pages);
			var results = parseInt(info.results);
			var extra_item = parseInt(results % pages) > 0 ? 1 : 0;
			var limit = parseInt(results / pages) + extra_item;
			var index = (page * limit) - limit;

			info.items_from = index + 1;
			info.items_to = (page === pages) ? results : page * limit;
		}

		return info;
	}

	/**
	 * Builds the pagination interface
	 *
	 * @private
	 * @param {object} info Contains the page information to render
	 *
	 * @returns {string}
	 */
	var build_interface = function(info) {
		if ('undefined' === typeof info) {
			console.log('Error: uc-library.js:UpdraftCentral_Pagination:build_interface - unable to construct pagination interface because the required info object is not defined. Possible cause, the module\'s handler in UpdraftPlus is outdated.');
			return;
		}

		info = maybe_calculate_bounds(info);

		var page = parseInt(info.page);
		var pages = parseInt(info.pages);
		var results = parseInt(info.results);
		var items_from = parseInt(info.items_from);
		var	items_to = parseInt(info.items_to);

		var loaded = false;
		if (config.hasOwnProperty('type') && 'local' === config.type) {
			loaded = true;
		}

		var pagination = '';
		if (1 !== page) {
			pagination += '<a href="#" data-page="1" data-preloaded="'+loaded+'" class="uc-pagination-first-button">'+udclion.first+'</a>';
			pagination += ' <span class="uc-pagination-separator">|</span> ';
		}
		if (page > 1) pagination += '<a href="#" data-page="'+(page-1)+'" data-preloaded="'+loaded+'" class="uc-pagination-previous-button">'+udclion.previous+'</a>';
		if (page > 1 && page < pages) pagination += ' <span class="uc-pagination-separator">|</span> ';
		if (page < pages) pagination += '<a href="#" data-page="'+(page+1)+'" data-preloaded="'+loaded+'" class="uc-pagination-next-button">'+udclion.next+'</a>';
		if (pages !== page) {
			pagination += ' <span class="uc-pagination-separator">|</span> ';
			pagination += '<a href="#" data-page="'+pages+'" data-preloaded="'+loaded+'" class="uc-pagination-last-button">'+udclion.last+'</a>';
		}
		pagination += '<div class="uc-pagination-results-info">'+sprintf(udclion.page_of, page, pages)+', <span class="uc-pagination-item-bounds">'+sprintf(udclion.total_items, items_from, items_to, results)+'</span></div>';

		return pagination;
	}

	/**
	 * Preloads an item for fast navigation
	 *
	 * @param array items An array of objects representing the items from a queried results.
	 *					  Object must need at least two properties "name" and "website". These
	 * 					  makes them unique across multiple websites.
	 *
	 * @example
	 * Parameter "items" example value:
	 * items = [
	 *	{ name: '', website: '', ... },
	 *	{ name: '', website: '', ... },
	 *	{ name: '', website: '', ... },
	 * ]
	 */
	this.preload_items = function(items) {
		if (preloaded_items.count()) preloaded_items.clear();
		if ('undefined' !== typeof items && items) {
			for (var i=0; i<items.length; i++) {
				var item = items[i];

				if (item.hasOwnProperty('name') && item.hasOwnProperty('website')) {
					var key = item.name + '_' + item.website;
					preloaded_items.add(key, item);
				}
			}
		}
	}

	/**
	 * Set filtered items to factor in when rendering the pagination interface
	 *
	 * @param {array} items A collection of filtered items
	 *
	 * @returns {void}
	 */
	this.set_filtered_items = function(items) {
		filtered_items = items;
	}

	/**
	 * Set remote data from the results of a remote website query
	 *
	 * @param {array} items A collection of items from the remote query
	 *
	 * @returns {void}
	 */
	this.set_remote_data = function(items) {
		remote_data = items;
	}

	/**
	 * Extract the paged data/items
	 *
	 * @param {integer} page The current page where the items is to be pulled from
	 *
	 * @returns {object}
	 */
	this.get_data = function(page) {
		current_data = (config.hasOwnProperty('type') && 'local' === config.type) ? get_results_info(page) : remote_data;
		return current_data;
	}

	/**
	 * Renders the pagination interface based from the pre-set data and the current page
	 *
	 * @param {integer} page The current page where the items is to be pulled from within the collection
	 *
	 * @returns {void}
	 */
	this.render = function(page) {
		if ('undefined' === typeof current_data || !current_data || 'undefined' !== typeof page) self.get_data(page);
		if ('undefined' !== typeof current_data && current_data) {
			var $ui = build_interface(current_data.info);

			if (config.hasOwnProperty('container') && config.container) {
				$(config.container).html($ui);
				$(config.container).find('a.uc-pagination-first-button, a.uc-pagination-previous-button, a.uc-pagination-next-button, a.uc-pagination-last-button').off('click').on('click', function() {
					var page = $(this).data('page');

					if (config.hasOwnProperty('callback') && config.callback) {
						config.callback.apply(null, [page]);
					}
				});
			}
		}
	}
}

/**
 * Site Filter Class
 *
 * A widget build to allow users to select multiple websites to apply any actions
 * selected or triggered by the user
 *
 * @example
 * Parameter "config" sample.
 * config = {
 *		container: ,
 *		extra_classes: ,
 *		label: ,
 *		placeholder: ,
 *		buttons: [
 *			{
 *				id: ,
 *				name: ,
 *				class:,
 *				callback: function() {
 *
 *				}
 *			}
 *		]
 *	}
 *
 * @constructor
 */
function UpdraftCentral_Site_Filter(config) {
	var self = this;
	var $ = jQuery;
	var sites = new UpdraftCentral_Collection();
	var options = [];
	var config = $.extend({}, config);
	var $site_row = (config.hasOwnProperty('default_site') && config.default_site) ? config.default_site : null;
	var prefix = 'uc_site_filter_';
	var group_options = new UpdraftCentral_Collection();

	/**
	 * Gets all available websites and wrap it up as filter options when users
	 * apply certain actions
	 *
	 * @private
	 * @returns {array}
	 */
	var get_site_options = function() {
		var site_options = [];
		var all_options = [];

		// Adding all websites option
		site_options.push({
			id: 0,
			text: udclion.add_all_sites
		});

		// Insert site_tagged options if available
		site_options = maybe_add_site_tagged_options(site_options);

		$('.updraftcentral_site_row:not(.suspended)').each(function() {
			var id = $(this).data('site_id');
			var description = $(this).data('site_description');

			var option = {
				id: id,
				text: description
			};
			site_options.push(option);

			// This is different from site_options array as this does not
			// include the site tagged options. It only contains the individual
			// site information to be rendered later.
			all_options.push(id);
		});

		group_options.add(0, all_options);
		return site_options;
	}

	/**
	 * Add site tagged options if available
	 *
	 * @private
	 * @param {array} site_options An array of objects containing the id and name fields that will be displayed as dropdown options
	 *
	 * @returns {array}
	 */
	var maybe_add_site_tagged_options = function(site_options) {
		$('.updraftcentral_site_row:not(.suspended)').each(function() {
			var site_id = $(this).data('site_id');
			var tag_items = $(this).find('li.udc_tag_item .udc_tag_text');

			if ('undefined' !== typeof tag_items && tag_items && tag_items.length) {
				tag_items.each(function() {
					var name = $(this).data('tag_name');
					if (!group_options.exists(name)) {
						site_options.push({
							id: name,
							text: sprintf(udclion.add_all_sites_tagged, name)
						});

						group_options.add(name, [site_id]);
					} else {
						var sites_array = group_options.item(name);
						sites_array.push(site_id);
						group_options.update(name, sites_array);
					}
				});
			}
		});

		return site_options;
	}

	/**
	 * Builds the interface based from the initial configuration submitted
	 *
	 * @private
	 * @returns {object}
	 */
	var build_interface = function() {
		var extra_classes = (config.hasOwnProperty('extra_classes') && config.extra_classes) ? ' '+config.extra_classes : '';

		// Create basic elements to apply the widget
		var $container = $('<div></div>', {
			class: prefix + 'container' + extra_classes,
		});

		var $label = $('<div></div>', {
			class: prefix + 'label',
		}).html(config.label).appendTo($container);


		var $sites_filter = $('<div></div>', {
			class: prefix + 'sites_container',
		});

		var $sites = $('<select></select>', {
			class: prefix + 'sites',
			name: 'sites[]',
			multiple: 'multiple',
		}).appendTo($sites_filter);

		$sites_filter.appendTo($container);

		var $buttons = $('<div></div>', {
			class: prefix + 'buttons',
		});

		// Generates widget buttons if set in the initial configuration and apply
		// any callback handlers whenever applicable
		if (config.hasOwnProperty('buttons') && $.isArray(config.buttons)) {
			for (var i=0; i<config.buttons.length; i++) {
				var item = config.buttons[i];
				var text = item.hasOwnProperty('text') ? item.text : udclion.submit;
				var button_index = i + 1;

				var $button = $('<button></button>', {
					id: item.hasOwnProperty('id') ? item.id : prefix + 'button' + button_index,
					name: item.hasOwnProperty('name') ? item.name : prefix + 'button' + button_index,
					class: item.hasOwnProperty('class') ? 'btn btn-primary ' + item.class : 'btn btn-primary',
				}).text(text).on('click', function() {
					if (item.hasOwnProperty('callback') && 'function' === typeof item.callback) {
						item.callback.apply(null, []);
					}
				}).appendTo($buttons);
			}
		}

		$buttons.appendTo($container);

		return $container;
	}

	/**
	 * Renders the site filter widget where the user can select one or more websites where to
	 * apply his or her selected/triggered actions
	 *
	 * @returns {void}
	 */
	this.render = function() {
		var $ui = build_interface();
		if (config.hasOwnProperty('container') && config.container) {
			$(config.container).append($ui);

			// Apply select2js library when rendering the widget and implement
			// action listeners and handlers
			$(config.container).find('select.'+ prefix + 'sites').select2({
				data: get_site_options(),
				placeholder: config.hasOwnProperty('placeholder') ? config.placeholder : udclion.press_to_select_website
			});

			// Selection overrides for custom group option ('all sites', 'sites with tag')
			$(config.container).find('select.'+ prefix + 'sites').off('select2:select').on('select2:select', function(e) {
				var data = e.params.data;
				if (group_options.exists(data.id)) {
					// Clear any previous selections. We're going to replace
					// them with the actual sites associated with the currently
					// selected group option.
					$(this).val(null).trigger('change');

					// Select the provided values and trigger change to refresh the UI.
					var site_ids = group_options.item(data.id);
					$(this).val(site_ids).trigger('change');
				}
			});

			$(config.container).find('select.'+ prefix + 'sites').off('select2:open').on('select2:open', function() {
				if ($.fullscreen.isFullScreen()) {
					$(document.body).children('span.select2-container--open').appendTo('#updraftcentral_dashboard');
				}
			});

			$(config.container).find('select.'+ prefix + 'sites').off('select2:opening select2:closing').on('select2:opening select2:closing', function(event) {
				var $searchfield = $(this).parent().find('.select2-search__field');
				$searchfield.prop('disabled', true);
			});

			// We're disabling input by hiding it since we're loading a predefined sites collection as options.
			$(config.container).find('input.select2-search__field').hide();

			if ('undefined' !== typeof $site_row && $site_row) {
				// Add the default site:
				$(config.container).find('select.'+ prefix + 'sites').select2("trigger", "select", {
					data: {
						id: $site_row.data('site_id'),
						text: $site_row.data('site_description')
					}
				});
			}
		}
	}

	/**
	 * Gets or retrieves the selected websites using this site filter widget
	 *
	 * @returns {object}
	 */
	this.get_selected_sites = function() {
		// Adding sites to the collection
		var target_sites = $('select.'+ prefix + 'sites').val();
		var is_empty = false;

		// Clear sites to any new request to this function. No need to create a new "UpdraftCentral_Collection"
		// instance everytime this function is called, so we're clearing it instead.
		if (sites.count()) sites.clear();

		if ('undefined' !== typeof target_sites && target_sites && target_sites.length) {
			var ids = ('string' === typeof target_sites) ? target_sites.split(',') : target_sites;
			for (var i=0; i<ids.length; i++) {
				var $site = $('.updraftcentral_site_row[data-site_id="'+ids[i]+'"');
				if ($site.length) {
					sites.add($site.data('site_id'), $site);
				}
			}
		}

		if (!sites.count()) {
			// If sites filter is empty meaning the user didn't select any additional websites
			// to install the plugin(s), then we fall back to the default (host) website to execute the process
			sites.add($site_row.data('site_id'), $site_row);

			// We've reached here as a fallback because the site selections is empty, thus, we're setting
			// the "is_empty" flag to inform the caller of the actual status even if we have defaulted to the
			// host site (the site that is currently choosen to work on by the user).
			is_empty = true;
		}

		return {
			sites: sites,
			selection_empty: is_empty
		};
	}

}

/**
 * Recorder Class
 *
 * A non-intrusive recording of current menu's event/content and site selection.
 *
 * @constructor
 */
function UpdraftCentral_Recorder() {
	var self = this;
	var $ = jQuery;
	var cache;
	var current_menu;
	var current_site;
	var storeable;
	var reset;

	/**
	 * Initializes local variables
	 */
	var init = function() {
		cache = new UpdraftCentral_Collection();
		storeable = false;
		reset = false;
	}
	init();

	/**
	 * Resets site selection
	 *
	 * @returns {void}
	 */
	function reset_site_selection() {
		self.current_site = '';
		UpdraftCentral.$site_row = null;
	}

	/**
	 * Hides or empty elements not needed and add some custom container for
	 * site selection status when recorder first loads to avoid confusions
	 * on user selections/options
	 *
	 * @returns {void}
	 */
	function onload_housekeeping() {
		$('.updraftcentral-search-area input#udc_search_tag').val('');

		// Create site selected status container. This is to avoid confusion by showing the currently selected site
		var site_status_container = $('#updraft-central-navigation > div.updraftcentral_site_selected');
		if (!site_status_container.length) {
			$('#updraft-central-navigation').append('<div class="updraftcentral_site_selected">'+udclion.no_site_selected+'</div>');
		}
	}

	/**
	 * Reloads selected options from select elements
	 *
	 * @param {object} $container - A jQuery object representing the container where the content is loaded
	 * @param {array} options - An array of select/dropdown elements
	 * @returns {void}
	 */
	function reload_dropdown_events($container, options) {
		if ('undefined' !== typeof options) {
			for (var i=0; i<options.length; i++) {
				var dropdown = options[i].dropdown;
				var value = options[i].selected;
				var element_class = $(dropdown).prop('class');
				var element_id = $(dropdown).prop('id');

				var selector = '';
				if ('undefined' !== typeof element_class && element_class.length) {
					selector = 'select.'+element_class.replace(/\s/, '.');
				} else {
					if ('undefined' !== typeof element_id && element_id.length) {
						selector = 'select#'+element_id;
					}
				}

				if (selector.length) {
					var element = $container.find(selector);
					var option = element.find('option[value="'+value+'"]');

					option.prop('selected', 'selected');
				}
			}
		}
	}

	/**
	 * Reloads or reset to the initial state of the interface when first accessed
	 *
	 * Basically, removing any previous site selections, deleting settings along with displaying hidden items/sections
	 * if applicable.
	 *
	 * @returns {void}
	 */
	function reload_selection() {
		// Reset settings and storage
		cache = new UpdraftCentral_Collection();
		storeable = false;
		reset = false;
		self.current_site = '';
		UpdraftCentral.$site_row = null;

		$('.updraftcentral-search-area').show();
		$('#updraftcentral_dashboard_existingsites').find('.ui-sortable-handle').show();
		$('#updraft-central-navigation > div.updraftcentral_site_selected').html(udclion.no_site_selected);
	}

	/**
	 * Loads stored content that is not associated with a site
	 *
	 * @param {object} menu - The menu container that holds the sites and no_sites collection
	 * @param {string} mode - The mode or menu section currently processed
	 */
	function load_no_site_content(menu, mode) {
		var container = menu.no_sites[mode].container;
		var callback = menu.no_sites[mode].post_load_callback;
		var content_mode = menu.no_sites[mode].mode;
		var options = menu.no_sites[mode].options;

		$('.updraftcentral-search-area').hide();
		$(container).parent().find('.ui-sortable-handle').hide();
		$(container).html(menu.no_sites[mode].html);

		reload_dropdown_events($(container), options);

		$('#updraftcentral_dashboard_existingsites').trigger('extra_contents_loaded_'+mode, [null]);
		$('#updraftcentral_dashboard_existingsites').trigger('recorder_content_loaded', [mode, $(container).html(), null]);
		if (content_mode === mode && 'function' === typeof callback) {
			callback.apply(null, []);
		}
	}

	/**
	 * Loads the event handlers needed for the recording process to work
	 */
	this.load = function() {

		$('#updraftcentral_dashboard_existingsites').on('extra_contents_loaded_updates', function(event, $site_row) {
			
			// We are after for the mass update to update the tool tip when its content is loaded from the recorder,
			// so we only process if $site_row == null, since technically mass updates isn't linked to a particular site.
			if (null === $site_row) {
				var $container = $('#updraftcentral_dashboard_existingsites').find('#updates_container');
				if ('undefined' !== typeof $container && $container.length && $container.is(':visible')) {
					reset_site_selection();

					// Shows "All sites selected" on mass updates
					$('#updraft-central-navigation > div.updraftcentral_site_selected').html(udclion.all_sites_selected);
					$('#updraft-central-content button.updraftcentral_action_choose_another_site').show();
				}
			}
		});

		/**
		 * Sets listener for the "updraftcentral_dashboard_mode_set_before"
		 *
		 * Listening to this event will give us a way to store the previously accessed content
		 * before emptying the container for the new content to follow.
		 *
		 * @see {@link http://api.jquery.com/on}
		 */
		$('#updraftcentral_dashboard_existingsites').on('updraftcentral_dashboard_mode_set_before', function(event, data) {
			
			self.current_menu = data.new_mode;

			if (!cache.exists(data.new_mode)) {
				cache.add(data.new_mode, {
					sites: {},
					no_sites: {}
				});
			}

			if (!cache.exists(data.previous_mode)) {
				cache.add(data.previous_mode, {
					sites: {},
					no_sites: {}
				});
			}

			var menu = cache.item(data.previous_mode);

			if ('undefined' !== typeof self.current_site && self.current_site.length) {
				var extra_contents = data.extra_contents;
				var site_id = self.current_site.data('site_id');
				var html = extra_contents.children().clone(true, true);

				if ('undefined' === typeof menu.sites[site_id]) {
					menu.sites[site_id] = {};
				}

				menu.sites[site_id].html = html;
				menu.sites[site_id].force = data.force;
				menu.sites[site_id].options = [];

				extra_contents.find('select').each(function() {
					menu.sites[site_id].options.push({
						dropdown: $(this),
						selected: $(this).find('option').filter(':selected').val()
					})
				});

				cache.update(data.previous_mode, menu);
				extra_contents.html('');
			}


			if ('undefined' !== typeof menu.no_sites[data.previous_mode]) {
				var container = menu.no_sites[data.previous_mode].container;
				var extra_contents = $(container);
				var html = extra_contents.children().clone(true, true);

				menu.no_sites[data.previous_mode].html = html;
				menu.no_sites[data.previous_mode].options = [];

				extra_contents.find('select').each(function() {
					menu.no_sites[data.previous_mode].options.push({
						dropdown: $(this),
						selected: $(this).find('option').filter(':selected').val()
					})
				});

				cache.update(data.previous_mode, menu);

				// Clear container's content after saving
				$(container).html('');
			}

			// Check if we need to do a reset
			if (true === data.force && data.new_mode === data.previous_mode) {
				self.reset = true;
			}

			// N.B. Typing or searching using the search bar is used to narrow down the list not actually selecting any
			// one of the sites listed, one must click either one of the site action buttons to select it. So, here we're
			// making sure that we temporarily store the keyword typed by the user to persist it or preserving what was original type
			// (by retrieving it later when he/she comes back to the "Sites" section). This is done before clearing the search bar when
			// switching to a different tabs. Otherwise, we get a blank site list on the other tabs if the keyword/tag
			// typed by the user points to a different site other than the one previously selected (stored site).
			if (!cache.exists('search_tag')) {
				cache.add('search_tag', '');
			}

			// N.B. This only applies if a site has already been selected
			if ('undefined' !== typeof self.current_site && self.current_site.length) {
				if ('sites' === data.previous_mode) {
					cache.update('search_tag', $('.updraftcentral-search-area input#udc_search_tag').val());
					$('.updraftcentral-search-area input#udc_search_tag').val('');
				} else {
					if ('sites' !== data.new_mode) {
						$('.updraftcentral-search-area').hide();
					} else {
						$('.updraftcentral-search-area input#udc_search_tag').val(cache.item('search_tag'));
					}
				}
			}

			// Reset or close open site actions dropdowns when switching tabs
			var dropdown = $('.updraft_site_actions.open');
			if (dropdown.length) {
				dropdown.removeClass('open');
			} else {
				dropdown = $('.updraft_site_actions.show');
				if (dropdown.length) dropdown.removeClass('show');
			}

			// Reset tool tip if no site is currently selected
			if ('undefined' !== typeof self.current_site && !self.current_site.length) {
				$('#updraft-central-navigation > div.updraftcentral_site_selected').html(udclion.no_site_selected);
			}
		});

		/**
		 * Sets listener for the "updraftcentral_dashboard_mode_set"
		 *
		 * Listening to this event will give us a way to process the currently selected site
		 * and its content.
		 *
		 * @see {@link http://api.jquery.com/on}
		 */
		$('#updraftcentral_dashboard_existingsites').on('updraftcentral_dashboard_mode_set', function(event, data) {

			// Trying to avoid doing the same process within the same context.
			// Thus, we're only going to process this event if both "new_mode" and
			// "previous_mode" are not the same.
			if (data.new_mode !== data.previous_mode) {

				// Hide other sites
				if ('undefined' !== typeof self.current_site && self.current_site.length) {
					var site_id = self.current_site.data('site_id');

					// Need to make sure that we have a valid site in the DOM before executing the needed action, because
					// there are circumstances where the site was removed or deleted from a previous action.
					var $site_row = $('.updraftcentral_site_row[data-site_id="'+site_id+'"]');

					if ('undefined' !== typeof $site_row && $site_row && $site_row.length) {
						var restore_hidden = false;

						// Make sure that we hide all other sites aside from the ones currently
						// selected by the user, so that he or she won't have to re-select the same
						// site all over again, and make sure the "Choose another site to manage" button
						// is visible in case he wishes to choose another site to work on.
						if ('sites' !== data.new_mode) {

							var $parent = $site_row.closest('#updraftcentral_dashboard_existingsites');
							$parent.find('.updraftcentral_site_row[data-site_id="'+site_id+'"]').parent().show();

							$parent.find('.updraftcentral_site_row[data-site_id!="'+site_id+'"]').each(function() {
								var $other = $(this);

								$other.parent().hide();
							});

							$('.updraftcentral-search-area').hide();
							$('#updraft-central-content button.updraftcentral_action_choose_another_site').show();

							// Re-populate the "extracontents" container with the last previously accessed content
							// for the given menu under the currently selected site.
							var menu = cache.item(data.new_mode);
							if ('undefined' !== typeof menu) {
								var site = menu.sites[site_id];

								if ('undefined' !== typeof menu.no_sites[data.new_mode]) {
									load_no_site_content(menu, data.new_mode);
								} else if ('undefined' !== typeof site) {

									if (!site.force) {
										if (!site.storeable && 'undefined' !== typeof site.action_item) {
											/**
											 * Sets listener for the "updraftcentral_dashboard_mode_set_after"
											 *
											 * Listening to this event will give us a way to safely trigger the click event
											 * of the action item/button after it has been loaded.
											 *
											 * @see {@link http://api.jquery.com/on}
											 */
											$('#updraftcentral_dashboard_existingsites').on('updraftcentral_dashboard_mode_set_after', function(event, data) {

												// Turn-off the listener to make sure that we don't process more than once everytime the event
												// is called, most especially when setting a new dashboard mode. It should only be called once
												// when the recorder process runs through this line.
												$('#updraftcentral_dashboard_existingsites').off('updraftcentral_dashboard_mode_set_after');

												// Since this button is not storeable, then we need to trigger its
												// click event to re-execute its underlying process.
												$(site.action_item).trigger('click');
												
											});

										} else {
											// Stored contents are re-displayed to the user
											var extra_contents = $site_row.find('.updraftcentral_row_extracontents');
											var options = site.options;

											extra_contents.html(site.html);
											reload_dropdown_events(extra_contents, options);

											$('#updraftcentral_dashboard_existingsites').trigger('extra_contents_loaded_'+data.new_mode, [$site_row]);
											$('#updraftcentral_dashboard_existingsites').trigger('recorder_content_loaded', [data.new_mode, site.html, site]);
										}
									} else {
										restore_hidden = true;
									}
								}
							}

						} else {
							restore_hidden = true;
						}

						if (restore_hidden) {
							$('.updraftcentral-search-area').show();
							$site_row.closest('#updraftcentral_dashboard_existingsites').find('.updraftcentral_site_row').parent().show();
						}
					}
				} else {
					var menu = cache.item(data.new_mode);
					if ('undefined' !== typeof menu) {
						if ('undefined' !== typeof menu.no_sites[data.new_mode]) {
							load_no_site_content(menu, data.new_mode);
						} else {
							$('.updraftcentral-search-area').show();
							$('#updraftcentral_dashboard_existingsites').find('.ui-sortable-handle').show();
						}
					}
				}
			} else {
				if (self.reset) {
					reload_selection();
				}
			}

			/**
			 * Registers click event for the "Show updates for all sites" action button
			 *
			 * @see {UpdraftCentral.register_row_clicker}
			 */
			UpdraftCentral.register_event_handler('click', '.updraftcentral_mode_actions button.updraftcentral_action_show_all_updates', function() {
				
				var menu = cache.item(self.current_menu);
				if ('undefined' !== typeof menu && menu) {

					if ('undefined' === typeof menu.no_sites[self.current_menu]) {
						menu.no_sites[self.current_menu] = {
							container: '#updates_container.updraftcentral_row_extracontents',
							html: '',	// This gets populated later when switching menus or modes
							mode: 'updates',	// Same as menu, we're just using "mode" here to be consistent with the check description
							post_load_callback: function() {

								// Refresh the interface cache from previous usage, specifically from mass updates activities.
								if ('function' === typeof UpdraftCentral_Updates.reload_interface) {
									UpdraftCentral_Updates.reload_interface();
								}
							}
						};
					}
					
					cache.update(self.current_menu, menu);
				}

				if ('undefined' !== typeof self.current_site && self.current_site.length) {
					$('#updraft-central-content button.updraftcentral_action_choose_another_site').show();
				}

				reset_site_selection();

				// Shows "All sites selected" on mass updates
				$('#updraft-central-navigation > div.updraftcentral_site_selected').html(udclion.all_sites_selected);
				$('#updraft-central-content button.updraftcentral_action_choose_another_site').show();
			});


			/**
			 * Registers click event for the top level section buttons
			 *
			 * @see {UpdraftCentral.register_row_clicker}
			 */
			UpdraftCentral.register_row_clicker('.btn-group > button', function($site_row) {

				// We're going to exempt the dropdown menu button from the below process because
				// it is conflicting with the visibilty when a site is either suspended or unsuspended.
				// Besides, clicking the dropdown button does not mean that a content is actually loaded instead
				// is it showing you options to choose from, thus, we're going to bypass it in this case.
				if ($(this).closest('.updraft_site_actions').hasClass('more-option-container')) {
					return;
				}

				self.current_site = $site_row;

				// Update site selected status
				var site_status_container = $('#updraft-central-navigation > div.updraftcentral_site_selected');
				site_status_container.html(udclion.selected_site+': '+self.current_site.data('site_description'));


				// "Sites" tab or area must not be affected by the below process other than
				// storing the currently selected site, since the "Sites" area must allow users
				// to see all their registered sites in UDC, whom they can manage or work on.
				if ('sites' !== self.current_menu) {
					action_item = $(this);

					// We're hiding the search box here, since clicking these top level buttons automatically selects
					// a site to work on. This is restored when user visits the "Sites" menu or clicking the "Choose
					// Another Site To Manage..." button.
					//
					// Before hiding the search bar when a new site has been selected we keep the current search tag/keyword
					// if not empty so that it will persist when the user goes back to the "Sites" area.
					var search_tag = $('.updraftcentral-search-area input#udc_search_tag').val();
					if (search_tag.length) {
						cache.update('search_tag', search_tag);
						$('.updraftcentral-search-area input#udc_search_tag').val('');
					}
					$('.updraftcentral-search-area').hide();


					// Check to see if "data-storeable" property is present in the element and it was set to "false". Thus,
					// requiring the action_item's (buttons) "click" event to be triggered to refresh its contents, otherwise,
					// the stored data or contents will be displayed immediately.
					var storeable = true;
					if ('undefined' !== typeof action_item.data('storeable') && false === action_item.data('storeable')) {
						storeable = false;
					}

					var site_id = self.current_site.data('site_id');
					var menu = cache.item(self.current_menu);


					if ('undefined' !== typeof menu && menu) {
						if ('undefined' === typeof menu.sites[site_id]) {
							menu.sites[site_id] = {};
						}

						menu.sites[site_id].action_item = action_item.get(0);
						menu.sites[site_id].storeable = storeable;

						// Here, we're clearing the no_sites property for this menu, since
						// we're currently storing a site specific content. Otherwise, the no_sites
						// entries will take precedence when rendering the content to the user.
						menu.no_sites = {};

						cache.update(self.current_menu, menu);
					}

					if ('sites' !== self.current_menu) {
						var $parent = $site_row.closest('#updraftcentral_dashboard_existingsites');
						$parent.find('.updraftcentral_site_row:not([data-site_id="'+site_id+'"])').parent().slideUp();
					}
				}

			});
		});

		/**
		 * Housekeeping in preparation for the recording process
		 *
		 * @see {UpdraftCentral_Recorder#onload_housekeeping}
		 */
		onload_housekeeping();
	}
}

/**
 * Keyboard Shortcuts Class
 *
 * Handles and processes keyboard shortcut for UpdraftCentral major functions.
 *
 * @constructor
 */
function UpdraftCentral_Keyboard_Shortcuts() {
	var self = this;
	var $ = jQuery;
	var keys = '';
	var processing = false;
	var site_required_exceptions,
		shortcuts_sorted,
		shortcuts,
		content_loaded,
		popups;

	/**
	 * Initializes local variables, collection, events and keyboard shortcuts
	 *
	 * @private
	 * @param {function} onload_callback An optional callback function to execute when all shortcuts are loaded
	 * @returns {void}
	 */
	this.init = function(onload_callback) {
		shortcuts = new UpdraftCentral_Collection();
		popups = new UpdraftCentral_Collection();
		site_required_exceptions = {};
		shortcuts_sorted = [];
		self.originals = udclion.keyboard_shortcuts;
		content_loaded = null;

		// Load default shortcuts
		load_shortcuts(onload_callback);

		if ('undefined' === typeof onload_callback) {
			$('#updraftcentral_dashboard_existingsites').on('recorder_content_loaded', function(event, menu, content, site) {
				content_loaded = {
					menu: menu,
					content: content,
					site: site
				};
			});

			// Registers all needed events for this module/class to the document object.
			$(document).on('keydown', process_shortcut);
			$('#updraftcentral_dashboard').on('updraftcentral_bootbox_dialog_opened', function(event, id, $dialog) {
				add_shortcut_display_handler($dialog);
			});
			add_shortcut_display_handler($('#updraftcentral_modal_dialog'));


			// Register custom edit listeners, in case the user wishes to edit the default shortcut keys
			// with those keys that is suitable to his environment or preference.
			load_edit_listeners();
		}
	}

	/**
	 * Registers a keyboard shortcut
	 *
	 * @private
	 * @param {Object} info A object containing the shortcut details.
	 * @param {string} info.name A unique identifier for the given shortcut.
	 * @param {string} info.key The keyboard key combination that represents the shortcut (e.g. ALT+K).
	 * @param {string} info.description An information describing what the shortcut is for.
	 * @param {string} info.menu (Optional) The UpdraftCentral menu/module name that is needed if the shortcut action is non-function.
	 * @param {boolean} info.site_required "True" if a site is require to process the action, "False" otherwise.
	 * @param {string|Function} action A mixed parameter either containing the button id or class name or a callback function.
	 * @param {boolean} override "True" to override existing shortcut with the same name or identifier, "False" otherwise.
	 * @returns {void}
	 */
	this.register_shortcut = function(info, action, override) {

		var shortcut_action = action;
		if ('function' === typeof action) {
			shortcut_action = function() {
				// Check and verify that a process is currently not running before
				// executing the below code to prevent from abruptly aborting the current process
				// which may lead to JS errors or/and inconsistency of information displayed to the user
				if (UpdraftCentral.check_processing_state()) return;

				action.apply(null, [info.name, info.menu]);
			}
		}

		var shortcut = {
			name: info.name,
			key: info.key,
			description: info.description,
			action: shortcut_action,
			menu: ('undefined' !== typeof info.menu) ? info.menu : '',
			site_required: ('undefined' !== typeof info.site_required) ? info.site_required : true,
		}

		add_site_required_exceptions(shortcut);

		if (!shortcuts.exists(info.key)) {
			shortcuts.add(info.key, shortcut);
		} else {
			if ('undefined' !== typeof override && override) {
				shortcuts.update(info.key, shortcut);
			}
		}
	}

	/**
	 * Saves user-defined keyboard shortcut entered by the user
	 *
	 * @params {$shortcut_name} The name of the shortcut to be overriden
	 * @params {$shortcut_key} The new shortcut key entered by the user
	 * @returns {object} jQuery promise object
	 */
	this.save_shortcut = function(shortcut_name, shortcut_key) {
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
	 * Clears user-defined keyboard shortcuts
	 *
	 * @param {object} $spinner_where A jquery object that serves as a container for the spinner
	 * @returns {object} jQuery promise object
	 */
	this.clear_shortcuts = function($spinner_where) {
		var deferred = $.Deferred();

		UpdraftCentral.send_ajax('shortcuts', { clear: true }, null, 'via_mothership_encrypting', $spinner_where, function(resp, code, error_code) {
			if ('ok' === code) {
				if (resp.hasOwnProperty('message')) {
					if ('success' === resp.message) {
						deferred.resolve(resp);
					} else {
						deferred.reject();
					}
				}
			}
		});

		return deferred.promise();
	}

	/**
	 * Add a click event handler to the keyboard_shortcuts link contained
	 * inside a dialog container
	 *
	 * @param {object} $dialog A jquery object that represents the current dialog
	 * @returns {void}
	 */
	var add_shortcut_display_handler = function($dialog) {
		if ('undefined' !== typeof $dialog && $dialog) {
			$dialog.on('click', 'a.keyboard_shortcuts', function() {
				var $modal = $(this).closest('.bootbox.modal.show');
				if (!$modal.length) {
					$modal = $(this).closest('#updraftcentral_modal_dialog.show');
				}

				if ($modal.length) {
					$modal.removeClass('fade').scrollTop(0).hide();
				}

				display_available_shortcuts(null, $modal);
			});
		}
	}

	/**
	 * Adds the keyboard shortcut that does not require a site to
	 * process its action
	 *
	 * We used this exceptions to determine the correct container to
	 * search for the trigger (e.g. button) of the action.
	 *
	 * @private
	 * @param {Object} shortcut Keyboard shortcut object containing the shortcut details.
	 * @param {string} shortcut.name A unique identifier for the given shortcut.
	 * @param {string} shortcut.key The keyboard key combination that represents the shortcut (e.g. ALT+K).
	 * @param {string} shortcut.description An information describing what the shortcut is for.
	 * @param {string|Function} shortcut.action A mixed parameter either containing the button id or class name or a callback function.
	 * @param {string} shortcut.menu (Optional) The UpdraftCentral menu/module name that is needed if the shortcut action is non-function.
	 * @param {boolean} shortcut.site_required "True" if a site is require to process the action, "False" otherwise.
	 * @returns {void}
	 */
	var add_site_required_exceptions = function(shortcut) {
		// Actions that does not require a site to execute must
		// be registered under the exceptions object
		if ('undefined' !== typeof shortcut.site_required && !shortcut.site_required) {
			site_required_exceptions[shortcut.name] = !shortcut.site_required;
		}
	}

	/**
	 * Sorts shortcuts collection to maintain index/position upon display
	 * even when removing or adding object's property on the fly.
	 *
	 * @returns {void}
	 */
	var manage_indexes = function() {
		shortcuts_sorted = shortcuts.get_items().sort(function(a,b) {
		  if (a.name < b.name) return -1;
		  if (a.name > b.name) return 1;
		  return 0;
		});
	}

	/**
	 * Loads all available keyboard shortcuts from the keyboard-mappings file
	 *
	 * @private
	 * @param {function} onload_callback An optional callback function to execute when all shortcuts are loaded
	 * @returns {void}
	 */
	var load_shortcuts = function(onload_callback) {

		UpdraftCentral.load_shortcuts().then(function(response) {

			// Register premium shortcuts when necessary
			maybe_register_premium_shortcuts();

			// Load locally registered shortcuts
			load_local_shortcuts();


			var shortcut_storage = response;
			if ('undefined' !== typeof udclion && 'undefined' !== typeof udclion.keyboard_shortcuts) {
				for (var name in udclion.keyboard_shortcuts) {
					var shortcut = JSON.parse(JSON.stringify(udclion.keyboard_shortcuts[name]));
					var key = shortcut.key;
					var bypass = false;

					if (shortcut.menu.length && !$('div.updraft-menu-item-'+shortcut.menu).is(':visible')) {
						bypass = true;
					}

					if (!bypass) {
						// Here, we will automatically replace windows specific modifier key description/name with
						// Mac key names when we're viewing UpdraftCentral on Mac OS's browsers, to make it consistent with the
						// check done on UpdraftCentral_Keyboard_Shortcuts#process_shortcut.
						if (-1 !== window.navigator.userAgent.indexOf('Mac') && -1 !== window.navigator.appVersion.indexOf('Mac')) {
							key = key.replace('CTRL', 'CONTROL').replace('ALT', 'OPTION');
						}

						shortcut.name = name;
						shortcuts.add(key, shortcut);

						if ('undefined' !== typeof shortcut.popup && shortcut.popup) {
							popups.add(key, true);
						}

						add_site_required_exceptions(shortcut);
					}
				}
			}

			// Override default/system shortcuts with user-defined shortcuts
			var items = shortcuts.get_items();
			for (var i=0; i<items.length; i++) {
				var shortcut = items[i];
				
				if ('undefined' !== typeof shortcut_storage[shortcut.name]) {
					var current_key = shortcut.key;
					var local_key = shortcut_storage[shortcut.name];

					// Override the existing key, if user previously edited the default shortcut
					if (local_key.length) {
						shortcut.key = local_key;

						shortcuts.add(shortcut.key, shortcut);
						shortcuts.remove(current_key);
					}
				}
			}

			manage_indexes();

		}).always(function() {
			if ('function' === typeof onload_callback) {
				onload_callback.apply(null, []);
			}
		});

	}

	/**
	 * Processes the keyboard shortcut triggered by the user
	 *
	 * Currently, we only support CTRL/CONTROL, ALT/OPTION and SHIFT keys in combination letters.
	 *
	 * @private
	 * @param {Object} e The keyboard event object
	 * @returns {void}
	 */
	var process_shortcut = function(e) {

		// We're not processing any shortcuts if one of the dialogs are currently visible.
		if (UpdraftCentral_Library.is_dialog_opened()) {
			return;
		}

		var event = e ? e : window.event;
		var keyCode = e ? e.which : event.keyCode;
		var character = String.fromCharCode(keyCode),
			combination = '',
			modifier_keys = '';

		// Check if user is currently typing. If so, we disable processing of keyboard shortcuts temporarily
		// until the user is done typing (meaning, no input focus is given to an "input" or "textarea" element).
		// This prevents keyboard "letter" shortcuts (e.g. "U", "B", "L", etc.) as requested by David A from interfering with the user
		// typing something.
		var has_focus_on_content = $('div#updraft-central-content').find('input, textarea').is(':focus');
		var has_focus_on_dialog = $('div#updraftcentral_modal_dialog').find('input, textarea').is(':focus');
		var has_focus_on_bootbox_dialog = $('div.bootbox.modal').find('input, textarea').is(':focus');

		if (has_focus_on_content || has_focus_on_dialog || has_focus_on_bootbox_dialog) {
			return;
		}

		// Check whether we need Mac OS keys to map and process. By default,
		// these are windows description.
		var ctrl_key = 'CTRL',
			alt_key = 'ALT',
			shift_key = 'SHIFT';

		// The ctrlKey, altKey and shiftKey event properties above should be sufficient enough to capture Mac OS modifier keys as well
		// but in case a developer wishes to use native Mac OS description for these keys we substitute them with their appropriate
		// names or descriptions.
		if (-1 !== window.navigator.userAgent.indexOf('Mac') && -1 !== window.navigator.appVersion.indexOf('Mac')) {
			ctrl_key = 'CONTROL';
			alt_key = 'OPTION';
		}

		// Construct and combine the inputted keys that will be used to run againts
		// our registered keyboard shortcuts collection.
		//
		// If for some reason, the ctrlKey, altKey and shiftKey event properties check failed to capture the event
		// on Mac OS, we run the check against the keyCode instead, since Mac browsers adheres to raising keydown
		// event everytime a key is pressed, thus, we can safely check and validate the code for these (control, option and shift) keys.
		if (17 === keyCode) modifier_keys += ctrl_key;
		if (18 === keyCode) modifier_keys += (modifier_keys.length) ? '+' + alt_key : alt_key;
		if (16 === keyCode) modifier_keys += (modifier_keys.length) ? '+' + shift_key : shift_key;

		// Append current key pressed to keys variable
		if (modifier_keys.length) {
			keys += (keys.length) ? '+' + modifier_keys : modifier_keys;
		} else if (character.length) {
			keys += (keys.length) ? '+' + character : character;
		}

		var combination = keys.split('+');
		if (1 === combination.length && -1 !== $.inArray(combination[0], [ctrl_key, alt_key, shift_key])) {
			return;
		}

		if (keys.length) {
			var lowerKeys = keys.toLowerCase();
			var upperKeys = keys.toUpperCase();

			if (-1 !== lowerKeys.indexOf('+')) {
				var key = lowerKeys.split('+');
				lowerKeys = key[0].toUpperCase()+'+'+key[1];
			}

			// If the key combination exists in our keyboard shortcut collection then
			// we process or trigger the associated action.
			if ((shortcuts.exists(lowerKeys) || shortcuts.exists(upperKeys)) && !processing) {
				var shortcut = (shortcuts.exists(lowerKeys)) ? shortcuts.item(lowerKeys) : shortcuts.item(upperKeys);
				processing = true;

				if ('function' === typeof shortcut.action) {
					// If the action is of type "function" then trigger the callback function
					// associated with the keyboard shortcut.
					shortcut.action.apply(null, [shortcut.name, shortcut.menu]);

				} else if ('string' === typeof shortcut.action && shortcut.action.length) {
					var $container = UpdraftCentral.$site_row;

					if ('undefined' !== typeof site_required_exceptions[shortcut.name] && site_required_exceptions[shortcut.name]) {
						$container = $('div#updraft-central-content');
					} else {
						// If the user haven't selected a site yet then we processes the first available site
						// from the sites collection that the user have.
						if ('undefined' === typeof $container || !$container) {
							var $parent = $('div#updraftcentral_dashboard_existingsites > div.ui-sortable-handle');
							var $site_row = $parent.find('.updraftcentral_site_row:not(.suspended)').first();

							if ($site_row.length) {
								UpdraftCentral.$site_row = $site_row;
								$container = $site_row;
							}
						}
					}

					// We make sure that we have a valid container before processing the action.
					if ('undefined' !== typeof $container && $container && $container.length) {

						// Check whether we only have menu but with an empty action which
						// means that the user will only be taken to the section/tab without
						// initiating or triggering any action buttons.
						if (shortcut.menu.length && !shortcut.action.length) {
							$('div.updraft-menu-item-'+shortcut.menu).trigger('click');
							return;
						}

						// Process or trigger the button with the given DOM id or class name that is
						// associated with the keyboard shortcut.
						var button = $container.find('#'+shortcut.action),
							use_id = ('undefined' !== typeof button && button.length) ? true : false,
							use_selector;

						if (!use_id) {
							// If id is not valid then use class name instead.
							button = $container.find('.'+shortcut.action);
							use_selector = ('undefined' !== typeof button && button.length) ? true : false;

							if (!use_selector) {
								// If class name is not valid then use selector instead.
								button = $container.find(shortcut.action);
							}
						}

						// Check if previously recorded content are already loaded, if so
						// skip triggering the button's click event.
						var extra_contents = $container.find('.updraftcentral_row_extracontents');

						if ('undefined' !== typeof button && button && button.length) {
							// If no menu is found, we default to "Sites" section. Usually, this applies to site configuration
							// since it runs across all sections/tabs. But the developer should actually know this beforehand when
							// he or she used the add_filter function when adding shortcuts.
							if (!shortcut.menu || !shortcut.menu.length) {
								shortcut.menu = 'sites';
							}

							var active_menu = $('div.updraft-menu-item-links-active').prop('id').replace('updraft-menu-item-', '');
							if (shortcut.menu === active_menu) {

								// Skip button's click event if recorded content from recorder
								// was already loaded.
								if (content_loaded && 'undefined' !== typeof content_loaded.menu && shortcut.menu === content_loaded.menu) {
									if (content_loaded.site && content_loaded.site.action_item) {
										var action_button = $(content_loaded.site.action_item);

										if (button.prop('class') === action_button.prop('class') && !popups.exists(shortcut.key) && extra_contents.find('div').html()) {
											processing = false;
											content_loaded = null;
											return;
										}
									}
								}

								if (popups.exists(shortcut.key)) extra_contents.html('');
								button.trigger('click');
							} else {
								/**
								 * Sets listener for the "updraftcentral_dashboard_mode_set_after"
								 *
								 * Listening to this event will give us a way to safely trigger the click event
								 * of the action item/button after it has been loaded.
								 *
								 * @see {@link http://api.jquery.com/on}
								 */
								$('#updraftcentral_dashboard_existingsites').on('updraftcentral_dashboard_mode_set_after', function(event, data) {
									// Doing the check once again (from above) to ensure that we have a valid button before
									// calling the trigger method since this is using a listener which will be triggered
									// everytime a menu has changed so we need to make sure that we only take action within
									// the context of this process.
									if ('undefined' !== typeof button && button && button.length) {
										$('#updraftcentral_dashboard_existingsites').off('updraftcentral_dashboard_mode_set_after');

										// Skip button's click event if recorded content from recorder
										// was already loaded.
										if (content_loaded && 'undefined' !== typeof content_loaded.menu && shortcut.menu === content_loaded.menu) {
											if (content_loaded.site && content_loaded.site.action_item) {
												var action_button = $(content_loaded.site.action_item);

												if (button.prop('class') === action_button.prop('class') && !popups.exists(shortcut.key) && extra_contents.find('div').html()) {
													processing = false;
													content_loaded = null;
													return;
												}
											}
										}

										if (popups.exists(shortcut.key)) extra_contents.html('');
										button.trigger('click');
									}
								});

								// Activate the menu associated with the shortcut, so that we will have
								// access to the button that we need to trigger. Basically, automating the
								// clicking of the menu located at the side bar.
								$('div.updraft-menu-item-'+shortcut.menu).trigger('click');
							}

						}
					}

				} else {
					// Same as "upgrade" section - no action but with menu
					if (shortcut.menu.length) {
						// Activate the menu associated with the shortcut to display the content.
						// Basically, automating the clicking of the menu located at the side bar.
						$('div.updraft-menu-item-'+shortcut.menu).trigger('click');
					}
				}

				processing = false;
			}

			// Cleared keys for new key combination
			keys = '';
		}
	}

	/**
	 * Displays all registered keyboard shortcuts and their information
	 *
	 * @private
	 * @param {object|null} $container The section where the data is to be refresh or re-loaded
	 * @param {object} modal The source popup window where the shortcut dialog was triggered
	 * @returns {void}
	 */
	var display_available_shortcuts = function($container, modal) {
		var list = '<ul class="uc_shortcuts">';
		var items = shortcuts_sorted;

		// Constructs a list of all available keyboard shortcuts
		for (var i=0; i<items.length; i++) {
			var shortcut = items[i];
			var key = shortcut.key;

			// Here, we will automatically replace windows specific modifier key description/name with
			// Mac key names when we're viewing UpdraftCentral on Mac OS's browsers, to make it consistent with the
			// check done on UpdraftCentral_Keyboard_Shortcuts#process_shortcut.
			if (-1 !== window.navigator.userAgent.indexOf('Mac') && -1 !== window.navigator.appVersion.indexOf('Mac')) {
				key = key.replace('CTRL', 'CONTROL').replace('ALT', 'OPTION');
			}

			list += '<li data-name="'+shortcut.name+'">'+shortcut.description+' <span>('+udclion.shortcut_key+': <span class="uc_current_shortcut">'+key+'</span>)</span> <span class="uc_change_shortcut">'+udclion.keyboard_change_shortcut+'</span> <div class="uc_shortcut_elements"></div></li>';
		}
		list += '</ul>';

		if ('undefined' !== typeof $container && $container && $container.length) {
			$container.replaceWith(list);
		} else {

			// Set unique identifier for validation
			var dialog_id = 'shortcut_dialog_id';
			var position = null;
			var backdrop;

			if ('undefined' !== typeof modal && modal) {
				position = modal.find('div.modal-dialog').offset();
				backdrop = false;
			}

			// Set alert dialog listener
			$('#updraftcentral_dashboard').on('updraftcentral_bootbox_dialog_opened', function(event, id, $dialog) {
				// We're making sure that we're only processing this for the keyboard
				// shortcuts display by validating its ID.
				if (id === dialog_id && position) {
					$dialog.find('div.modal-dialog').css({
						top: position.top
					});

					$dialog.scrollTop(0);
				}
				$dialog.removeClass('fade');
			});

			$('#updraftcentral_dashboard').on('updraftcentral_bootbox_dialog_closed', function(event, id, $dialog) {
				// We're making sure that we're only processing this for the keyboard
				// shortcuts display by validating its ID.
				if (id === dialog_id) {
					// Fix modal window clipped off when re-displayed after an internal window
					// is triggered inside the current modal window.
					if (!$('body').hasClass('modal-open')) {
						$('body').addClass('modal-open');
					}
				}
			});

			// Display keyboard shortcuts dialog
			UpdraftCentral_Library.dialog.alert('<h2>'+udclion.keyboard_shortcuts_heading+' <a class="uc_clear_local_shortcuts">('+udclion.reset_shortcuts+')</a></h2><p>'+udclion.keyboard_shortcuts_message+'</p><div class="uc_shortcuts_spacer"><div class="uc_shortcuts_spinner"></div></div><p>'+list+'</p>', function() {
				if ('undefined' !== typeof modal && modal) {
					modal.removeClass('fade').show().scrollTop();
				}
			}, false, dialog_id, backdrop);

		}
	}

	/**
	 * Loads or registers keyboard shortcut edit listeners
	 *
	 * @returns {void}
	 */
	var load_edit_listeners = function() {
		UpdraftCentral.register_event_handler('click', '.modal-dialog span.uc_change_shortcut', function() {
			var $container = $(this).closest('li').find('div.uc_shortcut_elements');
			var modifiers = ['CTRL', 'ALT', 'SHIFT'];

			var modifier_options = '';
			for (var i=0; i<modifiers.length; i++) {
				modifier_options += '<option value="'+modifiers[i]+'">'+modifiers[i]+'</option>';
			}

			var modifier_options = '<select><option value="">'+udclion.keyboard_choose_modifiers+'</option>'+modifier_options+'</select> ';
			// Disable modifier keys selection on Mac
			if (-1 !== window.navigator.userAgent.indexOf('Mac') && -1 !== window.navigator.appVersion.indexOf('Mac')) {
				modifier_options = '';
			}

			$container.html(modifier_options+'<input type="text" maxlength="1" value="" /> <button class="btn btn-primary uc_save_shortcut">'+udclion.keyboard_save_shortcut+'</button> <button class="btn btn-primary uc_cancel_shortcut">'+udclion.keyboard_cancel_shortcut+'</button> <span class="uc_new_shortcut"></span>');
			$(this).hide();
		});

		UpdraftCentral.register_event_handler('click', '.modal-dialog button.uc_save_shortcut', function() {
			var $container = $(this).closest('li').find('div.uc_shortcut_elements');

			// Save options
			var modifier = $container.find('select').val();
			var character = $container.find('input[type="text"]').val();
			var name = $container.parent().data('name');

			if (!character || !character.length || !character.match(/^[a-zA-Z]$/g)) {
				UpdraftCentral_Library.dialog.alert('<h2>'+udclion.keyboard_shortcut_required_heading+'</h2><p>'+udclion.keyboard_shortcut_required+'</p>');
				return;
			}

			var connector = '+';
			if ('undefined' === typeof modifier || !modifier.length) {
				connector = '';
				modifier = '';
			}

			var new_shortcut = modifier+connector+character;
			if (new_shortcut.length) {

				// Check whether some shortcut already has the same shortcut
				var exist = false;
				$container.closest('ul.uc_shortcuts').find('li[name!="'+name+'"] span.uc_current_shortcut').each(function() {
					var key = $(this).html();
					if (new_shortcut.toUpperCase() === key.toUpperCase()) {
						exist = true;
						UpdraftCentral_Library.dialog.alert('<h2>'+udclion.keyboard_shortcut_exist_heading+'</h2><p>'+udclion.keyboard_shortcut_exist+'</p>');
						return false;
					}
				});

				if (!exist) {
					var current_shortcut_container = $container.parent().find('span.uc_current_shortcut');
					var current_key = current_shortcut_container.html();

					if (shortcuts.exists(current_key)) {
						var shortcut = shortcuts.item(current_key);
						shortcut.key = new_shortcut;

						self.save_shortcut(name, shortcut.key).then(function(response) {
							shortcuts.add(shortcut.key, shortcut);
							shortcuts.remove(current_key);

							current_shortcut_container.html(shortcut.key);

							// Update popups collection with the new key:
							if (popups.exists(current_key)) {
								popups.remove(current_key);
								popups.add(new_shortcut, true);
							}
						}).always(function() {
							$('.modal-dialog span.uc_change_shortcut').show();
							$container.html('');
						});
					}
				}

			}
		});

		UpdraftCentral.register_event_handler('click', '.modal-dialog button.uc_cancel_shortcut', function() {
			var $container = $(this).closest('li').find('div.uc_shortcut_elements');
			$('.modal-dialog span.uc_change_shortcut').show();
			$container.html('');
		});

		UpdraftCentral.register_event_handler('change', '.modal-dialog div.uc_shortcut_elements select', function(event) {
			$('.modal-dialog').trigger('keyboard_shortcut_changed', [this]);
		});

		UpdraftCentral.register_event_handler('keyup', '.modal-dialog div.uc_shortcut_elements input', function(event) {
			var $container = $(this).closest('li').find('div.uc_shortcut_elements');
			var character = $container.find('input[type="text"]').val();
			
			if (character.match(/^[a-zA-Z]$/g)) {
				$container.find('button.uc_save_shortcut').prop('disabled', false);
			} else {
				$container.find('button.uc_save_shortcut').prop('disabled', true);
			}
		
			$('.modal-dialog').trigger('keyboard_shortcut_changed', [this]);
		});

		UpdraftCentral.register_event_handler('keyboard_shortcut_changed', '.modal-dialog', function(event, element) {
			var $container = $(element).closest('li').find('div.uc_shortcut_elements');
			var $tip = $container.find('span.uc_new_shortcut');

			// Save options
			var modifier = $container.find('select').val();
			var character = $container.find('input[type="text"]').val();
			
			var connector = '+';
			if ('undefined' === typeof modifier || !modifier.length) {
				connector = '';
				modifier = '';
			}
			if (!character || !character.length) connector = '';

			var new_shortcut = modifier+connector+character;
			if (character && character.length) {
				if (character.match(/^[a-zA-Z]$/g)) {
					$tip.html('<div class="uc_tip_wrapper">'+udclion.keyboard_new_shortcut+': '+new_shortcut+'</div>');
				} else {
					$tip.html('<div class="uc_tip_wrapper">'+udclion.keyboard_invalid_key+'</div>');
				}
			} else {
				$tip.html('');
				$container.find('button.uc_save_shortcut').prop('disabled', false);
			}
		});

		UpdraftCentral.register_event_handler('click', 'a.uc_clear_local_shortcuts', function() {
			var $container = $('.bootbox.modal ul.uc_shortcuts');
			var $spinner_where = $('.bootbox.modal div.uc_shortcuts_spinner');

			self.clear_shortcuts($spinner_where).then(function(response) {
				self.init(function() {
					display_available_shortcuts($container);
				});
			});
		});
	}

	/**
	 * Registers UpdraftCentral premium feature's shortcuts if not available
	 *
	 * N.B. Usually, the registration of these shortcuts are done from the premium module's code
	 * itself by calling the add_filter('updraftcentral_keyboard_shortcuts', ...) inside their
	 * respective loader.php (please see updraftcentral/modules/updates/loader.php for sample)
	 *
	 * @returns {void}
	 */
	var maybe_register_premium_shortcuts = function() {

		var features = [
			{
				name: 'show_comments',
				key: 'C',
				description: udclion.show_comments,
				menu: 'comments',
				action: 'updraftcentral_site_comments_manage'
			},
			{
				name: 'show_users',
				key: 'U',
				description: udclion.show_users,
				menu: 'users',
				action: 'updraftcentral_site_users_manage'
			},
			{
				name: 'show_analytics',
				key: 'A',
				description: udclion.show_analytics,
				menu: 'analytics',
				action: 'updraftcentral_site_analytics_show'
			}
		];

		for (var i=0; i<features.length; i++) {
			var shortcut = features[i];
			if ('undefined' === typeof udclion.keyboard_shortcuts[shortcut.name]) {
				var info = {
					name: shortcut.name,
					key: shortcut.key,
					description: shortcut.description,
					menu: shortcut.menu
				}
				self.register_shortcut(info, shortcut.action, true);
			}
		}
	}

	/**
	 * Loads locally registered shortcuts
	 *
	 * N.B. Shortcuts mostly registered for the help list and any local overrides
	 * that needs custom or extra process other than just openning the sections/tabs.
	 *
	 * @returns {void}
	 */
	var load_local_shortcuts = function() {
		// Register a shortcut for the "Keyboard Shortcuts" dialog. Menu property is empty since we're passing
		// a callback function as action instead of a common button id or class name.
		var info = {
			name: 'z_keyboard_shortcuts_help',
			key: 'K',
			description: udclion.keyboard_shortcuts_help,
			menu: '',
			site_required: false
		}

		self.register_shortcut(info, function(name) {
			display_available_shortcuts();
		}, true);


		// Before loading or executing the Single Updates shortcut we make sure that the site's container
		// is visible before loading the content.
		var update_info = {
			name: 'site_update',
			key: 'D',
			description: udclion.site_update,
			menu: 'updates'
		}

		self.register_shortcut(update_info, function(name, menu) {
			var $site_row = UpdraftCentral.$site_row;
			if (menu.length) {
				var menu_active = $('div.updraft-menu-item-'+menu+'.updraft-menu-item-links-active');
				if (!menu_active.length) {
					$('div.updraft-menu-item-'+menu).trigger('click');
				}
			}

			if ('undefined' === typeof $site_row || !$site_row) {
				var $parent = $('div#updraftcentral_dashboard_existingsites > div.ui-sortable-handle:first-child');
				var $site_row = $parent.find('.updraftcentral_site_row');
			}

			$mass_updates_container = $site_row.closest('#updraftcentral_dashboard_existingsites').find('#updates_container');
			if ('undefined' !== typeof $mass_updates_container && $mass_updates_container.length) {
				$mass_updates_container.remove();
			}

			var button = $site_row.find('button.updraftcentral_action_show_updates');
			if ('undefined' !== typeof button && button.length) {
				// Clean container first before loading if we're on the "updates" menu since
				// single site and mass updates share the same menu context.
				if ('undefined' !== typeof menu && 'updates' === menu) {
					$site_row.find('.updraftcentral_row_extracontents').html('');
				}

				button.trigger('click');
			}
			
			$site_row.show();
			$site_row.closest('.ui-sortable-handle').show();
		}, true);
	}
}

/**
 * Progress Bar Class
 *
 * A generic progress bar class that uses the jQuery
 * progressbar widget.
 *
 * @constructor
 * @uses {jQuery.ui.progressbar}
 */
function UpdraftCentral_Task_Progress() {
	var self = this;
	var $progress_bar;
	var storage;
	var interval;
	var current_limit;
	var current_bar;
	var $container = $container || '';

	this.total_items;
	this.label;
	
	/**
	 * Renders and displays the progress bar html
	 *
	 * @returns {void}
	 * @uses {jQuery.ui.progressbar}
	 */
	var render = function() {
		if ($container.length == 0) {
			console.log('UpdraftCentral_Task_Progress: Progress bar container not defined - exiting');
			return;
		}

		if (typeof jQuery.ui !== 'undefined' && typeof jQuery.ui.progressbar === 'function') {
			var $progress_container = $container.find('#uc_task_progress');
			
			if ($progress_container.length === 0) {
				$container.append('<div id="uc_task_progress"><div id="uc_task_progress_label">' + udclion.current_progress + ': 0%</div><div id="uc_task_progress_bar"><div id="uc_task_progress_status"></div></div></div>');
			}
			
			$progress_bar = $container.find('#uc_task_progress > div#uc_task_progress_bar');
			if (!$progress_bar.is(':ui-progressbar')) {
				$progress_bar.progressbar({
					max: 100,
					value: 0,
					change: function() {
						$container.find('#uc_task_progress_label').text(udclion.current_progress + ': ' + $progress_bar.progressbar('option', 'value') + '%');
					},
					complete: function() {
						clearInterval(interval);
					}
				});
			} else {
				// Calculates the current progress percentage and updates
				// The progress bar value with the result of the computation.
				var total = parseInt(self.total_items);
				var remainder = 100 % total;
				var new_value = (storage.count() * parseInt(100 / total)) + remainder;
				
				// Letting the caller control the completion of the progress bar
				// By calling the set_complete functon when everything is already successful.
				if (new_value < 100) {
					current_bar = new_value;
					$progress_bar.progressbar('option', 'value', new_value);
				}
			}
		} else {
			console.log('UpdraftCentral_Task_Progress: jQuery progressbar or one of its dependency is not installed - exiting');
			return;
		}
	}
	
	/**
	 * Initializes local variables
	 *
	 * Checks whether we have a valid container where to display
	 * the progress bar widget. Otherwise, it will throw an error.
	 *
	 * @returns {void}
	 */
	var init = function() {
		if (typeof $container === 'undefined') {
			console.log('UpdraftCentral_Task_Progress: A container element is required. This is where the progress bar is to be appended - exiting');
			return;
		}
		self.total_items = 0;
		storage = new UpdraftCentral_Collection();
		current_limit = 0;
		current_bar = 0;
	}
	init();


	/**
	 * Displays a gradual movement of the progress bar within the bounds
	 * of the currently processed item.
	 *
	 * @returns {void}
	 */
	var dummy_progress = function() {
		var $progress_container = $container.find('#uc_task_progress');
		if ($progress_container.length == 0) return;

		// Mimics a progressive bar movement through a computation
		// based on the currently processed item's position (limit) with respect
		// to the number of items tied to the progress bar.
		var total = parseInt(self.total_items);
		var remainder = 100 % total;
		
		current_limit = (storage.count() * parseInt(100 / total)) + remainder;
		interval = setInterval(function() {
			if (current_bar < current_limit) {
				// The continous movement may sometimes get pass through 100. Thus,
				// we're forcing it to stop when it reached 100 in order to be consistent
				// with the end goal of setting the completion manually by the user.
				if (current_bar < 99) {
					$progress_bar.progressbar('option', 'value', ++current_bar);
				} else {
					clearInterval(interval);
				}
			} else {
				clearInterval(interval);
			}
		}, 1000);

	}

	/**
	 * Sets a custom message displayed as a progress bar status
	 *
	 * @param {string} message - Text to display on the progress bar
	 * @returns {void}
	 */
	this.set_custom_status = function(message) {
		var status = $container.find('#uc_task_progress_status');
		if (status.length == 0) return;

		if ('undefined' !== typeof message && message) {
			status.text(message);
		}
	}

	/**
	 * Setting the progressbar completion manually
	 *
	 * @param {string} message - An optional message to display on the progress bar.
	 *							 If not empty, will be used to indicate that the process
	 *							 has already been completed.
	 * @returns {void}
	 */
	this.set_complete = function(message) {
		var status = $container.find('#uc_task_progress_status');
		if (status.length == 0) return;

		current_bar = 100;
		$progress_bar.progressbar('option', 'value', current_bar);

		if (typeof message !== 'undefined') {
			status.text(message);
		} else {
			status.text(udclion.process_completed);
		}
	}
	
	/**
	 * Updates the progress bar data by recomputing the current progress
	 *
	 * @returns {void}
	 */
	this.update = function() {
		if (storage.count()) {
			render();
		}
	}
	
	/**
	 * Set the label of the currently processed item
	 *
	 * @param {string} label - A string that will be displayed for the currently process item.
	 * @param {boolean} use_custom - An optional argument. If true, will used the submitted label
	 *								 as the message to display instead of using the default.
	 * @returns {void}
	 */
	this.set_current_label = function(label, use_custom) {
		var status = $container.find('#uc_task_progress_status');
		if (status.length == 0) return;

		if (storage.add(label, label)) {
			self.label = label;
			if (typeof use_custom !== 'undefined' && use_custom) {
				status.text(label);
			} else {
				status.text(udclion.processing + ' "' + self.label + '" ...');
			}
		}
	}

	/**
	 * Sets the container where the progress bar should be appended
	 *
	 * @param {object} $new_container - A jQuery object/element that will hold the
	 *									rendered progress bar.
	 * @returns {void}
	 */
	this.set_container = function($new_container) {
		// Making sure no unwanted process is currently running unless
		// Specified or called explicity.
		if (typeof interval !== 'undefined') {
			clearInterval(interval);
		}
		
		$container = $new_container;
		render();
	}

	/**
	 * Starts the dummy progress routine.
	 *
	 * @uses {UpdraftCentral_Task_Progress#render}
	 * @uses {UpdraftCentral_Task_Progress#dummy_progress}
	 * @returns {void}
	 */
	this.start = function() {
		dummy_progress();
	}

	/**
	 * Cleanup previous process resources
	 *
	 * @uses {UpdraftCentral_Task_Progress.reset}
	 * @returns {void}
	 */
	this.end = function() {
		self.reset();
	}

	/**
	 * Updates the status message on error
	 *
	 * @param {string} message - An optional message to display as opposed to the default message.
	 */
	this.abort = function(message) {
		var status = $container.find('#uc_task_progress_status');
		if (status.length == 0) return;

		clearInterval(interval);
		if (typeof message !== 'undefined') {
			status.text(message);
		} else {
			status.text(udclion.process_aborted);
		}
	}
	
	/**
	 * Resets the progress bar to its initial state
	 *
	 * @returns {void}
	 */
	this.reset = function() {
		var $progress_container = $container.find('#uc_task_progress');
		if ($progress_container.length == 0) return;

		clearInterval(interval);
		total_items = 0;
		storage.clear();
		current_limit = 0;
		current_bar = 0;
		$progress_container.remove();
	}

	/**
	 * Clears the progress bar states to give way for a new process
	 *
	 * @returns {void}
	 */
	this.clear = function() {
		clearInterval(interval);
		total_items = 0;
		storage.clear();
		current_limit = 0;
		current_bar = 0;
	}

	/**
	 * Hides the progress bar widget
	 *
	 * @returns {void}
	 */
	this.hide = function() {
		var $progress_container = $container.find('#uc_task_progress');
		if ($progress_container.length == 0) return;
			
		$progress_container.hide();
	}

	/**
	 * Shows the progress bar widget
	 *
	 * @returns {void}
	 */
	this.show = function() {
		var $progress_container = $container.find('#uc_task_progress');
		if ($progress_container.length == 0) return;
			
		$progress_container.show();
	}
}

/**
 * Generic Collection Class
 *
 * Serves as a generic storage for all kinds of uses.
 *
 * @constructor
 */
function UpdraftCentral_Collection() {
	var self = this;
	var count = 0;
	var collection = {};
	
	/**
	 * Adds an item with a specified key to the collection
	 *
	 * @param {string} key - A unique identifier for the item.
	 * @param {object|array|string|number|boolean} item - Can be of any type.
	 * @returns {boolean}
	 */
	this.add = function(key, item) {
		if (!self.exists(key)) {
			collection[key] = item;
			count++;
			return true;
		}
		return false;
	}
	
	/**
	 * Updates a collection item with a specified key
	 *
	 * @param {string} key - A unique identifier for the item.
	 * @param {object|array|string|number|boolean} item - The updated item. Can be of any type.
	 * @returns {boolean}
	 */
	this.update = function(key, item) {
		if (self.exists(key)) {
			collection[key] = item;
			return true;
		}
		return false;
	}
	
	/**
	 * Removes an item with a specified key from the collection
	 *
	 * @param {string} key - The identifier of the item to be removed.
	 * @returns {boolean}
	 */
	this.remove = function(key) {
		if (self.exists(key)) {
			delete collection[key];
			count--;
			return true;
		}
		return false;
	}
	
	/**
	 * Retrieves an item with a specified key from the collection
	 *
	 * @param {string} key - The identifier of the item to be retrieved.
	 * @returns {object|array|string|number|boolean}
	 */
	this.item = function(key) {
		return collection[key];
	}
	
	/**
	 * Returns all available keys from the collection
	 *
	 * @returns {array}
	 */
	this.keys = function() {
		var keys = [];
		for (var k in collection) keys.push(k);
		
		return keys;
	}
	
	/**
	 * Checks whether an item with a specified key exists in the collection
	 *
	 * @param {string} key - The identifier of the item to be checked.
	 * @returns {boolean}
	 */
	this.exists = function(key) {
		return ('undefined' !== typeof collection[key]);
	}
	
	/**
	 * Empty or resets the collection
	 *
	 * @returns {void}
	 */
	this.clear = function() {
		count = 0;
		collection = {};
	}
	
	/**
	 * Returns the number of items found in the collection
	 *
	 * @returns {number}
	 */
	this.count = function() {
		return count;
	}
	
	/**
	 * Returns all items in the collection
	 *
	 * @returns {array}
	 */
	this.get_items = function() {
		var items = [];
		for (var k in collection) items.push(collection[k]);
		
		return items;
	}
}

/**
 * A Tasks Runner Function
 *
 * Runs and execute queued tasks using the d3queue library. This class
 * was created in preparation for the mass updates feature of all sites
 * under the UpdraftCentral plugin.
 *
 * @constructor
 * @see {UpdraftCentral_Collection}
 * @see {d3queue}
 * @param {object} options - Task runner's options
 * @param {number} options.concurrency - Number of concurrency needed to run the process
 */
function UpdraftCentral_Tasks_Runner(options) {
	var self = this;
	var options = options || {};
	var storage;
	this.progress;

	/**
	 * Initialize and/or checks required process variables
	 *
	 * @private
	 * @returns {void}
	 * @uses {UpdraftCentral_Collection}
	 * @uses {UpdraftCentral_Task_Progress}
	 * @uses {d3queue}
	 */
	var init = function() {
		storage = new UpdraftCentral_Collection();
		self.progress = new UpdraftCentral_Task_Progress();
	}
	init();
	
	/**
	 * Runs a specified task
	 *
	 * @private
	 * @param {object} task - An object containing the callback function to be executed and its arguments.
	 * @param {function} task.func - A deferred function that returns a jQuery promise object that
	 * @param {array} task.args - An array containing the arguments of the deferred function.
	 * @param {function} callback - A callback function that will be executed after the task is run.
	 *								A pre-requisite of the d3queue library.
	 */
	var run_task = function(task, callback) {
		task.func.apply(null, task.args).then(function(result) {
			callback(null, result);
		}).fail(function(result) {
			var error = result;
			if (typeof error === 'undefined') error = true;

			callback(error);
		});
	}
	
	/**
	 * Returns the total count of the tasks currently
	 * being queued for process
	 *
	 * @returns {number} - The total count of the queued items/tasks
	 */
	this.tasks_count = function() {
		return storage.count();
	}

	/**
	 * Removes the specified task from the collection of queued tasks
	 *
	 * @param {string} task_key - The generated key produced when the task was
	 *							  successfully added.
	 * @returns {boolean} - "True" if task was successfully removed, "False" otherwise.
	 */
	this.remove_task = function(task_key) {
		return storage.remove(task_key);
	}
	
	/**
	 * Adds task to execute
	 *
	 * @uses {UpdraftCentral_Library.md5}
	 * @param {function} callback - A function or process that will be executed when the task is run.
	 * @param {array} args - The arguments or parameters to the callback function.
	 * @returns {boolean|string} - The associated key if the task was successfully added, "False" otherwise.
	 */
	this.add_task = function(callback, args) {
		var options = options || {};
		
		if (typeof callback === 'function') {
			var timestamp = new Date().getTime();
			var rand = Math.ceil(Math.random()*1000);
			var key = UpdraftCentral_Library.md5('_key_' + timestamp + rand);
			
			var task = {
				func: callback,
				args: args
			}
			
			// Add reference to the class instance that will
			// Serve as a context when using the progress bar.
			// This will be appended as the last argument to the
			// Submitted callback above.
			task.args.push(self);
			
			if (storage.add(key, task)) {
				return key;
			}
		}
		return false;
	}
	
	/**
	 * Clears all previously saved tasks
	 *
	 * @returns {void}
	 */
	this.clear_tasks = function() {
		self.progress.clear();
		storage.clear();
	}
	
	/**
	 * Aborts all active tasks
	 *
	 * @returns {void}
	 */
	this.abort = function() {
		queue.abort();
		self.clear_tasks();
	}
	
	/**
	 * Process all tasks in queue
	 *
	 * @returns {object} - A jQuery promise
	 * @uses {jQuery.Deferred}
	 * @uses {d3queue}
	 */
	this.process_tasks = function() {
		var deferred = jQuery.Deferred();
		
		if (storage.count() > 0) {
			self.progress.total_items = storage.count();

			var queue;
			if (typeof options.concurrency !== 'undefined') {
				queue = d3.queue(options.concurrency);
			} else {
				queue = d3.queue();
			}

			var keys = storage.keys();
			for (var i=0; i<keys.length; i++) {
				var task = storage.item(keys[i]);
				queue.defer(run_task, task);
			}
			
			// Executes when all tasks has been completed or aborted due to error
			// Or clicking the abort button itself
			queue.awaitAll(function(error, data) {
				if (error) {
					deferred.reject(error);
				} else {
					// Returns an array of results
					deferred.resolve(data);
				}
			});
		} else {
			deferred.reject(udclion.tasks_queue_empty);
		}
		
		return deferred.promise();
	}
	
}

/**
 * Abstraction Layer/Class for Site Credentials
 *
 * @constructor
 * @see {UpdraftCentral_Collection}
 * @see {UpdraftCentral_Queueable_Modal}
 */
function UpdraftCentral_Credentials() {
	var self = this;
	var storage;
	var $modal;
	var close_event;
	
	/**
	 * Initializes and/or checks variables or parameters
	 *
	 * @private
	 * @returns {void}
	 */
	var init = function() {
		storage = new UpdraftCentral_Collection();
		$modal = jQuery('#updraftcentral_modal_dialog');
		close_event = 'hidden.bs.modal';
	}
	init();
	
	/**
	 * Gets the credentials of the given site
	 *
	 * It automatically opens the credential's form when there's no sufficient permission to edit
	 * or upgrade one or more plugins, themes or the WP core.
	 *
	 * @param {object} site - A UpdraftCentral_Site object containing all possible information relating to the Site.
	 * @returns {string} - A serialized string representing the site's credentials in encoded format.
	 * @borrows UpdraftCentral.get_site_heading
	 * @borrows UpdraftCentral.open_modal
	 * @borrows UpdraftCentral.close_modal
	 * @borrows UpdraftCentral_Library.unserialize
	 * @borrows UpdraftCentral_Library.dialog.alert
	 */
	this.get_credentials = function(site) {
		var deferred = jQuery.Deferred();
		var $site_row = site.site_row;
		var site_id = site.id;
		
		if (storage.exists(site_id)) {
			var credentials = storage.item(site_id);
			var requests = credentials.request_filesystem_credentials || {};
			
			var show_form = false;
			var entity;
			for (var item in requests) {
				if (requests[item]) {
					show_form = true;
					entity = item;
				}
			}
			
			if (typeof credentials.site_credentials === 'undefined') {
				if (show_form) {
					var possible_credentials = UpdraftCentral.storage_get('filesystem_credentials_'+site.site_hash);
					var site_heading = UpdraftCentral.get_site_heading($site_row);

					UpdraftCentral.open_modal(udclion.updates.connection_information, UpdraftCentral.template_replace('updates-request-credentials', {
						credentials_form: credentials.filesystem_form,
						site_heading: site_heading
					}), function() {
						var save_credentials_in_browser = jQuery('#updraftcentral_modal #filesystem-credentials-save-in-browser').is(':checked');
						var site_credentials = jQuery('#updraftcentral_modal .request-filesystem-credentials-dialog-content input').serialize();
						
						validate_remote_credentials($site_row, entity, site_credentials).then(function(response) {
							credentials.site_credentials = site_credentials;
							site.site_credentials = site_credentials;
						
							if (save_credentials_in_browser) {
								site.save_credentials_in_browser = true;
							}
							
							deferred.resolve(site);
						}).fail(function(response, code, error_code) {
							if (UpdraftCentral.get_debug_level() > 0) {
								console.log("Failed result follows for 'validate_remote_credentials' method called within UpdraftCentral_Credentials.get_credentials:");
								console.log(response);
							}

							UpdraftCentral_Library.dialog.alert('<h2>'+udclion.failed_credentials_heading+'</h2><p>'+udclion.failed_credentials+'</p>');
							deferred.reject(response, code, error_code);
						}).always(function() {
							$modal.off(close_event);
							UpdraftCentral.close_modal();
						});
					}, udclion.updates.update, function() {
						jQuery('#updraftcentral_modal .request-filesystem-credentials-dialog-content input[value=""]:first').focus();

						if (possible_credentials) {
							saved_credentials = UpdraftCentral_Library.unserialize(possible_credentials);
							if (saved_credentials) {
								
								jQuery.each(saved_credentials, function(index, value) {
									var type = jQuery('#updraftcentral_modal .request-filesystem-credentials-dialog-content input[name="'+index+'"]').attr('type');
									if ('text' == type || 'number' == type || 'password' == type) {
										jQuery('#updraftcentral_modal .request-filesystem-credentials-dialog-content input[name="'+index+'"]').val(value);
									} else if ('checkbox' == type) {
										if (value) {
											jQuery('#updraftcentral_modal .request-filesystem-credentials-dialog-content input[name="'+index+'"]').prop('checked', true);
										} else {
											jQuery('#updraftcentral_modal .request-filesystem-credentials-dialog-content input[name="'+index+'"]').prop('false', true);
										}
									} else if ('radio' == type) {
										jQuery('#updraftcentral_modal .request-filesystem-credentials-dialog-content input[name="'+index+'"][value="'+value+'"]').prop('checked', true);
									} else if (type) {
										console.log("UpdraftCentral: unrecognised field type in credential form: type="+type+", field index="+index);
									}
								});
								
								jQuery('#updraftcentral_modal #filesystem-credentials-save-in-browser').prop('checked', true);
							}
						}
						
						// We actually don't have any control on the form since it is a local implementation of the site WP instance, and
						// Each versions of WP may or may not have a difference in terms of form contents.
						// Thus, we're making sure we only get one "Connection Type" heading, by hiding
						// Others if there are any.
						jQuery('#updraftcentral_modal div#request-filesystem-credentials-form fieldset > legend:contains("Connection Type"):gt(0)').hide();
						
						// Here, we're listening to the close event of the modal.
						// If the user, for some reason close the modal without clicking the "Update" button
						// We return it as fail, so that the process can safely return to it's original state for
						// A fresh restart of the process (the restart is handled by the consumer of this promise object)
						$modal.on(close_event, function() {
							deferred.reject();
						});
					}, true, '', function() {
						// User clicks either the "X" or close button of the modal without
						// going into the validation process for credentials
						deferred.reject();
					});
				} else {
					deferred.reject(site);
				}
			} else {
				site.site_credentials = credentials.site_credentials;
				deferred.resolve(site);
			}
		} else {
			deferred.reject(site);
		}

		return deferred.promise();
	}
	
	/**
	 * Pre-load the credentials of the given site (single loading)
	 *
	 * @param {object} site - A UpdraftCentral_Site object containing all possible information relating to the Site.
	 * @returns {object} - A jQuery promise with the response from "get_remote_credentials" process
	 * @borrows get_remote_credentials
	 */
	this.load_credentials = function(site) {
		var deferred = jQuery.Deferred();
		var site_id = site.id;
		var $site_row = site.site_row;
		
		if (typeof site_id !== 'undefined') {
			if (storage.exists(site_id)) {
				deferred.resolve(storage.item(site_id));
			} else {
				get_remote_credentials($site_row).then(function(response) {
					storage.add(site_id, response);
					deferred.resolve(response);
				}).fail(function(response, code, error_code) {
					deferred.reject(response, code, error_code);
				});
			}
		} else {
			deferred.reject();
		}
		return deferred.promise();
	}
	
	/**
	 * Pre-load all credentials of the given sites (mass loading)
	 *
	 * Intended for bulk or mass retrieval of site credentials. Extract each site's credentials and load them into
	 * a storage which can be called and used for whatever purpose it may serve later on (e.g. mass updates, etc.).
	 *
	 * @param {array} sites - An array of UpdraftCentral_Site objects representing a Site
	 * @returns {object} - A jQuery promise with the response from "get_remote_credentials" process
	 * @borrows get_remote_credentials
	 */
	this.load_all_credentials = function(sites) {
		var deferred = jQuery.Deferred();
		var processed_sites = [];
		
		if (typeof sites !== 'undefined' && sites.length > 0) {
			for (var i=0; i < sites.length; i++) {
				var site = sites[i];
				var $site_row = site.site_row;
				
				processed_sites.push(get_remote_credentials($site_row).then(function(response) {
					var site_id = site.id;
					
					if (typeof site_id !== 'undefined') {
						storage.add(site_id, response);
					}
				}));
			}
			
			jQuery.when.apply(jQuery, processed_sites).then(function() {
				deferred.resolve();
			});
		}
		
		return deferred.promise();
	}
	
	/**
	 * Gets the credentials from the remote server
	 *
	 * @returns {object} - A jQuery promise with the response from the server
	 * @borrows {UpdraftCentral.send_site_rpc}
	 */
	var get_remote_credentials = function($site_row) {
		var deferred = jQuery.Deferred();
		
		UpdraftCentral.send_site_rpc('core.get_credentials', null, $site_row, function(response, code, error_code) {
			if (code === 'ok' && response) {
				deferred.resolve(response.data);
			} else {
				deferred.reject(response, code, error_code);
				return true;
			}
		});
		
		return deferred.promise();
	}
	
	/**
	 * Validates the newly entered credentials
	 *
	 * @returns {object} - A jQuery promise with the response from the server
	 * @borrows {UpdraftCentral.send_site_rpc}
	 */
	var validate_remote_credentials = function($site_row, entity, credentials) {
		var deferred = jQuery.Deferred();
		
		var creds = {
			entity: entity,
			filesystem_credentials: credentials
		};
		
		UpdraftCentral.send_site_rpc('core.validate_credentials', creds, $site_row, function(response, code, error_code) {
			if (code === 'ok' && !response.data.error) {
				deferred.resolve(response.data);
			} else {
				deferred.reject(response, code, error_code);
			}
		});
		
		return deferred.promise();
	}
	
}

/**
 * Site Class
 *
 * A convenient way of containing and pulling site information and passing
 * it across the code. Solely created for abstraction purposes and in preparation
 * for the mass updates process.
 *
 * @constructor
 */
function UpdraftCentral_Site($site_row) {
	var self = this;
	this.id;
	this.site_description;
	this.site_url;
	this.site_hash;
	this.site_row = $site_row;
	this.save_credentials_in_browser;
	this.site_credentials;
	this.credentials_required;
	this.automatic_backups;
	this.autobackup_options;
	this.autobackup_requested;
	this.autobackup_complete;
	this.updates;
	this.update_requests;
	this.update_processing;
	this.additional_options;
	this.mass_update;
	this.update_queue;
	
	/**
	 * Initializes variables and containers.
	 *
	 * @see {UpdraftCentral_Collection}
	 * @borrows {UpdraftCentral_Library.md5}
	 */
	var init = function() {
		self.id = self.site_row.data('site_id');
		self.site_description = self.site_row.data('site_description');
		self.site_url = self.site_row.data('site_url');
		self.site_hash = UpdraftCentral_Library.md5(self.id + '_' + self.site_row.data('site_url'));
		self.save_credentials_in_browser = false;
		self.site_credentials = false;
		self.credentials_required = false;
		self.automatic_backups = false;
		self.autobackup_options = {};
		self.autobackup_requested = false;
		self.autobackup_complete = false;
		self.backup_completed = false;
		self.updates = {
			plugin: new UpdraftCentral_Collection(),
			theme: new UpdraftCentral_Collection(),
			core: new UpdraftCentral_Collection(),
			translation: new UpdraftCentral_Collection()
		};
		self.update_requests = new UpdraftCentral_Queue();
		self.update_processing = false;
		self.mass_update = false;
		self.update_queue = new UpdraftCentral_Collection();
	}
	init();
	
	/**
	 * Gets the update information of a certain item
	 *
	 * @param {string} entity - A string representing an entity (plugin, theme, core)
	 * @param {string} key - A string identifier for an item for updates under a certain entity
	 * @returns {boolean}
	 */
	this.get_update_info = function(entity, key) {
		if (self.updates[entity].exists(key)) {
			return self.updates[entity].item(key);
		}
		return false;
	}
}

/**
 * Abstraction Class for Modal Window Implementation (with Queue-able feature)
 *
 * N.B.:
 * This isn't a new modal implementation, instead it uses the legacy modal implementation
 * and enhancing it to add a queue-able feature.
 *
 * @constructor
 * @see {UpdraftCentral_Queue}
 * @see {UpdraftCentral}
 */
function UpdraftCentral_Queueable_Modal(element) {
	var self = this;
	var close_event;
	var queue,
		listener_off = false,
		_element = element || jQuery('#updraftcentral_modal_dialog');
	
	/**
	 * Sets modal close handler/listener
	 *
	 * @private
	 * @borrows {UpdraftCentral_Queue.dequeue}
	 * @borrows {UpdraftCentral_Queue.is_empty}
	 * @borrows {UpdraftCentral_Queue.unlock}
	 * @borrows {UpdraftCentral_Queueable_Modal.open_modal}
	 * @returns {void}
	 */
	var set_modal_close_listener = function() {
		if (typeof _element !== 'undefined') {
			_element.on(close_event, function() {
				if (!queue.is_empty()) {
					var options = queue.dequeue();
					if (typeof options !== 'undefined') {
						open_modal(options);
					}
				} else {
					listener_off = true;
					_element.off(close_event);
					queue.unlock();
				}
			});
		} else {
			console.log('UpdraftCentral_Queueable_Modal: Modal element does not exist.');
		}
	}
	
	/**
	 * Initializes variable(s), queue and close listener
	 *
	 * @private
	 * @see {UpdraftCentral_Queue}
	 * @borrows {UpdraftCentral_Queueable_Modal.set_modal_close_listener}
	 * @returns {void}
	 */
	var init = function() {
		queue = new UpdraftCentral_Queue();
		close_event = 'hidden.bs.modal';
		set_modal_close_listener();
	}
	init();
	
	/**
	 * Opens or executes the legacy "open_modal" function from UpdraftCentral
	 *
	 * @private
	 * @param {object} options - An object containing the legacy arguments of the modal window.
	 * @borrows {UpdraftCentral.open_modal}
	 * @returns {void}
	 */
	var open_modal = function(options) {
		UpdraftCentral.open_modal(
			options.title,
			options.body,
			options.action_button_callback,
			options.action_button_text,
			options.pre_open_callback,
			options.sanitize_body,
			options.extra_classes
		);
	}
	
	/**
	 * Loads queued modal options/arguments from queue
	 *
	 * Basically, this will be the trigger method to load all items from queue,
	 * since closing the modal will trigger another dequeuing process.
	 *
	 * @borrows {UpdraftCentral_Queue.get_lock}
	 * @borrows {UpdraftCentral_Queue.dequeue}
	 * @borrows {UpdraftCentral_Queueable_Modal.open_modal}
	 */
	this.load = function() {
		if (!queue.is_empty() && queue.get_lock()) {
			var options = queue.dequeue();
			if (typeof options !== 'undefined') {
				open_modal(options);
			}
		}
	}
	
	/**
	 * Handles either opening a modal window immediately or queue
	 * the information (e.g. modal options/arguments) for later use.
	 *
	 * @param {object} options - An object containing the legacy arguments of the modal window.
	 * @param {boolean} enqueue - A flag that will determined if the information passed is to be queued.
	 * @borrows {UpdraftCentral_Queue.enqueue}
	 * @borrows {UpdraftCentral_Queue.is_empty}
	 * @borrows {UpdraftCentral_Queueable_Modal.set_modal_close_listener}
	 * @borrows {UpdraftCentral_Queueable_Modal.open_modal}
	 * @returns {void}
	 */
	this.open = function(options, enqueue) {
		if (typeof enqueue !== 'undefined' && enqueue) {
			if (!queue.is_locked()) {
				queue.enqueue(options);
				if (!queue.is_empty() && listener_off) {
					set_modal_close_listener();
					listener_off = false;
				}
			}
		} else {
			open_modal(options);
		}
	}
	
	/**
	 * Closes or executes the legacy "close_modal" function from UpdraftCentral
	 *
	 * @borrows {UpdraftCentral.close_modal}
	 * @returns {void}
	 */
	this.close = function() {
		UpdraftCentral.close_modal();
	}
	
	/**
	 * Gets the total count of queued items
	 *
	 * @borrows {UpdraftCentral_Queue.get_length}
	 * @returns {number} - Total count of items in the queue
	 */
	this.get_queue_item_count = function() {
		return queue.get_length();
	}
}

/**
 * UpdraftCentral_Library
 */
function UpdraftCentral_Library() {
	// Dialog methods - this is just an abstraction layer (currently onto Bootbox, http://bootboxjs.com), allowing us to easily swap to a different provider if we ever need to
	this.dialog = {};
	
	var $ = jQuery;

	var collection = new UpdraftCentral_Collection();

	/**
	 * Sorts an array of objects
	 *
	 * @param {array}  items Array of objects to sort
	 * @param {string} field The field/attribute to sort
	 * @param {string} order (Optional) The sort order requested (e.g. asc = ascending or desc = descending)
	 *
	 * @return {array|void}
	 */
	this.sort = function(items, field, order) {
		if (!$.isArray(items) || 'string' !== typeof field) return;
		if ('undefined' === typeof order) order = 'asc';

		items.sort(function(a, b) {
			if ('object' === typeof a && a.hasOwnProperty(field) && 'object' === typeof b && b.hasOwnProperty(field)) {
				var item1 = a[field].toString().toLowerCase();
				var item2 = b[field].toString().toLowerCase();

				if ('desc' === order) {
					return (item2 < item1) ? -1 : (item2 > item1) ? 1 : 0;
				} else {
					return (item1 < item2) ? -1 : (item1 > item2) ? 1 : 0;
				}
			}

			return 0;
		});

		return items;
	}

	/**
	 * Filter an array of objects
	 *
	 * @param {array}   items               Array of objects to filter
	 * @param {array}   fields              An array of field names where the filter string should be run against
	 * @param {string}  keyword             The filter string to search for from the filter fields
	 * @param {boolean} validate_field_only Check only if fields exists on item(s)
	 *
	 * @param {array|void}
	 */
	this.filter = function(items, fields, keyword, validate_field_only) {
		if (!$.isArray(items) || !$.isArray(fields) || 'string' !== typeof keyword) return;

		var data = $.grep(items, function(obj) {
			var field_data = [];
			for (var i=0; i<fields.length; i++) {
				var field = fields[i];

				if ('object' === typeof obj && obj.hasOwnProperty(field)) {
					field_data.push(obj[field].toString());
				}
			}

			if (field_data.length) {
				if ('undefined' !== typeof validate_field_only && validate_field_only) {
					// Here, we're filtering only those items that has the fields submitted,
					// no string/content search whatsoever. Only plain field(s) validation if they exists.
					if (field_data.length === fields.length) return true;
				} else {
					if (1 === field_data.length && -1 == field_data[0].indexOf(',') && keyword.length) {
						return field_data[0].toLowerCase() === keyword.toLowerCase();
					} else {
						var found = false;
						for (var i=0; i<field_data.length; i++) {
							var data_index = field_data[i];
							if (data_index.toLowerCase() === keyword.toLowerCase()) {
								found = true;
								break;
							} else {
								if (-1 !== data_index.toLowerCase().indexOf(keyword.toLowerCase())) {
									found = true;
									break;
								}
							}
						}

						return found;
					}
				}
			}
			
			return false;
		});

		return data;
	}

	/**
	 * Enables or restores form field's from its original enabled state
	 *
	 * @param {string} selector A class that represents the container of the form fields
	 *
	 * @return {void}
	 */
	this.enable_actions = function(selector) {
		selector = ('undefined' !== typeof selector && selector) ? selector : '.updraftcentral_row_extracontents';
		$(selector).find('input, button, select, a').prop('disabled', false).removeClass('disabled_cursor');
	}

	/**
	 * Disables form field's temporarily while actions are being processed
	 *
	 * @param {string} selector   A class that represents the container of the form fields
	 * @param {array}  exceptions Optional. An array of selectors that will be excluded by the disabling process
	 *
	 * @return {void}
	 */
	this.disable_actions = function(selector, exceptions) {
		selector = ('undefined' !== typeof selector && selector) ? selector : '.updraftcentral_row_extracontents';
		var not_including = '';
		if ('undefined' !== typeof exceptions && $.isArray(exceptions)) {
			if (exceptions.length) {
				not_including = exceptions.join(',');
			}
		}

		$(selector).find('input, button, select, a').not(not_including).prop('disabled', true).addClass('disabled_cursor');
	}

	/**
	 * Checks whether any of the dialog boxes are currently opened
	 *
	 * @returns {boolean} - Returns true if opened, false otherwise.
	 */
	this.is_dialog_opened = function() {
		if ($('div.bootbox.modal').is(':visible') || $('div#updraftcentral_modal_dialog').is(':visible')) {
			return true;
		}

		return false;
	}

	/**
	 * Process site meta commands (add, delete, get and update)
	 *
	 * @param {Object} param Holds the needed parameters for the current "meta" process
	 * @returns {Object} A jQuery promise object that holds results of the currently executed action
	 */
	var send_meta_request = function(param) {
		var deferred = jQuery.Deferred();

		UpdraftCentral.send_ajax('manage_site_meta', param, null, 'via_mothership_encrypting', null, function(resp, code, error_code) {
			if ('ok' == code && 'undefined' !== typeof resp.data) {
				deferred.resolve(resp.data);
			} else {
				deferred.reject(resp.message);
			}
		});

		return deferred.promise();
	}


	/**
	 * Add meta data field to a site.
	 *
	 * @param {Number} site_id - Site ID.
	 * @param {String} meta_key - Metadata name.
	 * @param {Mixed} meta_value - Metadata value.
	 * @param {Boolean} [unique=false] - Whether the same key should not be added.
	 *
	 * @returns {Object} - A jQuery promise object that holds the Meta ID on success, false on failure.
	 */
	this.add_site_meta = function(site_id, meta_key, meta_value, unique) {
		if ('undefined' === typeof unique) unique = false;

		return send_meta_request({
			action: 'add',
			site_id: site_id,
			meta_key: meta_key,
			meta_value: meta_value,
			unique: unique
		});
	}

	/**
	 * Remove metadata matching criteria from a site.
	 *
	 * You can match based on the key, or key and value. Removing based on key and
	 * value, will keep from removing duplicate metadata with the same key. It also
	 * allows removing all metadata matching key, if needed.
	 *
	 * @param {Number} site_id - Site ID
	 * @param {String} meta_key - Metadata name.
	 * @param {Mixed} [meta_value='']. Metadata value.
	 *
	 * @returns {Object} - A jQuery promise object that holds a boolean value of true on success, false on failure.
	 */
	this.delete_site_meta = function(site_id, meta_key, meta_value) {
		if ('undefined' === typeof meta_value) meta_value = '';

		return send_meta_request({
			action: 'delete',
			site_id: site_id,
			meta_key: meta_key,
			meta_value: meta_value
		});
	}

	/**
	 * Retrieve site meta field for a site.
	 *
	 * @param {Number} site_id - Site ID.
	 * @param {String} [key=''] - The meta key to retrieve. By default, returns data for all keys.
	 * @param {Boolean} [single=false] - Whether to return a single value.
	 *
	 * @returns {Object} - A jQuery promise object that holds an array if single is false. Will be value of meta data field if single is true.
	 */
	this.get_site_meta = function(site_id, key, single) {
		if ('undefined' === typeof key) key = '';
		if ('undefined' === typeof single) single = false;

		return send_meta_request({
			action: 'get',
			site_id: site_id,
			key: key,
			single: single
		});
	}

	/**
	 * Update site meta field based on site ID.
	 *
	 * Use the $prev_value parameter to differentiate between meta fields with the
	 * same key and site ID.
	 *
	 * If the meta field for the site does not exist, it will be added.
	 *
	 * @param {number} site_id - Site ID.
	 * @param {string} meta_key - Metadata key.
	 * @param {mixed} meta_value - Metadata value.
	 * @param {mixed} [prev_value=''] - Previous value to check before removing.
	 *
	 * @returns {Object} - A jQuery promise object that holds the Meta ID if the key didn't exist, true on successful update, false on failure.
	 */
	this.update_site_meta = function(site_id, meta_key, meta_value, prev_value) {
		if ('undefined' === typeof prev_value) prev_value = '';

		return send_meta_request({
			action: 'update',
			site_id: site_id,
			meta_key: meta_key,
			meta_value: meta_value,
			prev_value: prev_value
		});
	}

	/**
	 * Function to be called whenever a bootbox dialog is opened
	 * We use it simply to move the bootbox within the DOM if in fullscreen mode (because otherwise it won't be seen).
	 *
	 * @param {string} key - A unique identifier that will serve as an id for the dialog
	 * @param {object} dialog - The bootbox dialog object that was created
	 * @returns {void}
	 */
	var bootbox_opened = function(key, dialog) {
		// It only needs moving if in full-screen mode; so, we're conservative and otherwise leave it alone
		if ($.fullscreen.isFullScreen()) {
			$('.bootbox.modal').appendTo('#updraftcentral_dashboard');
		}
		// Use a new browser portal for any clicks to updraftplus.com
		$('.bootbox.modal').on('click', 'a', function(e) {
			var href = $(this).attr('href');

			// This is causing some error. We're making sure that we have a valid
			// function before calling it.
			if ('function' === typeof redirect_updraft_website_links) {
				redirect_updraft_website_links(href, e);
			}
		});
		$('.bootbox.modal .updraftcentral_site_editdescription').click(function(e) {
			e.preventDefault();
			$(this).closest('.modal').modal('hide');
			open_site_configuration(UpdraftCentral.$site_row);
		});
		$('.bootbox.modal .updraftcentral_test_other_connection_methods').click(function(e) {
			e.preventDefault();
			$(this).closest('.modal').modal('hide');
			open_connection_test(UpdraftCentral.$site_row);
		});

		$('.bootbox.modal').data('id', key);
		$('.bootbox.modal.bootbox-alert, .bootbox.modal.bootbox-confirm, .bootbox.modal.bootbox-prompt').find('button[data-dismiss="modal"], button[data-bb-handler="ok"], button[data-bb-handler="cancel"], button[data-bb-handler="confirm"]').off('click').on('click', function() {
			// Popup is closing, we remove previously stored key
			// to allow the popup to be opened once again when needed.
			if (collection.exists(key)) {
				collection.remove(key);
			}

			// Trigger dashboard-wide dialog closed event (applies to both bootbox and bootstrap modal)
			$('#updraftcentral_dashboard').trigger('updraftcentral_dialog_closed');
		});

		$('.bootbox.modal').on('hidden.bs.modal', function() {
			if (collection.exists(key)) {
				collection.remove(key);
			}

			// Trigger dashboard-wide dialog closed event (applies to both bootbox and bootstrap modal)
			$('#updraftcentral_dashboard').trigger('updraftcentral_dialog_closed');
		});

		if ('undefined' !== typeof dialog && dialog) {
			dialog.on("shown.bs.modal", function() {
				$('#updraftcentral_dashboard').trigger('updraftcentral_bootbox_dialog_opened', [key, dialog]);
			});

			dialog.on("hidden.bs.modal", function() {
				$('#updraftcentral_dashboard').trigger('updraftcentral_bootbox_dialog_closed', [key, dialog]);
			});
		}

		// Trigger dashboard-wide dialog opened event (applies to both bootbox and bootstrap modal)
		$('#updraftcentral_dashboard').trigger('updraftcentral_dialog_opened');
	}
	
	/**
	 * Converts the first letter of a string to uppercase
	 *
	 * @param {string} str - A string to convert
	 * @returns {string} - Converted string
	 */
	this.ucfirst = function(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	
	/**
	 * Opens the site connection test dialog for the specified site
	 *
	 * @param {Object} $site_row - the jQuery row object for the site whose configuration is to be edited
	 * @returns {void}
	 */
	this.open_connection_test = function($site_row) {
		
		var site_url = UpdraftCentral.get_contact_url($site_row);
		var site_id = $site_row.data('site_id');
		
		var current_connection_method = $site_row.data('connection_method');
		
		if ('via_mothership_encrypting' == current_connection_method) {
			UpdraftCentral_Library.dialog.alert('<h2>'+udclion.test_connection_methods+'</h2><p>'+udclion.test_not_possible_in_current_mode+'</p>');
			// <p><a href="#" class="updraftcentral_site_editdescription">'+udclion.open_site_configuration+'...</a></p>
			return;
		}
		
		var current_method_simplified = ('direct_jquery_auth' == current_connection_method || 'direct_default_auth' == current_connection_method || 'direct_default_auth' == current_connection_method) ? 'direct' : current_connection_method;
		
		UpdraftCentral.open_modal(udclion.test_connection_methods, UpdraftCentral.template_replace('sites-connection-test', { site_url: site_url }), true, false, function() {
			
			var direct_method_can_be_attempted = true;
			if ('https:'== document.location.protocol) {
				if (site_url.substring(0, 5).toLowerCase() == 'http:') {
					direct_method_can_be_attempted = false;
				}
			}
			
			if (direct_method_can_be_attempted) {
			
				$('#updraftcentral_modal .connection-test-direct .connection-test-result').html('');
				
				UpdraftCentral.send_ajax('ping', null, $site_row, 'direct_default_auth', '#updraftcentral_modal .connection-test-direct .connection-test-result', function(response, code, error_code) {
					if (UpdraftCentral.get_debug_level() > 0) {
						console.log("Result follows for 'direct_default_auth' method:");
						console.log(response);
					}
					if ('ok' == code) {
						var new_html = '<span class="connection-test-succeeded">'+udclion.succeeded+'</span> ';
						if ('direct' == current_method_simplified) {
							new_html += udclion.current_method+' '+udclion.best_method+' '+udclion.recommend_keep;
						} else {
							new_html += udclion.best_method+' '+udclion.recommend_use+' <a href="#" class="connection-test-switch" data-site_id="'+site_id+'" data-connection_method="direct_default_auth">'+udclion.switch_to+'...</a>';
						}
						$('#updraftcentral_modal .connection-test-direct .connection-test-result').html(new_html);
					} else {
						$('#updraftcentral_modal .connection-test-direct .connection-test-result').html('<span class="connection-test-failed">'+udclion.failed+' ('+error_code+')</span>');
					}
				}, 30, false);
			
			} else {
				$('#updraftcentral_modal .connection-test-direct .connection-test-result').html(udclion.not_possible_browser_restrictions);
			}
			
			$('#updraftcentral_modal .connection-test-via_mothership .connection-test-result').html('');
			UpdraftCentral.send_ajax('ping', null, $site_row, 'via_mothership', '#updraftcentral_modal .connection-test-via_mothership .connection-test-result', function(response, code, error_code) {
				$('#updraftcentral_modal .connection-test-via_mothership .connection-test-result').html(code);
				if (UpdraftCentral.get_debug_level() > 0) {
					console.log("Result follows for 'via_mothership' method:");
					console.log(response);
				}
				if ('ok' == code) {
					var new_html = '<span class="connection-test-succeeded">'+udclion.succeeded+'</span> ';
					if ('via_mothership' != current_connection_method) {
						new_html += '<a href="#" class="connection-test-switch" data-site_id="'+site_id+'" data-connection_method="via_mothership">'+udclion.switch_to+'...</a>';
					} else {
						new_html += udclion.current_method;
					}
					$('#updraftcentral_modal .connection-test-via_mothership .connection-test-result').html(new_html);
				} else {
					
					var code_msg = error_code;
					if ('unexpected_http_code' == error_code) {
						if (null != response && response.hasOwnProperty('data') && null != response.data && response.data.hasOwnProperty('response') && response.data.response.hasOwnProperty('code')) {
							code_msg += ' - '+response.data.response.code;
						}
						if (null != response && response.hasOwnProperty('data') && null != response.data && response.data.hasOwnProperty('response') && response.data.response.hasOwnProperty('message')) {
							code_msg += ' - '+response.data.response.message;
						}
					}
					
					$('#updraftcentral_modal .connection-test-via_mothership .connection-test-result').html('<span class="connection-test-failed">'+udclion.failed+' ('+code_msg+')</span>');
				}
			}, 30, false);
			
			$('#updraftcentral_modal .connection-test-via_mothership_encrypting .connection-test-result').html('');
			UpdraftCentral.send_ajax('ping', null, $site_row, 'via_mothership_encrypting', '#updraftcentral_modal .connection-test-via_mothership_encrypting .connection-test-result', function(response, code, error_code) {
				if (UpdraftCentral.get_debug_level() > 0) {
					console.log("Result follows for 'via_mothership_encrypting' method:");
					console.log(response);
				}
				if ('ok' == code) {
					var new_html = '<span class="connection-test-succeeded">'+udclion.succeeded+'</span> ';
					if ('via_mothership_encrypting' != current_connection_method) {
						new_html += '<a href="#" class="connection-test-switch" data-site_id="'+site_id+'" data-connection_method="via_mothership_encrypting">'+udclion.switch_to+'...</a>';
					} else {
						new_html += udclion.current_method;
					}
					$('#updraftcentral_modal .connection-test-via_mothership_encrypting .connection-test-result').html(new_html);
				} else {
					var code_msg = error_code;
					if ('unexpected_http_code' == error_code) {
						if (null != response && response.hasOwnProperty('data') && null != response.data && response.data.hasOwnProperty('response') && response.data.response.hasOwnProperty('code')) {
							code_msg += ' - '+response.data.response.code;
						}
						if (null != response && response.hasOwnProperty('data') && null != response.data && response.data.hasOwnProperty('response') && response.data.response.hasOwnProperty('message')) {
							code_msg += ' - '+response.data.response.message;
						}
					}
					
					$('#updraftcentral_modal .connection-test-via_mothership_encrypting .connection-test-result').html('<span class="connection-test-failed">'+udclion.failed+' ('+code_msg+')</span>');
				}
			}, 30, false);
			
		}, true, 'modal-lg');
	}
	/**
	 * Open an alert box (as a more aesthetic alternative to the traditional browser-provided alert()).
	 *
	 * @param {string} message - the message to display in the alert box
	 * @param {dialogresultCallback} result_callback - callback function that is invoked when the alert box is closed
	 * @param {boolean} [sanitize_message=true] - whether or not to put the message through sanitize_html()
	 * @param {string} [id] - a unique identifier that will be used to identify and check whether the dialog is currently opened
	 * @param {boolean} [backdrop] - indicates whether the dialog will have a backdrop or not
	 * @returns {void}
	 * @uses sanitize_html
	 */
	this.dialog.alert = function(message, result_callback, sanitize_message, id, backdrop) {
		sanitize_message = ('undefined' == sanitize_message) ? true : sanitize_message;
		if (sanitize_message) {
			message = this.sanitize_html(message);
		}

		var key = ('undefined' !== typeof id) ? id : UpdraftCentral_Library.md5('_alert_'+message);
		if (!collection.exists(key)) {
			collection.add(key, true);

			var dialog = bootbox.alert({
				message: message,
				callback: result_callback,
				backdrop: backdrop
			});
			bootbox_opened(key, dialog);
		}
	}

	/**
	 * Open a confirmation box (as a more aesthetic alternative to the traditional browser-provided confirm()).
	 *
	 * @param {string} question - the message to display in the alert box
	 * @param {dialogresultCallback} result_callback - callback function that is invoked when the alert box is closed
	 * @param {string} id - a unique identifier that will be used to identify and check whether the dialog is currently opened
	 * @returns {void}
	 */
	this.dialog.confirm = function(question, result_callback, id) {
		var key = ('undefined' !== typeof id) ? id : UpdraftCentral_Library.md5('_confirm_'+question);
		if (!collection.exists(key)) {
			collection.add(key, true);

			var dialog = bootbox.confirm(question, result_callback);
			bootbox_opened(key, dialog);
		}
	}

	/**
	 * Open a prompt box (as a more aesthetic alternative to the traditional browser-provided prompt()).
	 *
	 * @param {string} title - the message to display in the alert box
	 * @param {string} default_value - the default value for the user response field
	 * @param {dialogresultCallback} result_callback - callback function that is invoked when the alert box is closed
	 * @param {string} id - a unique identifier that will be used to identify and check whether the dialog is currently opened
	 * @returns {void}
	 */
	this.dialog.prompt = function(title, default_value, result_callback, id) {
		var key = ('undefined' !== typeof id) ? id : UpdraftCentral_Library.md5('_prompt_'+title);
		if (!collection.exists(key)) {
			collection.add(key, true);

			var dialog = bootbox.prompt({ title: title, value: default_value, callback: result_callback});
			bootbox_opened(key, dialog);
		}
	}
	
	/**
	 * Encode to base64 encoding
	 * This (or its callers) can be swapped for atob() once IE 10 support is not desired - http://caniuse.com/#feat=atob-btoa
	 *
	 * @param {string} data - the data to base64-encode
	 * @returns {string} - the encoded data
	 */
	this.base64_encode = function(data) {
		return forge.util.encode64(data);
	}
	
	/**
	 * Calculate an MD5 hash
	 *
	 * @param {string} data - the data to hash
	 * @returns {string} - the encoded data, in hex format
	 */
	this.md5 = function(data) {
		var md = forge.md.md5.create();
		md.update(data);
		return md.digest().toHex();
	}
	
	/**
	 * Sanitizes passed HTML, so that it is safe for display. Uses Google's Caja parser.
	 *
	 * @param {string} html - the potentially suspicious HTML
	 * @returns {string} The sanitized HTML
	 */
	this.sanitize_html = function(html) {
		var web_only = function(url) {
			if (/^https?:\/\//.test(url)) { return url;
		}}
		var same_id = function(id) {
			return id;
		}
		// The html_sanitize object comes from Google's Caja
		// This version retains data- attributes. It removes style attributes (but not CSS classes)
		return html_sanitize.sanitize(html, web_only, same_id);
	}
	
	/**
	 * Escapes passed HTML, so that it is safe for display.
	 *
	 * @param {string} html - the potentially suspicious HTML
	 * @returns {string}
	 */
	this.escape_attrib = function(html) {
		return html_sanitize.escapeAttrib(html);
	}
	
	/**
	 * Quote the input, so that it is suitable for placing in HTML attributes values
	 *
	 * @param {string} s - The string to be quoted
	 * @param {boolean} preserveCR - if true, then \r and \n are replaced with an HTML entity; otherwise with \n
	 *
	 * @see https://stackoverflow.com/questions/7753448/how-do-i-escape-quotes-in-html-attribute-values
	 *
	 * @returns {string} the quoted string
	 */
	this.quote_attribute = function(s, preserveCR) {
		preserveCR = preserveCR ? '&#13;' : '\n';
		return ('' + s) // Forces the conversion to string.
		.replace(/&/g, '&amp;') // This MUST be the 1st replacement.
		.replace(/'/g, '&apos;') // The 4 other predefined entities, required.
		.replace(/"/g, '&quot;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		// You may add other replacements here for HTML only  (but it's not necessary). Or for XML, only if the named entities are defined in its DTD.
		.replace(/\r\n/g, preserveCR) // Must be before the next replacement.
		.replace(/[\r\n]/g, preserveCR);
	}
	
	/**
	 * Opens a new browser portal at the specified URL
	 *
	 * @param {Object} $site_row - jQuery object for the site row
	 * @param {Object|string|null} [redirect_to=null] - where to redirect to (defaults to the network admin)
	 * @param {Object} [spinner_where=$site_row] - jQuery object indicating where to put the site row.
	 * @returns {void}
	*/
	this.open_browser_at = function($site_row, redirect_to, spinner_where) {
		redirect_to = typeof redirect_to !== 'undefined' ? redirect_to : null;
		spinner_where = ('undefined' === typeof spinner_where) ? $site_row : spinner_where;
		UpdraftCentral.send_site_rpc('core.get_login_url', redirect_to, $site_row, function(response, code, error_code) {
			if ('ok' == code && false !== response && response.hasOwnProperty('data')) {
				var login_url = response.data.login_url;
				var win = window.open(login_url, '_blank');
				UpdraftCentral_Library.focus_window_or_error(win);
			}
		}, spinner_where);
	}
	
	/**
	 * Either focuses the window, or tells the user to check whether they have a pop-up blocker
	 *
	 * @param {Object|null} - either a window object that should have focus() called on it, or null to instead show an alert
	 * @returns {void}
	 */
	this.focus_window_or_error = function(win) {
		if ('undefined' != typeof win && null !== win) {
			win.focus();
		} else {
			this.dialog.alert('<h2>'+udclion.open_new_window+'</h2>'+udclion.window_may_be_blocked);
		}
	}
	
	/**
	 * Toggle whether or not UpdraftCentral is in "full screen" mode
	 *
	 * @returns {void}
	 */
	this.toggle_fullscreen = function() {
		// https://github.com/private-face/jquery.fullscreen
		if ($.fullscreen.isFullScreen()) {
			$('footer').show();
			$.fullscreen.exit();
			$('#updraftcentral_modal_dialog').appendTo(document.body);
		} else {
			$('footer').hide();
			$('#updraftcentral_dashboard').fullscreen({overflow: 'scroll', toggleClass: 'updraft-fullscreen' });
			$('#updraftcentral_modal_dialog').appendTo('#updraftcentral_dashboard');
		}
	}
	
	/**
	 * Reverses serialisation that was performed using jQuery's .serialize() method
	 * From: https://gist.github.com/brucekirkpatrick/7026682
	 *
	 * @param {string} serialized_string - the string to unserialize
	 * @returns {Object} - the resulting object
	 */
	this.unserialize = function(serialized_string) {
		var str = decodeURI(serialized_string);
		var pairs = str.split('&');
		var obj = {}, p, idx;
		for (var i=0, n=pairs.length; i < n; i++) {
			p = pairs[i].split('=');
			idx = p[0];
			if (undefined === obj[idx]) {
				obj[idx] = unescape(p[1]);
			} else {
				if ("string" == typeof obj[idx]) {
					obj[idx] = [obj[idx]];
				}
				obj[idx].push(unescape(p[1]));
			}
		}
		return obj;
	}
	
	/**
	 * Get serialized options within a specified selector. Includes making sure that checkboxes are included when not checked.
	 *
	 * @param {string} selector - the jQuery selector to use to locate the options
	 * @returns {string} - the serialized options
	 */
	this.get_serialized_options = function(selector) {
		var form_data = $(selector).serialize();
		$.each($(selector+' input[type=checkbox]')
			.filter(function(idx) {
				return $(this).prop('checked') == false
			}),
			function(idx, el) {
				// Attach matched element names to the form_data with chosen value.
				var empty_val = '0';
				form_data += '&' + $(el).attr('name') + '=' + empty_val;
		});
		return form_data;
	}
	
	/**
	 * Allow the user to download/save a file, with contents supplied from the inner HTML of a specified element
	 *
	 * @param {string} filename - the filename that will be suggested to the user to save as
	 * @param {string} element_id - the DOM id of the element whose inner HTML is to be used as content
	 * @param {string} [mime_type='text/plain'] - the MIME type to indicate in the header sent to the browser
	 * @returns {void}
	 */
	this.download_inner_html = function(filename, element_id, mime_type) {
		mime_type = mime_type || 'text/plain';
		var element_html = document.getElementById(element_id).innerHTML;
		var link = document.body.appendChild(document.createElement('a'));
		link.setAttribute('download', filename);
		link.setAttribute('style', "display:none;");
		link.setAttribute('href', 'data:' + mime_type + ';charset=utf-8,' + encodeURIComponent(element_html));
		link.click();
	}
	
}
