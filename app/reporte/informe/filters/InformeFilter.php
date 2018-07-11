<?php
/* 
* ---------------------------------------
* --------- CREATED BY LV ----------
* Autor:        Super 
* Fecha:        02-07-2018 01:07:47 
* Descripcion : InformeFilter.php
* ---------------------------------------
*/ 

namespace Reporte\Informe\Filters;
   
use \Vendor\ValidaForm;

trait InformeFilter {
    
    private $_frm;

    use ValidaForm {
        ValidaForm::__construct as private __fvConstruct;
    }

    public function __construct() {
        $this->__fvConstruct();
        $this->_frm = Obj()->Vendor->Request->allForm()->post();
    }
    
}