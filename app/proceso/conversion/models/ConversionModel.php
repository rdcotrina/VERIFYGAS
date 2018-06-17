<?php

/*
 * ---------------------------------------
 * --------- CREATED BY LV ----------
 * Autor:        Super 
 * Fecha:        08-06-2018 01:06:03 
 * Descripcion : ConversionModel.php
 * ---------------------------------------
 */

namespace Proceso\Conversion\Models;

class ConversionModel extends \Vendor\DataBase {

    protected $_form;
    protected $_file;
    private $_usuario;
    private $_navegador;
    private $_ipPublica;
    private $_ipLocal;
    private $_hostName;
    private $_idTaller;
    private $_idRol;

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
                $w = "AND p.id_taller = '".$this->_idTaller."' AND p.estado_conversion_taller = 'P' ";
                break;
            case 5: //verifygas
                $w = "AND p.estado_conversion_verifygas = 'P' AND p.estado_conversion_taller = 'A'";
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
            (SELECT COUNT(*) FROM conv_conversion a WHERE a.id_propietario = v.id_propietario) tiene_conversion
        FROM conv_propietario p
        INNER JOIN conv_vehiculo v ON v.id_propietario = p.id_propietario
        INNER JOIN app_tipo_documento_identidad t ON t.id_tipo_documento_identidad = p.id_tipo_documento_identidad
        INNER JOIN app_persona pr ON pr.id_persona = p.id_persona
        INNER JOIN conv_taller ta ON ta.id_taller = p.id_taller
        WHERE (
            p.eliminado = :eliminado
            AND v.eliminado = :eliminado
            AND p.estado_taller = :estado
            AND p.estado_verifygas = :estado
            AND p.estado_calidda = :estado
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
        $query = "CALL sp_conversion_vehiculo_atender ("
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
            v.cilindrada,
            (SELECT valor FROM app_parametro WHERE codigo = 'CONVMINIMOPRESREGULA') param_min_presion_salida_regulador,
            (SELECT valor FROM app_parametro WHERE codigo = 'CONVRANGTEMPECONMUTA') param_conf_temperatura_conmutacion,
            (SELECT valor FROM app_parametro WHERE codigo = 'CONVRANGSTFTB1CONGNV') param_stftb1_combustible_gnv,
            (SELECT valor FROM app_parametro WHERE codigo = 'CONVRANGLTFTB1CONGNV') param_ltftb1_combustible_gnv,
            (SELECT valor FROM app_parametro WHERE codigo = 'CONVMAXANGARALGASOCO') param_max_gas_ralenti_gasolina_co,
            (SELECT valor FROM app_parametro WHERE codigo = 'CONVMAXANGARALGASOHC') param_max_gas_ralenti_gasolina_hc,
            (SELECT valor FROM app_parametro WHERE codigo = 'CONVMINANGARALGASOCO2') param_min_gas_ralenti_gasolina_co2,
            (SELECT valor FROM app_parametro WHERE codigo = 'CONVMAXANGARALGASOO2') param_max_gas_ralenti_gasolina_o2,
            (SELECT valor FROM app_parametro WHERE codigo = 'CONVMAXANGARPMGASOCO') param_max_gas_rpm_gasolina_co,
            (SELECT valor FROM app_parametro WHERE codigo = 'CONVMAXANGARPMGASOHC') param_max_gas_rpm_gasolina_hc,
            (SELECT valor FROM app_parametro WHERE codigo = 'CONVMINANGARPMGASOCO2') param_min_gas_rpm_gasolina_co2,
            (SELECT valor FROM app_parametro WHERE codigo = 'CONVMAXANGARPMGASOO2') param_max_gas_rpm_gasolina_o2,
            (SELECT valor FROM app_parametro WHERE codigo = 'CONVMAXANGARALGNVCO') param_max_gas_ralenti_gnv_co,
            (SELECT valor FROM app_parametro WHERE codigo = 'CONVMAXANGARALGNVHC') param_max_gas_ralenti_gnv_hc,
            (SELECT valor FROM app_parametro WHERE codigo = 'CONVMINANGARALGNVCO2') param_min_gas_ralenti_gnv_co2,
            (SELECT valor FROM app_parametro WHERE codigo = 'CONVMAXANGARALGNVO2') param_max_gas_ralenti_gnv_o2,
            (SELECT valor FROM app_parametro WHERE codigo = 'CONVMAXANGARPMGNVCO') param_max_gas_rpm_gnv_co,
            (SELECT valor FROM app_parametro WHERE codigo = 'CONVMAXANGARPMGNVHC') param_max_gas_rpm_gnv_hc,
            (SELECT valor FROM app_parametro WHERE codigo = 'CONVMINANGARPMGNVCO2') param_min_gas_rpm_gnv_co2,
            (SELECT valor FROM app_parametro WHERE codigo = 'CONVMAXANGARPMGNVO2') param_max_gas_rpm_gnv_o2
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
    
    protected function spMantenimientoConversion() {       
        
        $query = "CALL sp_proceso_conversion_mantenimiento("
                . ":flag,"
                . ":keyPropietario,"
                . ":marka_cilindro_gnv,"
                . ":xerie_cilindro_gnv,"
                . ":capacidad_litros,"
                . ":fecha_fabricacion,"
                . ":cilindro_gnv_texto,"
                . ":ubicacion_cuna_cilindro,"
                . ":narca_valvula,"
                . ":valvula_cilindro_texto,"
                . ":tuberia_alta_presion_texto,"
                . ":valvula_carga_texto,"
                . ":cerie_regulador_presion,"
                . ":regulador_presion_texto,"
                . ":serhie_entrega_gas,"
                . ":entrega_gas_texto,"
                . ":zerie_controlador_gas,"
                . ":controlador_gas_texto,"
                . ":qerie_variador_avance,"
                . ":variador_avance_texto,"
                . ":conmutador_texto,"
                . ":emulacion_inyectores_texto,"
                . ":presion_salida_regulador,"
                . ":configuracion_temperatura_conmutacion,"
                . ":stft_b1_combustible_gnv,"
                . ":ltft_b1_combustible_gnv,"
                . ":analisis_gas_ralenti_gasolinaco,"
                . ":analisis_gas_ralenti_gasolinahc,"
                . ":hanalisis_gas_ralenti_gasolinaco2,"
                . ":analisis_gas_ralenti_gasolinao2,"
                . ":analisis_gas_rpm_gasolinaco,"
                . ":analisis_gas_rpm_gasolinahc,"
                . ":wanalisis_gas_rpm_gasolinaco2,"
                . ":analisis_gas_rpm_gasolinao2,"
                . ":analisis_gas_ralenti_gnvco,"
                . ":analisis_gas_ralenti_gnvhc,"
                . ":vanalisis_gas_ralenti_gnvco2,"
                . ":analisis_gas_ralenti_gnvo2,"
                . ":analisis_gas_rpm_gnvco,"
                . ":analisis_gas_rpm_gnvhc,"
                . ":ianalisis_gas_rpm_gnvco2,"
                . ":analisis_gas_rpm_gnvo2,"
                . ":estado_funcionamiento_gnv_texto,"
                . ":videoEstadoFUncionamientoGNV,"
                . ":videoVarios,"
                . ":grabaAprueba,"
                . ":usuario,"
                . ":ipPublica,"
                . ":ipLocal,"
                . ":navegador,"
                . ":hostname"
                . ")";
        
        $parms = [
            ':flag' => $this->_form->_flag,
            ':keyPropietario' => @$this->_form->_keyPropietario,
            ':ralentimotor' => @$this->_form->txt_ralentimotor,
            ':ralentianalisisgasesco' => @$this->_form->txt_ralentianalisisgasesco,
            ':ralentianalisisgaseshc' => @$this->_form->txt_ralentianalisisgaseshc,
            ':ralentigasesco2' => @$this->_form->txt_ralentigasesco2,
            ':ralentianalisisgaseso2' => @$this->_form->txt_ralentianalisisgaseso2,
            ':analisisrpmco' => @$this->_form->txt_analisisrpmco,
            ':analisisrpmhc' => @$this->_form->txt_analisisrpmhc,
            ':rpmco2' => @$this->_form->txt_rpmco2,
            ':analisisrpmo2' => @$this->_form->txt_analisisrpmo2,
            ':sistema_refrigeracion_texto' => @$this->_form->lst_sistema_refrigeracion_texto,
            ':sistema_lubricacion_texto' => @$this->_form->lst_sistema_lubricacion_texto,
            ':apagado' => @$this->_form->txt_apagado,
            ':arranque' => @$this->_form->txt_arranque,
            ':usuario' => $this->_usuario,
            ':ipPublica' => $this->_ipPublica,
            ':ipLocal' => $this->_ipLocal,
            ':navegador' => $this->_navegador,
            ':hostname' => $this->_hostName
        ];
        
        return $this->getRow($query, $parms);
    }
    
}
