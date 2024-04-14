// Selecionar elementos DOM necessários
const btnCalculate = document.querySelector('#btnCalculate'); // Botão de calcular
const errorMessage = document.querySelectorAll('#ageCalculatorForm li'); // Mensagens de erro
const dayError = document.querySelector('#dayError'); // Mensagem de erro para o campo do dia
const monthError = document.querySelector('#monthError'); // Mensagem de erro para o campo do mês
const yearError = document.querySelector('#yearError'); // Mensagem de erro para o campo do ano
const outDay = document.querySelector('.days'); // Saída para dias
const outMonths = document.querySelector('.months'); // Saída para meses
const outYears = document.querySelector('.years'); // Saída para anos
const today = new Date(); // Data atual

// Adicionar ouvinte de evento para o clique do botão de calcular
btnCalculate.addEventListener('click', e => {
  e.preventDefault(); // Impedir o envio do formulário

  // Obter valores dos campos de entrada
  let inDay = Number(document.querySelector('#inDay').value);
  let inMonth = Number(document.querySelector('#inMonth').value);
  let inYear = Number(document.querySelector('#inYear').value);

  // Validar os campos de entrada
  const isDayValid = validDay(inDay, inMonth); // Validar o dia
  const isMonthValid = validMonth(inMonth); // Validar o mês
  const isYearValid = validYear(inYear); // Validar o ano

  // Verificar se todos os campos são válidos
  if (isDayValid && isMonthValid && isYearValid) {
    // Criar um objeto de data de aniversário
    const birthday = new Date(inYear, inMonth - 1, inDay);
    // Calcular a idade e exibir o resultado
    const age = calculateAge(birthday, today);
    outDay.textContent = age.days;
    outMonths.textContent = age.months;
    outYears.textContent = age.years;
  } else {
    // Limpar os resultados anteriores e exibir mensagens de erro
    outDay.textContent = '--';
    outMonths.textContent = '--';
    outYears.textContent = '--';
  }
});

/* Cada função de validação retorna um valor booleano indicando se o campo é válido ou não,
 e essa informação é usada na função do botão de calcular. */

// Função para validar o dia
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

// Função para validar o mês
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

// Função para validar o ano
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

// Função para validar a data
function validateData(day, month) {
  let invalidDate = false;
  let days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Verificar se o dia é válido para o mês fornecido
  for (let i = 0; i < days.length; i++) {
    if (day > days[month - 1]) {
      invalidDate = true;
    }
  }
  return invalidDate;
}

// Função para calcular a idade com base na data de nascimento e na data atual
function calculateAge(birthday, currentDate) {
  // Verificar se a data de nascimento é posterior à data atual
  if (currentDate < birthday) {
    throw new Error(
      'A data de nascimento não pode ser posterior à data atual.'
    );
  }

  let years = currentDate.getFullYear() - birthday.getFullYear();
  let months = currentDate.getMonth() - birthday.getMonth();
  let days = currentDate.getDate() - birthday.getDate();

  // Se o dia atual for menor que o dia de nascimento, ajusta os meses e os dias
  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months = 11 + months; // Adicionar 12 meses para obter o número correto de meses
    days =
      days +
      new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate(); // Adicionar os dias do último mês do ano anterior
  }

  return { years, months, days };
}
