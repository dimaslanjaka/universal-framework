<?php

 $article = "(*)(**)(**************************************{) have|)'ve} come to the " ;
 
 
 preg_match_all('/{\)[^}]*\|\)[^}]*}/', $article,$matches_brackets);
 $matches_brackets = $matches_brackets[0];
 
 foreach ($matches_brackets as $matches_bracket) {
 	$matches_bracket_clean = str_replace( array('{','}') , '', $matches_bracket);
 	$matches_bracket_parts = explode('|',$matches_bracket_clean);
 	echo str_replace($matches_bracket,$matches_bracket_parts[0],$article);
 	 
 }
 exit;
//echo  preg_replace("/{\*\|.*?}/" , '' , $article) ;
 
 echo '<pre>';
 print_r($matches_cap) ;
 
 echo 'fin';
 