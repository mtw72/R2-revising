// default date and time values in reservation form
// get date of today
const dateOfToday = new Date();
let tdyDate = dateOfToday.getDate();
let tdyMth = dateOfToday.getMonth() + 1;
let tdyYear = dateOfToday.getFullYear();
let tdyHour = dateOfToday.getHours();
if (tdyDate < 10) {
  tdyDate = "0" + tdyDate;
}
if (tdyMth < 10) {
  tdyMth = "0" + tdyMth;
}
const today = tdyYear + "-" + tdyMth + "-" + tdyDate;

// get date of tomorrow
const dateOfTmr = new Date(new Date().setDate(dateOfToday.getDate() + 1));
let tmrDate = dateOfTmr.getDate();
let tmrMth = dateOfTmr.getMonth() + 1;
let tmrYear = dateOfTmr.getFullYear();
if (tmrDate < 10) {
  tmrDate = "0" + tmrDate;
}
if (tmrMth < 10) {
  tmrMth = "0" + tmrMth;
}
const tomorrow = tmrYear + "-" + tmrMth + "-" + tmrDate;


// date picker - set default date and prevent choosing invalid dates
const dateInput = document.getElementById('date');

switch (dateOfToday.getDay()) {
  case 0:
    if (tdyHour > 15) { //Sunday
      dateInput.value = tomorrow;
      dateInput.min = tomorrow;

    } else {
      dateInput.value = today;
      dateInput.min = today;
    }
    break;
  case 5:
  case 6:
    if (tdyHour > 19) { //Friday & Saturday
      dateInput.value = tomorrow;
      dateInput.min = tomorrow;
    } else {
      dateInput.value = today;
      dateInput.min = today;
    }
    break;
  default:
    if (tdyHour > 18) { //Monday to Thursday
      dateInput.value = tomorrow;
      dateInput.min = tomorrow;
    } else {
      dateInput.value = today;
      dateInput.min = today;
    }
}


// time picker - set default time and prevent choosing invalid hours (before opening time / during operating time)
const timeInput = document.getElementById('time');
const defaultTime = (tdyHour + 2) + ":" + ("00"); //default time
const validHour = (tdyHour + 1) + ":" + ("00");   //valid booking time

// for the same day (today), set the default time to 12nn before noon, or 2 hours later after noon
if (dateInput.value === today) {
  if (tdyHour > 11) {
    timeInput.defaultValue = defaultTime;
    timeInput.min = validHour;
  } else {
    timeInput.defaultValue = "12:00";
    timeInput.min = "12:00";
  }
} else {
  // for another day, set the default time to 12nn
  timeInput.value = "12:00";
  timeInput.min = "12:00";
}

// after closing time
// booking using default date
const dayoftoday = dateOfToday.getDay();

if (dayoftoday === 0) { // Sunday
  timeInput.max = '16:00';
} else if (dayoftoday === 5 || dayoftoday === 6) { // Friday & Saturday
  timeInput.max = '20:00';
} else { // Monday to Thursday
  timeInput.max = '19:00';
}

//booking using new date
dateInput.addEventListener('input', (event) => {
  const selectedDate = new Date(event.target.value);
  const dayOfWeek = selectedDate.getDay();
  // timeInput.min = '12:00';
  if (dayOfWeek === 0) { // Sunday
    timeInput.max = '16:00';
  } else if (dayOfWeek === 5 || dayOfWeek === 6) { // Friday & Saturday
    timeInput.max = '20:00';
  } else { // Any other day
    timeInput.max = '19:00';
  }
});