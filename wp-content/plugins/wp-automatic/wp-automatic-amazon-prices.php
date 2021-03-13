<?php
/**
 * Finds a product deserver price update
 */
function wp_automatic_amazon_prices_update(){
	
	// get a product to update SELECT * FROM `wp_postmeta` WHERE `meta_key` LIKE '%product_price_updated%'
	global $wpdb;
	$prefix = $wpdb->prefix;
	
	$query="SELECT * FROM `{$prefix}postmeta` WHERE `meta_key` = 'product_price_updated' ORDER BY `meta_value` ASC limit 1 ";
	$rows=$wpdb->get_results($query);
	
	if(count($rows) > 0){
		
		$time = time('now');
		$yesterday = $time - 86400 ;
		 
		$row = $rows[0];
		
		if($row->meta_value < $yesterday){
			$pid = $row->post_id;
			
			  echo '<br>Updating an amazon product price at post:'.$pid;
			wp_automatic_amazon_price_update($pid);
			
		}
		
		 
	}
}

/**
 * Updates a specific post product price
 * @param integer $pid
 */
function wp_automatic_amazon_price_update($pid){
	
	//get old price,asin,and more
	global $wpdb;
	$prefix = $wpdb->prefix;
	
	$query="SELECT * FROM `{$prefix}postmeta` WHERE `post_id` = '$pid' ";
	$rows=$wpdb->get_results($query);
	
	$isWooProduct = false;
	
	foreach($rows as $row){
		
		if($row->meta_key == 'product_asin'){
			$product_asin = $row->meta_value;
		}elseif($row->meta_key == 'product_price'){
			$product_price = $row->meta_value;
		}elseif($row->meta_key == 'product_list_price'){
			$product_list_price = $row->meta_value;
		}elseif($row->meta_key == 'original_link'){
			
			//find region
			preg_match('{amazon.(.*?)/}', $row->meta_value,$matchs);
			$region = ($matchs[1]);
			
		}elseif($row->meta_key == '_price'){
			$isWooProduct = true;
		}
		
	}
	
	// getting details from amazon
	 echo ' ASIN:'.$product_asin;
	 
	 
	$amazonPublic = get_option ( 'wp_amazonpin_abk', '' );
	$amazonSecret = get_option ( 'wp_amazonpin_apvtk', '' );
	$amazonAid = get_option ( 'wp_amazonpin_aaid', '' );
	
	

	try {
		$obj = new wp_automatic_AmazonProductAPI ( trim($amazonPublic), trim($amazonSecret) , trim($amazonAid), $region );
		$result = $obj->getItemByAsin($product_asin);
	} catch (Exception $e) {
		  echo '<br>Exception:' . $e->getMessage();
		return;
	}
	
	
	
	if(isset($result->Items)){
	$Item = $result->Items->Item;
	 
	$price= '';
	
	//listed offer price
	$price = @$Item->Offers->Offer->OfferListing->Price->FormattedPrice;
	
	if(trim($price) == ''){
		@$price = $Item->OfferSummary->LowestNewPrice->FormattedPrice;
	}

	if(trim($price) == ''){
		@$price=$Item->ItemAttributes->ListPrice->FormattedPrice;
	}
	
	if(trim($price) == ''){
		@$price=$Item->Offers->Offer->OfferListing->Price->FormattedPrice;
	}
	
	if(trim($price) == ''){
		@$price = $Item->OfferSummary->LowestCollectiblePrice->FormattedPrice;
	}
	
	if(trim($price) == ''){
		@$price = $Item->OfferSummary->LowestUsedPrice->FormattedPrice;
	}
	
	if(trim($price) == ''){
		@$price = $Item->VariationSummary->LowestPrice->FormattedPrice;
			
	}
	
	//list price
	$ListPrice='';
	$ListPrice= @$Item->ItemAttributes->ListPrice->FormattedPrice;
	
	if(trim($ListPrice) == ''){
		$ListPrice = $price;
	}
	
	
	//update price 
	if(trim($price) != ''){
		if($price != $product_price || $ListPrice != $product_list_price){
			
			  echo '<-- Price changed. updating...';
			
			update_post_meta($pid,'product_price',(string) $price);
			update_post_meta($pid,'product_list_price',(string) $ListPrice);
			
			if($isWooProduct){
				
				$thousandSeparator = ',';
				
				//woo sousands separator
				if ( class_exists( 'WooCommerce' ) ) {
					$woocommerce_price_thousand_sep = get_option('woocommerce_price_thousand_sep','');
					
					if($woocommerce_price_thousand_sep == '.' || $woocommerce_price_thousand_sep == ','){
						$thousandSeparator = $woocommerce_price_thousand_sep;
						  echo '<br>Woo Thusand separator:'.$woocommerce_price_thousand_sep;
					}
					
				}
				
				
				//fixing listPrice
				$price_no_commas = str_replace($thousandSeparator, '', $ListPrice);
				preg_match('{\d.*\d}is', ($price_no_commas),$price_matches);
				update_post_meta($pid,'_regular_price', $price_matches[0]); ;
				
				//fixing sell price
				$price_no_commas = str_replace( $thousandSeparator , '', $price);
				preg_match('{\d.*\d}is', ($price_no_commas),$price_matches);
				update_post_meta($pid,'_price', $price_matches[0]); 
				update_post_meta($pid,'_sale_price', $price_matches[0]); ;
				
			}
			
		}else{
			
			  echo '<-- Price is up-to-date';
		}
	}
	
	}	
	
	update_post_meta($pid,'product_price_updated',time('now'));
	
}