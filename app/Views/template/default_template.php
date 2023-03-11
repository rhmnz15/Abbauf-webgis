<!DOCTYPE html>
<html lang="en">
<?= $this->include('template/css') ?>

<!-- style Custom Datatables -->
<style>
    .dataTables_wrapper .dataTables_paginate .paginate_button:hover{
        background: rgb(34,60,247);
background: linear-gradient(90deg, rgba(34,60,247,0.9531162806919643) 100%, rgba(0,220,255,1) 100%, rgba(0,0,36,1) 100%);
    }

    .dataTables_wrapper .dataTables_paginate .paginate_button.current, .dataTables_wrapper .dataTables_paginate .paginate_button.current:hover{
        background-color: #3A7AFE;
       
    }
    .dataTables_wrapper .dataTables_paginate .paginate_button.current, .dataTables_wrapper .dataTables_paginate .paginate_button.current:hover{
        color: white !important;
    }
    .dataTables_wrapper .dataTables_paginate .paginate_button.current:hover, .dataTables_wrapper .dataTables_paginate .paginate_button.previous:hover, .dataTables_wrapper .dataTables_paginate .paginate_button.next:hover{
        color: white !important;
        background-color: #3A7AFE;
    }
    table.dataTable tbody td{
        text-align: center;
    }
   .dataTables_wrapper .dataTables_length .dropdown-menu .dropdown-item:hover, .dropdown-menu .dropdown-item:focus, .dropdown-menu .dropdown-item:active, .dropdown-menu .dropdown-item.active{
        background-color: #3A7AFE;
        color:white;
    }
    ::-webkit-scrollbar-thumb {
    background-color: #3A7AFE;
    border-radius: 100px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background-color: #3A7AFE !important;
    }
    ::-webkit-scrollbar-track {
        background: rgb(224 220 220);
    }
</style>

<head>
    <script>
        var base_url = '<?= base_url() ?>';
    </script>
</head>

<body>
    <div id="preloader">
        <div class="sk-three-bounce">
            <div class="sk-child sk-bounce1"></div>
            <div class="sk-child sk-bounce2"></div>
            <div class="sk-child sk-bounce3"></div>
        </div>
    </div>

    <div id="main-wrapper">
        <div class="nav-header">
            <a href="<?php echo base_url(); ?>" class="brand-logo">
                <img class="logo-abbr" src="<?php echo base_url(); ?>/images/abbauf.png" alt="">
            </a>

            <div class="nav-control">
                <div class="hamburger" style="margin-bottom: 10px;">
                    <button class="dashboard-button burger-button-desktop d-flex align-items-center justify-content-center">
                        <i class="fa-solid fa-bars" style="font-size: 20px; color: white;"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- If url is not webgis include template/sidebar -->
        <?php if (strpos($_SERVER['REQUEST_URI'], '/dashboard/webgis') === false) : ?>
            <?= $this->include('template/sidebar') ?>
        <?php endif; ?> 

        <?= $this->include('template/header') ?>

        <div class="deznav">
            <div class="deznav-scroll">
                <ul class="nav menu-tabs">
                    <li class="nav-item" id="nav-item-dashboard" title="Dashboard">
                        <a href="/" class="nav-link <?php if ((strpos($_SERVER['REQUEST_URI'], '/user/dashboard') !== false
                                                        || strpos($_SERVER['REQUEST_URI'], '/admin/dashboard') !== false
                                                        || $_SERVER['REQUEST_URI'] === "/") && (strpos($_SERVER['REQUEST_URI'], '/webgis') === false))
                                                        echo ("active") ?>">
                            <img class="brand-title" src="<?php echo base_url(); ?>/images/speedometer.svg" alt="">
                        </a>
                    </li>
                    <li class="nav-item" id="nav-item-gis" title="WebGIS">
                        <a href="/dashboard/webgis" class="nav-link <?php if ($_SERVER['REQUEST_URI'] === "/dashboard/webgis") echo ("active") ?>">
                            <img class="logo-compact" src="<?php echo base_url(); ?>/images/layer.svg" alt="">
                        </a>
                    </li>
                    <li class="nav-item" id="nav-item-survey" title="Survey">
                        <a href="/dashboard/survey" class="nav-link <?php if (strpos($_SERVER['REQUEST_URI'], '/survey') !== false) echo ("active") ?>">
                            <img class="logo-compact" src="<?php echo base_url(); ?>/images/survey.svg" alt="">
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="content-body bg-white">
            <div class="container-fluid">
                <?= $this->renderSection('content') ?>
            </div>
        </div>
        <?= $this->renderSection('content:map') ?>

        <?= $this->include('template/footer') ?>
    </div>
</body>
<?= $this->include('template/js') ?>

<!-- Profile Modal -->
<div class="modal fade" id="modal-profile-setting" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" id="modal-profile-setting">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Profile</h5>
                <button type="button" id="profile-close-button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form action="" method="post" id="edit_profile">
                <div class="modal-body font-nunito">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="modal-input-field">
                                <label for="exampleFormControlFile1">Profile Picture</label>
                                <div class="d-flex justify-content-center">
                                    <div class="dropzone">
                                        <input type="file" accept="image/*" class="profile-pict" id="profile-pict-profile-modal">
                                        <img src="<?php echo base_url() ?>/icons/dashboard/camera.png" alt="" class="preview" id="preview-profile-modal">
                                        <!-- Script on management-user.js -->
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-8">
                            <div class="modal-input-field">
                                <label for="name">Name</label>
                                <input id="name-user-edit" type="text" class="form-control" placeholder="Name">
                            </div>

                            <div class="modal-input-field">
                                <label for="email">Email</label>
                                <input id="email-user-edit" type="email" class="form-control" placeholder="example@mail.com">
                            </div>

                            <div class="modal-input-field">
                                <label for="company">Company</label>
                                <input id="company-user-edit" type="text" class="form-control" placeholder="Company name">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" >Save</button>
                </div>
            </form>
        </div>
    </div>
</div>
<?= $this->renderSection('javascript:footer') ?>
</html>