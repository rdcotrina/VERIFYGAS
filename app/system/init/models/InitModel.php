<?php

namespace System\Init\Models;

class InitModel extends \Vendor\DataBase {

    protected $_form;
    private $_usuario;
    private $_navegador;
    private $_ipPublica;
    private $_ipLocal;
    private $_hostName;
    private $_idTaller;
    private $_persona;
    private $_idRol;
    private $_pFilterCols;

    public function __construct() {
        parent::__construct();
        $this->_form = Obj()->Vendor->Request->allForm()->post(['txtUser', 'txtClave'])->decrypt;
        $this->_usuario = Obj()->Vendor->Session->get('app_idUsuario');
        $this->_navegador = Obj()->Vendor->Session->get('app_navegador');
        $this->_ipPublica = Obj()->Vendor->Session->get('app_ipPublica');
        $this->_ipLocal = Obj()->Vendor->Session->get('app_ipLocal');
        $this->_hostName = Obj()->Vendor->Session->get('app_hostName');
        $this->_idTaller = Obj()->Vendor->Session->get('app_idTaller');
        $this->_persona = Obj()->Vendor->Session->get('app_idPersona');
        $this->_idRol = Obj()->Vendor->Session->get('app_defaultIdRol');
        
        $this->_pFilterCols    =   @htmlspecialchars(trim(Obj()->Libs->AesCtr->de($this->_form->pFilterCols)),ENT_QUOTES);
    }

    //form para listado de clientes segun: ESTADO - TIPO DE PROCESO(PRECONV, CONV, ENTREGA) - ROL(en el modelo se captura el rol)
    public function spGrid() {
        $query = "CALL sp_system_informe_grid (:ids,:estado,:iDisplayStart,:iDisplayLength,:pOrder,:pFilterCols,:sExport);";
        $parms = [
            ":ids" => @$this->_form->_ids,
            ":estado" => @$this->_form->_estado,
            ":iDisplayStart" => @$this->_form->pDisplayStart,
            ":iDisplayLength" => @$this->_form->pDisplayLength,
            ":pOrder" => $this->_form->pOrder,
            ":pFilterCols" => $this->_pFilterCols,
            ":sExport" => @$this->_form->_sExport
        ];
        $data = $this->getRows($query, $parms);

        return $data;
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

    protected function qResultadosTaller() {
        $query = "
        SELECT
            COUNT(estado_taller) total,
            SUM(IF(estado_taller = 'A',1,0)) aprobados,
            SUM(IF(estado_taller = 'R',1,0)) rechazados,
            SUM(IF(estado_taller = 'P',1,0)) pendientes,
            SUM(IF(estado_conversion_taller = 'A',1,0)) aprobados_c,
            SUM(IF(estado_conversion_taller = 'R',1,0)) rechazados_c,
            SUM(IF(estado_conversion_taller = 'P' AND estado_calidda = 'A',1,0)) pendientes_c,
            SUM(IF(estado_conversion_verifygas = 'A' AND estado_entrega_taller = 'P',1,0)) pendientes_e,
            SUM(IF(estado_entrega_taller = 'A',1,0)) aprobados_e
        FROM conv_propietario
        WHERE eliminado = :eliminado
        AND activo = :activo
        AND id_taller = :taller
        GROUP BY id_taller;";

        $parms = [
            ':eliminado' => 0,
            ':activo' => 1,
            ':taller' => $this->_idTaller
        ];

        return $this->getRow($query, $parms);
    }

    protected function qResultadosCaliddaPreConversion() {
        $query = "
        SELECT
            p.id_pecs,
            p.pecs,
            t.id_taller,
            t.taller,
            COUNT(*) total,
            SUM(IF(a.estado_taller = 'A',1,0)) aprobados_t,
            SUM(IF(a.estado_taller = 'R',1,0)) rechazados_t,
            SUM(IF(a.estado_taller = 'P',1,0)) pendientes_t,
            SUM(IF(a.estado_verifygas = 'A',1,0)) aprobados_v,
            SUM(IF(a.estado_verifygas = 'R',1,0)) rechazados_v,
            SUM(IF(a.estado_verifygas = 'P' AND a.estado_taller = 'A',1,0)) pendientes_v,
            SUM(IF(a.estado_calidda = 'A',1,0)) aprobados_c,
            SUM(IF(a.estado_calidda = 'R',1,0)) rechazados_c,
            SUM(IF(a.estado_calidda = 'P' AND a.estado_taller = 'A' AND a.estado_verifygas = 'A',1,0)) pendientes_c,
            SUM(IF(a.estado_entrega_verifygas = 'F',1,0)) finalizados,
            (
		SELECT
			GROUP_CONCAT(total)total
		FROM(
			SELECT
				COUNT(mes) total,
				id_taller
			FROM(
				SELECT
				    MONTH(aa.fecha_crea) mes,
				    aa.id_taller
				FROM conv_propietario aa
				WHERE YEAR(aa.fecha_crea) = YEAR(CURDATE())
                                AND aa.estado_calidda = 'A'
				GROUP BY aa.id_taller,aa.fecha_crea
			)o
			GROUP BY id_taller,mes
		)p
		WHERE p.id_taller = t.id_taller
		GROUP BY p.id_taller
            ) preconversiones_aprobadas_mensual
        FROM conv_propietario a
        INNER JOIN conv_taller t ON t.id_taller = a.id_taller
        INNER JOIN conv_pecs p ON p.id_pecs = t.id_pecs
        WHERE a.eliminado = :eliminado
        AND :activo = 1
        GROUP BY t.id_taller
        ORDER BY p.pecs,t.taller;";

        $parms = [
            ':eliminado' => 0,
            ':activo' => 1
        ];

        return $this->getRows($query, $parms);
    }

    protected function qResultadosCaliddaConversion() {
        $query = "
        SELECT
	p.id_pecs,
	p.pecs,
	t.id_taller,
	t.taller,
            COUNT(*) total,
            SUM(IF(a.estado_conversion_taller = 'A',1,0)) aprobados_t,
            SUM(IF(a.estado_conversion_taller = 'R',1,0)) rechazados_t,
            SUM(IF(a.estado_conversion_taller = 'P',1,0)) pendientes_t,
            SUM(IF(a.estado_conversion_verifygas = 'A',1,0)) aprobados_v,
            SUM(IF(a.estado_conversion_verifygas = 'R',1,0)) rechazados_v,
            SUM(IF(a.estado_conversion_verifygas = 'P' AND a.estado_conversion_taller = 'A',1,0)) pendientes_v,
            (
		SELECT
			GROUP_CONCAT(total)total
		FROM(
			SELECT
				COUNT(mes) total,
				id_taller
			FROM(
				SELECT
				    MONTH(aa.fecha_crea) mes,
				    aa.id_taller
				FROM conv_propietario aa
				WHERE YEAR(aa.fecha_crea) = YEAR(CURDATE())
                                AND aa.estado_conversion_verifygas = 'A'
				GROUP BY aa.id_taller,aa.fecha_crea
			)o
			GROUP BY id_taller,mes
		)p
		WHERE p.id_taller = t.id_taller
		GROUP BY p.id_taller
            ) conversiones_aprobadas_mensual
        FROM conv_propietario a
        INNER JOIN conv_taller t ON t.id_taller = a.id_taller
        INNER JOIN conv_pecs p ON p.id_pecs = t.id_pecs
        WHERE a.eliminado = :eliminado
        AND a.activo = :activo
        GROUP BY t.id_taller
        ORDER BY p.pecs,t.taller;";

        $parms = [
            ':eliminado' => 0,
            ':activo' => 1
        ];

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

    protected function spListas($flag = '') {

        if (!empty($flag)) {
            $this->_form->_flag = $flag;
        }

        $query = "CALL sp_system_init_listas(:flag,:criterio) ; ";
        $parms = [
            ':flag' => $this->_form->_flag,
            ':criterio' => @$this->_form->_criterio
        ];

        return $this->getRows($query, $parms);
    }

    protected function qResultadosPecsPreConversion() {
        $query = "
        SELECT
            p.id_pecs,
            p.pecs,
            t.id_taller,
            t.taller,
            COUNT(*) total,
            SUM(IF(a.estado_taller = 'A',1,0)) aprobados_t,
            SUM(IF(a.estado_taller = 'R',1,0)) rechazados_t,
            SUM(IF(a.estado_taller = 'P',1,0)) pendientes_t,
            SUM(IF(a.estado_verifygas = 'A',1,0)) aprobados_v,
            SUM(IF(a.estado_verifygas = 'R',1,0)) rechazados_v,
            SUM(IF(a.estado_verifygas = 'P' AND a.estado_taller = 'A',1,0)) pendientes_v,
            SUM(IF(a.estado_calidda = 'A',1,0)) aprobados_c,
            SUM(IF(a.estado_calidda = 'R',1,0)) rechazados_c,
            SUM(IF(a.estado_calidda = 'P' AND a.estado_taller = 'A' AND a.estado_verifygas = 'A',1,0)) pendientes_c,
            SUM(IF(a.estado_entrega_verifygas = 'F',1,0)) finalizados,
            SUM(IF(a.estado_entrega_verifygas = 'F',1,0)) finalizados,
            (
		SELECT
			GROUP_CONCAT(total)total
		FROM(
			SELECT
				COUNT(mes) total,
				id_taller
			FROM(
				SELECT
				    MONTH(aa.fecha_crea) mes,
				    aa.id_taller
				FROM conv_propietario aa
				WHERE YEAR(aa.fecha_crea) = YEAR(CURDATE())
                                AND aa.estado_calidda = 'A'
				GROUP BY aa.id_taller,aa.fecha_crea
			)o
			GROUP BY id_taller,mes
		)p
		WHERE p.id_taller = t.id_taller
		GROUP BY p.id_taller
            ) preconversiones_aprobadas_mensual
        FROM conv_propietario a
        INNER JOIN conv_taller t ON t.id_taller = a.id_taller
        INNER JOIN conv_pecs p ON p.id_pecs = t.id_pecs
        WHERE a.eliminado = :eliminado
        AND :activo = 1
        AND p.id_pecs = (SELECT id_pecs FROM conv_persona_pecs WHERE id_persona = :persona)
        GROUP BY t.id_taller
        ORDER BY p.pecs,t.taller;";

        $parms = [
            ':eliminado' => 0,
            ':activo' => 1,
            ':persona' => $this->_persona
        ];

        return $this->getRows($query, $parms);
    }

    protected function qResultadosPecsConversion() {
        $query = "
        SELECT
	p.id_pecs,
	p.pecs,
	t.id_taller,
	t.taller,
            COUNT(*) total,
            SUM(IF(a.estado_conversion_taller = 'A',1,0)) aprobados_t,
            SUM(IF(a.estado_conversion_taller = 'R',1,0)) rechazados_t,
            SUM(IF(a.estado_conversion_taller = 'P',1,0)) pendientes_t,
            SUM(IF(a.estado_conversion_verifygas = 'A',1,0)) aprobados_v,
            SUM(IF(a.estado_conversion_verifygas = 'R',1,0)) rechazados_v,
            SUM(IF(a.estado_conversion_verifygas = 'P' AND a.estado_conversion_taller = 'A',1,0)) pendientes_v,
            (
		SELECT
			GROUP_CONCAT(total)total
		FROM(
			SELECT
				COUNT(mes) total,
				id_taller
			FROM(
				SELECT
				    MONTH(aa.fecha_crea) mes,
				    aa.id_taller
				FROM conv_propietario aa
				WHERE YEAR(aa.fecha_crea) = YEAR(CURDATE())
                                AND aa.estado_conversion_verifygas = 'A'
				GROUP BY aa.id_taller,aa.fecha_crea
			)o
			GROUP BY id_taller,mes
		)p
		WHERE p.id_taller = t.id_taller
		GROUP BY p.id_taller
            ) conversiones_aprobadas_mensual
        FROM conv_propietario a
        INNER JOIN conv_taller t ON t.id_taller = a.id_taller
        INNER JOIN conv_pecs p ON p.id_pecs = t.id_pecs
        WHERE a.eliminado = :eliminado
        AND a.activo = :activo
        AND p.id_pecs = (SELECT id_pecs FROM conv_persona_pecs WHERE id_persona = :persona)
        GROUP BY t.id_taller
        ORDER BY p.pecs,t.taller;";

        $parms = [
            ':eliminado' => 0,
            ':activo' => 1,
            ':persona' => $this->_persona
        ];

        return $this->getRows($query, $parms);
    }

    protected function qResultadosDiarioPreConversionAprobadas($e) {
        $query = "
        -- las preconversiones aprobadas por verifigas del dia
        SELECT 
                COUNT(*) total,
                GROUP_CONCAT(p.id_propietario) ids
        FROM conv_propietario p
        WHERE LEFT(p.fecha_atiende_verifygas_preconversion,10) = CURDATE()
        AND p.estado_verifygas = '${e}'
        AND p.estado_taller = 'A';";

        $parms = [];

        return $this->getRow($query, $parms);
    }

    protected function qResultadosDiarioPreConversionPendientes($e) {
        $query = "
        -- las preconversiones aprobadas por verifigas del dia
        SELECT 
                COUNT(*) total,
                GROUP_CONCAT(p.id_propietario) ids
        FROM conv_propietario p
        WHERE p.estado_verifygas = 'P'
        AND p.estado_taller = 'A';";

        $parms = [];

        return $this->getRow($query, $parms);
    }
    
    protected function qResultadosDiarioPreConversionAprobadasC($e) {
        $query = "
        -- las preconversiones aprobadas por calidda del dia
        SELECT 
                COUNT(*) total,
                GROUP_CONCAT(p.id_propietario) ids
        FROM conv_propietario p
        WHERE LEFT(p.fecha_atiende_calida_preconversion,10) = CURDATE()
        AND p.estado_calidda = '${e}'
        AND p.estado_verifygas = 'A';";

        $parms = [];

        return $this->getRow($query, $parms);
    }
    
    protected function qResultadosDiarioPreConversionPendientesC($e) {
        $query = "
        -- las preconversiones aprobadas por calidda del dia
        SELECT 
                COUNT(*) total,
                GROUP_CONCAT(p.id_propietario) ids
        FROM conv_propietario p
        WHERE p.estado_calidda = 'P'
        AND p.estado_verifygas = 'A';";

        $parms = [];

        return $this->getRow($query, $parms);
    }
    
    protected function qResultadosDiarioConversionAprobadas($e) {
        $query = "
        -- las conversiones aprobadas por verifigas del dia
        SELECT 
                COUNT(*) total,
                GROUP_CONCAT(p.id_propietario) ids
        FROM conv_propietario p
        WHERE LEFT(p.fecha_atiende_verifygas_conversion,10) = CURDATE()
        AND p.estado_conversion_verifygas = '${e}'
        AND p.estado_conversion_taller = 'A';";

        $parms = [];

        return $this->getRow($query, $parms);
    }
    
    protected function qResultadosDiarioConversionPendientes($e) {
        $query = "
        -- las conversiones aprobadas por verifigas del dia
        SELECT 
                COUNT(*) total,
                GROUP_CONCAT(p.id_propietario) ids
        FROM conv_propietario p
        WHERE p.estado_conversion_verifygas = 'P'
        AND p.estado_conversion_taller = 'A';";

        $parms = [];

        return $this->getRow($query, $parms);
    }

    protected function qResultadosDiarioConversionAprobadasC($e) {
        $query = "
        -- las conversiones aprobadas por calidda del dia
        SELECT 
                COUNT(*) total,
                GROUP_CONCAT(p.id_propietario) ids
        FROM conv_propietario p
        WHERE LEFT(p.fecha_crea,10) = CURDATE()
        AND (
        p.estado_conversion_taller = '${e}'
        OR p.estado_conversion_verifygas = '${e}'
        );
        ";

        $parms = [];

        return $this->getRow($query, $parms);
    }

    protected function qResultadosDiarioEntregaAprobadas($e) {
        $query = "
        SELECT 
                COUNT(*) total,
                GROUP_CONCAT(p.id_propietario) ids
        FROM conv_propietario p
        WHERE LEFT(p.fecha_entrega_verifygas,10) = CURDATE()
        AND p.estado_entrega_verifygas = '${e}'
        AND p.estado_entrega_taller = 'A';";

        $parms = [];

        return $this->getRow($query, $parms);
    }
    
    protected function qResultadosDiarioEntregaPendientes($e) {
        $query = "
        SELECT 
                COUNT(*) total,
                GROUP_CONCAT(p.id_propietario) ids
        FROM conv_propietario p
        WHERE p.estado_entrega_verifygas = 'P'
        AND p.estado_entrega_taller = 'A';";

        $parms = [];

        return $this->getRow($query, $parms);
    }

}
