<?php
/**
 * Class MicrosoftTranslator to translate texts
 * @author sweetheatmn
 * @version 1.1.0
 * Changelog: 1.1.0: added method to translate via POST Request + Translate posts more than 10000 chars count
 */
class MicrosoftTranslator {
	
	public $ch;
	public $accessToken;
	//public $authUrl   = "https://datamarket.accesscontrol.windows.net/v2/OAuth2-13/";
	public $authUrl   = "https://api.cognitive.microsoft.com/sts/v1.0/issueToken";
	
	 
	/**
	 * 
	 * Constructor to reciveve curl handler
	 * 
	 * @param CURL $ch curl handler 
	 */
	function __construct(&$ch){
		
		// Set curl handler
		$this->ch = $ch;
		
		// Don't display headers for json decode
		curl_setopt($this->ch, CURLOPT_HEADER,0);
		
	}
	
	/**
	 * 
	 * Get an authorization Token to use for translation 
	 * 
	 * @param text $clientID
	 * @param text $clientSecret
	 * 
	 * @return string
	 * 
	 */
	function getToken($clientId){
 		
		$scopeUrl  = "http://api.microsofttranslator.com" ;
		
		// building post fields
		$data_string = json_encode('{body}');
		
		// post url
		$curlurl = $this->authUrl;
	 	
		// clean text/html header bug fix @3.22.0
		curl_setopt($this->ch, CURLOPT_HTTPHEADER , array());
		
		curl_setopt ( $this->ch, CURLOPT_URL, $curlurl );
		curl_setopt ( $this->ch, CURLOPT_POST, true );
		curl_setopt ( $this->ch, CURLOPT_POSTFIELDS, $data_string);
	
		
		curl_setopt($this->ch, CURLOPT_HTTPHEADER, array(
							'Content-Type: application/json',
							'Content-Length: ' . strlen($data_string),
							'Ocp-Apim-Subscription-Key: ' . $clientId
					)
		);
		
		$exec = curl_exec ( $this->ch );
		
		 
		$x = curl_error ( $this->ch );
		
		// Empty reply check
		if(trim($exec) == ''){
			throw new Exception('Empty translator token request reply with possible curl error '.$x);
		}
		 
	 
		// error check 
		 if(stristr($exec, 'statusCode')){
		 	throw new Exception('No valid token found '.$exec);
		 }
		
		$this->accessToken = $exec;
		
		return $exec;
		
	}
	
	/**
	 * 
	 * Translate text using Microsoft translator with POST Method
	 * 
	 * @param string $sourceText Source Text
	 * @param string $fromLanguage From Language
	 * @param string $toLanguage To Lanuguage
	 * 
	 * @return text
	 * 
	 */
	function translateTextArr($sourceText,$fromLanguage,$toLanguage){
		
		$inputStrArr=array($sourceText);

		// Post translate request
		$curlUrl = "http://api.microsofttranslator.com/V2/Http.svc/TranslateArray";
		$requestXml = '<TranslateArrayRequest><AppId/>'
						 .'<From>'.$fromLanguage.'</From>'
						 .'<Options>'
							 .'<Category xmlns="http://schemas.datacontract.org/2004/07/Microsoft.MT.Web.Service.V2" />'
							 .'<ContentType xmlns="http://schemas.datacontract.org/2004/07/Microsoft.MT.Web.Service.V2">text/plain</ContentType>'
							 .'<ReservedFlags xmlns="http://schemas.datacontract.org/2004/07/Microsoft.MT.Web.Service.V2" />'
							 .'<State xmlns="http://schemas.datacontract.org/2004/07/Microsoft.MT.Web.Service.V2" />'
							 .'<Uri xmlns="http://schemas.datacontract.org/2004/07/Microsoft.MT.Web.Service.V2" />'
							 .'<User xmlns="http://schemas.datacontract.org/2004/07/Microsoft.MT.Web.Service.V2" />'
						 .'</Options>'
						 .'<Texts>'
						 	.'<string xmlns="http://schemas.microsoft.com/2003/10/Serialization/Arrays">'.htmlspecialchars($sourceText).'</string>'
						 .'</Texts>'
						 .'<To>'.$toLanguage.'</To>'
					 .'</TranslateArrayRequest>' ;
		
		

		curl_setopt ( $this->ch, CURLOPT_URL, $curlUrl );
		curl_setopt ( $this->ch, CURLOPT_POST, true );
		curl_setopt ( $this->ch, CURLOPT_POSTFIELDS, $requestXml );
		curl_setopt($this->ch, CURLOPT_HTTPHEADER , array('Authorization: Bearer '.$this->accessToken , "Content-Type: text/xml" ));
		$exec = curl_exec ( $this->ch );
		$x = curl_error ( $this->ch );
		
		 
		// Empty reply check
		if(trim($exec) == ''){
			throw new Exception('Empty translator token request reply with possible curl error '.$x);
		}
		
		// Exception check
		if( stristr($exec, 'Argument Exception')){
			
			// Read exception
			preg_match('{Message\:(.*?)<}s', $exec , $matchs);
			 
			$txtException = $matchs[1];
			throw new Exception('Text Translate Argument Exception found '.$txtException);
			
		}
		
		//TranslateApiException
		if( stristr($exec, 'TranslateApiException')){
				
			// Read exception
			preg_match('{Message\:(.*?)<}s', $exec , $matchs);
		
			$txtException = $matchs[1];
			throw new Exception('Text Translate Method Exception found '.$txtException);
				
		}

		if(! stristr($exec, 'ArrayOfTranslateArrayResponse')){
			
			  echo $exec;
			
			throw new Exception('Text Translate Method Not valid reply :' . substr($exec, 0,15));
		}
		
		// Load strings
		$xmlObject = simplexml_load_string($exec);
		

		$finalTranslation = '';
		
		foreach( $xmlObject as $translatedText ){
			$finalTranslation.= $translatedText->TranslatedText;
		}
		 
		return $finalTranslation;
		
	}
	
		/**
	 * 
	 * Translate text using Microsoft translator with GET Method
	 * 
	 * @param string $sourceText Source Text
	 * @param string $fromLanguage From Language
	 * @param string $toLanguage To Lanuguage
	 * 
	 * @return text
	 * 
	 */
	function translateText($sourceText,$fromLanguage,$toLanguage){
		
		// Post translate request
		$curlUrl = "http://api.microsofttranslator.com/v2/Http.svc/Translate?text=".urlencode($sourceText)."&from=$fromLanguage&to=$toLanguage";
		
		//curl get
		$x='error';
		$url=$curlUrl;
		curl_setopt($this->ch, CURLOPT_HTTPGET, 1);
		curl_setopt($this->ch, CURLOPT_URL, trim($url));
		curl_setopt($this->ch, CURLOPT_HTTPHEADER , array('Authorization: Bearer '.$this->accessToken));
		$exec=curl_exec($this->ch);
		$x = curl_error($this->ch);
		
		// Empty reply check
		if(trim($exec) == ''){
			throw new Exception('Empty translator token request reply with possible curl error '.$x);
		}
		
		// Exception check
		if( stristr($exec, 'Argument Exception')){
			
			// Read exception
			preg_match('{Message\:(.*?)<}s', $exec , $matchs);
			 
			$txtException = $matchs[1];
			throw new Exception('Text Translate Argument Exception found '.$txtException);
			
		}
		
		//TranslateApiException
		if( stristr($exec, 'TranslateApiException')){
				
			// Read exception
			preg_match('{Message\:(.*?)<}s', $exec , $matchs);
		
			$txtException = $matchs[1];
			throw new Exception('Text Translate Method Exception found '.$txtException);
				
		}
		
		// Load strings
		$xmlObject = simplexml_load_string($exec);
		
		$finalTranslation = '';
		
		foreach((array)$xmlObject as $translatedText){
			$finalTranslation.= $translatedText;
		}
		
		return $finalTranslation;
		
	}

	/**
	 * Translate Wrap translates 10000 chars by 10000 chars to skip translator limit
	 * @param unknown $sourceText
	 * @param unknown $fromLanguage
	 * @param unknown $toLanguage
	 */
	function translateWrap($sourceText,$fromLanguage,$toLanguage){
		
		$translated = '';
		 
		//if just one patch
		$charCount = $this->chars_count($sourceText);
		if($charCount < 10240){
			return $this->translateTextArr($sourceText, $fromLanguage, $toLanguage);
		}else{
			
			//multiple patches

			$patchsCount = floor($charCount  / 10240 ) + 1  ;
			
			
			for($i=0; $i < $patchsCount ; $i++){
			
				$patchStartIndex = $i * 10240 ;
				
				if(function_exists('mb_substr')){
					$currentPath = mb_substr($sourceText, $patchStartIndex , 10240);
				}else{
					$currentPath = mb_substr($sourceText, $patchStartIndex , 10240);
				}
				
				
				$translated.=$this->translateTextArr($currentPath, $fromLanguage, $toLanguage);
				
			
			}
			
			//file_put_contents( WP_PLUGIN_DIR. '/wp-automatic/test.txt', $translated);
			//exit;
			
			return $translated;
				
			
		}
		 
		
	}
	
	/**
	 * Count chars on text using mb_ module and if not exists it count it using strlen
	 * @param unknown $text
	 */
	function chars_count(&$text){
		
		if(function_exists('mb_strlen')){
			return mb_strlen($text); 
		}else{
			return strlen($text);
		}
		
	} 
	
	/**
	 * Gets a text substr using mb_string module if exists and if not use substr function
	 * @param unknown $text
	 * @param unknown $start
	 * @param unknown $end
	 */
	function text_substr(&$text,$start,$length){
	 
		if(function_exists('mb_substr')){
			return mb_substr($text, $start,$length);	
		}else{
			return substr($text, $start,$length);
		}
		
	}
 
}