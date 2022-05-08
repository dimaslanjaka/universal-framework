<?php

// Main Class
require_once 'core.php';

Class WpAutomaticeBay extends wp_automatic{


/*
 * ebay fetch items
 * doc: https://developer.ebay.com/api-docs/buy/browse/resources/item_summary/methods/search
 */
function ebay_fetch_items($keyword, $camp) {

	$filter_number = 0; //ini
	//ref:https://docs.google.com/spreadsheet/ccc?key=0Auf5oUAL4RXDdHhiSFpUYjloaUFOM0NEQnF2d1FodGc&hl=en_US
	//https://developer.ebay.com/api-docs/buy/browse/resources/item_summary/methods/search
	
	  echo "<br>so I should now get some items from ebay for keyword :" . $keyword;

	$campaignid = get_option ( 'wp_automatic_ebay_camp', '' );
	$ebay_access_token = $this->ebay_get_access_token();
	
	if($ebay_access_token == false){
		echo '<br>Access token is required to use the API, existing....';
		exit;
	}
	  
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
	
	if ($start == 1)
		$start = 0;
		
		
		if ($start == - 1 ) {
			  echo '<- exhausted keyword';
			
			//check if it is reactivated or still deactivated
			if($this->is_deactivated($camp->camp_id, $keyword)){
				$start =0;
			}else{
				//still deactivated
				return false;
			}
			
			
		}
		
		  echo ' index:' . $start;
		
		// update start index to start+1
		if( ! in_array( 'OPT_EB_CACHE' , $camp_opt )){
			  echo '<br>Caching is not enabled setting eBay page to query to 0';
			$nextstart =0;
		}else{
			$nextstart = $start + 10;
		}
		
		 
		
		$query = "update {$this->wp_prefix}automatic_keywords set keyword_start = $nextstart where keyword_id=$kid ";
		$this->db->query ( $query );
		
	
	// prepare the link
	$elink = 'http://rest.ebay.com/epn/v1/find/item.rss?';
	$elink = 'https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD=TRUE';
	$elink = 'https://api.ebay.com/buy/browse/v1/item_summary/search?limit=10';
	
	//filters ini
	$filters_arr = array();
	$headers_arr = array(); //used for authorization and more
	$headers_arr[] = 'Authorization:Bearer '.$ebay_access_token;
 
	// ebay site &GLOBAL-ID=EBAY-US  X-EBAY-C-MARKETPLACE-ID
	$cg_eb_site = wp_automatic_fix_category($camp_general['cg_eb_site']);
	$headers_arr[] = 'X-EBAY-C-MARKETPLACE-ID: '. $cg_eb_site;
	 
	
	// campaign id
	if (trim ( $campaignid ) == '') {
		echo '<br><span style="color:orange">Please visit the plugin settings page and add the eBay campaign ID to get commisions</span>';
		$campaignid = 5338743934;
	} 
	
	//affiliate tag 
	$affiliate_tag = 'X-EBAY-C-ENDUSERCTX: affiliateCampaignId='.trim($campaignid);
	
	//wp_automatic_ebay_refid ,affiliateReferenceId=referenceId
	$wp_automatic_ebay_refid = trim(get_option('wp_automatic_ebay_refid' , ''));
	if($wp_automatic_ebay_refid != '') $affiliate_tag.= ',affiliateReferenceId=' . $wp_automatic_ebay_refid  ;
	
	$headers_arr[] = $affiliate_tag;
	
	//startpage offset
	if($start != 0 )
	$elink.= '&offset=' . $start;
	
	//Category
	if(in_array('OPT_EBAY_CUSTOM', $camp_opt) && trim($camp_general['cg_ebay_custom']) != '' ){
		
		$cg_ebay_custom = $camp_general['cg_ebay_custom'];
		
		$elink .= '&category_ids=' . trim(	$cg_ebay_custom);
			
	}else{
			
		// ebay category cg_eb_cat
		$cg_eb_cat = $camp_general ['cg_eb_cat'];
			
		if (trim ( $cg_eb_cat != '0' )) {
			$elink .= '&category_ids=' . trim(	$cg_eb_cat);
		}
	}


	// if user
	if (in_array ( 'OPT_EB_USER', $camp_opt )) {
		$cg_eb_user = trim($camp_general ['cg_eb_user']);
		$filters_arr[] = 'sellers:{'. $cg_eb_user .'}';

		$filter_number++;
		
		if (in_array ( 'OPT_EB_FULL', $camp_opt )) {
			  echo '<br>No filtering add all ..';
			
			  $elink .= '&q=';
		
			  //add categories if nothing is set
			  if(! stristr($elink, 'category_ids') ){
			  	echo '<br><span style="color:red">You have set the campaign to import from a specific seller so you must set a specific keyword or specific category for import as well, please set it and try again...</span>';
			  }
			  
		
		} else {
			// keyword
			$elink .= '&q=' . urlencode($keyword);
		}
	} else {
		// keyword
		$elink .= '&q=' . urlencode($keyword);
	}

	// listing type ListingType
	//$elink .= '&listingType1=' . $camp_general ['cg_eb_listing'];
	if( $camp_general ['cg_eb_listing'] != 'All' ){
		
		if($camp_general ['cg_eb_listing'] == 'FixedPrice'){
			//buyingOptions:{FIXED_PRICE|BEST_OFFER}
			$filters_arr[] = 'buyingOptions:{FIXED_PRICE}'	 ;
		}elseif( $camp_general ['cg_eb_listing'] == 'Auction'  ){
			$filters_arr[] = 'buyingOptions:{AUCTION}'	 ;
		}elseif( $camp_general ['cg_eb_listing'] == 'BEST_OFFER'  ){
			$filters_arr[] = 'buyingOptions:{BEST_OFFER}'	 ;
		}
		
	}
	
	
	// price range filter=price:[10..50]
	if (in_array ( 'OPT_EB_PRICE', $camp_opt ) && trim($camp_general['cg_eb_currency']) != '' ) {
		$cg_eb_min = trim( $camp_general ['cg_eb_min']);
		$cg_eb_max = trim($camp_general ['cg_eb_max']);
		$cg_eb_currency = trim($camp_general ['cg_eb_currency']);
		
		//price part 
		$cg_eb_price = '' ;
		
		//min
		if( trim($cg_eb_min) != '' ) $cg_eb_price = $cg_eb_min;
		
		//max
		if( trim($cg_eb_max) != '' ) $cg_eb_price .= '..' . $cg_eb_max;
		
		//price:[10..50]
		$filters_arr[] = 'price:[' . $cg_eb_price . '],priceCurrency:' . $cg_eb_currency ;
		
	
	}
	
	//currency
	if(in_array('OPT_EB_CURRENCY' ,  $camp_opt )){
		$cg_eb_currency_2 = trim($camp_general ['cg_eb_currency_2']);
		$filters_arr[] = 'priceCurrency:' . $cg_eb_currency_2 ;
	}
	
	//country
	if(in_array('OPT_EB_COUNTRY' ,  $camp_opt )){
		$cg_eb_country = trim($camp_general ['cg_eb_country']);
		$filters_arr[] = 'deliveryCountry:' . $cg_eb_country ;
		
		//cg_eb_postal
		$cg_eb_postal =trim($camp_general ['cg_eb_postal']);
		
		if($cg_eb_postal != '' ) $filters_arr[] = 'deliveryPostalCode:' . $cg_eb_postal ;
	
	}
	
	// price range filter=price:[10..50]
	if (in_array ( 'OPT_EB_BID_COUNT', $camp_opt )   ) {
		
		$cg_eb_min_bid = trim( $camp_general ['cg_eb_min_bid']);
		$cg_eb_max_bid = trim($camp_general ['cg_eb_max_bid']);
		
		//range part
		$cg_eb_bid_range = '' ;
		
		//min
		if( trim($cg_eb_min_bid) != '' ) $cg_eb_bid_range = $cg_eb_min_bid;
		
		//max
		if( trim($cg_eb_max_bid) != '' ) $cg_eb_bid_range .= '..' . $cg_eb_max_bid;
		
		//price:[10..50]
		$filters_arr[] = 'bidCount:[' . $cg_eb_bid_range . ']';
		
		
	}

	//OPT_EB_CHARITY
	if (in_array ( 'OPT_EB_CHARITY', $camp_opt )) {
		$filters_arr[] = 'charityOnly:true'	 ;
	}
	
	//OPT_EB_PRIORITY
	if (in_array ( 'OPT_EB_PRIORITY', $camp_opt )) {
		$filters_arr[] = 'priorityListing:true'	 ;
	}
	
	//OPT_EB_CHARITY
	if (in_array ( 'OPT_EB_CHARITY', $camp_opt )) {
		$filters_arr[] = 'charityOnly:true'	 ;
	}
	
	//OPT_EB_RETURN
	if (in_array ( 'OPT_EB_RETURN', $camp_opt )) {
		$filters_arr[] = 'returnsAccepted:true'	 ;
	}
	
	// TopRatedSellerOnly
	if (in_array ( 'OPT_EB_TOP', $camp_opt )) {
		$elink .= "&itemFilter($filter_number).name=TopRatedSellerOnly&itemFilter($filter_number).value(0)=true";
		$filter_number++;
	}

	// FreeShippingOnly
	if (in_array ( 'OPT_EB_SHIP', $camp_opt )) {
		$filters_arr[] = 'maxDeliveryCost:0'	 ;
	}

	// OPT_EB_DESCRIPTION
	if (in_array ( 'OPT_EB_DESCRIPTION', $camp_opt )) {
		$filters_arr[] = 'searchInDescription:true'	 ;
	}

	// append params
	if(in_array('OPT_EB_PARAM', $camp_opt)){
		$elink.= trim($camp_general['cg_eb_param']);
	}
	
	//affiliate affiliate.trackingId	
	$elink.= "&affiliate.networkId=9&affiliate.trackingId=".$campaignid;
	
	//cg_eb_condition condition
	if( $camp_general ['cg_eb_condition'] == 'NEW'  || $camp_general ['cg_eb_condition'] == 'USED'){
		//conditions:{NEW|USED}
		$filters_arr[] = 'conditions:{' . $camp_general ['cg_eb_condition'] . '}'	 ;
	}
	
	//cg_eb_seller_type seller type
	if( $camp_general ['cg_eb_seller_type'] == 'INDIVIDUAL'  || $camp_general ['cg_eb_seller_type'] == 'BUSINESS'){
		// sellerAccountTypes:{INDIVIDUAL}
		$filters_arr[] = 'sellerAccountTypes:{' . $camp_general ['cg_eb_seller_type'] . '}'	 ;
	}
	
	// listing order 
	if( $camp_general ['cg_eb_order'] != 'BestMatch' ){
		$elink .= '&sort=' . $this->ebay_fix_order ($camp_general ['cg_eb_order']);
	} 
	
	//apply filters 
	if(count($filters_arr) > 0){
		$elink.= '&filter=' . implode(',', $filters_arr);
	}
	
	$elink = str_replace('?&' , '?' , $elink );
	
	
	echo '<br>Link:' . $elink;
	
	
		
	// curl get
	$x = 'error';
	$url = $elink;
	curl_setopt ( $this->ch, CURLOPT_HTTPGET, 1 );
	curl_setopt ( $this->ch, CURLOPT_URL, trim ( $url ) );
	curl_setopt($this->ch,CURLOPT_HTTPHEADER, $headers_arr );
	$exec = curl_exec ( $this->ch );
	$x = curl_error ( $this->ch );
 	 
	 $json_reply = json_decode($exec);
	  
	   //error report  
	 if( isset ( $json_reply->errors ) ){
	 	echo '<br>eBay returned an error: <span style="color:red">'.  $json_reply->errors[0]->message  . '</span>';
	 	return false;
	 }
	 
	 $search_results = array();
	 
	 if(isset($json_reply->itemSummaries ))
	 $search_results = $json_reply->itemSummaries;
 	
 	 
	 echo '<br>Got ' . count($search_results) . ' items from eBay';
	 
	 
	  
	 if ( count ( $search_results )== 0  ) {
	  
		  echo '<br>End of eBay search results, resetting page number';
		
		//set start to -1 exhausted
		$query = "update {$this->wp_prefix}automatic_keywords set keyword_start = -1 where keyword_id=$kid";
		$this->db->query ( $query );
		
		//deactivate for 60 minutes
		if(! in_array('OPT_NO_DEACTIVATE', $camp_opt))
			$this->deactivate_key($camp->camp_id, $keyword);
		
	}

	$i = 0;
	  echo '<ol>';
	  
	  
	  
	  foreach ( $search_results as $item_new ) {
		
 	  	 
	  	 $id = $item_new->itemId;
	  	 
	  	 if(stristr($id, '|')){
	  	 	$id_parts = explode('|' , $id);
	  	 	$id = $id_parts[1];
	  	 }
	  	  
	  	 
	  	 $item_link = $item_web_link = $item_new->itemWebUrl;
	  	 
	  	 $item_link_parts = explode('?' , $item_link );
	  	 $item_link = $item_link_parts[0];
	  	 
		 // eBay sg,hk link fix 
		 if( $cg_eb_site == 'EBAY-SG'){
		 
		 	$item_link = 'https://www.ebay.com.sg/itm/' . $id;
		 
		 }elseif($cg_eb_site == 'EBAY-HK'){
		 	
		 	$item_link = 'https://www.ebay.com.hk/itm/' . $id;
		 }
		 
		 //convert to new link
		 if(stristr($item_link, 'rover')){
		 	$item_link = $this->ebay_convert_rover_link($item_link, $cg_eb_site);
		 }
		 
		 echo '<li>Link:' . $item_link;
		 
		 
		$itm ['item_id'] = $id;
		$itm ['item_title'] = $item_new->title;
		
		$itm ['item_subtitle'] = isset($item_new->subtitle)? $item_new->subtitle : '';
		$itm ['item_category'] = $item_new->categories[0]->categoryId;
		$itm ['item_payment'] = isset($item_new->paymentMethod[0]) ? $item_new->paymentMethod[0] : '' ;
		$itm ['item_postal'] = isset($item_new->itemLocation->postalCode)? $item_new->itemLocation->postalCode : '' ;
		$itm ['item_location'] = $item_new->itemLocation->country;
		$itm ['item_img'] = $item_new->thumbnailImages[0]->imageUrl;
		$itm ['item_link'] = $item_link ;
		$itm['item_affiliate_link'] = $item_new->itemAffiliateWebUrl;
		$itm ['item_bids'] =  isset($item_new->sellingStatus[0]->bidCount[0]) ? $item_new->sellingStatus[0]->bidCount[0] : '' ;
		
		if( isset(   $item_new->price  ) ){
			$itm ['item_price'] = $item_new->price->value ;
			$itm ['item_price_currency'] = $item_new->price->currency ;
		}else{
			$itm ['item_price'] = $item_new->currentBidPrice->value ;
			$itm ['item_price_currency'] = $item_new->currentBidPrice->currency ;
		}
		
		$itm ['item_bin'] =    isset($item_new->listingInfo[0]->buyItNowPrice[0]->__value__) ? $item_new->listingInfo[0]->buyItNowPrice[0]->__value__ : '';
		
		$itm ['item_end_date'] = '';
		if(isset( $item_new->itemEndDate )){
			$itm ['item_end_date'] = str_replace ( 'T', ' ', str_replace ( 'Z', ' ', $item_new->itemEndDate ) );
			$itm ['item_end_date'] = trim(str_replace ( '.000', '', $itm ['item_end_date'] ));
		}
		
		$itm['item_seller_username'] = $item_new->seller->username;
		$itm['item_seller_feedback'] = $item_new->seller->feedbackPercentage;
		$itm['item_seller_score'] = $item_new->seller->feedbackScore;
		$itm['item_condition'] = $item_new->condition;
		 
 		
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
		
	$cg_eb_site = wp_automatic_fix_category($camp_general['cg_eb_site']);

	// loop keywords
	foreach ( $keywords as $keyword ) {
			
		$keyword = trim($keyword);
			
		if (trim ( $keyword ) != '') {
				
			//update last keyword
			update_post_meta($camp->camp_id, 'last_keyword', trim($keyword));

			$this->used_keyword = $keyword;

			// getting links from the db for that keyword
			$query = "select * from {$this->wp_prefix}automatic_general where item_type=  'eb_{$camp->camp_id}_$keyword' ";
			$res = $this->db->get_results ( $query );

			// when no links lets get new links
			if (count ( $res ) == 0) {
				
				//clean any old cache for this keyword
				$query_delete = "delete from {$this->wp_prefix}automatic_general where item_type='eb_{$camp->camp_id}_$keyword' ";
				$this->db->query ( $query_delete );
				
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

			
				
				//rover $t_data ['item_link']
				if(stristr($t_data ['item_link'], 'rover')){
					$t_data ['item_link'] = $this->ebay_convert_rover_link($t_data ['item_link'], $cg_eb_site);
					 
				}
			
			 		
				$t_link_url=$t_data ['item_link'];

				if( $this->is_duplicate($t_link_url) ){
						
					//duplicated item let's delete
					unset($res[$i]);
						
					  echo '<br>eBay item ('. $t_data['item_title'] .') found cached but duplicated <a href="'.get_permalink($this->duplicate_id).'">#'.$this->duplicate_id.'</a>'  ;
						
					//delete the item
					$query = "delete from {$this->wp_prefix}automatic_general where  id= {$t_row->id} ";
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
				
				//rover $t_data ['item_link']
				if(stristr($data ['item_link'], 'rover')){
					$data ['item_link'] = $this->ebay_convert_rover_link($data ['item_link'], $cg_eb_site);
				}
				
				$item_id  =$data['item_id'];
					
				// get item big image and description
				// curl get
				$x = 'error';
				$url = $data ['item_link'];
					
				  echo '<br>Found Link:'.$url;
					
				$region = $cg_eb_site;

				$ext = $this->ebay_site_to_domain($cg_eb_site);
				 
					
				$the_link = $url ;
					
				 echo '<br>Item link with desc '.$the_link;

				//curl get
				$x='error';
				$url=$the_link;
				curl_setopt($this->ch, CURLOPT_HTTPGET, 1);
				curl_setopt($this->ch, CURLOPT_URL, trim($the_link));
				curl_setopt($this->ch,CURLOPT_HTTPHEADER,array('Cookie: ebay=%5Ecv%3D15555%5Esbf%3D%23100000%5Ejs%3D1%5E' ));
				$exec=$this->curl_exec_follow($this->ch);
				$x=curl_error($this->ch);
				
				//dom
				require_once 'inc/class.dom.php';
				if(trim($exec) == ''){
					echo '<br>Empty reply when loading the source page....' . $x;
					$wpAutomaticDom = new wpAutomaticDom('<html></html>');
				}else{
					
					$wpAutomaticDom = new wpAutomaticDom($exec);
				}
				
			 
				
					
				  
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
				$query = "delete from {$this->wp_prefix}automatic_general where id={$ret->id}";
				$this->db->query ( $query );
					
				$this->db->query ( $query );
					
				// if cache not active let's delete the cached items and reset indexes
				if (! in_array ( 'OPT_EB_CACHE', $camp_opt )) {
					 echo '<br>Cache disabled claring cache ...';
					$query = "delete from {$this->wp_prefix}automatic_general where item_type='eb_{$camp->camp_id}_$keyword' ";
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

						
							
							$ret2 = $wpAutomaticDom->getContentByClass('x-about-this-item' , false);
							
							 
							$extract2='';
								
							foreach ($ret2 as $itm ) {
								$extract2 = $extract2 . $itm ;
							}
								
							if(trim($extract2) == ''){
								  echo '<br>Nothing found to extract for x-about-this-item';
							}else{
								  echo '<br>Rule x-about-this-item extracted ' . strlen($extract2) .' charchters ';

								$extract2 = preg_replace('{<span id="hiddenContent.*?span>}', '</td>', $extract2);
								$extract2 = preg_replace('{<span id="readFull.*?span>}', '</td>', $extract2);
								//button
								$extract2 = preg_replace('{<button.*?button>}', '</td>', $extract2);
								

									
								$extract2 = str_replace('50.0%', '30.0%', $extract2);

								$data['item_desc'] = $extract2.$data['item_desc'];
									
								
							}
							
							 
							
							//prodDetailDesc changed to x-product-details
							$ret3 = $wpAutomaticDom->getContentByClass('x-product-details', false);	
							
							$extract3='';
								
							foreach ($ret3 as $itm ) {
								$extract3 = $extract3 . $itm ;
							}
								
							if(trim($extract3) == ''){
								  echo '<br>Nothing found to extract for item x-product-details';
							}else{
								  echo '<br>Rule x-product-details extracted ' . strlen($extract3) .' charchters ';
									
								$extract3 = preg_replace('{<span id="hiddenContent.*?span>}', '</td>', $extract3);
								$extract3 = preg_replace('{<span id="readFull.*?span>}', '</td>', $extract3);
									
									
								$data['item_desc'] = $data['item_desc']. $extract3;
									
							}
								
								
								
						}
						
						
							
							
						if(in_array('OPT_EB_FULL_DESC', $camp_opt)){

							//getting iframe <iframe id="desc_ifr
							if(1){
									
								$ret = $wpAutomaticDom->getContentByID('desc_ifr' , false);

								
								$extract='';

								foreach ($ret as $itm ) {
									$extract = $extract . $itm ;
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
						
						//remove see all conditions link <span id="seeAll , hiddenContent
						$data['item_desc'] = preg_replace( '{<span id=".*?span>}s' , ''  , $data['item_desc'] );
						$data['item_desc'] = preg_replace( '{<!--.*?-->}s' , ''  , $data['item_desc'] );
						
					}else{
						  echo '<br>Can not load original product page';
					}
 
				}
					
				if(trim($data['item_end_date']) != '')
				$data['item_end_date'] = get_date_from_gmt($data['item_end_date']);
				 
					
				// Prices .0 fix to .00
				$data['item_price'] = number_format($data['item_price'],2);
				
				//remove , from price
				$data['item_price_numeric'] = str_replace(',','', $data['item_price'] );
				
				if( trim($data['item_bin']) != '' &&  is_float($data['item_bin']))
				$data['item_bin'] = number_format($data['item_bin'],2);
			 
				//seller
				$seller_arr = $wpAutomaticDom->getContentByClass('mbg-nw' );
				
				$data['item_seller_username'] = '' ;
				$data['item_seller_url'] = '' ; 
				
				if(isset( $seller_arr[0] ) && trim( $seller_arr[0]) != ''){
					$data['item_seller_username'] =  $seller_arr[0];
					$data['item_seller_url'] = "http://www.$ext/usr/$seller_arr[0]";
				}
				
				//item location
				$data['item_location'] = '';
				
				$location_arr = $wpAutomaticDom->getContentByXPath( "//*[@itemprop='availableAtOrFrom']" );
				
				if(isset( $location_arr[0] ) && trim( $location_arr[0]) != ''){
					$data['item_location'] = $location_arr[0];
				}
				

				//areaServed ships to sh-gspShipsTo
				$data['item_ships_to'] = '';
				
				$ships_to_arr = $wpAutomaticDom->getContentByXPath( "//*[@itemprop='areaServed']" );
				
				if(isset( $ships_to_arr[0] ) && trim( $ships_to_arr[0]) != ''){
					$data['item_ships_to'] = trim(preg_replace( '{<span.*}s' , '' ,  $ships_to_arr[0] ) );
				}
				
				if(trim($data['item_ships_to']) == ''){
					
					//sh-gspShipsTo
					$ships_to_arr = $wpAutomaticDom->getContentByXPath( "//*[@class='sh-gspShipsTo']" );
					
					if(isset( $ships_to_arr[0] ) && trim( $ships_to_arr[0]) != ''){
						$data['item_ships_to'] = trim(preg_replace( '{<.*}s' , '' ,  $ships_to_arr[0] ) );
					}
				}
				
				$data['item_ships_to'] = trim(str_replace('|' , ' ' , $data['item_ships_to'] ) ) ;
				
				//item condition itemCondition
				$data['item_condition'] = '';
				
				$arr = array();
				$arr = $wpAutomaticDom->getContentByXPath( "//*[@itemprop='itemCondition']" );
				
				if(isset( $arr[0] ) && trim( $arr[0]) != ''){
					$data['item_condition'] = $arr[0];
				}
				
				//return policy vi-ret-accrd-txt
				$data['item_return_policy'] = '';
				
				$arr = array();
				$arr = $wpAutomaticDom->getContentByID( "vi-ret-accrd-txt" );
				
				if(isset( $arr[0] ) && trim( $arr[0]) != ''){
					$data['item_return_policy'] = $arr[0];
				}
				
				//delivery after payment sh-DlvryDtl class
				$data['item_shipping_start'] = '';
				
				$arr = array();
				$arr = $wpAutomaticDom->getContentByClass( "sh-DlvryDtl" );
				
				if(isset( $arr[0] ) && trim( $arr[0]) != ''){
					$data['item_shipping_start'] = $arr[0];
				}
				
				//auction or bin id="bidBtn_btn" 
				if(stristr($exec, 'id="bidBtn_btn"' )){
					$data['item_listing_type'] = 'auction';
				}else{
					$data['item_listing_type'] = 'buy it now	';
				}
				
 				
				return $data;
				
			
				
			} else {
					
				  echo '<br>No links found for this criteria';
			}
		} // if trim
	} // foreach keyword
}



/**
 * Convert rover links to new links format
 * @param unknown $rover
 * @param unknown $ebay_site
 */
function ebay_convert_rover_link($rover , $cg_eb_site){
	
	//Converting:https://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=2&toolid=10044&campid=5338743934&customid=&lgeo=1&vectorid=229466&item=264920110296
	//Found Link:https://www.ebay.com/itm/264920110296?mkrid=711-53200-19255-0&siteid=0&mkcid=1&campid=5338743934&toolid=10044&customid=&mkevt=1
	
	$parse_url = parse_url ( $rover );
	$path_parts = explode ( '/', $parse_url ['path'] );
	$mkrid = $path_parts [3];
	$domain = $this->ebay_site_to_domain ( $cg_eb_site );
	$siteid = $this->ebay_region_to_siteid ( $cg_eb_site );
	
	parse_str ( $parse_url ['query'], $params );
	
	$correct_url = "https://www.{$domain}/itm/{$params['item']}?mkrid={$mkrid}&siteid={$siteid}&mkcid=1&campid={$params['campid']}&toolid=10044&customid=&mkevt=1";
	
	
	return $correct_url;
	
	
}

function ebay_site_to_domain($cg_eb_site) {
	switch ($cg_eb_site) {
		
		case 'EBAY-US' :
			return 'ebay.com';
			break;
		case 'EBAY-ENCA' :
			return 'ebay.ca';
			break;
		case 'EBAY-GB' :
			return 'ebay.co.uk';
			break;
		case 'EBAY-AU' :
			return 'ebay.com.au';
			break;
		case 'EBAY-AT' :
			return 'ebay.at';
			break;
		case 'EBAY-FRBE' :
			return 'befr.ebay.be';
			break;
		case 'EBAY-FR' :
			return 'ebay.fr';
			break;
		case 'EBAY-DE' :
			return 'ebay.de';
			break;
		case 'EBAY-MOTOR' :
			return 'ebay.com';
			break;
		case 'EBAY-IT' :
			return 'ebay.it';
			break;
		case 'EBAY-NLBE' :
			return 'befr.ebay.be';
			break;
		case 'EBAY-NL' :
			return 'ebay.nl';
			break;
		case 'EBAY-ES' :
			return 'ebay.es';
			break;
		case 'EBAY-CH' :
			return 'ebay.ch';
			break;
		case 'EBAY-HK' :
			return 'ebay.com.hk';
			break;
		case 'EBAY-IN' :
			return 'ebay.com';
			break;
		case 'EBAY-IE' :
			return 'ebay.ie';
			break;
		case 'EBAY-MY' :
			return 'ebay.com.my';
			break;
		case 'EBAY-FRCA' :
			return 'cafr.ebay.ca';
			break;
		case 'EBAY-PH' :
			return 'ebay.ph';
			break;
		case 'EBAY-PL' :
			return 'ebay.pl';
			break;
		case 'EBAY-SG' :
			return 'ebay.com.sg';
			break;
			
	}
}

function ebay_region_to_siteid($cg_eb_site) {
	switch ($cg_eb_site) {
		
		case 'EBAY-US' :
			return '0';
			break;
		case 'EBAY-ENCA' :
			return '2';
			break;
		case 'EBAY-GB' :
			return '3';
			break;
		case 'EBAY-AU' :
			return '15';
			break;
		case 'EBAY-AT' :
			return '16';
			break;
		case 'EBAY-FRBE' :
			return '23';
			break;
		case 'EBAY-FR' :
			return '71';
			break;
		case 'EBAY-DE' :
			return '77';
			break;
		case 'EBAY-MOTOR' :
			return '0';
			break;
		case 'EBAY-IT' :
			return '101';
			break;
		case 'EBAY-NLBE' :
			return '23';
			break;
		case 'EBAY-NL' :
			return '146';
			break;
		case 'EBAY-ES' :
			return '186';
			break;
		case 'EBAY-CH' :
			return '193';
			break;
		case 'EBAY-HK' :
			return '201';
			break;
		case 'EBAY-IN' :
			return '0';
			break;
		case 'EBAY-IE' :
			return '205';
			break;
		case 'EBAY-MY' :
			return '207';
			break;
		case 'EBAY-FRCA' :
			return '210';
			break;
		case 'EBAY-PH' :
			return '211';
			break;
		case 'EBAY-PL' :
			return '212';
			break;
		case 'EBAY-SG' :
			return '216';
			break;
	}
}

function ebay_get_access_token(){
	
	//check old valid token
	$wp_automatic_ebay_access_token_valid_till = get_option('wp_automatic_ebay_access_token_valid_till' ,'');
	if($wp_automatic_ebay_access_token_valid_till != '' && $wp_automatic_ebay_access_token_valid_till > time()){
		echo '<br>Current token is still valid, using it....';
		return get_option('wp_automatic_ebay_access_token','');
	}
	
	$wp_automatic_ebay_app = trim(get_option('wp_automatic_ebay_app' , ''));
	$wp_automatic_ebay_app_secret = trim(get_option('wp_automatic_ebay_app_secret', ''));
	
	//empty app id or secret hint
	if($wp_automatic_ebay_app == '' ||  $wp_automatic_ebay_app_secret == ''){
		echo '<span style="color:red"><br>ERROR! eBay APP ID and Secret key required, please visit the plugin settings page and add them!</span>';
		return false;
	}
	
	//generate token
	echo '<br>Getting a new access token from eBay....';	
	$hash = base64_encode( $wp_automatic_ebay_app . ':' . $wp_automatic_ebay_app_secret  );
	
	//curl post
	$curlurl="https://api.ebay.com/identity/v1/oauth2/token";
	$curlpost="grant_type=client_credentials&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope"; // q=urlencode(data)
	curl_setopt($this->ch, CURLOPT_URL, $curlurl);
	curl_setopt($this->ch, CURLOPT_POST, true);
	curl_setopt($this->ch, CURLOPT_POSTFIELDS, $curlpost);
	curl_setopt($this->ch,CURLOPT_HTTPHEADER,array('Authorization: Basic '.$hash));
	
	
	
	$x='error';
	$exec=curl_exec($this->ch);
	$x=curl_error($this->ch);
	
 
	//verify returned access token 
	if(trim($exec) == '' ){
		echo '<br>Empty reply from eBay API with a possible cURL error '.$x;
		return false;
	}
	
	if(! stristr($exec, 'access_token')){
		echo '<br>Can not find access token within the returned reply '. $exec;
		return false;
	}
	 
	$token_json = json_decode($exec);
	$access_token = ($token_json->access_token);
	
	if(trim($access_token) == ''){
		echo '<br>Can not extract access token from JSON';
		return false;
	}
	
	echo '<br>new access token generated successfully';
	
	update_option('wp_automatic_ebay_access_token' , $access_token );
	update_option('wp_automatic_ebay_access_token_valid_till' , time() + 7100 ); 
	
	return $access_token;
	
}

function ebay_fix_order($old_order){
	
	$new_order= $old_order; //ini
	
	if($old_order == 'EndTimeSoonest'){
		 $new_order = 'endingSoonest';
	}elseif($old_order == 'StartTimeNewest'){
		$new_order = 'newlyListed';
	}elseif( $old_order == 'PricePlusShippingLowest' ){
		$new_order = 'price';
	}elseif( $old_order == 'PricePlusShippingHighest' ){
		$new_order = '-price';
	}
	
	return $new_order;
	
}

}