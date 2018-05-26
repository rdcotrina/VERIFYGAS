<?php

namespace Generar\Modulo\Assets;

class ControllerAssets {

    public static function create($obj) {
        $ruta = $obj['ruta'];
        $file = $obj['file'];
        $modulo = ucfirst($obj['modulo']);

        $url = $ruta . DS . 'controllers' . DS . $file . 'Controller.php';
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
* Descripcion : ' . $file . 'Controller.php
* ---------------------------------------
*/ 

namespace ' . $modulo . '\\' . $file . '\\Controllers;
   
use \\Vendor\\Controller;
use \\' . $modulo . '\\' . $file . '\\Filters\\' . $file . 'Filter;

class ' . $file . 'Controller extends \\' . $modulo . '\\' . $file . '\\Models\\' . $file . 'Model {
    
    use Controller {
        Controller::__construct as private __cConstruct;
    }
    use ' . $file . 'Filter {
        ' . $file . 'Filter::__construct as private __fConstruct;
    }
    
    public function __construct() {
        parent::__construct();  /* constructor del ' . $file . 'Model */
        $this->__cConstruct();  /* constructor del Controller */
        $this->__fConstruct();  /* constructor del ' . $file . 'Filter */
    }
    
    public function index() {}
    
}';
    }

}
