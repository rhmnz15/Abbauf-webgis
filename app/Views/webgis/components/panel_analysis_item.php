<?php $grid_analysis_item = ['U20', 'U25', 'U30', 'U35'];
foreach ($grid_analysis_item as $item) { ?>
    <div class="side-content-box" id="<?= $item ?>_box" data-lock='false'>
        <div class="d-flex" style="padding: 0 5px">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="<?= $item ?>_checkbox" checked>
                <label class="form-check-label" for="<?= $item ?>_checkbox" style="margin: 1.5px 0 0 0">
                    <?= $item ?>
                </label>
            </div>
            <button type="button" class="close ml-auto cursor-pointer" id="<?= $item ?>_weight-close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class='d-flex justify-content-around align-items-center' style='padding: 0 10px;'>
            <label for="weight-slider">Weight</label>
            <div class="weight-slider">
                <input type="text" class="<?= $item ?>_weight-range-slider" name="<?= $item ?>_range" value="" />
            </div>
            <input id="<?= $item ?>_amount" type="text" value="5" class="form-control text-center" style='padding: 0; max-width: 40px' />
            <div class="ct-chart <?= $item ?>_chart"></div>
            <i class="bi bi-unlock" id='<?= $item ?>_locked' data-lock='false' style="font-size: 20px;cursor: pointer"></i>
        </div>
        <div style='padding: 0 10px'>
            <a href='javascript:void(0)' class='show_content' id='<?= $item ?>_show'>More options</a>
            <div class="displayed_content" id='<?= $item ?>_displayed'>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="<?= $item ?>_radio" id="<?= $item ?>_Influence" value="<?= $item ?>_Influence" checked>
                    <label class="form-check-label radio-show-content" for="<?= $item ?>_Influence">
                        Influence
                    </label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="<?= $item ?>_radio" id="<?= $item ?>_Positive" value="<?= $item ?>_Positive">
                    <label class="form-check-label radio-show-content" for="<?= $item ?>_Positive">
                        Positive
                    </label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="<?= $item ?>_radio" id="<?= $item ?>_Inverse" value="<?= $item ?>_Inverse">
                    <label class="form-check-label radio-show-content" for="<?= $item ?>_Inverse">
                        Inverse
                    </label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="<?= $item ?>_radio" id="<?= $item ?>_Ideal" value="<?= $item ?>_Ideal">
                    <label class="form-check-label radio-show-content" for="<?= $item ?>_Ideal">
                        Ideal
                    </label>
                </div>
                <!-- NOTE: threshold design is not final, might be change in the future. -->
                <div style="padding-top: 20px;">
                    <span>Threshold (Optional)</span>
                    <div class="threshold-slider">
                        <input type="text" class="<?= $item ?>_threshold-range-slider" name="<?= $item ?>_threshold_range" value="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
<?php } ?>