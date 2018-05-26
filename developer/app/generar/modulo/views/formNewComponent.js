<form class="modal inmodal fade in">
    <div class="modal-dialog" style="width: 95%">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close"><span>×</span><span class="sr-only"></span></button>
                <h4 class="modal-title tr-language" data-tr="new_component"></h4>
            </div>
            <div class="modal-body form-horizontal">

                <div class="form-group">
                    <label class="col-lg-2 control-label tr-language" data-tr="tipo"></label>
                    <div class="col-lg-2">
                        <select class="form-control chosen" id="lst_tipo" name="lst_tipo">
                            <option class="tr-language" data-tr="seleccionar" value=""></option>
                            <option class="tr-language" data-tr="crud" value="CRUD"></option>
                        </select>
                    </div>
                </div>
                
                
                
                <div id="d_area_crud" class="d_area_crud tabs hide">
                    <ul class="nav nav-tabs bordered">
                        <li class="">
                            <a href="#tForm"><span class="tr-language" data-tr="form"></span> <i class="fa fa-tasks"></i></a>
                        </li>
                        <li class="">
                            <a href="#tGrid"><span class="tr-language" data-tr="grid"></span> <i class="fa fa-table"></i></a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <!-- INICIO TAB FORMULRIO -->
                        <div id="tForm" class="tab-pane fade active in tabs" style="border:0px">
                            <div class="pull-left panel_field" style="width:29%;">
                                <ul class="nav nav-tabs bordered">
                                    <li class="">
                                        <a href="#tFields"><span class="tr-language" data-tr="fields"></span></a>
                                    </li>
                                    <li class="">
                                        <a href="#tPropiedades"><span class="tr-language" data-tr="propierties"></span></a>
                                    </li>
                                    <li class="">
                                        <a href="#tFormulario"><span class="tr-language" data-tr="form"></span></a>
                                    </li>
                                </ul>
                                <div class="tab-content">
                                    <div id="tFields" class="tFields tab-pane fade active in" style="border:0px">
                                        <div class="f_element"><i class="fa fa-text-width"></i> <span class="tr-language" data-tr="text"></span></div>
                                        <div class="f_element"><i class="fa fa-paragraph"></i> <span class="tr-language" data-tr="textarea"></span></div>
                                        <div class="f_element"><i class="fa fa-check-square-o"></i> <span class="tr-language" data-tr="checkbox"></span></div>
                                        <div class="f_element"><i class="fa fa-dot-circle-o"></i> <span class="tr-language" data-tr="radio"></span></div>
                                        <div class="f_element"><i class="fa fa-list-alt"></i> <span class="tr-language" data-tr="select"></span></div>
                                    </div>
                                    <!-- inicio tPropiedades -->
                                    <div id="tPropiedades" class="tab-pane fade in" style="border:0px;overflow: auto;height: 400px;">
                                        <div class="no_element_selected text-center">
                                            <h2 class="tr-language" data-tr="no_element_selected" style="margin-top: 0px"></h2>
                                            <div class="tr-language" data-tr="select_element"></div>
                                        </div>
                                        <div class="_cont hide">
                                            <div class="smart-form well margin-bottom-10">
                                                <h4 class="h_propoerties tr-language" data-tr="etiquet"></h4>
                                                <div class="margin-top-20"></div>
                                                <section>
                                                    <label class="label tr-language" data-tr="etiquet"></label>
                                                    <label class="select">
                                                        <select class="input-sm chosen _etiquet_etiquet"></select>
                                                    </label>
                                                </section>
                                                <section>
                                                    <label class="label tr-language" data-tr="width"></label>
                                                    <label class="select">
                                                        <select class="input-sm chosen _width_etiquet"></select>
                                                    </label>
                                                </section>
                                            </div>

                                            <div class="smart-form well margin-bottom-10">
                                                <h4 class="h_propoerties tr-language" data-tr="field"></h4>
                                                <div class="margin-top-20"></div>
                                                <section>
                                                    <label class="label tr-language" data-tr="width"></label>
                                                    <label class="select">
                                                        <select class="input-sm chosen _width_field"></select>
                                                    </label>
                                                </section>                                                
                                                <span class="_more_field"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- fin tPropiedades -->
                                    <div id="tFormulario" class="tab-pane fade in smart-form" style="border:0px">
                                        <section>
                                            <label class="label tr-language" data-tr="title"></label>
                                            <label class="input">
                                                <input class="input-xs" type="text" id="txt_title_form" name="txt_title_form">
                                            </label>
                                            <div class="note tr-language" data-tr="note_etiquet"></div>
                                        </section>
                                        <section>
                                            <label class="label tr-language" data-tr="onsubmit"></label>
                                            <label class="input">
                                                <input class="input-xs" type="text" id="txt_onsubmit_form" name="txt_onsubmit_form">
                                            </label>
                                            <div class="note tr-language" data-tr="note_onsubmit"></div>
                                        </section>
                                        <section>
                                            <label class="label tr-language" data-tr="id"></label>
                                            <label class="input">
                                                <input class="input-xs" type="text" id="txt_id_form" name="txt_id_form">
                                            </label>
                                        </section>
                                    </div>
                                </div>
                            </div>
                            <div class="pull-right" style="width:70%;">
                            
                            
                                <!-- INICIO AREA DE DISÑO DE FORMULARIO -->
                                <h4 class="tr-language panel panel-warning padding-20" data-tr="without_title" style="margin:0px;margin-bottom: 5px;"></h4>
                                <div id="formDesigned" class="form-horizontal panel panel-warning padding-10">
                                    <div class="grag_element g_e text-center">
                                        <h2 class="tr-language" data-tr="start_building" style="margin-top: 0px"></h2>
                                        <div class="tr-language" data-tr="grag_element"></div>
                                    </div>
                                </div>
                                <!-- FIN AREA DE DISÑO DE FORMULARIO -->
                            
                            
                            
                            
                            </div>
                            <div class="clearfix"></div>
                        </div>
                        <!-- FIN TAB FORMULRIO -->
                        
                        <!-- INICIO TAB DATAGRID -->
                        <div id="tGrid" class="tab-pane fade in" style="border:0px">
                            <div id="d_columns" class="d_columns si-access"></div>
                            
                            <div class="clearfix"></div>
                        </div>
                        <!-- FIN TAB DATAGRID -->
                    </div>
                </div>
                

            </div>

            <div class="modal-footer">
                <div class="lv-modalrequired"></div>
                <span id="foot_btns"></span>
                <button type="button" class="btn btn-warning lv-close" data-dismiss="modal"><i class="fa fa-close"></i> <span class="tr-language" data-tr="btn_close"></span></button>
            </div>
        </div>
    </div>
    <js>
        $.validate({
            ignore: [],
            rules: {
                lst_tipo: {
                    required: true
                },
                txt_title_form: {
                    required: true
                },
                txt_onsubmit_form: {
                    required: true
                },
                txt_id_form: {
                    required: true
                }
            },
            errorPlacement: function (error, element) {
                    error.insertAfter(element.parent());
            },
            submitHandler: function () {
                    Obj.Generar.ModuloAx.postNewComponent(__PK__);
            }
        });
    </js>
</form>