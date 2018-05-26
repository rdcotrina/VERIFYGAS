<?php

define('DS', DIRECTORY_SEPARATOR);
define('ROOT', realpath(dirname(__FILE__)) . DS);

//$argv recibe parametros desde consola
$n = array_shift($argv);

class Generate {

    public static function post($p) {
        $prs = explode(',', $p);

        $module = array_shift($prs);
        $option = array_shift($prs);
        $method = array_shift($prs);
        
        $file = ROOT . 'app' . DS . $module . DS . $option . DS . 'controllers' . DS . ucfirst($option) . 'Controller.php';
        $cont = file($file);

        unset($cont[count($cont) - 1]);


        $cont_new = implode('', $cont);

        $f = fopen($file, 'w');
        fwrite($f, $cont_new);
        fclose($f);

        $fp = fopen($file, 'a+');
        fwrite($fp, chr(13)  . '    public function ' . $method.'(){ 
        if ($this->isValidate()) {
            $data = $this->mantenimiento();
        } else {
            $data = $this->valida()->messages();
        }
        echo json_encode($data);
    }

}');
        fclose($fp);
    }

}

$a = ucfirst(array_shift($argv));

eval($a . '("' . implode(',', $argv) . '");');
