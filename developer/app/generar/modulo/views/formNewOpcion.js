<form class="modal inmodal fade in">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close"><span>×</span><span class="sr-only"></span></button>
                <h4 class="modal-title tr-language" data-tr="new_option"></h4>
            </div>
            <div class="modal-body form-horizontal">

                <div class="form-group">
                    <label class="col-lg-2 control-label tr-language" data-tr="descripcion"></label>
                    <div class="col-lg-10">
                        <input type="text" class="form-control tagsinput" id="txt_descripcion" name="txt_descripcion" /> 
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
                txt_descripcion: {
                    required: true,
                    minlength: 3
                }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            },
            submitHandler: function () {
                    Obj.Generar.ModuloAx.postNewOption(__PK__);
            }
        });
    </js>
</form>