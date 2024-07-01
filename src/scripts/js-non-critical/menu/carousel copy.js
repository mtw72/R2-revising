'use strict';

//Carousel for small & medium menu

// Get the elements in carousel
let slides = document.getElementsByClassName("carousel__slide");
const playButton = document.querySelector(".carousel__play-button");
const pauseButton = document.querySelector(".carousel__pause-button");
let progressContainers = document.getElementsByClassName("carousel__progress-container");
let currentProgressContainer = document.querySelector(".carousel__progress-container.current-container");
let progressBars = document.getElementsByClassName("carousel__progress-bar");
let finishedProgressBars = document.getElementsByClassName("finished-bar");

// Add event listener to pause button
pauseButton.addEventListener("click", function () {
  // Add the "hidden" class to the pause button
  pauseButton.classList.add("hidden");
  pauseButton.setAttribute('aria-hidden', 'true');
  // Remove the "hidden" class from the play button
  playButton.classList.remove("hidden");
  playButton.setAttribute('aria-hidden', 'false');
});

// Add event listener to play button
playButton.addEventListener("click", function () {
  // Add the "hidden" class to the pause button
  playButton.classList.add("hidden");
  playButton.setAttribute('aria-hidden', 'true');
  // Remove the "hidden" class from the play button
  pauseButton.classList.remove("hidden");
  pauseButton.setAttribute('aria-hidden', 'false');
});


// Initialize the slide index to the first slide
let slideIndex = 1;
showSlides(slideIndex);
progressStart();

// Set the carousel autoplay every 3.5 seconds
let timer = setInterval(autoplay, 3500);
let timer2 = setInterval(progressStart, 3500);

function progressStart() {
  let i = 0;
  if (i == 0) {
    i = 1;
    let width = 1;
    let id = setInterval(frame, 35);
    let currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
        currentProgressBar.style.width = "0.75rem";
      } else {
        width++;
        currentProgressBar.style.width = width + "%";
      }
    }
  }
}

// Function to display the slide corresponding to the given index 'n'
function showSlides(n) {
  let i;

  // If 'n' is greater than the number of slides or the current slide index is greater than the number of slides, reset to the first slide
  if (n > slides.length || slideIndex > slides.length) { slideIndex = 1 }
  // If 'n' is less than 1, set the slide index to the last slide
  if (n < 1) { slideIndex = slides.length }

  // Hide all the slides by removing the 'current-slide' class
  for (i = 0; i < slides.length; i++) {
    slides[i].className = slides[i].className.replace(" current-slide", "");
  }

  // Remove the 'current-dot' class and 'aria-current' attribute from all progressBars
  for (i = 0; i < progressBars.length; i++) {
    progressContainers[i].className = progressContainers[i].className.replace(" current-container", "");
    progressBars[i].className = progressBars[i].className.replace(" current-bar", "");
    // progressBars[i].style.width = "0.75rem";
    progressContainers[i].setAttribute('aria-current', 'false');
    progressBars[i].setAttribute('aria-current', 'false');
  }

  // Show the current slide by adding the 'current-slide' class
  slides[slideIndex - 1].className += " current-slide";
  // Highlight the current dot by adding the 'current-dot' class and setting 'aria-current' attribute to true
  progressContainers[slideIndex - 1].className += " current-container";
  progressBars[slideIndex - 1].className += " current-bar";
  progressContainers[slideIndex - 1].setAttribute('aria-current', 'true');
  progressBars[slideIndex - 1].setAttribute('aria-current', 'true');
  // progressStart();
  progressBars[slideIndex - 1].className += " finished-bar";
  if (slideIndex == 3) {
    setTimeout(removeFinishedColor, 3500);
  }
}

function removeFinishedColor() {
  for (let i = 0; i < progressBars.length; i++) {
    progressBars[i].className = progressBars[i].className.replace(" finished-bar", "");
  }
}


// Function to automatically advance to the next slide
function autoplay() {
  slideIndex++;
  showSlides();
}

// Function to advance the slide by a given number 'n' (positive or negative)
function plusSlides(n) {
  // for (let i = 0; i < progressBars.length; i++) {
  //   progressBars[i].style.width = "0.75rem";
  //   progressBars[i].style.backgroundColor = "rgb(195, 129, 84)";
  // }
  // Change the slide index and display the corresponding slide
  showSlides(slideIndex += n);
  // Reset the timer
  resetTimer();
  resetTimer2();


}

// Function to display the slide corresponding to a given dot
function currentSlide(n) {
  // Set the slide index to 'n' and display the corresponding slide
  showSlides(slideIndex = n);
  // Reset the timer
  resetTimer();
  resetTimer2();


}

// Function to reset the automatic slide advance timer
function resetTimer() {
  // Clear the current interval
  clearInterval(timer);
  // Restart the interval with the same delay
  timer = setInterval(autoplay, 3500);
}

// Function to reset the automatic slide advance timer
function resetTimer2() {
  // Clear the current interval
  clearInterval(timer2);
  // Restart the interval with the same delay
  timer2 = setInterval(progressStart, 3500);
}