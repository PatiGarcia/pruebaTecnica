const navBar = document.querySelector('.nav--page-header');
const navBtn = document.querySelector('.nav-btn');
navBtn.addEventListener('click', function() {
  this.classList.toggle('open');
  navBar.classList.toggle('nav--open');
});