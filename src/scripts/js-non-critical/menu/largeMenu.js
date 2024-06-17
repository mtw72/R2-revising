'use strict';

function openMenu(event, menuName) {
  let i, menutabs, menus;

  menutabs = document.getElementsByClassName("menu__tab");
  for (i = 0; i < menutabs.length; i++) {
    menutabs[i].classList.remove("menu__tab--active");
    menutabs[i].setAttribute('aria-selected', 'false');
  }
  event.currentTarget.classList.add("menu__tab--active");
  event.currentTarget.setAttribute('aria-selected', 'true');

  menus = document.getElementsByClassName("menu__panel");
  for (i = 0; i < menus.length; i++) {
    menus[i].style.display = "none";
  }
  document.getElementById(menuName).style.display = "grid";
}

document.getElementById("pasta-tab").click();