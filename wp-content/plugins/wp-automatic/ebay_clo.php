<?php  
	if(isset($_GET['challenge_code'])){
				$challengeCode = $_GET['challenge_code'];
				
				//wp-load
				require_once('../../../wp-load.php');
				$endpoint = plugins_url( 'ebay_clo.php' , __FILE__ );
				$endpoint = str_replace('http:/' , 'https:/',$endpoint);
				
				$verificationToken = md5($endpoint);
				 
				
				$hash = hash_init('sha256');
				
				hash_update($hash, $challengeCode);
				hash_update($hash, $verificationToken);
				hash_update($hash, $endpoint);
				
				header("Content-type: application/json; charset=utf-8");
				
				$arr['challengeResponse'] = hash_final($hash);
				
				echo json_encode($arr);
				
				exit;
			
			}else{
				echo 'done';
			}
			
?>			