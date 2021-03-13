<?php
class Image_Tag extends H2o_Node {
    var $term, $cacheKey;

    function __construct($argstring, $parser, $pos=0) {
        list($this->term, $this->hack) = explode(' ', $argstring);
    }
    
    function is_single_image()
    {
        return (stripos($_SERVER['REQUEST_URI'], 'images/') !== false);
    }
    
    function get_api_url($term = 'hello world', $hack = ""){    	
		$term .= " ".$hack ;
    	$term = urlencode($term);
    	return "http://www.bing.com/images/search?q=$term";
    }

    function filter($feed)
    {
        global $spp_settings;
        $bad_urls = $spp_settings->bad_urls;

        $filtered_feed = array();

        foreach ($feed as $item) {
            $found = false;

            foreach ($bad_urls as $bad_url) {
                if(stripos($item->mediaurl, $bad_url) !== false){
                    $found = true;
                }
            }

            if(!$found){
                $filtered_feed[] = $item;
            }

        }

        return $filtered_feed;
    }
      
   function fetch($context,$url) {
       $this->url = $url;
       $doc = @file_get_contents($this->url);
       phpQuery::newDocument($doc);
       $images = array();
       
       foreach(pq('div.dg_u a') as $a){
           $raw_image = pq($a)->attr('m');
           $urls = json_decode($this->fix_json($raw_image), true);
           
           // let's create image properties
	       $image['link'] = $urls['surl'];
           $image['mediaurl'] = $urls['imgurl'];
	       $image['title'] = pq($a)->attr('t1');
	       $image['size'] = pq($a)->attr('t2');
           
           $images[] = $image;
       } 
       return $images;
   }

   function render($context, $stream) {
        $cache = h2o_cache($context->options);
        $term  = $context->resolve(':term');
        $hack  = $context->resolve(':hack');
        
        $url   = $this->get_api_url($term, $hack);
        $feed  = @$this->fetch($context,$url);
	    
        $feed = @$this->filter($feed);
        
        $context->set("images", $feed);
        $context->set("is_single_image", $this->is_single_image());
	}
    
    function fix_json( $j ){
        $j = trim( $j );
        $j = ltrim( $j, '(' );
        $j = rtrim( $j, ')' );
        $a = preg_split('#(?<!\\\\)\"#', $j );
        
        for( $i=0; $i < count( $a ); $i+=2 ){
            $s = $a[$i];
            $s = preg_replace('#([^\s\[\]\{\}\:\,]+):#', '"\1":', $s );
            $a[$i] = $s;
        }
        
        $j = implode( '"', $a );
        
        return $j;
    }
}

h2o::addTag('image');