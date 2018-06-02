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

    getListBoxs() {
        $(this._idFormVehiculo).appList({
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
            this.postUpload(tk,1);
        });
        $(`#${this._alias}file_licenciaconducir`).change(() => {
            this.postUpload(tk,2);
        });
        $(`#${this._alias}file_tarjetapropiedadimg`).change(() => {
            this.postUpload(tk,3);
        });
        $(`#${this._alias}file_consentimiento`).change(() => {
            this.postUpload(tk,4);
        });
        $(`#${this._alias}file_recibo`).change(() => {
            this.postUpload(tk,5);
        });
        $(`#${this._alias}file_inscripcionmovil`).change(() => {
            this.postUpload(tk,6);
        });
        $(`#${this._alias}file_revisiontecnica`).change(() => {
            this.postUpload(tk,7);
        });
        $(`#${this._alias}file_soat`).change(() => {
            this.postUpload(tk,8);
        });
        $(`#${this._alias}file_formatosolicitud`).change(() => {
            this.postUpload(tk,9);
        });
        $(`#${this._alias}file_hojacalidda`).change(() => {
            this.postUpload(tk,10);
        });
    }

};