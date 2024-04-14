'use strict';

// Open the modal
function openModal(event, modalName) {
    document.getElementById(modalName).style.display = "block";
}

// Get the close buttons
const closeButton = document.getElementsByClassName("reservation__message__close-button");

// Add an event listener to the close button to close the message
closeButton[0].addEventListener("click", function () {
    this.closest(".reservation__message-container").style.display = "none";
});