<style>
    .container-profilepic {
        width: 150px;
        height: 150px;
    }

    .photo-preview {
        background-size: cover;
        background-position: center;
    }

    .middle-profilepic {
        background-color: rgba(255, 255, 255, 0.69);
    }

    .container-profilepic:hover .middle-profilepic {
        display: flex !important;
        cursor: pointer;
    }

    .photo-content:hover .cover-change {
        opacity: 1;
    }

    .photo-content:hover .cover-photo {
        opacity: .5;
    }

    .cover-photo {
        object-fit: cover;
        opacity: 1;
        transition: opacity .2s ease-in-out;
    }

    .cover-change {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: black;
        opacity: 0;
        transition: opacity .2s ease-in-out;
        background-color: rgba(255, 255, 255, 0.69);
    }

    .cover-change-icon {
        color: black;
        padding-bottom: 8px;
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.69);
    }

    .cover-change-text {
        text-transform: uppercase;
        font-size: 12px;
        width: 50%;
        text-align: center;
        cursor: pointer;
    }
</style>




<div class="row">
    <div class="col-lg-12">
        <div class="profile card card-body px-3 pt-3 pb-0">
            <div class="profile-head">
                <div class="photo-content">
                    <img class="cover-photo" src="<?php echo base_url(); ?>/images/kanek.jpg" />
                    <div class="cover-change">
                        <span class="cover-change-icon">
                            <i class="fas fa-camera" style="font-size: 20px;"></i>
                        </span>
                        <span class="cover-change-text">
                            Change Cover
                        </span>
                    </div>
                </div>
                <div class="profile-info">
                    <div class="container-profilepic card rounded-circle overflow-hidden" style="width: 120px; height: 110px;margin-top: -50px;">
                        <img class="photo-preview card-img w-100 h-100" style="object-fit: cover;" src="<?php echo base_url(); ?>/images/sunda.jpg" />
                        <div class="middle-profilepic text-center card-img-overlay d-none flex-column justify-content-center">
                            <div class="text-profilepic">
                                <i class="fas fa-camera" style="font-size: 20px;"></i>
                            </div>
                        </div>
                    </div>
                    <div class="profile-details d-flex flex-column justify-content-start py-4" style="margin-top: -20px;">
                        <div class="profile-name px-3">
                            <h1 class="text-primary  mb-0 fs-5">Lord Rangga</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- TANDA -->
<div class="row">

    <div class="col-xl-12">
        <div class="card">
            <div class="card-header d-flex justify-content-center bg-primary">
                <p class="mb-0 text-white mb-0 fs-5 ">User Information</p>
            </div>
            <div class="card-body">
                <div class="profile-tab">
                    <div class="custom-tab-1">
                        <div class="tab-content px-4">
                            <div id="my-posts" class="tab-pane fade active show">
                                <div class="profile-personal-info pt-5">
                                    <div class="row mb-2">
                                        <div class="col-3">
                                            <h5 class="f-w-500 fs-6">
                                                Name <span class="pull-right">:</span>
                                            </h5>
                                        </div>
                                        <div class="col-9">
                                            <span>Mitchell C.Shay</span>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <div class="col-3">
                                            <h5 class="f-w-500 fs-6">
                                                Email <span class="pull-right">:</span>
                                            </h5>
                                        </div>
                                        <div class="col-9">
                                            <span></span>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <div class="col-3">
                                            <h5 class="f-w-500 fs-6">
                                                Company<span class="pull-right">:</span>
                                            </h5>
                                        </div>
                                        <div class="col-9">
                                            <span>PT. Abbauf Mulia Konsultan Teknologi</span>
                                        </div>
                                    </div>
                                    <div class="d-flex gap-4 mt-5">
                                        <a class="d-block btn btn-primary" href="<?php echo base_url(); ?>/user/edit-profile">Edit Profile</a>
                                        <a class="d-block btn btn-primary" href="<?php echo base_url(); ?>/user/change-password">Change Password</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script data-cfasync="false" src="<?php echo base_url(); ?>/js/email-decode.min.js"></script>