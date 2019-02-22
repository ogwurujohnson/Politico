/* eslint-disable no-undef */
const baseUrl = 'https://better-politico.herokuapp.com/api/v1';

const email = document.querySelector('#email');
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
