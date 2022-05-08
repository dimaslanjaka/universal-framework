<?php
if (! class_exists ( 'wp_auto_spinner_Spintax' )) {
	class wp_auto_spinner_Spintax {
		
		// editor format
		public $editor_form;
		public $debug = false;
		public $opt;
		
		// spin
		function spin($html) {
			
			// ini editor format of the spintax
			$this->editor_form = $html;
			$this->opt = get_option ( 'wp_auto_spin', array () );
			
			// replace spin sets with single word
			for($i = 0; $i < 4; $i ++) {
				
				$html = $this->spintax_this ( $html );
				
				// Report rewritten at this case
				if ($this->debug)
					echo $html;
				
				if (! stristr ( $html, '{' )) {
					break;
				}
			}
			
			// fix additional nested spins at editor_form
			if (stristr ( $this->editor_form, '{' )) {
				preg_match_all ( '{\{([^{}]*?)\}}s', $this->editor_form, $matches_editor );
				
				$editor_matchs = $matches_editor [1];
				
				foreach ( $editor_matchs as $matche_editor ) {
					
					$matche_editor_original = $matche_editor;
					
					if (! stristr ( $matche_editor_original, '|' ))
						continue;
					
					// extract spans
					preg_match_all ( '{<span  synonyms=.*?span>}s', $matche_editor, $matchs_spans );
					
					$matchs_spans = $matchs_spans [0];
					
					// protect spans
					$s = 1;
					foreach ( $matchs_spans as $matchs_span ) {
						
						$matche_editor = str_replace ( $matchs_span, '(' . str_repeat ( '#', $s ) . ')', $matche_editor );
						$s ++;
					}
					
					// explode
					$matche_editor_parts = explode ( '|', $matche_editor );
					
					$random_editor_part = $matche_editor_parts [rand ( 0, count ( $matche_editor_parts ) )];
					
					// restore spans
					$s = 1;
					foreach ( $matchs_spans as $matchs_span ) {
						
						$random_editor_part = str_replace ( '(' . str_repeat ( '#', $s ) . ')', $matchs_span, $random_editor_part );
						$s ++;
					}
					
					if (stristr ( $matche_editor_original, '|' ))
						$this->editor_form = str_replace ( '{' . $matche_editor_original . '}', $random_editor_part, $this->editor_form );
				}
			}
			
			return $html;
		}
		
		// one level spin function
		function spintax_this($html) {
			
			// Extract all spintax sets
			preg_match_all ( '{\{([^{}]*?)\}}s', $html, $matches );
			$spintaxed_with_brackets = array_values ( array_unique ( $matches [0] ) );
			$spintaxed_without_brackets = array_values ( array_unique ( $matches [1] ) );
			
			// report found spintax sets
			if ($this->debug)
				print_r ( $spintaxed_with_brackets );
			
			$i = 0;
			foreach ( $spintaxed_without_brackets as $set ) {
				
				if (! stristr ( $set, '|' )) {
					$i ++;
					continue;
				}
				
				// valid set let's explode to parts
				$parts = explode ( '|', $set );
				
				$randomNum = rand ( 1, count ( $parts ) - 1 );
				
				if (! in_array ( 'OPT_AUTO_SPIN_DEACTIVE_CNT', $this->opt )) {
					$random = $randomNum;
				} else {
					$random = 0;
				}
				
				$random_part = $parts [$random];
				$random_part2 = $parts [$randomNum];
				
				// replacing the set with the random part
				$html = str_replace ( $spintaxed_with_brackets [$i], $random_part2, $html );
				
				$this->editor_form = str_replace ( $spintaxed_with_brackets [$i], '<span  synonyms="' . $set . '" class="synonym">' . $random_part . '</span>', $this->editor_form );
				
				$i ++;
			}
			
			return $html;
		} // one level spin
	}
} // class exists
?>