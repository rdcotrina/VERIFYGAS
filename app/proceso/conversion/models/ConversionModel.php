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

        $sqlAll = substr($sqlAll, 0, strlen($sqlAll) - 4);

        if (empty($sqlAll)) {
            $sqlAll = '';
        } else {
            $sqlAll = "AND (${sqlAll})";
        }

        switch ($this->_idRol) {
            case 3: //taller
                $w = "AND p.id_taller = '" . $this->_idTaller . "' AND p.estado_conversion_taller = 'P' ";
                break;
            case 5: //verifygas
                $w = "AND p.estado_conversion_verifygas = 'P' AND p.estado_conversion_taller = 'A'";
                break;
            case 7: //calidda
                $w = "AND p.estado_conversion_calidda = 'P' AND p.estado_conversion_verifygas = 'A' AND p.estado_conversion_taller = 'A'";
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
            (SELECT COUNT(*) FROM conv_conversion a WHERE a.id_propietario = v.id_propietario) tiene_conversion,
            (SELECT conformidad_todo FROM conv_conversion a WHERE a.id_propietario = v.id_propietario) conformidad_todo
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
        $query = "CALL sp_proceso_conversion_vehiculo_atender ("
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
                . ":entidadCertificadora,"
                . ":conformeAll,"
                . ":usuario,"
                . ":ipPublica,"
                . ":ipLocal,"
                . ":navegador,"
                . ":hostname"
                . ")";

        $parms = [
            ':flag' => $this->_form->_flag,
            ':keyPropietario' => @$this->_form->_keyPropietario,
            ':marka_cilindro_gnv' => @$this->_form->txt_marka_cilindro_gnv,
            ':xerie_cilindro_gnv' => @$this->_form->txt_xerie_cilindro_gnv,
            ':capacidad_litros' => @$this->_form->txt_capacidad_litros,
            ':fecha_fabricacion' => @isset($this->_form->txt_fecha_fabricacion) ? Obj()->Vendor->Tools->dateFormatServer($this->_form->txt_fecha_fabricacion) : '',
            ':cilindro_gnv_texto' => @$this->_form->lst_cilindro_gnv_texto,
            ':ubicacion_cuna_cilindro' => @$this->_form->txt_ubicacion_cuna_cilindro,
            ':narca_valvula' => @$this->_form->txt_narca_valvula,
            ':valvula_cilindro_texto' => @$this->_form->lst_valvula_cilindro_texto,
            ':tuberia_alta_presion_texto' => @$this->_form->lst_tuberia_alta_presion_texto,
            ':valvula_carga_texto' => @$this->_form->lst_valvula_carga_texto,
            ':cerie_regulador_presion' => @$this->_form->txt_cerie_regulador_presion,
            ':regulador_presion_texto' => @$this->_form->lst_regulador_presion_texto,
            ':serhie_entrega_gas' => @$this->_form->txt_serhie_entrega_gas,
            ':entrega_gas_texto' => @$this->_form->lst_entrega_gas_texto,
            ':zerie_controlador_gas' => @$this->_form->txt_zerie_controlador_gas,
            ':controlador_gas_texto' => @$this->_form->lst_controlador_gas_texto,
            ':qerie_variador_avance' => @$this->_form->txt_qerie_variador_avance,
            ':variador_avance_texto' => @$this->_form->lst_variador_avance_texto,
            ':conmutador_texto' => @$this->_form->lst_conmutador_texto,
            ':emulacion_inyectores_texto' => @$this->_form->lst_emulacion_inyectores_texto,
            ':presion_salida_regulador' => @$this->_form->txt_presion_salida_regulador,
            ':configuracion_temperatura_conmutacion' => @$this->_form->txt_configuracion_temperatura_conmutacion,
            ':stft_b1_combustible_gnv' => @$this->_form->txt_stft_b1_combustible_gnv,
            ':ltft_b1_combustible_gnv' => @$this->_form->txt_ltft_b1_combustible_gnv,
            ':analisis_gas_ralenti_gasolinaco' => @$this->_form->txt_analisis_gas_ralenti_gasolinaco,
            ':analisis_gas_ralenti_gasolinahc' => @$this->_form->txt_analisis_gas_ralenti_gasolinahc,
            ':hanalisis_gas_ralenti_gasolinaco2' => @$this->_form->txt_hanalisis_gas_ralenti_gasolinaco2,
            ':analisis_gas_ralenti_gasolinao2' => @$this->_form->txt_analisis_gas_ralenti_gasolinao2,
            ':analisis_gas_rpm_gasolinaco' => @$this->_form->txt_analisis_gas_rpm_gasolinaco,
            ':analisis_gas_rpm_gasolinahc' => @$this->_form->txt_analisis_gas_rpm_gasolinahc,
            ':wanalisis_gas_rpm_gasolinaco2' => @$this->_form->txt_wanalisis_gas_rpm_gasolinaco2,
            ':analisis_gas_rpm_gasolinao2' => @$this->_form->txt_analisis_gas_rpm_gasolinao2,
            ':analisis_gas_ralenti_gnvco' => @$this->_form->txt_analisis_gas_ralenti_gnvco,
            ':analisis_gas_ralenti_gnvhc' => @$this->_form->txt_analisis_gas_ralenti_gnvhc,
            ':vanalisis_gas_ralenti_gnvco2' => @$this->_form->txt_vanalisis_gas_ralenti_gnvco2,
            ':analisis_gas_ralenti_gnvo2' => @$this->_form->txt_analisis_gas_ralenti_gnvo2,
            ':analisis_gas_rpm_gnvco' => @$this->_form->txt_analisis_gas_rpm_gnvco,
            ':analisis_gas_rpm_gnvhc' => @$this->_form->txt_analisis_gas_rpm_gnvhc,
            ':ianalisis_gas_rpm_gnvco2' => @$this->_form->txt_ianalisis_gas_rpm_gnvco2,
            ':analisis_gas_rpm_gnvo2' => @$this->_form->txt_analisis_gas_rpm_gnvo2,
            ':estado_funcionamiento_gnv_texto' => @$this->_form->lst_estado_funcionamiento_gnv_texto,
            ':videoEstadoFUncionamientoGNV' => @$this->_form->_videoEstadoFUncionamientoGNV,
            ':videoVarios' => @$this->_form->_videoVarios,
            ':grabaAprueba' => @$this->_form->_grabaAprueba,
            ':entidadCertificadora' => @$this->_form->txt_entidad_financiera,
            ':conformeAll' => @$this->_form->_conformeAll,
            ':usuario' => $this->_usuario,
            ':ipPublica' => $this->_ipPublica,
            ':ipLocal' => $this->_ipLocal,
            ':navegador' => $this->_navegador,
            ':hostname' => $this->_hostName
        ];

        return $this->getRow($query, $parms);
    }

    protected function qUpdateVideo($file) {
        $query = "
        UPDATE conv_conversion SET
            " . $this->_columnDB . " = :file
        WHERE id_propietario = :id ; 
        ";
        $parms = [
            ':id' => $this->_form->_keyPropietario,
            ':file' => $file
        ];

        $this->execute($query, $parms);
    }

    protected function qGetConversion() {
        $query = "
        SELECT 
            marca_gnv,
            serie_gnv,
            capacidad_litros,
            DATE_FORMAT(fecha_fabricacion,'%d-%m-%Y') fecha_fabricacion,
            ubicacion_cuna_cilindro,
            cilindro_gnv_texto,
            marca_valvula_cilindro,
            marca_valvula_cilindro_texto,
            tuberia_alta_predion_texto,
            valvula_carga_texto,
            serie_regulador_presion,
            regulador_presion_texto,
            serie_entrega_gas,
            entrega_gas_texto,
            serie_controlador_gas,
            controlador_gas_texto,
            serie_variador_avance,
            variador_avance_texto,
            conmutador_texto,
            emulacion_inyectores_texto,
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
            estado_funcionamiento_texto,
            entidad_certificadora,
            conformidad_todo
        FROM conv_conversion 
        WHERE id_propietario = :id;";

        $parms = [
            ':id' => $this->_form->_keyPropietario
        ];

        return $this->getRow($query, $parms);
    }

}
