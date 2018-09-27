<?php
//This is where I'm making sure the class is importet, by making the page fail to load if the file is not there
    //since it is required
require_once("Parse.php");

//Here I'm making the class.
//Since it throws an exeption if it cannot find the file, I made it catch it to display the error and stop the rest from going through.
try {
    $templateParse = new templateParse('default_template.html');
} catch (Exception $ex) {
    echo $ex->getMessage();
    die();
}

//Here I'm deciding what is going to be displayed and putting it all into an array.
$title = 'You are seeing the template parser class in action!';
$header = 'This is a header!';
$navbar = 'Insert menu here';
$leftcontent = 'Left col here';
$main = 'main.php';
$rightcontent = 'Right col here';
$footer = 'This is the footer!';
$tags = array('title' => $title, 'header' => $header, 'navbar' => $navbar, 'leftcontent' => $leftcontent,
    'maincontent' => $main, 'rightcontent' => $rightcontent, 'footer' => $footer);

//Here I am taking the array I just made and putting it through the class to process the content.
//Again I'm using "try" to catch an exeption if an error happends.
try {
    $templateParse->ParseTemplate($tags);
} catch (Exception $ex) {
    echo $ex->getMessage();
    die();
}

//Here I'm printing the finished result.
echo $templateParse->display();
