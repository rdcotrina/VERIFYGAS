<?php

/**
 * Description of InitController
 *
 * @author DC
 */

namespace System\Init\Controllers;

use \Vendor\Controller;

class InitController extends \System\Init\Models\InitModel {

    use Controller {
        Controller::__construct as private __cConstruct;
    }

    public function __construct() {
        parent::__construct();  /* se ejecuta el constructor del MODEL */
        $this->__cConstruct();  /* se ejecuta el constructor del CONTROLLER */
    }

    public function index() {
        //Obj()->Vendor->Session->destroy();
        if (Obj()->Vendor->Session->get('app_isLogin')) {
            $this->_getLanguaje();
            $this->_getMenuUser();
            $this->_getThemeUser();
            Obj()->Vendor->View->render('index', false);
        } else {
            Obj()->Vendor->View->render('login', false);
        }
    }

    public function postLogin() {
        $data = $this->login();

        if ($data) {
            //validar horario de 7 a 7 de lunes a sabado, danilo,  calida y YO, tienen acceso todos los dias a toda hora
            //1 YO
            //6 danilo
            //18 calidda
            $usersPermitidos = [ 1,2,3];
            $dias = [1, 2, 3, 4, 5, 6];
            if ((!in_array($data['id_usuario'], $usersPermitidos) && in_array(date('w'), $dias) && date('Hi') >= 0700 && date('Hi') <= 1900) ||
                    (in_array($data['id_usuario'], $usersPermitidos))) {



                /*
                 * Sessiones para el sistema
                 */
                Obj()->Vendor->Session->set('app_isLogin', 1);
                Obj()->Vendor->Session->set('app_idTaller', $data['id_taller']);
                Obj()->Vendor->Session->set('app_nameUser', $data['nombre_completo']);
                Obj()->Vendor->Session->set('app_idUsuario', $data['id_usuario']);
                Obj()->Vendor->Session->set('app_idPersona', $data['id_persona']);
                Obj()->Vendor->Session->set('app_language', $data['language']);
                Obj()->Vendor->Session->set('app_navegador', $_SERVER['HTTP_USER_AGENT']);
                Obj()->Vendor->Session->set('app_ipPublica', $_SERVER['REMOTE_ADDR']);
                Obj()->Vendor->Session->set('app_ipLocal', $this->_form->_ipLocal);
                Obj()->Vendor->Session->set('app_hostName', gethostbyaddr($_SERVER['REMOTE_ADDR']));

                /* servira para javascript */
                Obj()->Vendor->Session->set('app_idUsuarioEncrypt', Obj()->Vendor->Tools->encrypt($data['id_usuario']));
                Obj()->Vendor->Session->set('app_idPersonaEncrypt', Obj()->Vendor->Tools->encrypt($data['id_persona']));

                /* grabando ultimo acceso al sistema */
                $this->login(3, $data['id_usuario']);

                /* obteniendo roles de usuario */
                $this->_getRolesUser();
                Obj()->Vendor->Session->set('app_token', number_format(rand(1, 9999999) * rand(1, 9999999), 0, '', '')); // se validara con el token q se enviara via ajax

                echo json_encode(['result' => 1, 'data' => $data, 'rdm' => Obj()->Vendor->Session->get('app_token')]);
            } else {
                echo json_encode(['result' => 3, 'data' => []]);
            }
        } else {
            echo json_encode(['result' => 2, 'data' => []]);
        }
    }

    private function _getThemeUser() {
        Obj()->Vendor->Session->set('app_configThemeUser', $this->qThemeUser());
    }

    private function _getMenuUser() {
        $data = $this->qMenu();

        Obj()->Vendor->Session->set('app_menuUser', json_encode($data));
    }

    private function _getRolesUser() {
        /* obteniendo los roles y cargando rol por defecto */
        $dataRol = $this->qRoles();

        Obj()->Vendor->Session->set('app_roles', $dataRol);
        Obj()->Vendor->Session->set('app_defaultIdRol', $dataRol[0]['id_rol']);
        Obj()->Vendor->Session->set('app_defaultNameRol', $dataRol[0]['nrol']);
    }

    private function _getLanguaje() {
        Obj()->Vendor->Session->set('app_idioms', $this->qLanguage());

        foreach (Obj()->Vendor->Session->get('app_idioms') as $value) {
            if ($value['language'] == Obj()->Vendor->Session->get('app_language')) {
                Obj()->Vendor->Session->set('app_languageFlag', $value['bandera']);
            }
        }
    }

    public function appTheme() {
        echo json_encode($this->spTheme());
    }

    public function resultadosTaller() {
        echo json_encode($this->qResultadosTaller());
    }

    public function resultadosCalidda() {
        $data = [
            'preconversion' => $this->qResultadosCaliddaPreConversion(),
            'conversion' => $this->qResultadosCaliddaConversion(),
            'diarioAprobadasPreConversion' => $this->qResultadosDiarioPreConversionAprobadasC('A'),
            'diarioRechazadosPreConversion' => $this->qResultadosDiarioPreConversionAprobadasC('R'),
            'diarioPendientesPreConversion' => $this->qResultadosDiarioPreConversionPendientesC('P'),
            'diarioAprobadasConversion' => $this->qResultadosDiarioConversionAprobadasC('A'),
            'diarioRechazadosConversion' => $this->qResultadosDiarioConversionAprobadasC('R'),
            'diarioPendientesConversion' => $this->qResultadosDiarioConversionAprobadasC('P'),
            'diarioFinalizadoEntrega' => $this->qResultadosDiarioEntregaAprobadas('F'),
            'diarioPendientesEntrega' => $this->qResultadosDiarioEntregaAprobadas('P')
        ];
        echo json_encode($data);
    }

    public function resultadosVerifygas() {
        $data = [
            'preconversion' => $this->qResultadosCaliddaPreConversion(),
            'conversion' => $this->qResultadosCaliddaConversion(),
            'diarioAprobadasPreConversion' => $this->qResultadosDiarioPreConversionAprobadas('A'),
            'diarioRechazadosPreConversion' => $this->qResultadosDiarioPreConversionAprobadas('R'),
            'diarioPendientesPreConversion' => $this->qResultadosDiarioPreConversionPendientes('P'),
            'diarioAprobadasConversion' => $this->qResultadosDiarioConversionAprobadas('A'),
            'diarioRechazadosConversion' => $this->qResultadosDiarioConversionAprobadas('R'),
            'diarioPendientesConversion' => $this->qResultadosDiarioConversionPendientes('P'),
            'diarioFinalizadoEntrega' => $this->qResultadosDiarioEntregaAprobadas('F'),
            'diarioPendientesEntrega' => $this->qResultadosDiarioEntregaPendientes('P')
        ];
        echo json_encode($data);
    }
    
    public function getListExpedientes() {
        echo json_encode($this->spGrid());
    }

    public function resultadosPecs() {
        $data = [
            'preconversion' => $this->qResultadosPecsPreConversion(),
            'conversion' => $this->qResultadosPecsConversion()
        ];
        echo json_encode($data);
    }

    public function logOut() {
        Obj()->Vendor->Session->destroy();
        echo json_encode(['result' => 1]);
    }

    public function postChangeRol() {
        Obj()->Vendor->Session->set('app_defaultIdRol', $this->_form->_idRol);

        foreach (Obj()->Vendor->Session->get('app_roles') as $row) {
            if ($row['id_rol'] == $this->_form->_idRol) {
                Obj()->Vendor->Session->set('app_defaultNameRol', $row['nrol']);
            }
        }
        echo json_encode(['result' => 1]);
    }

    public function postChangeLanguage() {
        Obj()->Vendor->Session->set('app_language', $this->_form->_language);
        echo json_encode($this->uLanguage());
    }

    public function error404() {
        Obj()->Vendor->View->render('error404', false);
    }

    public function getLista() {
        $respuesta = [];
        $flags = explode(',', $this->_form->flags);

        foreach ($flags as $rs) {

            array_push($respuesta, [$rs => $this->spListas($rs)]);
        }
        echo json_encode($respuesta);
    }

    public function mailNewVehicullo() {
        Obj()->Vendor->View->render();
    }

}
