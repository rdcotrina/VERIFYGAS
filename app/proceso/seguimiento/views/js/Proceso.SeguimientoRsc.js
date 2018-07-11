/* 
* ---------------------------------------
* --------- CREATED BY LV ----------
* Autor:        Super 
* Fecha:        21-06-2018 08:06:04 
* Descripcion : SeguimientoRsc.js
* ---------------------------------------
*/ 
"use strict";

$$.Proceso.SeguimientoRsc = class SeguimientoRsc extends Resource {
    
    constructor() {
        super();
    }
    
    addBtnSearch() {
        $.fn.appButton.get({
            container: `#${this._alias}btn_search`,
            keymnu: this._alias,
            btns: [
                {keybtn: APP_BTN.BUS, evts: [{click: 'Obj.Proceso.SeguimientoAx.postSearch'}]}
            ]
        });
    }
    
    setVehiculos(data){
        let h = '', txtEval = '',et,ev,ec,etc,evc,ecc,ete,eve;

        $.each(data, (i, e) => {
            switch(e.estado_taller){
                case 'A':
                    et = `<div class="label label-success">${APP_ETIQUET.aprobado}</div>`;
                    break;
                case 'P':
                    et = `<div class="label label-default">${APP_ETIQUET.pendiente}</div>`;
                    break;
                case 'R':
                    et = `<div class="label label-danger" id="d_preconv_rchat">${APP_ETIQUET.rechazado}</div>`;
                    txtEval += `$('#d_preconv_rchat').click(function(){ Obj.Proceso.SeguimientoAx.formObservacion('${_tk_}',${e.id_propietario},'${e.nro_expediente}','PREC','TA'); });`;
                    break;
                    break;
            }
            switch(e.estado_verifygas){
                case 'A':
                    ev = `<div class="label label-success">${APP_ETIQUET.aprobado}</div>`;
                    break;
                case 'P':
                    ev = `<div class="label label-default">${APP_ETIQUET.pendiente}</div>`;
                    break;
                case 'R':
                    ev = `<div class="label label-danger lv-pointer" id="d_preconv_rchav">${APP_ETIQUET.rechazado}</div>`;
                    txtEval += `$('#d_preconv_rchav').click(function(){ Obj.Proceso.SeguimientoAx.formObservacion('${_tk_}',${e.id_propietario},'${e.nro_expediente}','PREC','VG'); });`;
                    break;
            }
            switch(e.estado_calidda){
                case 'A':
                    ec = `<div class="label label-success">${APP_ETIQUET.aprobado}</div>`;
                    break;
                case 'P':
                    ec = `<div class="label label-default">${APP_ETIQUET.pendiente}</div>`;
                    break;
                case 'R':
                    ec = `<div class="label label-danger" id="d_preconv_rchac">${APP_ETIQUET.rechazado}</div>`;
                    txtEval += `$('#d_preconv_rchac').click(function(){ Obj.Proceso.SeguimientoAx.formObservacion('${_tk_}',${e.id_propietario},'${e.nro_expediente}','PREC','CA'); });`;
                    break;
            }
            
            
            switch(e.estado_conversion_taller){
                case 'A':
                    etc = `<div class="label label-success">${APP_ETIQUET.aprobado}</div>`;
                    break;
                case 'P':
                    etc = `<div class="label label-default">${APP_ETIQUET.pendiente}</div>`;
                    break;
                case 'R':
                    etc = `<div class="label label-danger">${APP_ETIQUET.rechazado}</div>`;
                    break;
            }
            switch(e.estado_conversion_verifygas){
                case 'A':
                    evc = `<div class="label label-success">${APP_ETIQUET.aprobado}</div>`;
                    break;
                case 'P':
                    evc = `<div class="label label-default">${APP_ETIQUET.pendiente}</div>`;
                    break;
                case 'R':
                    evc = `<div class="label label-danger" id="d_conv_rchav">${APP_ETIQUET.rechazado}</div>`;
                    txtEval += `$('#d_conv_rchav').click(function(){ Obj.Proceso.SeguimientoAx.formObservacion('${_tk_}',${e.id_propietario},'${e.nro_expediente}','CONV','VG'); });`;
                    break;
            }
            switch(e.estado_conversion_calidda){
                case 'A':
                    ecc = `<div class="label label-success">${APP_ETIQUET.aprobado}</div>`;
                    break;
                case 'P':
                    ecc = `<div class="label label-success">${APP_ETIQUET.visualizacion}</div>`;
                    break;
                case 'R':
                    ecc = `<div class="label label-danger" id="d_conv_rchac">${APP_ETIQUET.rechazado}</div>`;
                    txtEval += `$('#d_conv_rchac').click(function(){ Obj.Proceso.SeguimientoAx.formObservacion('${_tk_}',${e.id_propietario},'${e.nro_expediente}','CONV','CA'); });`;
                    break;
            }
            
            switch(e.estado_entrega_taller){
                case 'A':
                    ete = `<div class="label label-success">${APP_ETIQUET.aprobado}</div>`;
                    break;
                case 'P':
                    ete = `<div class="label label-default">${APP_ETIQUET.pendiente}</div>`;
                    break;
                case 'R':
                    ete = `<div class="label label-danger">${APP_ETIQUET.rechazado}</div>`;
                    break;
            }
            switch(e.estado_entrega_verifygas){
                case 'A':
                    eve = `<div class="label label-success">${APP_ETIQUET.aprobado}</div>`;
                    break;
                case 'P':
                    eve = `<div class="label label-default">${APP_ETIQUET.pendiente}</div>`;
                    break;
                case 'R':
                    eve = `<div class="label label-danger">${APP_ETIQUET.rechazado}</div>`;
                    break;
                case 'F':
                    eve = `<div class="label label-success">${APP_ETIQUET.finalizado}</div>`;
                    break;
            }
            h += `
            <div class="bigBox col-sm-12 col-md-4 alert alert-success" style=" background:#f2f2f2; border-color:#206480;height:auto;float: left;margin-left:10px;margin-bottom: 10px;position: relative;z-index: 0;color:#000">
                <span>
                    <i class="fa fa-address-book"></i> ${e.nombre_completo}
                    <div id="${this._alias}${i}_tools" class="btn-group ">
                        <button data-toggle="dropdown" class="btn btn-default btn-xs dropdown-toggle" style="width:50px"><i class="fa fa-mixcloud"></i> <span class="caret" style="margin-top: -14px;float: right"></span></button>
                    </div>
                </span>
                <div>
                    <div class="row smart-form">
                        <section class="col col-12" style="width:100%">
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
                    <div class="well well-sm bg-color-darken txt-color-white text-center">
                        <code>${APP_ETIQUET.pre_conversion}</code> 
                        <table class="table table-bordered table-striped table-condensed table-hover has-tickbox" style="color:#333">
                            <thead>
                                <tr>
                                    <th class="text-center">${APP_ETIQUET.taller}</th>
                                    <th class="text-center">${APP_ETIQUET.verifygas}</th>
                                    <th class="text-center">${APP_ETIQUET.calidda}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-center">${et}</td>
                                    <td class="text-center">${ev}</td>
                                    <td class="text-center">${ec}</td>
                                </tr>
                            </tbody>
                        </table>
                        <code>${APP_ETIQUET.conversion}</code>
                        <table class="table table-bordered table-striped table-condensed table-hover has-tickbox" style="color:#333">
                            <thead>
                                <tr>
                                    <th class="text-center">${APP_ETIQUET.taller}</th>
                                    <th class="text-center">${APP_ETIQUET.verifygas}</th>
                                    <th class="text-center">${APP_ETIQUET.calidda}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-center">${etc}</td>
                                    <td class="text-center">${evc}</td>
                                    <td class="text-center">${ecc}</td>
                                </tr>
                            </tbody>
                        </table>
                        <code>${APP_ETIQUET.entrega2}</code>
                        <table class="table table-bordered table-striped table-condensed table-hover has-tickbox" style="color:#333">
                            <thead>
                                <tr>
                                    <th class="text-center">${APP_ETIQUET.taller}</th>
                                    <th class="text-center">${APP_ETIQUET.verifygas}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-center">${ete}</td>
                                    <td class="text-center">${eve}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br>
                   
                    
                </div>
            </div>`;
            //botones
            txtEval += `
                $.fn.appButton.get({
                    aliasBtn: '${i}',
                    container: '#${this._alias}${i}_tools',
                    keymnu: '${this._alias}',
                    type: 'li', 
                    //forceBtnXs: true,
                    btns: [
                        {keybtn: APP_BTN.PREXP, evts: [{click: 'Obj.Proceso.SeguimientoAx.printExpediente'}]},
                        {keybtn: APP_BTN.IMPRKNV, evts: [{click: 'Obj.Proceso.SeguimientoAx.printPreConversion'}]},
                        {keybtn: APP_BTN.HPRKNV, evts: [{click: 'Obj.Proceso.SeguimientoAx.printConversion'}]},
                        {keybtn: APP_BTN.HDENT, evts: [{click: 'Obj.Proceso.SeguimientoAx.printEntrega'}]}      
                    ]
                });
                $('#${this._alias}${i}_tools').data('propietario',${e.id_propietario});
            `;
        });

        if (data.length == 0) {
            h = `<div class="alert alert-info text-center"><i class="fa fa-info"></i> ${APP_ETIQUET.no_registros}</div>`;
        }
        $(`#${this._alias}d_vehiculo`).html(h);
        eval(txtEval);
        $(`#${this._alias}d_vehiculo`).find('._tools').find('.btn').css({
            padding: '5px'
        });
    }
    
};