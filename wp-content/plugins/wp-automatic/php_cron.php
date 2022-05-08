<?php

$dirname = dirname(__FILE__);
$dirname_parts = explode('/', $dirname);
$correct_dir = '';

for($i=0;$i< count($dirname_parts) - 3 ; $i++){
	$correct_dir.= '/'. $dirname_parts[$i];
}

$correct_dir = str_replace('//', '/', $correct_dir);
$correct_dir.='/wp-load.php';

//wp-load
if(file_exists($correct_dir )){
	echo ' WP Load file exists using calculated method  ';
	//require_once($correct_dir);
	require_once( $correct_dir );
}else{
	echo ' WP Load file does not exist using calculated method, using direct relative instead... ';
	require_once('../../../wp-load.php');
}


require_once( dirname(__FILE__) . '/cron.php' );