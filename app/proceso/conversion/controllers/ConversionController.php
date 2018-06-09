<?php
/* 
* ---------------------------------------
* --------- CREATED BY LV ----------
* Autor:        Super 
* Fecha:        08-06-2018 01:06:03 
* Descripcion : ConversionController.php
* ---------------------------------------
*/ 

namespace Proceso\Conversion\Controllers;
   
use \Vendor\Controller;
use \Proceso\Conversion\Filters\ConversionFilter;

class ConversionController extends \Proceso\Conversion\Models\ConversionModel {
    
    use Controller {
        Controller::__construct as private __cConstruct;
    }
    use ConversionFilter {
        ConversionFilter::__construct as private __fConstruct;
    }
    
    public function __construct() {
        parent::__construct();  /* constructor del ConversionModel */
        $this->__cConstruct();  /* constructor del Controller */
        $this->__fConstruct();  /* constructor del ConversionFilter */
    }
    
    public function index() {}
    
    public function getVehiculos() {
        echo json_encode($this->qGetVehiculos());
    }
    
    public function postAtender() {
        echo json_encode($this->spAtender());
    }
    
}