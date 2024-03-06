// Show or hide the collapsible navbar when toggler is clicked
const navbarToggler = document.querySelector('.navbar__toggler');
const navList = document.querySelector('.navbar__collapse');

navbarToggler.addEventListener('click', (event) => {
  navList.classList.toggle('is-opened');
  if (navList.style.maxHeight) {
    navList.style.maxHeight = null;
  } else {
    navList.style.maxHeight = navList.scrollHeight + "px";
  } 
  event.stopPropagation();
});


// Hide the collapsible navbar when the nav link is clicked 
// or when the user clicks anywhere outside of the navbar
const navLinks = document.querySelectorAll('.navbar__nav-link');

document.addEventListener('click', () => {
  if (navList.classList.contains('is-opened')) {
    closeNavbar();
  }
});

// Function to close the navbar
function closeNavbar() {
  if (navList.classList.contains('is-opened')) {
    navList.style.maxHeight = null;
    navList.classList.remove('is-opened');
  }
}


// When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar 
var prevScrollpos = window.scrollY;
window.onscroll = function () {
  var currentScrollPos = window.scrollY;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-500px";
  }
  prevScrollpos = currentScrollPos;
}