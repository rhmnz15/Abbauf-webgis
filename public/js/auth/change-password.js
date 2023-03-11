$(document).ready(function () {
  const form = $("#change-password-form")[0];
  form.onsubmit = function (e) {
    e.preventDefault();
    change_password();
  };

  function change_password() {
    const cpassword = $("#cpassword").val();
    const password = $("#password").val();
    if (cpassword === "" || password === "") {
      toastr.error("Password Must be filled!");
    } else {
      const obj = {
        password: password,
      };
      $.ajax({
        url: base_url + "/api/auth/reset-password",
        type: "PUT",
        dataType: "JSON",
        contentType: "application/json",
        data: JSON.stringify(obj),
        success: function (response) {
          toastr.success("Password Successfully Changed");
          setTimeout(() => {
            window.location.href = base_url + "/auth/login";
          }, 2000);
        },
        error: function (error) {
          toastr.error("failed to change password");
        },
      });
    }
  }

  // Change Input Value Type To Text From Password And Change The Eye Icon Into Close Or Show
  $(".eye-icon").click(() => {
    let typeText = $("#password").prop("type"); // Get The Password Input Type
    if (typeText == "password") {
      // Change The Password Input Value
      $("#password").prop("type", "text");
      $("#cpassword").prop("type", "text");
      // Change The Icon
      $(".eye-icon").prop("src", "/icons/auth/eye-closed.svg");
    } else {
      $("#password").prop("type", "password");
      $("#cpassword").prop("type", "password");
      $(".eye-icon").prop("src", "/icons/auth/eye-open.svg");
    }
  });
});
