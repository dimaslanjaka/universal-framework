<?php
h2o::addFilter('html_entity_decode');
h2o::addFilter('trim');
h2o::addFilter('base64_encode');
h2o::addFilter('remove');
h2o::addFilter('str_replace');
h2o::addFilter('ucwords');
h2o::addFilter('ucfirst');
h2o::addFilter('strtolower');

function remove($term, $search){
	return str_replace($search, '', $term);
}

if(function_exists('wpunique_synonymize')) {
  h2o::addFilter('wpunique_synonymize');
}

h2o::addFilter('host');

function host($string){
	$host = parse_url($string);
	return $host['host'];
}

function spp_shortcode( $atts ) {
	extract( shortcode_atts( array(
		'term' => 'hello world',
		'template' => 'default.html',
		'hack' => ''
	), $atts ) );
	return spp($term, $template, $hack);
}
add_shortcode( 'spp', 'spp_shortcode' );

function get_video_id($url)
{
  $parts = parse_url($url);
  if ($parts === false) {
     return false;
  } else{
   parse_str($parts['query'], $params);
   return $params['v'];
  }
}
h2o::addFilter('get_video_id');

if(!class_exists('h2o_parser')){
	require(SPP_PATH.'/templates/h2o/h2o/parser.php');
}