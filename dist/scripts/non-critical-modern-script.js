'use strict';

// year for the footer (copyright)
const copyrightDate = new Date();
let copyrightYear = copyrightDate.getFullYear();
document.getElementById("year").textContent = copyrightYear;

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
    navList.setAttribute('inert', 'true');
    navbarToggler.setAttribute('aria-expanded', 'false');
    negativeTabIndex();
  } else {
    navList.style.maxHeight = navList.scrollHeight + "px";
    navList.setAttribute('inert', 'false');
    navbarToggler.setAttribute('aria-expanded', 'true');
    zeroTabIndex();
  }
  event.stopPropagation();
});


// Hide the collapsible navbar when the nav link is clicked 
// or when the user clicks anywhere outside of the navbar
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
    navList.setAttribute('inert', 'true');
    navbarToggler.setAttribute('aria-expanded', 'false');
    negativeTabIndex();
  }
}

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

// When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar 
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

// adjust the padding top of the hero image according to the screen size
window.onresize = function () {
  // Update the screenWidth variable with the current window width
  let screenWidth = window.innerWidth;

  // Check the screenWidth and adjust paddingTop accordingly
  if (screenWidth <= 350 || screenWidth <= 600 && screenWidth > 450) {
    home.style.paddingTop = "70px";
  } else {
    home.style.paddingTop = "0px";
  }
}

// add or remove aria-attributes values of menu toggler
function addDefaultAriaAttributes() {
  navbarToggler.setAttribute('aria-expanded', 'false');
  navList.setAttribute('inert', 'true');
}

function removeDefaultAriaAttributes() {
  navbarToggler.removeAttribute('aria-expanded', 'false');
  navList.removeAttribute('inert', 'true');
}

// tabindex of navlinks
function zeroTabIndex() {
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].setAttribute('tabindex', '0');
    navLinks[i].setAttribute('aria-hidden', 'false');
  }
}

function negativeTabIndex() {
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].setAttribute('tabindex', '-1');
    navLinks[i].setAttribute('aria-hidden', 'true');
  }
}

window.addEventListener('load', checkScreenSize);
// when the screen re-sizes, close navbar, set tabindex to -1, and add or remove aria-attributes
window.addEventListener('resize', checkScreenSize);

function checkScreenSize() {
  closeNavbar();

  let screenWidth = window.innerWidth;
  if (screenWidth <= 576) {
    addDefaultAriaAttributes();
    negativeTabIndex();
  } else {
    removeDefaultAriaAttributes();
    zeroTabIndex();
  }
}
'use strict';

//carousel for small & medium menu
let slideIndex = 1;
showSlides(slideIndex);

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("small-menu__carousel__slide");
  let dots = document.getElementsByClassName("small-menu__carousel-dot");
  if (n > slides.length || slideIndex > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].className = slides[i].className.replace(" current-slide", "");
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" current-dot", "");
    dots[i].setAttribute('aria-current', 'false');
  }
  slides[slideIndex - 1].className += " current-slide";
  dots[slideIndex - 1].className += " current-dot";
  dots[slideIndex - 1].setAttribute('aria-current', 'true');
}

function autoplay() {
  slideIndex++;
  showSlides();
}

let timer = setInterval(autoplay, 3500)

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
  let i, menutabs, menus;

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

const menuAccordion = document.getElementsByClassName("small-menu__accordion");

// open the accordion when the website is loaded
window.addEventListener('load', openMenuPanel)

function openMenuPanel() {
  for (let i = 0; i < menuAccordion.length; i++) {
    if (menuAccordion[i].classList.contains("small-menu__accordion--active")) {
      menuAccordion[i].setAttribute('aria-expanded', 'true');
      let menuPanel = menuAccordion[i].nextElementSibling;
      menuPanel.style.maxHeight = menuPanel.scrollHeight + "px";
      menuPanel.style.border = "1px solid rgba(226, 186, 137, 0.842)";
      menuPanel.classList.add("small-menu__panel--open");
      menuPanel.setAttribute('role', 'region');
    }
  }
};


// open or close the accordion through clicks
for (let i = 0; i < menuAccordion.length; i++) {
  menuAccordion[i].addEventListener("click", function () {
    this.classList.toggle("small-menu__accordion--active");

    // toggle aria-expanded value
    let expanded = this.getAttribute('aria-expanded');
    if (expanded === 'true') {
      this.setAttribute('aria-expanded', 'false');
    } else {
      this.setAttribute('aria-expanded', 'true');
    };

    // toggle open or close panel, and aria-hidden value
    let menuPanel = this.nextElementSibling;
    if (menuPanel.classList.contains("small-menu__panel--open")) {
      menuPanel.style.maxHeight = null;
      menuPanel.classList.remove("small-menu__panel--open");
      menuPanel.style.border = "none";
      menuPanel.removeAttribute('role', 'region');
    } else {
      menuPanel.style.maxHeight = menuPanel.scrollHeight + "px";
      menuPanel.style.border = "1px solid rgba(226, 186, 137, 0.842)";
      menuPanel.classList.add("small-menu__panel--open");
      menuPanel.setAttribute('role', 'region');
    }
  });
}


// when the screen re-sizes, open the accordion
window.addEventListener('resize', handleResize);

function handleResize() {
  let screenWidth = window.innerWidth;
  if (screenWidth <= 450) {
    openMenuPanel();
  }
}
'use strict';

// default date and time values in reservation form
// get date of today
const dateOfToday = new Date();
const tdyDay = dateOfToday.getDay();
let tdyDate = dateOfToday.getDate();
let tdyMth = dateOfToday.getMonth() + 1;
const tdyYear = dateOfToday.getFullYear();
const tdyHour = dateOfToday.getHours();

//make the date and/or month in 2-digit format
if (tdyDate < 10) {
  tdyDate = "0" + tdyDate;
}
if (tdyMth < 10) {
  tdyMth = "0" + tdyMth;
}

const today = tdyYear + "-" + tdyMth + "-" + tdyDate;

// get date of tomorrow
const dateOfTmr = new Date(new Date().setDate(dateOfToday.getDate() + 1));
let tmrDate = dateOfTmr.getDate();
let tmrMth = dateOfTmr.getMonth() + 1;
const tmrYear = dateOfTmr.getFullYear();

//make the date and/or month in 2-digit format
if (tmrDate < 10) {
  tmrDate = "0" + tmrDate;
}
if (tmrMth < 10) {
  tmrMth = "0" + tmrMth;
}

const tomorrow = tmrYear + "-" + tmrMth + "-" + tmrDate;


// date picker - set default date (.value) and prevent choosing invalid dates (.min)
const dateInput = document.getElementById('date');

switch (tdyDay) {
  case 0: //Sunday
    if (tdyHour >= 15) {
      dateInput.value = tomorrow;
      dateInput.min = tomorrow;

    } else {
      dateInput.value = today;
      dateInput.min = today;
    }
    break;
  case 5:
  case 6: //Friday & Saturday
    if (tdyHour >= 19) {
      dateInput.value = tomorrow;
      dateInput.min = tomorrow;
    } else {
      dateInput.value = today;
      dateInput.min = today;
    }
    break;
  default: //Monday to Thursday
    if (tdyHour >= 18) {
      dateInput.value = tomorrow;
      dateInput.min = tomorrow;
    } else {
      dateInput.value = today;
      dateInput.min = today;
    }
}

dateInput.addEventListener('input', generateTimeOptions);

// 1801 missing the option
// time picker - set default time
// Function to pad single digit numbers with leading zero
function pad(number) {
  return (number < 10 ? '0' : '') + number;
}

// Function to check if current time is within restaurant opening hours
function isWithinOpeningHours(day, hour, minute) {
  const openingHours = {
    Sunday: { start: 1200, end: 1700 },
    Monday: { start: 1200, end: 2000 },
    Tuesday: { start: 1200, end: 2000 },
    Wednesday: { start: 1200, end: 2000 },
    Thursday: { start: 1200, end: 2000 },
    Friday: { start: 1200, end: 2100 },
    Saturday: { start: 1200, end: 2100 }
  };

  const currentTime = hour * 100 + minute;
  const { start, end } = openingHours[day];

  return currentTime >= start && currentTime <= end;
}

// Function to generate time options based on current day and time
function generateTimeOptions() {
  const now = new Date();
  const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][now.getDay()];
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const timeSelect = document.getElementById('time');
  const timeFirstOption = document.getElementById('time-first-option');

  // Clear existing options (if any)
  timeSelect.innerHTML = '';

  // Add initial option
  timeSelect.appendChild(timeFirstOption);

  if (dateInput.value === today) {
    switch (day) {
      case 0:
        for (let hour = 12; hour <= 16; hour++) {
          for (let minute = 0; minute < 60; minute += 15) {
            // Skip generating options for 4:15pm, 4:30pm, and 4:45pm
            if (hour === 16 && (minute === 15 || minute === 30 || minute === 45)) {
              continue;
            }

            const displayHour = (hour > 12) ? (hour - 12) : hour; // Convert to 12-hour format

            if (isWithinOpeningHours(day, hour, minute) && (hour > currentHour + 1 || (hour === currentHour + 1 && minute >= currentMinute))) {
              const optionText = displayHour + ':' + pad(minute) + 'pm';
              const option = new Option(optionText, optionText); // Set the value same as the text
              timeSelect.add(option);
            }
          }
        }
        break;
      case 5:
      case 6:
        for (let hour = 12; hour <= 20; hour++) {
          for (let minute = 0; minute < 60; minute += 15) {
            // Skip generating options for 8:15pm, 8:30pm, and 8:45pm
            if (hour === 20 && (minute === 15 || minute === 30 || minute === 45)) {
              continue;
            }
            const displayHour = (hour > 12) ? (hour - 12) : hour; // Convert to 12-hour format

            if (isWithinOpeningHours(day, hour, minute) && (hour > currentHour + 1 || (hour === currentHour + 1 && minute >= currentMinute))) {
              const optionText = displayHour + ':' + pad(minute) + 'pm';
              const option = new Option(optionText, optionText); // Set the value same as the text
              timeSelect.add(option);
            }
          }
        }
        break;
      default: //Monday to Thursday
        for (let hour = 12; hour <= 19; hour++) {
          for (let minute = 0; minute < 60; minute += 15) {
            // Skip generating options for 7:15pm, 7:30pm, and 7:45pm
            if (hour === 19 && (minute === 15 || minute === 30 || minute === 45)) {
              continue;
            }

            const displayHour = (hour > 12) ? (hour - 12) : hour; // Convert to 12-hour format

            if (isWithinOpeningHours(day, hour, minute) && (hour > currentHour + 1 || (hour === currentHour + 1 && minute >= currentMinute))) {
              const optionText = displayHour + ':' + pad(minute) + 'pm';
              const option = new Option(optionText, optionText); // Set the value same as the text
              timeSelect.add(option);
            }
          }
        }
    }
  }
  else {
    const selectedDate = new Date(dateInput.value);
    const chosenDay = selectedDate.getDay();
    switch (chosenDay) {
      case 0:
        for (let hour = 12; hour <= 16; hour++) {
          for (let minute = 0; minute < 60; minute += 15) {
            // Skip generating options for 4:15pm, 4:30pm, and 4:45pm
            if (hour === 16 && (minute === 15 || minute === 30 || minute === 45)) {
              continue;
            }

            const displayHour = (hour > 12) ? (hour - 12) : hour; // Convert to 12-hour format
            const optionText = displayHour + ':' + pad(minute) + 'pm';
            const option = new Option(optionText, optionText); // Set the value same as the text
            timeSelect.add(option);
          }
        }
        break;
      case 5:
      case 6:
        for (let hour = 12; hour <= 20; hour++) {
          for (let minute = 0; minute < 60; minute += 15) {
            // Skip generating options for 8:15pm, 8:30pm, and 8:45pm
            if (hour === 20 && (minute === 15 || minute === 30 || minute === 45)) {
              continue;
            }

            const displayHour = (hour > 12) ? (hour - 12) : hour; // Convert to 12-hour format
            const optionText = displayHour + ':' + pad(minute) + 'pm';
            const option = new Option(optionText, optionText); // Set the value same as the text
            timeSelect.add(option);
          }
        }
        break;
      default: //Monday to Thursday
        for (let hour = 12; hour <= 19; hour++) {
          for (let minute = 0; minute < 60; minute += 15) {
            // Skip generating options for 7:15pm, 7:30pm, and 7:45pm
            if (hour === 19 && (minute === 15 || minute === 30 || minute === 45)) {
              continue;
            }

            const displayHour = (hour > 12) ? (hour - 12) : hour; // Convert to 12-hour format
            const optionText = displayHour + ':' + pad(minute) + 'pm';
            const option = new Option(optionText, optionText); // Set the value same as the text
            timeSelect.add(option);
          }
        }
    }
  }
}

// Generate time options when the page loads
generateTimeOptions();
'use strict';

// textarea in reservation form
const textarea = document.getElementById('message');

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
'use strict';

const submitButton = document.getElementById('formSumbitButton');

const nameInput = document.getElementById("name");
const nameError = document.getElementById("name-error");
const phoneNumberInput = document.getElementById("phone");
const phoneNumberError = document.getElementById("phone-error");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");
const guestNumberInput = document.getElementById("guest-number");
const guestNumberError = document.getElementById("guest-number-error");
const dateError = document.getElementById("date-error");
const timeInput = document.getElementById("time");
const timeError = document.getElementById("time-error");

// first validation on submit
submitButton.addEventListener('click', (event) => {

    //validate name input
    const trimmedValue = nameInput.value.trim(); // Trim the input value

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

    //validate guest number input
    if (guestNumberInput.value === '') {
        event.preventDefault(); // Prevent form submission if there are validation errors
        guestNumberInput.classList.add('error-input');
        guestNumberInput.setAttribute('aria-describedby', 'guest-number-error');
        guestNumberInput.setAttribute('aria-invalid', 'true');
        guestNumberError.style.display = "block";
    } else {
        guestNumberInput.classList.remove('error-input');
        guestNumberError.style.display = "none";
    }

    //validate date input
    // Get the selected date from the date input field
    const selectedDate = new Date(dateInput.value);
    // Get the minimum allowed date from the min attribute of the date input field
    const minDate = new Date(dateInput.min);

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

    if (nameError.style.display === "block" || phoneNumberError.style.display === "block" || emailError.style.display === "block" || dateError.style.display === "block") {
        alert("Please provide valid input.");
    }

    //validate time input
    if (timeInput.value === '') {
        event.preventDefault(); // Prevent form submission if there are validation errors
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
    guestNumberInput.addEventListener('input', guestNumberInputEvent);
    dateInput.addEventListener('input', dateInputEvent);
    timeInput.addEventListener('input', timeInputEvent);
});

function nameInputEvent() {
    const letterPattern = /^[A-Za-z ]+$/;
    const trimmedValue = nameInput.value.trim(); // Trim the input value

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
    const numberPattern = /[0-9+]/g;

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
    const emailPattern = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;

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

function guestNumberInputEvent() {
    if (guestNumberInput.value === '') {
        guestNumberInput.classList.add('error-input');
        guestNumberInput.setAttribute('aria-describedby', 'guest-number-error');
        guestNumberInput.setAttribute('aria-invalid', 'true');
        guestNumberError.style.display = "block";
    } else {
        guestNumberInput.classList.remove('error-input');
        guestNumberInput.removeAttribute('aria-describedby', 'guest-number-error');
        guestNumberInput.removeAttribute('aria-invalid', 'true');
        guestNumberError.style.display = "none";
    }
}

function dateInputEvent() {
    // Get the selected date from the date input field
    const selectedDate = new Date(dateInput.value);
    // Get the minimum allowed date from the min attribute of the date input field
    const minDate = new Date(dateInput.min);

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
    if (timeInput.value === '') {
        timeInput.classList.add('error-input');
        timeInput.setAttribute('aria-describedby', 'time-error');
        timeInput.setAttribute('aria-invalid', 'true');
        timeError.style.display = "block";
    } else {
        timeInput.classList.remove('error-input');
        timeInput.removeAttribute('aria-describedby', 'time-error');
        timeInput.removeAttribute('aria-invalid', 'true');
        timeError.style.display = "none";
    }
}
'use strict';

const reservationMessage = document.getElementById("reservation-message");
const confirmButton = document.querySelector(".reservation__message__bottom-button--confirm");
const closeButton = document.querySelector(".reservation__message__close-button");
const cancelButton = document.querySelector(".reservation__message__bottom-button--cancel");

const messageInput = document.getElementById("message");

let nameValue = document.getElementById("name-value");
let phoneValue = document.getElementById("phone-value");
let emailValue = document.getElementById("email-value");
let guestNumberValue = document.getElementById("guest-number-value");
let dateValue = document.getElementById("date-value");
let timeValue = document.getElementById("time-value");
let messageValue = document.getElementById("message-value");

// Open the modal
function openModal(event) {
    event.preventDefault(); // Prevent default form submission
    reservationMessage.style.display = "flex";
    nameValue.textContent = nameInput.value;
    phoneValue.textContent = phoneNumberInput.value;
    emailValue.textContent = emailInput.value;
    guestNumberValue.textContent = guestNumberInput.value;
    dateValue.textContent = dateInput.value;
    timeValue.textContent = timeInput.options[timeInput.selectedIndex].text
    if (messageInput.value === '' || messageInput.value === '(e.g. Dietary Restriction, Special Occasions)') {
        messageValue.textContent = "N/A";
    } else {
        // Encode the message input value to prevent HTML injection
        const encodedMessage = encodeHTML(messageInput.value);
        messageValue.innerHTML = encodedMessage;
    }
}

// Function to encode HTML entities
function encodeHTML(text) {
    return text.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/(\r\n|\n|\r)/g, '<br>'); // Preserve line breaks
}

// Submit form upon confirmation of information
confirmButton.addEventListener("click", formSubmitted);

function formSubmitted() {
    // Trigger form submission
    document.querySelector('form').submit();
    alert("Thanks for choosing our restaurant!\nWe will contact you shortly to confirm your reservation.");

    //hide the following 2 lines if php file is ready
    closeMessage();
    document.getElementById("myForm").reset();
}

// Add an event listener to the close button and cancel button to close the message
closeButton.addEventListener("click", closeMessage);

cancelButton.addEventListener("click", closeMessage);

function closeMessage() {
    reservationMessage.style.display = "none";
}

window.addEventListener('keydown', closeMessageByEsc);

function closeMessageByEsc(event) {
    if (event.keyCode == 27) { // Check if the key pressed is 'esc'
        closeMessage();
    }
}
//# sourceMappingURL=non-critical-modern-script.js.map
