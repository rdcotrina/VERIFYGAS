/* 
* ---------------------------------------
* --------- CREATED BY LV ----------
* Autor:        Super 
* Fecha:        08-06-2018 07:06:19 
* Descripcion : EntregaRsc.js
* ---------------------------------------
*/ 
"use strict";

$$.Proceso.EntregaRsc = class EntregaRsc extends Resource {
    
    constructor() {
        super();
    }
    
    addBtnSearch() {
        $.fn.appButton.get({
            container: `#${this._alias}btn_search`,
            keymnu: this._alias,
            btns: [
                {keybtn: APP_BTN.BUS, evts: [{click: 'Obj.Proceso.EntregaAx.postSearch'}]}
            ]
        });
    }
    
    addBtnSave() {
        $.fn.appButton.get({
            container: `#${this._alias}actions`,
            keymnu: this._alias,
            btns: [
                {keybtn: APP_BTN.GRB, type: 'submit'},
                {keybtn: APP_BTN.GRBAPR, type: 'submit'},
                {keybtn: APP_BTN.CLS, evts: [{click: 'Obj.Proceso.EntregaAx.closeEntrega'}]}
            ]
        }, (oSettings) => {
            $(`#${this._alias}actions`).find('button').mouseover((e) => {
                if ($(e.currentTarget).hasClass('btn-success')) {
                    this._grabaAprueba = 1;
                } else {
                    this._grabaAprueba = 0;
                }
                console.log(this._grabaAprueba);
            });

        });
    }
    
    addBtnClose(){
        $.fn.appButton.get({
            container: `#${this._alias}actions`,
            keymnu: this._alias,
            btns: [
                {keybtn: APP_BTN.CLS, evts: [{click: 'Obj.Proceso.EntregaAx.closeEntrega'}]}
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
            <div class="bigBox col-sm-12 col-md-4 alert alert-success" style="background:#f2f2f2; border-color:#206480;height:200px;float: left;margin-left:10px;margin-bottom: 10px;position: relative;z-index: 0;color:#000">
                <span>
                    <i class="fa fa-address-book"></i> ${e.nombre_completo}
                </span>
                <div class="smart-form">
                    <div class="row">
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
                    //notext: true,
                    //forceBtnXs: true,
                    btns: [
                        {keybtn: APP_BTN.ENT, evts: [{click: 'Obj.Proceso.EntregaAx.formEntrega'}]},
                        {keybtn: APP_BTN.VENT, evts: [{click: 'Obj.Proceso.EntregaAx.formViewEntrega'}]},
                        {keybtn: APP_BTN.FIN, evts: [{click: 'Obj.Proceso.EntregaAx.postFinalizar'}]}
                    ]
                });
                $('#${this._alias}${i}_tools').data('propietario',${e.id_propietario});
                $('#${this._alias}${i}_tools').data('tiene_entrega',${e.tiene_entrega});
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
    
    setPropietario(data, form) {
        Tools.setDataForm(form, {
            alias: this._alias,
            elements: [
                {item: '_nombres', value: `${data.primer_nombre} ${data.segundo_nombre}`, type: 'html'},
                {item: '_apellidos', value: `${data.apellido_paterno} ${data.apellido_materno}`, type: 'html'},
                {item: '_celular', value: data.celular, type: 'html'},
                {item: '_direccion', value: data.direccion_domicilio, type: 'html'},
                {item: '_tipodoc', value: data.tipo_doc, type: 'html'},
                {item: '_num_doc', value: data.documento_identidad, type: 'html'},
                {item: '_placa', value: data.placa, type: 'html'},
                {item: '_marca', value: data.marca, type: 'html'},
                {item: '_modelo', value: data.modelo, type: 'html'},
                {item: '_serie', value: data.serie, type: 'html'},
                {item: '_cilindrada', value: data.cilindrada, type: 'html'}
            ]
        });
    }
    
    setEntrega(data){
        $(`#${this._alias}va_escaneo_1`).attr('href', `files/entrega/${data.escaneo_1}`);
        $(`#${this._alias}va_escaneo_2`).attr('href', `files/entrega/${data.escaneo_2}`);
        $(`#${this._alias}va_escaneo_4`).attr('href', `files/entrega/${data.escaneo_4}`);
        $(`#${this._alias}va_escaneo_5`).attr('href', `files/entrega/${data.escaneo_5}`);
        $(`#${this._alias}va_escaneo_11`).attr('href', `files/entrega/${data.escaneo_11}`);
        $(`#${this._alias}va_escaneo_13`).attr('href', `files/entrega/${data.escaneo_13}`);
    }
    
    setEvents(tk){
        //eventos para uploads
        $(`#${this._alias}file_escaneo_1`).change(() => {
            this.postUpload(tk, 1);
        });
        $(`#${this._alias}file_escaneo_2`).change(() => {
            this.postUpload(tk, 2);
        });
        $(`#${this._alias}file_escaneo_3`).change(() => {
            this.postUpload(tk, 3);
        });
        $(`#${this._alias}file_escaneo_4`).change(() => {
            this.postUpload(tk, 4);
        });
        $(`#${this._alias}file_escaneo_5`).change(() => {
            this.postUpload(tk, 5);
        });
        $(`#${this._alias}file_escaneo_6`).change(() => {
            this.postUpload(tk, 6);
        });
        $(`#${this._alias}file_escaneo_7`).change(() => {
            this.postUpload(tk, 7);
        });
        $(`#${this._alias}file_escaneo_8`).change(() => {
            this.postUpload(tk, 8);
        });
        $(`#${this._alias}file_escaneo_9`).change(() => {
            this.postUpload(tk, 9);
        });
        $(`#${this._alias}aile_escaneo_10`).change(() => {
            this.postUpload(tk, 10);
        });
        $(`#${this._alias}txt_escaneo_11`).change(() => {
            this.postUpload(tk, 11);
        });
        $(`#${this._alias}txt_escaneo_12`).change(() => {
            this.postUpload(tk, 12);
        });
        $(`#${this._alias}txt_escaneo_13`).change(() => {
            this.postUpload(tk, 13);
        });
        $(`#${this._alias}txt_escaneo_14`).change(() => {
            this.postUpload(tk,14);
        });
    }
    
};