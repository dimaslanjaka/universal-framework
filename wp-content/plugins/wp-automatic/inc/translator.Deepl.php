<?php
/**
 * Class:Translator to translate using Deepl
 * @author Atef (sweetheatmn@gmail.com)
 * @version 1.0.0
 */

class DeeplTranslator{
	
	public $ch; //curl handler to use
	public $key;
	public $free; 
	public $fomality;
	
	
	/**
	 * Constructor to recieve curl handler
	 * @param curl $ch
	 */
	function __construct(&$ch,$key){
		$this->ch = $ch;
		$this->key = $key;
		$this->free = false; // free endpoint
		$this->fomrality = 'default'; 
	}
	
	/**
	 * Translate text using  Deepl
	 * @param unknown $sourceText
	 * @param unknown $fromLanguage
	 * @param unknown $toLanguage
	 * @return string translated text
	 */
	
	function translateText($sourceText , $fromLanguage ,$toLanguage){
		
		//translating
		$x='error';
		
		
		if($this->free){
			$curlurl = 'https://api-free.deepl.com/v2/translate?auth_key='.$this->key.'&target_lang='.$toLanguage;
		}else{
			$curlurl = 'https://api.deepl.com/v2/translate?auth_key='.$this->key.'&target_lang='.$toLanguage;
		}
		
		//formality
		if( trim($this->fomality) != '' && $this->fomality != 'default'){
			$curlurl .= '&formality=' . $this->fomality;
		}
			
		
		if($fromLanguage != 'auto') $curlurl.= '&source_lang=' . $fromLanguage ;
		
	 	$curlpost= "text=" . urlencode($sourceText)  ;
	 	 
	 	curl_setopt($this->ch, CURLOPT_URL, $curlurl);
		curl_setopt($this->ch, CURLOPT_POST, true);
		curl_setopt($this->ch, CURLOPT_POSTFIELDS, $curlpost); 
		$x='error';
		$exec=curl_exec($this->ch);
		$x=curl_error($this->ch);
		$cuinfo = curl_getinfo($this->ch);
    		
		// Empty response check
		if(trim($exec) == ''){
			
			if($cuinfo['http_code'] == 403){
				throw new Exception('Deepl returned 403 error which could mean your key is incorrect or your subscription is not valid '.$x);
			}
			
			throw new Exception('Empty translator reply with possible curl error '.$x);
		}
		
		// Validate JSON {"
		if(   ! stristr($exec, '{"') ){
			throw new Exception('No JSON was returned, unexpected reply from Deepl' . $exec);
		}
		
		//json decode
		$json_reply = json_decode($exec);
		
	 
		//validate translation
		if( ! isset($json_reply->translations)){
			throw new Exception('No Translation was returned, unexpected reply from Deepl' . $exec);
		}
	 
		
		//translation valid, return
		return $json_reply->translations[0]->text;
		
	}
	
}