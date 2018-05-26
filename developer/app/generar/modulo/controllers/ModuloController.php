<?php

/**
 *
 * @author DC
 */

namespace Generar\Modulo\Controllers;

use \Vendor\Controller;
use \Generar\Modulo\Filters\ModuloFilter;

class ModuloController extends \Generar\Modulo\Models\ModuloModel {

    private $_directoryMain = ROOT_MAIN . 'app' . DS;

    use Controller {
        Controller::__construct as private __cConstruct;
    }
    use ModuloFilter {
        ModuloFilter::__construct as private __fConstruct;
    }

    public function __construct() {
        parent::__construct();  /* constructor del ModuloModel */
        $this->__cConstruct();  /* constructor del Generar\Modulo\Controllers */
        $this->__fConstruct();  /* constructor del ModuloFilter */
    }

    public function index() {
        
    }

    public function getFolders() {
        $l = [];
        $directorio = opendir($this->_directoryMain);
        while ($archivo = readdir($directorio)) {
            if ($archivo != '.' && $archivo != '..' && $archivo != 'vendor' && $archivo != 'system') {
                $l[$archivo] = [];
                //agregando los subdirectorios
                $subDirectorio = opendir($this->_directoryMain . $archivo . DS);
                while ($subArchivo = readdir($subDirectorio)) {
                    if ($subArchivo != '.' && $subArchivo != '..') {
                        $l[$archivo][] = ['folder' => $subArchivo];
                    }
                }
            }
        }
        closedir($directorio);
        echo json_encode($l);
    }

    public function postNewModulo() {
        $ruta = $this->_directoryMain . $this->_form->txt_descripcion;
        if ($this->isValidate()) {

            if (!file_exists($ruta)) {
                mkdir($ruta, 0700);

                //agregar namespace a $$ del proyecto
                $fp = fopen(ROOT . '..' . DS . 'config' . DS . '$$' . DS . '$$.js', 'a');
                fwrite($fp, chr(13) . chr(10) . '$$.' . ucfirst($this->_form->txt_descripcion) . ' = {};');
                fclose($fp);

                $data = ['ok_error' => 'ok', 'mensaje' => 'folder_ok'];
            } else {
                $data = ['ok_error' => 'error', 'mensaje' => 'folder_exist'];
            }
        } else {
            $data = $this->valida()->messages();
        }
        echo json_encode($data);
    }

    public function postNewOption() {
        $ruta = $this->_directoryMain . $this->_form->_keyModulo . DS . strtolower($this->_form->txt_descripcion);

        if ($this->isValidate()) {

            if (!file_exists($ruta)) {
                mkdir($ruta, 0700);

                mkdir($ruta . DS . 'controllers', 0700);
                mkdir($ruta . DS . 'filters', 0700);
                mkdir($ruta . DS . 'models', 0700);
                mkdir($ruta . DS . 'views', 0700);
                mkdir($ruta . DS . 'views' . DS . 'js', 0700);

                //creando files php
                $file = ucfirst($this->_form->txt_descripcion);

                $parms = [
                    'ruta' => $ruta,
                    'file' => $file,
                    'modulo' => $this->_form->_keyModulo
                ];

                \Generar\Modulo\Assets\ControllerAssets::create($parms);
                \Generar\Modulo\Assets\FilterAssets::create($parms);
                \Generar\Modulo\Assets\ModelAssets::create($parms);

                //creando files js
                \Generar\Modulo\Assets\AxJS::create($parms);
                \Generar\Modulo\Assets\RscJS::create($parms);
                \Generar\Modulo\Assets\TourJS::create($parms);
                
                //creandoo views
                \Generar\Modulo\Assets\FormIndex::create($parms);

                $data = ['ok_error' => 'ok', 'mensaje' => 'folder_ok'];
            } else {
                $data = ['ok_error' => 'error', 'mensaje' => 'folder_exist'];
            }
        } else {
            $data = $this->valida()->messages();
        }
        echo json_encode($data);
    }

    public function postDeleteFolder() {
        $ruta = $this->_directoryMain . $this->_form->_folder;

        if (Obj()->Vendor->Tools->removeDirectory($ruta)) {
            //eliminar namespace de $$
            $cont = file(ROOT . '..' . DS . 'config' . DS . '$$' . DS . '$$.js');
            $linea = -1;

            //detectar linea a borrar
            foreach ($cont as $a => $va1) {
                if (preg_match('/[' . $this->_form->_folder . ']/i', $va1)) {
                    $linea = $a;
                }
            }

            if ($linea >= 0) {
                unset($cont[$linea]);

                $cont_new = implode('', $cont);

                $f = fopen(ROOT . '..' . DS . 'config' . DS . '$$' . DS . '$$.js', 'w');
                fwrite($f, $cont_new);
                fclose($f);
            }

            $data = ['ok_error' => 'ok', 'mensaje' => 'delete_ok'];
        } else {
            $data = ['ok_error' => 'error', 'mensaje' => 'error_system'];
        }
        echo json_encode($data);
    }

    public function postDeleteOpcion() {
        $ruta = $this->_directoryMain . $this->_form->_folder;

        if (Obj()->Vendor->Tools->removeDirectory($ruta)) {
            $data = ['ok_error' => 'ok', 'mensaje' => 'delete_ok'];
        } else {
            $data = ['ok_error' => 'error', 'mensaje' => 'error_system'];
        }
        echo json_encode($data);
    }

    public function getTablesDB () {
        echo json_encode($this->qGetTables());
    }
}
