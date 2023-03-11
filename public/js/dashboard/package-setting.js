$(document).ready(async function packageLoad() {
  package();

  const addPkgBtn = document.getElementById('add-package-btn');
  addPkgBtn.addEventListener('click', addLoadFeatures); // fn di bawah

  /*======================================== Button Function ========================================*/
  // Package
  /* ======== toggle add package modal ======== */
  $('#add-package-btn').click(() => {
    $('#myModal-add-package').modal('toggle');
  });

  $('.close-add-package').click(() => {
    $('#myModal-add-package').modal('toggle');
  });
  /* ======== toggle edit package modal ======== */
  $('.edit-package-btn').click(() => {
    $('#myModal-edit-package').modal('toggle');
  });

  $('.close-edit-package').click(() => {
    $('#myModal-edit-package').modal('toggle');
  });

  // Feature
  // Add
  $('#add-feature-btn').click(() => {
    $('#myModalFeature').modal('toggle');
  });
  $('.close-add-feature').click(() => {
    $('#myModalFeature').modal('toggle');
  });
  // Edit
  $('#edit-feature-btn').click(() => {
    $('#myModal-edit-Feature').modal('toggle');
  });
  $('.close-edit-feature').click(() => {
    $('#myModal-edit-Feature').modal('toggle');
  });
  // Delete
  $('#delete-feature-btn').click(() => {
    $('#modal-delete-confirmation-feature').modal('toggle');
  });
  $('#close-delete-confirmation-feature, #button-cancel-delete-feature').click(
    () => {
      $('#modal-delete-confirmation-feature').modal('toggle');
    }
  );

  // POI
  // add modal POI
  $('#add-package-btn-POI').click(() => {
    $('#modalPoi').modal('toggle');
  });
  // function close modal poi
  $('.close-POI').click(() => {
    $('#modalPoi').modal('toggle');
  });
  // function close modal edit
  $('.edit-close').click(() => {
    $('#editPoi').modal('toggle');
  });
  // function edit modal poi
  $('#edit-POI-btn').click(() => {
    $('#editPoi').modal('toggle');
  });
  $('#edit-POI-btn2').click(() => {
    $('#editPoi').modal('toggle');
  });
  /*======================================== End Of Button Function ========================================*/
});

// dataTable
function package() {
  $('#packages-list').DataTable({
    destroy: true,
    processing: true,
    serverSide: true,
    serverMethod: 'post',
    ajax: base_url + '/api/packages/ajax',
    columns: [
      {
        data: 'name',
        render: function (data) {
          return `<td class="font-kanit text-primary">${data}</td>`;
        },
      },
      {
        data: 'price',
        render: function (data) {
          return `<td class="font-kanit text-center">${data}</td>`;
        },
      },
      {
        data: 'status',
        render: function (data) {
          return `<td class="font-kanit text-center">${data}</td>`;
        },
      },
      {
        data: 'id',
        render: function (data) {
          return `<td class="font-kanit text-center">${data}</td>`;
        },
      },
      {
        data: 'id',
        render: function (data) {
          return `<td class="font-kanit text-center d-flex justify-content-center">
                    <button type="button" class="edit-package-btn btn btn-warning mr-2" onclick="edit_packages('${data}')">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http:www.w3.org/2000/svg">
                        <path d="M13.8164 0.481201C13.1748 -0.1604 12.1377 -0.1604 11.4961 0.481201L10.6143 1.36011L13.4824 4.22827L14.3643 3.34644C15.0059 2.70483 15.0059 1.66772 14.3643 1.02612L13.8164 0.481201ZM5.05078 6.92651C4.87207 7.10522 4.73437 7.32495 4.65527 7.56812L3.78809 10.1697C3.70313 10.4216 3.77051 10.7 3.95801 10.8904C4.14551 11.0808 4.42383 11.1453 4.67871 11.0603L7.28027 10.1931C7.52051 10.1111 7.74023 9.97632 7.92187 9.79761L12.8232 4.89331L9.95215 2.02222L5.05078 6.92651V6.92651ZM2.8125 1.72046C1.25977 1.72046 0 2.98022 0 4.53296V12.033C0 13.5857 1.25977 14.8455 2.8125 14.8455H10.3125C11.8652 14.8455 13.125 13.5857 13.125 12.033V9.22046C13.125 8.7019 12.7061 8.28296 12.1875 8.28296C11.6689 8.28296 11.25 8.7019 11.25 9.22046V12.033C11.25 12.5515 10.8311 12.9705 10.3125 12.9705H2.8125C2.29395 12.9705 1.875 12.5515 1.875 12.033V4.53296C1.875 4.0144 2.29395 3.59546 2.8125 3.59546H5.625C6.14355 3.59546 6.5625 3.17651 6.5625 2.65796C6.5625 2.1394 6.14355 1.72046 5.625 1.72046H2.8125Z" fill="white" />
                      </svg>
                    </button>
                    <button type="button" class="delete-button btn btn-danger" onclick="delete_packages('${data}')">
                      <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http:www.w3.org/2000/svg">
                          <path d="M4.82857 0.622266L4.57143 1.125H1.14286C0.510714 1.125 0 1.62773 0 2.25C0 2.87227 0.510714 3.375 1.14286 3.375H14.8571C15.4893 3.375 16 2.87227 16 2.25C16 1.62773 15.4893 1.125 14.8571 1.125H11.4286L11.1714 0.622266C10.9786 0.239063 10.5821 0 10.15 0H5.85C5.41786 0 5.02143 0.239063 4.82857 0.622266V0.622266ZM14.8571 4.5H1.14286L1.9 16.418C1.95714 17.3074 2.70714 18 3.61071 18H12.3893C13.2929 18 14.0429 17.3074 14.1 16.418L14.8571 4.5Z" fill="white" />
                      </svg>
                    </button>
                  </td>`;
        },
      },
    ],
  });
}

//Add Packages
function add_package() {
  $('#myModal-add-package').modal('toggle');

  const formAddpackages = $('#addPackages')[0];
  formAddpackages.onsubmit = function (e) {
    e.preventDefault();
    let addName = document.getElementById('packageAddname').value;
    let addPrice = document.getElementById('packageAddprice').value;
    let feature = [];
    let chks = document.querySelectorAll('.checkbox-feature:checked');

    for (let i = 0, iLen = chks.length; i < iLen; i++) {
      feature.push(parseInt(chks[i].value));
    }

    const body = {
      name: addName,
      price: addPrice,
      category: 'public',
      status: true,
      features: feature,
    };

    axios
      .post(base_url + '/api/packages', body)
      .then((response) => {
        $('#myModal-add-package').modal('hide');
      })
      .catch((error) => console.log(error));
  };
}

//delete packages
function delete_packages(id) {
  Swal.fire({
    title: "Are you sure you'd like to delete this package?",
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Delete Package Successfully', '', 'success');
      $.ajax({
        type: 'DELETE',
        url: base_url + '/api/packages/' + id,
        data: {},
        dataType: 'JSON',
        success: function (result) {
          setTimeout(() => {
            package();
          }, 500);
        },
      });
    } else if (result.isDenied) {
      Swal.fire('Delete Package Failed', '', 'info');
    }
  });
}

// get edit packages
async function edit_packages(id) {
  // load features list
  await editLoadFeatures(id);
  $('#myModal-edit-package').modal('toggle');
  $.ajax({
    type: 'GET',
    url: base_url + '/api/packages/' + id,
    data: 'data',
    dataType: 'JSON',
    success: function (response) {
      const namePrice = response.name;
      const price = response.price;
      const status = response.status;

      $('#package_name').val(namePrice);
      $('#edit-package-price').val(price);

      if (status === 't') {
        let dropdownList = $('.list-dropdown');
        dropdownList.empty();
        dropdownList.append(`<select class="form-control" id="package-status">
      <option value="${status}" selected>Active</option>
      <option value="not-active ">Not Active</option>
      </select>`);
      } else if (status === 'f') {
        let dropdownList = $('.list-dropdown');
        dropdownList.empty();
        dropdownList.append(`<select class="form-control" id="package-status">
        <option value="${status}" selected>Not Active</option>
        <option value="active">Active</option>
        </select>`);
      }
    },
  });
  const formEditpackages = $('#editpackages')[0];
  formEditpackages.onsubmit = function (e) {
    e.preventDefault();
    edit_package(id);
  };
}

//edit_package
async function edit_package(x) {
  let name = $('#package_name').val();
  let package = $('#edit-package-price').val();
  let features = [];
  let checklist = document.querySelectorAll('.checkbox-edit:checked');

  for (let i = 0; i < checklist.length; i++) {
    features.push(parseInt(checklist[i].value));
  }

  const data_edit = {
    name: name,
    price: package,
    status: true,
    category: 'public',
    features,
  };

  try {
    const res = await fetch(base_url + '/api/packages/' + x, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data_edit),
    });

    const data = await res.json();
    if (data) {
      Swal.fire('Edit Package Successfully', '', 'success');
      setTimeout(() => {
        $('#packages-list').DataTable({
          destroy: true,
          processing: true,
          serverSide: true,
          serverMethod: 'post',
          ajax: base_url + '/api/packages/ajax',
          columns: [
            {
              data: 'name',
              render: function (data) {
                return `<td class="font-kanit text-primary">${data}</td>`;
              },
            },
            {
              data: 'price',
              render: function (data) {
                return `<td class="font-kanit text-center">${data}</td>`;
              },
            },
            {
              data: 'status',
              render: function (data) {
                return `<td class="font-kanit text-center">${data}</td>`;
              },
            },
            {
              data: 'id',
              render: function (data) {
                return `<td class="font-kanit text-center">${data}</td>`;
              },
            },
            {
              data: 'id',
              render: function (data) {
                return `<td class="font-kanit text-center d-flex justify-content-center">
                          <button type="button" class="edit-package-btn btn btn-warning mr-2" onclick="edit_packages('${data}')">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http:www.w3.org/2000/svg">
                              <path d="M13.8164 0.481201C13.1748 -0.1604 12.1377 -0.1604 11.4961 0.481201L10.6143 1.36011L13.4824 4.22827L14.3643 3.34644C15.0059 2.70483 15.0059 1.66772 14.3643 1.02612L13.8164 0.481201ZM5.05078 6.92651C4.87207 7.10522 4.73437 7.32495 4.65527 7.56812L3.78809 10.1697C3.70313 10.4216 3.77051 10.7 3.95801 10.8904C4.14551 11.0808 4.42383 11.1453 4.67871 11.0603L7.28027 10.1931C7.52051 10.1111 7.74023 9.97632 7.92187 9.79761L12.8232 4.89331L9.95215 2.02222L5.05078 6.92651V6.92651ZM2.8125 1.72046C1.25977 1.72046 0 2.98022 0 4.53296V12.033C0 13.5857 1.25977 14.8455 2.8125 14.8455H10.3125C11.8652 14.8455 13.125 13.5857 13.125 12.033V9.22046C13.125 8.7019 12.7061 8.28296 12.1875 8.28296C11.6689 8.28296 11.25 8.7019 11.25 9.22046V12.033C11.25 12.5515 10.8311 12.9705 10.3125 12.9705H2.8125C2.29395 12.9705 1.875 12.5515 1.875 12.033V4.53296C1.875 4.0144 2.29395 3.59546 2.8125 3.59546H5.625C6.14355 3.59546 6.5625 3.17651 6.5625 2.65796C6.5625 2.1394 6.14355 1.72046 5.625 1.72046H2.8125Z" fill="white" />
                            </svg>
                          </button>
                          <button type="button" class="delete-button btn btn-danger" onclick="delete_packages('${data}')">
                            <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http:www.w3.org/2000/svg">
                                <path d="M4.82857 0.622266L4.57143 1.125H1.14286C0.510714 1.125 0 1.62773 0 2.25C0 2.87227 0.510714 3.375 1.14286 3.375H14.8571C15.4893 3.375 16 2.87227 16 2.25C16 1.62773 15.4893 1.125 14.8571 1.125H11.4286L11.1714 0.622266C10.9786 0.239063 10.5821 0 10.15 0H5.85C5.41786 0 5.02143 0.239063 4.82857 0.622266V0.622266ZM14.8571 4.5H1.14286L1.9 16.418C1.95714 17.3074 2.70714 18 3.61071 18H12.3893C13.2929 18 14.0429 17.3074 14.1 16.418L14.8571 4.5Z" fill="white" />
                            </svg>
                          </button>
                        </td>`;
              },
            },
          ],
        });
      }, 500);
    }
  } catch (err) {
    Swal.fire('Edit Package Failed', '', 'info');
  } finally {
    $('#myModal-edit-package').modal('hide');
  }
}

async function addLoadFeatures() {
  try {
    const res = await axios.get(base_url + '/api/features');
    const features = res.data;

    const ftsSelect = document.getElementById('features-select');
    ftsSelect.innerHTML = '';

    features.forEach((feature) => {
      const elem = `
          <div class="d-flex">
            <div>
                <input class="checkbox-feature" type="checkbox" id="feature-add-${feature.id}" name="" value="${feature.id}">
            </div>
            <label for="feature-1" class="ml-2">${feature.name}</label>
          </div>`;

      ftsSelect.innerHTML += elem;
    });
  } catch (err) {
    console.log(err);
  }
}

async function editLoadFeatures() {
  try {
    const res = await axios.get(base_url + '/api/features');
    const features = res.data;

    const ftsSelect = document.getElementById('edit-features-select');
    ftsSelect.innerHTML = '';

    features.forEach((feature) => {
      const elem = `
          <div class="d-flex">
            <div>
                <input class="checkbox-edit" type="checkbox" id="feature-add-${feature.id}" name="" value="${feature.id}">
            </div>
            <label for="feature-1" class="ml-2">${feature.name}</label>
          </div>`;

      ftsSelect.innerHTML += elem;
    });
  } catch (err) {
    console.log(err);
  }
}
