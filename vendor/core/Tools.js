"use strict";
class Tools_ {

    constructor() {
        this._tabs = $("#cont-general-tabs-sys").tabs();
        this._tabTemplate = `<li style='position:relative;border-radius: 3px 3px 0 0;-moz-border-radius: 3px 3px 0 0;-webkit-border-radius: 3px 3px 0 0;' id='#{idli}'> 
                                <span class='delete-tab' style='top:2px; left:2px;position:absolute;'>
                                    <button class='btn btn-xs font-xs btn-default hover-transparent'><i class='fa fa-times'></i></button>
                                </span>
                                <a href='#{href}'>&nbsp;&nbsp;&nbsp; #{label}</a>
                            </li>`;
    }

    addTab(obj) {
        /*verificar si tab existe.*/
        if ($('#cont-general-tabs-sys').find('#' + obj.id + '_CONTAINER').length > 0) {
            $('#li-' + obj.id).remove();
            $('#cont-general-tabs-sys').find('#' + obj.id + '_CONTAINER').remove();
        }

        let li = $(this._tabTemplate.replace(/#\{href\}/g, "#" + obj.id + '_CONTAINER').replace(/#\{label\}/g, obj.label).replace(/#\{idli\}/g, 'li-' + obj.id));
        let tabContentHtml = (obj.content !== undefined) ? obj.content : `<h1><i class="fa fa-cog fa-spin"></i> ${APP_ETIQUET.loading}</h1>`;

        this._tabs.find("#cont-tabs-sys").append(li);
        this._tabs.find('#cont-main-sys').append("<div id='" + obj.id + "_CONTAINER' class='tab-pane'><p>" + tabContentHtml + "</p></div>");
        this._tabs.tabs("refresh");

        if (obj.breadCrumb) {
            $(obj.context._dmain).html(this.breadCrumb(obj.breadCrumb));
        } else {
            console.log('[breadCrumb] es requerido en Tools.addTab');
        }

        if (obj.fnCallback !== undefined) {
            if (obj.context == undefined) {
                console.log('[context] no definido.');
            }
            obj.fnCallback(obj.context);
            $('#process-general').fadeOut();
        }

        $('#li-' + obj.id).find('a').click();

    }

    closeTabs() {
        let t = this;
        $("#cont-general-tabs-sys").on("click", 'span.delete-tab', function () {
            /*detecto id de tab dentro del contenedro del aplicativo*/
            let panelId = $(this).closest("li").remove().attr("aria-controls");
            $("#" + panelId).remove();
            t._tabs.tabs("refresh");
        });
    }
    
    closeTab(e){
        $(`#li-${e}`).find('.delete-tab').click();
        $('html,body').animate({scrollTop:0}, '100');
    }

    /*
     * mensajes
     */
    notify() {
        let m = {
            ok: function (obj) {
                $.smallBox({
                    title: (obj.title !== undefined) ? obj.title : APP_MSN.msn_sys,
                    content: (obj.content !== undefined) ? obj.content : "No content",
                    color: (obj.color !== undefined) ? obj.color : "#739E73",
                    iconSmall: (obj.icon !== undefined) ? obj.icon : "fa fa-check shake animated",
                    timeout: (obj.timeout !== undefined) ? obj.timeout : 6000
                });
                if (obj.callback !== undefined) {
                    obj.callback();
                }
            },
            error: function (obj) {
                $.smallBox({
                    title: (obj.title !== undefined) ? obj.title : APP_MSN.msn_sys,
                    content: (obj.content !== undefined) ? obj.content : "No content",
                    color: (obj.color !== undefined) ? obj.color : "#C46A69",
                    iconSmall: (obj.icon !== undefined) ? obj.icon : "fa fa-warning shake animated",
                    timeout: (obj.timeout !== undefined) ? obj.timeout : 6000
                });
                if (obj.callback !== undefined) {
                    obj.callback();
                }
            },
            info: function (obj) {
                $.bigBox({
                    title: (obj.title !== undefined) ? obj.title : APP_MSN.msn_sys,
                    content: (obj.content !== undefined) ? obj.content : "No content",
                    color: (obj.color !== undefined) ? obj.color : "#3276B1",
                    timeout: (obj.timeout !== undefined) ? obj.timeout : 6000,
                    icon: (obj.icon !== undefined) ? obj.icon : "fa fa-bell swing animated",
                    number: (obj.number !== undefined) ? obj.number : "1"
                });
                if (obj.callback !== undefined) {
                    obj.callback();
                }
            },
            warning: function (obj) {
                $.bigBox({
                    title: (obj.title !== undefined) ? obj.title : APP_MSN.msn_sys,
                    content: (obj.content !== undefined) ? obj.content : "No content",
                    color: (obj.color !== undefined) ? obj.color : "#C79121",
                    timeout: (obj.timeout !== undefined) ? obj.timeout : 6000,
                    icon: (obj.icon !== undefined) ? obj.icon : "fa fa-shield fadeInLeft animated",
                    number: (obj.number !== undefined) ? obj.number : "1"
                });
                if (obj.callback !== undefined) {
                    obj.callback();
                }
            },
            msn: function (obj) {
                $.smallBox({
                    title: (obj.title !== undefined) ? obj.title : APP_MSN.msn_sys,
                    content: (obj.content !== undefined) ? obj.content : "No content",
                    color: (obj.color !== undefined) ? obj.color : "rgb(199, 145, 33)",
                    timeout: (obj.timeout !== undefined) ? obj.timeout : 6000,
                    icon: (obj.icon !== undefined) ? obj.icon : "fa fa-bell swing animated"
                });
                if (obj.callback !== undefined) {
                    obj.callback();
                }
            },
            smallMsn: function (obj) {
                $.smallBox({
                    title: (obj.title !== undefined) ? obj.title : APP_MSN.msn_sys,
                    content: (obj.content !== undefined) ? obj.content : "No content",
                    color: (obj.color !== undefined) ? obj.color : "#296191",
                    iconSmall: (obj.icon !== undefined) ? obj.icon : "fa fa-thumbs-up bounce animated",
                    timeout: (obj.timeout !== undefined) ? obj.timeout : 6000
                });
                if (obj.callback !== undefined) {
                    obj.callback();
                }
            },
            confirm: function (obj) {
                $.SmartMessageBox({
                    title: `<b>${APP_MSN.msn_sys}</b>`,
                    content: (obj.content !== undefined) ? obj.content : "No content",
                    buttons: '[No][Si]'
                }, function (ButtonPressed) {
                    if (obj.context == undefined) {
                        console.log('[context] no definido, puede causar errores para ejecucion de callback');
                    }
                    if (ButtonPressed === "Si") {
                        if (obj.yes !== undefined) {
                            obj.yes();
                        }
                    }
                    if (ButtonPressed === "No") {
                        if (obj.not !== undefined) {
                            obj.not();
                        }
                    }
                });
            },
            alert: function (obj) {
                $.SmartMessageBox({
                    title: APP_MSN.msn_sys,
                    content: (obj.content !== undefined) ? obj.content : "No content",
                    buttons: '[Aceptar]'
                }, function (ButtonPressed) {
                    if (ButtonPressed === "Aceptar") {
                        if (obj.callback !== undefined) {
                            obj.callback();
                        }
                    }
                });
            }
        };
        return m;
    }

    /*
     * Agregar alias a HTML
     * @param {type} data
     * @param {type} alias
     * @returns {undefined}
     */
    addAliasData(data, alias, formName) {
        let sc = null, idsc = null, c = null, ee = null;

        $(data).find('input,div,span,select,textarea,label,button,js,a,ul,li,code').each(function (i, v) {
            if ($(v).attr('href') != undefined && /#/.test($(v).attr('href'))) {
                $(`#${alias}${formName}`).find(`a[href="${$(v).attr('href')}"]`).attr('href', `#${alias}${$(v).attr('href').replace('#', '')}`);
            }
            if ($(v).attr('name') != undefined) {
                $(`#${v.id}`).attr('name', alias + $(v).attr('id'));
            }
            if ($(v).attr('id') != undefined) {
                $(`#${v.id}`).attr('id', alias + $(v).attr('id'));
            }
            if ($(v).attr('for') != undefined) {
                $(`#${alias}${formName}`).find(`label[for="${$(v).attr('for')}"]`).attr('for', alias + $(v).attr('for'));
            }
            if ($(v).prop('tagName') == 'JS') {
                idsc = alias + $(v).attr('id');
                sc = $(v).html();

                let cont = 0, nwJS, isForm = true;
                /*agregando ALIAS  <js>*/
                $(data).find('input,div,span,select,textarea,label,button,form').each(function (ii, vv) {
                    /*para id de <form>*/
                    if ($(vv).parent().prop('tagName') == 'FORM' && isForm) {
                        c = sc;
                        ee = eval(`c.replace(/${formName}/gi,'${alias}${formName}')`);
                        $(`#${idsc}`).html(ee);
                        isForm = false;
                    }
                    if ($(vv).attr('id') != undefined && !isForm) {
                        cont++;
                        c = (cont == 1) ? $(`#${idsc}`).html() : nwJS;
                        ee = eval(`c.replace(/${vv.id}/gi,'${alias}${vv.id}');`);
                        nwJS = ee;
                        ee = eval(`ee.replace(/__PK__/gi,"'${_sys_sg}'")`);
                        $(`#${idsc}`).html(ee);
                    }
                });
            }
        });
        $(`#${$(`#${idsc}`).parent('form').attr('id')}`).append(`<script>${$(`#${idsc}`).html()}</script>`);
        $(`#${$(`#${idsc}`).parent('form').attr('id')}`).find('script').remove();
        $(`#${$(`#${idsc}`).parent('form').attr('id')}`).find('js').remove();
    }

    /*
     * Traduce todas las etiquetas del app
     * @param {type} root
     * @returns {undefined}
     */
    traslation(lang) {
        if ($.isEmptyObject(lang)) {
            var ln = window.navigator.language || navigator.browserLanguage;
            var lang = ln.split('-')[0].toUpperCase();
        }

        Exe.require({require: `${APP_ROOT}config/!18n/lang_${lang}`, callback: () => {
                var elems = document.querySelectorAll(".tr-language"), ev = '';
                for (var x = 0; x < elems.length; x++) {
                    ev = `lang_${lang}.etiquet[ '${elems[x].dataset.tr}' ]`;
                    elems[x].innerHTML = eval(ev);

                    $(elems[x]).removeClass('tr-language'); /*se elimina clse de traduccion despues de efectuada la traduccion*/
                    $(elems[x]).addClass('tr-language-ok');
                }
                //los placeholders
                elems = document.querySelectorAll(".tr-language-ph"), ev = '';
                for (var x = 0; x < elems.length; x++) {
                    ev = `lang_${lang}.etiquet[ '${elems[x].dataset.trph}' ]`;
                    elems[x].placeholder = eval(ev);

                    $(elems[x]).removeClass('tr-language-ph');
                    $(elems[x]).addClass('tr-language-ok');
                }

                //los titles
                elems = document.querySelectorAll(".tr-language-title"), ev = '';
                for (var x = 0; x < elems.length; x++) {
                    ev = `lang_${lang}.etiquet[ '${elems[x].dataset.trtitle}' ]`;
                    elems[x].title = eval(ev);

                    $(elems[x]).removeClass('tr-language-title');
                    $(elems[x]).addClass('tr-language-ok');
                }
                //los onoffswitch
                elems = document.querySelectorAll(".tr-language-onoffswitch"), ev = '';
                for (var x = 0; x < elems.length; x++) {
                    ev = `lang_${lang}.etiquet[ '${$(elems[x]).data('swchon-text')}' ]`;
                    elems[x].setAttribute('data-swchon-text', eval(ev));

                    ev = `lang_${lang}.etiquet[ '${$(elems[x]).data('swchoff-text')}' ]`;
                    elems[x].setAttribute('data-swchoff-text', eval(ev));

                    $(elems[x]).removeClass('tr-language-onoffswitch');
                    $(elems[x]).addClass('tr-language-ok');
                }


                APP_MSN = eval(`lang_${lang}.msn`); /*para los alertas*/
                APP_ETIQUET = eval(`lang_${lang}.etiquet`); /*para etiquetas y placeholders*/
                APP_TOUR = eval(`lang_${lang}.tour`); /*para las etiquetas del tour*/
                localStorage.setItem('app_lang', lang);
            }
        });

        Exe.require({require: `${APP_ROOT}config/!18n/tour_${lang}`, callback: () => {
                APP_TOUR = eval(`tour_${lang}`); /*para las etiquetas del tour*/
            }
        });
    }

    getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
        //compatibility for firefox and chrome
        var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        var pc = new myPeerConnection({
            iceServers: []
        }),
                noop = function () {},
                localIPs = {},
                ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
                key;

        function iterateIP(ip) {
            if (!localIPs[ip])
                onNewIP(ip);
            localIPs[ip] = true;
        }

        //create a bogus data channel
        pc.createDataChannel("");

        // create offer and set local description
        pc.createOffer().then(function (sdp) {
            sdp.sdp.split('\n').forEach(function (line) {
                if (line.indexOf('candidate') < 0)
                    return;
                line.match(ipRegex).forEach(iterateIP);
            });

            pc.setLocalDescription(sdp, noop, noop);
        }).catch(function (reason) {
            // An error occurred, so handle the failure to connect
        });

        //listen for candidate events
        pc.onicecandidate = function (ice) {
            if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex))
                return;
            ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
        };
    }

    /*
     * Traduce de idioma las etiquetas de el menu y los botones
     * @param {type} text
     * @returns {Tools_.traslate.t2}
     */
    traslate(text) {
        let lang = localStorage.getItem('app_lang');
        let t1 = text.split(',');
        let t2 = null;
        let t3 = null;

        $.each(t1, function (i, v) {
            t2 = v.split('-');

            if (lang == t2[0]) {
                t3 = v.replace(`${lang}-`, '');//quito el alis del idioma y el guion
            }
        });

        return t3;
    }

    en(c) {
        return Aes.Ctr.post(c, 256);
    }

    de(c) {
        return Aes.Ctr.get(c, 256);
    }

    htmlEntities(str) {
        return String(str).replace(/&#039;/g, "'")
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;');
    }

    htmlEntitiesDecode(txt) {
        return $('<textarea />').html(txt).text();
    }

    /*
     * 
     * @param {type} obj
     * @returns {undefined}
     * @uso 
     *       Tools.listBox({
     *           data: data,
     *           optionSelec: true,
     *           content: 'content',
     *           attr:{
     *               id: 'lst_element',
     *               name: 'lst_element'
     *           },
     *           dataView:{
     *               etiqueta: 'db_etiqueta',
     *               value: 'db_value'
     *           }
     *       });
     * 
     */
    listBox(obj) {
        var data = obj.data,
                optionSelec = (obj.optionSelec === undefined) ? true : obj.optionSelec, /*para mostrar texto seleccionar*/
                content = obj.content, /*id deelemento donde se cargara <select>*/
                required = (obj.required === undefined) ? false : obj.required,
                deffault = (obj.default !== undefined) ? obj.default : '', /*para seleccionar un registro por defecto*/
                fnCallback = (obj.fnCallback !== undefined) ? obj.fnCallback : '', /*funcion anonima*/
                dataView = obj.dataView, /*la data a setear en <select>*/
                attr = '', /*los atributos html del <select>*/
                chosen = (obj.chosen === undefined) ? true : obj.chosen,
                optionAll = (obj.optionAll === undefined) ? false : obj.optionAll,
                parent = (obj.parent === undefined) ? '' : obj.parent,
                group = (obj.group === undefined) ? false : obj.group;

        var iidd = '';
        if (obj.attr !== undefined && obj.attr !== '') {
            for (var i in obj.attr) {
                if (i == 'id') {
                    iidd = obj.attr[i];
                }
                attr += i + '="' + obj.attr[i] + '" ';
            }
        }
        var cb = '<select ' + attr + '>';
        if (optionSelec) {
            cb += '<option value="">' + APP_ETIQUET.seleccionar + '</option>';
        }
        if (optionAll) {
            cb += '<option value="ALL">' + APP_ETIQUET.todos + '</option>';
        }
        var sel = '';
        var id = '';
        var value = '';
        var dataAttr = '';
        var grupo = '', idx = '';

        $.each(data, function (i, v) {
            id = '';
            dataAttr = '';

            /*creando data-*/
            if (dataView.attr !== undefined) {
                if ($.isArray(dataView.attr)) {
                    for (var k in dataView.attr) {
                        dataAttr += 'data-' + dataView.attr[k] + '="' + eval('data[i].' + dataView.attr[k]) + '" ';
                    }
                } else {
                    dataAttr = 'data[i].' + dataView.attr;
                    dataAttr = 'data-' + dataView.attr + '="' + eval(dataAttr) + '" ';
                }
            }

            if ($.isArray(dataView.value)) {
                for (var j in dataView.value) {
                    id += eval('data[i].' + dataView.value[j]) + '-';
                }

                id = id.substring(0, id.length - 1);

            } else {
                id = 'data[i].' + dataView.value;
                id = eval(id);
            }

            value = '';
            if ($.isArray(dataView.etiquet)) {
                for (var j in dataView.etiquet) {
                    value += eval('data[i].' + dataView.etiquet[j]) + ' - ';
                }

                value = value.substring(0, value.length - 2);

            } else {
                value = 'data[i].' + dataView.etiquet;
                value = eval(value);
            }
            sel = '';

            if (group === false) {
                if (deffault == id) {
                    sel = ' selected = "selected" ';
                }
                cb += '<option value="' + id + '" ' + sel + ' ' + dataAttr + '>' + value + '</option>';
            } else {
                if (parent === eval('data[i].parent')) {
                    grupo = eval('data[i].' + dataView.etiquet);
                    cb += '<optgroup class="' + id + '" label="' + grupo + '" >';
                    for (var j in data) {
                        if (eval('data[j].parent') === id) {
                            sel = '';
                            if (deffault === eval('data[j].' + dataView.value)) {
                                sel = '  selected="selected" ';
                            }
                            value = eval('data[j].' + dataView.etiquet);
                            idx = eval('data[j].' + dataView.value);
                            cb += '<option value="' + idx + '" ' + sel + ' ' + dataAttr + '>' + value + '</option>';
                        }
                    }
                    cb += '</optgroup>';
                }
            }
        });
        cb += '</select>';

        if (!chosen) {
            cb += '<i></i>';
        }

        if (content == 'return') {
            return cb;
        } else {
            $(content).html(cb);
        }
        if (chosen) {
            $('#' + iidd).chosen();
            $('#' + iidd + '_chosen').css({width: '100%'});
            if (required) {
                $('#' + iidd + '_chosen').find('a.chosen-default').addClass('lv-requided');
                $('#' + iidd + '_chosen').find('a.chosen-default').find('> div').css({'margin-right': '10px'});
            }
        }
        if (fnCallback !== '') {
            fnCallback();
        }
    }

    ucfirst(str) {
        return str.charAt(0).toUpperCase() + str.substr(1);
    }

    breadCrumb(data) {
        let d = data.split('/');
        let b = `
        <ul class="lv-breadcrumb">
            <li><a href="javascript:;"><i class="fa fa-home"></i></a></li>`;
        $.each(d, function (i, v) {
            b += `<li><a href="javascript:;">${v}</a></li>`;
        });
        b += `</ul><div class="lv-divider-bread"></div>`;
        return b;
    }

    spinner() {
        return {
            main: `
            <h1><i class="fa fa-cog fa-spin"></i> ${APP_ETIQUET.loading}</h1>`
        };
    }

    tree(el) {
        /*apagar para q efectono se duplique*/
        $(el)
                .find("li:has(ul)")
                .addClass("parent_lili")
                .attr("role", "treeitem")
                .find(" > span").not('a')
                .off("click");

        $(el + " > ul").attr("role", "tree").find("ul").attr("role", "group"),
                $(el)
                .find("li:has(ul)")
                .addClass("parent_lili")
                .attr("role", "treeitem")
                .find(" > span").not('a')
                .on("click", function (a) {

                    var b = $(this).parent("li.parent_lili").find(" > ul > li");

                    b.is(":visible") ? (b.hide("fast"),
                            $(this).find(" > i")
                            .addClass("fa-folder")
                            .removeClass("fa-folder-open")) : (b.show("fast"),
                            $(this).find(" > i")
                            .addClass("fa-folder-open")
                            .removeClass("fa-folder")),
                            a.stopPropagation();
                });
    }

    /*
     * Cierra y quita los modals del DOM
     * @param {type} obj
     * @returns {undefined}
     */
    closeModal(obj) {
        var search = obj.toString().indexOf('#'), id = '';
        if (search === -1) {/*cuando se cierra modal desde botones*/
            id = '#' + $(obj).parent().parent().parent().parent().attr('id');
        } else {/*cuando se cierra modal desde closeModal*/
            id = obj;
        }

        $(id).modal('hide');
        setTimeout(function () {
            $(id).remove();
            $(id + '_modalFormBoot').remove();
        }, 200);
        $(".modal").off("keypress");/*quitar evento que se agrega al momento de usar el TREE.php*/
    }

    execMessage(obj) {
        eval(`
            Tools.notify().${obj.ok_error}({
                content: APP_MSN.${obj.mensaje}
            });
        `);
    }

    /*
     * Carga data de formulario
     * @param {type} form
     * @param {type} obj
     * @returns {undefined}
     * Tools.setDataForm(this._formEditMenu, {
     alias: this._alias,
     elements: [
     
     {item: 'txt_alias', value: data.alias},
     {item: 'chk_activo', value: data.activo, type: 'checkbox'}
     ]
     });
     */
    setDataForm(form, obj) {
        let alias = obj.alias, type, item, value, callback, chkrd;

        $.each(obj.elements, function (i, v) {
            type = (v.type !== undefined) ? v.type : 'input';
            item = (v.item !== undefined) ? v.item : '';
            value = (v.value !== undefined) ? v.value : '';
            callback = (v.callback !== undefined && $.isFunction(v.callback)) ? v.callback : null;

            if ((type == 'input' || type == 'select') && !$.isEmptyObject(value)) {
                $(form).find(`#${alias}${item}`).val(value);
                if (type == 'select') {
                    $(form).find(`#${alias}${item}`).chosen("destroy").chosen().trigger('chosen:updated');
                }
            }
            if (type == 'multiple' && !$.isEmptyObject(value)) {
                let data = value.split(',');
                $.each(data, function (i, v) {
                    $(form).find(`#${alias}${item} option[value=${v}]`).attr('selected', true);
                });

                $(form).find(`#${alias}${item}`).chosen("destroy").chosen().trigger('chosen:updated');
            }
            if (type == 'radio' || type == 'checkbox') {
                chkrd = (value == '1') ? true : false;
                $(form).find(`#${alias}${item}`).prop('checked', chkrd);
            }

            if (callback) {
                callback();
            }

        });
    }

    /*
     * Marcar / Desmarcar los checks de grid
     * @param {type} el
     * @param {type} tab
     */
    checkAll(el, tab) {
        $(tab).find('tbody').find('tr').each(function () {
            if ($(el).is(':checked')) {
                if (!$(this).find('.chkG').is(':checked')) {
                    $(this).find('.chkG').click();
                }
            } else {
                if ($(this).find('.chkG').is(':checked')) {
                    $(this).find('.chkG').click();
                }
            }
        });
    }

    randomColor() {
        return '#' + (Math.random().toString(16) + "000000").substring(2, 8);
    }
    /*
     * Agrega boton tour al tab principal de cada opcion
     * @returns {undefined}
     */
    addTourMain() {
        let dt = $('<div></div>');
        dt.css({
            position: 'fixed',
            bottom: '0px',
            right: '0px',
            padding: '5px',
            'z-index': 3
        });
        let c = Tools.randomColor();
        dt.html(`<button id="${this._alias}btnTourMain" type="button" title="${APP_ETIQUET.tour}" class="btn btn-info btn-lg " style="background-color: ${c};padding: 12px 17px;"><i class="fa fa-question-circle"></i></button>`);

        $(`#${this._alias}_CONTAINER`).append(dt);

        $(`#li-${this._alias}`).find('a').css({
            color: c
        });


        $(`#${this._alias}btnTourMain`).off('click');
        $(`#${this._alias}btnTourMain`).click(() => {
            this._tour.main.call(this);
        });
    }

    addTourModal(cont, callBack) {
        let idBtn = cont.replace('#', '');
        $(cont).prepend(`<button id="${idBtn}btnTour" type="button" class="btn btn-info" style="background:#fb3c4a" title="${APP_ETIQUET.tour}"><i class="fa fa-question-circle"></i></button>`);
        $(`#${idBtn}btnTour`).off('click');

        if (typeof callBack == 'function') {
            $(`#${idBtn}btnTour`).click(() => {
                callBack.call(this);
            });
        }
    }

    refreshGrid(grid) {
        $('#btnRefresh_' + grid).click();
    }
    /*
     * activa diseño de input tipo TAGS
     * @param {type} obj
     * @returns {undefined}
     */
    tagsInput(obj) {
        setTimeout(function () {
            $('.tagsinput').tagsinput({id: `${obj.context._alias}tagsinput`});
            $('.bootstrap-tagsinput').addClass('col-lg-12');
        }, 100);
    }
    /*
     * Imprime un area
     * @param {type} opt
     * @returns {undefined}
     */
    printArea(opt) {
        let defaults = {
            area: null,
            orientation: 'portrait',
            css: ''
        };

        let settings = $.extend(defaults, opt);

        $(settings.area).printElement({
            overrideElementCSS: false,
            printBodyOptions: {
                styleToAddHead: `                
                    @page{
                        size: 210mm 297mm ${settings.orientation};
                        margin:0;                        
                    } 
                    body{
                        margin:0;
                    } 
                    @media all { 
                        .area_print{
                            padding-left: 10mm;
                            padding-right: 10mm;
                            padding-bottom: 5mm;
                            padding-top: 5mm;
                        }
                        div { font-family: arial, sans-serif; } 
                        ${settings.css}
                    } 
                    @media print{ 
                        .area_print{
                            padding-left: 10mm;
                            padding-right: 10mm;
                            padding-bottom: 5mm;
                            padding-top: 5mm;
                        }
                        div { font-family: arial, sans-serif; } 
                        ${settings.css}
                    }`
            }
        });
    }

}

const Tools = new Tools_();
/*agregar eventos a boton cerrar de TABS de cada opcion*/
Tools.closeTabs();