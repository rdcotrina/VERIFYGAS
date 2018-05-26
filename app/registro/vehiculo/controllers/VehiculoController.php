<?php
/* 
* ---------------------------------------
* --------- CREATED BY LV ----------
* Autor:        Super 
* Fecha:        26-05-2018 04:05:26 
* Descripcion : VehiculoController.php
* ---------------------------------------
*/ 

namespace Registro\Vehiculo\Controllers;
   
use \Vendor\Controller;
use \Registro\Vehiculo\Filters\VehiculoFilter;

class VehiculoController extends \Registro\Vehiculo\Models\VehiculoModel {
    
    use Controller {
        Controller::__construct as private __cConstruct;
    }
    use VehiculoFilter {
        VehiculoFilter::__construct as private __fConstruct;
    }
    
    public function __construct() {
        parent::__construct();  /* constructor del VehiculoModel */
        $this->__cConstruct();  /* constructor del Controller */
        $this->__fConstruct();  /* constructor del VehiculoFilter */
    }
    
    public function index() {}
    
}