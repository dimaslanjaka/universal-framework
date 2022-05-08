<?php
//spp addon: random term:
/*
widget text / post editor usage: [spp_random_terms] or [spp_random_terms count=20]
outside post/widget usage: do_shortcode('[spp_random_terms count=20]');
*/

h2o::addFilter('strtr');

function spp_random_terms_func( $atts ) {
	extract( shortcode_atts( array(
		'count' => 10
	), $atts ) );
	global $spp_settings;
	global $wpdb;
	// SELECT * FROM myTable WHERE RAND()<(SELECT ((30/COUNT(*))*10) FROM myTable) ORDER BY RAND() LIMIT 30;	   
	$sql = "SELECT `term` FROM `".$wpdb->prefix."spp` WHERE RAND()<(SELECT ((".$count."/COUNT(`term`))*10) FROM `".$wpdb->prefix."spp`) ORDER BY RAND() LIMIT ".$count.";";
	$searchterms = $wpdb->get_results($sql);			
	if(!empty($searchterms) && count($searchterms) >= $count) {
        $terms = array();
        foreach($searchterms as $term){
            $terms[] = $term->term;
        }
		
    } else {
        $file = @file_get_contents(SPP_PATH . '/keywords.txt');
        if($file){
            $terms = explode("\n", $file);
            
            shuffle($terms);
            
            foreach ($terms as $term) {
                spp_save_term($term);
            }

            $terms = array_slice($terms, 0, $count);
        }
        else{
            $terms = array();
        }
    }
    $result = new h2o(SPP_PATH."/templates/widget.html");
	return $result->render(array('terms'=> $terms, 'settings' => $spp_settings));
}
add_shortcode( 'spp_random_terms', 'spp_random_terms_func' );

?>