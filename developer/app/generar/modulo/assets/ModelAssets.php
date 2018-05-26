<?php

namespace Generar\Modulo\Assets;

class ModelAssets {

    public static function create($obj) {
        $ruta = $obj['ruta'];
        $file = $obj['file'];
        $modulo = ucfirst($obj['modulo']);

        $url = $ruta . DS . 'models' . DS . $file . 'Model.php';
        if (!file_exists($url)) {
            $fp = fopen($url, "x");
            fwrite($fp, self::_content($modulo, $file));
            fclose($fp);
        }
    }

    private function _content($modulo, $file) {
        return '<?php
/* 
* ---------------------------------------
* --------- CREATED BY LV ----------
* Autor:        ' . Obj()->Vendor->Session->get('app_nameUser') . ' 
* Fecha:        ' . date('d-m-Y H:m:s') . ' 
* Descripcion : ' . $file . 'Model.php
* ---------------------------------------
*/ 

namespace ' . $modulo . '\\' . $file . '\\Models;
  
class ' . $file . 'Model extends \\Vendor\\DataBase {
    
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
        $this->_usuario = Obj()->Vendor->Session->get(\'app_idUsuario\');
        $this->_navegador = Obj()->Vendor->Session->get(\'app_navegador\');
        $this->_ipPublica = Obj()->Vendor->Session->get(\'app_ipPublica\');
        $this->_ipLocal = Obj()->Vendor->Session->get(\'app_ipLocal\');
        $this->_hostName = Obj()->Vendor->Session->get(\'app_hostName\');
        $this->_idTienda = Obj()->Vendor->Session->get(\'app_idTienda\');
    }
    
}';
    }

}
