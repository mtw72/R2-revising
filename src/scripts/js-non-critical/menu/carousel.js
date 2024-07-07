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
let isPaused = false;

// let width = 1, j = 1;
let dynamicFrame;
let memo;
let memo2;
let resumeTimeout;
let timer3;
let width = 0, j = 0;

// Initialize the slide index to the first slide
let slideIndex = 1;
showSlides(slideIndex);
progressStart();

// Set the carousel autoplay every 3.5 seconds
// let timer2 = setInterval(progressInterval, 3500);

// start the progress initially
function progressStart() {
  frame();
  dynamicFrame = setInterval(frame, 35);
}

// for next slide
function progressInterval() {
  clearInterval(dynamicFrame);
  // progressStart();
  dynamicFrame = setInterval(frame, 35);
}

function frame() {
  let currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");
  if (j < 100) {
    width++;
    j++;
    currentProgressBar.style.width = width + "%";
    memo = width;
  } else {
    // width++; //99 + 1 = 100
    // currentProgressBar.style.width = width + "%";
    // memo = width;
    console.log(memo);
    clearInterval(dynamicFrame); // Clear the next round
    currentProgressBar.style.width = "0.75rem";
    j = 0; // Reset count
    slideIndex++; // Advance to the next slide
    showSlides();
    currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");

    width = 0; // Reset width
    currentProgressBar.style.width = width + "%";
    memo = width;
    frame();
    dynamicFrame = setInterval(frame, 35);
    memo = width;
  }
  // memo = width;
}

// function frame() {
//   let currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");
//   if (j < 99) {
//     width++;
//     j++;
//     currentProgressBar.style.width = width + "%";
//     memo = width;
//   } else {
//     width++; //99 + 1 = 100
//     currentProgressBar.style.width = width + "%";
//     memo = width;
//     console.log(memo);
//     clearInterval(dynamicFrame); // Clear the next round
//     currentProgressBar.style.width = "0.75rem";
//     j = 1; // Reset count
//     slideIndex++; // Advance to the next slide
//     showSlides();
//     currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");

//     width = 1; // Reset width
//     currentProgressBar.style.width = width + "%";
//     memo = width;
//     frame();
//     dynamicFrame = setInterval(frame, 35);
//     memo = width;
//   }
//   // memo = width;
// }



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
    slides[i].setAttribute('aria-current', 'false');
    // }

    // // Remove the 'current-dot' class and 'aria-current' attribute from all progressBars
    // for (i = 0; i < progressBars.length; i++) {
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
  slides[slideIndex - 1].setAttribute('aria-current', 'true');
  progressContainers[slideIndex - 1].setAttribute('aria-current', 'true');
  progressBars[slideIndex - 1].setAttribute('aria-current', 'true');
}



function removeProgressColor(slideIndex) {
  if (slideIndex == 3) {
    for (let i = 0; i < progressBars.length; i++) {
      progressBars[i].className = progressBars[i].className.replace(" finished-bar", "");
    }
  }

}

// Function to advance the slide by a given number 'n' (positive or negative)
function plusSlides(n) {
  // for (let i = 0; i < progressBars.length; i++) {
  //   progressBars[i].style.width = "0.75rem";
  //   progressBars[i].style.backgroundColor = "rgb(195, 129, 84)";
  // }
  if (isPaused) {
    clearInterval(dynamicFrame);
    clearInterval(timer2);
    width = 1;
    j = 1;
    memo = 1;
  }
  else {
    clearInterval(dynamicFrame);
    clearInterval(timer2);
    width = 1;
    j = 1;
    // Change the slide index and display the corresponding slide
    showSlides(slideIndex += n);
    progressStart();
    // Reset the timer
    timer2 = setInterval(progressInterval, 3500);
  }
}

// Function to display the slide corresponding to a given dot
function currentSlide(n) {
  if (isPaused) {
    clearInterval(dynamicFrame);
    clearInterval(timer2);
    width = 1;
    memo = 1;
    j = 1;
  }
  else {
    // Set the slide index to 'n' and display the corresponding slide
    clearInterval(dynamicFrame);
    clearInterval(timer2);
    width = 1;
    j = 1;
    showSlides(slideIndex = n);
    progressStart();
    // Reset the timer
    timer2 = setInterval(progressInterval, 3500);
  }
}

function progressPause() {
  let currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");

  console.log(memo);
  memo2 = memo; // Create another memory storage for calculating the remaining time
  currentProgressBar.style.width = memo + "%";
  clearTimeout(resumeTimeout);
  clearTimeout(timer3);
  clearInterval(dynamicFrame);
  clearInterval(timer2);
}

// Ensure to reset the progress bar width when you resume
function progressResume() {
  let currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");

  width = memo; // Restore the width from memo
  if (width < 100) {
    currentProgressBar.style.width = width + "%";
    progressStart(); //resume the play process
    timer3 = setTimeout(() => {
      progressInterval();
      timer2 = setInterval(progressInterval, 3500);
    }, (3500 - (memo2 * 35)))
  } else if (width >= 100) { //very good work!!
    width = 1;
    slideIndex++; // Advance to the next slide
    showSlides();
    progressStart();
    // Reset the timer
    timer2 = setInterval(progressInterval, 3500);
  }
}

// function resetResumeTimer() {

//   timer2 = setInterval(progressInterval, 3500);
// }

// Ensure to reset the progress bar width when you restart
// function progressRestart() {
//   width = 1;
//   currentProgressBar.style.width = width + "%";
// }

// Function to reset the automatic slide advance timer
function resetTimer2() {
  // Clear the current interval
  clearInterval(timer2);
  // Restart the interval with the same delay
  timer2 = setInterval(progressStart, 3500);
}

// Add event listener to pause button
pauseButton.addEventListener("click", function () {
  progressPause();
  // isPaused = true;
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
  // isPaused = false;
  // Add the "hidden" class to the pause button
  playButton.classList.add("hidden");
  playButton.setAttribute('aria-hidden', 'true');
  // Remove the "hidden" class from the play button
  pauseButton.classList.remove("hidden");
  pauseButton.setAttribute('aria-hidden', 'false');
});