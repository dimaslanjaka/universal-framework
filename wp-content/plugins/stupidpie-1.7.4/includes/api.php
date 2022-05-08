<?php
class Api_Tag extends H2o_Node {
    var $term, $cacheKey;

    function __construct($argstring, $parser, $pos=0) {
        list($this->term, $this->hack) = explode(' ', $argstring);
    }
    
    function get_api_url($term = 'hello world', $hack = ""){        
        $term .= " ".$hack ;
        $term = urlencode($term);
        return "http://www.bing.com/search?q=$term&format=rss";
    }
      
   function fetch($context,$url) {
        $this->url = $url;
        $feed = @file_get_contents($this->url);
        $feed = @simplexml_load_string($feed);
        return $feed;
    }

    function filter($feed)
    {
        global $spp_settings;
        $bad_urls = $spp_settings->bad_urls;

        $filtered_feed = array();

        foreach ($feed as $item) {
            $found = false;

            foreach ($bad_urls as $bad_url) {
                if(stripos($item->link, $bad_url) !== false){
                    $found = true;
                }
            }

            if(!$found){
                $filtered_feed[] = $item;
            }

        }

        return $filtered_feed;
    }

    function render($context, $stream) {
        $cache = h2o_cache($context->options);
        $term  = $context->resolve(':term');
        $hack  = $context->resolve(':hack');
        
        $url   = $this->get_api_url($term, $hack);
        $feed  = @$this->fetch($context,$url)->xpath('//channel/item');

        $feed = @$this->filter($feed);
    
        $context->set("api", $feed);
        $context->set("api_url", $url);
    }

}
h2o::addTag('api');


function filter_bad_words($content){
    global $spp_settings;
    $bad_words = explode(',', $spp_settings->bad_words);
    foreach($bad_words as $word){
        // mulai ubah konten
        $content = str_ireplace($word .' ', '', $content);
        $content = str_ireplace(' '. $word .' ', '', $content);
        $content = str_ireplace(' '. $word, '', $content);
        $content = str_ireplace($word, '.', $content);
        $content = str_ireplace($word, ',', $content);
        $content = str_ireplace($word, '-', $content);
    }
    return $content;
}
h2o::addFilter('filter_bad_words');

function remove_repeating_chars($object){
    return  preg_replace("/[^a-zA-Z0-9\s.?!\/]/", "", $object);

}
h2o::addFilter('remove_repeating_chars');
