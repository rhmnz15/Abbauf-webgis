<!DOCTYPE html>
<html lang="en" class="h-100">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="keywords" content="" />
    <meta name="author" content="" />
    <meta name="robots" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Abbauf GIS - Change Password" />
    <meta property="og:title" content="Abbauf GIS - Change Password" />
    <meta property="og:description" content="Abbauf GIS - Change Password" />
    <meta name="format-detection" content="telephone=no">

    <!-- FAVICONS ICON -->
    <link rel="shortcut icon" type="image/png" href="<?= base_url("icons/logo.svg") ?>" />

    <!-- Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=ABeeZee:ital@1&display=swap" rel="stylesheet">

    <!-- PAGE TITLE HERE -->
    <title>Abbauf GIS - Change Password</title>

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
        <div class="layout-auth d-flex justify-content-center h-100 align-items-center position-relative">
            <!-- Make A Form Tag -->
            <form class="auth-box" id="change-password-form">
                <h1 class="text-center font-nunito">Change Password</h1>
                <!-- Input Old Password -->
                <div class="input-container d-flex justify-content-center position-relative">
                    <input type="password" class="w-full auth-input" id="cpassword" placeholder="Old Password">
                    <img src="<?php echo base_url(); ?>/icons/auth/eye-open.svg" alt="eye-icon" id="eye-icon" class="eye-icon cursor-pointer position-absolute end-0 top-50 translate-middle">
                </div>
                <!-- End Of Input Old Password -->
                
                <!-- Input Password -->
                <div class="input-container d-flex justify-content-center position-relative">
                    <input type="password" class="w-full auth-input" id="password" placeholder="New Password">
                    <img src="<?php echo base_url(); ?>/icons/auth/eye-open.svg" alt="eye-icon" id="eye-icon" class="eye-icon cursor-pointer position-absolute end-0 top-50 translate-middle">
                </div>
                <!-- End Of Input Password -->

                <!-- Button Submit -->
                <button class="font-abeezee auth-button w-full" type="submit">Reset My Password</button>
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
    <script src="<?php echo base_url(); ?>/js/auth/change-password.js"></script>

</body>

</html>