<?php

/*
 * New Log Entry
 */
function wp_auto_spinner_log_new($type,$data){
	
	global $wpdb;
	$now = date( 'Y-m-d H:i:s');
	$data=addslashes($data);
	$query="INSERT INTO wp_auto_spinner_log (action,date,data) values('$type','$now','$data')";
	$wpdb->query($query);
}


/*
 * log page of the plugin
 */
function wp_auto_spinner_log(){
 
	// DB
	global $wpdb;
	 
	//FILTER
	$filter="";
	if( isset( $_POST['action_type']) ){
		$act=$_POST['action_type'];
		if ($act == 'Error' ){
			$action=" action like '%Error%' ";
		}elseif($act == 'approved'){
			$action = " action like 'Comment approved%'";
		}
	}else{
		$action='';
			
	}

	if ($action != ''){
		if($filter == ''){
			$filter=" where $action";
		}else{
			$filter.=" and $action";
		}
	}

	// records number
	if(isset($_POST['number'])){
		$num=$_POST['number'];
	}else{
		$num='100';
	}

	// define limit
	$limit='';
	if (is_numeric($num)) $limit=" limit $num ";

	$qdate='';
	// finally date filters `date` >= str_to_date( '07/03/11', '%m/%d/%y' )
	if(isset($_POST['from']) && $_POST['from'] !='' ){
		$from=$_POST['from'];
		$qdate=" `date` >= str_to_date( '$from', '%m/%d/%y' )";
	}

	if(isset($_POST['to']) && $_POST['to'] !=''){
		$to=$_POST['to'];
		if($qdate == ''){
			$qdate.=" `date` <= str_to_date( '$to', '%m/%d/%y' )";
		}else{
			$qdate.=" and `date` <= str_to_date( '$to', '%m/%d/%y' )";
		}
	}

	if($qdate != ''){
		if($filter == ''){
			$filter=" where $qdate";
		}else{
			$filter.="and $qdate";
		}
	}
	 
	$query="SELECT * FROM wp_auto_spinner_log $filter ORDER BY id DESC $limit";
	 
	$res=$wpdb->get_results( $query);

	?>

 
<style>
.ttw-date {
	width: 81px;
}

.Publish{
	background: none repeat scroll 0 0 #AAAAAA;
    color: #FFFFFF !important;
}

.Publish td{
	color:#FFFFFF !important;
}

</style>
<div class="wrap">
	<div class="icon32" id="icon-edit-comments">
		<br>
	</div>
	<h2>WordPress Auto Spinner Action Log</h2>
	
	<p><strong>It is where</strong> you can find all actions done by the plugin</p>
			
		<div class="clear"></div>
		<?php $lastrun=get_option('wp_auto_spinner_last_run',1392146043); 
				$lastspin = get_option('wp_auto_spinner_last_spin',0); 
		
		?>
		
	
		<ul class="pin_log_breads">
		
			<li>Current time<br><span class="big_tag current_time"><?php echo date( 'h:i:s' , current_time('timestamp') ) ?></span><br> on server</li>
			<li>Cron last run at <br><span class="big_tag last_run"><?php echo date("h:i:s",$lastrun ) ?></span><br> this is <strong><span class="wp_pinterest_run_before"><?php echo $timdiff = current_time('timestamp') - $lastrun ?></span></strong> seconds ago </li>
			<li>Cron should runs every <br><span class="big_tag interval_mintes">60</span><br> seconds  </li>
			<li>Estimated next post spin<br><span class="big_tag next_run"> <?php echo( 60 - $timdiff )  ?> </span><br> seconds</li>
			<li>Last spin <div class="last_spin"></div><span class="big_tag">#<?php echo $lastspin ?></span><br><a id="last_pin_link" target="_blank" href="<?php echo site_url('?p='.$lastspin) ?>">visit post</a></li>
		</ul>
		
		<div style="clear: both" /></div>
		
		<h3>Actions</h3>
				
				<a target="_blank" id="wp_pinterest_automatic_trigger_cron" class="button" href="<?php echo site_url('?wp_auto_spinner=cron')  ?>">Trigger Cron</a>
				<button id="clear_log" style=" " class="button">Clear Log</button>
				<button id="update_log" style="margin-right: 5px;  " class="button">Update Log</button>
		
		
			<form method="post" action="">
				 
		 			<span class="spinner"></span>
           		 	<input  style="float:right"  type="submit" value="Filter" class="button-secondary" id="post-query-submit" name="submit">
				 
		 
					<div  style="float:right"  class="alignleft actions">
						<select name="number">
							<option <?php opt_selected($num,'50') ?>
								value="999">Records Number</option>
							<option <?php opt_selected($num,'100') ?>
								value="100">100</option>
							<option <?php opt_selected($num,'500') ?>
								value="500">500</option>
							<option <?php opt_selected($num,'1000') ?>
								value="1000">1000</option>
							<option <?php opt_selected($num,'all') ?>
								value="all">All</option>
						</select> 
					</div>
					
				 
		
	 						
		 
				 
	
			</form>
		
		
		<h3>Log records</h3> 
		
		<table class="widefat fixed">
			<thead>
				<tr>
					<th class="column-date">Index</th>
					<th class="column-response">Date</th>
					<th class="column-response">Type of action</th>
					<th>Data Processed</th>
				</tr>
			</thead>
			<tfoot>
				<tr>
					<th>index</th>
					<th>Date</th>
					<th>Type of action</th>
					<th>Data Processed</th>
				</tr>
			</tfoot>
			<tbody>

			<?php
			$i=1;
			foreach ($res as $rec){
				$action=$rec->action;
				//filter the data strip keyword
				$datas=explode(';',$rec->data);
				$data=$datas[0];


				if (stristr($action , 'Posted:')){
					$url = plugins_url().'/wp-auto-spinner';
					$action = 'New Post';
					//restoring link

				}elseif(stristr($action , 'Processing')){
					$action = 'Processing Campaign';
				}
				
				if(stristr($data,'html')){
					 $data='<textarea>'.htmlspecialchars( ($data) ).'</textarea>';
				}else{
					//$data=htmlspecialchars( ($data) );
				}
				

				echo'<tr class="'.$rec->action.'"><td class="column-date">'.$i.'</td><td  class="column-response" style="padding:5px">'.urldecode($rec->date).'</td><td  class="column-response" style="padding:5px">'. $action.'</td><td  style="padding:5px">' .urldecode($data).' </td></tr>';
				$i++;
			}
			


			//when no records
			if(count($res) == 0){
			
				echo '<tr><td colspan="4">No Records Found</td><tr>';
			
			}


			?>
			</tbody>
		</table>

</div>
 


			<?php
}