/* 
 * ---------------------------------------
 * --------- CREATED BY LV ----------
 * Autor:        Super 
 * Fecha:        26-05-2018 04:05:26 
 * Descripcion : VehiculoAx.js
 * ---------------------------------------
 */
"use strict";

$$.Registro.VehiculoAx = class VehiculoAx extends $$.Registro.VehiculoRsc {

    constructor() {
        super();
        this._controller = 'vehiculo:';
        this._alias = Exe.getAlias();
        this._dmain = `#${this._alias}${APP_CONTAINER_TABS}`; /*contenedor principal de opcion*/
        this._tour = Obj.Registro.VehiculoTour;
        this._idFormVehiculo = `#${this._alias}formVehiculo`;
        this._imgConsentimiento = null;
        this._imgDocIdentidad = null;
        this._imgFormatoSolicitud = null;
        this._imgHojaCalidda = null;
        this._imgInscripcionMovil = null;
        this._imgLicenciaConducir = null;
        this._imgRecibo = null;
        this._imgRevisionTecnica = null;
        this._imgSoat = null;
        this._imgTarjetaPropiedad = null;

        this._formIndex = (tk) => {
            this.send({
                token: tk,
                context: this,
                dataType: 'text',
                tour: true,
                response: (data) => {
                    $(this._dmain).append(data);
                },
                final: (obj) => {
                    //escriba aqui, se ejecutara una vez haya cargado el HTML
                    //Tools.addTourMain.call(this);
                    this.addBtnNew();
                    $(`#${this._alias}d_vehiculo`).html(`<div class="text-center">${Tools.spinner().main}</div>`);
                }
            });
        };

        this._formVehiculo = (tk) => {
            this._imgLoads = [];
            this.send({
                token: tk,
                context: this,
                dataType: 'text',
//                serverParams: (sData, obj) => {
//                    sData.push({name: '_keyVehiculo', value: this._keyMenu});
//                },
                response: (data) => {
                    $(`#${this._alias}-NWV${APP_CONTAINER_TABS}`).html(data);
                },
                finally: (data) => {
                    this.addBtnSave();
                    this.getListBoxs();
                    this.setEventsUploads(tk);
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

    formNewVehiculo(btn, tk) {
        Tools.addTab({
            context: this,
            id: `${this._alias}-NWV`,
            label: APP_ETIQUET.registrar_vehiculo,
            fnCallback: () => {
                this._formVehiculo(tk);
            }
        });
    }

    postNew(tk) {
        this.send({
            flag: 1,
            token: tk,
            element: `#${PREBTNCTXT}${this._alias}${APP_BTN.GRB}`,
            context: this,
            form: this._idFormVehiculo,
            formData: true,
            serverParams: (sData, obj) => {
                sData.push({name: '_imgConsentimiento', value: this._imgConsentimiento});
                sData.push({name: '_imgDocIdentidad', value: this._imgDocIdentidad});
                sData.push({name: '_imgFormatoSolixcitud', value: this._imgFormatoSolixcitud});
                sData.push({name: '_imgHojaCalidda', value: this._imgHojaCalidda});
                sData.push({name: '_imgInscripcionMovil', value: this._imgInscripcionMovil});
                sData.push({name: '_imgLicenciaConducir', value: this._imgLicenciaConducir});
                sData.push({name: '_imgRecibo', value: this._imgRecibo});
                sData.push({name: '_imgRevisionTecnica', value: this._imgRevisionTecnica});
                sData.push({name: '_imgSoat', value: this._imgSoat});
                sData.push({name: '_imgTarjetaPropiedad', value: this._imgTarjetaPropiedad});
            },
            complete: (data) => {
                Tools.execMessage(data);
                if (data.ok_error != 'error') {
                    this.closeNewVehiculo(null, null);
                    //this._getMenu(tk);
                }
            }
        });
    }

    postUpload(tk, load) {
        this.send({
            token: tk,
            gifProccess: true,
            context: this,
            form: this._idFormVehiculo,
            formData: true,
            serverParams: (sData, obj) => {
                sData.push({name: '_load', value: load});
            },
            complete: (data) => {
                if (data.result == 1) {
                    eval(`this.${data.element} = '${data.archivo}';`);
                } else {
                    Tools.notify().error({
                        content: data.result
                    });
                }
            }
        });
    }

    closeNewVehiculo(btn, tk) {
        Tools.closeTab(`${this._alias}-NWV`);
    }

};