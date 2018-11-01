import React, { Component } from 'react';

import { InputsPaperBlock } from '../../components/smart/';
import { schema } from './libs';
import { api, structure } from '../../libs/';

import './EmployeeForm.css';

class EmployeeForm extends Component {
  /**
   * Отправляет данные на сервер
   */
  onSubmit = async function() {
    const { values } = this.state;
    if (!structure.validate.values(values)) {
      console.log('NotValid !!!');
      this.setState({
        openValidationMessage: true,
        validateMessageType: 'validationError',
      });
      return;
    }

    // Добавляем нового сотрудника
    const sendEmployeeObj = structure.prepare.getObject(values, 'employee0');
    console.log('sendEmployeeObj', sendEmployeeObj);

    const employeeId = await api.postNewEmployee(sendEmployeeObj);
    console.log(`employeeId`, employeeId);

    // Добавляем для нового сотрудника его ставки
    const sendRateArr = structure.prepare.getArray(
      employeeId,
      'employee_id',
      values,
      'rate'
    );
    console.log('sendRateArr obj', sendRateArr);
    const rateId = await api.postNewRateArray(sendRateArr);

    this.setState({
      openValidationMessage: true,
      validateMessageType: 'successfulSending',
    });
  };

  render() {
    return (
      <InputsPaperBlock
        title="Добавить нового сотрудника."
        schema={schema}
        submitButtonTitle="Добавить сотрудника"
        onSubmit={this.onSubmit}
      />
    );
  }
}

export { EmployeeForm };
