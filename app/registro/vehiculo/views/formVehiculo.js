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

                            <div class="form-actions">
                                <div class="row">
                                    <div class="col-md-12">
                                        <button class="btn btn-default" type="submit">
                                            <i class="fa fa-eye"></i>
                                            Validate
                                        </button>
                                    </div>
                                </div>
                            </div>

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
                                            <label class="control-label">Website</label>
                                            <input type="text" class="form-control" name="website" id="website">
                                        </div>

                                        <div class="col-sm-12 col-md-6 has-feedback">
                                            <label class="control-label">Youtube trailer</label>
                                            <input type="text" class="form-control" name="trailer" id="trailer">
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                            <div class="form-actions">
                                <div class="row">
                                    <div class="col-md-12">
                                        <button class="btn btn-default" type="submit">
                                            <i class="fa fa-eye"></i>
                                            Validate
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <!-- end widget content -->
                </div>
                <!-- end widget div -->
            </div>
            <!-- end widget -->
        </div>
        <div class="clearfix"></div>
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
                    file_docidentidad: {
                        required: true
                    },
                    file_licenciaconducir: {
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
                    txt_direcciontrabajo: {
                        required: true,
                        minlength: 10
                    }
                },
                errorPlacement: function (error, element) {
                    error.insertAfter(element.parent());
                },
                submitHandler: function () {
                    Obj.System.MenuAx.postNewMenu(__PK__);
                }
            });
        </js>
    </form>

</div>