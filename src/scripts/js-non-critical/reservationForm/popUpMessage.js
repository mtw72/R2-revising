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
let messageTimer = document.getElementById("message-timer");

// Open the modal
function openModal(event) {
    event.preventDefault(); // Prevent default form submission
    messageTimer.textContent = "15:00";
    reservationMessage.style.display = "flex";
    startTimer();
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

let timerInterval; // Define the timer interval variable outside the function

function startTimer() {
    // Clear any existing timer interval before starting a new one
    clearInterval(timerInterval);

    let minutes = 14;
    let seconds = 59;

    timerInterval = setInterval(function () {
        // Format the minutes and seconds to display with leading zeros
        let formattedMinutes = String(minutes).padStart(2, '0');
        let formattedSeconds = String(seconds).padStart(2, '0');

        // Update the timer display
        messageTimer.innerText = formattedMinutes + ":" + formattedSeconds;

        // Decrement seconds
        seconds--;

        // If seconds reach below 0, decrement minutes and reset seconds to 59
        if (seconds < 0) {
            seconds = 59;
            minutes--;

            // If minutes reach below 0, stop the timer
            if (minutes < 0) {
                clearInterval(timerInterval);
                closeMessage();
            }
        }
    }, 1000); // Update timer every second (1000 milliseconds)
}


// Start the timer when needed



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
    generateDefaultDate();
    generateTimeOptions();
}

window.addEventListener('keydown', closeMessageByEsc);

function closeMessageByEsc(event) {
    if (event.keyCode == 27) { // Check if the key pressed is 'esc'
        closeMessage();
    }
}