const dayInp = document.getElementById("day");
const monthInp = document.getElementById("month");
const yearInp = document.getElementById("year");

const dayOtp = document.getElementById("DD");
const monthOtp = document.getElementById("MM");
const yearOtp = document.getElementById("YY");

const form = document.querySelector("form");

const date = new Date();
let day = date.getDate();
let month = 1 + date.getMonth();
let year = date.getFullYear();

const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function validate() {
  const inputs = document.querySelectorAll("input");
  let validator = true;

  inputs.forEach((i) => {
    const parent = i.parentElement;

    if (!i.value) {
      i.style.borderColor = "red";
      parent.querySelector("small").innerText = "This field is required.";
      validator = false;
    } else {
      i.style.borderColor = "black";
      parent.querySelector("small").innerText = "";
    }
  });

  if (monthInp.value > 12 || monthInp.value < 1) {
    monthInp.style.borderColor = "red";
    monthInp.parentElement.querySelector("small").innerText = "Must be a valid month.";
    validator = false;
  }

  const maxDay = months[monthInp.value - 1] || 31; // Handle valid days for each month
  if (dayInp.value > maxDay || dayInp.value < 1) {
    dayInp.style.borderColor = "red";
    dayInp.parentElement.querySelector("small").innerText = "Must be a valid day.";
    validator = false;
  }

  return validator;
}

function handleSubmit(e) {
  e.preventDefault();

  if (validate()) {
    if (dayInp.value > day) {
      day = day + months[month - 1];
      month = month - 1;
    }
    if (monthInp.value > month) {
      month = month + 12;
      year = year - 1;
    }

    const d = day - dayInp.value;
    const m = month - monthInp.value;
    const y = year - yearInp.value;

    dayOtp.innerHTML = d;
    monthOtp.innerHTML = m;
    yearOtp.innerHTML = y;

    // Save input and output values after successful submission
    saveValues();
  }
}

// Load saved input and output values from local storage
function loadSavedValues() {
  const savedData = localStorage.getItem("ageData");
  if (savedData) {
    const [savedDayInp, savedMonthInp, savedYearInp, savedDayOtp, savedMonthOtp, savedYearOtp] = savedData.split(",");
    dayInp.value = savedDayInp;
    monthInp.value = savedMonthInp;
    yearInp.value = savedYearInp;
    dayOtp.innerHTML = savedDayOtp;
    monthOtp.innerHTML = savedMonthOtp;
    yearOtp.innerHTML = savedYearOtp;
  }
}

// Save input and output values to local storage
function saveValues() {
  const valuesToSave = `${dayInp.value},${monthInp.value},${yearInp.value},${dayOtp.innerHTML},${monthOtp.innerHTML},${yearOtp.innerHTML}`;
  localStorage.setItem("ageData", valuesToSave);
}

// Call loadSavedValues on page load
loadSavedValues();

// Add form submission event listener
form.addEventListener("submit", handleSubmit);




// Add theme toggle functionality
const themeToggle = document.getElementById("theme-toggle");
const iconMoon = document.querySelector(".icon-moon");
const iconSun = document.querySelector(".icon-sun");

// Function to update the icon based on the current mode
function updateIcon(isDarkMode) {
  if (isDarkMode) {
    iconSun.style.display = "flex";
    iconMoon.style.display = "none";
  } else {
    iconSun.style.display = "none";
    iconMoon.style.display = "flex";
  }
}

const isDarkMode = localStorage.getItem("theme") === "dark";
updateIcon(isDarkMode);

themeToggle.addEventListener("click", () => {
  const isCurrentlyDark = document.body.classList.contains("dark-mode");
  document.body.classList.toggle("dark-mode");
  themeToggle.classList.toggle("active", !isCurrentlyDark);
  localStorage.setItem("theme", isCurrentlyDark ? "light" : "dark");

  // Update the icon after toggling the theme
  updateIcon(!isCurrentlyDark);
});

