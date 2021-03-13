<?php
if(! class_exists('wp_auto_spinner_Spintax')){
	class wp_auto_spinner_Spintax {
		
		public $editor_form;
	
	   function spin($string, $view=false)
	   {
	   	
	   	$opt= get_option('wp_auto_spin',array());
	   	
	      $z=-1;
	      $input = $this->bracketArray($string);
	      
	      for($i=0; $i<count($input);$i++){
	         for($x=0; $x<count($input[$i]);$x++) {
	            if(!$input[$i][$x]==""||"/n"){
	               $z++;
	               if(strstr($input[$i][$x], "*|*")){
	                  $out = explode("*|*", $input[$i][$x]);

	                  
	                  $output[$z]=$out[rand(1, count($out)-2)];
	                  
	                  //invert synonyms
	                  $synonyms=str_replace('*|*', '|', $input[$i][$x] );
	                  
	                  //if content spinningactive

	                  if( ! in_array( 'OPT_AUTO_SPIN_DEACTIVE_CNT' , $opt)){
	                  	 
	                  	$randSyn = $out[rand(1, count($out)-1)];
	                  	 
	                  }else{
	                  	 
	                  	$randSyn = $out[0];
	                  	 
	                  }
	                  
	                  $output2[$z] = '<span  synonyms="'.$synonyms.'" class="synonym">'.$randSyn.'</span>';
	               } else {
	                  $output[$z] = $input[$i][$x];
	                  $output2[$z] = $input[$i][$x];
	               }
	            }
	         }
	      }
	      $res='';
	      $res2='';
	      for($i=0;$i<count($output);$i++){
	        $res .=  $output[$i];
	        $res2 .= $output2[$i];
	      }
	      
	    
	      
	      $this->editor_form = $res2;
	      
	      return $res;
	      
	   }
	   
	   
	   function bracketArray($str, $view=false)
	   {
	   	
	   	preg_match_all ( '/{(.*?)}/s', $str, $matches );
	   	$sets = $matches [0];
	   	foreach ( $sets as $set ) {
	   		$str = str_replace($set, str_replace('|','*|*',$set), $str);
	   	}
	   	
	    
	   	
	      @$string = explode( "{", $str);
 
	      for($i=0;$i<count($string);$i++){
	         @$_string[$i] = explode("}", $string[$i]);
	      }
	      if($view){
	         $this->printArray($_string);
	      }
	      return $_string;
	   }
	   
	   function cleanArray($array){
	      for($i=0;$i<count($array);$i++){
	         if($array[$i]!=""){
	            $cleanArray[$i] = $array[$i];
	         }
	      }
	      return $cleanArray;
	   }
	   
	   function printArray($array)
	   {
	      echo '<pre>';
	      print_r($array);
	      echo '</pre>';
	   }
	}
}

?>
