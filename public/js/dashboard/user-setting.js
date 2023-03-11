function main() {
  // list of elements
  const form = document.getElementById('edit_profile');
  const nameEl = document.getElementById('name-user-edit');
  const emailEl = document.getElementById('email-user-edit');
  const companyEl = document.getElementById('company-user-edit');
  const previewEl = document.getElementById('preview-profile-modal');

  // get user data
  getUserData(nameEl, emailEl, companyEl, previewEl);

  // handle edit
  form.addEventListener('submit', handleEdit);
}

function getUserData(nameEl, emailEl, companyEl, previewEl) {
  axios
    .get(base_url + '/api/auth/profile')
    .then((res) => {
      if (res.data.status === 200) {
        const { name, email, company, profile_picture } = res.data.data;
        nameEl.value = name;
        emailEl.value = email;
        companyEl.value = company;
        previewEl.src = profile_picture;
        previewEl.setAttribute('alt', name);
      }
    })
    .catch((err) => {
      toastr.error(err.message);
    });
}

function handleEdit(e) {
  e.preventDefault();

  toastr.info('Updating profile...');
  const form = e.target;
  const inputs = form.getElementsByTagName('input');

  const profile_picture = inputs[0].files[0];
  const name = inputs[1].value;
  const email = inputs[2].value;
  const company = inputs[3].value;

  const body = {
    name,
    email,
    company: Boolean(company) ? company : 'Individual',
  };

  axios
    .put(base_url + '/api/auth/profile/update', body)
    .then((res) => {
      if (res.data.status === 200) {
        if (!profile_picture) {
          toastr.success(res.data.message);
          document.getElementById('profile-close-button').click();
        }

        document.getElementById(
          'profile-name'
        ).innerHTML = `<div class="detail font-nunito">
            <p class="name" id="profile-name">${name}</p>
            </div>`;
      }
    })
    .catch((err) => {
      console.log(err);
      toastr.error(err.message);
    });

  if (profile_picture) {
    const formData = new FormData();
    formData.append('profile_picture', profile_picture);
    axios
      .post(base_url + '/api/auth/profile/picture', formData)
      .then((res) => {
        if (res.data.status === 200) {
          toastr.success(res.data.message);
          document.getElementById('profile-close-button').click();
          document.getElementById('profile-image').src = res.data.data.url;
        }
      })
      .catch((err) => {
        console.log(err);
        toastr.error(err.response.data.messages.profile_picture);
      });
  }
}

document.addEventListener('DOMContentLoaded', main);
