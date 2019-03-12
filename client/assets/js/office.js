/* eslint-disable no-undef */
const baseUrl = 'https://better-politico.herokuapp.com/api/v1';

camelCase = item => item.charAt(0).toUpperCase() + item.slice(1);

upperCase = item => item.toUpperCase();

const token = localStorage.getItem('userToken');

getOffices = () => {
  const officeTable = document.querySelector('#table');

  if (!token) {
    fetch(`${baseUrl}/offices`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then((officeResponse) => {
        if (officeResponse.status === 200) {
          for (let i = 0; i < officeResponse.data.length; i += 1) {
            const officeId = officeResponse.data[i].id;
            officeTable.innerHTML += `<tr>
            <td>${camelCase(officeResponse.data[i].name)}</td>
            <td>${camelCase(officeResponse.data[i].type)}</td>
            <td>
              <a href="office-candidates.html?id=${officeId}" class="small-default-button" title="view candidates">View Candidates</a>
            </td>
          </tr>`;
          }
        } else if (officeResponse.status === 404) {
          officeTable.innerHTML += `<tr>
          <td>No offices found</td>
          </tr>`;
        }
      })
      .catch(officeError => console.error(officeError));
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
          fetch(`${baseUrl}/offices`, {
            method: 'GET',
          })
            .then(res => res.json())
            .then((officeResponse) => {
              if (officeResponse.status === 200) {
                for (let i = 0; i < officeResponse.data.length; i += 1) {
                  const officeId = officeResponse.data[i].id;
                  officeTable.innerHTML += `<tr>
                  <td>${camelCase(officeResponse.data[i].name)}</td>
                  <td>${camelCase(officeResponse.data[i].type)}</td>
                  <td>
                    <a href="office-candidates.html?id=${officeId}" class="small-default-button" title="view candidates">View Candidates</a>
                    <a href="declare-interest.html?id=${officeId}" class="small-success-button" title="declare interest">Declare Interest</a>
                  </td>
                </tr>`;
                }
              } else if (officeResponse.status === 404) {
                officeTable.innerHTML += `<tr>
                <td>No offices found</td>
                </tr>`;
              }
            })
            .catch(officeError => console.error(officeError)); 
        } else {
          fetch(`${baseUrl}/offices`, {
            method: 'GET',
          })
            .then(res => res.json())
            .then((officeResponse) => {
              if (officeResponse.status === 200) {
                for (let i = 0; i < officeResponse.data.length; i += 1) {
                  const officeId = officeResponse.data[i].id;
                  officeTable.innerHTML += `<tr>
                  <td>${camelCase(officeResponse.data[i].name)}</td>
                  <td>${camelCase(officeResponse.data[i].type)}</td>
                  <td>
                    <a href="office-candidates.html?id=${officeId}" class="small-default-button" title="view candidates">View Candidates</a>
                  </td>
                </tr>`;
                }
              } else if (officeResponse.status === 404) {
                officeTable.innerHTML += `<tr>
                <td>No offices found</td>
                </tr>`;
              }
            })
            .catch(officeError => console.error(officeError));
        }
      })
      .catch(error => console.error(error));
  }
};


createOffice = () => {
  const officeType = document.querySelector('#office_type');
  const officeName = document.querySelector('#office-name');
  const submitBtn = document.querySelector('#submitBtn');

  const officeData = {
    type: officeType.options[officeType.selectedIndex].value,
    officename: officeName.value,
  };
  
  fetch(`${baseUrl}/offices`, {
    method: 'POST',
    body: JSON.stringify(officeData),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status === 201) {
        console.log(response);
        window.location.href = '../pages/view-offices.html';
      } else if (response.status === 409) {
        console.log('duplication');
      } else if (response.status === 400) {
        console.log('field incomplete or unauthorized');
      }
    })
    .catch(error => console.error(error));
};
