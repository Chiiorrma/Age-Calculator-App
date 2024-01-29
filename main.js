//Select the output elements
const outputYear = document.querySelector(".output-year");
const outputMonth = document.querySelector(".output-month");
const outputDay = document.querySelector(".output-day");
const submitBtn = document.querySelector(".submit-btn");

//Select the input elements
const inputYear = document.getElementById("year");
const inputMonth = document.getElementById("month");
const inputDay = document.getElementById("day");

//Select the error elements
const errorYear = document.querySelector(".error-year");
const errorMonth = document.querySelector(".error-month");
const errorDay = document.querySelector(".error-day");

let isValid = false

submitBtn.addEventListener('click', calculateAge)

// Check and display saved age on page load
window.addEventListener('load', function () {
  displaySavedAge();
});

inputDay.addEventListener('input', e => {
  if (inputDay.value > 31) {
    errorDay.innerHTML = "Must be a valid date";
    isValid = false;
    return;
  }
  else {
    isValid = true;
    errorDay.innerHTML = "";
  }
  if (+inputDay.value === 0) {
    isValid = false
    errorDay.innerHTML = "This field is required";
    isValid = false;
    return;
  } else {
    errorDay.innerHTML = "";
  }
})

inputDay.addEventListener('input', e => {
  if (inputDay.value > 31) {
    errorDay.innerHTML = "Must be a valid date";
    isValid = false;
    return;
  }
  else {
    isValid = true;
    errorDay.innerHTML = "";
  }
  if (+inputDay.value === 0) {
    isValid = false
    errorDay.innerHTML = "This field is required";
    isValid = false;
    return;
  } else {
    errorDay.innerHTML = "";
  }
});

inputMonth.addEventListener('input', e => {
  if (inputMonth.value > 12) {
    errorMonth.innerHTML = "Must be a valid month";
    isValid = false;
    return;
  }
  else {
    isValid = true;
    errorMonth.innerHTML = "";
  }
  if (+inputMonth.value === 0) {
    isValid = false
    errorMonth.innerHTML = "This field is required";
    isValid = false;
    return;
  } else {
    errorMonth.innerHTML = "";
  }
});

inputYear.addEventListener('input', e => {
  if (inputYear.value > 2024) {
    errorYear.innerHTML = "Must be a valid year";
    isValid = false;
    return;
  }
  else {
    isValid = true;
    errorYear.innerHTML = "";
  }
  if (+inputYear.value === 0) {
    isValid = false
    errorYear.innerHTML = "This field is required";
    isValid = false;
    return;
  } else {
    errorYear.innerHTML = "";
  }
});

inputDay.addEventListener('input', validateInput);
inputMonth.addEventListener('input', validateInput);
inputYear.addEventListener('input', validateInput);

function validateInput(e) {
  const inputElement = e.target;
  const errorElement = inputElement.nextElementSibling;
  const inputValue = +inputElement.value;

  if (inputValue === 0) {
    isValid = false;
    errorElement.innerHTML = "This field is required";
  } else if (inputElement.id === 'day' && (inputValue < 1 || inputValue > 31)) {
    isValid = false;
    errorElement.innerHTML = "Must be a valid date";
  } else if (inputElement.id === 'month' && (inputValue < 1 || inputValue > 12)) {
    isValid = false;
    errorElement.innerHTML = "Must be a valid month";
  } else if (inputElement.id === 'year' && (inputValue < 1900 || inputValue > new Date().getFullYear())) {
    isValid = false;
    errorElement.innerHTML = "Must be a valid year";
  } else {
    isValid = true;
    errorElement.innerHTML = "";
  }
}

function calculateAge() {
  if (isValid) {
    let birthday = `${inputDay.value}/${inputMonth.value}/${inputYear.value}`;
    console.log(birthday);
    let birthdayobj = new Date(birthday);
    let ageDiffMill = Date.now() - birthdayobj;
    let ageDate = new Date(ageDiffMill);
    let ageYears = ageDate.getUTCFullYear() - 1970;
    let ageMonth = ageDate.getUTCMonth();
    let ageDay = ageDate.getUTCDay() - 1;
    outputDay.innerHTML = ageDay;
    outputMonth.innerHTML = ageMonth;
    outputYear.innerHTML = ageYears;

    outputDay.innerHTML = ageDay;
    outputMonth.innerHTML = ageMonth;
    outputYear.innerHTML = ageYears;

    // Save age in local storage
    saveAgeToLocal({
      years: ageYears,
      months: ageMonth,
      days: ageDay
    });
  } else {
    alert("Error: Please fix the input values");
  }
}


// Function to save age in local storage
function saveAgeToLocal(ageObj) {
  localStorage.setItem('savedAge', JSON.stringify(ageObj));
}

// Function to display saved age from local storage
function displaySavedAge() {
  const savedAgeJSON = localStorage.getItem('savedAge');
  if (savedAgeJSON) {
    const savedAge = JSON.parse(savedAgeJSON);
    outputDay.innerHTML = savedAge.days;
    outputMonth.innerHTML = savedAge.months;
    outputYear.innerHTML = savedAge.years;
  }
}

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
})
