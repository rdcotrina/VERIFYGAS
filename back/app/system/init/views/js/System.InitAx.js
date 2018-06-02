"use strict";
$$.System.InitAx = class InitAx extends $$.System.InitRsc {

    constructor() {
        super();
        this._controller = 'init:';
        this._alias = 'LG__';
        this._formLogin = `#${this._alias}formLogin`;

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
                if(idrol == 4){
                    location.href =`${window.location.href}developer`;
                }else{
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