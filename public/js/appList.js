"use strict";

(function ($) {

    $.fn.extend({

        appList: function (opt) {

            let defaults = {

                items: []
            };

            var options = $.extend(defaults, opt);

            /*=========================================METODOS PRIVADOS=========================================*/
            var _private = {
                render: function (oSettings) {
                    var flags = '';
                    $.each(oSettings.items, function (i, v) {
                        flags += `${v.data},`;
                    });
                    flags = flags.substr(0, flags.length - 1);

                    flags = flags.split(',');
                    flags = flags.filter((v, i, a) => a.indexOf(v) === i);
                    flags = flags.join();

                    var a = new Resource();

                    $.ajax({
                        type: "POST",
                        data: {flags: flags,_qn:Tools.en(_tk_)},
                        url: 'system/init/getLista',
                        dataType: 'json',
                        cache: false,
                        success: function (data) {
                            a.finishServer();
                            $.each(oSettings.items, function (i, v) {
                                _private.createList(v.data, data, v);
                            });
                        }
                    });

                }, createList: function (i, data, item) {
                    var
                            container,
                            onClick = (item.onClick == undefined) ? '' : item.onClick,
                            attr,
                            _default,
                            _rs,
                            _required,
                            fnCaptureKey = (item.fnCaptureKey == undefined) ? '' : item.fnCaptureKey,
                            parent,
                            type = (item.type == undefined) ? 'list' : item.type;

                    $.each(data, function (ii, vv) {
                        $.each(vv, function (a, v) {
                            if (a == i) {
                                container = item.container;
                                attr = item.attr;
                                _default = item.default;
                                _rs = v;
                                parent = item.parent;
                                _required = (item.required != undefined)?item.required:false;
                            }
                        });
                    });
 
                    if (type == 'list') {
                        Tools.listBox({
                            data: _rs,
                            optionSelec: true,
                            content: container,
                            default: _default,
                            chosen: true,
                            attr: attr,
                            required: _required,
                            dataView: {
                                etiquet: 'value',
                                value: 'key'
                            }
                        });
                    } else if (type == 'tree') {
                        $(container).arbol({
                            sData: _rs,
                            parent: parent,
                            enterSearch: true,
                            defaultEtiquet: _default,
                            fnCaptureKey: fnCaptureKey,
                            onClick:onClick
                        });
                    }
                }
            };
            /*=========================================FIN METODOS PRIVADOS=====================================*/

            return this.each(function () {
                var oSettings = options;
                let method = {
                    init: function () {
                        _private.render.call(this, oSettings);
                    }
                };
                method.init.call(this);
            });

        }


    });

})(jQuery);