// default date and time values in reservation form
// get date of today
const dateOfToday = new Date();
const tdyDay = dateOfToday.getDay();
let tdyDate = dateOfToday.getDate();
let tdyMth = dateOfToday.getMonth() + 1;
const tdyYear = dateOfToday.getFullYear();
const tdyHour = dateOfToday.getHours();

//make the date and/or month in 2-digit format
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
const tmrYear = dateOfTmr.getFullYear();

//make the date and/or month in 2-digit format
if (tmrDate < 10) {
  tmrDate = "0" + tmrDate;
}
if (tmrMth < 10) {
  tmrMth = "0" + tmrMth;
}

const tomorrow = tmrYear + "-" + tmrMth + "-" + tmrDate;


// date picker - set default date (.value) and prevent choosing invalid dates (.min)
const dateInput = document.getElementById('date');

switch (tdyDay) {
  case 0: //Sunday
    if (tdyHour > 15) {
      dateInput.value = tomorrow;
      dateInput.min = tomorrow;

    } else {
      dateInput.value = today;
      dateInput.min = today;
    }
    break;
  case 5:
  case 6: //Friday & Saturday
    if (tdyHour > 19) {
      dateInput.value = tomorrow;
      dateInput.min = tomorrow;
    } else {
      dateInput.value = today;
      dateInput.min = today;
    }
    break;
  default: //Monday to Thursday
    if (tdyHour > 18) {
      dateInput.value = tomorrow;
      dateInput.min = tomorrow;
    } else {
      dateInput.value = today;
      dateInput.min = today;
    }
}

dateInput.addEventListener('input', generateTimeOptions);

// time picker - set default time
// Function to pad single digit numbers with leading zero
function pad(number) {
  return (number < 10 ? '0' : '') + number;
}

// Function to check if current time is within restaurant opening hours
function isWithinOpeningHours(day, hour, minute) {
  const openingHours = {
    Sunday: { start: 1200, end: 1600 },
    Monday: { start: 1200, end: 1900 },
    Tuesday: { start: 1200, end: 1900 },
    Wednesday: { start: 1200, end: 1900 },
    Thursday: { start: 1200, end: 1900 },
    Friday: { start: 1200, end: 2000 },
    Saturday: { start: 1200, end: 2000 }
  };

  const currentTime = hour * 100 + minute;
  const { start, end } = openingHours[day];

  return currentTime >= start && currentTime <= end;
}

// Function to generate time options based on current day and time
function generateTimeOptions() {
  const now = new Date();
  const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][now.getDay()];
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const select = document.getElementById('time');
  select.innerHTML = '';

  if (dateInput.value === today) {
    for (let hour = 12; hour <= 21; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const displayHour = (hour > 12) ? (hour - 12) : hour; // Convert to 12-hour format
        const amPm = (hour >= 12) ? 'pm' : 'am'; // Determine if it's AM or PM
        if (isWithinOpeningHours(day, hour, minute) && (hour > currentHour + 1 || (hour === currentHour + 1 && minute >= currentMinute))) {
          const option = new Option(displayHour + ':' + pad(minute) + amPm, time);
          select.add(option);
        }
      }
    }
  }
  else {
    const selectedDate = new Date(dateInput.value);
    const chosenDay = selectedDate.getDay();
    switch (chosenDay) {
      case 0:
        for (let hour = 12; hour <= 16; hour++) {
          for (let minute = 0; minute < 60; minute += 15) {
            const displayHour = (hour > 12) ? (hour - 12) : hour; // Convert to 12-hour format
            const amPm = (hour >= 12) ? 'pm' : 'am'; // Determine if it's AM or PM
            const option = new Option(displayHour + ':' + pad(minute) + amPm, time);
            select.add(option);
          }
        }
        break;
      case 5:
      case 6:
        for (let hour = 12; hour <= 20; hour++) {
          for (let minute = 0; minute < 60; minute += 15) {
            const displayHour = (hour > 12) ? (hour - 12) : hour; // Convert to 12-hour format
            const amPm = (hour >= 12) ? 'pm' : 'am'; // Determine if it's AM or PM
            const option = new Option(displayHour + ':' + pad(minute) + amPm, time);
            select.add(option);
          }
        }
        break;
      default: //Monday to Thursday
        for (let hour = 12; hour <= 19; hour++) {
          for (let minute = 0; minute < 60; minute += 15) {
            const displayHour = (hour > 12) ? (hour - 12) : hour; // Convert to 12-hour format
            const amPm = (hour >= 12) ? 'pm' : 'am'; // Determine if it's AM or PM
            const option = new Option(displayHour + ':' + pad(minute) + amPm, time);
            select.add(option);
          }
        }
    }
  }
}

// Generate time options when the page loads
generateTimeOptions();