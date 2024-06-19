'use strict';

let selectGuestNumberElement = document.getElementById('guest-number');
let selectTimeElement = document.getElementById('time');

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