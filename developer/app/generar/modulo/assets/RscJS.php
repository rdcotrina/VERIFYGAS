<?php

namespace Generar\Modulo\Assets;

class RscJS {
    
    public static function create($obj) {
        $ruta = $obj['ruta'];
        $file = $obj['file'];
        $modulo = ucfirst($obj['modulo']);

        $url = $ruta . DS . 'views' . DS . 'js' . DS . $modulo . '.' . $file . 'Rsc.js';
        if (!file_exists($url)) {
            $fp = fopen($url, "x");
            fwrite($fp, self::_content($modulo, $file));
            fclose($fp);
        }
    }
    
    private function _content($modulo, $file) {
        return '/* 
* ---------------------------------------
* --------- CREATED BY LV ----------
* Autor:        ' . Obj()->Vendor->Session->get('app_nameUser') . ' 
* Fecha:        ' . date('d-m-Y H:m:s') . ' 
* Descripcion : ' . $file . 'Rsc.js
* ---------------------------------------
*/ 
"use strict";

$$.'.$modulo.'.' . $file . 'Rsc = class ' . $file . 'Rsc extends Resource {
    
    constructor() {
        super();
    }
    
};';
    }
    
}
