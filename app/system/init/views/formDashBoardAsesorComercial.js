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
                        <div class="row">
                            <div class="col-md-12">


                                <!-- Widget ID (each widget will need unique ID)-->
                                <div class="jarviswidget jarviswidget-color-blueDark">
                                    <header role="heading">
                                        <span class="widget-icon"> <i class="fa fa-gear txt-color-blueLight"></i> </span>		
                                        <h2 class="tr-language" data-tr="expedientes"> </h2>
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
                                                                <td class="text-center"><span class="label label-success" id="sp_aprobados">0</span></td>
                                                            </tr>
                                                            <tr>
                                                                <th style="background-image: -webkit-linear-gradient(top,#f2f2f2 0,#fafafa 100%)" class="tr-language" data-tr="rechazados"></th>
                                                                <td class="text-center"><span class="label label-danger" id="sp_rechazados">0</span></td>
                                                            </tr>
                                                            <tr>
                                                                <th style="background-image: -webkit-linear-gradient(top,#f2f2f2 0,#fafafa 100%)"><a href="javascript:;" onclick="$('#li_54 a').click();" class="tr-language" data-tr="pendientes"></a></th>
                                                                <td class="text-center"><span class="label label-default" onclick="$('#li_54 a').click();"><a id="sp_pendientes" href="javascript:;" ></a></span></td>
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
        </div>
    </form>
</div>
