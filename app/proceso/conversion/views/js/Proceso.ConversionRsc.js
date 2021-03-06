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
            $(`#${PREBTNCTXT}${this._alias}${APP_BTN.CLS}`).attr('data-dismiss', 'modal');
        });
    }
    
    addBtnClose() {
        $.fn.appButton.get({
            container: `#${this._alias}foot_btnsadj`,
            keymnu: this._alias,
            btns: [
                {keybtn: APP_BTN.CLS}
            ]
        });
    }

    setVehiculos(data) {
        let h = '', txtEval = '';

        $.each(data, (i, e) => {
            h += `
            <div class="bigBox col-sm-12 col-md-4 alert alert-success" style="background:#f2f2f2; border-color:#206480;height:auto;float: left;margin-left:10px;margin-bottom: 10px;position: relative;z-index: 0;color:#000">
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
                        {keybtn: APP_BTN.VWCONV, evts: [{click: 'Obj.Proceso.ConversionAx.formViewConversion'}]},
                        {keybtn: APP_BTN.KONV, evts: [{click: 'Obj.Proceso.ConversionAx.formConversion'}]},
                        {keybtn: APP_BTN.APR, evts: [{click: 'Obj.Proceso.ConversionAx.postAprobar'}]},
                        {keybtn: APP_BTN.RECH, evts: [{click: 'Obj.Proceso.ConversionAx.postRechazar'}]}
                    ]
                });
                $('#${this._alias}${i}_tools').data('propietario',${e.id_propietario});
                $('#${this._alias}${i}_tools').data('tieneconversion',${e.tiene_conversion});
                $('#${this._alias}${i}_tools').data('conformidadtodo',${e.conformidad_todo});
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

    setConversion(data, form) {
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

        let confTempConm = data.param_conf_temperatura_conmutacion.split('-');
        let stftb1CombustibleGNV = data.param_stftb1_combustible_gnv.split('*');
        let ltftb1CombustibleGNV = data.param_ltftb1_combustible_gnv.split('*');

        this._minPresionSalidaRegualdor = data.param_min_presion_salida_regulador;
        this._minConfTemperaturaConmutacion = confTempConm[0];
        this._maxConfTemperaturaConmutacion = confTempConm[1];
        this._minStftb1CombustibleGNV = stftb1CombustibleGNV[0];
        this._maxStftb1CombustibleGNV = stftb1CombustibleGNV[1];
        this._minLtftb1CombustibleGNV = ltftb1CombustibleGNV[0];
        this._maxLtftb1CombustibleGNV = ltftb1CombustibleGNV[1];
        this._maxGasesRalentiGasolinaCO = data.param_max_gas_ralenti_gasolina_co;
        this._maxGasesRalentiGasolinaHC = data.param_max_gas_ralenti_gasolina_hc;
        this._minGasesRalentiGasolinaCO2 = data.param_min_gas_ralenti_gasolina_co2;
        this._maxGasesRalentiGasolinaO2 = data.param_max_gas_ralenti_gasolina_o2;
        this._maxGasesRPMGasolinaCO = data.param_max_gas_rpm_gasolina_co;
        this._maxGasesRPMGasolinaHC = data.param_max_gas_rpm_gasolina_hc;
        this._minGasesRPMGasolinaCO2 = data.param_min_gas_rpm_gasolina_co2;
        this._maxGasesRPMGasolinaO2 = data.param_max_gas_rpm_gasolina_o2;
        this._maxGasesRalentiGnvCO = data.param_max_gas_ralenti_gnv_co;
        this._maxGasesRalentiGnvHC = data.param_max_gas_ralenti_gnv_hc;
        this._minGasesRalentiGnvCO2 = data.param_min_gas_ralenti_gnv_co2;
        this._maxGasesRalentiGnvO2 = data.param_max_gas_ralenti_gnv_o2;
        this._maxGasesRPMGnvCO = data.param_max_gas_rpm_gnv_co;
        this._maxGasesRPMGnvHC = data.param_max_gas_rpm_gnv_hc;
        this._minGasesRPMGnvCO2 = data.param_min_gas_rpm_gnv_co2;
        this._maxGasesRPMGnvO2 = data.param_max_gas_rpm_gnv_o2;
    }

    setEvents(tk) {
        $(`#${this._alias}txt_presion_salida_regulador`).keyup((e) => {
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
                if (number >= this._minPresionSalidaRegualdor) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadPresionSalidaRegualdor = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadPresionSalidaRegualdor = 0;
                }
            }
        });

        $(`#${this._alias}txt_configuracion_temperatura_conmutacion`).keyup((e) => {
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
                if (number >= this._minConfTemperaturaConmutacion && number <= this._maxConfTemperaturaConmutacion) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadConfTemperaturaConmutacion = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadConfTemperaturaConmutacion = 0;
                }
            }
        });

        $(`#${this._alias}txt_stft_b1_combustible_gnv`).keyup((e) => {
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
                if (number >= this._minStftb1CombustibleGNV && number <= this._maxStftb1CombustibleGNV) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadStftb1CombustibleGNV = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadStftb1CombustibleGNV = 0;
                }
            }
        });

        $(`#${this._alias}txt_ltft_b1_combustible_gnv`).keyup((e) => {
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
                if (number >= this._minLtftb1CombustibleGNV && number <= this._maxLtftb1CombustibleGNV) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadLtftb1CombustibleGNV = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadLtftb1CombustibleGNV = 0;
                }
            }
        });

        $(`#${this._alias}txt_analisis_gas_ralenti_gasolinaco`).keyup((e) => {
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
                if (number <= this._maxGasesRalentiGasolinaCO) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadGasesRalentiGasolinaCO = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadGasesRalentiGasolinaCO = 0;
                }
            }
        });

        $(`#${this._alias}txt_analisis_gas_ralenti_gasolinahc`).keyup((e) => {
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
                if (number <= this._maxGasesRalentiGasolinaHC) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadGasesRalentiGasolinaHC = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadGasesRalentiGasolinaHC = 0;
                }
            }
        });

        $(`#${this._alias}txt_hanalisis_gas_ralenti_gasolinaco2`).keyup((e) => {
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
                if (number >= this._minGasesRalentiGasolinaCO2) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadGasesRalentiGasolinaCO2 = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadGasesRalentiGasolinaCO2 = 0;
                }
            }
        });

        $(`#${this._alias}txt_analisis_gas_ralenti_gasolinao2`).keyup((e) => {
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
                if (number <= this._maxGasesRalentiGasolinaO2) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadGasesRalentiGasolinaO2 = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadGasesRalentiGasolinaO2 = 0;
                }
            }
        });

        $(`#${this._alias}txt_analisis_gas_rpm_gasolinaco`).keyup((e) => {
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
                if (number <= this._maxGasesRPMGasolinaCO) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadGasesRPMGasolinaCO = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadGasesRPMGasolinaCO = 0;
                }
            }
        });

        $(`#${this._alias}txt_analisis_gas_rpm_gasolinahc`).keyup((e) => {
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
                if (number <= this._maxGasesRPMGasolinaHC) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadGasesRPMGasolinaHC = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadGasesRPMGasolinaHC = 0;
                }
            }
        });

        $(`#${this._alias}txt_wanalisis_gas_rpm_gasolinaco2`).keyup((e) => {
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
                if (number >= this._minGasesRPMGasolinaCO2) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadGasesRPMGasolinaCO2 = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadGasesRPMGasolinaCO2 = 0;
                }
            }
        });

        $(`#${this._alias}txt_analisis_gas_rpm_gasolinao2`).keyup((e) => {
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
                if (number <= this._maxGasesRPMGasolinaO2) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadGasesRPMGasolinaO2 = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadGasesRPMGasolinaO2 = 0;
                }
            }
        });

        $(`#${this._alias}txt_analisis_gas_ralenti_gnvco`).keyup((e) => {
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
                if (number <= this._maxGasesRalentiGnvCO) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadGasesRalentiGnvCO = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadGasesRalentiGnvCO = 0;
                }
            }
        });

        $(`#${this._alias}txt_analisis_gas_ralenti_gnvhc`).keyup((e) => {
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
                if (number <= this._maxGasesRalentiGnvHC) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadGasesRalentiGnvHC = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadGasesRalentiGnvHC = 0;
                }
            }
        });

        $(`#${this._alias}txt_vanalisis_gas_ralenti_gnvco2`).keyup((e) => {
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
                if (number >= this._minGasesRalentiGnvCO2) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadGasesRalentiGnvCO2 = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadGasesRalentiGnvCO2 = 0;
                }
            }
        });

        $(`#${this._alias}txt_analisis_gas_ralenti_gnvo2`).keyup((e) => {
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
                if (number <= this._maxGasesRalentiGnvO2) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadGasesRalentiGnvO2 = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadGasesRalentiGnvO2 = 0;
                }
            }
        });

        $(`#${this._alias}txt_analisis_gas_rpm_gnvco`).keyup((e) => {
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
                if (number <= this._maxGasesRPMGnvCO) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadGasesRPMGnvCO = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadGasesRPMGnvCO = 0;
                }
            }
        });

        $(`#${this._alias}txt_analisis_gas_rpm_gnvhc`).keyup((e) => {
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
                if (number <= this._maxGasesRPMGnvHC) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadGasesRPMGnvHC = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadGasesRPMGnvHC = 0;
                }
            }
        });

        $(`#${this._alias}txt_ianalisis_gas_rpm_gnvco2`).keyup((e) => {
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
                if (number >= this._minGasesRPMGnvCO2) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadGasesRPMGnvCO2 = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadGasesRPMGnvCO2 = 0;
                }
            }
        });

        $(`#${this._alias}txt_analisis_gas_rpm_gnvo2`).keyup((e) => {
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
                if (number <= this._maxGasesRPMGnvO2) {
                    d_input.find('label.label').addClass('label-success').html(APP_ETIQUET.conforme);
                    this._conformidadGasesRPMGnvO2 = 1;
                } else {
                    d_input.find('label.label').addClass('label-danger').html(APP_ETIQUET.no_conforme);
                    this._conformidadGasesRPMGnvO2 = 0;
                }
            }
        });

        //eventos para uploads
        $(`#${this._alias}file_video_varios`).change((e) => {
            this.postUploadVideo(tk, 1, e.currentTarget);
        });
//        $(`#${this._alias}file_video_estado_funcionamiento_gnv`).change((e) => {
//            this.postUploadVideo(tk, 2, e.currentTarget);
//        });


        //ejecutar keyup de todos los input:text
        setTimeout(() => {
            $(`#${this._alias}txt_presion_salida_regulador`).keyup();
            $(`#${this._alias}txt_configuracion_temperatura_conmutacion`).keyup();

            $(`#${this._alias}txt_stft_b1_combustible_gnv`).keyup();

            $(`#${this._alias}txt_ltft_b1_combustible_gnv`).keyup();

            $(`#${this._alias}txt_analisis_gas_ralenti_gasolinaco`).keyup();

            $(`#${this._alias}txt_analisis_gas_ralenti_gasolinahc`).keyup();

            $(`#${this._alias}txt_hanalisis_gas_ralenti_gasolinaco2`).keyup();

            $(`#${this._alias}txt_analisis_gas_ralenti_gasolinao2`).keyup();

            $(`#${this._alias}txt_analisis_gas_rpm_gasolinaco`).keyup();

            $(`#${this._alias}txt_analisis_gas_rpm_gasolinahc`).keyup();

            $(`#${this._alias}txt_wanalisis_gas_rpm_gasolinaco2`).keyup();

            $(`#${this._alias}txt_analisis_gas_rpm_gasolinao2`).keyup();

            $(`#${this._alias}txt_analisis_gas_ralenti_gnvco`).keyup();

            $(`#${this._alias}txt_analisis_gas_ralenti_gnvhc`).keyup();

            $(`#${this._alias}txt_vanalisis_gas_ralenti_gnvco2`).keyup();

            $(`#${this._alias}txt_analisis_gas_ralenti_gnvo2`).keyup();

            $(`#${this._alias}txt_analisis_gas_rpm_gnvco`).keyup();

            $(`#${this._alias}txt_analisis_gas_rpm_gnvhc`).keyup();

            $(`#${this._alias}txt_ianalisis_gas_rpm_gnvco2`).keyup();

            $(`#${this._alias}txt_analisis_gas_rpm_gnvo2`).keyup();
        }, 500);
    }

    addBtnSaveConv() {
        $.fn.appButton.get({
            container: `#${this._alias}actions_cov`,
            keymnu: this._alias,
            btns: [
                {keybtn: APP_BTN.GRB, type: 'submit'},
                {keybtn: APP_BTN.GRBAPR, type: 'submit'},
                {keybtn: APP_BTN.CLS, evts: [{click: 'Obj.Proceso.ConversionAx.closeNewConversion'}]}
            ]
        }, (oSettings) => {
            $(`#${this._alias}actions_cov`).find('button').mouseover((e) => {
                if ($(e.currentTarget).hasClass('btn-success')) {
                    this._grabaAprueba = 1;
                } else {
                    this._grabaAprueba = 0;
                }
            });

        });
    }

    addBtnUpdtConv() {
        $.fn.appButton.get({
            container: `#${this._alias}actions_cov`,
            keymnu: this._alias,
            btns: [
                {keybtn: APP_BTN.UPD, type: 'submit'},
                {keybtn: APP_BTN.CLS, evts: [{click: 'Obj.Proceso.ConversionAx.closeNewConversion'}]}
            ]
        });
    }

    addBtnCloseViewConv() {
        $.fn.appButton.get({
            container: `#${this._alias}actions_vcov`,
            keymnu: this._alias,
            btns: [
                {keybtn: APP_BTN.CLS, evts: [{click: 'Obj.Proceso.ConversionAx.closeViewConversion'}]}
            ]
        });
    }

    isConforme() {
        if (!this._conformidadPresionSalidaRegualdor) {
            return false;
        }
        if (!this._conformidadConfTemperaturaConmutacion) {
            return false;
        }
        if (!this._conformidadStftb1CombustibleGNV) {
            return false;
        }
        if (!this._conformidadLtftb1CombustibleGNV) {
            return false;
        }
        if (!this._conformidadGasesRalentiGasolinaCO) {
            return false;
        }
        if (!this._conformidadGasesRalentiGasolinaHC) {
            return false;
        }
        if (!this._conformidadGasesRalentiGasolinaCO2) {
            return false;
        }
        if (!this._conformidadGasesRalentiGasolinaO2) {
            return false;
        }
        if (!this._conformidadGasesRPMGasolinaCO) {
            return false;
        }
        if (!this._conformidadGasesRPMGasolinaHC) {
            return false;
        }
        if (!this._conformidadGasesRPMGasolinaCO2) {
            return false;
        }
        if (!this._conformidadGasesRPMGasolinaO2) {
            return false;
        }
        if (!this._conformidadGasesRalentiGnvCO) {
            return false;
        }
        if (!this._conformidadGasesRalentiGnvHC) {
            return false;
        }
        if (!this._conformidadGasesRalentiGnvO2) {
            return false;
        }
        if (!this._conformidadGasesRPMGnvCO) {
            return false;
        }
        if (!this._conformidadGasesRPMGnvHC) {
            return false;
        }
        if (!this._conformidadGasesRPMGnvCO2) {
            return false;
        }
        if (!this._conformidadGasesRPMGnvO2) {
            return false;
        }
        
        if ($(`#${this._alias}lst_cilindro_gnv_texto`).val() == 0) {
            return false;
        }
        if ($(`#${this._alias}lst_tuberia_alta_presion_texto`).val() == 0) {
            return false;
        }
        if ($(`#${this._alias}lst_valvula_cilindro_texto`).val() == 0) {
            return false;
        }
        if ($(`#${this._alias}lst_valvula_carga_texto`).val() == 0) {
            return false;
        }
        if ($(`#${this._alias}lst_regulador_presion_texto`).val() == 0) {
            return false;
        }
        if ($(`#${this._alias}lst_entrega_gas_texto`).val() == 0) {
            return false;
        }
        if ($(`#${this._alias}lst_controlador_gas_texto`).val() == 0) {
            return false;
        }
        if ($(`#${this._alias}lst_conmutador_texto`).val() == 0) {
            return false;
        }
        if ($(`#${this._alias}lst_variador_avance_texto`).val() == 0) {
            return false;
        }
        if ($(`#${this._alias}lst_emulacion_inyectores_texto`).val() == 0) {
            return false;
        }
        if ($(`#${this._alias}lst_estado_funcionamiento_gnv_texto`).val() == 0) {
            return false;
        }


        return true;
    }

    setConversionData(data, form, viewVideos) {
        Tools.setDataForm(form, {
            alias: this._alias,
            elements: [
                {item: 'txt_marka_cilindro_gnv', value: data.marca_gnv},
                {item: 'txt_xerie_cilindro_gnv', value: data.serie_gnv},
                {item: 'txt_capacidad_litros', value: data.capacidad_litros},
                {item: 'txt_fecha_fabricacion', value: data.fecha_fabricacion},
                {item: 'txt_ubicacion_cuna_cilindro', value: data.ubicacion_cuna_cilindro},
                {item: 'lst_cilindro_gnv_texto', value: data.cilindro_gnv_texto, type: 'select'},
                {item: 'txt_narca_valvula', value: data.marca_valvula_cilindro},
                {item: 'lst_valvula_cilindro_texto', value: data.marca_valvula_cilindro_texto, type: 'select'},
                {item: 'lst_tuberia_alta_presion_texto', value: data.tuberia_alta_predion_texto, type: 'select'},
                {item: 'lst_valvula_carga_texto', value: data.valvula_carga_texto, type: 'select'},
                {item: 'txt_cerie_regulador_presion', value: data.serie_regulador_presion},
                {item: 'lst_regulador_presion_texto', value: data.regulador_presion_texto, type: 'select'},
                {item: 'txt_serhie_entrega_gas', value: data.serie_entrega_gas},
                {item: 'lst_entrega_gas_texto', value: data.entrega_gas_texto, type: 'select'},
                {item: 'txt_zerie_controlador_gas', value: data.serie_controlador_gas},
                {item: 'lst_controlador_gas_texto', value: data.controlador_gas_texto, type: 'select'},
                {item: 'txt_qerie_variador_avance', value: data.serie_variador_avance},
                {item: 'lst_variador_avance_texto', value: data.variador_avance_texto, type: 'select'},
                {item: 'lst_conmutador_texto', value: data.conmutador_texto, type: 'select'},
                {item: 'lst_emulacion_inyectores_texto', value: data.emulacion_inyectores_texto, type: 'select'},
                {item: 'txt_presion_salida_regulador', value: data.presion_salida_regulador},
                {item: 'txt_configuracion_temperatura_conmutacion', value: data.conf_temperatura_conmutacion},
                {item: 'txt_stft_b1_combustible_gnv', value: data.stft_b1_gnv},
                {item: 'txt_ltft_b1_combustible_gnv', value: data.ltft_b1_gnv},
                {item: 'txt_analisis_gas_ralenti_gasolinaco', value: data.gases_ralenti_gasolina_co},
                {item: 'txt_analisis_gas_ralenti_gasolinahc', value: data.gases_ralenti_gasolina_hc},
                {item: 'txt_hanalisis_gas_ralenti_gasolinaco2', value: data.gases_ralenti_gasolina_co2},
                {item: 'txt_analisis_gas_ralenti_gasolinao2', value: data.gases_ralenti_gasolina_o2},
                {item: 'txt_analisis_gas_rpm_gasolinaco', value: data.gases_rpm_gasolina_co},
                {item: 'txt_analisis_gas_rpm_gasolinahc', value: data.gases_rpm_gasolina_hc},
                {item: 'txt_wanalisis_gas_rpm_gasolinaco2', value: data.gases_rpm_gasolina_co2},
                {item: 'txt_analisis_gas_rpm_gasolinao2', value: data.gases_rpm_gasolina_o2},
                {item: 'txt_analisis_gas_ralenti_gnvco', value: data.gases_ralenti_gnv_co},
                {item: 'txt_analisis_gas_ralenti_gnvhc', value: data.gases_ralenti_gnv_hc},
                {item: 'txt_vanalisis_gas_ralenti_gnvco2', value: data.gases_ralenti_gnv_co2},
                {item: 'txt_analisis_gas_ralenti_gnvo2', value: data.gases_ralenti_gnv_o2},
                {item: 'txt_analisis_gas_rpm_gnvco', value: data.gases_rpm_gnv_co},
                {item: 'txt_analisis_gas_rpm_gnvhc', value: data.gases_rpm_gnv_hc},
                {item: 'txt_ianalisis_gas_rpm_gnvco2', value: data.gases_rpm_gnv_co2},
                {item: 'txt_analisis_gas_rpm_gnvo2', value: data.gases_rpm_gnv_o2},
                {item: 'lst_estado_funcionamiento_gnv_texto', value: data.estado_funcionamiento_texto, type: 'select'},
                {item: 'txt_entidad_financiera', value: data.entidad_certificadora}
            ]
        });
        this._conformeAll = data.conformidad_todo;
        if (viewVideos) {
            $(`#${this._alias}va_varios`).attr('href', `files/videos/${data.video_varios}`);
//            $(`#${this._alias}va_estado_funcionamiento`).attr('href', `files/videos/${data.video_estado_funcionamiento}`);
        }
    }

    setAdjuntosPendientes(data){
        $(`#${this._alias}d_nexp`).html(data.nro_expediente);
        
        let h = '<ol>';
        if(/null/.test(data.video_varios)){
            h += `<li>${APP_ETIQUET.video}</li>`;
        }
        h += '</ol>';
        
        $(`#${this._alias}d_pendientes`).html(h);
    }
    
};