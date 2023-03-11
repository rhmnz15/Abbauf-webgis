async function reload() {
  const cardBody = document.getElementById('card-body');

  const res = await fetch(base_url + '/api/packages');
  const packages = await res.json();

  cardBody.innerHTML = '';

  packages.forEach((package) => {
    const div = document.createElement('div');
    const cardContent = `
        <div class="card position-relative shadow rounded-10 w-package mr-xl-3 mr-md-2" id=${package.id}>
          <img src="${base_url}/icons/user/banner-package.svg" class="card-img-top" alt="gambar">
          <div class="position-absolute card-package-user d-flex flex-column" id="title">
              <img src="${base_url}/icons/user/logo-abbauf.svg" width="74" height="83" class="logo-abbauf" alt="abbauf">
              <h5 class="fw-bold text-white " id="title-price">${package.name}</h5>
              <p class="text-white fw-normal" id="price">Rp${package.price}/Bulan</p>
          </div>

          <div class="card-body">
              <button type="button" onclick="packageDetail(${package.id})" class="btn-package-detail btn w-100 text-white fw-bolder mt-md-5 mt-5" id="button-sub">Detail Paket</button>
          </div>
        </div>`;

    div.innerHTML = cardContent;
    cardBody.appendChild(div);
  });
  featuresList();

  $('.btn-package-detail').click(() => {
    $('#detail-package-modal').modal('toggle');
  });
  $('#close-detail-package-modal').click(() => {
    $('#detail-package-modal').modal('toggle');
  });
}

async function packageDetail(id) {
  const res = await fetch(base_url + '/api/packages/' + id);
  const package = await res.json();

  const thousandSeparator = (num) => {
    if (num == null) return 0;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const name = document.getElementById('package-name');
  const price = document.getElementById('package-price');
  const features = document.getElementById('package-features');

  name.innerHTML = package.name;
  price.innerHTML = 'Rp' + thousandSeparator(package.price) + '/Bulan';

  features.innerHTML = '';
  package.features.forEach((feature) => {
    const elem = `<li class="ml-3" style="list-style-type: circle;">${feature.name}</li>`;
    features.innerHTML += elem;
  });

  const subscribeBtn = document.getElementById('subscribe-button');
  subscribeBtn.onclick = async () => {
    const user = await getUserDetails();
    const userDetails = {
      uid: user.user_id,
      name: user.name,
      email: user.email || '',
      phone: user.phone || '',
    };

    const data = {
      package_id: package.id,
      name: package.name,
      price: package.price,
    };
    
    getSnapToken(data, userDetails);
  };
}

async function featuresList() {
  try {
    const res = await axios.get(base_url + '/api/features');
    const features = res.data;

    const ftsSelect = document.getElementById('features-list');
    ftsSelect.innerHTML = '';

    features.forEach((feature) => {
      const elem = `
      <div class="d-flex mb-1">
        <div>
            <input id="checkbox-${feature.id}" value="${feature.id}" class="checkbox-feature mr-2" type="checkbox">
        </div>
        <label for="checkbox">${feature.name}</label>
      </div>`;

      ftsSelect.innerHTML += elem;
    });
  } catch (err) {
    console.log(err);
  }
}

function pay(package_name, price) {
  console.log({ package_name, price });
}

function addRequestPackage() {
  let feature = [];
  let chks = document.querySelectorAll('.checkbox-feature:checked');

  for (let i = 0, iLen = chks.length; i < iLen; i++) {
    feature.push(parseInt(chks[i].value));
  }

  const randomString = Math.random().toString(16).substr(2, 8);

  const body = {
    package_name: randomString,
    feature_id: feature,
  };

  axios
    .post(base_url + '/api/users/request-package', body)
    .then((response) => {
      Swal.fire('Request Package Successfully', '', 'success');
    })
    .catch((error) => {
      Swal.fire('Request Package Failed', '', 'info');
    });
}

document.addEventListener('DOMContentLoaded', reload);

function getSnapToken (data, userDetails) {
  $.ajax({
    url:base_url + '/api/transactions/pay',
    type:"POST",
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      uid: userDetails.uid,
      name: userDetails.name,
      email: userDetails.email,
      phone: userDetails.phone,
      amount: data.price,
      order_id:
        'order-package-' +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
      item_details: [
        {
          ...data,
          quantity: 1,
        },
      ],
    }),
    success:function(response) {
      snap.pay(response, {
        onSuccess: (result) => {
          $.ajax({
            url:base_url + '/api/transactions/create',
            type:"POST",
            headers: {
              'Content-Type': 'application/json',
            },
            data: JSON.stringify({
              transaction_id: result.transaction_id,
              order_id: result.order_id,
              gross_amount: result.gross_amount,
              payment_type: result.payment_type,
              transaction_status: result.transaction_status,
              pdf_url: result.pdf_url,
              user_id: userDetails.uid,
              package_id: data.package_id
            }),
            success:function(response2) {
              toastr.success('Success Subscribe Package!');
              $('#detail-package-modal').modal('toggle')
            },
            error:function(){
              toastr.success('Failed Subscribe Package!');
            }
          })
        },
        onPending: (result) => {
          console.log(result);
        },
        onError: (result) => {
          console.log(result);
        },
      });
    },
    error:function(){
      toastr.error('failed get snap token!');
    }
  })


    // const res = await fetch(`${api}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     uid: userDetails.uid,
    //     name: userDetails.name,
    //     email: userDetails.email,
    //     phone: userDetails.phone,
    //     amount: data.price,
    //     order_id:
    //       'order-package-' +
    //       Math.random().toString(36).substring(2, 15) +
    //       Math.random().toString(36).substring(2, 15),
    //     item_details: [
    //       {
    //         ...data,
    //         quantity: 1,
    //       },
    //     ],
    //   }),
    // })

    // const response = await res;
    // if (response) {
    //   const { token } = response;
    //   console.log(response)
    //   return token;
    // } else {
    //   throw new Error(response.message);
    // }
};

const getUserDetails = async () => {
  try {
    const res = await fetch(base_url + '/api/auth/profile');
    const { data } = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};
