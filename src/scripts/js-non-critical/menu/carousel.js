'use strict';

//Carousel for small & medium menu

// Initialize the slide index to the first slide
let slideIndex = 1;
showSlides(slideIndex);

// Set the carousel autoplay every 3.5 seconds
let timer = setInterval(autoplay, 3500);

// Function to display the slide corresponding to the given index 'n'
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("carousel__slide");
  let dots = document.getElementsByClassName("carousel__dot");

  // If 'n' is greater than the number of slides or the current slide index is greater than the number of slides, reset to the first slide
  if (n > slides.length || slideIndex > slides.length) { slideIndex = 1 }
  // If 'n' is less than 1, set the slide index to the last slide
  if (n < 1) { slideIndex = slides.length }

  // Hide all the slides by removing the 'current-slide' class
  for (i = 0; i < slides.length; i++) {
    slides[i].className = slides[i].className.replace(" current-slide", "");
  }

  // Remove the 'current-dot' class and 'aria-current' attribute from all dots
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" current-dot", "");
    dots[i].setAttribute('aria-current', 'false');
  }

  // Show the current slide by adding the 'current-slide' class
  slides[slideIndex - 1].className += " current-slide";
  // Highlight the current dot by adding the 'current-dot' class and setting 'aria-current' attribute to true
  dots[slideIndex - 1].className += " current-dot";
  dots[slideIndex - 1].setAttribute('aria-current', 'true');
}

// Function to automatically advance to the next slide
function autoplay() {
  slideIndex++;
  showSlides();
}

// Function to advance the slide by a given number 'n' (positive or negative)
function plusSlides(n) {
  // Change the slide index and display the corresponding slide
  showSlides(slideIndex += n);
  // Reset the timer
  resetTimer();
}

// Function to display the slide corresponding to a given dot
function currentSlide(n) {
  // Set the slide index to 'n' and display the corresponding slide
  showSlides(slideIndex = n);
  // Reset the timer
  resetTimer();
}

// Function to reset the automatic slide advance timer
function resetTimer() {
  // Clear the current interval
  clearInterval(timer);
  // Restart the interval with the same delay
  timer = setInterval(autoplay, 3500);
}