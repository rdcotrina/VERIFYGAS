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

        if (count($data) > 1) {
            /*
             * Sessiones para el sistema
             */
            Obj()->Vendor->Session->set('app_isLogin', 1);
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
            Obj()->Vendor->Session->set('app_token', number_format(rand(1, 999999999999999) * rand(1, 999999999999999),0,'','')); // se validara con el token q se enviara via ajax

            echo json_encode(['result' => 1, 'data' => $data, 'rdm' => Obj()->Vendor->Session->get('app_token')]);
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
    
}
