'use strict';

// automatically update the year for the copyright in footer
var copyrightDate = new Date();
var copyrightYear = copyrightDate.getFullYear();
document.getElementById("year").textContent = copyrightYear;
'use strict';

// Get the elements inside the navbar and the home section
var navBar = document.getElementById("navbar");
var navbarToggler = document.querySelector('.navbar__toggler');
var navList = document.querySelector('.navbar__collapse');
var navLinks = document.querySelectorAll('.navbar__nav-link');
var findusLink = document.getElementById('findus-link');
var home = document.getElementById("home");

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
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].setAttribute('tabindex', '-1');
    navLinks[i].setAttribute('aria-hidden', 'true');
  }
}
function navLinkAriaNotHidden() {
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].setAttribute('tabindex', '0');
    navLinks[i].setAttribute('aria-hidden', 'false');
  }
}
function navLinkAriaRemoved() {
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].removeAttribute('tabindex', '0');
    navLinks[i].removeAttribute('tabindex', '-1');
    navLinks[i].removeAttribute('aria-hidden', 'true');
    navLinks[i].removeAttribute('aria-hidden', 'false');
  }
}

// Show or hide the collapsible navbar when toggler is clicked
navbarToggler.addEventListener('click', function (event) {
  // Toggle the visibility of navList
  navList.classList.toggle('is-opened');
  if (navList.style.maxHeight) {
    // If navList is open, close it
    navList.style.maxHeight = null;
    // Set the toggler NOT to be aria-expanded
    togglerAriaNotExpanded();
    // Set the navlinks to be aria-hidden and tab-index = -1
    navLinkAriaHidden();
  } else {
    // If navList is closed, open it
    navList.style.maxHeight = navList.scrollHeight + "px";
    // Set the toggler to be aria-expanded
    togglerAriaExpanded();
    // Set the navlinks NOT to be aria-hidden and tab-index = 0
    navLinkAriaNotHidden();
  }
  event.stopPropagation();
});

// Function to close the collapsible navbar
function closeNavbar() {
  if (navList.classList.contains('is-opened')) {
    navList.style.maxHeight = null;
    navList.classList.remove('is-opened');
    togglerAriaNotExpanded();
    navLinkAriaHidden();
  }
}

// Hide the collapsible navbar when the nav link is clicked 
// or when the user clicks anywhere outside of the navbar
document.addEventListener('click', function () {
  closeNavbar();
});

// For keyboard user, close the navbar if the key "TAB" is pressed
// let the navbar stay open if the key "SHIFT" + "TAB" are pressed
function closeNavbarByTab(event) {
  var keyCode = event.keyCode || event.which;
  // Check if the key pressed is 'tab'
  if (event.shiftKey && event.keyCode == 9) {
    // act normally if pressing "shift" + "tab" (going backwards)
  } else if (keyCode === 9) {
    closeNavbar();
  }
}
findusLink.addEventListener('keydown', closeNavbarByTab);

// On Scroll
// On screen wider than 900px, when the user scrolls down, hide the navbar. 
// Show the navbar when the user scrolls up
var prevScrollPos = window.scrollY;
window.onscroll = function () {
  var currentScrollPos = window.scrollY;
  var screenWidth = window.innerWidth;
  if (screenWidth > 900) {
    if (prevScrollPos > currentScrollPos) {
      navbar.style.top = "0";
    } else {
      navbar.style.top = "-500px";
    }
  }
  prevScrollPos = currentScrollPos;
};

// Function to adjust the padding top of the hero image according to the screen size
function adjustHeroImagePadding() {
  // Update the screenWidth variable with the current window width
  var screenWidth = window.innerWidth;

  // Check the screenWidth and adjust value of paddingTop accordingly
  if (screenWidth <= 350 || screenWidth <= 600 && screenWidth > 450) {
    home.style.paddingTop = "70px";
  } else {
    home.style.paddingTop = "0px";
  }
}

// Function to check the screen size and assign aria attributes to HTML elements
// For use when onload and onresize
function checkScreenSize() {
  var screenWidth = window.innerWidth;
  // On small screen, set the toggler to be aria-expanded,
  // set the navlinks to be aria-hidden and tab-index = -1
  if (screenWidth <= 576) {
    togglerAriaNotExpanded();
    navLinkAriaHidden();
  }
  // On large screen, remove the aria-expanded attribute of the toggler,
  // remove aria-hidden and tab-index attributes of navlinks
  else {
    togglerAriaRemoved();
    navLinkAriaRemoved();
  }
}

// On screen resize,
// 1. Close the navbar
// 2. Check the screen size and assign appropriate aria attributes to HTML elements
// 3. Check if needed to adjust the padding-top value of hero-image
window.addEventListener('resize', function () {
  closeNavbar();
  checkScreenSize();
  adjustHeroImagePadding();
});

//Check the screen size onload and assign appropriate aria attributes to HTML elements
window.addEventListener('load', checkScreenSize);
'use strict';

// Get all elements with the class "accordion__button"
var menuAccordion = document.getElementsByClassName("accordion__button");

// Add event listener for window load to open active panels
window.addEventListener('load', openOrClosePanels);

// Add event listener for window resize to open active panels or remove aria attributes
window.addEventListener('resize', openOrClosePanels);

// Function to handle panel state based on button and screen size
function handlePanelState(button, isActive, isSmallScreen) {
  var menuPanel = button.nextElementSibling;

  // Set aria-expanded attribute
  button.setAttribute('aria-expanded', isActive && isSmallScreen);
  if (isActive && isSmallScreen) {
    // Open the panel
    menuPanel.classList.add("accordion__panel--open");
    menuPanel.style.maxHeight = menuPanel.scrollHeight + "px";
    menuPanel.style.border = "1px solid rgba(226, 186, 137, 0.842)";
    menuPanel.setAttribute('role', 'region');
  } else {
    // Close the panel
    menuPanel.classList.remove("accordion__panel--open");
    menuPanel.style.maxHeight = null;
    menuPanel.style.border = "none";
    menuPanel.removeAttribute('role', 'region');
  }
}

// Function to open active panels when window width is <= 450px
function openOrClosePanels() {
  var isSmallScreen = window.innerWidth <= 450;
  for (var i = 0; i < menuAccordion.length; i++) {
    var button = menuAccordion[i];
    var isActive = button.classList.contains("accordion__button--active");
    handlePanelState(button, isActive, isSmallScreen);
  }
}

// Toggle panel open or close on click
for (var i = 0; i < menuAccordion.length; i++) {
  menuAccordion[i].addEventListener("click", function () {
    this.classList.toggle("accordion__button--active");
    var isActive = this.classList.contains("accordion__button--active");
    handlePanelState(this, isActive, true); // Always handle click events as small screen actions
  });
}
'use strict';

//Carousel for small & medium menu

// Initialize the slide index to the first slide
var slideIndex = 1;
showSlides(slideIndex);

// Function to display the slide corresponding to the given index 'n'
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("carousel__slide");
  var dots = document.getElementsByClassName("carousel__dot");

  // If 'n' is greater than the number of slides or the current slide index is greater than the number of slides, reset to the first slide
  if (n > slides.length || slideIndex > slides.length) {
    slideIndex = 1;
  }
  // If 'n' is less than 1, set the slide index to the last slide
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Hide all the slides by removing the 'current-slide' class
  for (i = 0; i < slides.length; i++) {
    slides[i].className = slides[i].className.replace(" current-slide", "");
  }

  // Remove the 'current-dot' class and 'aria-current' attribute from all dots
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" current-dot", "");
    dots[i].setAttribute('aria-current', 'false');
  }

  // Show the current slide by adding the 'current-slide' class
  slides[slideIndex - 1].className += " current-slide";
  // Highlight the current dot by adding the 'current-dot' class and setting 'aria-current' attribute to true
  dots[slideIndex - 1].className += " current-dot";
  dots[slideIndex - 1].setAttribute('aria-current', 'true');
}

// Function to automatically advance to the next slide
function autoplay() {
  showSlides(slideIndex);
}

// Set an interval to automatically advance the slides every 3500 milliseconds (3.5 seconds)
var timer = setInterval(autoplay, 3500);

// Function to reset the automatic slide advance timer
function resetTimer() {
  // Clear the current interval
  clearInterval(timer);
  // Restart the interval with the same delay
  timer = setInterval(autoplay, 3500);
}

// Function to advance the slide by a given number 'n' (positive or negative)
function plusSlides(n) {
  // Change the slide index and display the corresponding slide
  showSlides(slideIndex += n);
  // Reset the timer
  resetTimer();
}

// Function to display the slide corresponding to a given dot
function currentSlide(n) {
  // Set the slide index to 'n' and display the corresponding slide
  showSlides(slideIndex = n);
  // Reset the timer
  resetTimer();
}
'use strict';

// Function to open a menu based on a tab click event
function openMenu(event, menuName) {
  var i, menutabs, menus;
  menutabs = document.getElementsByClassName("menu__tab");

  // Loop through each menu tab to deactivate it
  for (i = 0; i < menutabs.length; i++) {
    menutabs[i].classList.remove("menu__tab--active");
    menutabs[i].setAttribute('aria-selected', 'false');
  }
  // Activate the clicked tab
  event.currentTarget.classList.add("menu__tab--active");
  event.currentTarget.setAttribute('aria-selected', 'true');
  menus = document.getElementsByClassName("menu__panel");
  // Loop through each menu panel to hide it
  for (i = 0; i < menus.length; i++) {
    menus[i].style.display = "none";
  }
  // Display the selected menu panel
  document.getElementById(menuName).style.display = "grid";
}

// Automatically click the tab with the ID "pasta-tab" to initialize the menu on page load
document.getElementById("pasta-tab").click();
'use strict';

// Set default date and time values in reservation form
// Get date of today
var dateOfToday = new Date();
var tdyDay = dateOfToday.getDay();
var tdyDate = dateOfToday.getDate();
var tdyMth = dateOfToday.getMonth() + 1;
var tdyYear = dateOfToday.getFullYear();
var tdyHour = dateOfToday.getHours();
var tdyMinute = dateOfToday.getMinutes();

// Make the date and/or month in 2-digit format
if (tdyDate < 10) {
  tdyDate = "0" + tdyDate;
}
if (tdyMth < 10) {
  tdyMth = "0" + tdyMth;
}
var today = tdyYear + "-" + tdyMth + "-" + tdyDate;

// Get date of tomorrow
var dateOfTmr = new Date(new Date().setDate(dateOfToday.getDate() + 1));
var tmrDate = dateOfTmr.getDate();
var tmrMth = dateOfTmr.getMonth() + 1;
var tmrYear = dateOfTmr.getFullYear();

// Make the date and/or month in 2-digit format
if (tmrDate < 10) {
  tmrDate = "0" + tmrDate;
}
if (tmrMth < 10) {
  tmrMth = "0" + tmrMth;
}
var tomorrow = tmrYear + "-" + tmrMth + "-" + tmrDate;

// Date picker
// Set default date (.value) and prevent choosing invalid dates (.min)
var dateInput = document.getElementById('date');
function generateDefaultDate() {
  switch (tdyDay) {
    case 0:
      //Sunday
      if (tdyHour > 15 || tdyHour === 15 && tdyMinute >= 1) {
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
      if (tdyHour > 19 || tdyHour === 19 && tdyMinute >= 1) {
        dateInput.value = tomorrow;
        dateInput.min = tomorrow;
      } else {
        dateInput.value = today;
        dateInput.min = today;
      }
      break;
    default:
      //Monday to Thursday
      if (tdyHour > 18 || tdyHour === 18 && tdyMinute >= 1) {
        dateInput.value = tomorrow;
        dateInput.min = tomorrow;
      } else {
        dateInput.value = today;
        dateInput.min = today;
      }
  }
}

// Generate default date when the page loads
generateDefaultDate();
dateInput.addEventListener('input', generateTimeOptions);

// Time picker
// Set default time

// Function to pad single digit numbers with leading zero
function pad(number) {
  return (number < 10 ? '0' : '') + number;
}

// Function to check if current time is within restaurant opening hours
function isWithinOpeningHours(day, hour, minute) {
  var openingHours = {
    Sunday: {
      start: 1200,
      end: 1700
    },
    Monday: {
      start: 1200,
      end: 2000
    },
    Tuesday: {
      start: 1200,
      end: 2000
    },
    Wednesday: {
      start: 1200,
      end: 2000
    },
    Thursday: {
      start: 1200,
      end: 2000
    },
    Friday: {
      start: 1200,
      end: 2100
    },
    Saturday: {
      start: 1200,
      end: 2100
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
  var days = now.getDay();
  var currentHour = now.getHours();
  var currentMinute = now.getMinutes();
  var timeSelect = document.getElementById('time');
  var timeFirstOption = document.getElementById('time-first-option');

  // Clear existing options (if any)
  timeSelect.innerHTML = '';

  // Add initial option for time
  timeSelect.appendChild(timeFirstOption);
  if (dateInput.value === today) {
    // If the chosen day is today
    switch (days) {
      case 0:
        // Sunday
        for (var hour = 12; hour <= 16; hour++) {
          for (var minute = 0; minute < 60; minute += 15) {
            // Skip generating options for 4:15pm, 4:30pm, and 4:45pm
            if (hour === 16 && (minute === 15 || minute === 30 || minute === 45)) {
              continue;
            }
            if (isWithinOpeningHours(day, hour, minute) && (hour > currentHour + 1 || hour === currentHour + 1 && minute >= currentMinute)) {
              var optionText = hour + ':' + pad(minute);
              var option = new Option(optionText, optionText); // Set the value same as the text
              timeSelect.add(option);
            }
          }
        }
        break;
      case 5:
      case 6:
        // Friday & Saturday
        for (var _hour = 12; _hour <= 20; _hour++) {
          for (var _minute = 0; _minute < 60; _minute += 15) {
            // Skip generating options for 8:15pm, 8:30pm, and 8:45pm
            if (_hour === 20 && (_minute === 15 || _minute === 30 || _minute === 45)) {
              continue;
            }
            if (isWithinOpeningHours(day, _hour, _minute) && (_hour > currentHour + 1 || _hour === currentHour + 1 && _minute >= currentMinute)) {
              var _optionText = _hour + ':' + pad(_minute);
              var _option = new Option(_optionText, _optionText); // Set the value same as the text
              timeSelect.add(_option);
            }
          }
        }
        break;
      default:
        //Monday to Thursday
        for (var _hour2 = 12; _hour2 <= 19; _hour2++) {
          for (var _minute2 = 0; _minute2 < 60; _minute2 += 15) {
            // Skip generating options for 7:15pm, 7:30pm, and 7:45pm
            if (_hour2 === 19 && (_minute2 === 15 || _minute2 === 30 || _minute2 === 45)) {
              continue;
            }
            if (isWithinOpeningHours(day, _hour2, _minute2) && (_hour2 > currentHour + 1 || _hour2 === currentHour + 1 && _minute2 >= currentMinute)) {
              var _optionText2 = _hour2 + ':' + pad(_minute2);
              var _option2 = new Option(_optionText2, _optionText2); // Set the value same as the text
              timeSelect.add(_option2);
            }
          }
        }
    }
  } else if (dateInput.value > today) {
    // If the chosen day is not today
    var selectedDate = new Date(dateInput.value);
    var chosenDay = selectedDate.getDay();
    switch (chosenDay) {
      case 0:
        // Sunday
        for (var _hour3 = 12; _hour3 <= 16; _hour3++) {
          for (var _minute3 = 0; _minute3 < 60; _minute3 += 15) {
            // Skip generating options for 4:15pm, 4:30pm, and 4:45pm
            if (_hour3 === 16 && (_minute3 === 15 || _minute3 === 30 || _minute3 === 45)) {
              continue;
            }
            var _optionText3 = _hour3 + ':' + pad(_minute3);
            var _option3 = new Option(_optionText3, _optionText3); // Set the value same as the text
            timeSelect.add(_option3);
          }
        }
        break;
      case 5:
      case 6:
        // Friday & Saturday
        for (var _hour4 = 12; _hour4 <= 20; _hour4++) {
          for (var _minute4 = 0; _minute4 < 60; _minute4 += 15) {
            // Skip generating options for 8:15pm, 8:30pm, and 8:45pm
            if (_hour4 === 20 && (_minute4 === 15 || _minute4 === 30 || _minute4 === 45)) {
              continue;
            }
            var _optionText4 = _hour4 + ':' + pad(_minute4);
            var _option4 = new Option(_optionText4, _optionText4); // Set the value same as the text
            timeSelect.add(_option4);
          }
        }
        break;
      default:
        //Monday to Thursday
        for (var _hour5 = 12; _hour5 <= 19; _hour5++) {
          for (var _minute5 = 0; _minute5 < 60; _minute5 += 15) {
            // Skip generating options for 7:15pm, 7:30pm, and 7:45pm
            if (_hour5 === 19 && (_minute5 === 15 || _minute5 === 30 || _minute5 === 45)) {
              continue;
            }
            var _optionText5 = _hour5 + ':' + pad(_minute5);
            var _option5 = new Option(_optionText5, _optionText5); // Set the value same as the text
            timeSelect.add(_option5);
          }
        }
    }
  }
}

// Generate time options when the page loads
generateTimeOptions();

// Update default date and time every minute
// to ensure the booking time is not outdated
function updateAtSpecificTimes() {
  var currentTime = new Date();
  var currentHour = currentTime.getHours();
  var currentMinute = currentTime.getMinutes();

  // Check if the current time is between 11am and 8pm
  if (currentHour >= 11 && currentHour < 20) {
    // Check if the current minute is 01, 16, 31, or 46
    if (currentMinute === 1 || currentMinute === 16 || currentMinute === 31 || currentMinute === 46) {
      generateDefaultDate();
      generateTimeOptions();
    }
  }
}
setInterval(updateAtSpecificTimes, 60 * 1000);
'use strict';

var selectGuestNumberElement = document.getElementById('guest-number');
var selectTimeElement = document.getElementById('time');

// Function to change the selected option to solid black color
function optionSelected(selectedElement) {
  // Check if a valid option (not the disabled one) is selected
  if (selectedElement.value !== "") {
    // If a valid option is selected, add the 'valid' class to change its color
    selectedElement.classList.add('valid');
  } else {
    // If a valid option is yet to be selected, remove the 'valid' class to revert to its default color
    selectedElement.classList.remove('valid');
  }
}
selectGuestNumberElement.addEventListener('change', function () {
  optionSelected(selectGuestNumberElement);
});
selectTimeElement.addEventListener('change', function () {
  optionSelected(selectTimeElement);
});
'use strict';

// Textarea in reservation form
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

// Change color of textarea when user inputs
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
var phoneNumberInput = document.getElementById("phone");
var phoneNumberError = document.getElementById("phone-error");
var emailInput = document.getElementById("email");
var emailError = document.getElementById("email-error");
var guestNumberInput = document.getElementById("guest-number");
var guestNumberError = document.getElementById("guest-number-error");
var dateError = document.getElementById("date-error");
var timeInput = document.getElementById("time");
var timeError = document.getElementById("time-error");

// first validation on submit
submitButton.addEventListener('click', function (event) {
  //validate name input
  var trimmedValue = nameInput.value.trim(); // Trim the input value

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
  if (nameError.style.display === "block" || phoneNumberError.style.display === "block" || emailError.style.display === "block" || guestNumberError.style.display === "block" || dateError.style.display === "block" || timeError.style.display === "block") {
    alert("Please provide valid input.");
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
  var letterPattern = /^[A-Za-z\.' \-]+$/;
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

var confirmationMessage = document.getElementById("confirmation-message");
var confirmButton = document.querySelector(".confirmation-message__bottom-button--confirm");
var closeButton = document.querySelector(".confirmation-message__close-button");
var cancelButton = document.querySelector(".confirmation-message__bottom-button--cancel");
var messageInput = document.getElementById("message");
var nameValue = document.getElementById("name-value");
var phoneValue = document.getElementById("phone-value");
var emailValue = document.getElementById("email-value");
var guestNumberValue = document.getElementById("guest-number-value");
var dateValue = document.getElementById("date-value");
var timeValue = document.getElementById("time-value");
var messageValue = document.getElementById("optional-message-value");
var messageTimer = document.getElementById("message-timer");

// Open the modal
function openModal(event) {
  event.preventDefault(); // Prevent default form submission
  confirmationMessage.style.display = "flex";
  confirmationMessage.setAttribute('aria-modal', 'true');

  // Copy the input value or options of the form to the confirmation message
  nameValue.textContent = nameInput.value;
  phoneValue.textContent = phoneNumberInput.value;
  emailValue.textContent = emailInput.value;
  guestNumberValue.textContent = guestNumberInput.value;
  dateValue.textContent = dateInput.value;
  timeValue.textContent = timeInput.options[timeInput.selectedIndex].text;

  // If the message input value is blank or default value,
  // the corresponding text in the confirmation message will be N/A
  if (messageInput.value === '' || messageInput.value === '(e.g. Dietary Restriction, Special Occasions)') {
    messageValue.textContent = "N/A";
  } else {
    // Encode the message input value to prevent HTML injection
    var encodedMessage = encodeHTML(messageInput.value);
    messageValue.innerHTML = encodedMessage;
  }
}

// Function to encode HTML entities
function encodeHTML(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/(\r\n|\n|\r)/g, '<br>'); // Preserve line breaks
}

// Submit form upon confirmation of information
confirmButton.addEventListener("click", formSubmitted);
function formSubmitted() {
  // Parse the selected date and time values from the form
  var selectedDateString = dateValue.innerText.trim();
  var selectedDateComponents = selectedDateString.split('-');
  var selectedYear = parseInt(selectedDateComponents[0]);
  var selectedMonth = parseInt(selectedDateComponents[1]);
  var selectedDate = parseInt(selectedDateComponents[2]);
  var benchmarkDateComponents = today.split('-');
  var benchmarkYear = parseInt(benchmarkDateComponents[0]);
  var benchmarkMonth = parseInt(benchmarkDateComponents[1]);
  var benchmarkDate = parseInt(benchmarkDateComponents[2]);
  // console.log("selected date: " + selectedDate);
  // console.log("benchmark date: " + benchmarkDate);

  var currentTime = new Date();
  var currentHour = currentTime.getHours();
  var currentMinute = currentTime.getMinutes();
  var timeString = timeValue.innerText.trim(); // Get the time string and remove leading/trailing spaces
  var timeComponents = timeString.split(':');
  var selectedHour = parseInt(timeComponents[0]);
  var selectedMinute = parseInt(timeComponents[1]);

  // console.log("selected time: " + timeString);
  // console.log("current hour: " + currentHour);
  // console.log("current minute: " + currentMinute);

  // Check if the selected date is before today's date or if it's today but the selected time has passed
  if (selectedYear < benchmarkYear || selectedMonth < benchmarkMonth || selectedDate < benchmarkDate || selectedDate === benchmarkDate && (selectedHour < currentHour + 1 || selectedHour === currentHour + 1 && selectedMinute < currentMinute)) {
    alert("Please select another available day or time slot.");
    closeMessage();
    generateDefaultDate();
    generateTimeOptions();
  } else {
    // Trigger form submission
    document.querySelector('form').submit();
    alert("Thanks for choosing our restaurant!\nWe will contact you shortly to confirm your reservation.");

    // Hide the following 2 lines if the PHP file is ready
    closeMessage();
    document.getElementById("myForm").reset();
  }
}

// Add an event listener to the close button and cancel button to close the message
closeButton.addEventListener("click", closeMessage);
cancelButton.addEventListener("click", closeMessage);

// Function to close the message
function closeMessage() {
  confirmationMessage.style.display = "none";
  confirmationMessage.setAttribute('aria-modal', 'false');
}

// Add an event listener to the window to close the message
window.addEventListener('keydown', closeMessageByEsc);

// Function to close the message by hitting the "ESC" key
function closeMessageByEsc(event) {
  if (event.keyCode == 27) {
    // Check if the key pressed is 'esc'
    closeMessage();
  }
}
//# sourceMappingURL=non-critical-legacy-script.js.map
