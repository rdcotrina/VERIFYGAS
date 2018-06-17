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
    
    public function postAtender() {
        echo json_encode($this->spAtender());
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
                    $this->_columnDB = 'video_estado_funcionamiento_gnv';
                    break;
            }
            
            $root = ROOT . 'files' . DS . 'videos' . DS; //ruta donde se va alojar el archivo

            $nvoNom = str_replace(' ', '', $inputFile['name']);

            Obj()->Vendor->Tools->deleteFile($root . $nvoNom);

            Obj()->Libs->Upload->upload($inputFile);
            
            Obj()->Libs->Upload->allowed = ['video/mpeg', 'video/x-flv', 'video/msvideo','video/mp4'];

            if (Obj()->Libs->Upload->uploaded) {
                Obj()->Libs->Upload->file_new_name_body = explode('.', $nvoNom)[0]; //se quita la extension

                Obj()->Libs->Upload->Process($root);

                if (Obj()->Libs->Upload->processed) {

                    Obj()->Libs->Upload->Clean();

                    //funciona desde el formulario editar
//                    if ($this->_form->_tieneCreconversion) {
//                        $this->qUpdateVideo($nvoNom);
//                    }

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
    
}