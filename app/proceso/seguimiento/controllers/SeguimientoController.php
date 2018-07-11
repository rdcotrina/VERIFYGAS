<?php

/*
 * ---------------------------------------
 * --------- CREATED BY LV ----------
 * Autor:        Super 
 * Fecha:        21-06-2018 08:06:04 
 * Descripcion : SeguimientoController.php
 * ---------------------------------------
 */

namespace Proceso\Seguimiento\Controllers;

use \Vendor\Controller;
use \Proceso\Seguimiento\Filters\SeguimientoFilter;
use \Dompdf\Dompdf;
use ZipArchive;

class SeguimientoController extends \Proceso\Seguimiento\Models\SeguimientoModel {

    use Controller {
        Controller::__construct as private __cConstruct;
    }
    use SeguimientoFilter {
        SeguimientoFilter::__construct as private __fConstruct;
    }

    public function __construct() {
        parent::__construct();  /* constructor del SeguimientoModel */
        $this->__cConstruct();  /* constructor del Controller */
        $this->__fConstruct();  /* constructor del SeguimientoFilter */
    }

    public function index() {
        
    }

    public function getVehiculos() {
        echo json_encode($this->qGetVehiculos());
    }
    
    public function getObservacion() {
        echo json_encode($this->qGetObservacion());
    }

    public function printExpediente() {


        $DomPDF = new DOMPDF();

        $row = $this->qExpediente();

        $file = ROOT . "files" . DS . "temp" . DS . "Expediente" . $row['nro_expediente'] . ".pdf";
        Obj()->Vendor->Tools->deleteFile($file);
//        $paper_size = array(0,0,360,360);
//$dompdf->set_paper($paper_size);
//        $DomPDF->set_paper("A4", "portrait");
        $DomPDF->load_html(Obj()->Vendor->Tools->templateFHPdf('
        <table width="100%" border="1" cellspacing="5" cellpadding="5" style="border-collapse:collapse">
            <tr>
              <td>&nbsp;</td>
              <td width="12%">Expediente: </td>
              <td width="19%">' . $row['nro_expediente'] . '</td>
            </tr>
            <tr>
              <td colspan="3" style="background:#CCC">Datos Básicos del Propietario</td>
            </tr>
            <tr>
              <td colspan="3">
              <table width="100%" border="1" cellspacing="5" cellpadding="5" style="border-collapse:collapse">
                <tr>
                  <td width="23%">Apellidos y Nombres</td>
                  <td width="31%">' . $row['nombre_completo'] . '</td>
                  <td width="23%">Estado civil</td>
                  <td width="23%">' . $row['estado_civil'] . '</td>
                </tr>
                <tr>
                  <td>País</td>
                  <td>' . $row['pais'] . '</td>
                  <td>' . $row['tipo_documento_identidad'] . '</td>
                  <td>' . $row['documento_identidad'] . '</td>
                </tr>
                <tr>
                  <td>Teléfono de Casa</td>
                  <td>' . $row['telefono_casa'] . '</td>
                  <td>Dirección de Domicilio</td>
                  <td>' . $row['direccion_domicilio'] . '</td>
                </tr>
                <tr>
                  <td>Teléfono de Trabajo</td>
                  <td>' . $row['telefono_trabajo'] . '</td>
                  <td>Dirección de Trabajo</td>
                  <td>' . $row['direccion_trabajo'] . '</td>
                </tr>
                <tr>
                  <td>Celular</td>
                  <td>' . $row['celular'] . '</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              </table><br></td>
            </tr>
            <tr>
              <td colspan="3" style="background:#CCC">Datos Básicos del Vehículo</td>
            </tr>
            <tr>
              <td colspan="3">              
              <table width="100%" border="1" cellspacing="5" cellpadding="5" style="border-collapse:collapse">
                <tr>
                  <td width="25%">Tarjeta de Propiedad</td>
                  <td width="28%">' . $row['tarjeta'] . '</td>
                  <td width="19%">Placa</td>
                  <td width="28%">' . $row['placa'] . '</td>
                </tr>
                <tr>
                  <td>Marca</td>
                  <td>' . $row['marca'] . '</td>
                  <td>Número de Serie</td>
                  <td>' . $row['serie'] . '</td>
                </tr>
                <tr>
                  <td>Modelo</td>
                  <td>' . $row['modelo'] . '</td>
                  <td>Cilindrada</td>
                  <td>' . $row['cilindrada'] . '</td>
                </tr>
                <tr>
                  <td>Número de Motor</td>
                  <td>' . $row['numero_motor'] . '</td>
                  <td>Año de Fabricación</td>
                  <td>' . $row['anio_fabricacion'] . '</td>
                </tr>
              </table></td>
            </tr>
          </table>'));
        $DomPDF->render();

//        $font = $DomPDF->getFontMetrics()->get_font("helvetica", "bold");
//        $DomPDF->getCanvas()->page_text(72, 18, "{PAGE_NUM} de {PAGE_COUNT}", $font, 10, array(0, 0, 0));


        $pdf = $DomPDF->output();
        file_put_contents($file, $pdf);

        if (is_readable($file)) {
            $zip = new \ZipArchive();

            $fzip = ROOT . "files" . DS . "temp" . DS . "Expediente.zip";
            Obj()->Vendor->Tools->deleteFile($fzip);

            if ($zip->open($fzip, \ZipArchive::CREATE) === true) {
                $filepdf = "files/temp/Expediente" . $row['nro_expediente'] . ".pdf";
                if (is_readable($filepdf)) {
                    $zip->addFile($filepdf);
                }

                $fileimg = "files/docs_registro/" . $row['imagen_tarjeta_propiedad'];
                if (is_readable($fileimg)) {
                    $zip->addFile($fileimg);
                }

                $fileimg = "files/docs_registro/" . $row['imagen_servicio_publico'];
                if (is_readable($fileimg)) {
                    $zip->addFile($fileimg);
                }

                $fileimg = "files/docs_registro/" . $row['imagen_revision_tecnica'];
                if (is_readable($fileimg)) {
                    $zip->addFile($fileimg);
                }

                $fileimg = "files/docs_registro/" . $row['imagen_movil'];
                if (is_readable($fileimg)) {
                    $zip->addFile($fileimg);
                }

                $fileimg = "files/docs_registro/" . $row['imagen_poliza'];
                if (is_readable($fileimg)) {
                    $zip->addFile($fileimg);
                }

                $fileimg = "files/docs_registro/" . $row['imagen_solicitud_cobranza'];
                if (is_readable($fileimg)) {
                    $zip->addFile($fileimg);
                }

                $fileimg = "files/docs_registro/" . $row['imagen_formulario_calidda'];
                if (is_readable($fileimg)) {
                    $zip->addFile($fileimg);
                }

                $fileimg = "files/docs_registro/" . $row['img_contrato_financiamiento_calidda'];
                if (is_readable($fileimg)) {
                    $zip->addFile($fileimg);
                }

                $fileimg = "files/docs_registro/" . $row['imagen_documento_identidad'];
                if (is_readable($fileimg)) {
                    $zip->addFile($fileimg);
                }

                $fileimg = "files/docs_registro/" . $row['imagen_licencia_conducir'];
                if (is_readable($fileimg)) {
                    $zip->addFile($fileimg);
                }

                $fileimg = "files/docs_registro/" . $row['imagen_consentimiento'];
                if (is_readable($fileimg)) {
                    $zip->addFile($fileimg);
                }

                $zip->close();

                echo json_encode(['result' => 1]);
            } else {
                echo json_encode(['result' => 2]);
            }
        } else {
            echo json_encode(['result' => 2]);
        }
    }

    public function printPreConversion() {
        $DomPDF = new DOMPDF();

        $nro_expediente = $this->qExpediente()['nro_expediente'];

        $row = $this->qPreConversion();

        $file = ROOT . "files" . DS . "temp" . DS . "PreConversion" . $nro_expediente . ".pdf";
        Obj()->Vendor->Tools->deleteFile($file);

        if (!empty($row)) {
            $DomPDF->load_html(Obj()->Vendor->Tools->templateFHPdf('
            <table width="100%" border="1" cellspacing="5" cellpadding="5" style="border-collapse:collapse">
                <tr>
                  <td width="68%">&nbsp;</td>
                  <td width="13%">Expediente: </td>
                  <td width="19%">' . $nro_expediente . '</td>
                </tr>
                <tr>
                  <td colspan="3" style="background:#CCC">Pruebas de Vacio de Motor</td>
                </tr>
                <tr>
                  <td colspan="3"><table width="100%" border="1" cellspacing="5" cellpadding="5" style="border-collapse:collapse">
                    <tr>
                      <td width="10%">Ralenti</td>
                      <td>'.$row['vacio_motor_ralenti'].'</td>
                      </tr>
                  </table></td>
                </tr>
                <tr>
                  <td colspan="3" style="background:#CCC">Analisis de Gases</td>
                </tr>
                <tr>
                  <td colspan="3"><table width="100%" border="1" cellspacing="5" cellpadding="5" style="border-collapse:collapse">
                    <tr>
                      <td width="10%">Ralenti</td>
                      <td width="34%">'.$row['analisis_gas_ralenti_co'].' CO%</td>
                      <td width="19%">2500/3000 RPM</td>
                      <td width="37%">'.$row['analisis_gas_rpm_co'].' CO%</td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td>'.$row['analisis_gas_ralenti_hc'].' HC ppm</td>
                      <td>&nbsp;</td>
                      <td>'.$row['analisis_gas_rpm_hc'].' HC ppm</td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td>'.$row['analisis_gas_ralenti_co2'].' CO2%</td>
                      <td>&nbsp;</td>
                      <td>'.$row['analisis_gas_rpm_co2'].' CO2%</td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td>'.$row['analisis_gas_ralenti_o2'].' O2</td>
                      <td>&nbsp;</td>
                      <td>'.$row['analisis_gas_rpm_o2'].' O2</td>
                    </tr>
                  </table></td>
                </tr>
                <tr>
                  <td colspan="3" style="background:#CCC">Sistema de Refrigeración</td>
                </tr>
                <tr>
                  <td>
                      <ol>
                          <li>Existen fugas de refrigerante por el radiador</li>
                          <li>Existen fugas de refrigerante por las mangueras de refrigeracion</li>
                          <li>Funcionamiento indicador (Testigo) de temperatura en el panel de instrumentos</li>
                          <li>Ciclado de funcionamiento del electroventilador</li>
                          <li>Nivel de refrigerante de motor</li>
                      </ol>
                  </td>
                  <td colspan="2">'.$row['sistema_refrigeracion'].' </td>
                </tr>
                <tr>
                  <td colspan="3" style="background:#CCC">Sistema de Lubricación</td>
                </tr>
                <tr>
                  <td>
                    <ol>
                      <li>Fuga de aceite por retenedores o sellos</li>
                      <li>Fuga de aceite por empaque de carter</li>
                      <li>Fuga de aceite por empaque tapa valvulas</li>
                      <li>Estado del indicador nivel de aceite en el panel de instrumentos</li>
                      <li>Nivel de aceite de motor</li>
                    </ol>
                  </td>
                  <td colspan="2">'.$row['sistema_lubricacion'].' </td>
                </tr>
                <tr>
                  <td colspan="3" style="background:#CCC">Estado y carga del sistema eléctrico y Verificación del control y estabilidad del sistema de carga</td>
                </tr>
                <tr>
                  <td colspan="3"><table width="100%" border="1" cellspacing="5" cellpadding="5" style="border-collapse:collapse">
                    <tr>
                      <td colspan="2" align="center">Batería</td>
                      <td colspan="2" align="center">Estado de Batería y Otros</td>
                    </tr>
                    <tr>
                      <td width="10%">Apagado</td>
                      <td width="29%">'.$row['bateria_apagado'].' Voltios</td>
                      <td width="36%" rowspan="4">
                          <ol>
                            <li>Verificar estado bornes de bateria</li>
                            <li>Verificar estado anclaje de bateria</li>
                            <li>Verificar estado de la bateria (Si es de electrolito verifique el nivel de cada celda)</li>
                            <li>Verificar estado masa motor</li>
                            <li>Verificar estado masa chasis</li>
                            <li>Verificar estado arrancador</li>
                            <li>Verificar estado Alternador</li>
                            <li>Verificar estado de correas en general</li>
                          </ol>
                      </td>
                      <td width="25%" rowspan="4">'.$row['estado_bateria_otros'].' </td>
                    </tr>
                    <tr>
                      <td>Arranque</td>
                      <td>'.$row['bateria_arranque'].' Voltios</td>
                    </tr>
                    <tr>
                      <td>Ralenti</td>
                      <td>'.$row['bateria_ralenti'].' Voltios</td>
                    </tr>
                    <tr>
                      <td valign="top">2500 RPM</td>
                      <td valign="top">'.$row['bateria_rpm'].' Voltios</td>
                    </tr>
                  </table></td>
                </tr>
                <tr>
                  <td colspan="3" style="background:#CCC">Sistema electrónico de combustile (Lectura de datos desde el Scanner Automotriz)</td>
                </tr>
                <tr>
                  <td colspan="3"><table width="100%" border="1" cellspacing="5" cellpadding="5" style="border-collapse:collapse">
                    <tr>
                      <td width="13%">STFT B1</td>
                      <td width="19%">'.$row['stft_b1'].' %</td>
                      <td width="43%" rowspan="3">
                          <ol>
                            <li>Verifique el parametro de la valvula EGR</li>
                            <li>Verifique el parametro de la valvula IAC</li>
                            <li>Verifique el parametro del sensor THW/ECT</li>
                            <li>Verifique el parametro del sensor de presion (Baro Pressure)</li>
                            <li>Verifique los codigos de falla actuales y almacenados</li>
                            <li>Verifique el parametro del sensor IAT</li>
                            <li>Verifique el parametro de Ignition Voltage</li>
                            <li>Verifique el parametro del sensor CKP</li>
                            <li>Verifique el parametro con motor en ralenti del sensor MAP,Vacuum</li>
                            <li>Verifique el parametro del sensor O2 S1B1</li>
                            <li>Verifique el parametro del sensor O2 S1B2</li>
                            <li>Verifique el Ancho de pulso de inyectores</li>
                            <li>Registre el parametro de angulo de avance en ralenti</li>
                            <li>Registre el parametro de angulo de avance 2500rpm</li>
                          </ol>
                      </td>
                      <td width="25%" rowspan="3">'.$row['sistema_electronico_comustible'].' </td>
                    </tr>
                    <tr>
                      <td>LTFT B1</td>
                      <td>'.$row['ltft_b1'].' %</td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                    </tr>
                  </table></td>
                </tr>
                <tr>
                  <td colspan="3" style="background:#CCC">Sistema de Encendido</td>
                </tr>
                <tr>
                  <td colspan="3"><table width="100%" border="1" cellspacing="5" cellpadding="5" style="border-collapse:collapse">
                    <tr>
                      <td width="22%">Tipo de Sistema de Encendido</td>
                      <td width="23%">'.$row['tipo_sistema_encendido'].' </td>
                      <td width="39%">
                          <ol>
                            <li>Verifique la resistencia interna de las bujias</li>
                            <li>Verifique el codigo de las bujias (Las 4 bujias deberan ser iguales)</li>
                          </ol>
                      </td>
                      <td width="16%">'.$row['sistema_encendido'].' </td>
                    </tr>
                  </table></td>
                </tr>
                <tr>
                  <td colspan="3" style="background:#CCC">Estado de Sistema de Admisión de Aire</td>
                </tr>
                <tr>
                  <td>
                      <ol>
                        <li>Verificar estado de la toma de aire despues del sensor</li>
                        <li>Verificar estado del filtro de aire</li>
                      </ol>
                  </td>
                  <td colspan="2">'.$row['sistema_admision_aire'].' </td>
                </tr>
                <tr>
                  <td colspan="3" style="background:#CCC">Prueba de compresión de motor</td>
                </tr>
                <tr>
                  <td colspan="3"><table width="100%" border="1" cellspacing="5" cellpadding="5" style="border-collapse:collapse">
                    <tr>
                      <td width="13%">Cilindro 1</td>
                      <td width="87%">'.$row['cilindro_1'].' psi</td>
                    </tr>
                    <tr>
                      <td>Cilindro 2</td>
                      <td>'.$row['cilindro_2'].' psi</td>
                    </tr>
                    <tr>
                      <td>Cilindro 3</td>
                      <td>'.$row['cilindro_3'].' psi</td>
                    </tr>
                    <tr>
                      <td>Cilindro 4</td>
                      <td>'.$row['cilindro_4'].' psi</td>
                    </tr>
                  </table></td>
                </tr>
                <tr>
                  <td colspan="3" style="background:#CCC">Inspecciones Visuales</td>
                </tr>
                <tr>
                  <td>
                      <ol>
                        <li>Verificar estado del chasis</li>
                        <li>Verificar estado del piso del vehiculo</li>
                      </ol>
                  </td>
                  <td colspan="2">'.$row['inspeccion_visual'].' </td>
                </tr>
              </table>'));
            $DomPDF->render();

            $pdf = $DomPDF->output();
            file_put_contents($file, $pdf);

            if (is_readable($file)) {
                $zip = new \ZipArchive();

                $fzip = ROOT . "files" . DS . "temp" . DS . "PreConversion.zip";
                Obj()->Vendor->Tools->deleteFile($fzip);

                if ($zip->open($fzip, \ZipArchive::CREATE) === true) {

                    $filepdf = "files/temp/PreConversion" . $nro_expediente . ".pdf";
                    if (is_readable($filepdf)) {
                        $zip->addFile($filepdf);
                    }

                    $filevideo = "files/videos/" . $row['video_cilindro'];
                    if (is_readable($filevideo)) {
                        $zip->addFile($filevideo);
                    }

                    $filevideo = "files/videos/" . $row['video_vacio_motor_ralenti'];
                    if (is_readable($filevideo)) {
                        $zip->addFile($filevideo);
                    }

                    $filevideo = "files/videos/" . $row['video_ltft_b1'];
                    if (is_readable($filevideo)) {
                        $zip->addFile($filevideo);
                    }

                    $filevideo = "files/videos/" . $row['video_stft_b1'];
                    if (is_readable($filevideo)) {
                        $zip->addFile($filevideo);
                    }

                    $filevideo = "files/videos/" . $row['video_analisis_gas_ralenti'];
                    if (is_readable($filevideo)) {
                        $zip->addFile($filevideo);
                    }

                    $filevideo = "files/videos/" . $row['video_analisis_gas_rpm'];
                    if (is_readable($filevideo)) {
                        $zip->addFile($filevideo);
                    }

                    $zip->close();

                    echo json_encode(['result' => 1]);
                } else {
                    echo json_encode(['result' => 2]);
                }
            } else {
                echo json_encode(['result' => 2]);
            }
        } else {
            echo json_encode(['result' => 3]);
        }
    }

    public function printConversion() {
        $DomPDF = new DOMPDF();

        $nro_expediente = $this->qExpediente()['nro_expediente'];

        $row = $this->qConversion();

        $file = ROOT . "files" . DS . "temp" . DS . "Conversion" . $nro_expediente . ".pdf";
        Obj()->Vendor->Tools->deleteFile($file);

        if (!empty($row)) {
            $DomPDF->load_html(Obj()->Vendor->Tools->templateFHPdf('
            <table width="80%" border="1" cellspacing="5" cellpadding="5" style="border-collapse:collapse">
                <tr>
                  <td width="68%">&nbsp;</td>
                  <td width="13%">Expediente: </td>
                  <td width="19%">' . $nro_expediente . '</td>
                </tr>
                <tr>
                  <td colspan="3" style="background:#CCC">Cilindro de GNV</td>
                </tr>
                <tr>
                  <td colspan="3"><table width="100%" border="1" cellspacing="5" cellpadding="5" style="border-collapse:collapse">
                    <tr>
                      <td width="22%">Marca</td>
                      <td width="18%">' . $row['marca_gnv'] . '</td>
                      <td width="34%" rowspan="5">
                        <ol>
                          <li>Sujeccion de la cuna con pernos grado 8</li>
                          <li>Verificar existencia de cinta de caucho como aislante de friccion</li>
                        </ol>
                      </td>
                      <td width="20%" rowspan="5">' . $row['cilindro_gnv_texto'] . '</td>
                      </tr>
                    <tr>
                      <td>Serie</td>
                      <td>' . $row['serie_gnv'] . '</td>
                    </tr>
                    <tr>
                      <td>Capacidad en Litros</td>
                      <td>' . $row['capacidad_litros'] . '</td>
                    </tr>
                    <tr>
                      <td>Fecha de Fabricación</td>
                      <td>' . $row['fecha_fabricacion'] . '</td>
                    </tr>
                    <tr>
                      <td>Ubicación de la cuna de cilindro </td>
                      <td>' . $row['ubicacion_cuna_cilindro'] . '</td>
                    </tr>
                  </table></td>
                </tr>
                <tr>
                  <td colspan="3" style="background:#CCC">Válvula de Cilindro</td>
                </tr>
                <tr>
                  <td colspan="3"><table width="100%" border="1" cellspacing="5" cellpadding="5" style="border-collapse:collapse">
                    <tr>
                      <td width="10%">Marca</td>
                      <td width="22%">' . $row['marca_valvula_cilindro'] . '</td>
                      <td width="44%" rowspan="4">
                          <ol>
                            <li>Ajuste a 125 Libras</li>
                            <li>Utilizacion de teflon para gas alta presion</li>
                            <li>Presencia de bolsa de venteo/Corrugado/Pipeta de venteo</li>
                            <li>Verificar ajuste del tapon de la valvula</li>
                            <li>Verificar existencia de fugas</li>
                          </ol>
                      </td>
                      <td width="20%" rowspan="4">' . $row['marca_valvula_cilindro_texto'] . '</td>
                      </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                      </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                    </tr>
                  </table></td>
                </tr>
                <tr>
                  <td colspan="3" style="background:#CCC">Tubería de Alta Presión</td>
                </tr>
                <tr>
                  <td>
                    <ol>
                      <li>Verificar Sujeccion cada 60cm y por grampas metalicas</li>
                      <li>Distancia con tubo de escape a 5cm</li>
                      <li>No debe pasar por guardabarros</li>
                      <li>Protegida de friccion y golpes</li>
                      <li>Verificar existencia de fugas</li>
                    </ol>
                  </td>
                  <td colspan="2">' . $row['tuberia_alta_predion_texto'] . '</td>
                </tr>
                <tr>
                  <td colspan="3" style="background:#CCC">Válvula de Carga</td>
                </tr>
                <tr>
                  <td>
                      <ol>
                        <li>Facil Acceso/Orientacion de la valvula para facil abastecimiento</li>
                        <li>Verificar ubicación a 20 cm de longitud de la bateria como minimo</li>
                        <li>Verificar ubicación a 20 cm de longitud de fuentes de ignicion</li>
                        <li>Verificar ubicación a 5 cm minimo del escape</li>
                        <li>Verificar ubicación de soporte metalico de 3mm de espesor como minimo</li>
                        <li>Verificar existencia de fugas</li>
                      </ol>
                  </td>
                  <td colspan="2">' . $row['valvula_carga_texto'] . '</td>
                </tr>
                <tr>
                  <td colspan="3" style="background:#CCC">Regulador de Presión</td>
                </tr>
                <tr>
                  <td colspan="3"><table width="100%" border="1" cellspacing="5" cellpadding="5" style="border-collapse:collapse">
                    <tr>
                      <td width="10%" valign="top">Serie</td>
                      <td width="29%" valign="top">' . $row['serie_regulador_presion'] . '</td>
                      <td width="36%">
                          <ol>
                            <li>Verificar ubicación a 20cm de longitud de la bateria como minimo</li>
                            <li>Verificar ubicación a 20cm de longitud de fuentes de ignicion/Escape</li>
                            <li>Verificar ubicación de soporte metalico de 3mm de   espesor como minimo (Montaje a elementos fijos del vehiculo, facil   acceso para su regulacion)</li>
                            <li>Verificar montaje por debajo del sistema de compensacion de refrigerante</li>
                            <li>Verificar manometro de 0 - 200 Bar que este conectado/Utilizacion de teflon para gas alta presion (Color amarillo)</li>
                            <li>Verificar existencia de fugas de gas y refrigerante</li>
                          </ol>
                      </td>
                      <td width="20%">' . $row['regulador_presion_texto'] . '</td>
                    </tr>
                  </table></td>
                </tr>
                <tr>
                  <td colspan="3" style="background:#CCC">Riel de Inyectores de Gas</td>
                </tr>
                <tr>
                  <td colspan="3"><table width="100%" border="1" cellspacing="5" cellpadding="5" style="border-collapse:collapse">
                    <tr>
                      <td width="13%" valign="top">Serie</td>
                      <td width="19%" valign="top">' . $row['serie_entrega_gas'] . '</td>
                      <td width="43%">
                          <ol>
                            <li>Montado en forma vertical y maximo a 45 grados de inclinacion</li>
                            <li>Instalar utilizando bases de acero con amortiguadores de vibracion (Goma)</li>
                            <li>Longitud de manguera - Inyector boquilla maximo 15 cm de longitud</li>
                            <li>Verificar diametro interno de mangueras (Todas iguales)</li>
                            <li>Verificar diametro de boquillas (Todas iguales, las que recomiende el fabricante de acuerdo a la cilindrada del motor)</li>
                            <li>Verificar montaje de inyectores aislados de fuentes de calor</li>
                            <li>Ubicación del sensor MAP (Lo mas cerca del inyector de gas, maximo 7cm de longitud)</li>
                            <li>Verificar montaje aislados de fuentes de calor</li>
                          </ol>
                      </td>
                      <td width="20%">' . $row['entrega_gas_texto'] . '</td>
                    </tr>
                  </table></td>
                </tr>
                <tr>
                  <td colspan="3" style="background:#CCC">ECU/Centralita/Controlador de Gas</td>
                </tr>
                <tr>
                  <td colspan="3"><table width="100%" border="1" cellspacing="5" cellpadding="5" style="border-collapse:collapse">
                    <tr>
                      <td width="8%" valign="top">Serie</td>
                      <td width="20%" valign="top">' . $row['serie_controlador_gas'] . '</td>
                      <td width="52%">
                          <ol>
                            <li>Todas las conexiones aisladas y soldadas (OBD/Chapa/Emulacion)</li>
                            <li>Instalada mediante un soporte metalico a un punto fijo del vehiculo</li>
                            <li>Verificar ubicación a 50 cm de longitud de la bateria</li>
                            <li>Verificar ubicación a 20 cm de longitud de fuentes de ignicion</li>
                            <li>Verificar ubicación del cableado a 50 cm de longitud de fuentes de ignicion, recubierto con coraza termica</li>
                            <li>Verificar Instalacion fuera del alcance de humedad</li>
                        </ol>
                      </td>
                      <td width="20%">' . $row['controlador_gas_texto'] . '</td>
                    </tr>
                  </table></td>
                </tr>
                <tr>
                  <td colspan="3" style="background:#CCC">Variador de Avance</td>
                </tr>
                <tr>
                  <td colspan="3"><table width="100%" border="1" cellspacing="5" cellpadding="5" style="border-collapse:collapse">
                    <tr>
                      <td width="8%" valign="top">Serie</td>
                      <td width="20%" valign="top">' . $row['serie_variador_avance'] . '</td>
                      <td width="52%">
                          <ol>
                            <li>Aplica/No aplica</li>
                            <li>Tipo de variador (Inductivo/Reluctancia variable, Hall, Optico)</li>
                            <li>Verificar ubicación a 50 cm de longitud de la bateria</li>
                            <li>Verificar ubicación a 50 cm de longitud de fuentes de ignicion/Escape</li>
                            <li>Verificar Instalacion fuera del alcance de humedad</li>
                            <li>Verificar ubicación a 20 cm de longitud de fuentes de calor</li>
                            <li>Verificar ubicación del cableado a 50 cm de longitud de fuentes de ignicion, recubierto con coraza termica</li>
                            <li>Verificar tipo de onda (Onda del sistema de ignicion en gasolina y onda del sistema de ignicion en GNV)</li>
                            <li>Verifique el parametro de angulo de avance en ralenti en combustible gasolina</li>
                            <li>Verifique el parametro de angulo de avance 2500 rpm en combustible gasolina</li>
                            <li>Registrar el parametro de angulo de avance en ralenti en combustible GNV</li>
                            <li>Registrar el parametro de angulo de avance 2500 rpm en combustible GNV</li>
                            <li>Verifique si el dispositivo se encuentra incertado en ralenti</li>
                          </ol>
                      </td>
                      <td width="20%">' . $row['variador_avance_texto'] . '</td>
                    </tr>
                  </table></td>
                </tr>
                <tr>
                  <td colspan="3" style="background:#CCC">Conmutador</td>
                </tr>
                <tr>
                  <td width="82%">
                      <ol>
                        <li>Fijacion estable al interior del habitaculo del conductor</li>
                        <li>Conmutacion a gas</li>
                        <li>Conmutacion a gasolina</li>
                        <li>Verificar que señale de manera adecuada el nivel de gas</li>
                        <li>Verificar rpm de cambio de combustible gasolina a GNV</li>
                        <li>Verificar temperatura de cambio de combustible gasolina a GNV</li>
                      </ol>
                  </td>
                  <td colspan="2">' . $row['conmutador_texto'] . '</td>
                </tr>
                <tr>
                  <td colspan="3" style="background:#CCC">Emulación de Inyectores</td>
                </tr>
                <tr>
                  <td width="82%">
                      <ol>
                        <li>Se corto cable de inyectores y se realizo soldadura</li>
                        <li>Verificar ubicación del cableado a 50 cm de longitud de fuentes de ignicion, recubierto con coraza termica</li>
                        <li>Verificar ubicación a 50 cm de longitud de la bateria</li>
                      </ol>
                  </td>
                  <td colspan="2">' . $row['emulacion_inyectores_texto'] . '</td>
                </tr>
                <tr>
                  <td colspan="3" style="background:#CCC">Estado y Funcionamiento de GNV</td>
                </tr>
                <tr>
                  <td colspan="3"><table width="100%" border="1" cellspacing="5" cellpadding="5" style="border-collapse:collapse">
                    <tr>
                      <td width="36%">Presión de salida del regulador</td>
                      <td width="17%">' . $row['presion_salida_regulador'] . ' Bar</td>
                      <td width="29%">&nbsp;</td>
                      <td width="18%">&nbsp;</td>
                    </tr>
                    <tr>
                      <td>Configuración de temperatura de conmutacion</td>
                      <td>' . $row['conf_temperatura_conmutacion'] . ' °C</td>
                      <td width="29%">&nbsp;</td>
                      <td width="18%">&nbsp;</td>
                    </tr>
                    <tr>
                      <td>STFT B1 en combustible GNV</td>
                      <td>' . $row['stft_b1_gnv'] . ' %</td>
                      <td width="29%">&nbsp;</td>
                      <td width="18%">&nbsp;</td>
                    </tr>
                    <tr>
                      <td>LTFT B1 en combustible GNV</td>
                      <td>' . $row['ltft_b1_gnv'] . ' %</td>
                      <td width="29%">&nbsp;</td>
                      <td width="18%">&nbsp;</td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                      <td width="29%">&nbsp;</td>
                      <td width="18%">&nbsp;</td>
                    </tr>
                    <tr>
                      <td width="29%">Analisis de gases en ralenti en gasolina</td>
                      <td width="18%"> ' . $row['gases_ralenti_gasolina_co'] . ' CO%</td>
                      <td>Analisis de gases 2500/3000 rpm en gasolina</td>
                      <td width="18%"> ' . $row['gases_rpm_gasolina_co'] . ' CO%</td>
                    </tr>
                    <tr>
                      <td width="29%">&nbsp;</td>
                      <td width="18%"> ' . $row['gases_ralenti_gasolina_hc'] . ' HC ppm</td>
                      <td>&nbsp;</td>
                      <td width="18%"> ' . $row['gases_rpm_gasolina_hc'] . ' HC ppm</td>
                    </tr>
                    <tr>
                      <td width="29%">&nbsp;</td>
                      <td width="18%"> ' . $row['gases_ralenti_gasolina_co2'] . ' CO2%</td>
                      <td>&nbsp;</td>
                      <td width="18%"> ' . $row['gases_rpm_gasolina_co2'] . ' CO2%</td>
                    </tr>
                    <tr>
                      <td width="29%">&nbsp;</td>
                      <td width="18%"> ' . $row['gases_ralenti_gasolina_o2'] . ' O2%</td>
                      <td>&nbsp;</td>
                      <td width="18%"> ' . $row['gases_rpm_gasolina_o2'] . ' O2%</td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <td>Analisis de gases en ralenti en GNV</td>
                      <td width="18%">' . $row['gases_ralenti_gnv_co'] . ' CO%</td>
                      <td>Analisis de gases 2500/3000 rpm en GNV</td>
                      <td width="18%">' . $row['gases_rpm_gnv_co'] . ' CO%</td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td width="18%">' . $row['gases_ralenti_gnv_hc'] . ' HC ppm</td>
                      <td>&nbsp;</td>
                      <td width="18%">' . $row['gases_rpm_gnv_hc'] . ' HC ppm</td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td width="18%">' . $row['gases_ralenti_gnv_co2'] . ' CO2%</td>
                      <td>&nbsp;</td>
                      <td width="18%">' . $row['gases_rpm_gnv_co2'] . ' CO2%</td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td width="18%">' . $row['gases_ralenti_gnv_o2'] . ' O2%</td>
                      <td>&nbsp;</td>
                      <td width="18%">' . $row['gases_rpm_gnv_o2'] . ' O2%</td>
                    </tr>
                  </table></td>
                </tr>
                <tr>
                  <td colspan="2">
                      <ol>
                        <li>Estabilidad en ralenti</li>
                        <li>Estabilidad con maxima carga electrica y A/C</li>
                        <li>Estabilidad en aceleracion sin carga del motor</li>
                        <li>Verificar vacio de motor</li>
                        <li>Verificar tiempo de inyeccion en gasolina</li>
                        <li>Verificar tiempo de inyeccion en GNV</li>
                        <li>Verificar temperatura de gas</li>
                        <li>Verificar temperatura de reductor</li>
                        <li>Verificar rpm</li>
                        <li>Verificar correcta configuracion de numero de cilindros</li>
                        <li>Verificar correcta configuracion de fuente de revoluciones</li>
                        <li>Verificar correcta configuracion de tipo de motor</li>
                        <li>Verificar correcta configuracion de tipo de combustible</li>
                        <li>Verificar correcta configuracion de tipo de inyector de gas</li>
                        <li>Verificar correcta configuracion de indicador de nivel</li>
                        <li>Verificar luego de autocalibracion en minimo que el tiempo de inyeccion a gasolina no se distorsione cuando pase a gas</li>
                        <li>Registrar luego de autocalibracion en minimo que la   diferencia entre el tiempo de inyeccion de gasolina y el tiempo de   inyeccion de gas, no supere los 2.5ms</li>
                        <li>Verificar en calibracion en ruta que la conmutacion es estable</li>
                        <li>Verificar luego de calibracion en ruta, realizar activacion de auto-adaptacion (Si aplica)</li>
                        <li>Verificar luego de calibracion en ruta si existen codigos de falla (Si existe revision, correccion, desviacion)</li>
                      </ol>
                  </td>
                  <td>' . $row['estado_funcionamiento_texto'] . '</td>
                </tr>
              </table>'));
            $DomPDF->render();

            $pdf = $DomPDF->output();
            file_put_contents($file, $pdf);

            if (is_readable($file)) {
                $zip = new \ZipArchive();

                $fzip = ROOT . "files" . DS . "temp" . DS . "Conversion.zip";
                Obj()->Vendor->Tools->deleteFile($fzip);

                if ($zip->open($fzip, \ZipArchive::CREATE) === true) {

                    $filepdf = "files/temp/Conversion" . $nro_expediente . ".pdf";
                    if (is_readable($filepdf)) {
                        $zip->addFile($filepdf);
                    }

                    $filevideo = "files/videos/" . $row['video_estado_funcionamiento'];
                    if (is_readable($filevideo)) {
                        $zip->addFile($filevideo);
                    }

                    $filevideo = "files/videos/" . $row['video_varios'];
                    if (is_readable($filevideo)) {
                        $zip->addFile($filevideo);
                    }

                    $zip->close();

                    echo json_encode(['result' => 1]);
                } else {
                    echo json_encode(['result' => 2]);
                }
            } else {
                echo json_encode(['result' => 2]);
            }
        } else {
            echo json_encode(['result' => 3]);
        }
    }

    public function printEntrega() {

        $nro_expediente = $this->qExpediente()['nro_expediente'];

        $row = $this->qEntrega();

        if (!empty($row)) {

            $zip = new \ZipArchive();

            $fzip = ROOT . "files" . DS . "temp" . DS . "Entrega" . $nro_expediente . ".zip";
            Obj()->Vendor->Tools->deleteFile($fzip);

            if ($zip->open($fzip, \ZipArchive::CREATE) === true) {

                $filevideo = "files/entrega/" . $row['escaneo_1'];
                if (is_readable($filevideo)) {
                    $zip->addFile($filevideo);
                }

                $filevideo = "files/entrega/" . $row['escaneo_2'];
                if (is_readable($filevideo)) {
                    $zip->addFile($filevideo);
                }

                $filevideo = "files/entrega/" . $row['escaneo_4'];
                if (is_readable($filevideo)) {
                    $zip->addFile($filevideo);
                }

                $filevideo = "files/entrega/" . $row['escaneo_5'];
                if (is_readable($filevideo)) {
                    $zip->addFile($filevideo);
                }

                $filevideo = "files/entrega/" . $row['escaneo_11'];
                if (is_readable($filevideo)) {
                    $zip->addFile($filevideo);
                }

                $filevideo = "files/entrega/" . $row['escaneo_13'];
                if (is_readable($filevideo)) {
                    $zip->addFile($filevideo);
                }

                $zip->close();

                $fzip = ROOT . "files" . DS . "temp" . DS . "Entrega.zip";
                Obj()->Vendor->Tools->deleteFile($fzip);

                if ($zip->open($fzip, \ZipArchive::CREATE) === true) {

                    $file = "files/temp/Entrega" . $nro_expediente . ".zip";
                    if (is_readable($file)) {
                        $zip->addFile($file);
                    }
                }

                $zip->close();
                Obj()->Vendor->Tools->deleteFile(ROOT . "files" . DS . "temp" . DS . "Entrega" . $nro_expediente . ".zip");

                echo json_encode(['result' => 1]);
            } else {
                echo json_encode(['result' => 2]);
            }
        } else {
            echo json_encode(['result' => 3]);
        }
    }

}
