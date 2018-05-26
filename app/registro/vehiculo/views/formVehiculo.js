<div>



    <div class="col-sm-6">

        <!-- Widget ID (each widget will need unique ID)-->
        <div class="jarviswidget jarviswidget-color-blueDark">
            <header role="heading">

                <span class="widget-icon"> <i class="fa fa-facebook txt-color-blue"></i> </span>		
                <h2 class="tr-language"> </h2>
            </header>

            <!-- widget div-->

            <div role="content">
                <!-- widget edit box -->
                <div class="jarviswidget-editbox">
                    <!-- This area used as dropdown edit box -->
                    <input class="form-control" type="text">
                </div>
                <!-- end widget edit box -->

                <!-- widget content -->
                <div class="widget-body">

                    <form id="movieForm" method="post" novalidate="novalidate" class="bv-form"><button type="submit" class="bv-hidden-submit" style="display: none; width: 0px; height: 0px;"></button>

                        <fieldset>
                            <legend>
                                Default Form Elements
                            </legend>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-8 has-feedback">
                                        <label class="control-label">Movie title</label>
                                        <input type="text" class="form-control" name="title" data-bv-field="title"><i class="form-control-feedback" data-bv-icon-for="title" style="display: none;"></i>
                                        <small class="help-block" data-bv-validator="notEmpty" data-bv-for="title" data-bv-result="NOT_VALIDATED" style="display: none;">The title is required</small><small class="help-block" data-bv-validator="stringLength" data-bv-for="title" data-bv-result="NOT_VALIDATED" style="display: none;">The title must be less than 200 characters long</small></div>

                                    <div class="col-md-4 selectContainer has-feedback">
                                        <label class="control-label">Genre</label>
                                        <select class="form-control" name="genre" data-bv-field="genre">
                                            <option value="">Choose a genre</option>
                                            <option value="action">Action</option>
                                            <option value="comedy">Comedy</option>
                                            <option value="horror">Horror</option>
                                            <option value="romance">Romance</option>
                                        </select><i class="form-control-feedback" data-bv-icon-for="genre" style="display: none;"></i>
                                        <small class="help-block" data-bv-validator="notEmpty" data-bv-for="genre" data-bv-result="NOT_VALIDATED" style="display: none;">The genre is required</small></div>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-sm-12 col-md-4 has-feedback">
                                        <label class="control-label">Director</label>
                                        <input type="text" class="form-control" name="director" data-bv-field="director"><i class="form-control-feedback" data-bv-icon-for="director" style="display: none;"></i>
                                        <small class="help-block" data-bv-validator="notEmpty" data-bv-for="director" data-bv-result="NOT_VALIDATED" style="display: none;">The director name is required</small><small class="help-block" data-bv-validator="stringLength" data-bv-for="director" data-bv-result="NOT_VALIDATED" style="display: none;">The director name must be less than 80 characters long</small></div>

                                    <div class="col-sm-12 col-md-4 has-feedback">
                                        <label class="control-label">Writer</label>
                                        <input type="text" class="form-control" name="writer" data-bv-field="writer"><i class="form-control-feedback" data-bv-icon-for="writer" style="display: none;"></i>
                                        <small class="help-block" data-bv-validator="notEmpty" data-bv-for="writer" data-bv-result="NOT_VALIDATED" style="display: none;">The writer name is required</small><small class="help-block" data-bv-validator="stringLength" data-bv-for="writer" data-bv-result="NOT_VALIDATED" style="display: none;">The writer name must be less than 80 characters long</small></div>

                                    <div class="col-sm-12 col-md-4 has-feedback">
                                        <label class="control-label">Producer</label>
                                        <input type="text" class="form-control" name="producer" data-bv-field="producer"><i class="form-control-feedback" data-bv-icon-for="producer" style="display: none;"></i>
                                        <small class="help-block" data-bv-validator="notEmpty" data-bv-for="producer" data-bv-result="NOT_VALIDATED" style="display: none;">The producer name is required</small><small class="help-block" data-bv-validator="stringLength" data-bv-for="producer" data-bv-result="NOT_VALIDATED" style="display: none;">The producer name must be less than 80 characters long</small></div>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-sm-12 col-md-6 has-feedback">
                                        <label class="control-label">Website</label>
                                        <input type="text" class="form-control" name="website" data-bv-field="website"><i class="form-control-feedback" data-bv-icon-for="website" style="display: none;"></i>
                                        <small class="help-block" data-bv-validator="notEmpty" data-bv-for="website" data-bv-result="NOT_VALIDATED" style="display: none;">The website address is required</small><small class="help-block" data-bv-validator="uri" data-bv-for="website" data-bv-result="NOT_VALIDATED" style="display: none;">The website address is not valid</small></div>

                                    <div class="col-sm-12 col-md-6 has-feedback">
                                        <label class="control-label">Youtube trailer</label>
                                        <input type="text" class="form-control" name="trailer" data-bv-field="trailer"><i class="form-control-feedback" data-bv-icon-for="trailer" style="display: none;"></i>
                                        <small class="help-block" data-bv-validator="notEmpty" data-bv-for="trailer" data-bv-result="NOT_VALIDATED" style="display: none;">The trailer link is required</small><small class="help-block" data-bv-validator="uri" data-bv-for="trailer" data-bv-result="NOT_VALIDATED" style="display: none;">The trailer link is not valid</small></div>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <div class="form-group has-feedback">
                                <label class="control-label">Review</label>
                                <textarea class="form-control" name="review" rows="8" data-bv-field="review"></textarea><i class="form-control-feedback" data-bv-icon-for="review" style="display: none;"></i>
                                <small class="help-block" data-bv-validator="stringLength" data-bv-for="review" data-bv-result="NOT_VALIDATED" style="display: none;">The review must be less than 500 characters long</small></div>
                        </fieldset>

                        <fieldset>
                            <div class="form-group has-feedback">

                                <div class="row">
                                    <div class="col-sm-12 col-md-12">
                                        <label class="control-label">Rating</label>
                                    </div>

                                    <div class="col-sm-12 col-md-10">

                                        <label class="radio radio-inline no-margin">
                                            <input type="radio" name="rating" value="terrible" class="radiobox style-2" data-bv-field="rating">
                                            <span>Terrible</span> </label>

                                        <label class="radio radio-inline">
                                            <input type="radio" name="rating" value="watchable" class="radiobox style-2" data-bv-field="rating">
                                            <span>Watchable</span> </label>
                                        <label class="radio radio-inline">
                                            <input type="radio" name="rating" value="best" class="radiobox style-2" data-bv-field="rating">
                                            <span>Best ever</span> </label><i class="form-control-feedback" data-bv-icon-for="rating" style="display: none;"></i>

                                        <small class="help-block" data-bv-validator="notEmpty" data-bv-for="rating" data-bv-result="NOT_VALIDATED" style="display: none;">The rating is required</small></div>

                                </div>

                            </div>
                        </fieldset>

                        <div class="form-actions">
                            <div class="row">
                                <div class="col-md-12">
                                    <button class="btn btn-default" type="submit">
                                        <i class="fa fa-eye"></i>
                                        Validate
                                    </button>
                                </div>
                            </div>
                        </div>

                    </form>

                </div>
                <!-- end widget content -->
            </div>
            <!-- end widget div -->
        </div>
        <!-- end widget -->

    </div>


    <div class="clearfix"></div>
</div>