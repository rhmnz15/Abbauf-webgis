<?= view('webgis/components/sidebarmap') ?>
<div id="map" class="map" data-street-view=false data-street-view-expand=false>
    <?= view('webgis/components/maptool_buttons') ?>

    <!-- <button type="button" class="btn btn-light float-end position-absolute top-50 end-0 mt-5" style="z-index: 1; right: 0; margin-right: 20px !important;">Button</button> -->

    <!-- popup -->
    <div id="popup" class="ol-popup">
        <a href="#" id="popup-closer" class="ol-popup-closer"></a>
        <div id="popup-content"></div>
    </div>
    <!-- end popup -->

    <!-- DRAWING POP UP -->
    <div id="feature-popup" class="feature-popup ui-draggable ui-draggable-handle d-none">
        <div class="popup-header">
            Form Information
            <a class="close-popup"><i class="fa-solid fa-xmark fa-lg"></i></a>
        </div>
        <div class="popup-content2 overflow-auto" style="height: 300px;">
            <div class="card">
                <form action="" id="formInfoDraw" class="m-2">
                    <div id="appendDraw">
                        <input type="text" class="form-control mb-2 text-center" placeholder="Mark Name" name="categoryDraw" id="categoryDraw">
                        <div class="input-group input-group-sm mb-3">
                            <input type="text" class="form-control" placeholder="Category" name="categoryDraw" id="categoryDraw">
                            <span class="input-group-sm input-group-text-sm">&nbsp;:&nbsp;</span>
                            <input type="text" class="form-control" placeholder="Description" name="descriptionDraw" id="descriptionDraw">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="addFormDraw" class="btn btn-success p-1"><i class="fa fa-plus"></i></button>
                        <button type="button" id="removeFormDraw" class="btn btn-danger p-1"><i class="fa-solid fa-trash"></i></button>
                        <button type="submit" id="submitFormDraw" class="btn btn-primary p-1">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- END DRAWING POP UP -->
    <div data-move=true>

        <div class="dim-screen"></div>

        <button title="Toggle layer sidebar" role="sidebar-toggle" class="icon-show" data-hide=false>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
            </svg>
        </button>

        <!-- Base Layer Switcher -->
        <div class="baselayer-switcher">
            <div class="gradient"></div>
            <span class="baselayers-title">Bases</span>
            <div class="mouse-box"></div>

            <div class="base-choice">
                <div class="more-layers-icon">
                    <i class="bi bi-stack"></i>
                    <span class="layer-name">More</span>
                </div>
            </div>

            <div class="more-layers-wrapper">
                <div class="box">
                    <div class="flex">
                    </div>
                </div>
            </div>

        </div>

        <!-- Search bar -->
        <div class="searchbar-container">
            <div class="input-box">
                <div class="tab-icon-container">
                    <div class="tab-icon">
                        <span>/</span>
                    </div>
                </div>
                <input type="text" name="search-place" id="search-place" role="search-places" placeholder="Search places...">
                <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>
                <div class="loading-line" role="search-loading">
                </div>
            </div>


            <div class="result-box" data-show="false">
                <ul></ul>
            </div>

            <!-- PANEL FILTER -->
            <div class="btn-group btn-group-sm position-absolute top-50 end-0 mt-3" style="z-index: 1; left: 0; " role="group" aria-label="Small button group">
                <button id='filter' title="filter" type="button" class="btn btn-light bg-white" data-toggle="collapse" data-target="#filter-content" aria-expanded="false" aria-controls="filter-content"><i class="fas fa-filter" aria-hidden="true"></i></button>
            </div>

            <div id='filter-content' class="collapse position-absolute top-50 end-0" style="z-index: 1; left: 0; margin-top: 50px;">
                <?= view('webgis/components/panel_filter'); ?>
            </div>

        </div>
    </div>

    <!-- Popup Overlay Select Grid -->
    <div id="popup-grid" class="ol-popup popup-grid m-0 p-0 d-none" style="height: 300px;">
        <div class="popup-header border-bottom" style="height: 25px; background-color: #006aca; border-radius: 10px 10px 0 0">
            <a href="#" id="popup-closer-grid" class="ol-popup-closer" style="color: white;"></a>
        </div>
        <div id="popup-select-grid" class="mh-100 px-0 overflow-auto scrollbar" style="height: 275px; border-radius: 0 0 20px 20px;">
            <table class="table table-striped">
                <tbody>
                    <?php $grid_list_poi = ['U20' => '1', 'U25' => '2', 'U30' => '3', 'U35' => '4', 'U40' => '5', 'U50' => '6', 'U21' => '1', 'U22' => '2', 'U32' => '3', 'U32' => '4', 'U42' => '5', 'U52' => '6'];
                    foreach ($grid_list_poi as $poi => $count) { ?>
                        <tr>
                            <td class="py-1 my-0 col-9"><?= $poi; ?></td>
                            <td class="py-1 my-0 col-auto"><?= $count; ?></td>
                        </tr>
                    <?php } ?>
                </tbody>
            </table>
        </div>
    </div>


    <!-- START HIDDEN SHOW FORM FOR DRAW -->
    <div>
        <form action="GET" class="">

        </form>
    </div>
    <!-- END HIDDEN SHOW FORM FOR DRAW -->
</div>

<!-- search by koor -->
<?= view('webgis/components/search_koor'); ?>