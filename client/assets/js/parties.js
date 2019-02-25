/* eslint-disable no-undef */
const baseUrl = 'https://better-politico.herokuapp.com/api/v1';

const partyTable = document.querySelector('#table');

camelCase = item => item.charAt(0).toUpperCase() + item.slice(1);

upperCase = item => item.toUpperCase();


window.addEventListener('load', (e) => {
  e.preventDefault();
  const token = localStorage.getItem('userToken');

  if (!token) {
    fetch(`${baseUrl}/parties`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then((partyResponse) => {
        if (partyResponse.status === 200) {
          for (let i = 0; i < partyResponse.data.length; i += 1) {
            partyTable.innerHTML += `<tr>
            <td><a href="view-party.html">${upperCase(partyResponse.data[i].name)}</a></td>
            <td>${camelCase(partyResponse.data[i].hqaddress)}</td>
            <td>${camelCase(partyResponse.data[i].createddate)}</td>
            <td><img src="${partyResponse.data[i].logourl}" style="width: 50px; height: 50px;"></img></td>
            <td>
              <a href="view-party.html" class="small-default-button" title="View party">View</a>
            </td>
          </tr>`;
          }
        } else if (partyResponse.status === 404) {
          partyTable.innerHTML += `<tr>
          <td>No parties found</td>
          </tr>`;
        }
      })
      .catch(partyError => console.error(partyError));
  } else {
    fetch(`${baseUrl}/user/${token}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then((response) => {
        if (response.status === 200) {
          if (response.data[0].isadmin === 'true') {
            fetch(`${baseUrl}/parties`, {
              method: 'GET',
            })
              .then(res => res.json())
              .then((partyResponse) => {
                if (partyResponse.status === 200) {
                  for (let i = 0; i < partyResponse.data.length; i += 1) {
                    const partyId = 6;
                    partyTable.innerHTML += `<tr>
                    <td><a href="view-party.html">${upperCase(partyResponse.data[i].name)}</a></td>
                    <td>${camelCase(partyResponse.data[i].hqaddress)}</td>
                    <td>${partyResponse.data[i].createddate}</td>
                    <td><img src="${partyResponse.data[i].logourl}" style="width: 50px; height: 50px;"></img></td>
                    <td>
                      <input type="button" class="small-danger-button" id="delete_button" onclick="deleteParty(${partyId})" value="Delete">
                      <a href="edit-party.html?id=${partyId}" class="small-default-button" title="Edit party">Edit</a>
                      <a href="view-party.html?id=${partyId}" class="small-default-button" title="View party">View</a>
                    </td>
                  </tr>`;
                  }
                } else if (partyResponse.status === 404) {
                  partyTable.innerHTML += `<tr>
                  <td>No parties found</td>
                  </tr>`;
                }
              })
              .catch(partyError => console.error(partyError));
          } else if (response.data[0].isadmin === 'false') {
            fetch(`${baseUrl}/parties`, {
              method: 'GET',
            })
              .then(res => res.json())
              .then((partyResponse) => {
                if (partyResponse.status === 200) {
                  for (let i = 0; i < partyResponse.data.length; i += 1) {
                    partyTable.innerHTML += `<tr>
                    <td><a href="view-party.html">${upperCase(partyResponse.data[i].name)}</a></td>
                    <td>${camelCase(partyResponse.data[i].hqaddress)}</td>
                    <td>${camelCase(partyResponse.data[i].createddate)}</td>
                    <td><img src="${partyResponse.data[i].logourl}" style="width: 50px; height: 50px;"></img></td>
                    <td>
                      <a href="view-party.html" class="small-default-button" title="View party">View</a>
                    </td>
                  </tr>`;
                  }
                } else if (partyResponse.status === 404) {
                  partyTable.innerHTML += `<tr>
                  <td>No parties found</td>
                  </tr>`;
                }
              })
              .catch(partyError => console.error(partyError));
          }
        } else {
          fetch(`${baseUrl}/parties`, {
            method: 'GET',
          })
            .then(res => res.json())
            .then((partyResponse) => {
              if (partyResponse.status === 200) {
                for (let i = 0; i < partyResponse.data.length; i += 1) {
                  partyTable.innerHTML += `<tr>
                  <td><a href="view-party.html">${upperCase(partyResponse.data[i].name)}</a></td>
                  <td>${camelCase(partyResponse.data[i].hqaddress)}</td>
                  <td>${camelCase(partyResponse.data[i].createddate)}</td>
                  <td><img src="${partyResponse.data[i].logourl}" style="width: 50px; height: 50px;"></img></td>
                  <td>
                    <a href="view-party.html" class="small-default-button" title="View party">View</a>
                  </td>
                </tr>`;
                }
              } else if (partyResponse.status === 404) {
                partyTable.innerHTML += `<tr>
                <td>No parties found</td>
                </tr>`;
              }
            })
            .catch(partyError => console.error(partyError));
        }
      })
      .catch(error => console.error(error));
  }
});


deleteParty = (partyId) => {
  // const deleteButton = document.querySelectorAll('#delete_button');

  const token = localStorage.getItem('userToken');

  fetch(`${baseUrl}/parties/${partyId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status === 200) {
        console.log('Deleted');
        window.location.reload();
      } else if (response.status === 404) {
        console.log('party not found');
      } else if (response.status === 400) {
        console.log('NAN');
      }
    })
    .catch(error => console.error(error));
};