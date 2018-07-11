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
use \Dompdf\Dompdf;
use ZipArchive;

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
//                case 4: //STFT B1
//                    $inputFile = $this->_file->file_videostftb1;
//                    $nameElement = '_videoSTFTB1';
//                    $this->_columnDB = 'video_stft_b1';
//                    break;
                case 5: //video ltft_b1
                    $inputFile = $this->_file->file_videoltftb1;
                    $nameElement = '_videoLTFTB1';
                    $this->_columnDB = 'video_ltft_b1';
                    break;
                case 6: //video de cilindros
                    $inputFile = $this->_file->file_videocilindro;
                    $nameElement = '_videoCilindros';
                    $this->_columnDB = 'video_cilindros';
                    break;
            }

            if ($inputFile['size'] <= 132000000) {
                $root = ROOT . 'files' . DS . 'videos' . DS; //ruta donde se va alojar el archivo

                $ext = explode('.', $inputFile['name'])[1];

                $nvoNom = $this->_usuario . $nameElement . '_' . uniqid('vg') . '.' . strtolower($ext);

                Obj()->Vendor->Tools->deleteFile($root . $nvoNom);

                Obj()->Libs->Upload->upload($inputFile);

                Obj()->Libs->Upload->allowed = ['video/mpeg', 'video/x-flv', 'video/msvideo', 'video/mp4', 'image/jpg', 'image/jpeg', 'image/png',];

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
                } else {
                    $data = ['result' => Obj()->Libs->Upload->error];
                }
            } else {
                $data = ['result' => 2];
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
                case 11: //contrato de financiamiento de calidda 
                    $inputFile = $this->_file->file_contrato_financiamiento_calidda;
                    $nameElement = '_imgContratoFinanciamitoCalidda';
                    $this->_tableDB = 'conv_vehiculo';
                    $this->_columnDB = 'img_contrato_financiamiento_calidda';
                    break;
            }



            $root = ROOT . 'files' . DS . 'docs_registro' . DS; //ruta donde se va alojar el archivo

            $ext = explode('.', $inputFile['name'])[1];

            $nvoNom = $this->_usuario . $nameElement . '_' . uniqid('vg') . '.' . strtolower($ext);

            Obj()->Vendor->Tools->deleteFile($root . $nvoNom);

            Obj()->Libs->Upload->upload($inputFile);

            Obj()->Libs->Upload->allowed = [
                'image/jpg',
                'image/jpeg',
                'image/png',
                'application/msword',
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/excel',
                'application/pdf',
                'application/zip',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/x-rar',
                'application/x-rar-compressed',
            ];


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
        $body = str_replace("{TALLER}", $data['taller'], $body);

        Obj()->Libs->PHPMailer->setFrom('admin@admin.com', APP_COMPANY);
        Obj()->Libs->PHPMailer->Subject = 'Pre Conversion Aprobada';
        Obj()->Libs->PHPMailer->CharSet = 'UTF-8';
        //contenido del correo
        Obj()->Libs->PHPMailer->msgHTML($body, ROOT);
        Obj()->Libs->PHPMailer->AltBody = 'Se aprobo una pre conversión';

        /* realizando el envio a los correos del postulante */
        //correos y nombres de destinatario
        Obj()->Libs->PHPMailer->addAddress(MAIL_CALIDDA, 'PRE CONVERSION'); #correo de calidda
        Obj()->Libs->PHPMailer->addAddress(MAIL_DESARROLLADOR, 'PRE CONVERSION');
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
        $body = str_replace("{TALLER}", $data['taller'], $body);

        Obj()->Libs->PHPMailer->setFrom('admin@admin.com', APP_COMPANY);
        Obj()->Libs->PHPMailer->Subject = 'Pre Conversion Aprobada';
        Obj()->Libs->PHPMailer->CharSet = 'UTF-8';
        //contenido del correo
        Obj()->Libs->PHPMailer->msgHTML($body, ROOT);
        Obj()->Libs->PHPMailer->AltBody = 'Se aprobo una pre conversión';

        /* realizando el envio a los correos del postulante */
        //correos y nombres de destinatario
        Obj()->Libs->PHPMailer->addAddress(MAIL_VERIFYGAS, 'PRE CONVERSION'); #correo de verifygas
        Obj()->Libs->PHPMailer->addAddress(MAIL_DESARROLLADOR, 'PRE CONVERSION');
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
        $body = str_replace("{TALLER}", $data['taller'], $body);
        $body = str_replace("{EXPEDIENTE}", $data['nro_expediente'], $body);

        Obj()->Libs->PHPMailer->setFrom('admin@admin.com', APP_COMPANY);
        Obj()->Libs->PHPMailer->Subject = 'Pre Conversion Aprobada';
        Obj()->Libs->PHPMailer->CharSet = 'UTF-8';
        //contenido del correo
        Obj()->Libs->PHPMailer->msgHTML($body, ROOT);
        Obj()->Libs->PHPMailer->AltBody = 'Se aprobo una pre conversión';

        /* realizando el envio a los correos del postulante */
        //correos y nombres de destinatario
        Obj()->Libs->PHPMailer->addAddress($data['mail_taller'], 'PRE CONVERSION'); #correo de taller
        Obj()->Libs->PHPMailer->addAddress(MAIL_VERIFYGAS, 'PRE CONVERSION'); #correo de verifygas
        Obj()->Libs->PHPMailer->addAddress(MAIL_DESARROLLADOR, 'PRE CONVERSION');
        //enviando
        Obj()->Libs->PHPMailer->send();
    }

    private function _sendMailExpedienteIngresado($data) {
        $body = file_get_contents('files' . DS . 'mails' . DS . 'mailNuevoExpediente.phtml');

        /* reemplazando titulos */
        $body = str_replace("{NOMBRES}", $data['propietario'], $body);
        $body = str_replace("{PLACA}", $data['placa'], $body);
        $body = str_replace("{MARCA}", $data['marca'], $body);
        $body = str_replace("{MODELO}", $data['modelo'], $body);
        $body = str_replace("{SERIE}", $data['serie'], $body);
        $body = str_replace("{TALLER}", $data['taller'], $body);

        Obj()->Libs->PHPMailer->setFrom('admin@admin.com', APP_COMPANY);
        Obj()->Libs->PHPMailer->Subject = 'Apertura de Expediente';
        Obj()->Libs->PHPMailer->CharSet = 'UTF-8';
        //contenido del correo
        Obj()->Libs->PHPMailer->msgHTML($body, ROOT);
        Obj()->Libs->PHPMailer->AltBody = 'Se aperturó un nuevo Expediente';

        /* realizando el envio a los correos del postulante */
        //correos y nombres de destinatario
        Obj()->Libs->PHPMailer->addAddress(MAIL_VERIFYGAS, 'EXPEDIENTE'); #correo de verifygas
        Obj()->Libs->PHPMailer->addAddress(MAIL_TECNICO_VERIFYGAS, 'EXPEDIENTE'); #correo de tecnico de verifygas
        Obj()->Libs->PHPMailer->addAddress(MAIL_DESARROLLADOR, 'EXPEDIENTE');
        //enviando
        Obj()->Libs->PHPMailer->send();
    }

    public function postNew() {
        $data = $this->spMantenimiento();
        if ($data['ok_error'] == 'ok') {
            $this->_sendMailExpedienteIngresado($data);
        }

        echo json_encode($data);
    }

    public function postNewPreconversion() {
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
        if ($this->_form->_flag == 1 && $data['ok_error'] == 'ok') {//se esta aprobando, enviar correos segun rol
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
        } elseif ($this->_form->_flag == 2 && $data['ok_error'] == 'ok') {//se esta rechazando, enviar correos segun rol
            switch ($this->_idRol) {
                case 5://el usuario que rechaza es de rol VERIFYGAS, enviar mail a taller
                    $this->_sendMailPreconversionRechazaVerifyGas($data);
                    break;
                case 7://el usuario que rechaza es de rol CALIDDA, enviar mail a taller y verifygas
                    $this->_sendMailPreconversionRechazaCalidda($data);
                    break;
            }
        }

        echo json_encode($data);
    }

    private function _sendMailPreconversionRechazaVerifyGas($data) {
        $body = file_get_contents('files' . DS . 'mails' . DS . 'mailPreconversionRechazadaVerifyGas.phtml');

        /* reemplazando titulos */
        $body = str_replace("{NOMBRES}", $data['propietario'], $body);
        $body = str_replace("{PLACA}", $data['placa'], $body);
        $body = str_replace("{MARCA}", $data['marca'], $body);
        $body = str_replace("{MODELO}", $data['modelo'], $body);
        $body = str_replace("{SERIE}", $data['serie'], $body);
        $body = str_replace("{TALLER}", $data['taller'], $body);

        Obj()->Libs->PHPMailer->setFrom('admin@admin.com', APP_COMPANY);
        Obj()->Libs->PHPMailer->Subject = 'Pre Conversion Rechazada';
        Obj()->Libs->PHPMailer->CharSet = 'UTF-8';
        //contenido del correo
        Obj()->Libs->PHPMailer->msgHTML($body, ROOT);
        Obj()->Libs->PHPMailer->AltBody = 'Se rechazo una pre conversión';

        /* realizando el envio a los correos del postulante */
        //correos y nombres de destinatario
        Obj()->Libs->PHPMailer->addAddress($data['mail_taller'], 'PRE CONVERSION RECHAZADA'); #taller
        Obj()->Libs->PHPMailer->addAddress(MAIL_DESARROLLADOR, 'PRE CONVERSION RECHAZADA');
        //enviando
        Obj()->Libs->PHPMailer->send();
    }

    private function _sendMailPreconversionRechazaCalidda($data) {
        $body = file_get_contents('files' . DS . 'mails' . DS . 'mailPreconversionRechazadaCalidda.phtml');

        /* reemplazando titulos */
        $body = str_replace("{NOMBRES}", $data['propietario'], $body);
        $body = str_replace("{PLACA}", $data['placa'], $body);
        $body = str_replace("{MARCA}", $data['marca'], $body);
        $body = str_replace("{MODELO}", $data['modelo'], $body);
        $body = str_replace("{SERIE}", $data['serie'], $body);
        $body = str_replace("{TALLER}", $data['taller'], $body);

        Obj()->Libs->PHPMailer->setFrom('admin@admin.com', APP_COMPANY);
        Obj()->Libs->PHPMailer->Subject = 'Pre Conversion Rechazada';
        Obj()->Libs->PHPMailer->CharSet = 'UTF-8';
        //contenido del correo
        Obj()->Libs->PHPMailer->msgHTML($body, ROOT);
        Obj()->Libs->PHPMailer->AltBody = 'Se rechazo una pre conversión';

        /* realizando el envio a los correos del postulante */
        //correos y nombres de destinatario
        Obj()->Libs->PHPMailer->addAddress($data['mail_taller'], 'PRE CONVERSION RECHAZADA'); #taller
        Obj()->Libs->PHPMailer->addAddress(MAIL_VERIFYGAS, 'PRE CONVERSION RECHAZADA');
        Obj()->Libs->PHPMailer->addAddress(MAIL_DESARROLLADOR, 'PRE CONVERSION RECHAZADA');
        //enviando
        Obj()->Libs->PHPMailer->send();
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

    public function getFormatoHojaUnica() {
        $row = $this->qFindPropietario();

        $DomPDF = new DOMPDF();

        $file = ROOT . "files" . DS . "temp" . DS . "TmpFHU.pdf";
        Obj()->Vendor->Tools->deleteFile($file);

        switch ($row['id_estado_civil']) {
            case 1:
                $dS = 'block';
                $dC = 'none';
                $dV = 'none';
                $dD = 'none';
                break;
            case 2:
                $dC = 'block';
                $dS = 'none';
                $dV = 'none';
                $dD = 'none';
                break;
            case 3:
                $dV = 'block';
                $dS = 'none';
                $dC = 'none';
                $dD = 'none';
                break;
            case 4:
                $dD = 'block';
                $dS = 'none';
                $dC = 'none';
                $dV = 'none';
                break;
        }

        $DomPDF->load_html('
        <style>
            input{
                border:1px solid #000;
                height:15px;                
            }
            textarea{
                border:1px solid #000;
            }
            .trg{
                background:#ddd;
            }
            table{
                font-size:12px;
            }
            .d_e{
                width:100%;
                height:25px;
                background:#000;
                position:absolute;
                opacity: 0.3;
            }
            @page { margin: 10px}
            body { margin: 10px  }
        </style>
        <table width="100%" border="0" cellspacing="0" cellpadding="2">
            <tr>
                <td>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="20%" rowspan="2">
                            <img src="' . ROOT . 'public' . DS . 'img' . DS . 'calidda.png' . '">
                        </td>
                        <td width="60%" rowspan="2" align="center">HOJA ÚNICA DE DATOS - NEGOCIO FINANCIAMIENTO MOVILIDAD</td>
                        <td width="20%">
                            N° Expediente<br />          
                            <input type="text" style="width:135px;" value="' . $row['nro_expediente'] . '"/>
                        </td>
                      </tr>
                      <tr>
                        <td width="20%">
                            N° Crédito<br />          
                            <input type="text" style="width:135px;"/>
                        </td>
                      </tr>
                    </table>
                </td>
            </tr>
        </table>
        <table width="100%" border="1" cellspacing="0" cellpadding="2" style="border-collapse:collapse;">
            <tr class="trg">
                <td><b>Datos del Usuario</b></td>
            </tr>
            <tr>
                <td>
                    <table style="width:100%;" border="0" cellspacing="0" cellpadding="2">
                        <tr>
                            <td style="140px;">
                                Nombres<br />          
                                <input type="text" style="width:130px;" value="' . $row['apellido_paterno'] . ' ' . $row['apellido_materno'] . '"/>
                            </td>
                            <td style="140px;">
                                Apellidos<br />          
                                <input type="text" style="width:130px;" value="' . $row['primer_nombre'] . ' ' . $row['segundo_nombre'] . '"/>
                            </td>
                            <td>
                                <table width="100%" border="0" cellspacing="0" cellpadding="2">
                                    <tr>
                                        <td>
                                            DNI/CE<br />          
                                            <input type="text" style="width:120px;" value="' . $row['documento_identidad'] . '"/>
                                        </td>
                                        <td>
                                            Ubigeo<br />          
                                            <input type="text" style="width:80px;"/>
                                        </td>
                                        <td>
                                            Fecha emisión DNI<br />          
                                            <input type="text" style="width:120px;"/>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Fecha de Nacimiento<br />          
                                <input type="text" style="width:130px;"/>
                            </td>
                            <td>
                                Estado Civil
                                <table style="width:100%;margin-top:3px" border="1" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
                                  <tr>
                                    <td style="width:25%;height:25px;" align="center"><div class="d_e" style="display:' . $dS . ';"></div>S</td>
                                    <td style="width:25%;" align="center"><div class="d_e" style="display:' . $dC . ';"></div>C</td>
                                    <td style="width:25%;" align="center"><div class="d_e" style="display:' . $dV . ';"></div>V</td>
                                    <td style="width:25%;" align="center"><div class="d_e" style="display:' . $dD . ';"></div>D</td>
                                  </tr>
                                </table>
                            </td>
                            <td>
                                País<br />          
                                <input type="text" style="width:100%;" value="' . $row['npais'] . '"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Telefono Fijo<br />          
                                <input type="text" style="width:130px;" value="' . $row['telefono_casa'] . '"/>
                            </td>
                            <td>
                                Telefono Movil<br />          
                                <input type="text" style="width:130px;" value="' . $row['celular'] . '"/>
                            </td>
                            <td>
                                Email<br />          
                                <input type="text" style="width:100%;" value="' . $row['email'] . '"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Nivel de Estudio
                                <table style="width:100%;margin-top:2px;border-collapse:collapse" border="1" cellspacing="0" cellpadding="0">
                                  <tr>
                                    <td style="width:20%;height:25px;">Primaria</td>
                                    <td style="width:20%;">Secundaria</td>
                                    <td style="width:60%;">Universidad en adelante</td>
                                  </tr>
                                </table>
                            </td>
                            <td>
                                Ocupación
                                <table width="100%" border="1" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-top:2px;">
                                  <tr>
                                    <td style="width:50%;height:25px;">Dependiente</td>
                                    <td style="width:50%;">Independiente</td>
                                  </tr>
                                </table>
                            </td>
                            <td>
                                <table width="100%" border="0" cellspacing="0" cellpadding="2">
                                    <tr>
                                        <td style="width:47%;">
                                            Antgüedad en el empleo / Actividad<br />          
                                            <input type="text" style="width:100%;"/>
                                        </td>
                                        <td style="width:53%;">
                                            Tipo de contrato (En caso sea dependiente)<br />          
                                            <input type="text" style="width:100%;"/>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>                    
                </td>
            </tr>
            <tr class="trg">
                <td><b>Dirección del usuario</b></td>
            </tr>
            <tr>
                <td>
                    <table width="100%" border="0" cellspacing="0" cellpadding="2">
                        <tr>
                            <td>
                                Tipo de Vía<br />          
                                <input type="text" style="width:80px;"/>
                            </td>
                            <td>
                                Dirección de Residencia<br />          
                                <input type="text" style="width:200px;"/>
                            </td>
                            <td>
                                N°<br />          
                                <input type="text" style="width:40px;"/>
                            </td>
                            <td>
                                MZ<br />          
                                <input type="text" style="width:40px;"/>
                            </td>
                            <td>
                                LT<br />          
                                <input type="text" style="width:40px;"/>
                            </td>
                            <td>
                                Edificio<br />          
                                <input type="text" style="width:80px;"/>
                            </td>
                            <td>
                                Piso<br />          
                                <input type="text" style="width:40px;"/>
                            </td>
                            <td>    
                                Dpto<br />          
                                <input type="text" style="width:40px;"/>
                            </td>
                            <td>
                                Int<br />          
                                <input type="text" style="width:40px;"/>
                            </td>
                        </tr>
                    </table>
                    <table width="100%" border="0" cellspacing="0" cellpadding="2">
                        <tr>
                            <td style="width:100px;">
                                Tipo de Vivienda<br />          
                                <input type="text" style="width:50px;" value="Alquilada"/>
                                <input type="text" style="width:40px;margin-left:-5px" value="Propia"/>
                            </td>
                            <td style="width:130px;">
                                Tiempo en la Vivienda<br />          
                                <input type="text" style="width:120px;"/>
                            </td>
                            <td style="width:300px;">
                                En caso ser alquilado, en cuánto tiempo se vence su contrato<br />          
                                <input type="text" style="width:100%;"/>
                            </td>
                            <td>
                                ¿Cuenta con gas natural en esta dirección?<br />          
                                <input type="text" style="width:100%;"/>
                            </td>
                        </tr>
                    </table>
                    <table width="100%" border="0" cellspacing="0" cellpadding="2">
                        <tr>
                            <td style="width:33%;">
                                Distrito<br />          
                                <input type="text" style="width:100%"/>
                            </td>
                            <td style="width:33%;">
                                Provincia<br />          
                                <input type="text" style="width:100%;"/>
                            </td>
                            <td style="width:33%;">
                                Departamento<br />          
                                <input type="text" style="width:100%;"/>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr class="trg">
                <td><b>Información del auto</b></td>
            </tr>
            <tr>
                <td>
                    <table width="100%" border="0" cellspacing="0" cellpadding="2">
                        <tr>
                            <td style="width:20%">
                                Marca<br />          
                                <input type="text" style="width:100%" value="' . $row['marca'] . '"/>
                            </td>
                            <td style="width:20%">
                                Modelo<br />          
                                <input type="text" style="width:100%;" value="' . $row['modelo'] . '"/>
                            </td>
                            <td style="width:20%">
                                Placa<br />          
                                <input type="text" style="width:100%;" value="' . $row['placa'] . '"/>
                            </td>
                            <td style="width:20%">
                                Año de Fabricación<br />          
                                <input type="text" style="width:100%;" value="' . $row['anio_fabricacion'] . '"/>
                            </td>
                            <td style="width:20%">
                                Cilindraje<br />          
                                <input type="text" style="width:100%;" value="' . $row['cilindrada'] . '"/>
                            </td>
                        </tr>
                    </table>
                    <table width="60%" border="0" cellspacing="0" cellpadding="2">
                        <tr>
                            <td style="width:50%">
                                Tipo de uso (Particular, público, otro)<br />          
                                <input type="text" style="width:100%"/>
                            </td>
                            <td style="width:50%">
                                Estado del vehículo (Nuevo/Usado)<br />          
                                <input type="text" style="width:100%;" />
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr class="trg">
                <td><b>Información adicional</b></td>
            </tr>
            <tr>
                <td>
                    <table width="40%" border="0" cellspacing="0" cellpadding="2">
                        <tr>
                            <td style="width:50%">
                                Ingresos mensuales promedio <br />          
                                <input type="text" style="width:100%"/>
                            </td>
                            <td style="width:50%">
                                N° de hijos<br />          
                                <input type="text" style="width:100%;" />
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr class="trg">
                <td><b>Contrato de Financiamiento (A rellenar por Cálidda)</b></td>
            </tr>
            <tr>
                <td>
                    <table width="100%" border="0" cellspacing="0" cellpadding="2">
                        <tr>
                            <td style="width:15%">
                                Monto a Financiar      
                            </td>
                            <td style="width:16%">
                                <input type="text" style="width:80%;" />
                            </td>
                            <td style="width:22%">
                                Cuota Inicial       
                            </td>
                            <td style="width:16%">
                                <input type="text" style="width:100%"/>
                            </td>
                            <td style="width:11%">
                                N° de Cuotas
                            </td>
                            <td style="width:16%">
                                <input type="text" style="width:100%;" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Tasa de Interés      
                            </td>
                            <td>
                                <input type="text" style="width:80%;" />%
                            </td>
                            <td>
                                Porcentaje de Recaudo inicial      
                            </td>
                            <td>
                                <input type="text" style="width:100%"/>
                            </td>
                            <td>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Observación   
                            </td>
                            <td colspan="5">
                                <textarea style="width:100%;" rows="4"></textarea>
                            </td>
                        </tr>
                    </table>
                    <br><br>
                    <table width="98%" border="0" cellspacing="0" cellpadding="2" align="center">
                        <tr>
                            <td style="width:25%;text-align:center;">
                                ________________________________   
                            </td>
                            <td style="width:20%;">
                            </td>
                            <td style="width:25%;text-align:center;">
                                ________________________________
                            </td>
                            <td style="width:30%;text-align:right">
                                Lima, ' . Obj()->Vendor->Tools->dateSpanish() . '   
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">
                                Firma del Usuario
                                <div >' . $row['nombre_completo'] . '<div>
                                ' . $row['tipo_doc'] . ': ' . $row['documento_identidad'] . '
                            </td>
                            <td>
                            </td>
                            <td style="text-align:center;">
                                Firma del Cónyuge
                                <div style="margin-left:-150px">Nombre:<div>
                                <div style="margin-left:-20px">DNI:<div>
                            </td>
                            <td>
                                     
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4"><br>
                                * El porcentaje de recaudo varía de acuerdo al valor a financiar, a la tasa de interés, al valor de la cuota inicial y al número de cuotas.
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>');

        $DomPDF->render();
        $pdf = $DomPDF->output();
        file_put_contents($file, $pdf);

        if (is_readable($file)) {
            echo json_encode(['result' => 1]);
        } else {
            echo json_encode(['result' => 2]);
        }
    }

    public function getFormatoSolicitudCobranza() {
        $row = $this->qFindPropietario();

        $DomPDF = new DOMPDF();

        $file = ROOT . "files" . DS . "temp" . DS . "TmpFSOLCOB.pdf";
        Obj()->Vendor->Tools->deleteFile($file);

        $DomPDF->load_html('
        <style>
            table{
                font-size: 12px
            }
        </style>
        <div style="text-align:right">N° Exp.: ' . $row['nro_expediente'] . '</div>
        <h4 style="text-align:center;text-decoration: underline">FORMATO DE SOLICITUD DE COBRANZA</h4>
        <table border="0" style="border-collapse:collapse;width:100%;">
            <tbody>
                <tr>
                    <td>Lima, ' . Obj()->Vendor->Tools->dateSpanish() . '</td>
                </tr>
                <tr>
                    <td><br>Señores:</td>
                </tr>
                <tr>
                    <td>GAZEL PERU S.A.C.</td>
                </tr>
                <tr>
                    <td>Av. Jorge Basadre 350</td>
                </tr>
                <tr>
                    <td>San Isidro, Lima</td>
                </tr>
                <tr>
                    <td>Presente:</td>
                </tr>
                <tr>
                    <td><br>Asunto:	<span style="margin-left:170px">Solicitud de Cobranza y autorización de Cliente</span></td>
                </tr>
                <tr>
                    <td><br>De nuestra mayor consideración:</td>
                </tr>
                <tr>
                    <td style="text-align: justify"><br>
                        Por medio de la presente reciban ustedes un muy cordial saludo y al mismo tiempo, en atención a lo contemplado en el Contrato de Prestación de Servicio de Administración de Recaudos y Compromiso de Consumo, suscrito entre GAZEL y CÁLIDDA y también de acuerdo a lo señalado en el Convenio de Financiamiento y sus Adendas, suscrito entre CÁLIDDA y el cliente que suscribe al final de la presente; les solicitamos formalmente proceder con el servicio de recaudo para cubrir parte del pago de las cuotas del financiamiento en relación al vehículo cuyos datos y condiciones se detallan a continuación:
                    </td>
                </tr>
                <tr>
                    <td><br><b>Plantilla de Ingreso a COFIDE</b></td>
                </tr>
                <tr>
                    <td><br>
                        <table border="1" style="border-collapse:collapse;width:95%;" align="center">
                            <thead>
                                <tr bgcolor="#2EFE2E">
                                    <th style="text-align:center;width:1%">Nro.</th>
                                    <th style="text-align:center;width:30%">Nombre</th>
                                    <th style="text-align:center">N° Documento</th>
                                    <th style="text-align:center">Tipo Vehículo</th>
                                    <th style="text-align:center;width:10%">Placa</th>
                                    <th style="text-align:center"> % de Recaudo</th>
                                    <th style="text-align:center">Cuota inicial</th>
                                    <th style="text-align:center">Cuota mensual por unidad</th>
                                    <th style="text-align:center">Tipo de Operación</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>' . $row['nombre_completo'] . '</td>
                                    <td>' . $row['documento_identidad'] . '</td>
                                    <td></td>
                                    <td>' . $row['placa'] . '</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td><br>Sin otro particular, quedamos de ustedes.</td>
                </tr>
                <tr>
                    <td><br>Atentamente,</td>
                </tr>
                <tr>
                    <td><br><br><br><br>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td width="44%"><b>CÁLIDDA</b></td>
                              <td colspan="2"><b>CLIENTE</b></td>
                            </tr>
                            <tr>
                              <td></td>
                              <td width="14%">NOMBRE:</td>
                              <td width="42%">' . $row['nombre_completo'] . '</td>
                            </tr>
                            <tr>
                              <td rowspan="7">&nbsp;</td>
                              <td>' . $row['tipo_doc'] . ':</td>
                              <td>' . $row['documento_identidad'] . '</td>
                            </tr>
                            <tr>
                              <td>DOMICILIO:</td>
                              <td>' . $row['direccion_domicilio'] . '</td>
                            </tr>
                            <tr>
                              <td colspan="2">&nbsp;</td>
                            </tr>
                            <tr>
                              <td colspan="2"><b>CONYUGE DEL CLIENTE</b></td>
                            </tr>
                            <tr>
                              <td colspan="2">NOMBRE:</td>
                            </tr>
                            <tr>
                              <td colspan="2">DNI:</td>
                            </tr>
                            <tr>
                              <td colspan="2">DOMICILIO:</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
        ');

        $DomPDF->render();
        $pdf = $DomPDF->output();
        file_put_contents($file, $pdf);

        if (is_readable($file)) {
            echo json_encode(['result' => 1]);
        } else {
            echo json_encode(['result' => 2]);
        }
    }

    public function getFormatoContrato() {
        $row = $this->qFindPropietario();

        $DomPDF = new DOMPDF();

        $file = ROOT . "files" . DS . "temp" . DS . "TmpFCONT.pdf";
        Obj()->Vendor->Tools->deleteFile($file);

        $DomPDF->load_html('
        <html>
        <head>
          <style>
            @page { margin: 70px 80px 20px 80px; }
            header { position: fixed; top: -20px; left: 0px; right: 0px; height: 50px; }
            footer { position: fixed; bottom: -60px; left: 0px; right: 0px;  height: 50px; }
            /*p { page-break-after: always; }*/
            /*p:last-child { page-break-after: never; }*/
            
          </style>
        </head>
        <body>
          <header>
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:-25px">
                <tr>
                    <td rowspan="4" style="width:80%;"><img src="' . ROOT . 'public' . DS . 'img' . DS . 'calidda.png' . '"></td>                    
                </tr>
                <tr>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                </tr>
            </table>
          </header>
          <footer></footer>
          <main>
            <style>
                table{
                    font-size: 12px
                }
            </style>
            <h4 style="text-align:center;text-decoration: underline">CONTRATO DE FINANCIAMIENTO DE CONVERSIÓN VEHICULAR A GNV</h4>
            <table border="0" style="border-collapse:collapse;width:100%;">
                <tbody>
                    <tr>
                        <td style="text-align: justify">
                            Conste por el presente documento el Contrato de Financiamiento de Conversión Vehicular a GNV 
                            ("el Contrato") que celebran Gas Natural de Lima y Callao S.A. (en adelante <b>"CÁLIDDA"</b>), 
                            identificada con RUC No. 20503758114, con domicilio en Calle Morelli N° 150, Centro Comercial 
                            La Rambla, Torre Dos, distrito de San Borja, inscrita en la Partida Electrónica No. 11352499 del 
                            Registro de Personas Jurídicas de Lima, y de la otra parte el <b>"EL CLIENTE"</b>, quienes de manera 
                            conjunta serán denominados como las "Partes" y cuyos representantes y sus firmas se encuentran 
                            identificados en la Hoja Única de Datos del que forma parte del presente documento; en los 
                            términos y condiciones siguientes:
                        </td>
                    </tr>
                    <tr>
                        <td><br><b>CLÁUSULA PRIMERA: <span style="margin-left:50px">ANTECEDENTES</span></b></td>
                    </tr>
                    <tr>
                        <td style="text-align: justify"><br>
                            <b>1.1 CÁLIDDA</b> ha desarrollado un programa de financiamiento para la conversión de vehículos 
                            al Sistema de Abastecimiento de GNV en el departamento de Lima y la Provincia Constitucional del 
                            Callao. Las conversiones realizadas en el marco del citado programa son realizadas a través de 
                            Talleres Autorizados y afiliados por <b>CÁLIDDA</b>. 
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: justify"><br>
                            <b>1.2</b> Considerando que GAZEL PERU S.A.C. (en adelante, <b>"GAZEL"</b>) ha suscrito con <b>COFIDE</b> un Convenio de 
                            Cobranza de los Subpréstamos Cofigas-Conversión y/o Adquisición Vehicular y que como consecuencia 
                            de ello se encuentra inscrita en el Sistema de Control de Carga de GNV, con fecha 06 de Junio del 2018 
                            <b>CÁLIDDA</b> suscribió con <b>GAZEL</b> un Convenio de Recaudación por medio del cual <b>GAZEL</b> presta a favor de 
                            <b>CÁLIDDA</b> el servicio de recaudación de las cuotas de pago por concepto del financiamiento de 
                            conversión vehicular bajo el esquema de recaudación INFOGAS del <b>COFIDE,</b>  en cada oportunidad 
                            que <b>EL CLIENTE</b> consume Gas Natural Vehicular (GNV) en una Estación de Servicio de GNV. 
                        </td>
                    </tr>
                    <tr>
                        <td><br><b>CLÁUSULA SEGUNDA: <span style="margin-left:50px">OBJETO</span></b></td>
                    </tr>
                    <tr>
                        <td style="text-align: justify"><br>
                            <b>2.1</b> Por medio del presente Contrato, <b>CÁLIDDA</b> acepta financiar a <b>EL CLIENTE</b> los conceptos y 
                            montos que se indican en la Hoja Única de Datos, la misma que forma parte del presente 
                            Contrato, según lo solicitado por <b>EL CLIENTE</b> a <b>CÁLIDDA.</b>
                            <br><br>
                            <b>2.2</b> Para tal efecto, <b>EL CLIENTE</b> acepta que <b>CÁLIDDA</b> evaluará previamente su perfil crediticio, 
                            comunicando oportunamente el resultado de su evaluación a <b>EL CLIENTE</b> en un plazo máximo de 7 días 
                            posteriores a su solicitud. En caso de no aprobar la evaluación crediticia efectuada por <b>CÁLIDDA,</b> 
                            el presente Contrato se entenderá resuelto de manera automática sin más trámite que la 
                            comunicación antes indicada.
                            <br><br>
                            <b>2.3</b> Se procederá a financiar a <b>EL CLIENTE</b> hasta por el límite de la línea de crédito aprobado por <b>CÁLIDDA,</b> 
                            considerando que dicho crédito será utilizado exclusivamente por <b>EL CLIENTE</b> para la conversión a GNV de 
                            su vehículo, que actualmente emplea combustibles derivados del petróleo. Es así que, <b>CÁLIDDA</b> pagará 
                            directamente al Taller Autorizado, el importe correspondiente a la conversión realizada.
                            <br><br>
                            Cabe precisar que, una vez efectuada la cancelación del crédito <b>El CLIENTE</b> podrá solicitar a <b>CÁLIDDA</b> el 
                            financiamiento de cualquiera de los productos y/o servicios contemplados en la Hoja Única de Datos.
                        </td>
                    </tr>
                    <tr>
                        <td><br><b>CLÁUSULA TERCERA: <span style="margin-left:50px">MONTO DEL CONTRATO, INTERESES Y COMISIONES</span></b>
                            <br><br>
                            <div style="text-align: justify">
                            <b>3.1</b> Considerando los conceptos a ser financiados por <b>CÁLIDDA</b>, el monto a ser cobrado al <b>CLIENTE</b> será financiado en la 
                            cantidad de cuotas mensuales iguales elegidas por el <b>CLIENTE</b> y consignadas en la Hoja Única de Datos, las mismas que 
                            sumadas al interés compensatorio pactado, los tributos que la obligación genera, así como al interés moratorio, y gastos 
                            según corresponda, conformará la cuota mensual a ser cancelada oportunamente por <b>EL CLIENTE.</b>
                            <br><br>
                            <b>3.2</b> De conformidad con lo establecido en el artículo 1243° del Código Civil, en caso el interés compensatorio 
                            establecido en la Hoja Única de Datos exceda el límite permitido por la ley, éste será el equivalente al límite máximo 
                            permitido por ley, procediendo a efectuarse el recalculo de la cuota mensual y el cronograma de pagos correspondiente.
                            <br><br>
                            <b>3.3</b> El interés moratorio por su parte se aplicará de manera automática a partir del vencimiento de las 
                            obligaciones asumidas por <b>EL CLIENTE</b> en virtud del presente Contrato.
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: justify">
                            <br><br>
                            <b>3.4</b> El pago de la cuota mensual se imputará en primer lugar a los intereses, luego a los gastos y/o comisiones y 
                            finalmente al capital.
                            <br><br>
                            <b>3.5</b> El <b>CLIENTE</b> se obliga a cancelar las cuotas mensuales mediante sus consumos de Gas Natural Vehicular (GNV) a los que se le 
                            aplicará el porcentaje de recaudación establecido en la Hoja Única de Datos, en cada oportunidad que el <b>CLIENTE</b> acuda a un 
                            establecimiento autorizado de venta al público de GNV, bajo el procedimiento preestablecido para el Sistema de Control de Carga 
                            de GNV, del cual <b>EL CLIENTE</b> declara haber tomado conocimiento. En ese último caso, los importes cobrados se computarán como 
                            efectuados y por ende con efecto cancelatorio, una vez que el Administrador del Sistema de Control de Carga GNV, deposite el 
                            importe correspondiente en la cuenta de <b>GAZEL</b> y éste lo traslade a la cuenta de <b>CÁLIDDA</b>. Sin perjuicio de ello, no se le cobrará 
                            interés moratorio o penalidad al <b>CLIENTE</b>, si se verifica que los importes fueron pagados dentro de lo establecido en su cronograma 
                            de pagos.
                            <br><br>
                            <b>3.6</b> Alternativamente <b>EL CLIENTE</b> podrá cancelar las cuotas mensuales mediante pagos directos en cualquiera de las oficinas 
                            de atención al público de <b>CÁLIDDA</b>.
                            <br><br>
                            <b>3.7</b> Cabe precisar que no se determinará como adelanto de cuota en el caso que <b>EL CLIENTE</b> efectúe consumos superiores al 
                            monto total de su cuota mensual, señalada en el presente Contrato. 
                            <br><br>
                            <b>3.8</b> En caso <b>EL CLIENTE</b> no efectúe el pago total de la cuota mensual en más de dos (02) oportunidades consecutivas, 
                            <b>CÁLIDDA</b> procederá a realizar el aumento del porcentaje de recaudación establecido en la Hoja Única de Datos, a efectos 
                            de cubrir la cuota mensual establecida en el presente Contrato.
                            <br><br>
                            <b>3.9</b> Si luego de terminado el pago del financiamiento <b>EL CLIENTE</b> mantuviera un saldo a favor como consecuencia de un 
                            recálculo, <b>CÁLIDDA</b> se comunicará con <b>EL CLIENTE</b> a efectos de la devolución del citado saldo sin intereses, en un 
                            plazo máximo de 10 días hábiles, contados desde la culminación del presente Contrato.
                        </td>
                    </tr>
                    <tr>
                        <td><br><b>CLÁUSULA CUARTA: <span style="margin-left:50px">PLAZO</span></b></td>
                    </tr>
                    <tr>
                        <td style="text-align: justify"><br>
                            <b>4.1</b> El plazo del Contrato se encuentra consignado en la Hoja Única de Datos y es contado a partir de la fecha de 
                            su suscripción. El plazo del Contrato guarda estricta coincidencia con el número de Cuotas Mensuales en las cuales se 
                            encuentra dividido el Monto Financiado.
                            <br><br>
                            <b>4.2</b> En el supuesto que <b>EL CLIENTE</b> no hubiere cumplido con efectuar el pago oportuno de cualquier cuota mensual y que, 
                            como consecuencia de ello se mantenga cuotas, intereses o cualquier otro monto adeudado, el Contrato se entenderá 
                            prorrogado y, por tanto vigente hasta que todas las cuotas, intereses y montos adeudados sean cancelados, salvo que 
                            <b>CÁLIDDA</b> opte por resolver el Contrato, de conformidad con lo dispuesto en el numeral 5.3 de la Cláusula Quinta del 
                            presente Contrato. 
                        </td>
                    </tr>
                    <tr>
                        <td><br><b>CLÁUSULA QUINTA: <span style="margin-left:50px">CONDICIONES DEL FINANCIAMIENTO</span></b></td>
                    </tr>
                    <tr>
                        <td style="text-align: justify"><br>
                            <b>5.1 EL CLIENTE</b> deberá efectuar la conversión de su vehículo únicamente en los Talleres Autorizados y afiliados por <b>CÁLIDDA.</b>
                            <br><br>
                            <b>5.2 EL CLIENTE</b> podrá pagar por adelantado, total o parcialmente, el monto financiado en las Oficinas de Atención al 
                            Cliente de <b>CÁLIDDA</b>, en cuyo caso se liquidarán al día de pago los respectivos intereses compensatorios y, de ser el caso, 
                            los gastos en que haya incurrido <b>CÁLIDDA</b> a la fecha de pago. El pago adelantado parcial podrá manejarse de la siguiente 
                            manera: 
                            <br><br>
                            <ol style="list-style-type: lower-roman">
                                <li>
                                    Pago Anticipado: Es el pago mayor a 02 cuotas (incluyendo aquella exigible en el periodo) pero menor al total que se aplica 
                                    directamente al capital del crédito, para que se reduzcan los intereses, comisiones y gastos derivados al día del pago.
                                    <br><br>
                                    En estos casos, <b>CÁLIDDA</b> deberá requerir a <b>EL CLIENTE</b>, al momento de realizar el pago, que señale si debe procederse a) A la reducción del 
                                    monto de las cuotas restantes pero manteniendo el plazo original o b) A la reducción del número de cuotas con la consecuente reducción del 
                                    plazo del crédito. <b>CÁLIDDA</b> otorgará una constancia que permita acreditar la elección realizada y los cronogramas de pago modificados, en un 
                                    plazo no mayor a siete (07) días de efectuada dicha solicitud.
                                </li>
                                <li>
                                    Adelanto de cuota: Es el pago que aplica a la cuota posterior a la exigible en el periodo de facturación, sin que se 
                                    produzca una reducción de los intereses, comisiones y gastos derivados. En este caso, <b>CÁLIDDA</b> deberá requerir y mantener 
                                    una constancia de dicha decisión.
                                </li>
                            </ol>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: justify"><br>
                            <b>EL CLIENTE</b> podrá efectuar los pagos señalados en la presente cláusula en cualquiera de las oficinas de atención al cliente 
                            de CÁLIDDA, sin que ello implique pago alguno por concepto de penalidad, gasto o comisión y sin establecer condiciones o 
                            limitaciones para el ejercicio del derecho.
                            5.3 La falta de pago de cualquiera de dos (02) o más cuotas, sin necesidad que sean consecutivas, dará derecho a que 
                            <b>CÁLIDDA</b> acelere el pago de la deuda declarando vencida el íntegro de las cuotas futuras sin necesidad de notificación previa. 
                            En tal supuesto, <b>CÁLIDDA</b> tendrá derecho a reclamar toda la suma de dinero que estuviese pendiente de pago más los intereses 
                            compensatorios y moratorios que se hubieren devengado hasta la fecha efectiva de pago de dicho monto, los tributos y gastos 
                            asociados. Cabe señalar que se entenderá por incumplido el pago si se realiza un pago parcial de la cuota correspondiente o 
                            no se alcanza la cuota mensual a través del consumo de Gas Natural Vehicular (GNV) en cada oportunidad que <b>EL CLIENTE</b> acuda 
                            al establecimiento autorizado de venta al público de GNV.
                            <br><br>
                            <b>5.4 EL CLIENTE</b> reconoce que <b>CÁLIDDA</b> no se hará responsable en ningún caso por la idoneidad de la conversión vehicular 
                            ejecutada en su vehículo ni por el rendimiento del mismo, por lo que <b>EL CLIENTE</b> deberá realizar cualquier reclamo 
                            vinculado con la conversión vehicular, así como la aplicación de la garantía correspondiente, directamente al Taller 
                            donde ejecutó la citada conversión.
                            <br><br>
                            <b>5.5</b> Cada vez que <b>EL CLIENTE</b> efectúe el pago total de su cuota mensual (según el cronograma de pagos), y CÁLIDDA 
                            verifique el traslado del monto en su cuenta procederá en un plazo de 5 días hábiles a remitir a <b>EL CLIENTE</b> el 
                            comprobante de pago electrónico, al correo electrónico que se hubiere consignado en la Hoja Única de Datos del 
                            presente Contrato. Sin perjuicio de ello, <b>EL CLIENTE</b> podrá en cualquier momento solicitar a <b>CÁLIDDA</b> el estado de 
                            cuenta (cronograma de pagos) de la deuda actualizada que mantenga con <b>CÁLIDDA.</b> 

                        </td>
                    </tr>
                    <tr>
                        <td><br><b>CLÁUSULA SEXTA: <span style="margin-left:50px">OBLIGACIONES DEL CLIENTE</span></b></td>
                    </tr>
                    <tr>
                        <td style="text-align: justify"><br>
                            Sin perjuicio de las obligaciones que asume en las demás cláusulas de este Contrato, <b>EL CLIENTE</b> se compromete a:
                            
                            <ol style="list-style-type: lower-latin">
                                <li>
                                    Pagar las multas por Infracciones al Reglamento de Tránsito de manera inmediata, evitando así la captura del 
                                    vehículo y, en consecuencia, la imposibilidad de seguir circulando con el mismo. En caso, el vehículo sea 
                                    retenido por la autoridad correspondiente y no pueda estar en circulación por un período mayor o igual a 30 días 
                                    calendario, <b>CÁLIDDA</b> tendrá derecho a acelerar el vencimiento de las cuotas pendientes de pago y a requerir la 
                                    cancelación total del financiamiento otorgado mediante el presente Contrato, incluyendo intereses y gastos que 
                                    se podrían haber generado en dicho momento o producto de la mencionada aceleración de cuotas.
                                </li>
                                <li>
                                    No alterar, modificar o transformar el vehículo y, en especial, el equipo de conversión al sistema de carga de GNV. 
                                    Toda manipulación de equipos deberá ser exclusivamente realizada por personal del Taller Autorizado por <b>CÁLIDDA.</b>
                                </li>
                                <li>
                                    Realizar a su cuenta y costo el mantenimiento oportuno del vehículo y del equipo de conversión, así como obtener 
                                    la certificación anual obligatoria de la conversión al sistema de carga de GNV, en un Taller Autorizado por <b>CÁLIDDA,</b> 
                                    dentro del plazo señalado por ley.
                                </li>
                                <li>
                                    Mantener vigente toda la documentación necesaria para que el vehículo pueda circular.
                                </li>
                                <li>
                                    Comunicar oportunamente a <b>CÁLIDDA</b> la ocurrencia de cualquier desperfecto, choque, o robo o hecho que impida que el vehículo 
                                    siga consumiendo GNV y, en general, acerca de cualquier hecho que pudiera afectar el cumplimiento de las obligaciones 
                                    establecidas en el presente Contrato.
                                </li>
                                <li>
                                    Cancelar el monto financiado a través del recaudo o el pago directo de las cuotas mensuales establecido en este Contrato.
                                </li>
                            </ol>
                        </td>
                    </tr>
                    <tr>
                        <td><br><b>CLÁUSULA SÉPTIMA: <span style="margin-left:50px">CENTRALES DE RIESGOS</span></b></td>
                    </tr>
                    <tr>
                        <td style="text-align: justify"><br>
                            En el supuesto que <b>EL CLIENTE</b> mantenga montos pendientes de pago a favor de <b>CÁLIDDA,</b> éste autoriza a <b>CÁLIDDA</b> a 
                            reportarlo como deudor en las Centrales de Riesgos existentes en virtud de lo dispuesto en la Ley N° 27489 (Ley de Centrales de Riesgos).
                        </td>
                    </tr>
                    <tr>
                        <td><br><b>CLÁUSULA OCTAVA: <span style="margin-left:50px">CESIÓN DEL CONTRATO</span></b></td>
                    </tr>
                    <tr>
                        <td style="text-align: justify"><br>
                            <b>CÁLIDDA</b> y <b>EL CLIENTE</b> prestan su consentimiento expreso para que <b>CÁLIDDA</b> pueda ceder su posición contractual o los 
                            derechos que se deriven del presente Contrato a favor de un tercero, en la oportunidad que <b>CÁLIDDA</b> lo determine. 
                            Para dicho efecto, <b>EL CLIENTE</b> declara anticipadamente su aceptación y consentimiento para la celebración de cualquier 
                            acuerdo de cesión. 
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: justify"><br>
                            De producirse la cesión mencionada en el párrafo anterior, <b>CÁLIDDA</b> deberá informar por escrito la celebración de la misma a <b>EL CLIENTE.</b> 
                        </td>
                    </tr>
                    <tr>
                        <td><br><br><br><br><br><br><br><b></td>
                    </tr>
                    <tr>
                        <td><br><b>CLÁUSULA NOVENA: <span style="margin-left:50px">RESOLUCIÓN DEL CONTRATO</span></b></td>
                    </tr>
                    <tr>
                        <td style="text-align: justify"><br>
                            <b>9.1 CÁLIDDA</b> podrá considerar vencido todos los plazos y proceder al cobro del íntegro de lo adeudado en los siguientes casos:
                            
                            <ol style="list-style-type: lower-latin">
                                <li>
                                    Si <b>EL CLIENTE</b> incumpliera con el pago de dos (02) o más cuotas (consecutivas o no) totales o parciales del 
                                    crédito otorgado en el plazo establecido.
                                </li>
                                <li>
                                    Si <b>EL CLIENTE</b> incumpliera cualquiera de sus obligaciones establecidas en el presente Contrato y no las subsana 
                                    en el término otorgado por <b>CÁLIDDA.</b>
                                </li>
                                <li>
                                    Si <b>EL CLIENTE</b> proporciona información falsa.
                                </li>
                                <li>
                                    Si <b>EL CLIENTE</b> destina el monto del crédito a una finalidad distinta a la pactada.
                                </li>
                                <li>
                                    Si <b>EL CLIENTE</b> incumple con las normas establecidas por el Ministerio de Transporte y Comunicaciones en lo 
                                    concerniente al Sistema de Control de Carga GNV.
                                </li>
                                <li>
                                    Si <b>EL CLIENTE</b> es sometido a procedimiento concursal.
                                </li>
                                <li>
                                    Si <b>EL CLIENTE</b> asume nuevas deudas o compromisos bajo cualquier contrato o acuerdo ante cualquier entidad 
                                    financiera o persona natural o jurídica, incrementando su exposición crediticia (debiendo ésta ser demostrada 
                                    fehacientemente).
                                </li>
                                <li>
                                    Si <b>EL CLIENTE</b> o un tercero obstaculizan, por acción u omisión, las constataciones y/o inspecciones de <b>CÁLIDDA</b> 
                                    para el cumplimiento del presente contrato.
                                </li>
                                <li>
                                    Si <b>EL CLIENTE</b> incurriese en cualquiera de las malas prácticas contempladas en el Procedimiento Operativo INFOGAS:
                                    <br><br>
                                    <ul style="list-style-type: disc">
                                        <li>
                                            Uso indebido del Dispositivo Electrónico instalado en su vehículo, que se produce cuando el dispositivo 
                                            electrónico instalado en el vehículo es utilizado para realizar cargas de GNV en otros vehículos.
                                        </li>
                                        <li>
                                            Compra de GNV utilizando un chip no asignado a su vehículo, que se produce cuando un vehículo utiliza 
                                            otro dispositivo electrónico para realizar cargas de GNV en su vehículo.
                                        </li>
                                        <li>
                                            Desmonte y/o manipulación o cambios de kits en talleres de conversión no autorizados y/o sin autorización 
                                            del Administrador, que tiene carácter de falta grave por atentar contra la seguridad que el sistema 
                                            garantiza a todos los usuarios.
                                        </li>
                                    </ul>
                                </li>
                            </ol>
                            <b>9.2</b> En cualquiera de los supuestos indicados <b>CÁLIDDA</b> deberá informar a <b>EL CLIENTE</b> mediante una comunicación escrita, 
                            con 15 días de anterioridad de la resolución de Contrato. Notificado <b>EL CLIENTE</b> con la decisión de <b>CÁLIDDA</b> de dar por 
                            resuelto el Contrato, por cualquiera de las causales detalladas en la presente Cláusula, <b>EL CLIENTE</b> deberá cancelar a 
                            <b>CÁLIDDA</b>, en un plazo máximo de siete (05) días calendario, toda suma que adeude como consecuencia del financiamiento 
                            otorgado a través del presente Contrato, así como los intereses compensatorios y moratorios generados hasta la resolución 
                            del Contrato. 
                        </td>
                    </tr>
                    <tr>
                        <td><br><b>CLÁUSULA DÉCIMA: <span style="margin-left:50px">DATOS PERSONALES DEL CLIENTE</span></b></td>
                    </tr>
                    <tr>
                        <td style="text-align: justify"><br>
                            10.1 De conformidad con la Ley N° 29733, Ley de Protección de Datos Personales y su Reglamento aprobado mediante Decreto 
                            Supremo N° 003-2013-JUS, <b>EL CLIENTE</b> da expresamente su consentimiento para el tratamiento de los datos personales que sean 
                            obtenidos a través de la información proporcionada a <b>CÁLIDDA.</b> Los datos personales serán incorporados al Banco de Datos de 
                            Clientes que se encuentra debidamente registrado ante la Dirección Nacional de Protección de Datos Personales.
                            <br><br>
                            <b>10.2</b> Los datos proporcionados por <b>EL CLIENTE</b> serán utilizados en la gestión administrativa y comercial de la petición del 
                            firmante, lo que incluye el acceso a los reportes de consumo que puedan ser registrados en el Sistema de Control de Carga 
                            de GNV. Para ello, <b>EL CLIENTE</b> autoriza expresamente la utilización a los fines referidos en actividades que ejecuta 
                            <b>CÁLIDDA</b> conjuntamente con GAZEL en su calidad de agente recaudador, según lo establecido en el presente Contrato.
                            <br><br>
                            <b>10.3 EL CLIENTE</b> expresa su consentimiento en caso sea necesario se realice la transferencia de los datos personales 
                            a terceros, en los términos y condiciones anteriormente indicados y a efectos de cumplir con todas las obligaciones pactadas 
                            en el presente Contrato.
                            <br><br>
                            <b>10.4 EL CLIENTE</b> garantiza la exactitud, veracidad y autenticidad de los datos personales ingresados comprometiéndose a 
                            mantenerlos en vigencia. La falsedad de los datos personales es causal de resolución del presente Contrato celebrado con 
                            <b>EL CLIENTE</b>, de acuerdo a lo señalado en la Cláusula Novena del Contrato. Asimismo, <b>CÁLIDDA</b> queda facultada 
                            a utilizar la información de sus datos personales cuando así sea requerido por las autoridades administrativas competente 
                            o por mandato judicial.
                        </td>
                    </tr>
                    <tr>
                        <td><br><br><br><br><br><br><br><br><br><br><br><br><br></td>
                    </tr>
                    <tr>
                        <td><br><b>CLÁUSULA DÉCIMO PRIMERA: <span style="margin-left:50px">APAGADO REMOTO DE VEHÍCULO</span></b></td>
                    </tr>
                    <tr>
                        <td style="text-align: justify"><br>
                            <b>11.1 EL CLIENTE</b> autoriza y faculta a <b>CÁLIDDA</b> a efectuar el apagado remoto del vehículo (bloqueo del dispositivo electrónico) 
                            por intermedio de GAZEL, cuando mantenga deuda vencida y exigible por más de 02 cuotas, de conformidad con su cronograma de 
                            pagos, o ejecute alguna manipulación indebida al Dispositivo Electrónico instalado en el vehículo.
                            <br><br>
                            <b>11.2 CÁLIDDA</b> o quien éste designe desbloqueará el vehículo en cualquiera de los siguientes supuestos:
                            
                            <ol style="list-style-type: lower-latin">
                                <li>
                                    Al cumplimiento de pago de la deuda pendiente.
                                </li>
                                <li>
                                    Si <b>EL CLIENTE</b> acude a las oficinas de <b>CÁLIDDA</b> y opta por alguna herramienta de refinanciamiento de su deuda 
                                    que le ofrecerá <b>CÁLIDDA</b> para poder regularizar su situación deudora, lo cual deberá constar en un documento 
                                    debidamente firmado por <b>EL CLIENTE</b> y <b>CÁLIDDA.</b>
                                </li>
                                <li>
                                    Cuando <b>EL CLIENTE</b> acredite la corrección del acto indebido detectado por <b>CÁLIDDA.</b>
                                </li>
                            </ol>
                            <b>11.3 CÁLIDDA</b> desbloqueará el vehículo en un plazo máximo de tres (03) días hábiles desde la regularización de 
                            cualquiera de los 03 supuestos antes mencionados. Lo señalado no aplicará en caso se produzca eventos de fuerza 
                            mayor o caso fortuito, que no permitan a <b>CÁLIDDA</b> ejecutar el desbloqueo antes mencionado.
                        </td>
                    </tr>
                    <tr>
                        <td><br><b>CLÁUSULA DÉCIMO SEGUNDA: <span style="margin-left:50px">SOLUCIÓN DE CONTROVERSIAS</span></b></td>
                    </tr>
                    <tr>
                        <td style="text-align: justify"><br>
                            <b>12.1</b> Cualquier controversia, conflicto o diferencia (cada cual una “Controversia”) entre las Partes en relación con el Contrato, su validez, eficacia, interpretación o ejecución, será resuelta mediante trato directo dentro de un plazo de quince (20) días hábiles, contados a partir de la fecha en que una parte notifique a la otra por escrito la existencia de una Controversia.
                            <br><br>
                            <b>12.2</b> En el caso que vencido dicho plazo, según pueda ser prorrogado por las Partes mediante acuerdo escrito, subsista algún conflicto o controversia que fuera sometido a dicho trato directo, las Partes los resolverán en los tribunales del Distrito Judicial de Lima.
                        </td>
                    </tr>
                    <tr>
                        <td><br><b>CLÁUSULA DÉCIMO TERCERA: <span style="margin-left:50px">CONFIDENCIALIDAD </span></b></td>
                    </tr>
                    <tr>
                        <td style="text-align: justify"><br>
                            <b>13.1 EL CLIENTE</b> no deberá utilizar para ningún propósito distinto a la ejecución del Contrato, ni divulgar, producir, 
                            publicar o permitir el acceso a la información que obtenga durante la o con motivo de la ejecución del Contrato, sin contar 
                            con la autorización previa y por escrito de <b>CÁLIDDA.</b>
                            <br><br>
                            <b>13.2</b> La información confidencial comprende, sin limitación, toda la información o materiales que le sea entregada por 
                            <b>CÁLIDDA</b> en virtud al presente Contrato.
                        </td>
                    </tr>
                    <tr>
                        <td><br><b>CLÁUSULA DÉCIMO CUARTA: <span style="margin-left:50px">LEY APLICABLE </span></b></td>
                    </tr>
                    <tr>
                        <td style="text-align: justify"><br>
                            Para todo aspecto, relacionado ya sea directa o indirectamente con la celebración, validez, eficacia, interpretación, 
                            ejecución y cumplimiento del presente Contrato, las Partes se someten a las leyes de la República del Perú.
                            <br><br>
                            Se suscribe el presente Contrato en la ciudad de Lima, a los ' . date('d') . ' días del mes de ' . Obj()->Vendor->Tools->dateMonthSpanish() . ' 
                            de ' . date('Y') . ' dos (2) ejemplares iguales, en señal de expresa aceptación de su contenido.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <br><br><br><br><br><br>
                            <table width="90%" cellpadding="0" cellspacing="0" border="0" align="center">
                                <tr>
                                    <td width="50%" style="text-align:center">_____________________________________</td>
                                    <td width="50%" style="text-align:center">_____________________________________</td>
                                </tr>
                                <tr>
                                    <td style="text-align:center"><b>Firma de EL CLIENTE</b></td>
                                    <td style="text-align:center"><b>Firma de CÁLIDDA</b></td>
                                </tr>
                                <tr>
                                    <td style="text-align:center"><b>' . $row['nombre_completo'] . '</b></td>
                                    <td style="text-align:center"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
          </main>
        </body>
        </html>
            ');

        $DomPDF->render();

        $font = $DomPDF->getFontMetrics()->get_font("helvetica", "bold");
        $DomPDF->getCanvas()->page_text(60, 750, "F-GEV-048_V1", $font, 10, array(0, 0, 0));
        $DomPDF->getCanvas()->page_text(484, 750, "Página {PAGE_NUM} de {PAGE_COUNT}", $font, 10, array(0, 0, 0));


        $pdf = $DomPDF->output();
        file_put_contents($file, $pdf);

        if (is_readable($file)) {
            echo json_encode(['result' => 1]);
        } else {
            echo json_encode(['result' => 2]);
        }
    }

    public function getFormatoConsentimiento() {
        $row = $this->qFindPropietario();

        $DomPDF = new DOMPDF();

        $DomPDF->set_paper('letter', 'landscape');

        $file = ROOT . "files" . DS . "temp" . DS . "TmpFCONSEN.pdf";
        Obj()->Vendor->Tools->deleteFile($file);

        $DomPDF->load_html('
        <style>
            input{
                border:1px solid #000;
                height:15px;                
            }
            .trg{
                background:#ddd;
            }
            table,body{
                font-size:12px;
            }
            @page { margin: 60px}
            body { margin: 10px  }
        </style>
        <table width="100%" border="0" cellspacing="0" cellpadding="2">
            <tr>
                <td>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="20%">
                            <img src="' . ROOT . 'public' . DS . 'img' . DS . 'calidda.png' . '">
                        </td>
                        <td width="60%" align="center"><h1>Pre Evaluación Financiamiento Conversiones Vehiculares</h1></td>
                        <td width="20%">
                            N° Expediente<br />          
                            <input type="text" style="width:135px;" value="' . $row['nro_expediente'] . '"/>
                        </td>
                      </tr>
                    </table>
                </td>
            </tr>
        </table>
        <br>
        Para ser llenado por el TCA (Talleres de Conversión Afiliados al Proveedor de Equipos Completos)
        <br><br>
        <b>El Solicitante debe Cumplir con "TODOS" los siguientes requisitos para poder firmar el contrato de financiamiento:</b>
        
        <table width="100%" border="1" cellspacing="0" cellpadding="0">
            <thead>
                <tr class="trg">
                    <th style="text-align:center;width:400px">Criterio</th>
                    <th style="text-align:center">Cumple</th>
                    <th style="text-align:center">No Cumple</th>
                    <th style="text-align:center;width:300px">Consulta Gratuita</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>¿El vehículo tiene una antigüedad menor a 10 años?</td>
                    <td></td>
                    <td></td>
                    <td><a href="https://www.sunarp.gob.pe/ConsultaVehicular/">Tarjeta de Propiedad</a></td>
                </tr>
                <tr>
                    <td>¿El titular tiene entre 20 y 65 Años?</td>
                    <td></td>
                    <td></td>
                    <td><a href="https://www.sunarp.gob.pe/ConsultaVehicular/">DNI</a></td>
                </tr>
                <tr>
                    <td>¿El DNI está registrado en RENIEC?</td>
                    <td></td>
                    <td></td>
                    <td><a href="https://slcp.mtc.gob.pe/">https://slcp.mtc.gob.pe/</a></td>
                </tr>
                <tr>
                    <td>¿El DNI corresponde al titular del contrato?</td>
                    <td></td>
                    <td></td>
                    <td><a href="https://slcp.mtc.gob.pe/">https://slcp.mtc.gob.pe/</a></td>
                </tr>
                <tr>
                    <td>¿La Licencia de conducir está en estado VIGENTE?</td>
                    <td></td>
                    <td></td>
                    <td><a href="https://slcp.mtc.gob.pe/">https://slcp.mtc.gob.pe/</a></td>
                </tr>
                <tr>
                    <td>¿El titular del contrato es propietario del vehículo?</td>
                    <td></td>
                    <td></td>
                    <td><a href="https://www.sunarp.gob.pe/ConsultaVehicular/">https://www.sunarp.gob.pe/ConsultaVehicular/</a></td>
                </tr>
                <tr>
                    <td>¿El SOAT está Vigente?</td>
                    <td></td>
                    <td></td>
                    <td><a href="https://www.apeseg.org.pe/consultas-soat/">https://www.apeseg.org.pe/consultas-soat/</a></td>
                </tr>
                <tr>
                    <td>¿El vehículo NO tiene MULTAS DE TRANSITO "GRAVES" y "MUY GRAVES" pendientes de pago?</td>
                    <td></td>
                    <td></td>
                    <td><a href="https://www.sat.gob.pe/VirtualSAT/principal.aspx?mysession=A5I3uFahNH91gvCOE4jiXD%2bzw8%2fSEyNKWvldStk3hGoiXlZEYqb8pQ%3d%3d">Click aqui para consultar</a></td>
                </tr>
                <tr>
                    <td>¿El titular del contrato NO tiene MULTAS DE TRANSITO "GRAVES" y "MUY GRAVES" pendientes de pago?</td>
                    <td></td>
                    <td></td>
                    <td><a href="https://www.sat.gob.pe/VirtualSAT/principal.aspx?mysession=A5I3uFahNH91gvCOE4jiXD%2bzw8%2fSEyNKWvldStk3hGoiXlZEYqb8pQ%3d%3d">Click aqui para consultar</a></td>
                </tr>
                <tr>
                    <td>¿El vehículo NO tiene ORDEN DE CAPTURA?</td>
                    <td></td>
                    <td></td>
                    <td><a href="https://www.sat.gob.pe/VirtualSAT/principal.aspx?mysession=A5I3uFahNH91gvCOE4jiXD%2bzw8%2fSEyNKWvldStk3hGoiXlZEYqb8pQ%3d%3d">Click aqui para consultar</a></td>
                </tr>
            </tbody>
        </table>
        <br>
        El Solicitante debe entregar copia de:
        <ol>
            <li>Documento de Identidad del titular del contrato</li>
            <li>SOAT</li>
            <li>BREVETE o Licencia de Conducir</li>
            <li>Copia de Consulta Vehicular de SUNARP</li>
            <li>Contrato de Financiamiento firmado (todos los juegos)</li>
        </ol>
        <br>
        Taller de Conversión Afiliados: ' . $row['taller'] . '
        <br><br>
        Nombre de Representante Taller de Conversión Afiliados: __________________________________________________');

        $DomPDF->render();
        $pdf = $DomPDF->output();
        file_put_contents($file, $pdf);

        if (is_readable($file)) {
            echo json_encode(['result' => 1]);
        } else {
            echo json_encode(['result' => 2]);
        }
    }

}
