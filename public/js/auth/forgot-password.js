// check udah login apa belum
fetch(base_url + "/api/auth/profile")
    .then((res) => res.json())
    .then((data) => {
        // sudah login
        if (data.data) {
            toastr.info("You are already logged in");
            window.location.href = base_url + "/";
        }
    })
    .catch((err) => {
        // belum login
        console.log(err);
    });

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const form = $("#forgot-password-form")[0];

form.onsubmit = function (e) {
    e.preventDefault();
    forgot_password();
};

async function forgot_password() {
    console.log("forgot_password");
    const email = $("#email").val();
    let valid = true;

    // remove current messages
    toastr.clear();

    if (email === "") {
        valid = false;
        toastr.info("Email Must be filled!");
    } else if (!validateEmail(email)) {
        valid = false;
        toastr.error("Email not Valid");
    } else if (valid) {
        const data={
            "email":email
        }
        sendEmail=JSON.stringify(data);
       
        $.ajax({
            type: "POST",
            url: base_url + "/api/auth/forgot-password",
            data: sendEmail,
            headers: {
                            "Content-Type": "application/json",
                        },
            dataType: "JSON",
            "timeout":0,
            beforeSend: function(response) {
                toastr.info("Sending Email...");

            },
            success: function (response) {
                toastr.success("Check your email for reset password link");
                setTimeout(() => {
                    window.location.href = base_url + "/auth/login";
                }, 1000);
            },
            error: function (err){
                toastr.error("Something went wrong!");
            console.log(err);
            }
        });
    }
}

$(".x-icon").click(() => {
    $("#email").val("");
});
