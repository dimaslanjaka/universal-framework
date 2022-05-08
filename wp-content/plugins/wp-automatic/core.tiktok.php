<?php

// Main Class
require_once 'core.php';
class WpAutomatictiktok extends wp_automatic {
	
	function tiktok_get_post($camp) {
		
		//random user agent 
		curl_setopt ( $this->ch, CURLOPT_USERAGENT,  $this->randomUserAgent() );
		  
		// ini keywords
		$camp_opt = unserialize ( $camp->camp_options );
		$keywords = explode ( ',', $camp->camp_keywords );
		$camp_general = unserialize ( base64_decode ( $camp->camp_general ) );
		
		// looping keywords
		foreach ( $keywords as $keyword ) {
			
			$keyword = trim ( $keyword );
			
			// update last keyword
			update_post_meta ( $camp->camp_id, 'last_keyword', trim ( $keyword ) );
			
			// when valid keyword
			if (trim ( $keyword ) != '') {
				
				// record current used keyword
				$this->used_keyword = $keyword;
				
				echo '<br>Let\'s post a TikTok Video for the key:' . $keyword;
				
			  
				// getting links from the db for that keyword
				$query = "select * from {$this->wp_prefix}automatic_general where item_type=  'tt_{$camp->camp_id}_$keyword' ";
				$res = $this->db->get_results ( $query );
				
				// when no links lets get new links
				if (count ( $res ) == 0) {
					
					// clean any old cache for this keyword
					$query_delete = "delete from {$this->wp_prefix}automatic_general where item_type='tt_{$camp->camp_id}_$keyword' ";
					$this->db->query ( $query_delete );
					
					// get new links
					$this->tiktok_fetch_items ( $keyword, $camp );
					
					// getting links from the db for that keyword
					$res = $this->db->get_results ( $query );
				}
				
				// check if already duplicated
				// deleting duplicated items
				
				$item_count = count ( $res );
				
				for($i = 0; $i < $item_count; $i ++) {
					
					$t_row = $res [$i];
					
					$t_data = unserialize ( base64_decode ( $t_row->item_data ) );
					
					 
					
					$t_link_url = $t_data ['item_url'];
					
					echo '<br>Link:' . $t_link_url ;
					
					 
					
					// check if link is duplicated
					if ($this->is_duplicate ( $t_link_url )) {
						
						// duplicated item let's delete
						unset ( $res [$i] );
						
						echo '<br>tiktok pic (' . $t_data ['item_title'] . ') found cached but duplicated <a href="' . get_permalink ( $this->duplicate_id ) . '">#' . $this->duplicate_id . '</a>';
						
						// delete the item
						$query = "delete from {$this->wp_prefix}automatic_general where id={$t_row->id}";
						$this->db->query ( $query );
					} else {
						
						break;
					}
				} // end for
				
				// check again if valid links found for that keyword otherwise skip it
				if (count ( $res ) > 0) {
					
					// lets process that link
					$ret = $res [$i];
					
					$temp = unserialize ( base64_decode ( $ret->item_data ) );
					
					//get the item info for this video 
					$current_vid_url = $temp['item_url'];
					
					//embed url 
					$oembed_url = "https://www.tiktok.com/oembed?url=" . $current_vid_url ;
					
					echo '<br>Embed URL:' . $oembed_url;
					 
					
					//curl get
					$x='error';
					 
					curl_setopt($this->ch, CURLOPT_HTTPGET, 1);
					curl_setopt($this->ch, CURLOPT_URL, trim($oembed_url));
					$exec=curl_exec($this->ch);
					$x=curl_error($this->ch);
					
					//validating reply, i.e condition: contains {"version
					if( ! stristr($exec, '{"version')){
						echo '<br><-- Could not get a valid reply ' . $exec;
						return false;
					}
					
					//json decode 
					$reply_json = json_decode($exec);
					
					//build item details 
					$temp['item_title'] = $reply_json->title;
					$temp['item_user_username'] = $temp['item_user_name']  = $reply_json->author_name;
					$temp['item_user_link']= $reply_json->author_url;
					$temp['item_img']= $reply_json->thumbnail_url;
					$temp['item_img_width']= $reply_json->thumbnail_width;
					$temp['item_img_height']= $reply_json->thumbnail_height;
					$temp['item_description'] = $this->get_description_from_embed ($reply_json->html);
					
					 
					
					// generating title
					if ( true || @trim ( $temp ['item_title'] ) == '') {
						
						if (in_array ( 'OPT_IT_AUTO_TITLE', $camp_opt )) {
							
							echo '<br>No title generating...';
							
							$cg_it_title_count = $camp_general ['cg_it_title_count'];
							if (! is_numeric ( $cg_it_title_count ))
								$cg_it_title_count = 80;
								
								// Clean content from tags , emoji and more
								$contentClean = $this->removeEmoji ( strip_tags ( strip_shortcodes (  ( $temp ['item_description'] ) ) ) );
								
								// remove hashtags
								if (in_array ( 'OPT_TT_NO_TTL_TAG', $camp_opt )) {
									$contentClean = preg_replace ( '{#\S*}', '', $contentClean );
								}
								
								// remove mentions
								if (in_array ( 'OPT_TT_NO_TTL_MEN', $camp_opt )) {
									$contentClean = preg_replace ( '{@\S*}', '', $contentClean );
								}
								
								if (function_exists ( 'mb_substr' )) {
									$newTitle = (mb_substr ( $contentClean, 0, $cg_it_title_count ));
								} else {
									$newTitle = (substr ( $contentClean, 0, $cg_it_title_count ));
								}
								
								$temp ['item_title'] = in_array ( 'OPT_GENERATE_TW_DOT', $camp_opt ) ? ($newTitle) : ($newTitle) . '...';
						} else {
							
							$temp ['item_title'] = '(notitle)';
						}
					}
					
					// report link
					echo '<br>Found Link:' . $temp ['item_url'];
					
					// update the link status to 1
					$query = "delete from {$this->wp_prefix}automatic_general where id={$ret->id}";
					$this->db->query ( $query );

					// if cache not active let's delete the cached videos and reset indexes
					if (! in_array ( 'OPT_IT_CACHE', $camp_opt )) {
						echo '<br>Cache disabled claring cache ...';
						$query = "delete from {$this->wp_prefix}automatic_general where item_type='tt_{$camp->camp_id}_$keyword' ";
						$this->db->query ( $query );
						
						// reset index
						$query = "update {$this->wp_prefix}automatic_keywords set keyword_start =1 where keyword_camp={$camp->camp_id}";
						$this->db->query ( $query );
						
						delete_post_meta ( $camp->camp_id, 'wp_tiktok_next_max_id' . md5 ( $keyword ) );
					}
					
					$temp['item_embed'] = '<blockquote class="tiktok-embed" cite="'. $temp['item_url'] .'" data-video-id="' . $temp['item_id'] . '" style="max-width: 605px;min-width: 325px;" ><section> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>';

					//item_tags extract hashtags as tags
					$temp ['item_tags'] =  $this->get_hash_tags($temp ['item_description']);
					
					
					// remove hashtags
					if (in_array ( 'OPT_TT_NO_CNT_TAG', $camp_opt )) {
						$temp ['item_description'] = preg_replace ( '{#\S*}', '', $temp ['item_description'] );
					}
					 
					// item images ini
					$temp ['item_images'] = '<img src="' . $temp ['item_img'] . '" />';
					  
					return $temp;
				} else {
					echo '<br>No links found for this keyword';
				}
			} // if trim
		} // foreach keyword
	}
	function tiktok_fetch_items($keyword, $camp) {
		
		// report
		echo "<br>So I should now get some items from tiktok for keyword :" . $keyword;
	 	
		//random user agent
		$random_agent = $this->randomUserAgent();
		curl_setopt ( $this->ch, CURLOPT_USERAGENT,  $random_agent );
		
		// ini options
		$camp_opt = unserialize ( $camp->camp_options );
		if (stristr ( $camp->camp_general, 'a:' ))
			$camp->camp_general = base64_encode ( $camp->camp_general );
			
			$camp_general = unserialize ( base64_decode ( $camp->camp_general ) );
			$camp_general = array_map ( 'wp_automatic_stripslashes', $camp_general );
			
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
					
					if (! in_array ( 'OPT_IT_CACHE', $camp_opt )) {
						$start = 1;
						echo '<br>Cache disabled resetting index to 1';
					} else {
						
						// check if it is reactivated or still deactivated
						if ($this->is_deactivated ( $camp->camp_id, $keyword )) {
							$start = 1;
						} else {
							// still deactivated
							return false;
						}
					}
				} else {
					
					if (! in_array ( 'OPT_IT_CACHE', $camp_opt )) {
						$start = 1;
						echo '<br>Cache disabled resetting index to 1';
					}
				}
				
				echo ' index:' . $start;
				
				// update start index to start+1
				$nextstart = $start + 1;
				$query = "update {$this->wp_prefix}automatic_keywords set keyword_start = $nextstart where keyword_id=$kid ";
				$this->db->query ( $query );
				
				// pagination
				if ( $start == 1 ) {
					
					// use first base query
					$wp_tiktok_next_max_id = 0;
					echo ' Posting from the first page...';
				} else {
					
					// not first page get the bookmark
					$wp_tiktok_next_max_id = get_post_meta ( $camp->camp_id, 'wp_tiktok_next_max_id' . md5 ( $keyword ), 1 );
					
					if (trim ( $wp_tiktok_next_max_id ) == '') {
						echo '<br>No new page max id';
						$wp_tiktok_next_max_id = 0;
					} else {
						if (in_array ( 'OPT_IT_CACHE', $camp_opt )) {
							echo '<br>max_id:' . $wp_tiktok_next_max_id;
						} else {
							$start = 1;
							echo '<br>Cache disabled resetting index to 1';
							$wp_tiktok_next_max_id = 0;
						}
					}
				}
				
				// if specific user posting
				if (in_array ( 'OPT_TT_USER', $camp_opt )) {
					
					$cg_tt_user = trim ( $camp_general ['cg_tt_user'] );
					echo '<br>Specific user:' . $cg_tt_user;
 
					$tiktok_url = 'https://www.tiktok.com/@' . trim($cg_tt_user);
					
				} else {
					
					// prepare keyword
					$qkeyword = trim(str_replace ( ' ', '', $keyword ));
					$qkeyword = str_replace ( '#', '', $qkeyword );
					$tiktok_url = 'https://www.tiktok.com/tag/' . $qkeyword ;
					
				}
	 
				//infite or load directly
				if(in_array('OPT_TT_INFINITE' , $camp_opt)){
					
					echo '<br>Loading the videos from the added HTML...';
					$exec = $camp_general['cg_tt_html'];
				
				}else{
					
					echo '<br>Loading:' . $tiktok_url;
					$x='error';
					curl_setopt($this->ch, CURLOPT_HTTPGET, 1);
					curl_setopt($this->ch, CURLOPT_URL, trim($tiktok_url));
					$exec=curl_exec($this->ch);
					$x=curl_error($this->ch);
					
				}
				
				  
				$items = array();
				
				
				
				if( strpos($exec, '/video/') ){
					
					//extract video links 
					preg_match_all('{https://www.tiktok.com/@[\w\d_]*?/video/(\d*)}s', $exec, $found_vids_matches);
					  
					$items = $found_vids_matches[0];
					$items_ids = $found_vids_matches[1];
				  
					// reverse
					if (in_array ( 'OPT_TT_REVERSE', $camp_opt )) {
						echo '<br>Reversing order';
						$items = array_reverse ( $items );
						$items_ids = array_reverse ( $items_id );
					}
					
					echo '<ol>';
					
					// loop items
					$i = 0;
					foreach ( $items as $item ) {
						
					 
						
						// clean itm
						unset ( $itm );
						
					 
						
						// build item
						$itm ['item_id'] = $items_ids[$i];
						$itm ['item_url'] =$item;
						 
						$data = base64_encode ( serialize ( $itm ) );
						
						$i ++;
						
						echo '<li>' . $itm ['item_url'] . '</li>';
						
						if (! $this->is_duplicate ( $itm ['item_url'] )) {
							$query = "INSERT INTO {$this->wp_prefix}automatic_general ( item_id , item_status , item_data ,item_type) values (    '{$itm['item_id']}', '0', '$data' ,'tt_{$camp->camp_id}_$keyword')  ";
							$this->db->query ( $query );
						} else {
							echo ' <- duplicated <a href="' . get_edit_post_link ( $this->duplicate_id ) . '">#' . $this->duplicate_id . '</a>';
						}
						
						echo '</li>';
					}
					
					echo '</ol>';
					
					echo '<br>Total ' . $i . ' pics found & cached';
					
					// check if nothing found so deactivate
					if ($i == 0) {
						echo '<br>No new items got found ';
						echo '<br>Keyword have no more items deactivating...';
						$query = "update {$this->wp_prefix}automatic_keywords set keyword_start = -1 where keyword_id=$kid ";
						$this->db->query ( $query );
						
						if (! in_array ( 'OPT_NO_DEACTIVATE', $camp_opt ))
							$this->deactivate_key ( $camp->camp_id, $keyword );
							
							// delete bookmark value
							delete_post_meta ( $camp->camp_id, 'wp_tiktok_next_max_id' . md5 ( $keyword ) );
							 
					} else {
						
						 
						// get max id
						if (isset ( $json_arr->hasMore ) && $json_arr->hasMore == 1) {
							
							echo '<br>Updating max_id:' . $json_arr->cursor;
							update_post_meta ( $camp->camp_id, 'wp_tiktok_next_max_id' . md5 ( $keyword ), $json_arr->cursor);
						} else {
							echo '<br>No pagination found deleting next page index';
							delete_post_meta ( $camp->camp_id, 'wp_tiktok_next_max_id' . md5 ( $keyword ) );
							
							// disable queries for an hour if cache disabled
							if (in_array ( 'OPT_IT_CACHE', $camp_opt )) {
								
								$query = "update {$this->wp_prefix}automatic_keywords set keyword_start = -1 where keyword_id=$kid ";
								$this->db->query ( $query );
								
								if (! in_array ( 'OPT_NO_DEACTIVATE', $camp_opt ))
									$this->deactivate_key ( $camp->camp_id, $keyword );
									
									// delete bookmark value
									delete_post_meta ( $camp->camp_id, 'wp_tiktok_next_max_id' . md5 ( $keyword ) );
							}
						}
					}
				} else {
					
					// no valid reply
					echo '<br>No Valid reply for tiktok search <br>' . $exec;
				}
	}
	
	function get_description_from_embed($ebmed_code){
		$description = preg_replace('!<blockquote.*?>(.*?)</blockquote>.*!' , "$1" , $ebmed_code );
		$description = str_replace(array('<section>' , '</section>') , '' , $description );
		return trim($description); 
	}

	
	function get_hash_tags($text){
		
		//href="https://www.tiktok.com/tag/fruit">#fruit</a>
		 preg_match_all( '{>(#.*?)</a>\s}' , $text , $hashtags_matches );
		
		 $hashtags_founds = $hashtags_matches[1];
		 $hashtags_founds = str_replace('#' , '' , $hashtags_founds ) ;
		 $hashtags_founds = implode(','  , $hashtags_founds );
		 return $hashtags_founds;
	}

}
