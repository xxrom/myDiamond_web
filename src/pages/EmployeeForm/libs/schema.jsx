import regexp from './regexp';

/**
 * [name] - имя схемы
 *
 * @param {array} - массив объектов,
 * который который описывает поведение поля ввода
 * * {string} label - заглавие поля ввода
 * * {string} key - идентификатор поля
 * * {object} regexp - валидация поля
 * * {string} type - тип поля ['text', 'date']
 * * {string} defaultValue - дефолтное значение
 */
const employee = [
  {
    label: 'Фамилия Имя',
    key: 'name',
    regexp: regexp.name,
    type: 'text',
    defaultValue: 'ФамилияИмя',
  },
];

/**
 * [name]_values - имя схемы
 *
 * @param {object} [name][key] - объект со значениями для каждого поля оп key
 * * {string} value - значение поля
 * * {boolean} valid - валидация прошла?
 */
const employee_values = {
  name: {
    value: 'Фамилия Имя',
    valid: true,
  },
};

/**
 * Дополнительный настройки данного блока
 * @param {boolean} delete - этот блок можно или нет удалить
 */
const employee_settings = {
  delete: false,
};

// ============================

const rate = [
  {
    label: 'Тариф-будни',
    key: 'rate_week_day',
    regexp: regexp.number,
    type: 'text',
    defaultValue: '100',
  },
  {
    label: 'Тариф-выходной',
    key: 'rate_week_end',
    regexp: regexp.number,
    type: 'text',
    defaultValue: '200',
  },
  {
    label: 'Начало тарифа',
    key: 'start_date',
    regexp: regexp.date,
    type: 'date',
    defaultValue: String(new Date().toISOString().slice(0, 10)),
  }, // send to server new Date().toISOString()
  {
    label: 'Конец тарифа',
    key: 'end_date',
    regexp: regexp.date,
    type: 'date',
    defaultValue: String(
      new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString()
        .slice(0, 10)
    ),
  },
];
const rate_values = {
  rate_week_day: {
    value: '100',
    valid: true,
  },
  rate_week_end: {
    value: '200',
    valid: true,
  },
  start_date: {
    value: '2018-01-01',
    valid: true,
  },
  end_date: {
    value: '2018-01-01',
    valid: true,
  },
};
const rate_settings = {
  delete: true,
};

export {
  employee,
  employee_values,
  employee_settings,
  rate,
  rate_values,
  rate_settings,
};
