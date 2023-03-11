// check if user is logged in
axios
  .get(base_url + "/api/auth/profile")
  .then((res) => {
    if (res.data.success) {
      window.location.href = base_url + "/dashboard";
    }
  })
  .catch((err) => {
    toastr.error(err.response.data.message);
  });

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const form = $("#register-form")[0];

form.onsubmit = function (e) {
  e.preventDefault();
  do_register();
};

function do_register() {
  const email = $("#email").val();
  const company = $("#company").val();
  const name = $("#fullname").val();
  const password = $("#password").val();
  let valid = true;
  const passw = /^[A-Za-z]\w{7,14}$/;

  // remove current messages
  toastr.clear();

  console.log({
    name,
    email,
    password,
    company,
    role: 2,
  });


  if (email === "" || password === "" || company === "" || name === "") {
    valid = false;
    toastr.info("Email and Password Must be filled!");
  } else if (!validateEmail(email)) {
    valid = false;
    toastr.error("Email not Valid");
  } else if (!password.match(passw)) {
    valid = false;
    toastr.error("Password not strong enough");
  } else if (valid) {
    axios
      .post(base_url + "/api/auth/register", {
        name,
        company,
        email,
        password,
        role: 2,
      })
      .then((res) => {
        toastr.success("Register Success");
        window.location.href = base_url + "/";
      })
      .catch((err) => {
        toastr.error(err.response.data.message);
      });
  }
}

$(".x-icon").click(() => {
  $("#email").val("");
});

$(".x-icon1").click(() => {
  $("#fullname").val("");
});

$(".x-icon2").click(() => {
  $("#company").val("");
});

$(".eye-icon").click(() => {
  let typeText = $("#password").prop("type"); // Get The Password Input Type
  if (typeText == "password") {
    // Change The Password Input Value
    $("#password").prop("type", "text");
    $("#cpassword").prop("type", "text");
    // Change The Icon
    $(".eye-icon").prop("src", base_url + "/icons/auth/eye-closed.svg");
  } else {
    $("#password").prop("type", "password");
    $("#cpassword").prop("type", "password");
    $(".eye-icon").prop("src", base_url + "/icons/auth/eye-open.svg");
  }
});
