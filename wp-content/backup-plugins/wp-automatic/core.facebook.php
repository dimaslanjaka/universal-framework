<?php  
// Main Class
require_once 'core.php';

Class WpAutomaticFacebook extends wp_automatic{
	


	/**
	 * function : fb_get_post
	 */
	function fb_get_post($camp){
 	
		$wp_automatic_fb_cuser = trim(get_option('wp_automatic_fb_cuser','') );
		$wp_automatic_fb_xs = trim( get_option('wp_automatic_fb_xs') );
		
		if( trim($wp_automatic_fb_cuser) == '' || trim($wp_automatic_fb_xs) == '' ){
			echo '<br><span style="color:red">Please visit the plugin settings page and add the required Facebook cookies values</span>';
			return   false;
		}
		
		//get page id
		$camp_general=unserialize(base64_decode($camp->camp_general));
		$camp_opt = unserialize ( $camp->camp_options );
	
		echo '<br>Processing FB page:'.$camp_general['cg_fb_page'];
	
		  
	
		// PAGE ID
		$cg_fb_page_id = get_post_meta($camp->camp_id,'cg_fb_page_id',1);
	
		//if a numeric id use it direclty
		$url= $camp_general['cg_fb_page'] ;
	
		if(is_numeric($url)){
			  echo '<br>Numeric id added manually using it as the page id.';
			$cg_fb_page_id = trim($url);
		}
	
	
		//get page id if not still extracted
		if(trim($cg_fb_page_id) == ''){
			  echo '<br>Extracting page ID from original page link';
	
			//getting page name from url
				
			//curl get
			$x='error';
			$url= $camp_general['cg_fb_page'] ;
			curl_setopt($this->ch, CURLOPT_HTTPGET, 1);
			curl_setopt($this->ch, CURLOPT_URL, trim($url));
	
			//authorization
			curl_setopt($this->ch,CURLOPT_COOKIE,'xs='.$wp_automatic_fb_xs.';c_user='.$wp_automatic_fb_cuser  );
			
			
			$exec=curl_exec($this->ch);
			$x  = curl_error($this->ch);
	
		  
		 	
		 	//entity_id if the fb page validation check
		 	if(stristr($exec, 'entity_id')){
		 		echo '<br>entity_id found getting id from it';
		 		
		 		preg_match_all('{entity_id":"(\d*?)"}', $exec,$matches);
		 		$smatch =  $matches[1];
		 		$cg_fb_page_id = $smatch[0];
		 		
		 		if(trim($cg_fb_page_id) !=''){
		 			echo '<br>Successfully extracted entityID:'.$cg_fb_page_id;
		 			update_post_meta($camp->camp_id, 'cg_fb_page_id', $cg_fb_page_id);
		 		}else{
		 			echo '<br>Can not find numeric entityID';
		 		}
		 		
		 		
		 		
		 	}else{
		 		
		 		if(stristr($exec, 'PageComposerPagelet_')){
		 			
		 			//extracting
		 			preg_match_all('{PageComposerPagelet_(\d*?)"}', $exec,$matches);
		 			$smatch =  $matches[1];
		 			$cg_fb_page_id = $smatch[0];
		 			
		 			if(trim($cg_fb_page_id) !=''){
		 				echo '<br>Successfully extracted  :'.$cg_fb_page_id;
		 				update_post_meta($camp->camp_id, 'cg_fb_page_id', $cg_fb_page_id);
		 			}else{
		 				echo '<br>Can not find numeric entityID';
		 			}
		 		}else{
		 			echo '<br>entity_id does not exists either ';
		 			echo '<br>Can not find valid FB reply.';
		 		}
		 	}
		}
	
	
		//building feed
		if(  (trim($cg_fb_page_id) != '' )   ){
								
			$cg_fb_source = $camp_general['cg_fb_source'];
			
			$cg_fb_from     = $camp_general['cg_fb_from'] ;
			
			if(trim($cg_fb_from) != 'events') $cg_fb_from = 'posts';
	 	
			//mbasic page URL
			$cg_fb_page_feed2 = 	$cg_fb_page_feed = "https://mbasic.facebook.com/" . $cg_fb_page_id ;
			
			//personal profiles
			if($cg_fb_source == 'profile'){
				$cg_fb_page_feed.='?v=timeline';
			}
			
			//events endpoint
			if($cg_fb_from == 'events'){
				
				if($cg_fb_source == 'group'){
					
					$cg_fb_page_feed2 = 	$cg_fb_page_feed = "https://mbasic.facebook.com/" . $cg_fb_page_id . "/?view=events&refid=18" ;
					
				}else{
					$cg_fb_page_feed2 = 	$cg_fb_page_feed = "https://mbasic.facebook.com/" . $cg_fb_page_id . "/events?locale=en_US" ;
				}
				
				
			}
			
			//locale
			if(in_array('OPT_OPT_FB_LANG', $camp_opt)){
				$cg_fb_lang = trim($camp_general['cg_fb_lang']);
			    
				if(! stristr($cg_fb_page_feed, 'locale') ){
					
					if(stristr($cg_fb_feed, '?')){
						$cg_fb_page_feed.='&locale='.$cg_fb_lang;
						$cg_fb_page_feed2.='&locale='.$cg_fb_lang;
					}else{
						$cg_fb_page_feed.='?locale='.$cg_fb_lang;
						$cg_fb_page_feed2.='?locale='.$cg_fb_lang;
					}
					
				}
				
				
				
			}
			
			echo '<br>FB URL:'.$cg_fb_page_feed2;
				
			//load feed
			//curl get
			$x='error';
			$url=$cg_fb_page_feed;
			curl_setopt($this->ch, CURLOPT_HTTPGET, 1);
			curl_setopt($this->ch, CURLOPT_URL, trim($url));
			
			//authorization
			curl_setopt($this->ch,CURLOPT_COOKIE,'xs='.$wp_automatic_fb_xs.';c_user='.$wp_automatic_fb_cuser  );
			
				
			//CACHE
			$saveCache = false;
				
			if(in_array('OPT_FB_CACHE', $camp_opt)){
	
				$temp = get_post_meta($camp->camp_id,'wp_automatic_cache',true);
				@$temp = base64_decode($temp);
	
				if(stristr($temp, 'messages')){
						
					  echo '<br>Results loaded from the cache';
					$exec = $temp;
					
	
				}else{
					echo '<br>No valid cache found requesting facebook';
					$saveCache = true;
					
					//nextpage if available 
					$nextPageUrl = get_post_meta($camp->camp_id,'nextPageUrl',true);
					if(trim($nextPageUrl != '') && in_array('OPT_FB_OLD', $camp_opt)  && ! stristr($nextPageUrl, 'graph.') ){

						  echo '<br>Pagination url:'.$nextPageUrl;
						  curl_setopt($this->ch, CURLOPT_URL, trim($nextPageUrl));

						 
					}
					
					$exec=curl_exec($this->ch);
					
				}
	
			}else{
				$exec=curl_exec($this->ch);
			}
	
			$x=curl_error($this->ch);
	
			if (  (stristr($exec, 'logout.php')  && stristr($exec, $cg_fb_page_id)) || ( stristr($exec, 'logout.php') && $cg_fb_from == 'events' )  ){ // Checks that the object is created correctly
					
				$exec = str_replace('&amp;' ,'&' ,$exec);
			 
				
				
			 
				//if save cache enbaled
				if($saveCache){
					  echo '<br>Caching the results..';
					update_post_meta($camp->camp_id, 'wp_automatic_cache', base64_encode($exec));
				}
				 
				
				if($cg_fb_from != 'events'){
				
					require_once 'inc/class.dom.php';
					$wpAutomaticDom = new  wpAutomaticDom($exec) ;
					$items = $wpAutomaticDom->getContentByXPath('//*[@role="article"]' , false );
					
					 
					// Loop through each feed item and display each item as a hyperlink.
				 
					
					//delete embeded articles 
					$i=0;
					foreach ( $items as $item ){
						
						if(stristr($item, 'og_action_id')){
							//remove feeling action "og_action_id":"1872937199467035",
							$item = preg_replace('{"og_action_id":"\d*?",}', '', $item);
						}
						 
					 
						  
						
						if(  ( ! stristr($item, 'data-ft=\'{"top_level_post_id') && !  stristr($item, 'data-ft=\'{"qid')  ) || ! stristr( $item, 'top_level_post_id')    ) {
							unset( $items[$i] );
						}
						
						$i++;
						
					}
					
				}else{
					//extract events
					preg_match_all( '{<a href="/events/(\d+)}' , $exec , $events_matches);
					
					if( isset( $events_matches[1] ) ){
						$items = $events_matches[1] ;
					}else{
						$items = array();
					}
					 
				}
	
				echo ' items:'.count($items);  
 
				
				$i = 0;
				foreach ( $items as $item ){
					
					
					
					if($cg_fb_from == 'events' ){

						echo '<br>Event:'.$item;
						
					}
					 
					 //remove image emoji
					$item = preg_replace('{<img class="\w*?" height="16".*?>}s' , '' , $item);
					$imgsrc = ''; // ini 
					
					// txt content for title generation ini 
					$txtContent = '' ;
					
					//get the post ID
				
					if( $cg_fb_from != 'events'  ){
						
						preg_match( '{top_level_post_id":"(.*?)"}' , $item , $pMatches );
						$item_id = $cg_fb_page_id . '_' . $pMatches[1] ; 
						$single_id =  $pMatches[1];
		 
						$isEvent = false; //ini
						$id_parts = explode('_', $item_id);
						$url = "https://www.facebook.com/{$id_parts[0]}/posts/{$id_parts[1]}";
						 
					}else{
						//events
						$id_parts = array( $cg_fb_page_id , $item);
						$url = "https://www.facebook.com/$item";
						$isEvent = true;
						
						$item_id  = $single_id = $item;
						
					}
					 
					echo '<br>Link:'.$url ;
					 
	
					//check if execluded link due to exact match does not exists
					if( $this->is_execluded($camp->camp_id, $url)){
						  echo '<-- Excluded link';
						continue;
					}
					
					//get created time
					if( $cg_fb_from != 'events'  ){
						$created_time = ''; 
						preg_match('{publish_time":(\d*)}', $item,$tMatches);
						if(isset($tMatches[1]) ) $created_time =  $tMatches[1];
					}else{
						$created_time = time('now');
					}
					
					//check if old before loading original page if created_time exists in page
					$foundOldPost = false;
					if(in_array('OPT_YT_DATE', $camp_opt)   && trim($created_time) != ''   ){
						if($this->is_link_old($camp->camp_id,  (  $created_time  ) )){
							  echo '<--old post execluding...';
							$foundOldPost = true;
							continue;
						}
					}
						
					if (! $this->is_duplicate($url) ) {
						  echo '<-- new link';
						  $i ++;
						
					}else{
						  echo '<-- duplicate in post <a href="'.get_edit_post_link($this->duplicate_id).'">#'.$this->duplicate_id.'</a>';
						continue;
	
					}
						
					//real item html if event. now the $item contains the event id only
					if( $cg_fb_from == 'events'  ){
						
						$mbasic_event_url = "https://mbasic.facebook.com/events/".$item . '?locale=en_US' ;
						
						echo '<br>Basic event URL:'.$mbasic_event_url;
						 
						//curl get
						$x='error';
						curl_setopt($this->ch, CURLOPT_HTTPGET, 1);
						curl_setopt($this->ch, CURLOPT_URL, trim($mbasic_event_url));
						$item=curl_exec($this->ch);
						$x=curl_error($this->ch);
						
						//remove emojis
						$item = preg_replace('{<img class="\w*?" height="16".*?>}s' , '' , $item);
						 
					}
					
				 
					
					//found images
					preg_match_all (	'{<img src=".*?>}' ,  str_replace('&amp;', '&', $item)  , $imgMatchs  );
					$all_imgs =$imgMatchs[0];
					
					$i= 0 ;
					foreach ($all_imgs as $single_img){
						if(stristr($single_img, 'static')){
							
							unset($all_imgs[$i]);
							
						}
						
						$i++;
					}
						
					$all_imgs = array_values($all_imgs);
					
	
					// Finding the post type 
					if( $cg_fb_from == 'events' ){
						$type = 'event';
					}elseif(stristr($item, 'video_redirect') || stristr($item, 'youtube.com%2Fwatch')){
						$type = "video";

					}elseif(stristr($item, '<a href="/notes')){
						$type = "note";					
					}elseif(stristr($item, 'events/feed')){
						$type = "event";
					}elseif(stristr($item, 'offerx_')){
						$type = "offer";
					}elseif(stristr($item, 'l.php?')){
						$type = "link";
					}elseif(count($all_imgs) >1){
						$type = "photo";
					}elseif(count($all_imgs) >0){
						$type = "photo";
					}else{
						$type = 'status';
					}
					
				     echo '<br>Item Type:'.$type;
						
					//type check
					if(in_array('OPT_FB_POST_FILTER', $camp_opt)){
	
						if( ! in_array('OPT_FB_POST_'.$type, $camp_opt)){
							  echo '<-- Skip this type not selected ';
							continue;
						}
	
					}
						
					//buidling content
					$title = '';
					$content = '';
					 
					//textual content tn":"*s"}'><span>
					if( $cg_fb_from == 'events' ){
						
						$temp_event_cnt = explode('unit_id_', $item);
						preg_match_all('!</div></div></div><div class=".*?">(.*?)</div>!s', $temp_event_cnt[1] ,$contMatches);
					
					}elseif(stristr($item, '</p></span>')){
						preg_match_all('!tn":"\*s"}\'>[\s]*<span[^<]*?>(<p>.*?)</span>.?</?div!s', $item,$contMatches);
						
					}else{
						preg_match_all('!tn":"\*s"}\'>[\s]*<span[^<]*?>(.*?)</span>.?</?div!s', $item,$contMatches);
					}
					  
					$contMatches = $contMatches[1];
					
					if(count($contMatches) == 2){
						if($contMatches[0] === $contMatches[1]){
							unset($contMatches[1]);
						}
					}
					 
					if(isset($contMatches[0])) {
						
						$matched_text_content = implode('<br>', $contMatches) ;
						
						if(stristr($matched_text_content, 'background-image') || stristr($matched_text_content, 'color:rgba') || stristr($matched_text_content, 'font-size')){
							$matched_text_content = strip_tags($matched_text_content);
						}
						
						$txtContent =  $matched_text_content ;
						if(! in_array('OPT_FB_TXT_SKIP', $camp_opt)){
							
							if( stristr($matched_text_content, '<p>') ){
								$content =  $matched_text_content ;
							}else{
								$content =  '<p>'.$matched_text_content.'</p>';
							}
							
						}  
					}
					 
					//If shared, find original post id
					$original_post_url = $url; //ini
					
					// removed 					
					if( false &&  stristr($item, 'original_content_id')){
						preg_match('{"original_content_id":"(\d*?)"}s',$item,$original_id_matches);
						
						if(isset($original_id_matches[1]) && trim( $original_id_matches[1] ) != ''){
							$original_post_url = 'https://www.facebook.com/'. $original_id_matches[1];
							
							echo '<br>Original post URL:'.$original_post_url;
						
						}
						
					}
					 
					
					//load original fb post permalinkPost
					//curl get
					$x='error';
					curl_setopt($this->ch, CURLOPT_HTTPGET, 1);
					curl_setopt($this->ch, CURLOPT_URL, trim($original_post_url));
					$exec2=curl_exec($this->ch);
					$exec2_raw = $exec2 = str_replace('amp;', '&', $exec2);
					$x=curl_error($this->ch);
					
					
					//publish date again if does not exist 
					if(trim($created_time) == ''){
						
						//get the created time  data-utime="1533445159"
						preg_match('{data-utime\="(.*?)"}' , $exec2 , $time_matches);
						
						if(isset($time_matches[1]) && trim( $time_matches[1] ) != '' ){
							$created_time = $time_matches[1];
						}
					 
						 						
						//check if old before loading original page if created_time exists in page
						$foundOldPost = false;
						if(in_array('OPT_YT_DATE', $camp_opt)   && trim($created_time) != ''   ){
							if($this->is_link_old($camp->camp_id,  (  $created_time  ) )){
								echo '<--old post execluding...';
								$foundOldPost = true;
								continue;
							}
						}
						
					}
					
					//utc convert
					$created_time  =  date( 'Y-m-d H:i:s' , $created_time );
					$created_time = get_date_from_gmt($created_time);
					$wpdate = $date = $created_time;
					
					$shares_count = 0;
					
					//reading share count
					preg_match('{sharecountreduced":"(\d*?)","sharefbid":"'.$single_id.'}s', $exec2,$share_matches); // pages share matches
					if(! isset( $share_matches[1] )) preg_match('{sharecountreduced:"(\d*?)",sharefbid:"'.$single_id.'}s', $exec2,$share_matches); // groups share matches
					if(isset($share_matches[1]) && trim($share_matches[1]) != '' ) $shares_count = $share_matches[1];
					
					if(stristr($exec2,'permalinkPost')){
						
						preg_match( '{permalinkPost">.*?<div class="_4-u2 _4-u8}s', $exec2,$post_matches);
						
						if( isset( $post_matches[0] ) &&  trim($post_matches[0]) != '' ){
							$exec2 = $post_matches[0] ;
						}
						
					}
					
					//if truncated text
					if(    ! stristr($item, '</p></span>') && trim($txtContent) != ''  ){
						
						echo '<br>Finiding full textual content';
						
						//<div class="_5pbx
						preg_match('!<div class="_5pbx.*?>(.*?)</div>!s', $exec2,$full_text_matches);
						
						if(isset($full_text_matches[1]) && trim($full_text_matches[1]) != ''){
									echo '<--found';
									
									//remove image emoji
									$full_text_matches[1] = preg_replace('{<img class="\w*?" height="16".*?>}s' , '' , $full_text_matches[1]);
									
									$txtContent =  $full_text_matches[1] ;
									if(! in_array('OPT_FB_TXT_SKIP', $camp_opt)) $content =  $full_text_matches[1]; 
									
						}
						 	
					}
					
					   
					
					//remove recent photos widget from sidebar
					$exec2 = preg_replace('{<ul class="_5ks4.*?ul>}s', '', $exec2);
					
					//full sized images urls
					$full_imgs_srcs = array(); //ini
					
					//empty attachement removal
					$exec2 = str_replace('attachments_info:{}', '', $exec2);
					
				 
					
					if( stristr($exec2, 'attachments_info') ){
						
						preg_match( '!attachments_info:{.*?}}!s', $exec2,$full_imgs_html );
						
						if( isset( $full_imgs_html[0]) && stristr($full_imgs_html[0], 'url')  ){
							preg_match_all('!url:"(.*?)"!s',$full_imgs_html[0] , $full_imgs_matches );
							
							if(isset($full_imgs_matches[1]) && count($full_imgs_matches[1]) > 0 ){
								$full_imgs_srcs = $full_imgs_matches[1];
							}
							 
						}
						 
					}elseif(stristr($exec2, 'data-ploi="')){
						
						
						
						preg_match_all( '!data-ploi="(.*?)"!s' , $exec2 , $poly_matches  );
						
						if(isset($poly_matches[1]) && count($poly_matches[1]) > 0 ){
							$full_imgs_srcs = $poly_matches[1];
						}
						
					}elseif(stristr($exec2, 'data-plsi="')){
						
						preg_match_all( '!data-plsi="(.*?)"!s' , $exec2 , $poly_matches  );
						
						if(isset($poly_matches[1]) && count($poly_matches[1]) > 0 ){
							$full_imgs_srcs = $poly_matches[1];
						}
						
					}elseif(stristr($exec2, 'scaledImageFit')){
						
						preg_match('{<img class="scaledImageFit.*?src="(.*?)"}s' , $exec2 , $poly_matches );
						
						if(isset($poly_matches[1]) &&  count($poly_matches[1]) > 0 ){
							$full_imgs_srcs = $poly_matches[1];
						}
						
					}
					
			  
					 
					if($type == 'link' ){
						
						preg_match('{l.php\?u=(.*?)&}s', $item,$linkMatches);
						$foundLink = $linkMatches[1];
						$link = urldecode($foundLink);
						print_r( '<br>Found Link:'. $link);
						
						//get link title h3 class=
						preg_match('!<h3 class="[^<]*?">([^<]*?)</h3>!s' , $item , $linkTMatches );
						  
						$title = $linkTitle = $linkTMatches[1];
						echo '<br>Link title:'.$linkTitle;
						
						//get image url
						
						if(isset($all_imgs[0]) && trim($all_imgs[0]) != '') $imgsrc=$link_img =  str_replace('&amp;', '&', $all_imgs[0] );
						  
						
						if(stristr( $link_img , 'url=' ) && ! stristr($link_img, 'fbcdn.net%2F')){
							$link_img_prts = explode('url=', $link_img);
							$link_img = $link_img_prts[1];
							$link_img_prts = explode('&', $link_img);
							$link_img = urldecode( $link_img_prts[0] );
							
							$imgsrc = $link_img;
							
						}else{
							
							//get the image from the loaded page 
							preg_match('{<img class="scaledImageFit.*?src="(.*?)"}s' , $exec2 , $scaled_matches );
							if(isset($scaled_matches[1]) && trim($scaled_matches[1]) != ''){
								$imgsrc=$link_img =  str_replace('&amp;', '&', $scaled_matches[1] );
								 
							}
							
						}
						
					
						
						//add imge to the content
						if(trim($link_img) != '')
						$content .= '<p><a href="'.$link.'"><img title="'.$title.'" src="'.  $link_img  .'" /></a> </p>';
						
						//add link to the content
						$content .= '<p><a href="'.$link.'">'.$linkTitle.'</a></p>';
						
						//description is no more existing getting it  _6m7 _3bt9
					  
						 preg_match('{_6m7 _3bt9">(.*?)</div>}s',$exec2 , $description_matches );
						 if( isset($description_matches[1]) && trim($description_matches[1]) != ''  ){
						 	
						 	$txtContent.= $description_matches[1];
						 	if(! in_array('OPT_FB_TXT_SKIP', $camp_opt)) $content.= $description_matches[1];
						 	
						 }
						  
						
					}elseif($type == 'video'){
						
						$style='';
						
						if (in_array('OPT_FB_VID_IMG_HIDE', $camp_opt) ){
							$style = ' style="display:none" ';
						}
						
						if(stristr($item, 'youtube.com%2Fwatch')){
							
							preg_match('{l.php\?u=(.*?)&}s', $item,$linkMatches);
							$foundLink = $linkMatches[1];
							$link = urldecode($foundLink);
							print_r( '<br>Found Link:'. $link);
							
							//get link title
							preg_match('!<h3 class="[^<]*?">([^<]*?)</h3>!s' , $item , $linkTMatches );
							$title = $linkTitle = $linkTMatches[1];
							echo '<br>Link title:'.$linkTitle;
							
							
							//get image url
							preg_match (	'{<img src="(.*?)".*?>}' , $item , $imgMatch  );
							$link_img =  str_replace('&amp;', '&', $imgMatch[1] );
							
							if(stristr( $link_img , 'url=' )){
								$link_img_prts = explode('url=', $link_img);
								$link_img = $link_img_prts[1];
								$link_img_prts = explode('&', $link_img);
								$link_img = urldecode( $link_img_prts[0] );
							}
							
							$imgsrc = $link_img;
							
							$content = '<img '.$style.' title="'.$title.'" src="'. $imgsrc .'" /></a><br>' .$content;
							
							$content.= '<br><br>[embed]'.$link.'[/embed]';
							
							$ret['vid_embed'] = $link;
							
							$vidurl = $link;
							
						}else{
							
							//vid title
							preg_match('{aria-label="(.*?)"}s', $item,$vid_title_match);
							$title = $vid_title_match[1];
							
							$title = str_replace('Watch video', '', $title);
							$title = preg_replace('{^Watch}', '', $title);
							
							echo '<br>Video title:'.$title;
							//vid img
							//get image url 
							if(stristr($exec2, '_3chq')){
								preg_match (	'{<img class="_3chq" src="(.*?)".*?>}' , $exec2 , $imgMatch  );
							}else{
								preg_match (	'{<img src="(.*?)".*?>}' , $item , $imgMatch  );
							}
							
							$link_img =  str_replace('&amp;', '&', $imgMatch[1] );
							echo '<br>Video img:'.$link_img;
							 
							
							$imgsrc = $link_img;
							 
							$content = '<img '.$style.' title="'.$title.'" src="'. $imgsrc .'" /></a><br>' .$content;
							 
							
							//vid id photo_id":"
							preg_match('{photo_id":"(.*?)"}s', $item,$id_match);
							$vid_id = $id_match[1];
							echo '<br>Video ID:'.$vid_id;
							
							//vid url
							$vidurl ="https://www.facebook.com/video.php?v=$vid_id";
							echo '<br>Video URL:'.$vidurl;
							
							//embed code
							$vidAuto = '';
							if(in_array('OPT_FB_VID_AUTO', $camp_opt)){
								$vidAuto = ' autoplay= "true" ';
								$autoplay = 'true';
							}else{
								$autoplay = 'false';
							}
							
							$ret['vid_embed'] = '<div id="fb-root"></div><script>(function(d, s, id) {  var js, fjs = d.getElementsByTagName(s)[0];  if (d.getElementById(id)) return;  js = d.createElement(s); js.id = id;  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3";  fjs.parentNode.insertBefore(js, fjs);}(document, \'script\', \'facebook-jssdk\'));</script><div class="fb-video" data-autoplay="'.$autoplay.'" data-allowfullscreen="true" data-href="https://www.facebook.com/video.php?v='.$vid_id.'&amp;set=vb.500808182&amp;type=1"><div class="fb-xfbml-parse-ignore"></div></div>';
							
							if( (defined('PARENT_THEME') &&  (PARENT_THEME =='truemag' || PARENT_THEME =='newstube'))  || class_exists('Cactus_video') ){
								
							}else{
								
								if(! in_array('OPT_FB_VID_SKIP', $camp_opt)){
									
									$content.= '[fb_vid '.$vidAuto.' id="'.$vid_id.'"]';
									
								}
								
								
							}
							
						}
						
						
						
						
					}elseif($type == 'note'){
						
						//title
						preg_match('!<div class="\w{2}">([^<]+?)</div>!s', $item,$title_matches);
						$title = $title_matches[1];
						
						//get image url <div class="_30q-" style="background-image: url
						
						if(stristr($exec2, '_30q-')){
							
							preg_match('{<div class="_30q-" style="background-image: url\((.*?)\)}s', $exec2 , $full_img_matches);
							
							if( isset($full_img_matches[1]) && trim($full_img_matches[1]) != '' ){
								$imgsrc=$link_img =  str_replace('&amp;', '&', $full_img_matches[1] );
								$content = '<img   title="'.$title.'" src="'. $link_img .'" /></a><br>' .$content;
							}
							  
							
						}elseif(isset($all_imgs[0])){
							preg_match (	'{<img src="(.*?)".*?>}' , $all_imgs[0] , $imgMatch  );
							
							if(isset($imgMatch[1]) && trim($imgMatch[1]) != '' ){
								$imgsrc=$link_img =  str_replace('&amp;', '&', $imgMatch[1] );
								$content = '<img   title="'.$title.'" src="'. $link_img .'" /></a><br>' .$content;
							}
						}
						
						//description
						preg_match('!<div class="\w{2} \w{2}">([^<]+)</div>!s', $item,$content_matches);
						$content = $content . $content_matches[1];
						
						 
					}elseif($type == 'event' ){
						
						//missing image, event description
						
						//event title 
						
						if($cg_fb_from == 'events'){
							//<title id="pageTitle">Decor ideas discussion</title>
							preg_match('!<title id\="pageTitle">(.*?)</title>!s', $exec2,$title_matches);
						}else{
							preg_match('!<h3 class="\w{2} \w{2} \w{2}">([^<]+?)</h3>!s', $item,$title_matches);
						}
						
						$title = $title_matches[1];

						if(stristr($exec2, 'scaledImageFit')){
							preg_match('{<img class="scaledImageFit.*?src="(.*?)"}s' , $exec2 , $scaled_matches );
						}elseif(stristr($exec2, '<video')){
							preg_match('{margin-top:0px;" src="(.*?)"}s' , $exec2 , $scaled_matches );
						}
					 	
					 	if(isset($scaled_matches[1]) && trim($scaled_matches[1]) != ''){
					 		$imgsrc=$link_img =  str_replace('&amp;', '&', $scaled_matches[1] );
					 		$content = '<img   title="'.$title.'" src="'. $link_img .'" /></a><br>' .$content;
					 	}
					 	 
						
					}elseif($type == 'offer'){
						
						//offer title
						preg_match('!<h3 class="\w{2} \w{2} \w{2}">([^<]+?)</h3>!s', $item,$title_matches);
						$title = $title_matches[1];
						
						if(trim($content) == '') $content = $title;
						
						preg_match('{<img class="scaledImageFit.*?src="(.*?)"}s' , $exec2 , $scaled_matches );
						if(isset($scaled_matches[1]) && trim($scaled_matches[1]) != ''){
							$imgsrc=$link_img =  str_replace('&amp;', '&', $scaled_matches[1] );
							$content = '<img   title="'.$title.'" src="'. $link_img .'" /></a><br>' .$content;
						}
						
					}elseif($type == 'photo'){
						
						if(count($full_imgs_srcs) > 0 ){

							//full sized images found
							foreach ($full_imgs_srcs as $single_img_src){
								$content .= '<br><img class="wp_automatic_fb_img" title="'.$title.'" src="'. $single_img_src .'" />';
							}
							 
						}else{
							//small sized images
							$content = $content . implode( '' , $all_imgs );
						}
						
						
						preg_match('{src="(.*?)"}', $content , $src_matches) ;
						
						if(isset( $src_matches[1] ) && trim($src_matches[1])  != ''){
							$imgsrc = str_replace('&amp;', '&', $src_matches[1] ) ;
						}
						 
						
					}
					
				 
					
				 
	
					//check if title exits or generate it
					if(trim($title) == '' && in_array('OPT_GENERATE_FB_TITLE', $camp_opt) ){
	
						  echo '<br>No title generating...';
						
						  if(! function_exists('wp_staticize_emoji')){
						  	
						  }else{
						  	
						  }
						  
						  //line breaks for title generation stop at line breaks
						  $tempContent = str_replace('</p><p>', "\n", $txtContent);
						  $tempContent = str_replace('<br />', "\n", $tempContent);
						  $tempContent = str_replace('<br >', "\n", $tempContent);
						  $tempContent = str_replace('<br>', "\n", $tempContent);
						  $tempContent = str_replace('<br/>', "\n", $tempContent);
					 
						  
						  $tempContent = $this->removeEmoji( strip_tags(strip_shortcodes($tempContent)));
						
						
						$tempContent = preg_replace('@(https?://([-\w\.]+[-\w])+(:\d+)?(/([\w/_\.#-]*(\?\S+)?[^\.\s])?)?)@', '', $tempContent);
	
						
						// Chars count
						$charsCount = $camp_general['cg_fb_title_count'];
						if(! is_numeric($charsCount)) $charsCount = 80;
	
						if(function_exists('mb_substr')){
							
							 
							$newTitle =  mb_substr($tempContent, 0,$charsCount) ;
							 
							if( in_array( 'OPT_GENERATE_FB_RETURN' , $camp_opt ) && stristr($newTitle, "\n") ){

								$suggestedTitle =  preg_replace("{\n.*}", '', $newTitle);
								if(trim($suggestedTitle) != '') {
									$newTitle = trim($suggestedTitle);
									
									if(in_array('OPT_FB_STRIP_TITLE', $camp_opt)){
										$before_title_removal = $content;
										$content = str_replace($suggestedTitle . "<br />", '', $content);
										
										if($content == $before_title_removal){
											$content = str_replace('<p>'. $suggestedTitle . "</p>", '', $content);
										}
										
										if($content == $before_title_removal){
											$content = str_replace( $suggestedTitle , '', $content);
										}
										
									}
									
								}
								
							} 
							 
							
						}else{
							$newTitle =  substr($tempContent, 0,$charsCount) ;
							
							  echo '<br>mb_str is not installed !!!';
							
						}
							
						if(trim($newTitle) == ''){
							  echo '<- did not appropriate title';
						}else{
								
							$title = $newTitle;
							 
							if( ! in_array('OPT_GENERATE_FB_DOT', $camp_opt)  && $title != $tempContent  ){
								$title.= '...';
							}
							
							  echo ':'.$title;
								
						}
	
					}
						
	
					if(trim($title) == '' && in_array('OPT_FB_TITLE_SKIP', $camp_opt)){
						  echo '<-- No title skiping.';
						continue;
					}
						
						
					//remove referral suffix
					if( stristr($content, 'com/l.php') ){
	
						//extract links
						preg_match_all('{"http://l\.facebook\.com/l\.php\?u=(.*?)"}', $content,$matches);
	
						$founds = $matches[0];
						$links = $matches[1];
	
						$i=0;
						foreach ($founds as $found){
								
							$found = str_replace('"', '', $found);
							$link = $links[$i];
								
							$link_parts = explode('&h', $link);
							$link = $link_parts[0];
	
							$content = str_replace($found, urldecode($link), $content);
								
							$i++;
						}
	
					}
						
					//replace thumbnails by full image for external links
					if (  stristr($content, 'safe_image.php')    ){
	
						if(! stristr($content, 'fbstaging')){
						
							preg_match_all('{https://[^:]*?safe_image\.php.*?url=(.*?)"}', $content, $matches);
		
							$found_imgs = $matches[0];
							$found_imgs_links = $matches[1];
		
		
							$i=0;
		
							foreach ($found_imgs as $found_img ){
									
								$found_imgs_links[$i] = preg_replace('{&.*}', '', $found_imgs_links[$i]);
		
								$found_img_link = urldecode($found_imgs_links[$i] );
								
								$content = str_replace($found_img, $found_img_link."\"", $content);

								$imgsrc = $found_img_link;
									
							}
		
						}else{
							
							$content = str_replace('&w=130', '&w=650', $content);
							$content = str_replace('&h=130', '&h=650', $content);
							
							$imgsrc = str_replace('&w=130', '&w=650', $imgsrc);
							$imgsrc = str_replace('&h=130', '&h=650', $imgsrc);
							
						}
							
					}
						
	
					//small images check s130x130
					if( 0 &&  stristr($content, '130x130') || 0 && $type == 'photo' ){
						  echo '<br>Small images found extracting full images..';
	
						preg_match_all('{"https://[^"]*?\w130x130/(.*?)\..*?"}', $content,$matches);
	
						$small_imgs_srcs = str_replace('"', '', $matches[0]);
						$small_imgs_ids = $matches[1];
	
						//remove _o or _n
						$small_imgs_ids = preg_replace('{_\D}', '', $small_imgs_ids);
	
						//remove start of the id
						$small_imgs_ids = preg_replace('{^\d*?_}', '', $small_imgs_ids);
	
						//get oritinal page
						$x='error';
						curl_setopt($this->ch, CURLOPT_HTTPGET, 1);
						curl_setopt($this->ch, CURLOPT_URL, trim( html_entity_decode( $url)));
						$exec=curl_exec($this->ch);
						$x=curl_error($this->ch);
							
						if(stristr($exec, '<img class="scaled') && 0){
							  echo '<br>success loaded original page';
								
							//get imgs displayed
							preg_match_all('{<img class="scaled.*?>}s', $exec,$all_scalled_imgs_matches);
							$plain_imas_html = implode(' ', $all_scalled_imgs_matches[0]) ;
								
	
								
							//get ids without date at start \d{8}_(\d*?_\d*?)_
							preg_match_all('{\d{4,8}_(\d*?_\d*?)_}', $plain_imas_html,$all_ids_imgs_matches);
								
							$all_ids_imgs = array_unique($all_ids_imgs_matches[1]);
							$small_imgs_ids = $all_ids_imgs;
								
	
	
							$firstImage = '';
							@$firstImage = $all_ids_imgs[0];
								
	
							$i=0;
							foreach ($small_imgs_ids as $small_imgs_id){
	
	
								unset($large_imgs_matches);
	
									
								//searching full image
								preg_match('{src="(https://[^"]*?'.$small_imgs_id.'.*?)"}', $exec,$large_imgs_matches);
	
								//ajaxify images
								unset($large_imgs_matches_ajax);
								preg_match('{src=(https%3A%2F%2F[^&]*?'.$small_imgs_id.'.*?)&}', $exec,$large_imgs_matches_ajax);
	
	
								if(trim($large_imgs_matches[1]) != ''){
	
									$replace_img = $large_imgs_matches[1];
										
										
										
									//check if there is a larger ajaxify image or not
									if( isset($large_imgs_matches_ajax[1]) && trim($large_imgs_matches_ajax[1]) != ''){
										$replace_img = urldecode($large_imgs_matches_ajax[1]);
									}
										
	
										
									//if first image and image in the original content differs: case: added x photos to album
									if(  $i == 0  && (! stristr($content,$small_imgs_id) || ! stristr($content, 'w130x130'))  ){
	
										  echo '<br>Removing first image first';
										$content = preg_replace('{<img.*?>}', '', $content);
	
									}
										
									//  echo ' Replacing  '.$small_imgs_srcs[$i] . ' with '.$replace_img;
									if( stristr($content,$small_imgs_id) ){
											
										$content = str_replace( $small_imgs_srcs[$i], $replace_img, $content);
									}else{
										$content = str_replace('<!--reset_images-->', '<img class="wp_automatic_fb_img" src="'.$replace_img.'"/><!--reset_images-->', $content);
									}
	
	
								}
	
	
									
								$i++;
							}
								
							if($type == 'video'){
								  echo '<br>Extracting vid image';
	
								preg_match('{background-image: url\((.*?)\)}', $exec, $vid_img_match);
	
								$vid_img = $vid_img_match[1] ;
	
								if(trim($vid_img) != ''){
									$content = str_replace($item->picture, $vid_img, $content);
									  echo '-> success';
								}else{
									  echo '-> failed';
								}
									
	
									
							}
								
						}else{
							  echo '<br>Can not find image id at soure loaded page small img id:'.$small_imgs_ids[0];
								
						}
	
	
					}
						
					//fix links of facebook short /
					//$content = str_replace('href="/', 'href="https://facebook.com/', $content);
					$content = preg_replace('{href="/(\w)}', 'href="https://facebook.com/$1', $content);
	
					//change img class
					$content = str_replace('class="img"', 'class="wp_automatic_fb_img"', $content);
						
					//skip if no image
					if(in_array('OPT_FB_IMG_SKIP', $camp_opt)){
	
						if(  ! stristr($content, '<img')){
							  echo 'Post have no image skipping...';
							continue;
						}
					}
	
					if($isEvent == true){
						
					 
						
						$ret['original_title'] = $title;
						$ret['original_link'] = $url;
						$ret['matched_content'] = $content;
						$ret['original_date'] = $wpdate;
						$ret['image_src'] =$imgsrc;
						$ret['post_id'] = $item_id;
						
						// lat and long
						$lat = '';
						$long = '';
						
						if(stristr($exec2, 'center=')){
						
							//center=40.02876458946%2C18.019080162048&
							preg_match('{center\=([\d|\.]*?|)%2C([\d|\.]*?|)&}', $exec2,$loc_matches);
							
							if(isset($loc_matches[1]) && isset($loc_matches[2])){
								$lat =  $loc_matches[1];
								$long = $loc_matches[2];
							}
						}
						
						$ret['place_latitude'] = $lat;
						$ret['place_longitude'] = $long;
						
						$ret['place_map'] = isset($loc_matches[1]) ? '<iframe src = "https://maps.google.com/maps?q='.$lat . ',' . $long . '&hl=es;z=14&amp;output=embed"></iframe>' : '';
						$ret['event_description'] = $txtContent;

						//start, end time  content="2018-06-16T07:00:00-07:00 to 2018-08-16T11:00:00-07:00">
						
						$start_time = '';
						$end_time  = '';

						preg_match( '{content\="(20\d{2}-\d{2}-.*?)to(.*?)">}' ,  $exec2 ,  $date_matches );
						
						if( isset($date_matches[1]) && isset($date_matches[2]) ){
						
							$start_time =   $date_matches[1] ; 
							$end_time = $date_matches[2] ;
							
					
							$ret['start_time'] = get_date_from_gmt( gmdate(  'Y-m-d H:i:s' ,  strtotime($start_time)));
							$ret['start_time_timestamp'] = strtotime( $ret['start_time'] );
							
							$ret['end_time'] =   get_date_from_gmt( gmdate(  'Y-m-d H:i:s' ,  strtotime($end_time))) ;
							$ret['end_time_timestamp'] = strtotime( $ret['end_time'] );
							
						
						}else{
							
							$ret['start_time'] = '';
							$ret['end_time'] =   '' ;
							
							
						}
						
						
						
						
						// <a class="_5xhk" href="https://www.facebook.com/carlitocafe/" data-hovercard="/ajax/hovercard/page.php?id=468266406591543" data-hovercard-prefer-more-content-show="1" id="u_0_1n">Carlito</a><div class="_5xhp fsm fwn fcg _5wj-" dir="rtl">
						$place_name = '';
						preg_match('{<a class="_5xhk".*?>(.*?)</a>}', $exec2, $place_matches );
						
						if( isset($place_matches[1]) ){
							$place_name = $place_matches[1] ;
						}else{
							
							//location with no fb page <span class="_5xhk">test location</span>
							preg_match('{<span class="_5xhk">(.*?)</span>}', $exec2, $place_matches );
							
							if( isset($place_matches[1]) ){
								$place_name = $place_matches[1] ;
							}
							
						}
						
						$ret['place_name'] = $place_name;
						
						//address </a><div class="_5xhp fsm fwn fcg">5216 Montrose Blvd, Houston, Texas 77006</div>
						$place_address = '';
						
						preg_match('{</a><div class="_5xhp.*?>(.*?)</div>}', $exec2 , $address_matches);
						 
						
						if( isset($address_matches[1])  &&  trim( $address_matches[1] ) != ''    ) {
							$place_address = $address_matches[1];
						}
						
						$ret['place_address'] = $place_address;
						
						$place_zip = '';
						
						$place_address_parts = array();
						if(trim($place_address) != ''){
							$place_address_parts = explode(',', $place_address);
						}
						
						foreach ($place_address_parts as $single_part){
							
							if( is_numeric( trim($single_part) ) && strlen($single_part) > 3 ){
								$place_zip = $single_part ;
								break;
							}
							
							if(trim($place_zip) == '' ){
								$last_part = $place_address_parts[  count($place_address_parts) - 1 ];
								
								if( stristr($last_part, ' ' ) ){
									
									$last_part_parts = explode(' ', $last_part);
									
									$final_part = $last_part_parts[ count($last_part_parts) -1 ];
									
									if( is_numeric( trim($final_part) ) && strlen($final_part) > 3 ){
										$place_zip = $final_part ;
									}

								}
								  
							}
							
						}
						
						
						
						$ret['place_zip'] = $place_zip;
						
						//street 
						$place_street = '';
						
						if(count($place_address_parts) > 2){
							$place_street = $place_address_parts[0];
						}
						 
						$ret['place_street'] = $place_street;
						
						$place_city = '';
						$place_country = '';
						
						if(count( $place_address_parts ) > 2 ){
							
							if(! is_numeric( $place_address_parts[ count($place_address_parts) -1 ] )){
								$place_city = str_replace($place_zip, '', $place_address_parts[ count($place_address_parts) -1 ]);
							}else{
								$place_city =  $place_address_parts[ count($place_address_parts) -2 ];
							}
						
						}elseif(count($place_address_parts) > 1){
							$place_city = $place_address_parts[0];
							$place_country = $place_address_parts[1];
						}
						 
						$ret['place_city'] = $place_city;
						$ret['place_country'] = $place_country;
						
						  
						
					}else{
						
						//likes: width="13" height="13" class="r"></span>1</a>
						$item_likes = 0 ;
						
						preg_match( '{width="13" height="13" class=".*?"></span>(.*?)</a>}s' , $item , $likes_count_matches);
						if(isset($likes_count_matches[1]) && is_numeric(  $likes_count_matches[1]  )){
							$item_likes = $likes_count_matches[1] ;
						}
						
					 	 
					 
						
						$ret['original_title'] = $title;
						$ret['original_link'] = $url;
						$ret['matched_content'] = $content;
						$ret['original_date'] = $wpdate;
						
						//get from info
						preg_match('{<a href=".*?">(.*?)</a>}', $item,$from_matches);
						$from_name = $from_matches[1];
						$ret['from_name'] = $from_name;
						
						
						//from ID  actor_id%22%3A100026923221457%
						$sharer_id = $cg_fb_page_id;
						if(stristr($exec2, 'sharer_id')){

							preg_match('{sharer_id=(.*?)&}s', $exec2,$from_matches);
							 
							if( isset($from_matches[1]) && trim($from_matches[1]) != '' ){
								$sharer_id = $from_matches[1];
							}
							
							//from_name ownerName:"Gamal M. Elkomy"
							preg_match('{ownerName:"(.*?)"}s', $exec2,$from_name_matches);
							if( isset($from_name_matches[1]) && trim($from_name_matches[1]) != '' ){
								$ret['from_name'] = $from_name_matches[1];
							}
							
						}
						
						 
						
						$ret['from_id'] = $sharer_id;
						$ret['from_url'] = 'https://facebook.com/'.$sharer_id;
						$ret['from_thumbnail'] = 'https://graph.facebook.com/'.$sharer_id.'/picture?type=large';
						
						
						$ret['post_id'] = $item_id;
						$ret['post_id_single'] =  $single_id ;
						$ret['image_src'] =$imgsrc;
						$ret['likes_count'] = $item_likes;
						
						//original url of the shared post
						if($type == 'link'){
							$ret['external_url'] = $link;
						}else{
							$ret['external_url'] = '';
						}
						
						   
						
						//shares  
						if(!is_numeric($shares_count)) $shares_count = 0 ;
						$ret['shares_count'] = $shares_count;
						
						if(trim($title) == '') $ret['original_title']= '(notitle)';
						
						//embed code
						$ret['post_embed'] = '<div id="fb-root"></div>
<script>
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id))
        return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
    fjs.parentNode.insertBefore(js, fjs);
}(document, \'script\', \'facebook-jssdk\'));
</script>
<div class="fb-post" data-href="https://www.facebook.com/'.$cg_fb_page_id.'/posts/'. $single_id .'"></div>';
						
						//hashtags >#support</a>
						//echo $ret['matched_content'];
						
						if(stristr($ret['matched_content'], '#')){
							
							preg_match_all('{>#(.*?)</a>}', $ret['matched_content'] , $hash_matchs);
							$hash_matchs = $hash_matchs[1];
							$hash_tags = implode(',', $hash_matchs);
							$ret['item_tags'] = strip_tags( $hash_tags ) ;
							
						}else{
							$ret['item_tags'] = '';
						}
						
					}
					
					$ret['source_link']= $ret['original_link'];
					
					// comments   {"comments":[{"body..... }],"pinnedcomments
					if(in_array('OPT_FB_COMMENT', $camp_opt)){
						
						$correct_comment_part = '' ; //ini
						 
						if( stristr($exec2_raw, '{"comments"' ) ){
							preg_match_all('/({"comments":\[\{"body.*?\}\]),"pinnedcomments/s', $exec2_raw , $comments_parts  );
						}else{
							//{comments:[{body:{text
							preg_match_all('/({comments:\[\{body.*?\}\]),pinnedcomments/s', $exec2_raw , $comments_parts  );
						}
						
					 
						 
						if( isset($comments_parts[1] ) && count($comments_parts[1]) >0   ){
							
							foreach ($comments_parts[1] as $comment_part){
								
								if( stristr($comment_part, $single_id . '_') ){
									
									$correct_comment_part = $comment_part;
									break;
									
								}
								
							}
							 
							if(trim($correct_comment_part) != ''){
								
								$correct_comment_part.= '}';
								
								
								//fix json text 
								if(stristr($correct_comment_part, '{comments:[')){
									$correct_comment_part =	preg_replace(  '/(\s*?{\s*?|\s*?,\s*?)([\'"])?([a-zA-Z0-9_]+)([\'"])?:/' , '$1"$3":' , $correct_comment_part);
								}
								 
								
								$comments_json = json_decode($correct_comment_part);
								 
								
								if( isset( $comments_json->comments ) && count( $comments_json->comments  ) > 0 ){
									
									$a_comment = array();
									$all_comments = array();
									foreach($comments_json->comments as $comment_obj ){
										
										$a_comment = array();
										$commment_txt= '';
										
										//no child
										if(trim($comment_obj->parentcommentid) != '') continue;
										
										if( isset($comment_obj->attachment->metadata->source_uri)  ){
											
											$commment_txt = '<img src="'. $comment_obj->attachment->metadata->source_uri .'" /><br>';
											
										}
										
										//body 
										$commment_txt.= $comment_obj->body->text;
										
										if( trim($commment_txt) == '' ) continue;
										
										$a_comment['text'] = $commment_txt ;
										$a_comment['time'] = $comment_obj->timestamp->time;
										$a_comment['author_id'] = $comment_obj->author;
										
										//name extraction from exec2_raw
										preg_match('/{"?id"?:"'. $a_comment['author_id'] .'","?name"?:"(.*?)"/s', $exec2_raw , $comment_name_matches);
										
										if ( isset($comment_name_matches[1] ) && trim($comment_name_matches[1]) != '' ){
											$a_comment['author_name'] = $comment_name_matches[1] ;
										}else{
											$a_comment['author_name'] =  $a_comment['author_id']  ;
										}
										
										$all_comments[] = $a_comment;
										
										 
									}
									
									if(count($all_comments) >0) $ret['comments'] = array_reverse( $all_comments );
									
								}
								
							 
							 
							}
							
						}
						 
					}
					
				 	//fix  hashtags
					if( stristr($ret['matched_content'], 'hash')){
						
						//<span class="es et">#</span><span class="eu">emergencias</span>
						$ret['matched_content'] = preg_replace('{>#</span><span class="[^<]*?">}s', '>#', $ret['matched_content'] );
					}
				 
					
					return $ret;
	
	
						
				}//endforeach
	
				echo '<br>End of available items reached....';
	
				if(in_array('OPT_FB_CACHE', $camp_opt)){
	
					echo '<br>Deleting cache as no more valid items found...';
					delete_post_meta($camp->camp_id,'wp_automatic_cache');
					
					//Setting next page url 
					$nextPageUrl = '';
					if(stristr($exec , '<div class="i">') || stristr($exec, '"/groups/'. $cg_fb_page_id .'?bacr=') || stristr($exec, '/profile/timeline/stream/')  ||  (stristr($exec,'serialized_cursor') && $cg_fb_from == 'events' )  ){
						
						if(  (stristr($exec,'serialized_cursor') && $cg_fb_from == 'events' ) ){

							//<a href="/DuplexRooftopVenuePrague?v=events&amp;is_past&amp;serialized_cursor=AQHRbC1iSbVP7ovwPg2wTaw5UAntzEpVELbhs73QLHTkfFLA6biRLa8kZiUjo0VJWvnM8-1mPKTORyPdaim_hkPYNw&amp;has_more=1"><span>See More Events
					
							preg_match('{<a href="([^"]*?serialized_cursor.*?)"><span>}s', $exec,$next_page_matches);
							
							
						}elseif( stristr($exec , '<div class="i">') ){
							
							preg_match('{<div class="i"><a href="(.*?)"}s', $exec,$next_page_matches);
						
						}elseif(stristr($exec, '/groups/'.$cg_fb_page_id.'?bacr')){
	
							// <a href="/groups/432181060188911?bacr=1533379292%3A2126534660753534%3A2126534660753534%2C0%3A7%3A&amp;multi_permalinks&amp;refid=18"
							preg_match('{<a href\="(/groups/'.$cg_fb_page_id.'\?bacr\=.*?)"}s', $exec,$next_page_matches);
							
						}else{
							
							//profile <div class="bj ez" id="u_0_2"><a href="/profile/timeline/stream/?cursor=tmln_strm%3A1532370640%3A-6901330163514402029%3A1&amp;profile_id=1475120237&amp;replace_id=u_0_2&amp;refid=17"><span>See More Stories
							preg_match('{<a href\="(/profile/timeline/stream/\?cursor\=tmln_strm.*?)"}s', $exec,$next_page_matches);
						 
							
						}
						 
						if( isset($next_page_matches[1]) && trim($next_page_matches[1]) != '' && ! stristr($next_page_matches[1], 'v=timeline' ) ){
							
							$nextPageUrl = "https://mbasic.facebook.com/" .  $next_page_matches[1] ;
							echo '<br>Next page:' . $nextPageUrl ;
							
							update_post_meta($camp->camp_id, 'nextPageUrl', $nextPageUrl);
							
						}else{
							// no next 
							echo '<br>No next page available';
							delete_post_meta($camp->camp_id, 'nextPageUrl');
						}
						
					 
						
					}else{
					 
						echo '<br>No next page available';
						delete_post_meta($camp->camp_id, 'nextPageUrl');
						
					}
					
					
					
						
				}
	
			}else{
				  
				echo '<br><span style="color:red">Unexpected response, Please make sure the added Facebook cookies added to the settings page are correct.</span> '  ;
	
				echo $exec;
				
				  
			}//wp error
				
		}//trim pageid
	}
	
	
}