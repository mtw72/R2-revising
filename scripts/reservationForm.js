const submitButton = document.getElementById('formSumbitButton');
const nameInput = document.getElementById("name");
const nameError = document.getElementById("name-length-error");
const guestNumberInput = document.getElementById("ppl");
const guestNumberError = document.getElementById("guest-number-error");
const dateError = document.getElementById("date-error");
const timeError = document.getElementById("time-error");

submitButton.addEventListener('click', (event) => {
    if (nameInput.validity.patternMismatch || guestNumberInput.value === '') {
        event.preventDefault(); // Prevent form submission if there are validation errors
        nameInput.classList.add('error-input');
        nameInput.setAttribute('aria-describedby', 'name-length-error');
        nameInput.setAttribute('aria-invalid', 'true');
        nameError.style.display = "block";
    } else {
        nameInput.classList.remove('error-input');
        nameError.style.display = "none";
    }

    if (guestNumberInput.validity.patternMismatch || guestNumberInput.value === '') {
        event.preventDefault(); // Prevent form submission if there are validation errors
        guestNumberInput.classList.add('error-input');
        guestNumberInput.setAttribute('aria-describedby', 'guest-number-error');
        guestNumberInput.setAttribute('aria-invalid', 'true');
        guestNumberError.style.display = "block";
    } else {
        guestNumberInput.classList.remove('error-input');
        guestNumberError.style.display = "none";
    }

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

    // Get the selected time from the time input field
    const selectedTime = timeInput.value;
    // Get the minimum allowed time from the min attribute of the time input field
    const minTime = timeInput.min;
    // Get the maximum allowed time from the max attribute of the time input field
    const maxTime = timeInput.max;

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

    // Add the input event listener back after a short delay, to show/hidden error message(s)
    setTimeout(() => {
        nameInput.addEventListener('input', nameInputEvent);
        guestNumberInput.addEventListener('input', guestNumberInputEvent);
        dateInput.addEventListener('input', dateInputEvent);
        timeInput.addEventListener('input', timeInputEvent);
    }, 100);
});

function nameInputEvent() {
    const letters = /^[A-Za-z]+$/;

    if (nameInput.value.length >= 2 && letters.test(nameInput.value)) {
        nameInput.classList.remove('error-input');
        nameInput.removeAttribute('aria-describedby', 'name-length-error');
        nameInput.removeAttribute('aria-invalid', 'true');
        nameError.style.display = "none";
    } else {
        nameInput.classList.add('error-input');
        nameInput.setAttribute('aria-describedby', 'name-length-error');
        nameInput.setAttribute('aria-invalid', 'true');
        nameError.style.display = "block";
    }
}

function guestNumberInputEvent() {
    const numbers = /[0-9]/g;

    if (guestNumberInput.value.length >= 0 && numbers.test(guestNumberInput.value)) {
        guestNumberInput.classList.remove('error-input');
        guestNumberInput.removeAttribute('aria-describedby', 'guest-number-error');
        guestNumberInput.removeAttribute('aria-invalid', 'true');
        guestNumberError.style.display = "none";
    } else {
        guestNumberInput.classList.add('error-input');
        guestNumberInput.setAttribute('aria-describedby', 'guest-number-error');
        guestNumberInput.setAttribute('aria-invalid', 'true');
        guestNumberError.style.display = "block";
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
    // Get the selected time from the time input field
    const selectedTime = timeInput.value;
    // Get the minimum allowed time from the min attribute of the time input field
    const minTime = timeInput.min;
    // Get the maximum allowed time from the max attribute of the time input field
    const maxTime = timeInput.max;

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








// check the form onsubmit
function formSubmitted() {
    alert("Thanks for choosing our restaurant!\nWe will contact you shortly to confirm your reservation.");
}
