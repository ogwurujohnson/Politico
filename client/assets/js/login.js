/* eslint-disable no-undef */
const baseUrl = 'https://better-politico.herokuapp.com/api/v1/auth/login';

const email = document.querySelector('#email');
const password = document.querySelector('#password');
const submitBtn = document.querySelector('#submitBtn');

submitBtn.addEventListener('click', () => {
  const userData = {
    email: email.value,
    password: password.value,
  };

  submitBtn.value = 'Login in >>>>';
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
      if (response.status === 200) {
        localStorage.setItem('userToken', response.data[0].token);
        const isAdmin = response.data[0].user.isadmin;
        let profileUrl;
        if (isAdmin === 'true') {
          profileUrl = '../../pages/index.html';
        } else if (isAdmin === 'false') {
          profileUrl = '../../pages/profile.html';
        }
        window.location.href = profileUrl;
      } else if (response.status === 401) {
        console.log('wrong email or password');
        submitBtn.value = 'Sign In';
        submitBtn.disabled = false;
      } else if (response.status === 404) {
        console.log('No user found');
        submitBtn.value = 'Sign In';
        submitBtn.disabled = false;
      } else if (response.status === 400) {
        console.log('Check that all fields are correctly filled, then try again');
        submitBtn.value = 'Sign In';
        submitBtn.disabled = false;
      }
    })
    .catch(error => console.error(error));
});
