'use strict'

// year for the footer (copyright)
const copyrightDate = new Date();
let copyrightYear = copyrightDate.getFullYear();
document.getElementById("year").textContent = copyrightYear;
