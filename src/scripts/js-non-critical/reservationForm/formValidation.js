'use strict';

const submitButton = document.getElementById('formSumbitButton');

const nameInput = document.getElementById("name");
const nameError = document.getElementById("name-error");
const phoneNumberInput = document.getElementById("tel");
const phoneNumberError = document.getElementById("phone-error");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");
const dateError = document.getElementById("date-error");

// first validation on submit
submitButton.addEventListener('click', (event) => {
    const trimmedValue = nameInput.value.trim(); // Trim the input value

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

    // Add the input event listener after first submission
    nameInput.addEventListener('input', nameInputEvent);
    phoneNumberInput.addEventListener('input', phoneNumberInputEvent);
    emailInput.addEventListener('input', emailInputEvent);
    dateInput.addEventListener('input', dateInputEvent);
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