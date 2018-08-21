import regexp from './regexp';

const employee_label = [
  {
    label: 'Фамилия Имя',
    key: 'name',
    regexp: regexp.name,
    type: 'text',
    defaultValue: 'ФамилияИмя',
  },
];

const rate_label = [
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

export { employee_label, rate_label };
