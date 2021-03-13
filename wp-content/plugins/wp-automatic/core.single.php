<?php

// Main Class
require_once 'core.php';

Class WpAutomaticSingle extends wp_automatic{


	function single_get_post($camp){
		
		// ini
		if( stristr($camp->camp_general, 'a:') ) $camp->camp_general=base64_encode($camp->camp_general);
		$camp_general=unserialize( base64_decode( $camp->camp_general));
		$camp_opt = unserialize ( $camp->camp_options );
		$temp = array();
		
		// source url 
		$cg_sn_source = trim($camp_general['cg_sn_source']);

		echo '<br>Source URL:'.$cg_sn_source;
		
		//validate URL
		if(! stristr($cg_sn_source, 'http')){
			echo '<br>Added URL is not a valid HTTP URL, Please add a correct URL and try again.';
			return false;
		}
		
		//get the whole html
		curl_setopt ( $this->ch, CURLOPT_HTTPGET, 1 );
		curl_setopt ( $this->ch, CURLOPT_URL, trim ( html_entity_decode( $cg_sn_source) ) );
		
		$cg_sn_cookie=$camp_general['cg_sn_cookie'];
		
		if(trim($cg_sn_cookie) != ''){
			$headers[] = "Cookie: $cg_sn_cookie ";
			curl_setopt($this->ch, CURLOPT_HTTPHEADER, $headers);
		}
		
		$original_cont = $this->curl_exec_follow( $this->ch );
	 
		$x = curl_error ( $this->ch );
		
		if(trim($original_cont) == ''){
			echo '<br>Failed to load the content from the source '.$x;
			return false;
		}
		
		//dom class
		require_once 'inc/class.dom.php';
		$wpAutomaticDom = new wpAutomaticDom($original_cont);
		
		//title extraction 
		$cg_sn_ttl_method = $camp_general['cg_sn_ttl_method'];
		
		if($cg_sn_ttl_method == 'auto'){
			$title = $wpAutomaticDom->getTheTitle();
		
		}elseif($cg_sn_ttl_method == 'css'){
			
			$cg_sn_css_type = $camp_general['cg_sn_css_type'] ;
			$cg_sn_css = $camp_general['cg_sn_css'] ;
			$cg_sn_css_wrap = $camp_general['cg_sn_css_wrap'];
			
			if($cg_sn_css_wrap[0] == 'inner') {
				$inner = true;
			}else{
				$inner = false;
			}
			
			echo '<br>Extracting content by ' . $cg_sn_css_type[0] . ' : '.$cg_sn_css[0];
			
			if($cg_sn_css_type[0] == 'class'){
				$title = $wpAutomaticDom->getContentByClass( $cg_sn_css[0] ,$inner);	
			}elseif($cg_sn_css_type[0] == 'id'){
				$title = $wpAutomaticDom->getContentByID( $cg_sn_css[0] ,$inner);
			}elseif( $cg_sn_css_type[0] == 'xpath'){
				$title = $wpAutomaticDom->getContentByXPath( stripslashes( $cg_sn_css[0]) ,$inner);
			}
			
		}elseif($cg_sn_ttl_method == 'visual'){
			
			$cg_sn_visual = $camp_general['cg_sn_visual'] ; 
			$title = $wpAutomaticDom->getContentByXPath( stripslashes($cg_sn_visual[0]));
			echo '<br>Extracting content by XPathzz c: '.stripslashes( $cg_sn_visual[0]);
		
		}elseif( $cg_sn_ttl_method == 'regex'){
		
			$cg_sn_regex = $camp_general['cg_sn_regex'];
			echo '<br>Extracting content by REGEX : '.htmlentities( stripslashes(  $cg_sn_regex[0] ) );
			$titleMatchs = $wpAutomaticDom->getContentByRegex(stripslashes( $cg_sn_regex[0]));
			if(isset($titleMatchs[0])  && $titleMatchs[0] != ''){
				$title = $titleMatchs[0];
			}else{
				$title = '';
			}
		}
		
		if(is_array($title)) $title = $title[0];
		
		print_r( '<br>Found Title:' .  trim( strip_tags( $title) ));
		$temp['original_title'] = $title;
		
		if(trim($title) == '') {
			
			echo '<br><span style="color:red">Error: No title found, post will not get added. Please revise the extraction rules</span>';
			
		}
		
		//get the content
		$cg_sn_cnt_method = $camp_general['cg_sn_cnt_method'];
		
		if($cg_sn_cnt_method == 'auto'){
			
			$finalContent = $content = $wpAutomaticDom->getFullContent();
		
		}elseif($cg_sn_cnt_method == 'css'){
			
			$cg_sn_cnt_css_type= $camp_general['cg_sn_cnt_css_type'] ;
			$cg_sn_cnt_css= $camp_general['cg_sn_cnt_css'] ;
			$cg_sn_cnt_css_wrap= $camp_general['cg_sn_cnt_css_wrap'];
			$cg_sn_cnt_css_size = $camp_general['cg_sn_cnt_css_size'];
			$finalContent = '';
			
			$i=0;
			foreach ($cg_sn_cnt_css_type as $singleType){
				
				if($cg_sn_cnt_css_wrap[$i] == 'inner') {
					$inner = true;
				}else{
					$inner = false;
				}
				
				echo '<br>Extracting content by ' . $cg_sn_cnt_css_type[$i] . ' : '.$cg_sn_cnt_css[$i];
				
				if($cg_sn_cnt_css_type[$i] == 'class'){
					$content= $wpAutomaticDom->getContentByClass( $cg_sn_cnt_css[$i] ,$inner);
				}elseif($cg_sn_cnt_css_type[$i] == 'id'){
					$content= $wpAutomaticDom->getContentByID( $cg_sn_cnt_css[$i] ,$inner);
				}elseif( $cg_sn_cnt_css_type[$i] == 'xpath'){
					$content= $wpAutomaticDom->getContentByXPath( stripslashes( $cg_sn_cnt_css[$i]) ,$inner);
				}
				
				if(is_array($content)){
					
					if($cg_sn_cnt_css_size[$i] == 'single'){
						$content = $content[0];
					}else{
						$content = implode("\n", $content);
					}
					
					$finalContent.=$content."\n";
					$rule_num = $i +1;
					$temp['rule_'.$rule_num] = $content;
					$temp['rule_'.$rule_num.'_plain'] = strip_tags( $content );
					
				}
				
				echo '<-- ' . strlen($content) . ' chars';
				
				$i++;
			}// foreach rule
			
			
		}elseif($cg_sn_cnt_method == 'visual'){
			
			$cg_sn_cnt_visual= $camp_general['cg_sn_cnt_visual'] ;
			$finalContent = '';
			$i = 0;
			foreach ($cg_sn_cnt_visual as $cg_sn_cnt_visual_s){
				
				echo '<br>Extracting content by XPath : '. stripslashes( $cg_sn_cnt_visual_s);
				$content = $wpAutomaticDom->getContentByXPath(stripslashes($cg_sn_cnt_visual_s) , false);
			 
				$content = (isset($content[0])) ?  $content[0] : '';
				
				echo '<-- ' . strlen($content) . ' chars';
				
				if(trim($content) != ''){
					$finalContent.= $content . "\n";
				}
				
				$rule_num = $i +1;
				$temp['rule_'.$rule_num] = $content;
				$temp['rule_'.$rule_num.'_plain'] = trim(strip_tags( $content ));
				
				$i++;
			}
			
		}elseif( $cg_sn_cnt_method == 'regex'){
			
			$cg_sn_cnt_regex= $camp_general['cg_sn_cnt_regex'];
			$finalContent = '';
			$i = 0;
			foreach ($cg_sn_cnt_regex as $cg_sn_cnt_regex_s){
				
				echo '<br>Extracting content by REGEX : '.htmlentities( stripslashes(  $cg_sn_cnt_regex_s) );
				
				$content = $wpAutomaticDom->getContentByRegex(stripslashes( $cg_sn_cnt_regex_s));
				$content = $content[0];
				
				echo '<-- ' . strlen($content) . ' chars';
				
				if(trim($content) != ''){
					$finalContent.= $content . "\n";
					
				}
				$rule_num = $i +1;
				$temp['rule_'.$rule_num] = $content;
				$temp['rule_'.$rule_num.'_plain'] = trim(strip_tags( $content ));
				
				$i++;
			}
		}
		
		//fix relative paths
		$finalContent = $this->fix_relative_paths($finalContent, $cg_sn_source);
		
		$temp['matched_content'] = $finalContent;
		$temp['matched_content_plain'] = trim(strip_tags($finalContent) );
		$temp['source_link'] = $cg_sn_source;
		
	 
		
		 return $temp;
		
	}
	
}	