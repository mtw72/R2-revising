'use strict';

// Function to open a menu based on a tab click event
function openMenu(event, menuName) {
  let i, menutabs, menus;
  menutabs = document.getElementsByClassName("menu__tab");

  // Loop through each menu tab to deactivate it
  for (i = 0; i < menutabs.length; i++) {
    menutabs[i].classList.remove("menu__tab--active");
    menutabs[i].setAttribute('aria-selected', 'false');
  }
  // Activate the clicked tab
  event.currentTarget.classList.add("menu__tab--active");
  event.currentTarget.setAttribute('aria-selected', 'true');

  menus = document.getElementsByClassName("menu__panel");
  // Loop through each menu panel to hide it
  for (i = 0; i < menus.length; i++) {
    menus[i].style.display = "none";
  }
  // Display the selected menu panel
  document.getElementById(menuName).style.display = "grid";
}

// Automatically click the tab with the ID "pasta-tab" to initialize the menu on page load
document.getElementById("pasta-tab").click();