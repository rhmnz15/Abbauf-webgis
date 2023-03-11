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

const form = $("#login-form")[0];

form.onsubmit = function (e) {
  e.preventDefault();
  login();
};

function login() {
  const email = $("#email").val();
  const password = $("#password").val();

  if (email === "" || password === "") {
    toastr.error("Email and Password Must be filled!");
  } else {
    axios
      .post(base_url + "/api/auth/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.data.status === 200) {
          window.location.href = base_url + "/";
        }
      })
      .catch((err) => {
        toastr.error(err.response.data.message);
      });
  }
}


// handle google login
const googleButton = document.getElementById("google-login");
googleButton.onclick = function () {
  window.location.href = base_url + "/api/auth/glogin";
};

// handle facebook login
// API still in progress
const facebookButton = document.getElementById("facebook-login");
facebookButton.onclick = function () {
  window.location.href = base_url + "/api/auth/flogin";
};

$(".x-icon").click(() => {
  $("#email").val("");
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
