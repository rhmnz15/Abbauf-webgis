(async function () {
  try {
    const user = await fetch('/api/auth/profile').then((res) => res.json());
    const { name, profile_picture, username } = user.data;

    const imgElement = document.getElementById('profile-image');
    const nameElement = document.getElementById('profile-name');
    const roleElement = document.getElementById('profile-role');
    const greetingElement = document.getElementById('greeting-name');

    const generateUsername = (name) => {
      const splitName = name.split(' ');
      return splitName.join('').toLowerCase();
    };

    imgElement.rel = 'noreferrer noopener';
    imgElement.referrerPolicy = 'no-referrer';
    imgElement.src = profile_picture
      ? profile_picture
      : 'https://placeimg.com/640/480/any';

    imgElement.src = profile_picture;
    if (imgElement.src !== profile_picture) {
      imgElement.src = 'https://placeimg.com/640/480/any';
    }

    nameElement.innerText = username
      ? username
      : generateUsername(name).length > 8
      ? generateUsername(name).slice(0, 8) + '...'
      : generateUsername(name);
    roleElement.innerText = user.data.role === '1' ? 'Admin' : 'User';
    greetingElement.innerText = name;
  } catch (err) {
    // console.log(err);
  }
})();
