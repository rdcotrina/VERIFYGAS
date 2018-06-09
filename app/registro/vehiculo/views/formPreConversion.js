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
                    <!-- widget edit box -->
                    <div class="jarviswidget-editbox">
                        <!-- This area used as dropdown edit box -->
                        <input class="form-control" type="text">
                    </div>
                    <!-- end widget edit box -->
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
                    <!-- widget edit box -->
                    <div class="jarviswidget-editbox">
                        <!-- This area used as dropdown edit box -->
                        <input class="form-control" type="text">
                    </div>
                    <!-- end widget edit box -->
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
                    <span class="widget-icon"> <i class="fa fa-binoculars txt-color-blueLight"></i> </span>		
                    <h2 class="tr-language" data-tr="inspecciones_visuales"> </h2>
                </header>
                <!-- widget div-->
                <div role="content">
                    <!-- widget edit box -->
                    <div class="jarviswidget-editbox">
                        <!-- This area used as dropdown edit box -->
                        <input class="form-control" type="text">
                    </div>
                    <!-- end widget edit box -->
                    <!-- widget content -->
                    <div class="widget-body">

                        <div class="bv-form">

                            <fieldset>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="estado_chasis"></label>
                                            <select class="chosen" name="lst_estadochasis" id="lst_estadochasis">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>

                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="piso_vehiculo"></label>
                                            <select class="chosen" name="lst_pisovehiculo" id="lst_pisovehiculo">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>

                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="carroceria"></label>
                                            <select class="chosen" name="lst_carroceria" id="lst_carroceria">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>

                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="instalacion_segura"></label>
                                            <select class="chosen" name="lst_estadochasis" id="lst_estadochasis">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="e_si"></option>
                                                <option value="0" class="tr-language" data-tr="e_no"></option>
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
            <div class="alert alert-info text-center">
                <code class="tr-language" data-tr="pruebas_pre1"></code>
                <div class="tr-language" data-tr="pruebas_pre2"></div>

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
                    <!-- widget edit box -->
                    <div class="jarviswidget-editbox">
                        <!-- This area used as dropdown edit box -->
                        <input class="form-control" type="text">
                    </div>
                    <!-- end widget edit box -->
                    <!-- widget content -->
                    <div class="widget-body">

                        <div class="bv-form">

                            <fieldset class="col-md-6 form-horizontal">

                                <legend class="tr-language" data-tr="bateria"></legend>
                                <div class="form-group">
                                    <label class="col-md-2 control-label tr-language" data-tr="apagado"></label>
                                    <div class="col-md-3">
                                        <input class="form-control tr-language-ph" type="text" id="txt_apagado" name="txt_apagado" data-trph="voltios" maxlength="6">
                                    </div>
                                    <div class="col-md-1">
                                        <i id="help_apagado_btvl" class="fa fa-question-circle" ></i>
                                    </div>
                                    <div class="col-md-5">
                                        <label class="label"></label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label tr-language" data-tr="arranque"></label>
                                    <div class="col-md-3">
                                        <input class="form-control tr-language-ph" type="text" id="txt_arranque" name="txt_arranque" data-trph="voltios" maxlength="6">
                                    </div>
                                    <div class="col-md-1">
                                        <i id="help_arranque_btvl" class="fa fa-question-circle"></i>
                                    </div>
                                    <div class="col-md-5">
                                        <label class="label"></label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label tr-language" data-tr="encendido"></label>
                                    <div class="col-md-3">
                                        <input class="form-control tr-language-ph" type="text" id="txt_encendido" name="txt_encendido" data-trph="voltios" maxlength="6">
                                    </div>
                                    <div class="col-md-1">
                                        <i id="help_encendido_btvl" class="fa fa-question-circle"></i>
                                    </div>
                                    <div class="col-md-5">
                                        <label class="label"></label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label tr-language" data-tr="2500_rpm"></label>
                                    <div class="col-md-3">
                                        <input class="form-control tr-language-ph" type="text" id="txt_2500rpm" name="txt_2500rpm" data-trph="voltios" maxlength="6">
                                    </div>
                                    <div class="col-md-1">
                                        <i id="help_2500rpm_btvl" class="fa fa-question-circle"></i>
                                    </div>
                                    <div class="col-md-5">
                                        <label class="label"></label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label tr-language" data-tr="masa_mv"></label>
                                    <div class="col-md-5">
                                        <select class="chosen" name="lst_masamv" id="lst_masamv">
                                            <option value="" class="tr-language" data-tr="seleccionar"></option>
                                            <option value="1" class="tr-language" data-tr="conforme"></option>
                                            <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label tr-language" data-tr="motor"></label>
                                    <div class="col-md-5">
                                        <select class="chosen" name="lst_motor" id="lst_motor">
                                            <option value="" class="tr-language" data-tr="seleccionar"></option>
                                            <option value="1" class="tr-language" data-tr="conforme"></option>
                                            <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label tr-language" data-tr="chasis"></label>
                                    <div class="col-md-5">
                                        <select class="chosen" name="lst_chasis" id="lst_chasis">
                                            <option value="" class="tr-language" data-tr="seleccionar"></option>
                                            <option value="1" class="tr-language" data-tr="conforme"></option>
                                            <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                        </select>
                                    </div>
                                </div>

                            </fieldset>

                            <fieldset class="col-md-6 form-horizontal">
                                <legend class="tr-language" data-tr="estado_bateria"></legend>

                                <div class="form-group">
                                    <label class="col-md-5 control-label tr-language" data-tr="botones"></label>
                                    <div class="col-md-5">
                                        <select class="chosen" name="lst_botones" id="lst_botones">
                                            <option value="" class="tr-language" data-tr="seleccionar"></option>
                                            <option value="1" class="tr-language" data-tr="conforme"></option>
                                            <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-5 control-label tr-language" data-tr="anclaje"></label>
                                    <div class="col-md-5">
                                        <select class="chosen" name="lst_anclaje" id="lst_anclaje">
                                            <option value="" class="tr-language" data-tr="seleccionar"></option>
                                            <option value="1" class="tr-language" data-tr="conforme"></option>
                                            <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-5 control-label tr-language" data-tr="nivel_electrolito"></label>
                                    <div class="col-md-5">
                                        <select class="chosen" name="lst_electrolito" id="lst_electrolito">
                                            <option value="" class="tr-language" data-tr="seleccionar"></option>
                                            <option value="1" class="tr-language" data-tr="conforme"></option>
                                            <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                        </select>
                                    </div>
                                </div>

                            </fieldset>
                            <fieldset class="col-md-6 form-horizontal">
                                <legend></legend>
                                <div class="form-group">
                                    <label class="col-md-5 control-label tr-language" data-tr="estado_motor_arranque"></label>
                                    <div class="col-md-5">
                                        <select class="chosen" name="lst_estadomotorarranque" id="lst_estadomotorarranque">
                                            <option value="" class="tr-language" data-tr="seleccionar"></option>
                                            <option value="1" class="tr-language" data-tr="conforme"></option>
                                            <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                        </select>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset class="col-md-6 form-horizontal">
                                <legend class="tr-language" data-tr="estado_sistema_carga"></legend>

                                <div class="form-group">
                                    <label class="col-md-5 control-label tr-language" data-tr="alternador"></label>
                                    <div class="col-md-5">
                                        <select class="chosen" name="lst_alternador" id="lst_alternador">
                                            <option value="" class="tr-language" data-tr="seleccionar"></option>
                                            <option value="1" class="tr-language" data-tr="conforme"></option>
                                            <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-5 control-label tr-language" data-tr="correas_alternador"></label>
                                    <div class="col-md-5">
                                        <select class="chosen" name="lst_correasalternador" id="lst_correasalternador">
                                            <option value="" class="tr-language" data-tr="seleccionar"></option>
                                            <option value="1" class="tr-language" data-tr="conforme"></option>
                                            <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                        </select>
                                    </div>
                                </div>

                            </fieldset>
                            <fieldset class="col-md-12 smart-form">
                                <section>
                                    <label class="label tr-language" data-tr="observaciones"></label>
                                    <label class="textarea">
                                        <textarea id="txt_observaciones_estadocarga" name="txt_observaciones_estadocarga"></textarea>
                                    </label>
                                </section>
                            </fieldset>

                        </div>

                    </div>
                </div>
            </div>
        </div>
<!--PENDIENTE-->
        <div class="col-sm-12">
            <!-- Widget ID (each widget will need unique ID)-->
            <div class="jarviswidget jarviswidget-color-blueDark">
                <header role="heading">
                    <span class="widget-icon"> <i class="fa fa-power-off txt-color-blueLight"></i> </span>		
                    <h2 class="tr-language" data-tr="verificacion_sistema_encendido"> </h2>
                </header>
                <!-- widget div-->
                <div role="content">
                    <!-- widget edit box -->
                    <div class="jarviswidget-editbox">
                        <!-- This area used as dropdown edit box -->
                        <input class="form-control" type="text">
                    </div>
                    <!-- end widget edit box -->
                    <!-- widget content -->
                    <div class="widget-body">

                        <div class="bv-form">

                            <fieldset class="col-md-12 form-horizontal">
                                <div class="form-group">
                                    <label class="col-md-4 control-label tr-language" data-tr="tipo_sistema_encendido"></label>
                                    <div class="col-md-2" id="d_tisisencendido">
                                        <select class="chosen" name="lst_tiposistemaencendido" id="lst_tiposistemaencendido">
                                            <option value="" class="tr-language" data-tr="seleccionar"></option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-4 control-label tr-language" data-tr="estado_conexiones_bobina"></label>
                                    <div class="col-md-2" id="d_tisisencendido">
                                        <select class="chosen" name="lst_estadobobina" id="lst_estadobobina">
                                            <option value="" class="tr-language" data-tr="seleccionar"></option>
                                            <option value="1" class="tr-language" data-tr="conforme"></option>
                                            <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                        </select>
                                    </div>
                                </div>
                            </fieldset>

                        </div>
                    </div>
                </div>
            </div>
        </div>
<!--PENDIENTE-->

        <div class="col-sm-12">
            <!-- Widget ID (each widget will need unique ID)-->
            <div class="jarviswidget jarviswidget-color-blueDark">
                <header role="heading">
                    <span class="widget-icon"> <i class="fa fa-soundcloud txt-color-blueLight"></i> </span>		
                    <h2 class="tr-language" data-tr="verificacion_admision_aire"> </h2>
                </header>
                <!-- widget div-->
                <div role="content">
                    <!-- widget edit box -->
                    <div class="jarviswidget-editbox">
                        <!-- This area used as dropdown edit box -->
                        <input class="form-control" type="text">
                    </div>
                    <!-- end widget edit box -->
                    <!-- widget content -->
                    <div class="widget-body">

                        <div class="bv-form">

                            <fieldset>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="estado_carcasa"></label>
                                            <select class="chosen" name="lst_estadocarcasa" id="lst_estadocarcasa">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>

                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="manguera_conexion_aceleracion"></label>
                                            <select class="chosen" name="lst_estadomanguera" id="lst_estadomanguera">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>

                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="estado_filtro"></label>
                                            <select class="chosen" name="lst_estadofiltro" id="lst_estadofiltro">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>

                                    </div>
                                </div>
                            </fieldset>

                            <fieldset class="col-md-12 smart-form">
                                <section>
                                    <label class="label tr-language" data-tr="observaciones"></label>
                                    <label class="textarea">
                                        <textarea id="txt_observaciones_admisionaire" name="txt_observaciones_admisionaire"></textarea>
                                    </label>
                                </section>
                            </fieldset>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        
        
        <div class="clearfix"></div>
    </form>
</div>

