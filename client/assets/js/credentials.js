// handle logout
// handle redirection of user to signin page if not authorized ==
// check for isadmin and display appropriate nav bar
// we would send the request to fetch user details with authorization header too ==
/* eslint-disable no-undef */

// alwways retrieve users information to make sure they dont visit pages not for them by using 
// the isadmin status, add to
// all pages javascript file

// create another credential file to check for isadmin status
const credentialUrl = 'https://better-politico.herokuapp.com/api/v1';

const navigationMenu = document.querySelector('#menu');

window.addEventListener('load', (e) => {
  e.preventDefault();
  const token = localStorage.getItem('userToken');

  if (!token) {
    window.location.href = '../pages/auth/sign-in.html';
    localStorage.clear();
  } else {
    fetch(`${credentialUrl}/user/${token}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then((response) => {
        if (response.status === 200) {
          const isAdmin = response.data[0].isadmin;
          if (isAdmin === 'true') {
  
          } else if (isAdmin === 'false') {
            const navItem = document.createElement('li');
            navItem.innerHTML = '<li><a href="election-result.html" class="nav-links">Results</a></li>';
            navigationMenu.appendChild(navItem);
          }
        } else {
          const logoutUrl = '../pages/auth/sign-in.html';
          window.location.href = logoutUrl;
          localStorage.clear();
        }
      })
      .catch(error => console.error(error));
  }
});
