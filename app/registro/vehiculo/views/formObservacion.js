<form class="modal inmodal fade in">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close"><span>×</span><span class="sr-only"></span></button>
                <h4 class="modal-title tr-language" data-tr="observacion"></h4>
            </div>
            <div class="modal-body form-horizontal">

                <div class="form-group">
                    <label class="col-lg-2 control-label tr-language" data-tr="observacion"></label>
                    <div class="col-lg-10">
                        <textarea class="form-control" id="txt_observacion" name="txt_observacion" ></textarea> 
                    </div>
                </div>

            </div>

            <div class="modal-footer">
                <div class="lv-modalrequired"></div>
                <span id="foot_btns"></span>
            </div>
        </div>
    </div>
    <js>
        $.validate({
            ignore: [],
            rules: {
                txt_observacion: {
                    required: true,
                    minlength: 3
                }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            },
            submitHandler: function () {
                    Obj.Registro.VehiculoAx.postObservacion(__PK__);
            }
        });
    </js>
</form>