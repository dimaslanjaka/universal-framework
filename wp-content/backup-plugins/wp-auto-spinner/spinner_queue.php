<?php
function wp_auto_spinner_queue_fn() {
	?>




<div class="wrap">
	<h2>Waiting Spinning Queue</h2>
	
	<p><strong>It is where</strong> you can view/manage items waiting to be spinned by the plugin. each minute the plugin should process one of the items. Make sure to <a target="_blank" href="http://valvepress.com/wordpress-internal-cron-job-work-may-need-setup-external-cron/">setup the cron job</a> for the queue to process in time.</p>
 
	<?php       $lastrun=get_option('wp_auto_spinner_last_run',1392146043); 
				$lastspin = get_option('wp_auto_spinner_last_spin',0); 
				$autospin = get_option ( 'wp_auto_spin', array () );
		
				if(in_array('OPT_AUTO_SPIN_QUEUE_DISABLED', $autospin)){
					echo '<div class="error"><p>You have disabled processing the queue. visit <a href="'.admin_url('admin.php?page=wp_auto_spinner_settings').'">settings</a> and activate it back for the queue to get processed </p></div>';
				}
				
		?>
		
	
		<ul class="pin_log_breads">
		
			<li>Current time<br><span class="big_tag current_time"><?php echo date( 'h:i:s' , current_time('timestamp') ) ?></span><br> on server</li>
			<li>Cron last run at <br><span class="big_tag last_run"><?php echo date("h:i:s",$lastrun ) ?></span><br> this is <strong><span class="wp_pinterest_run_before"><?php echo $timdiff = current_time('timestamp') - $lastrun ?></span></strong> seconds ago </li>
			<li>Cron should run every <br><span class="big_tag interval_mintes">60</span><br> seconds  </li>
			<li>Estimated next post spin<br><span class="big_tag next_run"> <?php echo( 60 - $timdiff )  ?> </span><br> seconds</li>
			<li>Last spin <div class="last_spin"></div><span class="big_tag">#<?php echo $lastspin ?></span><br><a id="last_pin_link" target="_blank" href="<?php echo site_url('?p='.$lastspin) ?>">visit post</a></li>
		</ul>
		
		<div style="clear: both" /></div>

		<h3>Actions</h3>
				
				<a target="_blank" id="wp_pinterest_automatic_trigger_cron" class="button" href="<?php echo site_url('?wp_auto_spinner=cron')  ?>">Trigger Cron</a>
				<button id="clear_queue" style="" class="button">Clear queue</button>
				<button id="update_log" style="margin-right: 5px;  " class="button">Update queue</button>
				
				<span class="spinner"></span>
		
		
 	
	<h3>Waiting published posts</h3>
	
	
	<table class="widefat fixed">
		<thead>
			<tr>
				<th class="column-date">Index</th>
				<th>Post</th>
				<th class="column-response">Published</th>

			</tr>
		</thead>
		<tfoot>
			<tr>
				<th>index</th>
				<th>Post</th>
				<th>Published</th>
			</tr>
		</tfoot>
		<tbody>

		<?php
	
	
	
	
	
	if ( 1 ) {
		
		global $post;
		
		// get execluded cateogries array
		$execl = get_option ( 'wp_auto_spin_execl', array () );
		
		// The Query
		$the_query = new WP_Query ( array (
				'category__not_in' => $execl,
				'post_status'=>array('publish','draft','pending'),
				'posts_per_page' => 100,
				'ignore_sticky_posts' => true,
				'post_type' => 'any',
				'meta_query' => array(
						
						array(
								'key' => 'wp_auto_spinner_scheduled',
								'compare' => 'EXISTS',
						),array(
								'key' => 'spinned_cnt',
								'compare' => 'NOT EXISTS',
						)
						
						)
				
		) );
		
		 
		
		// The Loop
		$i = 1;
		if ($the_query->have_posts ()) {
			
			while ( $the_query->have_posts () ) {
				echo '<tr>';
				$the_query->the_post ();
				echo ' <td>' . $i . '</td>';
				echo ' <td><a href="' . $post->guid . '">' . $post->post_title . '</a></td>';
				echo ' <td>' . $post->post_modified . '</td>';
				echo '</tr>';
				
				$i ++;
			}
		} else {
			// no posts found
			echo '<tr><td colspan="3"><strong>no posts waiting for spinning . </td></tr>';
		}
		
		/* Restore original Post Data */
		wp_reset_postdata ();
	} else {
		echo '<tr><td colspan="3"><strong>Automatic Spinning mode is inactive</strong> thus no posts waiting for spinning . </td></tr>';
	}
	
	?>
 

		</tbody>
	</table>
	
	<p>Total waiting published posts (<?php echo  $the_query->found_posts; ?>) </p>
	
	<h3>Waiting future posts </h3>
	<p>Posts below will be processed once published</p>
	<table class="widefat fixed">
		<thead>
			<tr>
				<th class="column-date">Index</th>
				<th>Post</th>
				<th class="column-response">Published</th>

			</tr>
		</thead>
		<tfoot>
			<tr>
				<th>index</th>
				<th>Post</th>
				<th>Published</th>
			</tr>
		</tfoot>
		<tbody>

		<?php
	
	$autospin = get_option ( 'wp_auto_spin', array () );
	if ( 1 ) {
		
		global $post;
		
		// get execluded cateogries array
		$execl = get_option ( 'wp_auto_spin_execl', array () );
		
		// The Query
		$the_query = new WP_Query ( array (
				'category__not_in' => $execl,
				'post_status'=>'future',
				'posts_per_page' => 100,
				'ignore_sticky_posts' => true,
				'post_type' => 'any',
				 
				'meta_query' => array(
						
						array(
								'key' => 'wp_auto_spinner_scheduled',
								'compare' => 'EXISTS',
						),array(
								'key' => 'spinned_cnt',
								'compare' => 'NOT EXISTS',
						)

						
						)
				
		) );
		
		 
		
		// The Loop
		$i = 1;
		if ($the_query->have_posts ()) {
			
			while ( $the_query->have_posts () ) {
				echo '<tr>';
				$the_query->the_post ();
				echo ' <td>' . $i . '</td>';
				echo ' <td><a href="' . $post->guid . '">' . $post->post_title . '</a></td>';
				echo ' <td>' . $post->post_modified . '</td>';
				echo '</tr>';
				
				$i ++;
			}
		} else {
			// no posts found
			echo '<tr><td colspan="3"><strong>no future posts waiting for spinning . </td></tr>';
		}
		
		/* Restore original Post Data */
		wp_reset_postdata ();
	} else {
		echo '<tr><td colspan="3"><strong>Automatic Spinning mode is inactive</strong> thus no posts waiting for spinning . </td></tr>';
	}
	
	?>
 

		</tbody>
	</table>
	
	<p>Total waiting scheduled posts (<?php echo  $the_query->found_posts; ?>) </p>
	
		
	
	
</div>
<?php
}