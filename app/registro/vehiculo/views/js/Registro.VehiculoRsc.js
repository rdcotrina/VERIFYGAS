/* 
* ---------------------------------------
* --------- CREATED BY LV ----------
* Autor:        Super 
* Fecha:        26-05-2018 04:05:26 
* Descripcion : VehiculoRsc.js
* ---------------------------------------
*/ 
"use strict";

$$.Registro.VehiculoRsc = class VehiculoRsc extends Resource {
    
    constructor() {
        super();
    }
    
    addBtnNew() {
        $.fn.appButton.get({
            container: `#${this._alias}tools_btn`,
            keymnu: this._alias,
            btns: [
                {keybtn: APP_BTN.NEW, evts: [{click: 'Obj.Registro.VehiculoAx.formNewVehiculo'}]}
            ]
        });
    }
    
};