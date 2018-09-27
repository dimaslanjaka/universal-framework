<?php
//Here I'm making the class.
class templateParse {
    //This is a var that is stored inside the class. 
    //It is private, meaning that only the class can access it.
    //It holds the HTML from the template.
    private $output;

    //This is the contructer, meaing that the code will execute when the class is initiated.
    //What it does, is checking if the file exists, if it does, it stores it inside the output variable.
    //If it does not, it throws an exception that says that the file cannot be found.
    function __construct($file = "default_template.html") {
        if (file_exists($file)) {
            $this->output = file_get_contents($file);
        } else {
            throw new Exception('Error: ' . $file . ' not found');
        }
    }
    
    //In this function I start output buffering. This is used so the code that's in there, does not get send to the script.
    //The function includes the input and get's the content and returns it whilst it turns off output buffering.
    //This function is private cause it is called by another function inside the class.
    private function parseFile($file){
        ob_start();
        include($file);
        $content = ob_get_contents();
        ob_end_clean();
        return $content;
    }

    //This function takes an array and checks how many things are inside of it. If it is above 0 it ocntinues 
        //if it is not, it throws an exception to display an error and does nothing.
    //Once the array passes, the function does an foreach for each element inside of the array.
    //First it checks if value of the array is a file that exists, if it is not, it just uses the regular value. 
        //If it is a file, it uses that files content.
    //Second it goes through the output and replaces the tags inside of the tempalte (the {header} for example. Then saves it.
    function ParseTemplate($tags = array()) {
        if (count($tags) > 0) {
            foreach ($tags as $tags => $data) {
                $data = (file_exists($data)) ? $this->parseFile($data) : $data;
                $this->output = str_replace('{'.$tags.'}',$data,$this->output);
            }
        } else {
            throw new Exception('Error: No tags were provided for replacement');
        }
    }
    //This function just returns the output for display.
    function display() {
        return $this->output;
    }

}
