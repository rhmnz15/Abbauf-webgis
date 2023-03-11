const logout = document.getElementById("logout-button");

logout.onclick = function () {
    Swal.fire({
        title: "Are you sure?",
        text: "You will be logging out from this page!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, take me out!",
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(base_url + "/api/auth/logout")
                .then((res) => res.text())
                .then((data) => {
                    toastr.success("Logout Success");
                    window.location.href = base_url + "/auth/login";
                })
                .catch((err) => {
                    console.log(err);
            });
        } else if (result.isDenied) {
            Swal.fire("Log Out failed", "", "info");
        }
    });
};

logout.onmouseenter = function () {
    logout.style.cursor = "pointer";
};
