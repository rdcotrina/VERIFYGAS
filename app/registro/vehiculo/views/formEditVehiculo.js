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
                                        <div class="col-sm-12 col-md-6 has-feedback">
                                            <label class="control-label tr-language" data-tr="primer_nombre"></label>
                                            <input type="text" class="form-control" name="txt_primernombre" id="txt_primernombre">
                                        </div>

                                        <div class="col-sm-12 col-md-6 has-feedback">
                                            <label class="control-label tr-language" data-tr="segundo_nombre"></label>
                                            <input type="text" class="form-control" name="txt_segundonombre" id="txt_segundonombre">
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-12 col-md-6 has-feedback">
                                            <label class="control-label tr-language" data-tr="apellido_paterno"></label>
                                            <input type="text" class="form-control" name="txt_apellidopaterno" id="txt_apellidopaterno">
                                        </div>

                                        <div class="col-sm-12 col-md-6 has-feedback">
                                            <label class="control-label tr-language" data-tr="apellido_materno"></label>
                                            <input type="text" class="form-control" name="txt_apellidomaterno" id="txt_apellidomaterno">
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            
                            <fieldset>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-12 col-md-6 has-feedback">
                                            <label class="control-label tr-language" data-tr="pais"></label>
                                            <span id="d_pais">
                                                <select id="lst_pais" name="lst_pais"></select>
                                            </span>
                                        </div>

                                        <div class="col-sm-12 col-md-6 has-feedback">
                                            <label class="control-label tr-language" data-tr="estado_civil"></label>
                                            <span id="d_estadocivil"></span>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            
                            <fieldset>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-12 col-md-6 has-feedback">
                                            <label class="control-label tr-language" data-tr="tipo_doc"></label>
                                            <span id="d_tipodocumentoidentidad">
                                                <select id="lst_tipodocumentoidentidad" name="lst_tipodocumentoidentidad"></select>
                                            </span>
                                        </div>

                                        <div class="col-sm-12 col-md-6 has-feedback">
                                            <label class="control-label tr-language" data-tr="nro_documento_identidad"></label>
                                            <input type="text" class="form-control" name="txt_nrodocidentidad" id="txt_nrodocidentidad">
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            
                            <fieldset>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-12 col-md-6 has-feedback">
                                            <label class="control-label tr-language" data-tr="img_doc_identidad"></label>
                                            <input type="file" class="form-control" name="file_docidentidad" id="file_docidentidad">
                                        </div>
                                        
                                        <div class="col-sm-12 col-md-6 has-feedback">
                                            <label class="control-label tr-language" data-tr="img_licencia_conducir"></label>
                                            <input type="file" class="form-control" name="file_licenciaconducir" id="file_licenciaconducir">
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            
                            <fieldset>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-12 col-md-6 has-feedback">
                                            <label class="control-label tr-language" data-tr="telefono_casa"></label>
                                            <input type="text" class="form-control" name="txt_telefonocasa" id="txt_telefonocasa">
                                        </div>

                                        <div class="col-sm-12 col-md-6 has-feedback">
                                            <label class="control-label tr-language" data-tr="telefono_trabajo"></label>
                                            <input type="text" class="form-control" name="txt_telefonotrabajo" id="txt_telefonotrabajo">
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            
                            <fieldset>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-12 col-md-6 has-feedback">
                                            <label class="control-label tr-language" data-tr="celular"></label>
                                            <input type="text" class="form-control" name="txt_celular" id="txt_celular">
                                        </div>
                                        
                                        <!-- -->
                                    </div>
                                </div>
                            </fieldset>
                                                         
                            <fieldset>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-12 col-md-12 has-feedback">
                                            <label class="control-label tr-language" data-tr="direccion_domicilio"></label>
                                            <textarea class="form-control" name="txt_direcciondomicilio" id="txt_direcciondomicilio"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            
                            <fieldset>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-12 col-md-12 has-feedback">
                                            <label class="control-label tr-language" data-tr="direccion_trabajo"></label>
                                            <textarea class="form-control" name="txt_direcciontrabajo" id="txt_direcciontrabajo"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            
                            <fieldset>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-12 col-md-12 has-feedback">
                                        <label class="control-label"><span class="tr-language" data-tr="consentimiento"></span> <a href="files/consentimiento.docx" class="tr-language" data-tr="aqui"></a></label>
                                            <input type="file" class="form-control" name="file_consentimiento" id="file_consentimiento">
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                        </div>

                    </div>
                    <!-- end widget content -->
                </div>
                <!-- end widget div -->
            </div>
            <!-- end widget -->
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
                                        <div class="col-sm-12 col-md-6 has-feedback">
                                            <label class="control-label tr-language" data-tr="tarjeta_propiedad"></label>
                                            <input type="text" class="form-control" name="txt_tarjetapropiedad" id="txt_tarjetapropiedad">
                                        </div>

                                        <div class="col-sm-12 col-md-6 has-feedback">
                                            <label class="control-label tr-language" data-tr="placa"></label>
                                            <input type="text" class="form-control" name="txt_placa" id="txt_placa">
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            
                            <fieldset>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-12 col-md-6 has-feedback">
                                            <label class="control-label tr-language" data-tr="marca"></label>
                                            <input type="text" class="form-control" name="txt_marca" id="txt_marca">
                                        </div>

                                        <div class="col-sm-12 col-md-6 has-feedback">
                                            <label class="control-label tr-language" data-tr="modelo"></label>
                                            <input type="text" class="form-control" name="txt_modelo" id="txt_modelo">
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            
                            <fieldset>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-12 col-md-6 has-feedback">
                                            <label class="control-label tr-language" data-tr="nro_motor"></label>
                                            <input type="text" class="form-control" name="txt_nromotor" id="txt_nromotor">
                                        </div>

                                        <div class="col-sm-12 col-md-6 has-feedback">
                                            <label class="control-label tr-language" data-tr="nro_serie"></label>
                                            <input type="text" class="form-control" name="txt_serie" id="txt_serie">
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            
                            <fieldset>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-12 col-md-6 has-feedback">
                                            <label class="control-label tr-language" data-tr="anio_fabricacion"></label>
                                            <input type="text" class="form-control" name="txt_aniofabricacion" id="txt_aniofabricacion">
                                        </div>

                                        <div class="col-sm-12 col-md-6 has-feedback">
                                            <label class="control-label tr-language" data-tr="cilindrada"></label>
                                            <input type="text" class="form-control" name="txt_cilindrada" id="txt_cilindrada">
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            
                            <fieldset>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-12 col-md-12 has-feedback">
                                            <label class="control-label tr-language" data-tr="img_tarjeta_propiedad"></label>
                                            <input type="file" class="form-control" name="file_tarjetapropiedadimg" id="file_tarjetapropiedadimg">
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                        </div>

                    </div>
                    <!-- end widget content -->
                </div>
                <!-- end widget div -->
            </div>
            <!-- end widget -->
        </div>

        <div class="col-sm-12">
            <!-- Widget ID (each widget will need unique ID)-->
            <div class="jarviswidget jarviswidget-color-blueDark">
                <header role="heading">
                    <span class="widget-icon"> <i class="fa fa-file-text txt-color-blueLight"></i> </span>		
                    <h2 class="tr-language" data-tr="otros_datos"> </h2>
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
                                            <label class="control-label tr-language" data-tr="recibo_agua_luz_gas"></label>
                                            <input type="file" class="form-control" name="file_recibo" id="file_recibo">
                                        </div>

                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="nro_revision_tecnica"></label>
                                            <input type="text" class="form-control" name="txt_nrorevisiontecnica" id="txt_nrorevisiontecnica">
                                        </div>
                                        
                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="fecha_prox_inspeccion"></label>
                                            <input type="text" class="form-control date" name="txt_fechainspeccion" id="txt_fechainspeccion">
                                        </div>
                                        
                                    </div>
                                </div>
                            </fieldset>
                            
                            <fieldset>
                                <div class="form-group">
                                    <div class="row">
                                    
                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="inscripcion_app_movil"></label>
                                            <input type="file" class="form-control" name="file_inscripcionmovil" id="file_inscripcionmovil">
                                        </div>
                                        
                                        <div class="col-sm-12 col-md-8 has-feedback">
                                            <label class="control-label tr-language" data-tr="img_revision_tecnica"></label>
                                            <input type="file" class="form-control" name="file_revisiontecnica" id="file_revisiontecnica">
                                        </div>
                                        
                                    </div>
                                </div>
                            </fieldset>
                            
                            <fieldset>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="soat"></label>
                                            <input type="text" class="form-control" name="txt_soat" id="txt_soat">
                                        </div>
                                        
                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="fecha_soat"></label>
                                            <input type="text" class="form-control date" name="txt_fechavigenciasoat" id="txt_fechavigenciasoat">
                                        </div>                                        
                                        
                                    </div>
                                </div>
                            </fieldset>
                            
                            <fieldset>
                                <div class="form-group">
                                    <div class="row">
                                    
                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label tr-language" data-tr="img_soat"></label>
                                            <input type="file" class="form-control" name="file_soat" id="file_soat">
                                        </div>  
                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label"><span class="tr-language" data-tr="formato_solicitud_cobranza"></span> <a href="files/formato_solicitud_cobranza.docx" class="tr-language" data-tr="aqui"></a></label>
                                            <input type="file" class="form-control" name="file_formatosolicitud" id="file_formatosolicitud">
                                        </div>   
                                        <div class="col-sm-12 col-md-4 has-feedback">
                                            <label class="control-label"><span class="tr-language" data-tr="hoja_unica_datos"></span> <a href="files/formato_calidda.docx" class="tr-language" data-tr="aqui"></a></label>
                                            <input type="file" class="form-control" name="file_hojacalidda" id="file_hojacalidda">
                                        </div> 
                                        
                                    </div>
                                </div>
                            </fieldset>
                            
                        </div>

                    </div>
                    <!-- end widget content -->
                </div>
                <!-- end widget div -->
            </div>
            <!-- end widget -->
        </div>
        <div class="clearfix"></div>
        
        <div class="form-actions">
            <div class="row">
                <div class="col-md-12">
                    <span id="actions" class="btn-toolbar"></span>
                </div>
            </div>
        </div>
                            
        <js>
            $.validate({
                ignore: [],
                rules: {
                    txt_primernombre: {
                        required: true,
                        minlength: 3
                    },
                    txt_apellidopaterno: {
                        required: true,
                        minlength: 3
                    },
                    txt_apellidomaterno: {
                        required: true,
                        minlength: 3
                    },
                    txt_nrodocidentidad: {
                        required: true,
                        number: true
                    },
                    lst_pais: {
                        required: true
                    },
                    lst_tipodocumentoidentidad: {
                        required: true
                    },
                    txt_celular: {
                        required: true,
                        number: true
                    },
                    txt_direcciondomicilio: {
                        required: true,
                        minlength: 10
                    },
                    txt_aniofabricacion: {
                        number: true
                    },
                    txt_cilindrada: {
                        required: true
                    },
                    txt_serie: {
                        required: true
                    },
                    txt_nromotor: {
                        required: true
                    },
                    txt_modelo: {
                        required: true
                    },
                    txt_marca: {
                        required: true
                    },
                    txt_placa: {
                        required: true
                    },
                    txt_tarjetapropiedad: {
                        required: true
                    },
                    txt_nrorevisiontecnica:{
                        required: true
                    },
                    txt_fechainspeccion:{
                        required: true,
                        date: true
                    },
                    txt_soat:{
                        required: true
                    },
                    txt_fechavigenciasoat:{
                        required: true,
                        date: true
                    }
                },
                errorPlacement: function (error, element) {
                    error.insertAfter(element.parent());
                },
                submitHandler: function () {
                    Obj.Registro.VehiculoAx.postEdit(__PK__);
                }
            });
        </js>
    </form>

</div>