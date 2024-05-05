'use strict';

let selectGuestNumberElement = document.getElementById('guest-number');
let selectTimeElement = document.getElementById('time');

function optionSelected(selectedElement) {
    // Check if a valid option (not the disabled one) is selected
    if (selectedElement.value !== "") {
        // If a valid option is selected, add the 'valid' class to change its color
        selectedElement.classList.add('valid');
    } else {
        // If the disabled option is selected, remove the 'valid' class to revert to the default color
        selectedElement.classList.remove('valid');
    }
}

selectGuestNumberElement.addEventListener('change', function () {
    optionSelected(selectGuestNumberElement);
});

selectTimeElement.addEventListener('change', function () {
    optionSelected(selectTimeElement);
});