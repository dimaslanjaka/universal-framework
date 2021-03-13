<?php

header('Content-type: text/plain');
header('Content-Disposition: attachment; filename="wp_autospinner_synonyms_backup_'.time('now').'.txt"');

//check login
if( !(current_user_can('administrator'))){
	echo 'Not logged in..';
	exit;
} 

$wp_auto_spinner_lang=get_option('wp_auto_spinner_lang','en');

$file=get_option('wp_auto_spinner_custom_'.$wp_auto_spinner_lang,array());
$file = array_map('trim', $file);

print_r(implode("\n",$file ));



 
 