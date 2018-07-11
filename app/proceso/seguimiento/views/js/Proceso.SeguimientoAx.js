/* 
 * ---------------------------------------
 * --------- CREATED BY LV ----------
 * Autor:        Super 
 * Fecha:        21-06-2018 08:06:04 
 * Descripcion : SeguimientoAx.js
 * ---------------------------------------
 */
"use strict";

$$.Proceso.SeguimientoAx = class SeguimientoAx extends $$.Proceso.SeguimientoRsc {

    constructor() {
        super();
        this._controller = 'seguimiento:';
        this._alias = Exe.getAlias();
        this._dmain = `#${this._alias}${APP_CONTAINER_TABS}`; /*contenedor principal de opcion*/
        this._tour = Obj.Proceso.SeguimientoTour;
        this._idFormIndex = `#${this._alias}formIndex`;
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
                finally: (data) => {
                    this.addBtnSearch();
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

        this._getObservacion = (tk, id, tipoRechaso, quien) => {
            this.send({
                token: tk,
                gifProcess: true,
                context: this,
                serverParams: (sData) => {
                    sData.push({name: '_keyPropietario', value: id});
                    sData.push({name: '_tipoRechaso', value: tipoRechaso});
                    sData.push({name: '_quien', value: quien});
                },
                response: (data) => {
                    $(`#${this._alias}d_observacion`).html(data.observacion);
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

    postSearch(btn, tk) {
        if ($(`#${this._alias}txt_fecha`).val().length == 0 && $(`#${this._alias}txt_nroexp`).val().length == 0 && $(`#${this._alias}txt_placa`).val().length == 0 && $(`#${this._alias}txt_marca`).val().length == 0 && $(`#${this._alias}txt_modelo`).val().length == 0) {
            Tools.notify().smallMsn({
                content: APP_MSN.ingrese_parametro
            });
            return false;
        }
        this._getVehiculos(tk);
    }

    printExpediente(btn, tk) {
        this._keyPropietario = $(btn).parent().parent().parent().data('propietario');

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
                    let zip_file_path = 'files/temp/Expediente.zip' //put inside "" your path with file.zip
                    let zip_file_name = "Expediente.zip" //put inside "" file name or something
                    let a = document.createElement("a");
                    document.body.appendChild(a);
                    a.style = "display: none";
                    a.href = zip_file_path;
                    a.download = zip_file_name;
                    a.click();
                    document.body.removeChild(a);

                } else {
                    Tools.notify().error({
                        content: APP_MSN.comuniquese
                    });
                }
            }
        });
    }

    printPreConversion(btn, tk) {
        this._keyPropietario = $(btn).parent().parent().parent().data('propietario');

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
                    let zip_file_path = 'files/temp/PreConversion.zip' //put inside "" your path with file.zip
                    let zip_file_name = "PreConversion.zip" //put inside "" file name or something
                    let a = document.createElement("a");
                    document.body.appendChild(a);
                    a.style = "display: none";
                    a.href = zip_file_path;
                    a.download = zip_file_name;
                    a.click();
                    document.body.removeChild(a);
                } else if (data.result == 3) {
                    Tools.notify().smallMsn({
                        content: APP_MSN.no_informacion
                    });
                } else {
                    Tools.notify().error({
                        content: APP_MSN.comuniquese
                    });
                }
            }
        });
    }

    printConversion(btn, tk) {
        this._keyPropietario = $(btn).parent().parent().parent().data('propietario');

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
                    let zip_file_path = 'files/temp/Conversion.zip' //put inside "" your path with file.zip
                    let zip_file_name = "Conversion.zip" //put inside "" file name or something
                    let a = document.createElement("a");
                    document.body.appendChild(a);
                    a.style = "display: none";
                    a.href = zip_file_path;
                    a.download = zip_file_name;
                    a.click();
                    document.body.removeChild(a);
                } else if (data.result == 3) {
                    Tools.notify().smallMsn({
                        content: APP_MSN.no_informacion
                    });
                } else {
                    Tools.notify().error({
                        content: APP_MSN.comuniquese
                    });
                }
            }
        });
    }

    printEntrega(btn, tk) {
        this._keyPropietario = $(btn).parent().parent().parent().data('propietario');

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
                    let zip_file_path = 'files/temp/Entrega.zip' //put inside "" your path with file.zip
                    let zip_file_name = "Entrega.zip" //put inside "" file name or something
                    let a = document.createElement("a");
                    document.body.appendChild(a);
                    a.style = "display: none";
                    a.href = zip_file_path;
                    a.download = zip_file_name;
                    a.click();
                    document.body.removeChild(a);
                } else if (data.result == 3) {
                    Tools.notify().smallMsn({
                        content: APP_MSN.no_informacion
                    });
                } else {
                    Tools.notify().error({
                        content: APP_MSN.comuniquese
                    });
                }
            }
        });
    }

    formObservacion(tk, id, expediente, tipoRechaso, quien) {
        this.send({
            token: tk,
            context: this,
            dataType: 'text',
            modal: true,
            response: (data) => {
                $(APP_MAIN_MODALS).append(data);
            },
            finally: (data) => {
                $(`#${this._alias}d_expe`).html(expediente);
                this._getObservacion(tk, id, tipoRechaso, quien);
            }
        });
    }

};