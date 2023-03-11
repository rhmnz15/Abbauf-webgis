<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="keywords" content="" />
    <meta name="author" content="" />
    <meta name="robots" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Abbauf GIS - Login" />
    <meta property="og:title" content="Abbauf GIS - Login" />
    <meta property="og:description" content="Abbauf GIS - Login" />
    <meta name="format-detection" content="telephone=no">

    <!-- FAVICONS ICON -->
    <link rel="shortcut icon" type="image/png" href="<?= base_url("icons/logo.svg") ?>" />

    <!-- Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=ABeeZee:ital@1&display=swap" rel="stylesheet">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css">

    <!-- PAGE TITLE HERE -->
    <title>Abbauf GIS - Login</title>

    <!-- FAVICONS ICON -->
    <link href="<?php echo base_url(); ?>/css/style.css" rel="stylesheet">
    <link href="<?php echo base_url(); ?>/css/auth-global.css" rel="stylesheet">
    <link href="<?php echo base_url(); ?>/css/auth/login.css" rel="stylesheet">
    <script>
        var base_url = '<?= base_url() ?>';
    </script>
</head>

<body class="h-100" style="background-color: white;">
    <section class="position-relative overflow-hidden h-100">

        <!-- Container -->
        <div class="layout-auth d-flex justify-content-center justify-xl-content-between align-items-center position-relative" style="height: 100vh;">
            <!-- Background -->

            <!-- Background Person -->
            <div class="banner d-none d-lg-flex h-100 w-full position-absolute align-items-center justify-content-center">
                <img src="<?php echo base_url(); ?>/icons/auth/person.svg" alt="person animated svg" class="position-absolute mr-5" style="z-index:9; margin-right: 15rem !important">
            </div>
            <!-- End Of Background Person -->

            <!-- Background Yellow and Blue-->
            <img src="<?php echo base_url(); ?>/icons/auth/background-yellow.svg" class="d-none d-xl-block position-absolute circle-yellow-login h-100">
            <img src="<?php echo base_url(); ?>/icons/auth/background-blue.svg" class="d-none d-xl-block position-absolute circle-blue-login h-100">
            <!-- End Of Background Yellow and Blue -->

            <!-- End Of Background -->

            <!-- Banner -->
            <div class="banner d-none d-lg-flex flex-column justify-content-center flex-grow-1" style="height: 100vh">
                <div class="position-relative pr-4">
                    <h1 class="font-nunito position-relative" style="z-index:10;">Sign In Abbauf <br> Webgis Intelegence</h1>
                    <p class="font-abeezee position-relative" style="z-index:10;">Lorem Ipsum is simply dummy text of the <br> printing and typesetting industry. Lorem Ipsum</p>
                </div>
            </div>
            <!-- End Of Banner -->

            <!-- Form Input Box -->
            <div class="d-flex align-items-center">
                <form id="login-form" class="auth-box-login d-flex flex-column">
                    <img class="logo-abbauf" src="<?php echo base_url(); ?>/icons/auth/logo.svg" alt="logo abbauf">
                    <div class="position-relative input-container">
                        <input id="email" class="auth-input w-full" type="email" name="email" placeholder="Enter Email" required>
                        <!-- ======== x button ======== -->
                        <img src="<?php echo base_url() ?>/icons/auth/x-icon.svg" alt="x-icon" class="x-icon cursor-pointer position-absolute end-0 top-50 translate-middle">
                    </div>
                    <!-- ======== pass field ======== -->
                    <div class="input-container d-flex justify-content-center position-relative">
                        <input type="password" class="w-full auth-input" id="password" placeholder="Password">
                        <img src="<?php echo base_url(); ?>/icons/auth/eye-open.svg" alt="eye-icon" id="eye-icon" class="eye-icon cursor-pointer position-absolute end-0 top-50 translate-middle">
                    </div>
                    <!-- ======== login navlinks ======== -->
                    <div class="auth-nav font-abeezee d-flex justify-content-between fs-15px ">
                        <a class="auth-navlink" href="<?php echo base_url() ?>/auth/register">Register</a>
                        <a class="auth-navlink" href="<?php echo base_url() ?>/auth/forgot-password">Forgot Password?</a>
                    </div>
                    <!-- ======== button submit ======== -->
                    <button class="font-abeezee auth-button fs-15px">Sign In</button>
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
                    <div class="d-flex justify-content-between">
                        <button type="button" id="google-login" class="font-abeezee third-party-button">
                            <img src="<?php echo base_url(); ?>/icons/auth/google.svg" alt="google logo">
                        </button>
                        <button type="button" id="facebook-login" class="font-abeezee third-party-button">
                            <img src="<?php echo base_url(); ?>/icons/auth/facebook.svg">
                        </button>
                    </div>
                </form>
            </div>
            <!-- End Of Form Input Box -->

            <!-- Background Yellow and Blue (Responsive)-->
            <img src="<?php echo base_url(); ?>/icons/auth/background-yellow.svg" class="d-xl-none position-absolute circle-yellow ">
            <img src="<?php echo base_url(); ?>/icons/auth/background-blue.svg" class="d-xl-none position-absolute circle-blue">
        </div>
        <!-- End Of Container -->

    </section>

    <!--**********************************
        Scripts
    ***********************************-->
    <!-- Required vendors -->
    <script src="<?php echo base_url(); ?>/js/auth/login.js"></script>
</body>

</html>