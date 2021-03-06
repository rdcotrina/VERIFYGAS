/* 
 * ---------------------------------------
 * --------- CREATED BY LV ----------
 * Autor:        Super 
 * Fecha:        08-06-2018 07:06:19 
 * Descripcion : EntregaAx.js
 * ---------------------------------------
 */
"use strict";

$$.Proceso.EntregaAx = class EntregaAx extends $$.Proceso.EntregaRsc {

    constructor() {
        super();
        this._controller = 'entrega:';
        this._alias = Exe.getAlias();
        this._dmain = `#${this._alias}${APP_CONTAINER_TABS}`; /*contenedor principal de opcion*/
        this._tour = Obj.Proceso.EntregaTour;
        this._idFormIndex = `#${this._alias}formIndex`;
        this._ifFormObservacionRechazar = `#${this._alias}formObservacionRechazar`;
        this._idFormEntrega = `#${this._alias}formEntrega`;
        this._idFormEntregaEdit = `#${this._alias}formEntregaEdit`;
        this._idFormViewEntrega = `#${this._alias}formViewEntrega`;
        this._keyPropietario = null;
        this._documentoEscaneado_1 = null;
        this._documentoEscaneado_2 = null;
        this._documentoEscaneado_3 = null;
        this._documentoEscaneado_4 = null;
        this._documentoEscaneado_5 = null;
        this._documentoEscaneado_6 = null;
        this._documentoEscaneado_7 = null;
        this._documentoEscaneado_8 = null;
        this._documentoEscaneado_9 = null;
        this._documentoEscaneado_10 = null;
        this._documentoEscaneado_11 = null;
        this._documentoEscaneado_12 = null;
        this._documentoEscaneado_13 = null;
        this._tieneEntrega = 0;
        this._grabaAprueba = 0;
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
                                    button: APP_BTN.ENT,
                                    ajax: {
                                        fn: "Obj.Proceso.EntregaAx.formEntrega",
                                        serverParams: ["id_propietario", "tiene_entrega"]
                                    }
                                }, {
                                    button: APP_BTN.VENT,
                                    ajax: {
                                        fn: "Obj.Proceso.EntregaAx.formViewEntrega",
                                        serverParams: ["id_propietario"]
                                    }
                                }, {
                                    button: APP_BTN.FIN,
                                    ajax: {
                                        fn: "Obj.Proceso.EntregaAx.postFinalizar",
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
                        Tools.refreshGrid(this._idGrid);
                    }
                }
            });
        };

        this._postFinalizar = (btn, tk) => {
//            this._keyPropietario = $(btn).parent('div').data('propietario');
            this.send({
                flag: 1,
                token: tk,
                context: this,
                element: btn,
                serverParams: (sData, obj) => {
                    sData.push({name: '_keyPropietario', value: this._keyPropietario});
                },
                response: (data) => {
                    if (data.ok_error != 'error') {
                        Tools.execMessage(data);
                        Tools.refreshGrid(this._idGrid);
                    }
                }
            });
        };

        this._formEntrega = (tk) => {
            this.send({
                token: tk,
                context: this,
                dataType: 'text',
                response: (data) => {
                    $(`#${this._alias}-TENT${APP_CONTAINER_TABS}`).html(data);
                },
                finally: (data) => {
                    this.addBtnSave();
                    this._findPropietario(tk, this._idFormEntrega);
                    this.setEvents(tk);
                }
            });
        };

        this._formEntregaEdit = (tk) => {
            this.send({
                token: tk,
                context: this,
                dataType: 'text',
                response: (data) => {
                    $(`#${this._alias}-TENT${APP_CONTAINER_TABS}`).html(data);
                },
                finally: (data) => {
                    this.addBtnSave();
                    this._findPropietario(tk, this._idFormEntregaEdit);
                    this.setEvents(tk);
                }
            });
        };

        this._formViewEntrega = (tk) => {
            this.send({
                token: tk,
                context: this,
                dataType: 'text',
                response: (data) => {
                    $(`#${this._alias}-TENT${APP_CONTAINER_TABS}`).html(data);
                },
                finally: (data) => {
                    this.addBtnClose();
                    this._findPropietario(tk, this._idFormViewEntrega);
                    this._getEntrega(tk);
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
                    this.setPropietario(data, form);
                }
            });
        };

        this._getEntrega = (tk) => {
            return this.send({
                token: tk,
                gifProcess: true,
                context: this,
                serverParams: (sData, obj) => {
                    sData.push({name: '_keyPropietario', value: this._keyPropietario});
                },
                response: (data) => {
                    this.setEntrega(data);
                }
            });
        };

        this._postEntrega = (tk) => {
            this.send({
                flag: 1,
                token: tk,
                gifProcess: true,
                element: (this._grabaAprueba == 1) ? `#${PREBTNCTXT}${this._alias}${APP_BTN.GRBAPR}` : `#${PREBTNCTXT}${this._alias}${APP_BTN.GRB}`,
                context: this,
                form: (this._tieneEntrega == 0) ? this._idFormEntrega : this._idFormEntregaEdit,
                serverParams: (sData, obj) => {
                    sData.push({name: '_documentoEscaneado_1', value: this._documentoEscaneado_1});
                    sData.push({name: '_documentoEscaneado_2', value: this._documentoEscaneado_2});
                    sData.push({name: '_documentoEscaneado_4', value: this._documentoEscaneado_4});
                    sData.push({name: '_documentoEscaneado_5', value: this._documentoEscaneado_5});
                    sData.push({name: '_documentoEscaneado_11', value: this._documentoEscaneado_11});
                    sData.push({name: '_documentoEscaneado_13', value: this._documentoEscaneado_13});
                    sData.push({name: '_keyPropietario', value: this._keyPropietario});
                    sData.push({name: '_grabaAprueba', value: this._grabaAprueba});
                },
                response: (data) => {
                    Tools.execMessage(data);
                    if (data.ok_error != 'error') {
                        this.closeEntrega(null, null);
                        Tools.refreshGrid(this._idGrid);
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

    postAprobar(btn, tk) {
        Tools.notify().confirm({
            content: APP_MSN.aprobar,
            yes: () => {
                this._postAtender(btn, tk, 1);
            }
        });
    }

    postFinalizar(btn, id, tk) {
        this._keyPropietario = id;
        Tools.notify().confirm({
            content: APP_MSN.finalizar,
            yes: () => {
                this._postFinalizar(btn, tk);
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

    formEntrega(btn, id, tiene, tk) {
        this._grabaAprueba = 0;
        this._keyPropietario = id;
        this._tieneEntrega = tiene;
        this._nroExpediente = $.trim($(btn).parent().parent().parent().parent().parent('tr').find('td:eq(2)').html());
        this._documentoEscaneado_1 = null;
        this._documentoEscaneado_2 = null;
        this._documentoEscaneado_4 = null;
        this._documentoEscaneado_5 = null;
        this._documentoEscaneado_11 = null;
        this._documentoEscaneado_13 = null;

        Tools.addTab({
            context: this,
            id: `${this._alias}-TENT`,
            label: APP_ETIQUET.entrega,
            fnCallback: () => {
                if (this._tieneEntrega == 0) {
                    this._formEntrega(tk);
                } else {
                    this._formEntregaEdit(tk);
                }
            }
        });
    }

    formViewEntrega(btn, id, tk) {
        this._keyPropietario = id;

        Tools.addTab({
            context: this,
            id: `${this._alias}-TENT`,
            label: APP_ETIQUET.entrega,
            fnCallback: () => {
                this._formViewEntrega(tk);
            }
        });
    }

    postEntrega(tk) {
        if (this._grabaAprueba == 1) {//si graba y aprueba se valida los datos adjuntpos
            let btn = `#${PREBTNCTXT}${this._alias}${APP_BTN.GRBAPR}`;
            this._validaAdjuntos(btn, tk).done((data) => {

                //validacion cuando se esta editando la entrega
                if (/null/g.test(JSON.stringify(data)) && this._tieneEntrega == 1) {
                    this._formValidaAdjuntos(tk, data);
                    return false;
                }
                //validacion cuando no se esta llenando por primera vea la antrega y se quiere aprobar
                if (this._tieneEntrega == 0 && (/null/.test(this._documentoEscaneado_5) || /null/.test(this._documentoEscaneado_13))) {
                    this._formValidaAdjuntos(tk, []);
                    return false;
                }


                Tools.notify().confirm({
                    content: APP_MSN.entrega,
                    yes: () => {
                        this._postEntrega(tk);
                    }
                });
            });
        } else {
            this._postEntrega(tk);
        }
    }

    postUpload(tk, load) {
        this.send({
            token: tk,
            gifProcess: true,
            context: this,
            form: (this._tieneEntrega == 0) ? this._idFormEntrega : this._idFormEntregaEdit,
            formData: true,
            serverParams: (sData, obj) => {
                sData.push({name: '_load', value: load});
                sData.push({name: '_keyPropietario', value: this._keyPropietario});
                sData.push({name: '_tieneEntrega', value: this._tieneEntrega});
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

    closeEntrega(btn, tk) {
        Tools.closeTab(`${this._alias}-TENT`);
    }

    postSearch(btn, tk) {
        Tools.refreshGrid(this._idGrid);
    }

};