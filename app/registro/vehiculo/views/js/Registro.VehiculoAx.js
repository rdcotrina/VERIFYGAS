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
        this._idFormPreConversion = `#${this._alias}formPreConversion`;
        this._idFormPreConversionEdit = `#${this._alias}formPreConversionEdit`;
        this._idFormViewPreConversion = `#${this._alias}formViewPreConversion`;
        this._idFormObservacionRechazar = `#${this._alias}formObservacionRechazar`;
        this._idFormObservacion = `#${this._alias}formObservacion`;
        this._idFormViewExpediente = `#${this._alias}formViewExpediente`;
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
        this._minVoltiosApagado = null;
        this._maxVoltiosApagado = null;
        this._minVoltiosArranque = null;
        this._maxVoltiosArranque = null;
        this._minVoltiosEncendido = null;
        this._maxVoltiosEncendido = null;
        this._minVoltios2500RPM = null;
        this._maxVoltios2500RPM = null;
        this._minVacioMotorRalenti = null;
        this._maxVacioMotorRalenti = null;
        this._maxGasRalentiCO = 0;
        this._maxGasRalentiHC = 0;
        this._minGasRalentiCO2 = 0;
        this._maxGasRalentiO2 = 0;
        this._maxGasRPMCO = 0;
        this._maxGasRPMHC = 0;
        this._minGasRPMCO2 = 0;
        this._maxGasRPMO2 = 0;
        this._minSTFTB1 = 0;
        this._maxSTFTB1 = 0;
        this._minLTFTB1 = 0;
        this._maxLTFTB1 = 0;
        this._minSensorCMP = 0;
        this._maxSensorCMP = 0;
        this._minSensorMAP = 0;
        this._maxSensorMAP = 0;
        this._minSensorTPS = 0;
        this._maxSensorTPS = 0;
        this._minCilindros = 0;
        this._maxCilindros = 0;
        this._conformidadVoltiosApagado = 0;
        this._conformidadArranque = 0;
        this._conformidadEncendido = 0;
        this._conformidad2500RPM = 0;
        this._conformidadVacioMotorRalenti = 0;
        this._conformidadMaxGasRalentiCO = 0;
        this._conformidadMaxGasRalentiHC = 0;
        this._conformidadMinGasRalentiCO2 = 0;
        this._conformidadMaxGasRalentiO2 = 0;
        this._conformidadMaxGasRPMCO = 0;
        this._conformidadMaxGasRPMHC = 0;
        this._conformidadMinGasRPMCO2 = 0;
        this._conformidadMaxGasRPMO2 = 0;
        this._conformidadSTFTB1 = 0;
        this._conformidadLTFTB1 = 0;
        this._conformidadSensorCMP = 0;
        this._conformidadSensorMAP = 0;
        this._conformidadSensorTPS = 0;
        this._conformidadCilindro1 = 0;
        this._conformidadCilindro2 = 0;
        this._conformidadCilindro3 = 0;
        this._conformidadCilindro4 = 0;
        this._videoVacioMotorRalenti = null;
        this._videoAnalisisGasesRalenti = null;
        this._videoAnalisisGasesRPM = null;
        this._videoSTFTB1 = null;
        this._videoLTFTB1 = null;
        this._videoCilindros = null;
        this._tienePreconversion = null;
        this._grabaAprueba = 0; //1: graba y aprueba, 0: solo graga

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
                    this._find(tk, this._idFormVehiculoEdit, false);
                }
            });
        };

        this._formViewExpediente = (tk) => {
            this.send({
                token: tk,
                context: this,
                dataType: 'text',
                response: (data) => {
                    $(`#${this._alias}-NEXP${APP_CONTAINER_TABS}`).html(data);
                },
                finally: (data) => {
                    this.addBtnCloseExpediente();
                    this.getListBoxs(this._idFormViewExpediente);
                    this._find(tk, this._idFormViewExpediente, true);
                }
            });
        };

        this._formPreConversion = (tk) => {
            this.send({
                token: tk,
                context: this,
                dataType: 'text',
                response: (data) => {
                    $(`#${this._alias}-TPC${APP_CONTAINER_TABS}`).html(data);
                },
                finally: (data) => {
                    this.addBtnSavePrec();
                    this._findPropietario(tk, this._idFormPreConversion).done(()=>{
                        this.setEvents(tk);
                    });
                    this.getListBoxPreConversion(this._idFormPreConversion);
                }
            });
        };

        this._formViewPreConversion = (tk) => {
            this.send({
                token: tk,
                context: this,
                dataType: 'text',
                response: (data) => {
                    $(`#${this._alias}-VTPC${APP_CONTAINER_TABS}`).html(data);
                },
                finally: (data) => {
                    this.addBtnCloseViewPrec();
                    this._findPropietario(tk, this._idFormViewPreConversion);
                    this.getListBoxPreConversion(this._idFormViewPreConversion);
                    this._getPreConversion(tk, this._idFormViewPreConversion);
                }
            });
        };

        this._formPreConversionEdit = (tk) => {
            this.send({
                token: tk,
                context: this,
                dataType: 'text',
                response: (data) => {
                    $(`#${this._alias}-TPC${APP_CONTAINER_TABS}`).html(data);
                },
                finally: (data) => {
                    this.addBtnUpdatePrec();
                    
                    this._findPropietario(tk, this._idFormPreConversionEdit).done(()=>{
                        this.setEvents(tk);
                    });
                    
                    this.getListBoxPreConversion(this._idFormPreConversionEdit);
                    this._getPreConversion(tk, this._idFormPreConversionEdit);
                }
            });
        };

        this._formObservacionRechazar = (btn, tk) => {
            this.send({
                element: btn,
                token: tk,
                context: this,
                modal: true,
                dataType: 'text',
                success: (obj) => {
                    $(this._dmain).append(obj.data);
                },
                final: (obj) => {/*se ejecuta una vez que se cargo el HTML en success*/
                    this.addBtnSaveObs();
                }
            });
        };

        this._getPreConversion = (tk, form) => {
            this.send({
                token: tk,
                gifProcess: true,
                context: this,
                serverParams: (sData, obj) => {
                    sData.push({name: '_keyPropietario', value: this._keyPropietario});
                },
                response: (data) => {
                    this.setPreConversionData(data, form);
                }
            });
        };

        this._find = (tk, form, activeLinks) => {
            this.send({
                token: tk,
                gifProcess: true,
                context: this,
                serverParams: (sData, obj) => {
                    sData.push({name: '_keyPropietario', value: this._keyPropietario});
                },
                response: (data) => {
                    this.setVehiculo(data, form, activeLinks);
                }
            });
        };

        this._findPropietario = (tk, form) => {
            return this.send({
                token: tk,
                gifProcess: true,
                context: this,
                serverParams: (sData, obj) => {
                    sData.push({name: '_keyPropietario', value: this._keyPropietario});
                },
                response: (data) => {
                    this.setPreConversion(data, form);
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

        this._postAtender = (btn, tk, f, obs = '') => {
            this._keyPropietario = (f == 1) ? $(btn).parent('div').data('propietario') : this._keyPropietario;
            this.send({
                flag: f,
                token: tk,
                context: this,
                element: btn,
                serverParams: (sData, obj) => {
                    sData.push({name: '_keyPropietario', value: this._keyPropietario});
                    sData.push({name: '_observacion', value: obs});
                },
                response: (data) => {
                    if (data.ok_error != 'error') {
                        if (f == 2) {
                            Tools.closeModal(this._idFormObservacionRechazar);
                        }
                        Tools.execMessage(data);
                        this._getVehiculos(tk);
                    }
                }
            });
        };

        this._formObservacion = (tk) => {
            this.send({
                element: `#${PREBTNCTXT}${this._alias}${APP_BTN.GRB}`,
                token: tk,
                context: this,
                modal: true,
                dataType: 'text',
                response: (data) => {
                    $(APP_MAIN_MODALS).append(data);
                },
                final: (obj) => {/*se ejecuta una vez que se cargo el HTML en success*/
                    this.addBtnSaveObs();
                }
            });
        };

        this._postNewPreconversion = (tk, closeObs) => {
            this.send({
                flag: 1,
                token: tk,
                gifProcess: true,
                element: (this._grabaAprueba)?`#${PREBTNCTXT}${this._alias}${APP_BTN.GRBAPR}`:`#${PREBTNCTXT}${this._alias}${APP_BTN.GRB}`,
                context: this,
                form: (this._tienePreconversion == 1) ? this._idFormPreConversionEdit : this._idFormPreConversion,
                formData: true,
                serverParams: (sData, obj) => {
                    sData.push({name: '_videoVacioMotorRalenti', value: this._videoVacioMotorRalenti});
                    sData.push({name: '_videoAnalisisGasesRalenti', value: this._videoAnalisisGasesRalenti});
                    sData.push({name: '_videoAnalisisGasesRPM', value: this._videoAnalisisGasesRPM});
                    sData.push({name: '_videoSTFTB1', value: this._videoSTFTB1});
                    sData.push({name: '_videoLTFTB1', value: this._videoLTFTB1});
                    sData.push({name: '_videoCilindros', value: this._videoCilindros});
                    sData.push({name: '_keyPropietario', value: this._keyPropietario});
                    sData.push({name: '_grabaAprueba', value: this._grabaAprueba});
                    sData.push({name: '_observacion', value: (closeObs) ? $(`#${this._alias}txt_observacion`).val() : ''});
                },
                complete: (data) => {
                    Tools.execMessage(data);
                    if (data.ok_error != 'error') {
                        this.closeNewPreconversion(null, null);
                        if (closeObs) {
                            Tools.closeModal(this._idFormObservacion);
                        }
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

    formPreConversion(btn, tk) {
        this._grabaAprueba = 0;
        this._keyPropietario = $(btn).parent('div').data('propietario');
        this._tienePreconversion = $(btn).parent('div').data('tienepreconversion');

        Tools.addTab({
            context: this,
            id: `${this._alias}-TPC`,
            label: APP_ETIQUET.pre_conversion,
            fnCallback: () => {
                if (this._tienePreconversion == 1) {
                    this._formPreConversionEdit(tk);
                } else {
                    this._formPreConversion(tk);
                }
            }
        });
    }

    formViewPreConversion(btn, tk) {
        this._keyPropietario = $(btn).parent('div').data('propietario');

        Tools.addTab({
            context: this,
            id: `${this._alias}-VTPC`,
            label: APP_ETIQUET.pre_conversion,
            fnCallback: () => {
                this._formViewPreConversion(tk);
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

    formViewExpediente(btn, tk) {
        this.closeExpediente(null, null);
        this._keyPropietario = $(btn).parent('div').data('propietario');

        Tools.addTab({
            context: this,
            id: `${this._alias}-NEXP`,
            label: APP_ETIQUET.expediente,
            fnCallback: () => {
                this._formViewExpediente(tk);
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
                sData.push({name: '_imgFormatoSolicitud', value: this._imgFormatoSolicitud});
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

    postNewPreconversion(tk) {
        //verificar si existe algun NO CONFORME y mostrar formulario para la observacion
        if (!this.isConforme()) {
            this._formObservacion(tk);
        } else {
            //verificar si Guarda y Aprueba
            if (this._grabaAprueba) {
                Tools.notify().confirm({
                    content: APP_MSN.seguro_preconversion,
                    yes: () => {
                        this._postNewPreconversion(tk, 0);
                    }
                });
            } else {
                this._postNewPreconversion(tk, 0);
            }
        }
    }

    postObservacion(tk) {
        //si cargo la observacion quiere decir que solo se grabara
        this._grabaAprueba = 0;
        
        //verificar si Guarda y Aprueba
        if (this._grabaAprueba) {
            Tools.notify().confirm({
                content: APP_MSN.seguro_preconversion,
                yes: () => {
                    this._postNewPreconversion(tk, 1);
                }
            });
        } else {
            this._postNewPreconversion(tk, 1);
        }
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
            content: APP_MSN.aprobar,
            yes: () => {
                this._postAtender(btn, tk, 1);
            }
        });
    }

    postRechazar(btn, tk) {
        this._keyPropietario = $(btn).parent('div').data('propietario');
        Tools.notify().confirm({
            content: APP_MSN.rechazar,
            yes: () => {
                this._formObservacionRechazar(btn, tk);
            }
        });
    }

    postAtender(tk) {
        this._postAtender(`#${PREBTNCTXT}${this._alias}${APP_BTN.GRB}`, tk, 2, $(`#${this._alias}txt_observacion`).val());
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

    postUploadVideo(tk, load) {
        this.send({
            token: tk,
            gifProcess: true,
            context: this,
            form: (this._tienePreconversion == 1) ? this._idFormPreConversionEdit : this._idFormPreConversion,
            formData: true,
            serverParams: (sData, obj) => {
                sData.push({name: '_load', value: load});
                sData.push({name: '_keyPropietario', value: this._keyPropietario});
                sData.push({name: '_tienePreconversion', value: this._tienePreconversion});
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

    closeNewPreconversion(btn, tk) {
        Tools.closeTab(`${this._alias}-TPC`);
    }

    closeExpediente(btn, tk) {
        Tools.closeTab(`${this._alias}-NEXP`);
    }

    closeViewPreconversion(btn, tk) {
        Tools.closeTab(`${this._alias}-VTPC`);
    }

};