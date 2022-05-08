jQuery(function($) {

	$('#updraftcentral_dashboard_existingsites').on('updraftcentral_dashboard_mode_set_advancedtools', function() {
		
		UpdraftCentral.register_row_clicker('.updraftcentral_site_advanced_settings', function($site_row) {

			UpdraftCentral.send_site_rpc('updraftplus.get_advanced_settings', { suppress_plugins_for_debugging: true } , $site_row, function(response, code, error_code) {
				if ('ok' === code) {
					$site_row.find('.updraftcentral_row_extracontents').empty().append(UpdraftCentral_Library.sanitize_html(response.data));
				}
			});
		}, true);

		UpdraftCentral.register_row_clicker('.advanced_settings_container .advanced_settings_menu .advanced_tools_button', function(event) {
			advanced_tool_hide(this.id);
		});

		/**
		 * Sets the desired tool to be shown and active, hides all other tools
		 *
		 * @param {string} show_tool - the tool that is to be shown and set to active
		 *
		 * @return {void}
		 */
		function advanced_tool_hide(show_tool) {
			
			$('.expertmode .advanced_settings_container .advanced_tools:not(".'+show_tool+'")').hide();
			$('.expertmode .advanced_settings_container .advanced_tools.'+show_tool).fadeIn('slow');
			
			$('.expertmode .advanced_settings_container .advanced_tools_button:not(#'+show_tool+')').removeClass('active');
			$('.expertmode .advanced_settings_container .advanced_tools_button#'+show_tool).addClass('active');
			
		}
		
		UpdraftCentral.register_row_clicker('.advanced_settings_container .advanced_settings_content a.updraft_diskspaceused_update', function($site_row) {
			// var spin_this = this.closest('ul');
			$site_row.find('.updraft_diskspaceused').html('<em>'+ udclion.advancedtools.calculating + '</em>');
			UpdraftCentral.send_site_rpc('updraftplus.get_fragment', { fragment: 'disk_usage', data: 'updraft' } , $site_row, function(response, code, error_code) {
				if ('ok' == code && response) {
					$site_row.find('.updraft_diskspaceused').html(UpdraftCentral_Library.sanitize_html(response.data.output));
				}
			});
		});
		
		UpdraftCentral.register_row_clicker('.advanced_settings_container .advanced_settings_content .site_info #updraftplus-phpinfo', function($site_row, event) {

			UpdraftCentral.send_site_rpc('core.phpinfo', null , $site_row, function(response, code, error_code) {
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
					UpdraftCentral.open_modal(udclion.advancedtools.php_info, '<div id="updraftcentral_phpinfo_results">'+output+'</div>', null, false, null, true, 'modal-lg');
				}
			}, $(this));
		});
		
		UpdraftCentral.register_row_clicker('.advanced_settings_container .advanced_settings_content .site_info #updraftplus_httpget_go', function($site_row, event) {
			data = $('#updraftplus_httpget_uri').val()
			UpdraftCentral.send_site_rpc('updraftplus.http_get', data , $site_row, function(response, code, error_code) {
				UpdraftCentral.open_modal(udclion.advancedtools.response, '<p>' + UpdraftCentral_Library.sanitize_html(response.data.response) + '</p>', null, false, null, true);
			});
		});

		UpdraftCentral.register_row_clicker('.advanced_settings_container .advanced_settings_content .site_info #updraftplus_httpget_gocurl', function($site_row, event) {
			var data = $('#updraftplus_httpget_uri').val();
			
			UpdraftCentral.send_site_rpc('updraftplus.http_get_curl', data , $site_row, function(response, code, error_code) {
				UpdraftCentral.open_modal(udclion.advancedtools.response, '<p><pre>' + UpdraftCentral_Library.sanitize_html(response.data.response) + '</pre></p>', null, false, null, true, 'modal-lg');
			});
		});

		UpdraftCentral.register_row_clicker('.advanced_settings_container .advanced_settings_content .site_info #updraftplus_callwpaction_go', function($site_row, event) {
			var data = { "wpaction": $('#updraftplus_callwpaction').val()};
				
			UpdraftCentral.send_site_rpc('core.call_wordpress_action', data , $site_row, function(response, code, error_code) {

				UpdraftCentral.open_modal(udclion.advancedtools.response, '<p>' + UpdraftCentral_Library.sanitize_html(response.data.response) + '</p>', null, false, null, true);
			});
		});

		UpdraftCentral.register_row_clicker('.advanced_settings_container .advanced_settings_content .site_info #updraft_reset_sid', function($site_row, event) {
			UpdraftCentral.send_site_rpc('updraftplus.reset_site_id', null , $site_row, function(response, code, error_code) {
				$('#updraft_show_sid').text(response.data);
			});
		});

		UpdraftCentral.register_row_clicker('.advanced_settings_container .advanced_settings_content .site_info #updraftplus-rawbackuphistory', function($site_row, event) {
			UpdraftCentral.send_site_rpc('updraftplus.show_raw_backup_and_file_list', null , $site_row, function(response, code, error_code) {
				UpdraftCentral.open_modal(udclion.advancedtools.raw_backup_history, '<pre><div id="raw_backup_modal">' + UpdraftCentral_Library.sanitize_html(response.data) + '</div></pre>', null, false, null, true, 'modal-lg');
			});
		});

		UpdraftCentral.register_row_clicker('.advanced_settings_container .advanced_settings_content .lock_admin .change_lock_settings', function($site_row, event) {
			var data = {
					"old_password": $('#updraft_unlockadmin_oldpassword').val(),
					"password": $('#updraft_unlockadmin_password').val(),
					"session_length": $('#updraft_unlockadmin_session_length').val(),
					"support_url": $('#updraft_unlockadmin_support_url').val()
			};
			
			UpdraftCentral.send_site_rpc('updraftplus.change_lock_settings', data , $site_row, function(response, code, error_code) {
				$('#updraft_unlockadmin_oldpassword').val(data.password);
				
				if (data.password == '') {
					message = udclion.advancedtools.settings_unlocked;
				} else {
					message = udclion.advancedtools.password_changed_to + " '" + data.password + "' ";
				}

				UpdraftCentral.open_modal(udclion.advancedtools.lock_changed, "<p>" + message + "</p>", null, false, null, true);
			});
		});
		
		UpdraftCentral.register_row_clicker('.advanced_settings_container .advanced_settings_content .updraft_central .updraft_debugrow .updraftcentral_key_delete', function($site_row, event) {
			var key_id = $(this).data('key_id');
			
			UpdraftCentral.send_site_rpc('updraftplus.delete_key', key_id , $site_row, function(response, code, error_code) {
				var cont = $site_row.find('#updraftcentral_keys');
				cont.replaceWith(response.data.keys_table);
			});
		});
		
		UpdraftCentral.register_row_clicker('.advanced_settings_container .advanced_settings_content .updraft_central #updraftcentral_view_log', function($site_row, event) {
			UpdraftCentral.send_site_rpc('updraftplus.fetch_log', null , $site_row, function(response, code, error_code) {
				UpdraftCentral.open_modal(udclion.advancedtools.log, "<pre>" + UpdraftCentral_Library.sanitize_html(response.data.log_contents) + "</pre>", function() {}, false, null, false, 'modal-lg');
			});
		});

		UpdraftCentral.register_row_clicker('.advanced_settings_container .advanced_settings_content .search_replace #search_replace_form .search_and_replace', function($site_row, event) {
			var data = {
				search: $site_row.find('#search').val(),
				replace: $site_row.find('#replace').val(),
				pagesize: $site_row.find('#pagesize').val(),
				whichtables: $site_row.find('#whichtables').val(),
				show_return_link: false,
				show_heading: false
			}
			
			UpdraftCentral.send_site_rpc('updraftplus.search_replace', data , $site_row, function(response, code, error_code) {
				UpdraftCentral.open_modal(udclion.advancedtools.response,
					'<h2>'+udclion.advancedtools.search_replace+'</h2><pre>'+UpdraftCentral_Library.sanitize_html(response.data.log)+'</pre>',
					null,
					false,
					null,
					true
				);
			});
		});
		
		UpdraftCentral.register_modal_listener('.return_to_updraft', function(event) {
			event.preventDefault();
			UpdraftCentral.close_modal();
		});
		
		UpdraftCentral.register_row_clicker('.advanced_settings_container .advanced_settings_content .total_size .count', function(event) {
			var entity = $(this).data('type');
			
			jQuery('#updraft_diskspaceused_' + entity).html('<em>'+ udclion.advancedtools.calculating + '</em>');
			
			var $site_row = $(this).closest('.updraftcentral_site_row');
			UpdraftCentral.send_site_rpc('core.count', entity , $site_row, function(response, code, error_code) {
				jQuery('#updraft_diskspaceused_'+entity).html(response.data);
			});
		});

		UpdraftCentral.register_row_clicker('.advanced_settings_container .advanced_settings_content #updraftplus-settings-export', function($site_row, event) {
			UpdraftCentral.send_site_rpc('updraftplus.get_settings', {
				include_database_decrypter: 0,
				include_adverts: 0,
				include_save_button: 1
				}, $site_row, function(response, code, error_code) {
				var settings_html = UpdraftCentral_Library.sanitize_html(response.data.settings);
				export_settings(settings_html, $site_row);
			});
		});

		UpdraftCentral.register_row_clicker('.advanced_settings_container .advanced_settings_content #updraftplus-settings-import', function($site_row, event) {
			
			var updraft_import_file_input = document.getElementById('import_settings');
			if (updraft_import_file_input.files.length == 0) {
				UpdraftCentral_Library.dialog.alert(udclion.advancedtools.import_select_file);
				return;
			}

			var updraft_import_file_file = updraft_import_file_input.files[0];
			var updraft_import_file_reader = new FileReader();
			updraft_import_file_reader.onload = function() {
				import_settings(this.result);
			};
			updraft_import_file_reader.readAsText(updraft_import_file_file);

		});

		UpdraftCentral.register_row_clicker('.advanced_settings_container .advanced_settings_content .updraft_wipe_settings', function($site_row, event) {
			
			UpdraftCentral.send_site_rpc('updraftplus.wipe_settings', null, $site_row, function(response, code, error_code) {

				if (true == response.data) {
					message = udclion.advancedtools.settings_wiped;
				} else {
					message = udclion.advancedtools.wipe_settings_error;
				}

				UpdraftCentral.open_modal(udclion.advancedtools.wipe_settings, "<p>" + message + "</p>", null, false, null, true);
			});
		});
	});
	
	/**
	 * A Method to get the currently saved UpdraftPlus settings in JSON format ready to be saved to a file so the user can import settings to another site.
	 *
	 * @param {String} settings_html The UpdraftPlus settings page HTML to be parsed to gather the current saved settings.
	 * @param {string} $site_row The jQuery row object for the site that the click was for.
	 *
	 * @return {void} The method will output will prompt the user to download a JSON file with the exported settings as it's content
	 */
	function export_settings(settings_html, $site_row) {
		var form_data = gather_updraft_settings(settings_html).split('&');
		var input = {};
		
		// Function to convert serialized settings to the correct format ready for json encoding
		$.each(form_data, function(key, value) {
			var data = value.split('=');

			var name = decodeURIComponent(data[0]);
			if (name.indexOf("option_page") >= 0 || name.indexOf("_wpnonce") >= 0 || name.indexOf("_wp_http_referer") >= 0) {
				return true;
			}
			
			if (name.indexOf("[") >= 0) {
				var extract = name.match(/\[(.*)\]/).pop();
				name = name.substring(0, name.indexOf('['));
				// some options either have a blank or 0 as their nested array key and need to be delt with differently
				if (!extract || extract === '0') {
					if ("undefined" === typeof input[name]) input[name] = [];
					input[name].push(decodeURIComponent(data[1]));
				} else {
					// @codingStandardsIgnoreLine
					if (typeof input[name] === "undefined") input[name] = {} ;
					input[name][extract] = decodeURIComponent(data[1]);
				}
			} else {
				input[name] = decodeURIComponent(data[1]);
			}
		});
		
		var date_now = new Date();
		
		form_data = JSON.stringify({
			// Indicate the last time the format changed - i.e. do not update this unless there is a format change
			version: '1.12.19',
			epoch_date: date_now.getTime(),
			local_date: date_now.toLocaleString(),
			network_site_url: $site_row.data("site_url"),
			data: input
		});

		$("body").append('<div id="udc_exported_settings" style="display:none;">' + form_data + '</div>');

		UpdraftCentral_Library.download_inner_html('updraftplus-settings.json', 'udc_exported_settings', 'text/json');
		
		$("#udc_exported_settings").remove();
	}

	/**
	 * This method will gather the needed settings to be exported from the HTML passed to it.
	 *
	 * @param {String} settings_html - The UpdraftPlus settings page HTML to be parsed to gather the current saved settings
	 *
	 * @return {String} form_data - The parsed UpdraftPlus settings in a serialized format
	 */
	function gather_updraft_settings(settings_html) {
		// Attach this data to a hidden div on page
		$("body").append('<div class="hidden_udp_settings" style="display:none;">' + settings_html + '</div>');
		
		// Excluding the unnecessary 'action' input avoids triggering a very mis-conceived mod_security rule seen on one user's site
		var form_data = $(".hidden_udp_settings input[name!='action'], .hidden_udp_settings textarea, .hidden_udp_settings select").serialize();

		// include unchecked checkboxes. user filter to only include unchecked boxes.
		$.each($('.hidden_udp_settings input[type=checkbox]')
			.filter(function(idx) {
				return $(this).prop('checked') == false
			}),
			function(idx, el) {
				// attach matched element names to the form_data with chosen value.
				var empty_val = '0';
				form_data += '&' + $(el).attr('name') + '=' + empty_val;
			}
		);

		$(".hidden_udp_settings").remove();
		
		return form_data;
	}

	/**
	 * Method to parse through the import file and send the data to the UpdraftPlus save handler
	 *
	 * @param {JSON} updraft_file_result - the contents of the imported file
	 *
	 * @return {void}
	 */
	function import_settings(updraft_file_result) {
		
		var data = decodeURIComponent(updraft_file_result);

		data = JSON.parse(data);

		UpdraftCentral_Library.dialog.confirm(udclion.advancedtools.importing_data_from + ' ' + data['network_site_url'] + "\n" + udclion.advancedtools.exported_on + ' ' + data['local_date'] + "\n" + udclion.advancedtools.continue_import, function(result) {
			
			if (result) {
				data = data['data'];
				
				UpdraftCentral.send_site_rpc('updraftplus.save_settings', data, $site_row, function(response, code, error_code) {
					
					if ('ok' === code) {
						message = udclion.advancedtools.import_success;
					} else {
						message = udclion.advancedtools.import_failed;
					}

					UpdraftCentral.open_modal(udclion.advancedtools.import_settings, "<p>" + message + "</p>", null, false, null, true);
				});
			}

		});
	}
});
