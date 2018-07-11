/* 
 * ---------------------------------------
 * --------- CREATED BY LV ----------
 * Autor:        Super 
 * Fecha:        02-07-2018 01:07:47 
 * Descripcion : InformeRsc.js
 * ---------------------------------------
 */
"use strict";
$$.Reporte.InformeRsc = class InformeRsc extends Resource {

    constructor() {
        super();
        this._renderDias = (d) => {
            let ds = '', i = 1, totalDias = [];
            for (i; i <= d; i++) {
                totalDias[`1dia_${i}`] = 0;
                totalDias[`2dia_${i}`] = 0;
                totalDias[`3dia_${i}`] = 0;
                totalDias[`4dia_${i}`] = 0;
                totalDias[`5dia_${i}`] = 0;
                ds += `<th>${i}</th>`;
            }
            return {ds: ds, tdias: totalDias};
        };
        this._getResultados = (data, tipo, taller, total, totalDias) => {
            let ds = '', i = 1, result = [];
            for (i; i <= data[0].dias; i++) {
                result = $.grep(data, function (e) {
                    return e.id_taller == taller && e.dia == i;
                });
                switch (tipo) {
                    case 1:
                        total += (result.length == 0) ? 0 : parseInt(result[0].preconversion_rechazada);
                        totalDias[`1dia_${i}`] += (result.length == 0) ? 0 : parseInt(result[0].preconversion_rechazada);
                        ds += `<td>${(result.length == 0) ? 0 : result[0].preconversion_rechazada}</td>`;
                        break;
                    case 2:
                        total += (result.length == 0) ? 0 : parseInt(result[0].conversiones_recibidas);
                        totalDias[`2dia_${i}`] += (result.length == 0) ? 0 : parseInt(result[0].conversiones_recibidas);
                        ds += `<td>${(result.length == 0) ? 0 : result[0].conversiones_recibidas}</td>`;
                        break;
                    case 3:
                        total += (result.length == 0) ? 0 : parseInt(result[0].conversiones_rechazadas);
                        totalDias[`3dia_${i}`] += (result.length == 0) ? 0 : parseInt(result[0].conversiones_rechazadas);
                        ds += `<td>${(result.length == 0) ? 0 : result[0].conversiones_rechazadas}</td>`;
                        break;
                    case 4:
                        total += (result.length == 0) ? 0 : parseInt(result[0].conversiones_aprobadas);
                        totalDias[`4dia_${i}`] += (result.length == 0) ? 0 : parseInt(result[0].conversiones_aprobadas);
                        ds += `<td>${(result.length == 0) ? 0 : result[0].conversiones_aprobadas}</td>`;
                        break;
                    case 5:
                        total += (result.length == 0) ? 0 : parseInt(result[0].conversiones_financiadas);
                        totalDias[`5dia_${i}`] += (result.length == 0) ? 0 : parseInt(result[0].conversiones_financiadas);
                        ds += `<td>${(result.length == 0) ? 0 : result[0].conversiones_financiadas}</td>`;
                        break;
                }

            }
            return {ds: ds, total: total, tdias: totalDias};
        };

        this._getTotalDia = (data, tipo, dias) => {
            let ds = '', i = 1, total = 0, rs;
            for (i; i <= dias; i++) {
                rs = data[`${tipo}dia_${i}`];
                ds += `<th>${rs}</th>`;
                total += parseInt(rs);
            }
            return {ds: ds, t: total};
        };

        this._renderInformeMes = (data) => {
            let cont = $(`#${this._alias}d_informeM`);
            let t, total1 = 0, total2 = 0, total3 = 0, total4 = 0, total5 = 0, reg1, reg2, reg3, reg4, reg5,
                    h, ttottal1 = 0, ttottal2 = 0, ttottal3 = 0, ttottal4 = 0, ttottal5 = 0;
            if (data.talleres_mes.length == 0) {
                t = `<div class="alert alert-info fade in">
                    <i class="fa-fw fa fa-info"></i>
                    <strong>${APP_ETIQUET.no_registros}</strong> 
                </div>`;
            } else {
                h = this._renderDias(data.talleres_mes[0].dias);
                t = `
                <table class="table table-bordered table-striped table-condensed table-hover smart-form has-tickbox">
                    <caption class="text-center">Año ${data.talleres_mes[0].anio}</caption>
                    <thead>
                        <tr>
                            <th class="text-center" style="width: 150px">${APP_ETIQUET.talleres}</th>
                            <th class="text-center">${APP_ETIQUET.kpi}</th>
                            ${h.ds}
                            <th class="text-center">${APP_ETIQUET.total}</th>
                        </tr>
                    </thead>
                    <tbody>
                `;
                $.each(data.talleres_mes, (i, v) => {
                    reg1 = this._getResultados(data.resultados_mes, 1, v.id_taller, total1, h.tdias);
                    reg2 = this._getResultados(data.resultados_mes, 2, v.id_taller, total2, h.tdias);
                    reg3 = this._getResultados(data.resultados_mes, 3, v.id_taller, total3, h.tdias);
                    reg4 = this._getResultados(data.resultados_mes, 4, v.id_taller, total4, h.tdias);
                    reg5 = this._getResultados(data.resultados_mes, 5, v.id_taller, total5, h.tdias);
                    t += `
                    <tr>
                        <th rowspan="5" style="vertical-align:middle">${v.taller}</th>
                        <td>${APP_ETIQUET.preconversiones_rechazadas_tecnicamente}</td>
                        ${reg1.ds}
                        <th class="text-center">${reg1.total}</th>
                    </tr>
                    <tr>
                        <td>${APP_ETIQUET.conversiones_recibidas}</td>
                        ${reg2.ds}
                        <th class="text-center">${reg2.total}</th>
                    </tr>
                    <tr>
                        <td>${APP_ETIQUET.conversiones_rechazadas}</td>
                        ${reg3.ds}
                        <th class="text-center">${reg3.total}</th>
                    </tr>
                    <tr>
                        <td>${APP_ETIQUET.conversiones_aprobadas}</td>
                        ${reg4.ds}
                        <th class="text-center">${reg4.total}</th>
                    </tr>
                    <tr>
                        <td>${APP_ETIQUET.conversiones_financiadas}</td>
                        ${reg5.ds}
                        <th class="text-center">${reg5.total}</th>
                    </tr>`;
                });
                ttottal1 = this._getTotalDia(reg1.tdias, 1, data.resultados_mes[0].dias);
                ttottal2 = this._getTotalDia(reg2.tdias, 2, data.resultados_mes[0].dias);
                ttottal3 = this._getTotalDia(reg3.tdias, 3, data.resultados_mes[0].dias);
                ttottal4 = this._getTotalDia(reg4.tdias, 4, data.resultados_mes[0].dias);
                ttottal5 = this._getTotalDia(reg5.tdias, 5, data.resultados_mes[0].dias);
                t += `
                        <tr style="background:#333;color:#fff">
                            <th rowspan="5" style="vertical-align:middle;">${APP_ETIQUET.consolidado_mes}</th>
                            <td>${APP_ETIQUET.preconversiones_rechazadas_tecnicamente}</td>
                            ${ttottal1.ds}
                            <th class="text-center">${ttottal1.t}</th>
                        </tr>
                        <tr style="background:#333;color:#fff">
                            <td>${APP_ETIQUET.conversiones_recibidas}</td>
                            ${ttottal2.ds}
                            <th class="text-center">${ttottal2.t}</th>
                        </tr>
                        <tr style="background:#333;color:#fff">
                            <td>${APP_ETIQUET.conversiones_rechazadas}</td>
                            ${ttottal3.ds}
                            <th class="text-center">${ttottal3.t}</th>
                        </tr>
                        <tr style="background:#333;color:#fff">
                            <td>${APP_ETIQUET.conversiones_aprobadas}</td>
                            ${ttottal4.ds}
                            <th class="text-center">${ttottal4.t}</th>
                        </tr>
                        <tr style="background:#333;color:#fff">
                            <td>${APP_ETIQUET.conversiones_financiadas}</td>
                            ${ttottal5.ds}
                            <th class="text-center">${ttottal5.t}</th>
                        </tr>
                    </tbody>
                </table>`;
            }
            cont.html(t);
        };

        this._renderInformeAnio = (data) => {
            let cont = $(`#${this._alias}d_informeA`);
            let t;

            if (data.talleres_anio.length == 0) {
                t = `<div class="alert alert-info fade in">
                    <i class="fa-fw fa fa-info"></i>
                    <strong>${APP_ETIQUET.no_registros}</strong> 
                </div>`;
            } else {
                t = `
                <table class="table table-bordered table-striped table-condensed table-hover smart-form has-tickbox">
                    <caption class="text-center">Año ${data.talleres_mes[0].anio}</caption>
                    <thead>
                        <tr>
                            <th class="text-center" style="width: 150px">${APP_ETIQUET.talleres}</th>
                            <th class="text-center">${APP_ETIQUET.kpi}</th>
                            <th class="text-center">${APP_ETIQUET.enero}</th>
                            <th class="text-center">${APP_ETIQUET.febrero}</th>
                            <th class="text-center">${APP_ETIQUET.marzo}</th>
                            <th class="text-center">${APP_ETIQUET.abril}</th>
                            <th class="text-center">${APP_ETIQUET.mayo}</th>
                            <th class="text-center">${APP_ETIQUET.junio}</th>
                            <th class="text-center">${APP_ETIQUET.julio}</th>
                            <th class="text-center">${APP_ETIQUET.agosto}</th>
                            <th class="text-center">${APP_ETIQUET.setiembre}</th>
                            <th class="text-center">${APP_ETIQUET.octubre}</th>
                            <th class="text-center">${APP_ETIQUET.noviembre}</th>
                            <th class="text-center">${APP_ETIQUET.diciembre}</th>
                            <th class="text-center">${APP_ETIQUET.total}</th>
                        </tr>
                    </thead>
                    <tbody>
                `;
                $.each(data.talleres_anio, (i, v) => {
                    t += `
                    <tr>
                        <th rowspan="5" style="vertical-align:middle">${v.taller}</th>
                        <td>${APP_ETIQUET.preconversiones_rechazadas_tecnicamente}</td>
                        
                        <th class="text-center">0</th>
                    </tr>
                    <tr>
                        <td>${APP_ETIQUET.conversiones_recibidas}</td>
                        
                        <th class="text-center">0</th>
                    </tr>
                    <tr>
                        <td>${APP_ETIQUET.conversiones_rechazadas}</td>
                        
                        <th class="text-center">0</th>
                    </tr>
                    <tr>
                        <td>${APP_ETIQUET.conversiones_aprobadas}</td>
                        
                        <th class="text-center">0</th>
                    </tr>
                    <tr>
                        <td>${APP_ETIQUET.conversiones_financiadas}</td>
                        
                        <th class="text-center">0</th>
                    </tr>`;
                });
                t += `
                      
                    </tbody>
                </table>`;
            }
            cont.html(t);
        };

    }

    addBtnSearch() {
        $.fn.appButton.get({
            container: `#${this._alias}btn_search`,
            keymnu: this._alias,
            btns: [
                {keybtn: APP_BTN.BUS, type: 'submit'}
            ]
        });
    }

    setInforme(data) {
        this._renderInformeMes(data);
        this._renderInformeAnio(data);
    }

};