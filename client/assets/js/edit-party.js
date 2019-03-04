/* eslint-disable no-undef */
const baseUrl = 'https://better-politico.herokuapp.com/api/v1';

const partyName = document.querySelector('#party_name');
const partyAddress = document.querySelector('#hq_address');
const submitBtn = document.querySelector('#submitBtn');
const partyTitle = document.querySelector('#party_title');
const pageTitle = document.querySelector('#page_title');

upperCase = item => item.toUpperCase();

const { search } = window.location;
const tokenPart = search.split('=');
const partyId = tokenPart[1];

const token = localStorage.getItem('userToken');

if (!token) {
  window.location.href = '../pages/auth/sign-in.html';
} else {
  window.addEventListener('load', (e) => {
    e.preventDefault();
    fetch(`${baseUrl}/parties/${partyId}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then((response) => {
        if (response.status === 200) {
          partyName.value = response.data[0].name;
          partyAddress.value = response.data[0].hqaddress;
          partyTitle.innerHTML = `Edit ${upperCase(response.data[0].name)}`;
          pageTitle.innerHTML = `Politico | Admin - Edit ${upperCase(response.data[0].name)}`;
        } else if (response.status === 404) {
          console.log('not found');
        }
      })
      .catch(error => console.error(error));
  });
  
  // when adding form validation remember to disable button until form is filled
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const partyData = {
      partyname: partyName.value,
      hqaddress: partyAddress.value,
    };
    fetch(`${baseUrl}/parties/${partyId}`, {
      method: 'PATCH',
      body: JSON.stringify(partyData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then((response) => {
        if (response.status === 201) {
          window.location.href = '../pages/view-parties.html';
        } else if (response.status === 404) {
          console.log('party not found');
        } else if (response.status === 400) {
          console.log('some fields are required');
        }
      })
      .catch(error => console.error(error));
  });
}
