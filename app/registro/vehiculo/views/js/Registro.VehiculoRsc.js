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
    
    addBtnSavePrec() {
        $.fn.appButton.get({
            container: `#${this._alias}actions_prec`,
            keymnu: this._alias,
            btns: [
                {keybtn: APP_BTN.GRB, type: 'submit'},
                {keybtn: APP_BTN.CLS, evts: [{click: 'Obj.Registro.VehiculoAx.closeNewPreconversion'}]}
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

    getListBoxPreConversion(form) {
        $(form).appList({
            items: [
                {
                    data: 'tiposistemaencendido',
                    container: `#${this._alias}d_tisisencendido`,
                    required: true,
                    attr: {
                        id: `${this._alias}lst_tiposistemaencendido`,
                        name: `${this._alias}lst_tiposistemaencendido`,
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
                    <div class="well well-sm bg-color-darken txt-color-white text-center">
                        <code>${APP_ETIQUET.documentos}</code>
                        <div><a href="files/docs_registro/${e.imagen_documento_identidad}" target="_blank" style="color:#fff">${APP_ETIQUET.img_doc_identidad}</a></div>
                        <div><a href="files/docs_registro/${e.imagen_licencia_conducir}" target="_blank" style="color:#fff">${APP_ETIQUET.img_licencia_conducir}</a></div>
                        <div><a href="files/docs_registro/${e.imagen_tarjeta_propiedad}" target="_blank" style="color:#fff">${APP_ETIQUET.img_tarjeta_propiedad}</a></div>
                        <div><a href="files/docs_registro/${e.imagen_consentimiento}" target="_blank" style="color:#fff">${APP_ETIQUET.img_consentimiento}</a></div>
                        <div><a href="files/docs_registro/${e.imagen_formulario_calidda}" target="_blank" style="color:#fff">${APP_ETIQUET.hoja_unica_datos}</a></div>
                        <div><a href="files/docs_registro/${e.imagen_movil}" target="_blank" style="color:#fff">${APP_ETIQUET.inscripcion_app_movil}</a></div>
                        <div><a href="files/docs_registro/${e.imagen_poliza}" target="_blank" style="color:#fff">${APP_ETIQUET.img_soat}</a></div>
                        <div><a href="files/docs_registro/${e.imagen_revision_tecnica}" target="_blank" style="color:#fff">${APP_ETIQUET.img_revision_tecnica}</a></div>
                        <div><a href="files/docs_registro/${e.imagen_servicio_publico}" target="_blank" style="color:#fff">${APP_ETIQUET.recibo_agua_luz_gas}</a></div>
                        <div><a href="files/docs_registro/${e.imagen_solicitud_cobranza}" target="_blank" style="color:#fff">${APP_ETIQUET.formato_solicitud_cobranza}</a></div>
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
                        {keybtn: APP_BTN.EDT, evts: [{click: 'Obj.Registro.VehiculoAx.formEditVehiculo'}]},
                        {keybtn: APP_BTN.DEL, evts: [{click: 'Obj.Registro.VehiculoAx.postDelete'}]},
                        {keybtn: APP_BTN.PRE, evts: [{click: 'Obj.Registro.VehiculoAx.formPreConversion'}]},
                        {keybtn: APP_BTN.APR, evts: [{click: 'Obj.Registro.VehiculoAx.postAprobar'}]},
                        {keybtn: APP_BTN.RECH, evts: [{click: 'Obj.Registro.VehiculoAx.postRechazar'}]}
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
                {item: 'txt_plaka', value: data.placa},
                {item: 'txt_marka', value: data.marca},
                {item: 'txt_model', value: data.modelo},
                {item: 'txt_nromotor', value: data.numero_motor},
                {item: 'txt_serye', value: data.serie},
                {item: 'txt_aniofabricacion', value: data.anio_fabricacion},
                {item: 'txt_cilindrada', value: data.cilindrada},
                {item: 'txt_nrorevisiontecnica', value: data.revision_tecnica},
                {item: 'txt_fechainspeccion', value: data.fecha_inspeccion},
                {item: 'txt_soat', value: data.numero_poliza},
                {item: 'txt_fechavigenciasoat', value: data.fecha_poliza_vigencia}
            ]
        });
    }

    setPreConversion(data) {
        Tools.setDataForm(this._idFormPreConversion, {
            alias: this._alias,
            elements: [
                {item: '_nombres', value: `${data.primer_nombre} ${data.segundo_nombre}`, type: 'html'},
                {item: '_apellidos', value: `${data.apellido_paterno} ${data.apellido_materno}`, type: 'html'},
                {item: '_celular', value: data.celurar, type: 'html'},
                {item: '_direccion', value: data.direccion, type: 'html'},
                {item: '_tipodoc', value: data.tipo_doc, type: 'html'},
                {item: '_num_doc', value: data.documento_identidad, type: 'html'},
                {item: '_placa', value: data.placa, type: 'html'},
                {item: '_marca', value: data.marca, type: 'html'},
                {item: '_modelo', value: data.modelo, type: 'html'},
                {item: '_serie', value: data.serie, type: 'html'},
                {item: '_cilindrada', value: data.cilindrada, type: 'html'}
            ]
        });
        //cargando parametro para min y max de voltios
        let apagado = data.param_apagado.split('-');
        let encendido = data.param_encendido.split('-');// es RALENTI
        let arranque = data.param_arranque.split('-');
        let rpm = data.param_rpm.split('-');
        let vmr = data.param_vacio_motor_ralenti.split('-');
        let stftb1 = data.param_stftb1.split('*');
        let ltftb1 = data.param_ltftb1.split('*');
        let cmp = data.param_sensor_cmp.split('-');
        let map = data.param_sensor_map.split('-');
        let tps = data.param_sensor_tps.split('-');
        let cils = data.param_cilindros.split('-');
        
        this._minVoltiosApagado = apagado[0];
        this._maxVoltiosApagado = apagado[1];
        this._minVoltiosArranque = arranque[0];
        this._maxVoltiosArranque = arranque[1];
        this._minVoltiosEncendido = encendido[0];
        this._maxVoltiosEncendido = encendido[1];
        this._minVoltios2500RPM = rpm[0];
        this._maxVoltios2500RPM = rpm[1];
        this._minVacioMotorRalenti = vmr[0];
        this._maxVacioMotorRalenti = vmr[1];
        this._maxGasRalentiCO = data.param_max_gas_ralenti_co;
        this._maxGasRalentiHC = data.param_max_gas_ralenti_hc;
        this._minGasRalentiCO2 = data.param_min_gas_ralenti_co2;
        this._maxGasRalentiO2 = data.param_min_gas_ralenti_o2;
        this._maxGasRPMCO = data.param_max_gas_rpm_co;
        this._maxGasRPMHC = data.param_max_gas_rpm_hc;
        this._minGasRPMCO2 = data.param_min_gas_rpm_co2;
        this._maxGasRPMO2 = data.param_max_gas_rpm_o2;
        this._minSTFTB1 = stftb1[0];
        this._maxSTFTB1 = stftb1[1];
        this._minLTFTB1 = ltftb1[0];
        this._maxLTFTB1 = ltftb1[1];
        this._minSensorCMP = cmp[0];
        this._maxSensorCMP = cmp[1];
        this._minSensorMAP = map[0];
        this._maxSensorMAP = map[1];
        this._minSensorTPS = tps[0];
        this._maxSensorTPS = tps[1];
        this._minCilindros = cils[0];
        this._maxCilindros = cils[1];
    }

    setEvents(tk) {

        $(`#${this._alias}txt_apagado`).keyup((e) => {
            let input, d_input, number, str;

            input = $(e.currentTarget);
            d_input = input.parent().parent('div');
            str = $.trim(input.val());
            number = parseFloat(str);

            d_input.find('label.label').removeClass('label-success');
            d_input.find('label.label').removeClass('label-danger');

            if (!$.isNumeric(number) && str.length > 0) {
                d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.numero_invalido);
            } else if ($.isNumeric(number)) {
                if (number >= this._minVoltiosApagado && number <= this._maxVoltiosApagado) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadVoltiosApagado = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadVoltiosApagado = 0;
                }
            }
        });

        $(`#${this._alias}txt_arranque`).keyup((e) => {
            let input, d_input, number, str;

            input = $(e.currentTarget);
            d_input = input.parent().parent('div');
            str = $.trim(input.val());
            number = parseFloat(str);

            d_input.find('label.label').removeClass('label-success');
            d_input.find('label.label').removeClass('label-danger');

            if (!$.isNumeric(number) && str.length > 0) {
                d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.numero_invalido);
            } else if ($.isNumeric(number)) {
                if (number >= this._minVoltiosArranque && number <= this._maxVoltiosArranque) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadArranque = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadArranque = 0;
                }
            }
        });

        $(`#${this._alias}txt_ralentibateria`).keyup((e) => {
            let input, d_input, number, str;

            input = $(e.currentTarget);
            d_input = input.parent().parent('div');
            str = $.trim(input.val());
            number = parseFloat(str);

            d_input.find('label.label').removeClass('label-success');
            d_input.find('label.label').removeClass('label-danger');

            if (!$.isNumeric(number) && str.length > 0) {
                d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.numero_invalido);
            } else if ($.isNumeric(number)) {
                if (number >= this._minVoltiosEncendido && number <= this._maxVoltiosEncendido) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadEncendido = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadEncendido = 0;
                }
            }
        });

        $(`#${this._alias}txt_2500rpm`).keyup((e) => {
            let input, d_input, number, str;

            input = $(e.currentTarget);
            d_input = input.parent().parent('div');
            str = $.trim(input.val());
            number = parseFloat(str);

            d_input.find('label.label').removeClass('label-success');
            d_input.find('label.label').removeClass('label-danger');

            if (!$.isNumeric(number) && str.length > 0) {
                d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.numero_invalido);
            } else if ($.isNumeric(number)) {
                if (number >= this._minVoltios2500RPM && number <= this._maxVoltios2500RPM) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidad2500RPM = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidad2500RPM = 0;
                }
            }
        });
        
        $(`#${this._alias}txt_ralentimotor`).keyup((e) => {
            let input, d_input, number, str;

            input = $(e.currentTarget);
            d_input = input.parent().parent('div');
            str = $.trim(input.val());
            number = parseFloat(str);

            d_input.find('label.label').removeClass('label-success');
            d_input.find('label.label').removeClass('label-danger');

            if (!$.isNumeric(number) && str.length > 0) {
                d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.numero_invalido);
            } else if ($.isNumeric(number)) {
                if (number >= this._minVacioMotorRalenti && number <= this._maxVacioMotorRalenti) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadVacioMotorRalenti = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadVacioMotorRalenti = 0;
                }
            }
        });
        
        $(`#${this._alias}txt_ralentianalisisgasesco`).keyup((e) => {
            let input, d_input, number, str;

            input = $(e.currentTarget);
            d_input = input.parent().parent('div');
            str = $.trim(input.val());
            number = parseFloat(str);

            d_input.find('label.label').removeClass('label-success');
            d_input.find('label.label').removeClass('label-danger');

            if (!$.isNumeric(number) && str.length > 0) {
                d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.numero_invalido);
            } else if ($.isNumeric(number)) {
                if (number <= this._maxGasRalentiCO) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadMaxGasRalentiCO = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadMaxGasRalentiCO = 0;
                }
            }
        });
        
        $(`#${this._alias}txt_ralentianalisisgaseshc`).keyup((e) => {
            let input, d_input, number, str;

            input = $(e.currentTarget);
            d_input = input.parent().parent('div');
            str = $.trim(input.val());
            number = parseFloat(str);

            d_input.find('label.label').removeClass('label-success');
            d_input.find('label.label').removeClass('label-danger');

            if (!$.isNumeric(number) && str.length > 0) {
                d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.numero_invalido);
            } else if ($.isNumeric(number)) {
                if (number <= this._maxGasRalentiHC) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadMaxGasRalentiHC = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadMaxGasRalentiHC = 0;
                }
            }
        });
        
        $(`#${this._alias}txt_ralentigasesco2`).keyup((e) => {
            let input, d_input, number, str;

            input = $(e.currentTarget);
            d_input = input.parent().parent('div');
            str = $.trim(input.val());
            number = parseFloat(str);

            d_input.find('label.label').removeClass('label-success');
            d_input.find('label.label').removeClass('label-danger');

            if (!$.isNumeric(number) && str.length > 0) {
                d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.numero_invalido);
            } else if ($.isNumeric(number)) {
                if (number >= this._minGasRalentiCO2) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadMinGasRalentiCO2 = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadMinGasRalentiCO2 = 0;
                }
            }
        });
        
        $(`#${this._alias}txt_ralentianalisisgaseso2`).keyup((e) => {
            let input, d_input, number, str;

            input = $(e.currentTarget);
            d_input = input.parent().parent('div');
            str = $.trim(input.val());
            number = parseFloat(str);

            d_input.find('label.label').removeClass('label-success');
            d_input.find('label.label').removeClass('label-danger');

            if (!$.isNumeric(number) && str.length > 0) {
                d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.numero_invalido);
            } else if ($.isNumeric(number)) {
                if (number <= this._maxGasRalentiO2) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadMaxGasRalentiO2 = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadMaxGasRalentiO2 = 0;
                }
            }
        });
        
        $(`#${this._alias}txt_analisisrpmco`).keyup((e) => {
            let input, d_input, number, str;

            input = $(e.currentTarget);
            d_input = input.parent().parent('div');
            str = $.trim(input.val());
            number = parseFloat(str);

            d_input.find('label.label').removeClass('label-success');
            d_input.find('label.label').removeClass('label-danger');

            if (!$.isNumeric(number) && str.length > 0) {
                d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.numero_invalido);
            } else if ($.isNumeric(number)) {
                if (number <= this._maxGasRPMCO) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadMaxGasRPMCO = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadMaxGasRPMCO = 0;
                }
            }
        });
        
        $(`#${this._alias}txt_analisisrpmhc`).keyup((e) => {
            let input, d_input, number, str;

            input = $(e.currentTarget);
            d_input = input.parent().parent('div');
            str = $.trim(input.val());
            number = parseFloat(str);

            d_input.find('label.label').removeClass('label-success');
            d_input.find('label.label').removeClass('label-danger');

            if (!$.isNumeric(number) && str.length > 0) {
                d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.numero_invalido);
            } else if ($.isNumeric(number)) {
                if (number <= this._maxGasRPMHC) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadMaxGasRPMHC = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadMaxGasRPMHC = 0;
                }
            }
        });
        
        $(`#${this._alias}txt_rpmco2`).keyup((e) => {
            let input, d_input, number, str;

            input = $(e.currentTarget);
            d_input = input.parent().parent('div');
            str = $.trim(input.val());
            number = parseFloat(str);

            d_input.find('label.label').removeClass('label-success');
            d_input.find('label.label').removeClass('label-danger');

            if (!$.isNumeric(number) && str.length > 0) {
                d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.numero_invalido);
            } else if ($.isNumeric(number)) {
                if (number >= this._minGasRPMCO2) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadMinGasRPMCO2 = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadMinGasRPMCO2 = 0;
                }
            }
        });
        
        $(`#${this._alias}txt_analisisrpmo2`).keyup((e) => {
            let input, d_input, number, str;

            input = $(e.currentTarget);
            d_input = input.parent().parent('div');
            str = $.trim(input.val());
            number = parseFloat(str);

            d_input.find('label.label').removeClass('label-success');
            d_input.find('label.label').removeClass('label-danger');

            if (!$.isNumeric(number) && str.length > 0) {
                d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.numero_invalido);
            } else if ($.isNumeric(number)) {
                if (number <= this._maxGasRPMO2) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadMaxGasRPMO2 = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadMaxGasRPMO2 = 0;
                }
            }
        });
        
        $(`#${this._alias}txt_stftb1`).keyup((e) => {
            let input, d_input, number, str;

            input = $(e.currentTarget);
            d_input = input.parent().parent('div');
            str = $.trim(input.val());
            number = parseFloat(str);

            d_input.find('label.label').removeClass('label-success');
            d_input.find('label.label').removeClass('label-danger');

            if (!$.isNumeric(number) && str.length > 0) {
                d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.numero_invalido);
            } else if ($.isNumeric(number)) {
                if (number >= this._minSTFTB1 && number <= this._maxSTFTB1) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadSTFTB1 = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadSTFTB1 = 0;
                }
            }
        });
        
        $(`#${this._alias}txt_ltftb1`).keyup((e) => {
            let input, d_input, number, str;

            input = $(e.currentTarget);
            d_input = input.parent().parent('div');
            str = $.trim(input.val());
            number = parseFloat(str);

            d_input.find('label.label').removeClass('label-success');
            d_input.find('label.label').removeClass('label-danger');

            if (!$.isNumeric(number) && str.length > 0) {
                d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.numero_invalido);
            } else if ($.isNumeric(number)) {
                if (number >= this._minLTFTB1 && number <= this._maxLTFTB1) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadLTFTB1 = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadLTFTB1 = 0;
                }
            }
        });
        
        $(`#${this._alias}txt_sensor_cmp`).keyup((e) => {
            let input, d_input, number, str;

            input = $(e.currentTarget);
            d_input = input.parent().parent('div');
            str = $.trim(input.val());
            number = parseFloat(str);

            d_input.find('label.label').removeClass('label-success');
            d_input.find('label.label').removeClass('label-danger');

            if (!$.isNumeric(number) && str.length > 0) {
                d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.numero_invalido);
            } else if ($.isNumeric(number)) {
                if (number >= this._minSensorCMP && number <= this._maxSensorCMP) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadSensorCMP = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadSensorCMP = 0;
                }
            }
        });
        
        $(`#${this._alias}txt_sensor_map`).keyup((e) => {
            let input, d_input, number, str;

            input = $(e.currentTarget);
            d_input = input.parent().parent('div');
            str = $.trim(input.val());
            number = parseFloat(str);

            d_input.find('label.label').removeClass('label-success');
            d_input.find('label.label').removeClass('label-danger');

            if (!$.isNumeric(number) && str.length > 0) {
                d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.numero_invalido);
            } else if ($.isNumeric(number)) {
                if (number >= this._minSensorMAP && number <= this._maxSensorMAP) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadSensorMAP = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadSensorMAP = 0;
                }
            }
        });
        
        $(`#${this._alias}txt_sensor_tps`).keyup((e) => {
            let input, d_input, number, str;

            input = $(e.currentTarget);
            d_input = input.parent().parent('div');
            str = $.trim(input.val());
            number = parseFloat(str);

            d_input.find('label.label').removeClass('label-success');
            d_input.find('label.label').removeClass('label-danger');

            if (!$.isNumeric(number) && str.length > 0) {
                d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.numero_invalido);
            } else if ($.isNumeric(number)) {
                if (number >= this._minSensorTPS && number <= this._maxSensorTPS) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadSensorTPS = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadSensorTPS = 0;
                }
            }
        });
        
        $(`#${this._alias}txt_ciclindro1`).keyup((e) => {
            let input, d_input, number, str;

            input = $(e.currentTarget);
            d_input = input.parent().parent('div');
            str = $.trim(input.val());
            number = parseFloat(str);

            d_input.find('label.label').removeClass('label-success');
            d_input.find('label.label').removeClass('label-danger');

            if (!$.isNumeric(number) && str.length > 0) {
                d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.numero_invalido);
            } else if ($.isNumeric(number)) {
                if (number >= this._minCilindros && number <= this._maxCilindros) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadCilindro1 = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadCilindro1 = 0;
                }
            }
        });
        
        $(`#${this._alias}txt_ciclindro2`).keyup((e) => {
            let input, d_input, number, str;

            input = $(e.currentTarget);
            d_input = input.parent().parent('div');
            str = $.trim(input.val());
            number = parseFloat(str);

            d_input.find('label.label').removeClass('label-success');
            d_input.find('label.label').removeClass('label-danger');

            if (!$.isNumeric(number) && str.length > 0) {
                d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.numero_invalido);
            } else if ($.isNumeric(number)) {
                if (number >= this._minCilindros && number <= this._maxCilindros) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadCilindro2 = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadCilindro2 = 0;
                }
            }
        });
        
        $(`#${this._alias}txt_ciclindro3`).keyup((e) => {
            let input, d_input, number, str;

            input = $(e.currentTarget);
            d_input = input.parent().parent('div');
            str = $.trim(input.val());
            number = parseFloat(str);

            d_input.find('label.label').removeClass('label-success');
            d_input.find('label.label').removeClass('label-danger');

            if (!$.isNumeric(number) && str.length > 0) {
                d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.numero_invalido);
            } else if ($.isNumeric(number)) {
                if (number >= this._minCilindros && number <= this._maxCilindros) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadCilindro3 = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadCilindro3 = 0;
                }
            }
        });
        
        $(`#${this._alias}txt_ciclindro4`).keyup((e) => {
            let input, d_input, number, str;

            input = $(e.currentTarget);
            d_input = input.parent().parent('div');
            str = $.trim(input.val());
            number = parseFloat(str);

            d_input.find('label.label').removeClass('label-success');
            d_input.find('label.label').removeClass('label-danger');

            if (!$.isNumeric(number) && str.length > 0) {
                d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.numero_invalido);
            } else if ($.isNumeric(number)) {
                if (number >= this._minCilindros && number <= this._maxCilindros) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadCilindro4 = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadCilindro4 = 0;
                }
            }
        });
        
        //eventos para uploads
        $(`#${this._alias}VEH__file_videovaciomotorralenti`).change(() => {
            this.postUpload(tk, 1);
        });
        $(`#${this._alias}VEH__file_videovralentianalisisgases`).change(() => {
            this.postUpload(tk, 2);
        });
        $(`#${this._alias}VEH__file_videovrpmanalisisgases`).change(() => {
            this.postUpload(tk, 3);
        });
        $(`#${this._alias}VEH__file_videostftb1`).change(() => {
            this.postUpload(tk, 4);
        });
        $(`#${this._alias}VEH__file_videoltftb1`).change(() => {
            this.postUpload(tk, 5);
        });
        $(`#${this._alias}VEH__file_videocilindro`).change(() => {
            this.postUpload(tk, 6);
        });
    }

};