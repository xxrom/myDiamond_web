import { regexp } from '../../../libs/';

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
// ============================

const work = [
  {
    label: 'Дата работы',
    key: 'date',
    regexp: regexp.date,
    type: 'date',
    defaultValue: String(new Date().toISOString().slice(0, 10)),
  },
  {
    label: 'Сотрудник ID',
    key: 'employee_id',
    regexp: regexp.number,
    type: 'text',
    defaultValue: '',
  },
  {
    label: 'Дневной ID',
    key: 'name_day_id',
    regexp: regexp.number,
    type: 'text',
    defaultValue: '',
  },
  {
    label: 'Общее время работы',
    key: 'full_time',
    regexp: regexp.number,
    type: 'text',
    defaultValue: '480',
  },
];

const work_values = {
  date: {
    value: String(new Date().toISOString().slice(0, 10)),
    valid: true,
  },
  employee_id: {
    value: '',
    valid: false,
  },
  name_day_id: {
    value: '',
    valid: false,
  },
  full_time: {
    value: '480',
    valid: true,
  },
};
const work_settings = {
  delete: false,
};

// ============================

const article = [
  {
    label: 'Артикуль',
    key: 'article',
    regexp: regexp.text,
    type: 'text',
    defaultValue: 'TEST 343',
  },
  {
    label: 'Время работы',
    key: 'time',
    regexp: regexp.number,
    type: 'text',
    defaultValue: '60',
  },
  {
    label: 'Количество изделий',
    key: 'amount',
    regexp: regexp.number,
    type: 'text',
    defaultValue: '100',
  },
  {
    label: 'Коробок',
    key: 'boxes',
    regexp: regexp.number,
    type: 'text',
    defaultValue: '10',
  },
  {
    label: 'В коробке штук',
    key: 'in_box',
    regexp: regexp.number,
    type: 'text',
    defaultValue: '10',
  },
  {
    label: 'Последняя коробка',
    key: 'plus_box',
    regexp: regexp.number,
    type: 'text',
    defaultValue: '0',
  },
];

const article_values = {
  article: {
    value: 'TEST 343',
    valid: true,
  },
  time: {
    value: '60',
    valid: true,
  },
  amount: {
    value: '100',
    valid: true,
  },
  boxes: {
    value: '10',
    valid: true,
  },
  in_box: {
    value: '10',
    valid: true,
  },
  plus_box: {
    value: '0',
    valid: true,
  },
};
const article_settings = {
  delete: true,
};

export {
  work,
  work_values,
  work_settings,
  article,
  article_values,
  article_settings,
};
