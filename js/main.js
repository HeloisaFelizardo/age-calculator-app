const btnCalculate = document.querySelector('#btnCalculate');
const errorMessage = document.querySelectorAll('#ageCalculatorForm li');
const dayError = document.querySelector('#dayError');
const monthError = document.querySelector('#monthError');
const yearError = document.querySelector('#yearError');
const outDay = document.querySelector('.days');
const outMonths = document.querySelector('.months');
const outYears = document.querySelector('.years');
const today = new Date();

btnCalculate.addEventListener('click', e => {
  e.preventDefault();

  let inDay = Number(document.querySelector('#inDay').value);
  let inMonth = Number(document.querySelector('#inMonth').value);
  let inYear = Number(document.querySelector('#inYear').value);

  const isDayValid = validDay(inDay, inMonth);
  const isMonthValid = validMonth(inMonth);
  const isYearValid = validYear(inYear);

  if (isDayValid && isMonthValid && isYearValid) {
    const birthday = new Date(inYear, inMonth - 1, inDay);

    const age = calculateAge(birthday, today);
    outDay.textContent = age.days;
    outMonths.textContent = age.months;
    outYears.textContent = age.years;
    btnCalculate.classList.add('btn-active');
  } else {
    outDay.textContent = '--';
    outMonths.textContent = '--';
    outYears.textContent = '--';
    btnCalculate.classList.remove('btn-active');
  }
});

function validDay(day, month) {
  if (!day) {
    errorMessage[0].classList.add('error-message');
    dayError.textContent = 'This field is required';
    return false;
  } else if (day < 1 || day > 31) {
    dayError.textContent = 'Must be a valid day';
    return false;
  } else if (validateData(day, month)) {
    errorMessage[0].classList.add('error-message');
    dayError.textContent = 'Must be a valid date';
    return false;
  } else {
    errorMessage[0].classList.remove('error-message');
    dayError.textContent = '';
    return true;
  }
}

function validMonth(month) {
  if (!month) {
    errorMessage[1].classList.add('error-message');
    monthError.textContent = 'This field is required';
    return false;
  } else if (month < 1 || month > 12) {
    monthError.textContent = 'Must be a valid month';
    return false;
  } else {
    errorMessage[1].classList.remove('error-message');
    monthError.textContent = '';
    return true;
  }
}

function validYear(year) {
  if (!year) {
    errorMessage[2].classList.add('error-message');
    yearError.textContent = 'This field is required';
    return false;
  } else if (year > today.getFullYear()) {
    yearError.textContent = 'Must be in the past';
    return false;
  } else {
    errorMessage[2].classList.remove('error-message');
    yearError.textContent = '';
    return true;
  }
}

function validateData(day, month) {
  let invalidDate = false;
  let days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  for (let i = 0; i < days.length; i++) {
    if (day > days[month - 1]) {
      invalidDate = true;
    }
  }
  return invalidDate;
}

function calculateAge(birthday, currentDate) {
  if (currentDate < birthday) {
    throw new Error(
      'A data de nascimento não pode ser posterior à data atual.'
    );
  }

  let years = currentDate.getFullYear() - birthday.getFullYear();
  let months = currentDate.getMonth() - birthday.getMonth();
  let days = currentDate.getDate() - birthday.getDate();

  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months = 11 + months;
    days =
      days +
      new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
  }

  return { years, months, days };
}
