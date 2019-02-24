/* eslint-disable no-undef */
const baseUrl = 'https://better-politico.herokuapp.com/api/v1';

const userAvatar = document.querySelector('#avatar');
const UserFullname = document.querySelector('#fullname');
const voteTable = document.querySelector('#user-activity-table');

window.addEventListener('load', (e) => {
  e.preventDefault();
  const token = localStorage.getItem('userToken');

  fetch(`${baseUrl}/user/${token}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status === 200) {
        const fullName = `${response.data[0].firstname} ${response.data[0].lastname}`;
        const avatar = response.data[0].passporturl;
        const userId = response.data[0].id;
        localStorage.setItem('userId', userId);
        userAvatar.src = avatar;
        UserFullname.innerHTML = fullName;
      } else {
        const logoutUrl = '../pages/auth/sign-in.html';
        window.location.href = logoutUrl;
      }
    })
    .catch(error => console.error(error));
  const userId = localStorage.getItem('userId');
  
  fetch(`${baseUrl}/user/${userId}/vote`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status === 200) {
        for (let i = 0; i < response.data.length; i += 1) {
          const tr = document.createElement('tr');
          voteTable.appendChild(tr);
          // using Object.keys to get the length of an object
          const objLen = Object.keys(response.data[i]).length;
          for (let j = 0; j < objLen; j += 1) {
            // looping through an object and retrieving data with Object.keys
            const key = Object.keys(response.data[i])[j];
            const item = response.data[i][key];
            const td = document.createElement('td');
            td.innerHTML = item.charAt(0).toUpperCase() + item.slice(1);
            tr.appendChild(td);
          }
        }
      } else {
        const noRecord = document.createElement('tr');
        noRecord.innerHTML = 'No Votes found';
        voteTable.appendChild(noRecord);
      }
    })
    .catch(error => console.error(error));
});
