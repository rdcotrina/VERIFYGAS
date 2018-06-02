<?php

/*
 * ---------------------------------------
 * --------- CREATED BY LV ----------
 * Autor:        Super 
 * Fecha:        26-05-2018 04:05:26 
 * Descripcion : VehiculoController.php
 * ---------------------------------------
 */

namespace Registro\Vehiculo\Controllers;

use \Vendor\Controller;
use \Registro\Vehiculo\Filters\VehiculoFilter;

class VehiculoController extends \Registro\Vehiculo\Models\VehiculoModel {

    use Controller {
        Controller::__construct as private __cConstruct;
    }
    use VehiculoFilter {
        VehiculoFilter::__construct as private __fConstruct;
    }

    public function __construct() {
        parent::__construct();  /* constructor del VehiculoModel */
        $this->__cConstruct();  /* constructor del Controller */
        $this->__fConstruct();  /* constructor del VehiculoFilter */
    }

    public function index() {
        
    }

    public function getVehiculos() {
        echo json_encode($this->qGetVehiculos());
    }

    public function postUpload() {
        $data = [];

        if ($this->_file) {

            switch ($this->_form->_load) {
                case 1: //documento de identidad
                    $inputFile = $this->_file->file_docidentidad;
                    $nameElement = '_imgDocIdentidad';
                    $this->_tableDB = 'conv_propietario';
                    $this->_columnDB = 'imagen_documento_identidad';
                    break;
                case 2: //licencia de conducir
                    $inputFile = $this->_file->file_licenciaconducir;
                    $nameElement = '_imgLicenciaConducir';
                    $this->_tableDB = 'conv_propietario';
                    $this->_columnDB = 'imagen_licencia_conducir';
                    break;
                case 3: //tarjeta de propiedad
                    $inputFile = $this->_file->file_tarjetapropiedadimg;
                    $nameElement = '_imgTarjetaPropiedad';
                    $this->_tableDB = 'conv_vehiculo';
                    $this->_columnDB = 'imagen_tarjeta_propiedad';
                    break;
                case 4: //documento de consentimiento
                    $inputFile = $this->_file->file_consentimiento;
                    $nameElement = '_imgConsentimiento';
                    $this->_tableDB = 'conv_propietario';
                    $this->_columnDB = 'imagen_consentimiento';
                    break;
                case 5: //recibo de agua/luz...
                    $inputFile = $this->_file->file_recibo;
                    $nameElement = '_imgRecibo';
                    $this->_tableDB = 'conv_vehiculo';
                    $this->_columnDB = 'imagen_servicio_publico';
                    break;
                case 6: //documento de inscripcion movil
                    $inputFile = $this->_file->file_inscripcionmovil;
                    $nameElement = '_imgInscripcionMovil';
                    $this->_tableDB = 'conv_vehiculo';
                    $this->_columnDB = 'imagen_movil';
                    break;
                case 7: //documento de revision tecnica
                    $inputFile = $this->_file->file_revisiontecnica;
                    $nameElement = '_imgRevisionTecnica';
                    $this->_tableDB = 'conv_vehiculo';
                    $this->_columnDB = 'imagen_revision_tecnica';
                    break;
                case 8: //soat
                    $inputFile = $this->_file->file_soat;
                    $nameElement = '_imgSoat';
                    $this->_tableDB = 'conv_vehiculo';
                    $this->_columnDB = 'imagen_poliza';
                    break;
                case 9: //documento de formato de solicitud
                    $inputFile = $this->_file->file_formatosolicitud;
                    $nameElement = '_imgFormatoSolicitud';
                    $this->_tableDB = 'conv_vehiculo';
                    $this->_columnDB = 'imagen_solicitud_cobranza';
                    break;
                case 10: //documento de hojs de calidda
                    $inputFile = $this->_file->file_hojacalidda;
                    $nameElement = '_imgHojaCalidda';
                    $this->_tableDB = 'conv_vehiculo';
                    $this->_columnDB = 'imagen_formulario_calidda';
                    break;
            }



            $root = ROOT . 'files' . DS . 'docs_registro' . DS; //ruta donde se va alojar el archivo

            $nvoNom = str_replace(' ', '', $inputFile['name']);

            Obj()->Vendor->Tools->deleteFile($root . $nvoNom);

            Obj()->Libs->Upload->upload($inputFile);

            Obj()->Libs->Upload->allowed = ['image/jpg', 'image/jpeg', 'image/png'];

            if (Obj()->Libs->Upload->uploaded) {

                Obj()->Libs->Upload->file_new_name_body = explode('.', $nvoNom)[0]; //se quita la extension

                Obj()->Libs->Upload->Process($root);

                if (Obj()->Libs->Upload->processed) {

                    Obj()->Libs->Upload->Clean();
                    
                    //funciona desde el formulario editar
                    if ($this->_form->_keyPropietario) {
                        $this->qUpdateImg($nvoNom);
                    }

                    $data = ['result' => 1, 'archivo' => $nvoNom, 'element' => $nameElement];
                } else {
                    $data = ['result' => Obj()->Libs->Upload->error];
                }
            } else {
                $data = ['result' => Obj()->Libs->Upload->error];
            }
        }
        echo json_encode($data);
    }

    public function postNew() {
        if ($this->isValidate()) {
            $data = $this->spMantenimiento();
        } else {
            $data = $this->valida()->messages();
        }
        echo json_encode($data);
    }
    
    public function postEdit() {
        if ($this->isValidate()) {
            $data = $this->spMantenimiento();
        } else {
            $data = $this->valida()->messages();
        }
        echo json_encode($data);
    }

    public function postDelete() {
        echo json_encode($this->spMantenimiento());
    }

    public function find() {
        echo json_encode($this->qFind());
    }

}
