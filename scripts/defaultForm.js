// default values in reservation form
// get date for today
const date = new Date();
let tdyday = date.getDate();
let tdymth = date.getMonth() + 1;
let tdyyear = date.getFullYear();
let todayHour = date.getHours()
if (tdyday < 10) {
  tdyday = "0" + tdyday;
}
if (tdymth < 10) {
  tdymth = "0" + tdymth;
}
const today = tdyyear + "-" + tdymth + "-" + tdyday;

// get date for tomorrow
let tmrdate = new Date();
tmrdate.setDate(tmrdate.getDate() + 1);
let tmrday = tmrdate.getDate();
let tmrmth = tmrdate.getMonth() + 1;
let tmryear = tmrdate.getFullYear();
if (tmrday < 10) {
  tmrday = "0" + tmrday;
}
if (tmrmth < 10) {
  tmrmth = "0" + tmrmth;
}
const tmr = tmryear + "-" + tmrmth + "-" + tmrday;


// date picker - set default date
switch (new Date().getDay()) {
  case 0:
    if (todayHour > 15) {
      document.getElementById("date").value = tmr;
    } else {
      document.getElementById("date").value = today;
    }
    break;
  case 5:
  case 6:
    if (todayHour > 19) {
      document.getElementById("date").value = tmr;
    } else {
      document.getElementById("date").value = today;
    }
    break;
  default:
    if (todayHour > 18) {
      document.getElementById("date").value = tmr;
    } else {
      document.getElementById("date").value = today;
    }
}

// date picker - prevent choosing the invalid days
switch (new Date().getDay()) {
  case 0:
    if (todayHour > 15) {
      document.getElementById("date").min = tmr;
    } else {
      document.getElementById("date").min = today;
    }
    break;
  case 5:
  case 6:
    if (todayHour > 19) {
      document.getElementById("date").min = tmr;
    } else {
      document.getElementById("date").min = today;
    }
    break;
  default:
    if (todayHour > 18) {
      document.getElementById("date").min = tmr;
    } else {
      document.getElementById("date").min = today;
    }
}


// time picker - set default time 
const formattedTime = (todayHour + 2) + ":" + ("00");
if (document.getElementById("date").value === today) {
  if (todayHour > 11) {
    document.getElementById("time").defaultValue = formattedTime;
  } else {
    document.getElementById("time").defaultValue = "12:00";
  }
}
if (document.getElementById("date").value === tmr) {
  document.getElementById("time").value = "12:00";
}

// time picker - prevent choosing the invalid hours
// before opening time / during operating time
if (document.getElementById("date").value === today) {
  if (todayHour > 11) {
    document.getElementById("time").min = formattedTime;
  } else {
    document.getElementById("time").min = "12:00";
  }
}
if (document.getElementById("date").value === tmr) {
  document.getElementById("time").min = "12:00";
}

// after closing time
// booking using default date
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');
const dayoftoday = date.getDay();
if (dayoftoday === 0) { // Sunday
  timeInput.max = '16:00';
} else if (dayoftoday === 5 || dayoftoday === 6) { // Friday & Saturday
  timeInput.max = '20:00';
} else { // Any other day
  timeInput.max = '19:00';
}

//booking using new date
dateInput.addEventListener('input', (event) => {
  const selectedDate = new Date(event.target.value);
  const dayOfWeek = selectedDate.getDay();
  if (dayOfWeek === 0) { // Sunday
    timeInput.max = '16:00';
  } else if (dayOfWeek === 5 || dayOfWeek === 6) { // Friday & Saturday
    timeInput.max = '20:00';
  } else { // Any other day
    timeInput.max = '19:00';
  }
});


// check the form onsubmit
function formSubmitted() {
  alert("Thanks for choosing our restaurant!\nWe will contact you shortly to confirm your reservation.");
}
