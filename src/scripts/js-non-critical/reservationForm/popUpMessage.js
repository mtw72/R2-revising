'use strict';

const reservationMessage = document.getElementById("reservation-message");
const confirmButton = document.querySelector(".reservation__message__bottom-button--confirm");
const closeButton = document.querySelector(".reservation__message__close-button");
const cancelButton = document.querySelector(".reservation__message__bottom-button--cancel");


// Open the modal
function openModal(event) {
    event.preventDefault(); // Prevent default form submission
    reservationMessage.style.display = "block";
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