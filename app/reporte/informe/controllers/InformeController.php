<?php

/*
 * ---------------------------------------
 * --------- CREATED BY LV ----------
 * Autor:        Super 
 * Fecha:        02-07-2018 01:07:47 
 * Descripcion : InformeController.php
 * ---------------------------------------
 */

namespace Reporte\Informe\Controllers;

use \Vendor\Controller;
use \Reporte\Informe\Filters\InformeFilter;

class InformeController extends \Reporte\Informe\Models\InformeModel {

    use Controller {
        Controller::__construct as private __cConstruct;
    }
    use InformeFilter {
        InformeFilter::__construct as private __fConstruct;
    }

    public function __construct() {
        parent::__construct();  /* constructor del InformeModel */
        $this->__cConstruct();  /* constructor del Controller */
        $this->__fConstruct();  /* constructor del InformeFilter */
    }

    public function index() {
        
    }

    public function getInforme() {
        $data = [
            'talleres_mes' => $this->qTalleresMes(),
            'resultados_mes' => $this->qResultadosMes(),
            'talleres_anio' => $this->qTalleresAnio(),
            'resultados_anio' => $this->qResultadosAnio()
        ];
        echo json_encode($data);
    }

}
