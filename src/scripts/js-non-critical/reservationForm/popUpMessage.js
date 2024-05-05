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
    // Parse the selected date and time values from the form
    const selectedDate = dateValue.value;
    const selectedTime = timeValue.value.split(':'); // Split time into hour and minute
    const selectedHour = parseInt(selectedTime[0]);
    const selectedMinute = parseInt(selectedTime[1]);
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    if ((selectedDate < today) || (selectedDate === today && selectedHour <= currentHour) || (selectedDate === today && selectedHour === (currentHour + 1) && selectedMinute < currentMinute)) {
        alert("Please select another available day or time slot.");
        generateDefaultDate();
        generateTimeOptions();
    }
    else {
        // Trigger form submission
        document.querySelector('form').submit();
        alert("Thanks for choosing our restaurant!\nWe will contact you shortly to confirm your reservation.");

        //hide the following 2 lines if php file is ready
        closeMessage();
        document.getElementById("myForm").reset();
    }
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