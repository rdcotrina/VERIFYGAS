<div>
    <form>
        <div class="row">
            <div class="col-md-12">


                <!-- Widget ID (each widget will need unique ID)-->
                <div class="jarviswidget jarviswidget-color-blueDark">
                    <header role="heading">
                        <span class="widget-icon"> <i class="fa fa-gear txt-color-blueLight"></i> </span>		
                        <h2 class="tr-language" data-tr="gestion_conversiones"> </h2>
                    </header>
                    <!-- widget div-->
                    <div role="content">

                        <div class="col-md-4">
                            <!-- Widget ID (each widget will need unique ID)-->
                            <div class="jarviswidget jarviswidget-color-blueDark">
                                <header role="heading">
                                    <span class="widget-icon"> <i class="fa fa-history txt-color-blueLight"></i> </span>		
                                    <h2 class="tr-language" data-tr="pre_conversion"> </h2>
                                </header>
                                <!-- widget div-->
                                <div role="content">

                                    <!-- widget content -->
                                    <div class="widget-body">

                                        <div class="bv-form">
                                            <div class="col-md-12 text-center">
                                                <div class="col-md-4">
                                                    <span class="btn bg-color-blueDark txt-color-white" style="background: #333 !important;margin-top: 3px" id="btn_pendientes_preconv">
                                                        <span style="font-size: 60px">0</span><div class="tr-language" data-tr="pendientes"></div>
                                                    </span>
                                                </div>
                                                <div class="col-md-4">
                                                    <span class="btn btn-success" id="btn_aprobados_preconv" style="margin-top: 3px">
                                                        <span style="font-size: 60px">0</span><div class="tr-language" data-tr="aprobados"></div>
                                                    </span>
                                                </div>
                                                <div class="col-md-4">
                                                    <span class="btn btn-danger" id="btn_rechazados_preconv" style="margin-top: 3px">
                                                        <span style="font-size: 60px">0</span><div class="tr-language" data-tr="rechazados"></div>
                                                    </span>
                                                </div>

                                                <div class="clearfix"></div>
                                                <br/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <!-- Widget ID (each widget will need unique ID)-->
                            <div class="jarviswidget jarviswidget-color-blueDark">
                                <header role="heading">
                                    <span class="widget-icon"> <i class="fa fa-refresh txt-color-blueLight"></i> </span>		
                                    <h2 class="tr-language" data-tr="conversion"> </h2>
                                </header>
                                <!-- widget div-->
                                <div role="content">

                                    <!-- widget content -->
                                    <div class="widget-body">

                                        <div class="bv-form">
                                            <div class="col-md-12 text-center">
                                                <div class="col-md-4 hide">
                                                    <span class="btn bg-color-blueDark txt-color-white" id="btn_pendientes_conv" style="background: #333 !important;margin-top: 3px">
                                                        <span style="font-size: 60px">0</span><div class="tr-language" data-tr="pendientes"></div>
                                                    </span>
                                                </div>

                                                <span class="btn btn-success" id="btn_aprobados_conv" style="margin-top: 3px">
                                                    <span style="font-size: 60px">0</span><div class="tr-language" data-tr="aprobados"></div>
                                                </span>

                                                <span class="btn btn-danger" id="btn_rechazados_conv" style="margin-top: 3px">
                                                    <span style="font-size: 60px">0</span><div class="tr-language" data-tr="rechazados"></div>
                                                </span>

                                                <div class="clearfix"></div>
                                                <br/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <!-- Widget ID (each widget will need unique ID)-->
                            <div class="jarviswidget jarviswidget-color-blueDark">
                                <header role="heading">
                                    <span class="widget-icon"> <i class="fa fa-truck txt-color-blueLight"></i> </span>		
                                    <h2 class="tr-language" data-tr="entrega2"> </h2>
                                </header>
                                <!-- widget div-->
                                <div role="content">

                                    <!-- widget content -->
                                    <div class="widget-body">

                                        <div class="bv-form">
                                            <div class="col-md-12 text-center">
                                                <div class="col-md-4 hide">
                                                    <span id="btn_entrega_pendiente" class="btn bg-color-blueDark txt-color-white" style="background: #333 !important;margin-top: 3px">
                                                        <span style="font-size: 60px">0</span><div class="tr-language" data-tr="pendientes"></div>
                                                    </span>
                                                </div>

                                                <span class="btn btn-success" id="btn_entrega_finalizado" style="margin-top: 3px">
                                                    <span style="font-size: 60px">0</span><div class="tr-language" data-tr="finalizados"></div>
                                                </span>


                                                <div class="clearfix"></div>
                                                <br/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>




                        <div class="clearfix"></div>




                        <!-- widget content -->
                        <div class="widget-body">
                            <div class="bv-form">

                                <div class="col-md-12">
                                    <!-- Widget ID (each widget will need unique ID)-->
                                    <div class="jarviswidget jarviswidget-color-blueDark">
                                        <header role="heading">
                                            <span class="widget-icon"> <i class="fa fa-gear txt-color-blueLight"></i> </span>		
                                            <h2 class="tr-language" data-tr="pre_conversion"> </h2>
                                        </header>
                                        <!-- widget div-->
                                        <div role="content">

                                            <!-- widget content -->
                                            <div class="widget-body">

                                                <div class="bv-form">
                                                    <div class="col-md-8">
                                                        <div id="panelPreconversion"></div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div id="graficaPreConversion" style="width: 100%; height: 220px"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="clearfix"></div>

                        <!-- widget content -->
                        <div class="widget-body">
                            <div class="bv-form">
                                <div class="col-md-12">
                                    <!-- Widget ID (each widget will need unique ID)-->
                                    <div class="jarviswidget jarviswidget-color-blueDark">
                                        <header role="heading">
                                            <span class="widget-icon"> <i class="fa fa-gear txt-color-blueLight"></i> </span>		
                                            <h2 class="tr-language" data-tr="conversion"> </h2>
                                        </header>
                                        <!-- widget div-->
                                        <div role="content">

                                            <!-- widget content -->
                                            <div class="widget-body">

                                                <div class="bv-form">
                                                    <div class="col-md-8">
                                                        <div id="panelConversion"></div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div id="graficaConversion" style="width: 100%; height: 220px"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    </form>
</div>