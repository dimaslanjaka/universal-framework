<?php


class GoogleTranslateProxy{
	
	public $ch;
	
	/**
	 * 
	 * @param curl handler $ch
	 */
	function __construct(&$ch){
		$this->ch = $ch;
	}	
	
	
	function fetch($url){
		
		$url = "https://translate.google.com/translate?hl=en&ie=UTF8&prev=_t&sl=ar&tl=en&u=".urlencode($url);
		
		 
		
  		// Translate a url
		curl_setopt($this->ch, CURLOPT_HTTPGET, 1);
		curl_setopt($this->ch, CURLOPT_URL, trim($url));
		
		$exec=curl_exec($this->ch);
		$x=curl_error($this->ch);
		 
		
		// validate final content 
		if(trim($exec) == ''){
			throw new Exception('_c url returned empty response');
		}
		
		
		
		// clean content 
		$exec = preg_replace('{<span class="google-src-text.*?>.*?</span>}', "", $exec);
		$exec = preg_replace('{<span class="notranslate.*?>(.*?)</span>}', "$1", $exec);
		$exec = str_replace(' style=";text-align:left;direction:ltr"', '', $exec);
		
		 	
		
		// Return result
		return $exec;
		
	}
	
	
}