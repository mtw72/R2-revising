'use strict';

const reservationMessage = document.getElementById("reservation-message");
const confirmButton = document.querySelector(".reservation__message__bottom-button--confirm");
const closeButton = document.querySelector(".reservation__message__close-button");
const cancelButton = document.querySelector(".reservation__message__bottom-button--cancel");

const guestNumberInput = document.getElementById("ppl");
const timeInput = document.getElementById("time");
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
    if (messageValue === '' || '(e.g. Dietary Restriction, Special Occasions)') {
        messageValue.textContent = "N/A";
    } else {
        messageValue.textContent = messageInput.value;
    }
}

// Submit form upon confirmation of information
confirmButton.addEventListener("click", formSubmitted);

function formSubmitted() {
    alert("Thanks for choosing our restaurant!\nWe will contact you shortly to confirm your reservation.");
    closeMessage();
}

// Add an event listener to the close button and cancel button to close the message
closeButton.addEventListener("click", closeMessage);

cancelButton.addEventListener("click", closeMessage);

function closeMessage() {
    reservationMessage.style.display = "none";
}