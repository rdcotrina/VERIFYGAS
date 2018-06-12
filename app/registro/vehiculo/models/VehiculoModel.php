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
            v.imagen_tarjeta_propiedad
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
    
}
