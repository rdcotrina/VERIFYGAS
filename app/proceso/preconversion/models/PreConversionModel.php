<?php
/* 
* ---------------------------------------
* --------- CREATED BY LV ----------
* Autor:        Super 
* Fecha:        03-06-2018 01:06:45 
* Descripcion : PreConversionModel.php
* ---------------------------------------
*/ 

namespace Proceso\PreConversion\Models;
  
class PreConversionModel extends \Vendor\DataBase {
    
    protected $_form;
    private $_usuario;
    private $_navegador;
    private $_ipPublica;
    private $_ipLocal;
    private $_hostName;
    private $_idTienda;
    
    protected function __construct() {
        parent::__construct();
        $this->_form = Obj()->Vendor->Request->allForm()->post();
        $this->_usuario = Obj()->Vendor->Session->get('app_idUsuario');
        $this->_navegador = Obj()->Vendor->Session->get('app_navegador');
        $this->_ipPublica = Obj()->Vendor->Session->get('app_ipPublica');
        $this->_ipLocal = Obj()->Vendor->Session->get('app_ipLocal');
        $this->_hostName = Obj()->Vendor->Session->get('app_hostName');
        $this->_idTienda = Obj()->Vendor->Session->get('app_idTienda');
    }
    
}