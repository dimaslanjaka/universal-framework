<?php

$curl = curl_init();

$request = array();
$request['text'] = 'love is life

do you know. I like my dad ';
$request['numParaphrases'] = 1;
$request['includeSegs'] = false;

 

curl_setopt_array($curl, [
		CURLOPT_URL => "https://quillbot.p.rapidapi.com/paraphrase-all",
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_ENCODING => "",
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS =>  json_encode($request)  ,
		CURLOPT_HTTPHEADER => [
				"content-type: application/json",
				"x-rapidapi-host: quillbot.p.rapidapi.com",
				"x-rapidapi-key: 7207800773msh2c0be10879d0454p1f0049jsnbadbe61f2d50"
		],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

echo $response;

curl_close($curl);

if ($err) {
	echo "cURL Error #:" . $err;
} else {
	//echo $response;
	
	$response_json = json_decode($response);
	
	echo '<pre>';
	print_r($response_json);
	
}