import React from 'react';
import PropTypes from 'prop-types';

const RowSettings = (row) => {
  return 'test';
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
