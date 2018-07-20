<?php

/*
 * ---------------------------------------
 * --------- CREATED BY LV ----------
 * Autor:        Super 
 * Fecha:        02-07-2018 01:07:47 
 * Descripcion : InformeModel.php
 * ---------------------------------------
 */

namespace Reporte\Informe\Models;

class InformeModel extends \Vendor\DataBase {

    protected $_form;
    private $_usuario;
    private $_navegador;
    private $_ipPublica;
    private $_ipLocal;
    private $_hostName;
    private $_idTaller;
    protected $_idRol;
    private $_persona;

    public function __construct() {
        parent::__construct();
        $this->_form = Obj()->Vendor->Request->allForm()->post();
        $this->_usuario = Obj()->Vendor->Session->get('app_idUsuario');
        $this->_navegador = Obj()->Vendor->Session->get('app_navegador');
        $this->_ipPublica = Obj()->Vendor->Session->get('app_ipPublica');
        $this->_ipLocal = Obj()->Vendor->Session->get('app_ipLocal');
        $this->_hostName = Obj()->Vendor->Session->get('app_hostName');
        $this->_idTaller = Obj()->Vendor->Session->get('app_idTaller');
        $this->_idRol = Obj()->Vendor->Session->get('app_defaultIdRol');
        $this->_persona = Obj()->Vendor->Session->get('app_idPersona');
    }

    private function _getPec() {
        $query = "
        SELECT 
            id_pecs
        FROM conv_persona_pecs 
        WHERE id_persona = :key";

        $parms = [
            ':key' => $this->_persona
        ];

        return $this->getRow($query, $parms);
    }
    
    protected function qTalleresMes() {
        $w = '';
        if( in_array($this->_idRol, [3,6])){//cuando asesor o taller
            $w = 'AND t.id_taller = '.$this->_idTaller;
        }elseif ($this->_idRol == 8) {//cuando es pec
            $w = 'AND t.id_pecs = '.$this->_getPec()['id_pecs'];
        }
        $query = "
        SELECT
            DISTINCT
            YEAR(NOW()) anio,
            pr.id_taller,
            t.taller,
            day(LAST_DAY(curdate())) dias 
        FROM conv_propietario pr
        INNER JOIN conv_taller t ON t.id_taller = pr.id_taller
        WHERE MONTH(pr.fecha_crea) = :mes
        AND pr.eliminado = 0
        AND YEAR(pr.fecha_crea) = YEAR(NOW())
        ${w}
        ORDER BY t.taller; 
        ";
        $parms = [
            ':mes' => $this->_form->txt_mes
        ];

        return $this->getRows($query, $parms);
    }

    protected function qResultadosMes() {
        $w = '';
        if( in_array($this->_idRol, [3,6])){//cuando asesor o taller
            $w = 'AND t.id_taller = '.$this->_idTaller;
        }elseif ($this->_idRol == 8) {//cuando es pec
            $w = 'AND t.id_pecs = '.$this->_getPec()['id_pecs'];
        }
        $query = "
        SELECT
            t.id_taller,
            t.taller,
            day(LAST_DAY(curdate())) dias ,
            SUM(IF(pr.estado_taller = 'R' OR pr.estado_verifygas = 'R' OR pr.estado_calidda = 'R',1,0)) preconversion_rechazada,
            SUM(IF(pr.estado_verifygas = 'A' OR pr.estado_verifygas = 'R',1,0)) conversiones_recibidas, -- cuando calidda aprueba pasa a conversion recibida
            SUM(IF(pr.estado_conversion_calidda = 'R',1,0)) conversiones_rechazadas, -- taller solo aprueba, por erso no se tiene en cuenta en este if
            SUM(IF(pr.estado_conversion_verifygas = 'A',1,0)) conversiones_aprobadas,
            SUM(IF(pr.estado_calidda = 'A',1,0)) conversiones_financiadas,
            DAY(pr.fecha_crea) dia
        FROM conv_propietario pr
        INNER JOIN conv_taller t ON t.id_taller = pr.id_taller
        WHERE pr.eliminado = 0
        AND MONTH(pr.fecha_crea) = :mes
        AND YEAR(pr.fecha_crea) = YEAR(NOW())
        ${w}
        GROUP BY t.taller,DAY(pr.fecha_crea)
        ORDER BY t.taller; 
        ";
        $parms = [
            ':mes' => $this->_form->txt_mes
        ];

        return $this->getRows($query, $parms);
    }

    protected function qTalleresAnio() {
        $w = '';
        if( in_array($this->_idRol, [3,6])){//cuando asesor o taller
            $w = 'AND t.id_taller = '.$this->_idTaller;
        }elseif ($this->_idRol == 8) {//cuando es pec
            $w = 'AND t.id_pecs = '.$this->_getPec()['id_pecs'];
        }
        $query = "
        SELECT
            DISTINCT
            YEAR(NOW()) anio,
            t.id_taller,
            t.taller
        FROM conv_propietario pr
        INNER JOIN conv_taller t ON t.id_taller = pr.id_taller
        WHERE pr.eliminado = 0
        AND YEAR(pr.fecha_crea) = YEAR(NOW())
        ${w}
        GROUP BY t.taller,MONTH(pr.fecha_crea)
        ORDER BY t.taller; 
        ";
        $parms = [];

        return $this->getRows($query, $parms);
    }

    protected function qResultadosAnio() {
        $w = '';
        if( in_array($this->_idRol, [3,6])){//cuando asesor o taller
            $w = 'AND t.id_taller = '.$this->_idTaller;
        }elseif ($this->_idRol == 8) {//cuando es pec
            $w = 'AND t.id_pecs = '.$this->_getPec()['id_pecs'];
        }
        $query = "
        SELECT
            t.id_taller,
            t.taller,
            SUM(IF(pr.estado_taller = 'R' OR pr.estado_verifygas = 'R' OR pr.estado_calidda = 'R',1,0)) preconversion_rechazada,
            SUM(IF(pr.estado_verifygas = 'A' OR pr.estado_verifygas = 'R',1,0)) conversiones_recibidas, -- cuando calidda aprueba pasa a conversion recibida
            SUM(IF(pr.estado_conversion_calidda = 'R',1,0)) conversiones_rechazadas, -- taller solo aprueba, por eso no se tiene en cuenta en este if
            SUM(IF(pr.estado_conversion_verifygas = 'A',1,0)) conversiones_aprobadas,
            SUM(IF(pr.estado_calidda = 'A',1,0)) conversiones_financiadas,
            MONTH(pr.fecha_crea) mes
        FROM conv_propietario pr
        INNER JOIN conv_taller t ON t.id_taller = pr.id_taller
        WHERE pr.eliminado = 0
        AND YEAR(pr.fecha_crea) = YEAR(NOW())
        ${w}
        GROUP BY t.taller,MONTH(pr.fecha_crea)
        ORDER BY t.taller;
        ";
        $parms = [];

        return $this->getRows($query, $parms);
    }

}
