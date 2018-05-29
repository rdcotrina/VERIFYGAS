<?php
/* 
* ---------------------------------------
* --------- CREATED BY LV ----------
* Autor:        Super 
* Fecha:        26-05-2018 04:05:26 
* Descripcion : VehiculoModel.php
* ---------------------------------------
*/ 

namespace Registro\Vehiculo\Models;
  
class VehiculoModel extends \Vendor\DataBase {
    
    protected $_form;
    protected $_file;
    private $_usuario;
    private $_navegador;
    private $_ipPublica;
    private $_ipLocal;
    private $_hostName;
    private $_idTienda;
    
    protected function __construct() {
        parent::__construct();
        $this->_form = Obj()->Vendor->Request->allForm()->post();
        $this->_file = Obj()->Vendor->Request->allForm()->file();
        $this->_usuario = Obj()->Vendor->Session->get('app_idUsuario');
        $this->_navegador = Obj()->Vendor->Session->get('app_navegador');
        $this->_ipPublica = Obj()->Vendor->Session->get('app_ipPublica');
        $this->_ipLocal = Obj()->Vendor->Session->get('app_ipLocal');
        $this->_hostName = Obj()->Vendor->Session->get('app_hostName');
        $this->_idTienda = Obj()->Vendor->Session->get('app_idTienda');
    }
    
}