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

};