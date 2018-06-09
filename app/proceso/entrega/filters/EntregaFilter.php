<?php
/* 
* ---------------------------------------
* --------- CREATED BY LV ----------
* Autor:        Super 
* Fecha:        08-06-2018 07:06:19 
* Descripcion : EntregaFilter.php
* ---------------------------------------
*/ 

namespace Proceso\Entrega\Filters;
   
use \Vendor\ValidaForm;

trait EntregaFilter {
    
    private $_frm;

    use ValidaForm {
        ValidaForm::__construct as private __fvConstruct;
    }

    public function __construct() {
        $this->__fvConstruct();
        $this->_frm = Obj()->Vendor->Request->allForm()->post();
    }
    
}