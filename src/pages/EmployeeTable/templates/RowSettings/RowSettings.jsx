import React from 'react';
import PropTypes from 'prop-types';

import { InputsPaperBlock } from '../../../../components/smart';

import { schema } from '../../../EmployeeForm/libs';
import { validate } from '../../../../libs';

const onSubmit = () => {
  console.log('onSubmit test');
};

/**
 * Проставляем дефолтные значения из defaultValuesObj
 *
 * @param {object} schema - схема, в копию которой присваиваются дефолтные значения
 * @param {object} defaultValues - объект, из которого нужно вытащить значения для новой схемы
 * @returns {object} newSchema - новый объект
 */
function setDefaultValues(schema, defaultValues) {
  const defaultObject = defaultValues.original;
  console.log('defaultObject', defaultObject);

  const newSchema = { ...schema };
  Object.keys(newSchema)
    // Фильтруем все key у схемы, которые содержат '_values'
    .filter((key) => key.indexOf('_values') !== -1)
    // У каждого такого key пробегаемся внутри по его key и правим value
    .forEach((key) => {
      Object.keys(newSchema[key])
        // Фильтруем: если есть дефолтное значение и оно есть в схеме
        .filter(
          (innerKey) => defaultObject[innerKey] && newSchema[key][innerKey]
        )
        // Каждому присваиваем новое значение
        .forEach((innerKey) => {
          // Если defaultObject[innerKey] - дата, то берем только первые 10 символов
          if (validate.isValidDate(defaultObject[innerKey])) {
            newSchema[key][innerKey].value = defaultObject[innerKey].slice(
              0,
              10
            );
          } else {
            newSchema[key][innerKey].value = defaultObject[innerKey];
          }
        });
    });

  console.log('newSchema', newSchema);

  return newSchema;
}

const RowSettings = (row) => {
  console.log('row', row);

  // row.original
  //  employee_id: "85"
  //  end_date: "2002-09-27T20:00:00.000Z"
  //  name: "Аккакий Аккакиевичв"
  //  rate_id: "71"
  //  rate_week_day: 100
  //  rate_week_end: 150
  //  start_date: "2001-02-28T21:00:00.000Z"

  console.log('schema', schema);
  console.log(JSON.stringify(schema));
  const newSchema = schema;
  newSchema['employee_values'].name.value = 'test Name HHAHAH';

  const schemaWithDefaultValues = setDefaultValues(schema, row);
  console.log(schemaWithDefaultValues);
  return (
    <InputsPaperBlock
      title="Изменить данные сотрудника"
      schema={schemaWithDefaultValues}
      submitButtonTitle="Обновить"
      onSubmit={onSubmit}
    />
  );
  const newLabels = [...labels];
  console.log(row);
  console.log(newLabels);
  newLabels.map(({ key, type }, index) => {
    switch (type) {
      case 'text': {
        if (typeof row.original[key] !== 'undefined') {
          newLabels[index].defaultValue = row.original[key];
        }
        break;
      }
      case 'date': {
        if (typeof row.original[key] !== 'undefined') {
          newLabels[index].defaultValue = timeToString(row.original[key]);
        }
      }
    }
  });

  console.log('newLabels', newLabels);
  return (
    <div>
      <button onClick={this.onClickDelete(row)}>Удалить Сотрудника</button>
      <button onClick={this.onClickEdit(row)}>Изменить Сотрудника</button>
      <AddEmployee labels={labels} />
    </div>
  );
};

RowSettings.propTypes = {
  onClick: PropTypes.func,
};

export { RowSettings };

// Прокидываем начальные значения, если они есть
// /**
//  *
//  *
//  * @param {object} values - значения из схемы
//  * @param {object} defaultValues - начальные значения из таблицы
//  * @returns
//  */
// function setDefaultValues(values, defaultValues) {
//   return Object.keys(values).reduce((sum, key) => {
//     const newSum = {
//       ...sum,
//       [key]: values[key],
//     };

//     if (defaultValues && defaultValues[key]) {
//       newSum[key].value = defaultValues[key];
//     }
//     // debugger;

//     return newSum;
//   }, {});
// }

// // Инициализация полей ввода
// const values = structure.reduce((sum, item) => {
//   // debugger;

//   return {
//     ...sum,
//     [item.name]: setDefaultValues(item.values, defaultValues),
//     // {
//     //   ...item.values,
//     // },
//   };
// }, {});
