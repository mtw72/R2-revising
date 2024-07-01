'use strict';

// Get the elements inside the navbar and the home section
var navbar = document.getElementById("navbar");
var navbarToggler = document.querySelector('.navbar__toggler');
var navList = document.querySelector('.navbar__collapse');
var navLinks = document.querySelectorAll('.navbar__nav-link');
var findusLink = document.getElementById('findus-link');
var home = document.getElementById("home");

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

// Hide the collapsible navbar when the nav link is clicked or when the user clicks anywhere outside of the navbar
document.addEventListener('click', closeNavbar);

// For keyboard user, close the navbar if the key "TAB" is pressed
// let the navbar stay open if the key "SHIFT" + "TAB" are pressed
// Close the navbar on "TAB" key press
findusLink.addEventListener('keydown', function (event) {
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
window.addEventListener('resize', debounce(function () {
  closeNavbar();
  checkScreenSize();
  adjustHeroImagePadding();
}, 50));

// Handle scroll event with debounce
// On screen wider than 900px, when the user scrolls down, hide the navbar.
// Show the navbar when the user scrolls up
var prevScrollPos = window.scrollY;
window.addEventListener('scroll', debounce(function () {
  var currentScrollPos = window.scrollY;
  if (window.innerWidth > 900) {
    navbar.style.top = prevScrollPos > currentScrollPos ? "0" : "-500px";
  }
  prevScrollPos = currentScrollPos;
}, 50));

// Debounce function
function debounce(func, wait) {
  var timeout;
  return function () {
    var _this = this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      return func.apply(_this, args);
    }, wait);
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
  var screenWidth = window.innerWidth;

  // Check the screenWidth and adjust value of paddingTop accordingly
  home.style.paddingTop = screenWidth <= 350 || screenWidth <= 600 && screenWidth > 450 ? "70px" : "0px";
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

// Get the elements in carousel
var slides = document.getElementsByClassName("carousel__slide");
var playButton = document.querySelector(".carousel__play-button");
var pauseButton = document.querySelector(".carousel__pause-button");
var progressContainers = document.getElementsByClassName("carousel__progress-container");
var currentProgressContainer = document.querySelector(".carousel__progress-container.current-container");
var progressBars = document.getElementsByClassName("carousel__progress-bar");
var currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");

// Add event listener to pause button
pauseButton.addEventListener("click", function () {
  // Add the "hidden" class to the pause button
  pauseButton.classList.add("hidden");
  pauseButton.setAttribute('aria-hidden', 'true');
  // Remove the "hidden" class from the play button
  playButton.classList.remove("hidden");
  playButton.setAttribute('aria-hidden', 'false');
});

// Add event listener to play button
playButton.addEventListener("click", function () {
  // Add the "hidden" class to the pause button
  playButton.classList.add("hidden");
  playButton.setAttribute('aria-hidden', 'true');
  // Remove the "hidden" class from the play button
  pauseButton.classList.remove("hidden");
  pauseButton.setAttribute('aria-hidden', 'false');
});

// Initialize the slide index to the first slide
var slideIndex = 1;
showSlides(slideIndex);
progressStart();

// Set the carousel autoplay every 3.5 seconds
var timer = setInterval(autoplay, 3500);
function progressStart() {
  var i = 0;
  if (i == 0) {
    var frame = function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        currentProgressBar.style.width = width + "%";
      }
    };
    i = 1;
    var width = 1;
    var id = setInterval(frame, 35);
  }
}
function progressStart1() {
  var i = 0;
  if (i == 0) {
    var frame = function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        currentProgressBar.style.width = width + "%";
      }
    };
    i = 1;
    var width = 1;
    var id = setInterval(frame, 35);
    clearInterval(id);
  }
}

// Function to display the slide corresponding to the given index 'n'
function showSlides(n) {
  var i;

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

  // Remove the 'current-dot' class and 'aria-current' attribute from all progressBars
  for (i = 0; i < progressBars.length; i++) {
    progressContainers[i].className = progressContainers[i].className.replace(" current-container", "");
    progressBars[i].className = progressBars[i].className.replace(" current-bar", "");
    progressContainers[i].setAttribute('aria-current', 'false');
    progressBars[i].setAttribute('aria-current', 'false');
  }

  // Show the current slide by adding the 'current-slide' class
  slides[slideIndex - 1].className += " current-slide";
  // Highlight the current dot by adding the 'current-dot' class and setting 'aria-current' attribute to true
  progressContainers[slideIndex - 1].className += " current-container";
  progressBars[slideIndex - 1].className += " current-bar";
  progressContainers[slideIndex - 1].setAttribute('aria-current', 'true');
  progressBars[slideIndex - 1].setAttribute('aria-current', 'true');
}

// Function to automatically advance to the next slide
function autoplay() {
  slideIndex++;
  showSlides();
  progressStart1();
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

// Function to reset the automatic slide advance timer
function resetTimer() {
  // Clear the current interval
  clearInterval(timer);
  // Restart the interval with the same delay
  timer = setInterval(autoplay, 3500);
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

// Get the form elements
var reservationForm = document.getElementById("reservation-form");
var submitButton = document.getElementById('formSumbitButton');
var confirmationMessage = document.getElementById("confirmation-message");
var closeButton = document.querySelector(".confirmation-message__close-button");
var confirmButton = document.querySelector(".confirmation-message__bottom-button--confirm");
var cancelButton = document.querySelector(".confirmation-message__bottom-button--cancel");

// Get the form input elements
var nameInput = document.getElementById("name");
var phoneNumberInput = document.getElementById("phone");
var emailInput = document.getElementById("email");
var guestNumberInput = document.getElementById('guest-number');
var dateInput = document.getElementById('date');
var timeInput = document.getElementById('time');
var timeFirstOption = document.getElementById('time-first-option');
var messageInput = document.getElementById("optional-message");
var placeholderText = '(e.g. Dietary Restriction, Special Occasions)';

// Get the form error message of input elements
var nameError = document.getElementById("name-error");
var phoneNumberError = document.getElementById("phone-error");
var emailError = document.getElementById("email-error");
var guestNumberError = document.getElementById("guest-number-error");
var dateError = document.getElementById("date-error");
var timeError = document.getElementById("time-error");

// Get the form output elements
var nameValue = document.getElementById("name-value");
var phoneValue = document.getElementById("phone-value");
var emailValue = document.getElementById("email-value");
var guestNumberValue = document.getElementById("guest-number-value");
var dateValue = document.getElementById("date-value");
var timeValue = document.getElementById("time-value");
var messageValue = document.getElementById("optional-message-value");
'use strict';

// Set default date for date picker
// If the cutoff time has yet to be reached, set today as default date
// If the cutoff time has been reached, set tomorrow as default date

// Get date of today
var dateOfToday = new Date();
var today = getFormattedDate(dateOfToday);

// Get date of tomorrow
var dateOfTmr = new Date(new Date().setDate(dateOfToday.getDate() + 1));
var tomorrow = getFormattedDate(dateOfTmr);

// Helper function to pad single digit numbers with leading zero
function pad(number) {
  return (number < 10 ? '0' : '') + number;
}

// Function to get the formatted date string (yyyy-mm-dd)
function getFormattedDate(date) {
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  return yyyy + "-" + pad(mm) + "-" + pad(dd);
}

// Generate default date when the page loads
generateDefaultDate();

// Set default date (.value) and prevent choosing invalid dates (.min)
function generateDefaultDate() {
  var tdyDay = dateOfToday.getDay();
  var tdyHour = dateOfToday.getHours();
  var tdyMinute = dateOfToday.getMinutes();
  var isAfterCutoff = function isAfterCutoff(cutoffHour) {
    return tdyHour > cutoffHour || tdyHour === cutoffHour && tdyMinute >= 1;
  };
  switch (tdyDay) {
    case 0:
      // Sunday
      setDefaultDate(isAfterCutoff(15));
      break;
    case 5: // Friday
    case 6:
      // Saturday
      setDefaultDate(isAfterCutoff(19));
      break;
    default:
      // Monday to Thursday
      setDefaultDate(isAfterCutoff(18));
  }

  // Helper function to set the default date and min date
  function setDefaultDate(isAfterCutoff) {
    if (isAfterCutoff) {
      dateInput.value = tomorrow;
      dateInput.min = tomorrow;
    } else {
      dateInput.value = today;
      dateInput.min = today;
    }
  }
}
'use strict';

// Set default time for time picker

// Generate time options when the page loads
generateTimeOptions();

// Add event listener to date input to generate time options
dateInput.addEventListener('input', generateTimeOptions);

// Update default date and time every minute
// to ensure the booking time is not outdated
setInterval(updateAtSpecificTimes, 60 * 1000);

// Helper function to generate time options for a specific range
function generateOptionsForRange(endHour, currentHour, currentMinute) {
  for (var hour = 12; hour <= endHour; hour++) {
    for (var minute = 0; minute < 60; minute += 15) {
      if (hour === endHour && (minute === 15 || minute === 30 || minute === 45)) {
        continue;
      }
      if (hour > currentHour + 1 || hour === currentHour + 1 && minute >= currentMinute) {
        var optionText = hour + ':' + pad(minute);
        var option = new Option(optionText, optionText); // Set the value same as the text
        timeInput.add(option);
      }
    }
  }
}

// Function to generate time options based on current day and time
function generateTimeOptions() {
  var now = new Date();
  var dayIndex = now.getDay();
  var currentHour = now.getHours();
  var currentMinute = now.getMinutes();

  // Clear existing options (if any)
  timeInput.innerHTML = '';

  // Add initial option for time (placeholder: Select Time)
  timeInput.appendChild(timeFirstOption);
  if (dateInput.value === today) {
    switch (dayIndex) {
      case 0:
        // Sunday
        generateOptionsForRange(16, currentHour, currentMinute);
        break;
      case 5:
      case 6:
        // Friday & Saturday
        generateOptionsForRange(20, currentHour, currentMinute);
        break;
      default:
        // Monday to Thursday
        generateOptionsForRange(19, currentHour, currentMinute);
    }
  } else if (dateInput.value > today) {
    // If the chosen day is not today
    var selectedDate = new Date(dateInput.value);
    var chosenDay = selectedDate.getDay();
    switch (chosenDay) {
      case 0:
        // Sunday
        generateOptionsForRange(16, -1, -1);
        break;
      case 5:
      case 6:
        // Friday & Saturday
        generateOptionsForRange(20, -1, -1);
        break;
      default:
        // Monday to Thursday
        generateOptionsForRange(19, -1, -1);
    }
  }
}
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
'use strict';

// Add event listeners to option elements to change the text color to solid black color
guestNumberInput.addEventListener('change', function () {
  selectOption(guestNumberInput);
});
timeInput.addEventListener('change', function () {
  selectOption(timeInput);
});

// Function to change the text color of selected option
function selectOption(selectedElement) {
  // Check if a valid option (not the disabled one) is selected
  if (selectedElement.value !== "") {
    // If a valid option is selected, add the 'valid' class to change its color
    selectedElement.classList.add('valid');
  } else {
    // If a valid option is yet to be selected, remove the 'valid' class to revert to its default color
    selectedElement.classList.remove('valid');
  }
}
'use strict';

// Textarea in reservation form
// 1. When on focus, clear placeholder 
// 2. When input is detected, change the text to solid color
// 3. When it is empty and loses focus, reset the placeholder

// Add an event listener to clear placeholder when on focus
messageInput.addEventListener('focus', function () {
  if (messageInput.value.trim() === placeholderText) {
    messageInput.value = ''; // Clear the text
  }
});

// Add an event listener to change color of messageInput when user inputs
messageInput.addEventListener('input', function () {
  messageInput.classList.toggle('input', messageInput.value.trim() !== '');
});

// Add an event listener to reset the placeholder if the messageInput is empty when it loses focus
messageInput.addEventListener('blur', function () {
  if (messageInput.value.trim() === '') {
    messageInput.value = placeholderText;
    messageInput.classList.remove('input');
  }
});
'use strict';

// First form validation on clicking the submit button
submitButton.addEventListener('click', function (event) {
  // If the input is incorrect or empty, 
  // show the error message and attach relevant class (styling) and aria-attributes to the elements

  //Validate name input
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

  //Validate phone number input
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

  //Validate email input
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

  //Validate guest number input
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

  //Validate date input
  // Get the selected date from the date input field
  var selectedDate = new Date(dateInput.value);
  // Get the minimum allowed date from the min attribute of the date input field
  var minDate = new Date(dateInput.min);
  if (selectedDate < minDate || selectedDate === '') {
    event.preventDefault(); // Prevent form submission if there are validation errors
    dateInput.classList.add('error-input');
    dateInput.setAttribute('aria-describedby', 'date-error');
    dateInput.setAttribute('aria-invalid', 'true');
    dateError.style.display = "block";
  } else {
    dateInput.classList.remove('error-input');
    dateError.style.display = "none";
  }

  //Validate time input
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

  // Alert the user about the erroneous input
  if (nameError.style.display === "block" || phoneNumberError.style.display === "block" || emailError.style.display === "block" || guestNumberError.style.display === "block" || dateError.style.display === "block" || timeError.style.display === "block") {
    alert("Please provide valid input.");
  }

  // Add event listeners to form elements after the first submission of form,
  // for ongoing validation of inputs
  nameInput.addEventListener('input', nameInputEvent);
  phoneNumberInput.addEventListener('input', phoneNumberInputEvent);
  emailInput.addEventListener('input', emailInputEvent);
  guestNumberInput.addEventListener('input', guestNumberInputEvent);
  dateInput.addEventListener('input', dateInputEvent);
  timeInput.addEventListener('input', timeInputEvent);
});

// Function to continuously validate name input after first submission
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

// Function to continuously validate phone number input after first submission
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

// Function to continuously validate email input after first submission
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

// Function to continuously validate guest number input after first submission
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

// Function to continuously validate date input after first submission
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

// Function to continuously validate time input after first submission
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

// Submit form upon confirmation of information
confirmButton.addEventListener("click", submitForm);

// Add an event listener to the close button and cancel button to close the message
closeButton.addEventListener("click", closeMessage);
cancelButton.addEventListener("click", closeMessage);

// Add an event listener to the window to close the message
window.addEventListener('keydown', closeMessageByEsc);

// Function to open the modal when the user clicks the form submit button
function openModal(event) {
  event.preventDefault(); // Prevent default form submission
  confirmationMessage.style.display = "flex";
  confirmationMessage.setAttribute('aria-modal', 'true');

  // Copy the value of inputs or options in the form to confirmation message
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

// Function to submit form
function submitForm() {
  // Parse the selected date value from the form
  var selectedDateString = dateValue.innerText.trim(); // Get the date string and remove leading/trailing spaces
  var selectedDateComponents = selectedDateString.split('-');
  var selectedYear = parseInt(selectedDateComponents[0]);
  var selectedMonth = parseInt(selectedDateComponents[1]);
  var selectedDate = parseInt(selectedDateComponents[2]);

  // Set date of today as a benchmark date to do comparison
  var benchmarkDateComponents = today.split('-');
  var benchmarkYear = parseInt(benchmarkDateComponents[0]);
  var benchmarkMonth = parseInt(benchmarkDateComponents[1]);
  var benchmarkDate = parseInt(benchmarkDateComponents[2]);

  // console.log("selected date: " + selectedDate);
  // console.log("benchmark date: " + benchmarkDate);

  // Parse the selected time value from the form
  var timeString = timeValue.innerText.trim(); // Get the time string and remove leading/trailing spaces
  var timeComponents = timeString.split(':');
  var selectedHour = parseInt(timeComponents[0]);
  var selectedMinute = parseInt(timeComponents[1]);
  var currentTime = new Date();
  var currentHour = currentTime.getHours();
  var currentMinute = currentTime.getMinutes();

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
    reservationForm.submit();
    alert("Thanks for choosing our restaurant!\nWe will contact you shortly to confirm your reservation.");

    // Hide the following 2 lines if the PHP file is ready
    closeMessage();
    reservationForm.reset();
  }
}

// Function to close the message
function closeMessage() {
  confirmationMessage.style.display = "none";
  confirmationMessage.setAttribute('aria-modal', 'false');
}

// Function to close the message by hitting the "ESC" key
function closeMessageByEsc(event) {
  if (event.keyCode == 27) {
    // Check if the key pressed is 'esc'
    closeMessage();
  }
}
'use strict';

// Automatically update the year for the copyright in footer
document.getElementById("year").textContent = dateOfToday.getFullYear();
//# sourceMappingURL=non-critical-legacy-script.js.map
