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
        this._conformeAll = 0;
        this._idGrid = null;

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
//                    this.addBtnSearch();
//                    $(`#${this._alias}d_vehiculos_aprobados`).html(`<div class="text-center">${Tools.spinner().main}</div>`);
//                    this._getVehiculos(tk);
                    this._grid(tk);
                }
            });
        };

        this._grid = (tk) => {
            $(`#${this._alias}gridVehiculos`).fullgrid({
                oContext: this,
                tAlias: this._alias,
                pOrderField: 'nro_expediente desc',
                pDisplayLength: 10,
                tColumns: [
                    {title: APP_ETIQUET.nro_exp, field: 'nro_expediente', width: 100, class: "text-center", sortable: true, filter: {type: 'text'}},
                    {title: APP_ETIQUET.pec, field: 'pecs', width: 150, sortable: true, filter: {type: 'text'}},
                    {title: APP_ETIQUET.taller, field: 'taller', width: 150, sortable: true, filter: {type: 'text'}},
                    {title: APP_ETIQUET.nombres, field: 'nombre_completo', width: 150, sortable: true, filter: {type: 'text'}},
                    {title: APP_ETIQUET.placa, field: 'placa', width: 80, class: "text-center", sortable: true, filter: {type: 'text'}},
                    {title: APP_ETIQUET.marca, field: 'marca', width: 80, class: "text-center", sortable: true, filter: {type: 'text'}},
                    {title: APP_ETIQUET.modelo, field: 'modelo', width: 80, class: "text-center", sortable: true, filter: {type: 'text'}}
                ],
                fnServerParams: (sData) => {
                    sData.push({name: '_qn', value: Tools.en(tk)});
                },
                sAxions: {
                    /*se genera group buttons*/
                    group: [{
                            buttons: [
                                {
                                    button: APP_BTN.VWCONV,
                                    ajax: {
                                        fn: "Obj.Proceso.ConversionAx.formViewConversion",
                                        serverParams: ["id_propietario"]
                                    }
                                }, {
                                    button: APP_BTN.KONV,
                                    ajax: {
                                        fn: "Obj.Proceso.ConversionAx.formConversion",
                                        serverParams: ["id_propietario", "tiene_conversion"]
                                    }
                                }, {
                                    button: APP_BTN.APR,
                                    ajax: {
                                        fn: "Obj.Proceso.ConversionAx.postAprobar",
                                        serverParams: ["id_propietario", "conformidad_todo"]
                                    }
                                }, {
                                    button: APP_BTN.RECH,
                                    ajax: {
                                        fn: "Obj.Proceso.ConversionAx.postRechazar",
                                        serverParams: ["id_propietario"]
                                    }
                                }
                            ]
                        }]
                },
                fnCallback: (o) => {
                    this._idGrid = o.oTable;
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
//            this._keyPropietario = (f == 1) ? $(btn).parent('div').data('propietario') : this._keyPropietario;
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
                        Tools.refreshGrid(this._idGrid);
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
                    Tools.runDataLocalStorage(this._idFormConversion);
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
                    sData.push({name: '_conformeAll', value: this._conformeAll});
                },
                response: (data) => {
                    Tools.execMessage(data);
                    if (data.ok_error != 'error') {
                        this.closeNewConversion(null, null);
                        Tools.refreshGrid(this._idGrid);
                        Tools.stopDataLocalStorage();
                    }
                }
            });
        };
        
        this._validaAdjuntos = (btn, tk) => {
            return this.send({
                token: tk,
                element: btn,
                context: this,
                gifProcess: true,
                serverParams: (sData) => {
                    sData.push({name: '_keyPropietario', value: this._keyPropietario});
                }
            });
        };
        
        this._formValidaAdjuntos = (tk, data) => {
            this.send({
                token: tk,
                context: this,
                modal: true,
                dataType: 'text',
                response: (data) => {
                    $(APP_MAIN_MODALS).append(data);
                },
                final: (obj) => {/*se ejecuta una vez que se cargo el HTML en success*/
                    this.addBtnClose();
                    this.setAdjuntosPendientes(data);
                }
            });
        };

    }

    main(tk) {
        this._conformeAll = 0;
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

    formConversion(btn, id, tiene, tk) {
        this._grabaAprueba = 0;
        this._keyPropietario = id;
        this._tieneConversion = tiene;

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

    formViewConversion(btn, id, tk) {
        this._keyPropietario = id;

        Tools.addTab({
            context: this,
            id: `${this._alias}-VTCONV`,
            label: APP_ETIQUET.datos_converion,
            fnCallback: () => {
                this._formViewConversion(tk);
            }
        });
    }

    postAprobar(btn, id, conformidad, tk) {
        this._keyPropietario = id;
        this._validaAdjuntos(btn, tk).done((data) => {
            if (/null/g.test(JSON.stringify(data))) {
                this._formValidaAdjuntos(tk, data);
                return false;
            }
            
            if (conformidad == 0 || $.isEmptyObject(conformidad) || !$.isNumeric(conformidad)) {
                Tools.notify().smallMsn({
                    content: APP_MSN.no_conforme2,
                    color: '#C79121'
                });
                return false;
            }
            Tools.notify().confirm({
                content: APP_MSN.aprobar,
                yes: () => {
                    this._postAtender(btn, tk, 1);
                }
            });
        });
    }

    postRechazar(btn, id, tk) {
        this._keyPropietario = id;
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
        this._conformeAll = 1;
        if (!this.isConforme()) {
            this._conformeAll = 0;
        }

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

    postUploadVideo(tk, load, elf) {
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
                } else if (data.result == 2) {
                    $(elf).val('');
                    Tools.notify().smallMsn({
                        content: APP_MSN.video_grande
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
        Tools.refreshGrid(this._idGrid);
    }

    closeNewConversion(btn, tk) {
        Tools.closeTab(`${this._alias}-TCONV`);
    }

    closeViewConversion(btn, tk) {
        Tools.closeTab(`${this._alias}-VTCONV`);
    }

};