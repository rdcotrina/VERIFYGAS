<div>
    <form class="form-inline">
        <fieldset class="well">
            <legend class="tr-language" data-tr="filtros_busqueda"></legend>

            <div class="row" >
                <div class="form-group col-md-3">
                    <label class="col-md-4 control-label tr-language" data-tr="mes"></label>
                    <div class="col-md-8">
                        <select class="form-control chosen" id="txt_mes" name="txt_mes">
                            <option value="01" class="tr-language" data-tr="enero"></option><option value="02" class="tr-language" data-tr="febrero"></option>
                            <option value="03" class="tr-language" data-tr="marzo"></option><option value="04" class="tr-language" data-tr="abril"></option>
                            <option value="05" class="tr-language" data-tr="mayo"></option><option value="06" class="tr-language" data-tr="junio"></option>
                            <option value="07" class="tr-language" data-tr="julio"></option><option value="08" class="tr-language" data-tr="agosto"></option>
                            <option value="09" class="tr-language" data-tr="setiembre"></option><option value="10" class="tr-language" data-tr="octubre"></option>
                            <option value="11" class="tr-language" data-tr="noviembre"></option><option value="12" class="tr-language" data-tr="diciembre"></option>
                        </select>
                    </div>
                </div>

                <div class="form-group col-md-4">
                    <div class="col-md-7" id="btn_search">
                    </div>
                </div>
            </div>

           
        </fieldset>


        <div class="widget-body">

            <hr class="simple">

            <ul class="nav nav-tabs bordered">
                <li class="active">
                    <a href="#s1" data-toggle="tab"><span class="tr-language" data-tr="resumen_mensual"></span></a>
                </li>
                <li>
                    <a href="#s2" data-toggle="tab"><span class="tr-language" data-tr="resumen_anual"></span></a>
                </li>
            </ul>

            <div class="tab-content padding-10">
                <div class="tab-pane fade in active" id="s1">
                    <div id="d_informeM" class="table-responsive"></div>
                </div>
                <div class="tab-pane fade" id="s2">
                    <div id="d_informeA" class="table-responsive"></div>
                </div>
            </div>

        </div>

        
        

        <div class="clearfix"></div>
        
         <js>
                $.validate({
        rules: {},
                errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
                },
                submitHandler: function () {
                Obj.Reporte.InformeAx.postSearch(__PK__);
                }
                });
            </js>
    </form>
</div>