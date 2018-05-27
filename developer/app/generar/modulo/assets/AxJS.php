<?php

namespace Generar\Modulo\Assets;

class AxJS {

    public static function create($obj) {
        $ruta = $obj['ruta'];
        $file = $obj['file'];
        $modulo = ucfirst($obj['modulo']);

        $url = $ruta . DS . 'views' . DS . 'js' . DS . $modulo . '.' . $file . 'Ax.js';
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
* Descripcion : ' . $file . 'Ax.js
* ---------------------------------------
*/ 
"use strict";

$$.' . $modulo . '.' . $file . 'Ax = class ' . $file . 'Ax extends $$.' . $modulo . '.' . $file . 'Rsc {

    constructor() {
        super();
        this._controller = \'' . strtolower($file) . ':\';
        this._alias = Exe.getAlias();
        this._dmain = `#${this._alias}${APP_CONTAINER_TABS}`; /*contenedor principal de opcion*/
        this._tour = Obj.' . $modulo . '.' . $file . 'Tour;
        
        this._formIndex = (tk) => {
            this.send({
                token: tk,
                context: this,
                dataType: \'text\',
                tour: true,
                response: (data) => {
                    $(this._dmain).append(data);
                },
                finally: (data) => {
                    //escriba aqui, se ejecutara una vez haya cargado el HTML
                    Tools.addTourMain.call(this);
                }
            });
        };
        
    }
    
    main(tk) {
        Tools.addTab({
            context: this,
            id: this._alias,
            label: Exe.getTitle(),
            breadCrumb: Exe.getRoot(),
            fnCallback: () => {
                this._formIndex(tk);
            }
        });
    }
    
};';
    }

}
