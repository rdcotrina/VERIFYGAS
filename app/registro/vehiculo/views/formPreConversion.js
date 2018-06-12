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
                    <span class="widget-icon"> <i class="fa fa-bars txt-color-blueLight"></i> </span>		
                    <h2 class="tr-language" data-tr="varios"> </h2>
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
                                    <label class="col-md-4 control-label tr-language" data-tr="video_noconformidad"></label>
                                    <div class="col-md-6">
                                        <input class="form-control" type="file" id="file_videovaciomotorralenti" name="file_videovaciomotorralenti">
                                    </div>
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
                                        <label class="col-md-4 control-label tr-language" data-tr="video_noconformidad"></label>
                                        <div class="col-md-6">
                                            <input class="form-control" type="file" id="file_videovralentianalisisgases" name="file_videovralentianalisisgases">
                                        </div>
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
                                        <label class="col-md-4 control-label tr-language" data-tr="video_noconformidad"></label>
                                        <div class="col-md-6">
                                            <input class="form-control" type="file" id="file_videovrpmanalisisgases" name="file_videovrpmanalisisgases">
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
                    <span class="widget-icon"> <i class="fa fa-list-alt txt-color-blueLight"></i> </span>		
                    <h2 class="tr-language" data-tr="sistema_refrigeracion"> </h2>
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
                                            <label class="control-label tr-language" data-tr="existe_fugas_radiador"></label>
                                            <select class="chosen" name="lst_fugasradiador" id="lst_fugasradiador">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>

                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="existe_fugas_mangueras"></label>
                                            <select class="chosen" name="lst_fugasmanguera" id="lst_fugasmanguera">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>

                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="indicador_temperatura_panel"></label>
                                            <select class="chosen" name="lst_temperatura_panel" id="lst_temperatura_panel">
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
                                            <label class="control-label tr-language" data-tr="ciclado_electroventilador"></label>
                                            <select class="chosen" name="lst_electroventilador" id="lst_electroventilador">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>

                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="nivel_refrigerante_motor"></label>
                                            <select class="chosen" name="lst_nivelrefrigerantemotor" id="lst_nivelrefrigerantemotor">
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
                    <span class="widget-icon"> <i class="fa fa-eyedropper txt-color-blueLight"></i> </span>		
                    <h2 class="tr-language" data-tr="sistema_lubricacion"> </h2>
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
                                            <label class="control-label tr-language" data-tr="fuga_aceite_sellos"></label>
                                            <select class="chosen" name="lst_fugaaceitesello" id="lst_fugaaceitesello">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>
                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="fuga_aceite_carter"></label>
                                            <select class="chosen" name="lst_fugaaceitecarter" id="lst_fugaaceitecarter">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>
                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="fuga_aceite_valvulas"></label>
                                            <select class="chosen" name="lst_fugaaceitevalvula" id="lst_fugaaceitevalvula">
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
                                            <label class="control-label tr-language" data-tr="estado_nivel_aceite"></label>
                                            <select class="chosen" name="lst_estadonivelaceite" id="lst_estadonivelaceite">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>
                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="nivel_aceite_motor"></label>
                                            <select class="chosen" name="lst_fnivelaceitemotor" id="lst_fnivelaceitemotor">
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
                                <div class="form-group">
                                    <label class="col-md-4 control-label tr-language" data-tr="masa_motor"></label>
                                    <div class="col-md-5">
                                        <select class="chosen" name="lst_masa_motor" id="lst_masa_motor">
                                            <option value="" class="tr-language" data-tr="seleccionar"></option>
                                            <option value="1" class="tr-language" data-tr="conforme"></option>
                                            <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-4 control-label tr-language" data-tr="masa_chasis"></label>
                                    <div class="col-md-5">
                                        <select class="chosen" name="lst_masa_chasis" id="lst_masa_chasis">
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

                                <!--<legend class="tr-language" data-tr="analisis_gases"></legend>-->

                                <div class="col-md-6">
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
                                        <label class="col-md-5 control-label tr-language" data-tr="video_noconformidad"></label>
                                        <div class="col-md-6">
                                            <input class="form-control" type="file" id="file_videostftb1" name="file_videostftb1">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-md-5 control-label tr-language" data-tr="valvula_egr"></label>
                                        <div class="col-md-7">
                                            <select class="chosen" name="lst_valvula_egr" id="lst_valvula_egr">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-5 control-label tr-language" data-tr="valvula_iac"></label>
                                        <div class="col-md-7">
                                            <select class="chosen" name="lst_valvula_iac" id="lst_valvula_iac">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-5 control-label tr-language" data-tr="sensor_thwect"></label>
                                        <div class="col-md-7">
                                            <select class="chosen" name="lst_sensor_thwect" id="lst_sensor_thwect">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-5 control-label tr-language" data-tr="sensor_presion"></label>
                                        <div class="col-md-7">
                                            <select class="chosen" name="lst_sensor_presion" id="lst_sensor_presion">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>
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
                                        <label class="col-md-5 control-label tr-language" data-tr="motor_ralenti_map"></label>
                                        <div class="col-md-7">
                                            <select class="chosen" name="lst_motor_ralenti_map" id="lst_motor_ralenti_map">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
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
                                    <div class="form-group">
                                        <label class="col-md-5 control-label tr-language" data-tr="ancho_puelo_inyectores"></label>
                                        <div class="col-md-7">
                                            <select class="chosen" name="lst_ancho_puelo_inyectores" id="lst_ancho_puelo_inyectores">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>
                                    </div>

                                </div>

                                <div class="col-md-6">

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
                                        <label class="col-md-5 control-label tr-language" data-tr="video_noconformidad"></label>
                                        <div class="col-md-7">
                                            <input class="form-control" type="file" id="file_videoltftb1" name="file_videoltftb1">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-md-5 control-label tr-language" data-tr="codigo_falla"></label>
                                        <div class="col-md-7">
                                            <select class="chosen" name="lst_codigo_falla" id="lst_codigo_falla">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-5 control-label tr-language" data-tr="sensor_iat"></label>
                                        <div class="col-md-7">
                                            <select class="chosen" name="lst_sensor_iat" id="lst_sensor_iat">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-5 control-label tr-language" data-tr="ignition_voltage"></label>
                                        <div class="col-md-7">
                                            <select class="chosen" name="lst_ignition_voltage" id="lst_ignition_voltage">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-5 control-label tr-language" data-tr="sensor_ckp"></label>
                                        <div class="col-md-7">
                                            <select class="chosen" name="lst_sensor_ckp" id="lst_sensor_ckp">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-5 control-label tr-language" data-tr="sensor_o2_s1b1"></label>
                                        <div class="col-md-7">
                                            <select class="chosen" name="lst_sensor_o2_s1b1" id="lst_sensor_o2_s1b1">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-5 control-label tr-language" data-tr="sensor_o2_s1b2"></label>
                                        <div class="col-md-7">
                                            <select class="chosen" name="lst_sensor_o2_s1b2" id="lst_sensor_o2_s1b2">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-5 control-label tr-language" data-tr="angulo_avance_ralenti"></label>
                                        <div class="col-md-7">
                                            <select class="chosen" name="lst_angulo_avance_ralenti" id="lst_angulo_avance_ralenti">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-5 control-label tr-language" data-tr="angulo_avance_2500_rpm"></label>
                                        <div class="col-md-7">
                                            <select class="chosen" name="lst_angulo_avance_2500_rpm" id="lst_angulo_avance_2500_rpm">
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
                    <span class="widget-icon"> <i class="fa fa-power-off txt-color-blueLight"></i> </span>		
                    <h2 class="tr-language" data-tr="sistema_encendido"> </h2>
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
                                            <label class="control-label tr-language" data-tr="tipo_sistema_encendido"></label>
                                            <span id="d_tisisencendido">
                                                <select class="chosen" name="lst_tiposistemaencendido" id="lst_tiposistemaencendido">
                                                    <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                </select>
                                            </span>
                                        </div>

                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="resistencia_interna_bujias"></label>
                                            <select class="chosen" name="lst_resistencia_interna_bujias" id="lst_resistencia_interna_bujias">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>

                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="codigo_bujias"></label>
                                            <select class="chosen" name="lst_codigo_bujias" id="lst_codigo_bujias">
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
                    <span class="widget-icon"> <i class="fa fa-soundcloud txt-color-blueLight"></i> </span>		
                    <h2 class="tr-language" data-tr="estado_admision_aire"> </h2>
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
                                            <label class="control-label tr-language" data-tr="estado_aire_despues_sensor"></label>
                                            <select class="chosen" name="lst_estado_aire_despues_sensor" id="lst_estado_aire_despues_sensor">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>

                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="estado_filtro_aire"></label>
                                            <select class="chosen" name="lst_estado_filtro_aire" id="lst_estado_filtro_aire">
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
                                            <label class="control-label tr-language" data-tr="condiciones_chasis"></label>
                                            <select class="chosen" name="lst_condiciones_chasis" id="lst_condiciones_chasis">
                                                <option value="" class="tr-language" data-tr="seleccionar"></option>
                                                <option value="1" class="tr-language" data-tr="conforme"></option>
                                                <option value="0" class="tr-language" data-tr="no_conforme"></option>
                                            </select>
                                        </div>

                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="estado_amortiguadores_trasetros"></label>
                                            <select class="chosen" name="lst_estado_amortiguadores_trasetros" id="lst_estado_amortiguadores_trasetros">
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
                    <span class="widget-icon"> <i class="fa fa-thermometer-empty txt-color-blueLight"></i> </span>		
                    <h2 class="tr-language" data-tr="prueba_compresion_motor"> </h2>
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
                                    <label class="col-md-4 control-label tr-language" data-tr="video_noconformidad"></label>
                                    <div class="col-md-8">
                                        <input class="form-control" type="file" id="file_videocilindro" name="file_videocilindro">
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
                    file_videovaciomotorralenti: {
                        required: true
                    },
                    file_videovralentianalisisgases: {
                        required: true
                    },
                    file_videovrpmanalisisgases: {
                        required: true
                    },
                    lst_fugasradiador: {
                        required: true
                    },
                    lst_fugasmanguera: {
                        required: true
                    },
                    lst_temperatura_panel: {
                        required: true
                    },
                    lst_electroventilador: {
                        required: true
                    },
                    lst_nivelrefrigerantemotor: {
                        required: true
                    },
                    lst_fugaaceitesello: {
                        required: true
                    },
                    lst_fugaaceitecarter: {
                        required: true
                    },
                    lst_fugaaceitevalvula: {
                        required: true
                    },
                    lst_estadonivelaceite:{
                        required: true
                    },
                    lst_fnivelaceitemotor:{
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
                    lst_masa_motor:{
                        required: true
                    },
                    lst_masa_chasis:{
                        required: true
                    },
                    lst_botones:{
                        required: true
                    },
                    lst_anclaje:{
                        required: true
                    },
                    lst_electrolito:{
                        required: true
                    },
                    lst_estadomotorarranque:{
                        required: true
                    },
                    lst_alternador:{
                        required: true
                    },
                    lst_correasalternador: {
                        required: true
                    },
                    txt_stftb1: {
                        required: true,
                        number: true
                    },
                    file_videostftb1: {
                        required: true
                    },
                    lst_valvula_egr: {
                        required: true
                    },
                    lst_valvula_iac: {
                        required: true
                    },
                    lst_sensor_thwect: {
                        required: true
                    },
                    lst_sensor_presion: {
                        required: true
                    },
                    txt_sensor_cmp: {
                        required: true,
                        number: true
                    },
                    txt_sensor_map: {
                        required: true,
                        number: true
                    },
                    lst_motor_ralenti_map: {
                        required: true
                    },
                    txt_sensor_tps: {
                        required: true,
                        number: true
                    },
                    lst_ancho_puelo_inyectores: {
                        required: true
                    },
                    txt_ltftb1: {
                        required: true,
                        number: true
                    },
                    file_videoltftb1: {
                        required: true
                    },
                    lst_codigo_falla: {
                        required: true
                    },
                    lst_sensor_iat: {
                        required: true
                    },
                    lst_ignition_voltage: {
                        required: true
                    },
                    lst_sensor_ckp: {
                        required: true
                    },
                    lst_sensor_o2_s1b1: {
                        required: true
                    },
                    lst_sensor_o2_s1b2: {
                        required: true
                    },
                    lst_angulo_avance_ralenti: {
                        required: true
                    },
                    lst_angulo_avance_2500_rpm: {
                        required: true
                    },
                    lst_tiposistemaencendido: {
                        required: true
                    },
                    lst_resistencia_interna_bujias: {
                        required: true
                    },
                    lst_codigo_bujias: {
                        required: true
                    },
                    lst_estado_aire_despues_sensor: {
                        required: true
                    },
                    lst_estado_filtro_aire: {
                        required: true
                    },
                    lst_condiciones_chasis: {
                        required: true
                    },
                    lst_estado_amortiguadores_trasetros: {
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
                    file_videocilindro: {
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

