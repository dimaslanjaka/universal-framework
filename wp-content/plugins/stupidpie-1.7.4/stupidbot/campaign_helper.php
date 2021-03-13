<?php
class Stupidbot_Campaign_Helper{
    public static function clean_text($text, $upper = 'ucfirst', $limit=100)
    {
        $text = preg_replace("/[^a-zA-Z0-9]+/", ' ', $text);
        $text = strtolower($text);
        $text = self::word_limiter($text,$limit,'');
        $text = trim($text);
        if($upper=='ucfirst'){
            $text = ucfirst($text);
        }
        if($upper=='ucwords'){
            $text = ucwords($text);
        }
        return $text;

    }
    
    public static function word_limiter($str, $limit = 100, $end_char = '&#8230;')
    {
    	if (trim($str) == ''){
    		return $str;
    	}
    
    	preg_match('/^\s*+(?:\S++\s*+){1,'.(int) $limit.'}/', $str, $matches);
    
    	if (strlen($str) == strlen($matches[0])){
    		$end_char = '';
    	}
    
    	return rtrim($matches[0]).$end_char;
    }
}