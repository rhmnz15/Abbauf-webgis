<?= $this->extend('template/default_template') ?>
<?= $this->section('content') ?>
<div class="content-container">
    <div class="row">
        <!-- User Classification -->
        <div class="col-xl-4">
            <!-- Side Card All User Registration -->
            <div class="small-card-poi mb-3 all-user-registration">
                <div class="row d-flex align-items-center pt-3 pb-3">
                    <img src="<?php echo base_url() ?>/icons/dashboard/poi.svg" alt="wallet" class="d-block mr-1">
                    <h6 class="m-0 font-inter ml-3" style="color: #000;">All POI</h6>
                </div>
                <div class="row d-flex align-items-end">
                    <h2 class="m-0 font-inter" style="color: #000;">123.987</h2>
                    <p class="m-0 font-inter pl-2 userText" style="font-weight: 500; color: #000;">POI</p>
                </div>
            </div>
            <!-- End Of Side Card All User Registration -->
        </div>

        <div class="col-xl-4">
            <!-- Side Card All User Registration -->
            <div class="small-card-poi mb-3 all-user-registration">
                <div class="row d-flex align-items-center pt-3 pb-3">
                    <img src="<?php echo base_url() ?>/icons/dashboard/poi.svg" alt="wallet" class="d-block mr-1">
                    <h6 class="m-0 font-inter ml-3" style="color: #000;">All POI</h6>
                </div>
                <div class="row d-flex align-items-end">
                    <h2 class="m-0 font-inter" style="color: #000;">123.987</h2>
                    <p class="m-0 font-inter pl-2 userText" style="font-weight: 500; color: #000;">POI</p>
                </div>
            </div>
            <!-- End Of Side Card All User Registration -->
        </div>

        <div class="col-xl-4">
            <!-- Side Card All User Registration -->
            <div class="small-card-poi mb-3 all-user-registration">
                <div class="row d-flex align-items-center pt-3 pb-3">
                    <img src="<?php echo base_url() ?>/icons/dashboard/poi.svg" alt="wallet" class="d-block mr-1">
                    <h6 class="m-0 font-inter ml-3" style="color: #000;">All POI</h6>
                </div>
                <div class="row d-flex align-items-end">
                    <h2 class="m-0 font-inter" style="color: #000;">123.987</h2>
                    <p class="m-0 font-inter pl-2 userText" style="font-weight: 500; color: #000;">POI</p>
                </div>
            </div>
            <!-- End Of Side Card All User Registration -->
        </div>


        <!-- End Of User Classification -->
    </div>

    <!-- Table Last User Registration-->
    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h4 class="font-kanit">List POI</h4>
            <button class="dashboard-button" id="add-package-btn-POI">
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
                    <thead class="table-blue font-kanit">
                        <tr>
                            <th scope="col" class="fw-bold" style="font-weight: 300; width: 250px">POI Name</th>
                            <th scope="col" class="text-center fw-bold" style="font-weight: 300; width: 250px">Total POI</th>
                            <th scope="col" class="text-center fw-bold" style="font-weight: 300; width: 250px">Status</th>
                            <th scope="col" class="text-center fw-bold" style="font-weight: 300; width: 250px">Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-kanit " style="color: #3F779B;">Alfamart</td>
                            <td class="text-center" style="color: #000; font-size:14px; font-weight:500;">150 Point</td>
                            <td class="text-center" style="color: #000; font-size:14px; font-weight:500;">Active</td>
                            <td class="text-center d-flex justify-content-center">
                                <button id="edit-POI-btn" type="button" class="dashboard-button-yellow dashboard-button-sm color-white mr-2">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.8164 0.481201C13.1748 -0.1604 12.1377 -0.1604 11.4961 0.481201L10.6143 1.36011L13.4824 4.22827L14.3643 3.34644C15.0059 2.70483 15.0059 1.66772 14.3643 1.02612L13.8164 0.481201ZM5.05078 6.92651C4.87207 7.10522 4.73437 7.32495 4.65527 7.56812L3.78809 10.1697C3.70313 10.4216 3.77051 10.7 3.95801 10.8904C4.14551 11.0808 4.42383 11.1453 4.67871 11.0603L7.28027 10.1931C7.52051 10.1111 7.74023 9.97632 7.92187 9.79761L12.8232 4.89331L9.95215 2.02222L5.05078 6.92651V6.92651ZM2.8125 1.72046C1.25977 1.72046 0 2.98022 0 4.53296V12.033C0 13.5857 1.25977 14.8455 2.8125 14.8455H10.3125C11.8652 14.8455 13.125 13.5857 13.125 12.033V9.22046C13.125 8.7019 12.7061 8.28296 12.1875 8.28296C11.6689 8.28296 11.25 8.7019 11.25 9.22046V12.033C11.25 12.5515 10.8311 12.9705 10.3125 12.9705H2.8125C2.29395 12.9705 1.875 12.5515 1.875 12.033V4.53296C1.875 4.0144 2.29395 3.59546 2.8125 3.59546H5.625C6.14355 3.59546 6.5625 3.17651 6.5625 2.65796C6.5625 2.1394 6.14355 1.72046 5.625 1.72046H2.8125Z" fill="white" />
                                    </svg>
                                </button>
                                <button type="button" class="delete-button dashboard-button-red dashboard-button-sm color-white">
                                    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.82857 0.622266L4.57143 1.125H1.14286C0.510714 1.125 0 1.62773 0 2.25C0 2.87227 0.510714 3.375 1.14286 3.375H14.8571C15.4893 3.375 16 2.87227 16 2.25C16 1.62773 15.4893 1.125 14.8571 1.125H11.4286L11.1714 0.622266C10.9786 0.239063 10.5821 0 10.15 0H5.85C5.41786 0 5.02143 0.239063 4.82857 0.622266V0.622266ZM14.8571 4.5H1.14286L1.9 16.418C1.95714 17.3074 2.70714 18 3.61071 18H12.3893C13.2929 18 14.0429 17.3074 14.1 16.418L14.8571 4.5Z" fill="white" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td class="font-kanit" style="color:#3F779B ;">Bank</td>
                            <td class="text-center" style="color: #000; font-size:14px; font-weight:500;">250.000 Point</td>
                            <td class="text-center" style="color: #000; font-size:14px; font-weight:500;">Non Active</td>
                            <td class="text-center d-flex justify-content-center">
                                <button id="edit-POI-btn2" type="button" class="dashboard-button-yellow dashboard-button-sm color-white mr-2">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.8164 0.481201C13.1748 -0.1604 12.1377 -0.1604 11.4961 0.481201L10.6143 1.36011L13.4824 4.22827L14.3643 3.34644C15.0059 2.70483 15.0059 1.66772 14.3643 1.02612L13.8164 0.481201ZM5.05078 6.92651C4.87207 7.10522 4.73437 7.32495 4.65527 7.56812L3.78809 10.1697C3.70313 10.4216 3.77051 10.7 3.95801 10.8904C4.14551 11.0808 4.42383 11.1453 4.67871 11.0603L7.28027 10.1931C7.52051 10.1111 7.74023 9.97632 7.92187 9.79761L12.8232 4.89331L9.95215 2.02222L5.05078 6.92651V6.92651ZM2.8125 1.72046C1.25977 1.72046 0 2.98022 0 4.53296V12.033C0 13.5857 1.25977 14.8455 2.8125 14.8455H10.3125C11.8652 14.8455 13.125 13.5857 13.125 12.033V9.22046C13.125 8.7019 12.7061 8.28296 12.1875 8.28296C11.6689 8.28296 11.25 8.7019 11.25 9.22046V12.033C11.25 12.5515 10.8311 12.9705 10.3125 12.9705H2.8125C2.29395 12.9705 1.875 12.5515 1.875 12.033V4.53296C1.875 4.0144 2.29395 3.59546 2.8125 3.59546H5.625C6.14355 3.59546 6.5625 3.17651 6.5625 2.65796C6.5625 2.1394 6.14355 1.72046 5.625 1.72046H2.8125Z" fill="white" />
                                    </svg>
                                </button>
                                <button type="button" class="delete-button dashboard-button-red dashboard-button-sm color-white">
                                    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.82857 0.622266L4.57143 1.125H1.14286C0.510714 1.125 0 1.62773 0 2.25C0 2.87227 0.510714 3.375 1.14286 3.375H14.8571C15.4893 3.375 16 2.87227 16 2.25C16 1.62773 15.4893 1.125 14.8571 1.125H11.4286L11.1714 0.622266C10.9786 0.239063 10.5821 0 10.15 0H5.85C5.41786 0 5.02143 0.239063 4.82857 0.622266V0.622266ZM14.8571 4.5H1.14286L1.9 16.418C1.95714 17.3074 2.70714 18 3.61071 18H12.3893C13.2929 18 14.0429 17.3074 14.1 16.418L14.8571 4.5Z" fill="white" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- End Of Bootstrap Table -->
            </div>
        </div>
    </div>
    <!-- End Of Last Table User Registration-->
</div>


<!-- ======== start add modal ======== -->
<div class="modal fade" id="modalPoi" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title font-kanit" id="myModalLabel">Add POI</h5>
                <button type="button" class="close-POI border-0 bg-transparent " data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-x-lg fw-bold" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                        </svg>
                    </span>
                </button>
            </div>
            <div class="modal-body font-nunito">
                <div class="modal-input-field">
                    <label for="package-name">POI Name</label>
                    <input id="package-name" type="text" class="form-control" placeholder="POI name">
                </div>
                <div class="row">
                    <div class="col-6 modal-input-field">
                        <label for="package-price">Total POI</label>
                        <input id="package-price" type="number" class="form-control" placeholder="120 Point">
                    </div>
                    <div class="col-6 m">
                        <label for="package-status">POI Status</label>
                        <!-- <input id="package-status" type="text" class="form-control" placeholder="Active"> -->
                        <select class="" id="package-status">
                            <option value="active" selected>Active</option>
                            <option value="not-active">Not Active</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="dashboard-button-blue dashboard-button-sm color-white">Save</button>
            </div>
        </div>
    </div>
</div>
<!-- End modal add -->

<!-- ======== modal add and edit package ======== -->
<div class="modal fade" id="editPoi" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title font-kanit" id="myModalLabel">Edit POI</h5>
                <button type="button" class="edit-close border-0 bg-transparent" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">
                        <span aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-x-lg fw-bold" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                            </svg>
                        </span>
                    </span>
                </button>
            </div>
            <div class="modal-body font-nunito">
                <div class="modal-input-field">
                    <label for="package-name">POI Name</label>
                    <input id="package-name" type="text" class="form-control" placeholder="POI name">
                </div>
                <div class="row">
                    <div class="col-6 modal-input-field">
                        <label for="package-price">Total POI</label>
                        <input id="package-price" type="number" class="form-control" placeholder="120 Point">
                    </div>
                    <div class="col-6 m">
                        <label for="package-status">POI Status</label>
                        <!-- <input id="package-status" type="text" class="form-control" placeholder="Active"> -->
                        <select class="" id="package-status">
                            <option value="active" selected>Active</option>
                            <option value="not-active">Not Active</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="dashboard-button-blue dashboard-button-sm color-white">Save</button>
            </div>
        </div>
    </div>
</div>



<!-- ======== modal confirmation delete ======== -->
<div class="modal fade" id="modal-delete-confirmation" tabindex="-1" aria-labelledby="modalDeleteConfirmationLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title font-kanit" id="modalDeleteConfirmationLabel">Delete POI</h5>
                <button type="button" class="close close-delete-confirmation" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body font-nunito">
                <h5 class="text-center">Are you sure you'd like to delete this POI?</h5>
            </div>
            <div class="modal-footer">
                <button type="button" class="button-cancel dashboard-button-gray dashboard-button-sm color-white">Cancel</button>
                <button type="button" class="dashboard-button-red dashboard-button-sm color-white">Delete</button>
            </div>
        </div>
    </div>
</div>


<?= $this->endSection() ?>