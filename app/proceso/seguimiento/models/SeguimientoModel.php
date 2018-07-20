<?php

/*
 * ---------------------------------------
 * --------- CREATED BY LV ----------
 * Autor:        Super 
 * Fecha:        21-06-2018 08:06:04 
 * Descripcion : SeguimientoModel.php
 * ---------------------------------------
 */

namespace Proceso\Seguimiento\Models;

class SeguimientoModel extends \Vendor\DataBase {

    protected $_form;
    private $_usuario;
    private $_navegador;
    private $_ipPublica;
    private $_ipLocal;
    private $_hostName;
    private $_idTaller;
    private $_idRol;
    private $_idPersona;

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
        $this->_idPersona = Obj()->Vendor->Session->get('app_idPersona');
    }
    
    private function getPec() {
        $query = "
        SELECT 
            id_pecs
        FROM conv_persona_pecs 
        WHERE id_persona = :key";

        $parms = [
            ':key' => $this->_idPersona
        ];

        return $this->getRow($query, $parms);
    }

    protected function qGetObservacion() {
        $campo = '';
        //es pre conversion
        if ($this->_form->_tipoRechaso == 'PREC') {
            //es taller
            if ($this->_form->_quien == 'TA') {
                $campo = 'observacion_taller';
            }elseif ($this->_form->_quien == 'VG') {//verifygas
                $campo = 'observacion_verifygas';
            }elseif ($this->_form->_quien == 'CA') {//calidda
                $campo = 'observacion_calidda';
            }
        }elseif ($this->_form->_tipoRechaso == 'CONV') { //es conversion
            if ($this->_form->_quien == 'VG') {//verifygas
                $campo = 'observacion_conversion_verifygas';
            }elseif ($this->_form->_quien == 'CA') {//calidda
                $campo = 'observacion_conversion_calidda';
            }
        }

        $query = "
        select 
            ${campo} observacion
        from conv_propietario
        where id_propietario = :key;
        ";
        $parms = [
            ':key' => $this->_form->_keyPropietario
        ];

        return $this->getRow($query, $parms);
    }

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
        if ($this->_form->txt_fecha) {
            $sqlAll .= "LEFT(p.fecha_crea,10) = '" . Obj()->Vendor->Tools->dateFormatServer($this->_form->txt_fecha) . "' OR ";
        }

        $sqlAll = substr($sqlAll, 0, strlen($sqlAll) - 4);

        if (empty($sqlAll)) {
            $sqlAll = '';
        } else {
            $sqlAll = "AND (${sqlAll})";
        }
        
        switch ($this->_idRol) {
            case 3: //taller
                $w = "AND p.id_taller = '" . $this->_idTaller . "' ";
                break;
            case 6: //asesor comercial
                $w = "AND p.id_taller = '" . $this->_idTaller . "' ";
                break;
            case 8: //pec
                // seleccionar el pecs de user con rol PECS
                $pec = $this->getPec()['id_pecs'];
                $w = "AND pc.id_pecs = '" . $pec . "' ";
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
            v.imagen_tarjeta_propiedad,
            v.img_contrato_financiamiento_calidda,
            (SELECT COUNT(*) FROM conv_pre_conversion a WHERE a.id_propietario = v.id_propietario) tiene_preconversion,
            p.estado_taller,
            p.estado_verifygas,
            p.estado_calidda,
            p.estado_conversion_taller,
            p.estado_conversion_verifygas,
            p.estado_conversion_calidda,
            p.estado_entrega_taller,
            p.estado_entrega_verifygas
        FROM conv_propietario p
        INNER JOIN conv_vehiculo v ON v.id_propietario = p.id_propietario
        INNER JOIN app_tipo_documento_identidad t ON t.id_tipo_documento_identidad = p.id_tipo_documento_identidad
        INNER JOIN app_persona pr ON pr.id_persona = p.id_persona
        INNER JOIN conv_taller ta ON ta.id_taller = p.id_taller
        INNER JOIN conv_pecs pc ON pc.id_pecs = ta.id_pecs
        WHERE (
            p.eliminado = :eliminado
            AND v.eliminado = :eliminado
        ) ${sqlAll} ${w};
        ";
        $parms = [
            ':eliminado' => '0'
        ];

        return $this->getRows($query, $parms);
    }

    protected function qExpediente() {
        $query = "
        SELECT 
            pr.nro_expediente,
            pe.nombre_completo,
            pa.pais,
            t.tipo_documento_identidad,
            pr.documento_identidad,
            pr.telefono_casa,
            pr.telefono_trabajo,
            pr.celular,
            pr.direccion_domicilio,
            pr.direccion_trabajo,
            e.estado_civil,
            v.tarjeta,
            v.placa,
            v.marca,
            v.modelo,
            v.numero_motor,
            v.serie,
            v.anio_fabricacion,
            v.cilindrada,
            v.imagen_tarjeta_propiedad,
            v.imagen_servicio_publico,
            v.imagen_revision_tecnica,
            v.imagen_movil,
            v.imagen_poliza,
            v.imagen_solicitud_cobranza,
            v.imagen_formulario_calidda,
            v.img_contrato_financiamiento_calidda,
            pr.imagen_documento_identidad,
            pr.imagen_licencia_conducir,
            pr.imagen_consentimiento,
            ta.taller,
            pc.pecs,
            (SELECT g.nombre_completo FROM app_persona g WHERE g.id_persona = u.id_persona) asesor
        FROM conv_propietario pr
        INNER JOIN app_tipo_documento_identidad t ON t.id_tipo_documento_identidad = pr.id_tipo_documento_identidad
        INNER JOIN app_estado_civil e ON e.id_estado_civil = pr.id_estado_civil
        INNER JOIN app_pais pa ON pa.id_pais = pr.id_pais
        INNER JOIN conv_vehiculo v ON v.id_propietario = pr.id_propietario
        INNER JOIN app_persona pe ON pe.id_persona = pr.id_persona
        INNER JOIN conv_taller ta ON ta.id_taller = pr.id_taller
        INNER JOIN conv_pecs pc ON pc.id_pecs = ta.id_pecs
        INNER JOIN app_usuario u ON u.id_usuario = pr.usuario_crea
        WHERE pr.id_propietario = :key";

        $parms = [
            ':key' => $this->_form->_keyPropietario
        ];

        return $this->getRow($query, $parms);
    }

    protected function qPreConversion() {
        $query = "
        SELECT 
            a.vacio_motor_ralenti,  
            a.analisis_gas_ralenti_co,
            a.analisis_gas_ralenti_hc,
            a.analisis_gas_ralenti_co2,
            a.analisis_gas_ralenti_o2,  
            a.analisis_gas_rpm_co,
            a.analisis_gas_rpm_hc,
            a.analisis_gas_rpm_co2,
            a.analisis_gas_rpm_o2,
            IF(a.sistema_refrigeracion = 1,'Conforme','No Conforme') sistema_refrigeracion,
            IF(a.sistema_lubricacion = 1,'Conforme','No Conforme') sistema_lubricacion,
            a.bateria_apagado,
            a.bateria_arranque,
            a.bateria_ralenti,
            a.bateria_rpm,
            IF(a.estado_bateria_otros = 1,'Conforme','No Conforme') estado_bateria_otros,
            a.stft_b1,
            a.ltft_b1,
            IF(a.sistema_electronico_comustible = 1,'Conforme','No Conforme') sistema_electronico_comustible,
            b.tipo_sistema_encendido,
            IF(a.sistema_encendido = 1,'Conforme','No Conforme') sistema_encendido,
            IF(a.sistema_admision_aire = 1,'Conforme','No Conforme') sistema_admision_aire,
            IF(a.inspeccion_visual = 1,'Conforme','No Conforme') inspeccion_visual,
            a.cilindro_1,
            a.cilindro_2,
            a.cilindro_3,
            a.cilindro_4,
            a.video_cilindro,
            a.video_vacio_motor_ralenti,
            a.video_ltft_b1,
            a.video_stft_b1,
            a.video_analisis_gas_ralenti,
            a.video_analisis_gas_rpm
        FROM conv_pre_conversion a
        INNER JOIN cov_tipo_sistema_encendido b ON b.id_tipo_sistema_encendido = a.id_tipo_sistema_encendido
        WHERE a.id_propietario = :key";

        $parms = [
            ':key' => $this->_form->_keyPropietario
        ];

        return $this->getRow($query, $parms);
    }

    protected function qConversion() {
        $query = "
        SELECT 
            marca_gnv,
            serie_gnv,
            capacidad_litros,
            fecha_fabricacion,
            ubicacion_cuna_cilindro,
            IF(cilindro_gnv_texto = 1,'Conforme','No Conforme') cilindro_gnv_texto,
            marca_valvula_cilindro,
            IF(marca_valvula_cilindro_texto = 1,'Conforme','No Conforme') marca_valvula_cilindro_texto,
            IF(tuberia_alta_predion_texto = 1,'Conforme','No Conforme') tuberia_alta_predion_texto,
            IF(valvula_carga_texto = 1,'Conforme','No Conforme') valvula_carga_texto,
            serie_regulador_presion,
            IF(regulador_presion_texto = 1,'Conforme','No Conforme') regulador_presion_texto,
            serie_entrega_gas,
            IF(entrega_gas_texto = 1,'Conforme','No Conforme') entrega_gas_texto,
            serie_controlador_gas,
            IF(entrega_gas_texto = 1,'Conforme','No Conforme') controlador_gas_texto,
            serie_variador_avance,
            IF(variador_avance_texto = 1,'Conforme','No Conforme') variador_avance_texto,
            IF(conmutador_texto = 1,'Conforme','No Conforme') conmutador_texto,
            IF(emulacion_inyectores_texto = 1,'Conforme','No Conforme') emulacion_inyectores_texto,
            video_varios,
            presion_salida_regulador,
            conf_temperatura_conmutacion,
            stft_b1_gnv,
            ltft_b1_gnv,
            gases_ralenti_gasolina_co,
            gases_ralenti_gasolina_hc,
            gases_ralenti_gasolina_co2,
            gases_ralenti_gasolina_o2,
            gases_rpm_gasolina_co,
            gases_rpm_gasolina_hc,
            gases_rpm_gasolina_co2,
            gases_rpm_gasolina_o2,
            gases_ralenti_gnv_co,
            gases_ralenti_gnv_hc,
            gases_ralenti_gnv_co2,
            gases_ralenti_gnv_o2,
            gases_rpm_gnv_co,
            gases_rpm_gnv_hc,
            gases_rpm_gnv_co2,
            gases_rpm_gnv_o2,
            video_estado_funcionamiento,
            IF(estado_funcionamiento_texto = 1,'Conforme','No Conforme') estado_funcionamiento_texto
        FROM conv_conversion
        WHERE id_propietario = :key";

        $parms = [
            ':key' => $this->_form->_keyPropietario
        ];

        return $this->getRow($query, $parms);
    }

    protected function qEntrega() {
        $query = "
        SELECT 
            escaneo_1,
            escaneo_2,
            escaneo_4,
            escaneo_5,
            escaneo_11,
            escaneo_13
        FROM conv_entrega 
        WHERE id_propietario = :key";

        $parms = [
            ':key' => $this->_form->_keyPropietario
        ];

        return $this->getRow($query, $parms);
    }

}
