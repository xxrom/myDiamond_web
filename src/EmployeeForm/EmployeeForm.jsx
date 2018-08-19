import React, { Component } from 'react';

import AddEmployee from '../AddEmployee';
import { labels } from './libs';

class EmployeeForm extends Component {
  render() {
    const onSubmit = () => {
      console.log('OnSubmit');
    };
    return (
      <div>
        <h3>Добавить нового сотрудника</h3>
        <AddEmployee labels={labels} onSumbit={onSubmit} />
        <button onClick={this.onClick}>Добавить</button>
      </div>
    );
  }
}

export default EmployeeForm;
