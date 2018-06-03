<?php
/* 
* ---------------------------------------
* --------- CREATED BY LV ----------
* Autor:        Super 
* Fecha:        03-06-2018 01:06:45 
* Descripcion : PreConversionController.php
* ---------------------------------------
*/ 

namespace Proceso\PreConversion\Controllers;
   
use \Vendor\Controller;
use \Proceso\PreConversion\Filters\PreConversionFilter;

class PreConversionController extends \Proceso\PreConversion\Models\PreConversionModel {
    
    use Controller {
        Controller::__construct as private __cConstruct;
    }
    use PreConversionFilter {
        PreConversionFilter::__construct as private __fConstruct;
    }
    
    public function __construct() {
        parent::__construct();  /* constructor del PreConversionModel */
        $this->__cConstruct();  /* constructor del Controller */
        $this->__fConstruct();  /* constructor del PreConversionFilter */
    }
    
    public function index() {}
    
}