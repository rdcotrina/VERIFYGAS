"use strict";
Exe.require({require: {system: 'init::System.InitTour'}, run: false});
$$.System.InitRsc = class InitRsc extends Resource {

    constructor() {
        super();
    }

    addTour(){
        $('#btnTour').click(function () {
            Obj.System.InitTour.home();
        });
    }
    
    validate() {
        $("#LG__formLogin").validate({
            // Rules for form validation
            rules: {
                LG__txtUser: {
                    required: true,
                    minlength: 3
                },
                LG__txtClave: {
                    required: true,
                    minlength: 3
                }
            },
            // No cambie el código de abajo
            errorPlacement: (error, element) => {
                error.insertAfter(element.parent());
            },
            submitHandler: () => {
                Obj.System.InitAx.postLogin();
            }
        });
    }

    addEvtsPanelConfigRsc(context) {
        var v;
        $('#smart-fixed-header').click(function () {
            v = ($(this).is(':checked')) ? 1 : 0;
            context.appTheme(1, v);
        });
        $('#smart-fixed-navigation').click(function () {
            v = ($(this).is(':checked')) ? 1 : 0;
            context.appTheme(2, v);
        });
        $('#smart-fixed-ribbon').click(function () {
            v = ($(this).is(':checked')) ? 1 : 0;
            context.appTheme(3, v);
        });

        $('#smart-fixed-footer').click(function () {
            v = ($(this).is(':checked')) ? 1 : 0;
            context.appTheme(4, v);
        });
        $('#smart-fixed-container').click(function () {
            v = ($(this).is(':checked')) ? 1 : 0;
            context.appTheme(5, v);
        });
        $('#smart-rtl').click(function () {
            v = ($(this).is(':checked')) ? 1 : 0;
            context.appTheme(6, v);
        });
        $('#smart-topmenu').click(function () {
            v = ($(this).is(':checked')) ? 1 : 0;
            context.appTheme(7, v);
        });
        $('#colorblind-friendly').click(function () {
            v = ($(this).is(':checked')) ? 1 : 0;
            context.appTheme(8, v);
        });
        $('#smart-style-0').click(function () {
            v = ($(this).data('value') == 1) ? 0 : 1;
            $(this).data('value', v);
            context.appTheme(9, v);
        });
        $('#smart-style-1').click(function () {
            context.appTheme(10, 1);
        });
        $('#smart-style-2').click(function () {
            context.appTheme(11, 1);
        });
        $('#smart-style-3').click(function () {
            context.appTheme(12, 1);
        });
        $('#smart-style-4').click(function () {
            context.appTheme(13, 1);
        });
        $('#smart-style-5').click(function () {
            context.appTheme(14, 1);
        });
        $('#smart-style-6').click(function () {
            context.appTheme(15, 1);
        });
    }

    inactividadRsc() {
        $(document).idleTimeout({
            redirectUrl: 'Obj.System.InitAx.logOut(null);',
            idleTimeLimit: 1800, // 'No activity' time limit in seconds. 1800 = 30 Minutes, DEBE VENIR DE LA DB
            dialogTitle: APP_ETIQUET.cierre_sesion,
            dialogText: APP_ETIQUET.inactividad,
            dialogTimeRemaining: APP_ETIQUET.tiempo_inactividad,
            dialogStayLoggedInButton: APP_ETIQUET.continuar,
            dialogLogOutNowButton: APP_ETIQUET.salir
        });
    }

    setResultadosTaller(data) {
        Tools.setDataForm(this._idFormDashBoardTaller, {
            alias: this._alias,
            elements: [
                {item: 'sp_aprobados', value: data.aprobados, type: 'html'},
                {item: 'sp_rechazados', value: data.rechazados, type: 'html'},
                {item: 'sp_pendientes', value: data.pendientes, type: 'html'}
            ]
        });
    }

};  