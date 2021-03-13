<?php

include("simple_html_dom.php");

$html = file_get_html('http://www.google.co.in/search?hl=en&output=search&q=india');

$i = 0;
foreach($html->find('li[class=g]') as $element) {
    foreach($element->find('h3[class=r]') as $h3) 
    {
        $title[$i] = '<h1>'.$h3->plaintext.'</h1>' ;
    }
       $i++;
}
print_r($title);

?>