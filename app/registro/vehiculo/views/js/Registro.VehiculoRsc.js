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

    addBtnSave() {
        $.fn.appButton.get({
            container: `#${this._alias}actions`,
            keymnu: this._alias,
            btns: [
                {keybtn: APP_BTN.GRB, type: 'submit'},
                {keybtn: APP_BTN.CLS, evts: [{click: 'Obj.Registro.VehiculoAx.closeNewVehiculo'}]}
            ]
        });
    }

    addBtnUpdate() {
        $.fn.appButton.get({
            container: `#${this._alias}actions`,
            keymnu: this._alias,
            btns: [
                {keybtn: APP_BTN.UPD, type: 'submit'},
                {keybtn: APP_BTN.CLS, evts: [{click: 'Obj.Registro.VehiculoAx.closeNewVehiculo'}]}
            ]
        });
    }
    
    addBtnSearch() {
        $.fn.appButton.get({
            container: `#${this._alias}btn_search`,
            keymnu: this._alias,
            btns: [
                {keybtn: APP_BTN.BUS, evts: [{click: 'Obj.Registro.VehiculoAx.postSearch'}]}
            ]
        });
    }

    getListBoxs(form) {
        $(form).appList({
            items: [
                {
                    data: 'pais',
                    container: `#${this._alias}d_pais`,
                    required: true,
                    attr: {
                        id: `${this._alias}lst_pais`,
                        name: `${this._alias}lst_pais`,
                        class: 'form-control'
                    },
                    default: null
                },
                {
                    data: 'estadocivil',
                    container: `#${this._alias}d_estadocivil`,
                    attr: {
                        id: `${this._alias}lst_estadocivil`,
                        name: `${this._alias}lst_estadocivil`,
                        class: 'form-control'
                    },
                    default: null
                },
                {
                    data: 'tipodocumentoidentidad',
                    container: `#${this._alias}d_tipodocumentoidentidad`,
                    required: true,
                    attr: {
                        id: `${this._alias}lst_tipodocumentoidentidad`,
                        name: `${this._alias}lst_tipodocumentoidentidad`,
                        class: 'form-control'
                    },
                    default: null
                }
            ]
        });
    }

    setEventsUploads(tk) {
        $(`#${this._alias}file_docidentidad`).change(() => {
            this.postUpload(tk, 1);
        });
        $(`#${this._alias}file_licenciaconducir`).change(() => {
            this.postUpload(tk, 2);
        });
        $(`#${this._alias}file_tarjetapropiedadimg`).change(() => {
            this.postUpload(tk, 3);
        });
        $(`#${this._alias}file_consentimiento`).change(() => {
            this.postUpload(tk, 4);
        });
        $(`#${this._alias}file_recibo`).change(() => {
            this.postUpload(tk, 5);
        });
        $(`#${this._alias}file_inscripcionmovil`).change(() => {
            this.postUpload(tk, 6);
        });
        $(`#${this._alias}file_revisiontecnica`).change(() => {
            this.postUpload(tk, 7);
        });
        $(`#${this._alias}file_soat`).change(() => {
            this.postUpload(tk, 8);
        });
        $(`#${this._alias}file_formatosolicitud`).change(() => {
            this.postUpload(tk, 9);
        });
        $(`#${this._alias}file_hojacalidda`).change(() => {
            this.postUpload(tk, 10);
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
                        <code>${APP_ETIQUET.documentos}</code>
                        <div><a href="files/docs_registro/${e.imagen_documento_identidad}" target="_blank" style="color:#fff">${APP_ETIQUET.img_doc_identidad}</a></div>
                        <div><a href="files/docs_registro/${e.imagen_licencia_conducir}" target="_blank" style="color:#fff">${APP_ETIQUET.img_licencia_conducir}</a></div>
                        <div><a href="files/docs_registro/${e.imagen_tarjeta_propiedad}" target="_blank" style="color:#fff">${APP_ETIQUET.img_tarjeta_propiedad}</a></div>
                        <div><a href="files/docs_registro/${e.imagen_consentimiento}" target="_blank" style="color:#fff">${APP_ETIQUET.img_consentimiento}</a></div>
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
                    ///notext: true,
                    //forceBtnXs: true,
                    btns: [
                        {keybtn: APP_BTN.EDT, evts: [{click: 'Obj.Registro.VehiculoAx.formEditVehiculo'}]},
                        {keybtn: APP_BTN.DEL, evts: [{click: 'Obj.Registro.VehiculoAx.postDelete'}]},
                        {keybtn: APP_BTN.APR, evts: [{click: 'Obj.Registro.VehiculoAx.postAprobar'}]},
                        {keybtn: APP_BTN.RECH, evts: [{click: 'Obj.Registro.VehiculoAx.postRechazar'}]}
                    ]
                });
                $('#${this._alias}${i}_tools').data('propietario',${e.id_propietario});
            `;
        });
        
        if(data.length == 0){
            h = `<div class="alert alert-info text-center"><i class="fa fa-info"></i> ${APP_ETIQUET.no_registros}</div>`;
        }
        $(`#${this._alias}d_vehiculo`).html(h);
        eval(txtEval);
        $(`#${this._alias}d_vehiculo`).find('._tools').find('.btn').css({
            padding: '5px'
        });
    }

    setVehiculo(data) {
        Tools.setDataForm(this._idFormVehiculoEdit, {
            alias: this._alias,
            elements: [
                {item: 'txt_primernombre', value: data.primer_nombre},
                {item: 'txt_segundonombre', value: data.segundo_nombre},
                {item: 'txt_apellidopaterno', value: data.apellido_paterno},
                {item: 'txt_apellidomaterno', value: data.apellido_materno},
                {item: 'lst_pais', value: data.id_pais, type: 'select'},
                {item: 'lst_estadocivil', value: data.id_estado_civil, type: 'select'},
                {item: 'lst_tipodocumentoidentidad', value: data.id_tipo_documento_identidad, type: 'select'},
                {item: 'txt_nrodocidentidad', value: data.documento_identidad},
                {item: 'txt_telefonocasa', value: data.telefono_casa},
                {item: 'txt_telefonotrabajo', value: data.telefono_trabajo},
                {item: 'txt_celular', value: data.celular},
                {item: 'txt_direcciondomicilio', value: data.direccion_domicilio},
                {item: 'txt_direcciontrabajo', value: data.direccion_trabajo},
                {item: 'txt_tarjetapropiedad', value: data.tarjeta},
                {item: 'txt_placa', value: data.placa},
                {item: 'txt_marca', value: data.marca},
                {item: 'txt_modelo', value: data.modelo},
                {item: 'txt_nromotor', value: data.numero_motor},
                {item: 'txt_serie', value: data.serie},
                {item: 'txt_aniofabricacion', value: data.anio_fabricacion},
                {item: 'txt_cilindrada', value: data.cilindrada},
                {item: 'txt_nrorevisiontecnica', value: data.revision_tecnica},
                {item: 'txt_fechainspeccion', value: data.fecha_inspeccion},
                {item: 'txt_soat', value: data.numero_poliza},
                {item: 'txt_fechavigenciasoat', value: data.fecha_poliza_vigencia}
            ]
        });
    }
};