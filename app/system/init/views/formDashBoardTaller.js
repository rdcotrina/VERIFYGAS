<div>
    <form>
        <div class="row">
            <div class="col-md-12">


                <!-- Widget ID (each widget will need unique ID)-->
                <div class="jarviswidget ">
                    <header role="heading">
                        <span class="widget-icon"> <i class="fa fa-gear txt-color-blueLight"></i> </span>		
                        <h2 class="tr-language" data-tr="gestion_conversiones"> </h2>
                    </header>
                    <!-- widget div-->
                    <div role="content">
                        <div class="row">
                            <div class="col-md-6">


                                <!-- Widget ID (each widget will need unique ID)-->
                                <div class="jarviswidget ">
                                    <header role="heading">
                                        <span class="widget-icon"> <i class="fa fa-history txt-color-blueLight"></i> </span>		
                                        <h2 class="tr-language" data-tr="pre_conversion"> </h2>
                                    </header>
                                    <!-- widget div-->
                                    <div role="content">

                                        <!-- widget content -->
                                        <div class="widget-body">

                                            <div class="bv-form">

                                                <div class="col-md-6">
                                                    <table class="table table-bordered">
                                                        <tbody>
                                                            <tr>
                                                                <th width="20%" style="background-image: -webkit-linear-gradient(top,#f2f2f2 0,#fafafa 100%)" class="tr-language" data-tr="aprobados"></th>
                                                                <td class="text-center"><span class="btn btn-success" id="sp_aprobados">0</span></td>
                                                            </tr>
                                                            <tr>
                                                                <th style="background-image: -webkit-linear-gradient(top,#f2f2f2 0,#fafafa 100%)" class="tr-language" data-tr="rechazados"></th>
                                                                <td class="text-center"><span class="btn btn-danger" id="sp_rechazados">0</span></td>
                                                            </tr>
                                                            <tr>
                                                                <th style="background-image: -webkit-linear-gradient(top,#f2f2f2 0,#fafafa 100%)" class="tr-language" data-tr="pendientes"></th>
                                                                <td class="text-center"><span class="btn btn-default" onclick="$('#li_64 a').click();" style="background: #D2CB00"><a id="sp_pendientes" href="javascript:;" ></a></span></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div class="col-md-6">
                                                    <div id="graficaPreConversion" style="width: 100%; height: 220px;"></div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>


                            <div class="col-md-6">


                                <!-- Widget ID (each widget will need unique ID)-->
                                <div class="jarviswidget ">
                                    <header role="heading">
                                        <span class="widget-icon"> <i class="fa fa-refresh txt-color-blueLight"></i> </span>		
                                        <h2 class="tr-language" data-tr="conversion"> </h2>
                                    </header>
                                    <!-- widget div-->
                                    <div role="content">

                                        <!-- widget content -->
                                        <div class="widget-body">

                                            <div class="bv-form">
                                                <div class="col-md-6">
                                                    <table class="table table-bordered">
                                                        <tbody>
                                                            <tr>
                                                                <th width="20%" style="background-image: -webkit-linear-gradient(top,#f2f2f2 0,#fafafa 100%)" class="tr-language" data-tr="aprobados"></th>
                                                                <td class="text-center"><span class="btn btn-success" id="sp_aprobados_c">0</span></td>
                                                            </tr>
                                                            <tr>
                                                                <th style="background-image: -webkit-linear-gradient(top,#f2f2f2 0,#fafafa 100%)" class="tr-language" data-tr="rechazados"></th>
                                                                <td class="text-center"><span class="btn btn-danger" id="sp_rechazados_c">0</span></td>
                                                            </tr>
                                                            <tr>
                                                                <th style="background-image: -webkit-linear-gradient(top,#f2f2f2 0,#fafafa 100%)" class="tr-language" data-tr="pendientes"></th>
                                                                <td class="text-center"><span class="btn btn-default" onclick="$('#li_56 a').click();" style="background: #D2CB00"><a id="sp_pendientes_c" href="javascript:;"></a></span></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div class="col-md-6">
                                                    <div id="graficaConversion" style="width: 100%; height: 220px;"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            
                            <div class="clearfix"></div>

                            <div class="col-md-6">


                                <!-- Widget ID (each widget will need unique ID)-->
                                <div class="jarviswidget ">
                                    <header role="heading">
                                        <span class="widget-icon"> <i class="fa fa-truck txt-color-blueLight"></i> </span>		
                                        <h2 class="tr-language" data-tr="entrega2"> </h2>
                                    </header>
                                    <!-- widget div-->
                                    <div role="content">

                                        <!-- widget content -->
                                        <div class="widget-body">

                                            <div class="bv-form">
                                                <div class="col-md-6">
                                                    <table class="table table-bordered">
                                                        <tbody>
                                                            <tr>
                                                                <th width="20%" style="background-image: -webkit-linear-gradient(top,#f2f2f2 0,#fafafa 100%)" class="tr-language" data-tr="aprobados"></th>
                                                                <td class="text-center"><span class="btn btn-success" id="sp_aprobados_e">0</span></td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <th style="background-image: -webkit-linear-gradient(top,#f2f2f2 0,#fafafa 100%)" class="tr-language" data-tr="pendientes"></th>
                                                                <td class="text-center"><span class="btn btn-default" onclick="$('#li_57 a').click();" style="background: #D2CB00"><a id="sp_pendientes_e" href="javascript:;">0</a></span></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div class="col-md-6">
                                                    <div id="graficaEntrega" style="width: 100%; height: 220px;"></div>
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
