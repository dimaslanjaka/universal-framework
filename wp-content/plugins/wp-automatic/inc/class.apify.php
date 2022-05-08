<?php
class ValvePress_APIFY {
	
	public $token;
	public $link;
	public $ch;
	private $json_raw;
 

	function __construct($token, $link,$ch){
		$this->json_raw =   file_get_contents( dirname(__FILE__) . '/apify-template.json' );
		$this->token = $token;
		$this->link = $link;
		$this->ch = $ch;
		
	}
	
	function apify(){
		
		//empty reply
		if(trim($this->token) == '' ){
			throw new Exception( '<span style="color:red">ERROR: You have enabled the option to use APIFY.COM, please visit the plugin settings page and add the required APIFY API token</span>'   );
		}
		
		
		$json_to_post =str_replace('https://www.example.com', $this->link, $this->json_raw);

		$curlurl="https://api.apify.com/v2/acts/apify~web-scraper/run-sync-get-dataset-items?token=" . $this->token;
		 
		curl_setopt($this->ch, CURLOPT_URL, $curlurl);
		curl_setopt($this->ch, CURLOPT_POST, true);
		curl_setopt($this->ch, CURLOPT_POSTFIELDS, $json_to_post );
		curl_setopt($this->ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json") );
		$x='error';
		$exec=curl_exec($this->ch);
		$x=curl_error($this->ch);
		
		//empty reply 
		if(trim($exec) == '' ){
			throw new Exception( 'Empty reply from APIFY ' . $x  );
		}
		
		
		$json = json_decode($exec);
		
		
		//error 
		if( isset($json->error)  ){
			throw new Exception( 'Error from APIFY ' . $json->error->message );
		}
		
		 
		//no content pageContent
		if( ! isset($json[0]->pageContent)  ){
			throw new Exception( 'No content returned from APIFY '  );
		}
	 	
		//hotfix for feed encoded html entities &lt;?xml 
		if(stristr( $json[0]->pageContent , '&lt;?xml ')){
			$json[0]->pageContent = html_entity_decode($json[0]->pageContent);
		}
		
		return $json[0]->pageContent;
		 
	}
 
}