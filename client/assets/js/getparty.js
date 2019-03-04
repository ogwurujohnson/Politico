/* eslint-disable no-undef */
const baseUrl = 'https://better-politico.herokuapp.com/api/v1';

getSpecificParty = () => {
  const { search } = window.location;
  const tokenPart = search.split('=');
  const partyId = tokenPart[1];

  fetch(`${baseUrl}/parties/${partyId}`, {
    method: 'GET',
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status === 200) {
        console.log(response);
      } else if (response.status === 404) {
        console.log('not found');
      }
    })
    .catch(error => console.error(error));
};
