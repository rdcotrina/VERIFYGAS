<?php

namespace Generar\Modulo\Assets;

class TourJS {

    public static function create($obj) {
        $ruta = $obj['ruta'];
        $file = $obj['file'];
        $modulo = ucfirst($obj['modulo']);

        $url = $ruta . DS . 'views' . DS . 'js' . DS . $modulo . '.' . $file . 'Tour.js';
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
* Descripcion : ' . $file . 'Tour.js
* ---------------------------------------
*/ 
"use strict";

$$.' . $modulo . '.' . $file . 'Tour = class ' . $file . 'Tour {

    main() {
        var tour = new Tour({
            steps: [
                {
                    element: `#ELEMENTO AL QUE SE LE APLICA EL TOUR`,
                    content: \'CONTENIDO DESDE ARRAY JS: APP_TOUR\',
                    backdrop: true,
                    backdropPadding: 5,
                    placement: "bottom",
                    reflex: true
                }
            ]
        });
        tour.init();
        tour.restart();
    }
    
}';
    }

}
