function openMenu(event, menuName) {
  let i, menutabs, menus;

  menutabs = document.getElementsByClassName("large-menu__tab");
  for (i = 0; i < menutabs.length; i++) {
    menutabs[i].classList.remove("large-menu__tab--active");
    menutabs[i].setAttribute('aria-selected', 'false');
  }
  event.currentTarget.classList.add("large-menu__tab--active");
  event.currentTarget.setAttribute('aria-selected', 'true');


  menus = document.getElementsByClassName("large-food-menu");
  for (i = 0; i < menus.length; i++) {
    menus[i].style.display = "none";
    menus[i].setAttribute('aria-hidden', 'true');
  }
  document.getElementById(menuName).style.display = "grid";
  document.getElementById(menuName).setAttribute('aria-hidden', 'false');
}

document.getElementById("myButton").click();