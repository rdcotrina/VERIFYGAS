<div>
    <form>
        <div class="col-sm-6">
            <!-- Widget ID (each widget will need unique ID)-->
            <div class="jarviswidget jarviswidget-color-blueDark">
                <header role="heading">
                    <span class="widget-icon"> <i class="fa fa-user-circle-o txt-color-blueLight"></i> </span>		
                    <h2 class="tr-language" data-tr="duenio_vehiculo"> </h2>
                </header>
                <!-- widget div-->
                <div role="content">
                    <!-- widget content -->
                    <div class="widget-body">

                        <div class="bv-form">

                            <fieldset>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="nombres"></label>
                                            <div id="_nombres" class="well padding-5"></div>
                                        </div>
                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="apellidos"></label>
                                            <div id="_apellidos" class="well padding-5"></div>
                                        </div>
                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label" id="_tipodoc"></label>
                                            <div id="_num_doc" class="well padding-5"></div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="direccion"></label>
                                            <div id="_direccion" class="well padding-5"></div>
                                        </div>
                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="celular"></label>
                                            <div id="_celular" class="well padding-5"></div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-6">
            <!-- Widget ID (each widget will need unique ID)-->
            <div class="jarviswidget jarviswidget-color-blueDark">
                <header role="heading">
                    <span class="widget-icon"> <i class="fa fa-car txt-color-blueLight"></i> </span>		
                    <h2 class="tr-language" data-tr="datos_vehiculo"> </h2>
                </header>
                <!-- widget div-->
                <div role="content">
                    <!-- widget content -->
                    <div class="widget-body">

                        <div class="bv-form">

                            <fieldset>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="placa"></label>
                                            <div id="_placa" class="well padding-5"></div>
                                        </div>
                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="modelo"></label>
                                            <div id="_modelo" class="well padding-5"></div>
                                        </div>
                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="marca"></label>
                                            <div id="_marca" class="well padding-5"></div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="nro_serie"></label>
                                            <div id="_serie" class="well padding-5"></div>
                                        </div>
                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="cilindrada"></label>
                                            <div id="_cilindrada" class="well padding-5"></div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-12">
            <!-- Widget ID (each widget will need unique ID)-->
            <div class="jarviswidget jarviswidget-color-blueDark">
                <header role="heading">
                    <span class="widget-icon"> <i class="fa fa-bars txt-color-blueLight"></i> </span>		
                    <h2 class="tr-language" data-tr="varios"> </h2>
                </header>
                <!-- widget div-->
                <div role="content">
                    <!-- widget content -->
                    <div class="widget-body">

                        <div class="bv-form">

                            <fieldset class="col-md-4 form-horizontal">

                                <legend class="tr-language" data-tr="prueba_vacio_motor"></legend>
                                <div class="form-group">
                                    <label class="col-md-4 control-label tr-language" data-tr="ralenti"></label>
                                    <div class="col-md-4">
                                        <input class="form-control tr-language-ph" type="text" id="txt_ralentimotor" name="txt_ralentimotor" data-trph="inhg" maxlength="6">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="label"></label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-6 control-label"><a id="va_ralentimotor" class="tr-language" data-tr="video_noconformidad" target="_blank"></a></label>
                                </div>

                            </fieldset>

                            <fieldset class="col-md-8 form-horizontal">

                                <legend class="tr-language" data-tr="analisis_gases"></legend>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="col-md-4 control-label tr-language" data-tr="ralenti"></label>
                                        <div class="col-md-4">
                                            <input class="form-control tr-language-ph" type="text" id="txt_ralentianalisisgasesco" name="txt_ralentianalisisgasesco" data-trph="co" maxlength="6">
                                        </div>
                                        <div class="col-md-3">
                                            <label class="label"></label>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-md-4 control-label"></label>
                                        <div class="col-md-4">
                                            <input class="form-control tr-language-ph" type="text" id="txt_ralentianalisisgaseshc" name="txt_ralentianalisisgaseshc" data-trph="hc" maxlength="6">
                                        </div>
                                        <div class="col-md-3">
                                            <label class="label"></label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label"></label>
                                        <div class="col-md-4">
                                            <input class="form-control tr-language-ph" type="text" id="txt_ralentigasesco2" name="txt_ralentigasesco2" data-trph="co2" maxlength="6">
                                        </div>
                                        <div class="col-md-3">
                                            <label class="label"></label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label"></label>
                                        <div class="col-md-4">
                                            <input class="form-control tr-language-ph" type="text" id="txt_ralentianalisisgaseso2" name="txt_ralentianalisisgaseso2" data-trph="o2" maxlength="6">
                                        </div>
                                        <div class="col-md-3">
                                            <label class="label"></label>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-md-6 control-label"><a id="va_analisisgasesralenti" class="tr-language" data-tr="video_noconformidad" target="_blank"></a></label>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="col-md-4 control-label tr-language" data-tr="_2500_300_rpm"></label>
                                        <div class="col-md-4">
                                            <input class="form-control tr-language-ph" type="text" id="txt_analisisrpmco" name="txt_analisisrpmco" data-trph="co" maxlength="6">
                                        </div>
                                        <div class="col-md-3">
                                            <label class="label"></label>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-md-4 control-label"></label>
                                        <div class="col-md-4">
                                            <input class="form-control tr-language-ph" type="text" id="txt_analisisrpmhc" name="txt_analisisrpmhc" data-trph="hc" maxlength="6">
                                        </div>
                                        <div class="col-md-3">
                                            <label class="label"></label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label"></label>
                                        <div class="col-md-4">
                                            <input class="form-control tr-language-ph" type="text" id="txt_rpmco2" name="txt_rpmco2" data-trph="co2" maxlength="6">
                                        </div>
                                        <div class="col-md-3">
                                            <label class="label"></label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label"></label>
                                        <div class="col-md-4">
                                            <input class="form-control tr-language-ph" type="text" id="txt_analisisrpmo2" name="txt_analisisrpmo2" data-trph="o2" maxlength="6">
                                        </div>
                                        <div class="col-md-3">
                                            <label class="label"></label>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-md-6 control-label"><a id="va_analisisgasesrpm" class="tr-language" data-tr="video_noconformidad" target="_blank"></a></label>                                     
                                    </div>
                                </div>
                            </fieldset>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-6">
            <!-- Widget ID (each widget will need unique ID)-->
            <div class="jarviswidget jarviswidget-color-blueDark">
                <header role="heading">
                    <span class="widget-icon"> <i class="fa fa-list-alt txt-color-blueLight"></i> </span>		
                    <h2 class="tr-language" data-tr="sistema_refrigeracion"> </h2>
                </header>
                <!-- widget div-->
                <div role="content">
                    <!-- widget content -->
                    <div class="widget-body">

                        <div class="bv-form">

                            <fieldset>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-12 col-md-12 has-feedback">
                                            <label class="control-label tr-language" data-tr="sistema_refrigeracion_texto"></label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12 col-md-6 has-feedback">
                                            <label class="control-label"></label>
                                            <select class="chosen" name="lst_sistema_refrigeracion_texto" id="lst_sistema_refrigeracion_texto">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                        </div>

                    </div>
                </div>
            </div>
        </div>



        <div class="col-sm-6">
            <!-- Widget ID (each widget will need unique ID)-->
            <div class="jarviswidget jarviswidget-color-blueDark">
                <header role="heading">
                    <span class="widget-icon"> <i class="fa fa-eyedropper txt-color-blueLight"></i> </span>		
                    <h2 class="tr-language" data-tr="sistema_lubricacion"> </h2>
                </header>
                <!-- widget div-->
                <div role="content">
                    <!-- widget content -->
                    <div class="widget-body">

                        <div class="bv-form">

                            <fieldset>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-12 col-md-12 has-feedback">
                                            <label class="control-label tr-language" data-tr="sistema_lubricacion_texto"></label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label"></label>
                                            <select class="chosen" name="lst_sistema_lubricacion_texto" id="lst_sistema_lubricacion_texto">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-12">
            <!-- Widget ID (each widget will need unique ID)-->
            <div class="jarviswidget jarviswidget-color-blueDark">
                <header role="heading">
                    <span class="widget-icon"> <i class="fa fa-battery-half txt-color-blueLight"></i> </span>		
                    <h2 class="tr-language" data-tr="estado_carga_control"> </h2>
                </header>
                <!-- widget div-->
                <div role="content">
                    <!-- widget content -->
                    <div class="widget-body">

                        <div class="bv-form">

                            <fieldset class="col-md-6 form-horizontal">

                                <legend class="tr-language" data-tr="bateria"></legend>
                                <div class="form-group">
                                    <label class="col-md-4 control-label tr-language" data-tr="apagado"></label>
                                    <div class="col-md-3">
                                        <input class="form-control tr-language-ph" type="text" id="txt_apagado" name="txt_apagado" data-trph="voltios" maxlength="6">
                                    </div>
                                    <div class="col-md-5">
                                        <label class="label"></label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-4 control-label tr-language" data-tr="arranque"></label>
                                    <div class="col-md-3">
                                        <input class="form-control tr-language-ph" type="text" id="txt_arranque" name="txt_arranque" data-trph="voltios" maxlength="6">
                                    </div>
                                    <div class="col-md-5">
                                        <label class="label"></label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-4 control-label tr-language" data-tr="ralenti"></label>
                                    <div class="col-md-3">
                                        <input class="form-control tr-language-ph" type="text" id="txt_ralentibateria" name="txt_ralentibateria" data-trph="voltios" maxlength="6">
                                    </div>
                                    <div class="col-md-5">
                                        <label class="label"></label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-4 control-label tr-language" data-tr="2500_rpm"></label>
                                    <div class="col-md-3">
                                        <input class="form-control tr-language-ph" type="text" id="txt_2500rpm" name="txt_2500rpm" data-trph="voltios" maxlength="6">
                                    </div>
                                    <div class="col-md-5">
                                        <label class="label"></label>
                                    </div>
                                </div>

                            </fieldset>

                            <fieldset class="col-md-6">
                                <legend class="tr-language" data-tr="estado_bateria_otros"></legend>

                                <fieldset>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-12 col-md-12 has-feedback">
                                                <label class="control-label tr-language" data-tr="estado_carga_sistema_texto"></label>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-12 col-md-4 has-feedback">
                                                <label class="control-label"></label>
                                                <select class="chosen" name="lst_estado_carga_sistema_texto" id="lst_estado_carga_sistema_texto">
                                                    <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                    <option value="1" class="tr-language" data-tr="conforme"></option>
                                                    <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>

                            </fieldset>



                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-12">
            <!-- Widget ID (each widget will need unique ID)-->
            <div class="jarviswidget jarviswidget-color-blueDark">
                <header role="heading">
                    <span class="widget-icon"> <i class="fa fa-plug txt-color-blueLight"></i> </span>		
                    <h2 class="tr-language" data-tr="sistema_electronico_combustible"> </h2>
                </header>
                <!-- widget div-->
                <div role="content">
                    <!-- widget content -->
                    <div class="widget-body">

                        <div class="bv-form">

                            <fieldset class="col-md-12">

                                <!--<legend class="tr-language" data-tr="analisis_gases"></legend>-->

                                <div class="col-md-6 form-horizontal">
                                    <div class="form-group">
                                        <label class="col-md-5 control-label tr-language" data-tr="stftb1"></label>
                                        <div class="col-md-4">
                                            <input class="form-control tr-language-ph" type="text" id="txt_stftb1" name="txt_stftb1" data-trph="porcentaje_abr" maxlength="6">
                                        </div>
                                        <div class="col-md-3">
                                            <label class="label"></label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-7 control-label"><a id="va_stftb1" class="tr-language" data-tr="video_noconformidad" target="_blank"></a></label>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-5 control-label tr-language" data-tr="ltftb1"></label>
                                        <div class="col-md-4">
                                            <input class="form-control tr-language-ph" type="text" id="txt_ltftb1" name="txt_ltftb1" data-trph="porcentaje_abr" maxlength="6">
                                        </div>
                                        <div class="col-md-3">
                                            <label class="label"></label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-7 control-label"><a id="va_ltftb1" class="tr-language" data-tr="video_noconformidad" target="_blank"></a></label>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-5 control-label tr-language" data-tr="sensor_cmp"></label>
                                        <div class="col-md-4">
                                            <input class="form-control tr-language-ph" type="text" id="txt_sensor_cmp" name="txt_sensor_cmp" data-trph="voltios" maxlength="6">
                                        </div>
                                        <div class="col-md-3">
                                            <label class="label"></label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-5 control-label tr-language" data-tr="sensor_map"></label>
                                        <div class="col-md-4">
                                            <input class="form-control tr-language-ph" type="text" id="txt_sensor_map" name="txt_sensor_map" data-trph="voltios" maxlength="6">
                                        </div>
                                        <div class="col-md-3">
                                            <label class="label"></label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-5 control-label tr-language" data-tr="sensor_tps"></label>
                                        <div class="col-md-4">
                                            <input class="form-control tr-language-ph" type="text" id="txt_sensor_tps" name="txt_sensor_tps" data-trph="voltios" maxlength="6">
                                        </div>
                                        <div class="col-md-3">
                                            <label class="label"></label>
                                        </div>
                                    </div>


                                </div>

                                <div class="col-md-6">

                                    <fieldset>
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-sm-12 col-md-12 has-feedback">
                                                    <label class="control-label tr-language" data-tr="sistema_electronico_combustible_texto"></label>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12 col-md-4 has-feedback">
                                                    <label class="control-label"></label>
                                                    <select class="chosen" name="lst_sistema_electronico_combustible_texto" id="lst_sistema_electronico_combustible_texto">
                                                        <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                        <option value="1" class="tr-language" data-tr="conforme"></option>
                                                        <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>

                                </div>
                            </fieldset>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-6">
            <!-- Widget ID (each widget will need unique ID)-->
            <div class="jarviswidget jarviswidget-color-blueDark">
                <header role="heading">
                    <span class="widget-icon"> <i class="fa fa-power-off txt-color-blueLight"></i> </span>		
                    <h2 class="tr-language" data-tr="sistema_encendido"> </h2>
                </header>
                <!-- widget div-->
                <div role="content">
                    <!-- widget content -->
                    <div class="widget-body">

                        <div class="bv-form">

                            <fieldset>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-12 col-md-8 has-feedback">
                                            <label class="control-label tr-language" data-tr="tipo_sistema_encendido"></label>
                                            <span id="d_tisisencendido">
                                                <select class="chosen" name="lst_tiposistemaencendido" id="lst_tiposistemaencendido">
                                                    <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                </select>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-12 col-md-12 has-feedback">
                                            <label class="control-label tr-language" data-tr="sistema_encendido_texto"></label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12 col-md-8 has-feedback">
                                            <label class="control-label"></label>
                                            <select class="chosen" name="lst_sistema_encendido_texto" id="lst_sistema_encendido_texto">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-6">
            <!-- Widget ID (each widget will need unique ID)-->
            <div class="jarviswidget jarviswidget-color-blueDark">
                <header role="heading">
                    <span class="widget-icon"> <i class="fa fa-soundcloud txt-color-blueLight"></i> </span>		
                    <h2 class="tr-language" data-tr="estado_admision_aire"> </h2>
                </header>
                <!-- widget div-->
                <div role="content">
                    <!-- widget content -->
                    <div class="widget-body">

                        <div class="bv-form">

                            <fieldset>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-12 col-md-12 has-feedback">
                                            <label class="control-label tr-language" data-tr="estado_admision_aire_texto"></label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label"></label>
                                            <select class="chosen" name="lst_estado_admision_aire_texto" id="lst_estado_admision_aire_texto">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                        </div>
                    </div>
                </div>
            </div>
        </div>        
        <div class="clearfix"></div>
        <div class="col-sm-6">
            <!-- Widget ID (each widget will need unique ID)-->
            <div class="jarviswidget jarviswidget-color-blueDark">
                <header role="heading">
                    <span class="widget-icon"> <i class="fa fa-thermometer-empty txt-color-blueLight"></i> </span>		
                    <h2 class="tr-language" data-tr="prueba_compresion_motor"> </h2>
                </header>
                <!-- widget div-->
                <div role="content">
                    <!-- widget content -->
                    <div class="widget-body">

                        <div class="bv-form">

                            <fieldset class="col-md-12 form-horizontal">

                                <div class="form-group">
                                    <label class="col-md-4 control-label tr-language" data-tr="ciclindro1"></label>
                                    <div class="col-md-3">
                                        <input class="form-control tr-language-ph" type="text" id="txt_ciclindro1" name="txt_ciclindro1" data-trph="psi" maxlength="6">
                                    </div>
                                    <div class="col-md-5">
                                        <label class="label"></label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-4 control-label tr-language" data-tr="ciclindro2"></label>
                                    <div class="col-md-3">
                                        <input class="form-control tr-language-ph" type="text" id="txt_ciclindro2" name="txt_ciclindro2" data-trph="psi" maxlength="6">
                                    </div>
                                    <div class="col-md-5">
                                        <label class="label"></label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-4 control-label tr-language" data-tr="ciclindro3"></label>
                                    <div class="col-md-3">
                                        <input class="form-control tr-language-ph" type="text" id="txt_ciclindro3" name="txt_ciclindro3" data-trph="psi" maxlength="6">
                                    </div>
                                    <div class="col-md-5">
                                        <label class="label"></label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-4 control-label tr-language" data-tr="ciclindro4"></label>
                                    <div class="col-md-3">
                                        <input class="form-control tr-language-ph" type="text" id="txt_ciclindro4" name="txt_ciclindro4" data-trph="psi" maxlength="6">
                                    </div>
                                    <div class="col-md-5">
                                        <label class="label"></label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-6 control-label"><a id="va_cilindros" class="tr-language" data-tr="video_noconformidad" target="_blank"></a></label>
                                </div>


                            </fieldset>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-6">
            <!-- Widget ID (each widget will need unique ID)-->
            <div class="jarviswidget jarviswidget-color-blueDark">
                <header role="heading">
                    <span class="widget-icon"> <i class="fa fa-binoculars txt-color-blueLight"></i> </span>		
                    <h2 class="tr-language" data-tr="inspecciones_visuales"> </h2>
                </header>
                <!-- widget div-->
                <div role="content">
                    <!-- widget content -->
                    <div class="widget-body">

                        <div class="bv-form">

                            <fieldset>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-12 col-md-12 has-feedback">
                                            <label class="control-label tr-language" data-tr="inspecciones_visuales_texto"></label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label"></label>
                                            <select class="chosen" name="lst_inspecciones_visuales_texto" id="lst_inspecciones_visuales_texto">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>

                                    </div>
                                </div>
                            </fieldset>

                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="clearfix"></div>

        <div class="form-actions">
            <div class="row">
                <div class="col-md-12">
                    <span id="actions_prec" class="btn-toolbar"></span>
                </div>
            </div>
        </div>

        <js>
            $.validate({
            ignore: [],
                rules: {
                    txt_ralentimotor: {
                        required: true,
                        number: true
                    },
                    txt_ralentianalisisgasesco: {
                        required: true,
                        number: true
                    },
                    txt_ralentianalisisgaseshc:{
                        required: true,
                        number: true
                    },
                    txt_ralentigasesco2: {
                        required: true,
                        number: true
                    },
                    txt_ralentianalisisgaseso2: {
                        required: true,
                        number: true
                    },
                    txt_analisisrpmco: {
                        required: true,
                        number: true
                    },
                    txt_analisisrpmhc: {
                        required: true,
                        number: true
                    },
                    txt_rpmco2: {
                        required: true,
                        number: true
                    },
                    txt_analisisrpmo2: {
                        required: true,
                        number: true
                    },
                    lst_sistema_refrigeracion_texto: {
                        required: true
                    },
                    lst_sistema_lubricacion_texto: {
                        required: true
                    },
                    txt_apagado:{
                        required: true,
                        number: true
                    },
                    txt_arranque:{
                        required: true,
                        number: true
                    },
                    txt_ralentibateria:{
                        required: true,
                        number: true
                    },
                    txt_2500rpm:{
                        required: true,
                        number: true
                    },
                    lst_estado_carga_sistema_texto:{
                        required: true
                    },
                    txt_stftb1: {
                        required: true,
                        number: true
                    },
                    txt_sensor_cmp: {
                        required: true,
                        number: true
                    },
                    txt_sensor_map: {
                        required: true,
                        number: true
                    },
                    txt_sensor_tps: {
                        required: true,
                        number: true
                    },
                    txt_ltftb1: {
                        required: true,
                        number: true
                    },
                    lst_sistema_electronico_combustible_texto: {
                        required: true
                    },
                    lst_sistema_encendido_texto: {
                        required: true
                    },
                    lst_estado_admision_aire_texto: {
                        required: true
                    },
                    txt_ciclindro1: {
                        required: true,
                        number: true
                    },
                    txt_ciclindro2: {
                        required: true,
                        number: true
                    },
                    txt_ciclindro3: {
                        required: true,
                        number: true
                    },
                    txt_ciclindro4: {
                        required: true,
                        number: true
                    },
                    lst_inspecciones_visuales_texto:{
                        required: true
                    },
                    lst_tiposistemaencendido:{
                        required: true
                    }
                },
                errorPlacement: function (error, element) {
                    error.insertAfter(element.parent());
                },
                submitHandler: function () {
                    Obj.Registro.VehiculoAx.postNewPreconversion(__PK__);
                }
            });
        </js>
    </form>
</div>

