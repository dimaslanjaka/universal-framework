<?php

// Main Class
require_once 'core.php';

Class WpAutomaticeBay extends wp_automatic{


/*
 * ebay fetch items
 */
function ebay_fetch_items($keyword, $camp) {

	//ref:https://docs.google.com/spreadsheet/ccc?key=0Auf5oUAL4RXDdHhiSFpUYjloaUFOM0NEQnF2d1FodGc&hl=en_US

	  echo "<br>so I should now get some items from ebay for keyword :" . $keyword;

	$campaignid = get_option ( 'wp_automatic_ebay_camp', '' );

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
		
		
		if ($start == - 1 ) {
			  echo '<- exhausted keyword';
			
			//check if it is reactivated or still deactivated
			if($this->is_deactivated($camp->camp_id, $keyword)){
				$start =1;
			}else{
				//still deactivated
				return false;
			}
			
			
		}
		
		  echo ' index:' . $start;
		
		// update start index to start+1
		if( ! in_array( 'OPT_EB_CACHE' , $camp_opt )){
			  echo '<br>Caching is not enabled setting eBay page to query to 1';
			$nextstart =1;
		}else{
			$nextstart = $start + 1;
		}
		
		 
		
		$query = "update {$this->wp_prefix}automatic_keywords set keyword_start = $nextstart where keyword_id=$kid ";
		$this->db->query ( $query );
		
	
	// prepare the link
	$elink = 'http://rest.ebay.com/epn/v1/find/item.rss?';

	// ebay site
	$elink .= 'programid=' . $camp_general ['cg_eb_site'];

	// campaign id
	if (trim ( $campaignid ) != '') {
		$elink .= '&campaignid=' . $campaignid;
	}else{
		$elink .= '&campaignid=1343253';
	}

	
	//startpage
	$elink.= '&pageNumber='.$start;

	if(in_array('OPT_EBAY_CUSTOM', $camp_opt) && trim($camp_general['cg_ebay_custom']) != '' ){
			
		$elink .= '&categoryId1=' . $camp_general['cg_ebay_custom'];
			
	}else{
			
		// ebay category cg_eb_cat
		$cg_eb_cat = $camp_general ['cg_eb_cat'];
			
		if (trim ( $cg_eb_cat != '0' )) {
			$elink .= '&categoryId1=' . $cg_eb_cat;
		}
	}


	// if user
	if (in_array ( 'OPT_EB_USER', $camp_opt )) {
		$cg_eb_user = $camp_general ['cg_eb_user'];
		$elink .= '&sellerId1=' . trim($cg_eb_user) ;
			
		if (in_array ( 'OPT_EB_FULL', $camp_opt )) {
			  echo '<br>No filtering add all ..';
			$elink .= '&keyword=';
		} else {
			// keyword
			$elink .= '&keyword=' . urlencode($keyword);
		}
	} else {
		// keyword
		$elink .= '&keyword=' . urlencode($keyword);
	}

	// listing type
	$elink .= '&listingType1=' . $camp_general ['cg_eb_listing'];

	// listing order cg_eb_order
	$elink .= '&sortOrder=' . $camp_general ['cg_eb_order'];

	// price range
	if (in_array ( 'OPT_EB_PRICE', $camp_opt )) {
		$cg_eb_min = $camp_general ['cg_eb_min'];
		$cg_eb_max = $camp_general ['cg_eb_max'];
			
		// min
		if (trim ( $cg_eb_min ) != '')
			$elink .= '&minPrice=' . trim($cg_eb_min);

		// max
		if (trim ( $cg_eb_max ) != '')
			$elink .= '&maxPrice=' . trim($cg_eb_max);
	}

	// topRatedSeller=true
	if (in_array ( 'OPT_EB_TOP', $camp_opt )) {
		$elink .= '&topRatedSeller=true';
	}

	// OPT_EB_SHIP
	if (in_array ( 'OPT_EB_SHIP', $camp_opt )) {
		$elink .= '&freeShipping=true';
	}

	// OPT_EB_DESCRIPTION
	if (in_array ( 'OPT_EB_DESCRIPTION', $camp_opt )) {
		$elink .= '&descriptionSearch=true';
	}

	// append params
	if(in_array('OPT_EB_PARAM', $camp_opt)){
		$elink.= trim($camp_general['cg_eb_param']);
	}
	
	  echo '<br>Link:' . $elink;
		
	// curl get
	$x = 'error';
	$url = $elink;
	curl_setopt ( $this->ch, CURLOPT_HTTPGET, 1 );
	curl_setopt ( $this->ch, CURLOPT_URL, trim ( $url ) );
		
		
	$exec = curl_exec ( $this->ch );
	$x = curl_error ( $this->ch );
		
		
	// titles
	preg_match_all ( '/<item><title>(.*?)<\/title>/', $exec, $matches );
	$titles = ($matches [1]);

	// imgs
	preg_match_all ( '/src=\'(.*?)\'/', $exec, $matches );
	$imgs = ($matches [1]);

	// links
	preg_match_all ( '/guid><link>(.*?)<\/link>/', $exec, $matches );
	$links = ($matches [1]);

	// ids <guid>
	preg_match_all ( '/guid>(.*?)<\/guid>/', $exec, $matches );
	$ids = ($matches [1]);

	// pubDate
	preg_match_all ( '/pubDate>(.*?)<\/pubDate>/', $exec, $matches );
	$pubdates = ($matches [1]);

	// bids count BidCount>0</e
	preg_match_all ( '/BidCount>(.*?)<\/e\:BidCount/', $exec, $matches );
	$bids = ($matches [1]);

	// current price <e:CurrentPrice>79.99</e:CurrentPrice>
	preg_match_all ( '/CurrentPrice>(.*?)<\/e\:CurrentPrice/', $exec, $matches );
	$prices = ($matches [1]);

	// bin BuyItNowPrice
	preg_match_all ( '/BuyItNowPrice>(.*?)<\/e\:BuyItNowPrice/', $exec, $matches );
	$bins = ($matches [1]);

	// listing end time ListingEndTime
	preg_match_all ( '/ListingEndTime>(.*?)<\/e\:ListingEndTime/', $exec, $matches );
	$ends = ($matches [1]);

	// paymentmethod PaymentMethod
	preg_match_all ( '/PaymentMethod>(.*?)<\/e\:PaymentMethod/', $exec, $matches );
	$payment = ($matches [1]);

	if (count ( $titles ) > 0) {
	} else {
			
		  echo '<br>eBay did not return items ';
		
		//set start to -1 exhausted
		$query = "update {$this->wp_prefix}automatic_keywords set keyword_start = -1 where keyword_id=$kid";
		$this->db->query ( $query );
		
		//deactivate for 60 minutes
		if(! in_array('OPT_NO_DEACTIVATE', $camp_opt))
			$this->deactivate_key($camp->camp_id, $keyword);
		
	}

	$i = 0;
	  echo '<ol>';
	foreach ( $titles as $title ) {
			
		  echo '<li>Link:'.$links [$i];
			
		$id = $ids [$i];
			
		$itm ['item_id'] = $ids [$i];
		$itm ['item_title'] = $titles [$i];
		$itm ['item_img'] = $imgs [$i];
		$itm ['item_link'] = str_replace ( 'amp;', '', $links [$i] );
		$item_link = $itm ['item_link'];
		$itm ['item_publish_date'] = str_replace ( 'T', ' ', str_replace ( 'Z', ' ', $pubdates [$i] ) );
		$itm ['item_publish_date'] = str_replace ( '.000', '', $itm ['item_publish_date'] );
		$itm ['item_bids'] = $bids [$i];
		$itm ['item_price'] = $prices [$i];
		$itm ['item_bin'] = $bins [$i];
		$itm ['item_end_date'] = str_replace ( 'T', ' ', str_replace ( 'Z', ' ', $ends [$i] ) );
		$itm ['item_end_date'] = str_replace ( '.000', '', $itm ['item_end_date'] );
		$itm ['item_payment'] = $payment [$i];
			
			
			
		$data = base64_encode(serialize ( $itm ));
			
			
		if( $this->is_execluded($camp->camp_id, $item_link) ){
			  echo '<-- Execluded';
			continue;
		}
			
		if ( ! $this->is_duplicate($item_link) )  {
			$query = "INSERT INTO {$this->wp_prefix}automatic_general ( item_id , item_status , item_data ,item_type) values (    '$id', '0', '$data' ,'eb_{$camp->camp_id}_$keyword')  ";
			$this->db->query ( $query );
		} else {
			  echo ' <- duplicated <a href="'.get_edit_post_link($this->duplicate_id).'">#'.$this->duplicate_id.'</a>';
		}
			
		$i ++;
			
		  echo '</li>';
			
	}

	  echo '</ol>';


	  echo '<br>' . $i . ' items from ebay';
}
	
/*
 * ebay get post
 */
function ebay_get_post($camp) {
	
	// Campaign options
	$camp_opt = unserialize ( $camp->camp_options );
	
	// Campaign Keywords
	$keywords = explode ( ',', $camp->camp_keywords );

	// General options
	if( stristr($camp->camp_general, 'a:') ) $camp->camp_general=base64_encode($camp->camp_general);
	$camp_general = unserialize ( base64_decode( $camp->camp_general) );
	$camp_general=array_map('wp_automatic_stripslashes', $camp_general);
		

	// loop keywords
	foreach ( $keywords as $keyword ) {
			
		$keyword = trim($keyword);
			
		if (trim ( $keyword ) != '') {
				
			//update last keyword
			update_post_meta($camp->camp_id, 'last_keyword', trim($keyword));

			$this->used_keyword = $keyword;

			// getting links from the db for that keyword
			$query = "select * from {$this->wp_prefix}automatic_general where item_type=  'eb_{$camp->camp_id}_$keyword' and item_status ='0'";
			$res = $this->db->get_results ( $query );

			// when no links lets get new links
			if (count ( $res ) == 0) {
				$this->ebay_fetch_items ( $keyword, $camp );
				// getting links from the db for that keyword
				$res = $this->db->get_results ( $query );
			}

			//check duplicate
			//deleting duplicated items
			$res_count = count($res);
			for($i=0;$i< $res_count ;$i++){

				$t_row = $res[$i];
				$t_data =  unserialize ( base64_decode($t_row->item_data) );

					
				$t_link_url=$t_data ['item_link'];

				if( $this->is_duplicate($t_link_url) ){
						
					//duplicated item let's delete
					unset($res[$i]);
						
					  echo '<br>eBay item ('. $t_data['item_title'] .') found cached but duplicated <a href="'.get_permalink($this->duplicate_id).'">#'.$this->duplicate_id.'</a>'  ;
						
					//delete the item
					$query = "delete from {$this->wp_prefix}automatic_general where item_id='{$t_row->item_id}' and item_type=  'eb_{$camp->camp_id}_$keyword'";
					$this->db->query ( $query );
						
				}else{
					break;
				}

			}

			// check again if valid links found for that keyword otherwise skip it
			if (count ( $res ) > 0) {
					
				// lets process that link
				$ret = $res [$i];
					
				$data = unserialize ( base64_decode($ret->item_data) );
					
				$item_id  =$data['item_id'];
					
				// get item big image and description
				// curl get
				$x = 'error';
				$url = $data ['item_link'];
					
				  echo '<br>Found Link:'.$url;
					
				$region = $camp_general['cg_eb_site'];

				if($region == 1){
					$ext = 'ebay.com';
				}elseif($region == 2){
					$ext = 'ebay.ie';
				}elseif($region == 3){
					$ext = 'ebay.at';
				}elseif($region == 4){
					$ext = 'ebay.com.au';
				}elseif($region == 5){
					$ext = 'befr.ebay.be';
				}elseif($region == 7){
					$ext = 'ebay.ca';
				}elseif($region == 10){
					$ext = 'ebay.fr';
				}elseif($region == 11){
					$ext = 'ebay.de';
				}elseif($region == 12){
					$ext = 'ebay.it';
				}elseif($region == 13){
					$ext = 'ebay.es';
				}elseif($region == 14){
					$ext = 'ebay.ch';
				}elseif($region == 15){
					$ext = 'ebay.co.uk';
				}elseif($region == 16){
					$ext = 'ebay.nl';
				}
					
				$the_link = "http://www.$ext/itm/www/$item_id";
					
				  echo '<br>Item link with desc '.$the_link;

				//curl get
				$x='error';
				$url=$the_link;
				curl_setopt($this->ch, CURLOPT_HTTPGET, 1);
				curl_setopt($this->ch, CURLOPT_URL, trim($the_link));
				curl_setopt($this->ch,CURLOPT_HTTPHEADER,array('Cookie: ebay=%5Ecv%3D15555%5Esbf%3D%23100000%5Ejs%3D1%5E' ));
				$exec=$this->curl_exec_follow($this->ch);
				$x=curl_error($this->ch);
					

				// extract img itemprop="image" src="
				if(stristr($exec, 'maxImageUrl":"')){
					preg_match_all('{maxImageUrl":"(.*?)"}', $exec,$matches);
				}else{
					//displayImgUrl":"
					preg_match_all('{displayImgUrl":"(.*?)"}', $exec,$matches);
				}
					
				$all_imgs = array_unique($matches[1]);
				
				$json_txt= implode('","', $all_imgs);
				$json_txt = '["'.$json_txt.'"]';
					
				$imgs_arr = json_decode($json_txt);
					
				$img = $imgs_arr[0];
				
					
				if (trim ( $img ) != '') {
					$data ['item_img'] = $img;
				}
					
				// extract description
				$data['item_desc']=$data['item_title'];
				$data['item_images'] = '<img src="'.$data['item_img'] .'" />';
					
				// update the link status to 1
				$query = "update {$this->wp_prefix}automatic_general set item_status='1' where item_id='$ret->item_id' and item_type=  'eb_{$camp->camp_id}_$keyword'";
					
				$this->db->query ( $query );
					
				// if cache not active let's delete the cached items and reset indexes
				if (! in_array ( 'OPT_EB_CACHE', $camp_opt )) {
					  echo '<br>Cache disabled claring cache ...';
					$query = "delete from {$this->wp_prefix}automatic_general where item_type='eb_{$camp->camp_id}_$keyword' and item_status ='0'";
					$this->db->query ( $query );
				}
					
					
				//if full description and all images needed extract them
				if(in_array('OPT_EB_FULL_DESC', $camp_opt) || in_array('OPT_EB_FULL_IMG', $camp_opt) || in_array('OPT_EB_FULL_DESC_SPEC', $camp_opt) ){

					  echo '<br>Extracting full description and images from original product page...';

					//building url

					//extract ebay site ext
					$item_link=$data['item_link'] ;
 
					if(trim($exec) != ''){
						  	
						//specification box
						if(in_array('OPT_EB_FULL_DESC_SPEC', $camp_opt)){

							if( ! function_exists('sxmldom_str_get_html')){
								require_once 'inc/sxmldom_simple_html_dom.php';
								$original_html = sxmldom_str_get_html($exec);
							}
							
							$ret2 = $original_html->find('*[class=itemAttr]');
							 
								
							$extract2='';
								
							foreach ($ret2 as $itm ) {
								$extract2 = $extract2 . $itm->outertext ;
							}
								
							if(trim($extract2) == ''){
								  echo '<br>Nothing found to extract for itemAttr';
							}else{
								  echo '<br>Rule itemAttr extracted ' . strlen($extract2) .' charchters ';

								$extract2 = preg_replace('{<span id="hiddenContent.*?span>}', '</td>', $extract2);
								$extract2 = preg_replace('{<span id="readFull.*?span>}', '</td>', $extract2);

									
								$extract2 = str_replace('50.0%', '30.0%', $extract2);

								$data['item_desc'] = $extract2.$data['item_desc'];
									
							}
								
							//prodDetailDesc
							$ret3 = $original_html->find('*[class=prodDetailDesc]');
								
							$extract3='';
								
							foreach ($ret3 as $itm ) {
								$extract3 = $extract3 . $itm->outertext ;
							}
								
							if(trim($extract3) == ''){
								  echo '<br>Nothing found to extract for item prodDetailDesc';
							}else{
								  echo '<br>Rule prodDetailDesc extracted ' . strlen($extract3) .' charchters ';
									
								$extract3 = preg_replace('{<span id="hiddenContent.*?span>}', '</td>', $extract3);
								$extract3 = preg_replace('{<span id="readFull.*?span>}', '</td>', $extract3);
									
									
								$data['item_desc'] = $data['item_desc']. $extract3;
									
							}
								
								
								
						}
							
							
						if(in_array('OPT_EB_FULL_DESC', $camp_opt)){

							//getting iframe <iframe id="desc_ifr
							if(method_exists($original_html, 'find')){
									
								$ret = $original_html->find('*[id=desc_ifr]');

								$extract='';

								foreach ($ret as $itm ) {
									$extract = $extract . $itm->outertext ;
								}

								if(trim($extract) == ''){
									  echo '<br>Nothing found to extract for desc_ifr';
								}else{
									  echo '<br>Rule desc_ifr extracted ' . strlen($extract) .' charchters ';


									if ( trim( $camp_general['cg_eb_iframe_h'] ) == '' ){
										$camp_general['cg_eb_iframe_h'] =  500;
									}

									$extract = str_replace('height="10000"', 'height="'.$camp_general['cg_eb_iframe_h'].'"', $extract);
										
									$data['item_desc'] =$data['item_desc'].  $extract;
										

								}
									
									

							}else{
								  echo '<br>Simple html dom can not load the html';
							}
								
						}// OPT_EB_FULL_DESC
							
						//extracting images
						if( in_array('OPT_EB_FULL_IMG', $camp_opt) )  {

								

							if( count($imgs_arr) > 0 ){


								//form html
								$data['item_images'] = $imgs_arr;

									
									
							}else{
								  echo '<br>did not find additional images from original source';
							}

						}//OPT_EB_FULL_IMG
							
					}else{
						  echo '<br>Can not load original product page';
					}
 
				}
					
 				
				$data['item_end_date'] = get_date_from_gmt($data['item_end_date']);
				$data['item_publish_date'] = get_date_from_gmt($data['item_publish_date']);
					
				// Prices .0 fix to .00
				$data['item_price'] = number_format($data['item_price'],2);
				
				//remove , from price
				$data['item_price_numeric'] = str_replace(',','', $data['item_price'] );
				
				@$data['item_bin'] = number_format($data['item_bin'],2);
					
				return $data;
			} else {
					
				  echo '<br>No links found for this criteria';
			}
		} // if trim
	} // foreach keyword
}

}