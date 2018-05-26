<?php

namespace System\Init\Models;

class InitModel extends \Vendor\DataBase {
    
    protected $_form;
    private $_usuario;
    private $_navegador;
    private $_ipPublica;
    private $_ipLocal;
    private $_hostName;

    public function __construct() {
        parent::__construct();
        $this->_form = Obj()->Vendor->Request->allForm()->post(['txtUser', 'txtClave'])->decrypt;
        $this->_usuario = Obj()->Vendor->Session->get('app_idUsuario');
        $this->_navegador = Obj()->Vendor->Session->get('app_navegador');
        $this->_ipPublica = Obj()->Vendor->Session->get('app_ipPublica');
        $this->_ipLocal = Obj()->Vendor->Session->get('app_ipLocal');
        $this->_hostName = Obj()->Vendor->Session->get('app_hostName');
        
    }
    
    protected function login($flag = '', $user = '', $pass = '') {
        if (empty($flag)) {
            $flag = $this->_form->_flag;
            $user = $this->_form->txtUser;
            $pass = $this->_form->txtClave . APP_PASS_KEY;
        }

        $query = "CALL sp_sysLogin (:flag,:usuario,:clave) ; ";
        $parms = [
            ':flag' => $flag,
            ':usuario' => $user,
            ':clave' => $pass
        ];

        if ($flag == 1) {
            return $this->getRow($query, $parms);   /* devuelve un registro */
        } else {
            return $this->getRows($query, $parms);  /* devuelve varios registros */
        }
    }
    
    protected function spTheme() {
        $query = "CALL sp_appConfigTheme (:flag,:value,:usuario,:ipPublica,:ipLocal,:navegador,:hostName) ; ";
        $parms = [
            ':flag' => $this->_form->_flag,
            ':value' => $this->_form->_value,
            ':usuario' => $this->_usuario,
            ':ipPublica' => $this->_ipPublica,
            ':ipLocal' => $this->_ipLocal,
            ':navegador' => $this->_navegador,
            ':hostName' => $this->_hostName
        ];
        return $this->getRow($query, $parms); 
    }
    
    protected function qLanguage() {
        $query = "SELECT descripcion, language, bandera FROM app_language; ";
        $parms = [];

        return $this->getRows($query, $parms); 
    }
    
    protected function qRoles() {
        $query = "
        SELECT 
                r.id_rol,
                o.nrol
        FROM app_rol_usuario r
        INNER JOIN app_rol o ON o.id_rol = r.id_rol
        WHERE r.id_usuario = :user
        AND o.activo = :activo
        AND o.eliminado = :eliminado;";
        $parms = [
            ':user' => Obj()->Vendor->Session->get('app_idUsuario'),
            ':activo' => 1,
            ':eliminado' => 0
        ];
        return $this->getRows($query, $parms); 
    }
    
    protected function qThemeUser() {
        $query = "
        SELECT
            u.encabezado_fijo,
            u.menu_fijo,
            u.navegacion_fijo,
            u.footer_fijo,
            u.contenido_centrado,
            u.menu_derecha,
            u.menu_arriba,
            u.daltonicos,
            u.theme_defecto,
            u.theme_oscuro_elegante,
            u.theme_ultera_claro,
            u.theme_anaranjado,
            u.theme_pixel,
            u.theme_transparente,
            u.theme_celeste,
            u.html_background
        FROM app_usuario u
        WHERE u.id_usuario = :user;";
        $parms = [
            ':user' => $this->_usuario
        ];

        return $this->getRow($query, $parms); 
    }
    
    protected function qMenu() {
        $query = "
        SELECT
                k.*,
                b.alias alias_btn,
                b.nboton,
                b.css,
                b.icono,
                IF(b.id_boton IS NULL,0,1) access
        FROM
        (
                SELECT 
                        rm.id_rolmenu,
                        rm.id_menu,
                        m.parent,
                        m.nombre_menu,
                        m.icono icon,
                        m.alias,
                        m.evt_ajax,
                        m.orden
                FROM app_rol_menu rm
                INNER JOIN app_menu m ON m.id_menu = rm.id_menu
                WHERE rm.id_rol = :idRol
                AND m.eliminado = :eliminado
                UNION
                SELECT 
                        0 id_rolmenu,
                        mm.id_menu,
                        mm.parent,
                        mm.nombre_menu,
                        mm.icono icon,
                        mm.alias,
                        mm.evt_ajax,
                        mm.orden
                FROM app_rol_menu rm
                INNER JOIN app_menu m ON m.id_menu = rm.id_menu
                INNER JOIN app_menu mm ON mm.id_menu = m.parent
                WHERE rm.id_rol = :idRol
                AND m.eliminado = :eliminado
                UNION
                SELECT 
                        0 id_rolmenu,
                        mmm.id_menu,
                        mmm.parent,
                        mmm.nombre_menu,
                        mmm.icono icon,
                        mmm.alias,
                        mmm.evt_ajax,
                        mmm.orden
                FROM app_rol_menu rm
                INNER JOIN app_menu m ON m.id_menu = rm.id_menu
                INNER JOIN app_menu mm ON mm.id_menu = m.parent
                INNER JOIN app_menu mmm ON mmm.id_menu = mm.parent
                WHERE rm.id_rol = :idRol
                AND m.eliminado = :eliminado
                UNION
                SELECT 
                        0 id_rolmenu,
                        mmmm.id_menu,
                        mmmm.parent,
                        mmmm.nombre_menu,
                        mmmm.icono icon,
                        mmmm.alias,
                        mmmm.evt_ajax,
                        mmmm.orden
                FROM app_rol_menu rm
                INNER JOIN app_menu m ON m.id_menu = rm.id_menu
                INNER JOIN app_menu mm ON mm.id_menu = m.parent
                INNER JOIN app_menu mmm ON mmm.id_menu = mm.parent
                INNER JOIN app_menu mmmm ON mmmm.id_menu = mmm.parent
                WHERE rm.id_rol = :idRol
                AND m.eliminado = :eliminado
                UNION
                SELECT 
                        0 id_rolmenu,
                        mmmmm.id_menu,
                        mmmmm.parent,
                        mmmmm.nombre_menu,
                        mmmmm.icono icon,
                        mmmmm.alias,
                        mmmmm.evt_ajax,
                        mmmmm.orden
                FROM app_rol_menu rm
                INNER JOIN app_menu m ON m.id_menu = rm.id_menu
                INNER JOIN app_menu mm ON mm.id_menu = m.parent
                INNER JOIN app_menu mmm ON mmm.id_menu = mm.parent
                INNER JOIN app_menu mmmm ON mmmm.id_menu = mmm.parent
                INNER JOIN app_menu mmmmm ON mmmmm.id_menu = mmmm.parent
                WHERE rm.id_rol = :idRol
                AND m.eliminado = :eliminado
        )k
        LEFT JOIN app_boton_rol_menu bm ON bm.id_rolmenu = k.id_rolmenu
        LEFT JOIN app_boton b ON b.id_boton = bm.id_boton
        ORDER BY k.orden;";
        
        $parms = [
            ':idRol' => Obj()->Vendor->Session->get('app_defaultIdRol'),
            ':eliminado' => 0
        ];

        return $this->getRows($query, $parms); 
    }
    
    protected function uLanguage() {
        $query = "
        UPDATE app_usuario SET
            language = :lang
        WHERE id_usuario = :user;";
        $parms = [
            ':lang' => $this->_form->_language,
            ':user' => $this->_usuario
        ];

        return $this->execute($query, $parms); 
    }
    
}

