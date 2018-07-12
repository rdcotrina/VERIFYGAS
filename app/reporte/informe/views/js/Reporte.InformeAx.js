/* 
 * ---------------------------------------
 * --------- CREATED BY LV ----------
 * Autor:        Super 
 * Fecha:        02-07-2018 01:07:47 
 * Descripcion : InformeAx.js
 * ---------------------------------------
 */
"use strict";

$$.Reporte.InformeAx = class InformeAx extends $$.Reporte.InformeRsc {

    constructor() {
        super();
        this._controller = 'informe:';
        this._alias = Exe.getAlias();
        this._dmain = `#${this._alias}${APP_CONTAINER_TABS}`; /*contenedor principal de opcion*/
        this._idFormIndex = `#${this._alias}formIndex`;

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
                    this.addBtnSearch();
                    Tools.dateRange(`#${this._alias}txt_desde`,`#${this._alias}txt_hasta`);
                }
            });
        };

        this._getInforme = (tk) => {
            this.send({
                token: tk,
                element: `#${PREBTNCTXT}${this._alias}${APP_BTN.BUS}`,
                form: this._idFormIndex,
                context: this,
                response: (data) => {
                    this.setInforme(data);
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

    postSearch(tk) {
        this._getInforme(tk);
    }
    
    getExcel(btn,tk){
        let h = $(`#${this._alias}d_informeM`).html()+$(`#${this._alias}d_informeA`).html();
        
        if(h.length == 0){
            Tools.notify().smallMsn({
                content: APP_MSN.no_informacion
            });
            return false;
        }
        window.open('data:application/vnd.ms-excel,' + encodeURIComponent(h));
    }

};