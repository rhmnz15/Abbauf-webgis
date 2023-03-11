<!DOCTYPE html>
<html lang="en" class="h-100">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="keywords" content="" />
    <meta name="author" content="" />
    <meta name="robots" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Abbauf GIS - Forgot Password" />
    <meta property="og:title" content="Abbauf GIS - Forgot Password" />
    <meta property="og:description" content="Abbauf GIS - Forgot Password" />
    <meta name="format-detection" content="telephone=no">

    <!-- FAVICONS ICON -->
    <link rel="shortcut icon" type="image/png" href="<?= base_url("icons/logo.svg") ?>" />

    <!-- Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=ABeeZee:ital@1&display=swap" rel="stylesheet">

    <!-- PAGE TITLE HERE -->
    <title>Abbauf GIS - Forgot Password</title>

    <!-- FAVICONS ICON -->
    <link href="<?php echo base_url(); ?>/css/style.css" rel="stylesheet">
    <link href="<?php echo base_url(); ?>/css/auth-global.css" rel="stylesheet">
    <link href="<?php echo base_url(); ?>/css/auth/forgot-password.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css">
    <script>
        var base_url = '<?= base_url() ?>';
    </script>
</head>

<body class="h-100" style="background-color: white;">
    <section class="h-100 overflow-hidden">
        <div class="layout-auth position-relative row justify-content-center h-100 align-items-center">
            <!-- ======== start form ======== -->
            <form id="forgot-password-form" class="auth-box d-flex flex-column">
                <!-- ======== title box auth ======== -->
                <h1 class="text-center font-nunito">Lupa Password</h1>
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
                <!-- ======== login and register navlinks ======== -->
                <div class="auth-nav font-abeezee d-flex justify-content-between fs-14px ">
                    <a class="auth-navlink" href="/auth/login">Login</a>
                    <a class="auth-navlink" href="/auth/register">Register</a>
                </div>
                <!-- ======== button submit ======== -->
                <button class="font-abeezee auth-button" type="submit">Send Link To My Email</button>
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
    <script src="<?php echo base_url(); ?>/js/auth/forgot-password.js"></script>
</body>

</html>