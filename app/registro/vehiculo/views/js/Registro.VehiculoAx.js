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
        this._idFormConsentimiento = `#${this._alias}formConsentimiento`;
        this._idFormViewConsentimiento = `#${this._alias}formViewConsentimiento`;
        this._imgConsentimiento = null;
        this._imgDocIdentidad = null;
        this._imgFormatoSolicitud = null;
        this._imgHojaCalidda = null;
        this._imgInscripcionMovil = null;
        this._imgLicenciaConducir = null;
        this._imgRecibo = null;
        this._imgRevisionTecnica = null;
        this._imgContratoFinanciamitoCalidda = null;
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
        this._maxGasRalentiCO2 = 0;
        this._minGasRalentiCO2 = 0;
        this._maxGasRalentiO2 = 0;
        this._maxGasRPMCO = 0;
        this._maxGasRPMHC = 0;
        this._minGasRPMCO2 = 0;
        this._maxGasRPMCO2 = 0;
        this._maxGasRPMO2 = 0;
        this._minSTFTB1 = 0;
        this._maxSTFTB1 = 0;
        this._minLTFTB1 = 0;
        this._maxLTFTB1 = 0;
        /*this._minSensorCMP = 0;
         this._maxSensorCMP = 0;
         this._minSensorMAP = 0;
         this._maxSensorMAP = 0;
         this._minSensorTPS = 0;
         this._maxSensorTPS = 0;*/
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
        this._consentimiento_1 = 0;
        this._consentimiento_2 = 0;
        this._consentimiento_3 = 0;
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
                final: (obj) => {
                    this._grid(tk);
//                    this.addBtnNew();
//                    this.addBtnSearch();
//                    $(`#${this._alias}d_vehiculo`).html(`<div class="text-center">${Tools.spinner().main}</div>`);
//                    this._getVehiculos(tk);
                }
            });
        };

        this._grid = (tk) => {
            $(`#${this._alias}gridVehiculos`).fullgrid({
                oContext: this,
                tAlias: this._alias,
                tButtons: [{
                        button: APP_BTN.NEW,
                        event: 'Obj.Registro.VehiculoAx.formNewVehiculo'
                    }],
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
                                    button: APP_BTN.EXP,
                                    ajax: {
                                        fn: "Obj.Registro.VehiculoAx.formViewExpediente",
                                        serverParams: ["id_propietario"]
                                    }
                                }, {
                                    button: APP_BTN.VPRKO,
                                    ajax: {
                                        fn: "Obj.Registro.VehiculoAx.formViewPreConversion",
                                        serverParams: ["id_propietario"]
                                    }
                                }, {
                                    button: APP_BTN.EDT,
                                    ajax: {
                                        fn: "Obj.Registro.VehiculoAx.formEditVehiculo",
                                        serverParams: ["id_propietario"]
                                    }
                                }, {
                                    button: APP_BTN.DEL,
                                    ajax: {
                                        fn: "Obj.Registro.VehiculoAx.postDelete",
                                        serverParams: ["id_propietario"]
                                    }
                                }, {
                                    button: APP_BTN.PRE,
                                    ajax: {
                                        fn: "Obj.Registro.VehiculoAx.formPreConversion",
                                        serverParams: ["id_propietario", "tiene_preconversion"]
                                    }
                                }, {
                                    button: APP_BTN.APR,
                                    ajax: {
                                        fn: "Obj.Registro.VehiculoAx.postAprobar",
                                        serverParams: ["id_propietario", "conformidad_todo"]
                                    }
                                }, {
                                    button: APP_BTN.RECH,
                                    ajax: {
                                        fn: "Obj.Registro.VehiculoAx.postRechazar",
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
                    this.addBtnConsentimiento();
                    this.getListBoxs(this._idFormVehiculo);
                    this.setEventsUploads(tk);
                    this.runLocalStorage(this._idFormVehiculo);
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
                    this.addBtnConsentimiento();
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
                    this.addBtnViewConsentimiento();
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
                    this._findPropietario(tk, this._idFormPreConversion).done(() => {
                        this.setEvents(tk);
                    });
                    this.getListBoxPreConversion(this._idFormPreConversion);
                    this.runLocalStorage(this._idFormPreConversion);
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

                    this._findPropietario(tk, this._idFormPreConversionEdit).done(() => {
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

        this._postDelete = (btn, id, tk) => {
            this.send({
                flag: 3,
                token: tk,
                context: this,
                element: btn,
                serverParams: (sData, obj) => {
                    sData.push({name: '_keyPropietario', value: id});
                },
                response: (data) => {
                    if (data.ok_error != 'error') {
                        Tools.execMessage(data);
                        Tools.refreshGrid(this._idGrid);
                    }
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
                            Tools.closeModal(this._idFormObservacionRechazar);
                        }
                        Tools.execMessage(data);
                        Tools.refreshGrid(this._idGrid);
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
                element: (this._grabaAprueba) ? `#${PREBTNCTXT}${this._alias}${APP_BTN.GRBAPR}` : `#${PREBTNCTXT}${this._alias}${APP_BTN.GRB}`,
                context: this,
                form: (this._tienePreconversion == 1) ? this._idFormPreConversionEdit : this._idFormPreConversion,
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
                    sData.push({name: '_conformeAll', value: this._conformeAll});
                },
                response: (data) => {
                    Tools.execMessage(data);
                    if (data.ok_error != 'error') {
                        this.closeNewPreconversion(null, null);
                        if (closeObs) {
                            Tools.closeModal(this._idFormObservacion);
                        }
                        Tools.refreshGrid(this._idGrid);
                        //se desactiva la carga de localstorage, debido a q ya se guardaron los datos, para el siguiente nuevo, no 
                        //deberia cargar los datos de un formulario que ya fure grabado
                        Tools.stopDataLocalStorage();
                    }
                }
            });
        };

        this._getFormatoHojaUnica = (btn, tk) => {
            this.send({
                token: tk,
                element: btn,
                context: this,
                gifProcess: true,
                serverParams: (sData) => {
                    sData.push({name: '_keyPropietario', value: this._keyPropietario});
                },
                response: (data) => {
                    if (data.result == 1) {
                        Tools.forceDownload({
                            path: 'files/temp/TmpFHU.pdf',
                            name: 'TmpFHU.pdf'
                        });
                    } else {
                        Tools.notify().error({
                            content: APP_MSN.comuniquese
                        });
                    }
                }
            });
        };

        this._getFormatoSolicitudCobranza = (btn, tk) => {
            this.send({
                token: tk,
                element: btn,
                context: this,
                gifProcess: true,
                serverParams: (sData) => {
                    sData.push({name: '_keyPropietario', value: this._keyPropietario});
                },
                response: (data) => {
                    if (data.result == 1) {
                        Tools.forceDownload({
                            path: 'files/temp/TmpFSOLCOB.pdf',
                            name: 'TmpFSOLCOB.pdf'
                        });
                    } else {
                        Tools.notify().error({
                            content: APP_MSN.comuniquese
                        });
                    }
                }
            });
        };

        this._getFormatoContrato = (btn, tk) => {
            this.send({
                token: tk,
                element: btn,
                context: this,
                gifProcess: true,
                serverParams: (sData) => {
                    sData.push({name: '_keyPropietario', value: this._keyPropietario});
                },
                response: (data) => {
                    if (data.result == 1) {
                        Tools.forceDownload({
                            path: 'files/temp/TmpFCONT.pdf',
                            name: 'TmpFCONT.pdf'
                        });
                    } else {
                        Tools.notify().error({
                            content: APP_MSN.comuniquese
                        });
                    }
                }
            });
        };

        this._getFormatoConsentimiento = (btn, tk) => {
            this.send({
                token: tk,
                element: btn,
                context: this,
                gifProcess: true,
                serverParams: (sData) => {
                    sData.push({name: '_keyPropietario', value: this._keyPropietario});
                },
                response: (data) => {
                    if (data.result == 1) {
                        Tools.forceDownload({
                            path: 'files/temp/TmpFCONSEN.pdf',
                            name: 'TmpFCONSEN.pdf'
                        });
                    } else {
                        Tools.notify().error({
                            content: APP_MSN.comuniquese
                        });
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
        this._consentimiento_1 = 0;
        this._consentimiento_2 = 0;
        this._consentimiento_3 = 0;
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

    formConsentimiento(btn, tk) {
        this.send({
            element: btn,
            token: tk,
            context: this,
            modal: true,
            dataType: 'text',
            success: (obj) => {
                $(APP_MAIN_MODALS).append(obj.data);
            },
            final: (obj) => {/*se ejecuta una vez que se cargo el HTML en success*/
                this.addButtonsCons();
                this.setConsentimiento(this._idFormConsentimiento);
            }
        });
    }

    formViewConsentimiento(btn, tk) {
        this.send({
            element: btn,
            token: tk,
            context: this,
            modal: true,
            dataType: 'text',
            success: (obj) => {
                $(APP_MAIN_MODALS).append(obj.data);
            },
            final: (obj) => {/*se ejecuta una vez que se cargo el HTML en success*/
                this.setConsentimiento(this._idFormViewConsentimiento);
            }
        });
    }

    formNewVehiculo(btn, tk) {
        this._keyPropietario = null;
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

    formPreConversion(btn, id, tiene, tk) {
        this._grabaAprueba = 0;
        this._keyPropietario = id;
        this._tienePreconversion = tiene;

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

    formViewPreConversion(btn, id, tk) {
        this._keyPropietario = id;

        Tools.addTab({
            context: this,
            id: `${this._alias}-VTPC`,
            label: APP_ETIQUET.pre_conversion,
            fnCallback: () => {
                this._formViewPreConversion(tk);
            }
        });
    }

    formEditVehiculo(btn, id, tk) {
        this.closeNewVehiculo(null, null);
        this._keyPropietario = id;

        Tools.addTab({
            context: this,
            id: `${this._alias}-NWV`,
            label: APP_ETIQUET.registrar_vehiculo,
            fnCallback: () => {
                this._formEditVehiculo(tk);
            }
        });
    }

    formViewExpediente(btn, id, tk) {
        this.closeExpediente(null, null);
        this._keyPropietario = id;

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
        //validar antiguedad de vericulo
        if (this.isOld()) {
            Tools.notify().smallMsn({
                content: APP_MSN.antiguedad_10_anios
            });
        } else {
            this.send({
                flag: 1,
                token: tk,
                element: `#${PREBTNCTXT}${this._alias}${APP_BTN.GRB}`,
                context: this,
                form: this._idFormVehiculo,
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
                    sData.push({name: '_imgContratoFinanciamitoCalidda', value: this._imgContratoFinanciamitoCalidda});
                    sData.push({name: '_consentimiento_1', value: this._consentimiento_1});
                    sData.push({name: '_consentimiento_2', value: this._consentimiento_2});
                    sData.push({name: '_consentimiento_3', value: this._consentimiento_3});
                },
                response: (data) => {
                    Tools.execMessage(data);
                    if (data.ok_error != 'error') {
                        this.closeNewVehiculo(null, null);
                        this._grid(tk);
                        Tools.stopDataLocalStorage();
                    }
                }
            });
        }
    }

    postNewPreconversion(tk) {
        //verificar si existe algun NO CONFORME y mostrar formulario para la observacion
        if (!this.isConforme()) {
            this._conformeAll = 0;
            this._formObservacion(tk);
        } else {
            this._conformeAll = 1;
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
        if (this.isOld()) {
            Tools.notify().smallMsn({
                content: APP_MSN.antiguedad_10_anios
            });
        } else {
            this.send({
                flag: 2,
                token: tk,
                element: `#${PREBTNCTXT}${this._alias}${APP_BTN.UPD}`,
                context: this,
                form: this._idFormVehiculoEdit,
                serverParams: (sData, obj) => {
                    sData.push({name: '_keyPropietario', value: this._keyPropietario});
                    sData.push({name: '_consentimiento_1', value: this._consentimiento_1});
                    sData.push({name: '_consentimiento_2', value: this._consentimiento_2});
                    sData.push({name: '_consentimiento_3', value: this._consentimiento_3});
                },
                response: (data) => {
                    Tools.execMessage(data);
                    if (data.ok_error != 'error') {
                        this._keyPropietario = null;
                        this.closeNewVehiculo(null, null);
                        Tools.refreshGrid(this._idGrid);
                    }
                }
            });
        }
    }

    postAprobar(btn, id, confirmado, tk) {
        this._keyPropietario = id;

        this._validaAdjuntos(btn, tk).done((data) => {
            if (/null/g.test(JSON.stringify(data))) {
                this._formValidaAdjuntos(tk, data);
                return false;
            }
            if (confirmado == 0 || $.isEmptyObject(confirmado) || !$.isNumeric(confirmado)) {
                Tools.notify().smallMsn({
                    content: APP_MSN.no_conforme, color: '#C79121'
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

    postDelete(btn, id, tk) {
        Tools.notify().confirm({
            content: APP_MSN.you_sure_delete,
            yes: () => {
                this._postDelete(btn, id, tk);
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

    postUploadVideo(tk, load, elf) {
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
        this._getVehiculos(tk);
    }

    addConsentimiento(tk) {
        Tools.closeModal(this._idFormConsentimiento);

        this._consentimiento_1 = ($(`#${this._alias}chk_consentimiento_1`).is(':checked')) ? 1 : 0;
        this._consentimiento_2 = ($(`#${this._alias}chk_consentimiento_2`).is(':checked')) ? 1 : 0;
        this._consentimiento_3 = ($(`#${this._alias}chk_consentimiento_3`).is(':checked')) ? 1 : 0;
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