let mainNav = document.querySelector('#menu');

let navBarToggle = document.querySelector('#toggle');

navBarToggle.addEventListener('click', () => {
  mainNav.classList.toggle('active');
});


function closeNotification() {
  let closeBtn = document.querySelector('.closebtn');
  let feedback = document.querySelector('.feedback');
  feedback.style.display = 'none';
}

