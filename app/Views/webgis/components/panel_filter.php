<div class="card" style="min-width: 360px">
    <div class="card-header px-3 py-2">
        Grid Filter
        <button type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="mh-100 overflow-auto pt-2" style="height: 300px;">
        <div class="d-flex p-2 align-items-baseline">
            <i class="fas fa-angle-down"></i>
            <i class="fas fa-filter px-2" aria-hidden="true"></i><span>Grid Filter</span>
            <div class="custom-control custom-switch ml-auto">
                <input type="checkbox" class="custom-control-input" id="customSwitch1">
                <label class="custom-control-label" for="customSwitch1"></label>
            </div>
        </div>
        <?php $filterName = ['TOTAL SCORE', 'SCORE COMPETITOR', 'SCORE DEMOGRAFI', 'SCORE POI', 'PENDUDUK', 'BUSINESS FACULTY', 'RESIDENTIAL']; ?>
        <div class="px-4 py-1">
            <?php foreach ($filterName as $name) { ?>
                <div class="pb-3">
                    <span><?= $name ?></span>
                    <div class="d-flex align-items-baseline mt-1">
                        <input type="text" class="form-control" style="height: 30px">
                        <span class="mx-3">and</span>
                        <input type="text" class="form-control" style="height: 30px">
                    </div>
                </div>
            <?php } ?>
        </div>
    </div>
</div>