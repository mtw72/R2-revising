'use strict';

//carousel for small & medium menu
let slideIndex = 1;
showSlides(slideIndex);

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("small-menu__slide");
  let dots = document.getElementsByClassName("small-menu__slideshow-dot");
  if (n > slides.length || slideIndex > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" slideshow-dot--active", "");
    dots[i].setAttribute('aria-selected', 'false');
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " slideshow-dot--active";
  dots[slideIndex - 1].setAttribute('aria-selected', 'true');
}

function autoplay() {
  slideIndex++;
  showSlides();
}

let timer = setInterval(autoplay, 3500)

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(autoplay, 3500);
}

function plusSlides(n) {
  showSlides(slideIndex += n);
  resetTimer();
}

function currentSlide(n) {
  showSlides(slideIndex = n);
  resetTimer();
}