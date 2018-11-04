// Проверить валидность строки даты
function isValidDate(dateFullString) {
  // Проверка на строку и ее длину
  if (typeof dateFullString !== 'string' || dateFullString.length < 10) {
    return false;
  }

  // Отрезаем первые 10 символов 'yyyy-mm-dd'
  const dateString = dateFullString.slice(0, 10);

  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  // Invalid format
  if (!dateString.match(regEx)) {
    return false;
  }

  var d = new Date(dateString);
  // Invalid date
  if (Number.isNaN(d.getTime())) {
    return false;
  }

  return d.toISOString().slice(0, 10) === dateString;
}

export { isValidDate };
