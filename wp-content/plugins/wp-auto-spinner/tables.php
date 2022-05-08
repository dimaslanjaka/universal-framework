<?php
/* ------------------------------------------------------------------------*
 *Create a new table wp_auto_spinner log
* ------------------------------------------------------------------------*/



function create_table_wp_auto_spinner()
{
	global $wpdb;
	//comments table
	if(!exists_table_wp_auto_spinner('wp_auto_spinner_log')){
		$querys="SET SQL_MODE=\"NO_AUTO_VALUE_ON_ZERO\";
		CREATE TABLE IF NOT EXISTS `wp_auto_spinner_log` (
		`id` int(11) NOT NULL AUTO_INCREMENT,
		`action` varchar(50) NOT NULL,
		`data` text NOT NULL,
		`date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
		`camp` varchar(20) NOT NULL,
		PRIMARY KEY (`id`)
		) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=483 ;
			
		";
		//executing quiries
		$que=explode(';',$querys);
		foreach($que  as $query){
			if(trim($query)!=''){
				$wpdb->query($query);
			}
		}
	}
	
	//clear last run 
	delete_option('wp_auto_spinner_last_run');
	
}

function exists_table_wp_auto_spinner($table){
	global $wpdb;
	$rows = $wpdb->get_row('show tables like "'.$table.'"', ARRAY_N);

	if( ! isset($rows)) return false;
	
	return (count($rows)>0);
}