<form class="modal inmodal fade in">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close"><span>×</span><span class="sr-only"></span></button>
                <h4 class="modal-title tr-language" data-tr="consentimiento_form"></h4>
            </div>
            <div class="modal-body form-horizontal">

                <div class="form-group">
                    <label class="col-lg-12 control-label tr-language" data-tr="consentimiento_1"></label>
                    <div class="col-lg-6">
                        <span class="onoffswitch">
                            <input id="chk_consentimiento_1" name="chk_consentimiento_1" value="1" checked="checked" class="onoffswitch-checkbox" type="checkbox">
                            <label class="onoffswitch-label" for="chk_consentimiento_1"> 
                                <span class="onoffswitch-inner tr-language-onoffswitch" data-swchon-text="e_si" data-swchoff-text="e_no"></span> 
                                <span class="onoffswitch-switch"></span> 
                            </label> 
                        </span> <span class="tr-language" data-tr="acepto"></span>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="col-lg-12 control-label tr-language" data-tr="consentimiento_1"></label>
                    <div class="col-lg-6">
                        <span class="onoffswitch">
                            <input id="chk_consentimiento_2" name="chk_consentimiento_2" value="1" checked="checked" class="onoffswitch-checkbox" type="checkbox">
                            <label class="onoffswitch-label" for="chk_consentimiento_2"> 
                                <span class="onoffswitch-inner tr-language-onoffswitch" data-swchon-text="e_si" data-swchoff-text="e_no"></span> 
                                <span class="onoffswitch-switch"></span> 
                            </label> 
                        </span> <span class="tr-language" data-tr="acepto"></span>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="col-lg-12 control-label tr-language" data-tr="consentimiento_1"></label>
                    <div class="col-lg-6">
                        <span class="onoffswitch">
                            <input id="chk_consentimiento_3" name="chk_consentimiento_3" value="1" checked="checked" class="onoffswitch-checkbox" type="checkbox">
                            <label class="onoffswitch-label" for="chk_consentimiento_3"> 
                                <span class="onoffswitch-inner tr-language-onoffswitch" data-swchon-text="e_si" data-swchoff-text="e_no"></span> 
                                <span class="onoffswitch-switch"></span> 
                            </label> 
                        </span> <span class="tr-language" data-tr="acepto"></span>
                    </div>
                </div>

            </div>

            <div class="modal-footer">
                <div class="lv-modalrequired"></div>
                <span id="foot_btns_cons"></span>
                <button type="button" class="btn btn-warning lv-close" data-dismiss="modal"><i class="fa fa-close"></i> <span class="tr-language" data-tr="btn_close"></span></button>
            </div>
        </div>
    </div>
    <js>
        $.validate({
            ignore: [],
            rules: {
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            },
            submitHandler: function () {
                    Obj.Registro.VehiculoAx.addConsentimiento(__PK__);
            }
        });
    </js>
</form>