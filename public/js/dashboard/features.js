$(document).ready(function () {
  featureTable();

  //Add Features
  const buttonAdd = document.getElementById("add-button-submit");
  buttonAdd.onclick = async function () {
    const value = document.getElementById("add-feature-name").value;

    const formData = new FormData();
    formData.append("name", value);

    const res = await fetch("http://localhost:8080/api/features", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    if (data.message) {
      Swal.fire("feature added successfully", "", "success")
      const buttonClose = document.getElementById("add-button-close");
      buttonClose.click();
      // toastr.success(data.message);
      setTimeout(() => {
        featureTable();
      }, 500);
    }
  };
});

//datatable features
function featureTable() {
  $("#features-list-table").DataTable({
    destroy: true,
    processing: true,
    serverSide: true,
    serverMethod: "post",
    ajax: base_url + "/api/features/ajax",
    columns: [
      {
        data: "name",
        render: function (data) {
          return `<td class="font-kanit ">${data}</td>`;
        },
      },
      {
        data: "id",
        render: function (data) {
          return `<td class="text-center d-flex justify-content-center">
          <button type="button" class="edit-feature-btn  btn btn-warning mr-2" onclick="editFeature('${data}')">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.8164 0.481201C13.1748 -0.1604 12.1377 -0.1604 11.4961 0.481201L10.6143 1.36011L13.4824 4.22827L14.3643 3.34644C15.0059 2.70483 15.0059 1.66772 14.3643 1.02612L13.8164 0.481201ZM5.05078 6.92651C4.87207 7.10522 4.73437 7.32495 4.65527 7.56812L3.78809 10.1697C3.70313 10.4216 3.77051 10.7 3.95801 10.8904C4.14551 11.0808 4.42383 11.1453 4.67871 11.0603L7.28027 10.1931C7.52051 10.1111 7.74023 9.97632 7.92187 9.79761L12.8232 4.89331L9.95215 2.02222L5.05078 6.92651V6.92651ZM2.8125 1.72046C1.25977 1.72046 0 2.98022 0 4.53296V12.033C0 13.5857 1.25977 14.8455 2.8125 14.8455H10.3125C11.8652 14.8455 13.125 13.5857 13.125 12.033V9.22046C13.125 8.7019 12.7061 8.28296 12.1875 8.28296C11.6689 8.28296 11.25 8.7019 11.25 9.22046V12.033C11.25 12.5515 10.8311 12.9705 10.3125 12.9705H2.8125C2.29395 12.9705 1.875 12.5515 1.875 12.033V4.53296C1.875 4.0144 2.29395 3.59546 2.8125 3.59546H5.625C6.14355 3.59546 6.5625 3.17651 6.5625 2.65796C6.5625 2.1394 6.14355 1.72046 5.625 1.72046H2.8125Z" fill="white" />
            </svg>
          </button>
          <button type="button" class="delete-feature-btn btn btn-danger" onclick="deleteFeature('${data}')">
            <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.82857 0.622266L4.57143 1.125H1.14286C0.510714 1.125 0 1.62773 0 2.25C0 2.87227 0.510714 3.375 1.14286 3.375H14.8571C15.4893 3.375 16 2.87227 16 2.25C16 1.62773 15.4893 1.125 14.8571 1.125H11.4286L11.1714 0.622266C10.9786 0.239063 10.5821 0 10.15 0H5.85C5.41786 0 5.02143 0.239063 4.82857 0.622266V0.622266ZM14.8571 4.5H1.14286L1.9 16.418C1.95714 17.3074 2.70714 18 3.61071 18H12.3893C13.2929 18 14.0429 17.3074 14.1 16.418L14.8571 4.5Z" fill="white" />
            </svg>
          </button>
        </td>`;
        },
      },
    ],
  });
}

function editFeature(id) {
  $("#myModal-edit-Feature").modal("toggle");
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/api/features/" + id,
    data: "data",
    dataType: "JSON",
    success: function (response) {
      const namefeature = response.name;
      $("#edit-feature-name").val(namefeature);
    },
  });
  changeFeature(id);
}

//Edit Features
function changeFeature(id) {
  $("#myModal-edit-Feature").modal("toggle");

  const buttonEditSubmit = document.getElementById("edit-button-submit");
  buttonEditSubmit.onclick = async () => {
    const featureName = $("#edit-feature-name").val();
    const res = await axios.put(
      "http://localhost:8080/api/features/" + id,
      {
        name: featureName,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status === 200) {
      
      const buttonClose = document.getElementById("edit-button-close");
      buttonClose.click();
      Swal.fire("Edit feature successfully!", "", "success")
      // toastr.success("Edit feature successfully!");
      setTimeout(() => {
        featureTable();
      }, 500);
    }
  };
}


//delete feature
function deleteFeature(id) {
  Swal.fire({
      title: "Are you sure you'd like to delete this Feature?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
  }).then((result) => {
      if (result.isConfirmed) {
          $.ajax({
              type: "DELETE",
              url: base_url + "/api/features/" + id,
              data: {},
              dataType: "JSON",
              "processData": false,
              "mimeType": "multipart/form-data",
              "contentType": false,
              success: function (result) {
                Swal.fire("Delete Package Successfully", "", "success")
                  setTimeout(() => {
                      featureTable();
                  }, 500)
              },
              error: function (error){
                Swal.fire("Delete Package Failed", "", "info")
              }
          })
      } else if (result.isDenied) {
          Swal.fire("Delete Package Failed", "", "info")
      }
  })
}

// async function reload() {
//     const featuresList = document.getElementById("features-list")

//     const res = await fetch(base_url + "/api/features");
//     const features = await res.json();

//     featuresList.innerHTML = ""

//     features.forEach((feature, index) => {
//         const tr = document.createElement("tr")
//         const featureItem = `
//           <td class="font-kanit">
//             ${feature.name}
//           </td>
//           <td class="text-center d-flex justify-content-center">
//             <button type="button" class="edit-feature-btn  btn btn-warning mr-2" id="edit-feature-btn-${index + 1
//             }">
//               <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M13.8164 0.481201C13.1748 -0.1604 12.1377 -0.1604 11.4961 0.481201L10.6143 1.36011L13.4824 4.22827L14.3643 3.34644C15.0059 2.70483 15.0059 1.66772 14.3643 1.02612L13.8164 0.481201ZM5.05078 6.92651C4.87207 7.10522 4.73437 7.32495 4.65527 7.56812L3.78809 10.1697C3.70313 10.4216 3.77051 10.7 3.95801 10.8904C4.14551 11.0808 4.42383 11.1453 4.67871 11.0603L7.28027 10.1931C7.52051 10.1111 7.74023 9.97632 7.92187 9.79761L12.8232 4.89331L9.95215 2.02222L5.05078 6.92651V6.92651ZM2.8125 1.72046C1.25977 1.72046 0 2.98022 0 4.53296V12.033C0 13.5857 1.25977 14.8455 2.8125 14.8455H10.3125C11.8652 14.8455 13.125 13.5857 13.125 12.033V9.22046C13.125 8.7019 12.7061 8.28296 12.1875 8.28296C11.6689 8.28296 11.25 8.7019 11.25 9.22046V12.033C11.25 12.5515 10.8311 12.9705 10.3125 12.9705H2.8125C2.29395 12.9705 1.875 12.5515 1.875 12.033V4.53296C1.875 4.0144 2.29395 3.59546 2.8125 3.59546H5.625C6.14355 3.59546 6.5625 3.17651 6.5625 2.65796C6.5625 2.1394 6.14355 1.72046 5.625 1.72046H2.8125Z" fill="white" />
//               </svg>
//             </button>
//             <button type="button" class="delete-feature-btn btn btn-danger" id="delete-feature-btn-${index + 1
//             }">
//               <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M4.82857 0.622266L4.57143 1.125H1.14286C0.510714 1.125 0 1.62773 0 2.25C0 2.87227 0.510714 3.375 1.14286 3.375H14.8571C15.4893 3.375 16 2.87227 16 2.25C16 1.62773 15.4893 1.125 14.8571 1.125H11.4286L11.1714 0.622266C10.9786 0.239063 10.5821 0 10.15 0H5.85C5.41786 0 5.02143 0.239063 4.82857 0.622266V0.622266ZM14.8571 4.5H1.14286L1.9 16.418C1.95714 17.3074 2.70714 18 3.61071 18H12.3893C13.2929 18 14.0429 17.3074 14.1 16.418L14.8571 4.5Z" fill="white" />
//               </svg>
//             </button>
//           </td>`;

//         tr.innerHTML = featureItem;
//         featuresList.appendChild(tr);

//         const buttonEdit = document.getElementById(`edit-feature-btn-${index + 1}`); // prettier-ignore
//         const buttonDelete = document.getElementById(`delete-feature-btn-${index + 1}`); // prettier-ignore

//         // handle edit feature
//         buttonEdit.addEventListener("click", () => {
//             $("#myModal-edit-Feature").modal("toggle");
//             const featureName = document.getElementById("edit-feature-name");
//             featureName.value = feature.name;

//             const buttonEditSubmit = document.getElementById("edit-button-submit");
//             buttonEditSubmit.onclick = async () => {
//                 const res = await axios.put(
//                     `${base_url}/api/features/${feature.id}`,
//                     {
//                         name: featureName.value,
//                     },
//                     {
//                         headers: {
//                             "Content-Type": "application/json",
//                         },
//                     }
//                 );

//                 if (res.status === 200) {
//                     await reload();
//                     const buttonClose = document.getElementById("edit-button-close");
//                     buttonClose.click();
//                     toastr.success("Edit feature successfully!");
//                 }
//             };
//         });

//         // handle delete feature
//         buttonDelete.addEventListener("click", () => {
//             $("#modal-delete-confirmation-feature").modal("toggle");
//             const buttonDeleteSubmit = document.getElementById(
//                 "delete-button-submit"
//             );
//             buttonDeleteSubmit.onclick = async () => {
//                 const res = await fetch(
//                     `http://localhost:8080/api/features/${feature.id}`,
//                     {
//                         method: "DELETE",
//                     }
//                 );

//                 const data = await res.json();
//                 console.log(data);

//                 if (data.message) {
//                     await reload()
//                     const buttonClose = document.getElementById("add-button-close")
//                     buttonClose.click()
//                     toastr.success(data.message)
//                 }
//             }
//         })
//     })
// }

// // run after document ready
// document.addEventListener("DOMContentLoaded", reload)
