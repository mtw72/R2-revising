const navbarToggler = document.querySelector('.navbar__toggler');
const navList = document.querySelector('.navbar__collapse');

// Show or hide the collapsible navbar when toggler is clicked
navbarToggler.addEventListener('click', (event) => {
  navList.classList.toggle('is-opened');
  if (navList.style.maxHeight) {
    navList.style.maxHeight = null;
    navbarToggler.setAttribute('aria-expanded', 'false');
    navList.setAttribute('aria-hidden', 'true');
  } else {
    navList.style.maxHeight = navList.scrollHeight + "px";
    navbarToggler.setAttribute('aria-expanded', 'true');
    navList.setAttribute('aria-hidden', 'false');
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

// Function to close the collapsible navbar
function closeNavbar() {
  if (navList.classList.contains('is-opened')) {
    navList.style.maxHeight = null;
    navList.classList.remove('is-opened');
    navbarToggler.setAttribute('aria-expanded', 'false');
    navList.setAttribute('aria-hidden', 'true');
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


// add the aria-attributes values to toggler and navlist onload
window.addEventListener('load', checkScreenSize);

function addDefaultAriaAttributes() {
  navbarToggler.setAttribute('aria-expanded', 'false');
  navList.setAttribute('aria-hidden', 'true');
}

function removeDefaultAriaAttributes() {
  navbarToggler.removeAttribute('aria-expanded', 'false');
  navList.removeAttribute('aria-hidden', 'true');
}

// when the screen re-sizes, close navbar, and add or remove aria-attributes
window.addEventListener('resize', closeNavbar);
window.addEventListener('resize', checkScreenSize);

function checkScreenSize() {
  let screenWidth = window.innerWidth;
  if (screenWidth <= 576) {
    addDefaultAriaAttributes();
  } else {
    removeDefaultAriaAttributes();
  }
}