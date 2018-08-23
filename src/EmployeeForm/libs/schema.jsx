import regexp from './regexp';

const employee = [
  {
    label: 'Фамилия Имя',
    key: 'name',
    regexp: regexp.name,
    type: 'text',
    defaultValue: 'ФамилияИмя',
  },
];

const employee_values = {
  name: {
    value: 'ФамилияИмя',
    valid: false,
  },
};

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
    valid: false,
  },
  rate_week_end: {
    value: '200',
    valid: false,
  },
  start_date: {
    value: '2018-01-01',
    valid: false,
  },
  end_date: {
    value: '2018-01-01',
    valid: false,
  },
};

export { employee, employee_values, rate, rate_values };
