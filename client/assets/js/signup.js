/* eslint-disable no-undef */
const baseUrl = 'https://better-politico.herokuapp.com/api/v1/auth/signup';
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/ogwurujohnson/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'zjjd4c1v';

const firstname = document.querySelector('#firstname');
const lastname = document.querySelector('#lastname');
const othername = document.querySelector('#othername');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const passport = document.querySelector('#passport');
const password = document.querySelector('#password');
const rePassword = document.querySelector('#rePassword');
const submitBtn = document.querySelector('#submitBtn');

passport.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  submitBtn.value = 'Uploading Image >>>>>';
  submitBtn.disabled = true;

  fetch(CLOUDINARY_URL, {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then((data) => {
      if (data.secure_url !== '') {
        const uploadedFileUrl = data.secure_url;
        localStorage.setItem('passportUrl', uploadedFileUrl);
        submitBtn.value = 'Sign Up';
        submitBtn.disabled = false;
      }
    })
    .catch(err => console.error(err));
});


submitBtn.addEventListener('click', () => {
  const userData = {
    firstname: firstname.value,
    lastname: lastname.value,
    othername: othername.value,
    password: password.value,
    email: email.value,
    phonenumber: phone.value,
    passporturl: localStorage.getItem('passportUrl'),
  };
  submitBtn.value = 'Submitting >>>>';
  submitBtn.disabled = true;

  fetch(baseUrl, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status === 201) {
        localStorage.setItem('userToken', response.data[0].token);
        localStorage.removeItem('passportUrl');
        const profileUrl = '../../pages/profile.html';
        window.location.href = profileUrl;
      } else if (response.status === 409) {
        console.log('User Exists');
        submitBtn.value = 'Sign Up';
        submitBtn.disabled = false;
      } else if (response.status === 400) {
        console.log('Check that all fields are correctly filled, then try again');
        submitBtn.value = 'Sign Up';
        submitBtn.disabled = false;
      }
    })
    .catch(error => console.error(error));
});
