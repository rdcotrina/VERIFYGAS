<div>
    <form>
        <div class="row">
            <div class="col-md-6">


                <!-- Widget ID (each widget will need unique ID)-->
                <div class="jarviswidget ">
                    <header role="heading">
                        <span class="widget-icon"> <i class="fa fa-gear txt-color-blueLight"></i> </span>		
                        <h2 class="tr-language" data-tr="gestion_conversiones"> </h2>
                    </header>
                    <!-- widget div-->
                    <div role="content">
                        <div class="row">
                            <div class="col-md-12">


                                <!-- Widget ID (each widget will need unique ID)-->
                                <div class="jarviswidget ">
                                    <header role="heading">
                                        <span class="widget-icon"> <i class="fa fa-file-text txt-color-blueLight"></i> </span>		
                                        <h2><span class="tr-language" data-tr="expedientes"></span> <span id="n_mes"></span></h2>
                                        <div class="widget-toolbar" role="menu">
                                            <!-- add: non-hidden - to disable auto hide -->

                                            <div class="btn-group">
                                                <button id="__NEW" type="button" class="btn btn-primary  btn-xs"><i class="fa fa-file"></i> Nuevo</button>
                                            </div>
                                        </div>
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
                                                                <th style="background-image: -webkit-linear-gradient(top,#f2f2f2 0,#fafafa 100%)"><a href="javascript:;" onclick="$('#li_64 a').click();" class="tr-language" data-tr="pendientes"></a></th>
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

                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <center>
                    <button id="btn_seguimiento" type="button" class="btn bg-color-magenta txt-color-white btn-lg"><i class="fa fa-newspaper-o"></i> Seguimiento de Expedientes</button>
                </center>
            </div>


        </div>
    </form>
</div>
