import React from 'react';
import PropTypes from 'prop-types';

import { InputsPaperBlock } from '../../../../components/smart';
import { structure, api } from '../../../../libs';

import { schema } from '../../../EmployeeForm/libs';
import { setDefaultValues } from './setDefaultValues';

const onUpdate = (row) =>
  async function() {
    const { values } = this.state;
    if (!structure.validate.values(values)) {
      console.log('NotValid !!!');
      // Показываем PopUp с ошибкой
      this.setState({
        openValidationMessage: true,
        validateMessageType: 'validationError',
      });
      return;
    }
    console.log('values', values);

    // Обновляем данные сотрудника
    const sendEmployeeObj = structure.prepare.getObject(values, 'employee0');
    console.log('sendEmployeeObj', sendEmployeeObj);
    const updateEmployee = await api.updateTableData(
      sendEmployeeObj,
      'employee',
      row
    );
    console.log(`updateEmployee`, updateEmployee);

    // Добавляем у данного сотрудника его ставки
    let sendRateObj = structure.prepare.getObject(values, 'rate0');
    console.log('sendRateArr obj', sendRateObj);

    sendRateObj = {
      ...sendRateObj,
      employee_id: row['employee_id'],
    };

    const updateRate = await api.updateTableData(sendRateObj, 'rate', row);
    console.log(`updateRate`, updateRate);

    // Показываем popUp об успешном обновлении данных на бэке
    this.setState({
      openValidationMessage: true,
      validateMessageType: 'successfulUpdate',
    });
  };

const onDelete = (row) =>
  async function() {
    console.log('onDelete', row);
    const rateId = row.rate_id;
    const employeeId = row.employee_id;
    console.log('rateId', rateId);
    console.log('employeeId', employeeId);
    const deleteRateAns = await api.deleteTableData('rate', rateId);
    console.log('delete rate', deleteRateAns);
    const deleteEmployeeAns = await api.deleteTableData('employee', employeeId);
    console.log('delete rate', deleteEmployeeAns);

    // Показываем popUp об успешном обновлении данных на бэке
    this.setState({
      openValidationMessage: true,
      validateMessageType: 'successfulDelete',
    });
  };

const RowSettings = (row) => {
  console.log('row', row);
  const schemaWithDefaultValues = setDefaultValues(schema, row.original);
  return (
    <InputsPaperBlock
      title="Изменить данные сотрудника"
      schema={schemaWithDefaultValues}
      submitButtonTitle="Обновить"
      deleteButtonTitle="Удалить"
      // TODO: подумать как убрать каждоразовое создание функции onUpdate
      onSubmit={onUpdate(row.original)}
      onDelete={onDelete(row.original)}
      mode="mini"
    />
  );
};

RowSettings.propTypes = {
  onClick: PropTypes.func,
};

export { RowSettings };
