// check the form onsubmit
function formSubmitted() {
    alert("Thanks for choosing our restaurant!\nWe will contact you shortly to confirm your reservation.");
}


const submitButton = document.getElementById('formSumbitButton');
const nameInput = document.getElementById("name");
const nameError = document.getElementById("name-length-error");
const guestNumberInput = document.getElementById("ppl");
const guestNumberError = document.getElementById("guest-number-error");

submitButton.addEventListener('click', (event) => {
    if (nameInput.validity.patternMismatch || guestNumberInput.value === '') {
        nameInput.classList.add('error-input');
        nameInput.setAttribute('aria-describedby', 'name-length-error');
        nameInput.setAttribute('aria-invalid', 'true');
        nameError.style.display = "block";
        event.preventDefault(); // Prevent form submission if there are validation errors
    } else {
        nameInput.classList.remove('error-input');
        nameError.style.display = "none";
    }

    if (guestNumberInput.validity.patternMismatch || guestNumberInput.value === '') {
        guestNumberInput.classList.add('error-input');
        guestNumberInput.setAttribute('aria-describedby', 'guest-number-error');
        guestNumberInput.setAttribute('aria-invalid', 'true');
        guestNumberError.style.display = "block";
        event.preventDefault(); // Prevent form submission if there are validation errors
    } else {
        guestNumberInput.classList.remove('error-input');
        guestNumberError.style.display = "none";
    }

    // Add the keyup event listener back after a short delay
    setTimeout(() => {
        nameInput.addEventListener('keyup', nameKeyUpEvent);
        guestNumberInput.addEventListener('keyup', guestNumberKeyUpEvent);
    }, 100);
});

function nameKeyUpEvent() {
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

function guestNumberKeyUpEvent() {
    const numbers = /[0-9]/g;

    if (guestNumberInput.value.length >= 0 && numbers.test(guestNumberInput.value)) {
        guestNumberInput.classList.remove('error-input');
        guestNumberInput.removeAttribute('aria-describedby', 'name-length-error');
        guestNumberInput.removeAttribute('aria-invalid', 'true');
        guestNumberError.style.display = "none";
    } else {
        guestNumberInput.classList.add('error-input');
        guestNumberInput.setAttribute('aria-describedby', 'name-length-error');
        guestNumberInput.setAttribute('aria-invalid', 'true');
        guestNumberError.style.display = "block";
    }
}
