<?= $this->extend('template/default_template') ?>
<?= $this->section('content') ?>

<script src="/assets/js/jquery-3.6.1.min.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="<?php echo base_url(); ?>/js/dashboard/user.js"></script>
<script src="<?php echo base_url(); ?>/js/dashboard/dropzone-shp.js"></script>
<link href="<?php echo base_url(); ?>/css/dashboard/dropzone.css" rel="stylesheet">

<div class="content-container">
    <!-- Table Last User Registration-->
    <div class="div card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h4 class="font-kanit">List Survey</h4>
            <button class="dashboard-button" id="add-shp">
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="10.1113" width="1.55556" height="21" rx="0.777778" fill="white" />
                    <rect x="21" y="8.55566" width="1.55556" height="21" rx="0.777778" transform="rotate(90 21 8.55566)" fill="white" />
                </svg>
            </button>
        </div>
        <div class="card-body">
            <div class="table-container">
                <!-- Bootstrap Table -->
                <table class="table text-left">
                    <thead class="font-kanit">
                        <tr class="header-table">
                            <th scope="col" style="width: 250px">Survey Name</th>
                            <th scope="col" class="text-center" style="width: 250px">Username Upload</th>
                            <th scope="col" class="text-center" style="width: 250px">Status</th>
                            <th scope="col" class="text-center" style="width: 250px">Action</th>
                        </tr>
                    </thead>
                    <tbody id="all-shp">
                    </tbody>
                </table>
                <!-- End Of Bootstrap Table -->
            </div>
        </div>
    </div>
    <!-- End Of Last Table User Registration-->
</div>

<!-- ======== modal add SHP ======== -->
<div class="modal fade " id="modalshp" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title font-kanit" id="myModalLabel">Add Survey</h5>
                <button type="button" class="close close-add-package" id="close-shp" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form action="" method="post" id="shp_add">
                <div class="modal-body font-nunito">
                    <div class="modal-input-field">
                        <label for="shp-name">Survey Name</label>
                        <input id="shp-name" name="name" type="text" class="form-control" placeholder="survey name">
                    </div>
                    <div class="modal-input-field">
                        <label for="username-input">Upload file</label>
                        <!-- <input id="username-input" type="file" name="file" class="form-control" placeholder="input username"> -->
                        <div id="drop_zone">
                            <p>Drop file here</p>
                            <p>or</p>
                            <p><button type="button" id="btn_file_pick" class="btn btn-primary"><span class="glyphicon glyphicon-folder-open"></span> Select File</button></p>
                            <p id="file_info"></p>
                            <p><button type="button" id="btn_upload" class="btn btn-primary"><span class="glyphicon glyphicon-arrow-up"></span> Upload To Server</button></p>
                            <input type="file" id="selectfile" accept=".zip, .rar">
                            <p id="message_info"></p>
                        </div>

                    </div>
                    <div class="modal-input-field">
                        <label for="shp-status">Survey Status</label>
                        <!-- <input id="shp-status" type="text" class="form-control" placeholder="Active"> -->
                        <select class="" id="status" name="status">
                            <option value="t" selected>Active</option>
                            <option value="f">Not Active</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="dashboard-button-blue dashboard-button-sm color-white">Save</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="modal fade" id="editSHP" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title font-kanit" id="myModalLabel">Edit Survey</h5>
                <button id="close-shp" type="button" class="edit-close border-0 bg-transparent" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">
                        <span aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-x-lg fw-bold" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                            </svg>
                        </span>
                    </span>
                </button>
            </div>
            <!-- <form action=""method="PUT" id="shp_edit"> -->
            <div class="modal-body font-nunito">
                <div class="modal-input-field">
                    <label for="package-name">Survey Name</label>
                    <input id="package-name" name="name" type="text" class="form-control" placeholder="SHP name">
                    <input id="id_shp" type="hidden" class="form-control">
                </div>
                <!--                     
                    <div class="modal-input-field">
                        <label for="package-status">SHP Status</label>
                        <select class="form-control" name="status" id="package-status">
                            <option value="t">Active</option>
                            <option value="f">Not Active</option>
                        </select>
                    </div> -->
            </div>
            <div class="modal-footer">
                <button type="button" onclick="update_shp()" class="dashboard-button-blue dashboard-button-sm color-white">Save</button>
            </div>
            <!-- </form> -->
        </div>
    </div>
</div>


<!-- ======== modal confirmation delete ======== -->
<div class="modal fade" id="modal-delete-confirmation" tabindex="-1" aria-labelledby="modalDeleteConfirmationLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title font-kanit" id="modalDeleteConfirmationLabel">Delete Survey</h5>
                <button type="button" class="close close-delete-confirmation" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body font-nunito">
                <h5 class="text-center">Are you sure you'd like to delete Survey?</h5>
            </div>
            <div class="modal-footer">
                <button type="button" class="button-cancel dashboard-button-gray dashboard-button-sm color-white">Cancel</button>
                <button type="button" class="dashboard-button-red dashboard-button-sm color-white">Delete</button>
            </div>
        </div>
    </div>
</div>

<script src="<?php echo base_url(); ?>/js/dashboard/shp.js"></script>

<?= $this->endSection() ?>