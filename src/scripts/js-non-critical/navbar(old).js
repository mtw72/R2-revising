// 'use strict';

// // Get the elements inside the navbar and the home section
// const navBar = document.getElementById("navbar");
// const navbarToggler = document.querySelector('.navbar__toggler');
// const navList = document.querySelector('.navbar__collapse');
// const navLinks = document.querySelectorAll('.navbar__nav-link');
// const findusLink = document.getElementById('findus-link');
// const home = document.getElementById("home");

// // Show or hide the collapsible navbar when toggler is clicked
// navbarToggler.addEventListener('click', (event) => {
//     // Toggle the visibility of navList
//     navList.classList.toggle('is-opened');
//     if (navList.style.maxHeight) {
//         // If navList is open, close it
//         navList.style.maxHeight = null;
//         // Set the toggler NOT to be aria-expanded
//         togglerAriaNotExpanded();
//         // Set the navlinks to be aria-hidden and tab-index = -1
//         navLinkAriaHidden();
//     } else {
//         // If navList is closed, open it
//         navList.style.maxHeight = navList.scrollHeight + "px";
//         // Set the toggler to be aria-expanded
//         togglerAriaExpanded();
//         // Set the navlinks NOT to be aria-hidden and tab-index = 0
//         navLinkAriaNotHidden();
//     }
//     event.stopPropagation();
// });

// // Hide the collapsible navbar when the nav link is clicked or when the user clicks anywhere outside of the navbar
// document.addEventListener('click', closeNavbar);

// // For keyboard user, close the navbar if the key "TAB" is pressed
// // let the navbar stay open if the key "SHIFT" + "TAB" are pressed
// findusLink.addEventListener('keydown', closeNavbarByTab);

// // On Scroll
// // On screen wider than 900px, when the user scrolls down, hide the navbar.
// // Show the navbar when the user scrolls up
// let prevScrollPos = window.scrollY;

// window.onscroll = function () {
//     let currentScrollPos = window.scrollY;
//     let screenWidth = window.innerWidth;

//     if (screenWidth > 900) {
//         if (prevScrollPos > currentScrollPos) {
//             navbar.style.top = "0";
//         } else {
//             navbar.style.top = "-500px";
//         }
//     }

//     prevScrollPos = currentScrollPos;
// }

// // On screen resize,
// // 1. Close the navbar
// // 2. Check the screen size and assign appropriate aria attributes to HTML elements
// // 3. Check if needed to adjust the padding-top value of hero-image
// window.addEventListener('resize', function () {
//     closeNavbar();
//     checkScreenSize();
//     adjustHeroImagePadding();
// });

// //Check the screen size onload and assign appropriate aria attributes to HTML elements
// window.addEventListener('load', checkScreenSize);

// // Functions to set / remove the aria attribute(s) of toggler (aria-expanded)
// function togglerAriaExpanded() {
//     navbarToggler.setAttribute('aria-expanded', 'true');
// }

// function togglerAriaNotExpanded() {
//     navbarToggler.setAttribute('aria-expanded', 'false');
// }

// function togglerAriaRemoved() {
//     navbarToggler.removeAttribute('aria-expanded', 'true');
//     navbarToggler.removeAttribute('aria-expanded', 'false');
// }

// // Functions to set / remove the aria attributes of navlinks (tabindex and aria-hidden)
// function navLinkAriaHidden() {
//     for (let i = 0; i < navLinks.length; i++) {
//         navLinks[i].setAttribute('tabindex', '-1');
//         navLinks[i].setAttribute('aria-hidden', 'true');
//     }
// }

// function navLinkAriaNotHidden() {
//     for (let i = 0; i < navLinks.length; i++) {
//         navLinks[i].setAttribute('tabindex', '0');
//         navLinks[i].setAttribute('aria-hidden', 'false');
//     }
// }

// function navLinkAriaRemoved() {
//     for (let i = 0; i < navLinks.length; i++) {
//         navLinks[i].removeAttribute('tabindex', '0');
//         navLinks[i].removeAttribute('tabindex', '-1');
//         navLinks[i].removeAttribute('aria-hidden', 'true');
//         navLinks[i].removeAttribute('aria-hidden', 'false');
//     }
// }

// // Function to close the collapsible navbar
// function closeNavbar() {
//     if (navList.classList.contains('is-opened')) {
//         navList.style.maxHeight = null;
//         navList.classList.remove('is-opened');
//         togglerAriaNotExpanded();
//         navLinkAriaHidden();
//     }
// }

// // For keyboard user, close the navbar if the key "TAB" is pressed
// // let the navbar stay open if the key "SHIFT" + "TAB" are pressed
// function closeNavbarByTab(event) {
//     const keyCode = event.keyCode || event.which;
//     // Check if the key pressed is 'tab'
//     if (event.shiftKey && event.keyCode == 9) {
//         // Act normally if pressing "shift" + "tab" (going backwards)
//     } else if (keyCode === 9) {
//         closeNavbar();
//     }
// }

// // Function to adjust the padding top of the hero image according to the screen size
// function adjustHeroImagePadding() {
//     // Update the screenWidth variable with the current window width
//     let screenWidth = window.innerWidth;

//     // Check the screenWidth and adjust value of paddingTop accordingly
//     if (screenWidth <= 350 || (screenWidth <= 600 && screenWidth > 450)) {
//         home.style.paddingTop = "70px";
//     } else {
//         home.style.paddingTop = "0px";
//     }
// }

// // Function to check the screen size and assign aria attributes to HTML elements
// // For use when onload and onresize
// function checkScreenSize() {
//     let screenWidth = window.innerWidth;
//     // On small screen, set the toggler to be aria-expanded,
//     // set the navlinks to be aria-hidden and tab-index = -1
//     if (screenWidth <= 576) {
//         togglerAriaNotExpanded();
//         navLinkAriaHidden();
//     }
//     // On large screen, remove the aria-expanded attribute of the toggler,
//     // remove aria-hidden and tab-index attributes of navlinks
//     else {
//         togglerAriaRemoved();
//         navLinkAriaRemoved();
//     }
// }