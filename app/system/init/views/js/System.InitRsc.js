"use strict";
Exe.require({require: {system: 'init::System.InitTour'}, run: false});
$$.System.InitRsc = class InitRsc extends Resource {

    constructor() {
        super();

        this._renderPreConversion = (data, c) => {
            let h = '', tpecs = 'x', talleres;
            $.each(data, (i, e) => {
                if (tpecs != e.id_pecs) {
                    talleres = $.grep(data, function (x) {
                        return x.id_pecs == e.id_pecs;
                    });
                    h += `
                <fieldset>
                    <legent>PEC - ${e.pecs}</legend>   
                    <div class="well">
                        <div class="panel-group smart-accordion-default" >`;
                    $.each(talleres, (ii, ee) => {
                        h += `
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4 class="panel-title">
                                    <a data-toggle="collapse" href="#coPreConv-${ii}" class="collapsed"> 
                                        <i class="fa fa-fw fa-plus-circle txt-color-green"></i> 
                                        <i class="fa fa-fw fa-minus-circle txt-color-red"></i> TALLER - ${ee.taller} <span class="sparkline" data-sparkline-type="line" data-sparkline-width="50px" data-sparkline-height="18px">${Tools.stringRreverse(ee.preconversiones_aprobadas_mensual)}</span>
                                    </a>
                                </h4>
                            </div>
                            <div id="coPreConv-${ii}" class="panel-collapse collapse table-responsive">
                                <div class="panel-body">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>${APP_ETIQUET.taller}</th>
                                                <th>${APP_ETIQUET.verifygas}</th>
                                                <th>${APP_ETIQUET.calidda}</th>
                                            <tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th width="20%" style="background-image: -webkit-linear-gradient(top,#f2f2f2 0,#fafafa 100%)">${APP_ETIQUET.aprobados}</th>
                                                <td class="text-center"><span class="label label-success">${ee.aprobados_t}</span></td>
                                                <td class="text-center"><span class="label label-success">${ee.aprobados_v}</span></td>
                                                <td class="text-center"><span class="label label-success">${ee.aprobados_c}</span></td>
                                            </tr>
                                            <tr>
                                                <th style="background-image: -webkit-linear-gradient(top,#f2f2f2 0,#fafafa 100%)">${APP_ETIQUET.rechazados}</th>
                                                <td class="text-center"><span class="label label-danger">${ee.rechazados_t}</span></td>
                                                <td class="text-center"><span class="label label-danger">${ee.rechazados_v}</span></td>
                                                <td class="text-center"><span class="label label-danger">${ee.rechazados_c}</span></td>
                                            </tr>
                                            <tr>
                                                <th style="background-image: -webkit-linear-gradient(top,#f2f2f2 0,#fafafa 100%)">${APP_ETIQUET.pendientes}</th>
                                                <td class="text-center"><span class="label label-default">${ee.pendientes_t}</span></td>
                                                <td class="text-center"><span class="label label-default a_bpV"><a href="javascript:;">${ee.pendientes_v}</a></span></td>
                                                <td class="text-center"><span class="label label-default a_bpC"><a href="javascript:;">${ee.pendientes_c}</a></span></td>
                                            </tr>
                                            <tr>
                                                <th colspan="4" style="background-image: -webkit-linear-gradient(top,#f2f2f2 0,#fafafa 100%)">${APP_ETIQUET.total_clientes} <span class="label label-success">${ee.total}</span></th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>`;
                    });
                    h += `
                        </div>
                    </div>
                </fieldset>`;
                }
                tpecs = e.id_pecs;
            });
            $(`#${this._alias}panelPreconversion`).html(h);
            if (c != 'X') {
                $(`.a_bp${c}`).click(function () {
                    alert(888)
                    $(`#li_64 a`).click();
                });
            }
        };

        this._renderConversion = (data, isClick) => {
            let h = '', tpecs = 'x', talleres;
            $.each(data, (i, e) => {
                if (tpecs != e.id_pecs) {
                    talleres = $.grep(data, function (x) {
                        return x.id_pecs == e.id_pecs;
                    });
                    h += `
                <fieldset>
                    <legent>PEC - ${e.pecs}</legend>   
                    <div class="well">
                        <div class="panel-group smart-accordion-default" >`;
                    $.each(talleres, (ii, ee) => {
                        h += `
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4 class="panel-title">
                                    <a data-toggle="collapse" href="#collapseOneConv-${ii}" class="collapsed"> 
                                        <i class="fa fa-fw fa-plus-circle txt-color-green"></i> 
                                        <i class="fa fa-fw fa-minus-circle txt-color-red"></i> TALLER - ${ee.taller} <span class="sparkline" data-sparkline-type="line" data-sparkline-width="50px" data-sparkline-height="18px">${Tools.stringRreverse(ee.conversiones_aprobadas_mensual)}</span>
                                    </a>
                                </h4>
                            </div>
                            <div id="collapseOneConv-${ii}" class="panel-collapse collapse table-responsive">
                                <div class="panel-body">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>${APP_ETIQUET.taller}</th>
                                                <th>${APP_ETIQUET.verifygas}</th>
                                            <tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th width="20%" style="background-image: -webkit-linear-gradient(top,#f2f2f2 0,#fafafa 100%)">${APP_ETIQUET.aprobados}</th>
                                                <td class="text-center"><span class="label label-success">${ee.aprobados_t}</span></td>
                                                <td class="text-center"><span class="label label-success">${ee.aprobados_v}</span></td>
                                            </tr>
                                            <tr>
                                                <th style="background-image: -webkit-linear-gradient(top,#f2f2f2 0,#fafafa 100%)">${APP_ETIQUET.rechazados}</th>
                                                <td class="text-center"><span class="label label-danger">${ee.rechazados_t}</span></td>
                                                <td class="text-center"><span class="label label-danger">${ee.rechazados_v}</span></td>
                                            </tr>
                                            <tr>
                                                <th style="background-image: -webkit-linear-gradient(top,#f2f2f2 0,#fafafa 100%)">${APP_ETIQUET.pendientes}</th>
                                                <td class="text-center"><span class="label label-default">${ee.pendientes_t}</span></td>
                                                <td class="text-center"><span class="label label-default a_pvc"><a href="javascript:;">${ee.pendientes_v}</a></span></td>
                                            </tr>
                                            <tr>
                                                <th colspan="4" style="background-image: -webkit-linear-gradient(top,#f2f2f2 0,#fafafa 100%)">${APP_ETIQUET.total_clientes} <span class="label label-success">${ee.total}</span></th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        
                        
                        `;
                    });
                    h += `
                        </div>
                    </div>
                </fieldset>`;
                }
                tpecs = e.id_pecs;
            });
            $(`#${this._alias}panelConversion`).html(h);
            if (isClick) {
                $(`.a_pvc`).click(function () {
                    $(`#li_56 a`).click();
                });
            }
        };

        this._graficaPreConversion = (data) => {
            var chart, chartData = [];

            $.each(data, (i, v) => {
                chartData.push({
                    "taller": v.taller,
                    "clientes": v.total
                });
            });

            // SERIAL CHART
            chart = new AmCharts.AmSerialChart();
            chart.dataProvider = chartData;
            chart.categoryField = "taller";
            chart.startDuration = 1;

//            let legend = new AmCharts.AmLegend();
//            legend.align = "center";
//            legend.markerType = "circle";
//            chart.balloonText = "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>";
//            chart.addLegend(legend);

            // AXES
            // category
            var categoryAxis = chart.categoryAxis;
            categoryAxis.labelRotation = 90;
            categoryAxis.gridPosition = "start";

            // value
            var valueAxis = new AmCharts.ValueAxis();
            valueAxis.gridAlpha = 0.2;
            valueAxis.gridColor = "#000";
            valueAxis.axisColor = "#000";
            valueAxis.axisAlpha = 0.5;
            valueAxis.dashLength = 5;
            valueAxis.title = APP_ETIQUET.clientes;
            valueAxis.titleColor = "#000";
            chart.addValueAxis(valueAxis);

            // GRAPHS
            var graph = new AmCharts.AmGraph();
            graph.title = APP_ETIQUET.clientes;
            graph.valueField = "clientes";
            graph.balloonText = "[[category]]: <b>[[value]]</b>";
            graph.type = "column";
            graph.lineAlpha = 0;
            graph.fillAlphas = 0.8;
            graph.lineColor = "#D2CB00";
            chart.addGraph(graph);

            // CURSOR
            var chartCursor = new AmCharts.ChartCursor();
            chartCursor.cursorAlpha = 0;
            chartCursor.zoomable = false;
            chartCursor.categoryBalloonEnabled = false;
            chart.addChartCursor(chartCursor);

            chart.creditsPosition = "top-right";

            chart.write(`${this._alias}graficaPreConversion`);
        };

        this._graficaConversion = (data) => {
            var chart, chartData = [];

            $.each(data, (i, v) => {
                chartData.push({
                    "taller": v.taller,
                    "clientes": v.total
                });
            });


            // SERIAL CHART
            chart = new AmCharts.AmSerialChart();
            chart.dataProvider = chartData;
            chart.categoryField = "taller";
            chart.startDuration = 1;

            // AXES
            // category
            var categoryAxis = chart.categoryAxis;
            categoryAxis.labelRotation = 90;
            categoryAxis.gridPosition = "start";

            // value
            var valueAxis = new AmCharts.ValueAxis();
            valueAxis.gridAlpha = 0.2;
            valueAxis.gridColor = "#000";
            valueAxis.axisColor = "#000";
            valueAxis.axisAlpha = 0.5;
            valueAxis.dashLength = 5;
            valueAxis.title = APP_ETIQUET.clientes;
            valueAxis.titleColor = "#000";
            chart.addValueAxis(valueAxis);

            // GRAPHS
            var graph = new AmCharts.AmGraph();
            graph.title = APP_ETIQUET.clientes;
            graph.valueField = "clientes";
            graph.balloonText = "[[category]]: <b>[[value]]</b>";
            graph.type = "column";
            graph.lineAlpha = 0;
            graph.fillAlphas = 0.8;
            graph.lineColor = "#D2CB00";
            chart.addGraph(graph);

            // CURSOR
            var chartCursor = new AmCharts.ChartCursor();
            chartCursor.cursorAlpha = 0;
            chartCursor.zoomable = false;
            chartCursor.categoryBalloonEnabled = false;
            chart.addChartCursor(chartCursor);

            chart.creditsPosition = "top-right";

            chart.write(`${this._alias}graficaConversion`);
        };

        this._graficaTallerPreConversion = (data) => {
            var chart, chartData = [];

            chartData.push({
                "estado": APP_ETIQUET.aprobados,
                "clientes": data.aprobados
            });

            chartData.push({
                "estado": APP_ETIQUET.rechazados,
                "clientes": data.rechazados
            });

            chartData.push({
                "estado": APP_ETIQUET.pendientes,
                "clientes": data.pendientes
            });


            // SERIAL CHART
            chart = new AmCharts.AmSerialChart();
            chart.dataProvider = chartData;
            chart.categoryField = "estado";
            chart.startDuration = 1;

            // AXES
            // category
            var categoryAxis = chart.categoryAxis;
            categoryAxis.labelRotation = 90;
            categoryAxis.gridPosition = "start";

            // value
            var valueAxis = new AmCharts.ValueAxis();
            valueAxis.gridAlpha = 0.2;
            valueAxis.gridColor = "#000";
            valueAxis.axisColor = "#000";
            valueAxis.axisAlpha = 0.5;
            valueAxis.dashLength = 5;
            valueAxis.title = APP_ETIQUET.clientes;
            valueAxis.titleColor = "#000";
            chart.addValueAxis(valueAxis);

            // GRAPHS
            var graph = new AmCharts.AmGraph();
            graph.title = APP_ETIQUET.clientes;
            graph.valueField = "clientes";
            graph.balloonText = "[[category]]: <b>[[value]]</b>";
            graph.type = "column";
            graph.lineAlpha = 0;
            graph.fillAlphas = 0.8;
            graph.lineColor = "#D2CB00";
            chart.addGraph(graph);

            // CURSOR
            var chartCursor = new AmCharts.ChartCursor();
            chartCursor.cursorAlpha = 0;
            chartCursor.zoomable = false;
            chartCursor.categoryBalloonEnabled = false;
            chart.addChartCursor(chartCursor);

            chart.creditsPosition = "top-right";

            chart.write(`${this._alias}graficaPreConversion`);
        };

        this._graficaTallerConversion = (data) => {
            var chart, chartData = [];

            chartData.push({
                "estado": APP_ETIQUET.aprobados,
                "clientes": data.aprobados_c
            });

            chartData.push({
                "estado": APP_ETIQUET.rechazados,
                "clientes": data.rechazados_c
            });

            chartData.push({
                "estado": APP_ETIQUET.pendientes,
                "clientes": data.pendientes_c
            });


            // SERIAL CHART
            chart = new AmCharts.AmSerialChart();
            chart.dataProvider = chartData;
            chart.categoryField = "estado";
            chart.startDuration = 1;

            // AXES
            // category
            var categoryAxis = chart.categoryAxis;
            categoryAxis.labelRotation = 90;
            categoryAxis.gridPosition = "start";

            // value
            var valueAxis = new AmCharts.ValueAxis();
            valueAxis.gridAlpha = 0.2;
            valueAxis.gridColor = "#000";
            valueAxis.axisColor = "#000";
            valueAxis.axisAlpha = 0.5;
            valueAxis.dashLength = 5;
            valueAxis.title = APP_ETIQUET.clientes;
            valueAxis.titleColor = "#000";
            chart.addValueAxis(valueAxis);

            // GRAPHS
            var graph = new AmCharts.AmGraph();
            graph.title = APP_ETIQUET.clientes;
            graph.valueField = "clientes";
            graph.balloonText = "[[category]]: <b>[[value]]</b>";
            graph.type = "column";
            graph.lineAlpha = 0;
            graph.fillAlphas = 0.8;
            graph.lineColor = "#D2CB00";
            chart.addGraph(graph);

            // CURSOR
            var chartCursor = new AmCharts.ChartCursor();
            chartCursor.cursorAlpha = 0;
            chartCursor.zoomable = false;
            chartCursor.categoryBalloonEnabled = false;
            chart.addChartCursor(chartCursor);

            chart.creditsPosition = "top-right";

            chart.write(`${this._alias}graficaConversion`);
        };

        this._graficaTallerEntrega = (data) => {
            var chart, chartData = [];

            chartData.push({
                "estado": APP_ETIQUET.aprobados,
                "clientes": data.aprobados_e
            });

            chartData.push({
                "estado": APP_ETIQUET.pendientes,
                "clientes": data.pendientes_e
            });


            // SERIAL CHART
            chart = new AmCharts.AmSerialChart();
            chart.dataProvider = chartData;
            chart.categoryField = "estado";
            chart.startDuration = 1;

            // AXES
            // category
            var categoryAxis = chart.categoryAxis;
            categoryAxis.labelRotation = 90;
            categoryAxis.gridPosition = "start";

            // value
            var valueAxis = new AmCharts.ValueAxis();
            valueAxis.gridAlpha = 0.2;
            valueAxis.gridColor = "#000";
            valueAxis.axisColor = "#000";
            valueAxis.axisAlpha = 0.5;
            valueAxis.dashLength = 5;
            valueAxis.title = APP_ETIQUET.clientes;
            valueAxis.titleColor = "#000";
            chart.addValueAxis(valueAxis);

            // GRAPHS
            var graph = new AmCharts.AmGraph();
            graph.title = APP_ETIQUET.clientes;
            graph.valueField = "clientes";
            graph.balloonText = "[[category]]: <b>[[value]]</b>";
            graph.type = "column";
            graph.lineAlpha = 0;
            graph.fillAlphas = 0.8;
            graph.lineColor = "#D2CB00";
            chart.addGraph(graph);

            // CURSOR
            var chartCursor = new AmCharts.ChartCursor();
            chartCursor.cursorAlpha = 0;
            chartCursor.zoomable = false;
            chartCursor.categoryBalloonEnabled = false;
            chart.addChartCursor(chartCursor);

            chart.creditsPosition = "top-right";

            chart.write(`${this._alias}graficaEntrega`);
        };

        this._evntsBtnsPreConversion = (data) => {
            //resultado y eventos a botones data.diarioAprobadas
            $(`#${this._alias}btn_aprobados_preconv span`).html(data.diarioAprobadasPreConversion.total);
            //si tiene total se le agrega evento para ver listado de aprobados
            $(`#${this._alias}btn_aprobados_preconv`).off('click').click(() => {
                if (data.diarioAprobadasPreConversion.total > 0) {
                    this._formListExpedientes(data.diarioAprobadasPreConversion.ids, 'A-PRECONV');
                } else {
                    Tools.notify().smallMsn({
                        content: APP_MSN.no_tiene_registros
                    });
                }
            });

            $(`#${this._alias}btn_rechazados_preconv span`).html(data.diarioRechazadosPreConversion.total);
            //si tiene total se le agrega evento para ver listado de rechazados

            $(`#${this._alias}btn_rechazados_preconv`).off('click').click(() => {
                if (data.diarioRechazadosPreConversion.total > 0) {
                    this._formListExpedientes(data.diarioRechazadosPreConversion.ids, 'R-PRECONV');
                } else {
                    Tools.notify().smallMsn({
                        content: APP_MSN.no_tiene_registros
                    });
                }
            });

            $(`#${this._alias}btn_pendientes_preconv span`).html(data.diarioPendientesPreConversion.total);
            //si tiene total se le agrega evento para ir a bandeja de pendientes
            $(`#${this._alias}btn_pendientes_preconv`).off('click').click(() => {
                if (data.diarioPendientesPreConversion.total > 0) {
                    $(`#li_64 a`).click();
                } else {
                    Tools.notify().smallMsn({
                        content: APP_MSN.no_tiene_registros
                    });
                }
            });
        };

        this._evntsBtnsConversion = (data) => {
            //resultado y eventos a botones data.diarioAprobadas
            $(`#${this._alias}btn_aprobados_conv span`).html(data.diarioAprobadasConversion.total);
            //si tiene total se le agrega evento para ver listado de aprobados
            $(`#${this._alias}btn_aprobados_conv`).off('click').click(() => {
                if (data.diarioAprobadasConversion.total > 0) {
                    this._formListExpedientes(data.diarioAprobadasConversion.ids, 'A-CONV');
                } else {
                    Tools.notify().smallMsn({
                        content: APP_MSN.no_tiene_registros
                    });
                }
            });

            $(`#${this._alias}btn_rechazados_conv span`).html(data.diarioRechazadosConversion.total);
            //si tiene total se le agrega evento para ver listado de rechazados
            $(`#${this._alias}btn_rechazados_conv`).off('click').click(() => {
                if (data.diarioRechazadosConversion.total > 0) {
                    this._formListExpedientes(data.diarioRechazadosConversion.ids, 'R-CONV');
                } else {
                    Tools.notify().smallMsn({
                        content: APP_MSN.no_tiene_registros
                    });
                }
            });

            $(`#${this._alias}btn_pendientes_conv span`).html(data.diarioPendientesConversion.total);
            //si tiene total se le agrega evento para ver listado de pendientes
            $(`#${this._alias}btn_pendientes_conv`).off('click').click(() => {
                if (data.diarioPendientesConversion.total > 0) {
                    $(`#li_56 a`).click();
                } else {
                    Tools.notify().smallMsn({
                        content: APP_MSN.no_tiene_registros
                    });
                }
            });
        };

        this._evntsBtnsEntrega = (data) => {
            //resultado y eventos a botones data.diarioAprobadas 
            $(`#${this._alias}btn_entrega_finalizado span`).html(data.diarioFinalizadoEntrega.total);
            //si tiene total se le agrega evento para ver listado de finalizados
            $(`#${this._alias}btn_entrega_finalizado`).off('click').click(() => {
                if (data.diarioFinalizadoEntrega.total > 0) {
                    this._formListExpedientes(data.diarioFinalizadoEntrega.ids, 'F-ENT');
                } else {
                    Tools.notify().smallMsn({
                        content: APP_MSN.no_tiene_registros
                    });
                }
            });

            $(`#${this._alias}btn_entrega_pendiente span`).html(data.diarioPendientesEntrega.total);
            //si tiene total se le agrega evento para ir a bandeja de pendientes
            $(`#${this._alias}btn_entrega_pendiente`).off('click').click(() => {
                if (data.diarioPendientesEntrega.total > 0) {
                    $(`#li_57 a`).click();
                } else {
                    Tools.notify().smallMsn({
                        content: APP_MSN.no_tiene_registros
                    });
                }
            });
        };

        this._evntsBtnsEntregaCalidda = (data) => {
            //resultado y eventos a botones data.diarioAprobadas 
            $(`#${this._alias}btn_entrega_finalizado span`).html(data.diarioFinalizadoEntrega.total);
            //si tiene total se le agrega evento para ver listado de finalizados
            $(`#${this._alias}btn_entrega_finalizado`).off('click').click(() => {
                if (data.diarioFinalizadoEntrega.total > 0) {
                    this._formListExpedientes(data.diarioFinalizadoEntrega.ids, 'F-ENT');
                } else {
                    Tools.notify().smallMsn({
                        content: APP_MSN.no_tiene_registros
                    });
                }
            });

            $(`#${this._alias}btn_entrega_pendiente span`).html(data.diarioPendientesEntrega.total);
            //si tiene total se le agrega evento para ir a bandeja de pendientes
            $(`#${this._alias}btn_entrega_pendiente`).off('click').click(() => {
                if (data.diarioPendientesEntrega.total > 0) {
                    this._formListExpedientes(data.diarioPendientesEntrega.ids, 'P-ENT');
                } else {
                    Tools.notify().smallMsn({
                        content: APP_MSN.no_tiene_registros
                    });
                }
            });
        };

        this._evntsBtnsExpediente = (data) => {
            //resultado y eventos a botones data.diarioAprobadas 
            $(`#${this._alias}btn_exp_generados span`).html(data.diarioExpedientes.total);
            //si tiene total se le agrega evento para ver listado de finalizados
            $(`#${this._alias}btn_exp_generados`).off('click').click(() => {
                if (data.diarioExpedientes.total > 0) {
                    this._formListExpedientes(data.diarioExpedientes.ids, 'EXP');
                } else {
                    Tools.notify().smallMsn({
                        content: APP_MSN.no_tiene_registros
                    });
                }
            });
        };

        this._renderResumen = (data) => {
            let h = '', talleres = [];
            h = `
            <div class="well">
                <div class="panel-group smart-accordion-default" >`;
            $.each(data.pecs, (ii, ee) => {
                h += `
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" href="#collapseOnePecr-${ii}" class="collapsed"> 
                                <i class="fa fa-fw fa-plus-circle txt-color-green"></i> 
                                <i class="fa fa-fw fa-minus-circle txt-color-red"></i> PEC - ${ee.pecs}
                            </a>
                        </h4>
                    </div>
                    <div id="collapseOnePecr-${ii}" class="panel-collapse collapse table-responsive">
                        <div class="panel-body">
                            <div class="panel-group smart-accordion-default" >`;
                //los talleres
                talleres = $.grep(data.talleres, function (el) {
                    return el.id_pecs == ee.id_pecs;
                });

                $.each(talleres, (i, e) => {
                    h += `
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" href="#collapseTaller-${i}${ii}" class="collapsed"> 
                                    <i class="fa fa-fw fa-plus-circle txt-color-green"></i> 
                                    <i class="fa fa-fw fa-minus-circle txt-color-red"></i> ${e.taller}
                                </a>
                            </h4>
                        </div>
                        <div id="collapseTaller-${i}${ii}" class="panel-collapse collapse table-responsive">
                            <div class="panel-body">
                                <div class="panel-group smart-accordion-default" >
                                    
                                    <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
					<div class="detailcounters well well-sm well-light btn" data-ks="${e.ids_expedientes}">
                                            <h7 class="txt-color-blueDark">${APP_ETIQUET.expedientes}: <span class="semi-bold">${e.total_expedientes}</span> </h7>
					</div>
                                    </div>
                    
                                    <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
					<div class="detailcounters well well-sm well-light btn" data-ks="${e.ids_preconversion}">
                                            <h7 class="txt-color-blueDark">${APP_ETIQUET.pre_conversion}: <span class="semi-bold">${e.total_preconversion}</span> </h7>
					</div>
                                    </div>
                    
                                    <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
					<div class="detailcounters well well-sm well-light btn" data-ks="${e.ids_conversion}">
                                            <h7 class="txt-color-blueDark">${APP_ETIQUET.conversion}: <span class="semi-bold">${e.total_conversion}</span> </h7>
					</div>
                                    </div>
                    
                                    <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
					<div class="detailcounters well well-sm well-light btn" data-ks="${e.ids_entrega}">
                                            <h7 class="txt-color-blueDark">${APP_ETIQUET.entrega2}: <span class="semi-bold">${e.total_entrega}</span> </h7>
					</div>
                                    </div>
                    
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                });
                h += `
                            </div>
                        </div>
                    </div>
                </div>`;
            });
            h += `
                </div>
            </div><br>`;
            $(`#${this._alias}d_resumen`).html(h);
            $(`#${this._alias}d_resumen`).find('.detailcounters').off('click').click((e) => {
                let i = $(e.currentTarget).data('ks');
                if (!/null/.test(i)) {
                    this._formListExpedientes(i);
                }
            });
        };

        this._renderResumenPecs = (data) => {
            let h = '';
            h = `
            <div class="well">
                <div class="panel-group smart-accordion-default" >`;

            $.each(data.talleres, (i, e) => {
                h += `
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" href="#collapseTaller-${i}" class="collapsed"> 
                                    <i class="fa fa-fw fa-plus-circle txt-color-green"></i> 
                                    <i class="fa fa-fw fa-minus-circle txt-color-red"></i> ${e.taller}
                                </a>
                            </h4>
                        </div>
                        <div id="collapseTaller-${i}" class="panel-collapse collapse table-responsive">
                            <div class="panel-body">
                                <div class="panel-group smart-accordion-default" >
                                    
                                    <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
					<div class="detailcounters well well-sm well-light btn" data-ks="${e.ids_expedientes}">
                                            <h7 class="txt-color-blueDark">${APP_ETIQUET.expedientes}: <span class="semi-bold">${e.total_expedientes}</span> </h7>
					</div>
                                    </div>
                    
                                    <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
					<div class="detailcounters well well-sm well-light btn" data-ks="${e.ids_preconversion}">
                                            <h7 class="txt-color-blueDark">${APP_ETIQUET.pre_conversion}: <span class="semi-bold">${e.total_preconversion}</span> </h7>
					</div>
                                    </div>
                    
                                    <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
					<div class="detailcounters well well-sm well-light btn" data-ks="${e.ids_conversion}">
                                            <h7 class="txt-color-blueDark">${APP_ETIQUET.conversion}: <span class="semi-bold">${e.total_conversion}</span> </h7>
					</div>
                                    </div>
                    
                                    <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
					<div class="detailcounters well well-sm well-light btn" data-ks="${e.ids_entrega}">
                                            <h7 class="txt-color-blueDark">${APP_ETIQUET.entrega2}: <span class="semi-bold">${e.total_entrega}</span> </h7>
					</div>
                                    </div>
                    
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
            });


            h += `
                </div>
            </div><br>`;
            $(`#${this._alias}d_resumen`).html(h);
            $(`#${this._alias}d_resumen`).find('.detailcounters').off('click').click((e) => {
                let i = $(e.currentTarget).data('ks');
                if (!/null/.test(i)) {
                    this._formListExpedientes(i);
                }
            });
        };

    }

    addTour() {
        $('#btnTour').click(function () {
            Obj.System.InitTour.home();
        });
    }

    validate() {
        $("#LG__formLogin").validate({
            // Rules for form validation
            rules: {
                LG__txtUser: {
                    required: true,
                    minlength: 3
                },
                LG__txtClave: {
                    required: true,
                    minlength: 3
                }
            },
            // No cambie el código de abajo
            errorPlacement: (error, element) => {
                error.insertAfter(element.parent());
            },
            submitHandler: () => {
                Obj.System.InitAx.postLogin();
            }
        });
    }

    addEvtsPanelConfigRsc(context) {
        var v;
        $('#smart-fixed-header').click(function () {
            v = ($(this).is(':checked')) ? 1 : 0;
            context.appTheme(1, v);
        });
        $('#smart-fixed-navigation').click(function () {
            v = ($(this).is(':checked')) ? 1 : 0;
            context.appTheme(2, v);
        });
        $('#smart-fixed-ribbon').click(function () {
            v = ($(this).is(':checked')) ? 1 : 0;
            context.appTheme(3, v);
        });

        $('#smart-fixed-footer').click(function () {
            v = ($(this).is(':checked')) ? 1 : 0;
            context.appTheme(4, v);
        });
        $('#smart-fixed-container').click(function () {
            v = ($(this).is(':checked')) ? 1 : 0;
            context.appTheme(5, v);
        });
        $('#smart-rtl').click(function () {
            v = ($(this).is(':checked')) ? 1 : 0;
            context.appTheme(6, v);
        });
        $('#smart-topmenu').click(function () {
            v = ($(this).is(':checked')) ? 1 : 0;
            context.appTheme(7, v);
        });
        $('#colorblind-friendly').click(function () {
            v = ($(this).is(':checked')) ? 1 : 0;
            context.appTheme(8, v);
        });
        $('#smart-style-0').click(function () {
            v = ($(this).data('value') == 1) ? 0 : 1;
            $(this).data('value', v);
            context.appTheme(9, v);
        });
        $('#smart-style-1').click(function () {
            context.appTheme(10, 1);
        });
        $('#smart-style-2').click(function () {
            context.appTheme(11, 1);
        });
        $('#smart-style-3').click(function () {
            context.appTheme(12, 1);
        });
        $('#smart-style-4').click(function () {
            context.appTheme(13, 1);
        });
        $('#smart-style-5').click(function () {
            context.appTheme(14, 1);
        });
        $('#smart-style-6').click(function () {
            context.appTheme(15, 1);
        });
    }

    inactividadRsc() {
        setTimeout(function () {
            $(document).idleTimeout({
                redirectUrl: 'Obj.System.InitAx.logOut(null);',
                idleTimeLimit: 1800, // 'No activity' time limit in seconds. 1800 = 30 Minutes, DEBE VENIR DE LA DB
                dialogTitle: 'Advertencia de cierre de sesión',
                dialogText: 'Como ha estado inactivo, su sesión está a punto de caducar.',
                dialogTimeRemaining: 'Tiempo restante',
                dialogStayLoggedInButton: 'Continuar',
                dialogLogOutNowButton: 'Salir'
            });
        }, 1500);
    }

    setResultadosTaller(data, form) {
        Tools.setDataForm(form, {
            alias: this._alias,
            elements: [
                {item: 'sp_aprobados', value: (data) ? data.aprobados : 0, type: 'html'},
                {item: 'sp_rechazados', value: (data) ? data.rechazados : 0, type: 'html'},
                {item: 'sp_pendientes', value: (data) ? data.pendientes : 0, type: 'html'},
                {item: 'sp_aprobados_c', value: (data) ? data.aprobados_c : 0, type: 'html'},
                {item: 'sp_rechazados_c', value: (data) ? data.rechazados_c : 0, type: 'html'},
                {item: 'sp_pendientes_c', value: (data) ? data.pendientes_c : 0, type: 'html'},
                {item: 'sp_pendientes_e', value: (data) ? data.pendientes_e : 0, type: 'html'},
                {item: 'sp_aprobados_e', value: (data) ? data.aprobados_e : 0, type: 'html'}
            ]
        });

        if (data) {
            $(`#${this._alias}sp_aprobados`).off('click');
            $(`#${this._alias}sp_aprobados`).click(() => {
                if (data.ids_aprobados != 'null') {
                    this._formListExpedientes(data.ids_aprobados);
                }
            });
            $(`#${this._alias}sp_rechazados`).off('click');
            $(`#${this._alias}sp_rechazados`).click(() => {
                if (data.ids_rechazados != 'null') {
                    this._formListExpedientes(data.ids_rechazados);
                }
            });
            $(`#${this._alias}sp_aprobados_c`).off('click');
            $(`#${this._alias}sp_aprobados_c`).click(() => {
                if (data.ids_aprobados_c != 'null') {
                    this._formListExpedientes(data.ids_aprobados_c);
                }
            });
            $(`#${this._alias}sp_rechazados_c`).off('click');
            $(`#${this._alias}sp_rechazados_c`).click(() => {
                if (data.ids_rechazados_c != 'null') {
                    this._formListExpedientes(data.ids_rechazados_c);
                }
            });
            $(`#${this._alias}sp_aprobados_e`).off('click');
            $(`#${this._alias}sp_aprobados_e`).click(() => {
                if (data.ids_aprobados_e != 'null') {
                    this._formListExpedientes(data.ids_aprobados_e);
                }
            });
        }

        this._graficaTallerPreConversion(data);
//        this._graficaTallerConversion(data);
//        this._graficaTallerEntrega(data);
    }

    setResultadosCalidda(data) {

//        this._renderPreConversion(data.preconversion, 'C');
//        this._renderConversion(data.conversion, false);
//        this._graficaPreConversion(data.preconversion);
//        this._graficaConversion(data.conversion);
//        Tools.nunMiniCharts();
        this._evntsBtnsPreConversion(data);
        this._evntsBtnsConversion(data);
        this._evntsBtnsEntregaCalidda(data);
        this._evntsBtnsExpediente(data);
        this._renderResumen(data.resumen);
    }

    setResultadosVerifygas(data) {
//        this._renderPreConversion(data.preconversion, 'V');
//        this._renderConversion(data.conversion, true);
//        this._graficaPreConversion(data.preconversion);
//        this._graficaConversion(data.conversion);
//        Tools.nunMiniCharts();
        this._evntsBtnsPreConversion(data);
        this._evntsBtnsConversion(data);
        this._evntsBtnsEntrega(data);
        this._evntsBtnsExpediente(data);
        this._renderResumen(data.resumen);
    }

    setResultadosPecs(data) {
//        this._renderPreConversion(data.preconversion, 'X');
//        this._renderConversion(data.conversion, true);
//        this._graficaPreConversion(data.preconversion);
//        this._graficaConversion(data.conversion);
//        Tools.nunMiniCharts();
        this._renderResumenPecs(data.resumen);
    }

    setEvtBtnInform() {
        $(`#${this._alias}btn_informe`).click(() => {
            $('#li_62 a').click();
        });
    }

};  