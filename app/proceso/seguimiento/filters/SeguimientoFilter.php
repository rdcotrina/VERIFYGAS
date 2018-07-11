<?php
/* 
* ---------------------------------------
* --------- CREATED BY LV ----------
* Autor:        Super 
* Fecha:        21-06-2018 08:06:04 
* Descripcion : SeguimientoFilter.php
* ---------------------------------------
*/ 

namespace Proceso\Seguimiento\Filters;
   
use \Vendor\ValidaForm;

trait SeguimientoFilter {
    
    private $_frm;

    use ValidaForm {
        ValidaForm::__construct as private __fvConstruct;
    }

    public function __construct() {
        $this->__fvConstruct();
        $this->_frm = Obj()->Vendor->Request->allForm()->post();
    }
    
}