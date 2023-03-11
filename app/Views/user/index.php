<?= $this->extend('template/default_template') ?>
<?= $this->section('content') ?>

<div class="content-container">
    <h4 class="font-nunito" id="greeting">Welcome Back <span id="greeting-name">Gilang</span>!</h4>

    <!-- Banner -->
    <div class="banner p-3">
        <div class="row blue-banner d-flex justify-md-content-center justify-content-between align-items-center">
            <div class="col-md-9 content">
                <h1 class="font-nunito text-white mb-4" style="font-style:italic;">You not subscribe to any package!</h1>
                <p class="font-nunito text-white" style="font-weight: 500;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting
                </p>
            </div>

            <div class="col-md-2 d-none d-xl-block">
                <img src="<?php echo base_url() ?>/icons/user/banner-pict.svg" alt="banner-pict" class="float-right m-0">
            </div>
        </div>
    </div>

    <div class="row d-flex justify-content-around">
        <!-- Chart -->
        <div class="col-xl-8">
            <div class="main-card-admin mb-3">
                <div class="row d-flex justify-content-between align-items-center pt-5 pl-5 pr-5">
                    <h4 class="font-nunito m-0">POI Growth</h4>
                </div>
                <div class="container-chart p-4" id="conainer-chart">
                    <canvas id="chart" style="height: 425px;">
                    </canvas>
                </div>
            </div>
        </div>
        <!-- End Of Chart -->

        <!-- POI, SHP, User Free  -->
        <div class="col-xl-4">
            <!-- Side Card All POI -->
            <div class="small-card-admin mb-3 all-user-registration">
                <div class="row d-flex align-items-center pt-3 pb-3">
                    <img src="<?php echo base_url() ?>/icons/dashboard/poi.svg" alt="wallet" class="d-block mr-1">
                    <h6 class="m-0 font-inter ml-3">All POI</h6>
                </div>
                <div class="row d-flex align-items-end pb-2">
                    <h2 class="m-0 font-inter" id="poi-count">123.987</h2>
                    <p class="m-0 font-inter pl-2 userText" style="font-weight: 400;">POI</p>
                </div>
                <div class="row d-flex align-items-center">
                    <p class="font-inter" style="font-weight: 100;">Growth Monthly</p>
                    <p class="font-inter" style="font-weight: 100; color: #219653;">+256 User</p>
                    <p class="font-inter bg-font-user-growth-green" style="font-weight: 100; color: #219653;">+14.67%</p>
                </div>
            </div>
            <!-- End Of Side Card All POI -->

            <!-- Side Card All SHP -->
            <div class="small-card-admin mb-3">
                <div class="row d-flex align-items-center pt-3 pb-3">
                    <img src="<?php echo base_url() ?>/icons/dashboard/shp.svg" alt="wallet" class="d-block mr-1">
                    <h6 class="m-0 font-inter ml-3">All SHP</h6>
                </div>
                <div class="row d-flex align-items-end pb-2">
                    <h2 class="m-0 font-inter" id="shp-count">123.987</h2>
                    <p class="m-0 font-inter pl-2 userText" style="font-weight: 400;">SHP</p>
                </div>
                <div class="row d-flex align-items-center">
                    <p class="font-inter" style="font-weight: 100;">Growth Monthly</p>
                    <p class="font-inter" style="font-weight: 100; color: #219653;">+256 User</p>
                    <p class="font-inter bg-font-user-growth-red" style="font-weight: 100; color: #EB5757;">-14.67%</p>
                </div>
            </div>
            <!-- End Of Side Card All SHP -->

            <!-- Side Card All User Free -->
            <div class="small-card-admin mb-3">
                <div class="row d-flex align-items-center pt-3 pb-3">
                    <img src="<?php echo base_url() ?>/icons/dashboard/user-free.svg" alt="wallet" class="d-block mr-1">
                    <h6 class="m-0 font-inter ml-3">All User Free</h6>
                </div>
                <div class="row d-flex align-items-end pb-2">
                    <h2 class="m-0 font-inter" id="free-user-count"></h2>
                    <p class="m-0 font-inter pl-2 userText" style="font-weight: 400;">User</p>
                </div>
                <div class="row d-flex align-items-center">
                    <p class="font-inter" style="font-weight: 500;">Growth Monthly</p>
                    <p class="font-inter" style="font-weight: 500; color: #219653;">+256 User</p>
                    <p class="font-inter bg-font-user-growth-green" style="font-weight: 500; color: #219653;">+14.67%</p>
                </div>
            </div>
            <!-- End Of Side Card All User Free -->
        </div>
        <!-- End Of POI, SHP, User Free -->
    </div>
</div>


<!-- Js -->
<script src="/assets/js/jquery-3.6.1.min.js"></script>
<script src="<?php echo base_url(); ?>/js/dashboard/user.js"></script>
<script src="<?php echo base_url(); ?>/my-vendor/chart.js/Chart.bundle.min.js"></script>
<script src="<?php echo base_url(); ?>/js/dashboard/dashboard-chart.js"></script>
<script src="<?php echo base_url(); ?>/js/dashboard/management-user.js"></script>
<!-- End Of Js -->

<?= $this->endSection() ?>