(async function () {
  try {
    var html = ``;
    const res = await axios.get(base_url + '/api/shps');
    const shps = res.data;

    console.log(shps);
    $('#shp_count').html(shps.length);
    $('#shp_count2').html(shps.length);
    $('#shp_count3').html(shps.length);
    shps.forEach((item, index) => {
      var status = 'Active';
      if (item.status == 'f') {
        status = 'Not Active';
      }
      html =
        `<tr id="` +
        item.id +
        `">
                  <td class="font-kanit " id="name_` +
        item.id +
        `" style="color: #3F779B;">` +
        item.name +
        `</td>
                  <td class="text-center" style="color: #000; font-size:14px; font-weight:500;">` +
        item.user.name +
        `</td>
                  <td class="text-center" style="color: #000; font-size:14px; font-weight:500;">` +
        status +
        `</td>
                  <td class="text-center d-flex justify-content-center">
                      <button id="edit-shp-btn" type="button" onclick="edit_shp(` +
        item.id +
        `)" class="edit-shp dashboard-button-yellow dashboard-button-sm color-white mr-2">
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M13.8164 0.481201C13.1748 -0.1604 12.1377 -0.1604 11.4961 0.481201L10.6143 1.36011L13.4824 4.22827L14.3643 3.34644C15.0059 2.70483 15.0059 1.66772 14.3643 1.02612L13.8164 0.481201ZM5.05078 6.92651C4.87207 7.10522 4.73437 7.32495 4.65527 7.56812L3.78809 10.1697C3.70313 10.4216 3.77051 10.7 3.95801 10.8904C4.14551 11.0808 4.42383 11.1453 4.67871 11.0603L7.28027 10.1931C7.52051 10.1111 7.74023 9.97632 7.92187 9.79761L12.8232 4.89331L9.95215 2.02222L5.05078 6.92651V6.92651ZM2.8125 1.72046C1.25977 1.72046 0 2.98022 0 4.53296V12.033C0 13.5857 1.25977 14.8455 2.8125 14.8455H10.3125C11.8652 14.8455 13.125 13.5857 13.125 12.033V9.22046C13.125 8.7019 12.7061 8.28296 12.1875 8.28296C11.6689 8.28296 11.25 8.7019 11.25 9.22046V12.033C11.25 12.5515 10.8311 12.9705 10.3125 12.9705H2.8125C2.29395 12.9705 1.875 12.5515 1.875 12.033V4.53296C1.875 4.0144 2.29395 3.59546 2.8125 3.59546H5.625C6.14355 3.59546 6.5625 3.17651 6.5625 2.65796C6.5625 2.1394 6.14355 1.72046 5.625 1.72046H2.8125Z" fill="white" />
                          </svg>
                      </button>
                      <button type="button" onclick="delete_shp(` +
        item.id +
        `)" class="delete-button dashboard-button-red dashboard-button-sm color-white">
                          <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M4.82857 0.622266L4.57143 1.125H1.14286C0.510714 1.125 0 1.62773 0 2.25C0 2.87227 0.510714 3.375 1.14286 3.375H14.8571C15.4893 3.375 16 2.87227 16 2.25C16 1.62773 15.4893 1.125 14.8571 1.125H11.4286L11.1714 0.622266C10.9786 0.239063 10.5821 0 10.15 0H5.85C5.41786 0 5.02143 0.239063 4.82857 0.622266V0.622266ZM14.8571 4.5H1.14286L1.9 16.418C1.95714 17.3074 2.70714 18 3.61071 18H12.3893C13.2929 18 14.0429 17.3074 14.1 16.418L14.8571 4.5Z" fill="white" />
                          </svg>
                      </button>
                  </td>
                </tr>`;
      $('#all-shp').append(html);
    });
  } catch (error) {
    console.log(error);
  }
})();

// add modal SHP
// admin
$('#add-shp').click(() => {
  $('#modalshp').modal('toggle');
});
// user
$('#add-shp-user').click(() => {
  $('#add-shp-user-modal').modal('toggle');
});

// function close modal shp
// admin
$('#close-shp').click(() => {
  $('#modalshp').modal('toggle');
});
// user
$('#close-add-shp-user').click(() => {
  $('#add-shp-user-modal').modal('toggle');
});

// function close modal edit

// function edit modal SHP
// admin
$('.edit-close').click(() => {
  $('#editSHP').modal('toggle');
});

// user
$('#edit-shp').click(() => {
  $('#modal-edit-SHP').modal('toggle');
});

$('.edit-close').click(() => {
  $('#modal-edit-SHP').modal('toggle');
});

// Delete
$('.delete-button').click(() => {
  $('#modal-delete-confirmation').modal('toggle');
});

$('.close-delete-confirmation, .button-cancel').click(() => {
  $('#modal-delete-confirmation').modal('toggle');
});

var file_obj;
const BYTES_PER_CHUNK = 1024 * 1024;
var slices;
var totalSlices;
var formdata;
var chunk;
var data_chunk = [];

$('#selectfile').change(function () {
  collectDataChunk();
});

function collectDataChunk() {
  file_obj = document.getElementById('selectfile').files[0];
  if (!file_obj) {
    alert('Select a file please..');
  } else {
    var start = 0;
    var end;
    var index = 0;
    slices = Math.ceil(file_obj.size / BYTES_PER_CHUNK);
    totalSlices = slices;
    while (start < file_obj.size) {
      end = start + BYTES_PER_CHUNK;
      if (end > file_obj.size) {
        end = file_obj.size;
      }
      /*collecting chunk's data and store it */
      data_chunk[index] = start + '|' + end;
      console.log(
        'start : ' +
          start +
          ', end : ' +
          end +
          ', total slices : ' +
          totalSlices +
          ', slices : ' +
          slices
      );
      start = end;
      index++;
      slices--;
    }
  }
}

//add data SHP
const form = $('#shp_add')[0];
form.onsubmit = async function (e) {
  e.preventDefault();

  var text = data_chunk[0].split('|');
  var start_ = text[0];
  var end_ = text[1];
  chunk = file_obj.slice(start_, end_);
  const formData = new FormData($('#shp_add')[0]);
  formData.append('file', chunk);
  formData.append('index', 0);

  formData.append('type', 'point');
  formData.append('status', $('#status').val());

  try {
    fetch(base_url + '/api/shps', {
      method: 'POST',
      body: formData,
    })
      .then((result) => result.json())
      .catch((error) => console.log(error));
    // const data = await res.json();
    $('#modalshp').modal('toggle');
    console.log(data);
  } catch (error) {
    console.log(error);
    $('#modalshp').modal('toggle');
  }

  // form.reset();
};

function edit_shp(id) {
  request = $.ajax({
    url: base_url + '/api/shps/' + id,
    type: 'GET',
    dataType: 'JSON',
    data: {},
  });

  request.done(function (result) {
    var status = 'Active';
    if (result.status == 'f') {
      status = 'Not Active';
    }

    $('#editSHP').modal('toggle');
    $('#id_shp').val(result.id);
    $('#package-name').val(result.name);
    $('#package-status').append(
      '<option value="' + result.status + '" selected>' + status + '</option>'
    );
    // if (result.status == "200") {
    //     toastr.success("Your account has been created");
    //     window.location.href = base_url + "/user/dashboard";
    // } else {
    //     toastr.info("Something went wrong");
    // }
  });

  request.fail(function (result, textStatus, errorThrown) {
    toastr.error(`${result}`);
  });
}

function update_shp() {
  var id = $('#id_shp').val();
  var name_shp = $('#package-name').val();

  request = $.ajax({
    url: base_url + '/api/shps/' + id,
    type: 'PUT',
    dataType: 'JSON',
    data: {
      name: name_shp,
    },
  });
  request.done(function (result) {
    console.log(result);
    if (result.status == 200) {
      toastr.success('Data SHPS Updated');
      $('#editSHP').modal('toggle');

      $('#name_' + id + '').html(name_shp);
    } else {
      toastr.error(result.message);
    }
  });
  // Callback handler that will be called on failure
  request.fail(function (result, textStatus, errorThrown) {
    console.log(result);
  });
}

function delete_shp(id) {
  request = $.ajax({
    url: base_url + '/api/shps/' + id,
    type: 'DELETE',
    dataType: 'JSON',
    data: {},
  });
  request.done(function (result) {
    console.log(result);
    toastr.success('Data SHPS Deleted');
    $('' + id + '').replaceWith(` `);
  });
  // Callback handler that will be called on failure
  request.fail(function (result, textStatus, errorThrown) {
    console.log(result);
  });
}
