<?php
/* 
* ---------------------------------------
* --------- CREATED BY LV ----------
* Autor:        Super 
* Fecha:        08-06-2018 01:06:03 
* Descripcion : ConversionController.php
* ---------------------------------------
*/ 

namespace Proceso\Conversion\Controllers;
   
use \Vendor\Controller;
use \Proceso\Conversion\Filters\ConversionFilter;

class ConversionController extends \Proceso\Conversion\Models\ConversionModel {
    
    use Controller {
        Controller::__construct as private __cConstruct;
    }
    use ConversionFilter {
        ConversionFilter::__construct as private __fConstruct;
    }
    
    public function __construct() {
        parent::__construct();  /* constructor del ConversionModel */
        $this->__cConstruct();  /* constructor del Controller */
        $this->__fConstruct();  /* constructor del ConversionFilter */
    }
    
    public function index() {}
    
    public function getVehiculos() {
        echo json_encode($this->qGetVehiculos());
    }
    
    private function _sendMailConversionAprobadaTaller($data) {
        $body = file_get_contents('files' . DS . 'mails' . DS . 'mailConversionAprobadaTaller.phtml');
        
        /* reemplazando titulos */
        $body = str_replace("{NOMBRES}", $data['propietario'], $body);
        $body = str_replace("{PLACA}", $data['placa'], $body);
        $body = str_replace("{MARCA}", $data['marca'], $body);
        $body = str_replace("{MODELO}", $data['modelo'], $body);
        $body = str_replace("{SERIE}", $data['serie'], $body);
        
        Obj()->Libs->PHPMailer->setFrom('admin@admin.com', 'VERIFYGAS');
        Obj()->Libs->PHPMailer->Subject = 'Conversion Aprobada';
        Obj()->Libs->PHPMailer->CharSet = 'UTF-8';
        //contenido del correo
        Obj()->Libs->PHPMailer->msgHTML($body, ROOT);
        Obj()->Libs->PHPMailer->AltBody = 'Se aprobo una conversión';

        /* realizando el envio a los correos del postulante */
        //correos y nombres de destinatario
        Obj()->Libs->PHPMailer->addAddress('danilod_7@hotmail.com', 'CONVERSION');#correo de verifygas
        Obj()->Libs->PHPMailer->addAddress('roger.cotrina.c@gmail.com', 'CONVERSION');
        //enviando
        Obj()->Libs->PHPMailer->send();
    }
    
    private function _sendMailConversionAprobadaVerifyGas($data) {
        $body = file_get_contents('files' . DS . 'mails' . DS . 'mailConversionAprobadaVerifyGas.phtml');
        
        /* reemplazando titulos */
        $body = str_replace("{NOMBRES}", $data['propietario'], $body);
        $body = str_replace("{PLACA}", $data['placa'], $body);
        $body = str_replace("{MARCA}", $data['marca'], $body);
        $body = str_replace("{MODELO}", $data['modelo'], $body);
        $body = str_replace("{SERIE}", $data['serie'], $body);
        
        Obj()->Libs->PHPMailer->setFrom('admin@admin.com', 'VERIFYGAS');
        Obj()->Libs->PHPMailer->Subject = 'Conversion Aprobada';
        Obj()->Libs->PHPMailer->CharSet = 'UTF-8';
        //contenido del correo
        Obj()->Libs->PHPMailer->msgHTML($body, ROOT);
        Obj()->Libs->PHPMailer->AltBody = 'Se aprobo una conversión';

        /* realizando el envio a los correos del postulante */
        //correos y nombres de destinatario
        #Obj()->Libs->PHPMailer->addAddress('victor.luperdi@calidda.com.pe', 'CONVERSION');#correo de calidda
        #Obj()->Libs->PHPMailer->addAddress('taller@hotmail.com', 'CONVERSION');#correo de taller
        Obj()->Libs->PHPMailer->addAddress('roger.cotrina.c@gmail.com', 'CONVERSION');
        //enviando
        Obj()->Libs->PHPMailer->send();
    }
    
    public function postAtender() {
        $data = $this->spAtender();
        if($this->_form->_flag == 1 && $data['ok_error'] == 'ok'){//se esta aprobando, enviar correos segun rol
            switch ($this->_idRol) {
                case 3://el usuario que aprueba es de rol TALLER, enviar mail a verifygas
                    $this->_sendMailConversionAprobadaTaller($data);
                    break;
                case 5://el usuario que aprueba es de rol VERIFYGAS, enviar mail a calidda y taller
                    $this->_sendMailConversionAprobadaVerifyGas($data);
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
    
    public function findPropietario() {
        echo json_encode($this->qFindPropietario());
    }
    
    public function postUploadVideo() {     
        $data = [];
        
        if ($this->_file) {
            
            switch ($this->_form->_load) {
                case 1: //Prueba de Vacio de Motor ralenti
                    $inputFile = $this->_file->file_video_varios;
                    $nameElement = '_videoVarios';
                    $this->_columnDB = 'video_varios';
                    break;
                case 2: //analisis de gases ralenti
                    $inputFile = $this->_file->file_video_estado_funcionamiento_gnv;
                    $nameElement = '_videoEstadoFUncionamientoGNV';
                    $this->_columnDB = 'video_estado_funcionamiento';
                    break;
            }
            
            $root = ROOT . 'files' . DS . 'videos' . DS; //ruta donde se va alojar el archivo
            
            $ext = explode('.', $inputFile['name'])[1];

            $nvoNom = $this->_usuario.$nameElement.'_'.uniqid('vg').'.'.$ext;
           // $nvoNom = $this->_usuario.$nameElement.'.'.$ext;//str_replace(' ', '', $inputFile['name']);

            Obj()->Vendor->Tools->deleteFile($root . $nvoNom);

            Obj()->Libs->Upload->upload($inputFile);
            
            Obj()->Libs->Upload->allowed = ['video/mpeg', 'video/x-flv', 'video/msvideo','video/mp4'];

            if (Obj()->Libs->Upload->uploaded) {
                Obj()->Libs->Upload->file_new_name_body = explode('.', $nvoNom)[0]; //se quita la extension

                Obj()->Libs->Upload->Process($root);

                if (Obj()->Libs->Upload->processed) {

                    Obj()->Libs->Upload->Clean();

                    //funciona desde el formulario editar
                    if ($this->_form->_tieneConversion) {
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
    
    public function postNewConversion() {
//        if ($this->isValidate()) {
//            $data = $this->spMantenimiento();
//        } else {
//            $data = $this->valida()->messages();
//        }
        echo json_encode($this->spMantenimientoConversion());
    }
    
    public function getConversion() {
        echo json_encode($this->qGetConversion());
    }
    
}