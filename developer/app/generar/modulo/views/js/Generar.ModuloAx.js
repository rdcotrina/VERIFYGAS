"use strict";
$$.Generar.ModuloAx = class ModuloAx extends $$.Generar.ModuloRsc {

    constructor() {
        super();
        this._controller = 'modulo:';
        this._alias = Exe.getAlias();
        this._dmain = `#${this._alias}${APP_CONTAINER_TABS}`; /*contenedor principal de opcion*/
        this._keyModulo = null;
        this._keyOption = null;
        this._parent = 0;
        this._formNewModulo = `#${this._alias}formNewModulo`;
        this._formNewOpcion = `#${this._alias}formNewOpcion`;
        this._formNewComponent = `#${this._alias}formNewComponent`;

        this._getFolders = (tk) => {
            this.send({
                token: tk,
                context: this,
                success: (obj) => {
                    this.renderFolders(obj.data);
                }
            });
        };

        this._formIndex = (tk) => {
            this.send({
                token: tk,
                context: this,
                dataType: 'text',
                tour: true,
                success: (obj) => {
                    $(this._dmain).append(obj.data);
                },
                final: (obj) => {
                    this.addBtnNew();
                    $(`#${this._alias}d_modulo`).html(`<div class="text-center">${Tools.spinner().main}</div>`);
                    this._getFolders(tk);
                }
            });
        };

        this._postDeleteFolder = (btn, tk) => {
            let id = $(btn).parent().parent().parent('div').data('kmodulo');
            this.send({
                token: tk,
                context: this,
                element: btn,
                gifProcess: true,
                serverParams: (sData, obj) => {
                    sData.push({name: '_folder', value: id});
                },
                success: (obj) => {
                    if (obj.data.ok_error != 'error') {
                        this._getFolders(tk);
                        Tools.execMessage(obj.data);
                    }
                }
            });
        };

        this._postDeleteOpcion = (btn, tk) => {
            let id = $(btn).parent('div').data('k');
            this.send({
                token: tk,
                context: this,
                element: btn,
                gifProcess: true,
                serverParams: (sData, obj) => {
                    sData.push({name: '_folder', value: id});
                },
                success: (obj) => {
                    if (obj.data.ok_error != 'error') {
                        this._getFolders(tk);
                        Tools.execMessage(obj.data);
                    }
                }
            });
        };

        this._getTablesDB = (tk) => {
            this.send({
                token: tk,
                context: this,
                success: (obj) => {
                    this._renderTables(obj.data);
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

    formNewModulo(btn, tk) {
        this.send({
            element: btn,
            gifProcess: true,
            token: tk,
            context: this,
            modal: true,
            dataType: 'text',
            success: (obj) => {
                $(this._dmain).append(obj.data);
            },
            final: (obj) => {/*se ejecuta una vez que se cargo el HTML en success*/
                this.addButtonsFormNew();
            }
        });
    }

    formNewOpcion(btn, tk) {
        this._keyModulo = $(btn).parent().parent().parent('div').data('kmodulo');
        this.send({
            element: btn,
            gifProcess: true,
            token: tk,
            context: this,
            modal: true,
            dataType: 'text',
            success: (obj) => {
                $(this._dmain).append(obj.data);
            },
            final: (obj) => {/*se ejecuta una vez que se cargo el HTML en success*/
                this.addButtonsFormNew();
            }
        });
    }

    formNewComponent(btn, tk) {
        this._clearParams();
        this._keyOption = $(btn).parent('div').data('k');
        this.send({
            element: btn,
            gifProcess: true,
            token: tk,
            context: this,
            modal: true,
            dataType: 'text',
            success: (obj) => {
                $(this._dmain).append(obj.data);
            },
            final: (obj) => {/*se ejecuta una vez que se cargo el HTML en success*/
                this.addButtonsFormNew();
                this.addEvtsElements(tk);   
                this._optionEtiquets();
                this._optionCssWidth('col-lg-')
            }
        });
    }

    postNewModulo(tk) {
        this.send({
            token: tk,
            element: `#${PREBTNCTXT}${this._alias}${APP_BTN.GRB}`,
            context: this,
            form: this._formNewModulo,
            success: (obj) => {
                Tools.execMessage(obj.data);
                if (obj.data.ok_error != 'error') {
                    this._getFolders(tk);
                    Tools.closeModal(this._formNewModulo);
                }
            }
        });
    }

    postNewOption(tk) {
        this.send({
            token: tk,
            element: `#${PREBTNCTXT}${this._alias}${APP_BTN.GRB}`,
            context: this,
            form: this._formNewOpcion,
            serverParams: (sData, obj) => {
                sData.push({name: '_keyModulo', value: this._keyModulo});
            },
            success: (obj) => {
                Tools.execMessage(obj.data);
                if (obj.data.ok_error != 'error') {
                    this._getFolders(tk);
                    Tools.closeModal(this._formNewOpcion);
                    this._keyModulo = null;
                }
            }
        });
    }

    postDeleteFolder(btn, tk) {
        Tools.notify().confirm({
            content: APP_MSN.you_sure_delete,
            yes: () => {
                this._postDeleteFolder(btn, tk);
            }
        });
    }

    postDeleteOpcion(btn, tk) {
        Tools.notify().confirm({
            content: APP_MSN.you_sure_delete,
            yes: () => {
                this._postDeleteOpcion(btn, tk);
            }
        });
    }
    
    deleteItem(btn,tk){
        this._removeItem(btn);        
    }

}; 