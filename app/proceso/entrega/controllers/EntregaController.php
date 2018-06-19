<?php
/* 
* ---------------------------------------
* --------- CREATED BY LV ----------
* Autor:        Super 
* Fecha:        08-06-2018 07:06:19 
* Descripcion : EntregaController.php
* ---------------------------------------
*/ 

namespace Proceso\Entrega\Controllers;
   
use \Vendor\Controller;
use \Proceso\Entrega\Filters\EntregaFilter;

class EntregaController extends \Proceso\Entrega\Models\EntregaModel {
    
    use Controller {
        Controller::__construct as private __cConstruct;
    }
    use EntregaFilter {
        EntregaFilter::__construct as private __fConstruct;
    }
    
    public function __construct() {
        parent::__construct();  /* constructor del EntregaModel */
        $this->__cConstruct();  /* constructor del Controller */
        $this->__fConstruct();  /* constructor del EntregaFilter */
    }
    
    public function index() {}
    
    public function getVehiculos() {
        echo json_encode($this->qGetVehiculos());
    }
    
    public function postAtender() {
        echo json_encode($this->spAtender());
    }
    
    public function postFinalizar() {
        $data = $this->spFinalizar();
        
        if($this->_form->_flag == 1 && $data['ok_error'] == 'ok'){//se esta entregando, enviar correos segun rol
            switch ($this->_idRol) {
                case 5://el usuario que finaliza es de rol VERIFYGAS, enviar mail a calidda y taller
                    $this->_sendMailEntregaAprobadaVerifyGas($data);
                    break;
            }
        }
        echo json_encode($data);
    }
    
    public function findPropietario() {
        echo json_encode($this->qFindPropietario());
    }
    
    public function postUpload() {     
        $data = [];
        
        if ($this->_file) {
            
            switch ($this->_form->_load) {
                case 1:  
                    $inputFile = $this->_file->file_escaneo_1;
                    $nameElement = '_documentoEscaneado_1';
                    break;
                case 2:  
                    $inputFile = $this->_file->file_escaneo_2;
                    $nameElement = '_documentoEscaneado_2';
                    break;
                case 3:  
                    $inputFile = $this->_file->file_escaneo_3;
                    $nameElement = '_documentoEscaneado_3';
                    break;
                case 4:  
                    $inputFile = $this->_file->file_escaneo_4;
                    $nameElement = '_documentoEscaneado_4';
                    break;
                case 5:  
                    $inputFile = $this->_file->file_escaneo_5;
                    $nameElement = '_documentoEscaneado_5';
                    break;
                case 6:  
                    $inputFile = $this->_file->file_escaneo_6;
                    $nameElement = '_documentoEscaneado_6';
                    break;
                case 7:  
                    $inputFile = $this->_file->file_escaneo_7;
                    $nameElement = '_documentoEscaneado_7';
                    break;
                case 8:  
                    $inputFile = $this->_file->file_escaneo_8;
                    $nameElement = '_documentoEscaneado_8';
                    break;
                case 9:  
                    $inputFile = $this->_file->file_escaneo_9;
                    $nameElement = '_documentoEscaneado_9';
                    break;
                case 10:  
                    $inputFile = $this->_file->aile_escaneo_10;
                    $nameElement = '_documentoEscaneado_10';
                    break;
                case 11:  
                    $inputFile = $this->_file->txt_escaneo_11;
                    $nameElement = '_documentoEscaneado_11';
                    break;
                case 12:  
                    $inputFile = $this->_file->txt_escaneo_12;
                    $nameElement = '_documentoEscaneado_12';
                    break;
                case 13:  
                    $inputFile = $this->_file->txt_escaneo_13;
                    $nameElement = '_documentoEscaneado_13';
                    break;
                case 14:  
                    $inputFile = $this->_file->txt_escaneo_14;
                    $nameElement = '_documentoEscaneado_14';
                    break;
            }
            
            $root = ROOT . 'files' . DS . 'entrega' . DS; //ruta donde se va alojar el archivo
            
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
    
    private function _sendMailEntregaAprobadaTaller($data) {
        $body = file_get_contents('files' . DS . 'mails' . DS . 'mailEntregaAprobadaTaller.phtml');
        
        /* reemplazando titulos */
        $body = str_replace("{NOMBRES}", $data['propietario'], $body);
        $body = str_replace("{PLACA}", $data['placa'], $body);
        $body = str_replace("{MARCA}", $data['marca'], $body);
        $body = str_replace("{MODELO}", $data['modelo'], $body);
        $body = str_replace("{SERIE}", $data['serie'], $body);
        
        Obj()->Libs->PHPMailer->setFrom('admin@admin.com', 'VERIFYGAS');
        Obj()->Libs->PHPMailer->Subject = 'Entrega Aprobada';
        Obj()->Libs->PHPMailer->CharSet = 'UTF-8';
        //contenido del correo
        Obj()->Libs->PHPMailer->msgHTML($body, ROOT);
        Obj()->Libs->PHPMailer->AltBody = 'Se aprobo una entrega';

        /* realizando el envio a los correos del postulante */
        //correos y nombres de destinatario
        Obj()->Libs->PHPMailer->addAddress('danilod_7@hotmail.com', 'ENTREGA');#correo de verifygas
        Obj()->Libs->PHPMailer->addAddress('roger.cotrina.c@gmail.com', 'ENTREGA');
        //enviando
        Obj()->Libs->PHPMailer->send();
    }
    
    private function _sendMailEntregaAprobadaVerifyGas($data) {
        $body = file_get_contents('files' . DS . 'mails' . DS . 'mailEntregaAprobadaVerifyGas.phtml');
        
        /* reemplazando titulos */
        $body = str_replace("{NOMBRES}", $data['propietario'], $body);
        $body = str_replace("{PLACA}", $data['placa'], $body);
        $body = str_replace("{MARCA}", $data['marca'], $body);
        $body = str_replace("{MODELO}", $data['modelo'], $body);
        $body = str_replace("{SERIE}", $data['serie'], $body);
        
        Obj()->Libs->PHPMailer->setFrom('admin@admin.com', 'VERIFYGAS');
        Obj()->Libs->PHPMailer->Subject = 'Entrega Finalizada';
        Obj()->Libs->PHPMailer->CharSet = 'UTF-8';
        //contenido del correo
        Obj()->Libs->PHPMailer->msgHTML($body, ROOT);
        Obj()->Libs->PHPMailer->AltBody = 'Se finalizó una entrega';

        /* realizando el envio a los correos del postulante */
        //correos y nombres de destinatario
        //Obj()->Libs->PHPMailer->addAddress('victor.luperdi@calidda.com.pe', 'ENTREGA FINALIZADA');#correo de calidda
        //Obj()->Libs->PHPMailer->addAddress('TALLER@calidda.com.pe', 'ENTREGA FINALIZADA');#correo de taller
        Obj()->Libs->PHPMailer->addAddress('roger.cotrina.c@gmail.com', 'ENTREGA FINALIZADA');
        //enviando
        Obj()->Libs->PHPMailer->send();
    }
    
    public function postEntrega() {
        $data = $this->spMantenimiento();
        
        if($this->_form->_flag == 1 && $data['ok_error'] == 'ok'){//se esta entregando, enviar correos segun rol
            switch ($this->_idRol) {
                case 3://el usuario que entrega es de rol TALLER, enviar mail a verifygas
                    $this->_sendMailEntregaAprobadaTaller($data);
                    break;
            }
        }
        echo json_encode($data);
    }
    
    public function getEntrega() {
        echo json_encode($this->qEntrega());
    }
    
}