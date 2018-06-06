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
            ':imgFormatoSolixcitud' => @$this->_form->_imgFormatoSolixcitud,
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
                . ":hostname); "
                . "";
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
            p.estado_taller = :estado
            AND p.eliminado = :eliminado
            AND v.eliminado = :eliminado
            AND p.id_taller = :taller
        ) ${sqlAll};
        ";
        $parms = [
            ':estado' => 'P',
            ':eliminado' => '0',
            ':taller' => $this->_idTaller
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
