<div id="mySidenav" class="sidenav">
    <div class="side-heading">
        <span>Grid Analysis</span>
        <span class="close-side-content"><i class="fas fa-angle-double-left"></i></span>
    </div>
    <div class="side-content">
        <div class="side-content-span">
            <span class="number-span">2</span>
            <span>Select criteria for your analysis.</span>

        </div>
        <div class="d-flex align-items-center">
            <select class="selectpicker select_criteria" iconBase="FontAwesome">
                <option selected disabled data-icon="fas fa-plus">Add criteria</option>
                <option>Mustard</option>
                <option>Ketchup</option>
                <option>Relish</option>
            </select>
            <a href="javascript:void(0)" class="ml-auto" id='reset_weight'>Reset weighting</a>
        </div>
        <div class="overflow-auto side-content-wrapper">
            <?= view('webgis/components/panel_analysis_item'); ?>
        </div>
    </div>
    <div class="side-content-footer">
        <div class="d-flex ">
            <i class="fas fa-filter"></i>
            <span class="ml-auto"><a href='#'>Save criteria</a></span>
        </div>
        <div class="side-content-footer-button d-flex align-items-center justify-content-end">
            <i class="fas fa-info-circle" style="font-size: 20px"></i>
            <button type="button" class="btn btn-outline-primary" style="margin: 0 10px">Back</button>
            <button type="button" class="btn btn-primary">Export</button>
        </div>
    </div>
</div>