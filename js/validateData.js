// Função para validar a data alternativa
function validateData(day, month) {
  if (day <= 0 || day > 31) {
    return true; // Retorna true se o dia estiver fora do intervalo válido
  }

  let daysInMonth = new Date(today.getFullYear(), month, 0).getDate();
  return day > daysInMonth;
}
