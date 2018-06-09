/* 
* ---------------------------------------
* --------- CREATED BY LV ----------
* Autor:        Super 
* Fecha:        08-06-2018 01:06:03 
* Descripcion : ConversionRsc.js
* ---------------------------------------
*/ 
"use strict";

$$.Proceso.ConversionRsc = class ConversionRsc extends Resource {
    
    constructor() {
        super();
    }
    
    addBtnSearch() {
        $.fn.appButton.get({
            container: `#${this._alias}btn_search`,
            keymnu: this._alias,
            btns: [
                {keybtn: APP_BTN.BUS, evts: [{click: 'Obj.Proceso.ConversionAx.postSearch'}]}
            ]
        });
    }
    
    addBtnSaveObs() {
        $.fn.appButton.get({
            container: `#${this._alias}foot_btns`,
            keymnu: this._alias,
            btns: [
                {keybtn: APP_BTN.GRB, type: 'submit'},
                {keybtn: APP_BTN.CLS}
            ]
        }, (oSettings) => {
            $(`#${PREBTNCTXT}${this._alias}${APP_BTN.CLS}`).attr('data-dismiss','modal');
        });
    }
    
    setVehiculos(data) {
        let h = '', txtEval = '';

        $.each(data, (i, e) => {
            h += `
            <div class="bigBox" style="background-color:#e2e2e2;height:auto;float: left;margin-left:10px;margin-bottom: 10px;position: relative;z-index: 0;width: 250px;color:#000">
                <span>
                    <i class="fa fa-address-book"></i> ${e.nombre_completo}
                </span>
                <div class="smart-form">
                    <div class="row">
                        <section class="col col-12">
                            <div>${APP_ETIQUET.nro_exp}: ${e.nro_expediente}</div>
                        </section>
                        <section class="col col-6">
                            <div>${APP_ETIQUET.placa}: ${e.placa}</div>
                            <div>${APP_ETIQUET.modelo}: ${e.modelo}</div>
                        </section>
                        <section class="col col-6">
                            <div>${APP_ETIQUET.marca}: ${e.marca}</div>
                            <div>${APP_ETIQUET.nro_serie}: ${e.serie}</div>
                        </section>
                    </div>
                    <br>
                    <div id="${this._alias}${i}_tools" class="_tools"></div>
                </div>
            </div>`;

            //botones
            txtEval += `
                $.fn.appButton.get({
                    aliasBtn: '${i}',
                    container: '#${this._alias}${i}_tools',
                    keymnu: '${this._alias}',
                    notext: true,
                    //forceBtnXs: true,
                    btns: [
                        {keybtn: APP_BTN.PRC, evts: [{click: 'Obj.Proceso.ConversionAx.formConversion'}]},
                        {keybtn: APP_BTN.APR, evts: [{click: 'Obj.Proceso.ConversionAx.postAprobar'}]},
                        {keybtn: APP_BTN.RECH, evts: [{click: 'Obj.Proceso.ConversionAx.postRechazar'}]}
                    ]
                });
                $('#${this._alias}${i}_tools').data('propietario',${e.id_propietario});
            `;
        });

        if (data.length == 0) {
            h = `<div class="alert alert-info text-center"><i class="fa fa-info"></i> ${APP_ETIQUET.no_registros}</div>`;
        }
        $(`#${this._alias}d_vehiculos_aprobados`).html(h);
        eval(txtEval);
        $(`#${this._alias}d_vehiculos_aprobados`).find('._tools').find('.btn').css({
            padding: '5px'
        });
    }
    
};