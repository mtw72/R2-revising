'use strict';

// Carousel for small & medium menu

// ******** VARIABLES ******** //

// Set the time for autoplay
const time = 3.5; //3.5 seconds
const timeInterval = time * 1000 / 100;

// Get the elements in carousel
const carouselTrack = document.getElementById("carousel__track");
const slides = document.getElementsByClassName("carousel__slide");
const prevButton = document.querySelector(".carousel__prev-button");
const nextButton = document.querySelector(".carousel__next-button");
const playButton = document.querySelector(".carousel__play-button");
const pauseButton = document.querySelector(".carousel__pause-button");
const progressList = document.querySelector(".carousel__progress-list");
const progressContainers = document.getElementsByClassName("carousel__progress-container");
const progressBars = document.getElementsByClassName("carousel__progress-bar");
const bar1 = document.getElementById("bar1");
const bar2 = document.getElementById("bar2");
const bar3 = document.getElementById("bar3");

// Create variables for progress bar
let currentProgressContainer = document.querySelector(".carousel__progress-container.current-container");
let currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");
let width = 0, memo, dynamicFrame;
let isPlay = true;


// ******** INITIALIZATION ******** //

// Initialize the slide index to the first slide
let slideIndex = 1;
showSlides(slideIndex);
progressStart();


// ******** EVENT LISTENERS ******** //

// Add event listeners to previous and next buttons
prevButton.addEventListener("click", () => {
  plusSlides(-1);
});

nextButton.addEventListener("click", () => {
  plusSlides(1);
});

// Add event listeners to play and pause buttons
pauseButton.addEventListener("click", () => {
  progressPause();
  togglePlayPauseButtons();
});

playButton.addEventListener("click", () => {
  progressResume();
  togglePlayPauseButtons();
});

// Add event listeners to progress list
progressList.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      plusSlides(-1);
      focusProgress();
      break;
    case 'ArrowRight':
      plusSlides(1);
      focusProgress();
      break;
    case 'Home':
      event.preventDefault();
      currentSlide(1);
      focusProgress();
      break;
    case 'End':
      event.preventDefault();
      currentSlide(3);
      focusProgress();
      break;
  }
});

// Add event listeners to each progress container
for (let i = 0; i < progressContainers.length; i++) {
  progressContainers[i].addEventListener("click", () => {
    currentSlide(1 + i);
  });
}


// ******** FUNCTIONS ******** //

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
    progressBars[i].setAttribute("aria-selected", "false");
    progressBars[i].setAttribute("tabindex", "-1");
  }

  // Show the current slide by adding the 'current-slide' class, and setting 'aria-current' attribute to true
  slides[slideIndex - 1].classList.add("current-slide");
  progressContainers[slideIndex - 1].classList.add("current-container");
  progressBars[slideIndex - 1].classList.add("current-bar");
  progressBars[slideIndex - 1].setAttribute("aria-selected", "true");
  progressBars[slideIndex - 1].removeAttribute("tabindex", "-1");
}

// Function to start the progress initially
function progressStart() {
  frame();
  dynamicFrame = setInterval(frame, timeInterval);
}

// Function for the progress bar to advance
function frame() {
  currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");
  if (width < 100) {
    width++;
    currentProgressBar.style.width = width + "%";
    memo = width;
  } else {
    clearInterval(dynamicFrame); // Clear the coming round
    currentProgressBar.blur();
    currentProgressBar.style.width = "0.75rem";
    slideIndex++; // Advance to the next slide
    showSlides(slideIndex);
    checkDotColor(slideIndex);
    resetProgressBar();
    progressStart();
    carouselTrack.setAttribute("aria-live", "off");
  }
}

// Function to change the dot color according to the slide position
function checkDotColor(slideIndex) {
  [...progressBars].forEach(bar => bar.classList.remove("finished-bar"));
  if (slideIndex === 2) {
    bar1.classList.add("finished-bar");
  }
  if (slideIndex === 3) {
    bar1.classList.add("finished-bar");
    bar2.classList.add("finished-bar");
  }
}

// Helper function to reset the progress bar
function resetProgressBar() {
  currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");
  width = 0; // Reset width
  currentProgressBar.style.width = width + "%";
  memo = width;
}

// Function to pause the progress bar running
function progressPause() {
  carouselTrack.setAttribute("aria-live", "polite");
  isPlay = false;
  clearInterval(dynamicFrame);
}

// Function to resume the progress bar running
function progressResume() {
  carouselTrack.setAttribute("aria-live", "off");
  isPlay = true;
  currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");
  width = memo; // Restore the width from memo
  if (width < 100) {
    currentProgressBar.style.width = width + "%";
    progressStart();
  } else {
    currentProgressBar.style.width = "0.75rem";
    slideIndex++; // Advance to the next slide
    showSlides(slideIndex);
    resetProgressBar();
    progressStart();
  }
}

// Helper function to pre-update the carousel initiated by user
function preUpdateByUser() {
  clearInterval(dynamicFrame);
  carouselTrack.setAttribute("aria-live", "polite");
  currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");
  currentProgressBar.style.width = "0.75rem";
}

// Function to advance the slide by a given number 'n' (positive or negative)
function plusSlides(n) {
  preUpdateByUser();
  slideIndex += n;
  showSlides(slideIndex);
  postUpdateByUser();
}

// Function to display the slide corresponding to a given dot
function currentSlide(n) {
  preUpdateByUser();
  slideIndex = n;
  showSlides(slideIndex);
  postUpdateByUser();
}

// Helper function to post-update the carousel initiated by user
function postUpdateByUser() {
  checkDotColor(slideIndex);
  resetProgressBar();
  if (isPlay) {
    progressStart();
  }
}

// Function to toggle play/pause button visibility and aria-hidden attribute
function togglePlayPauseButtons() {
  playButton.classList.toggle("hidden");
  pauseButton.classList.toggle("hidden");
  playButton.setAttribute('aria-hidden', playButton.classList.contains("hidden"));
  pauseButton.setAttribute('aria-hidden', pauseButton.classList.contains("hidden"));
}

// Function to focus the progress container
function focusProgress() {
  currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");
  currentProgressBar.focus();
}