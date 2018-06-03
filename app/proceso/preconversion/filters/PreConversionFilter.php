<?php
/* 
* ---------------------------------------
* --------- CREATED BY LV ----------
* Autor:        Super 
* Fecha:        03-06-2018 01:06:45 
* Descripcion : PreConversionFilter.php
* ---------------------------------------
*/ 

namespace Proceso\PreConversion\Filters;
   
use \Vendor\ValidaForm;

trait PreConversionFilter {
    
    private $_frm;

    use ValidaForm {
        ValidaForm::__construct as private __fvConstruct;
    }

    public function __construct() {
        $this->__fvConstruct();
        $this->_frm = Obj()->Vendor->Request->allForm()->post();
    }
    
}