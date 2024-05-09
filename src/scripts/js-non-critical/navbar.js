'use strict';

const navBar = document.getElementById("navbar");
const navbarToggler = document.querySelector('.navbar__toggler');
const navList = document.querySelector('.navbar__collapse');
const navLinks = document.querySelectorAll('.navbar__nav-link');
const home = document.getElementById("home");

// Show or hide the collapsible navbar when toggler is clicked
navbarToggler.addEventListener('click', (event) => {
  navList.classList.toggle('is-opened');
  if (navList.style.maxHeight) {
    navList.style.maxHeight = null;
    navbarToggler.setAttribute('aria-expanded', 'false');
    negativeTabIndex(); //set the navlinks to be aria-hidden and tab-index = -1
  } else {
    navList.style.maxHeight = navList.scrollHeight + "px";
    navbarToggler.setAttribute('aria-expanded', 'true');
    zeroTabIndex(); //set the navlinks NOT to be aria-hidden and tab-index = 0
  }
  event.stopPropagation();
});



// Functions to change the tabindex and aria-hidden attribute of navlinks
function negativeTabIndex() {
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].setAttribute('tabindex', '-1');
    navLinks[i].setAttribute('aria-hidden', 'true');
  }
}

function zeroTabIndex() {
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].setAttribute('tabindex', '0');
    navLinks[i].setAttribute('aria-hidden', 'false');
  }
}

function removeTabIndex() {
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].removeAttribute('tabindex', '0');
    navLinks[i].removeAttribute('tabindex', '-1');
    navLinks[i].removeAttribute('aria-hidden', 'true');
    navLinks[i].removeAttribute('aria-hidden', 'false');
  }
}

// Function to close the collapsible navbar
function closeNavbar() {
  if (navList.classList.contains('is-opened')) {
    navList.style.maxHeight = null;
    navList.classList.remove('is-opened');
    navbarToggler.setAttribute('aria-expanded', 'false');
    negativeTabIndex();
  }
}



// Hide the collapsible navbar when the nav link is clicked 
// or when the user clicks anywhere outside of the navbar
document.addEventListener('click', () => {
  closeNavbar();
});



// For keyboard user, close the navbar if the key "TAB" is pressed
// let the navbar stay open if the key "SHIFT" + "TAB" are pressed
const findusLink = document.getElementById('findus-link');
findusLink.addEventListener('keydown', closeNavbarByTab);

function closeNavbarByTab(event) {
  const keyCode = event.keyCode || event.which;
  if (event.shiftKey && event.keyCode == 9) { // Check if the key pressed is 'tab'
    // act normally if pressing "shift" + "tab" (going backwards)
  } else if (keyCode === 9) {
    closeNavbar();
  }
}



// ** On Screen resize
// Close the navbar when the page is loaded or the screen is re-sized
// On small screen, set the aria-expanded attribute of the toggler, set the navlinks to be aria-hidden and tab-index = -1
// On large screen, remove the aria-expanded attribute of the toggler, remove aria-hidden and tab-index attributes of navlinks
window.addEventListener('load', checkScreenSize);
window.addEventListener('resize', checkScreenSize);

function checkScreenSize() {
  closeNavbar();

  let screenWidth = window.innerWidth;
  if (screenWidth <= 576) {
    addAriaExpandedAttributes();
    negativeTabIndex();
  } else {
    removeAriaExpandedAttributes();
    removeTabIndex();
  }
}

function addAriaExpandedAttributes() {
  navbarToggler.setAttribute('aria-expanded', 'false');
}

function removeAriaExpandedAttributes() {
  navbarToggler.removeAttribute('aria-expanded', 'false');
}

// Adjust the padding top of the hero image according to the screen size
window.onresize = function () {
  // Update the screenWidth variable with the current window width
  let screenWidth = window.innerWidth;

  // Check the screenWidth and adjust value of paddingTop accordingly
  if (screenWidth <= 350 || (screenWidth <= 600 && screenWidth > 450)) {
    home.style.paddingTop = "70px";
  } else {
    home.style.paddingTop = "0px";
  }
}



// ** On Scroll
// On screen wider than 900px, when the user scrolls down, hide the navbar. When the user scrolls up, show the navbar 
let prevScrollPos = window.scrollY;

window.onscroll = function () {
  let currentScrollPos = window.scrollY;
  let screenWidth = window.innerWidth;

  if (screenWidth > 900) {
    if (prevScrollPos > currentScrollPos) {
      navbar.style.top = "0";
    } else {
      navbar.style.top = "-500px";
    }
  }

  prevScrollPos = currentScrollPos;
}