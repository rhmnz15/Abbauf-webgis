<!DOCTYPE html>
<html lang="en" class="h-100">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="keywords" content="" />
    <meta name="author" content="" />
    <meta name="robots" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Abbauf GIS - Register" />
    <meta property="og:title" content="Abbauf GIS - Register" />
    <meta property="og:description" content="Abbauf GIS - Register" />
    <meta name="format-detection" content="telephone=no">

    <!-- FAVICONS ICON -->
    <link rel="shortcut icon" type="image/png" href="<?= base_url("icons/logo.svg") ?>" />

    <!-- Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=ABeeZee:ital@1&display=swap" rel="stylesheet">

    <!-- PAGE TITLE HERE -->
    <title>Abbauf GIS - Register</title>

    <!-- FAVICONS ICON -->
    <link href="<?php echo base_url(); ?>/css/style.css" rel="stylesheet">
    <link href="<?php echo base_url(); ?>/css/auth-global.css" rel="stylesheet">
    <link href="<?php echo base_url(); ?>/css/auth/register.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css">
    <script>
        var base_url = '<?= base_url() ?>';
    </script>
</head>

<body class="h-100" style="background-color: white;">
    <section class="h-100 overflow-y-hidden overflow-x-hidden">
        <div class="layout-auth position-relative row justify-content-center h-100 align-items-center">
            <!-- ======== start form ======== -->
            <form id="register-form" class="auth-box d-flex flex-column">
                <!-- ======== title box auth ======== -->
                <h1 class="text-center font-nunito">Register</h1>
                <!-- ======== email field ======== -->
                <div class="position-relative input-container">
                    <input id="email" class="auth-input w-full" type="email" name="email" placeholder="Enter Email" required>
                    <!-- ======== x button ======== -->
                    <i class="x-icon cursor-pointer position-absolute end-0 top-50 translate-middle">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3.5" y="3.5" width="17.5" height="17.5" rx="8.75" stroke="#667085" />
                            <path d="M14.7944 10.0021L10.0024 14.7941" stroke="#667085" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M14.796 14.797L10 10" stroke="#667085" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </i>
                </div>
                <!-- ======== name field ======== -->
                <div class="position-relative input-container">
                    <input id="fullname" class="auth-input w-full" type="text" name="fullname" placeholder="Enter Fullname" required>
                    <img src="<?php echo base_url(); ?>/icons/auth/x-icon.svg" alt="" class="x-icon1 cursor-pointer position-absolute end-0 top-50 translate-middle" id="x-icon1">
                </div>
                <!-- ======== company field ======== -->
                <div class="position-relative input-container">
                    <input id="company" class="auth-input w-full" type="text" name="company" placeholder="Enter Company Name" required>
                    <img src="<?php echo base_url(); ?>/icons/auth/x-icon.svg" alt="" class="x-icon2 cursor-pointer position-absolute end-0 top-50 translate-middle" id="x-icon2">
                </div>
                <!-- ======== pass field ======== -->
                <div class="input-container d-flex justify-content-center position-relative">
                    <input type="password" class="w-full auth-input" id="password" placeholder="*****">
                    <img src="<?php echo base_url(); ?>/icons/auth/eye-open.svg" alt="eye-icon" id="eye-icon" class="eye-icon cursor-pointer position-absolute end-0 top-50 translate-middle">
                </div>
                <!-- ======== login navlinks ======== -->
                <div class="auth-nav font-abeezee d-flex justify-content-center fs-15px ">
                    Have an account?&nbsp;<span><a class="auth-navlink" href="/auth/login">Login</a></span>
                </div>
                <!-- ======== button submit ======== -->
                <button class="font-abeezee auth-button">Sign Up</button>
                <!-- ======== or continue register with ======== -->
                <div class="continue-register font-abeezee d-flex justify-content-between align-items-center">
                    <svg width="71" height="1" viewBox="0 0 71 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line y1="0.5" x2="71" y2="0.5" stroke="#DFDFDF" />
                    </svg>
                    <span class="">Or continue register with</span>
                    <svg width="71" height="1" viewBox="0 0 71 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line y1="0.5" x2="71" y2="0.5" stroke="#DFDFDF" />
                    </svg>
                </div>
                <!-- ======== google and facebook regitser ======== -->
                <div class="row">
                    <button class="col font-abeezee third-party-button mr-2">
                        <img src="<?php echo base_url(); ?>/icons/auth/google.svg" alt="google logo">
                    </button>
                    <button class="col font-abeezee third-party-button">
                        <img src="<?php echo base_url(); ?>/icons/auth/facebook.svg">
                    </button>
                </div>
            </form>
            <!-- Background Yellow and Blue-->
            <img src="<?php echo base_url(); ?>/icons/auth/background-yellow.svg" class="position-absolute circle-yellow ">
            <img src="<?php echo base_url(); ?>/icons/auth/background-blue.svg" class="position-absolute circle-blue">
        </div>
    </section>
    <!--**********************************
            Scripts
        ***********************************-->
    <!-- Required vendors -->
    <script src="<?php echo base_url(); ?>/js/auth/register.js"></script>
</body>

</html>