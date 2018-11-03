import React from 'react';
import PropTypes from 'prop-types';

import { InputsPaperBlock } from '../../../../components/smart';

import { schema } from './../../../EmployeeForm/libs';

const onSubmit = () => {
  console.log('onSubmit test');
};

const RowSettings = (row) => {
  console.log('row', row);
  console.log('schema', schema);
  return (
    <InputsPaperBlock
      title="Изменить данные сотрудника"
      schema={schema}
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
