'use strict';

// year for the footer (copyright)
var copyrightDate = new Date();
var copyrightYear = copyrightDate.getFullYear();
document.getElementById("year").textContent = copyrightYear;
'use strict';

var navBar = document.getElementById("navbar");
var navbarToggler = document.querySelector('.navbar__toggler');
var navList = document.querySelector('.navbar__collapse');
var navLinks = document.querySelectorAll('.navbar__nav-link');
var home = document.getElementById("home");

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
findusLink.addEventListener('keydown', closeNavbarByTab);
function closeNavbarByTab(event) {
  var keyCode = event.keyCode || event.which;
  if (event.shiftKey && event.keyCode == 9) {// Check if the key pressed is 'tab'
    // act normally if pressing "shift" + "tab" (going backwards)
  } else if (keyCode === 9) {
    closeNavbar();
  }
}

// When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar 
var prevScrollPos = window.scrollY;
window.onscroll = function () {
  var currentScrollPos = window.scrollY;
  if (prevScrollPos > currentScrollPos) {
    navbar.style.top = "0";
  } else {
    navbar.style.top = "-500px";
    closeNavbar();
  }
  prevScrollPos = currentScrollPos;
};

// adjust the padding top of the hero image according to the screen size
window.onresize = function () {
  // Update the screenWidth variable with the current window width
  var screenWidth = window.innerWidth;

  // Check the screenWidth and adjust paddingTop accordingly
  if (screenWidth <= 350 || screenWidth <= 600 && screenWidth > 450) {
    home.style.paddingTop = "70px";
  } else {
    home.style.paddingTop = "0px";
  }
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
    negativeTabIndex();
  } else {
    removeDefaultAriaAttributes();
    zeroTabIndex();
  }
}
'use strict';

//carousel for small & medium menu
var slideIndex = 1;
showSlides(slideIndex);
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("small-menu__carousel__slide");
  var dots = document.getElementsByClassName("small-menu__carousel-dot");
  if (n > slides.length || slideIndex > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
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
      menuPanel.style.border = "1px solid rgba(226, 186, 137, 0.842)";
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
  var screenWidth = window.innerWidth;
  if (screenWidth <= 450) {
    openMenuPanel();
  }
}
'use strict';

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
dateInput.addEventListener('input', generateTimeOptions);

// time picker - set default time
// Function to pad single digit numbers with leading zero
function pad(number) {
  return (number < 10 ? '0' : '') + number;
}

// Function to check if current time is within restaurant opening hours
function isWithinOpeningHours(day, hour, minute) {
  var openingHours = {
    Sunday: {
      start: 1200,
      end: 1600
    },
    Monday: {
      start: 1200,
      end: 1900
    },
    Tuesday: {
      start: 1200,
      end: 1900
    },
    Wednesday: {
      start: 1200,
      end: 1900
    },
    Thursday: {
      start: 1200,
      end: 1900
    },
    Friday: {
      start: 1200,
      end: 2000
    },
    Saturday: {
      start: 1200,
      end: 2000
    }
  };
  var currentTime = hour * 100 + minute;
  var _openingHours$day = openingHours[day],
    start = _openingHours$day.start,
    end = _openingHours$day.end;
  return currentTime >= start && currentTime <= end;
}

// Function to generate time options based on current day and time
function generateTimeOptions() {
  var now = new Date();
  var day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][now.getDay()];
  var currentHour = now.getHours();
  var currentMinute = now.getMinutes();
  var select = document.getElementById('time');
  select.innerHTML = '';
  if (dateInput.value === today) {
    for (var hour = 12; hour <= 21; hour++) {
      for (var minute = 0; minute < 60; minute += 15) {
        var displayHour = hour > 12 ? hour - 12 : hour; // Convert to 12-hour format
        var amPm = hour >= 12 ? 'pm' : 'am'; // Determine if it's AM or PM
        if (isWithinOpeningHours(day, hour, minute) && (hour > currentHour + 1 || hour === currentHour + 1 && minute >= currentMinute)) {
          var option = new Option(displayHour + ':' + pad(minute) + amPm, time);
          select.add(option);
        }
      }
    }
  } else {
    var selectedDate = new Date(dateInput.value);
    var chosenDay = selectedDate.getDay();
    switch (chosenDay) {
      case 0:
        for (var _hour = 12; _hour <= 16; _hour++) {
          for (var _minute = 0; _minute < 60; _minute += 15) {
            var _displayHour = _hour > 12 ? _hour - 12 : _hour; // Convert to 12-hour format
            var _amPm = _hour >= 12 ? 'pm' : 'am'; // Determine if it's AM or PM
            var _option = new Option(_displayHour + ':' + pad(_minute) + _amPm, time);
            select.add(_option);
          }
        }
        break;
      case 5:
      case 6:
        for (var _hour2 = 12; _hour2 <= 20; _hour2++) {
          for (var _minute2 = 0; _minute2 < 60; _minute2 += 15) {
            var _displayHour2 = _hour2 > 12 ? _hour2 - 12 : _hour2; // Convert to 12-hour format
            var _amPm2 = _hour2 >= 12 ? 'pm' : 'am'; // Determine if it's AM or PM
            var _option2 = new Option(_displayHour2 + ':' + pad(_minute2) + _amPm2, time);
            select.add(_option2);
          }
        }
        break;
      default:
        //Monday to Thursday
        for (var _hour3 = 12; _hour3 <= 19; _hour3++) {
          for (var _minute3 = 0; _minute3 < 60; _minute3 += 15) {
            var _displayHour3 = _hour3 > 12 ? _hour3 - 12 : _hour3; // Convert to 12-hour format
            var _amPm3 = _hour3 >= 12 ? 'pm' : 'am'; // Determine if it's AM or PM
            var _option3 = new Option(_displayHour3 + ':' + pad(_minute3) + _amPm3, time);
            select.add(_option3);
          }
        }
    }
  }
}

// Generate time options when the page loads
generateTimeOptions();
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
'use strict';

var submitButton = document.getElementById('formSumbitButton');
var nameInput = document.getElementById("name");
var nameError = document.getElementById("name-error");
var phoneNumberInput = document.getElementById("tel");
var phoneNumberError = document.getElementById("phone-error");
var emailInput = document.getElementById("email");
var emailError = document.getElementById("email-error");
var dateError = document.getElementById("date-error");

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
  if (nameError.style.display === "block" || phoneNumberError.style.display === "block" || emailError.style.display === "block" || dateError.style.display === "block") {
    alert("Please provide valid input.");
  }

  // Add the input event listener after first submission
  nameInput.addEventListener('input', nameInputEvent);
  phoneNumberInput.addEventListener('input', phoneNumberInputEvent);
  emailInput.addEventListener('input', emailInputEvent);
  dateInput.addEventListener('input', dateInputEvent);
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
'use strict';

// Open the modal
function openModal(event, modalName) {
  document.getElementById(modalName).style.display = "block";
}

// Get the close buttons
var closeButton = document.getElementsByClassName("reservation__message__close-button");

// Add an event listener to the close button to close the message
closeButton[0].addEventListener("click", function () {
  this.closest(".reservation__message-container").style.display = "none";
});
//# sourceMappingURL=non-critical-legacy-script.js.map
