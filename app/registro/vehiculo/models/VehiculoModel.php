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
    private $_usuario;
    private $_navegador;
    private $_ipPublica;
    private $_ipLocal;
    private $_hostName;
    private $_idTienda;
    
    protected function __construct() {
        parent::__construct();
        $this->_form = Obj()->Vendor->Request->allForm()->post();
        $this->_file = Obj()->Vendor->Request->allForm()->file();
        $this->_usuario = Obj()->Vendor->Session->get('app_idUsuario');
        $this->_navegador = Obj()->Vendor->Session->get('app_navegador');
        $this->_ipPublica = Obj()->Vendor->Session->get('app_ipPublica');
        $this->_ipLocal = Obj()->Vendor->Session->get('app_ipLocal');
        $this->_hostName = Obj()->Vendor->Session->get('app_hostName');
        $this->_idTienda = Obj()->Vendor->Session->get('app_idTienda');
    }
    
    protected function spMantenimiento() {        print_r($this->_form);
    
//     [txt_primernombre] => qqqqqq
//    [txt_segundonombre] => qqqqqqqqqqqqqqqqq
//    [txt_apellidopaterno] => qqqqq
//    [txt_apellidomaterno] => qqqq
//    [lst_pais] => 3
//    [lst_estadocivil] => 3
//    [lst_tipodocumentoidentidad] => 4
//    [txt_nrodocidentidad] => 2222222
//    [txt_telefonocasa] => 11111
//    [txt_telefonotrabajo] => 1111
//    [txt_celular] => 111
//    [txt_direcciondomicilio] => 11111111111
//    [txt_direcciontrabajo] => 11111111111111
//    [txt_tarjetapropiedad] => qq
//    [txt_placa] => qqq
//    [txt_marca] => qqq
//    [txt_modelo] => qqq
//    [txt_nromotor] => qqq
//    [txt_serie] => qqq
//    [txt_aniofabricacion] => 2222
//    [txt_cilindrada] => qqqqqq
//    [txt_nrorevisiontecnica] => 111111111
//    [txt_fechainspeccion] => 17-05-2018
//    [txt_soat] => 11111111111
//    [txt_fechavigenciasoat] => 24-05-2018
//    [_imgConsentimiento] => Acces.png
//    [_imgDocIdentidad] => 2RecycleBinEmpty.png
//    [_imgFormatoSolixcitud] => undefined
//    [_imgHojaCalidda] => Ou.png
//    [_imgInscripcionMovil] => Agents.png
//    [_imgLicenciaConducir] => 2RecycleBinFull.png
//    [_imgRecibo] => Administrator.png
//    [_imgRevisionTecnica] => Chrysanthemum.jpg
//    [_imgSoat] => Desert.jpg
//    [_imgTarjetaPropiedad] => 3dsmaxblack.png
             
             
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
            ':placa' => @$this->_form->txt_placa,
            ':marca' => @$this->_form->txt_marca,
            ':modelo' => @$this->_form->txt_modelo,
            ':nromotor' => @$this->_form->txt_nromotor,
            ':serie' => @$this->_form->txt_serie,
            ':aniofabricacion' => @$this->_form->txt_aniofabricacion,
            ':cilindrada' => @$this->_form->txt_cilindrada,
            ':nrorevisiontecnica' => @$this->_form->txt_nrorevisiontecnica,
            ':fechainspeccion' => @$this->_form->txt_fechainspeccion,
            ':soat' => @$this->_form->txt_soat,
            ':fechavigenciasoat' => @$this->_form->txt_fechavigenciasoat,
            ':imgConsentimiento' => @$this->_form->_imgConsentimiento,
            ':imgDocIdentidad' => @$this->_form->_imgDocIdentidad,
            ':imgFormatoSolixcitud' =>  @$this->_form->_imgFormatoSolixcitud,
            ':imgHojaCalidda' => @$this->_form->_imgHojaCalidda,
            ':imgInscripcionMovil' => @$this->_form->_imgInscripcionMovil,
            ':imgLicenciaConducir' => @$this->_form->_imgLicenciaConducir,
            ':imgRecibo' => @$this->_form->_imgRecibo,
            ':imgRevisionTecnica' => @$this->_form->_imgRevisionTecnica,
            ':imgSoat' => @$this->_form->_imgSoat,
            ':imgTarjetaPropiedad' => @$this->_form->_imgTarjetaPropiedad,
            ':usuario' => $this->_usuario,
            ':ipPublica' => $this->_ipPublica,  
            ':ipLocal' => $this->_ipLocal,
            ':navegador' => $this->_navegador,
            ':hostname' => $this->_hostName
        ];
        
        return $this->getRow($query, $parms);
    }
    
}