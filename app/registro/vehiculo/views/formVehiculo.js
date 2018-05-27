<div>
    <form>
        <div class="col-sm-6">

            <!-- Widget ID (each widget will need unique ID)-->
            <div class="jarviswidget jarviswidget-color-blueDark">
                <header role="heading">
                    <span class="widget-icon"> <i class="fa fa-facebook txt-color-blue"></i> </span>		
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
                    <span class="widget-icon"> <i class="fa fa-facebook txt-color-blue"></i> </span>		
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
                                            <input type="text" class="form-control" name="website">
                                        </div>

                                        <div class="col-sm-12 col-md-6 has-feedback">
                                            <label class="control-label">Youtube trailer</label>
                                            <input type="text" class="form-control" name="trailer">
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