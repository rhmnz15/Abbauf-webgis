$(document).ready(function () {
  // Change Password
  $('#chngpwdTrigger').click(function () {
    window.location.href = base_url + '/auth/change-password';
  });
  // End Of Change Password

  $('.hamburger-desktop').click(() => {
    if ($(window).width() >= 992) {
      $('.fixed-content-box').toggleClass('custom-left-sidebar');
      $('.content-body').toggleClass('custom-left-body');
      $('.header').toggleClass('custom-left-header');
    }
  });
  $(window).resize(function () {
    if ($(window).width() < 992) {
      $('.fixed-content-box').removeClass('custom-left-sidebar');
      $('.content-body').removeClass('custom-left-body');
      $('.header').removeClass('custom-left-header');
    }
  });

  // ToolTip
  $('#nav-item-dashboard').tooltip();
  $('#nav-item-gis').tooltip();
  $('#nav-item-survey').tooltip();
  // End Of ToolTip

  // Profile Modal
  $(function () {
    $('#profile-pict-profile-modal').change(function (event) {
      var url = URL.createObjectURL(event.target.files[0]);
      $('#preview-profile-modal').attr('src', url);
    });
  });
  // End Of Profile Modal
});

// run script before page load
window.onload = function () {
  const pathname = window.location.pathname;

  // Change title
  switch (pathname) {
    case '/':
      initialRedirect();
      break;
    case '/index.php/':
      initialRedirect();
      break;
    case '/admin/dashboard':
      document.title = 'Dashboard Admin';
      break;
    case '/admin/dashboard/management-user':
      document.title = 'Dashboard Admin - Management User';
      break;
    case '/admin/dashboard/package-setting':
      document.title = 'Dashboard Admin - Package Setting';
      break;
    case '/admin/dashboard/poi':
      document.title = 'Dashboard Admin - POI';
      break;
    case '/admin/dashboard/shp':
      document.title = 'Dashboard Admin - SHP';
      break;
    case '/user/dashboard':
      document.title = 'Abbauf GIS - Dashboard';
      break;
    case '/user/dashboard/package':
      document.title = 'Abbauf GIS - Package';
      break;
    case '/user/dashboard/poi':
      document.title = 'Abbauf GIS - POI';
      break;
    case '/user/dashboard/shp':
      document.title = 'Abbauf GIS - SHP';
      break;
    default:
      document.title = 'Abbauf GIS';
  }
  // End Of Change Title
  authRedirect();
};

function authRedirect() {
  const sections = window.location.pathname.split('/');
  const section = sections[1];
  fetch(base_url + '/api/auth/profile')
    .then((res) => res.json())
    .then((data) => {
      if (!data.error) {
        const { role } = data.data;
        if (section === 'admin' && role !== '1') {
          window.location.href = base_url + '/user/dashboard/package';
        } else if (section === 'user' && role !== '2') {
          window.location.href = base_url + '/admin/dashboard/management-user';
        }
      }
    })
    .catch((err) => console.log(err));
}

function initialRedirect() {
  const sections = window.location.pathname.split('/');
  const section = sections[1];
  fetch(base_url + '/api/auth/profile')
    .then((res) => res.json())
    .then((data) => {
      if (!data.error) {
        const { role } = data.data;
        if (role !== '1') {
          window.location.href = base_url + '/user/dashboard/package';
        } else if (role !== '2') {
          window.location.href = base_url + '/admin/dashboard/management-user';
        }
      }
    })
    .catch((err) => console.log(err));
}
