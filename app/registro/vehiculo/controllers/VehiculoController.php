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
    
    public function postUploadVideo() {     
        $data = [];
        
        if ($this->_file) {
            
            switch ($this->_form->_load) {
                case 1: //Prueba de Vacio de Motor ralenti
                    $inputFile = $this->_file->file_videovaciomotorralenti;
                    $nameElement = '_videoVacioMotorRalenti';
                    $this->_columnDB = 'video_vacio_motor_ralenti';
                    break;
                case 2: //analisis de gases ralenti
                    $inputFile = $this->_file->file_videovralentianalisisgases;
                    $nameElement = '_videoAnalisisGasesRalenti';
                    $this->_columnDB = 'video_analisis_gas_ralenti';
                    break;
                case 3: //analisis de gases RPM
                    $inputFile = $this->_file->file_videovrpmanalisisgases;
                    $nameElement = '_videoAnalisisGasesRPM';
                    $this->_columnDB = 'video_analisis_gas_rpm';
                    break;
                case 4: //STFT B1
                    $inputFile = $this->_file->file_videostftb1;
                    $nameElement = '_videoSTFTB1';
                    $this->_columnDB = 'video_stft_b1';
                    break;
                case 5: //recibo de agua/luz...
                    $inputFile = $this->_file->file_videoltftb1;
                    $nameElement = '_videoLTFTB1';
                    $this->_columnDB = 'video_ltft_b1';
                    break;
                case 6: //documento de inscripcion movil
                    $inputFile = $this->_file->file_videocilindro;
                    $nameElement = '_videoCilindros';
                    $this->_columnDB = 'video_cilindros';
                    break;
            }
            
            $root = ROOT . 'files' . DS . 'videos' . DS; //ruta donde se va alojar el archivo
            
            $ext = explode('.', $inputFile['name'])[1];
            
            $nvoNom = $this->_usuario.$nameElement.'_'.uniqid('vg').'.'.$ext;

            Obj()->Vendor->Tools->deleteFile($root . $nvoNom);

            Obj()->Libs->Upload->upload($inputFile);
            
            Obj()->Libs->Upload->allowed = ['video/mpeg', 'video/x-flv', 'video/msvideo','video/mp4'];

            if (Obj()->Libs->Upload->uploaded) {
                Obj()->Libs->Upload->file_new_name_body = explode('.', $nvoNom)[0]; //se quita la extension

                Obj()->Libs->Upload->Process($root);

                if (Obj()->Libs->Upload->processed) {

                    Obj()->Libs->Upload->Clean();

                    //funciona desde el formulario editar
                    if ($this->_form->_tienePreconversion) {
                        $this->qUpdateVideo($nvoNom);
                    }

                    $data = ['result' => 1, 'archivo' => $nvoNom, 'element' => $nameElement];
                } else {
                    $data = ['result' => Obj()->Libs->Upload->error];
                }
            }else {
                $data = ['result' => Obj()->Libs->Upload->error];
            }            
        }
        
        echo json_encode($data);
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
            
            $ext = explode('.', $inputFile['name'])[1];
            
            $nvoNom = $this->_usuario.$nameElement.'_'.uniqid('vg').'.'.$ext;

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
    
    private function _sendMailPreconversionAprobadaVerifyGas($data) {
        $body = file_get_contents('files' . DS . 'mails' . DS . 'mailPreconversionAprobadaVerifyGas.phtml');
        
        /* reemplazando titulos */
        $body = str_replace("{NOMBRES}", $data['propietario'], $body);
        $body = str_replace("{PLACA}", $data['placa'], $body);
        $body = str_replace("{MARCA}", $data['marca'], $body);
        $body = str_replace("{MODELO}", $data['modelo'], $body);
        $body = str_replace("{SERIE}", $data['serie'], $body);
        
        Obj()->Libs->PHPMailer->setFrom('admin@admin.com', 'VERIFYGAS');
        Obj()->Libs->PHPMailer->Subject = 'Pre Conversion Aprobada';
        Obj()->Libs->PHPMailer->CharSet = 'UTF-8';
        //contenido del correo
        Obj()->Libs->PHPMailer->msgHTML($body, ROOT);
        Obj()->Libs->PHPMailer->AltBody = 'Se aprobo una pre conversión';

        /* realizando el envio a los correos del postulante */
        //correos y nombres de destinatario
        #Obj()->Libs->PHPMailer->addAddress('victor.luperdi@calidda.com.pe', 'PRE CONVERSION');#correo de calidda
        Obj()->Libs->PHPMailer->addAddress('roger.cotrina.c@gmail.com', 'PRE CONVERSION');
        //enviando
        Obj()->Libs->PHPMailer->send();
    }

    private function _sendMailPreconversionAprobadaTaller($data) {        
        $body = file_get_contents('files' . DS . 'mails' . DS . 'mailPreconversionAprobadaTaller.phtml');
        
        /* reemplazando titulos */
        $body = str_replace("{NOMBRES}", $data['propietario'], $body);
        $body = str_replace("{PLACA}", $data['placa'], $body);
        $body = str_replace("{MARCA}", $data['marca'], $body);
        $body = str_replace("{MODELO}", $data['modelo'], $body);
        $body = str_replace("{SERIE}", $data['serie'], $body);
        
        Obj()->Libs->PHPMailer->setFrom('admin@admin.com', 'VERIFYGAS');
        Obj()->Libs->PHPMailer->Subject = 'Pre Conversion Aprobada';
        Obj()->Libs->PHPMailer->CharSet = 'UTF-8';
        //contenido del correo
        Obj()->Libs->PHPMailer->msgHTML($body, ROOT);
        Obj()->Libs->PHPMailer->AltBody = 'Se aprobo una pre conversión';

        /* realizando el envio a los correos del postulante */
        //correos y nombres de destinatario
        Obj()->Libs->PHPMailer->addAddress('danilod_7@hotmail.com', 'PRE CONVERSION');#correo de verifygas
        Obj()->Libs->PHPMailer->addAddress('roger.cotrina.c@gmail.com', 'PRE CONVERSION');
        //enviando
        Obj()->Libs->PHPMailer->send();
    }
    
    private function _sendMailPreconversionAprobadaCalidda($data) {
        $body = file_get_contents('files' . DS . 'mails' . DS . 'mailPreconversionAprobadaCalidda.phtml');
        
        /* reemplazando titulos */
        $body = str_replace("{NOMBRES}", $data['propietario'], $body);
        $body = str_replace("{PLACA}", $data['placa'], $body);
        $body = str_replace("{MARCA}", $data['marca'], $body);
        $body = str_replace("{MODELO}", $data['modelo'], $body);
        $body = str_replace("{SERIE}", $data['serie'], $body);
        
        Obj()->Libs->PHPMailer->setFrom('admin@admin.com', 'VERIFYGAS');
        Obj()->Libs->PHPMailer->Subject = 'Pre Conversion Aprobada';
        Obj()->Libs->PHPMailer->CharSet = 'UTF-8';
        //contenido del correo
        Obj()->Libs->PHPMailer->msgHTML($body, ROOT);
        Obj()->Libs->PHPMailer->AltBody = 'Se aprobo una pre conversión';

        /* realizando el envio a los correos del postulante */
        //correos y nombres de destinatario
        //Obj()->Libs->PHPMailer->addAddress('taller@hotmail.com', 'PRE CONVERSION');#correo de taller
        Obj()->Libs->PHPMailer->addAddress('danilod_7@hotmail.com', 'PRE CONVERSION');#correo de verifygas
        Obj()->Libs->PHPMailer->addAddress('roger.cotrina.c@gmail.com', 'PRE CONVERSION');
        //enviando
        Obj()->Libs->PHPMailer->send();
    }

    public function postNew() {
        if ($this->isValidate()) {
            $data = $this->spMantenimiento();
        } else {
            $data = $this->valida()->messages();
        }
        echo json_encode($data);
    }
    
    public function postNewPreconversion() {
//        if ($this->isValidate()) {
//            $data = $this->spMantenimiento();
//        } else {
//            $data = $this->valida()->messages();
//        }
        echo json_encode($this->spMantenimientoPreConversion());
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
    
    public function postAtender() {
        $data = $this->spAtender();
        if($this->_form->_flag == 1 && $data['ok_error'] == 'ok'){//se esta aprobando, enviar correos segun rol
            switch ($this->_idRol) {
                case 3://el usuario que aprueba es de rol TALLER, enviar mail a verifygas
                    $this->_sendMailPreconversionAprobadaTaller($data);
                    break;
                case 5://el usuario que aprueba es de rol VERIFYGAS, enviar mail a calidda
                    $this->_sendMailPreconversionAprobadaVerifyGas($data);
                    break;
                case 7://el usuario que aprueba es de rol CALIDDA, enviar mail a taller y verifygas
                    $this->_sendMailPreconversionAprobadaCalidda($data);
                    break;
            }
        }elseif($this->_form->_flag == 2 && $data['ok_error'] == 'ok'){//se esta rechazando, enviar correos segun rol
            #PENDIENTE HASTA QUE SE APLIQUE EL FILTRO POR ESTADO EN LOS FILTROS
            /*switch ($this->_idRol) {
                case 5://el usuario que rechaza es de rol VERIFYGAS, enviar mail a taller
                    $this->_sendMailPreconversionRechazaVerifyGas($data);
                    break;
                case 7://el usuario que rechaza es de rol CALIDDA, enviar mail a taller y verifygas
                    $this->_sendMailPreconversionRechazaCalidda($data);
                    break;
            }*/
        }
        
        echo json_encode($data);
    }

    public function find() {
        echo json_encode($this->qFind());
    }
    
    public function findPropietario() {
        echo json_encode($this->qFindPropietario());
    }
    
    public function getTipoSistemaEncendido() {
        echo json_encode($this->qTipoSistemaEncendido());
    }
    
    public function getPreConversion() {
        echo json_encode($this->qGetPreConversion());
    }

}
