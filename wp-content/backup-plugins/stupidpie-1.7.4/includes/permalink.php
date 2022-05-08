<?php
function spp_flush_rules() {
	global $wp_rewrite;
	
	$wp_rewrite->flush_rules();	
}

function spp_add_rewrite_rules( $wp_rewrite ) {
	global $spp_settings;
	$new_rules = array();

	foreach ($spp_settings->url_rewrites as $rule) {
		$new_rules[$rule['rule']] =  'index.php?s='.$wp_rewrite->preg_index($rule['index']);
	}
	$wp_rewrite->rules =  $new_rules+$wp_rewrite->rules;
}

function spp_query_vars($public_query_vars) {
	$public_query_vars[] = "redirect";
	return $public_query_vars;
}

function spp_filter_query( $query) {
	global $spp_settings;
	
	if ( is_search() ) {
		foreach ($spp_settings->url_rewrites as $index => $rule) {
			$query->query_vars['s'] = str_replace($rule['separator']," ",$query->query_vars['s']);
		}		
		$query->query_vars['s'] = str_replace("+"," ",$query->query_vars['s']);
		$query->query_vars['s'] = ucwords($query->query_vars['s']);
	}
	
	if(is_search()){
		if(spp_contains_bad_words(get_search_query())){
			header('HTTP/1.1 404 Not Found');
			echo "404 Not Found";
			die;
		}
	}
}

function firstword($term, $before){
	$term = CoreFilters::hyphenize($term);
	
	if(strpos($before,'(.*)') !== false){
		$array_of_term = explode('-', $term);
		$firstword     = isset($array_of_term[0]) ? $array_of_term[0] : $term;
		return str_replace('(.*)', $firstword, $before);
	} else return $before;
}

h2o::addFilter('firstword');

function build_permalink_for($term, $url_rewrites_index)
{
	global $spp_settings;

	$rule          = $spp_settings->url_rewrites[$url_rewrites_index];
	$term          = CoreFilters::hyphenize($term);
	$term          = str_replace('-', $rule['separator'], $term);
	$array_of_term = explode($rule['separator'], $term);
	$first_word    = isset($array_of_term[0]) ? $array_of_term[0] : $term;
	$permalink     = $rule['permalink'];
	$permalink     = str_replace('{{ first_word }}', $first_word, $permalink);
	$permalink     = str_replace('{{ random }}', substr(md5($term), 1, 7), $permalink);
	$permalink     = str_replace('{{ term }}', $term, $permalink);
	$permalink     = home_url($permalink);

	return $permalink;
}

h2o::addFilter('build_permalink_for');
h2o::addFilter('base64_encode');

function spp_is_bot(){
	$crawlers = array('aspseek','abachobot','accoona','acoirobot','adsbot','alexa','alta vista','altavista','ask jeeves','baidu','bing','crawler','croccrawler','dumbot','estyle','exabot','fast-enterprise','fast-webcrawler','francis','geonabot','gigabot','google','googlebot','heise','heritrix','ibm','iccrawler','idbot','ichiro','lycos', 'mediapartners-google' ,'msn','msrbot','majestic-12','metager','ng-search','nutch','omniexplorer','psbot','rambler','seosearch','scooter','scrubby','seekport','sensis','seoma','snappy','steeler','synoo','telekom','turnitinbot','voyager','wisenut','yacy','yahoo');
	foreach($crawlers as $c){
		if(stripos($_SERVER['HTTP_USER_AGENT'], $c) !== false )return true;
	}
	return false;
}
?>