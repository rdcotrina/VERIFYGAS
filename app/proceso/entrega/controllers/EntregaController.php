<?php
/* 
* ---------------------------------------
* --------- CREATED BY LV ----------
* Autor:        Super 
* Fecha:        08-06-2018 07:06:19 
* Descripcion : EntregaController.php
* ---------------------------------------
*/ 

namespace Proceso\Entrega\Controllers;
   
use \Vendor\Controller;
use \Proceso\Entrega\Filters\EntregaFilter;

class EntregaController extends \Proceso\Entrega\Models\EntregaModel {
    
    use Controller {
        Controller::__construct as private __cConstruct;
    }
    use EntregaFilter {
        EntregaFilter::__construct as private __fConstruct;
    }
    
    public function __construct() {
        parent::__construct();  /* constructor del EntregaModel */
        $this->__cConstruct();  /* constructor del Controller */
        $this->__fConstruct();  /* constructor del EntregaFilter */
    }
    
    public function index() {}
    
    public function getVehiculos() {
        echo json_encode($this->qGetVehiculos());
    }
    
    public function postAtender() {
        echo json_encode($this->spAtender());
    }
    
}