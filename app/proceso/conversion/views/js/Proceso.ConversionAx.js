/* 
 * ---------------------------------------
 * --------- CREATED BY LV ----------
 * Autor:        Super 
 * Fecha:        08-06-2018 01:06:03 
 * Descripcion : ConversionAx.js
 * ---------------------------------------
 */
"use strict";

$$.Proceso.ConversionAx = class ConversionAx extends $$.Proceso.ConversionRsc {

    constructor() {
        super();
        this._controller = 'conversion:';
        this._alias = Exe.getAlias();
        this._dmain = `#${this._alias}${APP_CONTAINER_TABS}`; /*contenedor principal de opcion*/
        this._tour = Obj.Proceso.ConversionTour;
        this._idFormIndex = `#${this._alias}formIndex`;
        this._ifFormObservacionRechazar = `#${this._alias}formObservacionRechazar`;
        this._idFormConversion = `#${this._alias}formConversion`;
        this._idFormConversionEdit = `#${this._alias}formConversionEdit`;
        this._idFormViewConversion = `#${this._alias}formViewConversion`;
        this._keyPropietario = null;
        this._grabaAprueba = 0;
        this._minPresionSalidaRegualdor = 0;
        this._minConfTemperaturaConmutacion = 0;
        this._maxConfTemperaturaConmutacion = 0;
        this._minStftb1CombustibleGNV = 0;
        this._maxStftb1CombustibleGNV = 0;
        this._minLtftb1CombustibleGNV = 0;
        this._maxLtftb1CombustibleGNV = 0;
        this._maxGasesRalentiGasolinaCO = 0;
        this._maxGasesRalentiGasolinaHC = 0;
        this._minGasesRalentiGasolinaCO2 = 0;
        this._maxGasesRalentiGasolinaO2 = 0;
        this._maxGasesRPMGasolinaCO = 0;
        this._maxGasesRPMGasolinaHC = 0;
        this._minGasesRPMGasolinaCO2 = 0;
        this._maxGasesRPMGasolinaO2 = 0;
        this._maxGasesRalentiGnvCO = 0;
        this._maxGasesRalentiGnvHC = 0;
        this._minGasesRalentiGnvCO2 = 0;
        this._maxGasesRalentiGnvO2 = 0;
        this._maxGasesRPMGnvCO = 0;
        this._maxGasesRPMGnvHC = 0;
        this._minGasesRPMGnvCO2 = 0;
        this._maxGasesRPMGnvO2 = 0;
        this._tieneConversion = 0;
        this._conformidadPresionSalidaRegualdor = 0;
        this._conformidadConfTemperaturaConmutacion = 0;
        this._conformidadStftb1CombustibleGNV = 0;
        this._conformidadLtftb1CombustibleGNV = 0;
        this._conformidadGasesRalentiGasolinaCO = 0;
        this._conformidadGasesRalentiGasolinaHC = 0;
        this._conformidadGasesRalentiGasolinaCO2 = 0;
        this._conformidadGasesRalentiGasolinaO2 = 0;
        this._conformidadGasesRPMGasolinaCO = 0;
        this._conformidadGasesRPMGasolinaHC = 0;
        this._conformidadGasesRPMGasolinaCO2 = 0;
        this._conformidadGasesRPMGasolinaO2 = 0;
        this._conformidadGasesRalentiGnvCO = 0;
        this._conformidadGasesRalentiGnvHC = 0;
        this._conformidadGasesRalentiGnvO2 = 0;
        this._conformidadGasesRPMGnvCO = 0;
        this._conformidadGasesRPMGnvHC = 0;
        this._conformidadGasesRPMGnvCO2 = 0;
        this._conformidadGasesRPMGnvO2 = 0;
        this._videoEstadoFUncionamientoGNV = null;
        this._videoVarios = null;

        this._formIndex = (tk) => {
            this.send({
                token: tk,
                context: this,
                dataType: 'text',
                tour: true,
                response: (data) => {
                    $(this._dmain).append(data);
                },
                finally: (data) => {
                    this.addBtnSearch();
                    $(`#${this._alias}d_vehiculos_aprobados`).html(`<div class="text-center">${Tools.spinner().main}</div>`);
                    this._getVehiculos(tk);
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
                            Tools.closeModal(this._ifFormObservacionRechazar);
                        }
                        Tools.execMessage(data);
                        this._getVehiculos(tk);
                    }
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

        this._formConversion = (tk) => {
            this.send({
                token: tk,
                context: this,
                dataType: 'text',
                response: (data) => {
                    $(`#${this._alias}-TCONV${APP_CONTAINER_TABS}`).html(data);
                },
                finally: (data) => {
                    this.addBtnSaveConv();
                    this._findPropietario(tk, this._idFormConversion).done(() => {
                        this.setEvents(tk);
                    });
                }
            });
        };

        this._formConversionEdit = (tk) => {
            this.send({
                token: tk,
                context: this,
                dataType: 'text',
                response: (data) => {
                    $(`#${this._alias}-TCONV${APP_CONTAINER_TABS}`).html(data);
                },
                finally: (data) => {
                    this.addBtnUpdtConv();
                    this._findPropietario(tk, this._idFormConversionEdit).done(() => {
                        this.setEvents(tk);
                    });
                    this._getConversion(tk, this._idFormConversionEdit, 0);
                }
            });
        };

        this._formViewConversion = (tk) => {
            this.send({
                token: tk,
                context: this,
                dataType: 'text',
                response: (data) => {
                    $(`#${this._alias}-VTCONV${APP_CONTAINER_TABS}`).html(data);
                },
                finally: (data) => {
                    this.addBtnCloseViewConv();
                    this._findPropietario(tk, this._idFormViewConversion);
                    this._getConversion(tk, this._idFormViewConversion, 1);
                }
            });
        };

        this._getConversion = (tk, form, linkVideos) => {
            this.send({
                token: tk,
                gifProcess: true,
                context: this,
                serverParams: (sData, obj) => {
                    sData.push({name: '_keyPropietario', value: this._keyPropietario});
                },
                response: (data) => {
                    this.setConversionData(data, form, linkVideos);
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
                    this.setConversion(data, form);
                }
            });
        };

        this._postNewConversion = (tk) => {
            this.send({
                flag: 1,
                token: tk,
                gifProcess: true,
                element: (this._grabaAprueba) ? `#${PREBTNCTXT}${this._alias}${APP_BTN.GRBAPR}` : `#${PREBTNCTXT}${this._alias}${APP_BTN.GRB}`,
                context: this,
                form: (this._tieneConversion == 1) ? this._idFormConversionEdit : this._idFormConversion,
                serverParams: (sData, obj) => {
                    sData.push({name: '_videoEstadoFUncionamientoGNV', value: this._videoEstadoFUncionamientoGNV});
                    sData.push({name: '_videoVarios', value: this._videoVarios});
                    sData.push({name: '_keyPropietario', value: this._keyPropietario});
                    sData.push({name: '_grabaAprueba', value: this._grabaAprueba});
                },
                response: (data) => {
                    Tools.execMessage(data);
                    if (data.ok_error != 'error') {
                        this.closeNewConversion(null, null);
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

    formConversion(btn, tk) {
        this._grabaAprueba = 0;
        this._keyPropietario = $(btn).parent('div').data('propietario');
        this._tieneConversion = $(btn).parent('div').data('tieneconversion');

        Tools.addTab({
            context: this,
            id: `${this._alias}-TCONV`,
            label: APP_ETIQUET.datos_converion,
            fnCallback: () => {
                if (this._tieneConversion == 1) {
                    this._formConversionEdit(tk);
                } else {
                    this._formConversion(tk);
                }
            }
        });
    }

    formViewConversion(btn, tk) {
        this._keyPropietario = $(btn).parent('div').data('propietario');

        Tools.addTab({
            context: this,
            id: `${this._alias}-VTCONV`,
            label: APP_ETIQUET.datos_converion,
            fnCallback: () => {
                this._formViewConversion(tk);
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

    postNewConversion(tk) {
        //verificar si Guarda y Aprueba
        if (this._grabaAprueba) {
            //verificar si existe algun NO CONFORME y mostrar msn
            if (!this.isConforme()) {
                Tools.notify().error({
                    content: APP_MSN.no_puede_grabar_enviar_conversion
                });
                return false;
            }
            Tools.notify().confirm({
                content: APP_MSN.seguro_preconversion,
                yes: () => {
                    this._postNewConversion(tk);
                }
            });
        } else {
            this._postNewConversion(tk);
        }

    }

    postUploadVideo(tk, load) {
        this.send({
            token: tk,
            gifProcess: true,
            context: this,
            form: (this._tieneConversion == 1) ? this._idFormConversionEdit : this._idFormConversion,
            formData: true,
            serverParams: (sData, obj) => {
                sData.push({name: '_load', value: load});
                sData.push({name: '_keyPropietario', value: this._keyPropietario});
                sData.push({name: '_tieneConversion', value: this._tieneConversion});
            },
            complete: (data) => {
                if (data.result == 1) {
                    eval(`this.${data.element} = '${data.archivo}';`);
                    Tools.notify().ok({
                        content: APP_MSN.upload_ok
                    });
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

    closeNewConversion(btn, tk) {
        Tools.closeTab(`${this._alias}-TCONV`);
    }

    closeViewConversion(btn, tk) {
        Tools.closeTab(`${this._alias}-VTCONV`);
    }

};