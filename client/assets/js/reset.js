/* eslint-disable no-undef */
const baseUrl = 'https://better-politico.herokuapp.com/api/v1';

const email = document.querySelector('#email');
const password = document.querySelector('#new-password');
const confirmPassword = document.querySelector('#confirm-password');
const submitBtn = document.querySelector('#submitBtn');
const resetBtn = document.querySelector('#resetBtn');

resetBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const userData = {
    email: email.value,
  };

  resetBtn.value = 'Sending Mail >>>>';
  resetBtn.disabled = true;

  fetch(`${baseUrl}/auth/reset`, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status === 200) {
        localStorage.setItem('userEmail', userData.email);
        console.log(`sent email to ${userData.email}`);
      } else if (response.status === 404) {
        console.log('email not found');
        resetBtn.value = 'Send reset email';
        resetBtn.disabled = false;
      }
    })
    .catch(error => console.error(error));
});

const { search } = window.location;
const tokenPart = search.split('=');

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const userData = {
    email: localStorage.getItem('userEmail'),
    password: password.value,
    resetTokenHash: tokenPart[1],
  };

  submitBtn.value = 'Resetting Password >>>>>';
  submitBtn.disabled = true;

  fetch(`${baseUrl}/auth/validate`, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status === 200) {
        const loginUrl = '../../pages/auth/sign-in.html';
        window.location.href = loginUrl;
      } else if (response.status === 404) {
        console.log('email not found');
        submitBtn.value = 'Change Password';
        submitBtn.disabled = false;
      } else if (response.status === 400) {
        console.log('Check that the token is corect');
        submitBtn.value = 'Change Password';
        submitBtn.disabled = false;
      }
    })
    .catch(error => console.error(error));
});