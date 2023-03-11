fetch(base_url + '/api/users/request-package/', {
  method: 'GET',
  redirect: 'follow',
})
  .then((res) => res.json())
  .then((result) => {
    const data = olahData(result.data);

    const reqTable = document.getElementById('request-table');

    data.forEach((req) => {
      const features = req.features_name
        .map(
          (feature) =>
            `<li class="ml-3" style="list-style-type: circle;">${feature}</li>`
        )
        .join('');
      reqTable.innerHTML += `<tr>
                              <td class="font-kanit text-primary ">
                                <div class="d-flex align-items-center">
                                  <span class="ml-2">${req.user_id}</span>
                                </div>
                              </td>
                              <td class="font-kanit">
                                <ul>
                                  ${features}
                                </ul>
                              </td>
                              <td class="text-center ">
                                <div class="d-flex justify-content-center align-items-center">
                                  <button type="button" class="dashboard-button-green dashboard-button-sm color-white mr-2" id="approve-feature-btn">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M9.998 0.00500488C15.515 0.00500488 19.995 4.485 19.995 10.002C19.995 15.52 15.515 20 9.998 20C4.48 20 0 15.52 0 10.002C0 4.485 4.48 0.00500488 9.998 0.00500488V0.00500488ZM9.998 1.505C5.308 1.505 1.5 5.312 1.5 10.002C1.5 14.692 5.308 18.5 9.998 18.5C14.688 18.5 18.495 14.692 18.495 10.002C18.495 5.312 14.688 1.505 9.998 1.505V1.505ZM4.949 10.391L8.8 13.821C8.942 13.949 9.121 14.011 9.299 14.011C9.501 14.011 9.704 13.93 9.851 13.769L15.804 7.26C15.935 7.117 16 6.93701 16 6.75801C16 6.34801 15.669 6.011 15.252 6.011C15.048 6.011 14.847 6.093 14.698 6.254L9.245 12.216L5.947 9.278C5.803 9.151 5.626 9.08801 5.448 9.08801C5.033 9.08801 4.7 9.423 4.7 9.834C4.7 10.039 4.784 10.243 4.949 10.391V10.391Z" fill="white" />
                                    </svg>
                                  </button>
                                  <button type="button" class="delete-feature-btn dashboard-button-red dashboard-button-sm color-white" id="decline-feature-btn">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M10.0019 0.00500488C15.5199 0.00500488 19.9999 4.485 19.9999 10.002C19.9999 15.52 15.5199 20 10.0019 20C4.48488 20 0.00488281 15.52 0.00488281 10.002C0.00488281 4.485 4.48488 0.00500488 10.0019 0.00500488V0.00500488ZM10.0019 1.505C5.31188 1.505 1.50488 5.312 1.50488 10.002C1.50488 14.692 5.31188 18.5 10.0019 18.5C14.6919 18.5 18.4999 14.692 18.4999 10.002C18.4999 5.312 14.6919 1.505 10.0019 1.505V1.505ZM10.0019 8.93001L12.7189 6.212C12.8649 6.066 13.0579 5.993 13.2499 5.993C13.6539 5.993 13.9999 6.318 13.9999 6.743C13.9999 6.936 13.9269 7.127 13.7809 7.274L11.0639 9.991L13.7909 12.719C13.9379 12.866 14.0109 13.058 14.0109 13.25C14.0109 13.677 13.6619 14 13.2609 14C13.0689 14 12.8769 13.927 12.7309 13.781L10.0019 11.053L7.27388 13.781C7.12788 13.927 6.93588 14 6.74388 14C6.34288 14 5.99288 13.677 5.99288 13.25C5.99288 13.058 6.06588 12.866 6.21288 12.719L8.94088 9.991L6.21888 7.269C6.07288 7.122 5.99988 6.931 5.99988 6.738C5.99988 6.313 6.34588 5.989 6.74988 5.989C6.94188 5.989 7.13488 6.062 7.28088 6.208L10.0019 8.93001Z" fill="white" />
                                    </svg>
                                  </button>
                                </div>
                              </td>
                            </tr>`;
    });
  });

function olahData(data) {
  let users = [];

  data.forEach((req) => {
    if (!users.includes(req.user_id)) {
      users.push(req.user_id);
    }
  });

  let userReq = [];

  users.forEach((user) => {
    let curr = [];
    data.forEach((req) => {
      if (req.user_id == user) {
        curr.push(req);
      }
    });
    userReq.push(curr);
  });

  const result = userReq.map((req) => {
    return {
      user_id: req[0].user_id,
      features_id: req.map((r) => r.feature_id),
      features_name: req.map((r) => r.feature_name),
      price: req.reduce((a, b) => a + parseInt(b.price), 0),
    };
  });

  return result;
}

$(document).ready(function () {
  // approve
  $('#approve-feature-btn, #button-cancel-feature').click(() => {
    $('#modal-approve-confirmation-feature').modal('toggle');
  });
  $('#close-approve-confirmation-feature, #button-cancel-feature').click(() => {
    $('#modal-approve-confirmation-feature').modal('toggle');
  });
  // decline
  $('#decline-feature-btn, #button-cancel-feature').click(() => {
    $('#modal-decline-confirmation-feature').modal('toggle');
  });
  $('#close-decline-confirmation-feature, #button-cancel-feature').click(() => {
    $('#modal-decline-confirmation-feature').modal('toggle');
  });
});

function Approve(x) {
  $('#modal-approve-confirmation-feature').modal('toggle');
  console.log(x);
}

function decline(x) {
  $('#modal-decline-confirmation-feature').modal('toggle');
  console.log(x);
}
