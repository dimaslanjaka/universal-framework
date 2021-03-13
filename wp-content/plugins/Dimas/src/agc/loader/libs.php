<?php
class Chainable {
    private $instance = null;
    public function __construct(){
        $pars = func_get_args();
        $this->instance = is_object($obj=array_shift($pars))?$obj:new $obj($pars);
    }

    public function __call($name,$pars){
        call_user_func_array([$this->instance,$name],$pars);
        return $this;
    }

}