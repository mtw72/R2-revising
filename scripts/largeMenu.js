function openMenu(event, menuName) {
  let i, menus, menutabs;
  menus = document.getElementsByClassName("large-food-menu");
  for (i = 0; i < menus.length; i++) {
    menus[i].style.display = "none";
  }
  document.getElementById(menuName).style.display = "grid";

  menutabs = document.getElementsByClassName("large-menu__tab");
  for (i = 0; i < menus.length; i++) {
    menutabs[i].classList.remove("large-menu__tab--active");
  }
  event.currentTarget.parentElement.classList.add("large-menu__tab--active");
}

document.getElementById("myLink").click();