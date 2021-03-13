<?php 

/* =============================================================================
	Include the Option-Tree Google Fonts Plugin
	========================================================================== */
	// load the ot-google-fonts plugin
		
		// get the OT ‚Google Font plugin file
			
		// apply the fonts to the font dropdowns in theme options
		function ot_filter_recognized_font_families( $array, $field_id ) {

			global $default_theme_fonts;

			// default fonts used in this theme, even though there are not google fonts
			$default_theme_fonts = array(
					'Arial' => 'Arial',
					'Helvetica' => 'Helvetica',
					'Sans Serif' => 'Sans serif',
					'Helvetica Neue' => 'Helvetica Neue',
					'Georgia' => 'Georgia',
					'Times New Roman' => 'Times New Roman',
					'Serif' => 'Serif',
					'Tahoma' => 'Tahoma',
					'Geneva' => 'Geneva',
					'Trebuchet MS' => 'Trebuchet MS',
					'Verdana' => 'Verdana'
			);

			// get the google font array - located in ot-google-fonts.php
			$google_font_array = googlefont_select();
				
			// loop through the cached google font array if available and append to default fonts
			$font_array = array();
			if($google_font_array){
					foreach($google_font_array as $index => $value){
							$font_array[$value['value']] = $value['label'];
					}
			}
			
			// put both arrays together
			$array = array_merge($default_theme_fonts, $font_array);
		  
			return $array;
		  
		}
		add_filter( 'ot_recognized_font_families', 'ot_filter_recognized_font_families', 1, 2 );
				

?>