<?php

/*
 * ---------------------------------------
 * --------- CREATED BY LV ----------
 * Autor:        Super 
 * Fecha:        08-06-2018 07:06:19 
 * Descripcion : EntregaModel.php
 * ---------------------------------------
 */

namespace Proceso\Entrega\Models;

class EntregaModel extends \Vendor\DataBase {

    protected $_form;
    protected $_file;
    protected $_usuario;
    private $_navegador;
    private $_ipPublica;
    private $_ipLocal;
    private $_hostName;
    private $_idTaller;
    protected $_idRol;

    public function __construct() {
        parent::__construct();
        $this->_form = Obj()->Vendor->Request->allForm()->post();
        $this->_file = Obj()->Vendor->Request->allForm()->file();
        $this->_usuario = Obj()->Vendor->Session->get('app_idUsuario');
        $this->_navegador = Obj()->Vendor->Session->get('app_navegador');
        $this->_ipPublica = Obj()->Vendor->Session->get('app_ipPublica');
        $this->_ipLocal = Obj()->Vendor->Session->get('app_ipLocal');
        $this->_hostName = Obj()->Vendor->Session->get('app_hostName');
        $this->_idTaller = Obj()->Vendor->Session->get('app_idTaller');
        $this->_idRol = Obj()->Vendor->Session->get('app_defaultIdRol');
    }

    //vehiculoas en estado A=APROBADO 
    protected function qGetVehiculos() {
        $sqlAll = '';

        if ($this->_form->txt_nroexp) {
            $sqlAll .= "p.nro_expediente = '" . $this->_form->txt_nroexp . "' OR ";
        }
        if ($this->_form->txt_placa) {
            $sqlAll .= "REPLACE(v.placa,' ','') LIKE CONCAT('%',REPLACE('" . $this->_form->txt_placa . "',' ',''),'%') OR ";
        }
        if ($this->_form->txt_marca) {
            $sqlAll .= "REPLACE(v.marca,' ','') LIKE CONCAT('%',REPLACE('" . $this->_form->txt_marca . "',' ',''),'%') OR ";
        }
        if ($this->_form->txt_modelo) {
            $sqlAll .= "REPLACE(v.modelo,' ','') LIKE CONCAT('%',REPLACE('" . $this->_form->txt_modelo . "',' ',''),'%') OR ";
        }
        if ($this->_form->txt_serie) {
            $sqlAll .= "REPLACE(v.serie,' ','') LIKE CONCAT('%',REPLACE('" . $this->_form->txt_serie . "',' ',''),'%') OR ";
        }
        $sqlAll = substr($sqlAll, 0, strlen($sqlAll) - 4);

        if (empty($sqlAll)) {
            $sqlAll = '';
        } else {
            $sqlAll = "AND (${sqlAll})";
        }
        
        
        
        switch ($this->_idRol) {
            case 3: //taller
                $w = "AND p.id_taller = '".$this->_idTaller."' AND p.estado_entrega_taller = 'P' ";
                break;
            case 5: //verifygas
                $w = "AND p.estado_entrega_verifygas = 'P' AND p.estado_entrega_taller = 'A'";
                break;
            default:
                $w = '';
                break;
        }
        
        $query = "
        SELECT 
            p.nro_expediente,
            pr.id_persona,
            p.id_propietario,
            v.id_vehiculo,
            pr.nombre_completo,
            t.tipo_documento_identidad,
            p.documento_identidad,
            p.celular,
            p.imagen_consentimiento,
            p.imagen_documento_identidad,
            p.imagen_licencia_conducir,
            v.placa,
            v.marca,
            v.modelo,
            v.serie,
            v.imagen_formulario_calidda,
            v.imagen_movil,
            v.imagen_poliza,
            v.imagen_revision_tecnica,
            v.imagen_servicio_publico,
            v.imagen_solicitud_cobranza,
            v.imagen_tarjeta_propiedad
        FROM conv_propietario p
        INNER JOIN conv_vehiculo v ON v.id_propietario = p.id_propietario
        INNER JOIN app_tipo_documento_identidad t ON t.id_tipo_documento_identidad = p.id_tipo_documento_identidad
        INNER JOIN app_persona pr ON pr.id_persona = p.id_persona
        WHERE (
            p.eliminado = :eliminado
            AND v.eliminado = :eliminado
            AND p.estado_taller = :estado
            AND p.estado_verifygas = :estado
            AND p.estado_calidda = :estado
            AND p.estado_conversion_verifygas = :estado 
            AND p.estado_conversion_taller = :estado
            ${w}
        ) ${sqlAll};
        ";
        $parms = [
            ':estado' => 'A',
            ':eliminado' => '0'
        ];

        return $this->getRows($query, $parms);
    }
    
    protected function spAtender() {
        $query = "CALL sp_entrega_vehiculo_atender ("
                . ":flag,"
                . ":key,"
                . ":usuario,"
                . ":ipPublica,"
                . ":ipLocal,"
                . ":navegador,"
                . ":hostname,"
                . ":rol,"
                . ":observacion); "
                . "";
        $parms = [
            ':flag' => $this->_form->_flag,
            ':key' => $this->_form->_keyPropietario,
            ':usuario' => $this->_usuario,
            ':ipPublica' => $this->_ipPublica,
            ':ipLocal' => $this->_ipLocal,
            ':navegador' => $this->_navegador,
            ':hostname' => $this->_hostName,
            ':rol' => $this->_idRol,
            ':observacion' => $this->_form->_observacion
        ];

        return $this->getRow($query, $parms);
    }

    protected function qFindPropietario() {
        $query = "
        SELECT
            e.apellido_paterno,
            e.apellido_materno,
            e.primer_nombre,
            e.segundo_nombre,
            p.celular,
            p.direccion_domicilio,
            t.abreviatura tipo_doc,
            p.documento_identidad,
            v.placa,
            v.marca,
            v.modelo,
            v.serie,
            v.cilindrada
        FROM conv_propietario p
        INNER JOIN conv_vehiculo v ON v.id_propietario = p.id_propietario
        INNER JOIN app_persona e ON e.id_persona = p.id_persona
        INNER JOIN app_tipo_documento_identidad t ON t.id_tipo_documento_identidad = p.id_tipo_documento_identidad
        WHERE p.id_propietario = :id;    
        ";
        $parms = [
            ':id' => $this->_form->_keyPropietario
        ];

        return $this->getRow($query, $parms);
    }
    
    protected function qEntrega() {
        $query = "
        SELECT 
            escaneo_1,
            escaneo_2,
            escaneo_3,
            escaneo_4,
            escaneo_5,
            escaneo_6,
            escaneo_7,
            escaneo_8,
            escaneo_9,
            escaneo_10,
            escaneo_11,
            escaneo_12,
            escaneo_13,
            escaneo_14
        FROM conv_entrega 
        WHERE id_pripietario = :id;  
        ";
        $parms = [
            ':id' => $this->_form->_keyPropietario
        ];

        return $this->getRow($query, $parms);
    }
    
    protected function spMantenimiento() {       
       
        $query = "CALL sp_proceso_entrega_mantenimiento("
                . ":flag,"
                . ":keyPropietario,"
                . ":escano_1,"
                . ":escano_2,"
                . ":escano_3,"
                . ":escano_4,"
                . ":escano_5,"
                . ":escano_6,"
                . ":escano_7,"
                . ":escano_8,"
                . ":escano_9,"
                . ":escano_10,"
                . ":escano_11,"
                . ":escano_12,"
                . ":escano_13,"
                . ":escano_14,"
                . ":usuario,"
                . ":ipPublica,"
                . ":ipLocal,"
                . ":navegador,"
                . ":hostname"
                . ")";
        
        $parms = [
            ':flag' => $this->_form->_flag,
            ':keyPropietario' => @$this->_form->_keyPropietario,
            ':escano_1' => @$this->_form->_documentoEscaneado_1,
            ':escano_2' => @$this->_form->_documentoEscaneado_2,
            ':escano_3' => @$this->_form->_documentoEscaneado_3,
            ':escano_4' => @$this->_form->_documentoEscaneado_4,
            ':escano_5' => @$this->_form->_documentoEscaneado_5,
            ':escano_6' => @$this->_form->_documentoEscaneado_6,
            ':escano_7' => @$this->_form->_documentoEscaneado_7,
            ':escano_8' => @$this->_form->_documentoEscaneado_8,
            ':escano_9' => @$this->_form->_documentoEscaneado_9,
            ':escano_10' => @$this->_form->_documentoEscaneado_10,
            ':escano_11' => @$this->_form->_documentoEscaneado_11,
            ':escano_12' => @$this->_form->_documentoEscaneado_12,
            ':escano_13' => @$this->_form->_documentoEscaneado_13,
            ':escano_14' => @$this->_form->_documentoEscaneado_14,
            ':usuario' => $this->_usuario,
            ':ipPublica' => $this->_ipPublica,
            ':ipLocal' => $this->_ipLocal,
            ':navegador' => $this->_navegador,
            ':hostname' => $this->_hostName
        ];
        
        return $this->getRow($query, $parms);
    }
    
    protected function spFinalizar() {
        $query = "CALL sp_proceso_entrega_finalizar ("
                . ":flag,"
                . ":key,"
                . ":usuario,"
                . ":ipPublica,"
                . ":ipLocal,"
                . ":navegador,"
                . ":hostname"
                . ");";
        $parms = [
            ':flag' => $this->_form->_flag,
            ':key' => $this->_form->_keyPropietario,
            ':usuario' => $this->_usuario,
            ':ipPublica' => $this->_ipPublica,
            ':ipLocal' => $this->_ipLocal,
            ':navegador' => $this->_navegador,
            ':hostname' => $this->_hostName
        ];
            
        return $this->getRow($query, $parms);
    }
    
}
