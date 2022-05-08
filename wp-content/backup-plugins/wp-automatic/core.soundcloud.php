<?php

// Main Class
require_once 'core.php';

Class WpAutomaticSoundCloud extends wp_automatic{


/**
 * function sound_get_post
 *
 */
function sound_get_post($camp){

	//API client id
	$wp_automatic_sc_client = get_option('wp_automatic_sc_client');

	//If no API setup Don't post
	if(trim($wp_automatic_sc_client) == ''){
		  echo '<br>SoundCloud API key is required,please visit the settings page and add it';
		return false;
	}

	//ini keywords and options
	$camp_opt = unserialize ( $camp->camp_options );
	$keywords = explode ( ',', $camp->camp_keywords );
	$camp_general=unserialize(base64_decode($camp->camp_general));

	//looping keywords
	foreach ( $keywords as $keyword ) {
			
		$keyword = trim($keyword);

		//update last keyword
		update_post_meta($camp->camp_id, 'last_keyword', trim($keyword));

		//when valid keyword
		if (trim ( $keyword ) != '') {

			//record current used keyword
			$this->used_keyword=$keyword;


			// getting links from the db for that keyword
			$query = "select * from {$this->wp_prefix}automatic_general where item_type=  'sc_{$camp->camp_id}_$keyword' and item_status ='0'";
			$res = $this->db->get_results ( $query );

			// when no links lets get new links
			if (count ( $res ) == 0) {

				//get new links
				$this->sound_fetch_items ( $keyword, $camp );

				// getting links from the db for that keyword
				$res = $this->db->get_results ( $query );
			}

			//check if already duplicated
			//deleting duplicated items
			$res_count = count($res);

			for($i=0;$i< $res_count;$i++){

				$t_row = $res[$i];

				$t_data =  unserialize (base64_decode( $t_row->item_data) );

				$t_link_url=$t_data['item_url'];

				if( $this->is_duplicate($t_link_url) ){
						
					//duplicated item let's delete
					unset($res[$i]);
						
					  echo '<br>SoundCloud item  ('. $t_data ['item_title'] .') found cached but duplicated <a href="'.get_permalink($this->duplicate_id).'">#'.$this->duplicate_id.'</a>'  ;
						
					//delete the item
					$query = "delete from {$this->wp_prefix}automatic_general where item_id='{$t_row->item_id}' and item_type=  'sc_{$camp->camp_id}_$keyword'";
					$this->db->query ( $query );
						
				}else{
					break;
				}

			}

			// check again if valid links found for that keyword otherwise skip it
			if (count ( $res ) > 0) {

				// lets process that link
				$ret = $res [$i];

				$temp = unserialize ( base64_decode($ret->item_data ));

				//generating title


				//report link
				  echo '<br>Found Link:'.$temp['item_url'] ;

				// update the link status to 1
				$query = "update {$this->wp_prefix}automatic_general set item_status='1' where item_id='$ret->item_id' and item_type='sc_{$camp->camp_id}_$keyword' ";
				$this->db->query ( $query );

				// if cache not active let's delete the cached items and reset indexes
				if (! in_array ( 'OPT_SC_CACHE', $camp_opt )) {
					  echo '<br>Cache disabled claring cache ...';
					$query = "delete from {$this->wp_prefix}automatic_general where item_type='sc_{$camp->camp_id}_$keyword' and item_status ='0'";
					$this->db->query ( $query );

					// reset index
					$query = "update {$this->wp_prefix}automatic_keywords set keyword_start =1 where keyword_camp={$camp->camp_id}";
					$this->db->query ( $query );
				}
					
				$temp['item_embed'] = '<iframe width="100%" height="450" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/'.$temp['item_id']. '&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>';
					

					
				return $temp;


			} else {

				  echo '<br>No links found for this keyword'; 
			}
		} // if trim
	} // foreach keyword



}
	
/**
 * function sound_fetch_items
 * @param unknown $camp
 */
function sound_fetch_items($keyword,$camp){

	//report
	  echo "<br>So I should now get some sounds from SoundCloud for keyword :" . $keyword;

		
	// ini options
	$camp_opt = unserialize ( $camp->camp_options );
	if( stristr($camp->camp_general, 'a:') ) $camp->camp_general=base64_encode($camp->camp_general);
	$camp_general = unserialize ( base64_decode( $camp->camp_general ) );
	$camp_general=array_map('wp_automatic_stripslashes', $camp_general);
		
	// get start-index for this keyword
	$query = "select keyword_start ,keyword_id from {$this->wp_prefix}automatic_keywords where keyword_name='$keyword' and keyword_camp={$camp->camp_id}";
	$rows = $this->db->get_results ( $query );
	$row = $rows [0];
	$kid = $row->keyword_id;
	$start = $row->keyword_start;
	if ($start == 0)
		$start = 1;

	if ($start == - 1) {
		  echo '<- exhausted keyword';

		if( ! in_array( 'OPT_SC_CACHE' , $camp_opt )){
			$start =1;
			  echo '<br>Cache disabled resetting index to 1';
		}else{

			//check if it is reactivated or still deactivated
			if($this->is_deactivated($camp->camp_id, $keyword)){
				$start =1;
			}else{
				//still deactivated
				return false;
			}

		}

	}


	//soundcloud offset parameter starts from zero, 50 , 100
	if($start == 1) $start=0;

	  echo ' index:' . $start;

	// update start index to start+1
	$nextstart = $start + 50;
	$query = "update {$this->wp_prefix}automatic_keywords set keyword_start = $nextstart where keyword_id=$kid ";
	$this->db->query ( $query );

	//prepare credential
	$wp_automatic_sc_client= get_option('wp_automatic_sc_client');


	//if specific user posting

	if(in_array('OPT_SC_USER', $camp_opt)){


		$cg_sc_user_playlist = $camp_general['cg_sc_user_playlist'];
		$author = $camp_general['cg_sc_user'];


		if( $cg_sc_user_playlist == 'user' ){

			$url = "http://api.soundcloud.com/users/".trim($author)."/tracks";

		}else{


			$url = "http://api.soundcloud.com/playlists/".trim($author);
		}


	}else{
			
			
			
		if(in_array('OPT_SC_TAG_SEARCH', $camp_opt)){
			$url = "http://api.soundcloud.com/tracks/?tags=".urlencode(trim($keyword));
		}else{
			$url = "http://api.soundcloud.com/tracks/?q=".urlencode(trim($keyword));
		}

	}

	//authentication
	if(stristr($url, '?')){
		$url = $url . '&client_id='.trim($wp_automatic_sc_client);
	}else{
		$url = $url . '?client_id='.trim($wp_automatic_sc_client);
	}

	//pagination

	//if playlist there is no pagination it retuns them all
	if( ! stristr($url, '/playlists/') ){
			
		$url = $url . '&limit=50&linked_partitioning=true&offset='.$start;
			
	}else{
		  echo '<br>Posting from playlist, skipping pagination';
	}

	//date limit 
	//published after filter 2014-3-10 00:00:00
	if(in_array('OPT_YT_DATE', $camp_opt)){
		$beforeDate=$camp_general['cg_yt_dte_year']."-".$camp_general['cg_yt_dte_month']."-".$camp_general['cg_yt_dte_day']." 00:00:00";
		$url.= "&created_at[from]=".urlencode( $beforeDate );
	}
	
	//min length
	if(in_array('OPT_SC_FROM', $camp_opt)){
		$url.= '&duration[from]='.trim($camp_general['cg_sc_from']);
	}
	
	//max length
	if(in_array('OPT_SC_TO', $camp_opt)){
		$url.= '&duration[to]='.trim($camp_general['cg_sc_to']);
	}
	

	//report url
	  echo '<br>SoundCloud url:'. str_replace( $wp_automatic_sc_client , '[client_id]' ,  $url );

		
	curl_setopt($this->ch, CURLOPT_HTTPGET, 1);
	curl_setopt($this->ch, CURLOPT_URL, trim($url));
	curl_setopt($this->ch, CURLOPT_ENCODING , "");
	$exec=curl_exec($this->ch);
	$x=curl_error($this->ch);

		
	//validating reply
	if(stristr($exec, '{"')){
		//valid reply

		//handle pins
		$arr = json_decode($exec);
			

		//sounds get
			
		if(stristr($url, '/playlists/')){

			$items = $arr->tracks;

		}else{

			$items = $arr->collection;

		}


		//if reversion order
		if(in_array('OPT_SC_REVERSE', $camp_opt)){
			  echo '<br>Reversing order';
			$items = array_reverse($items);
		}

		  echo '<ol>';

		//loop pins
		$i = 0;
		foreach ($items as $item){

		
				
			$itm['item_url'] =  $item->permalink_url;
			  echo '<li>'.$itm['item_url'];

			$itm['item_id'] = $item->id;
			$itm['item_likes_count'] = $item->likes_count;
			$itm['item_purchase_url'] = $item->purchase_url;
			$itm['item_thumbnail'] = $item->artwork_url;
			$itm['item_thumbnail'] = str_replace('-large', '-t500x500', $itm['item_thumbnail']);
			$itm['item_comment_count'] = $item->comment_count;
			$itm['item_title'] = $item->title;
			$itm['item_description'] = $item->description;
			$itm['item_favoritings_count'] = $item->favoritings_count;
			$itm['item_genre'] = $item->genre;
			$itm['item_playback_count'] = $item->playback_count;
			$itm['item_reposts_count'] = $item->reposts_count;
			$itm['item_tags'] = $item->tag_list;
			$itm['item_created_at'] = $item->created_at;
			$itm['item_duration'] = $item->duration;
			$itm['item_duration'] = number_format( $item->duration/60000 ,2);
			$itm['item_user_id'] = $item->user_id;
			$itm['item_user_link'] = $item->user->permalink_url;
			$itm['item_user_thumbnail'] = $item->user->avatar_url;
			$itm['item_user_thumbnail'] = str_replace('-large', '-t500x500', $itm['item_user_thumbnail']);
			$itm['item_user_username'] = $item->user->username;
			$itm['item_download_url'] = $item->download_url;

			if(trim($itm['item_download_url']) != '') {
				$itm['item_download_url'] = $itm['item_download_url'] . '?client_id=376f225bf427445fc4bfb6b99b72e0bf';
			}
			
			
		 
			$data = base64_encode(serialize ( $itm ));

			if( $this->is_execluded($camp->camp_id, $itm['item_url']) ){
				  echo '<-- Execluded';
				continue;
			}
				
			if ( ! $this->is_duplicate($itm['item_url']) )  {
				$query = "INSERT INTO {$this->wp_prefix}automatic_general ( item_id , item_status , item_data ,item_type) values (    '{$itm['item_id']}', '0', '$data' ,'sc_{$camp->camp_id}_$keyword')  ";
				$this->db->query ( $query );
			} else {
				  echo ' <- duplicated <a href="'.get_edit_post_link($this->duplicate_id).'">#'.$this->duplicate_id.'</a>';
			}

			  echo '</li>';
			$i++;

		}

		  echo '</ol>';

		  echo '<br>Total '. $i .' items found & cached';

		//check if nothing found so deactivate
		if($i == 0 ){
			  echo '<br>No new sounds found ';
			  echo '<br>Keyword have no more sounds deactivating...';
			$query = "update {$this->wp_prefix}automatic_keywords set keyword_start = -1 where keyword_id=$kid ";
			$this->db->query ( $query );
			
			if(! in_array('OPT_NO_DEACTIVATE', $camp_opt))
			$this->deactivate_key($camp->camp_id, $keyword);
			
			
				
		}

	}else{

		//no valid reply
		  echo '<br>No Valid reply for sounds search from SoundCloud<br>'.$exec;

	}

}

}