<?php
/* 
* ---------------------------------------
* --------- CREATED BY LV ----------
* Autor:        Super 
* Fecha:        08-06-2018 01:06:03 
* Descripcion : ConversionFilter.php
* ---------------------------------------
*/ 

namespace Proceso\Conversion\Filters;
   
use \Vendor\ValidaForm;

trait ConversionFilter {
    
    private $_frm;

    use ValidaForm {
        ValidaForm::__construct as private __fvConstruct;
    }

    public function __construct() {
        $this->__fvConstruct();
        $this->_frm = Obj()->Vendor->Request->allForm()->post();
    }
    
}