<?php

// Main Class
require_once 'core.php';

Class WpAutomaticCraigslist extends wp_automatic{


/*
 * ---* youtube get links ---
 */
function craigslist_fetch_items($keyword, $camp) {

	  echo "<br>So I should now get some items from craigslist" ;
 
	// ini options
	$camp_opt = unserialize ( $camp->camp_options );
	if( stristr($camp->camp_general, 'a:') ) $camp->camp_general=base64_encode($camp->camp_general);
	$camp_general = unserialize ( base64_decode( $camp->camp_general ) );
	$camp_general=array_map('wp_automatic_stripslashes', $camp_general);
	
	// items url
	$cg_cl_page = trim( $camp_general['cg_cl_page'] );
	
	// verify valid link
	if(  !( stristr($cg_cl_page, 'http') && stristr($cg_cl_page, 'craigslist.org') ) ){
		  echo '<br>Provided craigslist link is not valid please visit craigslist.org and get a correct one';
		return false;
	}
	
  
	// get start-index for this keyword
	$query = "select keyword_start ,keyword_id from {$this->wp_prefix}automatic_keywords where keyword_name='$keyword' and keyword_camp={$camp->camp_id}";
	$rows = $this->db->get_results ( $query );
	@$row = $rows [0];
	
	//If no rows add a keyword record
	if(count($rows) == 0){
		$query="insert into {$this->wp_prefix}automatic_keywords(keyword_name,keyword_camp,keyword_start) values ('$keyword','{$camp->camp_id}',1)";
		$this->db->query($query);
		$kid = $this->db->insert_id;
		$start = 0;
		
	}else{
		$kid = $row->keyword_id;
		$start = $row->keyword_start;
	}
	
	
	
	 

	if ($start == - 1) {
		  echo '<- exhausted link';
			
		if( ! in_array( 'OPT_CL_CACHE' , $camp_opt )){
			 $start =0;
			  echo '<br>Cache disabled resetting index to 0';
		}else{

			//check if it is reactivated or still deactivated
			if($this->is_deactivated($camp->camp_id, $keyword)){
				$start =0;
			}else{
				//still deactivated
				return false;
			}

		}
			
			
	}
	
	//start 
	if($start == 1) $start = 0; 
	
	if( $start == 0   ){
		
	}elseif(stristr($cg_cl_page, '?')){
		$cg_cl_page.='&s='.$start;
	}else{
		$cg_cl_page.='?s='.$start;
	}
	
	  echo '<br>Craigslist items url:'.$cg_cl_page;

	  echo ' index:' . $start;

	// update start index to start+1
	$nextstart = $start + 120;

	$query = "update {$this->wp_prefix}automatic_keywords set keyword_start = $nextstart where keyword_id=$kid ";
	$this->db->query ( $query );

	// get items
	// curl get
	$x = 'error';
	$url = $cg_cl_page;
	curl_setopt ( $this->ch, CURLOPT_HTTPGET, 1 );
	curl_setopt ( $this->ch, CURLOPT_URL, trim ( $url ) );
	$exec = curl_exec ( $this->ch );
	$x = curl_error ( $this->ch );
	
	
	// error check
	if(trim($x) != ''){
		  echo '<br>Curl error:'.$x;
		return false;
	} 
	 
	
	// validate reply
	if( ! stristr($exec, '<meta name="description"')){
		  echo '<br>Not expected response from Craigslist';
		  
		  if(stristr($exec,'IP has been automatically blocked')){
		  		echo '<br>Your server IP is blocked from Craigslist, you will need to use proxies on the plugin settings page';
		  }
		  
	} 
	
	 
	// load items from feed txt
	// Matching items <a href="https://denver.craigslist.org/clt/d/littleton-rattan-handmade-tray/7354151791.html" data-id="7354151791" class="result-title hdrl
	  
	preg_match_all('!<li class="result-row"(.*?)</li>!s', $exec , $itmsMatchs );
	
	$allItms = $itmsMatchs[0]; 
  	
	// Check returned items count
 	if ( count($allItms) > 0 ) {

		  echo '<br>Valid reply returned with ' . count($allItms) . ' item';

	} else {
		
		echo '<br>No items found';
		 
		echo '<br>Keyword have no more items deactivating...';
		$query = "update {$this->wp_prefix}automatic_keywords set keyword_start = -1 where keyword_id=$kid ";
		$this->db->query ( $query );
				
		if(! in_array('OPT_NO_DEACTIVATE', $camp_opt))
		$this->deactivate_key($camp->camp_id, $keyword);
				
	}
	 
 
	echo '<ol>';
	
	$i=0;
	foreach ( $allItms as $itemTxt ) {
 		
		//get link,title
		preg_match('{<a href="(https[^"]*?)" data-id="(\d*?)" class="result-title.*?>(.*?)</a>}', $itemTxt , $s_itmsMatchs );
		 
		$item['item_title'] = $s_itmsMatchs[3];
		$item['item_description'] = $s_itmsMatchs[3];
		$item_link = $item['item_link'] = $s_itmsMatchs[1];
		 
		
		// match date
		preg_match('{datetime\="(.*?)"}s', $itemTxt , $lnkMatchs );
		$item['item_date'] = $lnkMatchs[1];
		
		// match img class="result-image gallery" data-ids="3:00S0S_ab4BTXotjaDz_0ak07K,3:00t0t_3slUtPhwD4Pz_0ak07K,3:00B0B_cTk1cEIBxSLz_0ai07I,3:00i0i_5seooMVgQhlz_0ak07K,3:00a0a_4QmgpcccJZiz_0ak07K"
		preg_match('{result-image gallery" data-ids\="(.*?)"}s', $itemTxt , $ImgMatchs );
		$ImgMatchs_arr = @explode(',' , $ImgMatchs[1]);
		$ImgMatchs_arr = preg_replace('!^\d\:!', '' , $ImgMatchs_arr);
		 
		$item['item_img'] ='';
		$item['item_imgs'] ='';
		$imgs_arr = array();
		if(isset($ImgMatchs_arr[0])  && trim($ImgMatchs_arr[0]) !=''  ){
			$item['item_img'] = $this->craigslist_get_img_url($ImgMatchs_arr[0] );
		
			
			foreach($ImgMatchs_arr as $ImgMatchs_arr_s){
				$imgs_arr[] = $this->craigslist_get_img_url($ImgMatchs_arr_s );
			}
			
			$item['item_imgs'] =implode(',' , $imgs_arr ); 
		}
		
	 	// get id
		$ex = preg_match('{(\d*?)\.html}', $item['item_link'] , $allMatchs );
		$id = $allMatchs[1];
		
		//get price <span class="result-price">$20</span>
		preg_match( '!class="result-price">(.*?)<!' , $itemTxt , $priceMatchs  );
		$item['item_price'] =  $priceMatchs[1];
		 
		//<span class="result-hood"> (Broomfield  )</span>
		preg_match( '!class="result-hood">(.*?)<!' , $itemTxt , $hoodMatchs  );
		$item['item_hood'] =  trim($hoodMatchs[1]) != '(  )' ?  $hoodMatchs[1] : '';
		 
		$data = ( base64_encode( serialize ( $item ) ) );
		
		echo '<li> Link:'.$item_link;
		
		// No image skip
		if( trim($item['item_img']) == '' && in_array('OPT_CL_IMG', $camp_opt) ){
			  echo '<- No image skip';
			continue;
		}
		
		if( $this->is_execluded($camp->camp_id, $item_link) ){
			  echo '<-- Execluded';
			continue;
		}

		if ( ! $this->is_duplicate($item_link) )  {
			$query = "INSERT INTO {$this->wp_prefix}automatic_general ( item_id , item_status , item_data ,item_type) values (  '$id', '0', '$data' ,'cl_{$camp->camp_id}_$keyword')  ";
			$this->db->query ( $query );
		} else {
			  echo ' <- duplicated <a href="'.get_edit_post_link($this->duplicate_id).'">#'.$this->duplicate_id.'</a>';
		}
			
		$i++;
	}

	  echo '</ol>';

}
	
 	
/*
 * ---* craigslist post ---
 */
function craigslist_get_post($camp) {

	 
	// Campaign options
	$camp_opt = unserialize (  $camp->camp_options );
	
	if( stristr($camp->camp_general, 'a:') ) $camp->camp_general=base64_encode($camp->camp_general);
	$camp_general = unserialize ( base64_decode( $camp->camp_general ) );
	$camp_general=array_map('wp_automatic_stripslashes', $camp_general);
	
	
	$keywords = array('*');
 	
	foreach ( $keywords as $keyword ) {
			
		$keyword = trim($keyword);

		//update last keyword
		update_post_meta($camp->camp_id, 'last_keyword', trim($keyword));
			
		if (trim ( $keyword ) != '') {

			// getting links from the db for that keyword
			$query = "select * from {$this->wp_prefix}automatic_general where item_type=  'cl_{$camp->camp_id}_$keyword' ";
			$this->used_keyword=$keyword;
			$res = $this->db->get_results ( $query );

			// when no links lets get new links
			if (count ( $res ) == 0) {
				
				//clean any old cache for this keyword
				$query_delete = "delete from {$this->wp_prefix}automatic_general where item_type='cl_{$camp->camp_id}_$keyword' ";
				$this->db->query ( $query_delete );

				// get new fresh items
				$this->craigslist_fetch_items ( $keyword, $camp );
				
				// getting links from the db for that keyword
				$res = $this->db->get_results ( $query );
			}

			
			//check if already duplicated
			//deleting duplicated items
			$res_count = count($res);
			for($i=0;$i< $res_count ;$i++){

				$t_row = $res[$i];
					
				$t_data =  unserialize ( base64_decode( $t_row->item_data ) );
				 
				$t_link_url= $t_data['item_link'] ;

				if( $this->is_duplicate($t_link_url) ){
						
					//duplicated item let's delete
					unset($res[$i]);
						
					  echo '<br>craigslist item ('. $t_data ['item_title'] .') found cached but duplicated <a href="'.get_permalink($this->duplicate_id).'">#'.$this->duplicate_id.'</a>'  ;
						
					//delete the item
					$query = "delete from {$this->wp_prefix}automatic_general where id={$t_row->id} ";
					$this->db->query ( $query );
						
				}else{
					break;
				}

			}

			// check again if valid links found for that keyword otherwise skip it
			if (count ( $res ) > 0) {
					
				// lets process that link
				$ret = $res [$i];
					
				$data = unserialize ( base64_decode( $ret->item_data )  );
				
				$temp = $data;
				 	
				  echo '<br>Found Link:'.$temp['item_link'];
				
				// clean show content 
				if(stristr($temp['item_description'], 'showcontact')){
					  echo '<br>Removing contact link';
					$temp['item_description'] = preg_replace('{<a.*?/a>}s', '', $temp['item_description']);
				}
				
				// getting full description
				 
				// getting full image
				if(trim($temp['item_img']) != '' ){
					
					$fullImg = str_replace('300x300', '600x450', $temp['item_img'] );
					  echo '<br>Full Image:'.$fullImg;
				
					$temp['item_img'] = $fullImg; 
				
				}
				
				// Img shortcode
				$temp['item_img_html'] = '';
				if(trim($temp['item_img']) !=''){
					$temp['item_img_html'] = '<img src="'.$temp['item_img'].'" />';
				}
				
				// update the link status to 1
				$query = "delete from {$this->wp_prefix}automatic_general where id={$ret->id}";
				$this->db->query ( $query );
					
				// if cache not active let's delete the cached videos and reset indexes
				if (! in_array ( 'OPT_CL_CACHE', $camp_opt )) {
					 
					echo '<br>Cache disabled claring cache ...';
					$query = "delete from {$this->wp_prefix}automatic_general where item_type='cl_{$camp->camp_id}_$keyword' ";
					$this->db->query ( $query );

					// reset index
					$query = "update {$this->wp_prefix}automatic_keywords set keyword_start =1 where keyword_camp={$camp->camp_id}";
					$this->db->query ( $query );
				}
				
				//remove after price
				$item_title = $temp['item_title'] ;
				
				//full item details 
				
				//curl get
				$x='error';
				$url= $temp['item_link'];
				
				echo '<br>Loading original post to get full content...';
 
				//curl get
				$x='error';
				curl_setopt($this->ch, CURLOPT_HTTPGET, 1);
				curl_setopt($this->ch, CURLOPT_URL, trim($url));
				$exec=curl_exec($this->ch);
				$x=curl_error($this->ch);
				
				//verify full content 
				$temp['item_address'] = '';
				$temp['item_location_latitude'] = '';
				$temp['item_location_longitude'] = '';
				$temp['item_location'] = '';
				$temp['item_attributes'] = '';
				
				if(stristr($exec, 'postingbody')){
					echo '<-- postingbody found, content seems to be correct';
					
					echo '<br>Finding full content..';
					
					//fullContent <section id="postingbody">
					preg_match('!<section id="postingbody">(.*?)</section!s' , $exec , $bodyMatchs );
					$bodyMatchs = $bodyMatchs[1];
					$bodyMatchs = preg_replace('!<div class="print-qrcode.*?div>!s', '', $bodyMatchs);
					$bodyMatchs = preg_replace('!<div class="print-information.*?div>!s', '', $bodyMatchs);
					
					if(trim($bodyMatchs) != ''){
						echo '<-- Found with length of:' . strlen($bodyMatchs);
						$temp['item_description'] = trim($bodyMatchs) ;
						
						//remove show contact info
						$temp['item_description'] = str_replace('show contact info' , '' , $temp['item_description'] );
						
					}else{
						echo '<-- not able to find the description';
					}
					
					//adress <div class="mapaddress">11111 W. 6th Ave Unit E</div>
					preg_match( '!class="mapaddress">(.*?)</div>!' , $exec , $AddrMatchs);
					if(isset($AddrMatchs[1])) 	$temp['item_address'] = $AddrMatchs[1];
					 
					//get lat and lang  data-latitude="39.725770" data-longitude="-105.121685" data-accuracy="10"
					preg_match( '!data-latitude="(.*?)" data-longitude="(.*?)"!' , $exec , $latMatchs);
					$temp['item_location_latitude'] = $latMatchs[1];
					$temp['item_location_longitude'] = $latMatchs[2];
					$temp['item_location'] =  $latMatchs[1] . ',' . $latMatchs[2];
					
					//attributes <p class="attrgroup">\s*<span
					preg_match_all( '!<p class="attrgroup">\s*(<span.*?)</p>!s' , $exec , $attrMatchs);
					$attrMatchs = $attrMatchs[1];
					
					// remove other listings by this author
					$u=0;
					foreach($attrMatchs as $attrMatch){
						if(stristr($attrMatch, 'class=')) unset($attrMatchs[$u]);
						$u++;
					}
					
					$temp['item_attributes'] = implode('', $attrMatchs);
					
					 
				
				}
				
				//gallery html 
				$cg_cl_full_img_t = @$camp_general['cg_cl_full_img_t'];
				if (trim ( $cg_cl_full_img_t ) == '') {
					$cg_cl_full_img_t = '<img src="[img_src]" class="wp_automatic_gallery" />';
				}
				
				$product_imgs_html = '';
				
				$allImages = explode ( ',', $temp ['item_imgs'] );
				$temp ['item_images']  = $allImages;
				
				$allImages_html = '';
				
				foreach ( $allImages as $singleImage ) {
					
					$singleImageHtml = $cg_cl_full_img_t;
					$singleImageHtml = str_replace ( '[img_src]', $singleImage, $singleImageHtml );
					$allImages_html .= $singleImageHtml;
				}
				
				$temp ['item_imgs_html'] = $allImages_html;
				
				//map
				$temp ['item_map'] =  '<iframe src = "https://maps.google.com/maps?q=' . $temp['item_location_latitude'] . ',' . $temp['item_location_longitude'] . '&hl=es;z=14&amp;output=embed"></iframe>' ;
				
				//numeric price
				$price_raw = $temp['item_price'] ;
				
				$price_raw=str_replace(',' , '' , $price_raw);
				
				//numeric price
				preg_match ( '{\d[.*\d]*}is', $price_raw , $price_matches );
				$temp['item_price_numeric'] = $price_matches[0];
 				
 				return $temp;
			} else {
					
				  echo '<br>No links found for this keyword';
			}
		} // if trim
	} // foreach keyword
}

function craigslist_get_img_url ($img_id){
	return 'https://images.craigslist.org/'.$img_id.'_600x450.jpg' ;
}

}