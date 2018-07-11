"use strict";
$$.System.InitAx = class InitAx extends $$.System.InitRsc {

    constructor() {
        super();
        this._controller = 'init:';
        this._alias = 'LG__';
        this._formLogin = `#${this._alias}formLogin`;
        this._idFormDashBoardTaller = `#${this._alias}formDashBoardTaller`;
        this._idFormDashBoardVerifygas = `#${this._alias}formDashBoardVerifygas`;
        this._idFormDashBoardCalidda = `#${this._alias}formDashBoardCalidda`;
        this._idFormDashBoardAsesorComercial = `#${this._alias}formDashBoardAsesorComercial`;
        this._idFormListExpedientes = `#${this._alias}formListExpedientes`;
        this._dmain = `#${this._alias}${APP_CONTAINER_TABS}`; /*contenedor principal de opcion*/

        this._logOut = () => {
            this.send({
                token: _tk_,
                flag: 1,
                encrypt: true,
                context: this,
                success: (obj) => {
                    location.reload(true);
                }
            });
        };

        this._resultadosTaller = (tk, f) => {
            this.send({
                token: tk,
                context: this,
                response: (data) => {
                    this.setResultadosTaller(data, f);
                }
            });
        };

        this._resultadosVerifygas = (tk) => {
            this.send({
                token: tk,
                context: this,
                response: (data) => {
                    this.setResultadosVerifygas(data);
                }
            });
        };

        this._resultadosPecs = (tk) => {
            this.send({
                token: tk,
                context: this,
                response: (data) => {
                    this.setResultadosPecs(data);
                }
            });
        };

        this._resultadosCalidda = (tk) => {
            this.send({
                token: tk,
                context: this,
                response: (data) => {
                    this.setResultadosCalidda(data);
                }
            });
        };

        this._formDashBoardTaller = (tk) => {
            this.send({
                token: tk,
                context: this,
                dataType: 'text',
                response: (data) => {
                    $(this._dmain).html(data);
                },
                final: (obj) => {/*se ejecuta una vez que se cargo el HTML en success*/
                    //recargar panel de taller cada 5 minutos = 300000
                    setInterval(()=>{
                        this._resultadosTaller(tk, this._idFormDashBoardTaller);
                    },300000);
                    this._resultadosTaller(tk, this._idFormDashBoardTaller);
                }
            });
        };

        this._formDashBoardAsesorComercial = (tk) => {
            this.send({
                token: tk,
                context: this,
                dataType: 'text',
                response: (data) => {
                    $(this._dmain).html(data);
                },
                final: (obj) => {/*se ejecuta una vez que se cargo el HTML en success*/
                    //recargar panel de asesor cada 5 minutos = 300000
                    setInterval(()=>{
                        this._resultadosTaller(tk, this._idFormDashBoardAsesorComercial);
                    },300000);
                    this._resultadosTaller(tk, this._idFormDashBoardAsesorComercial);
                }
            });
        };

        this._formDashBoardVerifygas = (tk) => {
            this.send({
                token: tk,
                context: this,
                dataType: 'text',
                response: (data) => {
                    $(this._dmain).html(data);
                },
                final: (obj) => {/*se ejecuta una vez que se cargo el HTML en success*/
                    //recargar panel de Verifygas cada 2 minutos = 120000
                    setInterval(()=>{
                        this._resultadosVerifygas(tk);
                    },120000);
                    this._resultadosVerifygas(tk);
                }
            });
        };

        this._formDashBoardCalidda = (tk) => {
            this.send({
                token: tk,
                context: this,
                dataType: 'text',
                response: (data) => {
                    $(this._dmain).html(data);
                },
                final: (obj) => {/*se ejecuta una vez que se cargo el HTML en success*/
                    //recargar panel de Calidda cada 5 minutos = 300000
                    setInterval(()=>{
                        this._resultadosCalidda(tk);
                    },300000);
                    this._resultadosCalidda(tk);
                }
            });
        };

        this._formDashBoardPecs = (tk) => {
            this.send({
                token: tk,
                context: this,
                dataType: 'text',
                response: (data) => {
                    $(this._dmain).html(data);
                },
                final: (obj) => {/*se ejecuta una vez que se cargo el HTML en success*/
                    //recargar panel de Pecs cada 5 minutos = 300000
                    setInterval(()=>{
                        this._resultadosPecs(tk);
                    },300000);
                    this._resultadosPecs(tk);
                }
            });
        };

        this._formDashBoard = (tk) => {
            this.send({
                token: tk,
                context: this,
                dataType: 'text',
                response: (data) => {
                    $(this._dmain).html(data);
                },
                final: (obj) => {/*se ejecuta una vez que se cargo el HTML en success*/
//                    this.addBtnSaveObs();

                }
            });
        };

        //form para listado de clientes segun: ESTADO - TIPO DE PROCESO(PRECONV, CONV, ENTREGA) - ROL(en el modelo se captura el rol)
        this._formListExpedientes = (ids, e) => {
            this.send({
                token: _tk_,
                context: this,
                dataType: 'text',
                modal: true,
                response: (data) => {
                    $(APP_MAIN_MODALS).append(data);
                },
                final: (obj) => {/*se ejecuta una vez que se cargo el HTML en success*/
                    this._getListExpedientes(ids, e, _tk_);
                }
            });
        };

        this._getListExpedientes = (ids, e, tk) => {
            $(`#${this._alias}gridExpedientes`).fullgrid({
                oContext: this,
                tAlias: this._alias,
                pOrderField: 'nro_expediente asc',
                tRegsLength: [10],
                pDisplayLength: 10,
                tColumns: [
                    {title: APP_ETIQUET.expediente, field: 'nro_expediente', width: 100, sortable: true, class: "text-center"},
                    {title: APP_ETIQUET.apellidos_nombres, field: 'css', width: 400,sortable: true,
                        fnReplace: (fila, row) => {
                            return row.nombre_completo;
                            //return `<button type="button" class="${row.css}"><i class="${row.icono}"></i></button>`;
                        }},
                    {title: APP_ETIQUET.placa, field: 'placa', width: 120, sortable: true, class: "text-center"},
                    {title: APP_ETIQUET.marca, field: 'marca', width: 120, sortable: true, class: "text-center"},
                    {title: APP_ETIQUET.modelo, field: 'modelo', width: 120, class: "text-center", sortable: true}
                ],
                fnServerParams: (sData) => {
                    sData.push({name: '_qn', value: Tools.en(tk)});
                    sData.push({name: '_ids', value: ids});
                    sData.push({name: '_estado', value: e});
                },
                fnCallback: (o) => {
                    this._gridBoton = o.oTable;
                }
            });

//            this.send({
//                token: tk,
//                context: this,
//                serverParams: (sData) => {
//                    sData.push({name: '_ids', value: ids});
//                    sData.push({name: '_estado', value: e});
//                },
//                response: (data) => {
//                    // this.setResultadosCalidda(data);
//                }
//            });
        };

    }

    main(tk) {
        this.addTour();
    }

    validaLogin() {
        this.validate();
    }

    postLogin() {
        _sys_sg = 'cnhdte4258udjft~~{[]__...zswfr214';/*solo para el login sera esta cadena*/
        this.send({
            token: _sys_sg, /*solo para el login sera 1*/
            flag: 1,
            element: '#btn_entrar',
            encrypt: true,
            form: this._formLogin,
            context: this,
            success: (obj) => {
                if (obj.data.result == 1) {
                    let row = obj.data.data;
                    localStorage.setItem('__', obj.data.rdm);

                    /*carga de los parametros*/
                    store.set('tienda', row.id_tienda);

                    Tools.notify().ok({
                        content: APP_MSN.login_ok
                    });
                    location.reload(true);
                } else if (obj.data.result == 2) {
                    $("#login,.logo").effect('shake');
                    Tools.notify().error({
                        content: APP_MSN.login_fail
                    });
                } else if (obj.data.result == 3) {
                    $("#login,.logo").effect('shake');
                    Tools.notify().error({
                        content: APP_MSN.error_horario
                    });
                }
            }
        });
    }

    logOut(u) {
        if (!$.isEmptyObject(u)) {
            Tools.notify().confirm({
                content: `<span class="MsgTitle"><i class="fa fa-sign-out" style="color:orange"></i> ${APP_MSN.msn_logout} <span style="color:orange"><strong>${u}</strong></span> ?</span><p>${APP_MSN.msn_seguridad_logout}</p>`,
                yes: () => {
                    this._logOut();
                }
            });
        } else {
            this._logOut(); //se cierra desde ventana de inactividad
        }
    }

    formDashBoard() {
        Tools.addTab({
            context: this,
            id: this._alias,
            label: 'Panel',
            fnCallback: () => {
                switch (parseInt(APP_IDROL)) {
                    case 3:
                        this._formDashBoardTaller(_tk_);
                        break;
                    case 5:
                        this._formDashBoardVerifygas(_tk_);
                        break;
                    case 6:
                        this._formDashBoardAsesorComercial(_tk_);
                        break;
                    case 7:
                        this._formDashBoardCalidda(_tk_);
                        break;
                    case 8:
                        this._formDashBoardPecs(_tk_);
                        break;
                    default:
                        this._formDashBoard(_tk_);
                        break;
                }

            }
        });
    }

    postChangeLanguage(elm) {
        this.send({
            flag: 1,
            token: _tk_,
            gifProcess: true,
            context: this,
            serverParams: (sData) => {
                sData.push({name: '_language', value: $(elm).data('lang')});
            },
            success: (obj) => {
                location.reload(true);
            }
        });
    }

    postChangeRol(idrol) {
        this.send({
            token: _tk_,
            gifProcess: true,
            context: this,
            serverParams: (sData) => {
                sData.push({name: '_idRol', value: idrol});
            },
            success: (obj) => {
                //si rol es 4=> developer,cargar app developer
                if (idrol == 4) {
                    location.href = `${window.location.href}developer`;
                } else {
                    location.reload(true);
                }
            }
        });
    }

    addEvtsPanelConfig() {
        this.addEvtsPanelConfigRsc(this);
    }

    inactividad() {
        this.inactividadRsc();
    }

    appTheme(f, v) {
        this.send({
            token: _tk_,
            flag: f,
            context: this,
            serverParams: (sData) => {
                sData.push({name: '_value', value: v});
            },
            success: (obj) => {
                if (f == 7) {
                    location.reload();
                }
            }
        });
    }

}; 