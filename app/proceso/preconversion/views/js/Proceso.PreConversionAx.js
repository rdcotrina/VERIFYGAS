/* 
* ---------------------------------------
* --------- CREATED BY LV ----------
* Autor:        Super 
* Fecha:        03-06-2018 01:06:45 
* Descripcion : PreConversionAx.js
* ---------------------------------------
*/ 
"use strict";

$$.Proceso.PreConversionAx = class PreConversionAx extends $$.Proceso.PreConversionRsc {

    constructor() {
        super();
        this._controller = 'preconversion:';
        this._alias = Exe.getAlias();
        this._dmain = `#${this._alias}${APP_CONTAINER_TABS}`; /*contenedor principal de opcion*/
        this._tour = Obj.Proceso.PreConversionTour;
        
        this._formIndex = (tk) => {
            this.send({
                token: tk,
                context: this,
                dataType: 'text',
                tour: true,
                response: (data) => {
                    $(this._dmain).append(data);
                },
                finally: (data) => {
                    //escriba aqui, se ejecutara una vez haya cargado el HTML
                    //Tools.addTourMain.call(this);
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
    
};