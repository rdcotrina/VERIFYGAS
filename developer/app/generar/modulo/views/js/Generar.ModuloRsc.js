"use strict";
$$.Generar.ModuloRsc = class ModuloRsc extends Resource {

    constructor() {
        super();

        this._txtEval = '';

        this._numElements = 0;

        this._elementSelected = null;

        this._configElements = []; //almacena la configuracion de cada elemento

        this._dataEtiquets = [];
        /*
         * carga etiquetas desde lang_ES.js en this._dataEtiquets
         * @returns {undefined}
         */
        this._loadDataEtiquets = () => {
            fetch(`${window.location.href}config/!18n/lang_${localStorage.getItem('app_lang')}.js`)
                    .then(res => res.text())
                    .then(content => {
                        let data = content.split(/\n/);
                        let ver = false, ini, last;
                        data.forEach((line, q) => {
                            if (/},/.test(line) && ver) {
                                ver = false;
                            }
                            if (ver) {
                                ini = line.indexOf("'") + 1;
                                last = line.lastIndexOf("'");
                                this._dataEtiquets.push({
                                    id: (line.substring(0, ini - 1).replace(/ /g, '')).replace(':', ''),
                                    value: line.substring(ini, last)
                                });
                            }
                            if (/etiquet: {/.test(line) && !ver) {
                                ver = true;
                            }
                        });
                    });
        };

        this._clearParams = () => {
            this._numElements = 0;
            this._configElements = [];
            this._elementSelected = null;
        };

        this._childrensFoldres = function (data, parent) {
            var uul = '', icon = '', c = 0, dp, btnNw = '';

            $.each(data, (i, row) => {
                uul += `
                <li>
                    <span class="label label-success">${row.folder}</span>
                    <div class="btn-group" id="btng_${row.folder}" data-k="${parent}/${row.folder}"></div>
                </li>`;
                //botones
                this._txtEval += `
                    $.fn.appButton.get({
                        aliasBtn: '${row.folder}',
                        container: '#btng_${row.folder}',
                        keymnu: '${this._alias}',
                        notext: true,
                        forceBtnXs: true,
                        btns: [
                            {keybtn: APP_BTN.NEW, evts: [{click: 'Obj.Generar.ModuloAx.formNewComponent'}]},
                            {keybtn: APP_BTN.DEL, evts: [{click: 'Obj.Generar.ModuloAx.postDeleteOpcion'}]}
                        ]
                    });
                `;
            });
            return uul;
        };

        this._renderTables = (data) => {
            let t = '';

            $.each(data, (i, v) => {
                t += `<div><i class="fa fa-th-list"></i> <span>${v.table_name}</span></div>`;
            });

            $(`#${this._alias}d_columns`).html(t);
            $(`#${this._alias}d_area_crud`).removeClass('hide');
            $(`#${this._alias}d_columns`).find('div').click((e) => {
                alert($.trim($(e.currentTarget).find('span').html()))
            });
        };
        /*
         * agrega orden a elementos
         */
        this._addOrder = () => {
            let n = 0, t = this;
            $(`#${this._alias}formDesigned`).find('.f_element_in').each(function () {
                n++;
                $(this).data('order', n);
            });
        };

        this._removeItem = (btn) => {
            let ele = $(btn).parent().parent('div').data('id');
            delete this._configElements[ele];
            $(`#${this._alias}formDesigned`).find('.f_element_in_selected').remove();

            //muestra div .no_element_selected
            $(`#${this._alias}tPropiedades`).find('.no_element_selected').removeClass('hide');
            //oculta propiedades
            $(`#${this._alias}tPropiedades`).find('._cont').addClass('hide');

            //activa msn en formDesigned si es q no hay elementos agregados
            if ($(`#${this._alias}formDesigned`).find('.f_element_in').length == 0) {
                $(`#${this._alias}formDesigned`).find('.g_e').removeClass('hide');
            }
        };

        this._createText = (t) => {
            let e = `
            <div class="form-group f_element_in">
                <label class="_etiquet col-lg-2 control-label tr-language" data-tr="${t}">${t}</label>
                <div class="_field col-lg-10">
                    <div class="tapa_element_in"></div>
                    <input type="text" class="form-control"/> 
                </div>
                <div class="delete_element ${this._numElements}delete_element hide"></div>
            </div>`;
            return e;
        };

        this._createTextArea = (t) => {
            let e = `
            <div class="form-group f_element_in">
                <label class="_etiquet col-lg-2 control-label tr-language" data-tr="${t}">${t}</label>
                <div class="_field col-lg-10">
                    <div class="tapa_element_in"></div>
                    <textarea class="form-control" style="resize: none;"></textarea> 
                </div>
                <div class="delete_element ${this._numElements}delete_element hide"></div>
            </div>`;
            return e;
        };

        this._createCheckbox = (t) => {
            let e = `
            <div class="form-group f_element_in smart-form">
                <label class="_etiquet col-lg-2 control-label tr-language" data-tr="${t}">${t}</label>
                <div class="_field col-lg-10">
                    <div class="tapa_element_in"></div>
                    <div class="checkbox">
                        <label class="chk_1">
                          <input class="checkbox style-0" type="checkbox" checked="true">
                          <span class="tr-language" data-tr="chk_1">Checkbox 1</span>
                        </label>
                    </div>
                    <div class="checkbox">
                        <label class="chk_2">
                          <input class="checkbox style-0" type="checkbox">
                          <span class="tr-language" data-tr="chk_2">Checkbox 2</span>
                        </label>
                    </div>
                    <div class="checkbox">
                        <label class="chk_3">
                          <input class="checkbox style-0" type="checkbox">
                          <span class="tr-language" data-tr="chk_3">Checkbox 3</span>
                        </label>
                    </div>
                </div>
                <div class="delete_element ${this._numElements}delete_element hide"></div>
            </div>`;
            return e;
        };

        this._createRadio = (t) => {
            let e = `
            <div class="form-group f_element_in smart-form">
                <label class="_etiquet col-lg-2 control-label tr-language" data-tr="${t}">${t}</label>
                <div class="_field col-lg-10">
                    <div class="tapa_element_in"></div>
                    <div class="radio">
                        <label>
                          <input class="radiobox style-0" type="radio">
                          <span class="tr-language" data-tr="rd_1">Radio 1</span>
                        </label>
                    </div>
                    <div class="radio">
                        <label>
                          <input class="radiobox style-0" type="radio" checked="true">
                          <span class="tr-language" data-tr="rd_2">Radio 2</span>
                        </label>
                    </div>
                    <div class="radio">
                        <label>
                          <input class="radiobox style-0" type="radio">
                          <span class="tr-language" data-tr="rd_3">Radio 3</span>
                        </label>
                    </div>
                </div>
                <div class="delete_element ${this._numElements}delete_element hide"></div>
            </div>`;
            return e;
        };

        this._createSelect = (t) => {
            let e = `
            <div class="form-group f_element_in">
                <label class="_etiquet col-lg-2 control-label tr-language" data-tr="${t}">${t}</label>
                <div class="_field col-lg-10">
                    <div class="tapa_element_in"></div>
                    <select class="form-control chosen">
                        <option class="tr-language" data-tr="opt_1" value="1">Opción 1</option>
                        <option class="tr-language" data-tr="opt_2" value="2">Opción 2</option>
                        <option class="tr-language" data-tr="opt_3" value="3">Opción 3</option>
                    </select>
                </div>
                <div class="delete_element ${this._numElements}delete_element hide"></div>
            </div>`;
            return e;
        };

        this._createElement = (ui) => {
            let type = $(ui.helper).attr('t') || $.trim(ui.find('span').html()).toLocaleLowerCase();
            let elH = $(`#${this._alias}formDesigned`).find('.ui-sortable-placeholder') || $('.grag_element');
            let el, opts = null;
            elH = (elH.length == 0) ? $('.g_e') : elH;

            this._numElements++;

            switch (type) {
                case 'text':
                    el = this._createText(type);
                    break;
                case 'textarea':
                    el = this._createTextArea(type);
                    break;
                case 'checkbox':
                    el = this._createCheckbox(type);
                    opts = [
                        {k: 'chk_1', opt: 'chk_1', order: 1},
                        {k: 'chk_2', opt: 'chk_2', order: 2},
                        {k: 'chk_3', opt: 'chk_3', order: 3}
                    ];
                    break;
                case 'radio':
                    el = this._createRadio(type);
                    opts = [
                        {k: 'rd_1', opt: 'rd_1', order: 1},
                        {k: 'rd_2', opt: 'rd_2', order: 2},
                        {k: 'rd_3', opt: 'rd_3', order: 3}
                    ];
                    break;
                case 'select':
                    el = this._createSelect(type);
                    break;
            }

            $(el).data({
                type: type,
                id: `el_${this._numElements}`
            }).click((e) => {
                let $el = $(e.currentTarget);
                //se crea indice de elemento para almacenar su configuracion
                this._configElements[$el.data('id')].order = $el.data('order');
                this._elementSelected = $el.data('id');
                //evento que marca como seleccionado a elemento, activa y carga tab propiedades
                this._loadPropierties($el);
            }).insertAfter(elH);

            //iniciar obj de elemento creado
            //configuracion por default de elemntos
            this._configElements[`el_${this._numElements}`] = {
                translateLabel: type,
                widthLabel: 'col-lg-2',
                widthField: 'col-lg-10',
                placeholderField: 'no_placeholder',
                order: null,
                idNameField: '',
                validations: {},
                options: opts
            };

            //agregando boton eliminar
            $.fn.appButton.get({
                notext: true,
                aliasBtn: this._numElements,
                btnCircle: true,
                container: `#${this._alias}formDesigned .${this._numElements}delete_element`,
                keymnu: this._alias,
                btns: [
                    {keybtn: APP_BTN.DEL, evts: [{click: 'Obj.Generar.ModuloAx.deleteItem'}]}
                ]
            });

            if (type == 'select') {
                $('.chosen').chosen();
            }

            $(`#${this._alias}formDesigned`).find(`div[t="${type}"]`).remove();

            if ($(`#${this._alias}formDesigned`).find('.f_element_in').length) {
                $('.grag_element').addClass('hide');
            } else {
                $('.grag_element').removeClass('hide');
            }
            this._addOrder();
        };
        /*
         * carga las opciones del <select> para el width de elementos
         */
        this._optionCssWidth = (css) => {
            let i = 1, o = '';
            for (i; i <= 12; i++) {
                o += `<option value="${css}${i}">${css}${i}</option>`;
            }
            $(`#${this._alias}tPropiedades`).find('._width_etiquet, ._width_field').html(o);
        };
        /*
         * carga las opciones del <select> para etiquetas de elementos
         */
        this._optionEtiquets = (returnBool = false, def = null) => {
            let o = '', i = 0, t = this._dataEtiquets.length, sl;
            for (i; i <= t; i++) {
                if (this._dataEtiquets[i] != undefined) {
                    sl = (def == this._dataEtiquets[i].id) ? 'selected="selected"' : '';
                    o += `<option value="${this._dataEtiquets[i].id}" ${sl}>${this._dataEtiquets[i].value}</option>`;
                }
            }
            if (returnBool) {
                return o;
            } else {
                $(`#${this._alias}tPropiedades`).find('._etiquet_etiquet').html(o);
        }
        };
        /*
         * carga eventos para chk validations
         */
        this._loadEvtsValidations = ($main) => {
            $main.find('._validate_field').find('input:checkbox').off('click');
            $main.find('._validate_field').find('input:checkbox').click((e) => {
                let lb = $(e.currentTarget).parent('label');
                //guarda en array la nueva validacion de field
                if ($(e.currentTarget).is(':checked')) {
                    //detectar si tiene input
                    if ($(e.currentTarget).hasClass('_input_')) {
                        //se guarda la configuracion con sus rangos
                        if (!this._configElements[this._elementSelected].validations[$(e.currentTarget).parent('label').attr('role')]) {
                            this._configElements[this._elementSelected].validations[$(e.currentTarget).parent('label').attr('role')] = {};
                        }
                        //se activa y agrega evento los input
                        lb.find('input:text').attr('disabled', false).keyup((el) => {
                            if (!$.isNumeric(el.currentTarget.value)) {
                                el.currentTarget.value = '';
                            } else {
                                //detectar si tiene class a -> (desde)
                                if ($(el.currentTarget).hasClass('a')) {
                                    //se gaurda la configuracion
                                    this._configElements[this._elementSelected].validations[$(el.currentTarget).parent().parent('label').attr('role')].from = el.currentTarget.value;
                                }
                                //detectar si tiene class b -> (hasta)
                                if ($(el.currentTarget).hasClass('b')) {
                                    //se gaurda la configuracion
                                    this._configElements[this._elementSelected].validations[$(el.currentTarget).parent().parent('label').attr('role')].to = el.currentTarget.value;
                                }
                            }
                        });
                    } else {
                        //se guarda la configuracion simple
                        this._configElements[this._elementSelected].validations[$(e.currentTarget).parent('label').attr('role')] = true;
                    }
                } else {
                    //detectar si tiene input
                    if ($(e.currentTarget).hasClass('_input_')) {
                        //se inactiva, quito evento y limpio los input
                        lb.find('input:text').attr('disabled', true).val('').off('keyup');
                    }
                    //se guarda la configuracion
                    this._configElements[this._elementSelected].validations[$(e.currentTarget).parent('label').attr('role')] = false;
                }
            });
            //verificar si tiene validaciones y cargarlas
            for (var x in this._configElements[this._elementSelected].validations) {
                let v = this._configElements[this._elementSelected].validations[x];
                if (v) {
                    //clicko el checkbox
                    $main.find('._validate_field').find(`label[role="${x}"]`).find('input:checkbox').click();
                    //si es object se carga inputs
                    if (typeof v == 'object') {
                        //buscamos input.a y cargamos valor
                        $main.find('._validate_field').find(`label[role="${x}"]`).find('input.a').val(v.from);
                        //buscamos input.b y cargamos valor
                        if ($main.find('._validate_field').find(`label[role="${x}"]`).find('input.b')) {
                            $main.find('._validate_field').find(`label[role="${x}"]`).find('input.b').val(v.to);
                        }
                    }
                }
            }
        };

        this._loadPropiertiesText = ($element) => {
            let $main = $(`#${this._alias}tPropiedades`);
            let h = `
            <section>
                <label class="label tr-language">${APP_ETIQUET.id_name}</label>
                <label class="input">
                    <input class="input-xs _idname_field" type="text">
                </label>
            </section> 
            <section>
                <label class="label">${APP_ETIQUET.placeholder}</label>
                <label class="select">
                    <select class="input-sm chosen _placeholder_field">${this._optionEtiquets(true)}</select>
                </label>
            </section>
            <section>
                <label class="label">${APP_ETIQUET.validaciones}</label>
                <div class="_validate_field">
                    <div class="col col-8" style="padding:0px">
                        <div class="checkbox" style="padding:0px">
                            <label role="max">
                                <input class="checkbox style-0 _input_" type="checkbox"> <span>${APP_ETIQUET.max}</span> 
                                <span class="_max_val">
                                    <input class="input-xs-valida" type="text" disabled="true">
                                </span>
                            </label>
                        </div>
                        <div class="checkbox" style="padding:0px">
                            <label role="min">
                                <input class="checkbox style-0 _input_" type="checkbox"> <span>${APP_ETIQUET.min}</span> 
                                <span class="_min_val">
                                    <input class="input-xs-valida" type="text" disabled="true">
                                </span>
                            </label>
                        </div>
                        <div class="checkbox" style="padding:0px">
                            <label role="maxlength">
                                <input class="checkbox style-0 _input_" type="checkbox"> <span>${APP_ETIQUET.maxlength}</span> 
                                <span class="_maxlength_val">
                                    <input class="input-xs-valida a" type="text" disabled="true" maxlength="3">
                                </span>
                            </label>
                        </div>
                        <div class="checkbox" style="padding:0px">
                            <label role="minlength">
                                <input class="checkbox style-0 _input_" type="checkbox"> <span>${APP_ETIQUET.minlength}</span> 
                                <span class="_minlength_val">
                                    <input class="input-xs-valida a" type="text" disabled="true" maxlength="3">
                                </span>
                            </label>
                        </div>
                        <div class="checkbox" style="padding:0px">
                            <label role="range">
                                <input class="checkbox style-0 _input_" type="checkbox"> <span>${APP_ETIQUET.range}</span> 
                                <span class="_range_val">
                                    <input class="input-xs-valida a" type="text" disabled="true" maxlength="3"> - 
                                    <input class="input-xs-valida b" type="text" disabled="true" maxlength="3">
                                </span>
                            </label>
                        </div>
                        <div class="checkbox" style="padding:0px">
                            <label role="rangelength">
                                <input class="checkbox style-0 _input_" type="checkbox"> <span>${APP_ETIQUET.rangelength}</span> 
                                <span class="_rangelength_val">
                                    <input class="input-xs-valida a" type="text" disabled="true" maxlength="3"> - 
                                    <input class="input-xs-valida b" type="text" disabled="true" maxlength="3">
                                </span>
                            </label>
                        </div>
                    </div>
                                
                    <div class="col col-4" style="padding:0px">
                        <div class="checkbox" style="padding:0px">
                            <label role="required">
                              <input class="checkbox style-0" type="checkbox"> <span>${APP_ETIQUET.required}</span>
                            </label>
                        </div>
                        <div class="checkbox" style="padding:0px">
                            <label role="email">
                              <input class="checkbox style-0" type="checkbox"> <span>${APP_ETIQUET.email}</span>
                            </label>
                        </div>
                        <div class="checkbox" style="padding:0px">
                            <label role="url">
                              <input class="checkbox style-0" type="checkbox"> <span>${APP_ETIQUET.url}</span>
                            </label>
                        </div>
                        <div class="checkbox" style="padding:0px">
                            <label role="number">
                              <input class="checkbox style-0" type="checkbox"> <span>${APP_ETIQUET.number}</span>
                            </label>
                        </div>
                        <div class="checkbox" style="padding:0px">
                            <label role="date">
                              <input class="checkbox style-0" type="checkbox"> <span>${APP_ETIQUET.date}</span>
                            </label>
                        </div>
                    </div> 
                    <div class="clearfix"></div>
                </div>            
            </section> 
            `;

            $main.find('._more_field').html(h);

            //ini eventos select etiqueta de etiqueta ---------------------------------------------------------
            $main.find('._etiquet_etiquet').off('change');
            $main.find('._etiquet_etiquet').change((e) => {
                let et = (e.currentTarget.value == 'no_etiqueta') ? '' : $(e.currentTarget).find('option:selected').text();

                //agrega css para ancho de label
                $element.find('._etiquet').html(et).attr('data-tr', e.currentTarget.value);
                //guarda en array el nuevo css de ancho de etiqueta
                this._configElements[this._elementSelected].translateLabel = e.currentTarget.value;

            });
            $main.find('._etiquet_etiquet').val(this._configElements[this._elementSelected].translateLabel);
            $main.find('._etiquet_etiquet').trigger('chosen:updated');
            //fin eventos select etiqueta de etiqueta ---------------------------------------------------------

            //ini eventos select ancho de etiqueta ---------------------------------------------------------
            $main.find('._width_etiquet').off('change');
            $main.find('._width_etiquet').change((e) => {
                //agrega css para ancho de label
                $element.find('._etiquet').removeClass(this._configElements[this._elementSelected].widthLabel).addClass(e.currentTarget.value);
                //guarda en array el nuevo css de ancho de etiqueta
                this._configElements[this._elementSelected].widthLabel = e.currentTarget.value;

            });
            $main.find('._width_etiquet').val(this._configElements[this._elementSelected].widthLabel);
            $main.find('._width_etiquet').trigger('chosen:updated');
            //fin eventos select ancho de etiqueta ---------------------------------------------------------

            //ini eventos select placeholder de campo ---------------------------------------------------------
            $main.find('._placeholder_field').off('change');
            $main.find('._placeholder_field').change((e) => {
                let plh = (e.currentTarget.value == 'no_placeholder') ? '' : eval(`APP_ETIQUET.${e.currentTarget.value}`);
                //agrega css para ancho de label
                $element.find('._field').find('input:text').attr('placeholder', plh);
                //guarda en array el nuevo css de ancho de etiqueta
                this._configElements[this._elementSelected].placeholderField = e.currentTarget.value;

            });
            $main.find('._placeholder_field').val(this._configElements[this._elementSelected].placeholderField);
            $main.find('._placeholder_field').trigger('chosen:updated');
            //fin eventos select placeholder de campo ---------------------------------------------------------

            //ini eventos select ancho de campo ---------------------------------------------------------
            $main.find('._width_field').off('change');
            $main.find('._width_field').change((e) => {
                //agrega css para ancho de campo
                $element.find('._field').removeClass(this._configElements[this._elementSelected].widthField).addClass(e.currentTarget.value);
                //guarda en array el nuevo css de ancho de field
                this._configElements[this._elementSelected].widthField = e.currentTarget.value;
            });
            $main.find('._width_field').val(this._configElements[this._elementSelected].widthField);
            $main.find('._width_field').trigger('chosen:updated');
            //fin eventos select ancho de campo ---------------------------------------------------------

            //ini eventos input _idname_field de campo ---------------------------------------------------------
            $main.find('._idname_field').off('keyup');
            $main.find('._idname_field').keyup((e) => {
                //guarda en array el nuevo css de ancho de field
                this._configElements[this._elementSelected].idNameField = e.currentTarget.value;
            });
            $main.find('._idname_field').val(this._configElements[this._elementSelected].idNameField);
            //fin eventos input _idname_field de campo ---------------------------------------------------------

            //ini eventos checkbox _validate_field de campo ---------------------------------------------------------
            this._loadEvtsValidations($main);
            //fin eventos checkbox _validate_field de campo ---------------------------------------------------------
        };

        this._loadPropiertiesTextArea = ($element) => {
            let $main = $(`#${this._alias}tPropiedades`);
            let h = `
            <section>
                <label class="label tr-language">${APP_ETIQUET.id_name}</label>
                <label class="input">
                    <input class="input-xs _idname_field" type="text">
                </label>
            </section> 
            <section>
                <label class="label">${APP_ETIQUET.placeholder}</label>
                <label class="select">
                    <select class="input-sm chosen _placeholder_field">${this._optionEtiquets(true)}</select>
                </label>
            </section>
            <section>
                <label class="label">${APP_ETIQUET.validaciones}</label>
                <div class="_validate_field">
                    <div class="col col-8" style="padding:0px">
                        <div class="checkbox" style="padding:0px">
                            <label role="maxlength">
                                <input class="checkbox style-0 _input_" type="checkbox"> <span>${APP_ETIQUET.maxlength}</span> 
                                <span class="_maxlength_val">
                                    <input class="input-xs-valida a" type="text" disabled="true" maxlength="3">
                                </span>
                            </label>
                        </div>
                        <div class="checkbox" style="padding:0px">
                            <label role="minlength">
                                <input class="checkbox style-0 _input_" type="checkbox"> <span>${APP_ETIQUET.minlength}</span> 
                                <span class="_minlength_val">
                                    <input class="input-xs-valida a" type="text" disabled="true" maxlength="3">
                                </span>
                            </label>
                        </div>
                        <div class="checkbox" style="padding:0px">
                            <label role="rangelength">
                                <input class="checkbox style-0 _input_" type="checkbox"> <span>${APP_ETIQUET.rangelength}</span> 
                                <span class="_rangelength_val">
                                    <input class="input-xs-valida a" type="text" disabled="true" maxlength="3"> - 
                                    <input class="input-xs-valida b" type="text" disabled="true" maxlength="3">
                                </span>
                            </label>
                        </div>
                        <div class="checkbox" style="padding:0px">
                            <label role="required">
                              <input class="checkbox style-0" type="checkbox"> <span>${APP_ETIQUET.required}</span>
                            </label>
                        </div>
                    </div> 
                    <div class="clearfix"></div>
                </div>            
            </section> 
            `;

            $main.find('._more_field').html(h);

            //ini eventos select etiqueta de etiqueta ---------------------------------------------------------
            $main.find('._etiquet_etiquet').off('change');
            $main.find('._etiquet_etiquet').change((e) => {
                let et = (e.currentTarget.value == 'no_etiqueta') ? '' : $(e.currentTarget).find('option:selected').text();
                //agrega css para ancho de label
                $element.find('._etiquet').html(et).attr('data-tr', e.currentTarget.value);
                //guarda en array el nuevo css de ancho de etiqueta
                this._configElements[this._elementSelected].translateLabel = e.currentTarget.value;

            });
            $main.find('._etiquet_etiquet').val(this._configElements[this._elementSelected].translateLabel);
            $main.find('._etiquet_etiquet').trigger('chosen:updated');
            //fin eventos select etiqueta de etiqueta ---------------------------------------------------------

            //ini eventos select ancho de etiqueta ---------------------------------------------------------
            $main.find('._width_etiquet').off('change');
            $main.find('._width_etiquet').change((e) => {
                //agrega css para ancho de label
                $element.find('._etiquet').removeClass(this._configElements[this._elementSelected].widthLabel).addClass(e.currentTarget.value);
                //guarda en array el nuevo css de ancho de etiqueta
                this._configElements[this._elementSelected].widthLabel = e.currentTarget.value;

            });
            $main.find('._width_etiquet').val(this._configElements[this._elementSelected].widthLabel);
            $main.find('._width_etiquet').trigger('chosen:updated');
            //fin eventos select ancho de etiqueta ---------------------------------------------------------

            //ini eventos select placeholder de campo ---------------------------------------------------------
            $main.find('._placeholder_field').off('change');
            $main.find('._placeholder_field').change((e) => {
                let plh = (e.currentTarget.value == 'no_placeholder') ? '' : eval(`APP_ETIQUET.${e.currentTarget.value}`);
                //agrega css para ancho de label
                $element.find('._field').find('textarea').attr('placeholder', plh);
                //guarda en array el nuevo css de ancho de etiqueta
                this._configElements[this._elementSelected].placeholderField = e.currentTarget.value;

            });
            $main.find('._placeholder_field').val(this._configElements[this._elementSelected].placeholderField);
            $main.find('._placeholder_field').trigger('chosen:updated');
            //fin eventos select placeholder de campo ---------------------------------------------------------

            //ini eventos select ancho de campo ---------------------------------------------------------
            $main.find('._width_field').off('change');
            $main.find('._width_field').change((e) => {
                //agrega css para ancho de campo
                $element.find('._field').removeClass(this._configElements[this._elementSelected].widthField).addClass(e.currentTarget.value);
                //guarda en array el nuevo css de ancho de field
                this._configElements[this._elementSelected].widthField = e.currentTarget.value;
            });
            $main.find('._width_field').val(this._configElements[this._elementSelected].widthField);
            $main.find('._width_field').trigger('chosen:updated');
            //fin eventos select ancho de campo ---------------------------------------------------------

            //ini eventos input _idname_field de campo ---------------------------------------------------------
            $main.find('._idname_field').off('keyup');
            $main.find('._idname_field').keyup((e) => {
                //guarda en array el nuevo css de ancho de field
                this._configElements[this._elementSelected].idNameField = e.currentTarget.value;
            });
            $main.find('._idname_field').val(this._configElements[this._elementSelected].idNameField);
            //fin eventos input _idname_field de campo ---------------------------------------------------------

            //ini eventos checkbox _validate_field de campo ---------------------------------------------------------
            this._loadEvtsValidations($main);
            //fin eventos checkbox _validate_field de campo ---------------------------------------------------------
        };

        this._loadPropiertiesCheckbox = ($element) => {
            let $main = $(`#${this._alias}tPropiedades`);
            let h = `
            <section>
                <label class="label">${APP_ETIQUET.validaciones}</label>
                <div class="_validate_field">
                    <div class="col col-8" style="padding:0px">
                        <div class="checkbox" style="padding:0px">
                            <label role="required">
                              <input class="checkbox style-0" type="checkbox"> <span>${APP_ETIQUET.required}</span>
                            </label>
                        </div>
                    </div> 
                    <div class="clearfix"></div>
                </div>            
            </section> 
            <section>
                <label class="label">${APP_ETIQUET.options}</label>
                <div class="_options_field"></div>
            </section>
            `;

            $main.find('._more_field').html(h);

            //ini eventos select etiqueta de etiqueta ---------------------------------------------------------
            $main.find('._etiquet_etiquet').off('change');
            $main.find('._etiquet_etiquet').change((e) => {
                let et = (e.currentTarget.value == 'no_etiqueta') ? '' : $(e.currentTarget).find('option:selected').text();
                //agrega css para ancho de label
                $element.find('._etiquet').html(et).attr('data-tr', e.currentTarget.value);
                //guarda en array el nuevo css de ancho de etiqueta
                this._configElements[this._elementSelected].translateLabel = e.currentTarget.value;

            });
            $main.find('._etiquet_etiquet').val(this._configElements[this._elementSelected].translateLabel);
            $main.find('._etiquet_etiquet').trigger('chosen:updated');
            //fin eventos select etiqueta de etiqueta ---------------------------------------------------------

            //ini eventos select ancho de etiqueta ---------------------------------------------------------
            $main.find('._width_etiquet').off('change');
            $main.find('._width_etiquet').change((e) => {
                //agrega css para ancho de label
                $element.find('._etiquet').removeClass(this._configElements[this._elementSelected].widthLabel).addClass(e.currentTarget.value);
                //guarda en array el nuevo css de ancho de etiqueta
                this._configElements[this._elementSelected].widthLabel = e.currentTarget.value;

            });
            $main.find('._width_etiquet').val(this._configElements[this._elementSelected].widthLabel);
            $main.find('._width_etiquet').trigger('chosen:updated');
            //fin eventos select ancho de etiqueta ---------------------------------------------------------

            //ini eventos select ancho de campo ---------------------------------------------------------
            $main.find('._width_field').off('change');
            $main.find('._width_field').change((e) => {
                //agrega css para ancho de campo
                $element.find('._field').removeClass(this._configElements[this._elementSelected].widthField).addClass(e.currentTarget.value);
                //guarda en array el nuevo css de ancho de field
                this._configElements[this._elementSelected].widthField = e.currentTarget.value;
            });
            $main.find('._width_field').val(this._configElements[this._elementSelected].widthField);
            $main.find('._width_field').trigger('chosen:updated');
            //fin eventos select ancho de campo ---------------------------------------------------------

            //ini eventos checkbox _validate_field de campo ---------------------------------------------------------
            this._loadEvtsValidations($main);
            //fin eventos checkbox _validate_field de campo ---------------------------------------------------------

            //ini eventos checkbox _validate_field de campo ---------------------------------------------------------
            this._loadOptions($main);
            //fin eventos checkbox _validate_field de campo ---------------------------------------------------------

        };

        this._loadOptions = ($main) => {
            let opt = '', n = 0;
            let opts = this._configElements[this._elementSelected].options.sort(function (a, b) {
                return a.order - b.order;
            });
            $.each(opts, (i, v) => {
                n++;
                opt += `
                <div class="margin-bottom-5" style="position:relative">
                    <label class="select" style="width:77%">
                        <select class="input-sm chosen" data-nro="${v.k}" style="width:100%">${this._optionEtiquets(true, v.opt)}</select>
                    </label>
                    <span style="position: absolute;top:0px;right:0px;">
                        <button type="button" data-order="${n}" data-nro="${v.k}" class="_addOpt btn bg-color-green txt-color-white btn-circle" style="width: 25px;height: 25px;padding: 3px;"><i class="fa fa-plus"></i></button>
                        <button type="button" data-order="${n}" data-nro="${v.k}" class="_removeOpt btn btn-danger btn-circle" style="width: 25px;height: 25px;padding: 3px;"><i class="fa fa-minus"></i></button>
                    </span>
                </div>`;
            });
            $main.find('._options_field').html(opt);
            //ini agrega eventos a los <select> -------------------------------------------
            $main.find('._options_field').find('select').off('change');
            $main.find('._options_field').find('select').change((e) => {
                let cl = $(e.currentTarget).data('nro');
                $(`#${this._alias}formDesigned`).find('.f_element_in_selected').find('._field').find(`label[class="${cl}"]`).find('span').attr('data-tr', $(e.currentTarget).val()).html($(e.currentTarget).find('option:selected').text());

                //cargar configuracion
                $.each(this._configElements[this._elementSelected].options, (i, v) => {
                    if (cl == v.k) {
                        this._configElements[this._elementSelected].options[i].opt = $(e.currentTarget).val();
                    }
                });
            });
            //fin agrega eventos a los <select> -------------------------------------------


            //ini agrega eventos a los <button> _addOpt-------------------------------------------
            $main.find('._options_field').find('button._addOpt').off('click');
            $main.find('._options_field').find('button._addOpt').click((e) => {
                let cl = $(e.currentTarget).data('nro');
                let nel = $(`#${this._alias}formDesigned`).find('.f_element_in_selected').find('._field').find('input:checkbox').length + 1;
                let dom = $(`#${this._alias}formDesigned`).find('.f_element_in_selected').find('._field').find(`label[class="${cl}"]`).parent('div');
                
                //agregar elemento a JSON
                this._configElements[this._elementSelected].options.push({k: `chk_${nel}`, opt: 'no_etiqueta', order: $(e.currentTarget).data('order')});
                
                //agregar elemnto al DOM
                $(`<div class="checkbox">
                        <label class="chk_${nel}">
                          <input class="checkbox style-0" type="checkbox">
                          <span class="tr-language" data-tr="no_etiqueta">${APP_ETIQUET.no_etiqueta}</span>
                        </label>
                    </div>`).insertAfter(dom);


                //recargar opts
                this._loadOptions($main);
                $main.find('._options_field').find('select').chosen();
                
                //reordenar posiciones de elementos
                $main.find('._options_field').find('select').each((ee,sl) => {
                    let ky = $(sl).data('nro'),n = 0;
                    $.each(this._configElements[this._elementSelected].options, (ii, vv) => {
                        n++;
                        if (ky == vv.k) {
                            this._configElements[this._elementSelected].options[ii].order = n;
                        }
                    });
                });
                console.log(this._configElements[this._elementSelected].options)
            });
            //fin agrega eventos a los <button> _addOpt-------------------------------------------

            //ini agrega eventos a los <button> _addOpt-------------------------------------------
            $main.find('._options_field').find('button._removeOpt').off('click');
            $main.find('._options_field').find('button._removeOpt').click((e) => {
                alert($(e.currentTarget).attr('data-nro'))
            });
            //fin agrega eventos a los <button> _addOpt-------------------------------------------
        };

        this._loadPropiertiesRdio = ($element) => {
            let h = 'd';

            $(`#${this._alias}tPropiedades`).html(h);
        };

        this._loadPropiertiesSelect = ($element) => {
            let h = 'e';

            $(`#${this._alias}tPropiedades`).html(h);
        };

        this._loadPropierties = ($element) => {
            let type = $element.data('type');
            //activar tab propiedades
            $('.panel_field').find('ul').find('li:eq(1)').find('a').click();
            $(`#${this._alias}formDesigned`).find('.f_element_in').removeClass('f_element_in_selected');
            $element.addClass('f_element_in_selected');//agregar css para seleccionar elemento

            $(`#${this._alias}formDesigned`).find('.delete_element').addClass('hide');
            //visualizar boton eliminar
            $element.find('.delete_element').removeClass('hide');

            switch (type) {
                case 'text':
                    this._loadPropiertiesText($element);
                    break;
                case 'textarea':
                    this._loadPropiertiesTextArea($element);
                    break;
                case 'checkbox':
                    this._loadPropiertiesCheckbox($element);
                    break;
                case 'radio':
                    this._loadPropiertiesRdio($element);
                    break;
                case 'select':
                    this._loadPropiertiesSelect($element);
                    break;
            }
            $('.chosen').chosen();
            //oculta div .no_element_selected
            $(`#${this._alias}tPropiedades`).find('.no_element_selected').addClass('hide');
            //activo propiedades
            $(`#${this._alias}tPropiedades`).find('._cont').removeClass('hide');
        };
        this._loadDataEtiquets();
    }

    addBtnNew() {
        $.fn.appButton.get({
            container: `#${this._alias}tools_modulo`,
            keymnu: this._alias,
            btns: [
                {keybtn: APP_BTN.NEW, evts: [{click: 'Obj.Generar.ModuloAx.formNewModulo'}]}
            ]
        });
    }

    addButtonsFormNew() {
        $.fn.appButton.get({
            container: `#${this._alias}foot_btns`,
            keymnu: this._alias,
            btns: [{keybtn: APP_BTN.GRB, type: 'submit'}]
        });
    }

    renderFolders(data) {
        let cnt = null, that = `#${this._alias}d_modulo`;
        $(that).html('');
        this._txtEval = '';
        $.each(data, (i, v) => {
            cnt = `
                <div class="col-lg-4">
                    <div class="panel panel-warning">
                        <div class="panel-heading"}>
                            <i class="fa fa-folder"></i> ${i}
                            <div class="pull-right">
                                <div class="btn-group">
                                    <div id="btns_${i}" class="btn-group _prt">
                                        <button data-toggle="dropdown" class="btn btn-primary btn-xs dropdown-toggle" aria-expanded="false"><span class="caret"></span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="panel-body"}>
                            <div id="f_${i}" class="text-left lv-arbol" style="height:200px;overflow:auto"></div>
                        </div>
                    </div>
                </div>`;
            $(that).append(cnt);
            $(`#btns_${i}`).data('kmodulo', i);

            $.fn.appButton.get({
                aliasBtn: i,
                container: `#btns_${i}`,
                keymnu: this._alias,
                type: 'li',
                btns: [
                    {keybtn: APP_BTN.NEW, evts: [{click: 'Obj.Generar.ModuloAx.formNewOpcion'}]},
                    {keybtn: APP_BTN.DEL, evts: [{click: 'Obj.Generar.ModuloAx.postDeleteFolder'}]}
                ]
            });

            $(`#f_${i}`).html(`<ul id="ulchild_${v.id_menu}" class="tree">${this._childrensFoldres.call(this, v, i)}</ul>`);
            eval(this._txtEval);
        });

    }

    addEvtsElements(tk) {
        $(`#${this._alias}lst_tipo`).off('change');
        $(`#${this._alias}lst_tipo`).change((e, v) => {
            switch (v.selected) {
                case 'CRUD':
                    this._getTablesDB(tk);
                    break;
                default:
                    $(`#${this._alias}d_area_crud`).addClass('hide');
                    break;
            }
        });

        $(`#${this._alias}txt_title_form`).off('keyup');
        $(`#${this._alias}txt_title_form`).keyup((e, v) => {
            if ($.trim(e.currentTarget.value).length > 0) {
                $(`#${this._alias}tForm`).find('h4').attr('data-tr', e.currentTarget.value).html(eval(`APP_ETIQUET.${e.currentTarget.value}`));
            } else {
                $(`#${this._alias}tForm`).find('h4').attr('data-tr', 'without_title').html(APP_ETIQUET.without_title);
            }
        });
        var t = this;
        $(`#${this._alias}formDesigned`).sortable({
            revert: true,
            stop: (ui, helper) => {
                this._addOrder();
                //guardo orden de elemento seleccionado
                this._configElements[this._elementSelected].order = $(`#${this._alias}formDesigned`).find('.f_element_in_selected').data('order');
            }
        });
        $('.f_element').draggable({
            cursor: 'move',
            connectToSortable: `#${t._alias}formDesigned`,
            helper: function (ui) {
                let t = $(ui.currentTarget).find('span').html();
                return `<div class="grag_element" t="${t.toLowerCase()}" style="margin:0px;width:275px;opacity:0.8;height: 50px;"></div>`;
            },
            revert: "invalid",
            stop: function (e, ui) {
                t._createElement(ui);
            }
        });
        $('.f_element').click((e) => {
            this._createElement($(e.currentTarget));
        });

        //evento al scroll, para mantener las pestañas de configuracion al nivel de los elementos
        $(`#${this._alias}formNewComponent`).scroll(function () {
            if ($(this).scrollTop() > 165) {
                $(".panel_field").css({
                    'margin-top': $(this).scrollTop() - 182
                });
            } else {
                $(".panel_field").css({
                    'margin-top': 0
                });
            }
        });
    }

};         