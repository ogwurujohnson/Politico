let mainNav = document.querySelector('#menu');

let navBarToggle = document.querySelector('#toggle');

navBarToggle.addEventListener('click', () => {
  mainNav.classList.toggle('active');
});