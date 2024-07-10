'use strict';

// ******** VARIABLES ******** //

// Get the elements inside the navbar and the home section
const navbar = document.getElementById("navbar");
const navbarToggler = document.querySelector('.navbar__toggler');
const navList = document.querySelector('.navbar__collapse');
const navLinks = document.querySelectorAll('.navbar__nav-link');
const home = document.getElementById("home");
let screenWidth, currentScrollPos;

// ******** EVENT LISTENERS ******** //

// Show or hide the collapsible navbar when toggler is clicked
navbarToggler.addEventListener('click', (event) => {
  // Toggle the visibility of navList
  navList.classList.toggle('is-opened');
  if (navList.style.maxHeight) {
    // If navList is open, close it
    navList.style.maxHeight = null;
    // Set the toggler NOT to be aria-expanded
    togglerAriaNotExpanded();
    // Set the navlinks to be aria-hidden and tabindex = -1
    navLinkAriaHidden();
  } else {
    // If navList is closed, open it
    navList.style.maxHeight = navList.scrollHeight + "px";
    // Focus on the first menu item
    navLinks[0].focus();
    // Set the toggler to be aria-expanded
    togglerAriaExpanded();
    // Set the navlinks NOT to be aria-hidden and tabindex = 0
    navLinkAriaNotHidden();
  }
  event.stopPropagation();
});

// Hide the collapsible navbar when the nav link is clicked or when the user clicks anywhere outside of the navbar
document.addEventListener('click', closeNavbar);

// For keyboard user, close the navbar if the key "TAB" is pressed
// let the navbar stay open if the key "SHIFT" + "TAB" are pressed
// Close the navbar on "TAB" key press
navLinks[navLinks.length - 1].addEventListener('keydown', (event) => {
  if (!event.shiftKey && event.key === 'Tab') {
    closeNavbar();
  }
});

//Check the screen size onload and assign appropriate aria attributes to HTML elements
window.addEventListener('load', checkScreenSize);

// Handle resize event with debounce
// 1. Close the navbar
// 2. Check the screen size and assign appropriate aria attributes to HTML elements
// 3. Check if needed to adjust the padding-top value of hero-image
window.addEventListener('resize', debounce(() => {
  closeNavbar();
  checkScreenSize();
  adjustHeroImagePadding();
  // if (window.innerWidth <= 900) {
  // Update the screenWidth variable with the current window width
  let screenWidth = window.innerWidth;
  if (screenWidth <= 350 || (screenWidth <= 600 && screenWidth > 450)) {
    navbar.style.top = "0";
  }
}, 50));

// Handle scroll event with debounce
// On screen wider than 900px, when the user scrolls down, hide the navbar.
// Show the navbar when the user scrolls up
let prevScrollPos = window.scrollY;
window.addEventListener('scroll', debounce(() => {
  let currentScrollPos = window.scrollY;

  // Update the screenWidth variable with the current window width
  let screenWidth = window.innerWidth;
  if (screenWidth > 650 || (screenWidth <= 450 && screenWidth > 350)) {
    navbar.style.top = prevScrollPos > currentScrollPos ? "0" : "-500px";
  }
  prevScrollPos = currentScrollPos;
}, 50));

// Close the open navbar menu by ESC key
window.addEventListener('keydown', (event) => {
  if (navList.classList.contains('is-opened')) {
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        closeNavbar();
    }
  }
});


// ******** FUNCTIONS ******** //

// Debounce function to avoid the bouncing effect
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Functions to set / remove the aria attribute(s) of toggler (aria-expanded)
function togglerAriaExpanded() {
  navbarToggler.setAttribute('aria-expanded', 'true');
}

function togglerAriaNotExpanded() {
  navbarToggler.setAttribute('aria-expanded', 'false');
}

function togglerAriaRemoved() {
  navbarToggler.removeAttribute('aria-expanded', 'true');
  navbarToggler.removeAttribute('aria-expanded', 'false');
}

// Functions to set / remove the aria attributes of navlinks (tabindex and aria-hidden)
function navLinkAriaHidden() {
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].setAttribute('tabindex', '-1');
    navLinks[i].setAttribute('aria-hidden', 'true');
  }
}

function navLinkAriaNotHidden() {
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].setAttribute('tabindex', '0');
    navLinks[i].setAttribute('aria-hidden', 'false');
  }
}

function navLinkAriaRemoved() {
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
    togglerAriaNotExpanded();
    navLinkAriaHidden();
  }
}

// Function to adjust the padding top of the hero image according to the screen size
function adjustHeroImagePadding() {
  // Update the screenWidth variable with the current window width
  let screenWidth = window.innerWidth;

  // Check the screenWidth and adjust value of paddingTop accordingly
  home.style.paddingTop = (screenWidth <= 350 || (screenWidth <= 600 && screenWidth > 450)) ? "70px" : "0px";
}

// Function to check the screen size and assign aria attributes to HTML elements
// For use when onload and onresize
function checkScreenSize() {
  let screenWidth = window.innerWidth;
  // On small screen, set the toggler to be aria-expanded,
  // set the navlinks to be aria-hidden and tabindex = -1
  if (screenWidth <= 576) {
    togglerAriaNotExpanded();
    navLinkAriaHidden();
  }
  // On large screen, remove the aria-expanded attribute of the toggler,
  // remove aria-hidden and tabindex attributes of navlinks
  else {
    togglerAriaRemoved();
    navLinkAriaRemoved();
  }
}