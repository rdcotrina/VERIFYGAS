<?php

namespace Generar\Modulo\Assets;

class FormIndex {

    public static function create($obj) {
        $ruta = $obj['ruta'];
        $file = $obj['file'];
        $modulo = ucfirst($obj['modulo']);

        $url = $ruta . DS . 'views' . DS . 'formIndex.js';
        if (!file_exists($url)) {
            $fp = fopen($url, "x");
            fwrite($fp, self::_content());
            fclose($fp);
        }
    }
    
    private function _content() {
        return '<div></div>';
    }
    
}

