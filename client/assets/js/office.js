/* eslint-disable no-undef */
const baseUrl = 'https://better-politico.herokuapp.com/api/v1';

camelCase = item => item.charAt(0).toUpperCase() + item.slice(1);

upperCase = item => item.toUpperCase();

const token = localStorage.getItem('userToken');

let userType;

getOffices = () => {
  const officeTable = document.querySelector('#table');

  if (!token) {

    fetch(`${baseUrl}/offices`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then((officeResponse) => {
        if (officeResponse.status === 200) {
          userType = 'user';
          localStorage.setItem('userType', userType);
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
          if (response.data[0].isadmin === 'true') {
            userType = 'admin';
          } else {
            userType = 'user';
          }
          localStorage.setItem('userType', userType);
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


declareInterest = () => {
  const selectOffice = document.querySelector('#office');
  const selectParty = document.querySelector('#party');
  const manifesto = document.querySelector('#manifesto');
  const submitBtn = document.querySelector('#submitBtn');
  if (!token) {
    window.location.href = '../pages/auth/sign-in.html';
  } else {
    fetch(`${baseUrl}/offices`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then((response) => {
        if (response.status === 200) {
          for (let i = 0; i < response.data.length; i += 1) {
            const officeId = response.data[i].id;
            const officeName = response.data[i].name;
            selectOffice.innerHTML += `<option value="${officeId}">${officeName}</option>`;
          }
        }
      })
      .catch(error => console.log(error));
    fetch(`${baseUrl}/parties`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then((response) => {
        if (response.status === 200) {
          for (let i = 0; i < response.data.length; i += 1) {
            const partyId = response.data[i].id;
            const partyName = response.data[i].name;
            selectParty.innerHTML += `<option value="${partyId}">${partyName}</option>`;
          }
        }
      })
      .catch(error => console.log(error));

    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      submitBtn.disabled = true;

      fetch(`${baseUrl}/user/${token}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then((response) => {
          if (response.status === 200) {
            const userId = response.data[0].id;
            localStorage.setItem('userId', userId);
          } else {
            const logoutUrl = '../pages/auth/sign-in.html';
            window.location.href = logoutUrl;
          }
        })
        .catch(error => console.error(error));
      
      const officeChoice = selectOffice.options[selectOffice.selectedIndex].value;
      const partyChoice = selectParty.options[selectParty.selectedIndex].value;
      const manifestoValue = manifesto.value;
      const userId = localStorage.getItem('userId');

      const declareBody = {
        office: officeChoice,
        party: partyChoice,
        manifesto: manifestoValue,
      };

      fetch(`${baseUrl}/office/${userId}/declare`, {
        method: 'POST',
        body: JSON.stringify(declareBody),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then((response) => {
          if (response.status === 201) {
            window.location.reload();
          } else {
            console.log(response);
          }
        })
        .catch(error => console.error(error));
    });
  }
};

officeCandidates = () => {
  const { search } = window.location;
  const tokenPart = search.split('=');
  const officeId = tokenPart[1];
  const userPrivilege = localStorage.getItem('userType');
  const candidateTable = document.querySelector('#table');
  const officeNameHeader = document.querySelector('#office_name');
  fetch(`${baseUrl}/offices/${officeId}/${userPrivilege}`, {
    method: 'GET',
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status === 200) {
        officeNameHeader.innerHTML = `Candidates running for the  ${response.data[0].officename} position`;
        for (let i = 0; i < response.data.length; i += 1) {
          const candidateId = response.data[i].candidate_id;
          candidateTable.innerHTML += `<tr>
          <td>${camelCase(response.data[i].candidatename)}</td>
          <td>${camelCase(response.data[i].partyname)}</td>
          <td>
            <a href="#" class="small-success-button" title="Vote Candidate">Vote</a>
            <a href="view-candidate.html" class="small-default-button" title="View Candidate">View</a>
          </td>
        </tr>`;
        }
      } else if (response.status === 404) {
        candidateTable.innerHTML += `<tr>
        <td>No candidate found</td>
        </tr>`;
      }
    })
    .catch(error => console.error(error));
};
