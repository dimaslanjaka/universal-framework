jQuery(function($) {
	new UpdraftCentral_Events_Management();
});

/**
 * An object for viewing recorded events
 *
 * @constructor
 * @return {void}
 */
function UpdraftCentral_Events_Management() {
	var self = this;
	var $ = jQuery;
	var sites = new UpdraftCentral_Collection();
	var debug_level = UpdraftCentral.get_debug_level();
	var is_subscribed = false;
	this.container_visible_state = {
		search: true,
		sites: true
	}
	
	/**
	 * Subscribe to events table changes (e.g. addition of child nodes to adjust to mobile view) and
	 * add/update listeners to work on the newly added elements.
	 *
	 * @return {void}
	 */
	this.update_listener_on_mobile_view = function() {
		if (!is_subscribed) {
			UpdraftCentral.subscribe_to_node_changes($('table#updraftcentral_events_table > tbody'), function(changes, observer) {
				var added = [];
				for (var i=0; i<changes.length; i++) {
					var record = changes[i];
					if (record.addedNodes.length) added.push(record.addedNodes[0].className);
				}

				if (-1 !== added.indexOf('child')) {
					$('a.updraftcentral_events_result_view').off('click').on('click', function() {
						var events_result_data = atob($(this).attr('data-event_result_data'));
						UpdraftCentral_Library.dialog.alert('<h2>'+udclion.events.events_result_data+'</h2><p><div class="updraftcentral_events_result_data">'+events_result_data+'</div></p>');
					});
				}
			}, 'events-table');
			is_subscribed = true;
		}
	}

	// Register the row clickers and modal listeners which are active in every tab
	$('#updraftcentral_dashboard_existingsites').on('updraftcentral_dashboard_mode_set', function(event, data) {

		if (data && data.hasOwnProperty('new_mode') && data.new_mode === 'events') {
			// Since we're going to forcefully hide the search and sites container, thus, it is only appropriate
			// to preserve the current visible states of these containers so that we can restore it later from where
			// it was before we hide them.
			self.container_visible_state.search = $('#updraftcentral_sites_search_area').is(':visible');
			self.container_visible_state.sites = $('#updraftcentral_dashboard_existingsites_container').is(':visible');

			$('#updraftcentral_sites_search_area').hide();
			$('#updraftcentral_dashboard_existingsites_container').hide();

			if (!$.fn.DataTable.fnIsDataTable($('#updraftcentral_events_table').get(0))) {
				var spinner;
				$('#updraftcentral_events_table').on('draw.dt', function() {
					$('a.updraftcentral_events_result_view').on('click', function() {
						var events_result_data = atob($(this).attr('data-event_result_data'));
						UpdraftCentral_Library.dialog.alert('<h2>'+udclion.events.events_result_data+'</h2><p><div class="updraftcentral_events_result_data">'+events_result_data+'</div></p>');
					});

					self.update_listener_on_mobile_view();
				}).on('preXhr.dt', function(e, settings, data) {
					spinner = $(this).find('.updraftcentral_spinner');
					if (0 === spinner.length) {
						$(this).prepend('<div class="updraftcentral_spinner"></div>');
					}
				}).on('xhr.dt', function(e, settings, json, xhr) {
					spinner = $(this).find('.updraftcentral_spinner');
					if (spinner.length) spinner.remove();
				}).DataTable({
					autoWidth: true,
					bStateSave: false,
					lengthMenu: [[10, 25, 50, 100], [10, 25, 50, 100]],
					responsive: true,
					processing: false,
					serverSide: true,
					infoCallback: function(settings, start, end, max, total, pre) {
						start = (0 === total) ? 0 : start;
						var pagination_status = sprintf(udclion.events.showing, start, end, total);
						if (total !== max) {
							pagination_status += ' ('+sprintf(udclion.events.filtered_from, max)+')';
						}

						return pagination_status;
					},
					ajax: {
						url: udclion.ajaxurl,
						type: "POST",
						data: function(dtp) {
							dtp_data = $.extend({}, dtp);
							dtp.action = 'updraftcentral_dashboard_ajax';
							dtp.subaction = 'events';
							dtp.component = 'dashboard';
							dtp.nonce = udclion.updraftcentral_dashboard_nonce;
							dtp.data = dtp_data;
							return dtp;
						},
						dataFilter: function(data) {
							try {
								var json = JSON.parse(data);
								json.recordsTotal = parseInt(json.recordsTotal);
								json.recordsFiltered = parseInt(json.recordsTotal);
								return JSON.stringify(json);
							} catch(e) {
								return data;
							}
						}
					},
					columns: [
						{ data: 'event_name' },
						{ data: 'description' },
						{ data: 'event_status' },
						{ data: 'time' },
						{ data: 'event_result_data' }
					]
				});
			}
			return;
		} else if (data && data.hasOwnProperty('previous_mode') && data.hasOwnProperty('new_mode')) {
			if ('events' === data.previous_mode && 'events' !== data.new_mode && 'notices' !== data.new_mode) {
				// We will only show the search and sites container if their previous states was set to visible before
				// we hide them, if not, then we will leave it as is, as other features/functions of UpdraftCentral might have
				// hide them intentionally.
				if (self.container_visible_state.search) $('#updraftcentral_sites_search_area').show();
				if (self.container_visible_state.sites) $('#updraftcentral_dashboard_existingsites_container').show();
			}
		}

		/**
		 * Handles the click event of the refresh list button
		 *
		 * @see {UpdraftCentral.register_event_handler}
		 */
		UpdraftCentral.register_event_handler('click', 'button#uc-btn-refresh-list', function() {
			var table = $('#updraftcentral_events_table').DataTable();
			table.search('');
			table.page.len(10);
			table.ajax.reload(function(data) {
				table.columns.adjust().draw();
			});
		});
	});
}
