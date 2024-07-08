'use strict';

//Carousel for small & medium menu

// Get the elements in carousel
let slides = document.getElementsByClassName("carousel__slide");
const playButton = document.querySelector(".carousel__play-button");
const pauseButton = document.querySelector(".carousel__pause-button");
let progressContainers = document.getElementsByClassName("carousel__progress-container");
let currentProgressContainer = document.querySelector(".carousel__progress-container.current-container");
let progressBars = document.getElementsByClassName("carousel__progress-bar");
let currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");
let finishedProgressBars = document.getElementsByClassName("finished-bar");
let bar1 = document.getElementById("bar1");
let bar2 = document.getElementById("bar2");
let bar3 = document.getElementById("bar3");
const time = 3.5;
const timeInterval = time * 1000 / 100;

let width = 0, memo, dynamicFrame;
let isPaused = false;

// Initialize the slide index to the first slide
let slideIndex = 1;
showSlides(slideIndex);
progressStart();

// start the progress initially
function progressStart() {
  frame();
  dynamicFrame = setInterval(frame, timeInterval);
}

function frame() {
  let currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");
  if (width < 100) {
    width++;
    currentProgressBar.style.width = width + "%";
    memo = width;
  } else {
    clearInterval(dynamicFrame); // Clear the next round
    currentProgressBar.style.width = "0.75rem";
    slideIndex++; // Advance to the next slide
    showSlides();
    checkDotColor(slideIndex);
    currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");
    width = 0; // Reset width
    currentProgressBar.style.width = width + "%";
    memo = width;
    progressStart();
  }
}

// Function to display the slide corresponding to the given index 'n'
function showSlides(n) {

  // If 'n' is greater than the number of slides or the current slide index is greater than the number of slides, reset to the first slide
  if (n > slides.length || slideIndex > slides.length) { slideIndex = 1 }
  // If 'n' is less than 1, set the slide index to the last slide
  if (n < 1) { slideIndex = slides.length }

  // Hide all the slides by removing the 'current-slide' class
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("current-slide");
    progressContainers[i].classList.remove("current-container");
    progressBars[i].classList.remove("current-bar");
    slides[i].setAttribute('aria-current', 'false');
    progressContainers[i].setAttribute('aria-current', 'false');
    progressBars[i].setAttribute('aria-current', 'false');
  }

  // Show the current slide by adding the 'current-slide' class, and setting 'aria-current' attribute to true
  slides[slideIndex - 1].classList.add("current-slide");
  progressContainers[slideIndex - 1].classList.add("current-container");
  progressBars[slideIndex - 1].classList.add("current-bar");
  slides[slideIndex - 1].setAttribute('aria-current', 'true');
  progressContainers[slideIndex - 1].setAttribute('aria-current', 'true');
  progressBars[slideIndex - 1].setAttribute('aria-current', 'true');
}

function progressPause() {
  isPaused = true;
  clearInterval(dynamicFrame);
}

// Ensure to reset the progress bar width when you resume
function progressResume() {
  let currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");
  isPaused = false;
  width = memo; // Restore the width from memo
  if (width < 100) {
    currentProgressBar.style.width = width + "%";
    progressStart();
  } else {
    currentProgressBar.style.width = "0.75rem";
    slideIndex++; // Advance to the next slide
    showSlides();
    currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");
    width = 0; // Reset width
    currentProgressBar.style.width = width + "%";
    memo = width;
    progressStart();
  }
}

// Function to advance the slide by a given number 'n' (positive or negative)
function plusSlides(n) {
  let currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");

  if (isPaused) {
    clearInterval(dynamicFrame);
    currentProgressBar.style.width = "0.75rem";
    // Change the slide index and display the corresponding slide
    showSlides(slideIndex += n);
    checkDotColor(slideIndex);
    currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");
    width = 0; // Reset width
    currentProgressBar.style.width = width + "%";
    memo = width;
  }
  else {
    clearInterval(dynamicFrame);
    currentProgressBar.style.width = "0.75rem";
    // Change the slide index and display the corresponding slide
    showSlides(slideIndex += n);
    checkDotColor(slideIndex);
    currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");
    width = 0; // Reset width
    currentProgressBar.style.width = width + "%";
    memo = width;
    progressStart();
  }
}

// Function to display the slide corresponding to a given dot
function currentSlide(n) {
  let currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");

  if (isPaused) {
    clearInterval(dynamicFrame);
    currentProgressBar.style.width = "0.75rem";
    showSlides(slideIndex = n);
    checkDotColor(slideIndex);
    currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");
    width = 0; // Reset width
    currentProgressBar.style.width = width + "%";
    memo = width;
  }
  else {
    // Set the slide index to 'n' and display the corresponding slide
    clearInterval(dynamicFrame);
    currentProgressBar.style.width = "0.75rem";
    // Change the slide index and display the corresponding slide
    showSlides(slideIndex = n);
    checkDotColor(slideIndex);
    currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");
    width = 0; // Reset width
    currentProgressBar.style.width = width + "%";
    memo = width;
    progressStart();
  }
}

// Change the dot color according to the slide position
function checkDotColor(slideIndex) {
  for (let i = 0; i < progressBars.length; i++) {
    progressBars[i].classList.remove("finished-bar");
  }
  if (slideIndex === 2) {
    bar1.classList.add("finished-bar");
  }
  if (slideIndex === 3) {
    bar1.classList.add("finished-bar");
    bar2.classList.add("finished-bar");
  }
}

// Add event listener to pause button
pauseButton.addEventListener("click", function () {
  progressPause();
  // Add the "hidden" class to the pause button
  pauseButton.classList.add("hidden");
  pauseButton.setAttribute('aria-hidden', 'true');
  // Remove the "hidden" class from the play button
  playButton.classList.remove("hidden");
  playButton.setAttribute('aria-hidden', 'false');
});

// Add event listener to play button
playButton.addEventListener("click", function () {
  progressResume();
  // Add the "hidden" class to the pause button
  playButton.classList.add("hidden");
  playButton.setAttribute('aria-hidden', 'true');
  // Remove the "hidden" class from the play button
  pauseButton.classList.remove("hidden");
  pauseButton.setAttribute('aria-hidden', 'false');
});