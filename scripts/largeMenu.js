function openMenu(event, menuName) {
  let i, menutabs, menus;

  menutabs = document.getElementsByClassName("large-menu__tab");
  for (i = 0; i < menutabs.length; i++) {
    menutabs[i].classList.remove("large-menu__tab--active");
    menutabs[i].setAttribute('aria-selected', 'false');
    menutabs[i].setAttribute('tabindex', '-1');
  }
  event.currentTarget.classList.add("large-menu__tab--active");
  event.currentTarget.setAttribute('aria-selected', 'true');
  event.currentTarget.setAttribute('tabindex', '0');
  // event.currentTarget.removeAttribute('tabindex', '-1');

  menus = document.getElementsByClassName("large-food-menu");
  for (i = 0; i < menus.length; i++) {
    menus[i].style.display = "none";
  }
  document.getElementById(menuName).style.display = "grid";
}

document.getElementById("pasta-tab").click();