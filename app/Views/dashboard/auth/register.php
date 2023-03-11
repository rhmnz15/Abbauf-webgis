<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Register</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=ABeeZee:ital@1&family=Nunito:wght@700&display=swap" rel="stylesheet">
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous" />

    <style>
        body {
            font-family: 'ABeeZee', sans-serif;
            background-color: #fff;
        }

        .wrapper {
            background-color: #fff;
            width: 400px;
            margin: 79px auto;
            padding: 40px;
            position: relative;
        }

        .register {
            font-family: 'Nunito', sans-serif;
            font-weight: bold;
        }

        .line {
            width: 100%;
            text-align: center;
            border-bottom: 1px solid #DFDFDF;
            line-height: 0.1em;
            margin: 10px 0 20px;
        }

        .line .word {
            background: #fff;
            padding: 0 25px;
        }

        .letter-spacing {
            letter-spacing: 0.1em;
            font-size: 12px;
        }

        #effect1 {
            border-radius: 50%;
            width: 390.86px;
            height: 390.86px;
            left: 450px;
            top: 50px;
            background: #DDA82A;
            opacity: 0.5;
            -webkit-filter: blur(100px);
            -webkit-transform: scale(.7, .7);
            position: absolute;
        }

        #effect2 {
            border-radius: 50%;
            width: 390.86px;
            height: 390.86px;
            left: 700px;
            top: 300px;
            background: #4461F2;
            opacity: 0.5;
            -webkit-filter: blur(100px);
            -webkit-transform: scale(.7, .7);
            position: absolute;
        }

        input[type=text],
        input[type=password] {
            background-color: #EAF0F7;
        }

        .button-color {
            background-color: #F6F6F6;
            border: 1px solid #DDDFDD;
        }

        .font-color {
            color: #ACADAC
        }

        .button {
            padding: 10px;
        }
    </style>
</head>

<body>
    <div class="container-fluid justify-content-center align-items-center">
        <div class="container justify-content-center align-items-center">
            <p id="effect1"></p>
            <p id="effect2"></p>
            <div class="wrapper rounded shadow-sm justify-content-center align-items-center">

                <div class="row">
                    <div class="col-12 text-center my-3 register fw-bold">
                        <h1>Register</h1>
                    </div>
                </div>
                <div class="form-group"></div>
                <div class="row">
                    <input type="text" class="form-control my-1" name="email" placeholder="Enter Email" />
                </div>
                <div class="row">
                    <input type="password" class="form-control my-1" name="password" placeholder="••••••••" />
                </div>
                <div class="row">
                    <p class="col-12 text-center py-4 letter-spacing font-color">Have an account? <span>Login</span></p>
                </div>
                <div class="row">
                    <button class="button btn btn-primary mb-3 shadow">Sign Up</button>
                </div>
                <div class="row py-4">
                    <p class="line letter-spacing font-color"><span class="word">Or continue register with</span></p>
                </div>
                <div class="row mb-4">
                    <button class="btn btn-light offset-1 col-4 button-color p-2"><svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M27.44 14.3182C27.44 13.3255 27.3509 12.3709 27.1855 11.4546H14V16.87H21.5345C21.21 18.62 20.2236 20.1027 18.7409 21.0955V24.6082H23.2655C25.9127 22.1709 27.44 18.5818 27.44 14.3182Z" fill="#4285F4" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0001 28C17.7801 28 20.9491 26.7464 23.2655 24.6082L18.741 21.0955C17.4873 21.9355 15.8837 22.4318 14.0001 22.4318C10.3537 22.4318 7.26732 19.9691 6.16641 16.66H1.48914V20.2873C3.79277 24.8627 8.52732 28 14.0001 28Z" fill="#34A853" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.16637 16.66C5.88637 15.82 5.72727 14.9227 5.72727 14C5.72727 13.0773 5.88637 12.18 6.16637 11.34V7.71274H1.48909C0.540909 9.60274 0 11.7409 0 14C0 16.2591 0.540909 18.3973 1.48909 20.2873L6.16637 16.66Z" fill="#FBBC05" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0001 5.56818C16.0555 5.56818 17.901 6.27455 19.3519 7.66182L23.3673 3.64637C20.9428 1.38727 17.7737 0 14.0001 0C8.52732 0 3.79277 3.13727 1.48914 7.71273L6.16641 11.34C7.26732 8.03091 10.3537 5.56818 14.0001 5.56818Z" fill="#EA4335" />
                        </svg>
                    </button>
                    <button class="btn btn-light offset-2 col-4 button-color p-2"><svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M28.0061 14.0856C28.0061 6.30631 21.7367 0 14.003 0C6.26936 0 0 6.30631 0 14.0856C0 21.1161 5.1207 26.9433 11.8151 28V18.1572H8.2596V14.0856H11.8151V10.9823C11.8151 7.45214 13.9056 5.50217 17.1042 5.50217C18.6363 5.50217 20.2388 5.77728 20.2388 5.77728V9.24365H18.473C16.7335 9.24365 16.191 10.3294 16.191 11.4433V14.0856H20.0747L19.4538 18.1572H16.191V28C22.8853 26.9433 28.0061 21.1161 28.0061 14.0856Z" fill="#1778F2" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
    </div>

    <!-- JavaScript Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>
</body>

</html>