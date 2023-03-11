<?= $this->extend('template/default_template') ?>
<?= $this->section('content') ?>

<div class="content-container">
    <!-- card body -->
    <div class="w-full flex-wrap d-flex  justify-content-between mt-4 " id="card-body">
        <!-- card box -->


    </div>
    <!-- End of card body -->

    <!-- Table list Features -->
    <div class="div card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h4 class=" font-kanit">Request your own features</h4>
        </div>
        <div class="card-body">
            <form action="" class="mb-3" method="post" id="add-request-packages">
                <div class="d-flex justify-content-between" style="font-size: 1rem;">
                    <p style="font-weight: 700">Select Features</p>
                    <p style="font-weight: 700">Price : <span style="text-decoration: underline;">Rp 0</span></p>
                </div>
                <div class="font-kanit" id="features-list">
                    <!-- Features List -->
                </div>
            </form>
        </div>

        <div class="card-footer">
            <div class="d-flex justify-content-end">
                <button type="submit" onclick="addRequestPackage()" class="dashboard-button-blue dashboard-button-sm color-white">Save</button>
            </div>

        </div>
    </div>

    <div class="div card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h4 class=" font-kanit">Your Own Feature Request</h4>
        </div>
        <div class="card-body">
            <div class="table-container">
                <!-- Bootstrap Table -->
                <table class="table text-left">
                    <thead class="font-kanit">
                        <tr class="header-table">
                            <th scope="col" style="min-width: 150px">Features Requested</th>
                            <th scope="col" class="" style="min-width: 150px">Price</th>
                            <th scope="col" class="text-center" style="min-width: 150px">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-kanit">
                                <ul>
                                    <li class="ml-3" style="list-style-type: circle;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, unde?</li>
                                    <li class="ml-3" style="list-style-type: circle;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, unde?</li>
                                    <li class="ml-3" style="list-style-type: circle;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, unde?</li>
                                    <li class="ml-3" style="list-style-type: circle;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, unde?</li>
                                    <li class="ml-3" style="list-style-type: circle;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, unde?</li>
                                </ul>
                            </td>
                            <td class="font-kanit">
                                <p>Rp 150.000</p>
                            </td>
                            <td class="text-center">
                                <div class="d-flex justify-content-center">
                                    <p class="badge badge-lg badge-warning">Waiting</p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="font-kanit">
                                <ul>
                                    <li class="ml-3" style="list-style-type: circle;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, unde?</li>
                                    <li class="ml-3" style="list-style-type: circle;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, unde?</li>
                                    <li class="ml-3" style="list-style-type: circle;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, unde?</li>
                                    <li class="ml-3" style="list-style-type: circle;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, unde?</li>
                                    <li class="ml-3" style="list-style-type: circle;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, unde?</li>
                                </ul>
                            </td>
                            <td class="font-kanit">
                                <p>Rp 150.000</p>
                            </td>
                            <td class="text-center ">
                                <div class="d-flex justify-content-center">
                                    <p class="badge badge-lg badge-danger">Rejected</p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="font-kanit">
                                <ul>
                                    <li class="ml-3" style="list-style-type: circle;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, unde?</li>
                                    <li class="ml-3" style="list-style-type: circle;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, unde?</li>
                                    <li class="ml-3" style="list-style-type: circle;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, unde?</li>
                                    <li class="ml-3" style="list-style-type: circle;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, unde?</li>
                                    <li class="ml-3" style="list-style-type: circle;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, unde?</li>
                                </ul>
                            </td>
                            <td class="font-kanit">
                                <p>Rp 150.000</p>
                            </td>
                            <td class="text-center ">
                                <div class="d-flex justify-content-center">
                                    <p class="badge badge-lg badge-success">Approved</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- End Of Bootstrap Table -->
            </div>
        </div>
    </div>
    <!-- End Of table list Features -->

</div>

<!-- ======== modal detail package ======== -->
<div class="modal fade" id="detail-package-modal" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title font-kanit" id="myModalLabel">Package Detail</h5>
                <button type="button" class="close" id="close-detail-package-modal" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body font-nunito">
                <div class="d-flex">
                    <div class="mr-2">
                        <p>Package Name</p>
                        <p>Package Price</p>
                    </div>
                    <div>
                        <p id="package-name">Package 1</p>
                        <p id="package-price">Rp 2.000.000</p>
                    </div>
                </div>
                <div>
                    <p>Feature List:</p>
                    <div id="package-features"></div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="dashboard-button-blue dashboard-button-sm color-white" id="subscribe-button">
                    Subscribe
                </button>
            </div>
        </div>
    </div>
</div>

<!-- JS -->
<script src="/assets/js/jquery-3.6.1.min.js"></script>
<script src="<?php echo base_url(); ?>/js/dashboard/user.js"></script>
<!-- TODO: Remove ".sandbox" from script src URL for production environment. Also input your client key in "data-client-key" -->
<script src="https://app.sandbox.midtrans.com/snap/snap.js" data-client-key="SB-Mid-client-84PD1yfgn32Vwa-z"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="<?php echo base_url() ?>/js/dashboard/package-user.js"></script>
<!-- End Of JS -->

<?= $this->endSection() ?>