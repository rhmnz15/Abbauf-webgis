// run when document loaded
document.addEventListener('DOMContentLoaded', function () {
  fetch(base_url + '/api/users')
    .then((res) => res.json())
    .then((data) => {
      const { users } = data;
      const admin = users.filter((user) => parseInt(user.role) === 1);
      const user = users.filter((user) => parseInt(user.role) === 2);

      const admin_count = document.getElementById('admin-count');
      const user_count = document.getElementById('user-count');

      admin_count.innerHTML = admin.length;
      user_count.innerHTML = user.length;
    });
  const pathname = window.location.pathname;
  if (pathname === '/admin/dashboard/management-user') {
    data_admin();
  }
  add_package();

  //modal add admin
  $('#add-admin-btn').click(function () {
    $('#myModal-add-admin').modal('toggle');
  });
  $('.close-add-admin').click(function () {
    $('#myModal-add-admin').modal('toggle');
  });

  // modal edit admin
  $('.edit-admin').each(function (i) {
    $(this).click(() => {
      $('#myModal-edit-admin').modal('toggle');
    });

    $('.close-edit-admin').click(() => {
      $('#myModal-edit-admin').modal('toggle');
    });
  });
  $('.edit-user').each(function (i) {
    $(this).click(() => {
      $('#myModal-edit-user').modal('toggle');
    });

    $('.close-edit-user').click(() => {
      $('#myModal-edit-user').modal('hide');
    });
  });

  /* ======== togle delete ======== */
  // admin
  $('.delete-button-admin').each(function (i) {
    $(this).click(() => {
      $('#modal-delete-confirmation-admin').modal('toggle');
    });
    $('.close-delete-confirmation-admin').click(() => {
      $('#modal-delete-confirmation-admin').modal('toggle');
    });
    $('#modal-delete-confirmation-admin .button-cancel').click(() => {
      $('#modal-delete-confirmation-admin').modal('toggle');
    });
  });
  // user
  $('.delete-button-user').each(function (i) {
    $(this).click(() => {
      $('#modal-delete-confirmation-user').modal('toggle');
    });
    $('.close-delete-confirmation-user').click(() => {
      $('#modal-delete-confirmation-user').modal('toggle');
    });
    $('#modal-delete-confirmation-user .button-cancel').click(() => {
      $('#modal-delete-confirmation-user').modal('toggle');
    });
  });

  // Dropzone
  // Add admin
  $(function () {
    $('#profile-pict-admin').change(function (event) {
      var url = URL.createObjectURL(event.target.files[0]);
      $('#preview-admin').attr('src', url);
    });
  });
  // Edit User
  $(function () {
    $('#profile-pict').change(function (event) {
      var url = URL.createObjectURL(event.target.files[0]);
      $('#preview').attr('src', url);
    });
  });
  // End Of Dropzone
  /*======================================== End Of Button Function ========================================*/
});

function data_admin() {
  $('#table-admin').DataTable({
    destroy: true,
    processing: true,
    serverSide: true,
    serverMethod: 'get',
    ajax: base_url + '/api/users/list-admin',
    columns: [
      {
        data: 'profile_picture',
        render: function (data) {
          const img_admin = `<img class="image-last-user-regis mx-auto" src="${data}" alt="user" onerror="this.onerror=null;this.src='https://placeimg.com/640/480/any';" style="display: block; width:50px" rel="noreferrer noopenner">`;
          return `<tr scope="row">
                    <div class="d-flex align-items-center">${img_admin}</div>
                  </tr>`;
        },
      },
      { data: 'name' },
      { data: 'email' },
    ],
  });
}

function add_package() {
  // $("#myModal-add-admin").modal("toggle")

  const formAddAdmin = $('#addAdmin')[0];
  formAddAdmin.onsubmit = function (e) {
    e.preventDefault();
    let adminName = document.getElementById('admin-name').value;
    let adminEmail = document.getElementById('admin-email').value;

    // for (let i = 0, iLen = chks.length; i < iLen; i++) {
    //     feature.push(parseInt(chks[i].value))
    // }

    const body = {
      name: adminName,
      email: adminEmail,
      company: 'PT Abbauf',
      password: 'admin123',
      role: 1,
    };

    // console.log(body)

    axios
      .post('http://localhost:8080/api/auth/register', body)
      .then((response) => {
        console.log(response);
        $('#myModal-add-admin').modal('hide');
      })
      .catch((error) => console.log(error));
  };
}
