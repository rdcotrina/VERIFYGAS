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
        this._idFormIndex = `#${this._alias}formIndex`;
        this._idFormVehiculo = `#${this._alias}formVehiculo`;
        this._idFormVehiculoEdit = `#${this._alias}formEditVehiculo`;
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
        this._keyPropietario = null;

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
                    this.addBtnSearch();
                    $(`#${this._alias}d_vehiculo`).html(`<div class="text-center">${Tools.spinner().main}</div>`);
                    this._getVehiculos(tk);
                }
            });
        };

        this._formVehiculo = (tk) => {
            this._imgLoads = [];
            this.send({
                token: tk,
                context: this,
                dataType: 'text',
                response: (data) => {
                    $(`#${this._alias}-NWV${APP_CONTAINER_TABS}`).html(data);
                },
                finally: (data) => {
                    this.addBtnSave();
                    this.getListBoxs(this._idFormVehiculo);
                    this.setEventsUploads(tk);
                }
            });
        };

        this._formEditVehiculo = (tk) => {
            this.send({
                token: tk,
                context: this,
                dataType: 'text',
                response: (data) => {
                    $(`#${this._alias}-NWV${APP_CONTAINER_TABS}`).html(data);
                },
                finally: (data) => {
                    this.addBtnUpdate();
                    this.getListBoxs(this._idFormVehiculoEdit);
                    this.setEventsUploads(tk);
                    this._find(tk);
                }
            });
        };

        this._find = (tk) => {
            this.send({
                token: tk,
                gifProcess: true,
                context: this,
                serverParams: (sData, obj) => {
                    sData.push({name: '_keyPropietario', value: this._keyPropietario});
                },
                response: (data) => {
                    this.setVehiculo(data);
                }
            });
        };

        this._getVehiculos = (tk) => {
            this.send({
                token: tk,
                element: `#${PREBTNCTXT}${this._alias}${APP_BTN.BUS}`,
                form: this._idFormIndex,
                context: this,
                response: (data) => {
                    this.setVehiculos(data);
                }
            });
        };

        this._postDelete = (btn, tk) => {
            this.send({
                flag: 3,
                token: tk,
                context: this,
                element: btn,
                serverParams: (sData, obj) => {
                    sData.push({name: '_keyPropietario', value: $(btn).parent('div').data('propietario')});
                },
                response: (data) => {
                    if (data.ok_error != 'error') {
                        Tools.execMessage(data);
                        this._getVehiculos(tk);
                    }
                }
            });
        };

        this._postAtender = (btn, tk, f) => {
            this.send({
                flag: f,
                token: tk,
                context: this,
                element: btn,
                serverParams: (sData, obj) => {
                    sData.push({name: '_keyPropietario', value: $(btn).parent('div').data('propietario')});
                },
                response: (data) => {
                    if (data.ok_error != 'error') {
                        Tools.execMessage(data);
                        this._getVehiculos(tk);
                    }
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
        this.closeNewVehiculo(null, null);
        Tools.addTab({
            context: this,
            id: `${this._alias}-NWV`,
            label: APP_ETIQUET.registrar_vehiculo,
            fnCallback: () => {
                this._formVehiculo(tk);
            }
        });
    }

    formEditVehiculo(btn, tk) {
        this.closeNewVehiculo(null, null);
        this._keyPropietario = $(btn).parent('div').data('propietario');

        Tools.addTab({
            context: this,
            id: `${this._alias}-NWV`,
            label: APP_ETIQUET.registrar_vehiculo,
            fnCallback: () => {
                this._formEditVehiculo(tk);
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
                    this._getVehiculos(tk);
                }
            }
        });
    }

    postEdit(tk) {
        this.send({
            flag: 2,
            token: tk,
            element: `#${PREBTNCTXT}${this._alias}${APP_BTN.UPD}`,
            context: this,
            form: this._idFormVehiculoEdit,
            formData: true,
            serverParams: (sData, obj) => {
                sData.push({name: '_keyPropietario', value: this._keyPropietario});
            },
            complete: (data) => {
                Tools.execMessage(data);
                if (data.ok_error != 'error') {
                    this._keyPropietario = null;
                    this.closeNewVehiculo(null, null);
                    this._getVehiculos(tk);
                }
            }
        });
    }

    postAprobar(btn, tk) {
        Tools.notify().confirm({
            content: APP_MSN.preaprobar,
            yes: () => {
                this._postAtender(btn, tk, 1);
            }
        });
    }

    postRechazar(btn, tk) {
        Tools.notify().confirm({
            content: APP_MSN.rechazar,
            yes: () => {
                this._postAtender(btn, tk, 2);
            }
        });
    }

    postDelete(btn, tk) {
        Tools.notify().confirm({
            content: APP_MSN.you_sure_delete,
            yes: () => {
                this._postDelete(btn, tk);
            }
        });
    }

    postUpload(tk, load) {
        let form = ($.isEmptyObject(this._keyPropietario)) ? this._idFormVehiculo : this._idFormVehiculoEdit;
        this.send({
            token: tk,
            gifProcess: true,
            context: this,
            form: form,
            formData: true,
            serverParams: (sData, obj) => {
                sData.push({name: '_load', value: load});
                sData.push({name: '_keyPropietario', value: this._keyPropietario});
            },
            complete: (data) => {
                if (data.result == 1) {
                    eval(`this.${data.element} = '${data.archivo}';`);
                    if (!$.isEmptyObject(this._keyPropietario)) {
                        Tools.notify().ok({
                            content: APP_MSN.upload_ok
                        });
                    }
                } else {
                    Tools.notify().error({
                        content: data.result
                    });
                }
            }
        });
    }

    postSearch(btn, tk) {
        this._getVehiculos(tk);
    }

    closeNewVehiculo(btn, tk) {
        Tools.closeTab(`${this._alias}-NWV`);
    }

};