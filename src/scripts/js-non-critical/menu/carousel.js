'use strict';

//carousel for small & medium menu
let slideIndex = 1;
showSlides(slideIndex);

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("small-menu__carousel__slide");
  let dots = document.getElementsByClassName("small-menu__carousel-dot");
  if (n > slides.length || slideIndex > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[i].className = slides[i].className.replace(" current-slide", "");
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" small-menu__carousel__slide--fade", "");
    dots[i].setAttribute('aria-current', 'false');
  }
  slides[slideIndex - 1].style.display = "block";
  slides[slideIndex - 1].className += " small-menu__carousel__slide--fade";
  dots[slideIndex - 1].className += " current-slide";
  dots[slideIndex - 1].setAttribute('aria-current', 'true');
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