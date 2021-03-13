<?php

    /**
     * Class to access Amazons Product Advertising API
     * @author Sameer Borate
     * @link http://www.codediesel.com
     * @version 1.0
     * All requests are not implemented here. You can easily
     * implement the others from the ones given below.
     */
    
    
    /*
    Permission is hereby granted, free of charge, to any person obtaining a
    copy of this software and associated documentation files (the "Software"),
    to deal in the Software without restriction, including without limitation
    the rights to use, copy, modify, merge, publish, distribute, sublicense,
    and/or sell copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
    THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
    DEALINGS IN THE SOFTWARE.
    */
    
    require_once 'aws_signed_request.php';

    class   wp_automatic_AmazonProductAPI
    {
        /**
         * Your Amazon Access Key Id
         * @access private
         * @var string
         */
        private $public_key     = "";
        
        /**
         * Your Amazon Secret Access Key
         * @access private
         * @var string
         */
        private $private_key    = "";
        
        /**
         * Your Amazon Associate Tag
         * Now required, effective from 25th Oct. 2011
         * @access private
         * @var string
         */
        private $associate_tag  = "YOUR AMAZON ASSOCIATE TAG";
        
        private $region = "";
    
        /**
         * Constants for product types
         * @access public
         * @var string
         */
        
        /*
            Only three categories are listed here. 
            More categories can be found here:
            http://docs.amazonwebservices.com/AWSECommerceService/latest/DG/APPNDX_SearchIndexValues.html
        */
        const MUSIC = "Music";
        const DVD   = "DVD";
        const GAMES = "VideoGames";


         function __construct($public,$private,$ass,$region){
             $this->public_key= $public;
             $this->private_key= $private;
             $this->associate_tag=$ass;
             $this->region = $region;
         }
                 
        
        /**
         * Check if the xml received from Amazon is valid
         * 
         * @param mixed $response xml response to check
         * @return bool false if the xml is invalid
         * @return mixed the xml response if it is valid
         * @return exception if we could not connect to Amazon
         */


        private function verifyXmlResponse($response)

        {
 
                @$err=$response->Error->Message;

                if(trim($err) != ''){
                    
                    throw new Exception('<br>'.$err);
					return false;
                }


            if ($response === False)
            {
                throw new Exception("Could not connect to Amazon");
            }
            else
            {
                if (isset($response->Items->Item->ItemAttributes->Title))
                {
                    return ($response);
                }
                else
                	
                {
                	//print_r($response);
                	$err=@$response->Items->Request->Errors->Error->Message;
                	if(trim($err) != '' ){
                		
                		  echo '<br><b>Amazon Error</b>:'.$err;
                		
                	}

                	/*echo("<br>Invalid xml response.");
                    print_r($response); */
                }
            }
        }
        
        
        /**
         * Query Amazon with the issued parameters
         * 
         * @param array $parameters parameters to query around
         * @return simpleXmlObject xml query response
         */
        private function queryAmazon($parameters)
        {
            return wp_automatic_aws_signed_request($this->region, $parameters, $this->public_key, $this->private_key, $this->associate_tag);
        }
        
        
        /**
         * Return details of products searched by various types
         * 
         * @param string $search search term
         * @param string $category search category         
         * @param string $searchType type of search
         * @return mixed simpleXML object
         */
        public function searchProducts($search,$ItemPage, $category, $searchType = "UPC")
        {
            $allowedTypes = array("UPC", "TITLE", "ARTIST", "KEYWORD");
            $allowedCategories = array("Music", "DVD", "VideoGames");
            
            switch($searchType) 
            {
                case "UPC" :    $parameters = array("Operation"     => "ItemLookup",
                                                    "ItemId"        => $search,
                                                    "SearchIndex"   => $category,
                                                    "IdType"        => "UPC",
                                                    "ItemPage"    => $ItemPage,
                                                    "ResponseGroup" => "Medium");
                                break;
                
                case "TITLE" :  $parameters = array("Operation"     => "ItemSearch",
                                                    "Title"         => $search,
                                                    "ItemPage"    =>  $ItemPage,
                                                    "SearchIndex"   => $category,
                                                    "ResponseGroup" => "Medium");
                                break;
            
            }
            
            $xml_response = $this->queryAmazon($parameters);
            
            
            
            return $this->verifyXmlResponse($xml_response);

        }
        
        
        /**
         * Return details of a product searched by UPC
         * 
         * @param int $upc_code UPC code of the product to search
         * @param string $product_type type of the product
         * @return mixed simpleXML object
         */
        public function getItemByUpc($upc_code, $product_type)
        {
            $parameters = array("Operation"     => "ItemLookup",
                                "ItemId"        => $upc_code,
                                "SearchIndex"   => $product_type,
                                "IdType"        => "UPC",
                                "ResponseGroup" => "Medium");
                                
            $xml_response = $this->queryAmazon($parameters);
            
            return $this->verifyXmlResponse($xml_response);

        }
        
        
        /**
         * Return details of a product searched by ASIN
         * 
         * @param int $asin_code ASIN code of the product to search
         * @return mixed simpleXML object
         */
        public function getItemByAsin($asin_code)
        {
            $parameters = array("Operation"     => "ItemLookup",
                                "ItemId"        => $asin_code,
                                "ResponseGroup" => "Large,VariationSummary,Variations");
                                
            $xml_response = $this->queryAmazon($parameters);
            
            return $this->verifyXmlResponse($xml_response);
        }
        
        
        /**
         * Return details of a product searched by keyword
         * 
         * @param string $keyword keyword to search
         * @param string $product_type type of the product
         * @return mixed simpleXML object
         */
        public function getItemByKeyword($keyword, $ItemPage , $product_type ,$additionalParam=array() ,$min='' ,$max='')
        {
        	
        	 
            
        	 
        	$parameters = array("Operation"   => "ItemSearch",
                                 
                                "SearchIndex" => $product_type,
                                "ItemPage"    =>  $ItemPage,
            					"BrowseNode"  =>   @$node ,
        						"MinimumPrice"=> $min,
        						"MaximumPrice"=>$max ,
                                "ResponseGroup" => "Large,VariationSummary,Variations");
            
        	 
			//keyword         
        	if(  $keyword != '%2A' && $keyword !='*' ) $parameters['Keywords']=  $keyword ; 


        	//additiona param
        	$parameters=array_merge($parameters,$additionalParam);
        	  
        	 
        	                     
            $xml_response = $this->queryAmazon($parameters);
            
        
            
            return $this->verifyXmlResponse($xml_response);
        }

        /**
         * Return list of ASINs of items by scraping the page
         * @param string $pageUrl
         * @param string $ch curl handler
         */
        public function getASINs($moreUrl,&$ch){
        	
        	//curl get
        	$x='error';
        	$url=$moreUrl;
        	curl_setopt($ch, CURLOPT_HTTPGET, 1);
        	curl_setopt($ch, CURLOPT_URL, trim($url));
        	
        	$exec=curl_exec($ch);
        	$x=curl_error($ch);
        	
        	//validate reply
        	if(trim($exec) == ''){
        		throw new Exception('Empty reply from Amazon with possible curl error '.$x) ;
        	}
        	
        	//validate products found
        	if(! stristr($exec, 'data-asin')){
        		//throw new Exception('No items found') ;
        		  echo '<br>No items found';
        		return array();
        	}
        	
        	//extract products
        	preg_match_all('{data-asin="(.*?)"}', $exec,$productMatchs);
        	$asins = $productMatchs[1];
        	
        	if(stristr($exec, 'proceedWarning')){
        		  echo '<br>Reached end page of items';
        		return array();
        	}
        	
        	return($asins);
        	 
        }
    }

?>
