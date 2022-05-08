jQuery(function($) {
	window.UpdraftCentral_Library = new Fn_UpdraftCentral_Library();
});

/**
 * Post Class
 *
 * Contains all common properties and methods of the post and page module classes, eliminating
 * redundant/duplicate codebase for easier and quick (one-time) edit that applies to both
 * modules instantenously.
 *
 * @example
 * function UpdraftCentral_Page_Management() {
 *		var self = this;
 *		var $ = jQuery;
 *		this.type = 'page';
 *		var common = new UpdraftCentral_Post(this);
 * 		...
 *		...
 *		...
 * }
 *
 * @constructor
 */
function UpdraftCentral_Post(module) {
	var self = this;
	var $ = jQuery;
	this.pagination;
	this.current_group;
	this.current_section;
	this.manage_data = new UpdraftCentral_Collection();
	this.uc_editor = {
		edits: new UpdraftCentral_Collection(),
		state: new UpdraftCentral_Collection()
	}
	this.quick_edits = new UpdraftCentral_Collection();
	this.dirty_edits = new UpdraftCentral_Collection();
	this.editor_reload_required = false;
	this.wp_versions = new UpdraftCentral_Collection();
	this.reset_info = { data: null, previous_status: null, location: null };
	var filtered_posts = new UpdraftCentral_Collection();
	var numberposts = 50;

	/**
	 * Initializes event handlers for certain events/actions when managing post or pages.
	 *
	 * @return {void}
	 */
	this.init = function() {
		$(document.body).on('click', 'div.media-modal li.attachment', function() {
			self.set_selected_image($(this));
		});

		$(document.body).on('mouseover', '.components-notice-list', function() {
			$(this).find('a.components-notice__action.is-link').attr('target', '_blank');
		});

		$(document.body).on('click', 'input[name="uc-dont-show-again"]', function() {
			if ('undefined' !== typeof localStorage && localStorage) {
				if ($(this).is(':checked')) {
					localStorage.setItem('uc-gutenberg-dialog-no-show', 1);
				} else {
					localStorage.removeItem('uc-gutenberg-dialog-no-show');
				}
			}
		});

		$(document.body).on('click', 'label.uc-dont-show-again-label', function() {
			$(this).siblings('input[name="uc-dont-show-again"]').trigger('dblclick');
		});

		/**
		 * A fallback routine in case the user suddenly hits the "Escape" key
		 * rather than closing the editor using the close button when in fullscreen mode.
		 */
		$(document).on("keyup", function (e) {
			var code = e.keyCode || e.which;
			if (27 === code || e.key === 'Escape') {
				if (!$('#updraftcentral_dashboard').is(':visible')) {
					$('#updraftcentral_dashboard').show();
				}
			}
		});

		$('#updraftcentral_dashboard').on('updraftcentral_dialog_opened', function() {
			if ($.fullscreen.isFullScreen() && $('#classic_editor_container').is(':visible')) {
				$('.bootbox.modal').appendTo('#classic_editor_container');
				$('.modal-backdrop-container').appendTo('#classic_editor_container');
			}
		});

		$('#updraftcentral_dashboard').on('editor-has-recovered', function() {
			self.apply_subscriptions_observer(self.reset_info.data, self.reset_info.previous_status, self.reset_info.location);
			self.clear_notices();
		});

		$(document.body).on('fullscreenchange', function() {
			if (!$.fullscreen.isFullScreen()) {
				var classic = $(document.body).find('div#classic_editor_container');
				var gutenberg = $(document.body).find('div#gutenberg_editor_container');
				$container = classic.is(':visible') ? classic : gutenberg;

				if ('undefined' !== typeof $container && $container.length && $container.is(':visible')) {
					var editor_container = $('#updraftcentral_dashboard').parent().find('#'+$container.attr('id'));
					if ('undefined' !== typeof editor_container && editor_container.length) {
						$('#updraftcentral_dashboard').parent().removeAttr('style');
						editor_container.removeAttr('style');
						editor_container.appendTo(document.body);
						if (classic.is(':visible')) {
							if ('undefined' !== typeof tinymce && tinymce) {
								self.init_tiny_mce('uc_classic_editor');
							}
						}

						// Reset implemented styles. This is done due to an unexpected exit from fullscreen mode
						// (e.g. viewing of link in a new tab where it abruptly closes the fullscreen mode).
						self.unload_remote_editor_styles();
						self.load_remote_editor_styles($container);
					}
				}
			}
		});

		$(document.body).on('mouseover', 'div.'+module.type+'-item-title', function() {
			$(this).find('div.'+module.type+'-actions').show();
		}).on('mouseout', function() {
			$(this).find('div.'+module.type+'-actions').hide();
		});

		$('.updraftcentral-show-in-tab-'+module.type+'s button.updraftcentral_action_choose_another_site').on('click', function() {
			self.editor_reload_required = true;
		});

		$(document.body).on('updraftcentral_'+module.type+'_editor_loaded', function(evt, $container) {
			$(document.body).addClass('uc-editor-loaded');
			self.load_remote_editor_styles($container);

			if ($.fullscreen.isFullScreen()) {
				if ('undefined' !== typeof $container && $container.length) $container.appendTo($('#updraftcentral_dashboard').parent());
			}

			self.listen_for_fullscreen_resources();
			$('#updraftcentral_dashboard').hide();
		});

		$(document.body).on('updraftcentral_'+module.type+'_editor_closed', function(evt, $container) {
			$(document.body).removeClass('uc-editor-loaded');
			self.unload_remote_editor_styles();

			if (!$.fullscreen.isFullScreen()) {
				if ('undefined' !== typeof $container && $container.length) {
					var editor_container = $('#updraftcentral_dashboard').parent().find('#'+$container.attr('id'));
					if ('undefined' !== typeof editor_container && editor_container.length) {
						editor_container.appendTo(document.body);
					}
				}
			}

			UpdraftCentral.unsubscribe_to_node_changes('uc_body_resources');
			$('#updraftcentral_dashboard').show();

			UpdraftCentral.clear_editor_container(null);
		});
	}

	/**
	 * Register all action/event handlers needed when managing post/page items
	 *
	 * @return {void}
	 */
	this.register_module_handlers = function() {

		/**
		 * Register a click event handler for searching post/page items
		 *
		 * @see {UpdraftCentral.register_row_clicker}
		 */
		UpdraftCentral.register_row_clicker('input.uc-'+module.type+'-search-'+module.type+'s', function($site_row, $site_id, e) {
			if (13 === e.which) {
				var keyword = $(this).val();
				var selected_date = $('select.uc-'+module.type+'-date-filter').val();
				var category = ('post' == module.type) ? $('select.uc-'+module.type+'-category-filter').val() : null;
				var month_year = null;

				if (selected_date) {
					var dt = new Date(selected_date.replace(' ', ' 1, '));
					month_year = (dt.getMonth()+1)+':'+dt.getFullYear();
				}
				
				render_post_items($site_row, null, self.current_group, keyword, month_year, category);
			}
		}, true, 'keyup');

		/**
		 * Executes the bulk action request
		 *
		 * @see {UpdraftCentral.register_row_clicker}
		 */
		UpdraftCentral.register_row_clicker('button#uc-apply-action', function($site_row) {
			var action = $('.uc-'+module.type+'-buttons-filters select.uc-'+module.type+'-action').val();
			var list = [];

			$site_row.find('.uc-'+module.type+'-items-container .uc-'+module.type+'-item').each(function() {
				var item = $(this);
				var id = item.data('id');
				if (item.find('input[name="post\[\]"]').is(':checked')) list.push(id);
			});

			if (list.length) {
				var param = {
					name: 'set_state',
					arguments: {
						list: list,
						action: action,
						paged: 1,
						status: 'all',
					}
				};
				param.arguments['number'+module.type+'s'] = numberposts;

				send_command(param, $site_row).then(function(response) {
					if ('undefined' !== typeof response[module.type+'s'] && response[module.type+'s']) {
						if (response.hasOwnProperty('get') && response['get']) {
							self.manage_data.update('response', response['get']);
							process_response(response['get'], $site_row, true);
						}

						var action_label = $('.uc-'+module.type+'-buttons-filters select.uc-'+module.type+'-action > option[value="'+action+'"]').text();
						UpdraftCentral_Library.dialog.alert('<h2>'+udclion[module.type+'s'].post_update_heading+'</h2><p>'+udclion[module.type+'s'].action_messages[action]+'</p>');
					} else {
						UpdraftCentral_Library.dialog.alert('<h2>'+udclion[module.type+'s'].post_update_heading+'</h2><p>'+udclion[module.type+'s'].unkown_error+'</p>');
					}
				});
			}
		});

		/**
		 * Filters displayed items by category
		 *
		 * @see {UpdraftCentral.register_row_clicker}
		 */
		UpdraftCentral.register_row_clicker('select.uc-post-category-filter', function($site_row) {
			var value = $(this).val();
			var selected_date = $('select.uc-post-date-filter').val();
			var month_year = null;

			if (selected_date) {
				var dt = new Date(selected_date.replace(' ', ' 1, '));
				month_year = (dt.getMonth()+1)+':'+dt.getFullYear();
			}

			var keyword = $('input.uc-post-search-posts').val();
			render_post_items($site_row, null, self.current_group, keyword, month_year, value);
		}, true, 'change');

		/**
		 * Filters displayed items by their publication date
		 *
		 * @see {UpdraftCentral.register_row_clicker}
		 */
		UpdraftCentral.register_row_clicker('select.uc-'+module.type+'-date-filter', function($site_row) {
			var value = $(this).val();
			var category = ('post' == module.type) ? $('select.uc-'+module.type+'-category-filter').val() : null;
			var month_year = null;

			if (value) {
				var dt = new Date(value.replace(' ', ' 1, '));
				month_year = (dt.getMonth()+1)+':'+dt.getFullYear();
			}

			var keyword = $('input.uc-'+module.type+'-search-'+module.type+'s').val();
			render_post_items($site_row, null, self.current_group, keyword, month_year, category);
		}, true, 'change');

		/**
		 * Handles the changing and moving of post/page item's state/status (e.g. from publish to pending, draft to scheduled, etc.)
		 *
		 * @see {UpdraftCentral.register_row_clicker}
		 */
		UpdraftCentral.register_row_clicker('ul#uc-navlinks a.uc-navlink-item', function($site_row) {
			var group = $(this).data('group');
			self.current_group = group;

			update_action_options(group);

			$('ul#uc-navlinks a.uc-navlink-item').css('cssText', 'font-weight: normal;');
			$('ul#uc-navlinks a.uc-navlink-item[data-group="'+group+'"]').css('cssText', 'font-weight: bold !important;');

			// Clear search, date and category filters when a new status/group is selected
			// in order to refresh the data starting from post/page 1 as much as possible.
			$('input.uc-'+module.type+'-search-'+module.type+'s').val('');
			$('select.uc-'+module.type+'-date-filter').val('');
			if ('post' == module.type) $('select.uc-'+module.type+'-category-filter').val('');

			render_post_items($site_row, null, group);
		});

		/**
		 * Displays quick edit form for the selected post/page
		 *
		 * @see {UpdraftCentral.register_row_clicker}
		 */
		UpdraftCentral.register_row_clicker('.uc-'+module.type+'-items-container a.'+module.type+'-action-item[data-action="quick-edit"]', function($site_row) {
			// Closing any open quick edit form before we load a new one.
			var quick_form = $('div.uc_quick_edit:visible');
			if (quick_form.length) {
				quick_form.find('button.cancel').trigger('click');
			}

			var id = $(this).data('id');
			var quick_edit_form = $('div#'+module.type+'-quick-edit-'+id);
			var author = quick_edit_form.data('author'),
				parent = quick_edit_form.data('parent'),
				template = quick_edit_form.data('template');

			$('div#'+module.type+'-item-'+id).hide();
			quick_edit_form.show();
			if ('post' == module.type) quick_edit_form.find('div.category-checklist-wrapper').scrollTop(0);

			// Clear edit storages and add listerners for the current quickedit form
			self.quick_edits.clear();
			self.dirty_edits.clear();
			load_quick_edit_listeners(quick_edit_form);

			quick_edit_form.find('.uc-'+module.type+'-author select[name="post_author"] > option[value="'+author+'"]').prop('selected', true);
			quick_edit_form.find('.uc-'+module.type+'-parent select[name="post_parent"] > option[value="'+id+'"]').hide();
			quick_edit_form.find('.uc-'+module.type+'-parent select[name="post_parent"] > option[value="'+parent+'"]').prop('selected', true);
			quick_edit_form.find('.uc-'+module.type+'-template select[name="post_template"] > option[value="'+template+'"]').prop('selected', true);
		});

		/**
		 * Cancels quick edit form
		 *
		 * @see {UpdraftCentral.register_row_clicker}
		 */
		UpdraftCentral.register_row_clicker('.uc_quick_edit button.cancel', function($site_row) {
			var edit_container = $(this).closest('.uc_quick_edit');
			var id = edit_container.data('id');
			
			$('div#'+module.type+'-quick-edit-'+id).hide();
			$('div#'+module.type+'-item-'+id).show();
		});

		/**
		 * Saves quick edit information for the selected post/page
		 *
		 * @see {UpdraftCentral.register_row_clicker}
		 */
		UpdraftCentral.register_row_clicker('.uc_quick_edit button.save', function($site_row) {
			var parent = $(this).closest('div.uc_quick_edit');
			var id = parent.data('id');
			var post_item = $('.uc-'+module.type+'-items-container div#'+module.type+'-item-'+id);

			if (self.dirty_edits.count()) {
				UpdraftCentral_Library.dialog.alert('<h2>'+udclion.error+'</h2><p>'+udclion[module.type+'s'].dirty_edits+'</p>');
				return false;
			}

			if (self.quick_edits.count()) {
				self.quick_edits.update('id', id);

				if (self.has_quickedit_date_changed()) {
					var $form = $('div#'+module.type+'-quick-edit-'+id);
					var input_date = {
						month: $form.find('.uc-'+module.type+'-date select[name="mm"]').val(),
						day: $form.find('.uc-'+module.type+'-date input[name="jj"]').val(),
						year: $form.find('.uc-'+module.type+'-date input[name="aa"]').val(),
						hour: $form.find('.uc-'+module.type+'-date input[name="hh"]').val(),
						minute: $form.find('.uc-'+module.type+'-date input[name="mn"]').val(),
						second: $form.find('.uc-'+module.type+'-date input[name="ss"]').val()
					};
	
					if (self.validate_input_date(input_date)) {
						var result = self.prepare_date(input_date);
						self.quick_edits.update('date', result.date);
						self.quick_edits.update('timestamp', result.timestamp);
	
						// Update the status to "future" if date edits exists and it is scheduled or intended
						// to be publish in the future. Only when the "status" field wasn't changed manually. The
						// "status" change will override any date edits "future" (scheduled) computation.
						if (self.quick_edits.exists('status') && 'publish' == self.quick_edits.item('status') && self.is_input_future_date(input_date)) {
							self.quick_edits.update('status', 'future');
						}
					} else {
						UpdraftCentral_Library.dialog.alert('<h2>'+udclion.error+'</h2><p>'+udclion[module.type+'s'].invalid_date_input+'</p>');
						return false;
					}
				}

				var param = {
					name: 'save',
					arguments: self.quick_edits.get_collection_object()
				};

				send_command(param, $site_row).then(function(response) {
					if ('undefined' !== typeof response.post && response.post) {
						// reload editor and update items list after publish
						var post_data = {
							post: JSON.parse(response.post),
							misc: response.misc
						}

						if ('undefined' !== typeof response.preloaded && response.preloaded) {
							var preloaded = JSON.parse(response.preloaded);
							var preloaded_data = self.manage_data.item('preloaded_data');

							if ('undefined' !== typeof preloaded_data && preloaded_data) {
								preloaded_data = JSON.parse(preloaded_data);
								preloaded_data.categories = preloaded.categories;
								preloaded_data.tags = preloaded.tags;
								self.manage_data.update('preloaded_data', JSON.stringify(preloaded_data));
							}
						}

						update_items_list(post_data, post_item.data('status'));
						if (response.hasOwnProperty('options')) update_filter_options(response.options);
					} else {
						UpdraftCentral_Library.dialog.alert('<h2>'+udclion.error+'</h2><p>'+udclion[module.type+'s'].unkown_error+'</p>');
						parent.find('button.cancel').trigger('click');
					}
				});
			} else {
				UpdraftCentral_Library.dialog.alert('<h2>'+udclion[module.type+'s'].quick_edit_heading+'</h2><p>'+udclion[module.type+'s'].no_changes+'</p>');
				parent.find('button.cancel').trigger('click');
			}

		});

		/**
		 * Processes post/page action links (the links found under each items of the posts/pages table)
		 *
		 * @see {UpdraftCentral.register_row_clicker}
		 */
		UpdraftCentral.register_row_clicker('.'+module.type+'-actions > a.'+module.type+'-action-item', function($site_row) {
			var action = $(this).data('action');
			var id = $(this).data('id');
			var post_data = $(this).closest('div#'+module.type+'-item-'+id).data('json');

			if (-1 !== $.inArray(action, ['edit-classic', 'edit-gutenberg'])) {
				var editor = action.replace('edit-', '');
				if ('gutenberg' === editor) {
					var hide_dialog = false;
					if ('undefined' !== typeof localStorage && localStorage) {
						var no_show = localStorage.getItem('uc-gutenberg-dialog-no-show');
						if ('undefined' !== typeof no_show && no_show && 1 === parseInt(no_show)) {
							hide_dialog = true;
						}
					}

					if (!hide_dialog) {
						UpdraftCentral_Library.dialog.custom('<h2>'+udclion[module.type+'s'].gutenberg_support+'</h2><p>'+udclion[module.type+'s'].gutenberg_notice+'</p><p><input type="checkbox" name="uc-dont-show-again" id="uc-dont-show-again" value="1"><label class="uc-dont-show-again-label" for="uc-dont-show-again">'+udclion[module.type+'s'].dont_show+'</label></p>', null, {
							classic: {
								label: 'Use classic',
								className: 'btn-secondary',
								callback: function() {
									self.load_updraftcentral_editor('classic', post_data, $site_row);
								}
							},
							gutenberg: {
								label: 'Continue',
								className: 'btn-primary',
								callback: function() {
									self.load_updraftcentral_editor(editor, post_data, $site_row);
								}
							}
						});
					} else {
						self.load_updraftcentral_editor(editor, post_data, $site_row);
					}
				} else {
					self.load_updraftcentral_editor(editor, post_data, $site_row);
				}
			} else {
				if (-1 !== $.inArray(action, ['trash', 'restore', 'delete'])) {
					set_state(id, action, $site_row);
				}
			}
		});

		/**
		 * Creates a new post/post
		 *
		 * @see {UpdraftCentral.register_row_clicker}
		 */
		UpdraftCentral.register_row_clicker('.updraftcentral_create_'+module.type, function($site_row) {
			var $location = $site_row.find('.updraftcentral_row_extracontents');
			$location.empty();
			self.current_section = 'create';

			var create_form = UpdraftCentral.template_replace(module.type+'s-create', {});
			UpdraftCentral_Library.dialog.confirm('<h2>'+udclion[module.type+'s'].new_post+'</h2><p>'+create_form+'</p>', function(result) {
				if (!result) return;

				var title = $('input.uc-title-input').val();
				if (0 == title.trim().length) {
					UpdraftCentral_Library.dialog.alert('<h2>'+udclion.error+'</h2><p>'+udclion[module.type+'s'].title_missing+'</p>');
					return;
				}

				var editor = $('input.uc-editor-choice:checked').val();
				var param = {
					name: 'save',
					arguments: { title: title, content: '', new: 1 },
					timeout: ('undefined' !== typeof udclion.user_defined_timeout && udclion.user_defined_timeout) ? udclion.user_defined_timeout : 30,
				};

				send_command(param, $site_row).then(function(response) {
					if ('undefined' !== typeof response.post && response.post) {
						// reload editor and update items list after publish
						var post_data = {
							post: JSON.parse(response.post),
							misc: response.misc
						}

						// N.B. The "preloaded" property doesn't always return for every response that is
						// why we're checking it here. If we have it, then we store it. It will only be
						// requested when the "preload" parameter is set (when pressing the "Manage" button)
						// or a new post is created.
						if (response.hasOwnProperty('preloaded') && response.preloaded) {
							self.manage_data.update('preloaded_data', response.preloaded);
						}

						if (response.hasOwnProperty('options') && response.options) {
							if ('page' == module.type) {
								if (!self.manage_data.exists('parent_options') && response.options.hasOwnProperty('page')) self.manage_data.add('parent_options', response.options.page);
							}
							if (!self.manage_data.exists('template_options') && response.options.hasOwnProperty('template')) self.manage_data.add('template_options', response.options.template);
						}

						self.load_updraftcentral_editor(editor, post_data, $site_row);
					} else {
						UpdraftCentral_Library.dialog.alert('<h2>'+udclion.error+'</h2><p>'+udclion[module.type+'s'].unkown_error+'</p>');
						console.log(response);
					}
				});
			});
		}, true);

		/**
		 * Manages existing posts/pages
		 *
		 * @see {UpdraftCentral.register_row_clicker}
		 */
		UpdraftCentral.register_row_clicker('.updraftcentral_manage_'+module.type+'s', function($site_row) {
			// Clear or reset manage data collection. We will use this to store our
			// current response, so that we can easily retrieve them if we need to.
			self.manage_data.clear();
			self.current_section = 'manage';
			self.current_group = 'all';

			self.pagination = new UpdraftCentral_Pagination({
				container: '.uc-'+module.type+'-pagination',
				items_per_page: 50,
				type: 'remote',
				callback: function(page) {
					var keyword = $('input.uc-'+module.type+'-search-posts').val();
					var selected_date = $('select.uc-'+module.type+'-date-filter').val();
					var month_year = null;

					if (selected_date) {
						var dt = new Date(selected_date.replace(' ', ' 1, '));
						month_year = (dt.getMonth()+1)+':'+dt.getFullYear();
					}

					var category = ('post' == module.type) ? $('select.uc-post-category-filter').val() : null;
					render_post_items($site_row, page, self.current_group, keyword, month_year, category);
				},
			});

			render_post_items($site_row, null, null, null, null, null, true, true);
		}, true);
	}

	/**
	 * When in fullscreen mode check to see if media dialog and backdrop are added into the main body
	 * element. If so, then we need to transfer it into the container/element that is currently in fullscreen mode.
	 *
	 * @return {void}
	 */
	this.listen_for_fullscreen_resources = function() {
		UpdraftCentral.subscribe_to_node_changes(document.body, function(changes, observer) {
			if (!$.fullscreen.isFullScreen()) {
				$('#updraftcentral_dashboard').parent().find('div[id^="__wp-uploader-id"]').not('.media-frame').appendTo(document.body).hide();
				$('#updraftcentral_dashboard').parent().find('div.modal-backdrop-container').appendTo(document.body);
			} else {
				var media_modal = $('div[id^="__wp-uploader-id"]').not('.media-frame');
				if ('undefined' !== typeof media_modal && media_modal.length) {
					media_modal.appendTo($('#updraftcentral_dashboard').parent());
				}

				var modal_backdrop = $(document.body).find('div.modal-backdrop-container');
				if ('undefined' !== typeof modal_backdrop && modal_backdrop.length) {
					modal_backdrop.appendTo($('#updraftcentral_dashboard').parent());
				}
			}
		}, 'uc_body_resources');
	}

	/**
	 * Checks whether any of the quick edit date fields was changed
	 *
	 * @return {boolean}
	 */
	this.has_quickedit_date_changed = function() {
		var changed = false;

		if (self.quick_edits.count()) {
			var date_fields = ['mm', 'jj', 'aa', 'hh', 'mn', 'ss'];
			for (var i=0; i<date_fields.length; i++) {
				if (self.quick_edits.exists(date_fields[i])) {
					changed = true;
					break;
				}
			}
		}

		return changed;
	}

	/**
	 * Clear existing notices if present to give way for a new editing process.
	 *
	 * @return {void}
	 */
	this.clear_notices = function() {
		var notices = $('#gutenberg_editor_container .components-notice-list');
		if (notices.length) {
			notices.find('.components-notice.is-dismissible').each(function() {
				$(this).find('button.components-notice__dismiss').trigger('click');
			});
		}

		notices = wp.data.select('core/notices').getNotices();
		if ('undefined' !== typeof notices && notices && notices.length) {
			for (var i=0; i<notices.length; i++) {
				wp.data.dispatch('core/notices').removeNotice(notices[i].id);
			}
		}
	}

	/**
	 * Observes editor's attempt to recover from a broken feature so that we can re-initialize
	 * our own resources (e.g. wp.data subscriptions, etc.)
	 *
	 * @return {void}
	 */
	this.observe_editor_error_state = function() {
		var editor = $('.uc-block-editor-container #editor');
		UpdraftCentral.subscribe_to_node_changes(editor, function(changes, observer) {
			var added = [], removed = [];
			for (var i=0; i<changes.length; i++) {
				var record = changes[i];
				if (record.addedNodes.length) added.push(record.addedNodes[0].className);
				if (record.removedNodes.length) removed.push(record.removedNodes[0].className);
			}

			if (-1 !== added.indexOf('components-drop-zone__provider') && -1 !== removed.indexOf('components-drop-zone__provider')) {
				$('#updraftcentral_dashboard').trigger('editor-has-recovered');
			}
		}, 'uc_editor');
	}

	/**
	 * Sends upload permission to the server
	 *
	 * @return {void}
	 */
	this.send_upload_permissions = function(data) {
		var featured_image_container,
			intchecker;

		intchecker = setInterval(function() {
			if (!wp.data.select('core/edit-post').isEditorPanelOpened('featured-image')) {
				wp.data.dispatch('core/edit-post').toggleEditorPanelOpened('featured-image');
			}

			featured_image_container = $('div.edit-post-sidebar .editor-post-featured-image');
			if (featured_image_container.length) {
				clearInterval(intchecker);
				wp.data.dispatch('core').receiveUploadPermissions(data.has_upload_permissions);
				wp.data.dispatch('core/edit-post').toggleEditorPanelOpened('featured-image');
			}
		}, 1000);
	}

	/**
	 * Disables/enables the main publish button
	 *
	 * @return {void}
	 */
	this.disable_publish_button = function(disable) {
		$('button.editor-post-publish-button').attr('aria-disabled', disable);
		$('button.editor-post-publish-button').prop('disabled', disable);
		$('button.editor-post-publish-panel__toggle').attr('aria-disabled', disable);
		$('button.editor-post-publish-panel__toggle').prop('disabled', disable);
	}

	/**
	 * Updates post title permalink preview button's click handler
	 *
	 * @return {void}
	 */
	this.update_permalink_preview_handler = function() {
		$(document.body).on('click', 'textarea.editor-post-title__input', function() {
			var post = wp.data.select('core/editor').getCurrentPost();
			var title_block = $('.editor-post-title__block');

			if ('undefined' !== typeof title_block && title_block.length && title_block.hasClass('is-selected')) {
				var permalink_interval = setInterval(function() {
					var permalink = $('.editor-post-permalink__link');
					if ('undefined' !== typeof permalink && permalink.length) {
						clearInterval(permalink_interval);
						$('.editor-post-permalink__link').attr('href', '#').removeAttr('target').attr('onclick', 'UpdraftCentral_Library.open_browser_at(UpdraftCentral.$site_row, { module: "direct_url", url: "'+post.link+'" }, jQuery(\'#updraftcentral_dashboard_wrapper\'));');
					}
				}, 500);
			}
		});
	}

	/**
	 * Reconstruct inputted date elements and prepare to either be use
	 * for display or submission
	 *
	 * @param {object} d An object containing date and time properties based from user input
	 *
	 * @return {object}
	 */
	this.prepare_date = function(d) {
		/**
		 * Prepends a numerical (integer) representation of a date if less than 10
		 * in order to align with the UI presentation. Internal to the "prepare_date" only.
		 *
		 * @param {mixed} n A numerical date representation
		 *
		 * @return {mixed}
		 */
		function pad(n) {
			return n<10 ? '0'+n : n;
		}

		var date = new Date(d.year, parseInt(d.month) - 1, d.day, d.hour, d.minute, d.second);
		var timestamp = {
			month: pad(date.getMonth()+1),
			day: pad(date.getDate()),
			year: date.getFullYear(),
			hour: pad(date.getHours()),
			minute: pad(date.getMinutes()),
			second: pad(date.getSeconds())
		};

		var date_string = timestamp.year+'-'+timestamp.month+'-'+timestamp.day+'T'+timestamp.hour+':'+timestamp.minute+':'+timestamp.second;
		var today = new Date();

		return {
			date: date_string,
			future: date.getTime() > today.getTime(),
			formatted: date.toLocaleString('default', { year: 'numeric', month: 'short', day: 'numeric'}) + ' @ ' + pad(date.getHours())+':'+ pad(date.getMinutes()),
			timestamp: timestamp
		}
	}

	/**
	 * Converting image's local reference to wp-content path to absolute urls
	 *
	 * @param {string} content The post content/body
	 *
	 * @return {string}
	 */
	this.adjust_local_reference = function(content) {
		var temp = document.createElement('div');
		temp.innerHTML = content;

		$(temp).find('img[src^="wp-content/"]').each(function() {
			if (udclion.hasOwnProperty('home_url') && udclion.home_url) {
				var src = $(this).attr('src');
				content = content.replace(src, udclion.home_url+'/'+src);
			}

		});

		return content;
	}

	/**
	 * Case-insensitive check for value existense in an array
	 *
	 * @param {string} value  The value to check
	 * @param {array}  source The array to which the value is going to be check
	 *
	 * @return {boolean}
	 */
	this.is_ivalue_exists = function(value, source) {
		var result = $.grep(source, function(item, index) {
			return value.toLowerCase() == item.toLowerCase();
		});

		return result.length ? true : false;
	}

	/**
	 * Clears URL for any unwated padding when editing a post, in which case if not removed
	 * will invalidate the current post when hitting the reload button and causes some error
	 *
	 * @return {void}
	 */
	this.cleanupHistory = function() {
		var pathname = window.location.pathname;
		if (-1 != pathname.indexOf('post.php')) {
			pathname = pathname.substring(0, pathname.indexOf('post.php'));
		}
		history.pushState('', document.title, pathname);
	}

	/**
	 * Loads the UpdraftCentral editor
	 *
	 * @param {string} editor    The type of editor to load (e.g. 'classic' or 'gutenberg')
	 * @param {object} post_data An object containing the post object and its miscellaneous information
	 * @param {object} $site_row A jQuery object representing the current site that is currently worked on
	 *
	 * @return {void}
	 */
	this.load_updraftcentral_editor = function(editor, post_data, $site_row) {
		var editor_data = {
			editor: editor,
			post_data: JSON.stringify(post_data),
			site_id: $site_row.data('site_id'),
			preloaded_data: self.manage_data.item('preloaded_data'),
			template_options: self.manage_data.item('template_options')
		};

		// Reset edits and state when editing new post
		self.uc_editor.edits.clear();
		self.uc_editor.state.clear();

		self.send_local_command('load_post_editor', editor_data, $site_row).then(function(response) {
			self.process_load_editor_response(editor, response, $site_row);
		}).always(function() {
			var backdrop = $(document.body).find('div.modal-backdrop-container');
			if ('undefined' !== typeof backdrop && backdrop.length) backdrop.remove();
		});
	}

	/**
	 * Scrolls content to top when the editor loads
	 *
	 * @return {void}
	 */
	this.scroll_content_to_top = function() {
		$(window).scrollTop(0);
		$('div.edit-post-sidebar').scrollTop(0);
		$('div.editor-post-taxonomies__hierarchical-terms-list').scrollTop(0);

		var skeleton_content,
			intchecker;

		intchecker = setInterval(function() {
			skeleton_container = $('div.block-editor-editor-skeleton__content');
			if (skeleton_container.length) {
				clearInterval(intchecker);
				skeleton_container.scrollTop(0);
			}
		}, 1000);
	}

	/**
	 * Remove any previously embedded remote styles and restores the local styles
	 *
	 * @return {void}
	 */
	this.unload_remote_editor_styles = function() {
		self.disable_current_themes(false);
		self.disable_current_wp_theme(false);
		$('style[id^="uc_remote_styles-"]').remove();
		$('style[id^="uc_local_styles-"]').remove();
	}

	/**
	 * Embed/create and load remote styles and disables local styles while editing a post
	 *
	 * @param {object} container The container element of the current editor
	 *
	 * @return {void}
	 */
	this.load_remote_editor_styles = function(container) {

		if (self.manage_data.exists('preloaded_data')) {
			var preloaded_data = self.manage_data.item('preloaded_data');
			var editor = $(container).data('editor');

			if ('undefined' !== typeof preloaded_data && preloaded_data) {
				data = JSON.parse(preloaded_data);

				if (data.hasOwnProperty('editor_styles') && data.editor_styles) {

					switch (editor) {
						case 'gutenberg':
							var visual_editor_checker = setInterval(function() {
								var visual_editor = $(container).find('.edit-post-visual-editor');
								if ('undefined' !== typeof visual_editor && visual_editor.length) {
									clearInterval(visual_editor_checker);
									var editor_styles = data.editor_styles;

									if (editor_styles.length) {
										self.disable_current_themes(true);

										if (!visual_editor.hasClass('editor-styles-wrapper')) visual_editor.addClass('editor-styles-wrapper');

										// Add custom override to maintain the editor's look and feel across all WP versions
										editor_styles.push({
											css: '.editor-styles-wrapper, .editor-styles-wrapper textarea { background: inherit; color: inherit; }\n\n.editor-styles-wrapper p { white-space: pre-wrap !important; word-wrap: break-word; }\n\n.editor-styles-wrapper img { vertical-align: inherit; border-style: inherit; }\n\n.screen-reader-text, .screen-reader-text span, .ui-helper-hidden-accessible { border: 0; clip: rect(1px, 1px, 1px, 1px); -webkit-clip-path: inset(50%); clip-path: inset(50%); height: 1px; margin: -1px; overflow: hidden; padding: 0; position: absolute; width: 1px; word-wrap: normal !important; }\n\n.editor-styles-wrapper button, .editor-styles-wrapper input[type="button"], .editor-styles-wrapper input[type="reset"], .editor-styles-wrapper input[type="submit"] { text-transform: inherit !important; }'
										});

										var uc_styles = ('page' == module.type) ? udcstyles_page : udcstyles;

										// Re-post pages/posts styles to keep the main look and feel consistent
										if ('undefined' !== typeof uc_styles && uc_styles.hasOwnProperty('edit_'+module.type+'_css')) {
											$('<style/>', {
												id: 'uc_local_styles-inline-edit_post'
											}).html(uc_styles['edit_'+module.type+'_css']).appendTo(document.body);
										}

										for (var i=0; i<editor_styles.length; i++) {
											if (editor_styles[i].css.trim().length) {
												$('<style/>', {
													id: 'uc_remote_styles-'+i
												}).html(editor_styles[i].css).appendTo(document.body);

												if (editor_styles[i].hasOwnProperty('inline') && editor_styles[i].inline.length) {
													$('<style/>', {
														id: 'uc_remote_styles-inline-'+i
													}).html(editor_styles[i].inline).appendTo(document.body);
												}
											}
										}

										// Re-post pages/posts styles to keep the main look and feel consistent
										if ('undefined' !== typeof uc_styles && uc_styles.hasOwnProperty(module.type+'s_inline_css')) {
											$('<style/>', {
												id: 'uc_local_styles-inline-posts'
											}).html(uc_styles[module.type+'s_inline_css']).appendTo(document.body);
										}
									}
								}
							}, 500);
							break;
						case 'classic':
							var active_editor_checker = setInterval(function() {
								if ('undefined' !== typeof tinymce.activeEditor && tinymce.activeEditor && tinymce.activeEditor.hasOwnProperty('dom') && tinymce.activeEditor.dom) {
									clearInterval(active_editor_checker);
									var editor_styles = data.editor_styles;

									if (editor_styles.length) {
										self.disable_current_wp_theme(true);

										if (tinymce.activeEditor.dom.hasOwnProperty('select')) {
											if (tinymce.activeEditor.dom.hasOwnProperty('remove')) {
												var link = tinymce.activeEditor.dom.select('head > link');
												if ('undefined' !== typeof link && link) {
													tinymce.activeEditor.dom.remove(link);
												}
											}

											if (tinymce.activeEditor.dom.hasOwnProperty('hasClass') && tinymce.activeEditor.dom.hasOwnProperty('addClass')) {
												if (!tinyMCE.activeEditor.dom.hasClass(tinyMCE.activeEditor.dom.select('body'), 'editor-styles-wrapper')) {
													tinyMCE.activeEditor.dom.addClass(tinyMCE.activeEditor.dom.select('body'), 'editor-styles-wrapper');
												}

												if (!tinyMCE.activeEditor.dom.hasClass(tinyMCE.activeEditor.dom.select('body'), 'entry-content')) {
													tinyMCE.activeEditor.dom.addClass(tinyMCE.activeEditor.dom.select('body'), 'entry-content');
												}
											}
										}

										editor_styles.push({
											css: 'body, editor-styles-wrapper { background: inherit !important; max-width: inherit; }\n\nbody#tinymce { padding: 0px 20px; }\n\nbody::before { position: relative; }'
										});

										for (var i=0; i<editor_styles.length; i++) {
											if (editor_styles[i].css.trim().length) {
												if (tinymce.activeEditor.dom.hasOwnProperty('addStyle')) {
													tinymce.activeEditor.dom.addStyle(editor_styles[i].css);
												}
											}
										}
									}
								}
							}, 500);
							break;
						default:
							break;
					}

				}
			}
		}
	}

	/**
	 * Captures the selected image from the media modal and extract its details for later consumption.
	 * Primarily used for editing using the classic editor.
	 *
	 * @param {object} selected	A jQuery object representing the currently selected image in the media dialog
	 *
	 * @return void
	 */
	this.set_selected_image = function(selected) {
		var orig_filename = selected.attr('aria-label');
		var media_id = selected.data('id');
		var img = selected.find('.thumbnail img');

		if ('undefined' !== typeof img && img.length) {
			var src = img.attr('src');
			var path = '',
				ext = '';

			if ('undefined' !== typeof src && src.length) {
				path = src.substring(0, src.lastIndexOf('/') + 1);
				if (-1 !== src.indexOf('.')) {
					ext = src.substr(src.lastIndexOf('.'));
				}
			}

			var image_url = path + orig_filename;
			if (-1 == image_url.indexOf(ext)) {
				image_url += ext;
			}

			self.uc_editor.state.update('featured_img', {
				thumbnail_url: src,
				folder: path,
				image_url: image_url
			});

			self.uc_editor.edits.update('featured_media_url', image_url);
			self.uc_editor.edits.update('featured_media', media_id);
		}
	}

	/**
	 * A simple non-empty and numeric validation for date parts entry
	 *
	 * @param {object}	input_date	The date parts to check (e.g. day, year, etc.)
	 *
	 * @return {boolean}
	 */
	this.validate_input_date = function(input_date) {
		var passed = true;
		for (var prop in input_date) {
			var item = input_date[prop];
			if ('undefined' == typeof item || 0 == item.length || !UpdraftCentral_Library.is_numeric(item)) {
				passed = false;
				break;
			}
		}

		// Validate year, month, hour and minute entries individually
		if (passed) {
			// Validate day (1 to 31)
			if (parseInt(input_date.day) < 1 || parseInt(input_date.day) > 31) passed = false;

			// Validate year (4 digits) - limit based on EPOCH year 1970
			if (passed && (4 !== input_date.year.length || parseInt(input_date.year) < 1970)) passed = false;

			// Validate hour (0 to 23)
			if (passed && (parseInt(input_date.hour) < 0 || parseInt(input_date.hour) > 23)) passed = false;

			// Validate minutes (0 to 59)
			if (passed && (parseInt(input_date.minute) < 0 || parseInt(input_date.minute) > 59)) passed = false;
		}

		return passed;
	}

	/**
	 * Checks whether the inputted date is a future date
	 *
	 * @param {object} input_date The date parts to check (e.g. day, year, etc.)
	 *
	 * @return {boolean|null}
	 */
	this.is_input_future_date = function(input_date) {
		var input;
		if ('undefined' !== typeof input_date && input_date) {
			input = input_date;
		} else {
			var parent = $('fieldset#timestampdiv');
			var wrapper = parent.find('div.timestamp-wrap');
			input = {
				month: wrapper.find('select#mm').val(),
				day: wrapper.find('input#jj').val(),
				year: wrapper.find('input#aa').val(),
				hour: wrapper.find('input#hh').val(),
				minute: wrapper.find('input#mn').val(),
				second: parent.find('input#ss').val()
			};
		}

		if (self.validate_input_date(input)) {
			var user_date = new Date(input.year, parseInt(input.month)-1, input.day, input.hour, input.minute, input.second);
			var date_now = new Date();

			return user_date > date_now ? true : false;
		}

		return null;
	}

	/**
	 * Send command to the local server where UpdraftCentral is hosted. Gets to execute
	 * commands for UpdraftCentral modules.
	 *
	 * @param {string}	action    The intended action to execute
	 * @param {object}  params    An object that contains properties that will serve as parameters for the request
	 * @param {object}  $site_row A jQuery object representing the current site that is currently worked on
	 *
	 * @return {Promise}
	 */
	this.send_local_command = function(action, params, $site_row) {
		var deferred = $.Deferred();

		var $location = ('undefined' !== typeof $site_row && $site_row) ? $site_row : $('#updraftcentral_dashboard_existingsites');
		UpdraftCentral.send_ajax(action, params, null, 'via_mothership_encrypting', $location, function(resp, code, error_code) {
			if ('ok' === code) {
				if (resp.hasOwnProperty('message')) {
					deferred.resolve(resp.message);
				} else {
					deferred.reject();
				}
			}
		});

		return deferred.promise();
	}

	/**
	 * Instantiate tinymce after ajax called for wp_editor configs.
	 * set plugins and appropriate toolbars from wp_editor
	 *
	 * @param {int} mceid, textarea id
	 *
	 * @return {void}
	 */
	this.init_tiny_mce = function(mceid) {
		if ("object" == typeof(tinymce) && "function" === typeof(tinymce.execCommand)) {
			// FIX: Making sure that we're clearing all existing editors
			// before initializing a new one.
			// N.B. This does not only apply to multiple editors but
			// to a single (previously) initialized editor as well.
			if ('undefined' !== typeof tinymce.EditorManager) { tinymce.EditorManager.editors = []; }

			tinymce.init({
				selector: mceid,
				height: 800,
				branding: false,
				menubar: false,
				resize: false,
				force_br_newlines: true,
				force_p_newlines: true,
				plugins: "textcolor hr lists fullscreen paste wordpress wpdialogs wplink tabfocus",
				toolbar1: "formatselect bold italic numlist bullist blockquote alignleft aligncenter alignright link unlink wp_more fullscreen wp_adv",
				toolbar2: "strikethrough hr forecolor backcolor pastetext pasteword removeformat indent outdent undo redo | sizeselect fontselect fontsizeselect",
				fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
				paste_as_text: true,
				color_picker_callback: function (callback, value) {
					callback('#888');
				},
				setup: function(ed) {
					if ($(document).find('.wp-core-ui.wp-editor-wrap').hasClass('html-active')) {
						$(document).find('.wp-core-ui.wp-editor-wrap').removeClass('html-active').addClass('tmce-active');
					}
				}
			});

			tinymce.execCommand("mceRemoveEditor", false, mceid);
			tinymce.execCommand("mceAddEditor", false, mceid);

			if ('undefined' !== typeof quicktags && quicktags) {
				quicktags({
					id: mceid,
					buttons: 'strong,em,link,block,del,ins,img,ul,ol,li,code,close'
				});
			}
		}
	}

	/**
	 * Resets all editor panels when the editor is loaded for a new edit task
	 *
	 * @return {void}
	 */
	function reset_panels_on_load() {
		var panel_ids = ['featured-image', 'discussion-panel', 'post-link', 'post-excerpt', 'page-attributes'];
		if ('post' == module.type) {
			panel_ids = ['taxonomy-panel-category', 'taxonomy-panel-post_tag', 'featured-image', 'discussion-panel', 'post-link', 'post-excerpt', 'post-attributes'];
		}

		for (var i=0; i<panel_ids.length; i++) {
			if (wp.data.select('core/edit-post').isEditorPanelOpened(panel_ids[i])) wp.data.dispatch('core/edit-post').toggleEditorPanelOpened(panel_ids[i]);
		}
	}

	/**
	 * Adds some housekeeping logic after the editor has been initialized/re-initialized and
	 * subscribes to the "wp.data" store to manage our own post's data handling
	 *
	 * @param {object} data            An object containing information of the current post being edited
	 * @param {string} previous_status The previous status of the post before the changes were applied
	 * @param {object} $location       A jquery object representing the classic editor container
	 *
	 * @return {void}
	 */
	this.apply_subscriptions_observer = function(data, previous_status, $location) {
		var post,
			toolbar_loaded = is_saving = false,
			core = wp.data.select('core'),
			featured_image_opened = false;

		core.canUser = function(action, entity) {
			if ('create' === action && 'media' === entity) {
				return data.has_upload_permissions ? true : false;
			}
		}

		self.observe_editor_error_state();
		self.send_upload_permissions(data);
		reset_panels_on_load();
		self.update_permalink_preview_handler();

		window.wp_data_unsubscribe = wp.data.subscribe(function(event) {
			post = wp.data.select('core/editor').getCurrentPost();

			var toolbar_container = $('div.edit-post-header-toolbar');
			var editor_container = $(document.body);
			var backdrop = editor_container.find('div.modal-backdrop-container');

			$('a.components-notice__action.is-link').attr('target', '_blank');
			$('.components-snackbar-list__notice-container a.components-snackbar__action').attr('target', '_blank');
			$('.post-publish-panel__postpublish-buttons a').attr('target', '_blank');
			
			if (toolbar_container.length && !toolbar_loaded) {
				// Add logo and custom buttons:
				attach_updraftcentral_buttons(data.logo, data.misc);

				toolbar_loaded = true;

				// Make sure that any visible spinner(s) are remove when the
				// editor is fully loaded.
				if ($('.updraftcentral_spinner').is(':visible')) {
					$('.updraftcentral_spinner').remove();
				}

				self.scroll_content_to_top();
				update_view_posts_link();

				if ('post' == module.type) wp.data.select('core').getTaxonomies();
				$(document.body).trigger('updraftcentral_'+module.type+'_editor_loaded', [$location]);
			} else {
				// Just in case the fullscreen mode is triggered after the editor has loaded then
				// we will update the view post link.
				update_view_posts_link();
			}

			if (!wp.data.select('core/editor').isEditedPostDirty()) {
				self.disable_publish_button(true);
			} else {
				self.disable_publish_button(false);
			}

			if (wp.data.select('core/editor').isSavingPost()) {
				if ('undefined' == typeof backdrop || 0 == backdrop.length) {
					editor_container.append('<div class="modal-backdrop-container"><div class="modal-backdrop fade show dynamic"></div><div class="updraftcentral_spinner"></div></div>');
				}
			}

			// Make sure that all existing or on-demand notices links doesn't
			// close/replace our editor abruptly, it needs to be opened on a new tab or window.
			if (wp.data.select('core/editor').didPostSaveRequestSucceed() && !wp.data.select('core/editor').isSavingPost() && post.hasOwnProperty('post_data')) {
				$('#uc_preview_lnk').attr('href', '#').removeAttr('target').attr('onclick', 'UpdraftCentral_Library.open_browser_at(UpdraftCentral.$site_row, { module: "direct_url", url: "'+post.link+'" }, jQuery(\'#updraftcentral_dashboard_wrapper\'));');

				// Update locally stored data
				if ('manage' === self.current_section) {
					update_items_list(post.post_data, previous_status);
					if (post.post_data.hasOwnProperty('options')) update_filter_options(post.post_data.options);
				}

				// Removing post_data field after update
				delete post.post_data;

				if ('undefined' !== typeof backdrop && backdrop.length) {
					backdrop.remove();
					self.cleanupHistory();
				}
			}

			if (wp.data.select('core/editor').didPostSaveRequestFail()) {
				if ('undefined' !== typeof backdrop && backdrop.length) {
					backdrop.remove();
					self.cleanupHistory();
				}
			}

			if (wp.data.select('core/edit-post').isEditorPanelOpened('post-link')) {
				var post_link_interval = setInterval(function() {
					var post_link = $('.edit-post-post-link__link');
					if ('undefined' !== typeof post_link && post_link.length) {
						clearInterval(post_link_interval);
						$('.edit-post-post-link__link').attr('href', post.link).removeAttr('target').attr('onclick', 'UpdraftCentral_Library.open_browser_at(UpdraftCentral.$site_row, { module: "direct_url", url: "'+post.link+'" }, jQuery(\'#updraftcentral_dashboard_wrapper\'));return false;');
					}
				}, 500);
			}

			if ('post' == module.type) {
				if (wp.data.select('core/edit-post').isEditorPanelOpened('taxonomy-panel-category')) {
					var categories_interval = setInterval(function() {
						var terms_list = $('.editor-post-taxonomies__hierarchical-terms-list');
						if ('undefined' !== typeof terms_list && terms_list.length) {
							var block_wait = terms_list.parent().find('.uc_block_load_wait');
							if (0 == terms_list.html().trim().length) {
								if (!block_wait.length) terms_list.parent().append('<div class="uc_block_load_wait"><img src="'+udclion.wpo.images+'spinner-2x.gif" class="uc-block-spinner" /></div>');
							} else {
								clearInterval(categories_interval);
								block_wait.remove();
							}
						}
					}, 500);
				}
	
				if (wp.data.select('core/edit-post').isEditorPanelOpened('taxonomy-panel-post_tag')) {
					var tags_interval = setInterval(function() {
						var token_list = $('.components-form-token-field__input-container');
						var current_tags = wp.data.select('core/editor').getEditedPostAttribute('tags');
	
						if ('undefined' !== typeof token_list && token_list.length && current_tags.length) {
							var token = token_list.find('.components-form-token-field__token');
							var block_wait = token_list.parent().find('.uc_block_load_wait');
	
							if (0 == token.length && post.tags.length && false != post.tags[0]) {
								if (!block_wait.length) token_list.parent().append('<div class="uc_block_load_wait"><img src="'+udclion.wpo.images+'spinner-2x.gif" class="uc-block-spinner" /></div>');
							} else {
								clearInterval(tags_interval);
								block_wait.remove();
							}
						}
					}, 500);
				}
			}
		});
	}

	/**
	 * Updates the current post/page object within the preloaded list with the
	 * latest information of that particular post/page
	 *
	 * @param {object} post_data       An object containing the latest post object and its miscellaneous information
	 * @param {string} previous_status The previous status of this post before the changes were applied
	 *
	 * @return {void}
	 */
	function update_items_list(post_data, previous_status) {
		var data = self.manage_data.item('response');
		var posts = [];

		// We're going to replace the old post/page with the latest
		// and updated version of the post/page in the current collection.
		for (var i=0; i<data[module.type+'s'].length; i++) {
			var item = data[module.type+'s'][i];
			if (post_data.post.ID == item.post.ID) {
				posts.push({
					post: post_data.post,
					misc: post_data.misc
				});
			} else {
				posts.push({
					post: item.post,
					misc: item.misc
				})
			}
		}

		self.pagination.set_remote_data({
			info: data.info,
			items: posts
		});

		// Returns the currently rendered items and the pagination
		render_items_and_pagination(1, $site_row);

		// Update post counts if applicable
		if (previous_status != post_data.post.post_status) {
			var counts = data[module.type+'s_count'];
			counts[previous_status] -= 1;
			counts[post_data.post.post_status] += 1;

			data[module.type+'s_count'] = counts;
			self.manage_data.update('response', data);

			update_item_count(counts);
			$('ul#uc-navlinks a.uc-navlink-item[data-group="'+post_data.post.post_status+'"]').trigger('click');
		}
	}

	/**
	 * Loads functions and listeners primarily used by the classic editor's
	 * internal workings
	 *
	 * @param {object} response  The response object from the load editor request
	 * @param {object} $location A jquery object representing the classic editor container
	 *
	 * @return {void}
	 */
	function load_auxillary_functions(response, $location) {
		if ('undefined' == typeof response.data.post) {
			console.log(udclion[module.type+'s'].unable_to_load_editor);
			return;
		}

		// Some editor libraries does not adhere to strict mode, thus, causing some error
		// that hampers the successful loading of the editor. Since, we don't have
		// any control over those libraries, we will just capture the error even
		// without processing it so that the editor can continue to load successfully.
		try {
			var post = response.data.post;
			var misc = response.data.misc;

			if ('publish' == post.post_status) {
				$('#uc-editor-buttons > button#uc-switch-draft').show();
			}
		} catch (err) {
			console.log(err);
		}
		
		var editor_rendered = setInterval(function() {
			var wrapper = $('div#wp-uc_classic_editor-wrap');
			if (wrapper.length) {
				// Disabling any previously rendered handler for the submit button, so that it won't
				// conflict with our own submission process.
				$('#submitdiv div#publishing-action input#publish').attr('onsubmit', 'return false;');
				$('.wp-editor-tabs button.wp-switch-editor').on('click', function() {
					var is_textview = $(this).hasClass('switch-html');
					if (is_textview) {
						$('div.mce-tinymce.mce-container').hide();
						$('textarea.wp-editor-area').css('visibility', 'visible').show();
					} else {
						$('textarea.wp-editor-area').hide();
						$('div.mce-tinymce.mce-container').css('visibility', 'visible').show();
					}
				});
				clearInterval(editor_rendered);
				$(window).scrollTop(0);
				if ('post' == module.type) $('div#category-all.tabs-panel').scrollTop(0);

				if ('undefined' !== typeof tinymce && tinymce) {
					self.init_tiny_mce('uc_classic_editor');
				}

				if (-1 !== $.inArray(post.post_status, ['publish', 'future'])) $('div#submitpost input#publish').val(udclion[module.type+'s'].update);
				if ('future' !== post.post_status && self.is_input_future_date()) {
					$('div#submitpost input#publish').val(udclion[module.type+'s'].schedule);
				}
				if (misc.hasOwnProperty('sticky')) {
					$('div#post-visibility-select span#sticky-span input#sticky').prop('checked', misc.sticky);
					var visibility = $('div#post-visibility-select input[name="visibility"]:checked').val();
					if ('public' === visibility) {
						if ($('div#post-visibility-select span#sticky-span input#sticky').is(':checked')) {
							$('div#misc-publishing-actions span#post-visibility-display').html(udclion.posts.public+', '+udclion.posts.sticky);
						}
					}
				}

				if (post.hasOwnProperty('post_parent') && post.post_parent) $('#uc-page-attributes-container select#parent_id').val(post.post_parent);
				if (misc.hasOwnProperty('template') && misc.template) $('#uc-page-attributes-container select#page_template').val(misc.template);
			}

			$('div#submitpost').find('input#save-post, input#publish').attr('class', 'btn btn-primary publishing-buttons');
			if ('undefined' !== typeof misc.link && misc.link) {
				$('div#classic-editor-dashboard div.post-action-buttons a#uc_preview_changes').attr('href', '#').removeAttr('target').attr('onclick', 'UpdraftCentral_Library.open_browser_at(UpdraftCentral.$site_row, { module: "direct_url", url: "'+misc.link+'" }, jQuery(\'#updraftcentral_dashboard_wrapper\'));');
			}

			var insert_featured_image = $('div#postimagediv').find('a#set-post-thumbnail');
			if ('undefined' !== typeof insert_featured_image && insert_featured_image.length) {
				insert_featured_image.attr('href', '');
			}

			// Set handlers/listeners
			$('div#submitpost div#save-action input#save-post').on('click', function() {
				var value = $(this).val();
				switch (value.toLowerCase()) {
					case udclion[module.type+'s'].save_as_pending.toLowerCase():
						self.uc_editor.edits.update('status', 'pending');
						break;
					case udclion[module.type+'s'].save_draft.toLowerCase():
						self.uc_editor.edits.update('status', 'draft');
						break;
				}

				self.uc_editor.state.update('save_draft_pending', true);
				$('div#submitpost div#publishing-action input#publish').trigger('click');
			});

			$('div#submitpost div#publishing-action input#publish').on('click', function() {
				var container = $(this).closest('div#classic_editor_container');
				var value = $(this).val();

				if (self.uc_editor.state.exists('editing') && self.uc_editor.state.item('editing')) {
					UpdraftCentral_Library.dialog.alert('<h2>'+udclion.error+'</h2><p>'+udclion[module.type+'s'].currently_editing+'</p>');
					return;
				}

				// Make sure we switch to the "visual" tab before getting the content to reflect any
				// new changes done within the "text" tab, otherwise, new changes will be discarded
				// as soon as you call the getContent() method of the active editor.
				$('button#uc_classic_editor-tmce').trigger('click');

				var content = tinyMCE.activeEditor.getContent();
				content = self.adjust_local_reference(content);

				self.uc_editor.edits.bulk_update({
					id: post.ID,
					title: container.find('div.title-container input#title').val(),
					content: content,
					source: 'classic'
				});

				// Override any selected status if the "Publish" button is clicked.
				if ('publish' == value.toLowerCase() && !self.uc_editor.state.exists('save_draft_pending')) {
					self.uc_editor.edits.update('status', 'publish');
				}

				// Update the statuts to "future" if date edits exists and it is scheduled or intended
				// to be publish in the future.
				if (self.is_input_future_date()) {
					self.uc_editor.edits.update('status', 'future');
				}

				if (self.uc_editor.edits.exists('featured_media')) {
					self.uc_editor.edits.update('featured_media', parseInt($('input#_thumbnail_id').val()));
				}

				var param = {
					name: 'save',
					arguments: self.uc_editor.edits.get_collection_object()
				};

				var editor_container = $(document.body);
				editor_container.append('<div class="modal-backdrop-container"><div class="modal-backdrop fade show"></div><div class="updraftcentral_spinner"></div></div>');
				send_command(param, $site_row).then(function(response) {
					if ('undefined' !== typeof response.post && response.post) {
						// reload editor and update items list after publish
						var post_data = {
							post: JSON.parse(response.post),
							misc: response.misc
						}

						if ('post' == module.type) {
							if ('undefined' !== typeof response.preloaded && response.preloaded) {
								var preloaded = JSON.parse(response.preloaded);
								var preloaded_data = self.manage_data.item('preloaded_data');
	
								if ('undefined' !== typeof preloaded_data && preloaded_data) {
									preloaded_data = JSON.parse(preloaded_data);
									preloaded_data.categories = preloaded.categories;
									preloaded_data.tags = preloaded.tags;
									self.manage_data.update('preloaded_data', JSON.stringify(preloaded_data));
								}
							}
						}

						if ('manage' === self.current_section) update_items_list(post_data, post.post_status);
						self.load_updraftcentral_editor('classic', post_data, $site_row);

						if (response.hasOwnProperty('options')) update_filter_options(response.options);
					} else {
						UpdraftCentral_Library.dialog.alert('<h2>'+udclion.error+'</h2><p>'+udclion[module.type+'s'].unkown_error+'</p>');

						// Just making sure that the backdrop is removed after we've already received the
						// response from the remote site.
						var backdrop = editor_container.find('div.modal-backdrop-container');
						if ('undefined' !== typeof backdrop && backdrop.length) backdrop.remove();
					}
				}).always(function() {
					self.uc_editor.state.remove('save_draft_pending');
				});
			});

			$('#uc-editor-buttons > button#uc-editor-close').on('click', function() {
				var editor_container = $(document.body);
				var classic_editor = editor_container.find('div#classic_editor_container');
				if ('undefined' !== typeof classic_editor && classic_editor) {
					if (self.uc_editor.state.exists('editing') && self.uc_editor.state.item('editing')) {
						UpdraftCentral_Library.dialog.alert('<h2>'+udclion.error+'</h2><p>'+udclion[module.type+'s'].currently_editing+'</p>');
						return;
					}

					classic_editor.remove();
					// Make sure that any visible spinner(s) are remove on close.
					if ($('.updraftcentral_spinner').is(':visible')) {
						$('.updraftcentral_spinner').remove();
					}

					if ('undefined' !== typeof tinymce && tinymce) {
						var editor_id = tinymce.activeEditor.id;
						tinymce.EditorManager.execCommand('mceRemoveEditor', true, editor_id);

						// For old version:
						tinymce.EditorManager.execCommand('mceRemoveControl', true, editor_id);
					}

					$(document.body).trigger('updraftcentral_'+module.type+'_editor_closed', [classic_editor]);
				}
			});

			$('#uc-editor-buttons > button#uc-switch-draft').on('click', function() {
				self.uc_editor.edits.update('status', 'draft');
				$('div#submitpost div#publishing-action input#publish').trigger('click');
			});

			$('#edit-slug-box span#edit-slug-buttons > button.edit-slug').on('click', function() {
				var editable_post = $('#edit-slug-box span#editable-post-name');
				var anchor = editable_post.closest('a');
				anchor.attr('onclick', 'return false;');
				anchor.attr('target', '_blank');

				if ('undefined' !== typeof editable_post && editable_post) {
					self.uc_editor.state.update('editing', true);
					var input_slug = $('<input/>', {
						type: 'text',
						id: 'uc-input-slug',
						class: 'editable-slug',
						value: $('span#editable-post-name-full').html()
					});
					editable_post.html(input_slug);

					$(this).hide();
					var btn_ok = $('<button/>', {
						text: udclion[module.type+'s'].ok,
						id: 'uc-btn-ok',
						class: 'uc-slug-buttons',
					});
					
					btn_ok.on('click', function() {
						var slug = editable_post.find('input#uc-input-slug');
						if ('undefined' !== typeof slug && slug) {
							var slug_value = slug.val();
							if (0 == slug_value.trim().length) {
								UpdraftCentral_Library.dialog.alert('<h2>'+udclion.error+'</h2><p>'+udclion[module.type+'s'].slug_missing+'</p>');
								return;
							} else {
								$('span#editable-post-name-full').html(slug_value);
								slug.remove();

								editable_post.html(slug_value);
								anchor.attr('href', anchor.text());
								anchor.removeAttr('onclick');

								self.uc_editor.edits.update('slug', slug_value);
								self.uc_editor.state.remove('editing');

								$('#edit-slug-box span#edit-slug-buttons > button#uc-btn-ok').remove();
								$('#edit-slug-box span#edit-slug-buttons > button#uc-btn-cancel').remove();
								$('#edit-slug-box span#edit-slug-buttons > button.edit-slug').show();
							}
						}
					});
					$('#edit-slug-box span#edit-slug-buttons').append(btn_ok);

					var btn_cancel = $('<button/>', {
						text: udclion[module.type+'s'].cancel,
						id: 'uc-btn-cancel',
						class: 'uc-slug-buttons',
					});
					
					btn_cancel.on('click', function() {
						var slug = editable_post.find('input#uc-input-slug');
						if ('undefined' !== typeof slug && slug) {
							slug.remove();
							editable_post.html($('span#editable-post-name-full').html());
							anchor.removeAttr('onclick');
							self.uc_editor.state.remove('editing');

							$('#edit-slug-box span#edit-slug-buttons > button#uc-btn-ok').remove();
							$('#edit-slug-box span#edit-slug-buttons > button#uc-btn-cancel').remove();
							$('#edit-slug-box span#edit-slug-buttons > button.edit-slug').show();
						}
					});
					$('#edit-slug-box span#edit-slug-buttons').append(btn_cancel);
				}
			});

			$('#classic-editor-dashboard div#submitdiv').find('a.button, a.button-cancel').not('a#post-preview').addClass('btn btn-secondary');
			$('div#classic_editor a.edit-post-status').attr('href', '#misc-publishing-actions');
			$('div#classic_editor a.edit-post-status').on('click', function(e) {
				$(this).hide();
				$('div#post-status-select').slideDown('fast');
			});

			$('div#post-status-select a.save-post-status').on('click', function(e) {
				var parent = $(this).closest('div#post-status-select');
				var status = parent.find('select#post_status').val();
				self.uc_editor.edits.update('status', status);

				$(this).siblings('a.cancel-post-status').trigger('click');
				switch (status) {
					case 'pending':
						$('div#submitpost input#save-post').val(udclion[module.type+'s'].save_as_pending).show();
						status_text = udclion[module.type+'s'].pending_review;
						break;
					case 'draft':
						$('div#submitpost input#save-post').val(udclion[module.type+'s'].save_draft).show();
						status_text = udclion[module.type+'s'].draft;
						break;
					case 'publish':
						$('div#submitpost input#save-post').hide();
						status_text = udclion[module.type+'s'].published;
						break;
					default:
						break;
				}

				$('div#misc-publishing-actions span#post-status-display').html(status_text);
				if ('future' !== post.post_status && self.is_input_future_date()) {
					$('div#submitpost input#publish').val(udclion[module.type+'s'].schedule);
				}
			});

			$('div#post-status-select a.cancel-post-status').on('click', function(e) {
				$('div#post-status-select').slideUp('fast', 'swing', function() {
					$('div#classic_editor a.edit-post-status').show();
				});
			});

			$('div#classic_editor a.edit-visibility').on('click', function(e) {
				$(this).hide();
				if ('post' == module.type) {
					if ($('div#post-visibility-select input#visibility-radio-public').is(':checked')) {
						$('div#post-visibility-select span#sticky-span').show();
					} else {
						$('div#post-visibility-select span#sticky-span').hide();
					}
				}

				if ($('div#post-visibility-select input#visibility-radio-password').is(':checked')) {
					$('div#post-visibility-select span#password-span').show();
				} else {
					$('div#post-visibility-select span#password-span').hide();
				}
				$('div#post-visibility-select').slideDown('fast');
			});

			$('div#post-visibility-select span#sticky-span input#sticky').on('click', function(e) {
				self.uc_editor.edits.update('sticky', $(this).is(':checked') ? true : false);
			});

			$('div#post-visibility-select a.save-post-visibility').on('click', function(e) {
				var parent = $(this).closest('div#post-visibility-select');
				var checked = parent.find('input[name="visibility"]:checked').val();
				self.uc_editor.edits.update('visibility', checked);

				if ('private' == checked) {
					$('div#submitpost input#publish').val(udclion[module.type+'s'].update);
					$('div#misc-publishing-actions span#post-status-display').html(udclion[module.type+'s'].privately_published);
					$('div#misc-publishing-actions a.edit-post-status').hide();
					$('div#submitpost input#save-post').hide();
				} else {
					if (-1 === $.inArray(post.post_status, ['publish', 'future'])) {
						$('div#submitpost input#publish').val(udclion[module.type+'s'].publish);
					} else {
						if ('future' !== post.post_status && self.is_input_future_date()) {
							$('div#submitpost input#publish').val(udclion[module.type+'s'].schedule);
						} else {
							$('div#submitpost input#publish').val(udclion[module.type+'s'].update);
						}
					}

					if ('password' == checked) {
						var password = parent.find('input#post_password').val();
						if (0 == password.trim().length) {
							UpdraftCentral_Library.dialog.alert('<h2>'+udclion.error+'</h2><p>'+udclion[module.type+'s'].password_missing+'</p>');
							return;
						} else {
							self.uc_editor.edits.update('password', password);
						}
					}

					var status = self.uc_editor.edits.exists('status') ? self.uc_editor.edits.item('status') : post.post_status;
					switch (status) {
						case 'pending':
							status_text = udclion[module.type+'s'].pending_review;
							break;
						case 'draft':
							status_text = udclion[module.type+'s'].draft;
							break;
						case 'publish':
							status_text = udclion[module.type+'s'].published;
							break;
						default:
							status_text = udclion[module.type+'s'].published;
							$('#post-status-select select#post_status option[value="publish"]').prop('selected', true).html(status_text);
							break;
					}

					$('div#misc-publishing-actions a.edit-post-status').show();
					$('div#misc-publishing-actions span#post-status-display').html(status_text);
					$('div#post-status-select a.save-post-status').trigger('click');
				}

				switch (checked) {
					case 'public':
						visibility_text = udclion[module.type+'s'].public;
						if ($('div#post-visibility-select span#sticky-span input#sticky').is(':checked')) {
							visibility_text += ', '+udclion[module.type+'s'].sticky;
						}
						break;
					case 'password':
						visibility_text = udclion[module.type+'s'].password_protected;
						break;
					case 'private':
						visibility_text = udclion[module.type+'s'].private;
						break;
					default:
						break;
				}

				$('div#misc-publishing-actions span#post-visibility-display').html(visibility_text);
				$(this).siblings('a.cancel-post-visibility').trigger('click');
			});

			$('div#post-visibility-select a.cancel-post-visibility').on('click', function(e) {
				$('div#post-visibility-select').slideUp('fast', 'swing', function() {
					$('div#classic_editor a.edit-visibility').show();
				});
			});

			$('div#post-visibility-select input#visibility-radio-password').on('click', function(e) {
				if ('post' == module.type) $('div#post-visibility-select span#sticky-span').hide();
				$('div#post-visibility-select span#password-span').show();
			});

			$('div#post-visibility-select').on('click', 'input#visibility-radio-public, input#visibility-radio-private', function(e) {
				if ('post' == module.type) {
					var id = $(this).attr('id');
					if ('visibility-radio-public' === id) {
						$('div#post-visibility-select span#sticky-span').show();
					} else {
						$('div#post-visibility-select span#sticky-span').hide();
					}
				}
				$('div#post-visibility-select span#password-span').hide();
			});

			$('div#classic_editor a.edit-timestamp').on('click', function(e) {
				$(this).hide();
				$('fieldset#timestampdiv').slideDown('fast');

				var timestamp = self.uc_editor.edits.item('timestamp');
				var mm = ('undefined' !== typeof timestamp && 'undefined' !== typeof timestamp.month) ? timestamp.month : misc.published_date.mm;
				var jj = ('undefined' !== typeof timestamp && 'undefined' !== typeof timestamp.day) ? timestamp.day : misc.published_date.jj;
				var aa = ('undefined' !== typeof timestamp && 'undefined' !== typeof timestamp.year) ? timestamp.year : misc.published_date.aa;
				var hh = ('undefined' !== typeof timestamp && 'undefined' !== typeof timestamp.hour) ? timestamp.hour : misc.published_date.hh;
				var mn = ('undefined' !== typeof timestamp && 'undefined' !== typeof timestamp.minute) ? timestamp.minute : misc.published_date.mn;
				var ss = ('undefined' !== typeof timestamp && 'undefined' !== typeof timestamp.second) ? timestamp.second : misc.published_date.ss;

				$('#timestampdiv select#mm').val(mm);
				$('#timestampdiv input#jj').val(jj);
				$('#timestampdiv input#aa').val(aa);
				$('#timestampdiv input#hh').val(hh);
				$('#timestampdiv input#mn').val(mn);
				$('#timestampdiv input#ss').val(ss);
			});

			$('fieldset#timestampdiv a.save-timestamp').on('click', function(e) {
				var parent = $(this).closest('fieldset#timestampdiv');
				var wrapper = parent.find('div.timestamp-wrap');
				var input_date = {
					month: wrapper.find('select#mm').val(),
					day: wrapper.find('input#jj').val(),
					year: wrapper.find('input#aa').val(),
					hour: wrapper.find('input#hh').val(),
					minute: wrapper.find('input#mn').val(),
					second: parent.find('input#ss').val()
				};

				if (self.validate_input_date(input_date)) {
					var result = self.prepare_date(input_date);
					var timestamp = $('div#misc-publishing-actions span#timestamp > b').html(result.formatted);
					self.uc_editor.edits.update('date', result.date);
					self.uc_editor.edits.update('timestamp', result.timestamp);

					$(this).siblings('a.cancel-timestamp').trigger('click');
					if ('future' !== post.post_status && self.is_input_future_date()) {
						$('div#submitpost input#publish').val(udclion[module.type+'s'].schedule);
					}
				} else {
					UpdraftCentral_Library.dialog.alert('<h2>'+udclion.error+'</h2><p>'+udclion[module.type+'s'].invalid_date_input+'</p>');
				}
			});

			$('fieldset#timestampdiv a.cancel-timestamp').on('click', function(e) {
				$('fieldset#timestampdiv').slideUp('fast', 'swing', function() {
					$('div#classic_editor a.edit-timestamp').show();
				});
			});

			$('div#postimagediv').on('click', 'a#set-post-thumbnail', function(e) {
				var media_button = $('#insert-media-button');
				if ('undefined' == typeof media_button || 0 == media_button.length) media_button = $('button.insert-media');

				media_button.trigger('click', ['featured_image']);
			});

			$('.wp-media-buttons').on('click', '#insert-media-button, button.insert-media', function(event, data) {
				var feature_image = ('undefined' !== typeof data) ? true : false;
				update_media_display(feature_image);
			});

			$('div#postimagediv').on('click', 'a#remove-post-thumbnail', remove_featured_image);
			$(document).on('click', 'button.media-button-select', function(e) {
				var select_media_interval = setInterval(function() {
					var attachment = $('#postimagediv img.attachment-post-thumbnail');
					var href = $('div#postimagediv a#remove-post-thumbnail').attr('href');
					if ('undefined' !== typeof attachment && attachment.length && '#' == href) {
						clearInterval(select_media_interval);

						$('div#postimagediv a#remove-post-thumbnail').attr('href', '#set-post-thumbnail');
						self.uc_editor.edits.update('featured_media', $('input#_thumbnail_id').val());
					}
				}, 100);
			});

			if ('post' == module.type) {
				$('#categorydiv a#category-add-toggle').on('click', function(e) {
					$('div#category-adder p#category-add').show();
				});
	
				$('a#link-post_tag').on('click', function(e) {
					var mostused = $('div#mostused-post_tag').html().trim();
					if (0 == mostused.length && mostused !== udclion.posts.no_tags_found) $('div#mostused-post_tag').html(udclion.posts.no_tags_found);
					if (!$('div#mostused-post_tag').is(':visible')) {
						$('div#mostused-post_tag').show();
					} else {
						$('div#mostused-post_tag').hide();
					}
				});
	
				$('div.categorydiv').on('click', 'ul#categorychecklist input[type="checkbox"], ul#categorychecklist-pop input[type="checkbox"]', function() {
					var id = $(this).val();
					var section = $(this).closest('.categorychecklist').attr('id');
	
					switch (section) {
						case 'categorychecklist':
							$('ul#categorychecklist-pop li input[value="'+id+'"]').prop('checked', $(this).is(':checked'));
							break;
						case 'categorychecklist-pop':
							$('ul#categorychecklist li input[value="'+id+'"]').prop('checked', $(this).is(':checked'));
							break;
						default:
							break;
					}
	
					var categories = [];
					$('#categorychecklist li > label.selectit > input[type="checkbox"]').each(function() {
						if ($(this).is(':checked')) {
							categories.push($(this).val());
						}
					});
					self.uc_editor.edits.update('categories', categories);
				});
	
				$('div.categorydiv input#category-add-submit').on('click', function() {
					var category = $('input#newcategory');
					var parent = $('select#newcategory_parent');
	
					if ('undefined' !== typeof category.val() && category.val().length) {
						var value = category.val().trim();
						var new_category = parent.val().length ? parent.val()+':'+value : value;
	
						$('#categorychecklist').prepend('<li id="category-0" class="popular-category"><label class="selectit"><input value="'+new_category+'" type="checkbox" name="post_category[]" id="in-category-0" checked="checked"> '+category.val()+'</label></li>');
	
						category.val('');
						parent.val('');
	
						$(this).closest('p#category-add').hide();
	
						var categories = [];
						$('#categorychecklist li > label.selectit > input[type="checkbox"]').each(function() {
							if ($(this).is(':checked')) {
								categories.push($(this).val());
							}
						});
						self.uc_editor.edits.update('categories', categories);
					} else {
						UpdraftCentral_Library.dialog.alert('<h2>'+udclion.error+'</h2><p>'+udclion.posts.need_category_to_add+'</p>');
					}
				});
	
				$('#tagsdiv-post_tag input.tagadd').on('click', function() {
					var new_tag = $('#tagsdiv-post_tag input#new-tag-post_tag');
					if ('undefined' !== typeof new_tag.val() && new_tag.val().length) {
						var tags = [new_tag.val()];
						if (-1 !== new_tag.val().indexOf(',')) {
							tags = new_tag.val().split(',');
						}
	
						var post_tags = [];
						$('#tagsdiv-post_tag .tagchecklist > span').each(function() {
							post_tags.push($(this).text().trim());
						});
	
						var tags_container = $('#tagsdiv-post_tag .tagchecklist');
						var last_index = tags_container.find('> span').length;
						for (var i=0; i<tags.length; i++) {
							var tag = tags[i].trim();
	
							if (!self.is_ivalue_exists(tag, post_tags)) {
								tags_container.append('<span><button type="button" id="post_tag-check-num-'+last_index+'" class="ntdelbutton"><span class="remove-tag-icon" aria-hidden="true"></span></button>&nbsp;'+tag+'</span>');
								tags_container.find('#post_tag-check-num-'+last_index).on('click', function() {
									$(this).parent().remove();
									var current_tags = [];
									$('#tagsdiv-post_tag .tagchecklist > span').each(function() {
										current_tags.push($(this).text().trim());
									});
									self.uc_editor.edits.update('tags', current_tags);
								});
	
								post_tags.push(tag);
								last_index++;
							}
						}
	
						new_tag.val('');
						self.uc_editor.edits.update('tags', post_tags);
					} else {
						UpdraftCentral_Library.dialog.alert('<h2>'+udclion.error+'</h2><p>'+udclion.posts.need_something_to_add+'</p>');
					}
				});
	
				$('#tagsdiv-post_tag .tagchecklist button.ntdelbutton').on('click', function() {
					$(this).parent().remove();
					var tags = [];
					$('#tagsdiv-post_tag .tagchecklist > span').each(function() {
						tags.push($(this).text().trim());
					});
					self.uc_editor.edits.update('tags', tags);
				});
	
				$('#tagsdiv-post_tag #mostused-post_tag a').each(function() {
					// Disabling any links associated with the "Most Used" items
					$(this).attr('href', 'javascript://');
				});
	
				$('#tagsdiv-post_tag #mostused-post_tag a').on('click', function() {
					var tags = [];
	
					if (self.uc_editor.edits.exists('tags')) {
						tags = self.uc_editor.edits.item('tags');
					} else {
						$('#tagsdiv-post_tag .tagchecklist > span').each(function() {
							tags.push($(this).text().trim());
						});
					}
	
					var tags_container = $('#tagsdiv-post_tag .tagchecklist');
					var last_index = tags_container.find('> span').length;
					var value = $(this).text().replace(/\(\d\)/gi, '').trim();
	
					if (!self.is_ivalue_exists(value, tags)) {
						tags_container.append('<span><button type="button" id="post_tag-check-num-'+last_index+'" class="ntdelbutton"><span class="remove-tag-icon" aria-hidden="true"></span></button>&nbsp;'+value+'</span>');
						tags_container.find('#post_tag-check-num-'+last_index).on('click', function() {
							$(this).parent().remove();
							var current_tags = [];
							$('#tagsdiv-post_tag .tagchecklist > span').each(function() {
								current_tags.push($(this).text().trim());
							});
							self.uc_editor.edits.update('tags', current_tags);
						});
						
						tags.push(value);
						self.uc_editor.edits.update('tags', tags);
					}
				});
	
				$('#categorydiv a#uc_tab_category_all').on('click', function(e) {
					$('#categorydiv a#uc_tab_category_all').closest('li').toggleClass('tabs');
					$('#categorydiv a#uc_tab_category_pop').closest('li').toggleClass('tabs');
					$('div#category-pop').hide();
					$('div#category-all').show();
				});
	
				$('#categorydiv a#uc_tab_category_pop').on('click', function(e) {
					$('div#category-all ul#categorychecklist li input:checked').each(function() {
						var id = $(this).val();
						$('div#category-pop ul#categorychecklist-pop li input[value="'+id+'"]').prop('checked', true);
					});
	
					$('#categorydiv a#uc_tab_category_all').closest('li').toggleClass('tabs');
					$('#categorydiv a#uc_tab_category_pop').closest('li').toggleClass('tabs');
					$('div#category-all').hide();
					$('div#category-pop').show();
				});
			}

			$('#uc-page-attributes-container select[name="parent_id"]').on('change', function(e) {
				self.uc_editor.edits.update('parent', $(this).val());
			});

			$('#uc-page-attributes-container select[name="page_template"]').on('change', function(e) {
				self.uc_editor.edits.update('template', $(this).val());
			});

			$('#uc-page-attributes-container input[name="menu_order"]').on('change', function(e) {
				validate_quick_edit(null, $(this), 'order', true, true);
			});
		}, 500);
	}

	/**
	 * Updates the current filter options with the latest options received
	 * from the remote site
	 *
	 * @param {object} options An object containing the updated options for display
	 *
	 * @return {void}
	 */
	function update_filter_options(options) {
		if ('undefined' !== typeof options && options) {
			var filter_template, date_options;
			var params = {
				date_filter: options.date
			};

			if ('post' == module.type) params.category_filter = options.category;
			filter_template = UpdraftCentral.template_replace(module.type+'s-manage-filters', params);

			date_options = $('<div/>', {
				class: 'hidden'
			}).html(filter_template).find('select.uc-'+module.type+'-date-filter');
			$('.uc-'+module.type+'-buttons-filters select.uc-'+module.type+'-date-filter').replaceWith(date_options);

			if ('post' == module.type) {
				var category_options = $('<div/>', {
					class: 'hidden'
				}).html(filter_template).find('select.uc-post-category-filter');
				$('.uc-post-buttons-filters select.uc-post-category-filter').replaceWith(category_options);
			}
		}
	}

	/**
	 * Updates the media library display by triggering either the "feature image" section or the "add media"
	 *
	 * @param {boolean} feature_image Indicate wether to pull the feature image section automatically
	 *
	 * @return {void}
	 */
	function update_media_display(feature_image) {
		var media_interval = setInterval(function() {
			var media_modal = $("div[id^='__wp-uploader'].supports-drag-drop");
			if ('undefined' !== typeof media_modal && media_modal.length) {
				clearInterval(media_interval);
				var media_frame = media_modal.find('.media-frame');
				
				if (feature_image) {
					var featured_image_menu = media_modal.find(".media-menu-item:contains('"+udclion[module.type+'s'].featured_image+"')");
					if (0 == featured_image_menu.length) {
						featured_image_menu = media_modal.find("#menu-item-featured-image");
					}

					if ('undefined' !== typeof featured_image_menu && featured_image_menu.length) {
						featured_image_menu.trigger('click');
						var media_lib = media_modal.find(".media-menu-item:contains('"+udclion[module.type+'s'].media_library+"')");
						if (media_lib.length && !media_lib.hasClass('active')) media_lib.trigger('click');
					}

					media_frame.find('div.media-frame-menu').hide();
					media_frame.find('.media-frame-menu-heading').hide();
					media_frame.find("div[class^='media-frame-']").not('.media-frame-menu').css('left', '0');
				} else {
					var add_media = media_modal.find(".media-menu-item:contains('"+udclion[module.type+'s'].add_media+"')");
					if (0 == add_media.length) {
						add_media = media_modal.find("#menu-item-insert");
					}

					if ('undefined' !== typeof add_media && add_media.length) add_media.trigger('click');
					media_frame.find("div[class^='media-frame-']").not('.media-frame-menu').css('left', '200px');
					media_frame.find('.media-frame-menu-heading').show();
					media_frame.find('div.media-frame-menu').show();
				}
			}
		}, 100);
	}

	/**
	 * Removes featured image using the classic editor
	 *
	 * @param {object} e Event object
	 *
	 * @return {void}
	 */
	function remove_featured_image(e) {
		e.preventDefault();

		var inside = $(this).closest('.inside');
		inside.find('#set-post-thumbnail-desc').remove();
		inside.find('#set-post-thumbnail').removeAttr('aria-describedby').html(udclion[module.type+'s'].set_featured_image);
		inside.find('input#_thumbnail_id').val(0);

		$(this).parent().remove();
		self.uc_editor.edits.update('featured_media', 0);
	}

	/**
	 * Attaches UpdraftCentral logo and some action buttons to the Block editor (Gutenberg)
	 *
	 * @param {string} logo A string containing the url of the UpdraftCentral logo
	 * @param {object} misc The post object miscellaneous data
	 *
	 * @return {void}
	 */
	function attach_updraftcentral_buttons(logo, misc) {
		var toolbar_container = $('div.edit-post-header-toolbar');
		if (toolbar_container.length) {
			if (!toolbar_container.find('.uc-logo-container').length) {
				var logo_container = $('<div/>', {
					class: 'uc-logo-container',
				});
				logo_container.html('<img class="logo-landscape" src="'+logo+'" alt="UpdraftCentral" width="165" height="30">');
				toolbar_container.prepend(logo_container);
			}
		}

		var container = $('div.edit-post-header__settings');
		if (container.length) {
			if (!container.find('#uc_close_editor').length) {
				var btn_close = $('<button/>', {
					text: udclion[module.type+'s'].close_editor,
					id: 'uc_close_editor',
					type: 'button',
					class: 'components-button editor-post-close is-button is-default is-large',
					style: 'padding: 0 12px 2px; margin: 2px; height: 33px; line-height: 32px;',
				});
				
				btn_close.on('click', function() {
					var editor_container = $(document.body);
					var container = editor_container.find('div#gutenberg_editor_container');
					if (container.length) {
						container.hide();
					}

					// Make sure that any visible spinner(s) are remove on close.
					if ($('.updraftcentral_spinner').is(':visible')) {
						$('.updraftcentral_spinner').remove();
					}

					$(document.body).trigger('updraftcentral_'+module.type+'_editor_closed', [container]);
				});
				container.prepend(btn_close);
			}

			if (!container.find('#uc_preview_lnk').length && 'undefined' !== typeof misc) {
				var anchor_preview = $('<a/>', {
					id: 'uc_preview_lnk',
					href: '#',
					onclick: 'UpdraftCentral_Library.open_browser_at(UpdraftCentral.$site_row, { module: "direct_url", url: "'+misc.link+'" }, jQuery(\'#updraftcentral_dashboard_wrapper\'));',
				});

				var btn_preview = $('<button/>', {
					text: udclion[module.type+'s'].preview,
					id: 'uc_preview_post',
					type: 'button',
					class: 'components-button editor-preview-post is-button is-default is-large',
				});
				anchor_preview.append(btn_preview);
				container.find('#uc_close_editor').after(anchor_preview);
			}
		}
	}

	/**
	 * Updates the block editor's embedded local view posts/pages link to connect and open the list
	 * of posts/pages from the remote site.
	 *
	 * @return {void}
	 */
	function update_view_posts_link() {
		var admin_url = UpdraftCentral.$site_row.data('admin_url'),
			view_posts, repeat_count = 0,
			lnk_checker, default_tries = 60;

		lnk_checker = setInterval(function() {
			view_posts = $('.edit-post-fullscreen-mode-close__toolbar > a');
			if ('undefined' == typeof view_posts || null == view_posts || 0 == view_posts.length) {
				view_posts = $('a.edit-post-fullscreen-mode-close');
			}

			if (view_posts.length) {
					clearInterval(lnk_checker);

				if ('#' !== view_posts.attr('href')) {
					redirect_url = admin_url+view_posts.attr('href');
					view_posts.attr('href', '#').removeAttr('target').attr('onclick', 'UpdraftCentral_Library.open_browser_at(UpdraftCentral.$site_row, { module: "direct_url", url: "'+redirect_url+'" }, jQuery(\'#updraftcentral_dashboard_wrapper\'));');
				}
			} else {
				// If the view posts/pages link is not found after some tries then we can assumed that the fullscreen mode
				// is not set. We only add this check because by the time the editor loads and the fullscreen mode
				// was set it will still take a few seconds for it to render completely. The 60 is just a conservative value
				// in order to make sure that we can replace the link successfully with the actual remote link.
				if (repeat_count > default_tries) clearInterval(lnk_checker);
			}

			repeat_count++;
		}, 1000);
	}

	/**
	 * Filters the metaboxes content with only the allowed metaboxes to display
	 *
	 * @param {string} content The metaboxes content to filter
	 *
	 * @return {string}
	 */
	function filter_metaboxes(content) {
		var container = $('<div/>').html(content),
			id;

		var allowed = ['submitdiv', 'pageparentdiv', 'postimagediv'];
		if ('post' == module.type) {
			allowed = ['submitdiv', 'categorydiv', 'tagsdiv-post_tag', 'postimagediv'];
		}

		container.find('div.postbox').each(function() {
			id = $(this).attr('id');
			if (Array.isArray(allowed) && allowed.length && -1 == $.inArray(id, allowed)) container.find('#'+id).remove();
		});

		return container.html();
	}

	/**
	 * Processes the response from a load editor request
	 *
	 * @param {string} editor    The type of editor to load (e.g. 'classic' or 'gutenberg')
	 * @param {object} response  The response object containing the needed information to successfully edit the post object
	 * @param {object} $site_row A jQuery object representing the current site that is currently worked on
	 *
	 * @return {void}
	 */
	this.process_load_editor_response = function(editor, response, $site_row) {
		var editor_container = $(document.body);
		var $location = editor_container.find('div#'+editor+'_editor_container');
		var data = response.data;
		var preloaded_data = self.manage_data.item('preloaded_data');
		if ('undefined' !== typeof preloaded_data && preloaded_data) {
			preloaded_data = JSON.parse(preloaded_data);
		}

		if ('undefined' == typeof $location || 0 == $location.length) {
			$location = $('<div/>', {
				id: editor+'_editor_container'
			});

			$location.data('editor', editor);
			editor_container.append($location);
		}

		var editor_wrapper = ('gutenberg' === editor) ? '<div class="'+editor+'-editor-post"></div>' : '<div id="'+editor+'_editor" class="'+editor+'"><div id="editor" class="'+editor+'__editor"></div></div>';
		if ($location.length && $location.is(':visible')) {
			$location.html(editor_wrapper);
		}

		switch (editor) {
			case 'classic':
				var misc = $.extend(true, {}, data.misc);
				if (misc.hasOwnProperty('sample_permalink') && misc.sample_permalink.length) {
					if (-1 !== misc.sample_permalink[0].indexOf('%postname%')) {
						misc.site_url = misc.sample_permalink[0].replace('%postname%/', '');
						if ('undefined' !== typeof misc.sample_permalink[1] && misc.hasOwnProperty('slug') && 0 == misc.slug.trim().length) {
							misc.slug = misc.sample_permalink[1];
						}
					} else {
						if (-1 !== misc.sample_permalink[0].indexOf('?p=')) $('#edit-slug-buttons button.edit-slug').hide();
					}
				}

				var hide_edit_button = false;
				if (misc.hasOwnProperty('link') && misc.link) {
					if (misc.hasOwnProperty('slug') && misc.slug && -1 !== misc.link.indexOf(misc.slug)) {
						misc.site_url = misc.link.replace(misc.slug, '');
					}

					if (-1 !== misc.link.indexOf('page_id') || -1 !== misc.link.indexOf('post_id')) {
						misc.link = misc.link.replace(misc.slug, '');
						misc.site_url = misc.link;
						misc.slug = '';
						hide_edit_button = true;
					}
				}

				var template = UpdraftCentral.template_replace('dashboard-classic_editor', {
					post: data.post,
					misc: misc,
					editor: data.editor,
					metaboxes: filter_metaboxes(data.metaboxes),
					logo: data.logo
				});

				$location.find('#'+editor+'_editor').html(template);
				if (hide_edit_button) $('#edit-slug-buttons').hide();

				var page_attributes_metabox_content = {
					order: data.post.menu_order
				}

				if (self.manage_data.exists('template_options')) {
					page_attributes_metabox_content.template = render_options(self.manage_data.item('template_options'), {
						value: 'filename',
						label: 'template'
					});
				}

				if (self.manage_data.exists('parent_options')) {
					page_attributes_metabox_content.page = render_options(self.manage_data.item('parent_options'), {
						value: 'id',
						label: 'title'
					}, null, [data.post.ID]);
				}

				if ('post' == module.type) {
					var categories_inside_content = UpdraftCentral.template_replace('posts-categories', data.categories_metabox_content);
					$location.find('#categorydiv .inside').html(categories_inside_content);
	
					var tags_inside_content = UpdraftCentral.template_replace('posts-tags', data.tags_metabox_content);
					$location.find('#tagsdiv-post_tag .inside').html(tags_inside_content);
				} else {
					var page_inside_content = UpdraftCentral.template_replace('pages-page-attributes', page_attributes_metabox_content);
					$location.find('#pageparentdiv .inside').html(page_inside_content);
				}

				load_auxillary_functions(response, $location);
				$(document.body).trigger('updraftcentral_'+module.type+'_editor_loaded', [$location]);
				break;
			case 'gutenberg':
				window.qstring = 'site_id='+$site_row.data('site_id')+'&uc_nonce='+data.info.uc_nonce+'&uc_refIds='+data.info.uc_refIds+'&post_type='+data.post.post_type;
				var previous_status = data.post.post_status;

				// Manually add a spinner to indicate that UC is actually loading the block/gutenberg editor,
				// since the editor will take a few seconds to load and there will be a gap between clicking
				// the load editor link to the actual loading of the editor.
				if ($.fullscreen.isFullScreen()) {
					$site_row.prepend('<div class="updraftcentral_spinner"></div>');
				} else {
					$(document.body).append('<div class="updraftcentral_spinner"></div>');
				}

				self.clear_notices();
				var template = UpdraftCentral.template_replace('dashboard-block_editor', {
					title: data.post.post_title,
					metaboxes: data.metaboxes
				});

				$location.find('.'+editor+'-editor-post').html(template);

				var settings = data.settings;
				settings.autosave = null;
				settings.autosaveInterval = 86400;
				if ('page' == data.post.post_type && preloaded_data.hasOwnProperty('templates') && preloaded_data.templates) {
					settings.availableTemplates = preloaded_data.templates;
				}

				var nux = wp.data.dispatch('core/nux');
				if ('undefined' !== typeof nux && nux) nux.disableTips();

				window._wpLoadBlockEditor = new Promise(function(resolve, reject) {
					wp.domReady(function() {
						wp.apiFetch.use(function(options, next) {
							if (options.hasOwnProperty('path') && options.path) {
								options.path += (-1 !== options.path.indexOf('?')) ? '&' : '?';
								options.path += window.qstring;
							}
							return next(options);
						});

						wp.blocks.setCategories(data.block_categories);
						wp.blocks.unstable__bootstrapServerSideBlockDefinitions(data.block_definitions);

						var block_types = wp.blocks.getBlockTypes();
						if (0 < block_types.length) {
							for (var i=0; i<block_types.length; i++) {
								var type = block_types[i];
								wp.blocks.unregisterBlockType(type.name);
							}
						}

						resolve(wp.editPost.initializeEditor('editor', data.post.post_type, data.post.ID, settings, {
							title: data.post.post_title,
							content: data.post.post_content,
							excerpt: data.post.post_excerpt
						}));
					});

				}).then(function(editor) {
					// We need to store the last information processed by the editor, just in case
					// something happened (e.g. the editor is broken/corrupted) then we will reset
					// the editor from the last information it processed.
					self.reset_info.data = data;
					self.reset_info.previous_status = previous_status;
					self.reset_info.location = $location;

					self.apply_subscriptions_observer(data, previous_status, $location);
				});
				break;
			default:
				break;
		}
	}

	/**
	 * Renders the actual items and updates all the needed information in the UpdraftCentral UI
	 *
	 * @param {object}  response  The response object to process
	 * @param {object}  $site_row A jQuery object representing the current site that is currently worked on
	 * @param {boolean} refresh   Indicates whether to update the links and current selection
	 *
	 * @return {void}
	 */
	function process_response(response, $site_row, refresh) {
		var $location = $site_row.find('.updraftcentral_row_extracontents');
		if ('undefined' !== typeof response[module.type+'s'] && response[module.type+'s']) {
			if (0 === $location.find('.uc-navlinks-container').length || ('undefined' !== typeof refresh && refresh)) {
				var params = {
					date_filter: response.options.date
				};

				if ('post' == module.type) params.category_filter = response.options.category;
				var filter_template = UpdraftCentral.template_replace(module.type+'s-manage-filters', params);
				var item_template = UpdraftCentral.template_replace(module.type+'s-items', {});

				$location.html(filter_template + item_template);
				$location.find('input.uc-'+module.type+'-check-all').on('click', function(e) {
					select_items_for_processing($(this), $site_row);
				});
			}

			if ('undefined' !== typeof refresh && refresh) {
				self.current_group = 'all';
				update_action_options(self.current_group);
				$('ul#uc-navlinks a.uc-navlink-item').css('cssText', 'font-weight: normal;');
				$('ul#uc-navlinks a.uc-navlink-item[data-group="'+self.current_group+'"]').css('cssText', 'font-weight: bold !important;');
			}

			// Set remote data
			self.pagination.set_remote_data({
				info: response.info,
				items: response[module.type+'s']
			});

			// Returns the currently rendered items and the pagination
			render_items_and_pagination(1, $site_row);
			update_item_count(response[module.type+'s_count']);

			UpdraftCentral_Library.enable_actions();
		}
	}

	/**
	 * Toggle the enabled properties of the link and style elements based on the submitted value
	 *
	 * @param {boolean} value "true" to disable, "false" otherwise
	 *
	 * @return {void}
	 */
	this.disable_current_themes = function(value) {
		if (('page' == module.type && 'undefined' !== typeof udcstyles_page && udcstyles_page.hasOwnProperty('styles')) || ('post' == module.type && 'undefined' !== typeof udcstyles && udcstyles.hasOwnProperty('styles'))) {
			var styles = ('post' == module.type) ? udcstyles.styles : udcstyles_page.styles;

			// Disable local styles temporarily while editing as not to override original styles from controlled sites
			for (var i=0; i<styles.length; i++) {
				if (-1 === $.inArray(styles[i].id, ['updraftcentral-dashboard-css', 'media-views', 'mediaelement', 'imgareaselect', 'buttons', 'editor-buttons'])) {
					if ($('link[id="'+styles[i].id+'-css"').length) $('link[id="'+styles[i].id+'-css"').prop('disabled', value);
					if ($('style[id="'+styles[i].id+'-inline-css"').length) $('style[id="'+styles[i].id+'-inline-css"').prop('disabled', value);
				}
			}

			// Make sure that any local default editor (classic) styles won't interfere with the block editor
			// when rendering content for editing. For classic editor this is already embedded, so ne need to
			// re-use these.
			$('link[id="wp-editor-css"]').prop('disabled', value);
			$('link[id="wp-editor-inline-css"]').prop('disabled', value);

			// We put boostrap style on-hold as well (if we found one)
			$('link[id^="bootstrap"]').prop('disabled', value);
			$('style[id^="boostrap"]').prop('disabled', value);
		}
	}

	/**
	 * Temporarily disables the current theme's style when editing the post in order not to override
	 * the remote styling when the user is currently editing the post.
	 *
	 * @param {boolean} value "true" to disable, "false" otherwise
	 *
	 * @return {void}
	 */
	this.disable_current_wp_theme = function(value) {
		if ($.fullscreen.isFullScreen()) {
			var theme_css;
			if ('post' == module.type) {
				if (udcstyles.hasOwnProperty('current_theme_uri') && udcstyles.current_theme_uri) {
					theme_css = $('link[href^="'+udcstyles.current_theme_uri+'"]');
				}
			} else {
				if (udcstyles_page.hasOwnProperty('current_theme_uri') && udcstyles_page.current_theme_uri) {
					theme_css = $('link[href^="'+udcstyles_page.current_theme_uri+'"]');
				}
			}

			if ('undefined' !== typeof theme_css && theme_css.length) {
				theme_css.prop('disabled', value);
			}
		}
	}

	/**
	 * Remove gutenberg edit button if the controlled site's WP version is below 5
	 *
	 * @param {object}  $site_row A jQuery object representing the current site that is currently worked on
	 *
	 * @return {void}
	 */
	function maybe_remove_block_editing($site_row) {
		var $location = $site_row.find('.updraftcentral_row_extracontents'),
			site_id = $site_row.data('site_id'),
			site_wp_version;

		if (self.wp_versions.exists(site_id)) {
			site_wp_version = self.wp_versions.item(site_id);

			if (parseInt(site_wp_version) < 5) {
				$location.find('a.'+module.type+'-action-item[data-action="edit-gutenberg"]').remove();
			}
		} else {
			$location.find('a.'+module.type+'-action-item[data-action="edit-gutenberg"]').remove();
		}
	}

	/**
	 * Sends request to the remote website to update the posts table based from the
	 * submmitted parameters/filters
	 *
	 * @param {object}  $site_row A jQuery object representing the current site that is currently worked on
	 * @param {int}     page      The page number to display
	 * @param {string}  status    All posts having this status
	 * @param {string}  keyword   Posts matching this keyword
	 * @param {string}  date      Posts published within this month year period (e.g. JANUARY 2019)
	 * @param {boolean} refresh   Indicates whether to update the links and current selection
	 * @param {boolean} preload   Include preloaded information in the response
	 *
	 * @return {void}
	 */
	function render_post_items($site_row, page, status, keyword, date, category, refresh, preload) {
		var param = {
			name: 'get',
			arguments: {
				numberposts: numberposts,
				paged: ('undefined' !== typeof page && page) ? page : 1,
				status: ('undefined' !== typeof status && status) ? status : 'all',
				keyword: ('undefined' !== typeof keyword && keyword) ? keyword : '',
				date: ('undefined' !== typeof date && date) ? date : '',
				timeout: ('undefined' !== typeof udclion.user_defined_timeout && udclion.user_defined_timeout) ? udclion.user_defined_timeout : 30,
			}
		}

		if ('post' == module.type) {
			param.arguments.category = ('undefined' !== typeof category && category) ? category : '';
		}

		if ('undefined' !== typeof preload && preload) {
			param.arguments.preload = 1;
		}

		UpdraftCentral_Library.disable_actions();
		send_command(param, $site_row).then(function(response) {
			if ('undefined' !== typeof status && status) {
				$('ul#uc-navlinks a.uc-navlink-item[data-group="'+status+'"]').css('cssText', 'font-weight: bold !important;');
			}

			// Register response for later access before proceeding in processing it.
			if (response.hasOwnProperty(module.type+'s') && response[module.type+'s']) {
				self.manage_data.update('response', response);

				// Preloaded data are only requested once to avoid a long process of pulling
				// those time consuming information retrieval from the remote website.
				//
				// N.B. The "preloaded" property doesn't always return for every response that is
				// why we're checking it here. If we have it, then we store it. It will only be
				// requested when the "preload" parameter is set (when pressing the "Manage" button).
				if (response.hasOwnProperty('preloaded') && response.preloaded) {
					self.manage_data.update('preloaded_data', response.preloaded);

					// Save pulled "wp version" for the current site for quick access later on
					var data = JSON.parse(response.preloaded),
						site_id = $site_row.data('site_id');

					if (data.hasOwnProperty('wp_version') && data.wp_version) {
						if (!self.wp_versions.exists(site_id)) {
							self.wp_versions.add(site_id, data.wp_version);
						}
					}
				}

				if (response.hasOwnProperty('options') && response.options) {
					if ('page' == module.type) {
						if (!self.manage_data.exists('parent_options') && response.options.hasOwnProperty('page')) self.manage_data.add('parent_options', response.options.page);
					}
					if (!self.manage_data.exists('template_options') && response.options.hasOwnProperty('template')) self.manage_data.add('template_options', response.options.template);
				}
			}

			refresh = ('undefined' !== typeof refresh) ? refresh : false;
			process_response(response, $site_row, refresh);
		});
	}

	/**
	 * A simple validation function that validates some quick edit input fields
	 * for non-empty value with some numeric condition
	 *
	 * @param {int}		id			  The ID of the currently selected post
	 * @param {object}	item		  A jQuery object representing the post item
	 * @param {string}	field 		  The name of the field to check
	 * @param {boolean} numeric_check Indicates whether to check for numeric as well
	 * @param {boolean} general_edit  Indicates whether this is for general editing and not for quick edit area
	 *
	 * @return {boolean}
	 */
	function validate_quick_edit(id, item, field, numeric_check, general_edit) {
		var proceed = true;
		var value = item.val();

		if ('undefined' !== typeof numeric_check && numeric_check) {
			if (!UpdraftCentral_Library.is_numeric(value)) proceed = false;
		}

		if (0 == value.trim().length || !proceed) {
			self.dirty_edits.update(field, 1);
			UpdraftCentral_Library.dialog.alert('<h2>'+udclion.error+'</h2><p>'+sprintf(udclion[module.type+'s'].invalid_missing_value, field)+'</p>', function() {
				setTimeout(function() {
					item.trigger('focus');
				}, 500);
			});
			return false;
		} else {
			self.dirty_edits.remove(field);
			if ('undefined' !== typeof general_edit && general_edit) {
				self.uc_editor.edits.update(field, value);
			} else {
				self.quick_edits.update(field, value);
			}
		}

		return true;
	}

	/**
	 * Sets or loads listeners for the quick edit form events
	 *
	 * @param {object} $form A jQuery object representing the quick edit form
	 *
	 * @return {void}
	 */
	function load_quick_edit_listeners($form) {
		if ('undefined' !== typeof $form && $form) {
			var id = $form.data('id');
			$form.find('.uc-'+module.type+'-title input[name="post_title"]').off('change').on('change', function() {
				validate_quick_edit(id, $(this), 'title');
			});

			$form.find('.uc-'+module.type+'-slug input[name="post_name"]').off('change').on('change', function() {
				validate_quick_edit(id, $(this), 'slug');
			});

			$form.find('.uc-'+module.type+'-date select[name="mm"]').off('change').on('change', function() {
				self.quick_edits.update('mm', $(this).val());
			});

			$form.find('.uc-'+module.type+'-date input[name="jj"]').off('change').on('change', function() {
				validate_quick_edit(id, $(this), 'jj', true);
			});

			$form.find('.uc-'+module.type+'-date input[name="aa"]').off('change').on('change', function() {
				validate_quick_edit(id, $(this), 'aa', true);
			});

			$form.find('.uc-'+module.type+'-date input[name="hh"]').off('change').on('change', function() {
				validate_quick_edit(id, $(this), 'hh', true);
			});

			$form.find('.uc-'+module.type+'-date input[name="mn"]').off('change').on('change', function() {
				validate_quick_edit(id, $(this), 'mn', true);
			});

			$form.find('.uc-'+module.type+'-author select[name="post_author"]').off('change').on('change', function() {
				self.quick_edits.update('author', $(this).val());
			});

			$form.find('.uc-'+module.type+'-password input[name="post_password"]').off('change').on('change', function() {
				var result = validate_quick_edit(id, $(this), 'password');
				if (result) {
					self.quick_edits.update('visibility', 'password');
				} else {
					// Check if private is not checked, thus, we have a "public" visibility if
					// both "password" and "private" options are both empty.
					if (!$('.uc-'+module.type+'-password input[name="keep_private"]').is(':checked')) {
						self.quick_edits.update('visibility', 'public');
					}
				}
			});

			$form.find('.uc-'+module.type+'-password input[name="keep_private"]').off('click').on('click', function() {
				if ($(this).is(':checked')) {
					self.quick_edits.update('visibility', 'private');
				} else {
					// Check if password is empty, thus, we have a "public" visibility if
					// both "password" and "private" options are both empty.
					if (0 == $('.uc-'+module.type+'-password input[name="post_password"]').val().length) {
						self.quick_edits.update('visibility', 'public');
					}
				}
			});

			$form.find('.uc-'+module.type+'-parent select[name="post_parent"]').off('change').on('change', function() {
				self.quick_edits.update('parent', $(this).val());
			});

			$form.find('.uc-'+module.type+'-order input[name="post_order"]').off('change').on('change', function() {
				validate_quick_edit(id, $(this), 'order', true);
			});

			$form.find('.uc-'+module.type+'-order input[name="menu_order"]').off('change').on('change', function() {
				validate_quick_edit(id, $(this), 'order', true);
			});

			$form.find('.uc-'+module.type+'-template select[name="post_template"]').off('change').on('change', function() {
				self.quick_edits.update('template', $(this).val());
			});

			$form.find('.uc-'+module.type+'-comment-ping input[name="comment_status"]').off('click').on('click', function() {
				var comment_status = $(this).is(':checked') ? 'open' : 'closed';
				self.quick_edits.update('comment_status', comment_status);
			});

			$form.find('.uc-'+module.type+'-comment-ping input[name="ping_status"]').off('click').on('click', function() {
				var ping_status = $(this).is(':checked') ? 'open' : 'closed';
				self.quick_edits.update('ping_status', ping_status);
			});

			$form.find('.uc-'+module.type+'-status select[name="status"]').off('change').on('change', function() {
				self.quick_edits.update('status', $(this).val());
			});

			$form.find('.uc-post-sticky input[name="sticky"]').off('click').on('click', function() {
				var sticky = $(this).is(':checked') ? 1 : 0;
				self.quick_edits.update('sticky', sticky);
			});

			$form.find('ul#category-checklist input[type="checkbox"]').off('click').on('click', function() {
				var categories = [];
				$form.find('ul#category-checklist input[type="checkbox"]:checked').each(function() {
					categories.push($(this).val());
				});

				self.quick_edits.update('categories', categories);
			});

			$form.find('textarea#post_tag').off('change').on('change', function() {
				if ($(this).val().length) {
					self.quick_edits.update('tags', $(this).val().split(','));
				}
			});
		}
	}

	/**
	 * Updates the action available as bulk options when navigating from a group
	 * of items (e.g. 'draft', 'published', 'pending', etc.)
	 *
	 * @param {string} group The currently selected group
	 *
	 * @return {void}
	 */
	function update_action_options(group) {
		var post_action = $('.uc-'+module.type+'-buttons-filters select.uc-'+module.type+'-action');
		switch (group) {
			case 'publish':
				post_action.find('option[value="publish"], option[value="restore"], option[value="delete"]').hide();
				post_action.find('option[value="draft"], option[value="trash"]').show();
				break;
			case 'private':
			case 'draft':
			case 'pending':
				post_action.find('option[value="draft"], option[value="restore"], option[value="delete"]').hide();
				post_action.find('option[value="trash"], option[value="publish"]').show();
				break;
			case 'trash':
				post_action.find('option[value="draft"], option[value="trash"], option[value="publish"]').hide();
				post_action.find('option[value="restore"], option[value="delete"]').show();
				break;
			default:
				post_action.find('option[value="draft"], option[value="publish"], option[value="restore"], option[value="delete"]').hide();
				post_action.find('option[value="trash"]').show();
				break;
		}
	}

	/**
	 * Changes the state or status of the given post/page, including deletion
	 *
	 * @param {int}    id        The ID of the current post
	 * @param {string} action    The type of action that needs to be applied to the current post
	 * @param {object} $site_row A jQuery object representing the current site that is currently worked on
	 *
	 * @return {void}
	 */
	function set_state(id, action, $site_row) {
		if ('undefined' !== typeof action && action) {
			var param = {
				name: 'set_state',
				arguments: {
					id: id,
					action: action,
					paged: 1,
					status: 'all',
				}
			};
			param.arguments['number'+module.type+'s'] = numberposts;

			send_command(param, $site_row).then(function(response) {
				if ('undefined' !== typeof response[module.type]) {
					// Update row and loaded information.
					if (response.hasOwnProperty('get') && response['get']) {
						self.manage_data.update('response', response['get']);
						process_response(response['get'], $site_row, true);
					}

					var action_label = $('.uc-'+module.type+'-buttons-filters select.uc-'+module.type+'-action > option[value="'+action+'"]').text();
					UpdraftCentral_Library.dialog.alert('<h2>'+udclion[module.type+'s'].post_update_heading+'</h2><p>'+udclion[module.type+'s'].action_messages[action]+'</p>');
				} else {
					UpdraftCentral_Library.dialog.alert('<h2>'+udclion[module.type+'s'].post_update_heading+'</h2><p>'+udclion[module.type+'s'].unkown_error+'</p>');
				}
			});
		}
	}

	/**
	 * Sends command to the remote server
	 *
	 * @param {Object}  params    An object containing details of the command to execute.
	 * @param {Object}  $site_row The jQuery object representing the current site selected.
	 *
	 * @return {Object} A jQuery promise
	 */
	function send_command(params, $site_row) {
		var deferred = $.Deferred();

		UpdraftCentral.send_site_rpc(module.type+'s.'+params.name, params.arguments, $site_row, function(response, code, error_code) {
			// Since we've already received a response then we're going to terminate the processing flag
			// as there are some non-ajax based buttons that we need to trigger right after for user convenience.
			UpdraftCentral.ajax_request_processing = false;

			if (code === 'ok' && 'undefined' !== typeof response.data && null !== response.data && !response.data.error) {
				deferred.resolve(response.data);
			} else {
				if ('undefined' !== typeof response.data && response.data && 'undefined' !== typeof response.data.error) {

					var message = '';
					if ('undefined' !== typeof udclion.plugin[response.data.message]) {
						message = udclion.plugin[response.data.message];
						if ('undefined' !== typeof response.data.values && Array.isArray(response.data.values)) {
							message = vsprintf(message, response.data.values);
						}
					} else {
						// Check from the global translation
						if ('undefined' !== typeof udclion[response.data.message]) {
							message = udclion[response.data.message];
							if ('undefined' !== typeof response.data.values && Array.isArray(response.data.values)) {
								message = vsprintf(message, response.data.values);
							}
						} else {
							var error_message = response.data.message;
							if ('undefined' !== typeof response.data.messages && response.data.messages.length) error_message = response.data.messages[0];
			
							message = sprintf(udclion.plugin.general_error, error_message);
						}
					}

					UpdraftCentral_Library.dialog.alert('<h2>'+udclion.error+'</h2><p>'+message+'</p>');
				}

				deferred.reject(response);
			}
		}, $site_row, 90);
		
		return deferred.promise();
	}

	/**
	 * Renders raw options into a HTML <option> string before passing into the template
	 *
	 * @param {array}  data	   Options array that contains data to render
	 * @param {object} fields  Fields to render
	 * @param {string} type	   Optional. The type of rendering needed (e.g. 'categories', 'tags')
	 * @param {array}  exclude Do not include as options
	 *
	 * @return {string}
	 */
	function render_options(data, fields, type, exclude) {
		var options = '';
		if ('undefined' !== typeof data && data) {
			for (var i=0, info; i<data.length; i++) {
				info = data[i];
				if ('undefined' !== typeof fields && fields) {
					if ('undefined' !== typeof exclude && Array.isArray(exclude) && exclude.length && -1 !== $.inArray(info[fields.value], exclude)) {
						continue;
					}
					if ('undefined' !== typeof type && type) {
						switch (type) {
							case 'categories':
								options += '<li id="category-'+info[fields.value]+'"><label><input id="in-category-'+info[fields.value]+'" type="checkbox" name="post_category[]" value="'+info[fields.value]+'" /> '+info[fields.label]+'</label></li>';
								break;
							case 'tags':
								options += (0 == i) ? info[fields.label] : ', ' + info[fields.label];
								break;
						}
					} else {
						options += '<option value="'+info[fields.value]+'">'+info[fields.label]+'</option>';
					}
				}
			}
		}

		return options;
	}

	/**
	 * Pulls the paginated data and renders the pagination system based from the given post
	 *
	 * @param {integer} post      An optional post number to pull the items from
	 * @param {Object}	$site_row The jQuery object representing the current site selected.
	 *
	 * @return {void}
	 */
	function render_items_and_pagination(page, $site_row) {
		var data = self.pagination.get_data(page);
		var $location = $site_row.find('.updraftcentral_row_extracontents');
		var response = self.manage_data.item('response');

		// Render options - convenience of just embedding it inside the template
		// rather than running and rendering it individually for each item.
		var options = {
			template: render_options(response.options.template, {
				value: 'filename',
				label: 'template'
			}),
			page: render_options(response.options.page, {
				value: 'id',
				label: 'title'
			}),
			author: render_options(response.options.author, {
				value: 'id',
				label: 'name'
			})
		}

		if ('post' == module.type) {
			options.category = render_options(response.options.category, {
				value: 'id',
				label: 'name'
			}, 'categories');
			options.tag = render_options(response.options.tag, {
				value: 'id',
				label: 'name'
			}, 'tags');
		}

		var params = {
			options: options,
			posts: data.items,
		};

		var content = UpdraftCentral.template_replace(module.type+'s-items', params);
		$location.find('.uc-'+module.type+'-items-container').html(content);
		post_load_housekeeping($site_row);
		self.pagination.render();
		maybe_remove_block_editing($site_row);
	}

	/**
	 * Adds alternate colors for items and limit categories and tags display
	 *
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 *
	 * @return {void}
	 */
	function post_load_housekeeping($site_row) {
		var $location = $site_row.find('.updraftcentral_row_extracontents');
		$location.find('.row.uc-'+module.type+'-item:even').addClass('uc-'+module.type+'-item-even');
		$location.find('.row.uc-'+module.type+'-item:odd').addClass('uc-'+module.type+'-item-odd');

		if ('post' == module.type) {
			var fields = ['.post-item-categories', '.post-item-tags'];
			for (var i=0; i<fields.length; i++) {
				$('.uc-post-item '+fields[i]).each(function() {
					var list = '', content, items = [];
	
					content = $(this).html().trim();
					if (content.length && -1 !== content.indexOf(',')) {
						items = content.split(',');
						if (items.length > 5) {
							for (var ii=0; ii<5; ii++) list += (0 == ii) ? items[ii] : ', '+items[ii];
							list += '...';
						}
	
						if (list.length) $(this).html(list);
					}
				});
			}
		}
	}

	/**
	 * Toggles the bulk selection of the plugin items
	 *
	 * @param {object} check_all A jquery object representing the "select all" checkbox element
	 * @param {Object} $site_row The jQuery object representing the current site selected.
	 *
	 * @return {void}
	 */
	function select_items_for_processing(check_all, $site_row) {
		var item_container = $site_row.find('.uc-'+module.type+'-items-container .uc-'+module.type+'-item');
		if (check_all.is(':checked') && item_container.length) {
			item_container.find('input[name="post\[\]"]').prop('checked', true);
		} else {
			item_container.find('input[name="post\[\]"]').prop('checked', false);
		}
	}

	/**
	 * Updates navigation links count
	 *
	 * @return {void}
	 */
	function update_item_count(posts_count) {

		if ('undefined' !== typeof posts_count && posts_count) {
			var parent = $('div.uc-navlinks-container ul#uc-navlinks');

			parent.find('li.all span.count').html('('+posts_count.all+')');
			parent.find('li.publish span.count').html('('+posts_count.publish+')');
			parent.find('li.private span.count').html('('+posts_count.private+')');
			parent.find('li.draft span.count').html('('+posts_count.draft+')');
			parent.find('li.pending span.count').html('('+posts_count.pending+')');
			parent.find('li.future span.count').html('('+posts_count.future+')');
			parent.find('li.trash span.count').html('('+posts_count.trash+')');
		}
	}
}

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
		if (config.hasOwnProperty('buttons') && Array.isArray(config.buttons)) {
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
	 * Resets stored data, setting and site selection
	 *
	 * @returns {void}
	 */
	this.reset_recorder = function() {
		init();
		reset_site_selection();
	}

	/**
	 * Returns the current site being monitored and recorded
	 *
	 * @returns {object|null}
	 */
	this.get_current_site = function() {
		return ('undefined' !== typeof self.current_site && self.current_site.length) ? self.current_site : null;
	}

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
	this.is_macintosh = false;

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

		// Run platform check whether it's Macintosh or not
		is_platform_macintosh().then(function(result) {
			self.is_macintosh = result;
		});

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
	 * @param {string} $shortcut_name The name of the shortcut to be overriden
	 * @param {string} $shortcut_key  The new shortcut key entered by the user
	 * @param {object} $spinner_where A jquery object that serves as a container for the spinner
	 * @returns {object} jQuery promise object
	 */
	this.save_shortcut = function(shortcut_name, shortcut_key, $spinner_where) {
		var deferred = $.Deferred();

		UpdraftCentral.send_ajax('shortcuts', { name: shortcut_name, key: shortcut_key }, null, 'via_mothership_encrypting', $spinner_where, function(resp, code, error_code) {
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
	 * Legacy checking for Macintosh platform
	 *
	 * @returns {boolean} - true if platform/OS is Mac, false otherwise
	 */
	var legacy_platform_check = function() {
		if ('undefined' !== typeof window.navigator.userAgent) {
			// We have everything we need in the userAgent string to identify if the platform is Mac or not.
			var user_agent = window.navigator.userAgent.toLowerCase();

			// For Opera and IE browsers on Macintosh system they only have "Mac_PowerPC" in their userAgent
			// string to identify the system as Mac. The rest of the browsers contains "Macintosh" keyword. Thus,
			// the conditions below should be enough and precise to cover every browsers on Macintosh systems.
			if (-1 !== user_agent.indexOf('macintosh') || -1 !== user_agent.indexOf('mac_powerpc')) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Check whether the platform/OS used by the user is Macintosh
	 *
	 * @returns {object} jQuery promise object
	 */
	var is_platform_macintosh = function() {
		var deferred = $.Deferred();

		// Using future User Agent Client Hints (UA-CH)
		if ('undefined' !== typeof window.navigator.userAgentData && window.navigator.userAgentData) {
			if ('function' === typeof window.navigator.userAgentData.getHighEntropyValues) {
				// Even though this function is returning a promise object the result of getting the desired
				// value that we need (e.g. platform) is instantaneous, thus, we won't have to worry whether
				// there's a delay in querying if the platform is mac or not. We should be okay here as we're
				// preloading the check as soon as UpdraftCentral loads and it is a local query on the browser
				// so it should be fast enough to fill/update the `is_macintosh` variable/flag.
				window.navigator.userAgentData.getHighEntropyValues(['platform']).then(function(hints) {
					if ('undefined' !== typeof hints && 'undefined' !== typeof hints.platform) {
						var platform = hints.platform.toLowerCase();
						if (-1 !== platform.indexOf('mac')) {
							deferred.resolve(true);
						} else {
							deferred.resolve(false);
						}
					} else {
						deferred.resolve(legacy_platform_check());
					}
				});
			} else {
				deferred.resolve(legacy_platform_check());
			}
		} else {
			deferred.resolve(legacy_platform_check());
		}

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

		// Register premium shortcuts when necessary
		maybe_register_premium_shortcuts();

		// Load locally registered shortcuts
		load_local_shortcuts();

		var shortcut_storage = udclion.user_defined_shortcuts;
		if ('undefined' !== typeof udclion && 'undefined' !== typeof udclion.keyboard_shortcuts) {
			for (var name in udclion.keyboard_shortcuts) {
				var shortcut = JSON.parse(JSON.stringify(udclion.keyboard_shortcuts[name]));
				var key = shortcut.key;
				var bypass = false;

				if (shortcut.menu.length && !$('#updraft-menu-item-'+shortcut.menu).is(':visible')) {
					bypass = true;
				}

				if (!bypass) {
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

		if ('function' === typeof onload_callback) {
			onload_callback.apply(null, []);
		}

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

		// Prevent processing of shortcut if user opted to deactivate it from the settings area
		if ('inactive' === udclion.shortcut_status) {
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

		// NEW: When the UC page/post editor loads we bypass processing of shortcuts as to allow
		// any available shortcuts the current editor has.
		var has_editor_loaded = false;
		if ($('#classic_editor_container').is(':visible') || $('#gutenberg_editor_container').is(':visible')) has_editor_loaded = true;

		if (has_focus_on_content || has_focus_on_dialog || has_focus_on_bootbox_dialog || has_editor_loaded) {
			return;
		}

		// Check whether we need Mac OS keys to map and process. By default,
		// these are windows description.
		var ctrl_key = 'CTRL',
			alt_key = 'ALT',
			shift_key = 'SHIFT';

		// Construct and combine the inputted keys that will be used to run and execute based on
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
							$('#updraft-menu-item-'+shortcut.menu).trigger('click');
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

							var active_menu = $('.updraft-menu-item-links-active').prop('id').replace('updraft-menu-item-', '');
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
								$('#updraft-menu-item-'+shortcut.menu).trigger('click');
							}

						}
					}

				} else {
					// Same as "upgrade" section - no action but with menu
					if (shortcut.menu.length) {
						// Activate the menu associated with the shortcut to display the content.
						// Basically, automating the clicking of the menu located at the side bar.
						$('#updraft-menu-item-'+shortcut.menu).trigger('click');
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
			var shortcut_display = '<span class="uc_current_shortcut">'+key+'</span>';
			if (self.is_macintosh) {
				var mac_key = key.replace('CTRL', 'CONTROL').replace('ALT', 'OPTION');
				// We keep the "uc_current_shortcut" in here by hiding it instead of completely removing it
				// because this is being refered to when saving a new key. We're not allowing the user
				// to control its visibility thus, we're adding the style="display:none;" attribute directly.
				shortcut_display = '<span class="uc_current_shortcut" style="display:none;">'+key+'</span><span class="uc_current_mac_shortcut">'+mac_key+'</span>';
			}

			list += '<li data-name="'+shortcut.name+'">'+shortcut.description+' <span>('+udclion.shortcut_key+': '+shortcut_display+')</span> <span class="uc_change_shortcut">'+udclion.keyboard_change_shortcut+'</span> <div class="uc_shortcut_elements"></div></li>';
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

			var modifier_options = '',
				option = '';
			for (var i=0; i<modifiers.length; i++) {
				option = modifiers[i];
				if (self.is_macintosh) {
					option = option.replace('CTRL', 'CONTROL').replace('ALT', 'OPTION');
				}

				modifier_options += '<option value="'+modifiers[i]+'">'+option+'</option>';
			}

			var modifier_options = '<select><option value="">'+udclion.keyboard_choose_modifiers+'</option>'+modifier_options+'</select> ';
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

						self.save_shortcut(name, shortcut.key, $container.parent()).then(function(response) {
							shortcuts.add(shortcut.key, shortcut);
							shortcuts.remove(current_key);

							current_shortcut_container.html(shortcut.key);
							if (self.is_macintosh) {
								var mac_key = shortcut.key.replace('CTRL', 'CONTROL').replace('ALT', 'OPTION');
								current_shortcut_container.siblings('.uc_current_mac_shortcut').html(mac_key);
							}

							// Update popups collection with the new key:
							if (popups.exists(current_key)) {
								popups.remove(current_key);
								popups.add(new_shortcut, true);
							}
						}).always(function() {
							$container.parent().find('span.uc_change_shortcut').show();
							$container.html('');
						});
					}
				}

			}
		});

		UpdraftCentral.register_event_handler('click', '.modal-dialog button.uc_cancel_shortcut', function() {
			var $container = $(this).closest('li');
			$container.find('span.uc_change_shortcut').show();
			$container.find('div.uc_shortcut_elements').html('');
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
				if ('undefined' !== typeof response.shortcuts) {
					udclion.user_defined_shortcuts = response.shortcuts;
				}

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
				if (shortcut.menu.length && $('#updraft-menu-item-'+shortcut.menu).is(':visible')) {
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
				var menu_active = $('#updraft-menu-item-'+menu+'.updraft-menu-item-links-active');
				if (!menu_active.length) {
					$('#updraft-menu-item-'+menu).trigger('click');
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
		} else {
			return self.add(key, item);
		}
		return false;
	}
	
	this.bulk_update = function(data) {
		for (var prop in data) {
			self.update(prop, data[prop]);
		}
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

	this.get_collection_object = function() {
		return collection;
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
						jQuery('#updraftcentral_modal .request-filesystem-credentials-dialog-content input[value=""]:first').trigger('focus');

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
	 * Retrieves any available credentials information from the "updates.get_updates"
	 * cached data if available and it is still good to use meaning the data is less than 12 hours
	 *
	 * @param {integer} site_id The ID of the currently processed site
	 * @returns {object|boolean}
	 */
	var maybe_retrieve_credentials_info = function(site_id) {
		// N.B. The best place to look for any available creds info is within the 'updates.get_updates' command if they
		// exists in the site_info array since the 'updates.get_updates' response has a "meta" field that already contains
		// the "request_filesystem_credentials" and "filesystem_form" informations of the requested site. So, instead of
		// sending a new remote request we just have to retrieve the cached info and return them if available, otherwise,
		// we'll proceed in sending the request to the remote site.
		//
		// If found, this cuts the loading process within the "updates" area whether for the individual site or mass
		// updates in half.
		var cached_response = UpdraftCentral.get_cached_response(site_id, 'updates.get_updates');
		if (null !== cached_response && UpdraftCentral.is_data_good_to_use(cached_response.created)) {
			var data = cached_response.reply.data;
			if (data.hasOwnProperty('meta') && data.meta) {
				return data.meta;
			}
		}

		return false;
	}
	
	/**
	 * Gets the credentials from the remote server
	 *
	 * @returns {object} - A jQuery promise with the response from the server
	 * @borrows {UpdraftCentral.send_site_rpc}
	 */
	var get_remote_credentials = function($site_row) {
		var deferred = jQuery.Deferred();
		var info = maybe_retrieve_credentials_info($site_row.data('site_id'));
		if (false !== info) {
			deferred.resolve(info);
		} else {
			UpdraftCentral.send_site_rpc('core.get_credentials', null, $site_row, function(response, code, error_code) {
				if (code === 'ok' && response) {
					deferred.resolve(response.data);
				} else {
					deferred.reject(response, code, error_code);
					return true;
				}
			});
		}
		
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
function Fn_UpdraftCentral_Library() {
	// Dialog methods - this is just an abstraction layer (currently onto Bootbox, http://bootboxjs.com), allowing us to easily swap to a different provider if we ever need to
	this.dialog = {};
	
	var $ = jQuery;

	var collection = new UpdraftCentral_Collection();

	/**
	 * Determines whether its argument represents a JavaScript number
	 *
	 * @param mixed value The value to evaluate
	 *
	 * @returns boolean
	 */
	this.is_numeric = function(value) {
		if ('number' === typeof value) return true;
		if ('string' !== typeof value) return false;

		return !isNaN(value) && !isNaN(parseFloat(value));
	}

	/**
	 * Parses the input value to its actual boolean representation if applicable
	 *
	 * @param mixed value The value to evaluate
	 *
	 * @returns boolean
	 */
	this.parseBool = function(value) {
		// This effort may look unnecessary but it helps to prevent varying values that equates to boolean
		// which might give unexpected results if not properly converted to the expected type. Using
		// JSON.parse or a simple comparison logic may not always work in all cases, thus, we go the
		// extra length to prevent any unexpected bugs.
		if ('string' === typeof value && ('true' == value.toLowerCase() || '1' == value)) value = true;
		if ('string' === typeof value && ('false' == value.toLowerCase() || '0' == value)) value = false;
		if ('number' === typeof value && 1 == value) value = true;
		if ('number' === typeof value && 0 == value) value = false;

		// For any type other than we expect for a boolean value we set it to "false" to return gracefully.
		if ('boolean' !== typeof value) value = false;

		return value;
	}

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
		if (!Array.isArray(items) || 'string' !== typeof field) return;
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
		if (!Array.isArray(items) || !Array.isArray(fields) || 'string' !== typeof keyword) return;

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
		if ('undefined' !== typeof exceptions && Array.isArray(exceptions)) {
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

		$('.bootbox.modal .updraftcentral_site_editdescription').on('click', function(e) {
			e.preventDefault();
			$(this).closest('.modal').modal('hide');
			open_site_configuration(UpdraftCentral.$site_row);
		});

		$('.bootbox.modal .updraftcentral_test_other_connection_methods').on('click', function(e) {
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
	 * @param {string|null} id - a unique identifier that will be used to identify and check whether the dialog is currently opened
	 * @param {object} labels - custom button labels for confirm and cancel buttons (e.g. { confirm: 'Yes', cancel: 'No' })
	 * @returns {void}
	 */
	this.dialog.confirm = function(question, result_callback, id, labels) {
		var key = ('undefined' !== typeof id && id) ? id : UpdraftCentral_Library.md5('_confirm_'+question);
		if (!collection.exists(key)) {
			collection.add(key, true);

			var config = {
				message: question,
				callback: result_callback
			};

			if ('undefined' !== typeof labels && labels) {
				var buttons = {
					confirm: {label: udclion.ok},
					cancel: {label: udclion.cancel}
				}

				if (labels.hasOwnProperty('confirm') && labels.confirm) buttons.confirm.label = labels.confirm;
				if (labels.hasOwnProperty('cancel') && labels.cancel) buttons.cancel.label = labels.cancel;

				config.buttons = buttons;
			}

			var dialog = bootbox.confirm(config);
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
	 * Open a message box with custom buttons to attach to the dialog
	 *
	 * @param {string} message - the message to display in the message box
	 * @param {string} id      - a unique identifier that will be used to identify and check whether the dialog is currently opened
	 * @param {object} buttons - custom buttons to attach
	 * @returns {void}
	 */
	this.dialog.custom = function(message, id, buttons) {
		var key = ('undefined' !== typeof id && id) ? id : UpdraftCentral_Library.md5('_custom_'+message);
		if (!collection.exists(key)) {
			collection.add(key, true);

			var dialog = bootbox.dialog({
				message: message,
				backdrop: 'static',
				closeButton: true,
				buttons: buttons
			});
			bootbox_opened(key, dialog);
		}
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
			if (win instanceof jQuery) {
				win.trigger('focus');
			} else {
				win.focus();
			}
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
			$('#updraftcentral_dashboard').parent().fullscreen({toggleClass: 'updraft-fullscreen' });
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
