const menuAccordion = document.getElementsByClassName("small-menu__accordion");

window.onload = function () {
  for (let i = 0; i < menuAccordion.length; i++) {
    if (menuAccordion[i].classList.contains("small-menu__accordion--active")) {
      let menuPanel = menuAccordion[i].nextElementSibling;
      menuPanel.style.maxHeight = menuPanel.scrollHeight + "px";
      menuPanel.classList.add("small-menu__panel--open");
    }
  }
};

for (let i = 0; i < menuAccordion.length; i++) {
  menuAccordion[i].addEventListener("click", function () {
    this.classList.toggle("small-menu__accordion--active");
    let menuPanel = this.nextElementSibling;
    if (menuPanel.classList.contains("small-menu__panel--open")) {
      menuPanel.style.maxHeight = null;
      menuPanel.classList.remove("small-menu__panel--open");
    } else {
      menuPanel.style.maxHeight = menuPanel.scrollHeight + "px";
      menuPanel.classList.add("small-menu__panel--open");
    }
  });
}

function openMenuPanel() {
  for (let i = 0; i < menuAccordion.length; i++) {
    if (menuAccordion[i].classList.contains("small-menu__accordion--active")) {
      let menuPanel = menuAccordion[i].nextElementSibling;
      menuPanel.style.maxHeight = menuPanel.scrollHeight + "px";
      menuPanel.classList.add("small-menu__panel--open");
    }
  }
};

function handleResize() {
  let screenWidth = window.innerWidth;
  if (screenWidth <= 600) {
    openMenuPanel();
  }
}

window.addEventListener('resize', handleResize);

//see how to re-factor the code