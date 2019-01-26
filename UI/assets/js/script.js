let mainNav = document.querySelector('#menu');

let navBarToggle = document.querySelector('#toggle');

navBarToggle.addEventListener('click', () => {
  mainNav.classList.toggle('active');
});


let closeBtn = document.querySelector('.closebtn');
let feedback = document.querySelector('.feedback');

closeBtn.addEventListener('click', () => {
  feedback.style.display='none';
});