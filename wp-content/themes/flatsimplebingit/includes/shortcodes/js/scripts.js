(function( $ ) {

	var shortcode = '';
	var inner = '';
	
	$('#shortcode-dropdown').live('change', function() {
		var $currentShortcode = $(this).val();
		$('#shortcode').empty();
		/* General */
		if( $currentShortcode === 'accordion-content' ) {
			ktz_show_option('.accordion-content');
		} else if( $currentShortcode === 'button-sc' ) {
			ktz_show_option('.button-sc');
		} else if( $currentShortcode === 'divider' ) {
			ktz_show_option('.divider');		
		} else if( $currentShortcode === 'dropcap' ) {
			ktz_show_option('.dropcap');		
		} else if( $currentShortcode === 'highlight-sc' ) {
			ktz_show_option('.highlight-sc');
		} else if( $currentShortcode === 'icon-sc' ) {
			ktz_show_option('.icon-sc');
		} else if( $currentShortcode === 'infobox' ) {
			ktz_show_option('.infobox');
		} else if( $currentShortcode === 'layout' ) {
			ktz_show_option('.layout');
		} else if( $currentShortcode === 'list-sc' ) {
			ktz_show_option('.list-sc');
		} else if( $currentShortcode === 'popover' ) {
			ktz_show_option('.popover');
		} else if( $currentShortcode === 'progressbar' ) {
			ktz_show_option('.progressbar');
		} else if( $currentShortcode === 'table-sc' ) {
			ktz_show_option('.table-sc');
		} else if( $currentShortcode === 'tabs-sc' ) {
			ktz_show_option('.tabs-sc');
		} else if( $currentShortcode === 'tooltips' ) {
			ktz_show_option('.tooltips');
		/* Media */
		} else if( $currentShortcode === 'image-sc' ) {
			ktz_show_option('.image-sc');
		} else if( $currentShortcode === 'googlemap' ) {
			ktz_show_option('.googlemap');
		} else if( $currentShortcode === 'soundcloud' ) {
			ktz_show_option('.soundcloud');
		} else if( $currentShortcode === 'video' ) {
			ktz_show_option('.video');
		} else if( $currentShortcode === 'sitemap' ) {					
			ktz_show_option('.sitemap');
		} else if( $currentShortcode === 'viral-lock-content' ) {					
			ktz_show_option('.viral-lock-content');
		} else {
			$('.option').hide();
			shortcode = '';
		}
		$('#shortcode').html( shortcode );
	});
	$('#insert-shortcode').live('click', function() {
		var $currentShortcode = $('#shortcode-dropdown').val();
		/* General */
		if( $currentShortcode === 'accordion-content' ) {
			var accordion_num = $('#accordion-num').val();
			for( var i=1; i<= accordion_num; i++) {
				inner += '[accordion title="Title Accordion' + i + '"]Accordion' + i + ' for the content.[/accordion]';
				}
				shortcode = '[accordions]' + inner + '[/accordions]';
		} else if( $currentShortcode === 'button-sc' ) {
			var button_url = $('#button-url').val();
			var button_text = $('#button-text').val();
			var button_icon = $('#button-icon').val();
			var button_type = $('#button-type').val();
			var button_rounded = $('#button-rounded').val();
			var button_target = $('#button-target').val();
			var button_size = $('#button-size').val();
				shortcode = '[button href="' + button_url + '" icon="' + button_icon + '" rounded="' + button_rounded + '" size="' + button_size + '" style="' + button_type + '" target="' + button_target + '"]' + button_text + '[/button]';
		} else if( $currentShortcode === 'divider' ) {					
			var divider_id = $('#divider-id').val();
			var divider_choice = $('#divider-choice').val();
				shortcode = '[divider style="' + divider_choice + '"]';		
		} else if( $currentShortcode === 'dropcap' ) {
			var dropcap_text = $('#dropcap-text').val();
			var dropcap_choice = $('#dropcap-choice').val();
			var dropcap_rounded = $('#dropcap-rounded').val();
				shortcode = '[dropcap style="' + dropcap_choice + '" rounded="' + dropcap_rounded + '"]' + dropcap_text + '[/dropcap]';	
		} else if( $currentShortcode === 'highlight-sc' ) {	
			var highlight_style = $('#highlight-style').val();
			var highlight_text = $('#highlight-text').val();
				shortcode = '[highlight style="' + highlight_style + '"]' + highlight_text + '[/highlight]';	
		} else if( $currentShortcode === 'icon-sc' ) {	
			var icon_choice = $('#icon-choice').val();
			var icon_color = $('#icon-color').val();
			var icon_size = $('#icon-size').val();
				shortcode = '[icon type="' + icon_choice + '" color="' + icon_color + '" size="' + icon_size + '"][/icon]';
		} else if( $currentShortcode === 'infobox' ) {					
			var infobox_choice = $('#infobox-choice').val();
			var infobox_desc = $('#infobox-desc').val();
				shortcode = '[infobox style="' + infobox_choice + '"]' + infobox_desc + '[/infobox]';		
		} else if( $currentShortcode === 'layout' ) {					
			var text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus leo ante, consectetur sit amet vulputate vel, dapibus sit amet lectus.';
			var col_layout =$('#layout-choice').val();
			switch(col_layout) {
				case 'layout1':
				shortcode = '[coloum_row][coloum_one]' + text + '[/coloum_one][/coloum_row]';
				break;
				case 'layout2':
				shortcode = '[coloum_row][coloum_one_half]' + text + '[/coloum_one_half][coloum_one_half]' + text + '[/coloum_one_half][/coloum_row]';
				break;
				case 'layout3':
				shortcode = '[coloum_row][coloum_one_third]' + text + '[/coloum_one_third][coloum_one_third]' + text + '[/coloum_one_third][coloum_one_third]' + text + '[/coloum_one_third][/coloum_row]';
				break;
				case 'layout4':
				shortcode = '[coloum_row][coloum_two_third]' + text + '[/coloum_two_third][coloum_one_third]' + text + '[/coloum_one_third][/coloum_row]';
				break;
				case 'layout5':
				shortcode = '[coloum_row][coloum_one_third]' + text + '[/coloum_one_third][coloum_two_third]' + text + '[/coloum_two_third][/coloum_row]';
				break;
				case 'layout6':
				shortcode = '[coloum_row][coloum_one_fourth]' + text + '[/coloum_one_fourth][coloum_one_fourth]' + text + '[/coloum_one_fourth][coloum_one_fourth]' + text + '[/coloum_one_fourth][coloum_one_fourth]' + text + '[/coloum_one_fourth][/coloum_row]';
				break;
				case 'layout7':
				shortcode = '[coloum_row][coloum_three_fourth]' + text + '[/coloum_three_fourth][coloum_one_fourth]' + text + '[/coloum_one_fourth][/coloum_row]';
				break;
				case 'layout8':
				shortcode = '[coloum_row][coloum_one_fourth]' + text + '[/coloum_one_fourth][coloum_three_fourth]' + text + '[/coloum_three_fourth][/coloum_row]';
				break;
				case 'layout9':
				shortcode = '[coloum_row][coloum_one_sixth]' + text + '[/coloum_one_sixth][coloum_one_sixth]' + text + '[/coloum_one_sixth][coloum_one_sixth]' + text + '[/coloum_one_sixth][coloum_one_sixth]' + text + '[/coloum_one_sixth][coloum_one_sixth]' + text + '[/coloum_one_sixth][coloum_one_sixth]' + text + '[/coloum_one_sixth][/coloum_row]';
				break;
				case 'layout10':
				shortcode = '[coloum_row][coloum_five_sixth]' + text + '[/coloum_five_sixth][coloum_one_sixth]' + text + '[/coloum_one_sixth][/coloum_row]';
				break;
				case 'layout11':
				shortcode = '[coloum_row][coloum_one_sixth]' + text + '[/coloum_one_sixth][coloum_five_sixth]' + text + '[/coloum_five_sixth][/coloum_row]';
				break;
			}	
		} else if( $currentShortcode === 'list-sc' ) {			
			var liststyle_choice = $('#liststyle-choice').val();
			var liststyle_color = $('#liststyle-color').val();
			var liststyle_desc = $('#liststyle-desc').val();
				shortcode = '[liststyle style="' + liststyle_choice + '" color="' + liststyle_color + '"]' + liststyle_desc + '[/liststyle]';	
		} else if( $currentShortcode === 'popover' ) {	
			var popover_title = $('#popover-title').val();
			var popover_desc = $('#popover-desc').val();
			var buttonpop_icon = $('#buttonpop-icon').val();
			var popover_choice = $('#popover-choice').val();
			var buttonpop_type = $('#buttonpop-type').val();
			var buttonpop_size = $('#buttonpop-size').val();
			var buttonpop_rounded = $('#buttonpop-rounded').val();
			var popover_trigger = $('#popover-trigger').val();
				shortcode = '[popover title="' + popover_title + '" icon="' + buttonpop_icon + '" desc="' + popover_desc + '" size="' + buttonpop_size + '" rounded="' + buttonpop_rounded + '" style="' + buttonpop_type + '" position="' + popover_choice + '" trigger="' + popover_trigger + '"]Button text[/popover]';				
		} else if( $currentShortcode === 'progressbar' ) {	
			var progressbar_text = $('#progressbar-text').val();
			var progressbar_percent = $('#progressbar-percent').val();
			var progressbar_style = $('#progressbar-style').val();
			var progressbar_striped = $('#progressbar-striped').val();
				shortcode = '[progressbar style="' + progressbar_style + '" striped="' + progressbar_striped + '" percent="' + progressbar_percent + '"]' + progressbar_text + '[/progressbar]';
		} else if( $currentShortcode === 'table-sc' ) {		
			var table_choice = $('#table-choice').val();
			var table_desc = $('#table-desc').val();
				shortcode = '[table style="' + table_choice + '"]' + table_desc + '[/table]';	
		} else if( $currentShortcode === 'tabs-sc' ) {		
			var num_of_tab = $('#tab-num').val();
				for( var i=1; i<= num_of_tab; i++) {
					inner += '[tab title="BTN Tab' + i + '"]Tab' + i + ' the content.[/tab]';
				}
				shortcode = '[tabgroup]' + inner + '[/tabgroup]';	
		} else if( $currentShortcode === 'tooltips' ) {	
			var tooltips_text = $('#tooltips-text').val();
			var tooltips_choice = $('#tooltips-choice').val();
				shortcode = '[tooltips tips="' + tooltips_text + '" position="' + tooltips_choice + '"]Text for hover[/tooltips]';	
		/* Media */
		} else if( $currentShortcode === 'image-sc' ) {	
			var image_url = $('#image-url').val();
			var image_type = $('#image-type').val();
				shortcode = '[image src="' + image_url + '" style="' + image_type + '"][/image]';
		} else if( $currentShortcode === 'googlemap' ) {				
			var googlemap_width = $('#googlemap-width').val();
			var googlemap_height = $('#googlemap-height').val();
			var googlemap_url = $('#googlemap-url').val();
				shortcode = '[googlemap width="' + googlemap_width + '" height="' + googlemap_height + '" src="' + googlemap_url + '"][/googlemap]';				
		} else if( $currentShortcode === 'soundcloud' ) {	
			var soundcloud_url = $('#soundcloud-url').val();
				shortcode = '[soundcloud url="' + soundcloud_url + '"][/soundcloud]';	
		} else if( $currentShortcode === 'video' ) {	
			var video_choice = $('#video-choice').val();
			var video_width = $('#video-width').val();
			var video_height = $('#video-height').val();
			var video_url = $('#video-url').val();
				shortcode = '[' + video_choice + ' width="' + video_width + '" height="' + video_height + '" src="' + video_url + '"][/' + video_choice + ']';
		} else if( $currentShortcode === 'sitemap' ) {					
				shortcode = '[sitemap]';
		} else if( $currentShortcode === 'viral-lock-content' ) {	
			var viral_content = $('#viral-content').val();
			var viralfb_choice = $('#viralfb-choice').val();
			var viraltwit_choice = $('#viraltwit-choice').val();
			var viralgplus_choice = $('#viralgplus-choice').val();
				shortcode = '[viral_lock_button show_facebook="' + viralfb_choice + '" show_twitter="' + viraltwit_choice + '" show_gplus="' + viralgplus_choice + '"]' + viral_content +  '[/viral_lock_button]';
		}
		tinyMCE.activeEditor.execCommand('mceInsertContent', false, shortcode);
		tb_remove();

	});
	function ktz_show_option( option ) {$('.option').hide();$( option ).show();}
})( jQuery );