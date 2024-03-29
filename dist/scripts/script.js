'use strict';

// year for the footer (copyright)
var copyrightDate = new Date();
var copyrightYear = copyrightDate.getFullYear();
document.getElementById("year").textContent = copyrightYear;
'use strict';

window.addEventListener('load', function () {
  // hide the loader
  document.querySelector('.loader__container').style.display = 'none';
  // show the content
  document.querySelector('.website-content').classList.remove('website-content--hidden');
});
'use strict';

var navbarToggler = document.querySelector('.navbar__toggler');
var navList = document.querySelector('.navbar__collapse');
var navLinks = document.querySelectorAll('.navbar__nav-link');

// Show or hide the collapsible navbar when toggler is clicked
navbarToggler.addEventListener('click', function (event) {
  navList.classList.toggle('is-opened');
  if (navList.style.maxHeight) {
    navList.style.maxHeight = null;
    navbarToggler.setAttribute('aria-expanded', 'false');
    negativeTabIndex();
  } else {
    navList.style.maxHeight = navList.scrollHeight + "px";
    navbarToggler.setAttribute('aria-expanded', 'true');
    zeroTabIndex();
  }
  event.stopPropagation();
});

// Hide the collapsible navbar when the nav link is clicked 
// or when the user clicks anywhere outside of the navbar
document.addEventListener('click', function () {
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
    negativeTabIndex();
  }
}
var findusLink = document.getElementById('findus-link');
findusLink.addEventListener('keydown', closeNavbar());

// When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar 
var prevScrollpos = window.scrollY;
window.onscroll = function () {
  var currentScrollPos = window.scrollY;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-500px";
    closeNavbar();
  }
  prevScrollpos = currentScrollPos;
};

// add or remove aria-attributes values of menu toggler
function addDefaultAriaAttributes() {
  navbarToggler.setAttribute('aria-expanded', 'false');
}
function removeDefaultAriaAttributes() {
  navbarToggler.removeAttribute('aria-expanded', 'false');
}

// tabindex of navlinks
function zeroTabIndex() {
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].setAttribute('tabindex', '0');
  }
}
function negativeTabIndex() {
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].setAttribute('tabindex', '-1');
  }
}
window.addEventListener('load', checkScreenSize);
// when the screen re-sizes, close navbar, set tabindex to -1, and add or remove aria-attributes
window.addEventListener('resize', checkScreenSize);
function checkScreenSize() {
  closeNavbar();
  var screenWidth = window.innerWidth;
  if (screenWidth <= 576) {
    addDefaultAriaAttributes();
  } else {
    removeDefaultAriaAttributes();
  }
}
'use strict';

//carousel for small & medium menu
var slideIndex = 1;
showSlides(slideIndex);
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("small-menu__slide");
  var dots = document.getElementsByClassName("small-menu__slideshow-dot");
  if (n > slides.length || slideIndex > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" slideshow-dot--active", "");
    dots[i].setAttribute('aria-selected', 'false');
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " slideshow-dot--active";
  dots[slideIndex - 1].setAttribute('aria-selected', 'true');
}
function autoplay() {
  slideIndex++;
  showSlides();
}
var timer = setInterval(autoplay, 3500);
function resetTimer() {
  clearInterval(timer);
  timer = setInterval(autoplay, 3500);
}
function plusSlides(n) {
  showSlides(slideIndex += n);
  resetTimer();
}
function currentSlide(n) {
  showSlides(slideIndex = n);
  resetTimer();
}
'use strict';

function openMenu(event, menuName) {
  var i, menutabs, menus;
  menutabs = document.getElementsByClassName("large-menu__tab");
  for (i = 0; i < menutabs.length; i++) {
    menutabs[i].classList.remove("large-menu__tab--active");
    menutabs[i].setAttribute('aria-selected', 'false');
  }
  event.currentTarget.classList.add("large-menu__tab--active");
  event.currentTarget.setAttribute('aria-selected', 'true');
  menus = document.getElementsByClassName("large-food-menu");
  for (i = 0; i < menus.length; i++) {
    menus[i].style.display = "none";
  }
  document.getElementById(menuName).style.display = "grid";
}
document.getElementById("pasta-tab").click();
'use strict';

var menuAccordion = document.getElementsByClassName("small-menu__accordion");

// open the accordion when the website is loaded
window.addEventListener('load', openMenuPanel);
function openMenuPanel() {
  for (var i = 0; i < menuAccordion.length; i++) {
    if (menuAccordion[i].classList.contains("small-menu__accordion--active")) {
      menuAccordion[i].setAttribute('aria-expanded', 'true');
      var menuPanel = menuAccordion[i].nextElementSibling;
      menuPanel.style.maxHeight = menuPanel.scrollHeight + "px";
      menuPanel.classList.add("small-menu__panel--open");
      menuPanel.setAttribute('role', 'region');
    }
  }
}
;

// open or close the accordion through clicks
for (var i = 0; i < menuAccordion.length; i++) {
  menuAccordion[i].addEventListener("click", function () {
    this.classList.toggle("small-menu__accordion--active");

    // toggle aria-expanded value
    var expanded = this.getAttribute('aria-expanded');
    if (expanded === 'true') {
      this.setAttribute('aria-expanded', 'false');
    } else {
      this.setAttribute('aria-expanded', 'true');
    }
    ;

    // toggle open or close panel, and aria-hidden value
    var menuPanel = this.nextElementSibling;
    if (menuPanel.classList.contains("small-menu__panel--open")) {
      menuPanel.style.maxHeight = null;
      menuPanel.classList.remove("small-menu__panel--open");
      menuPanel.removeAttribute('role', 'region');
    } else {
      menuPanel.style.maxHeight = menuPanel.scrollHeight + "px";
      menuPanel.classList.add("small-menu__panel--open");
      menuPanel.setAttribute('role', 'region');
    }
  });
}

// when the screen re-sizes, open the accordion
window.addEventListener('resize', handleResize);
function handleResize() {
  var screenWidth = window.innerWidth;
  if (screenWidth <= 450) {
    openMenuPanel();
  }
}
"use strict";

// default date and time values in reservation form
// get date of today
var dateOfToday = new Date();
var tdyDay = dateOfToday.getDay();
var tdyDate = dateOfToday.getDate();
var tdyMth = dateOfToday.getMonth() + 1;
var tdyYear = dateOfToday.getFullYear();
var tdyHour = dateOfToday.getHours();

//make the date and/or month in 2-digit format
if (tdyDate < 10) {
  tdyDate = "0" + tdyDate;
}
if (tdyMth < 10) {
  tdyMth = "0" + tdyMth;
}
var today = tdyYear + "-" + tdyMth + "-" + tdyDate;

// get date of tomorrow
var dateOfTmr = new Date(new Date().setDate(dateOfToday.getDate() + 1));
var tmrDate = dateOfTmr.getDate();
var tmrMth = dateOfTmr.getMonth() + 1;
var tmrYear = dateOfTmr.getFullYear();

//make the date and/or month in 2-digit format
if (tmrDate < 10) {
  tmrDate = "0" + tmrDate;
}
if (tmrMth < 10) {
  tmrMth = "0" + tmrMth;
}
var tomorrow = tmrYear + "-" + tmrMth + "-" + tmrDate;

// date picker - set default date (.value) and prevent choosing invalid dates (.min)
var dateInput = document.getElementById('date');
switch (tdyDay) {
  case 0:
    //Sunday
    if (tdyHour > 15) {
      dateInput.value = tomorrow;
      dateInput.min = tomorrow;
    } else {
      dateInput.value = today;
      dateInput.min = today;
    }
    break;
  case 5:
  case 6:
    //Friday & Saturday
    if (tdyHour > 19) {
      dateInput.value = tomorrow;
      dateInput.min = tomorrow;
    } else {
      dateInput.value = today;
      dateInput.min = today;
    }
    break;
  default:
    //Monday to Thursday
    if (tdyHour > 18) {
      dateInput.value = tomorrow;
      dateInput.min = tomorrow;
    } else {
      dateInput.value = today;
      dateInput.min = today;
    }
}

// time picker - set default time (.defaultValue) and prevent choosing invalid hours (.min: before opening time / during operating time)
var timeInput = document.getElementById('time');
// const defaultTime = (tdyHour + 2) + ":" + ("00"); //default time
var validHour = tdyHour + 1 + ":" + "00"; //valid booking time

// for the same day (today), set the default time to 12nn before noon, or an hour later after noon
if (dateInput.value === today) {
  if (tdyHour > 11) {
    timeInput.defaultValue = validHour;
    timeInput.min = validHour;
  } else {
    timeInput.defaultValue = "12:00";
    timeInput.min = "12:00";
  }
} else {
  // for another day (tomorrow), set the default time to 12nn
  timeInput.value = "12:00";
  timeInput.min = "12:00";
}

// time picker - prevent choosing invalid hours (.max: before closing time)
// booking using default date
if (tdyDay === 0) {
  // Sunday
  timeInput.max = '16:00';
} else if (tdyDay === 5 || tdyDay === 6) {
  // Friday & Saturday
  timeInput.max = '20:00';
} else {
  // Monday to Thursday
  timeInput.max = '19:00';
}

//booking using new date
dateInput.addEventListener('input', function (event) {
  var selectedDate = new Date(event.target.value);
  var dayOfWeek = selectedDate.getDay();
  timeInput.min = '12:00';
  if (dayOfWeek === 0) {
    // Sunday
    timeInput.max = '16:00';
  } else if (dayOfWeek === 5 || dayOfWeek === 6) {
    // Friday & Saturday
    timeInput.max = '20:00';
  } else {
    // Any other day
    timeInput.max = '19:00';
  }
});
'use strict';

// check the form onsubmit
function formSubmitted() {
  alert("Thanks for choosing our restaurant!\nWe will contact you shortly to confirm your reservation.");
}
'use strict';

// textarea in reservation form
var textarea = document.getElementById('message');
function clearPlaceholder() {
  // Check if the current value is equal to the placeholder text
  if (textarea.value.trim() === '(e.g. Dietary Restriction, Special Occasions)') {
    textarea.value = ''; // Clear the text
  }

  // Remove the onfocus event to prevent further clearing
  textarea.removeEventListener('focus', clearPlaceholder);
}

// Add an event listener to reset the placeholder if the textarea is empty when it loses focus
textarea.addEventListener('blur', function () {
  if (textarea.value.trim() === '') {
    textarea.value = '(e.g. Dietary Restriction, Special Occasions)';
    textarea.addEventListener('focus', clearPlaceholder);
  }
});

// change color of textarea when user inputs
textarea.addEventListener('input', function () {
  if (textarea.value.trim() !== '') {
    textarea.classList.add('input');
  } else {
    textarea.classList.remove('input');
  }
});
"use strict";

var submitButton = document.getElementById('formSumbitButton');
var nameInput = document.getElementById("name");
var nameError = document.getElementById("name-error");
var phoneNumberInput = document.getElementById("tel");
var phoneNumberError = document.getElementById("phone-error");
var emailInput = document.getElementById("email");
var emailError = document.getElementById("email-error");
var dateError = document.getElementById("date-error");
var timeError = document.getElementById("time-error");

// first validation on submit
submitButton.addEventListener('click', function (event) {
  var trimmedValue = nameInput.value.trim(); // Trim the input value

  //validate name input
  if (nameInput.validity.patternMismatch || trimmedValue.length < 2 || nameInput.value === '') {
    event.preventDefault(); // Prevent form submission if there are validation errors
    nameInput.classList.add('error-input');
    nameInput.setAttribute('aria-describedby', 'name-error');
    nameInput.setAttribute('aria-invalid', 'true');
    nameError.style.display = "block";
  } else {
    nameInput.classList.remove('error-input');
    nameError.style.display = "none";
  }

  //validate phone number input
  if (phoneNumberInput.validity.patternMismatch || phoneNumberInput.value === '') {
    event.preventDefault(); // Prevent form submission if there are validation errors
    phoneNumberInput.classList.add('error-input');
    phoneNumberInput.setAttribute('aria-describedby', 'phone-error');
    phoneNumberInput.setAttribute('aria-invalid', 'true');
    phoneNumberError.style.display = "block";
  } else {
    phoneNumberInput.classList.remove('error-input');
    phoneNumberError.style.display = "none";
  }

  //validate email input
  if (emailInput.validity.patternMismatch || emailInput.value === '') {
    event.preventDefault(); // Prevent form submission if there are validation errors
    emailInput.classList.add('error-input');
    emailInput.setAttribute('aria-describedby', 'email-error');
    emailInput.setAttribute('aria-invalid', 'true');
    emailError.style.display = "block";
  } else {
    emailInput.classList.remove('error-input');
    emailError.style.display = "none";
  }

  //validate date input
  // Get the selected date from the date input field
  var selectedDate = new Date(dateInput.value);
  // Get the minimum allowed date from the min attribute of the date input field
  var minDate = new Date(dateInput.min);

  // Check if the selected date
  if (selectedDate < minDate || selectedDate === '') {
    event.preventDefault();
    dateInput.classList.add('error-input');
    dateInput.setAttribute('aria-describedby', 'date-error');
    dateInput.setAttribute('aria-invalid', 'true');
    dateError.style.display = "block";
  } else {
    dateInput.classList.remove('error-input');
    dateError.style.display = "none";
  }

  //validate time input
  // Get the selected time from the time input field
  var selectedTime = timeInput.value;
  // Get the minimum allowed time from the min attribute of the time input field
  var minTime = timeInput.min;
  // Get the maximum allowed time from the max attribute of the time input field
  var maxTime = timeInput.max;

  // Check if the selected time
  if (selectedTime < minTime || selectedTime > maxTime || selectedTime === '') {
    event.preventDefault();
    timeInput.classList.add('error-input');
    timeInput.setAttribute('aria-describedby', 'time-error');
    timeInput.setAttribute('aria-invalid', 'true');
    timeError.style.display = "block";
  } else {
    timeInput.classList.remove('error-input');
    timeError.style.display = "none";
  }

  // Add the input event listener after first submission
  nameInput.addEventListener('input', nameInputEvent);
  phoneNumberInput.addEventListener('input', phoneNumberInputEvent);
  emailInput.addEventListener('input', emailInputEvent);
  dateInput.addEventListener('input', dateInputEvent);
  timeInput.addEventListener('input', timeInputEvent);
});
function nameInputEvent() {
  var letterPattern = /^[A-Za-z ]+$/;
  var trimmedValue = nameInput.value.trim(); // Trim the input value

  if (trimmedValue.length > 1 && letterPattern.test(trimmedValue)) {
    nameInput.classList.remove('error-input');
    nameInput.removeAttribute('aria-describedby', 'name-error');
    nameInput.removeAttribute('aria-invalid', 'true');
    nameError.style.display = "none";
  } else {
    nameInput.classList.add('error-input');
    nameInput.setAttribute('aria-describedby', 'name-error');
    nameInput.setAttribute('aria-invalid', 'true');
    nameError.style.display = "block";
  }
}
function phoneNumberInputEvent() {
  var numberPattern = /[0-9+]/g;
  if (phoneNumberInput.value.length > 6 && numberPattern.test(phoneNumberInput.value)) {
    phoneNumberInput.classList.remove('error-input');
    phoneNumberInput.removeAttribute('aria-describedby', 'phone-error');
    phoneNumberInput.removeAttribute('aria-invalid', 'true');
    phoneNumberError.style.display = "none";
  } else {
    phoneNumberInput.classList.add('error-input');
    phoneNumberInput.setAttribute('aria-describedby', 'phone-error');
    phoneNumberInput.setAttribute('aria-invalid', 'true');
    phoneNumberError.style.display = "block";
  }
}
function emailInputEvent() {
  var emailPattern = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;
  if (emailPattern.test(emailInput.value)) {
    emailInput.classList.remove('error-input');
    emailInput.removeAttribute('aria-describedby', 'email-error');
    emailInput.removeAttribute('aria-invalid', 'true');
    emailError.style.display = "none";
  } else {
    emailInput.classList.add('error-input');
    emailInput.setAttribute('aria-describedby', 'email-error');
    emailInput.setAttribute('aria-invalid', 'true');
    emailError.style.display = "block";
  }
}
function dateInputEvent() {
  // Get the selected date from the date input field
  var selectedDate = new Date(dateInput.value);
  // Get the minimum allowed date from the min attribute of the date input field
  var minDate = new Date(dateInput.min);
  if (selectedDate >= minDate) {
    dateInput.classList.remove('error-input');
    dateInput.removeAttribute('aria-describedby', 'date-error');
    dateInput.removeAttribute('aria-invalid', 'true');
    dateError.style.display = "none";
  } else {
    dateInput.classList.add('error-input');
    dateInput.setAttribute('aria-describedby', 'date-error');
    dateInput.setAttribute('aria-invalid', 'true');
    dateError.style.display = "block";
  }
}
function timeInputEvent() {
  // Get the selected time from the time input field
  var selectedTime = timeInput.value;
  // Get the minimum allowed time from the min attribute of the time input field
  var minTime = timeInput.min;
  // Get the maximum allowed time from the max attribute of the time input field
  var maxTime = timeInput.max;
  if (selectedTime > minTime && selectedTime < maxTime) {
    timeInput.classList.remove('error-input');
    timeInput.removeAttribute('aria-describedby', 'time-error');
    timeInput.removeAttribute('aria-invalid', 'true');
    timeError.style.display = "none";
  } else {
    timeInput.classList.add('error-input');
    timeInput.setAttribute('aria-describedby', 'time-error');
    timeInput.setAttribute('aria-invalid', 'true');
    timeError.style.display = "block";
  }
}
//# sourceMappingURL=script.js.map
