/* eslint-disable no-undef */
const baseUrl = 'https://better-politico.herokuapp.com/api/v1/parties';
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/ogwurujohnson/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'zjjd4c1v';


const party = document.querySelector('#party-name');
const partyAddress = document.querySelector('#party-address');
const partyLogo = document.querySelector('#party-logo');
const submitBtn = document.querySelector('#createParty');

const token = localStorage.getItem('userToken');

if (!token) {
  window.location.href = '../pages/auth/sign-in.html';
  localStorage.clear();
} else {
  partyLogo.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    submitBtn.value = 'Uploading Image >>>';
    submitBtn.disabled = true;

    fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then((data) => {
        if (data.secure_url !== '') {
          const uploadedFileUrl = data.secure_url;
          localStorage.setItem('logoUrl', uploadedFileUrl);
          console.log(uploadedFileUrl);
          submitBtn.value = 'Create Office';
          submitBtn.disabled = false;
        }
      })
      .catch(err => console.error(err));
  });

  submitBtn.addEventListener('click', () => {
    const partyData = {
      partyname: party.value,
      hqaddress: partyAddress.value,
      logourl: localStorage.getItem('logoUrl'),
    };
    submitBtn.value = 'Creating >>';
    submitBtn.disabled = true;

    fetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify(partyData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then((response) => {
        if (response.status === 201) {
          localStorage.removeItem('logoUrl');
          window.location.reload();
          console.log('Party created');
          submitBtn.value = 'Create Office';
          submitBtn.disabled = false;
        } else if (response.status === 500) {
          window.location.href = '../pages/auth/sign-in.html';
          localStorage.clear();
        } else if (response.status === 409) {
          console.log('party exists');
        } else {
          window.location.href = '../pages/auth/sign-in.html';
          localStorage.clear();
        }
      })
      .catch(error => console.error(error));
  });
}
