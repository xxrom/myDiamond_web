const timeToString = (str) => {
  // сдвиг даты
  // const addHours = 23;

  // добавляем плюс 23 часа, в миллисекундах к дате
  const dateNumber = Date.parse(str); // + addHours * 1000 * 3600;

  // преобразуем к строке
  const dateString = new Date(dateNumber).toISOString();

  // обрезаем строку
  return dateString.slice(0, 10);
};

export { timeToString };
