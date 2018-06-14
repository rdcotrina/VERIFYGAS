<?php

/*
 * ---------------------------------------
 * --------- CREATED BY LV ----------
 * Autor:        Super 
 * Fecha:        26-05-2018 04:05:26 
 * Descripcion : VehiculoModel.php
 * ---------------------------------------
 */

namespace Registro\Vehiculo\Models;

class VehiculoModel extends \Vendor\DataBase {

    protected $_form;
    protected $_file;
    protected $_tableDB;
    protected $_columnDB;
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

    protected function spMantenimiento() {
        $query = "CALL sp_registro_vehiculo_mantenimiento ("
                . ":flag,"
                . ":key,"
                . ":primernombre,"
                . ":segundonombre,"
                . ":apellidopaterno,"
                . ":apellidomaterno,"
                . ":pais,"
                . ":estadocivil,"
                . ":tipodocumentoidentidad,"
                . ":nrodocidentidad,"
                . ":telefonocasa,"
                . ":telefonotrabajo,"
                . ":celular,"
                . ":direcciondomicilio,"
                . ":direcciontrabajo,"
                . ":tarjetapropiedad,"
                . ":placa,"
                . ":marca,"
                . ":modelo,"
                . ":nromotor,"
                . ":serie,"
                . ":aniofabricacion,"
                . ":cilindrada,"
                . ":nrorevisiontecnica,"
                . ":fechainspeccion,"
                . ":soat,"
                . ":fechavigenciasoat,"
                . ":imgConsentimiento,"
                . ":imgDocIdentidad,"
                . ":imgFormatoSolixcitud,"
                . ":imgHojaCalidda,"
                . ":imgInscripcionMovil,"
                . ":imgLicenciaConducir,"
                . ":imgRecibo,"
                . ":imgRevisionTecnica,"
                . ":imgSoat,"
                . ":imgTarjetaPropiedad,"
                . ":idTaller,"
                . ":usuario,"
                . ":ipPublica,"
                . ":ipLocal,"
                . ":navegador,"
                . ":hostname); "
                . "";
        $parms = [
            ':flag' => $this->_form->_flag,
            ':key' => @$this->_form->_keyPropietario,
            ':primernombre' => @$this->_form->txt_primernombre,
            ':segundonombre' => @$this->_form->txt_segundonombre,
            ':apellidopaterno' => @$this->_form->txt_apellidopaterno,
            ':apellidomaterno' => @$this->_form->txt_apellidomaterno,
            ':pais' => @$this->_form->lst_pais,
            ':estadocivil' => @$this->_form->lst_estadocivil,
            ':tipodocumentoidentidad' => @$this->_form->lst_tipodocumentoidentidad,
            ':nrodocidentidad' => @$this->_form->txt_nrodocidentidad,
            ':telefonocasa' => @$this->_form->txt_telefonocasa,
            ':telefonotrabajo' => @$this->_form->txt_telefonotrabajo,
            ':celular' => @$this->_form->txt_celular,
            ':direcciondomicilio' => @$this->_form->txt_direcciondomicilio,
            ':direcciontrabajo' => @$this->_form->txt_direcciontrabajo,
            ':tarjetapropiedad' => @$this->_form->txt_tarjetapropiedad,
            ':placa' => @$this->_form->txt_plaka,
            ':marca' => @$this->_form->txt_marka,
            ':modelo' => @$this->_form->txt_model,
            ':nromotor' => @$this->_form->txt_nromotor,
            ':serie' => @$this->_form->txt_serye,
            ':aniofabricacion' => @$this->_form->txt_aniofabricacion,
            ':cilindrada' => @$this->_form->txt_cilindrada,
            ':nrorevisiontecnica' => @$this->_form->txt_nrorevisiontecnica,
            ':fechainspeccion' => @Obj()->Vendor->Tools->dateFormatServer($this->_form->txt_fechainspeccion),
            ':soat' => @$this->_form->txt_soat,
            ':fechavigenciasoat' => @Obj()->Vendor->Tools->dateFormatServer($this->_form->txt_fechavigenciasoat),
            ':imgConsentimiento' => @$this->_form->_imgConsentimiento,
            ':imgDocIdentidad' => @$this->_form->_imgDocIdentidad,
            ':imgFormatoSolixcitud' => @$this->_form->_imgFormatoSolicitud,
            ':imgHojaCalidda' => @$this->_form->_imgHojaCalidda,
            ':imgInscripcionMovil' => @$this->_form->_imgInscripcionMovil,
            ':imgLicenciaConducir' => @$this->_form->_imgLicenciaConducir,
            ':imgRecibo' => @$this->_form->_imgRecibo,
            ':imgRevisionTecnica' => @$this->_form->_imgRevisionTecnica,
            ':imgSoat' => @$this->_form->_imgSoat,
            ':imgTarjetaPropiedad' => @$this->_form->_imgTarjetaPropiedad,
            ':idTaller' => $this->_idTaller,
            ':usuario' => $this->_usuario,
            ':ipPublica' => $this->_ipPublica,
            ':ipLocal' => $this->_ipLocal,
            ':navegador' => $this->_navegador,
            ':hostname' => $this->_hostName
        ];

        return $this->getRow($query, $parms);
    }
    
    protected function spMantenimientoPreConversion() {        
        
        $query = "CALL sp_registro_vehiculo_mantenimiento_preconversion ("
                . ":flag,"
                . ":keyPropietario,"
                . ":ralentimotor,"
                . ":ralentianalisisgasesco,"
                . ":ralentianalisisgaseshc,"
                . ":ralentigasesco2,"
                . ":ralentianalisisgaseso2,"
                . ":analisisrpmco,"
                . ":analisisrpmhc,"
                . ":rpmco2,"
                . ":analisisrpmo2,"
                . ":fugasradiador,"
                . ":fugasmanguera,"
                . ":temperatura_panel,"
                . ":electroventilador,"
                . ":nivelrefrigerantemotor,"
                . ":fugaaceitesello,"
                . ":fugaaceitecarter,"
                . ":fugaaceitevalvula,"
                . ":estadonivelaceite,"
                . ":fnivelaceitemotor,"
                . ":apagado,"
                . ":arranque,"
                . ":ralentibateria,"
                . ":2500rpm,"
                . ":masa_motor,"
                . ":masa_chasis,"
                . ":botones,"
                . ":anclaje,"
                . ":electrolito,"
                . ":estadomotorarranque,"
                . ":alternador,"
                . ":correasalternador,"
                . ":stftb1,"
                . ":valvula_egr,"
                . ":valvula_iac,"
                . ":sensor_thwect,"
                . ":sensor_presion,"
                . ":sensor_cmp,"
                . ":sensor_map,"
                . ":motor_ralenti_map,"
                . ":sensor_tps,"
                . ":ancho_puelo_inyectores,"
                . ":ltftb1,"
                . ":codigo_falla,"
                . ":sensor_iat,"
                . ":ignition_voltage,"
                . ":sensor_ckp,"
                . ":sensor_o2_s1b1,"
                . ":sensor_o2_s1b2,"
                . ":angulo_avance_ralenti,"
                . ":angulo_avance_2500_rpm,"
                . ":tiposistemaencendido,"
                . ":resistencia_interna_bujias,"
                . ":codigo_bujias,"
                . ":estado_aire_despues_sensor,"
                . ":estado_filtro_aire,"
                . ":condiciones_chasis,"
                . ":estado_amortiguadores_trasetros,"
                . ":ciclindro1,"
                . ":ciclindro2,"
                . ":ciclindro3,"
                . ":ciclindro4,"
                . ":videoVacioMotorRalenti,"
                . ":videoAnalisisGasesRalenti,"
                . ":videoAnalisisGasesRPM,"
                . ":videoSTFTB1,"
                . ":videoLTFTB1,"
                . ":videoCilindros,"
                . ":observacion,"
                . ":usuario,"
                . ":ipPublica,"
                . ":ipLocal,"
                . ":navegador,"
                . ":hostname"
                . ");";
        
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
            ':fugasradiador' => @$this->_form->lst_fugasradiador,
            ':fugasmanguera' => @$this->_form->lst_fugasmanguera,
            ':temperatura_panel' => @$this->_form->lst_temperatura_panel,
            ':electroventilador' => @$this->_form->lst_electroventilador,
            ':nivelrefrigerantemotor' => @$this->_form->lst_nivelrefrigerantemotor,
            ':fugaaceitesello' => @$this->_form->lst_fugaaceitesello,
            ':fugaaceitecarter' => @$this->_form->lst_fugaaceitecarter,
            ':fugaaceitevalvula' => @$this->_form->lst_fugaaceitevalvula,
            ':estadonivelaceite' => @$this->_form->lst_estadonivelaceite,
            ':fnivelaceitemotor' => @$this->_form->lst_fnivelaceitemotor,
            ':apagado' => @$this->_form->txt_apagado,
            ':arranque' => @$this->_form->txt_arranque,
            ':ralentibateria' => @$this->_form->txt_ralentibateria,
            ':2500rpm' => @$this->_form->txt_2500rpm,
            ':masa_motor' => @$this->_form->lst_masa_motor,
            ':masa_chasis' => @$this->_form->lst_masa_chasis,
            ':botones' => @$this->_form->lst_botones,
            ':anclaje' => @$this->_form->lst_anclaje,
            ':electrolito' => @$this->_form->lst_electrolito,
            ':estadomotorarranque' => @$this->_form->lst_estadomotorarranque,
            ':alternador' => @$this->_form->lst_alternador,
            ':correasalternador' => @$this->_form->lst_correasalternador,
            ':stftb1' => @$this->_form->txt_stftb1,
            ':valvula_egr' => @$this->_form->lst_valvula_egr,
            ':valvula_iac' => @$this->_form->lst_valvula_iac,
            ':sensor_thwect' => @$this->_form->lst_sensor_thwect,
            ':sensor_presion' => @$this->_form->lst_sensor_presion,
            ':sensor_cmp' => @$this->_form->txt_sensor_cmp,
            ':sensor_map' => @$this->_form->txt_sensor_map,
            ':motor_ralenti_map' => @$this->_form->lst_motor_ralenti_map,
            ':sensor_tps' => @$this->_form->txt_sensor_tps,
            ':ancho_puelo_inyectores' => @$this->_form->lst_ancho_puelo_inyectores,
            ':ltftb1' => @$this->_form->txt_ltftb1,
            ':codigo_falla' => @$this->_form->lst_codigo_falla,
            ':sensor_iat' => @$this->_form->lst_sensor_iat,
            ':ignition_voltage' => @$this->_form->lst_ignition_voltage,
            ':sensor_ckp' => @$this->_form->lst_sensor_ckp,
            ':sensor_o2_s1b1' => @$this->_form->lst_sensor_o2_s1b1,
            ':sensor_o2_s1b2' => @$this->_form->lst_sensor_o2_s1b2,
            ':angulo_avance_ralenti' => @$this->_form->lst_angulo_avance_ralenti,
            ':angulo_avance_2500_rpm' => @$this->_form->lst_angulo_avance_2500_rpm,
            ':tiposistemaencendido' => @$this->_form->lst_tiposistemaencendido,
            ':resistencia_interna_bujias' => @$this->_form->lst_resistencia_interna_bujias,
            ':codigo_bujias' => @$this->_form->lst_codigo_bujias,
            ':estado_aire_despues_sensor' => @$this->_form->lst_estado_aire_despues_sensor,
            ':estado_filtro_aire' => @$this->_form->lst_estado_filtro_aire,
            ':condiciones_chasis' => @$this->_form->lst_condiciones_chasis,
            ':estado_amortiguadores_trasetros' => @$this->_form->lst_estado_amortiguadores_trasetros,
            ':ciclindro1' => @$this->_form->txt_ciclindro1,
            ':ciclindro2' => @$this->_form->txt_ciclindro2,
            ':ciclindro3' => @$this->_form->txt_ciclindro3,
            ':ciclindro4' => @$this->_form->txt_ciclindro4,
            ':videoVacioMotorRalenti' => @$this->_form->_videoVacioMotorRalenti,
            ':videoAnalisisGasesRalenti' => @$this->_form->_videoAnalisisGasesRalenti,
            ':videoAnalisisGasesRPM' => @$this->_form->_videoAnalisisGasesRPM,
            ':videoSTFTB1' => @$this->_form->_videoSTFTB1,
            ':videoLTFTB1' => @$this->_form->_videoLTFTB1,
            ':videoCilindros' => @$this->_form->_videoCilindros,
            ':observacion' => @$this->_form->_observacion,
            ':usuario' => $this->_usuario,
            ':ipPublica' => $this->_ipPublica,
            ':ipLocal' => $this->_ipLocal,
            ':navegador' => $this->_navegador,
            ':hostname' => $this->_hostName
        ];
       
        return $this->getRow($query, $parms);
    }
    
    protected function spAtender() {
        $query = "CALL sp_registro_vehiculo_atender ("
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

    //vehiculoas en estado P=PENDIENTE
    protected function qGetVehiculos() {
        $sqlAll = '';
        
        if($this->_form->txt_nroexp){
            $sqlAll .= "p.nro_expediente = '".$this->_form->txt_nroexp."' OR ";
        }
        if($this->_form->txt_placa){
            $sqlAll .= "REPLACE(v.placa,' ','') LIKE CONCAT('%',REPLACE('".$this->_form->txt_placa."',' ',''),'%') OR ";
        }
        if($this->_form->txt_marca){
            $sqlAll .= "REPLACE(v.marca,' ','') LIKE CONCAT('%',REPLACE('".$this->_form->txt_marca."',' ',''),'%') OR ";
        }
        if($this->_form->txt_modelo){
            $sqlAll .= "REPLACE(v.modelo,' ','') LIKE CONCAT('%',REPLACE('".$this->_form->txt_modelo."',' ',''),'%') OR ";
        }
        if($this->_form->txt_serie){
            $sqlAll .= "REPLACE(v.serie,' ','') LIKE CONCAT('%',REPLACE('".$this->_form->txt_serie."',' ',''),'%') OR ";
        }
        $sqlAll = substr($sqlAll, 0, strlen($sqlAll) - 4);
        
        if(empty($sqlAll)){
            $sqlAll = '';
        }else{
            $sqlAll = "AND (${sqlAll})";
        }
        
        switch ($this->_idRol) {
            case 3: //taller
                $w = "AND p.id_taller = '".$this->_idTaller."' AND p.estado_taller = 'P' ";
                break;
            case 5: //verifygas
                $w = "AND p.estado_verifygas = 'P' AND p.estado_taller = 'A'";
                break;
            case 6: //asesor comercial
                $w = "AND p.id_taller = '".$this->_idTaller."' AND p.estado_taller = 'P' ";
                break;
            case 7: //calidda
                $w = "AND p.estado_calidda = 'P' AND p.estado_taller = 'A' AND p.estado_verifygas = 'A'";
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
            (SELECT COUNT(*) FROM conv_pre_conversion a WHERE a.id_propietario = v.id_propietario) tiene_preconversion
        FROM conv_propietario p
        INNER JOIN conv_vehiculo v ON v.id_propietario = p.id_propietario
        INNER JOIN app_tipo_documento_identidad t ON t.id_tipo_documento_identidad = p.id_tipo_documento_identidad
        INNER JOIN app_persona pr ON pr.id_persona = p.id_persona
        INNER JOIN conv_taller ta ON ta.id_taller = p.id_taller
        WHERE (
            p.eliminado = :eliminado
            AND v.eliminado = :eliminado
            ${w}
        ) ${sqlAll};
        ";
        $parms = [
            ':estado' => 'P',
            ':eliminado' => '0'
        ];

        return $this->getRows($query, $parms);
    }
    
    protected function qFind() {
        $query = "
        SELECT
            e.apellido_paterno,
            e.apellido_materno,
            e.primer_nombre,
            e.segundo_nombre,
            p.id_pais,
            p.id_estado_civil,
            p.id_tipo_documento_identidad,
            p.documento_identidad,
            p.telefono_casa,
            p.telefono_trabajo,
            p.celular,
            p.direccion_domicilio,
            p.direccion_trabajo,
            p.imagen_documento_identidad,
            p.imagen_licencia_conducir,
            p.imagen_consentimiento,
            v.imagen_tarjeta_propiedad,
            v.imagen_servicio_publico,
            v.imagen_revision_tecnica,
            v.imagen_movil,
            v.imagen_poliza,
            v.imagen_solicitud_cobranza,
            v.imagen_formulario_calidda,
            v.tarjeta,
            v.placa,
            v.marca,
            v.modelo,
            v.numero_motor,
            v.serie,
            v.anio_fabricacion,
            v.cilindrada,
            v.revision_tecnica,
            DATE_FORMAT(v.fecha_inspeccion,'%d-%m-%Y') fecha_inspeccion,
            v.numero_poliza,
            DATE_FORMAT(v.fecha_poliza_vigencia,'%d-%m-%Y') fecha_poliza_vigencia	
        FROM conv_propietario p
        INNER JOIN conv_vehiculo v ON v.id_propietario = p.id_propietario
        INNER JOIN app_persona e ON e.id_persona = p.id_persona
        WHERE p.id_propietario = :id;    
        ";
        $parms = [
            ':id' => $this->_form->_keyPropietario
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
            (SELECT valor FROM app_parametro WHERE codigo = 'PRECRAGVTBATOFF') param_apagado,
            (SELECT valor FROM app_parametro WHERE codigo = 'PRECRAGVTBATON') param_encendido,
            (SELECT valor FROM app_parametro WHERE codigo = 'PRECRAGVTBATARRA') param_arranque,
            (SELECT valor FROM app_parametro WHERE codigo = 'PRECRAGVTBAT2500') param_rpm,
            (SELECT valor FROM app_parametro WHERE codigo = 'PRECVACIOMOTORRAL') param_vacio_motor_ralenti, 
            (SELECT valor FROM app_parametro WHERE codigo = 'PRECGASMAXRALENTICO') param_max_gas_ralenti_co,
            (SELECT valor FROM app_parametro WHERE codigo = 'PRECGASMAXRALENTIHC') param_max_gas_ralenti_hc,
            (SELECT valor FROM app_parametro WHERE codigo = 'PRECGASMINRALENTICO2') param_min_gas_ralenti_co2,
            (SELECT valor FROM app_parametro WHERE codigo = 'PRECGASMAXRALENTIO2') param_min_gas_ralenti_o2,
            (SELECT valor FROM app_parametro WHERE codigo = 'PRECGASMAXRPMCO') param_max_gas_rpm_co,
            (SELECT valor FROM app_parametro WHERE codigo = 'PRECGASMAXRPMHC') param_max_gas_rpm_hc,
            (SELECT valor FROM app_parametro WHERE codigo = 'PRECGASMINRPMCO2') param_min_gas_rpm_co2,
            (SELECT valor FROM app_parametro WHERE codigo = 'PRECGASMAXRPMO2') param_max_gas_rpm_o2,
            (SELECT valor FROM app_parametro WHERE codigo = 'PRECSISELECSTFTB1') param_stftb1,
            (SELECT valor FROM app_parametro WHERE codigo = 'PRECSISELECLTFTB1') param_ltftb1,
            (SELECT valor FROM app_parametro WHERE codigo = 'PRECSENSORCMPRANGOS') param_sensor_cmp,
            (SELECT valor FROM app_parametro WHERE codigo = 'PRECSENSORMAPRANGOS') param_sensor_map,
            (SELECT valor FROM app_parametro WHERE codigo = 'PRECSENSORTPSRANGOS') param_sensor_tps,
            (SELECT valor FROM app_parametro WHERE codigo = 'PRECRANGOSCILINDROS') param_cilindros
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
    
    protected function qGetPreConversion() {
        $query = "
        SELECT 
            vacio_motor_ralenti,
            analisis_gas_ralenti_co,
            analisis_gas_ralenti_hc,
            analisis_gas_ralenti_co2,
            analisis_gas_ralenti_o2,
            analisis_gas_rpm_co,
            analisis_gas_rpm_hc,
            analisis_gas_rpm_co2,
            analisis_gas_rpm_o2,
            fuga_refrigerante_radiador,
            fuga_refrigerante_mangueras,
            funcionamiento_indicador_temperatura,
            functionamiento_electroventilador,
            nivel_refrigerante_motor,
            fuga_aceite_sello,
            fuga_aceite_carter,
            fuga_aceite_valvula,
            estado_nivel_aceite,
            nivel_aceite_motor,
            bateria_apagado,
            bateria_arranque,
            bateria_ralenti,
            bateria_rpm,
            masa_motor,
            masa_chasis,
            estado_bateria_boton,
            estado_bateria_anclaje,
            nivel_electrolito_bateria,
            estado_arranque_motor,
            alternador,
            correa_alternador,
            stft_b1,
            ltft_b1,
            valvula_egr,
            valvula_iac,
            sensor_thw_ect,
            sensor_presion,
            sensor_cmp,
            sensor_map,
            motor_ralenti_sensor_map,
            sensor_tps,
            ancho_pulso_inyector,
            codigo_falla,
            sendor_iat,
            ignition_voltage,
            sensor_ckp,
            sensor_02_s1b1,
            sensor_o2_s1b2,
            angulo_avance_ralenti,
            angulo_avance_rpm,
            id_tipo_sistema_encendido,
            resistencia_bujias,
            codigo_bujias,
            estado_toma_aire,
            estado_filtro_aire,
            estado_chasis,
            estado_amortiguadores,
            cilindro_1,
            cilindro_2,
            cilindro_3,
            cilindro_4,
            observaciones
        FROM conv_pre_conversion
        WHERE id_propietario = :id;";
        
        $parms = [
            ':id' => $this->_form->_keyPropietario
        ];

        return $this->getRow($query, $parms);
    }
    
    protected function qUpdateImg($file) {
        $query = "
        UPDATE ".$this->_tableDB." SET
            ".$this->_columnDB." = :file
        WHERE id_propietario = :id ; 
        ";
        $parms = [
            ':id' => $this->_form->_keyPropietario,
            ':file' => $file
        ];

        $this->execute($query, $parms);
    }
    
    protected function qUpdateVideo($file) {
        $query = "
        UPDATE conv_pre_conversion SET
            ".$this->_columnDB." = :file
        WHERE id_propietario = :id ; 
        ";
        $parms = [
            ':id' => $this->_form->_keyPropietario,
            ':file' => $file
        ];

        $this->execute($query, $parms);
    }
    
}
