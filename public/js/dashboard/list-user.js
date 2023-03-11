document.addEventListener('DOMContentLoaded', users);

function users() {
  $('#table-user').DataTable({
    destroy: true,
    processing: true,
    serverSide: true,
    serverMethod: 'GET',
    ajax: base_url + '/api/users/list-user',
    columns: [
      {
        data: 'profile_picture',
        render: function (data) {
          const img_user = `<img class="image-last-user-regis mx-auto" src="${data}" alt="user" onerror="this.onerror=null;this.src='https://placeimg.com/640/480/any';" style="display: block; width:50px" rel="noreferrer noopenner">`;
          return `<tr scope="row">
                    <div class="d-flex align-items-center">${img_user}</div>
                  </tr>`;
        },
      },
      { data: 'name' },
      { data: 'email' },
      {
        data: 'created_at',
        render: function (data) {
          return `
            <td class="text-center">
              <div class="d-flex justify-content-start">
                ${new Date(data).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </td>
            `;
        },
      },
      { data: 'company' },
      {
        render: function () {
          return `<td class="text-center">
                    <div class="d-flex justify-content-center">
                      <p class="badge badge-pill badge-lg badge-success m-0">
                        Free User
                      </p>
                    </div>
                  </td>`;
        },
      },
      {
        data: 'user_id',
        render: function (item) {
          return `<div class="d-flex justify-content-center align-items-center">
                    <button type="button" class="btn btn-warning mr-2" onclick="edit('${item}')">
                      <img src="/icons/dashboard/edit-icon.svg" alt="edit-icon" srcset="">
                    </button>
                    <button type="button" class="btn btn-danger" onclick="hapus('${item}')">
                      <img src="/icons/dashboard/delete-icon.svg" alt="delete-icon" srcset="">
                    </button>
                  </div>`;
        },
      },
    ],
  });
}

function hapus(id) {
  Swal.fire({
    title: "Are you sure you'd like to delete this account?",
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Delete User Successfully', '', 'success');
      $.ajax({
        type: 'DELETE',
        url: base_url + '/api/users/' + id,
        data: {},
        dataType: 'JSON',
        success: function (response) {
          setTimeout(() => {
            users();
          }, 500);
        },
      });
    } else if (result.isDenied) {
      Swal.fire('Delete user failed', '', 'info');
    }
  });
}

function edit(x) {
  $('#myModal-edit-user').modal('show');
  request = $.ajax({
    url: base_url + '/api/get-user/' + x,
    type: 'GET',
    dataType: 'JSON',
    data: {},
  });
  request.done(function (result) {
    if (result != null || result != '') {
      $('#name-user').val(result.name);
      $('#email-user').val(result.email);
      $('#company-user').val(result.company);
      $('#profile-user-picture').attr('src', result.profile_picture);
    } else {
      toastr.info('Something went wrong');
    }
  });
  // Callback handler that will be called on failure
  request.fail(function (result, textStatus, errorThrown) {
    console.log(result);
  });
  const form = $('#edit_user')[0];
  form.onsubmit = async function (e) {
    e.preventDefault();
    change_user(x);
  };
}

function change_user(id) {
  const name_user = $('#name-user').val();
  const email_user = $('#email-user').val();
  const company = $('#company-user').val();

  request = $.ajax({
    url: base_url + '/api/users/' + id,
    type: 'PUT',
    dataType: 'JSON',
    data: {
      name: name_user,
      email: email_user,
      role: 2,
      company: company,
    },
  });
  request.done(function (result) {
    if (result.status == 200) {
      $('#myModal-edit-user').modal('hide');
      toastr.success('Data Updated');
      setTimeout(() => {
        users();
      }, 500);
    } else {
      toastr.info('Something went wrong');
    }
  });
  // Callback handler that will be called on failure
  request.fail(function (err, textStatus, errorThrown) {
    console.log(err);
  });
}

function closeX() {
  $('#myModal-edit-user').modal('hide');
}
